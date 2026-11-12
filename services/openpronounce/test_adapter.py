"""Adapter/security tests; the large inference models are deliberately stubbed.

These tests verify transport, not pronunciation accuracy or a successful model build.
"""
import base64
import importlib.util
import os
from pathlib import Path
import struct
import sys
import types
import unittest
from unittest.mock import patch

from fastapi.testclient import TestClient

os.environ['OPENPRONOUNCE_TOKEN'] = 'test-only-token-' + 'x'*32
spec = importlib.util.spec_from_file_location('camp_adapter', Path(__file__).with_name('app.py'))
adapter = importlib.util.module_from_spec(spec)
spec.loader.exec_module(adapter)


def wav():
    pcm = b'\x00\x10' * (16000*3)
    return (b'RIFF' + struct.pack('<I', len(pcm)+36) + b'WAVEfmt ' +
            struct.pack('<IHHIIHH', 16, 1, 1, 16000, 32000, 2, 16) +
            b'data' + struct.pack('<I', len(pcm)) + pcm)


class AdapterTests(unittest.TestCase):
    def setUp(self):
        speech = types.ModuleType('openpronounce.speech')
        phones = types.ModuleType('openpronounce.phones')
        speech._load_models = lambda: None
        phones._load_model = lambda: None
        self.modules = patch.dict(sys.modules, {
            'openpronounce': types.ModuleType('openpronounce'),
            'openpronounce.speech': speech, 'openpronounce.phones': phones,
        })
        self.modules.start()
        self.client = TestClient(adapter.app)
        self.client.__enter__()
        self.headers = {'Authorization': 'Bearer ' + adapter.TOKEN}
        self.payload = {'audio': base64.b64encode(wav()).decode(), 'expected_text': 'Hello there.', 'lang': 'en'}

    def tearDown(self):
        self.client.__exit__(None, None, None)
        self.modules.stop()

    def test_private_health_and_unauthenticated_rejection(self):
        self.assertEqual(self.client.get('/health').status_code, 401)
        response = self.client.get('/health', headers=self.headers)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.json()['ready'])
        self.assertIn('no-store', response.headers['Cache-Control'])

    def test_valid_audio_reaches_the_engine_only_after_validation(self):
        expected = {'version': adapter.VERSION, 'score': 71, 'transcript': 'HELLO THERE', 'errors': [], 'audioHash': '0'*64}
        with patch.object(adapter, 'analyze', return_value=expected) as engine:
            response = self.client.post('/pronunciation', headers=self.headers, json=self.payload)
            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json(), expected)
            engine.assert_called_once_with(wav(), 'Hello there.')

    def test_malformed_audio_unsupported_language_and_oversized_input_are_rejected(self):
        with patch.object(adapter, 'analyze') as engine:
            bad = dict(self.payload, audio=base64.b64encode(b'not a WAV').decode())
            self.assertEqual(self.client.post('/pronunciation', headers=self.headers, json=bad).status_code, 422)
            self.assertEqual(self.client.post('/pronunciation', headers=self.headers, json=dict(self.payload, lang='fr')).status_code, 400)
            self.assertEqual(self.client.post('/pronunciation', headers=self.headers, content=b'x'*1_500_001).status_code, 413)
            self.assertEqual(self.client.post('/pronunciation', headers=self.headers, json=[]).status_code, 400)
            engine.assert_not_called()

    def test_pcm_header_validation(self):
        adapter.validate_wav(wav())
        raw = bytearray(wav()); raw[22] = 2
        with self.assertRaises(ValueError):
            adapter.validate_wav(bytes(raw))
        with self.assertRaises(ValueError):
            adapter.validate_wav(wav()[:-2])

    def test_no_provider_trace_is_returned(self):
        with patch.object(adapter, 'analyze', side_effect=RuntimeError('PRIVATE engine details')):
            response = self.client.post('/pronunciation', headers=self.headers, json=self.payload)
            self.assertEqual(response.status_code, 503)
            self.assertNotIn('PRIVATE', response.text)

    def test_busy_service_does_not_queue_more_inference(self):
        class Busy:
            def locked(self):
                return True
        with patch.object(adapter, 'busy', Busy()), patch.object(adapter, 'analyze') as engine:
            self.assertEqual(self.client.post('/pronunciation', headers=self.headers, json=self.payload).status_code, 429)
            engine.assert_not_called()


if __name__ == '__main__':
    unittest.main()

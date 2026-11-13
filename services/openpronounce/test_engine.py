"""Lightweight cache-contract tests; real model equivalence is benchmarked remotely."""
import json
import os
from pathlib import Path
import tempfile
import types
import sys
import unittest
from unittest.mock import patch

import numpy as np
import engine


class ReferenceCacheTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.env = patch.dict(os.environ, {"OPENPRONOUNCE_REFERENCE_CACHE": self.directory.name,
                                          "OPENPRONOUNCE_TTS": "piper", "OPENPRONOUNCE_TTS_VOICE": "fixed-test-voice"})
        self.env.start()
        engine._manifest.cache_clear();engine._cached_embedding.cache_clear()

    def tearDown(self):
        engine._manifest.cache_clear();engine._cached_embedding.cache_clear()
        self.env.stop();self.directory.cleanup()

    def write(self, text="A fixed public line.", signature=None):
        key = engine._key(text)
        manifest = {"signature": signature or engine._signature(), "references": {key:text}}
        Path(self.directory.name, "manifest.json").write_text(json.dumps(manifest))
        return key

    def test_reference_identity_is_a_fixed_hash_and_never_a_text_filename(self):
        self.assertRegex(engine._key("../../private/name"), r"^[0-9a-f]{64}$")
        self.assertNotEqual(engine._key("Hello"), engine._key("hello"))

    def test_wrong_checkpoint_voice_or_cache_format_cannot_reuse_embeddings(self):
        for field,value in [("checkpoint","other-model"),("voice","other-voice"),("version",999)]:
            with self.subTest(field=field):
                self.write(signature={**engine._signature(),field:value})
                engine._manifest.cache_clear()
                self.assertEqual(engine._manifest(), {})

    def test_arrays_are_readonly_float32_and_bounded_without_pickle_loading(self):
        key = self.write()
        target = Path(self.directory.name, key+".npy")
        expected = np.ones((8,1024),dtype=np.float32)
        np.save(target, expected, allow_pickle=False)
        actual = engine._cached_embedding(key)
        np.testing.assert_array_equal(actual, expected)
        self.assertFalse(actual.flags.writeable)
        for bad in [np.ones((8,1024),dtype=np.float64),np.ones((8,3),dtype=np.float32),
                    np.full((8,1024),np.nan,dtype=np.float32),np.array([{"unsafe":"object"}],dtype=object)]:
            np.save(target,bad)
            engine._cached_embedding.cache_clear()
            self.assertIsNone(engine._cached_embedding(key))

    def test_unknown_line_falls_back_without_adding_a_reference_embedding(self):
        self.write()
        audio = types.SimpleNamespace(text2speech=lambda text,**kw: "fixed-reference.wav",load=lambda *a,**kw: np.zeros(16000,dtype=np.float32))
        speech = types.SimpleNamespace(extract_embeddings=lambda *a: np.ones((3,1024),dtype=np.float32))
        with patch.dict(sys.modules,{"openpronounce":types.SimpleNamespace(audio=audio,speech=speech)}):
            value = engine.reference_embedding("A newly published line.")
        self.assertEqual(value.shape,(3,1024))
        self.assertEqual(engine._cached_embedding.cache_info().currsize,0)
        self.assertEqual(sorted(p.name for p in Path(self.directory.name).iterdir()),["manifest.json"])

    def test_an_exact_authored_line_uses_its_cache_without_model_or_synthesis_work(self):
        text="A fixed public line.";key=self.write(text)
        np.save(Path(self.directory.name,key+".npy"),np.ones((5,1024),dtype=np.float32),allow_pickle=False)
        def unexpected(*a,**kw):raise AssertionError("Authored reference should already be prepared")
        package=types.SimpleNamespace(audio=types.SimpleNamespace(text2speech=unexpected,load=unexpected),
                                      speech=types.SimpleNamespace(extract_embeddings=unexpected))
        with patch.dict(sys.modules,{"openpronounce":package}):
            self.assertEqual(engine.reference_embedding(text).shape,(5,1024))


if __name__ == "__main__":
    unittest.main()

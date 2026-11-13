"""Exact-score English inference using the pinned OpenPronounce models.

Only published reference embeddings are cached. Learner waveforms, transcripts
and assessment results are never cached. Pitch/energy plots are omitted because
EnglishCamp does not consume them and they do not contribute to the score.
"""
from functools import lru_cache
import hashlib
import json
import os
from pathlib import Path

RATE = 16000
CHECKPOINT = "facebook/wav2vec2-large-960h"
CACHE_VERSION = 1


def _cache_dir():
    return Path(os.environ.get("OPENPRONOUNCE_REFERENCE_CACHE", "/models/englishcamp-references"))


def _signature():
    return {"version": CACHE_VERSION, "checkpoint": CHECKPOINT, "sampleRate": RATE,
            "tts": os.environ.get("OPENPRONOUNCE_TTS", "gtts"),
            "voice": os.environ.get("OPENPRONOUNCE_TTS_VOICE", "")}


def _key(text):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


@lru_cache(maxsize=1)
def _manifest():
    try:
        value = json.loads((_cache_dir()/"manifest.json").read_text())
        return value if (isinstance(value, dict) and value.get("signature") == _signature()
                         and isinstance(value.get("references"), dict)) else {}
    except (OSError, ValueError, TypeError):
        return {}


@lru_cache(maxsize=32)
def _cached_embedding(key):
    import numpy as np
    try:
        file = _cache_dir()/(key+".npy")
        if file.stat().st_size > 12_400_000:
            return None
        value = np.load(file, allow_pickle=False)
        if (value.dtype != np.float32 or value.ndim != 2 or not 0 < len(value) <= 3000
                or value.shape[1] != 1024 or not np.isfinite(value).all()):
            return None
        value.setflags(write=False)
        return value
    except (OSError, ValueError):
        return None


def reference_embedding(text):
    from openpronounce import audio, speech
    key = _key(text)
    # Only an exact authored text in the build manifest may reuse a disk entry.
    if _manifest().get("references", {}).get(key) == text:
        value = _cached_embedding(key)
        if value is not None:
            return value
    # Newly published lines still work before the next backend cache rebuild.
    # This is fixed reference speech, never the learner's recording.
    return speech.extract_embeddings(audio.load(audio.text2speech(text, lang="en"), sr=RATE), RATE)


def build_reference_cache():
    """Build-time only: save embeddings of the existing public practice lines."""
    import numpy as np
    import torch
    from openpronounce import audio, speech
    torch.set_num_threads(2)
    lines = json.loads(Path(__file__).with_name("references.json").read_text())
    destination = _cache_dir()
    destination.mkdir(parents=True, exist_ok=True)
    references = {}
    for text in lines:
        waveform = audio.load(audio.text2speech(text, lang="en"), sr=RATE)
        embedding = speech.extract_embeddings(waveform, RATE)
        key = _key(text)
        np.save(destination/(key+".npy"), embedding, allow_pickle=False)
        references[key] = text
    (destination/"manifest.json").write_text(json.dumps({"signature":_signature(), "references":references}))
    # One fixed waveform is used to initialize kernels before a memory snapshot.
    np.save(destination/"warmup.npy", audio.load(audio.text2speech(lines[0], lang="en"), sr=RATE), allow_pickle=False)
    (destination/"warmup.txt").write_text(lines[0])
    return len(references)


def shared_asr(waveform):
    """One Wav2Vec2 forward supplies both embeddings and the original CTC head.

    This follows Wav2Vec2ForCTC.forward: wav2vec2 -> dropout -> lm_head.
    Both models stay in eval mode; no weights, precision or decoder are changed.
    """
    import torch
    from openpronounce.speech import _load_models
    from openpronounce.device import get_device
    processor, model = _load_models(CHECKPOINT)
    inputs = processor(waveform, sampling_rate=RATE, return_tensors="pt", padding=True)
    values = inputs.input_values
    if len(values.shape) > 2:
        values = values.squeeze(0)
    with torch.inference_mode():
        features = model.wav2vec2(values.to(get_device())).last_hidden_state
        logits = model.lm_head(model.dropout(features))
        ids = torch.argmax(logits, dim=-1).cpu()
    return features.squeeze(0).cpu().numpy(), processor.batch_decode(ids)[0]


def assess(waveform, reference):
    import Levenshtein
    from fastdtw import fastdtw
    from scipy.spatial.distance import euclidean
    from openpronounce import speech, phones

    embedding, transcription = shared_asr(waveform)
    if not transcription.strip():
        raise ValueError("No clear speech was detected. Record the line again in a quiet place.")
    distance, path = fastdtw(embedding, reference_embedding(reference), dist=euclidean)
    acoustic_distance = distance / max(1, len(path))
    # The legacy text comparison also creates phoneme plots and text-based
    # errors which are subsequently replaced by the dedicated phone model.
    # Its only surviving score input is this identically rounded word distance.
    expected = [w.lower() for w in speech._words(reference.lower().strip())]
    heard = [w.lower() for w in speech._words(transcription.lower().strip())]
    word_error_rate = round(Levenshtein.distance(expected, heard)/max(1, len(expected)), 4)
    recognition = phones.recognize_phones(waveform, RATE, lang="en")
    differences = phones.compare_phones(recognition, reference, "en")
    score = speech.compute_pronunciation_score(acoustic_distance, differences["phone_error_rate"], word_error_rate, "en")
    return {"score":score, "transcribe":transcription, "differences":{"errors":differences["errors"]}}


def warmup():
    """Snapshot only models, kernels and public reference state; no learner input."""
    import numpy as np
    import torch
    from openpronounce.speech import _load_models
    from openpronounce.phones import _load_model
    torch.set_num_threads(2)
    torch.set_num_interop_threads(1)
    _load_models(CHECKPOINT)
    _load_model()
    directory = _cache_dir()
    if (directory/"warmup.npy").is_file():
        assess(np.load(directory/"warmup.npy", allow_pickle=False), (directory/"warmup.txt").read_text())

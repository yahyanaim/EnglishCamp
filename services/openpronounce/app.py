"""Authenticated, bounded adapter for the pinned MIT OpenPronounce engine.

Only a selected WAV and an authored reference line are processed. No upload files,
transcripts, learner names or audio logs are written by this adapter.
"""
import asyncio
import base64
import hashlib
import hmac
import json
import os
import struct
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Request
from starlette.concurrency import run_in_threadpool
from engine import assess

TOKEN = os.environ.get("OPENPRONOUNCE_TOKEN", "")
VERSION = "englishcamp-openpronounce-v1"
busy = asyncio.Semaphore(1)


def validate_wav(raw: bytes):
    if len(raw) < 44 or len(raw) > 1_056_044:
        raise ValueError("Use a short recording.")
    if (raw[:4], raw[8:16], raw[36:40]) != (b"RIFF", b"WAVEfmt ", b"data"):
        raise ValueError("Use PCM WAV audio.")
    size, fmt_size, encoding, channels, rate, byte_rate, align, depth, data_size = (
        struct.unpack_from("<I", raw, 4)[0], *struct.unpack_from("<IHHIIHH", raw, 16),
        struct.unpack_from("<I", raw, 40)[0],
    )
    if (size, fmt_size, encoding, channels, rate, byte_rate, align, depth, data_size) != (
        len(raw)-8, 16, 1, 1, 16000, 32000, 2, 16, len(raw)-44
    ) or data_size % 2 or not 3 <= data_size/32000 <= 33:
        raise ValueError("Use mono 16 kHz PCM WAV audio.")


@asynccontextmanager
async def lifespan(app):
    if len(TOKEN) < 32:
        raise RuntimeError("Set a private OPENPRONOUNCE_TOKEN of at least 32 characters.")
    # Import and warm the real models before reporting readiness.
    from openpronounce.speech import MODEL_NAME, _load_models
    from openpronounce.phones import _load_model
    # Match the engine's explicit checkpoint argument, avoiding a second lru_cache
    # entry (and a duplicate 1.2 GB model) for the argument-free default call.
    await run_in_threadpool(_load_models, MODEL_NAME)
    await run_in_threadpool(_load_model)
    yield


app = FastAPI(lifespan=lifespan, docs_url=None, redoc_url=None, openapi_url=None)


@app.middleware("http")
async def security(request: Request, call_next):
    if not hmac.compare_digest(request.headers.get("authorization", ""), "Bearer " + TOKEN):
        from fastapi.responses import JSONResponse
        return JSONResponse({"error": "Unauthorized"}, status_code=401)
    try:
        if int(request.headers.get("content-length", "0")) > 1_500_000:
            from fastapi.responses import JSONResponse
            return JSONResponse({"error": "Submission too large"}, status_code=413)
    except ValueError:
        from fastapi.responses import JSONResponse
        return JSONResponse({"error": "Invalid request"}, status_code=400)
    response = await call_next(request)
    response.headers["Cache-Control"] = "no-store, private"
    response.headers["X-Content-Type-Options"] = "nosniff"
    return response


@app.get("/health")
async def health():
    return {"ready": True, "engine": "OpenPronounce 0.3.0", "version": VERSION}


def analyze(raw: bytes, reference: str):
    import numpy as np
    wave = np.frombuffer(raw, dtype="<i2", offset=44).astype(np.float32)/32768
    if np.count_nonzero(np.abs(wave) > .006) < 8000:
        raise ValueError("Record clear audible speech.")
    result = assess(wave, reference)
    if not result["transcribe"].strip():
        raise ValueError("No clear speech was detected. Record the line again in a quiet place.")
    # The pinned engine emits each heard phone as one string, including an empty
    # string for a deletion. The site's transport uses a list of detected phones.
    errors = [{"position": error["position"], "word": error["word"],
               "expected": error["expected"], "actual": error["actual"],
               "confidence": error["confidence"],
               "phones": [{"expected": phone["expected"],
                           "heard": [phone["heard"]] if phone["heard"] else [],
                           "confidence": phone["confidence"]} for phone in error["phones"]]}
              for error in result["differences"]["errors"]]
    return {"version": VERSION, "score": result["score"], "transcript": result["transcribe"][:2000],
            "errors": errors, "audioHash": hashlib.sha256(raw).hexdigest()}


@app.post("/pronunciation")
async def pronunciation(request: Request):
    # Parse a bounded in-memory body rather than UploadFile, which can spool audio to disk.
    chunks, size = [], 0
    async for chunk in request.stream():
        size += len(chunk)
        if size > 1_500_000:
            raise HTTPException(413, "Submission too large")
        chunks.append(chunk)
    try:
        value = json.loads(b"".join(chunks))
        expected_text, lang = value["expected_text"], value.get("lang", "en")
        raw = base64.b64decode(value["audio"], validate=True)
    except (ValueError, TypeError, KeyError):
        raise HTTPException(400, "Invalid pronunciation submission") from None
    if lang != "en" or not isinstance(expected_text, str) or not expected_text.strip() or len(expected_text) > 600:
        raise HTTPException(400, "Use a short English reference line.")
    try:
        validate_wav(raw)
    except ValueError as error:
        raise HTTPException(422, str(error)) from error
    # There is no unbounded queue of expensive model requests.
    if busy.locked():
        raise HTTPException(429, "Pronunciation server busy. Try again shortly.")
    async with busy:
        try:
            return await run_in_threadpool(analyze, raw, expected_text)
        except ValueError as error:
            raise HTTPException(422, str(error)) from error
        except Exception:
            # Do not expose model traces, transcript text or request bodies.
            raise HTTPException(503, "Pronunciation assessment unavailable") from None

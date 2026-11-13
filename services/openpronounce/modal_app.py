"""Private, scale-to-zero OpenPronounce deployment on Modal Starter.

Before deploying, verify the workspace's out-of-pocket spend limit is $0 and
its usage budget does not exceed its recurring free credit, or use a cardless
workspace with the provider-locked free-credit cap. The backend has no GPU,
minimum warm containers, model Volume, or scheduled keep-alive jobs.
"""
from pathlib import Path
import sys

import modal

if sys.version_info[:2] != (3, 12):
    raise RuntimeError("Deploy OpenPronounce using Python 3.12, matching the serialized Modal image.")

HERE = Path(__file__).resolve().parent
UPSTREAM = "74bc17ea406e6f057f15eea0e70951e1931af868"


def cache_models():
    """Bake fixed public models and the offline reference voice into the image."""
    from openpronounce.speech import MODEL_NAME, _load_models
    from openpronounce.phones import _load_model
    from openpronounce.audio import text2speech

    _load_models(MODEL_NAME)
    _load_model()
    text2speech("Hello, it is nice to meet you.")


def cache_references():
    import sys
    sys.path.insert(0, "/srv")
    from engine import build_reference_cache
    count = build_reference_cache()
    print(f"Cached {count} fixed public reference embeddings.")


image = (
    modal.Image.debian_slim(python_version="3.12")
    .apt_install("git", "ffmpeg", "espeak-ng", "libsndfile1", "g++")
    .env({
        "HF_HOME": "/models",
        "HF_HUB_DISABLE_TELEMETRY": "1",
        "OPENPRONOUNCE_DEVICE": "cpu",
        "OPENPRONOUNCE_TTS": "piper",
        "OPENPRONOUNCE_TTS_VOICE": "en_GB-cori-medium",
        "OMP_NUM_THREADS": "2",
        "MKL_NUM_THREADS": "2",
        "TOKENIZERS_PARALLELISM": "false",
        "PYTHONDONTWRITEBYTECODE": "1",
    })
    .pip_install("torch==2.9.1", index_url="https://download.pytorch.org/whl/cpu")
    .pip_install("numpy==1.26.4", "Cython==0.29.37", "wheel")
    .run_commands("pip install --no-build-isolation fastdtw==0.3.4")
    .pip_install(
        "numpy==1.26.4",
        "transformers>=4.57,<5",
        f"openpronounce[app,tts-piper] @ git+https://github.com/Halleck45/OpenPronounce.git@{UPSTREAM}",
    )
    .run_function(cache_models, cpu=2, memory=12288, timeout=1800)
    .add_local_file(HERE / "engine.py", "/srv/engine.py", copy=True)
    .add_local_file(HERE / "references.json", "/srv/references.json", copy=True)
    .run_function(cache_references, cpu=(2, 2), memory=8192, timeout=600)
    # The SDK includes this public deployment module for the build function;
    # separately include the adapter, never local credentials or learner data.
    .add_local_file(HERE / "app.py", "/srv/openpronounce_service.py", copy=True)
)

app = modal.App("englishcamp-pronunciation")


@app.cls(
    image=image,
    secrets=[modal.Secret.from_name("englishcamp-openpronounce", required_keys=["OPENPRONOUNCE_TOKEN"])],
    cpu=(2, 2),
    memory=(4096, 8192),
    min_containers=0,
    max_containers=1,
    buffer_containers=0,
    scaledown_window=5,
    timeout=120,
    startup_timeout=180,
    enable_memory_snapshot=True,
)
@modal.concurrent(max_inputs=8)
class Pronunciation:
    @modal.enter(snap=True)
    def load_models(self):
        import sys
        sys.path.insert(0, "/srv")
        from engine import warmup
        warmup()

    @modal.asgi_app(requires_proxy_auth=True)
    def http(self):
        import sys

        sys.path.insert(0, "/srv")
        from openpronounce_service import app as api

        # Reject overlapping inference rather than queueing learner audio.
        return api

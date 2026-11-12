# EnglishCamp OpenPronounce service

This is the private CPU service used by `/api/pronunciation`. It runs the real [Halleck45/OpenPronounce](https://github.com/Halleck45/OpenPronounce) engine, pinned to commit `74bc17ea406e6f057f15eea0e70951e1931af868` (0.3.0, MIT; see `UPSTREAM-LICENSE`). The EnglishCamp wrapper adds authentication, bounded in-memory uploads, readiness checks and one concurrent assessment. It uses the engine's phoneme recogniser, not a transcript-only pronunciation guess.

The wrapper's JSON transport differs from the upstream demo's public multipart endpoint. Point the Worker to **this adapter**, not directly to an arbitrary OpenPronounce demo. Never use someone else's public demo as a production backend or send learner recordings to it.

## Hosting requirement

OpenPronounce requires Python, PyTorch, ffmpeg, espeak-ng and two Wav2Vec2 checkpoints of roughly 1.2 GB each. It cannot run inside a 128 MB Cloudflare Worker. Keep the website and D1 on Workers Free; run this service on a separate CPU host. Start with at least 8 GB RAM, two CPU cores and sufficient model/build disk space, then measure actual latency and memory before accepting traffic. This is a deployment recommendation, not a completed hardware benchmark.

A possible no-monthly-fee route is an **Always Free-eligible Oracle A1 VM**, if the account and home region have capacity and sufficient free memory. Confirm the current eligible allowance in the console, remain inside it, and build/test the image on that machine's architecture. Signup and resource availability are not guaranteed. See [Oracle's current free-resource documentation](https://docs.oracle.com/en-us/iaas/Content/FreeTier/freetier_topic-Always_Free_Resources.htm).

An existing always-on computer can run the service for a trial, but availability then depends on that computer and network. A public production endpoint also needs HTTPS, normally through an owned hostname and reverse proxy. Cloudflare Containers requires a paid plan. Current [Hugging Face Spaces documentation](https://huggingface.co/docs/hub/spaces-overview) says creating a Docker/Gradio Space requires a paid plan even though CPU Basic has no hourly price; do not promise it as an entirely free new account deployment.

No separate CPU host has been supplied for this project yet. Until one is deployed and verified, the production pronunciation API intentionally reports unavailable and does not upload recordings.

## Build and run on the chosen server

Create a private environment file **outside the repository** containing `OPENPRONOUNCE_TOKEN` with a cryptographically random value of at least 32 characters. Do not commit it or paste it into chat. Use the same value later as the Worker's `OPENPRONOUNCE_TOKEN` secret.

From the repository root:

```sh
docker build -t englishcamp-openpronounce services/openpronounce
docker run -d --name englishcamp-openpronounce --restart unless-stopped \
  --env-file /absolute/private/path/openpronounce.env \
  --memory 8g --cpus 2 -p 127.0.0.1:8000:8000 englishcamp-openpronounce
```

The image downloads model weights and the offline Piper reference voice at build time. It then runs as an unprivileged user. Model licences remain part of the installed packages. Keep inference on one worker process; multiple workers duplicate the model memory. Put a TLS reverse proxy in front of localhost:8000, with an upstream timeout long enough for a CPU assessment. Keep request-body and connection limits at the proxy too. Do not enable request-body or audio logging.

Use a secret-aware HTTP client to call `GET /health` with `Authorization: Bearer <service token>`. It returns readiness only after both recognisers have loaded. Never place the token in a URL. Check one genuine, non-personal sample against its reference sentence before connecting learners. Test a wrong sentence, silence and a noisy sample as well; protocol tests do not establish model accuracy.

## Connect Cloudflare

Store these in the existing `englishcamp` Worker's secret manager, preserving its Microsoft secrets:

```text
OPENPRONOUNCE_URL=https://your-owned-pronunciation-host/pronunciation
OPENPRONOUNCE_TOKEN=<same private service token>
```

Reload `/pronunciation` or `/shadowing-english`. Select a fixed reference line, record three to 30 seconds, replay it and approve sending that take. A successful response is bound to the selected recording's SHA-256 fingerprint. Changing the take clears the old result. Errors leave the recording available locally; no invented grade is shown.

The service processes only the selected audio and displayed reference. It does not receive a learner's name, notes, recovery code or account history. Uploads are bounded JSON in memory, avoiding the demo server's temporary audio files. The reference synthesiser uses offline Piper; audible EnglishCamp model playback continues to use Microsoft. The browser's replay remains local.

## Verification boundaries

`test_adapter.py` checks authentication, body limits, canonical WAV headers, readiness, overload rejection and error redaction with the inference engine stubbed. It needs FastAPI and httpx; it does not download models. Run it with:

```sh
python -m unittest discover -s services/openpronounce -p 'test_*.py'
```

The Worker/React tests separately verify canonical reference selection, consent, authenticated forwarding and recording/result identity. A full image build and real pronunciation inference still require the CPU host. OpenPronounce scores are approximate read-aloud feedback; they are not a validated CEFR speaking score and do not replace the existing multi-skill placement assessment.

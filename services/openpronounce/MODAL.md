# OpenPronounce on Modal Starter

This deployment keeps the existing EnglishCamp UI, recording consent, reference IDs, result fingerprint and Microsoft playback. Only the separately hosted Python pronunciation engine moves to Modal.

## Cost settings before deployment

Use the Starter plan and inspect the actual account allowance. On November 12, 2026, `yahyanaim2001` offers **$1 included compute credit per month without a payment method**, with **Usage limit: $1 — Set by Modal**. The $30 advertised allowance is unlocked only after payment-method verification. The current cardless, provider-locked $1 cap matches the monthly credit and must remain intact.

If the owner later adds a payment method, set **Spend limit: $0** and a usage budget covered by the available recurring credit before running anything. A $25 usage budget is appropriate only when the full $30 allowance is actually unlocked. The usage budget counts usage before credits; the spend limit caps out-of-pocket charges. Never assume the advertised $30 is available on a new cardless account.

These are current provider terms, not a promise of unlimited capacity. The service can be unavailable when its credit, budget or provider capacity is exhausted. The site must keep recordings local on failures and must not show a fabricated result.

Sources checked November 12, 2026: [pricing](https://modal.com/pricing), [billing](https://modal.com/docs/guide/billing), [budgets and spend limits](https://modal.com/docs/guide/budgets).

## Deployment configuration

`modal_app.py` uses Python 3.12, the pinned OpenPronounce commit, two CPU cores and 12 GiB of memory. It has zero minimum warm containers, one maximum container and a five-second idle window. Memory snapshots preserve loaded model weights between cold starts. There are no GPUs, paid model Volumes or keep-alive jobs. The adapter permits one inference at a time and returns 429 for overlapping assessments.

The build downloads fixed public checkpoints and an offline reference voice. Modal includes the public deployment module for its build function, and the image includes the public adapter. It does not include `.dev.vars`, learner data, recordings or local deployment credentials. Model downloads happen before accepting learner traffic; the existing adapter processes selected WAV bytes in memory.

Both authentication layers are required:

* Modal Proxy Tokens block unauthenticated requests before they start a model container.
* The adapter's independent `OPENPRONOUNCE_TOKEN` authenticates the request inside the container.

See [Modal Proxy Tokens](https://modal.com/docs/guide/webhook-proxy-auth). The Worker sends proxy credentials only to a `.modal.run` host. An incomplete pair or accidental change to another host disables the endpoint.

## Publish and connect

1. Use **Python 3.12** locally, matching the remote image; Modal serializes the build function and service class. Install `modal-client-requirements.txt` into an isolated environment and authenticate the owner's account. Keep its configuration outside tracked files. `MODAL_CONFIG_PATH` can point into an ignored, mode-700 deployment directory. A dedicated seven-day deployment token requires explicit owner approval; it has the user's permissions in that Modal workspace, not an app-only scope.
2. Create the Modal secret `englishcamp-openpronounce` containing a cryptographically random `OPENPRONOUNCE_TOKEN` of at least 32 characters. Read it from a private file or process environment; never paste it into a command, chat, commit or log.
3. Deploy from the repository root with `modal deploy services/openpronounce/modal_app.py`. Record the actual HTTPS URL returned by the successful deployment. Do not infer it from a username.
4. Create a dedicated Proxy Token for this pronunciation deployment and keep the Token ID and Token Secret private. Confirm an unauthenticated health request is rejected at the proxy, while the authenticated `/health` returns ready after both real models load.
5. Test real, non-personal audio with a matching line, a wrong line, silence and noise. Measure response time, memory and cold-start behavior. The existing Worker timeout is 90 seconds; do not activate a backend that cannot finish within it.
6. Store `OPENPRONOUNCE_URL` (ending in `/pronunciation`), `OPENPRONOUNCE_TOKEN`, `OPENPRONOUNCE_MODAL_KEY` and `OPENPRONOUNCE_MODAL_SECRET` as secrets on the existing `englishcamp` Worker. Preserve the Azure, Gemini and D1 settings. Deploy the matching Worker code before activation.
7. Test the public EnglishCamp flow with an approved synthetic QA take, confirming its fingerprint matches the returned feedback, then recheck Microsoft playback. Rotate or remove dedicated test credentials that are no longer needed.

The production API must continue returning `available:false` until the remote engine is deployed, genuinely tested and configured. Local adapter tests stub the model and do not establish engine accuracy or a successful deployment.

## Live engine verification — November 13, 2026

The deployed service passed real inference using a fixed synthetic Microsoft sentence, with no personal microphone recording. A matching line scored 85.8/100, while the same audio against a different reference scored 2.35/100 and returned word-level sound feedback. Both result payloads passed the site's strict schema and recording-fingerprint validation. Silence and seeded noise returned 422 with no practice score.

A 27.4-second synthetic take finished in 74.73 seconds after a cold start; short warm requests took about five seconds. These are observations, not latency guarantees. The Worker retains its 90-second timeout, and local recordings remain available on a timeout or provider failure. The engine warmup uses the same explicit checkpoint argument as inference to avoid loading a duplicate model into a second cache entry.

Unauthenticated requests returned 401 at the Modal proxy, and requests with a proxy token but without the adapter bearer key also returned 401. The account dashboard showed $0.00 total spend, with usage covered by its recurring credit and the provider-locked $1 limit still in force. No payment method was added.

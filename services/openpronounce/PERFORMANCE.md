# OpenPronounce optimization verification

Measured on November 13, 2026. The optimized Python service is deployed to the existing protected Modal endpoint used by the live EnglishCamp Worker. No UI, lesson content, Worker code, learner progress schema, Microsoft voice, credentials or billing settings changed in this optimization.

## Changes

* Share one ASR forward pass between the existing acoustic embeddings and CTC transcription head.
* Bake reference embeddings for the 80 exact published practice/shadowing lines into the image. Validate the text hash, checkpoint, sample rate, synthesiser and voice before cache reuse. Keep at most 32 reference arrays in the in-process cache. New references retain an uncached fallback.
* Remove unused pitch/energy and legacy text-phoneme plot calculations. The dedicated phone recogniser still supplies the returned sound feedback.
* Run complete inference warmup on a fixed public sample before Modal takes the CPU memory snapshot.
* Change the memory request from 12 GiB to 4 GiB, with an 8 GiB hard limit, and cap CPU at the existing two requested physical cores. Keep zero minimum containers, one maximum container and the five-second idle window.

Model weights, float32 precision, decoding, scoring formula and phone comparison are unchanged. Only authored reference data is prepared or cached; learner recordings, transcripts and results are not cached.

## Real-model comparison

Baseline image: `im-dEsqqsSRcDnMyXURFHiry4`. Candidate/deployed image: `im-HoZmz0aDveLCQ7RxJeUw06`. Both use OpenPronounce commit `74bc17ea406e6f057f15eea0e70951e1931af868`, `facebook/wav2vec2-large-960h` and `facebook/wav2vec2-lv-60-espeak-cv-ft` on CPU. Actual image packages include Torch 2.9.1 and Transformers 4.57.6.

The paired comparison runs the original and optimized pipelines in the same two-core container with the same fixed reference waveform. It includes six fixed synthetic spoken lines, a wrong reference, a short/punctuation reference and a repeated 27.4-second take. All nine cases had score difference **0.0**, exactly matching transcripts and exactly matching phoneme error objects.

| Measurement | Baseline | Optimized |
| --- | ---: | ---: |
| Mean short inference, five cases after legacy initialization | 5.51 s | 2.79 s |
| 27.4-second take, paired inference | 26.13 s | 16.64 s |
| First observed public request after deployment | 52.20 s | 30.59 s |

The short paired result is a 49.4% time reduction; the long result is a 36.3% reduction. The public measurements include different startup/network conditions, so their 41.4% difference is observational. The first paired legacy call is excluded from the short mean because it also initialized legacy modules; it took 31.72 seconds versus 3.08 seconds for the optimized call, an unfair warm/cold comparison.

Subsequent requests after waiting longer than the five-second idle window completed in 18.41 seconds at the protected backend and 10.56 seconds through the public Worker. Waiting beyond the idle window does not prove a new container was created: scale-down and snapshot restoration depend on provider scheduling. These measurements show the actual user-facing path works after inactivity; none is a latency guarantee.

A separate optimized-only trial requested 4 GiB with an 8 GiB cap. Peak process RSS was 3307.4 MiB after warmup and 4336.8 MiB across nine cases including the uncached-reference fallback. A separate maximum 33-second input completed in 20.34 seconds with peak RSS 4104.7 MiB. RSS measures this process, not the provider's total billed container memory; the safety cap allows for that difference.

These are synthetic regression and performance checks, not human-accent validation or proof of clinical/CEFR assessment accuracy. Precomputing Piper output also fixes the reference realization; an older deployment that synthesized a fresh stochastic reference can produce a slightly different historical score. The paired equality claim applies when both pipelines use the same reference waveform.

## Production integration

The live `/api/pronunciation` returned an available configuration and a genuine assessed result with the exact recording SHA-256 and valid site schema. Missing consent and an unrelated origin returned 403. Silence returned 422 without a score. Actual Microsoft playback returned a 23,904-byte MP3. Existing authentication, upload limits, timeout handling, one-at-a-time inference and D1 rate limits remain intact.

The 13 local adapter/cache tests and 307 application tests passed; TypeScript and diff checks passed. These tests are distinct from the live model and production checks above. The Docker recipe includes the new engine and reference build, but was not separately built in this optimization; the Modal image was actually built, executed and deployed.

## Estimate for the same $1 allowance

Rates checked November 13, 2026: $0.0000131 per physical CPU core-second and $0.00000222 per GiB-second. Modal bills the higher of requested or actual CPU/memory usage. Sources: [Modal pricing](https://modal.com/pricing), [resource billing and limits](https://modal.com/docs/guide/resources), [memory snapshots](https://modal.com/docs/guide/memory-snapshots).

At the resource reservations:

```text
Old: 2 × $0.0000131 + 12 × $0.00000222 = $0.00005284 / second
New: 2 × $0.0000131 +  4 × $0.00000222 = $0.00003508 / second
```

This is a **33.6% reduction in the base reserved rate**, before the faster processing. Memory above 4 GiB costs extra up to the 8 GiB safety cap. A rough 23–36 second lifecycle, including inference/startup and the idle window, implies around 790–1,240 isolated short corrections per full $1 at that base rate. Allowing for longer takes and memory overhead, use **roughly 700–1,200 per month across all users** as a planning range, not a guaranteed quota. A workload dominated by maximum-length takes can do fewer; warm consecutive requests can do more. Builds, development tests, retries and other account usage also consume the same allowance, including this month's validation work.

The existing global limit of 100 pronunciation requests per day and per-IP limits remain unchanged. The cardless account still has its provider-locked $1 monthly limit; no payment method, plan upgrade, budget increase or keep-alive task was introduced.

## Reproduce without learner data

Use Python 3.12, the authorized private Modal profile and fixed synthetic mono 16 kHz PCM16 WAVs. Deployment credentials stay outside Git. `profile_modal.py` starts ephemeral private benchmark functions; it does not deploy or change the production endpoint. Benchmarks consume credit, so avoid running them on every push.

The profiler reads the baseline waveform at `.camp-cache/modal-hosting/qa-introduce-canonical.wav`. Paired/optimized runs also read `.camp-cache/modal-hosting/optimization-fixtures/cases.json`: an array of objects with `case`, `file` and `reference`, with WAV files in the same fixture directory. These local fixtures are intentionally excluded from Git. No microphone recordings or learner information are needed.

From the repository root:

```sh
node services/openpronounce/collect_references.cjs
python -m unittest discover -s services/openpronounce -p 'test_*.py'
modal run services/openpronounce/profile_modal.py --mode paired
modal run services/openpronounce/profile_modal.py --mode optimized
modal run services/openpronounce/profile_modal.py --mode maximum
```

The default benchmark image is the candidate defined by `modal_app.py`; set `BENCHMARK_IMAGE` to an existing image ID to profile that version. The original baseline uses `--mode baseline` with the old image ID. The paired comparison asserts score, transcript and phone-error equivalence, while optimized/maximum modes measure the smaller memory request. The profiler writes numeric reports under the workspace's `outputs/openpronounce-optimization-2026-11-13` directory. Keep fixture audio and private configuration out of source control.

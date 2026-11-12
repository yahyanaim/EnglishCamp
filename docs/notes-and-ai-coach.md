# Lesson notes, English coach and pronunciation integration

The existing palette, typography, course content and YouTube frames are retained. The English coach uses the existing reading-fox mascot and appears in the main navigation at `/english-coach`.

## Notes

Online profiles synchronize saved lesson notes through authenticated Cloudflare D1 endpoints. The original notes/bookmarks store is retained. Existing local notes are imported when the online profile connects. Device-only profiles remain local. Four changes are sent per batch, with independent operation IDs and revisions, so retries do not repeat edits. Clearing a note leaves a tombstone. Another device's newer text cannot be overwritten silently: both versions remain visible for explicit selection. Oversized legacy notes stay local instead of being truncated.

Apply `0003_lesson_notes.sql` before deploying this code. The notes and operation rows cascade only when their owning profile is explicitly deleted. Notes are not included in AI requests or in the progress-statistics payload. See [the D1 guide](cloud-progress.md).

## Gemini conversation coach

`GEMINI_API_KEY` is a server-only secret. It never belongs in a `NEXT_PUBLIC_` variable, GitHub source, a client bundle or a browser request to Google. Keep the Google project on its Free tier with billing unlinked if a paid service is not desired. Google controls the actual free quotas and can reject requests; using a free-eligible model does not override the project's billing configuration.

The default is `gemini-3.5-flash-lite`, verified against the project's real key. Configuration accepts a small allowlist of documented free-eligible models. A 503 busy response can make one attempt with a second documented free model; a quota rejection never triggers model switching or a paid-model upgrade. D1 enforces additional per-IP and global request limits. There are no browsing, code-execution or third-party tools attached to the model.

The learner chooses a life situation and language level, accepts the adult-only Google data notice, then sends a message or a selected short recording. The model receives only that conversation and the selected settings. It never reads the notes, account name, D1 learner profile or other learners' chats. The coach replies naturally, offers at most one useful language correction and can be heard using the existing Microsoft voice button. Voice replies use selected audio as input; no microphone capture starts automatically.

Conversations remain in the current page's memory and are not saved in D1. The free API's data terms can permit Google to use submissions for product improvement, depending on account and region. The interface makes this visible before sending. Adults only reflects the current Gemini API terms. Refusals, busy servers, timeouts and invalid responses preserve the draft and never create a fabricated reply or score.

Apply `0004_ai_limits.sql`, configure the Gemini key as a Cloudflare Worker secret and deploy through the established workflow. A live service check must test a real response; passing a stubbed transport test alone is insufficient.

## Verification

The release includes 295 application tests and two font-bundling tests, TypeScript checking, the complete static course export and the Worker dry run. Six Python adapter tests cover the transport with a stubbed engine; they do not establish real pronunciation inference.

Two separate browser origins restored the same test profile and retrieved its lesson note. A draft started before another device's edit retained its original revision: saving it displayed both versions, and the selected version synchronized successfully. The conversation page received a real Gemini reply and corrected “Yesterday I go” to “Yesterday I went”. A separate real audio request transcribed a fixed, authored learning recording. Responsive checks include a 320 CSS-pixel conversation viewport. Temporary provider overloads preserve the draft and show an error instead of inventing a result.

The first GitHub build encountered a Google Fonts URL-format failure in Next.js's remote font loader. The same four font families and versions are now bundled as WOFF2 with their licences, retaining the original requested weights, variables and fallback lists. No Google download is needed during deployment. See [font provenance and checks](../src/assets/fonts/README.md).

## OpenPronounce

OpenPronounce is integrated with the read-aloud practice in Pronunciation and selected Shadowing lines. It returns word/phoneme feedback against the authored sentence, not general spontaneous-speaking CEFR grades. The existing OpenAI placement rubric is not replaced with a pronunciation percentage. The repository's engine is pinned and wrapped by the authenticated CPU service under [services/openpronounce](../services/openpronounce/README.md).

There is no CPU host configured yet. `OPENPRONOUNCE_URL` and `OPENPRONOUNCE_TOKEN` deliberately remain unset; recording/replay and Microsoft audio continue to work. Deploy and verify that service before enabling uploads. The service setup guide explains an eligible free VM option and its availability limits.

## Primary references

- [Gemini pricing and free-eligible models](https://ai.google.dev/gemini-api/docs/pricing)
- [Gemini API terms and data use](https://ai.google.dev/gemini-api/terms)
- [Gemini content generation](https://ai.google.dev/api/generate-content)
- [OpenPronounce source and limitations](https://github.com/Halleck45/OpenPronounce)
- [Cloudflare Worker resource limits](https://developers.cloudflare.com/workers/platform/limits/)

# Automatic speaking placement and skill-based planning

Implemented 4 November 2026. Existing courses, mock papers, Microsoft narration, fonts, theme and learning rewards remain unchanged.

## Assessment flow

The optional placement check retains its 40 language/reading questions and 10 scored listening questions. Each of five speaking tasks can now be recorded, replayed and submitted for automatic assessment. Learners no longer grade themselves. Earlier self-review records remain readable but never count as measured speaking evidence.

After a learner explicitly approves each submission, the browser converts its saved recording to mono 16 kHz PCM WAV and sends it with the fixed task identifier. The server supplies the authored prompt and asks an audio-capable OpenAI model to listen to the actual recording. It evaluates task achievement, intelligibility, fluency/coherence, grammar and vocabulary, with evidence and actionable feedback. It does not infer personal traits or require a native accent. Text transcription alone is not used to evaluate delivery.

Silence, unsupported audio, short or oversized recordings, provider errors, incomplete responses and invalid scores produce an error without a fabricated grade. Each accepted result is bound to its task, rubric version and SHA-256 audio fingerprint. A result from an abandoned request or another named session cannot overwrite the current learner. A new take clears old feedback when saved. Mock exam recording still uses its existing local-only behavior.

## Starting-point rules

These are transparent authored study rules, **not a validated CEFR instrument**. Calibration against independently rated learner samples remains necessary before making proficiency claims.

- Language/reading: the original 40-item band rules are preserved.
- Listening: at least the six A1–B1 items must be answered. Advancing to a band requires both items in that band correct, with at least one correct in each lower band. Skipped audio is unassessed, not a wrong answer.
- Speaking: language dimensions use an ordinal 0–5 study rubric. A task cannot establish a level above its demand. The dimension mean is floored and capped at one band above the weakest dimension. Relevant task achievement is required. At least two assessed recordings are needed; advanced placement needs supporting performance on two suitably demanding tasks. Below-A1 evidence recommends A1 foundations rather than inventing a lower precision score.
- Combined starting point: the lowest supported language/reading, listening and speaking band is used as a support-first study base. The profile explicitly says **partial** if listening or speaking lacks sufficient evidence. Higher scores in one skill never cancel a gap in another.

The timetable gives stronger skills material at their own level, adds extra listening **and** speaking sessions when indicated, and targets the weakest measured speaking dimension. Session duration still adds up exactly. Calendar exports carry the same difficulty, tasks and time allocation. Finishing a new placement creates a fresh timetable identity so old checked sessions are not falsely applied to changed work; previous results and completion records are retained.

The on-screen result, certificate preview and downloadable PDF use the same combined/partial recommendation. Skipped skills never become certificate claims.

## Enable the service

The current local environment has **no assessment API key configured**, so real provider scoring is unavailable until the site owner enables it. The interface reports this clearly and preserves local recordings; there is no simulated scorer or browser-speech fallback.

After approving the provider, add these to the server's private `.env.local` (or deployment secret manager), then restart the server:

```
OPENAI_API_KEY=<your separately billed API key>
ENGLISHCAMP_SPEAKING_ENABLED=true
```

Do not use a `NEXT_PUBLIC_` variable or paste a key into chat. Optional `ENGLISHCAMP_SPEAKING_MODEL` defaults to `gpt-audio-1.5`; use an audio-capable Chat Completions model. `ENGLISHCAMP_SPEAKING_HOURLY_LIMIT` defaults to 30 submissions per process, with at most two simultaneous requests. A multi-instance public deployment should use shared quota enforcement. The API checks same origin, explicit consent version, bounded request streaming and canonical WAV structure. Secrets and provider error bodies are never returned to the browser.

## Privacy

Recording does not upload anything. The separate assessment action sends the selected recording and fixed prompt to OpenAI through the EnglishCamp server; no account name field, other test answers, notes or earlier recordings are included. The selected audio can itself contain anything the learner says, including their name. The server does not write uploads or transcripts to disk and does not log their contents. Requests use `store:false`. Results and transcripts are saved with the named tab session. The consent notice links OpenAI's data policy and states its standard abuse-monitoring retention of up to 30 days. This is distinct from Microsoft neural narration consent.

## Sources checked

- [OpenAI audio input in Chat Completions](https://developers.openai.com/api/docs/guides/audio-chat-completions)
- [Audio model capabilities](https://developers.openai.com/api/docs/models/gpt-audio-1.5): audio input and function calling; strict structured outputs are not supported, so returned JSON is independently validated and rejected on failure.
- [OpenAI API data controls](https://developers.openai.com/api/docs/guides/your-data)
- [Council of Europe CEFR descriptors](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors)

## Verification

Automated tests cover positive and negative provider responses using a stub transport, WAV conversion/validation, consent/configuration boundaries, legacy storage, multi-skill placement, plan difficulty and calendar parity. No learner recording is sent to a real provider during these tests. Real assessment quality cannot be verified without a configured API key and approved evaluation samples; passing the integration tests is not evidence of CEFR calibration.

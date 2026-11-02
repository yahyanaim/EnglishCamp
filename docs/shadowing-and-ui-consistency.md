# Shadowing and UI corrections

1 November 2026.

Practice artwork is now a small (30 px), centered icon inside each shared practice card. The companion column and large header scenes have been removed. Vocabulary and Flashcards use the violet control, border and spacing system. Flashcards retain the existing data, review intervals and progress keys; their study view is a flat, accessible reveal card.

The weekly report uses an explicit surface/text pairing. Examination-track rows use their own query parameter to determine the current exam, so they no longer all appear selected. The rows retain full labels, use a light border indicator for the active exam, and show the exam type beneath the title. Sign-in uses the established illustrated brand and icon family.

Study Strategies includes an interactive four-stop journey: choose, notice, try and return. Existing strategy text and Arabic remain available. The IELTS/TOEFL guides now link named resources to their publishers. The guide distinguishes commercial Cambridge books from official free samples.

See [the subsequent workspace and named-progress update](shadowing-workspace-and-learners.md) for the current two-column layout, recorder, progress isolation and level celebration.

## Shadowing English

`/shadowing-english` has four starter lessons with suggested A1, A2, B1 and B2 practice levels. Each has a YouTube video shorter than two minutes, selected matching practice lines, Arabic meanings, Microsoft pronunciation models, clickable word spelling and a local listen-and-spell check. These are editorial practice levels, not official publisher CEFR classifications. Selected lines are explicitly labelled; not every lesson reproduces the full video transcript.

| Practice level | Video | Verified duration |
| --- | --- | --- |
| A1 | [VOA: Pronunciation Practice, Lesson 1](https://www.youtube.com/watch?v=65iWtWqWmgY) | 29 seconds |
| A2 | [VOA: Pronunciation Practice, Lesson 2](https://www.youtube.com/watch?v=C_HDrYHJrzo) | 31 seconds |
| B1 | [VOA: Break the Ice](https://www.youtube.com/watch?v=Tn7a8Cv64B4) | 60 seconds |
| B2 | [VOA: Dish It Out but Can’t Take It](https://www.youtube.com/watch?v=J8EWSLZ36s0) | 60 seconds |

Durations and publisher identities were checked in the YouTube player on 1 November 2026. The B2 selected dialogue lines were checked against the on-screen subtitles. The beginner examples also appear in VOA’s lesson descriptions/teacher scripts. Break the Ice’s teaching transcript is available in the [reference practice lesson](https://shadowingenglish.com/practice/english-in-a-minute-break-the-ice-z_PB9BA288GjELlR). The interface is original EnglishCamp UI, not a copy of that site.

[VOA’s terms](https://learningenglish.voanews.com/p/6021.html) identify exclusively VOA-produced text, audio and video as public domain. Selected teaching text is credited to VOA. Videos remain in the YouTube player and retain original human narration. No video files are downloaded or redistributed. See the [official iframe API reference](https://developers.google.com/youtube/iframe_api_reference) for player integration.

## Microsoft-only speech

All synthetic pronunciation controls use the shared Microsoft neural player. Existing course/mock recordings and the 884 local practice clips are retained. Missing clips are generated on demand and cached privately on the server/device running the app. Sonia voices English; Zariyah voices Arabic. Browser SpeechSynthesisUtterance is no longer used as a fallback.

Install `requirements-voice.txt` in a Python environment and set `ENGLISHCAMP_TTS_PYTHON` in `.env.local` if the interpreter is not `python3`. The local preview is configured to use the same installed edge-tts 7.3.1 environment as the existing recordings. This Python helper is required for missing clips on a fresh deployment; pre-generated clips work without it. [edge-tts documentation](https://github.com/rany2/edge-tts).

The server recognizes fixed authored learning text from `speech-catalogue.json`, regenerated with `node scripts/collect-speech-catalogue.cjs`. Text outside this catalogue is treated as personal and is sent to Microsoft only after the learner approves the displayed text. Notes, answers and recordings are never automatically included. The cache stores hashed filenames and audio, not learner names or request-text logs. No paid speech credentials are required by this local implementation.

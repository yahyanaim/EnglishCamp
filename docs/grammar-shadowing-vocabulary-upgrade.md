# Grammar, shadowing and everyday vocabulary

The update keeps the existing fonts, accent settings, course and mock-exam banks, progress stores and YouTube frame styling.

## Grammar and Arabic

- The 38 teaching paragraphs and tips on `/grammar`, plus the introductory paragraph, show authored Arabic translations through paragraph hover, keyboard focus or tap. There is no added translation button or permanently expanded Arabic text. Tooltips render outside clipped accordion panels and fit a 320 px screen.
- `/linking-words` uses RTL, right-aligned Arabic for both the example translation and the linking-word definition. Latin expressions remain isolated in LTR, including paired forms such as `so...that`.
- The original grammar rules, tables, examples and disclosure state are preserved.

## Shadowing

The library contains 27 choices: the original 12 everyday videos and 15 attributed IELTS/TOEFL practice excerpts. CEFR badges have been removed from video thumbnails. Equal-width thumbnail tracks keep every row aligned, with a 104 px track on phones. Collection and skill filters cover IELTS and TOEFL Reading, Listening, Writing and Speaking.

IELTS coverage includes Speaking Parts 1–3, Listening, Reading, Academic Task 1, General Training Task 1 and Task 2. TOEFL coverage includes all current task families: Complete the Words, Read in Daily Life, Read an Academic Passage, Choose a Response, conversations, announcements, academic talks, Build a Sentence, Write an Email, Academic Discussion, Listen and Repeat and Take an Interview. Reading/Writing clips explain task strategies; they are not substitutes for completing written course tasks.

Video-linked practice uses the YouTube IFrame API clock. Timed line selection seeks the player; normal playback updates the sentence and its spelling; Replay plays a selected timed line once; caption gaps do not show a false sentence. Repeated occurrences retain their original line identity. Loading and selecting a line preserve paused playback. Microsoft model pronunciation remains a separate control and pauses the video. Timers and player instances are disposed on lesson changes.

Exam excerpts use source caption timings. Short quoted selections are limited to 25 words per source video. Full videos remain embedded/linked from their publishers. Practice excerpts are under two minutes and are labelled as excerpts.

For the older VOA videos, the original publisher media was checked locally using Apple video decoding and on-device recognition of visible captions at 250 ms intervals. No learner audio was used or uploaded. The original text is preserved except one corrected omission: “a twin” becomes “a twin brother” in the No Brainer dialogue, matching the source. The isolated “Thank” and “Now you try it. Say your name.” remain labelled **Model**, because sentence timings could not be verified. The thank-you short uses its displayed phrase as a **phrase focus**, not a fabricated full transcript.

The same YouTube frame is retained. A stalled privacy-enhanced embed offers an explicit retry with the standard YouTube host. The recording workflow and local learner storage are unchanged.

## Everyday vocabulary

The cheat sheet adds 103 original vocabulary cards in ten collapsed topics: body, colours, home, family, café, office, airport, clothes, time and months. Each has an English term, Arabic meaning, simple contextual example and a semantic SVG illustration. Clocks show the actual labelled time, calendars show month order, family trees highlight the named relative, and body illustrations highlight the named part. Colour swatches use real teaching colours; they do not change the site's accent palette.

Expand all, Collapse all and browser Print/PDF include the new topics. The existing downloadable grammar-only PDF remains available under the explicit label **Download grammar PDF**.

## Source checks

Current test categories were checked against [ETS TOEFL content](https://www.ets.org/toefl/test-takers/ibt/about/content.html), [ETS 2026 specifications](https://www.in.ets.org/content/dam/ets-org/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf) and [British Council IELTS Speaking](https://takeielts.britishcouncil.org/en-cm/what-is-ielts/how-it-works/test-format/speaking). Player behaviour follows the [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference).

Source identities are retained in `shadowing-exams.ts` and `shadowing-timings.ts`. Exam publishers are IELTS by IDP, British Council, IELTS Official, Oxford Online English and TST Prep TOEFL. The Academic Discussion excerpt avoids the older video's retired-format introduction; the task itself remains current. The British Council Listening excerpt excludes its paper-only answer-transfer advice.

## Verification

- 208 tests pass, including unchanged course/mock/scoring contracts, exact original everyday lesson preservation with the one reviewed word correction, all exam-category coverage, cue gaps/boundaries/repeats, vocabulary diagrams, translation coverage and RTL isolates.
- TypeScript and the production build pass.
- Live browser checks cover grammar focus/tap translations, Linking Words RTL, card/thumbnail alignment, exam filtering, YouTube playback and line/spelling synchronization.
- Desktop and 390/320 px phone checks use a separate QA origin. No learner progress is written during the UI checks.

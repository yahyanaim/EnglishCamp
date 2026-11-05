# Vocabulary, placement and study-planning upgrade

## What changed

**Vocab & Speaking:** all 14 pages in that navigation group were audited. The 12 pages using older flat headings now share the website banner, return-button placement, palette, card spacing, controls and small vector artwork. Vocabulary and British vs American retain their already shared layouts. Reference detail views use one local Back button below the banner. Pronunciation tabs wrap on phones, Arabic blocks retain RTL direction, and custom flashcard flipping is keyboard accessible. The non-functional German-case selector on Verbs and Prepositions was replaced by a working filter for the prepositions actually in the bank.

**Placement:** the original 40 language-use, vocabulary and reading items remain unchanged. The optional check now also has 10 listening questions and five speaking tasks, with saved progress between sections. Listening reuses the existing Microsoft neural recordings. Choices unlock after playback, transcripts and answers appear in the completed review, and unavailable audio can be explicitly left unassessed. Skipped items are excluded from the listening score.

Speaking uses the existing local microphone-recording engine, followed by three task-specific reflection criteria. It is **self-reviewed**, not automatically given a CEFR score. Stored recordings can be replayed locally. No learner recording is uploaded. The original level estimate remains a language-use/reading estimate; listening and speaking are reported separately and inform practice priorities. The certificate states that distinction and includes unassessed listening counts. Older saved results remain readable without fabricating new skill results.

**Study plan:** A1, A2, B1, B2 and C1 have distinct aims, habits, four-week teaching sequences, concrete outputs and readiness checks. Learners choose a 4-, 8- or 12-week window, study days, time, session length and goal. Each session combines recall, focused practice, spoken or written output and correction. Lower-level materials follow the weekly topic; beginners are not automatically sent to advanced exam lessons. Listening evidence and speaking reflections can prioritise extra practice. Learners can adjust plan difficulty without changing their test result.

Session checkmarks belong to the signed-in name and survive reloads and timetable edits. Changing the learning level or goal creates a separate plan. Checkmarks organise the timetable; they do not falsely complete course lessons or generate examination scores. Calendar export produces an `.ics` file with dates, durations, activity links, weekly outputs and checkpoints. It does not connect to or modify a calendar account.

**Words:** the original 103 words and ten topics are preserved exactly. Added 104 words across Food and groceries, Weather and seasons, Getting around, Places in town, People and jobs, Feelings and needs, Everyday actions, Numbers and quantities, Days of the week and Animals around us. The reference now contains **207 illustrated words in 20 topics**, still inside the single collapsed Words category. Every new entry has an Arabic meaning and contextual example. The drawings follow the selected accent; their neutral drawing surface keeps them legible in dark mode. Real colour swatches retain their teaching colours.

**Mock exam:** removed the inner maximum-width constraints from the selection and exam views. The content fills the available column and retains the site's normal side gutters. Question banks, scoring, timing and saved attempts are unchanged.

## Planning research

The teaching sequences and tasks are original EnglishCamp content informed by these primary sources:

- [Council of Europe: CEFR levels and can-do descriptors](https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions) — used to distinguish the communicative aims at each level.
- [British Council: listening by level](https://learnenglish.britishcouncil.org/free-resources/listening) and [speaking by level](https://learnenglish.britishcouncil.org/free-resources/speaking) — used to match task types and support to learner difficulty.
- [British Council: Planning your English learning](https://learnenglish.britishcouncil.org/english-levels/improve-your-english-level/planning-your-english-learning) — supports realistic time commitments, smaller goals, specific activities, calendar planning and periodic review.
- [Cambridge English: Guided learning hours](https://support.cambridgeenglish.org/hc/en-gb/articles/202838506-Guided-learning-hours) — cumulative guided-study estimates vary by learner and are not a promise of progress within a short self-study timetable.

The precise session allocations, review intervals and weekly projects are implementation choices, not official CEFR prescriptions. No third-party lesson text, examination questions or illustration assets were copied.

## Verification

| Check | Result |
| --- | --- |
| Automated tests | **227 passed; 0 failed** |
| TypeScript, production build and diff whitespace | Passed |
| 14 Vocab & Speaking routes | Shared banner and one visible Back control; no horizontal overflow on desktop, 390px and 320px layouts |
| Reference detail states | Idioms and verb/preposition details retain one local return control; the preposition filter returns the expected entries |
| Real listening playback | Existing neural MP3 played to completion; the answer choices unlocked and the answer was saved |
| Placement flow | 40-item core, separate listening result, explicit audio/speaking skips, final result and named certificate verified through the UI |
| Profile separation | An English QA learner and an Arabic-name QA learner retained separate results; returning to the English name restored its plan |
| Plan UI | Eight weeks generated 40 sessions; a checked session survived reload; changing the study time preserved the selected C1 plan and the checkmark |
| Calendar file | 40 valid events, correct Europe/Paris local-time conversion, end times, activity URLs, weekly outputs and checkpoints; no attendees |
| Words | 207 figures and 207 SVG illustrations; 20 topics; no narrow-phone overflow; original 103 entries unchanged |
| Palette and dark mode | New drawing colours resolve to actual theme variables; green/dark and violet/light checked visually |
| Mock exam | At 1920px, the inner content filled its 1402px page column with no extra maximum-width margin; no overflow at 320px |
| Certificates | English and Arabic-name PDFs downloaded, rendered and visually checked; single-page landscape layout and accurate skill-scope text |
| Local routes | 36 HTTP checks across ports 3027 and 3030 returned 200 |
| Fresh browser console | No warnings or errors on the final inspected pages |

Speaking uses the existing tested recorder; live microphone capture was not repeated in this pass. New validation tests cover partial reflections, missing recordings, unassessed items, saved-record compatibility and priority selection. The check remains low-stakes and unstandardised.

Byte comparison checked 176 existing data, state, storage, font and dependency files. Only the authorised additive Words data and generated fixed-speech catalogue changed within that set. Course and mock-exam banks, state stores, named-session isolation, original fonts and dependencies remain unchanged.

Detailed measurements, logs, screenshots, protected-file hashes, QA calendar and rendered certificate samples are saved in the workspace's `outputs/vocab-placement-planner` folder.

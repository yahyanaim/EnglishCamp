> Historical baseline: this audit describes the abbreviated mocks before the content 2026.2 rebuild. For the current papers and remaining limitations, see [the upgrade report](mock-exam-upgrade.md).

# Mock-exam audio upgrade and official-format alignment audit

Reviewed: 30 October 2026. Source baseline: commit `90d7834`.

## Outcome and scope

The mock listening player now uses four bundled Microsoft neural recordings generated through the same pipeline as the course narration. IELTS Academic and General Training share the two IELTS recordings. The four original scripts, questions, answers, section definitions, scoring functions, writing tasks and speaking prompts are unchanged. All 329 existing JSX class/style attributes on the mock page are preserved, as are the site's fonts, colours, course content and course recordings.

This audit concerns the **mock examinations**, not the completeness of the 100-lesson curriculum or a learner's chance of obtaining a certificate. The current mocks are useful shortened practice samples, but they do not reproduce a complete official examination. Better voices improve the listening experience; they do not close the structural or assessment gaps below.

## Estimated similarity

These are editorial estimates of how closely the implemented mock experience matches the public test blueprint. They are not official percentages, measured psychometric equivalence, copied-question percentages or validated score predictions. Treat each estimate as approximate, with uncertainty of roughly ten percentage points. No access to confidential live examination questions is claimed.

| Certification | Estimated overall mock alignment | Principal reason |
| --- | ---: | --- |
| IELTS Academic | **About 45%** | Recognisable writing tasks and speaking structure, but substantially shortened listening/reading, permissive delivery and unassessed productive skills. |
| IELTS General Training | **About 40%** | Appropriate letter/essay practice and everyday/workplace reading, but the third reading section and much of the listening blueprint are absent. |
| TOEFL iBT, format used from 21 January 2026 | **About 30%** | Some current task families are represented; key families, adaptive modules, item-by-item speaking delivery and independent scoring are missing. |
| Cambridge B2 First | **Not rateable: no dedicated full mock exists** | `/b2-pruefung` is a guide, not an examination engine. Full-mock availability is therefore 0%; this is not a 0% rating of the B2 course. |

The estimates use this explicit, judgement-based rubric. Scores describe the current implementation after the audio upgrade; they are rounded to the nearest five points for the headline estimates.

| Criterion | Maximum points | Academic | General Training | TOEFL |
| --- | ---: | ---: | ---: | ---: |
| Section structure and sequence | 20 | 12 | 10 | 8 |
| Task-family coverage and implementation | 25 | 18 | 17 | 12 |
| Question volume, reading/listening load and progression | 20 | 5 | 4 | 4 |
| Delivery, timing and response capture | 20 | 7 | 7 | 4 |
| Assessment and score validity | 15 | 2 | 2 | 1 |
| Total | 100 | 44 | 40 | 29 |

Credit is given for working practice interactions and recognisable task formats. Major deductions reflect missing material and behaviours, rather than visual polish. The score-validity category receives very little credit because writing and speaking responses are not assessed.

## Evidence from the repository

The live registry in `src/data/mock-exam.ts` contains three examination variants, each with one fixed set. There is no adaptive item bank or alternate full paper. Word counts below use whitespace-delimited tokens and include passage headings; they are approximate reading-load indicators.

| Implemented feature | IELTS Academic | IELTS General Training | TOEFL iBT |
| --- | --- | --- | --- |
| Listening | 2 sections, 10 questions | Same 2 sections, 10 questions | 2 sections, 8 questions |
| Reading | 2 passages, 12 questions, about 661 words total | 2 sections, 12 questions, about 472 words total | 2 sections, 10 questions, about 357 words total |
| Writing | Visual Task 1 and discursive Task 2; suggested 20/40 minutes; 150/250 words | Letter and essay; suggested 20/40 minutes; 150/250 words | Email and discussion; suggested 10/10 minutes; no Build a Sentence tasks |
| Speaking | 3 prompt groups, preparation/response timers | Same as Academic | 3 repeat sentences and 1 interview question, grouped into 2 timer stations |
| Timer enforcement | One 165-minute global timer | One 165-minute global timer | One 120-minute global timer |
| Spoken response capture | Simulated countdown only | Simulated countdown only | Simulated countdown only |
| Assessed writing/speaking | Neither | Neither | Neither |

### IELTS Academic

The official listening blueprint has four parts of ten questions, using social and educational contexts. Recordings are heard once. This mock contains only the social accommodation conversation and a public monologue: 10/40 items, or **25% of the official listening question count**. The educational discussion and academic lecture parts are missing. Pause, replay and speed controls remain available. These controls are helpful for study but differ from test delivery. [IELTS listening format](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening)

Academic reading officially has three sections, 40 questions and 2,150–2,750 words in 60 minutes. The mock has two passages and 12 questions: **30% of the question count**, with about 24–31% of the official total word load. TFNG, headings, sentence completion and multiple choice are represented. Several question families and a full third passage are absent. [IELTS Academic reading format](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading)

Writing is the strongest structural match: a rendered line graph and an essay, with the familiar 150/250-word targets and 20/40-minute guidance. Official writing takes 60 minutes, and Task 2 has twice Task 1's assessment weight. Here the durations are suggestions under a global clock, and no writing assessment implements those weights or criteria. A live word counter is feedback, not an assessment of task fulfilment. [IELTS Academic writing format](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing)

Speaking recognisably follows familiar questions, a cue-card long turn and an abstract discussion. However, all questions are printed, no examiner conducts a responsive conversation, and the mock's `startRecording` function starts a countdown without `getUserMedia`, `MediaRecorder`, an audio blob or a saved response. Also, pressing preparation for a task configured with zero preparation seconds falls back to 60 seconds because the handler uses `value || 60`. Official speaking is an examiner-led interaction with three parts, including one minute to prepare Part 2. [IELTS speaking structure](https://ielts.org/news-and-insights/using-impromptu-speaking-tasks-to-prepare-learners-for-ielts-speaking)

### IELTS General Training

Sharing listening and speaking with Academic is correct. The two tests use the same listening/speaking formats and different reading/writing material. [IELTS General Training overview](https://ielts.org/take-a-test/test-types/ielts-general-training-test)

The everyday notices and workplace policy are relevant first- and second-section practice. However, the official reading test has three sections, 40 questions and 2,150–2,375 words. Its longer third text is missing here. The mock's 12 items cover **30% of the official question count**; approximately 472 words are about 20–22% of the expected total text load. [IELTS General Training reading format](https://ielts.org/take-a-test/test-types/ielts-general-training-test/ielts-general-training-format-reading)

The letter and social essay provide recognisable productive practice, but use the same unassessed global-timer approach as Academic. One fixed formal-letter example cannot establish broad coverage of personal, semi-formal and formal situations. The common speaking and scoring limitations apply equally to this variant. [IELTS General Training writing format](https://ielts.org/take-a-test/test-types/ielts-general-training-test/ielts-general-training-format-writing)

### TOEFL iBT, current 2026 format

ETS currently lists Reading, Listening, Writing and Speaking in that order, with approximately 50/47/12/11 items and base times of 30/29/23/8 minutes respectively; adaptive delivery can change timing and item counts. The app starts with Listening and permits free movement among skill tabs. Its 10 reading and 8 listening items are about **20%** and **17%** of those published counts. These are volume ratios, not equivalence scores. [ETS content and structure](https://www.ets.org/toefl/test-takers/ibt/about/content.html)

The implemented task-family comparison is:

| Skill | Represented | Missing or incomplete |
| --- | --- | --- |
| Reading | Complete the Words; academic passage | Read in Daily Life; multistage routing; complete module workload |
| Listening | Conversation; academic talk | Listen and Choose a Response; Announcement; multistage routing |
| Writing | Email; Academic Discussion | Build a Sentence; corresponding item set and section clock |
| Speaking | Texts labelled Listen and Repeat / Interview | Spoken stimuli, individual response capture, full item set and authentic preparation rules |

ETS's specifications describe two-stage adaptive Reading and Listening. This app uses the same fixed questions regardless of performance. [ETS 2026 specifications](https://www.ets.org/content/dam/ets-india/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf)

The official practice paper gives seven minutes for Email and ten for Discussion. It explicitly provides no preparation time for either speaking task. The mock's email guidance says ten minutes, adds its own 80–120-word instruction, and offers five/twenty seconds of speaking preparation. It shows the repeat sentences as text without a speaking-stimulus player; the four new recordings upgrade the existing listening section only. Adding new speaking delivery would require a separate functional change. [ETS current practice paper](https://www.ets.org/pdfs/toefl/toefl-ibt-full-length-practice-test-1.pdf)

### Cambridge B2 First

There is no B2 variant in `ALL_MOCK_EXAMS`. The sidebar's B2 link opens `/b2-pruefung`, which presents a guide and templates rather than timed response collection. Its heading names Cambridge B2 First, but its default section source is `IELTS_INFO`, an alias derived from `IELTS_GUIDE_CONTENT`. This is a pre-existing content-routing mismatch.

A complete B2 mock would need Reading and Use of English with seven parts/52 questions, Writing with two parts, Listening with four parts/30 questions, and a four-part speaking experience that accounts for interaction with another candidate. The guide's overview times alone do not provide that experience. [Cambridge B2 First format](https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/format/)

## Critical assessment findings

1. **Writing and speaking scores are placeholders.** In the IELTS result calculation, both are derived from the listening/reading average and clamped to 5.0–8.5. Neither depends on the written submission or actual spoken performance. TOEFL calls `calculateToeflScore` without productive-skill arguments, so writing and speaking default to 4.5 each.
2. **An empty attempt can produce a plausible overall score.** Executing the current calculation with zero correct listening/reading answers yields IELTS overall 4.0, including fabricated writing/speaking 5.0 values. TOEFL yields overall 3.0 and a displayed comparable score of 52, including its default 4.5 values. These are code-path demonstrations, not learner results.
3. **The score-conversion claims exceed the evidence.** The page claims official psychometric calibration, but the repository contains simple percentage thresholds and no item calibration, standard-setting evidence or learner validation study. IELTS itself notes that raw-score requirements vary between versions. Rescaling ten or twelve uncalibrated items to forty does not establish equivalence. [IELTS score explanation](https://ielts.org/take-a-test/your-results/ielts-scoring-in-detail)
4. **The speaking station does not record.** Its recording labels describe a simulated timer. In particular, the TOEFL Listen and Repeat task is not being presented as a listening-memory task when its entire stimulus is printed.
5. **Full-length and official labels are inaccurate descriptions of this implementation.** For example, the Academic selection card advertises four listening sections and three academic texts, while the registry contains two of each. No examination-board endorsement or official validation is established.

## Item and editorial issues to correct in a later content pass

- `ia-l1-3` accepts only `15th`, although its own explanation says both `15th` and `15` are acceptable. The exact-match answer checker rejects the latter.
- `igt-r1-1` treats being a university student as sufficient for a discount, but the passage specifies **full-time** status and documentation; the question does not establish either. Its TRUE key is under-supported.
- `igt-r1-5` describes a word and/or number answer, but only accepts `three`, rejecting the equivalent `3`.
- In Academic headings, the first item offers six options and the following items offer four rather than one consistent heading bank. The rendering also does not enforce heading uniqueness across answers.
- Several reading multiple-choice questions have three options; the official Academic reading description specifies four-option single-answer items. [IELTS Academic reading task descriptions](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading)
- Some model responses are labelled very highly despite visible editing issues, for example `an tranquil environment`. The assigned model bands are author labels, not externally rated performance.
- Some passages confidently assert scientific, health or statutory claims without provenance. A later editorial review should source and qualify those claims, or explicitly identify invented scenarios. No medical or legal accuracy is established by the present format audit.

These findings were recorded, not silently edited: the requested implementation change is audio only.

## Audio implementation

| Recording | Voices | Duration at 1.0× |
| --- | --- | ---: |
| Accommodation conversation | Sonia, British coordinator; Liam, Canadian student | 88.560 seconds |
| Reserve orientation | Ryan, British ranger | 69.648 seconds |
| Campus consultation | Ava, US professor; Andrew, US student | 83.712 seconds |
| Marine biology lecture | Andrew, US lecturer | 92.976 seconds |

The course recordings already use Sonia, Ryan, Ava and Andrew. Liam supplies the existing Canadian role label. Fourteen generated turns preserve the complete source wording, with 240 ms between dialogue turns. Output is mono 24 kHz, 16-bit PCM WAV, approximately 5.58 minutes in total. The existing speed selector remains; its 1.0× option's stored value was normalised so the displayed selection agrees with the numeric playback rate. Pause now resumes the same recording position, and leaving Listening, changing section, finishing or leaving the page stops playback. Only the fixed scripts were sent to Microsoft with the owner's explicit approval; learner material was not included. Playback uses local assets without a Microsoft connection.

`public/media/mock-exams/manifest.json` records exact text, roles, voices, script/file hashes and waveform metadata. Word-boundary metadata for all fourteen turns matched the input text after punctuation/entity normalisation. Waveform checks cover PCM completeness, duration, energy and clipping. These checks are not an independent speech-recognition transcription or a human pronunciation rating.

## Recommended order for any future exam upgrade

1. Replace unsupported overall/productive scores with clearly unassessed results until valid assessment is available; correct official/full-length claims and the B2 guide routing.
2. Correct ambiguous item keys and permitted answer variants.
3. Complete each official section's workload and missing task families, with appropriately reviewed original material.
4. Add enforced section/module timing, exam-mode playback/navigation rules and actual individual speaking response capture.
5. Add externally reviewed productive-skill assessment and conduct calibration/validation before making predictive score claims. A complete adaptive TOEFL simulation requires considerably more than new headings or percentage thresholds.

## Verification completed

- 100 automated tests pass, including exact script/role coverage, complete audio data, immutable mock data and preservation of all 329 page class/style attributes.
- TypeScript and the isolated production build pass. Lint has no errors and retains the 25 existing warnings; the new audio hook introduces none.
- All four served WAVs match their recorded SHA-256 values, have audio content types and support 206 byte-range responses. The three mock URLs and B2 guide URL return HTTP 200.
- Browser checks cover all four recordings across all three mock variants, real pause/resume, retained typed answers, section/tab cleanup, a recording reaching its actual end and live speed changes. The final 1.0× label and native playback rate agree. No console errors were captured in the final player tab.
- Of 602 previously tracked files, 600 remain byte-identical. The two modified existing files are the mock player page and its explicit preservation-test integration. The exam data, curriculum, course media, style files and learner-state code remain unchanged.

No broader curriculum, styling or assessment changes are part of this audio update. Changes are local and have not been committed or pushed. Verification evidence is recorded in the workspace's `outputs/mock-exam-audio-audit-2026-10-30/` directory.

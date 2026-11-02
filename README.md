# EnglishCamp

**Project version: 1.0.0**

**Documentation updated: 1 November 2026**

EnglishCamp is an English-learning web application with four structured exam-preparation courses, interactive practice, vocabulary tools and local learning progress. This README describes the current working tree, including the curriculum reconstruction, mobile fixes and neural course narration.

The version above is the existing package version recorded in both `package.json` and `package-lock.json`. No new release number was assigned for this documentation update.

## Course sufficiency: approximately 75%

**Editorial estimate: about 75 out of 100 for a comprehensive, independent self-study exam-preparation programme at the courses' stated entry levels.** Treat this as a rough 70–80% range, not a precise measurement.

This estimate comes from reviewing the implemented curriculum, practice structure and remaining limitations. It is **not** a learner pass probability, a proficiency score, an official exam-coverage percentage or a software-completion metric. It has not been validated through learner-outcome studies. The four courses have different demands; this overall estimate does not establish an independently measured percentage for each course.

The courses provide substantial teaching and structured practice. They are useful for guided study, but they still need broader practice and external feedback before they can be treated as a complete preparation solution.

| Area | Current position | Main remaining gap |
| --- | --- | --- |
| Teaching and scaffolding | Explanations, worked reasoning, smaller application steps and correction examples | Test whether learners can transfer the teaching to unfamiliar tasks |
| Practice sequence | Guided practice, independent practice and assessment in every module | More fresh parallel sets, mixed practice and repeat attempts with new material |
| Feedback | Checked answers and explanations for objective tasks; models and rubrics for productive tasks | Qualified human feedback on writing, pronunciation, fluency and interaction |
| Exam preparation | Targeted exam-skills lessons and timed/mock practice interfaces | Independently reviewed full-length tests and validated scoring; local results do not establish an official score |
| Learner evidence | Content audits and technical regression checks | Pilots at the stated entry levels, retention checks and difficulty calibration |

### Highest-priority additions

1. Add fresh practice sets for each learning objective, so repeat study does not depend on remembering the same answers.
2. Review full-length timed tests for coverage, difficulty, answer quality and scoring validity.
3. Introduce teacher or tutor feedback for writing and speaking, including live interaction practice.
4. Pilot the courses with learners and use their errors, retention and transfer performance to revise the material.

Adding more explanatory text alone would not close these gaps.

## Courses and coverage

| Course | Modules | Structured practice tasks | Main focus |
| --- | ---: | ---: | --- |
| Foundation & B2 First Course | 25 | 75 | Grammar, Use of English, reading, listening and developed B2 writing/speaking |
| IELTS Academic Practice Course | 25 | 75 | Academic reading/listening, visual-data writing, argument development and speaking |
| TOEFL iBT Practice Course | 25 | 75 | Listening/reading interpretation, sentence building, email/discussion writing, repetition and interviews |
| IELTS General & High-Band Masterclass | 25 | 75 | Practical reading, purposeful letters, complex argument, precise language and advanced spoken reasoning |
| **Total** | **100** | **300** | |

Each module contains one three-stage activity: guided practice, independent practice and assessment. These are **300 task stages, not 300 complete exam papers**. Optional short drills and additional site tools are separate from this count.

The Foundation & B2 First course assumes learners can already understand everyday texts and write connected paragraphs, approximately B1 entry. It is not a complete beginner-English programme. Internal route IDs such as `band4-5` are legacy identifiers; use the displayed course title and prerequisites to understand the actual scope.

## Learning experience

- Study explanations, worked examples and short reasoning/application checks.
- Complete the module's guided, independent and assessment stages.
- Use objective answer feedback, or self-review productive work against the supplied criteria.
- Revisit saved attempts, errors and drafts. Add notes under lesson videos and find them in **Progress → My notes**, grouped by course and lesson, with search and editing.
- Practise with vocabulary, flashcards, pronunciation tools, trainers and games.
- Use the existing responsive layouts and light/dark themes.

Course completion percentages and XP describe engagement and recorded activity. They are not certifications of mastery or predicted examination scores. Writing and speaking self-review does not replace qualified evaluation.

## Additional examples, tables and teaching media

**All 100 lessons now have an inline illustration matched to their subject**, placed beside an explicit teaching section before the next application. The approved word-family tree, tense timelines and article decision tree are joined by 97 individually authored examples: contrasts, sequences, argument relationships, sentence links, evidence trees, numerical comparisons, review cycles, decision trees, orientation, stress and possible causal alternatives.

Wide and narrow compositions carry the same content, with accessible descriptions and explanatory captions. The original rule-map registry remains available as source data, while these illustrations replace its recap display on all lesson routes. Existing fonts, theme colours, practice and saved progress remain in place. See the [illustration coverage and validation notes](docs/diagram-previews.md).

All **100 modules** now include an additional original worked example, a three-row reference table and a fresh transfer prompt with a collapsed explanation. The examples compare a weak response or decision with a better one and explain the reasoning. They supplement the existing lessons and three-stage activities; they do not add scored assessments or change saved attempts.

**12 earlier SVG teaching assets are retained for compatibility:** word families, tense timelines, argument development, charts and proportions, processes, sentence agreement, repetition, email purpose, letter tone, storytelling and participle subjects. Each has a text alternative, caption and full-size link. Numerical examples use explicitly fictional data and preserve their stated limits.

**All 100 modules include a visible video lesson**, using **59 distinct videos from 14 channels**, including Oxford Online English, BBC Learning English, TST Prep TOEFL, IELTS Advantage, IELTS Official, Cambridge English Spain, English with Cambridge, IELTS by IDP, Academic English UK, Fastrack IELTS, English Too, Khan Academy, Wireless Philosophy and CFR Education. The player appears near the beginning of the module, before expanded written theory, in both study and focused-practice routes. Existing worked-example links also provide a direct link back to the video.

A **Lesson recap** below every player presents the lesson’s existing teaching rule, example and interpretation. These recaps describe the lesson focus; they are not newly obtained video transcripts. A compact **Add a note** editor below each recap saves to the existing local notes store. See [the notes, selector and artwork report](docs/lesson-notes-and-brand-assets.md).

Videos are matched to the module's topic or a clearly labelled supporting skill, with a specific viewing focus, preparation question, follow-up and written alternative. Some videos are reused with different application goals; this is not a claim of 100 unique filmed lessons. The word-formation module starts at the publisher's word-formation chapter at **7:36**. Current TOEFL guides cover 2026 listening, reading, sentence-building, email, repetition and interview tasks. An earlier Academic Discussion explanation is explicitly labelled as technique for the retained task; current course directions define the overall format.

The lesson player uses a violet frame and a local preview with no remote thumbnail. Select **Load lesson video** to create the `youtube-nocookie.com` iframe; it does not autoplay. Loading the frame connects to YouTube; privacy-enhanced mode does not eliminate third-party data processing or advertising. Direct viewing and publisher links remain available if embedding is blocked or a video becomes unavailable. Videos are supplementary and never gate completion or XP.

The **29 October alignment audit replaced 26 weaker video associations**, including general study tips previously used for map listening, graph prepositions, hedging and scientific vocabulary. Mixed modules have an explicit coverage note where a video teaches only one part or supplies a supporting skill. The [module-by-module media audit](docs/course-media-audit.md) records each match and its scope.

**All 100 lessons now have internet-sourced images placed within their relevant teaching**, using 35 curated assets in 102 placements. Photos, a real historical graph, an atmospheric-composition chart, an English compass and a NASA water-cycle illustration support explicit lesson questions and explanations. Each has an accurate text alternative, visible credit, source and reuse link, and a full-size view. Captions distinguish observations from invented teaching examples. The established fonts, theme colours, activities and saved progress are preserved. The [image coverage report](docs/lesson-images.md) lists every lesson and placement; the [current manifest](public/media/courses/lesson-images/manifest.json) records exact provenance, dimensions and checksums. Older standalone image assets are retained for compatibility and no longer duplicate the inline illustrations on current routes.

Video sources and attribution are recorded per resource in `src/data/course-enrichment/video-catalogue.ts`. Publisher lesson pages and YouTube oEmbed were used to check topics, channel identities and embedding availability on 28–29 October 2026; availability can change. Teacher strategies and aspirational band-score titles are not official score guarantees or an endorsement of EnglishCamp.

The application's existing fonts, colour tokens, navigation and activity interfaces are retained. Teaching additions are stored separately in `src/data/course-enrichment/` and rendered alongside the original lesson content.

## Shadowing and consistent practice UI

`/shadowing-english` provides A1–B2 starter practice with four short YouTube clips. A video/practice column sits beside transcript and clip choices, stacking on phones. It includes Arabic meanings, word spelling, local dictation, independent video/model speed controls and optional local recording replay. Practice cards use small centered vector icons. Vocabulary, Flashcards, Partner Challenges and Study Strategies follow the shared violet styling; strategies include an interactive learning journey.

All synthetic pronunciation controls use Microsoft neural speech. Missing clips use the Python helper configured in `.env.example`; install `requirements-voice.txt` in that environment. Fixed lesson text can generate on demand; personal text requires the learner’s approval. See [setup, sources and scope](docs/shadowing-and-ui-consistency.md).

## Illustrated reading and practice voices

Read & Listen at `/vocabulary` now includes 22 illustrated bilingual articles with local narration, synchronized text and word replay. Topic Vocabulary includes 18 topics and 264 contextual entries. Conversation and Listening Lab use the same natural voice family as the courses. The [reading and practice audio notes](docs/practice-reading-audio.md) explain coverage and timing.

## Course narration

The courses include **99 AI-generated neural recordings**, approximately **33.7 minutes** in total, covering listening material, speaking stimuli and developed model responses.

- British narration uses Ryan and Sonia; TOEFL narration uses Andrew and Ava. Thomas provides a third distinct voice where needed.
- Fourteen dialogues use separate voices for their speaker roles.
- The recordings retain the existing scripts, clip identifiers and asset URLs.
- Files are mono, 24 kHz, 16-bit PCM WAV, served directly from `public/media/courses/`.
- Playback does not require a Microsoft speech-service connection or API key.
- `audio-manifest.json` records scripts, voices, durations, checksums and provenance.

These are original educational recordings generated with Microsoft neural voices, not human performances or examination-board recordings. All other synthetic pronunciation buttons also use Microsoft neural speech: existing clips play locally and missing clips generate through the configured Python helper.

## Full mock papers — content version 2026.2

The mock area now contains one complete original practice form for each of IELTS Academic, IELTS General Training, TOEFL iBT 2026 and adult Cambridge B2 First. IELTS has 40 listening and 40 reading questions per paper. TOEFL includes both follow-up branches for two-stage practice, ten sentence-building items, email/discussion and eleven speaking responses. B2 includes all seven Reading/Use of English parts, all four listening parts, writing choices and paired speaking tasks.

The bank contains **358 distinct objective items**, **10 writing prompts**, **22 speaking stages** and **77 new local neural recordings**. IELTS Academic/General intentionally share listening and speaking. Section clocks, committed navigation, versioned local drafts, submitted history and real microphone capture replace the earlier abbreviated runner. Existing colours, fonts, layout patterns and course content are preserved.

Results show objective marks and retain writing/recordings for an assessor. They do not invent productive scores, an overall band or score concordance. TOEFL routing is an explicitly labelled EnglishCamp practice rule. The first forms need independent teacher review and learner pilots before expansion to twelve unseen papers or any score-validity claim. See [the content, implementation and limitations report](docs/mock-exam-upgrade.md).

## Local data and privacy

**Name-only session sign-in:** the top-left sign-in uses a name and an original local fruit avatar. XP, course progress, badges, vocabulary, notes and saved attempts belong to that name within this tab's session. Signing out keeps them; entering the same name restores them. Another name has separate learning records. The first named session inherits a copy of existing guest progress without deleting the original. A centered congratulations popup appears when newly earned XP reaches another learning level.

Names and named text records use `sessionStorage` and survive reloads. Deleting the learning session or closing the tab removes them, subject to the browser's session-restore behavior. No profile data is sent to EnglishCamp. This is local name-only access, not a password-protected account or cross-device backup. Course/mock takes remain in local IndexedDB with separate named namespaces; the shadowing replay lasts only for its current line unless downloaded. Nothing is uploaded by the recording components. See [workspace and storage details](docs/shadowing-workspace-and-learners.md).


Data is specific to the browser, device and site origin. Changing the host or port creates a different storage context; clearing browser/site data can remove saved work. Save copies of important writing and recordings. The current implementation does not provide account-based cloud synchronization.

The existing course scripts and the new fixed mock-exam scripts were sent to Microsoft with the project owner's approval to generate the bundled narration. Learner answers, notes and microphone recordings were not part of that generation process.

## Run locally

Use Node.js and npm. The installed Next.js version declares Node.js `>=18.17.0`; use an actively supported Node.js release compatible with the lockfile.

```sh
npm ci
npm run dev
```

The default development address is `http://localhost:3000`. To choose another port:

```sh
npm run dev -- --port 3027
```

For a production build and local production server:

```sh
npm run build
npm run start -- --port 3027
```

Build in a separate checkout/output environment if another server is using the same `.next` directory.

The core local course experience and bundled audio do not require a speech-service API key. Microphone capture requires a supported browser, a secure context such as localhost/HTTPS, and the learner's permission.

## Verification

```sh
npm test
npx tsc --noEmit
npm run lint
npm run build
```

At the last recorded validation, **142 tests passed**, TypeScript checking and the isolated production build passed, and lint completed with existing warnings. These are technical checks, not evidence of educational effectiveness.

The narration checks cover all 99 WAVs and 163 generated voice segments, including script/word metadata, PCM integrity, duration and clipping. All 300 activity fingerprints were preserved. Representative listening and speaking playback was checked in the browser, and all 99 audio assets passed media/byte-range serving checks.

Run lint explicitly: `next.config.mjs` currently disables lint enforcement during the production build.

## Technology

| Technology | Version resolved in the current lockfile |
| --- | --- |
| Next.js | 14.2.35 |
| React | 18.3.1 |
| TypeScript | 5.9.3 |
| Tailwind CSS | 3.4.19 |

The application also uses Zustand for local state, Framer Motion for animation and `next-themes` for theme handling. The project's own version remains **1.0.0**; dependency versions are separate.

## Source map

| Path | Purpose |
| --- | --- |
| `src/app/` | Routes and page composition |
| `src/components/course/` | Course overview and module experience |
| `src/components/exercises/` | Activity and exercise interfaces |
| `src/data/content.ts` | Course/module definitions and original lesson blocks |
| `src/data/course-instruction/` | Expanded instructional chapters |
| `src/data/course-enrichment/` | Additional worked examples, reference tables, transfer checks and selected teaching media |
| `src/data/course-activities.ts` | Three-stage module activities |
| `src/lib/activityState.ts` | Attempt restoration, fingerprints and local recordings |
| `src/store/` | Progress and other local state |
| `public/media/courses/` | Bundled course audio, diagrams and audio provenance |
| `tests/` | Content, state, recording, narration and regression checks |

## Styling system

The application keeps Tailwind CSS 3 and its existing Nunito, DM Sans, JetBrains Mono and Arabic font configuration. The shadcn/ui primitives live in `src/components/ui/shadcn`, with project configuration in `components.json`. Semantic theme roles map to the existing EnglishCamp colour variables in `globals.css`; both light and dark palettes are preserved.

Existing shared buttons, cards and badges adapt these primitives without adding layout wrappers. The shared modal export uses the shadcn/Radix dialog foundation. All 14 selectors use a shared violet Radix Select adapter while retaining their original options and state updates. The dashboard has compact faceted vector artwork, an original violet reading-fox mascot and matching favicons. Signed-in greetings use the local profile name. Course and mock-exam text fields retain their existing values, labels, events and saved-state keys. Page spacing, lesson block spacing and card padding were tightened; content data, section order, grid structure and media remain unchanged. See [the styling report](docs/styling-refinement.md).

## Site consistency and practice corrections — 31 October 2026

The shared violet artwork now covers page headings, practice cards, navigation and course filters. Course cards and study tips share the existing interface style, with phone layouts checked across all public pages. The requested conjunction, word-pair, culture, cloze and letter activities received targeted content and interaction corrections. Linking Words contains 77 contextual entries. All 100 lesson recaps now explain the rule, analyse a worked application and offer a self-check.

The Grammar Cheat Sheet includes 11 populated topics and a downloadable nine-page A4 reference using the website fonts. See [the complete audit, corrections, verification and sources](docs/site-consistency-and-practice-audit.md).

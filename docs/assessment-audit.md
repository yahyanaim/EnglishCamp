# Comprehensive English Assessment & Exam Simulation Audit Report
**Project:** EnglishCamp  
**Auditor:** Senior English-Language Assessment Specialist, IELTS & TOEFL Preparation Author, Educational Content Auditor & Software Engineer  
**Date:** October 2026  
**Status:** Audit Completed — Implementation in Progress  

---

## 1. Executive Summary

A comprehensive, read-only audit of EnglishCamp's assessment features, quizzes, IELTS/TOEFL guides, mock exam engine, and question banks was performed. While the platform has a rich UI framework and design system, significant pedagogical, structural, and content deficiencies were identified in its exam simulations and skill-assessment logic.

Key findings:
1. **Mock Exam Engine (`/mock-exam`):** Hardcoded exclusively to `IELTS_MOCK` with only Listening and Reading sections active. Writing and Speaking sections are defined in data but never rendered, timed, or evaluated. TOEFL mock exam is unreachable. IELTS General Training is absent.
2. **Obsolete Exam Formats:** TOEFL data reflects the obsolete pre-July 2023 format (3 hours, independent 300-word essay, 30–40 reading questions), missing the updated July 2023 "Writing for an Academic Discussion" and the landmark January 21, 2026 format overhaul (1–6 score scale, Complete the Words, Read in Daily Life, Build a Sentence, Write an Email, Listen and Repeat, Take an Interview).
3. **Invalid Scoring Systems:** The mock exam evaluates performance using an arbitrary generic percentage (`passed: pct >= 60%`), which violates both IELTS (0–9 Band scale with half-band rounding) and TOEFL (1–6 scale / 0–120 scale).
4. **Listening Without Audio:** Listening tasks print audio scripts directly on screen (`"(Simulated audio) Student: ..."`), converting an auditory comprehension test into a transcript-reading task.
5. **Trivia Masquerading as Assessment:** Lower and intermediate quizzes feature trivia questions about test acronyms ("What does IELTS stand for?", "What is the TOEFL score range?") rather than assessing English proficiency.
6. **Writing Task Misalignments:** Essay word limits enforce a 140–190 word cap (from Cambridge B2 First) on IELTS Band 7–8 tasks (which officially require 250+ words), and block submission if word count exceeds 190 words. Academic Task 1 visual-interpretation tasks (charts, diagrams) lack visual assets.
7. **Legacy Schema Artifacts:** In `flashcards.ts`, English words are stored under the `de` key and Arabic translations under `en`, causing inverted prompts in `KnowledgeCheck.tsx`.

---

## 2. Comprehensive Audit Matrix

| # | Location | Existing Behavior or Content | Problem | Severity | Recommended Change |
|---|---|---|---|---|---|
| 1 | `src/app/mock-exam/page.tsx` & `src/data/mock-exam.ts` | Single hardcoded `MOCK_EXAM = IELTS_MOCK`. Only renders Listening & Reading sections. | User cannot select between IELTS Academic, IELTS General Training, and TOEFL iBT. Writing and Speaking sections are omitted from the mock exam flow. | **Critical** | Build an interactive exam selector supporting (1) IELTS Academic, (2) IELTS General Training, and (3) TOEFL iBT (2026). Render all 4 skills in sequence with section timing and dedicated interfaces. |
| 2 | `src/app/mock-exam/page.tsx` | Calculates `pct = (correct / total) * 100` and displays `Passed! (>= 60%)` or `Not this time`. | Unrealistic and misleading scoring. Neither IELTS nor TOEFL has a 60% passing mark. IELTS uses 0–9 Bands (rounded to 0.5); TOEFL uses a 1–6 scale (in 0.5 increments) with 0–120 concordant conversion. | **Critical** | Implement verified psychometric conversion tables: IELTS raw (0–40) to Bands (0–9), Overall Band calculation (average of 4 skills rounded to nearest 0.5), and TOEFL 1–6 scale with 0–120 concordance. |
| 3 | `src/data/mock-exam.ts` (Listening) | Simulated audio transcript printed in `text: "(Simulated audio) Student: ..."` right under question prompt. Questions 2–5 have no audio/transcript. | Assesses reading speed rather than listening comprehension. User answers by reading the transcript on screen. | **Critical** | Integrate speech synthesis audio playback with playback controls, replay limit simulation, and audio progress. Hide all transcripts during exam mode; only reveal in the post-test review. |
| 4 | `src/data/mock-exam.ts` (Reading) | Passages are 150–200 words (vs official 700–900 words). Questions are restricted to 3-option multiple choice. | Unrealistic reading load, lacks core IELTS question families (True/False/Not Given, Yes/No/Not Given, Matching Headings, Summary/Table Completion with word limits). | **High** | Provide authentic-length passages covering diverse academic and general training domains. Implement True/False/Not Given, Matching Headings, and Completion tasks with strict word-count boundaries. |
| 5 | `src/data/mock-exam.ts` & `src/data/b2-pruefung.ts` (TOEFL) | Prompts for a 300-word "Independent Essay" (Task 2) and describes 3-hour test duration with 30–40 reading questions. | Severely outdated. ETS retired the Independent Essay in July 2023, replacing it with "Writing for an Academic Discussion". The January 21, 2026 format introduces 1–6 scoring, "Complete the Words", "Read in Daily Life", "Write an Email", etc. | **Critical** | Upgrade TOEFL content and simulation to reflect current ETS specifications: Academic Discussion (10-min response to professor + 2 peer posts), Complete the Words, Read in Daily Life, and 1–6 score scale. |
| 6 | `src/app/writing/page.tsx` & `src/data/writing.ts` | Form validation blocks submission if `wordCount > max` (e.g. >190 words). Band 7–8 essays capped at 140–190 words. | IELTS Task 2 penalizes responses under 250 words; capping at 190 words causes immediate band failure. Official exams do not penalize writing above the minimum. | **High** | Remove submission blocking for exceeding word limits. Set minimum word requirements correctly: IELTS Task 1 (150+), IELTS Task 2 (250+), TOEFL Academic Discussion (100+). |
| 7 | `src/data/mock-exam.ts` (IELTS Writing Task 1) | Prompt describes a bar chart in text only: `"The bar chart below shows the percentage of households..."` without any visual image or SVG. | IELTS Academic Task 1 is explicitly a visual information transfer task. Without a visual asset, candidates cannot interpret trends, highs, or comparisons. | **High** | Provide genuine visual data assets (clean, accessible SVG charts, graphs, tables) directly embedded in Task 1 prompts. |
| 8 | `src/app/mock-exam/page.tsx` (Speaking) | Speaking tasks are defined as static text in `mock-exam.ts` but never shown or interacted with in `/mock-exam`. | Candidate cannot practice or experience Speaking timing, cue card preparation (1 min), or speaking response duration (1–2 mins). | **High** | Implement an interactive Speaking station with Part 1 interview, Part 2 cue card with 1-min preparation timer and 2-min speaking recorder/timer, and Part 3 abstract discussion. |
| 9 | `src/data/quizzes.ts` | High proportion of meta-test trivia questions ("What does IELTS stand for?", "What does TOEFL stand for?", "What is the score range?"). | Fails to measure English language proficiency. Learners score high on trivia without improving grammar, vocabulary, or comprehension. | **Medium** | Replace test trivia with authentic CEFR/Band-aligned English assessment questions targeting Academic Word List (AWL), academic collocations, discourse markers, syntax, and reading inference. |
| 10 | `src/data/flashcards.ts` & `src/components/learn/KnowledgeCheck.tsx` | Schema uses `de` for English word and `en` for Arabic translation. `KnowledgeCheck.tsx` refers to `Flashcard DE→EN`. | Confusing legacy naming and inverted language pairing in flashcard-based assessments. | **Medium** | Normalize flashcard accessors and prompt labels to cleanly display English headwords, phonetics, and Arabic definitions. |
| 11 | `src/app/writing/page.tsx` | Submission merely awards XP (`addXP(baseXP)`) and reveals model answer without evaluation criteria. | Provides no formative feedback on Task Achievement, Coherence & Cohesion, Lexical Resource, or Grammatical Range & Accuracy. | **Medium** | Introduce official rubric-based self-evaluation checklists and automated feedback heuristics based on official band descriptors. |
| 12 | `src/app/b2-pruefung/page.tsx` & Sidebar | Route is `/b2-pruefung` (German word for B2 Exam). Sidebar links to `/b2-pruefung`, `/ielts`, `/toefl`, and `/mock-exam` separately. | Residual German route name; disconnected navigation between exam guides and mock exams. | **Low** | Provide clean cross-navigation between Exam Guides and the unified Exam Simulation Engine. |

---

## 3. Implementation Roadmap

1. **Phase 2:** Primary online research of official specifications (IELTS, TOEFL iBT 2026, CEFR). Documented in `docs/assessment-research.md`.
2. **Phase 3:** Construct the CEFR & Exam Alignment Blueprint and Coverage Matrix across all proficiency levels (A1–C2).
3. **Phase 4:** Author authentic IELTS Academic and IELTS General Training modules (Listening Sections 1–4, Academic & GT Reading passages with authentic task types, Academic Task 1 SVG visuals, Task 2 discursive essays, Speaking Parts 1–3 with timers).
4. **Phase 5:** Author current TOEFL iBT simulation (1–6 scale, Complete the Words, Read in Daily Life, Academic Reading, Writing for an Academic Discussion, Speaking tasks).
5. **Phase 6:** Upgrade `/mock-exam` engine to support multi-exam selection, 4-skill section navigation, audio speech synthesis, response timers, and band-accurate score reporting.
6. **Phase 7:** Improve quiz and exercise question banks, removing trivia and enhancing language assessment.
7. **Phase 8:** Test and verify all flows across desktop and mobile.

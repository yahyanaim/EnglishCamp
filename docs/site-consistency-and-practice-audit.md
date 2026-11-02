# Site consistency and practice audit

31 October 2026. Project version remains **1.0.0**. This update extends the established violet interface and corrects the practice problems identified during review.

## Visual consistency

The shared faceted artwork now appears in page headings, practice-library cards, course filters, navigation, statistics and study tips. It uses the existing violet, plum, lavender and ivory palette. Small icon slots remain small; arrows, check marks and other functional controls retain their appropriate meaning. Existing fruit profiles and the reading-fox mascot are retained.

The landing page now uses the same course-card component as the dashboard, with readable course descriptions and consistent violet progress bars. Course filters occupy their own compact row and become a two-column touch-friendly grid on phones. The main site frame, original fonts, course navigation and lesson order are retained.

Preposition and culture tips use readable disclosure panels. Letter-writing topics and the task/editor layout use the available width, stacking on narrow screens. Grammar Comparison uses legible text on violet/neutral surfaces. Useful Phrases now wraps its English and Arabic category labels instead of overflowing a 320px screen. The empty Review Queue has a consistent page heading.

## Practice corrections

| Area | Problem found | Correction |
| --- | --- | --- |
| Conjunction challenge | Case-sensitive replacement missed sentence-initial words; random distractors could include valid synonyms; filtering happened after random sampling | 44 authored gap questions, four per function, with an explicit relationship, four reviewed choices and explanations. Filter before sampling; show the number available. Bonus uses the actual round length. |
| Word Pairs Quiz | Complete reference examples exposed the answer; inflected forms did not match the bare-word options | 45 authored gap questions covering all 23 pairs. British-spelling guidance is explicit; the overlapping physical-distance use of farther/further is not scored as a false binary. Feedback restores the completed sentence. |
| Culture Quiz | Incorrect monarchy key; ambiguous national-dish/sport/symbol claims; misleading geography/internet wording | Reviewed and corrected 11 existing question records while retaining their IDs. Filtered-round bonuses use the actual number of questions. |
| Cloze Text | Gaps replaced whole nonempty sentence fragments, producing broken passages; cumulative score appeared as a per-passage score | Eight complete passages with two explicit empty gap slots each; distinct per-passage and total scores. Existing completion IDs are retained. |
| Letter Writing | The “task” was already the model letter; drafts disappeared when browsing topics; an empty/repeated completion could award XP | Seven separate task prompts; controlled drafts retained while browsing those topics; blank completion disabled and the existing completion API prevents repeated awards. Original model letters and translations remain; short models are identified as shorter than a full B2 response. |
| Linking Words | Every expression was labelled coordinating; duplicate senses opened the first match; some examples contained comma splices | Correct coordinating/subordinating/transition/phrase/paired classifications, sense-specific selection keys, punctuation corrections and 16 additional contextual entries: 77 in total. |
| Grammar reference | Absolute SVO/inversion claims; reversed British/American which/that guidance; an unrestricted passive claim | Qualified the existing explanations, acknowledged subject/embedded questions, and corrected the relative-clause and passive guidance. |
| Preposition tips | Arrive-on was generalised to continents; all multi-word verbs were treated as literal verb-plus-preposition combinations | Corrected arrive in/at/home and arrival-day distinctions; explained particles, prepositions, separability and literal/idiomatic meanings, with matching Arabic support. |

The structural scan loads **132 data modules**, traversing **1,284 choice sets**. It checks empty/duplicate choices, out-of-range answer indexes and answers absent from options. It found no remaining structural failures. This does not establish that every teaching claim or every distractor in the entire application has received independent expert review. Manual semantic review concentrated on the requested trainers and the reference content exposed by this audit.

## Lesson recaps

All 100 video lessons now have a structured recap: the lesson principle and its explanation, a concrete example with interpretation, a worked first attempt/improvement with reasoning, and a transfer question with a concealed explanation. These use the course's authored teaching material; they do not claim that new transcripts were obtained from the external videos. Original video sources, viewing segments, coverage notices, practice tasks, answer keys and saved attempts are preserved. Local note entry remains directly beneath the recap.

## Printing

The grammar sheet now contains **11 populated sections**, including time, location, direction and other prepositions. Topics can be expanded/collapsed; the print lifecycle expands sections and print CSS removes navigation, controls and interactive framing. A separate **nine-page A4 PDF** is available through Download PDF, generated from the same section data with the site's Nunito and DM Sans fonts. The PDF's checksum and source-data checksum are recorded beside it. Its English print edition is explicitly labelled; Arabic support remains in the online examples.

The native print action reached Codex's system print dialog; computer-use access cannot operate that host dialog. The downloadable PDF was independently rendered and visually checked, and all section headings were verified by text extraction. No claim is made that a physical printer was tested.

## Verification

- **142 automated tests** passed, including the new question banks, gap integrity, corrected culture keys, recap coverage, PDF/source consistency and exact preservation boundaries.
- TypeScript checking and the isolated production build passed. Lint completed with existing warnings.
- All **103 public page routes** were rendered at 320 CSS pixels. The Useful Phrases overflow found in that sweep was corrected and rechecked. Representative pages were also checked at 375 and 768 pixels, plus desktop.
- HTTP checks cover all public pages, all 100 course lessons and all 100 focused practice routes. The existing Reading redirect was made dynamic so that it sends its intended Location header instead of relying on a client transition.
- Representative interaction checks covered a filtered conjunction round and actual bonus, word-pair gaps/feedback, letter draft retention and disabled blank completion, preposition disclosures, linking-word senses, and course filters.
- All 18 existing web-font binaries and the original font declarations are unchanged. Existing progress, notes and local session storage formats are retained. QA used separate local origins.

Detailed machine results, browser measurements and screenshots are in the task output directory `outputs/consistency-content-2026-10-31` outside the source repository. No commit, push or release-number change was requested.

## Sources consulted for corrections

These support the corrected teaching points and factual distinctions; the original practice sentences are authored for EnglishCamp.

- [Cambridge: conjunctions and linking words](https://dictionary.cambridge.org/grammar/british-grammar/conjunctions-and-linking-words)
- [Cambridge: arrive](https://dictionary.cambridge.org/dictionary/english/arrive)
- [British Council: multi-word verbs](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/multi-word-verbs)
- [British Council: question words and subject questions](https://learnenglishteens.britishcouncil.org/grammar/a1-a2-grammar/question-words)
- [British Council: relative pronouns and clauses](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/relative-pronouns-relative-clauses)
- [British Council: active and passive voice](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/active-passive-voice)
- [Canada: National Sports of Canada Act](https://laws-lois.justice.gc.ca/eng/acts/n-16.7/page-1.html)
- [Australian government: Commonwealth Coat of Arms](https://www.pmc.gov.au/resources/australian-symbols-booklet/national-symbols/commonwealth-coat-arms)
- [Irish government: the harp](https://www.gov.ie/en/department-of-the-taoiseach/publications/the-harp/)
- [Internet Society: history of the internet, by its developers](https://www.internetsociety.org/internet/history-internet/brief-history-internet/)

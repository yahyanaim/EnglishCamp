# Individual lesson rule mind maps

29 October 2026 · project version **1.0.0**

## Teaching change

The original 100-record registry retains each lesson’s rule and the earlier recap data. All 100 lessons now display subject-specific inline illustrations instead; see [current illustration coverage](diagram-previews.md). The following notes document the retained recap implementation and its earlier validation. The central node states the concept; three connected branches explain its structure, relationships or limits, each with a short example. Each diagram sits at the end of the written teaching, after the explanations and worked examples and before the practice lab. Study lessons show the teaching section open; focused practice keeps it in the existing collapsed theory/hint section. A link near the start of the written teaching jumps to the rule recap. They replace the earlier four course-wide maps, which did not meet the request for an individual lesson rule.

The diagrams are explicitly authored under `src/data/lesson-principles/maps/`, with 25 per course and 300 branches in total. They are selected server-side with the matching lesson principle. A lesson receives its own diagram data; client components do not import the full registry. The existing extended explanation is available in a collapsed section beneath the diagram.

## Examples of lesson-specific rules

| Lesson | Connected concepts |
| --- | --- |
| B2 concession | Although + clause; despite + noun/-ing; preservation of unexpected contrast |
| B2 word formation | Adjective description; adverb manner; noun quality |
| Academic shares | Percentage-point subtraction; relative change; denominator limits |
| Academic graph prepositions | From = starting value; to = endpoint; by = change |
| TOEFL sentence building | Direct auxiliary–subject order; embedded statement order; do-support and subject-question distinction |
| TOEFL repetition | Complete wording; memory groups; reproduction versus paraphrase |
| General Training participles | Shared actor; voice relationship; earlier completed action |
| General Training science | Hypothesis/prediction; observation; bounded conclusion |

The renderer uses readable HTML text with decorative connecting lines. Three branches appear across wider screens and form a connected vertical tree on narrow screens. It reuses the existing colour variables and fonts. Course overviews return to their previous layout.

## Primary references

These public references informed checks of concepts and task distinctions. All new prose, examples and maps are original; the pages are not copied into the lessons.

- [Cornell Learning Strategies Center: Concept Mapping](https://lsc.cornell.edu/how-to-study/concept-maps/) — explicitly labelled relationships between concepts, rather than a lesson list presented as a picture.
- [British Council: contrasting ideas](https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/contrasting-ideas-although-despite-others) — clause versus noun/-ing patterns for concession.
- [Cambridge Grammar: present perfect continuous](https://dictionary.cambridge.org/uk/grammar/british-grammar/present-perfect-continuous) — activity, duration and completion distinctions.
- [Purdue OWL: subject–verb agreement](https://owl.purdue.edu/owl/general_writing/grammar/subject_verb_agreement.html) — subject head versus intervening nouns.
- [British Council: participle clauses](https://learnenglish.britishcouncil.org/free-resources/grammar/c1/participle-clauses) — shared subject and earlier action with perfect participles.
- [IELTS: writing resources](https://ielts.org/take-a-test/preparation-resources/writing-test-resources) and [General Training writing format](https://ielts.org/take-a-test/test-types/ielts-general-training-test/ielts-general-training-format-writing) — task purpose, evidence, coverage and tone.
- [ETS: TOEFL content](https://www.ets.org/toefl/test-takers/ibt/about/content.html) and [speaking tasks](https://www.ets.org/toefl/test-takers/ibt/about/content/speaking.html) — task-family distinctions, including exact repetition versus original interview responses.

## Preservation and validation

Original lesson blocks, practice prompts, answer keys, activity signatures, XP, narration and global styles remain protected by the existing checks. The display integration fixture now covers only `ModuleExperience`; `CourseOverview` is restored to its previous reviewed bytes. No new scored task, dependency or external media service is introduced by these diagrams.

Automated checks cover exact 100-lesson diagram coverage, 100 distinct roots and branch sets, all 300 branch rules and examples, server selection on both routes, diagrams positioned after teaching/examples and before practice, and the existing numerical, grammatical, activity and audio preservation checks. This establishes content delivery and compatibility, not measured learner outcomes.

Recorded checks: **87 tests passed**, TypeScript passed and the isolated production build passed. Lint has no errors and 25 pre-existing warnings. All **200 lesson routes** served their own three-branch diagram and all four overviews omitted the replaced course-wide map. Four representative maps, one per course, fit at **320 CSS pixels** without horizontal overflow; the three-column layout also fit at **640 CSS pixels**. The full-explanation disclosure worked without hiding the map.

Placement refinement: the rule diagram is now a recap after the additional worked example and before the Practice Lab. All 200 lesson routes passed this ordering check; study routes keep theory open, focused routes keep it collapsed. Browser checks verified the recap link clears the fixed header by a 96px anchor offset and that the expanded focused-practice recap fits at 320 CSS pixels without horizontal overflow. The diagram content and theme styling are unchanged.

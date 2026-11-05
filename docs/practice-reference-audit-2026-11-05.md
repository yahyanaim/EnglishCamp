# EnglishCamp practice and reference audit

Date: 5 November 2026

> Final follow-up: the added Grammar Reference and Cheat Sheet lessons are reference-only, with no exercises or XP controls. Word topics also have no XP controls. Grammar Reference was removed from the Practice Hub, leaving 80 entries. Previously earned records remain intact. The final update adds numbered seals and automatic mascot celebrations for new badges; 267 tests pass. Earlier counts and completion descriptions below record the audit pass at that point in the work.

## Result and coverage

The main defects were answers printed before a response, gaps rendered incorrectly, valid alternatives rejected, and generated tense answers inferred incorrectly. These are learning and grading problems, rather than styling alone.

This pass screened 100 learning component files for suspicious answer-field rendering. It then reviewed and corrected 13 trainers: 12 fixed question banks containing **198 items**, plus the generated Verb Puzzle. The puzzle's 60 verbs were checked in both supported tenses for all six subject rows: **720 non-empty form cells**. This is targeted coverage of the 81 trainers listed in the Practice Hub, not a claim that every item in all 81 trainers has received a full educational review.

Answer choices naturally include the correct answer. The defects below concern a completed answer printed in the question or hint, or a grading rule that rejects a suitable response.

## Practice findings and corrections

Open the named trainer from `/practice`.

| Trainer | Reviewed items | Finding | Correction |
| --- | ---: | --- | --- |
| Word Order | 8 | The completed sentence appeared as a cue; some alternative orders could also be grammatical. | Replaced the cue with a task instruction and made the requested order explicit. |
| Negation | 10 | The completed negative sentence appeared before answering. Some distractors changed frequency instead of testing the intended form. | Delayed the completed sentence until feedback and clarified distractors. |
| Conjunctions / Linking Ideas | 15 | The completed linked sentence disclosed the conjunction. | Shows the intended relationship, such as contrast or reason. The completed sentence follows the response. |
| Prefix Verbs | 15 | Removing a prefix failed because notation such as `re-` did not match `rewrite`; the full answer remained after the gap. | Removes the actual prefix letters and displays `___write`. |
| Modal Verbs | 16 | The cue named the answer; a single accepted string rejected suitable equivalent expressions. | Uses a meaning/context cue and accepts reviewed alternatives, including polite permission forms and appropriate future expressions. |
| Relative Clauses | 15 | The gap moved away from its original position; suitable `who/whom` or `which/that` answers could be rejected. | Keeps the gap in the sentence and accepts the applicable alternatives available in that question. |
| Possessives (`'s / of`) | 18 | An extra gap was appended; a name/ownership explanation was inaccurate. | Keeps one gap and corrects the explanation. |
| Prepositions | 20 | The question incorrectly referred to grammatical case and some fragments did not establish time, place or movement. | Asks about usage, supplies full contextual sentences, and shows definitions after answering. |
| Contractions | 15 | A React object could appear as `[object Object]`; one exclamation was unrelated to contractions. | Renders a plain-text gap, supplies an expanded-form cue, and replaces the unrelated item. |
| Reflexive Verbs | 20 | A subject was joined to an infinitive phrase as though it were a complete conjugated sentence. | Labels the subject and verb phrase separately. |
| Phrasal Verbs | 16 | The supposedly missing particle was already printed in the verb. | Displays a genuine particle gap. Accepts both `fill in` and `fill out` for completing a form and clarifies the clothing-removal meaning of `take off`. |
| Tenses Quiz | 30 | Guessing labels from substrings and auxiliaries could misclassify continuous forms, main-verb `have`, and perfect forms. | Uses 30 original questions with explicit labels across six patterns, including present continuous. Gives an explanation after answering. |
| Verb Puzzle | Generated | Past forms were treated as an array although stored as a string, producing empty expected answers. The header also disclosed a verb form. | Reuses the existing subject-specific conjugation helper, including `was/were`, fills all six rows, and removes the answer-bearing header. |

Existing reward identifiers remain in place. Partially completed conjugation tables still provide example rows as deliberate scaffolding; the removed header was an unconditional answer cue.

## New grammar and vocabulary

Grammar Reference contains six additional original lessons, each with teaching blocks, examples, usage notes, three checks and a British Council further-reading link:

- [Adverbs of frequency](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/how-often)
- [Time prepositions: at, on and in](https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2-grammar/prepositions-of-time-at-in-on)
- [Verbs followed by -ing or an infinitive](https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/verbs-followed-ing-or-infinitive)
- [Enough and too](https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/using-enough)
- [Present perfect: results and activity](https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/present-perfect-simple-continuous)
- [Past habits: used to and would](https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2-grammar/past-habits-used-to-would-past-simple)

These add **18 checks**. The four foundation lessons previously consolidated into the Cheat Sheet remain there; they have not been duplicated in Grammar Reference. British Council links are learning references, not an endorsement of EnglishCamp.

The single **Words** section now contains **267 cards across 23 topics**, up from 207 cards across 20 topics. All 207 existing cards retain their wording, translations, examples and drawing data.

The 60 additions comprise 20 countries, 20 nationality adjectives, 12 languages and eight seasonal/weather expressions. Existing spring, summer, autumn and winter cards remain. New cards have Arabic meanings, English examples and small illustrations that follow the selected palette. Country labels use country codes rather than misleading geographical outlines.

Sources: [Cambridge: countries, nationalities and languages](https://dictionary.cambridge.org/us/grammar/british-grammar/countries-nationalities-and-languages), [British Council: seasons](https://learnenglishkids.britishcouncil.org/read-write/reading-practice/level-2-reading/seasons).

## Connections to progress and planning

- Grammar study completion requires all three checks to be correct. It awards 20 XP once per lesson through the existing progress store.
- A word topic can be marked studied for 5 XP once. Individual words can be saved to My Bank with their Arabic meaning, example and category.
- The same XP, activity-day and weekly-goal system receives these completions. A Grammar and word studies panel on Statistics and My Study Plan shows 10 checked grammar studies and 23 word topics.
- Existing course bars continue to count actual course stages. Reading a reference topic does not falsely complete an exam-course module. Previous lesson records, module credit and exercise keys are retained.
- A1/A2 planning includes the new country, nationality, language, frequency and time material. B1/B2 plans include the new reference lessons. B2 exam plans retain their main exam-specific grammar sequence, with a reference-review week.
- Plans prefer an unfinished eligible reference topic. Previously studied references remain available for review when all relevant choices are complete.
- Calendar exports use the same resources currently shown in the timetable. An imported calendar is a snapshot; subsequent progress changes in EnglishCamp do not rewrite an already imported event.

## UI corrections

The placement start button and leave link now have a real gap: 20 px horizontally on desktop and 12 px vertically in the stacked phone layout. Phone actions have a 44 px minimum target height.

The square level tile is replaced with a small circular scalloped seal containing the level: 56 px on desktop and 48 px on phones. It follows the chosen palette and is labelled as a study level rather than an authenticity verification.

## Verification

- **258 automated tests passed.** They cover pre-response answer rendering across the reviewed rounds, valid alternatives, generated verb forms, old vocabulary preservation, completion idempotence, previous progress preservation, planning resources and calendar parity.
- Type checking and the production build passed.
- Browser checks confirmed: a new grammar lesson records 20 XP and an activity day; a country word saves with its Arabic meaning and example; a country topic adds 5 XP; Statistics and My Study Plan both show those completions.
- Desktop and 390 px phone checks verified the placement-action gap and compact seal. The reviewed Word Order choices remain inside the phone viewport with 48 px answer targets.

## Assessment and remaining limits

The corrected trainers are more useful for focused practice because they now require a response before showing feedback and handle the reviewed alternatives. Recognition questions still need to be combined with listening, speaking and independent writing; quiz XP is an activity measure rather than evidence of a CEFR level.

The source screening is a way to find suspicious prompts, not an exhaustive semantic validator. The remaining trainer banks have not all received the same item-by-item review. Modal and relative-clause grading uses reviewed answer lists, not unrestricted language understanding. A future content pass should prioritise ambiguous distractors and answer-variant coverage in those remaining banks, followed by learner testing on phones.

No new speech service, external learner-data transfer, course-content rewrite or storage migration was introduced in this pass.

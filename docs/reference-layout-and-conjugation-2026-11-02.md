# Reference layouts and conjugation corrections

This pass addresses the screenshots of writing, verb conjugation, duplicate vocabulary controls and decorative quiz rows. It retains the existing palette, font setup, teaching banks, named learner sessions, rewards and course/mock content.

## Changes

- Return navigation follows the colored page heading, including headings inside layout wrappers. Local detail views keep their own return action in that same position.
- Writing details use the available content width. Arabic explanation paragraphs use RTL reading order, left alignment as requested, and isolated Latin terms.
- Conjugation reference always shows all five subject rows for each of the twelve tense/aspect choices. Examples follow the chosen verb and tense rather than reusing mixed-tense samples. State meanings mark continuous patterns as comparisons and show a preferred simple/perfect alternative. Dynamic meanings of be, have, think, see and hear have explanatory context. Happen uses event subjects. The isolated trainer's existing state-verb exclusions are retained.
- Removed automatically inserted centered illustrations and their reserved row from quiz cards. Inline action icons remain.
- Vocabulary has one Quiz/Write switch. The page's Write tab now opens the writing exercise directly. Corrected the existing final-item clamp so the exercise can reach its completion state. Submitted writing answers retain keyboard access to the next item, and both answer actions have accessible names.
- The prepositions cheat-sheet section now includes sixteen authored position/movement explanations with matching small accessible vector diagrams. Grammar and cheat-sheet pages remain English-only, as explicitly requested. Both browser printing and the downloadable English PDF include the diagrams.

## Educational references

New examples and illustrations are authored for EnglishCamp. Usage distinctions were checked against:

- [British Council: stative verbs](https://learnenglish.britishcouncil.org/free-resources/grammar/b1-b2/stative-verbs)
- [British Council: present continuous](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/present-continuous)
- [British Council: prepositions of place](https://learnenglish.britishcouncil.org/free-resources/grammar/a1-a2/prepositions-place)
- [Cambridge: below](https://dictionary.cambridge.org/grammar/british-grammar/below)
- [Cambridge: under](https://dictionary.cambridge.org/us/grammar/british-grammar/under)

## Validation

- 196 automated tests pass, including subject/tense agreement, Arabic text isolation, navigation order, controlled vocabulary modes and accessible position diagrams.
- TypeScript check passes.
- Production build passes. The shared navigation audit finds return controls on 82 generated learning pages; all 41 pages with a colored heading and a return row place the return after the heading.
- Browser checks at desktop, 390 px and 320 px verify five conjugation rows, tense-matched examples, RTL/left-aligned Arabic, full-width writing details, one vocabulary mode switch, final-word completion, no centered quiz icon row, sixteen position diagrams and intact shadowing controls. No horizontal overflow was found on the six affected page families at 320 px.
- Downloadable PDF has twelve pages; the three illustrated pages were rendered and visually checked.

## Screenshot alignment follow-up

Nested page headings now have the standard return-navigation gap (24 px desktop, 20 px phone). The tense explanation in Arabic occupies a full row starting at the content’s left edge below the selector, while retaining RTL reading order and left text alignment. Verified on desktop and a 390 px phone; no course text or learner state changed.

# Writing and Grammar UI update — 1 November 2026

The Writing catalogue now follows the existing violet course-card styling. Small faceted vector illustrations replace its emoji icons. The English title, Arabic translation, level and task type have separate space, and duplicate titles are displayed once. Tags and the word-count/action row wrap on narrow screens. The prompt editor uses the existing shadcn buttons and textarea, with consistent instruction, hint and model-answer surfaces.

The Grammar reference had white foreground classes inside pale panels in Future Tenses, Prepositions, Comparatives and Reported Speech. All nine affected panels now use theme-aware foreground colours and violet surfaces. Accordion controls expose expanded state. Wide tables scroll inside their panels on phones.

The prompt bank, models, hints, minimum word counts, submission/XP handlers, course content, notes and progress stores are unchanged. All 149 Grammar translation pairs are unchanged. No quiz interfaces or question banks were changed in this update.

## Opinion on practice consistency

The practice quizzes still need a shared experience. Changing colours, illustrations and primitive buttons has improved their appearance, but each trainer still owns its own composition and states. A sample review of Connectors Challenge, Speed Match and the article, culture and word-pair components found these differences:

- Connectors repeats the introduction in its page banner and setup card. Speed Match starts directly in its board, without the same setup pattern.
- Connectors, culture and word-pair questions use a 512px maximum content width; Speed Match uses the available content area. Neither choice is inherently wrong, but the transitions and framing lack a shared rule.
- Active-question metadata can still contain emoji, such as the connector link symbol, while navigation and newer cards use the violet vector art.
- Counters, answer arrangements, feedback blocks, score summaries and retry controls are implemented separately. Similar actions can therefore move or look different between exercises.

These observations do not establish that every question is pedagogically correct. The current task is a UI repair and a sampled quiz review, not a new exhaustive audit of all answer keys.

## Recommended next implementation

1. Create a shared quiz frame with one concise heading, task instructions, the established small vector artwork, a consistent question counter and progress area, and a standard content-width rule.
2. Share the answer-control states: available, keyboard-focused, selected, correct, incorrect and disabled. Use the same spacing and placement for Check, Next, Retry and Review.
3. Share feedback and results: show the correct response, a contextual explanation, completion progress and a review route. Keep correctness identifiable through text and symbols as well as colour.
4. Keep separate interaction layouts for multiple choice, matching, sentence building and free writing. Fit each inside the shared frame without forcing a matching board into a multiple-choice layout.
5. Review the question content alongside each migration: clear task, genuinely distinct choices, valid answer rules, a useful explanation, and any language or dialect assumptions made explicit.
6. Pilot one multiple-choice quiz, one matching task and one writing/translation task. Verify phone, tablet and desktop layouts, both themes, keyboard controls, saved progress and scoring before applying the shared components to the rest.

This quiz migration is a recommendation only; it has not been implemented.

## Verification

- 142 existing tests pass; TypeScript and the production build pass. Lint completes with existing hook and image warnings.
- Writing tested at desktop and 390px mobile widths: no page overflow; editor actions have 44px minimum heights; hints and model-answer toggles work; a short answer keeps submission disabled.
- All nine repaired Grammar panels measured in both themes: minimum sampled text contrast 5.67:1 in light mode and 9.34:1 in dark mode.
- Grammar checked at 390px: example panels stack and the 500px reference table scrolls within its container without widening the page.

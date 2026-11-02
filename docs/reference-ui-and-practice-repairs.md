# Reference UI and practice repairs — 31 October 2026

The app now follows the supplied dashboard composition: a rounded light workspace, slim navigation, wide search toolbar, purple illustrated banners, soft white cards, compact typography and a real learning-progress rail. Existing typefaces and palette values remain available. Dark mode and mobile navigation remain supported. The course text, module order, lesson IDs, media and saved progress are unchanged.

The progress rail displays actual XP, streak and completed modules. It does not invent a learner identity, mentors or activity. The vector banner artwork is decorative and local.

## Practice corrections

Sentence-pattern practice had assigned Arabic text to its English answer field. Its default direction therefore showed Arabic prompts and Arabic answers. The obsolete German direction was also still visible.

Nine bilingual trainers now share explicit English/Arabic pairs taken from the existing banks. Both language directions, answer checking and feedback use the same pair. Options are distinct; alternate valid translations of a prompt cannot become distractors. All existing sentence-pattern examples are available rather than only the first example from each rule. Dialogue filtering is retained. Per-session score and XP are awarded once.

The compound-word practice labels now describe the compound-word examples it actually uses. Phrases Practice situations now match their categories: clarification, interrupting, examples, comparison, contrast, sequencing and summaries.

## Navigation and verification

The prominent search bar uses a shadcn/Radix dialog with keyboard focus management. Search matches English labels and course/lesson titles, including navigation entries with legacy internal IDs. English public URLs and their existing redirects remain intact.

- All 117 automated tests pass, including checks over all 432 bilingual pairs in both directions.
- TypeScript and the production build pass. Lint reports 15 existing warnings and no errors.
- All 124 pre-existing data files and the saved-state implementation remain byte-identical to the start of this revision.
- Browser QA covers both directions and incorrect-answer feedback in all nine translators. A complete sentence-pattern run scored 100/100 and awarded 120 XP in the isolated QA origin.
- Mobile and desktop layout, light/dark text contrast, navigation and search were checked. Evidence is in the workspace's `outputs/reference-ui-2026-10-31` directory.

The broad mock-exam, narration and course work already present in the workspace is preserved. This revision is local and has not been committed or pushed.

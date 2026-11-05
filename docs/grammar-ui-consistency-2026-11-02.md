# Grammar UI consistency

The grammar section now uses the existing website's violet heading, white study surfaces, small vector icons, typography and control scale. No new palette, font, dependency or learning-content bank is introduced.

## Coverage

- All 30 grammar destinations in the shared learning navigation use the same scoped presentation.
- Nineteen local rule-detail views retain the page heading and place their existing Back action below it.
- The adjacent prepositions reference uses the same panel and table styling.
- Grammar Reference and Grammar Cheat Sheet remain English-only, following the earlier explicit preference. Existing Arabic on other reference pages keeps RTL reading order and left alignment.

## Changes

- Topic cards and reference panels use 12 px corners, the shared border color and no raised bottom shadow. Desktop padding is 20 px; phone padding is 16 px.
- Grammar headings reuse PageBanner. Existing section titles, descriptions, examples, lesson order, searches and filters are retained.
- Related examples use two columns where space permits and one column on phones.
- Notes and comparison panels use the site's subtle accent background with readable foregrounds. Fixed-size status icons are excluded from note-panel sizing.
- Selectors and actions use 44 px touch targets, 8 px corners and consistent selected/focus styles. Existing artwork stays small.
- Wide tables have a keyboard-focusable scroll region; they do not widen the page on phones. Printed tables return to page width.
- Reference disclosure headings and expanded regions have matching accessible names. Existing disclosure and filter handlers remain unchanged.

## Verification

- 199 automated tests pass, including the new teaching-data and interaction-preservation checks.
- The inline Grammar Reference explanations and examples, thirty imported teaching data files and interaction/initial-state fingerprints for 32 source files match the pre-change snapshot.
- TypeScript and the optimized production build pass.
- Browser audits cover all 30 grammar routes on desktop, 390 px and 320 px widths. Each has one page heading and a return control below the colored heading; no page-wide horizontal overflow was found.
- Expanded reference tables scroll inside their panels. Dark-theme checks measured 14.53:1 contrast for note text and 4.68:1 for table headings.
- Final screenshots and browser audit JSON are saved in the workspace evidence folder.

## Formula and title-icon alignment follow-up

The conjugation selector, formation rule and Arabic explanation now form one left-column reference block immediately above the matching table. The formula and translation stay together at desktop and phone widths. Rule-header artwork aligns with the first title line rather than the vertical center of a long English/Arabic explanation block. Teaching text and interactions are unchanged.

# Mobile UI audit — 7 November 2026

## Result

All **308 exported application pages** fit a 320 px viewport after the fixes. Another **98 main-section pages** passed at 390 px: **406 route/viewport checks**, with no remaining document overflow or unclipped elements extending beyond the viewport. The redirect and error documents were excluded.

The route results are recorded in [mobile-audit-2026-11-07.csv](audits/mobile-audit-2026-11-07.csv). These geometry checks complement the interactive and visual checks below; they are not a claim that every possible exercise state was tested.

## Problems corrected

| Finding | Change |
| --- | --- |
| Homepage hero used too much of the phone screen | Reduced phone spacing, logo size and heading size. At 390 px the guest hero measures approximately 255 px, previously 402 px. |
| Feature cards had different heights | Equal-height phone cards with consistent padding, artwork and text sizes. |
| Slow loading could leave the hero and cards invisible | Essential phone content stays visible while the animation bundle loads. |
| No visible home logo in the phone header | Added a compact, accessible EnglishCamp home link. |
| Drawer logo cancelled its own navigation | Removed the cancellation; tapping the logo navigates home and closes the drawer. |
| Phone controls competed for header space | Consistent 44 px targets, flexible learner-name area and truncation; narrow phones retain the avatar and accessible learner name. |
| Course quiz entrance moved outside the screen | Disabled the horizontal card movement on phones for all four course quizzes. |
| Inconsistent panel and banner spacing | Shared phone padding, content-sized banners and wrapped action labels across existing learning components. |
| Bottom navigation needed clearer selection and spacing | Added accessible current-page state, a palette-aware active background and consistent touch targets. Preserved safe-area spacing and reserved space below page content. |

## Verification

- **308 pages at 320 px:** main sections, 100 lessons, 100 focused exercises, course overviews and course quizzes.
- **98 pages at 390 px:** every main section and the grammar cheat sheet.
- **Additional widths:** 360, 430, 768, 1024 and 1440 px. Desktop sidebar behaviour and the desktop/mobile logo breakpoint remain intact.
- **Short phone viewport:** 320 × 568 px sign-in dialog, including the form and privacy text.
- **Navigation:** header home link and drawer home link both return to `/`; the drawer closes after navigation.
- **Named learner:** a long test name fits the header; all six header controls retain 44 px height at 320 px.
- **Interactive states:** culture quiz question and feedback, active IELTS mock listening section, expanded Words reference, selected verb and tense menu, writing editor, vocabulary article reader, shadowing line navigation and transcript, lesson navigation and video frame.
- **Video proportions:** sampled lesson frame remains 16:9 at 320 px.
- **Themes:** phone layout checked with a green accent and dark mode, then restored to light violet.
- **Automated checks:** 278 tests passed; TypeScript check, static Cloudflare export, Worker dry run and whitespace checks passed.

Course text, question banks, scoring, saved-progress code, font families and Microsoft voice implementation were not changed. The existing content-preservation fixture records only the reviewed presentation/navigation file changes.

## Build note and limits

Google Fonts timed out during the local build. The local preview used a temporary, ignored cache containing the **18 original Google font files**; all exported WOFF2 signatures and SHA-256 hashes match those original files. Font declarations, dependencies and the normal GitHub deployment build were left unchanged.

Testing used Chrome's responsive viewport on macOS. It does not substitute for a physical iPhone/Safari or Android keyboard and browser-toolbar test. Wide reference tables may intentionally scroll within their own container; page-wide horizontal scrolling was checked separately.

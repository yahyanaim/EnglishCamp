# Full-window UI, spacing and performance audit

31 October 2026. Scope: presentation, responsive geometry and loading. Existing lesson text, course order, authored exercises, scoring and saved-state formats are preserved.

## Findings and corrections

| Finding | Correction |
| --- | --- |
| Desktop workspace had an outer gutter, maximum width, rounded frame and shadow | Full viewport shell, zero outer padding, no outer radius or shadow. Existing navigation, main column and learning rail remain in place. |
| Old margin utilities compounded the new section gaps | A single 24px section rhythm on desktop and 20px on mobile, with direct-child margin resets. Lesson paragraph spacing is retained. |
| Main-column grids used viewport breakpoints even when sidebars left little space | Container-based course and quick-access grids follow the available content width. |
| Controls mixed blue and violet accents, weights, radii and heights | Shared shadcn/Tailwind controls use violet primary actions, neutral outlined secondary actions, 8px corners, visible focus states and consistent 40px desktop / 44px mobile minimum height. Correct/incorrect and warning feedback keep their semantic colours. |
| Auto-sized mock-exam content expanded to the intrinsic width of its section tabs on mobile | Main flex-stack panels have an explicit full width within their existing maximum width, allowing internal tab strips to scroll without widening the document. |
| Mock question labels and flag controls used a disabled-text colour for active information | Theme-aware secondary text and warning text replace the low-contrast labels. |
| Dashboard statistics had vertical separators above their values | Separators and values share one row; the whole panel stacks when the central column is narrow. |
| Dashboard progress read persisted getters during initial hydration | Display values derive from subscribed snapshots and the existing pure level/module helpers. No persistence keys, scoring or saved records change. |
| Practice Hub eagerly imported 81 trainers | Each trainer loads when selected, with an accessible loading status. The catalogue and component assignments stay identical. |
| Every translator pulled in all nine translation banks | Separate module entry points load only the bank used by that translator. The compatibility registry still exports exactly the same 432 pairs and dialogue groups. |
| Search loaded before being used; global links prefetched many unrelated routes | Search loads on demand and warms on focus/hover. Global navigation and dashboard quick links no longer eagerly prefetch unrelated pages. |
| Shared page/card fades hid initial content | Shared page/card wrappers render visible content immediately; exercise interaction feedback remains. |

The original DM Sans, Nunito, Arabic and monospace font roles are retained. All 18 production font binaries match the preceding build. The violet accent remains `#7E22CE`; educational content and semantic success/error roles are unchanged.

## Production bundle comparison

Next.js production **First Load JS**, using the preceding preview as the baseline:

| Page | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| Practice Hub | 378 kB | 144 kB | 62% |
| Sentence-pattern practice | 174 kB | 110 kB | 37% |
| Dashboard | 236 kB | 177 kB | 25% |
| Mock exam | 275 kB | 277 kB | Slight increase from shared chunk grouping |

These are initial JavaScript bundle measurements, not a percentage claim about page speed or Core Web Vitals. Trainers and search still download when opened. The largest loading gains come from deferring unused trainers, isolating translation banks, and using the existing course metadata on the dashboard instead of importing complete lesson blocks.

## Validation

- Production build and TypeScript check pass.
- 119 tests pass, including original exercise/scoring tests and new preservation checks for 141 data/state files, all 432 bilingual pairs, dialogue filters and the unchanged Practice Hub catalogue.
- Lint completes with the existing hook/image warnings; no new lint errors.
- Responsive browser checks cover the dashboard, Practice Hub, sentence and phrase practice, course overview, a full lesson, and active mock-exam controls in light/dark themes.
- Local QA uses a separate origin; the user's saved progress is preserved.

Detailed build logs, browser checks and screenshots are stored in the workspace's `outputs/fullsize-ui-performance-2026-10-31` directory outside the repository.

# UI, English URLs and contrast recovery

The refinement preserves the existing page layout, course sequence, exam behaviour, content banks, audio and saved learning identifiers. The dashboard reference informs the neutral canvas, separated card surfaces, restrained borders, compact headers and controls. Nunito, DM Sans, JetBrains Mono and Noto Naskh Arabic remain in use. Existing theme token values are unchanged.

## Shared UI

The existing shadcn/ui adapters now extend to the legacy practice screens through `PracticeSurface`. Cards and buttons forward their native DOM elements and event handlers, including Framer Motion refs. Page headers use the shadcn Card primitive. The mock examination selector also uses it. Tailwind classes and semantic colour roles control their appearance.

Practice prompts, selected answers, corrections, scores, vocabulary saves and bookmarks use paired background/text roles. Category labels keep their hues with appropriate text shades for each theme. Disabled course controls remain readable. Dashboard widgets use theme-aware backgrounds and text rather than fixed light panels with dark-mode text.

## English navigation

`src/lib/english-routes.mjs` defines 55 public English routes. `/redemittel-praxis`, for example, permanently redirects to `/phrases-practice`. Sidebar, command palette, dashboard and search destinations use the new paths. Locale-prefixed links retain `/en` or `/ar` and use English slugs.

Next redirects preserve query parameters. Rewrites resolve the English addresses to the existing implementations. Internal file names, exercise identifiers and persisted progress keys remain stable. The only teaching-index data changes are navigation URLs and the translated “Verb Conjugation” navigation label; lesson text is unchanged.

## Verification

- 113 automated tests, TypeScript checking and the production build pass.
- Lint has the same 24 existing warnings and no errors.
- Regression checks compare every practice component's teaching logic with the pre-refinement source, excluding presentation. All 84 match.
- Existing palette, surface and font role token values are checked against the previous version.
- HTTP checks cover 165 redirects and 165 canonical destinations, including locale prefixes and query preservation.
- Browser checks cover Phrases Practice prompts and answer feedback, references, the practice hub, dashboard, exams and a complete course lesson at mobile and desktop sizes in light/dark themes. Recorded evidence is under `outputs/ui-routing-contrast-recovery-2026-10-30/`.

The computed text audit measures solid and composited surfaces; the exam's dark gradient hero is checked separately against its endpoint colours. This is targeted UI verification, not a claim of a complete accessibility certification.

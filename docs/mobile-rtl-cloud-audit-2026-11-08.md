# Mobile, Arabic and connected-progress audit — 8 November 2026

## Corrections

- Reflexive practice used fixed-width answer buttons, so long pronouns overlapped inside otherwise correctly sized cards. The choices now use a responsive grid, wrap safely and retain a 48-pixel minimum height. The combined third-person choice occupies a full mobile row. Questions, scoring and reward handlers are unchanged.
- Shared practice-button text can wrap without forcing its parent wider than the screen.
- All six recently added Grammar Reference lessons now have Arabic introductions, rules, examples and notes: 96 translated strings. They use the existing paragraph translation interaction. No translation buttons or exercises were added.
- Translation tooltips stay open after a phone tap. Keyboard Enter/Space works too. The tested tooltip remained within a 320-pixel viewport with RTL text.
- Central Arabic styling isolates RTL text from the surrounding English interface. Latin formulas, times and level labels use isolated LTR runs. Missing direction attributes were corrected in writing templates, grammar examples, reading, flashcard feedback and the verb explorer. The explorer's 60 list meanings now have explicit Arabic direction.
- Online profiles can retain their name, fruit identity, course/exercise progress, XP, dated activity and earned badges in Cloudflare D1. A private recovery code restores the same learner on another browser or device. The existing device-only option remains available.

## Verification performed

- Opened all 80 real practice-library cards at a measured CSS viewport of 320 × 740. Their initial states had no page overflow or button-label overflow after correction. This includes trainers rendered inside `/practice`, which route-only checks miss.
- Additional active states: Reflexive answer selection, Culture Quiz after Start Quiz, Phrases Practice after Start Practice, and the Idiom Match board. Checked long choices and screen overflow. Reflexive choices also checked at 390 pixels.
- Rechecked Vocabulary, Writing, Linking Words, Study Strategies, Verb Conjugation, Cheat Sheet, Shadowing and Flashcards at 320 pixels: no horizontal overflow or visible button-text overflow; visible Arabic runs had RTL direction.
- Rechecked all 60 Arabic meanings in the Verb Explorer list after the fix.
- Tapped the new Grammar Reference introduction and confirmed the Arabic tooltip remained open and fitted the phone viewport.
- Clicked the existing logo in the hamburger navigation and confirmed navigation to `/`.
- Real isolated local D1 browser workflow: created a synthetic learner, saved progress and a badge, restored the profile on a separate browser origin, and recovered the same 15 XP and badge. The separate origin initially had 0 XP.
- Stopped the QA service, answered a question in the loaded page and confirmed 20 XP remained locally. Restarted the service, reloaded and synced. A direct query of the isolated local database confirmed 20 XP and two distinct reward events, with no duplicate reward.
- All 288 automated tests passed, including SQL migrations, recovery authentication, equal-name isolation, privacy filtering, idempotent rewards and completion/badge merges. TypeScript, production static export and Worker dry run passed.

## Data boundaries

Recovery codes and session tokens are hashed on the server; production session cookies are HttpOnly, Secure and SameSite=Strict. Mutations check origin and learner identity. The client sends an explicit progress allowlist. Quiz answer arrays, written responses, notes, vocabulary-bank content and recordings remain on their current device. The recovery code is shown at creation and can be downloaded; it is not retained in browser storage.

Cloudflare D1 was created in the existing hosting account and both schema migrations were applied before deploying the binding. Microsoft Speech implementation and Azure secrets were not changed. Normal GitHub deployments retain the binding in `wrangler.jsonc`.

## Limits of this audit

The browser checks use responsive viewports, not a physical iPhone/Safari device. The 80-card inventory covers initial states; it does not mean every possible question, answer, timer outcome or browser version was exhaustively exercised. Online storage covers the data listed above, not every local tool's private content. Device-only sessions do not synchronize until the learner chooses to save that profile online.

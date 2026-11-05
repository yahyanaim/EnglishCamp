# Practice UI, learning session and certificate audit

## Scope

This pass addresses the writing-language duplication, Practice Library consistency, small welcome illustrations, the merged Words section, the learning-session dialog and the placement certificate. It follows the existing website fonts, palette controls and page structure.

## Corrections

| Area | Finding | Result |
| --- | --- | --- |
| Writing | The model rendered an extra DE block containing duplicate English text. | One English model followed by a separate Arabic block with RTL text. The prompt bank is unchanged. |
| Practice Hub | All 81 embedded trainer start screens lacked a page h1 and included two return controls in the DOM. Some metadata and accent utilities used fixed colours. | A shared page banner, one visible return control below it, compact title artwork and palette-based accents. Reference tools retain their appropriate layouts. |
| Return navigation | A legacy rule hid custom return navigation along with automatically generated navigation. | The rule now targets automatic navigation only. |
| Practice cards | Some intro rows repeated icons already represented in the banner; labels and board dimensions varied. | Shared spacing, status strips, compact controls and responsive game boards. Semantic correct/incorrect feedback remains distinct. |
| Word Search | The bank still contained German targets. The selection guard stopped a word after two letters. | Thirty English targets with Arabic meanings; complete selections work. Puzzle generation guarantees that displayed targets were placed. Existing reward IDs are retained. |
| Essay templates and review | Headers and controls differed from the rest of the library. | Shared banners, buttons, disclosure state, search labelling and compact empty states. Review scheduling and scoring are unchanged. |
| Words | The final accordion was outside the common section grid and touched the preceding section. | All 12 accordions use the same grid. The measured gap before Words is 16px. Its 103 word cards are divided into ten clearly spaced subtopics. |
| Welcome | The hero needed small illustrations without another large illustration panel. | Six subtle decorative vector marks at the edges, following the selected palette. Four remain on phones. Reduced-motion preferences disable floating animation. |
| Learning session | Identity, links, privacy information and destructive actions lacked hierarchy. | A compact identity card, current XP and level, separate learning-tool links, distinct sign-out/delete controls and expandable privacy details. The dialog scrolls within a small phone viewport. |
| Certificate | The document lacked a polished visual hierarchy. | A branded landscape design with the learner name, real result, date and record ID. Arabic names are shaped and fitted correctly. The preview remains readable on phones. |

## Certificate references

Reviewed the [Adobe Express certificate gallery](https://www.adobe.com/express/templates/certificate) and [Canva completion certificate gallery](https://www.canva.com/certificates/templates/completion/) for typography and hierarchy. The implemented artwork and layout are original and use EnglishCamp's existing brand assets and fonts. No third-party certificate template or artwork was copied.

The document is explicitly a record of completing the internal placement check and a suggested study starting point. It does not claim accredited English proficiency. It is generated locally and does not upload the learner's name or result.

## Verification

- Automated suite: **221 passed, 0 failed**.
- TypeScript check and production build passed; whitespace/diff checks passed.
- Compared all **81 embedded trainer start states** before and after. The final states have a page title, exactly one visible Back control, no oversized empty artwork container and no horizontal page overflow.
- Checked all **34 Practice Library routes at a measured 390px CSS width**. Each has a visible title and one return control; settled layouts have no horizontal overflow.
- Checked Writing, Practice Hub, Verb Conjugation, Letter Writing, Culture Quiz, Phrases Practice and Grammar Cheat Sheet at a measured **320px CSS width**. No horizontal overflow.
- Confirmed Words is collapsed by default, contains all 103 cards and ten subtopics, and preserves its section spacing on phones.
- Played Word Search through a full six-letter selection and correct answer; the found word and Arabic meaning appeared. Tests also cover 400 seeded puzzles and all legacy reward mappings.
- Downloaded and rendered three one-page A4 landscape certificate PDFs: violet, yellow and an Arabic name in green. Visually checked the final rendered documents for clipping, name fit, Arabic shaping, result accuracy and legibility.
- Checked the learning-session dialog at a measured 320px width; it stays within the viewport and scrolls when necessary.
- A fresh production page load produced no browser console warnings or errors. Older audit-tab logs include messages from earlier preview builds and are not treated as final-build failures.
- Byte comparison confirmed **171 existing data, store, session-storage and font-layout files unchanged** from the start of this pass. The generated speech catalogue and the corrected Word Search implementation are deliberate exceptions outside that protected set.

This is a UI and targeted functional audit. Opening all start screens does not establish that every question in every practice bank has been independently reviewed for educational accuracy.

## Evidence

The local evidence folder is `outputs/practice-ui-session-certificate` under the workspace root. It contains the before/after trainer measurements, phone route checks, protected-file hashes, screenshots, build/test logs and rendered QA certificates. QA learner names and results are test data, not user credentials.

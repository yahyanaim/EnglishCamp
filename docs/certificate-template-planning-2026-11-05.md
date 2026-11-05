# Certificate template and evidence-based planning

Implemented 5 November 2026. Existing course content, test answers, scoring, font configuration and learner progress remain unchanged.

## Certificate

The HTML preview and portrait A4 export now follow the supplied reference's hierarchy: compact EnglishCamp branding, CEFR English test heading, learner name, centered score rosette with the existing mascot, four assessed-skill indicators, award date on a curved boundary, and a tinted results panel with the CEFR reference row and individual skill rings. The requested negative certificate sentences were removed. The certificate retains a concise positive description as a personal study estimate and labels partial/unassessed results accurately. No EF SET branding or score thresholds are used.

The real offline QR still contains the printed name, date, version and skill results. The sample PDF is synthetic layout data, not an actual learner's assessed result. Arabic names and partial profiles were also rendered successfully.

The separate result badge now uses compact inline sizing rather than a large tile. The placement heading and certificate heading say CEFR English test.

## Study planning

Each scheduled session now includes an original concrete practice brief appropriate to that skill's own measured level. Stronger skills retain their individual level. Four-week cycles do not automatically increase difficulty. Calendar exports include the same practice brief, weekly output, success check and later-day transfer/feedback reminder.

Each cycle has a saved readiness review with three level-specific can-do checks, first-practice and fresh-task dates, separate speaking/writing feedback checkboxes and a correction note. Both dates save together using an explicit form action. A small step up is suggested only when all checks are ticked, the fresh task is on a later day (not in the future), and feedback on both productive skills is recorded. These are planning reflections; they never alter a test result, course credit or certificate level. New fields are optional and validated; older named records round-trip unchanged.

British Council skill links use the verified level routes. C2 listening and C1/C2 speaking explicitly identify the available lower-level models and require the learner's more demanding practice brief. Cambridge reference hours are shown as cumulative guided-learning context, separate from independent-study schedule hours.

## Primary sources consulted

- Council of Europe CEFR levels: https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions
- British Council listening: https://learnenglish.britishcouncil.org/free-resources/listening
- British Council speaking: https://learnenglish.britishcouncil.org/free-resources/speaking
- Cambridge guided learning hours: https://support.cambridgeenglish.org/hc/en-gb/articles/202838506-Guided-learning-hours

## Validation

- 247 automated tests pass, including later-day readiness, feedback requirements, future-date rejection, named-record compatibility and unchanged skill difficulty over 12 weeks.
- TypeScript and the production build pass. Existing fonts were reused byte-for-byte from the prior successful build when Google Fonts could not be fetched.
- Final serving source matches the canonical source exactly. Both localhost:3027 and localhost:3030 serve the final build. Synthetic layout QA exists only in the isolated development preview.
- Certificate PDF rendered and visually inspected; real QR decoded and matched its displayed sample name, B2 result and 67/100 score.
- Live UI dates, checkboxes and notes retained after reload in an isolated QA session. At 390px, document width was 384px, with no horizontal overflow. Browser screenshots failed in the desktop tool; the PDF rendering is the delivered visual proof.
- Live OpenAI assessment remains dependent on the private server API key, unchanged by this presentation/planning update.

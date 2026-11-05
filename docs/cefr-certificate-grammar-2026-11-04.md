# CEFR-aligned diagnostic, certificate and grammar foundations

Implemented 4–5 November 2026. New assessment version: `englishcamp-cefr-2026.1`. Project package version remains 1.0.0.

## Research and claim boundary

CEFR is a framework, not one official test. The [Council of Europe level descriptions](https://www.coe.int/en/web/common-european-framework-reference-languages/level-descriptions) and [2020 Companion volume](https://rm.coe.int/cefr-companion-volume-with-new-descriptors-2020/16809ea0d4) informed the new task blueprint. Reception and production are reported separately. The [official examination-linking manual](https://www.coe.int/en/web/common-european-framework-reference-languages/relating-examinations-to-the-cefr) describes the work needed to establish a defensible relationship with CEFR.

The product therefore says **CEFR-aligned diagnostic estimate**. It does not claim Council of Europe approval, independent calibration, accreditation or EF SET equivalence. The tasks are original EnglishCamp material. Targets and thresholds need independent review, piloting, item analysis, standard setting and validation before any stronger proficiency claim. Synthesised recordings do not establish comprehension across all authentic accents, speeds or environments. Monologic responses and prompted writing do not establish every interaction or mediation skill.

## Rebuilt test

- 18 language-use questions: two grammar and one vocabulary item at each target from A1 to C2. These are a diagnostic supplement, not a substitute for communication skills.
- 18 reading questions: three evidence, purpose or inference questions for each of six original texts. Targets progress from short practical information to nuanced argument and irony.
- 18 listening questions: three questions per original passage, with six local Microsoft Sonia neural recordings. A passage only needs to be heard once to unlock its three items; replay remains available. Transcripts and keys appear after finishing.
- Two writing and two speaking responses at the difficulty suggested by receptive evidence. There are two authored prompts per skill at every target band, 24 productive prompts in total. Prompts remain fixed once selected for an attempt.
- 58 steps in a complete attempt. About 60–90 minutes is suggested; learners can save, resume or leave a skill unassessed.

Receptive bands require at least two of the three items at a target and supported lower bands. Insufficient foundation coverage means no band is reported. Below-A1 evidence is labelled Pre-A1, with A1 foundations recommended for study. Productive estimates require two independently assessed responses, are capped at task demand, and cannot hide a weak dimension through averaging. The speaking rubric is versioned; earlier v1 scores retain their 0–5 meaning while the new rubric adds C2 with 0–6 anchors.

The overall study base supports the lowest assessed skill. Reading, listening, writing and speaking retain separate difficulty recommendations in the study plan, including C2. The **EnglishCamp diagnostic index**, when available, averages the four skill percentages. It is an internal descriptive index; it does not determine the CEFR band and does not use EF SET thresholds. Skipped listening or missing productive assessment prevents a complete four-skill index.

## Storage and assessment service

The new state is an optional, versioned member of the existing named placement record. Old answers, results, certificates, course progress, rewards and session identity are preserved. An old result is never regraded as the new test. Productive drafts stay in the named tab. A new placement creates a fresh timetable identity so old checkmarks do not falsely complete different work.

Automatic writing and speaking assessment requires the approved OpenAI service and a private server API key. The current local environment still has no key; integration tests use isolated stubs, not fabricated learner grades. The product displays an unavailable state until configured. Each learner explicitly approves each recording or written response before sending it. No account name field, other answers or notes are included; the response itself may naturally contain personal information. Editing writing clears its previous score, and returned results must match a SHA-256 response fingerprint. Provider failures, invalid outputs and insufficient evidence never become scores.

See [the assessment setup notes](automatic-speaking-placement.md) and `.env.example` for configuration. API data handling is described in [OpenAI's data controls](https://developers.openai.com/api/docs/guides/your-data).

## Certificate and QR

The portrait template follows the supplied example's hierarchy while using the existing EnglishCamp mascot, fonts and selected palette. Two fox illustrations frame the central result. It includes the learner's name, date, diagnostic/partial status, four skill results, a CEFR target strip, record identifier and test version. The HTML preview and downloaded PDF share the same report logic.

The QR is generated locally with `qrcode`; no QR service receives learner data. It contains the printed name and result summary as UTF-8 text. A scanner can read the text offline. It is deliberately not a fake public verification link or digital signature: named tab records are local and editable. Anyone with the certificate can read the information it prints, including through its QR. No new learner database was added.

## Grammar additions

Four original, additive reference lessons appear on both `/grammar` and `/grammar/cheat-sheet`, collapsed initially:

1. Singular and plural nouns: regular spelling, irregular and unchanged forms, agreement and possession distinctions, with a small vector diagram.
2. Countable and uncountable nouns: articles, measured quantities, units, servings and paired clothing nouns.
3. Subject and verb agreement: the head noun, intervening phrases, each/every and auxiliary questions.
4. Quantity expressions: some/any, much/many, a few/few and a little/little.

Each lesson includes contextual examples, three interactive checks with feedback after an answer, and a source link. Existing reference content is preserved. The downloadable print reference now contains 15 sections and the existing position/movement diagrams.

Sources: [British Council count nouns](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/count-nouns), [countability problems](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/common-problems-count-uncount-nouns), [quantifiers](https://learnenglish.britishcouncil.org/free-resources/grammar/english-grammar-reference/quantifiers), and [Purdue OWL agreement](https://owl.purdue.edu/owl/general_writing/grammar/subject_verb_agreement.html). Wording, examples and practice items are authored for EnglishCamp rather than copied exercises.

## Final verification

244 automated tests pass; TypeScript, production build and whitespace checks pass. Browser checks covered question saving/resume, listening gating, shared passage playback, writing-draft restoration, a complete partial-result flow, timetable creation, new grammar checks, and 320/390 pixel layouts. The certificate PDF was rendered and its QR independently decoded; the downloadable grammar PDF was rendered and checked against its source manifest. Twenty-six HTTP checks passed across ports 3027/3030, including all six audio hashes. Existing course/mock banks and state stores were preserved. Live OpenAI scoring remains unverified until the server API key is configured.

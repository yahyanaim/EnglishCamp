# Practice and grammar refinements — 2 November 2026

This pass responds to the screenshots of the pronoun quiz, translation introduction and examination-track navigation. It preserves the existing fonts, palette controls, course lesson banks, mock-exam question banks and YouTube frame.

- Restored the four course-progress bars. They read the same accepted-stage percentages as the course overview and statistics; practice XP does not automatically complete a course module.
- Repaired Idiom Match replay, cumulative scoring and selection resets. Three rounds contain five distinct pairs each, with no repeated idioms or meanings. Matching uses stable idiom identifiers rather than column positions. Examples become available after finishing a round.
- Removed the missing pronoun from the pre-answer instruction and withheld completed-sentence audio. The quiz now asks learners to choose the pronoun, then explains its grammatical role after submission. Added context to the self-teaching question to distinguish it from teaching another person.
- Expanded both the verb reference and practice trainer to twelve tense/aspect choices. Preserved existing verb data and handled subject agreement, irregular forms and British/American variants. Continuous practice excludes usual stative meanings that would need additional context.
- Made all eleven grammar cheat-sheet sections collapsed initially. Each Arabic control opens an RTL explanation as well as the existing translated reference material. Printing still includes every section. The main grammar reference uses the same compact accordion and Arabic controls.
- Compacted practice introductions, translation direction controls and examination-track rows. Letter tasks appear before tips, with task and draft beside each other on desktop and stacked on phones. Model answers require a draft first.
- Kept the initial header, navigation and level render stable while English URL rewrites and saved progress hydrate. This prevents the direct verb-conjugation route from falling back to a client rerender.
- Expanded shadowing from eight to twelve clips. A1/A2/B1/B2 controls now visibly filter the video library. Added conversation turns identify their speakers. Levels are suggested practice levels, not official CEFR certification.

New source videos, all published by VOA Learning English and shorter than two minutes:

| Practice level | Video | Duration |
| --- | --- | --- |
| A1 | [Thank You](https://www.youtube.com/watch?v=VDDB2tWE0jU) | 20 s |
| A2 | [Around the Corner](https://www.youtube.com/watch?v=fNk6ZFK8NsI) | 60 s |
| B1 | [Break the News](https://www.youtube.com/watch?v=BKNJxpdNAtY) | 61 s |
| B2 | [A Clean Slate](https://www.youtube.com/watch?v=iVk7Ft6gl5w) | 60 s |

The selected lines are practice excerpts, not a synchronized full-video transcript. The existing player remains independent of the Microsoft model-line recordings. Eighteen new fixed English lines were generated and checked through the existing Microsoft neural endpoint; every response was audio/mpeg with HTTP 200. No learner text, notes or microphone recordings were sent.

Automated coverage includes the full existing regression suite plus pronoun-answer disclosure, unique idiom rounds, all twelve tense forms, irregular and alternate forms, Arabic section coverage and level-organized short conversations. Browser checks cover three idiom rounds, wrong-match recovery, replay, answer timing, tense selection and grading, collapsed Arabic sections, letter drafting, examination navigation and phone layouts at 320 and 390 CSS pixels.

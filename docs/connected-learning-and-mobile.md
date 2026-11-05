# Connected learning and mobile repairs — 2 November 2026

This patch keeps the core course curriculum, mock-exam questions, fonts, named session storage and established page structure. It addresses the reported empty adjective choice, unstable daily challenge, disconnected activity/course displays, vocabulary saving and mobile styling.

## Functional corrections

- Daily Challenge uses a deterministic daily selection without mutating the quiz bank. Answers resume after reload. Feedback stays visible until Next. The displayed question reward plus 5 XP is awarded once when the day's challenge is finished, using a date-specific completion ID. Completed results survive reload.
- Adjective Forms replaces suffix concatenation (which rejected valid spelling changes) with contextual full-word choices. All choices are visible, there is one correct answer, and explanations appear after answering. Completion IDs use stable authored question IDs.
- Activity includes exercise rewards, practice XP, quizzes, lesson completion and flashcard reviews. Dated legacy lesson/quiz evidence is backfilled. Older saved last-active and consecutive streak dates are retained without inventing a number of activities or a full historical timeline.
- Weekly goals, the study plan and weekly report reconcile against dated XP/lesson evidence after learner restoration. Known earlier goal credit is retained and newly observed rewards are counted once. The report’s invented `lifetime XP % 100` daily bar is replaced with recorded dates and amounts, and vocabulary mastery uses the same level-3 threshold as My Bank.
- Course cards, the overview, statistics and learning rail share accepted stage counts. Statistics now match actual lesson IDs rather than an incorrect course-ID prefix. Practice XP contributes to the learning level; unrelated practice does not falsely complete course modules.
- Article word cards show a locally available Arabic meaning and an original English example, with a persistent Save to My Bank confirmation and direct bank navigation. Saved entries retain their example. Existing meanings, personal notes and mastery are preserved. If the word has no exact entry in the local library, the card explicitly labels the existing Arabic paragraph as context rather than claiming it is a dictionary meaning.

Six shared quiz explanations/prompts are also corrected: current TOEFL reading, listening and speaking, a general paragraph topic-sentence question, an explicitly dated IELTS chart, and a more accurate distractor explanation. IDs, rewards, correct option positions and all other quiz questions are preserved. The format corrections follow [ETS’s current content specification](https://www.ets.org/toefl/test-takers/ibt/about/content.html?version=after-jan-2026).

## Presentation

- Arabic strategy blocks have RTL direction and right alignment; translated steps sit beneath their English step.
- Mock track navigation uses the site's compact rounded selection treatment. Exam cards use the same accent buttons and keyboard-operable track titles.
- Mastery markers are 14 × 14 px circles inside separate touch controls.
- Shadowing reuses the established course YouTube frame and click-to-load facade. The player remains 16:9. Main transport controls are 44 px high, with a 52 px-wide play button; they wrap at phone widths.
- Violet remains the default accent. The toolbar palette offers violet, green, yellow, blue and a custom colour. Buttons, selections and original SVG vector icons use connected colour roles. Bright colours use a darker primary fill for white-label contrast. Appearance is saved on the device separately from named learning data.

## Added speaking videos

All four additions are from VOA Learning English, show real speakers and are under two minutes. Selected publisher dialogue is paired with authored Arabic support. Levels are suggested practice levels, not certified CEFR assessments. Original videos retain their own speakers; separate practice models use Microsoft neural speech.

| Practice | Video | Publisher duration source |
| --- | --- | --- |
| Asking for help | [Hold Your Horses](https://www.youtube.com/watch?v=mqPgWweY1vA) | [VOA](https://learningenglish.voanews.com/a/7983330.html), 60 seconds |
| Talking about your day | [On the Ball](https://www.youtube.com/watch?v=DLi2txV9IVc) | [VOA](https://learningenglish.voanews.com/a/7990719.html), 59 seconds |
| Discussing a mystery | [No Brainer](https://www.youtube.com/watch?v=b_ka3-253h0) | [VOA](https://learningenglish.voanews.com/a/7967134.html), 60 seconds |
| Plans and reality | [Pie in the Sky](https://www.youtube.com/watch?v=gBYnewP1MmY) | [VOA](https://learningenglish.voanews.com/a/8002401.html), approximately 60 seconds; YouTube listing 61 seconds |

Publisher text and YouTube descriptions were checked on 2 November 2026. [VOA source-use terms](https://learningenglish.voanews.com/p/6021.html). All 23 newly selected dialogue models were generated and verified through the existing Microsoft neural endpoint. No learner answers, notes or microphone audio were sent.

## Validation

177 automated tests pass, including new regressions for stable daily questions, exact once-per-date XP, retained legacy activity, consistent course stages, complete adjective choices, Arabic/example bank persistence and contrast in both themes. The TypeScript check passes. Existing curriculum, assessment, session isolation, narration and font contracts remain checked with explicit reviewed deltas for this patch.

Browser verification uses a separate local QA origin, including 320 px and 390 px phone widths, a signed-in learner with a long name, and native YouTube playback. The 320 px named header has no horizontal overflow. The QA challenge awarded 70 XP once; all weekly surfaces show the same 75 recorded XP; a real accepted guided stage shows 1% on the card, rail and statistics after reload. Screenshots and build/test logs are stored outside the repository in the task's `outputs/connected-practice-2026-11-02` directory.

# Practice and shadowing follow-up audit

Date: 5 November 2026

> Final follow-up: the added Grammar Reference and Cheat Sheet lessons are reference-only, with no exercises or XP controls. Word topics also have no XP controls. Grammar Reference was removed from the Practice Hub, leaving 80 entries. Previously earned records remain intact. The final update adds numbered seals and automatic mascot celebrations for new badges; 267 tests pass. Earlier counts and completion descriptions below record the audit pass at that point in the work.

## Scope and outcome

The follow-up inventories all 81 entries in the Practice Hub and checks question, feedback and reveal paths in their source. A new regression check renders 348 questions from 23 literal question banks before a learner responds. Fourteen additional Hub components needed corrections; saved-word practice also needed progress integration.

The existing website surfaces, colour variables, fonts, return navigation and YouTube frame are retained. Course/module IDs, previous completion records, learner names, notes and manual word mastery are preserved.

This is targeted source review and regression coverage. It is not a claim that every possible generated question or every grammatical interpretation has been exhaustively validated. Reference pages and error-review pages intentionally show worked answers; their behaviour remains distinct from unanswered quizzes.

## Corrections

| Exercise | Finding and correction |
| --- | --- |
| False Friends | The target word appeared in both the question and the correct option. The prompt now supplies its meaning and asks for the word. Removed a duplicate choice and a misleading distractor. |
| Prepositions with Pronouns | Several prompts repeated the required preposition before the gap. Replaced them with contextual gaps and corrected two unsuitable constructions. |
| Discourse Markers Practice | Sentence mode printed the missing marker; Arabic mode exposed the English paraphrase. Hide these until a response and choose distractors with distinct discourse functions. |
| Comparatives | Example placeholders disclosed the answers for *good*. Use neutral comparative/superlative instructions. |
| Word Formation | A clue contained *friendship*, its answer. Reworded it; removed duplicate options in three other items. |
| Compound Nouns | Removed a duplicate *football* option. |
| Spelling | Removed a duplicate *kitten* option. |
| Infinitive constructions | Removed five parenthetical cues that supplied the required unchanged form. |
| Conditionals | Removed the explicit *would* cue from a question testing that word. |
| Subordinate Clauses | A prompt printed completed answer sentences. It now describes the word-order task. |
| Timed Challenge | Replaced the explicit *read – past* answer cue with the time context *yesterday*. |
| Question Words | Added enough context to distinguish intended meanings and accept *who/whom* for object questions. |
| Imperative | Hide the verb heading when it supplies the answer to the gap. Show it after the response. |
| Noun Forms | Replaced a heading that gave the required unchanged form with a neutral instruction. |
| My Bank: Quiz and Write | Record reviews and shared XP. Prevent duplicate submissions, repeated answer choices and quiz questions with fewer than four distinct meanings. One-word writing practice remains available. |

The screening allows necessary grammar context, such as the first *the* in “The more …, the better …”. It does not simply delete every occurrence of a word also used in an answer choice.

## Five new everyday shadowing videos

All five original uploads are approximately one minute (60–61 seconds), below the two-minute limit. Each contains people communicating. The player selects the conversational portion, with timed lines, spelling, Arabic translations, speaker labels, topic badges and a transfer task.

| Situation | Original upload | Selected dialogue | Sources |
| --- | ---: | ---: | --- |
| Inviting someone to lunch | 61 seconds | 9.5 seconds, 4 lines | [YouTube](https://www.youtube.com/watch?v=rvpQ-aQskoo), [VOA publisher](https://learningenglish.voanews.com/a/1726655.html) |
| Changing a daily routine | 60 seconds | 23.25 seconds, 5 lines | [YouTube](https://www.youtube.com/watch?v=tyN89pAw_JU), [VOA publisher](https://learningenglish.voanews.com/a/7958335.html) |
| Sharing an interest in someone's life | 60 seconds | 20.75 seconds, 7 lines | [YouTube](https://www.youtube.com/watch?v=oeIUhjCyNDM), [VOA publisher](https://learningenglish.voanews.com/a/7974239.html) |
| Catching up after games at a fair | 60 seconds | 22.5 seconds, 6 lines | [YouTube](https://www.youtube.com/watch?v=P_QtdNMFEx0), [VOA publisher](https://learningenglish.voanews.com/a/7932782.html) |
| Talking about snacks | 61 seconds | 9 seconds, 4 lines | [YouTube](https://www.youtube.com/watch?v=hfR3lP2bHe8), [VOA publisher](https://learningenglish.voanews.com/a/2510754.html) |

The playlist now contains 14 conversations; the previous nine selections remain. The lunch upload is credited to VOA Türkçe and VOA Learning English. The other four are credited to VOA Learning English. Publisher captions and source timings were checked locally; upload duration and embedding metadata were also checked. [VOA content terms](https://learningenglish.voanews.com/p/6021.html) are linked from the player.

The Microsoft model-voice route remains in use. This update does not substitute synthetic narration for the original video speakers.

## Connected progress

- Shadowing records deliberate practice through **I practised this line**: 2 XP once per line, plus 10 XP once when every selected line in a conversation is practised.
- Playlist entries show **Practised** after conversation completion. Reloading retains the record.
- Saved-word Quiz and Write award 5 XP once per correct word in each mode. Every submitted attempt updates the existing word-review count and review date.
- These records use the existing progress store, activity events, streaks, level calculation and badge rules. They do not create a second independent XP total.
- Existing exam-course bars continue to measure accepted course stages. Shadowing and standalone word practice do not falsely complete unrelated course modules.
- Existing names, notes, manually selected mastery levels and earlier course progress remain intact. The existing local session storage rules still apply.

## Verification

- **264 automated tests passed**, no failures or skipped tests.
- Production compilation and TypeScript checks passed; all routes generated. Lint remains skipped by the project's existing build configuration.
- `git diff --check` passed. The final built application source matches the canonical repository source.
- Browser check: False Friends shows only the meaning and answer choices before a response; corrective explanation appears after an incorrect response.
- Browser check: four shadowing lines produce 18 XP once, a completion label and a playlist badge. The badge and XP survive a reload.
- Browser check: the new lunch video loads in the existing YouTube frame; playback advances the selected line and spelling with its timeline.
- Browser check: one saved word offers Write but does not produce a trivial one-choice quiz; four words produce distinct quiz choices. A writing attempt updates the word's review record.
- Browser check: combined shadowing, one correct writing response and one correct vocabulary quiz response show **28 XP**, **7 exercise records** and **1 active day** in Statistics.
- Checked the corrected quiz and shadowing at a 390 × 844 phone viewport; no horizontal overflow. Retained the current controls and visual styling.
- Fixed a duplicate recorder that appeared when switching shadowing lessons: the recorder and progress components now have distinct React keys. Switching lessons and lines leaves one recorder.

The verified build is running locally on ports **3027** and **3030**, bound to this computer. Port 3027 was checked in the browser after activation. No GitHub push was requested or performed for this follow-up.

Reproduce the inventory with `node scripts/audit-practice-inventory.cjs`; run regression checks with `npm test`.

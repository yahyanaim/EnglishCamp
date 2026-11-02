# Shadowing workspace and named learning sessions

1 November 2026.

The shadowing page follows the supplied reference's content arrangement in EnglishCamp's existing violet system. The main column now starts directly with a wide video, followed by one compact playback toolbar, a centered sentence panel with word-by-word spelling below the words, and a slim microphone bar. The former separate page heading and duplicate control bars are removed. The sentence panel keeps its translation and spelling controls along its bottom edge. The side panel defaults to larger video thumbnails, with transcript and level choices in its header. The side column switches between selected transcript lines and the four existing verified short clips. Narrow screens stack the same panels. The learning-progress rail is hidden on this page to give the workspace sufficient room. No new course text, video or official CEFR classification is invented.

Sentence playback uses Microsoft neural speech; video playback keeps the publisher's speaker. Model and video speed are independent, explicitly labelled controls in the shared toolbar. Previous/next, replay and model playback also support arrow keys, R and Space while focus is outside form controls. The word helper shows letter spelling, not an invented IPA transcription. Transcript selection changes the model line; it does not pretend to seek the video to an unverified timestamp. Recording starts only after an explicit button press, stops at 60 seconds and releases the microphone on cancellation or navigation. The replay remains in memory for the current line and can be downloaded; it is not uploaded or automatically graded.

## Progress belongs to a learner

Named learners now have separate browser-session namespaces for XP, course completions, badges, vocabulary, notes, goals, daily challenges, flashcard review scheduling and saved text attempts. Store schemas, XP rewards, levels and achievement conditions are unchanged. Returning to the same normalized name in the same tab restores the original profile number and fruit avatar as well as its learning records. Another name starts with its own records. Signing out keeps named progress and switches back to guest learning.

The first named learner inherits a copy of the old guest records. The originals are retained, and a migration marker prevents stale guest data from overwriting that learner on reload or being assigned to a later name. Existing name-only profiles are migrated without changing their avatar or number. Rehydration merges against initial store data rather than the preceding learner's data, preventing missing fields from leaking between learners. Unsaved responses or active recordings block a learner switch with an inline explanation.

Names and their textual records remain in `sessionStorage`; no server account is created or personal identifier transmitted. Reloads and navigation preserve them. Closing the tab normally ends that browser session, although browser session restoration can restore session storage. This is local name-only access, not authentication or a backup service. The UI states this limitation.

Course/mock recording blobs remain in local IndexedDB. Named takes use an opaque tab ID plus the learner number so another tab's learner #1 cannot read them by using the same counter. Old guest takes remain in their original keys. The new shadowing recorder uses an in-memory replay only. Deleting a learning session removes its text namespace and profile and requests deletion of its own named recording blobs; other learner and guest records are kept.

## Level celebration

A single global listener observes newly earned XP and opens the existing centered shadcn/Radix modal when the learning level increases. It uses the learner's name, new level, XP and a bounded trophy illustration. Store restoration, sign-in, profile switching and reloads suppress this celebration. Dismissing the popup does not change XP or award additional credit. Learning levels are distinct from CEFR labels.

## Validation

Automated isolation tests cover repeated sign-in, distinct names, legacy migration, deletion isolation, complete store rehydration and cross-tab recording namespaces. Existing content, score, font and practice checks remain in place with the explicitly reviewed storage-routing changes recorded in the consistency contract. Browser QA is performed on an isolated local origin, without changing the user's learning records.

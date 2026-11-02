# Illustrated reading and natural practice audio

Updated 1 November 2026.

- `/vocabulary` opens Read & Listen: 22 bilingual articles, including six new original readings. The new subjects are a community garden, a library of things, a repair café, commuting, revising a design plan, and the choices behind maps. Existing article text is retained.
- Narration follows the visible text. A learner can pause, restart, seek, slow playback without changing pitch, and replay a selected word in context. Keyboard users can move between words with arrow keys. Arabic is revealed explicitly, paragraph by paragraph; it is not presented as an automatic word translation.
- The six new violet SVG scenes illustrate their subjects inside the article headers and library cards. Practice scenes now sit beside standalone page headings, or in a compact integrated header for embedded trainers.
- `/topic-vocabulary` contains 18 topics and 264 entries. Six new topics add 72 entries with definitions, contextual examples and Arabic meanings. Original topics remain unchanged; search also accepts Arabic.
- Conversation uses 205 pre-recorded lines across 23 scenarios. Listening Lab has recordings for all 430 words and 78 collocations. Article key vocabulary has dedicated recordings.
- The 884 unique fixed-text MP3 recordings use Microsoft neural voices: Sonia for narration and the conversation partner, Ryan for the other conversation role. Files are served locally from `public/media/practice-audio`; no speech-service request is made during practice. Learner answers, notes and microphone recordings are not part of generation.
- Provider word timing is aligned with the displayed whitespace tokens. Some number expressions share one timing boundary; those words highlight and replay together, preserving the spoken phrase rather than cutting it arbitrarily.
- The learning-level circle is a white-number violet button. It opens original encouragement appropriate to the gamification stage, with a different message on the next click. These messages do not claim to measure CEFR proficiency. XP thresholds and saved state are unchanged.
- British/American comparisons retain the existing data and use violet filters, paired labels, readable Arabic and responsive cards.

The recording manifest records the authored text, voice and file checksum. Regression checks cover preservation of all original articles/topics, complete fixed-text audio coverage, file integrity, cue alignment and encouragement selection. Production-build and browser checks cover playback, word replay, translations, topic/comparison filters, light/dark contrast and phone layouts.

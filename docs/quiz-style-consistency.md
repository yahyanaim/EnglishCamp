# Quiz styling and Grammar correction — 1 November 2026

The Grammar reference keeps its earlier structure and spacing. The added tip illustrations were removed. Pale panels now use readable, theme-aware foreground colours and the existing violet palette. The shared artwork component explicitly keeps its small inline grid dimensions, preventing an `inline` utility from letting an SVG expand to the container width.

Practice activities now use `PracticeFrame` at standalone entry points and within the Practice Hub. The hub's Grammar Reference and Verb Explorer are excluded from these quiz layout styles. The four existing level quizzes use the same frame.

The shared styles cover thin card borders, 12px card corners, 8px button corners, violet primary actions and selections, consistent spacing, question counters, progress indicators, answer controls, feedback and results. Setup, question and result surfaces are explicitly marked in the trainer components. Matching boards and longer writing tasks retain layouts appropriate to their interactions. The existing shadcn components and Tailwind setup are reused; no dependencies were added.

Decorative quiz emoji now use the existing small faceted violet artwork. Correct/incorrect symbols and semantic feedback retain their meaning. The level quizzes' older solid feedback fills with white text were replaced with readable pale feedback panels.

Question banks, prompts, choices, hints, models, timers, answer handlers, scoring, stored progress, notes, session profiles and font definitions are unchanged. The previous quiz review's proposed styling pass is now implemented; its separate proposal for a full pedagogical audit remains outside this styling update.

Browser verification uses a separate localhost:3030 origin. The short QA quiz's answers and XP do not affect learner data at localhost:3027. Verification covers Grammar proportions and contrast, quiz setup/question/result screens, correct and incorrect responses, matching selection, translation controls, embedded Practice Hub trainers, and phone/tablet/desktop layouts.

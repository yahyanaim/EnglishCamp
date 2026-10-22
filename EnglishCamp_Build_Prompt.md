# EnglishCamp — Full Build Prompt
## A Duolingo-style English Learning Platform (A1–B2) inspired by DeutschCamp

---

## 1. PROJECT OVERVIEW

Build **EnglishCamp** — a complete, gamified English learning web application targeting **non-native speakers** (primarily Arabic-speaking learners in the MENA region), structured around the **CEFR framework (A1 → B2)**. The app is a direct adaptation of the DeutschCamp architecture (Next.js 14, TypeScript, Tailwind CSS, localStorage for progress), swapping German content for English and sourcing all curriculum from **free, open-licensed resources**.

**Live reference to study:** https://deuschcamp.vercel.app  
**Source repo to fork/adapt:** https://github.com/HabibElmtahef/deuschcamp  
**Target deployment:** Vercel

---

## 2. TECH STACK (mirror DeutschCamp exactly)

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| State/Persistence | localStorage (no backend required) |
| Icons | Lucide React |
| Deployment | Vercel |
| Design System | Duolingo-inspired (see Section 9) |

---

## 3. FREE CONTENT SOURCES (use these exclusively)

All content must be sourced from open-licensed, freely accessible platforms:

### 3.1 Primary Grammar & Reading
- **British Council LearnEnglish** — https://learnenglish.britishcouncil.org  
  CEFR-labeled grammar, vocabulary, reading, and listening activities A1–C1. Freely accessible. Use as the canonical grammar reference for all levels.

- **Linguapress.com** — https://linguapress.com  
  200+ graded reading texts at A2–C2. Ideal for reading comprehension exercises at B1/B2. No account required.

- **Cambridge English (free tier)** — https://www.cambridgeenglish.org/learning-english/  
  Free sample tests, vocabulary lists, and grammar explanations organized by CEFR level.

### 3.2 Open Textbooks (CC-licensed)
- **"English for Everyone" structure** (adapt the topic sequence; don't copy copyrighted text) — use the topic and grammar progression as a curriculum skeleton.
- **OER Commons ESL resources** — https://www.oercommons.org (search "ESL CEFR") — CC-licensed grammar exercises and reading passages.
- **Open Educational Resources (ASCCC OERI)** — https://asccc-oeri.org/open-educational-resources-and-english-as-a-second-language/ — CC BY-licensed integrated-skills textbooks for A2–B2.

### 3.3 Vocabulary Lists
- **EVP (English Vocabulary Profile)** — Cambridge's public CEFR word lists. Use the free published word lists for each level to populate flashcard decks and vocabulary trainers.
- **Oxford 3000 / 5000** — publicly available word lists freely usable for educational purposes.

### 3.4 Listening & Pronunciation
- **BBC Learning English** — https://www.bbc.co.uk/learningenglish  
  Free audio/video content. Reference topics and dialogue structures (do not copy transcripts verbatim).
- **Voice RSS / ResponsiveVoice** free tier — for TTS pronunciation in flashcards.

### 3.5 Exam Prep (B2 level)
- **Cambridge B2 First (FCE) sample materials** — free samples from Cambridge's official site.
- **British Council B2 preparation** — free practice tests and topic vocabulary.

---

## 4. APP ARCHITECTURE — PAGES & ROUTES

Replicate DeutschCamp's routing structure exactly, replacing German-specific pages:

```
/                          → Landing page (EnglishCamp hero)
/dashboard                 → Main learner dashboard
/levels/a1                 → A1 level hub (25 lessons)
/levels/a2                 → A2 level hub (25 lessons)
/levels/b1                 → B1 level hub (25 lessons)
/levels/b2                 → B2 level hub (25 lessons)
/levels/[level]/lessons/[id] → Individual lesson page
/exercises/[id]            → Interactive exercises for each lesson
/quiz/a1                   → Level quiz (A1)
/quiz/a2                   → Level quiz (A2)
/quiz/b1                   → Level quiz (B1)
/quiz/b2                   → Level quiz (B2)
/flashcards                → 430+ vocabulary flashcards
/custom-flashcards         → User-created cards (My Cards)
/vocabulary                → Full vocabulary browser
/grammar                   → Grammar reference hub
/grammar/cheat-sheet       → Quick grammar cheat sheet
/practice                  → Practice Hub (80+ trainers & games)
/pronunciation             → Pronunciation guide
/alphabet                  → English phonics / IPA guide (replaces German alphabet)
/conversation              → Dialogue practice
/writing                   → Writing exercises (emails, essays)
/mock-exam                 → B2 mock exam (FCE-style)
/daily-challenge           → Daily challenge
/review                    → Spaced repetition review queue
/study-plan                → Weekly study plan
/stats                     → Progress & statistics
/badges                    → Achievements / badge gallery
/weekly-report             → Weekly learning report
/verb-tables               → Irregular verb tables
/cases-guide               → (rename to) Tenses Guide
/grammar-compare           → Grammar comparison tool
/study-strategies          → Study tips page
/challenge                 → Social challenge share
/satzmuster                → (rename to) Sentence Patterns
/regional                  → (rename to) British vs American English
```

---

## 5. CURRICULUM — LESSON CONTENT PER LEVEL

### A1 — Beginner (25 lessons, 50 XP each)

Content sourced from: British Council A1, Oxford 3000 (first 300 words), BBC Learning English Basics.

| # | Lesson Title | English Sub-title | Key Grammar Point |
|---|---|---|---|
| 1 | The English Alphabet & Phonics | IPA basics, vowels/consonants | Pronunciation rules |
| 2 | Greetings & Introductions | Hello, My name is... | Verb "to be" (I am) |
| 3 | Numbers, Dates & Time | 1–100, telling time | Cardinal/ordinal numbers |
| 4 | Articles: A, An, The | Definite vs. indefinite | Article rules |
| 5 | Verb "To Be" | am / is / are | Present simple: be |
| 6 | Verb "To Have" | have / has | Present simple: have |
| 7 | Question Words | What / Where / When / Who / Why / How | WH-questions |
| 8 | Family Vocabulary | mother, father, sister… | Possessives: my, your, his |
| 9 | Food & Drinks | Countable vs uncountable | Some / any / a lot of |
| 10 | Negation | don't / doesn't / isn't | Negative sentences |
| 11 | Colors & Adjectives | Describing things | Adjective placement |
| 12 | Weather & Seasons | It is hot / raining | Present continuous intro |
| 13 | Hobbies & Activities | I like / I love / I hate | Gerunds after like/love |
| 14 | Daily Routine | I wake up at 7... | Present simple (3rd person) |
| 15 | Shopping & Clothes | How much is...? | Prices + demonstratives |
| 16 | In the Classroom | pencil, teacher, whiteboard | Classroom commands |
| 17 | Body Parts | head, arm, leg... | Have got |
| 18 | Animals | farm, wild, pet animals | Plural forms |
| 19 | Countries & Nationalities | I am from Morocco | Nationalities + adjectives |
| 20 | Prepositions of Place | in, on, under, next to | Location prepositions |
| 21 | Furniture & Home | living room, bedroom... | There is / There are |
| 22 | Giving Directions | Turn left / go straight | Imperative |
| 23 | Feelings & Emotions | happy, tired, scared... | Look / feel + adjective |
| 24 | Transport | bus, train, plane... | How do you go to...? |
| 25 | At the Restaurant | ordering food | Can I have...? |

### A2 — Elementary (25 lessons, 50 XP each)

Content sourced from: British Council A2, Cambridge A2 Key, OER Commons A2 exercises.

| # | Lesson Title | Key Grammar Point |
|---|---|---|
| 1 | Past Simple: Regular Verbs | -ed endings, spelling rules |
| 2 | Past Simple: Irregular Verbs | Top 50 irregular verbs |
| 3 | Present Continuous | I am doing / She is working |
| 4 | Going to (Future Plans) | I am going to travel |
| 5 | Will (Future Predictions) | I think it will rain |
| 6 | Comparative Adjectives | bigger, more expensive |
| 7 | Superlative Adjectives | the biggest, the most... |
| 8 | Modal Verbs: Can & Could | ability, permission, requests |
| 9 | Modal Verbs: Must & Should | obligation & advice |
| 10 | Countable vs Uncountable | some / any / much / many |
| 11 | Pronouns: Subject & Object | I/me, he/him, they/them |
| 12 | Possessive Pronouns | mine, yours, his, hers |
| 13 | Adverbs of Frequency | always, often, never (position) |
| 14 | Prepositions of Time | at, on, in (time expressions) |
| 15 | Present Perfect: Introduction | I have been / I have eaten |
| 16 | Connecting Words | and, but, because, so |
| 17 | Asking for & Giving Opinions | I think that... / In my opinion |
| 18 | Health & The Body | doctor, hospital, symptoms |
| 19 | Work & Jobs | What do you do? |
| 20 | Travel & Tourism | booking, checking in |
| 21 | Technology & Devices | smartphone, laptop, app |
| 22 | Money & Banking | earn, spend, save, account |
| 23 | Environment Basics | recycle, pollution, climate |
| 24 | Culture & Celebrations | festivals, traditions |
| 25 | Reading & Writing Practice | Short paragraph construction |

### B1 — Intermediate (25 lessons, 50 XP each)

Content sourced from: British Council B1, Cambridge B1 Preliminary, Linguapress B1 reading texts.

| # | Lesson Title | Key Grammar Point |
|---|---|---|
| 1 | Present Perfect vs Past Simple | for/since vs. time markers |
| 2 | Present Perfect Continuous | I have been waiting |
| 3 | Past Continuous | was/were + -ing |
| 4 | Used to / Would | past habits |
| 5 | Conditionals: Zero & First | If it rains, I will... |
| 6 | Conditional: Second | If I had money, I would... |
| 7 | Passive Voice: Present & Past | is made / was built |
| 8 | Reported Speech | She said that she was tired |
| 9 | Relative Clauses | who, which, that, where |
| 10 | Modal Verbs: Deduction | must be / can't be / might be |
| 11 | Infinitive vs Gerund | I want to go / I enjoy going |
| 12 | Phrasal Verbs | give up, look forward to... |
| 13 | Linkers: Contrast & Concession | although, however, despite |
| 14 | Linkers: Purpose & Result | in order to, so that, as a result |
| 15 | Question Tags | You like it, don't you? |
| 16 | Quantifiers | too much, enough, a great deal |
| 17 | Discourse Markers | firstly, on the other hand |
| 18 | Technology & Media | social media, news, digital life |
| 19 | Education & Learning | university, exams, skills |
| 20 | Health & Lifestyle | diet, exercise, mental health |
| 21 | Work & Career | interviews, CVs, promotion |
| 22 | The Environment | climate change, sustainability |
| 23 | Culture & Society | customs, values, identity |
| 24 | Reading: Argumentative Text | scanning, skimming strategies |
| 25 | Writing: Formal Email | format, register, phrases |

### B2 — Upper Intermediate (25 lessons, 50 XP each)

Content sourced from: British Council B2, Cambridge B2 First (FCE) free samples, Linguapress B2 texts.

| # | Lesson Title | Key Grammar Point |
|---|---|---|
| 1 | Conditional: Third & Mixed | If I had studied, I would have passed |
| 2 | Passive: All Tenses | has been built / will be completed |
| 3 | Reported Speech: Advanced | reporting questions, requests |
| 4 | Subjunctive & Formal Structures | It is essential that he be... |
| 5 | Inversion for Emphasis | Never have I seen... / Not only... |
| 6 | Cleft Sentences | It was John who broke it |
| 7 | Nominalization | the development of / an analysis |
| 8 | Advanced Relative Clauses | non-defining, preposition + which |
| 9 | Participle Clauses | Having finished, she left |
| 10 | Hypothetical & Wishes | I wish I had / If only it were |
| 11 | Ellipsis & Substitution | She went and so did I |
| 12 | Hedging & Academic Language | It is possible that / tends to |
| 13 | Collocation & Word Families | make/do/take/have + noun |
| 14 | Idiomatic Expressions | Formal vs. informal idioms |
| 15 | False Friends & Common Errors | Classic mistakes at B2 |
| 16 | Reading: Multiple Texts | comparing viewpoints |
| 17 | Listening: Inference | implied meaning, speaker attitude |
| 18 | Writing: Essay Structure | introduction, arguments, conclusion |
| 19 | Writing: Report & Review | register, headings, recommendations |
| 20 | Speaking: Agreeing & Disagreeing | hedging, polite disagreement |
| 21 | Speaking: Speculating | I imagine / It seems likely that |
| 22 | Academic Vocabulary (AWL) | Top 200 Academic Word List items |
| 23 | Business English Basics | meetings, emails, presentations |
| 24 | FCE Exam Strategies | Use of English, Reading, Writing tips |
| 25 | Full Mock Speaking Assessment | long turn + discussion simulation |

---

## 6. FLASHCARD SYSTEM (430+ cards)

Mirror DeutschCamp's flashcard structure. Each card: **English word → Arabic translation + example sentence in both languages**.

### Card Categories (20 categories)
| Category | Count |
|---|---|
| Verbs (irregular + common) | 60 |
| Nouns (everyday objects) | 60 |
| Adjectives | 30 |
| Adverbs | 20 |
| Phrasal Verbs | 25 |
| Collocations | 20 |
| Food & Drink | 25 |
| Family | 15 |
| Animals | 20 |
| Body Parts | 15 |
| Clothes | 15 |
| Colors | 15 |
| Numbers / Dates / Time | 20 |
| Greetings & Phrases | 15 |
| School / Work | 15 |
| Shopping | 15 |
| Transport | 15 |
| Weather | 15 |
| Time Expressions | 20 |
| Places | 15 |
| **Total** | **430** |

Each flashcard object (TypeScript):
```typescript
interface Flashcard {
  id: string;
  english: string;
  arabic: string;
  phonetic?: string;       // IPA pronunciation
  partOfSpeech: string;
  category: string;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  example: {
    english: string;
    arabic: string;
  };
  plural?: string;         // for nouns
  pastTense?: string;      // for verbs (irregular)
  pastParticiple?: string;
}
```

---

## 7. PRACTICE HUB — 80+ TRAINERS

Adapt all 81 DeutschCamp practice modules. Replace German-specific ones with English equivalents:

### Grammar Trainers
- Article Trainer: a / an / the (or no article) for 40+ nouns
- Verb Conjugation: all persons, all tenses
- Tenses Identifier: read a sentence → select the tense
- Passive Voice: transform active sentences
- Conditional Builder: select correct conditional type
- Reported Speech: direct → reported
- Relative Clause Connector: join two sentences with who/which/that
- Modal Verbs: fill the correct modal
- Gerund vs Infinitive: choose the correct form
- Adjective Order: arrange adjectives before nouns
- Inversion: rewrite with inversion for emphasis
- Grammar Reference: browse all grammar rules
- Verb Explorer: full conjugation tables for any English verb
- Error Correction: find and fix mistakes

### Vocabulary Trainers
- Synonyms: match to the right synonym
- Antonyms: find the opposite
- Word Formation: noun/verb/adjective/adverb derivations
- Collocations: make/do/take/have + noun
- Phrasal Verbs: choose the correct particle
- False Friends: avoid common Arabic-English translation errors
- Idioms: match idiom to meaning
- Spelling: -ible/-able, double consonants, silent letters
- Compound Nouns: combine two words correctly
- Academic Word List Trainer: formal vocabulary in context

### Sentence Structure
- Sentence Builder: drag tiles into correct order (SVO + adverbials)
- Word Order: SVOMPT rule practice
- Negation: don't / doesn't / didn't / haven't etc.
- Linkers Quiz: choose the right conjunction
- Question Formation: Yes/No and WH-questions
- Subordinate Clauses: that / because / although / when

### Games & Listening
- Hangman (English words)
- Memory Match (word ↔ definition)
- Word Search (hidden English words)
- Crossword Puzzle
- Dictation (type what you hear — uses TTS)
- Flashcard Race (60-second timed challenge)
- Speed Match (English ↔ Arabic)
- Unscramble (anagram of English words)
- Sprint (60-second vocabulary rapid-fire)
- Dialogue Practice (complete everyday conversations)
- Cloze Text (fill in the blanks in passages)
- Reading Comprehension (read → answer questions)

### Writing & Exam Prep
- Formal vs Informal Email Builder
- Essay Introduction Practitioner
- Proofreading: find errors in paragraphs
- FCE Use of English: key word transformations
- FCE Multiple Choice Cloze
- FCE Open Cloze
- British vs American English differences
- Pronunciation: minimal pairs (ship/sheep, bit/beat)

### Speed Games
- Tense Translator: read sentence → identify tense → translate
- Phrasal Verb Quiz: match to meaning
- Idiom Race: timed matching
- Collocation Speed: verb + noun pairs
- Dialogue Translator: EN ↔ AR sentence pairs

---

## 8. XP & GAMIFICATION SYSTEM

Mirror DeutschCamp's XP system exactly:

```typescript
const ACHIEVEMENTS = [
  { id: 'first_steps',     title: 'First Steps',       xpRequired: 50,   emoji: '🌱' },
  { id: 'dedicated',       title: 'Dedicated Learner',  xpRequired: 200,  emoji: '📚' },
  { id: 'vocab_star',      title: 'Vocabulary Star',    xpRequired: 500,  emoji: '⭐' },
  { id: 'grammar_hero',    title: 'Grammar Hero',       xpRequired: 1000, emoji: '🦸' },
  { id: 'quiz_master',     title: 'Quiz Master',        xpRequired: 1500, emoji: '🧠' },
  { id: 'b1_warrior',      title: 'B1 Warrior',         xpRequired: 2000, emoji: '⚔️' },
  { id: 'streak_king',     title: 'Streak King',        xpRequired: 3000, emoji: '🔥' },
  { id: 'b2_champion',     title: 'B2 Champion',        xpRequired: 4000, emoji: '🏆' },
  { id: 'polyglot',        title: 'Polyglot',           xpRequired: 5000, emoji: '🌍' },
  { id: 'englishmaster',   title: 'EnglishMaster',      xpRequired: 7500, emoji: '👑' },
];
```

Level progression (same as DeutschCamp, rename labels to English):
- Level 1: Newcomer (0–99 XP)
- Level 2: Explorer (100–299 XP)
- Level 3: Learner (300–599 XP)
- Level 4: Speaker (600–999 XP)
- Level 5: Communicator (1000–1499 XP)
- Level 6: Fluent (1500–2499 XP)
- Level 7: Advanced (2500+)

---

## 9. DESIGN SYSTEM — EnglishCamp Brand

Based on DeutschCamp's Duolingo-inspired design system. Replace German flag colors with a **Union Jack / British English theme** (red, white, navy) or go with a **neutral international English** palette (teal, amber, white). Recommended: **international palette**.

```css
:root {
  /* Brand Colors */
  --color-primary: #0EA5E9;        /* Sky Blue — English sky */
  --color-primary-dark: #0284C7;
  --color-secondary: #F59E0B;      /* Amber — warmth, energy */
  --color-accent: #10B981;         /* Emerald — correct answers */
  --color-danger: #EF4444;         /* Red — wrong answers */
  --color-warning: #F59E0B;        /* Orange — streak */
  
  /* Neutrals */
  --color-bg: #FFFFFF;
  --color-surface: #F8FAFC;
  --color-border: #E2E8F0;
  --color-text: #1E293B;
  --color-text-muted: #64748B;
  
  /* XP / Progress */
  --color-xp: #8B5CF6;
  --color-streak: #F97316;
  
  /* Duolingo-style UI */
  --radius-card: 16px;
  --radius-button: 12px;
  --shadow-card: 0 4px 0 rgba(0,0,0,0.12);
  --shadow-button: 0 4px 0 var(--color-primary-dark);
}
```

### App Name & Branding
- **App name:** EnglishCamp
- **Tagline:** "Your complete path from A1 to B2 English"
- **Logo:** 🇬🇧 or custom flag-neutral icon (open book + speech bubble)
- **Remove:** all German flags, Goethe-Zertifikat references
- **Replace with:** Cambridge B2 First / IELTS General references

---

## 10. CONTENT ADAPTATIONS FROM DeutschCamp

| DeutschCamp Element | EnglishCamp Equivalent |
|---|---|
| German alphabet page (`/alphabet`) | English IPA & phonics guide — 44 phonemes, vowel chart, consonant chart, minimal pairs |
| Cases Guide (Nominativ/Akkusativ etc.) | Tenses Guide — all 12 tenses with timeline diagrams |
| Verb Tables (irregular German verbs) | Irregular Verb Tables — 200 most common (base/past/past participle) |
| Regional German page | British vs American English — vocabulary & spelling differences |
| Satzmuster (sentence patterns) | English Sentence Patterns — SVOMPT, cleft sentences, inversion |
| Konjunktiv II trainer | Conditional & Subjunctive trainer |
| Passive voice trainer | Passive voice (all tenses) trainer |
| Grammar Cheat Sheet | English grammar one-page reference (tenses, articles, modals) |
| Mock Exam (Goethe B2) | Mock Exam (Cambridge B2 First style — Use of English, Reading, Writing) |
| "Neuling" level label | "Newcomer" |
| "Willkommen zurück!" | "Welcome back!" |
| Flashcards: German → Arabic | Flashcards: English → Arabic (with IPA) |

---

## 11. PRONUNCIATION PAGE (`/pronunciation`)

Replace the German Aussprache page with a dedicated English pronunciation tool:

### Sections:
1. **44 English Phonemes** — IPA chart with example words (interactive: click to hear TTS)
2. **Vowel Sounds** — short vs. long vowels, diphthongs
3. **Consonant Sounds** — voiced vs. unvoiced pairs (b/p, d/t, g/k, v/f)
4. **Minimal Pairs Trainer** — ship/sheep, bit/beat, live/leave, can/can't
5. **Word Stress Rules** — two-syllable nouns vs. verbs (REcord vs reCORD)
6. **Sentence Rhythm & Intonation** — rising vs. falling intonation
7. **British vs American Pronunciation Differences**

---

## 12. GRAMMAR REFERENCE (`/grammar`)

Organize by topic, mirroring DeutschCamp's collapsible accordion layout:

```
Tenses
  ├── Present Simple
  ├── Present Continuous
  ├── Present Perfect Simple
  ├── Present Perfect Continuous
  ├── Past Simple
  ├── Past Continuous
  ├── Past Perfect
  ├── Future: will / going to / present continuous
  └── Future Perfect & Continuous

Articles
  ├── Definite: the
  ├── Indefinite: a / an
  └── Zero article

Nouns
  ├── Countable & Uncountable
  ├── Plural forms (regular + irregular)
  └── Noun phrases

Adjectives & Adverbs
  ├── Order of adjectives
  ├── Comparatives & Superlatives
  └── Adverb placement

Verb Patterns
  ├── Infinitive vs Gerund
  ├── Modal Verbs (all)
  ├── Phrasal Verbs
  └── Passive Voice (all tenses)

Sentences & Clauses
  ├── Relative Clauses
  ├── Conditional Sentences (0–3 + mixed)
  ├── Reported Speech
  ├── Linkers & Discourse Markers
  └── Inversion & Emphasis

Prepositions
  ├── Time (at/on/in)
  ├── Place (at/on/in)
  └── Movement
```

---

## 13. LEVEL DESCRIPTIONS (update from DeutschCamp)

```typescript
const levels = [
  {
    id: 'a1',
    name: 'A1',
    subtitle: 'Beginner',
    description: `Welcome to EnglishCamp A1! This is where your English journey begins. You'll learn the alphabet and pronunciation basics, essential vocabulary, simple sentence structures, and everyday phrases. By the end of A1, you'll be able to introduce yourself, ask basic questions, order food, and understand simple conversations.`,
    duration: '2–3 months',
    lessons: 25,
  },
  {
    id: 'a2',
    name: 'A2',
    subtitle: 'Elementary',
    description: `A2 builds on your foundations with richer grammar: past simple, future tenses, comparatives, modal verbs, and more complex everyday vocabulary. You'll be able to handle routine conversations, describe past events, and express plans and opinions.`,
    duration: '3–4 months',
    lessons: 25,
  },
  {
    id: 'b1',
    name: 'B1',
    subtitle: 'Intermediate',
    description: `B1 marks your entry into real independence. You'll tackle present perfect, conditionals, passive voice, phrasal verbs, and discourse markers. At this level, you can discuss familiar topics fluently, express opinions, and handle most travel and work situations.`,
    duration: '4–6 months',
    lessons: 25,
  },
  {
    id: 'b2',
    name: 'B2',
    subtitle: 'Upper Intermediate',
    description: `B2 brings you to advanced competence. You'll master inversion, nominalisation, mixed conditionals, reported speech, and academic vocabulary. You can understand complex texts, write structured essays, express yourself fluently in professional and social settings, and prepare for the Cambridge B2 First exam.`,
    duration: '5–8 months',
    lessons: 25,
  },
];
```

---

## 14. INDIVIDUAL LESSON PAGE STRUCTURE

Each lesson at `/levels/[level]/lessons/[id]` should contain:

```
1. Lesson Header
   - Title (English + Arabic translation)
   - Level badge (A1/A2/B1/B2)
   - XP reward (50 XP)
   - Bookmark button

2. Introduction paragraph (2–3 sentences, plain language)

3. Core Explanation
   - Grammar table or vocabulary table
   - Highlighted rule boxes (💡 Tip)
   - Common exceptions / notes

4. Example Section
   - 8–12 example sentences
   - English → Arabic translation pairs
   - Context sentences in bold

5. Pronunciation Box (where relevant)
   - IPA for key words
   - Common pronunciation errors for Arabic speakers

6. Practice Link button → /exercises/[lesson-id]

7. Personal Notes textarea (saved to localStorage)

8. "Complete Lesson" button → awards 50 XP
```

---

## 15. QUIZ SYSTEM

Each level quiz (`/quiz/a1` etc.) should have:
- 20 questions (mix of multiple choice, fill-in-the-blank, matching)
- Timed (optional): 30 minutes
- Score out of 100
- XP awarded on completion (100 XP for passing, 50 XP for attempt)
- Review screen showing correct answers
- Results saved to localStorage

Question types:
```typescript
type QuestionType = 
  | 'multiple_choice'      // pick 1 of 4
  | 'fill_blank'           // type the missing word
  | 'word_order'           // arrange tiles
  | 'matching'             // match columns
  | 'true_false'           // statement about English usage
  | 'error_correction'     // find the mistake in a sentence
  | 'translation'          // EN → AR or AR → EN
```

---

## 16. DASHBOARD COMPONENTS

Mirror DeutschCamp's dashboard exactly, adapting labels:

```
Stats Row:
  - Total XP | Day Streak | Quizzes Taken | Best Quiz | Exercises Done | Lessons Done

Quick Access tiles (grid):
  Daily Challenge | Vocabulary | Writing | Review Queue | Study Plan
  Grammar Compare | Mock Exam | Conversations | Pronunciation | Badges
  Cheat Sheet | Weekly Report | Verb Tables | Sentence Patterns | Tenses Guide
  Study Strategies | British vs American | Challenges

Study Timer: Pomodoro (25:00 default)

Level Progress bars (A1 / A2 / B1 / B2) — % of lessons completed

Achievement gallery

Activity heatmap (28-day grid)

Weekly Goals (XP target + Lessons target)

Error Review queue (words answered incorrectly)

Recent Activity log
```

---

## 17. LOCALIZATION NOTES

- **Primary audience:** Arabic-speaking learners (Moroccan, Gulf, Levant)
- Keep all UI chrome in **English** (learners should be immersed in English)
- Flashcard translations and lesson example translations should be in **Arabic**
- Support RTL rendering on Arabic-specific UI elements where needed
- Flashcard card structure: Front = English word + phonetic | Back = Arabic + example
- Remove DeutschCamp's German flag (🇩🇪) → use 🇬🇧 + 🇺🇸 (both varieties)

---

## 18. FILES TO RENAME / REFACTOR

When forking the DeutschCamp repo:

| Original file/folder | New name |
|---|---|
| `src/data/german-*.ts` | `src/data/english-*.ts` |
| `src/data/flashcards.ts` | Rewrite all 430 cards with English content |
| `src/data/levels/a1.ts` | Rewrite lessons array with English content |
| `src/components/GermanAlphabet.tsx` | `EnglishPhonics.tsx` |
| `src/app/cases-guide/` | `src/app/tenses-guide/` |
| `src/app/regional/` | `src/app/british-vs-american/` |
| All instances of "DeutschCamp" | "EnglishCamp" |
| All instances of "Goethe-Zertifikat" | "Cambridge B2 First" |
| All instances of "B2 Champion" XP labels | Keep same |
| `"Neuling"` level label | `"Newcomer"` |
| `"Willkommen zurück!"` | `"Welcome back!"` |

---

## 19. SUGGESTED IMPLEMENTATION ORDER

1. **Phase 1 — Scaffold**
   - Fork repo, rename brand, update config
   - Replace landing page copy and colors
   - Update level descriptions and routes

2. **Phase 2 — Content**
   - Write all 4 × 25 = 100 lesson files (TypeScript data objects)
   - Build 430 flashcard objects (English/Arabic)
   - Write 20 quiz questions per level (80 total)
   - Write grammar reference sections

3. **Phase 3 — Feature Adaptation**
   - Rebuild alphabet page → IPA/phonics page
   - Replace cases-guide → tenses-guide
   - Replace verb tables with English irregular verbs
   - Rebuild mock exam for FCE-style

4. **Phase 4 — Practice Hub**
   - Adapt all 81 practice modules for English
   - Replace German-specific trainers (noun gender → article trainer)

5. **Phase 5 — Polish**
   - Update all copy: German → English
   - Update gamification labels
   - Test localStorage persistence
   - Deploy to Vercel

---

## 20. DO NOT COPY — COPYRIGHT NOTES

- Do **not** reproduce copyrighted Oxford/Cambridge textbook text
- Do **not** copy BBC Learning English transcripts verbatim
- **Do** use the CEFR grammar framework and topic progression (these are not copyrightable)
- **Do** use Oxford 3000 / 5000 word lists (publicly available for educational use)
- **Do** reference British Council resource structures (adapt, don't copy)
- Write all example sentences and explanations originally — they should be inspired by, not copied from, existing sources

---

*EnglishCamp — Built on the DeutschCamp architecture. Content sourced from open, free-access CEFR platforms.*

# Read and Listening

Vocabulary, Read and Listening are now three separate learning sections.

| Section | Route | What it does |
| --- | --- | --- |
| Vocabulary | `/vocabulary` | My Bank, Word library, Quiz and Write. No reading or listening views. |
| Listening | `/listening` | VOA Learning English recordings, questions, transcript, helpful words, resume. Sits directly below Vocabulary in the sidebar. |
| Read | `/reading` | English-only passages by CEFR level, single-word Arabic lookups, comprehension questions. No audio. |

Old bookmarks keep working: `/vocabulary?view=read` opens `/reading` and `/vocabulary?view=listening` opens `/listening`. `/api/vocabulary/listening` stays as an alias of `/api/listening/audio`.

## Read

- Lessons live in `src/data/reading-lessons.ts`. The 22 original articles are migrated without changing their text or IDs; their Band labels stay on the article records and each lesson gets an EnglishCamp CEFR estimate (A2 → C2).
- Three new A1 passages ship with `status: "review"`. They stay hidden until an administrator publishes them in **Admin → Learning → Content**.
- Word lookups (`src/lib/vocabularyLookup.ts`) use the lesson glossary, the local 5,000-word bank and a small common-word list, with simple inflection matching. There is no per-word API call and no paragraph translation fallback: unknown words say so.
- Every question stores an `evidence` quote that must appear verbatim in the passage (enforced by tests and by the admin validator). Objective answers are graded deterministically (`src/lib/comprehension.ts`); short answers accept a reviewed list of equivalents.

## Listening and VOA

- VOA Learning English text, MP3s and transcripts produced by VOA are public domain and must be credited; agency photos (AP, Reuters, AFP) are not. Lessons show a VOA source link and attribution.
- There is no VOA API. EnglishCamp uses the 16 reviewed clips in `src/data/voa-listening.ts`. At play time the Worker re-reads VOA's own player page or podcast feed (redirects inspected, 512 KB cap, VOA MP3 host only) and falls back to the reviewed MP3.
- Questions are built only from reviewed data: a main-idea question (other clips' summaries as distractors), a detail question, a true/false restatement of the other reviewed fact, and, where a published transcript excerpt exists, a gap fill copied from it.
- Levels are EnglishCamp teaching estimates. VOA's own level labels are never converted automatically.

## Admin content workflow

**Admin → Learning → Content** (`/admin/content`, existing admin session and CSRF/origin checks):

- Publish, hide or re-level bundled lessons (stored in `learning_content_state`).
- Import a VOA lesson by article address. Only the canonical `https://learningenglish.voanews.com/a/<id>.html` is requested (plus one same-article redirect and VOA's podcast feed). The result is a **draft** with title, summary and MP3 if found. Duplicates (bundled or imported) are refused. Imports are rate-limited (20 per 10 minutes).
- Write or edit reading passages and listening lessons as JSON. Publishing requires a complete, grounded lesson; editing a published lesson returns it to draft.
- Completion counts per lesson come from the existing idempotent event ledger.

Learners receive `/api/content/catalogue` (states plus published lessons, re-validated on the way out). If it fails, the reviewed bundle is used.

## Progress and rewards

- Completion uses the existing `exercisesDone` + learning event ledger with IDs `reading:<id>` and `listening:<id>`. XP is 5–20 per lesson and is awarded once; the Worker caps these events at 20 XP whatever a client sends, and the ledger deduplicates them per learner. Badges and streaks update through the existing system.
- `useSkillPractice` keeps per-learner study state only (best score, attempts, listening resume point).

## Database

`migrations/0011_learning_content.sql` is additive: two new tables and one index on `cloud_events(kind, source)`. No learner rows are changed.

## Deploy

1. `npx wrangler d1 migrations apply englishcamp-learners --remote`
2. `npm run build:cloudflare && npm run deploy:cloudflare` (or merge to the deploy branch).
3. In Admin → Learning → Content, review and publish the three A1 passages.

/**
 * Practice Hub card details. Levels and times are EnglishCamp teaching estimates
 * (the CEFR level where a learner can usually start the trainer, and a typical round).
 */
export type PracticeLevel = "A1" | "A2" | "B1" | "B2" | "C1";
export type PracticeMinutes = 2 | 5 | 10;
export const PRACTICE_LEVELS: readonly PracticeLevel[] = ["A1", "A2", "B1", "B2", "C1"];
export const PRACTICE_TIMES: readonly PracticeMinutes[] = [2, 5, 10];

const LEVELS: Record<PracticeLevel, string[]> = {
  A1: ["noun-gender", "numbers", "plural", "possessives", "spelling", "frageworter", "prepositions", "prep-contractions", "sentence-builder", "negation", "hangman", "memory-match", "word-search", "flashcard-race", "buchstabensalat", "error-review", "verb-explorer", "artikel"],
  A2: ["conjugation", "case", "comparative", "genitive", "imperative", "adjective-endings", "future-tense", "weak-nouns", "word-order", "modal-verbs", "conjunctions", "two-way-prepositions", "reflexive-verbs", "compound-nouns", "dialogue", "crossword", "dictation", "reading", "speed-match", "sprint", "timed-challenge", "verb-puzzle", "landeskunde", "themen-vokabeln", "dialog-ubersetzer", "vergleiche-ubersetzer", "fragen-ubersetzer", "praeteritum-ubersetzer"],
  B1: ["passive-voice", "relative-clauses", "konjunktiv2", "infinitiv-mit-zu", "prefix-verbs", "narrative-past", "separable-verbs", "false-friends", "collocations", "synonyms", "word-formation", "sub-clauses", "question-formation", "cloze-text", "tenses", "briefe", "korrektur", "redemittel", "satz-ubersetzer", "kollo-ubersetzer", "modal-ubersetzer", "verbprep-ubersetzer", "satzmuster-ubersetzer", "wortpaare-quiz", "false-friends-ubersetzer", "idiom-match"],
  B2: ["double-infinitive", "idioms", "modal-particles", "konjunktionen", "idiom-ubersetzer", "nvv-ubersetzer"],
  C1: ["da-compounds", "dakomp-ubersetzer"],
};
const QUICK = ["sprint", "flashcard-race", "speed-match", "timed-challenge", "buchstabensalat", "numbers", "verb-explorer"];
const LONG = ["briefe", "reading", "cloze-text", "dictation", "korrektur", "crossword"];
/** Larger illustrated tiles instead of compact rows. */
export const GAME_TRAINERS = new Set(["hangman", "memory-match", "word-search", "crossword", "speed-match", "buchstabensalat", "sprint", "flashcard-race", "idiom-match", "verb-puzzle"]);

const levelOf = new Map(Object.entries(LEVELS).flatMap(([level, ids]) => ids.map(id => [id, level as PracticeLevel])));
export const practiceLevel = (id: string): PracticeLevel => levelOf.get(id) ?? "A2";
export const practiceMinutes = (id: string): PracticeMinutes => QUICK.includes(id) ? 2 : LONG.includes(id) ? 10 : 5;

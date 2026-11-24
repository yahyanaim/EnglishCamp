import { useErrors } from "@/store/useErrors";

/** Where a mistake belongs on the Weak areas page, and which grammar lesson revises it. */
export type MistakeCategory = "grammar" | "vocabulary" | "skills" | "quizzes" | "courses";
export const MISTAKE_CATEGORIES: { id: MistakeCategory; label: string }[] = [
  { id: "grammar", label: "Grammar" },
  { id: "vocabulary", label: "Vocabulary" },
  { id: "skills", label: "Listening & reading" },
  { id: "quizzes", label: "Quizzes" },
  { id: "courses", label: "Courses" },
];

type MistakeInfo = { label: string; category: MistakeCategory; lesson?: string };
const SOURCES: Record<string, MistakeInfo> = {
  "course-activity": { label: "Course practice", category: "courses" },
  quiz: { label: "Level quiz", category: "quizzes" },
  timed: { label: "Timed challenge", category: "quizzes" },
  "daily-challenge": { label: "Daily challenge", category: "quizzes" },
  "knowledge-check": { label: "Knowledge check", category: "quizzes" },
  exercise: { label: "Exercise", category: "grammar" },
  conjugation: { label: "Verb conjugation", category: "grammar", lesson: "present-tenses" },
  conditional: { label: "Conditionals", category: "grammar", lesson: "conditionals" },
  conjunction: { label: "Connectors", category: "grammar", lesson: "linking-words-guide" },
  passive: { label: "Passive voice", category: "grammar", lesson: "passive" },
  relative: { label: "Relative clauses", category: "grammar", lesson: "relative-clauses-guide" },
  preposition: { label: "Prepositions", category: "grammar", lesson: "prepositions" },
  prepcontr: { label: "Prepositions", category: "grammar", lesson: "prepositions" },
  "verb-prep": { label: "Verbs and prepositions", category: "grammar", lesson: "prepositions" },
  future: { label: "Future forms", category: "grammar", lesson: "future-tenses" },
  frage: { label: "Questions", category: "grammar", lesson: "asking-questions" },
  "question-formation": { label: "Questions", category: "grammar", lesson: "asking-questions" },
  imperative: { label: "Imperatives", category: "grammar", lesson: "word-order" },
  infinitive: { label: "Verb patterns", category: "grammar", lesson: "verb-patterns" },
  doubleinf: { label: "Verb patterns", category: "grammar", lesson: "verb-patterns" },
  reflexive: { label: "Reflexive pronouns", category: "grammar", lesson: "object-pronouns" },
  genitive: { label: "Possessives", category: "grammar", lesson: "possessives" },
  weaknoun: { label: "Plurals", category: "grammar", lesson: "irregular-plurals-guide" },
  gender: { label: "Nouns", category: "grammar", lesson: "singular-and-plural" },
  prefix: { label: "Phrasal verbs", category: "vocabulary" },
  nvv: { label: "Collocations", category: "vocabulary" },
  "narrative-past": { label: "Past tenses", category: "grammar", lesson: "past-tenses" },
  "subordinate-clauses": { label: "Clauses", category: "grammar", lesson: "clauses-guide" },
  "sentence-builder": { label: "Word order", category: "grammar", lesson: "word-order" },
  "verb-puzzle": { label: "Verb forms", category: "grammar", lesson: "simple-past-guide" },
  numbers: { label: "Numbers", category: "vocabulary" },
  discourse: { label: "Discourse markers", category: "grammar", lesson: "discourse-markers-guide" },
  wordform: { label: "Word formation", category: "vocabulary" },
  compound: { label: "Compound words", category: "vocabulary" },
  collocation: { label: "Collocations", category: "vocabulary" },
  synonym: { label: "Synonyms", category: "vocabulary" },
  spelling: { label: "Spelling", category: "vocabulary" },
  idiom: { label: "Idioms", category: "vocabulary" },
  falsefriend: { label: "False friends", category: "vocabulary" },
  vocabulary: { label: "Vocabulary", category: "vocabulary" },
  "topic-vocabulary": { label: "Topic vocabulary", category: "vocabulary" },
  "word-pairs": { label: "Word pairs", category: "vocabulary" },
  "flashcard-de": { label: "Flashcards", category: "vocabulary" },
  "flashcard-en": { label: "Flashcards", category: "vocabulary" },
  flashcard: { label: "Flashcards", category: "vocabulary" },
  translation: { label: "Translation", category: "vocabulary" },
  dialogue: { label: "Dialogues", category: "skills" },
  dictation: { label: "Dictation", category: "skills" },
  shadowing: { label: "Shadowing dictation", category: "skills" },
  cloze: { label: "Cloze text", category: "skills" },
  reading: { label: "Reading", category: "skills" },
  listening: { label: "Listening", category: "skills" },
  comprehension: { label: "Comprehension", category: "skills" },
};

export function mistakeInfo(source: string): MistakeInfo {
  return SOURCES[source] ?? { label: source.replace(/[-_]/g, " ").replace(/^\w/, c => c.toUpperCase()), category: "grammar" };
}

/** Record a wrong answer so it appears on Weak areas (and counts towards the review badges). */
export function logMistake(source: string, sourceId: string, question: string, userAnswer: string, correctAnswer: string, explanation = "") {
  if (!question || userAnswer === correctAnswer) return;
  useErrors.getState().addError({ source, sourceId, question, userAnswer: userAnswer || "(no answer)", correctAnswer, explanation });
}

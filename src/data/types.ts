export type Block =
  | { kind: "p";       text: string }
  | { kind: "callout"; tone?: "tip" | "rule" | "note" | "warning"; title?: string; text: string }
  | { kind: "list";    items: string[] }
  | { kind: "examples"; items: { en: string; tr: string; ar?: string }[] }
  | { kind: "table";   headers: string[]; rows: string[][] }
  | { kind: "conjugation"; verb: string; rows: { pronoun: string; form: string; meaning: string }[] }
  | { kind: "dialogue"; title: string; lines: { speaker: string; en: string; tr: string; ar?: string }[] };

export type Lesson = {
  id:        string;
  title:     string;
  subtitle?: string;
  xpReward:  number;
  blocks:    Block[];
};

export type ExerciseType =
  | "fill-blank"
  | "multiple-choice"
  | "matching"
  | "reorder"
  | "translation";

export type Exercise = {
  id:       string;
  lessonId: string;
  type:     ExerciseType;
  prompt:   string;
  data:     unknown;
  xpReward: number;
};

export type QuizQuestion = {
  id:         string;
  levelId:    BandId;
  question:   string;
  question_ar?: string;
  options:    string[];
  options_ar?: string[];
  correct:    number;
  explain:    string;
  explain_ar?: string;
  xpReward:   number;
};

export type BandId = "band4-5" | "band5-6" | "band6-7" | "band7-8";

export type Level = {
  id:       BandId;
  title:    string;
  subtitle: string;
  duration: string;
  intro:    string;
  goals:    string[];
  color:    string;
  accent:   string;
  lessons:  Lesson[];
  examTarget?: string;
  examBadge?: string;
  examHref?: string;
  category?: string;
};

export type Letter = {
  letter:        string;
  pronunciation: string;
  example:       string;
  meaning:       string;
};

export type Card = {
  de:  string;
  en:  string;
  ar?: string;
  cat: string;
};

export type EnglishCard = {
  id: string;
  de: string;
  en: string;
  ar?: string;
  phonetic?: string;
  partOfSpeech?: string;
  level?: string;
  plural?: string;
  pastTense?: string;
  pastParticiple?: string;
  example?: { de: string; en: string; ar?: string };
  cat: string;
};

export type LessonProgress = {
  completed:   boolean;
  xpEarned:    number;
  completedAt: string | null;
  attempts:    number;
};

export type QuizResult = {
  score:     number;
  xpEarned:  number;
  takenAt:   string;
  answers:   number[];
};

export type ProgressStore = {
  xp:              number;
  streak:          number;
  lastActiveDate:  string | null;
  lessons:         Record<string, LessonProgress>;
  quizResults:     Record<BandId, QuizResult[]>;
  flashcardSeen:   Record<string, number>;
  exercisesDone:   Record<string, boolean>;
};

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
  | "translation"
  | "course-activity";

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

/** Original local course tasks; completion is practice evidence, never an official score. */
export type ActivityQuestion = {
  id: string;
  reviewId?: string;
  prompt: string;
  options?: string[];
  answers: string[];
  explanation: string;
  evidence: string;
  maxWords?: number;
  selectCount?: number;
  /** Only authored short answers may ignore a final full stop; internal punctuation stays significant. */
  punctuation?: "terminal" | "exact";
};
export type ActivityTask = {
  id: string;
  contentVersion?: number;
  /** Only key widening/editorial feedback with unchanged prompts; retain compatible saved attempts. */
  compatibleWithSignature?: string;
  taskFamily?: "email" | "discussion";
  kind: "reading" | "language" | "listening" | "writing" | "speaking";
  title: string;
  instructions: string;
  source?: string;
  audio?: { src: string; transcript: string; label: string };
  visual?: { src: string; alt: string; description: string };
  questions?: ActivityQuestion[];
  model?: string;
  modelAudio?: { src: string; label: string };
  analysis?: string;
  rubric?: string[];
  minWords?: number;
  maxWords?: number;
  seconds?: number;
  preparationSeconds?: number;
  spokenItems?: { audioSrc: string; transcript: string; model: string }[];
};
export type CourseActivityData = {
  objective: string;
  learn: string;
  worked: { example: string; reasoning: string };
  tasks: [ActivityTask, ActivityTask, ActivityTask];
  exam: "B2 First" | "IELTS Academic" | "TOEFL iBT 2026" | "IELTS General Training";
};

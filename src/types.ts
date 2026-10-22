export type BandId = "band4-5" | "band5-6" | "band6-7" | "band7-8";

export interface QuizQuestion {
  id: string;
  levelId: BandId;
  question: string;
  options: string[];
  correct: number;
  explain: string;
  xpReward: number;
}

export type ExerciseType =
  | "fill-blank"
  | "multiple-choice"
  | "matching"
  | "reorder"
  | "translation";

export interface FillBlankData {
  sentence: string;
  answer: string;
  hint?: string;
}

export interface MultipleChoiceData {
  question: string;
  options: string[];
  correct: number;
}

export interface MatchingData {
  pairs: [string, string][];
}

export interface ReorderData {
  words: string[];
  sentence: string;
}

export interface TranslationData {
  de: string;
  en: string;
}

export type ExerciseData =
  | FillBlankData
  | MultipleChoiceData
  | MatchingData
  | ReorderData
  | TranslationData;

export interface Exercise {
  id: string;
  lessonId: string;
  type: ExerciseType;
  prompt: string;
  data: ExerciseData;
  xpReward: number;
}

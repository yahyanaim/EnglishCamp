export type Certification =
  | "ielts-academic"
  | "ielts-general"
  | "toefl-ibt"
  | "b2-first";
export type ExamSkill = "reading" | "listening" | "writing" | "speaking";
export type QuestionKind =
  | "choice"
  | "completion"
  | "true-false-not-given"
  | "yes-no-not-given"
  | "matching"
  | "word-formation"
  | "transformation"
  | "word-ending"
  | "sentence-build";
export type ExamQuestion = {
  id: string;
  number: number;
  kind: QuestionKind;
  prompt: string;
  answers: string[];
  options?: string[];
  evidence: string;
  explanation: string;
  maxWords?: number;
  marks: number;
  component?: "reading" | "use-of-english" | "writing";
  partial?: { answers: string[]; marks: number }[];
  prefix?: string;
  keyword?: string;
  chunks?: string[];
  before?: string;
  after?: string;
};
export type SpeechSegment = { role: string; text: string; pauseAfter?: number };
export type ExamVisual = { src: string; alt: string; caption?: string };
export type ExamSection = {
  id: string;
  title: string;
  subtitle: string;
  instructions: string;
  skill: "reading" | "listening";
  part: number;
  passage?: string;
  questions: ExamQuestion[];
  segments?: SpeechSegment[];
  plays?: 1 | 2;
  visual?: ExamVisual;
  stage?: "router" | "lower" | "upper";
};
export type WritingPrompt = {
  id: string;
  title: string;
  instructions: string;
  minimumWords: number;
  maximumWords?: number;
  seconds?: number;
  visual?: ExamVisual;
  model: string;
  analysis: string;
  rubric: string[];
  choiceGroup?: string;
};
export type SpokenPrompt = {
  id: string;
  title: string;
  instructions: string;
  prompts: string[];
  stimulus?: SpeechSegment[];
  preparationSeconds: number;
  responseSeconds: number;
  kind: "interview" | "long-turn" | "discussion" | "repeat" | "collaborative";
  visual?: ExamVisual;
  model: string;
  analysis: string;
  rubric: string[];
};
export type ExamPaper = {
  id: Certification;
  form: string;
  version: string;
  title: string;
  subtitle: string;
  description: string;
  order: ExamSkill[];
  seconds: Record<ExamSkill, number>;
  reading: ExamSection[];
  listening: ExamSection[];
  writing: WritingPrompt[];
  sentenceBuilding?: ExamQuestion[];
  speaking: SpokenPrompt[];
  notices: string[];
  provenance: {
    author: string;
    rights: string;
    sources: string[];
    reviewed: string;
    status: string;
  };
};

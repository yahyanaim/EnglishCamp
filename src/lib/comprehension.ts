/**
 * Comprehension questions shared by Read and Listening.
 * Every objective answer is validated deterministically; no AI grading runs on page views.
 */
export type ComprehensionSkill = "main-idea" | "detail" | "inference" | "vocabulary";

type QuestionBase = {
  id: string;
  skill: ComprehensionSkill;
  prompt: string;
  /** Exact words from the passage or transcript that justify the answer. */
  evidence: string;
  feedback: string;
};
export type MultipleChoiceQuestion = QuestionBase & { type: "multiple-choice"; choices: string[]; correct: number };
export type TrueFalseQuestion = QuestionBase & { type: "true-false"; correct: boolean };
/** Short answers and gap fills accept a small, reviewed list of equivalent answers. */
export type WrittenQuestion = QuestionBase & { type: "short-answer" | "gap-fill"; answers: string[] };
export type ComprehensionQuestion = MultipleChoiceQuestion | TrueFalseQuestion | WrittenQuestion;
export type ComprehensionAnswer = number | boolean | string;

export const SKILL_LABELS: Record<ComprehensionSkill, string> = {
  "main-idea": "Main idea",
  detail: "Detail",
  inference: "Inference",
  vocabulary: "Meaning in context",
};
export const TYPE_LABELS: Record<ComprehensionQuestion["type"], string> = {
  "multiple-choice": "Multiple choice",
  "true-false": "True or false",
  "short-answer": "Short answer",
  "gap-fill": "Complete the sentence",
};

const numberWords: Record<string, string> = { zero: "0", one: "1", two: "2", three: "3", four: "4", five: "5", six: "6", seven: "7", eight: "8", nine: "9", ten: "10", eleven: "11", twelve: "12" };

/** Lower-case, unify quotes, drop punctuation and leading articles, spell small numbers as digits. */
export function normalizeAnswer(value: string) {
  return value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[^a-z0-9' ]+/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map(word => numberWords[word] ?? word)
    .join(" ")
    .replace(/^(the|a|an|to) /, "")
    .trim();
}

export function isCorrect(question: ComprehensionQuestion, answer: ComprehensionAnswer | undefined): boolean {
  if (answer === undefined) return false;
  switch (question.type) {
    case "multiple-choice": return answer === question.correct;
    case "true-false": return answer === question.correct;
    default: {
      if (typeof answer !== "string") return false;
      const given = normalizeAnswer(answer);
      return given.length > 0 && given.length <= 80 && question.answers.some(accepted => normalizeAnswer(accepted) === given);
    }
  }
}

export function isAnswered(question: ComprehensionQuestion, answer: ComprehensionAnswer | undefined) {
  if (answer === undefined) return false;
  if (question.type === "short-answer" || question.type === "gap-fill") return typeof answer === "string" && answer.trim().length > 0;
  return true;
}

export function scoreAnswers(questions: readonly ComprehensionQuestion[], answers: Record<string, ComprehensionAnswer | undefined>) {
  const correct = questions.filter(question => isCorrect(question, answers[question.id])).length;
  return { correct, total: questions.length, percent: questions.length ? Math.round(correct / questions.length * 100) : 0 };
}

export function correctAnswerText(question: ComprehensionQuestion) {
  if (question.type === "multiple-choice") return question.choices[question.correct];
  if (question.type === "true-false") return question.correct ? "True" : "False";
  return question.answers[0];
}

/** Read and Listening lessons award XP once per lesson; the Worker caps the same values. */
export const SKILL_LESSON_MAX_XP = 20;
export function skillLessonXp(correct: number, total: number) {
  if (!Number.isInteger(correct) || !Number.isInteger(total) || total <= 0 || correct < 0) return 0;
  return Math.max(5, Math.round(Math.min(correct, total) / total * SKILL_LESSON_MAX_XP));
}
export const readingExerciseId = (lessonId: string) => `reading:${lessonId}`;
export const listeningExerciseId = (lessonId: string) => `listening:${lessonId}`;

/** Places the reviewed correct choice at a stable, varied position. */
export function placeCorrect(id: string, correctFirst: string[]): { choices: string[]; correct: number } {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  const correct = hash % correctFirst.length;
  const others = correctFirst.slice(1);
  return { choices: [...others.slice(0, correct), correctFirst[0], ...others.slice(correct)], correct };
}

/** Validates admin-authored questions before they can be published. */
/** With `source`, each evidence quote must appear in it exactly; audio-only lessons pass null. */
export function validateQuestions(value: unknown, source: string | null): { questions: ComprehensionQuestion[]; errors: string[] } {
  const errors: string[] = [], questions: ComprehensionQuestion[] = [];
  if (!Array.isArray(value) || value.length < 3 || value.length > 12) return { questions, errors: ["Add 3–12 questions."] };
  const text = (v: unknown, max: number) => typeof v === "string" && v.trim().length > 0 && v.length <= max ? v.trim() : "";
  const haystack = source?.normalize("NFKC").replace(/\s+/g, " ") ?? null;
  value.forEach((raw, index) => {
    const q = raw && typeof raw === "object" ? raw as Record<string, unknown> : {};
    const label = `Question ${index + 1}`;
    const prompt = text(q.prompt, 300), evidence = text(q.evidence, 400), feedback = text(q.feedback, 400);
    const skill = (["main-idea", "detail", "inference", "vocabulary"] as const).find(s => s === q.skill);
    if (!prompt || !feedback || !skill) { errors.push(`${label}: add a prompt, skill and feedback.`); return; }
    if (!evidence || (haystack !== null && !haystack.includes(evidence.normalize("NFKC").replace(/\s+/g, " ")))) { errors.push(`${label}: evidence must be copied exactly from the ${haystack === null ? "lesson" : "text"}.`); return; }
    const id = `q${index + 1}`;
    if (q.type === "multiple-choice") {
      const choices = Array.isArray(q.choices) ? q.choices.map(c => text(c, 200)).filter(Boolean) : [];
      if (choices.length < 2 || choices.length > 5 || new Set(choices).size !== choices.length || !Number.isInteger(q.correct) || !choices[q.correct as number]) { errors.push(`${label}: give 2–5 different choices and the correct index.`); return; }
      questions.push({ id, type: "multiple-choice", skill, prompt, evidence, feedback, choices, correct: q.correct as number });
    } else if (q.type === "true-false") {
      if (typeof q.correct !== "boolean") { errors.push(`${label}: mark the statement true or false.`); return; }
      questions.push({ id, type: "true-false", skill, prompt, evidence, feedback, correct: q.correct });
    } else if (q.type === "short-answer" || q.type === "gap-fill") {
      const answers = Array.isArray(q.answers) ? q.answers.map(a => text(a, 80)).filter(Boolean) : [];
      if (!answers.length || answers.length > 8) { errors.push(`${label}: list 1–8 accepted answers.`); return; }
      if (q.type === "gap-fill" && !prompt.includes("___")) { errors.push(`${label}: mark the gap with ___.`); return; }
      questions.push({ id, type: q.type, skill, prompt, evidence, feedback, answers });
    } else errors.push(`${label}: choose a supported question type.`);
  });
  return { questions, errors };
}

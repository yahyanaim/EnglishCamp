import type {
  Certification,
  ExamPaper,
  ExamQuestion,
  ExamSection,
  ExamSkill,
} from "@/data/mock-exams/types";

export const SESSION_SCHEMA = 2;
export type ExamAttempt = {
  schema: 2;
  id: string;
  certification: Certification;
  version: string;
  form: string;
  startedAt: number;
  finishedAt?: number;
  skillIndex: number;
  sectionIndex: number;
  questionIndex: number;
  writingIndex: number;
  speakingIndex: number;
  deadline: number;
  answers: Record<string, string>;
  writing: Record<string, string>;
  flags: Record<string, boolean>;
  choice: string;
  branches: Partial<Record<"reading" | "listening", "lower" | "upper">>;
  playback: Record<string, { completed: number; offset: number }>;
  recordings: string[];
};
export const attemptStorageKey = (paper: ExamPaper) =>
  `englishcamp-mock:${paper.id}:${paper.form}:${paper.version}:active`;
export const historyStorageKey = "englishcamp-mock:history:v2";
export const recordingKey = (attempt: ExamAttempt, prompt: string) =>
  `englishcamp-mock:${attempt.version}:${attempt.id}:${prompt}`;
export function freshAttempt(
  paper: ExamPaper,
  now = Date.now(),
  id = `${now}-${Math.random().toString(36).slice(2, 10)}`,
): ExamAttempt {
  return {
    schema: 2,
    id,
    certification: paper.id,
    version: paper.version,
    form: paper.form,
    startedAt: now,
    skillIndex: 0,
    sectionIndex: 0,
    questionIndex: 0,
    writingIndex: 0,
    speakingIndex: 0,
    deadline: now + skillBudget(paper, paper.order[0], false) * 1000,
    answers: {},
    writing: {},
    flags: {},
    branches: {},
    playback: {},
    recordings: [],
    choice: paper.writing.find((w) => w.choiceGroup)?.id || "",
  };
}
const normal = (s: string) =>
  s
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, " ");
const expanded = (s: string) =>
  normal(s).replace(
    /\b(haven't|hasn't|hadn't|isn't|aren't|wasn't|weren't|couldn't|wouldn't|shouldn't|don't|doesn't|didn't|can't)\b/g,
    (v) =>
      ({
        "haven't": "have not",
        "hasn't": "has not",
        "hadn't": "had not",
        "isn't": "is not",
        "aren't": "are not",
        "wasn't": "was not",
        "weren't": "were not",
        "couldn't": "could not",
        "wouldn't": "would not",
        "shouldn't": "should not",
        "don't": "do not",
        "doesn't": "does not",
        "didn't": "did not",
        "can't": "cannot",
      })[v] || v,
  );
export function questionMarks(q: ExamQuestion, answer: string): number {
  const text = q.kind === "transformation" ? expanded(answer) : normal(answer);
  if (!text) return 0;
  const count = text.split(/\s+/).length;
  if (q.maxWords && count > q.maxWords) return 0;
  if (
    q.kind === "transformation" &&
    (count < 2 || !text.split(/\s+/).includes(normal(q.keyword || "")))
  )
    return 0;
  const canonical = (s: string) =>
    q.kind === "sentence-build"
      ? normal(s).replace(/[.?!]+$/, "")
      : q.kind === "transformation"
        ? expanded(s)
        : normal(s);
  if (q.answers.some((a) => canonical(a) === canonical(answer))) return q.marks;
  return (
    q.partial?.find((p) =>
      p.answers.some((a) => canonical(a) === canonical(answer)),
    )?.marks || 0
  );
}
export function routeModule(
  sections: ExamSection[],
  answers: Record<string, string>,
): "lower" | "upper" {
  const questions = sections
    .filter((s) => s.stage === "router")
    .flatMap((s) => s.questions);
  const total = questions.reduce((n, q) => n + q.marks, 0);
  const earned = questions.reduce(
    (n, q) => n + questionMarks(q, answers[q.id] || ""),
    0,
  );
  return total > 0 && earned / total >= 0.7 ? "upper" : "lower";
}
export function availableSections(
  paper: ExamPaper,
  attempt: ExamAttempt,
  skill: "reading" | "listening",
  review = false,
): ExamSection[] {
  const all = paper[skill];
  if (paper.id !== "toefl-ibt") return all;
  const branch = attempt.branches[skill];
  return all.filter((s) =>
    review
      ? s.stage === "router" || s.stage === branch
      : s.stage === (branch || "router"),
  );
}
export function skillBudget(
  paper: ExamPaper,
  skill: ExamSkill,
  followup: boolean,
): number {
  if (paper.id === "toefl-ibt") {
    if (skill === "reading") return 900;
    if (skill === "listening") return followup ? 900 : 840;
    if (skill === "writing") return 360;
  }
  return paper.seconds[skill];
}
/** Commit a skill/module once. Previously committed modules cannot be re-entered. */
export function advanceAttempt(
  paper: ExamPaper,
  state: ExamAttempt,
  now = Date.now(),
): ExamAttempt {
  if (state.finishedAt) return state;
  const skill = paper.order[state.skillIndex];
  if (paper.id === "toefl-ibt") {
    if (
      (skill === "reading" || skill === "listening") &&
      !state.branches[skill]
    ) {
      return {
        ...state,
        branches: {
          ...state.branches,
          [skill]: routeModule(paper[skill], state.answers),
        },
        sectionIndex: 0,
        questionIndex: 0,
        deadline: now + skillBudget(paper, skill, true) * 1000,
      };
    }
    if (skill === "writing" && state.writingIndex < 2) {
      const index = state.writingIndex + 1;
      return {
        ...state,
        writingIndex: index,
        deadline: now + (index === 1 ? 420 : 600) * 1000,
      };
    }
  }
  const next = paper.order[state.skillIndex + 1];
  if (!next) return { ...state, finishedAt: now, deadline: now };
  return {
    ...state,
    skillIndex: state.skillIndex + 1,
    sectionIndex: 0,
    questionIndex: 0,
    deadline: now + skillBudget(paper, next, false) * 1000,
  };
}
export function resultFor(paper: ExamPaper, attempt: ExamAttempt) {
  const listening = availableSections(
    paper,
    attempt,
    "listening",
    true,
  ).flatMap((s) => s.questions);
  const reading = availableSections(paper, attempt, "reading", true).flatMap(
    (s) => s.questions,
  );
  const total = (qs: ExamQuestion[]) => ({
    earned: qs.reduce(
      (n, q) => n + questionMarks(q, attempt.answers[q.id] || ""),
      0,
    ),
    possible: qs.reduce((n, q) => n + q.marks, 0),
    answered: qs.filter((q) => (attempt.answers[q.id] || "").trim()).length,
    items: qs.length,
  });
  return {
    listening: total(listening),
    reading: total(reading.filter((q) => q.component !== "use-of-english")),
    useOfEnglish: total(
      reading.filter((q) => q.component === "use-of-english"),
    ),
    sentenceBuilding: total(paper.sentenceBuilding || []),
    writing: paper.writing
      .filter((w) => !w.choiceGroup || w.id === attempt.choice)
      .map((w) => ({
        id: w.id,
        words: (attempt.writing[w.id] || "").trim().match(/\S+/g)?.length || 0,
        assessed: false,
      })),
    speakingRecorded: attempt.recordings.length,
    writingScore: null,
    speakingScore: null,
    overallScore: null,
  };
}
/** Defensive restoration: changed content and malformed browser data cannot supply answers or navigation. */
export function restoreExam(
  paper: ExamPaper,
  raw: string | null,
): ExamAttempt | null {
  try {
    if (!raw) return null;
    const saved = JSON.parse(raw);
    if (
      saved.schema !== SESSION_SCHEMA ||
      saved.certification !== paper.id ||
      saved.version !== paper.version ||
      saved.form !== paper.form ||
      typeof saved.id !== "string" ||
      !saved.id ||
      !Number.isFinite(saved.startedAt) ||
      !Number.isFinite(saved.deadline)
    )
      return null;
    const initial = freshAttempt(paper, saved.startedAt, saved.id);
    const allQ = [...paper.reading, ...paper.listening]
      .flatMap((s) => s.questions)
      .concat(paper.sentenceBuilding || []);
    const strings = (obj: unknown, ids: string[]) =>
      Object.fromEntries(
        ids.flatMap((id) =>
          typeof (obj as Record<string, string>)?.[id] === "string"
            ? [[id, (obj as Record<string, string>)[id]]]
            : [],
        ),
      );
    const state: ExamAttempt = {
      ...initial,
      deadline: saved.deadline,
      answers: strings(
        saved.answers,
        allQ.map((q) => q.id),
      ),
      writing: strings(
        saved.writing,
        paper.writing.map((w) => w.id),
      ),
      skillIndex: Number.isInteger(saved.skillIndex)
        ? Math.max(0, Math.min(saved.skillIndex, 3))
        : 0,
      writingIndex: Number.isInteger(saved.writingIndex)
        ? Math.max(0, Math.min(saved.writingIndex, 2))
        : 0,
      speakingIndex: Number.isInteger(saved.speakingIndex)
        ? Math.max(0, Math.min(saved.speakingIndex, paper.speaking.length - 1))
        : 0,
      choice: paper.writing.some((w) => w.id === saved.choice && w.choiceGroup)
        ? saved.choice
        : initial.choice,
      recordings: Array.isArray(saved.recordings)
        ? Array.from(
            new Set<string>(
              saved.recordings.filter((id: unknown) =>
                paper.speaking.some((p) => p.id === id),
              ),
            ),
          )
        : [],
      finishedAt:
        Number.isFinite(saved.finishedAt) && saved.finishedAt >= saved.startedAt
          ? saved.finishedAt
          : undefined,
      flags: Object.fromEntries(
        allQ
          .filter((q) => saved.flags?.[q.id] === true)
          .map((q) => [q.id, true]),
      ),
    };
    for (const skill of ["reading", "listening"] as const)
      if (["lower", "upper"].includes(saved.branches?.[skill]))
        state.branches[skill] = saved.branches[skill];
    const skill = paper.order[state.skillIndex];
    if (skill === "reading" || skill === "listening") {
      const sections = availableSections(paper, state, skill);
      state.sectionIndex = Number.isInteger(saved.sectionIndex)
        ? Math.max(0, Math.min(saved.sectionIndex, sections.length - 1))
        : 0;
      state.questionIndex = Number.isInteger(saved.questionIndex)
        ? Math.max(
            0,
            Math.min(
              saved.questionIndex,
              sections[state.sectionIndex].questions.length - 1,
            ),
          )
        : 0;
    }
    for (const s of paper.listening) {
      const value = saved.playback?.[s.id];
      if (
        value &&
        Number.isInteger(value.completed) &&
        value.completed >= 0 &&
        value.completed <= (s.plays || 1) &&
        Number.isFinite(value.offset) &&
        value.offset >= 0
      )
        state.playback[s.id] = {
          completed: value.completed,
          offset: value.offset,
        };
    }
    return state;
  } catch {
    return null;
  }
}

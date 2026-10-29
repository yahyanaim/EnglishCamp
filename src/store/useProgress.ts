import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ProgressStore, BandId, QuizResult } from "@/data/types";
import { migrateCourseProgress, hasModuleCredit, cycleComplete, type ModuleProgress, type ActivityAttempt, type StageEvidence } from "@/lib/courseProgress";
import { getLevelInfo } from "@/lib/xp";

interface ProgressActions {
  modules: Record<string, ModuleProgress>;
  activityAttempts: ActivityAttempt[];
  registerContent: (id: string, signatures: string[]) => void;
  visitModule: (id: string, stage?: number) => void;
  recordActivityAttempt: (attempt: Omit<ActivityAttempt, "at">) => void;
  finishStage: (id: string, stage: number, evidence: Omit<StageEvidence, "finishedAt">, lessonXP: number) => number;
  completeLesson:   (lessonId: string, xp: number) => number;
  isLessonDone:     (lessonId: string) => boolean;
  getLessonXP:      (lessonId: string) => number;
  recordQuizResult: (levelId: BandId, result: QuizResult) => void;
  getBestScore:     (levelId: BandId) => number;
  completeExercise: (exerciseId: string, xp: number) => number;
  markCardSeen:     (cardId: string) => void;
  getCardSeenCount: (cardId: string) => number;
  updateStreak:     () => void;
  addXP:            (amount: number) => void;
  getTotalXP:       () => number;
  getLevel:         () => { level: number; title: string; nextXP: number };
  getLevelProgress: (levelId: BandId, totalLessons: number, doneFn: (id: string) => boolean, lessonIds?: string[]) => number;
  reset:            () => void;
}

const INITIAL: ProgressStore = {
  xp:             0,
  streak:         0,
  lastActiveDate: null,
  lessons:        {},
  quizResults:    { "band4-5": [], "band5-6": [], "band6-7": [], "band7-8": [] },
  flashcardSeen:  {},
  exercisesDone:  {},
};

export const useProgress = create<ProgressStore & ProgressActions>()(
  persist(
    (set, get) => ({
      ...INITIAL,
      modules: {},
      activityAttempts: [],
      registerContent: (id, signatures) => set(s => {
        const previous = s.modules[id] ?? { stages: {} };
        const changed = previous.expectedSignatures && signatures.some((signature, i) => signature !== previous.expectedSignatures![i]);
        return { modules: { ...s.modules, [id]: { ...previous, expectedSignatures: signatures,
          legacyPractice: previous.legacyPractice || (!!changed && cycleComplete(previous)) } } };
      }),
      visitModule: (id, stage) => set(s => {
        const now = new Date().toISOString(), previous = s.modules[id] ?? { stages: {} };
        return { modules: { ...s.modules, [id]: { ...previous, viewedAt: previous.viewedAt ?? now, lastActiveAt: now,
          ...(stage === undefined ? {} : { currentStage: stage, guidedStartedAt: previous.guidedStartedAt ?? now }) } } };
      }),
      recordActivityAttempt: attempt => set(s => {
        const now = new Date().toISOString(), previous = s.modules[attempt.moduleId] ?? { stages: {} };
        return { activityAttempts: [...s.activityAttempts, { ...attempt, at: now }].slice(-200),
          modules: { ...s.modules, [attempt.moduleId]: { ...previous, lastActiveAt: now,
            ...(attempt.stage === 2 ? { assessmentAttemptedAt: now } : {}) } } };
      }),
      finishStage: (id, stage, evidence, lessonXP) => {
        const previous = get().modules[id] ?? { stages: {} };
        const next = { ...previous, stages: { ...previous.stages, [stage]: { ...evidence, finishedAt: new Date().toISOString() } } };
        set(s => ({ modules: { ...s.modules, [id]: next } }));
        return cycleComplete(next) ? get().completeLesson(id, lessonXP) : 0;
      },

      completeLesson: (lessonId, xp) => {
        const existing = get().lessons[lessonId];
        if (existing?.completed) return 0;

        set((s) => ({
          xp: s.xp + xp,
          lessons: {
            ...s.lessons,
            [lessonId]: {
              completed:   true,
              xpEarned:    xp,
              completedAt: new Date().toISOString(),
              attempts:    (existing?.attempts ?? 0) + 1,
            },
          },
        }));
        get().updateStreak();
        return xp;
      },

      isLessonDone:  (id)  => hasModuleCredit(id, get().modules, get().lessons),
      getLessonXP:   (id)  => get().lessons[id]?.xpEarned ?? 0,

      recordQuizResult: (levelId, result) => {
        set((s) => ({
          xp: s.xp + result.xpEarned,
          quizResults: {
            ...s.quizResults,
            [levelId]: [...(s.quizResults[levelId] ?? []), result],
          },
        }));
        get().updateStreak();
      },

      getBestScore: (levelId) => {
        const results = get().quizResults[levelId] ?? [];
        return results.length ? Math.max(...results.map((r) => r.score)) : 0;
      },

      completeExercise: (exerciseId, xp) => {
        if (get().exercisesDone[exerciseId]) return 0;
        set((s) => ({
          xp: s.xp + xp,
          exercisesDone: { ...s.exercisesDone, [exerciseId]: true },
        }));
        get().updateStreak();
        return xp;
      },

      markCardSeen: (cardId) => {
        set((s) => ({
          flashcardSeen: {
            ...s.flashcardSeen,
            [cardId]: (s.flashcardSeen[cardId] ?? 0) + 1,
          },
        }));
      },

      getCardSeenCount: (cardId) => get().flashcardSeen[cardId] ?? 0,

      addXP: (amount) => {
        set((s) => ({ xp: s.xp + amount }));
        get().updateStreak();
      },

      updateStreak: () => {
        const today = new Date().toISOString().split("T")[0];
        const last  = get().lastActiveDate;

        if (last === today) return;

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yd = yesterday.toISOString().split("T")[0];

        set((s) => ({
          streak:         last === yd ? s.streak + 1 : 1,
          lastActiveDate: today,
        }));
      },

      getTotalXP: () => get().xp,

      getLevel: () => {
        const info = getLevelInfo(get().xp);
        return { level: info.level, title: info.title, nextXP: info.nextXP };
      },

      getLevelProgress: (levelId, totalLessons, doneFn, lessonIds) => {
        const ids = lessonIds ?? [];
        const count = ids.length || totalLessons;
        if (count === 0) return 0;
        let done = 0;
        for (let i = 0; i < count; i++) {
          const id = ids[i] || `${levelId}-lesson-${i}`;
          done += hasModuleCredit(id, get().modules, get().lessons) || doneFn(id) ? 1 : 0;
        }
        return Math.round((done / count) * 100);
      },

      reset: () => set({ ...INITIAL, modules: {}, activityAttempts: [] }),
    }),
    {
      name:    "englishcamp-progress",
      version: 2,
      migrate: saved => migrateCourseProgress(saved) as ProgressStore & ProgressActions,
      storage: createJSONStorage(() => localStorage),
    }
  )
);

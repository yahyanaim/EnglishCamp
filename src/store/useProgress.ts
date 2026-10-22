import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { ProgressStore, BandId, QuizResult } from "@/data/types";
import { getLevelInfo } from "@/lib/xp";

interface ProgressActions {
  completeLesson:   (lessonId: string, xp: number) => void;
  isLessonDone:     (lessonId: string) => boolean;
  getLessonXP:      (lessonId: string) => number;
  recordQuizResult: (levelId: BandId, result: QuizResult) => void;
  getBestScore:     (levelId: BandId) => number;
  completeExercise: (exerciseId: string, xp: number) => void;
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

      completeLesson: (lessonId, xp) => {
        const existing = get().lessons[lessonId];
        if (existing?.completed) return;

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
      },

      isLessonDone:  (id)  => !!get().lessons[id]?.completed,
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
        if (get().exercisesDone[exerciseId]) return;
        set((s) => ({
          xp: s.xp + xp,
          exercisesDone: { ...s.exercisesDone, [exerciseId]: true },
        }));
        get().updateStreak();
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
          done += doneFn(id) ? 1 : 0;
        }
        return Math.round((done / count) * 100);
      },

      reset: () => set(INITIAL),
    }),
    {
      name:    "englishcamp-progress",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

import { learnerStorage } from "@/lib/learnerStorage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ChallengeQuestion = {
  id: string;
  prompt: string;
  answer: string;
  options?: string[];
  type: "fill-blank" | "multiple-choice" | "gender" | "conjugation";
  xpReward: number;
};

export type ChallengeResult = {
  questionId: string;
  correct: boolean;
};

interface DailyChallengeStore {
  lastDate: string | null;
  completed: boolean;
  score: number;
  total: number;
  xpEarned: number;
  results: ChallengeResult[];
  setCompleted: (score: number, total: number, xpEarned: number, results: ChallengeResult[]) => void;
  isTodayDone: () => boolean;
  resetIfNewDay: () => void;
}

export const useDailyChallenge = create<DailyChallengeStore>()(
  persist(
    (set, get) => ({
      lastDate: null,
      completed: false,
      score: 0,
      total: 0,
      xpEarned: 0,
      results: [],

      setCompleted: (score, total, xpEarned, results) => {
        set({
          completed: true,
          score,
          total,
          xpEarned,
          results,
          lastDate: new Date().toISOString().split("T")[0],
        });
      },

      isTodayDone: () => {
        const today = new Date().toISOString().split("T")[0];
        return get().completed && get().lastDate === today;
      },

      resetIfNewDay: () => {
        const today = new Date().toISOString().split("T")[0];
        if (get().lastDate !== today) {
          set({ completed: false, score: 0, total: 0, xpEarned: 0, results: [] });
        }
      },
    }),
    { name: "englishcamp-daily-challenge", skipHydration: true, storage: createJSONStorage(() => learnerStorage) }
  )
);

import { learnerStorage } from "@/lib/learnerStorage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { localDay } from "@/lib/learningActivity";

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
  attempt: {day:string;answers:number[]} | null;
  saveAnswer: (day:string,index:number,choice:number) => void;
  lastDate: string | null;
  completed: boolean;
  score: number;
  total: number;
  xpEarned: number;
  results: ChallengeResult[];
  setCompleted: (score: number, total: number, xpEarned: number, results: ChallengeResult[], day?:string) => void;
  isTodayDone: () => boolean;
  resetIfNewDay: () => void;
}

export const useDailyChallenge = create<DailyChallengeStore>()(
  persist(
    (set, get) => ({
      attempt:null,
      saveAnswer:(day,index,choice)=>set(state=>{
        const answers=state.attempt?.day===day?state.attempt.answers:[];
        return index===answers.length&&Number.isInteger(choice)&&choice>=0 ? {attempt:{day,answers:[...answers,choice]}} : {};
      }),
      lastDate: null,
      completed: false,
      score: 0,
      total: 0,
      xpEarned: 0,
      results: [],

      setCompleted: (score, total, xpEarned, results, day=localDay()) => {
        set({
          completed: true,
          score,
          total,
          xpEarned,
          results,
          lastDate: day,
        });
      },

      isTodayDone: () => {
        const today = localDay();
        return get().completed && get().lastDate === today;
      },

      resetIfNewDay: () => {
        const today = localDay();
        if (get().lastDate !== today) {
          set({ completed: false, score: 0, total: 0, xpEarned: 0, results: [] });
        }
      },
    }),
    { name: "englishcamp-daily-challenge", skipHydration: true, storage: createJSONStorage(() => learnerStorage) }
  )
);

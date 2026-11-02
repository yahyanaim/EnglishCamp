import { learnerStorage } from "@/lib/learnerStorage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type ErrorEntry = {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  source: string;
  sourceId: string;
  timestamp: string;
  reviewed: boolean;
  taskId?: string;
  questionId?: string;
};

interface ErrorsStore {
  errors: ErrorEntry[];
  addError: (entry: Omit<ErrorEntry, "timestamp" | "reviewed">) => void;
  resolveActivityErrors: (moduleId: string, taskId: string, questionIds: string[]) => void;
  markReviewed: (index: number) => void;
  clearReviewed: () => void;
  getRecent: (n?: number) => ErrorEntry[];
  getBySource: (source: ErrorEntry["source"]) => ErrorEntry[];
  getCount: () => number;
  getUnreviewed: () => ErrorEntry[];
}

export const useErrors = create<ErrorsStore>()(
  persist(
    (set, get) => ({
      errors: [],

      addError: (entry) => {
        set((s) => ({
          errors: [
            { ...entry, timestamp: new Date().toISOString(), reviewed: false },
            ...s.errors,
          ].slice(0, 200),
        }));
      },

      resolveActivityErrors: (moduleId, taskId, questionIds) => set(s => ({
        errors: s.errors.map(error => error.source === "course-activity" && error.sourceId === moduleId && error.taskId === taskId && questionIds.includes(error.questionId ?? "") ? { ...error, reviewed: true } : error),
      })),
      markReviewed: (index) => {
        set((s) => {
          const errors = [...s.errors];
          if (errors[index]) errors[index] = { ...errors[index], reviewed: true };
          return { errors };
        });
      },

      clearReviewed: () => {
        set((s) => ({ errors: s.errors.filter((e) => !e.reviewed) }));
      },

      getRecent: (n = 20) => get().errors.slice(0, n),

      getBySource: (source) => get().errors.filter((e) => e.source === source),

      getCount: () => get().errors.length,

      getUnreviewed: () => get().errors.filter((e) => !e.reviewed),
    }),
    { name: "englishcamp-errors", skipHydration: true, storage: createJSONStorage(() => learnerStorage) }
  )
);

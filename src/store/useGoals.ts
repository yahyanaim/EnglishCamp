import { learnerStorage } from "@/lib/learnerStorage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface GoalsStore {
  weeklyXpGoal: number;
  weeklyLessonGoal: number;
  weekStart: string;
  xpThisWeek: number;
  lessonsThisWeek: number;
  setGoals: (xp: number, lessons: number) => void;
  addXp: (amount: number) => void;
  addLesson: () => void;
  resetIfNewWeek: () => void;
  getProgress: () => { xpPct: number; lessonPct: number };
}

function getWeekStart(): string {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(d.setDate(diff));
  return monday.toISOString().split("T")[0];
}

export const useGoals = create<GoalsStore>()(
  persist(
    (set, get) => ({
      weeklyXpGoal: 500,
      weeklyLessonGoal: 10,
      weekStart: getWeekStart(),
      xpThisWeek: 0,
      lessonsThisWeek: 0,

      setGoals: (xp, lessons) => set({ weeklyXpGoal: xp, weeklyLessonGoal: lessons }),

      addXp: (amount) => {
        get().resetIfNewWeek();
        set((s) => ({ xpThisWeek: s.xpThisWeek + amount }));
      },

      addLesson: () => {
        get().resetIfNewWeek();
        set((s) => ({ lessonsThisWeek: s.lessonsThisWeek + 1 }));
      },

      resetIfNewWeek: () => {
        const currentStart = getWeekStart();
        if (get().weekStart !== currentStart) {
          set({ weekStart: currentStart, xpThisWeek: 0, lessonsThisWeek: 0 });
        }
      },

      getProgress: () => {
        const { weeklyXpGoal, weeklyLessonGoal, xpThisWeek, lessonsThisWeek } = get();
        return {
          xpPct: Math.min(100, Math.round((xpThisWeek / weeklyXpGoal) * 100)),
          lessonPct: Math.min(100, Math.round((lessonsThisWeek / weeklyLessonGoal) * 100)),
        };
      },
    }),
    { name: "englishcamp-goals", skipHydration: true, storage: createJSONStorage(() => learnerStorage) }
  )
);

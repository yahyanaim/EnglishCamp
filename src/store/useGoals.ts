import { learnerStorage } from "@/lib/learnerStorage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { localWeekStart, weeklyEvidence, type WeeklyEvidence } from "@/lib/weeklyProgress";

interface GoalsStore {
  evidenceXp: number | null;
  evidenceLessons: number | null;
  syncProgress: (progress: WeeklyEvidence) => void;
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
  return localWeekStart();
}

export const useGoals = create<GoalsStore>()(
  persist(
    (set, get) => ({
      evidenceXp: null,
      evidenceLessons: null,
      syncProgress: progress => set(state=>{
        const known=weeklyEvidence(progress),sameWeek=state.weekStart===known.week;
        const oldXp=sameWeek?state.xpThisWeek:0,oldLessons=sameWeek?state.lessonsThisWeek:0;
        const previousXp=sameWeek?state.evidenceXp:null,previousLessons=sameWeek?state.evidenceLessons:null;
        const xpThisWeek=previousXp==null?Math.max(oldXp,known.xp):oldXp+Math.max(0,known.xp-previousXp);
        const lessonsThisWeek=previousLessons==null?Math.max(oldLessons,known.lessons):oldLessons+Math.max(0,known.lessons-previousLessons);
        if(sameWeek&&state.evidenceXp===known.xp&&state.evidenceLessons===known.lessons&&state.xpThisWeek===xpThisWeek&&state.lessonsThisWeek===lessonsThisWeek)return state;
        return {weekStart:known.week,xpThisWeek,lessonsThisWeek,evidenceXp:known.xp,evidenceLessons:known.lessons};
      }),
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
          set({ weekStart: currentStart, xpThisWeek: 0, lessonsThisWeek: 0, evidenceXp:null, evidenceLessons:null });
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

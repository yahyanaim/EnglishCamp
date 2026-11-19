import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { learnerStorage } from "@/lib/learnerStorage";

/**
 * Lesson-level study state for Read and Listening (best score, attempts, audio resume point).
 * Completion and XP stay in useProgress (exercisesDone + idempotent learning events).
 */
export type SkillLessonState = { attempts: number; best: number; total: number; lastAt: string; position?: number; startedAt?: string };
type SkillKey = `reading:${string}` | `listening:${string}`;
interface SkillPractice {
  lessons: Record<string, SkillLessonState>;
  start: (key: SkillKey) => void;
  savePosition: (key: SkillKey, seconds: number) => void;
  recordAttempt: (key: SkillKey, correct: number, total: number) => void;
}

const blank = (): SkillLessonState => ({ attempts: 0, best: 0, total: 0, lastAt: new Date().toISOString() });

export const useSkillPractice = create<SkillPractice>()(persist((set) => ({
  lessons: {},
  start: key => set(s => s.lessons[key]?.startedAt ? s : { lessons: { ...s.lessons, [key]: { ...(s.lessons[key] ?? blank()), startedAt: new Date().toISOString(), lastAt: new Date().toISOString() } } }),
  savePosition: (key, seconds) => {
    if (!Number.isFinite(seconds) || seconds < 0) return;
    set(s => ({ lessons: { ...s.lessons, [key]: { ...(s.lessons[key] ?? blank()), startedAt: s.lessons[key]?.startedAt ?? new Date().toISOString(), position: Math.round(seconds * 10) / 10, lastAt: new Date().toISOString() } } }));
  },
  recordAttempt: (key, correct, total) => {
    if (!Number.isInteger(correct) || !Number.isInteger(total) || total <= 0) return;
    set(s => {
      const previous = s.lessons[key] ?? blank();
      return { lessons: { ...s.lessons, [key]: { ...previous, attempts: previous.attempts + 1, best: Math.max(previous.best, Math.min(correct, total)), total, lastAt: new Date().toISOString() } } };
    });
  },
}), { name: "englishcamp-skill-practice", version: 1, skipHydration: true, storage: createJSONStorage(() => learnerStorage) }));

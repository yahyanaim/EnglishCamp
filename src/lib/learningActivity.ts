import type { LessonProgress, QuizResult } from "@/data/types";
import type { ActivityAttempt } from "./courseProgress";

export type LearningEvent = { id: string; at: string; kind: "lesson" | "exercise" | "quiz" | "practice" | "flashcard"; source: string; xp: number };
export const localDay = (value: string | Date = new Date()) => {
  const date = typeof value === "string" ? new Date(value) : value;
  return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
};
export function learningEvent(kind: LearningEvent["kind"], source: string, xp = 0): LearningEvent {
  return { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, at: new Date().toISOString(), kind, source, xp };
}

/** A saved streak proves consecutive active dates, but not how many tasks were done. */
export function legacyStreakDays(state:{xp:number;lastActiveDate:string|null;streak?:number}) {
  if(state.xp<=0||!state.lastActiveDate||!/^\d{4}-\d{2}-\d{2}$/.test(state.lastActiveDate)) return [];
  const end=new Date(state.lastActiveDate+"T12:00:00"),count=Math.min(28,Math.max(1,Math.floor(state.streak??1)));
  if(!Number.isFinite(end.getTime()))return [];
  return Array.from({length:count},(_,i)=>{const date=new Date(end);date.setDate(date.getDate()-i);return localDay(date);});
}

/** Backfill only dated evidence. A legacy last-active date proves activity, not an invented count. */
export function activityDays(state: { events?: LearningEvent[]; legacyActiveDays?: string[]; lessons: Record<string, LessonProgress>; quizResults: Record<string, QuizResult[]>; activityAttempts?: ActivityAttempt[]; xp: number; streak?: number; lastActiveDate: string | null }) {
  const days: Record<string, { count: number; legacy: boolean }> = {};
  const add = (at: string) => { if (!Number.isFinite(Date.parse(at))) return; const day=localDay(at); days[day] ??= {count:0,legacy:false}; days[day].count++; };
  const events=state.events ?? [];
  events.forEach(event=>add(event.at));
  for (const [id,lesson] of Object.entries(state.lessons)) if (lesson.completedAt && !events.some(e=>e.kind==="lesson"&&e.source===id)) add(lesson.completedAt);
  for (const [id,results] of Object.entries(state.quizResults)) results.forEach(result=>{ if (!events.some(e=>e.kind==="quiz"&&e.source===id&&e.at===result.takenAt)) add(result.takenAt); });
  (state.activityAttempts??[]).forEach(attempt=>add(attempt.at));
  for(const day of [...(state.legacyActiveDays??[]),...legacyStreakDays(state)]) if(!days[day]) days[day]={count:0,legacy:true};
  if(state.xp>0&&state.lastActiveDate&&!days[state.lastActiveDate]) days[state.lastActiveDate]={count:0,legacy:true};
  return days;
}

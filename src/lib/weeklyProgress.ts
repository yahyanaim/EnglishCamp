import type { LessonProgress, QuizResult } from "@/data/types";
import { localDay, type LearningEvent } from "./learningActivity";
export type WeeklyEvidence = { events?: LearningEvent[]; lessons: Record<string,LessonProgress>; quizResults: Record<string,QuizResult[]> };
export function localWeekStart(now=new Date()) {
  const monday=new Date(now);monday.setDate(monday.getDate()-((monday.getDay()+6)%7));return localDay(monday);
}
/** Use recorded dates and de-duplicate the legacy lesson/quiz copies of new events. */
export function datedXP(state:WeeklyEvidence) {
  const days:Record<string,number>={},events=state.events??[];
  const add=(at:string,xp:number)=>{if(!Number.isFinite(Date.parse(at))||!Number.isFinite(xp)||xp<=0)return;const day=localDay(at);days[day]=(days[day]??0)+xp;};
  events.forEach(e=>add(e.at,e.xp));
  for(const [id,item] of Object.entries(state.lessons))if(item.completed&&item.completedAt&&!events.some(e=>e.kind==='lesson'&&e.source===id))add(item.completedAt,item.xpEarned);
  for(const [id,items] of Object.entries(state.quizResults))for(const item of items)if(!events.some(e=>e.kind==='quiz'&&e.source===id&&e.at===item.takenAt))add(item.takenAt,item.xpEarned);
  return days;
}
/** Count dated evidence only; lifetime XP does not establish this week's XP. */
export function weeklyEvidence(state:WeeklyEvidence,now=new Date()) {
  const week=localWeekStart(now),today=localDay(now);
  const xp=Object.entries(datedXP(state)).filter(([day])=>day>=week&&day<=today).reduce((sum,[,xp])=>sum+xp,0);
  const lessons=Object.values(state.lessons).filter(item=>item.completed&&item.completedAt&&Number.isFinite(Date.parse(item.completedAt))&&localDay(item.completedAt)>=week&&localDay(item.completedAt)<=today).length;
  return {week,xp,lessons};
}
export function weeklyXPDays(state:WeeklyEvidence,now=new Date()) {
  const start=new Date(localWeekStart(now)+'T12:00:00'),days=datedXP(state),today=localDay(now);
  return Array.from({length:7},(_,i)=>{const date=new Date(start);date.setDate(date.getDate()+i);const day=localDay(date);return {day,label:date.toLocaleDateString('en',{weekday:'short'}),xp:day<=today?(days[day]??0):0};});
}

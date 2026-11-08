import type { LearningEvent } from './learningActivity';
import type { ProgressStore } from '@/data/types';
import type { ModuleProgress, ActivityAttempt } from './courseProgress';

export type CloudAccount = { id: string; name: string; number: number; fruit: string };
export type DailySummary={day:string;completed:true;score:number;total:number;xpEarned:number};
export type CloudProgress = ProgressStore & { modules: Record<string, ModuleProgress>; activityAttempts: ActivityAttempt[]; events: LearningEvent[]; legacyActiveDays: string[];dailySummary?:DailySummary };
export type CloudBadges = Record<string, { unlockedAt: string }>;
export type CloudSnapshot = { progress: CloudProgress; badges: CloudBadges; revision: number; updatedAt: string };
const object = (value: unknown): Record<string, any> => value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, any> : {};
const number = (value: unknown, max=1e9) => typeof value==='number'&&Number.isFinite(value)?Math.min(max,Math.max(0,value)):0;
const date = (value: unknown) => typeof value==='string'&&Number.isFinite(Date.parse(value))?new Date(value).toISOString():null;
const entries = (value: unknown, limit=10000) => Object.entries(object(value)).filter(([key])=>key.length<=180&&!['__proto__','constructor','prototype'].includes(key)).slice(0,limit);
const map = <T,>(value:unknown, transform:(item:any)=>T): Record<string,T> => Object.fromEntries(entries(value).map(([key,item])=>[key,transform(item)]));

/** Only learning totals and completion evidence cross the network. No answer text, notes or audio. */
export function cleanEvents(value: unknown, limit=2000): LearningEvent[] {
 return (Array.isArray(value)?value:[]).slice(-limit).filter(e=>e&&typeof e.id==='string'&&e.id.length<=100&&typeof e.source==='string'&&e.source.length<=180&&['lesson','exercise','quiz','practice','flashcard'].includes(e.kind)&&date(e.at)).map(e=>({id:e.id,source:e.source,kind:e.kind,at:date(e.at)!,xp:number(e.xp,10000)}));
}
export function eventKey(event:LearningEvent){return event.kind==='lesson'||event.kind==='exercise'?`${event.kind}:${event.source}`:`${event.kind}:${event.id}`;}
export function cleanBadges(value:unknown):CloudBadges { return Object.fromEntries(entries(value,200).filter(([,v])=>date(v?.unlockedAt)).map(([key,v])=>[key,{unlockedAt:date(v.unlockedAt)!}])); }
export function cleanProgress(value:unknown):CloudProgress {
 const s=object(value);
 const daily=s.dailySummary&&s.dailySummary.completed===true&&typeof s.dailySummary.day==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s.dailySummary.day)?{day:s.dailySummary.day,completed:true as const,score:number(s.dailySummary.score,100),total:number(s.dailySummary.total,100),xpEarned:number(s.dailySummary.xpEarned,10000)}:undefined;
 const modules=map(s.modules,(m)=>{m=object(m);return {
  stages:Object.fromEntries(entries(m.stages,3).filter(([key,e])=>['0','1','2'].includes(key)&&e&&date(e.finishedAt)&&typeof e.signature==='string'&&e.signature.length<=200).map(([key,e])=>[key,{finishedAt:date(e.finishedAt)!,signature:e.signature,kind:String(e.kind).slice(0,50),outcome:['checked','self-reviewed','study-alternative'].includes(e.outcome)?e.outcome:'checked'}])),
  ...Object.fromEntries(['viewedAt','lastActiveAt','guidedStartedAt','assessmentAttemptedAt'].filter(k=>date(m[k])).map(k=>[k,date(m[k])])),
  ...(Number.isInteger(m.currentStage)?{currentStage:Math.min(2,Math.max(0,m.currentStage))}:{}),
  ...(Array.isArray(m.expectedSignatures)&&m.expectedSignatures.length===3?{expectedSignatures:m.expectedSignatures.map((x:unknown)=>String(x).slice(0,200))}:{}),
  ...(m.legacyStudy===true?{legacyStudy:true}:{}),...(m.legacyPractice===true?{legacyPractice:true}:{}),
 } as ModuleProgress;});
 const quizResults=Object.fromEntries(['band4-5','band5-6','band6-7','band7-8'].map(id=>[id,(Array.isArray(s.quizResults?.[id])?s.quizResults[id]:[]).slice(-100).filter((q:any)=>date(q?.takenAt)).map((q:any)=>({score:number(q.score,100),xpEarned:number(q.xpEarned,10000),takenAt:date(q.takenAt)!,answers:[]}))])) as unknown as ProgressStore['quizResults'];
 return {xp:number(s.xp),streak:number(s.streak,10000),lastActiveDate:typeof s.lastActiveDate==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s.lastActiveDate)?s.lastActiveDate:null,
  lessons:map(s.lessons,l=>({completed:l?.completed===true,xpEarned:number(l?.xpEarned,10000),completedAt:date(l?.completedAt),attempts:number(l?.attempts,100000)})),quizResults,
  exercisesDone:map(s.exercisesDone,v=>v===true),flashcardSeen:map(s.flashcardSeen,v=>number(v,100000)),modules,events:cleanEvents(s.events),
  activityAttempts:(Array.isArray(s.activityAttempts)?s.activityAttempts:[]).slice(-200).filter((a:any)=>a&&typeof a.moduleId==='string'&&typeof a.taskId==='string'&&date(a.at)).map((a:any)=>({moduleId:a.moduleId.slice(0,180),taskId:a.taskId.slice(0,180),signature:String(a.signature).slice(0,200),stage:number(a.stage,2),at:date(a.at)!,status:['attempted','correct','incorrect','revised','completed'].includes(a.status)?a.status:'attempted',...(a.outcome?{outcome:String(a.outcome).slice(0,30)}:{}),...(typeof a.correct==='number'?{correct:number(a.correct,10000),total:number(a.total,10000)}:{})})) as ActivityAttempt[],
  legacyActiveDays:(Array.isArray(s.legacyActiveDays)?s.legacyActiveDays:[]).filter((d:unknown)=>typeof d==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(d)).slice(-365),
  ...(daily?{dailySummary:daily}:{}),
 };
}
const unique=<T,>(items:T[],key:(item:T)=>string,limit:number)=>Array.from(new Map(items.map(item=>[key(item),item])).values()).slice(-limit);
/** Completion is monotonic. XP comes from the server's idempotent event ledger. */
export function mergeProgress(left:unknown,right:unknown):CloudProgress {
 const a=cleanProgress(left),b=cleanProgress(right),lessons={...a.lessons};
 for(const[id,l]of Object.entries(b.lessons)){const old=lessons[id];lessons[id]=!old?l:{completed:old.completed||l.completed,xpEarned:Math.max(old.xpEarned,l.xpEarned),completedAt:old.completedAt&&l.completedAt?[old.completedAt,l.completedAt].sort()[0]:old.completedAt||l.completedAt,attempts:Math.max(old.attempts,l.attempts)};}
 const modules={...a.modules};for(const[id,m]of Object.entries(b.modules)){const old=modules[id];if(!old){modules[id]=m;continue;}const recent=(old.lastActiveAt??'')>(m.lastActiveAt??'')?old:m;const stages={...old.stages};for(const[stage,e]of Object.entries(m.stages))if(!stages[+stage]||stages[+stage].finishedAt<e.finishedAt)stages[+stage]=e;modules[id]={...old,...m,...recent,legacyStudy:old.legacyStudy||m.legacyStudy,legacyPractice:old.legacyPractice||m.legacyPractice,stages};}
 const quizResults={...a.quizResults};for(const id of Object.keys(quizResults) as (keyof typeof quizResults)[])quizResults[id]=unique([...a.quizResults[id],...b.quizResults[id]].sort((x,y)=>x.takenAt.localeCompare(y.takenAt)),q=>q.takenAt,100);
 const lastActiveDate=[a.lastActiveDate,b.lastActiveDate].filter(Boolean).sort().at(-1)??null;
 const days=Array.from(new Set([...a.legacyActiveDays,...b.legacyActiveDays,...[a.lastActiveDate,b.lastActiveDate].filter((d):d is string=>!!d)])).sort();
 let streak=0;if(lastActiveDate){let cursor=new Date(lastActiveDate+'T12:00:00Z');while(days.includes(cursor.toISOString().slice(0,10))){streak++;cursor.setUTCDate(cursor.getUTCDate()-1);}}
 const dailySummary=a.dailySummary&&(!b.dailySummary||a.dailySummary.day>=b.dailySummary.day)?a.dailySummary:b.dailySummary;
 return {...a,xp:Math.max(a.xp,b.xp),streak:Math.max(streak,a.lastActiveDate===lastActiveDate?a.streak:0,b.lastActiveDate===lastActiveDate?b.streak:0),lastActiveDate,lessons,modules,quizResults,...(dailySummary?{dailySummary}:{}),
  exercisesDone:Object.fromEntries(Array.from(new Set([...Object.keys(a.exercisesDone),...Object.keys(b.exercisesDone)])).map(k=>[k,!!a.exercisesDone[k]||!!b.exercisesDone[k]])),
  flashcardSeen:Object.fromEntries(Array.from(new Set([...Object.keys(a.flashcardSeen),...Object.keys(b.flashcardSeen)])).map(k=>[k,Math.max(a.flashcardSeen[k]??0,b.flashcardSeen[k]??0)])),
  events:unique([...a.events,...b.events].sort((x,y)=>x.at.localeCompare(y.at)),e=>e.id,2000),
  activityAttempts:unique([...a.activityAttempts,...b.activityAttempts].sort((x,y)=>x.at.localeCompare(y.at)),e=>`${e.moduleId}:${e.taskId}:${e.at}:${e.status}`,200),legacyActiveDays:days.slice(-365),
 };
}
export function mergeBadges(a:unknown,b:unknown):CloudBadges {const result=cleanBadges(a);for(const[id,badge]of Object.entries(cleanBadges(b)))if(!result[id]||badge.unlockedAt<result[id].unlockedAt)result[id]=badge;return result;}

import type { PlacementLevel } from '@/data/placement/questions';
export type StudyReview={checks:boolean[];practiceDate:string;retestDate:string;feedback:{speaking:boolean;writing:boolean};note:string};
export const emptyStudyReview=():StudyReview=>({checks:[false,false,false],practiceDate:'',retestDate:'',feedback:{speaking:false,writing:false},note:''});
const date=(value:unknown)=>typeof value==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value)&&Number.isFinite(Date.parse(value))&&new Date(value).toISOString().slice(0,10)===value;
export function readStudyReviews(value:unknown):Record<string,StudyReview>{
 const out:Record<string,StudyReview>={};if(!value||typeof value!=='object'||Array.isArray(value))return out;
 for(const [key,item] of Object.entries(value).slice(-60)){
  if(!/^[\w-]{6,125}$/.test(key)||!item||typeof item!=='object')continue;
  const r=item as Partial<StudyReview>;out[key]={checks:Array.from({length:3},(_,i)=>r.checks?.[i]===true),practiceDate:date(r.practiceDate)?r.practiceDate!:'',retestDate:date(r.retestDate)?r.retestDate!:'',feedback:{speaking:r.feedback?.speaking===true,writing:r.feedback?.writing===true},note:typeof r.note==='string'?r.note.slice(0,1000):''};
 }return out;
}
export const studyReviewKey=(scheduleId:string,cycle:number,level:PlacementLevel)=>`${scheduleId}-review-${cycle}-${level}`;
/** Readiness is a learner's planning reflection; it never changes test scores or course credit. */
export function studyReadinessStatus(review:StudyReview,today:string){
 const canDo=review.checks.length===3&&review.checks.every(Boolean),freshTask=date(review.practiceDate)&&date(review.retestDate)&&review.retestDate>review.practiceDate&&review.retestDate<=today,feedback=review.feedback.speaking&&review.feedback.writing;
 return {canDo,freshTask,feedback,ready:canDo&&freshTask&&feedback};
}

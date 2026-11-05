import type { ShadowLesson } from '@/data/shadowing';
export const shadowLineId=(lessonId:string,index:number)=>`shadowing-${lessonId}-line-${index}`;
export const shadowLessonId=(lessonId:string)=>`shadowing-${lessonId}`;
export function shadowPracticeProgress(lesson:ShadowLesson,done:Record<string,boolean>){return {lines:lesson.lines.filter((_,i)=>done[shadowLineId(lesson.id,i)]).length,total:lesson.lines.length,complete:!!done[shadowLessonId(lesson.id)]};}
/** Records a learner's deliberate practice, not a pronunciation or CEFR assessment. */
export function recordShadowPractice(lesson:ShadowLesson,index:number,done:Record<string,boolean>,complete:(id:string,xp:number)=>number){
 if(!Number.isInteger(index)||index<0||index>=lesson.lines.length)return 0;
 const id=shadowLineId(lesson.id,index);let xp=complete(id,2);
 if(lesson.lines.every((_,i)=>i===index||done[shadowLineId(lesson.id,i)]))xp+=complete(shadowLessonId(lesson.id),10);
 return xp;
}

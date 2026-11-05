import { CEFR_TEST_VERSION,CEFR_LEVELS,CEFR_QUESTIONS,CEFR_LISTENING,CEFR_SPEAKING,CEFR_WRITING,type CefrLevel,type CefrEstimate } from '@/data/placement/cefr';
import { speakingBand,validSpeakingAssessment,SPEAKING_DIMENSIONS,type SpeakingAssessment } from './speakingAssessment';
import type { StudyAdaptation,StudyPriority } from './placement';
import type { SpeakingReview } from './placementCommunication';
export const WRITING_ASSESSMENT_VERSION='englishcamp-writing-v1';
export const WRITING_CONSENT_VERSION='writing-openai-v1';
export const WRITING_DIMENSIONS=['grammar','vocabulary','coherence','register'] as const;
export type WritingAssessment={version:typeof WRITING_ASSESSMENT_VERSION;provider:'OpenAI';model:string;assessedAt:string;taskId:string;textHash:string;taskAchievement:number;dimensions:Record<typeof WRITING_DIMENSIONS[number],{score:number;evidence:string}>;strengths:string[];nextSteps:string[]};
export type WritingResponse={status:'draft'|'skipped';text:string}|{status:'assessed';text:string;assessment:WritingAssessment};
export type CefrResult={id:string;version:typeof CEFR_TEST_VERSION;completedAt:string;answers:Record<string,number>;listening:Record<string,number>;taskLevel:CefrLevel;speaking:Record<string,SpeakingReview>;writing:Record<string,WritingResponse>};
export type CefrRecord={version:typeof CEFR_TEST_VERSION;status:'new'|'in-progress'|'skipped'|'complete';attemptId:string;answers:Record<string,number>;listening:Record<string,number>;heard:string[];taskLevel?:CefrLevel;speaking:Record<string,SpeakingReview>;writing:Record<string,WritingResponse>;results:CefrResult[]};
export const emptyCefrRecord=():CefrRecord=>({version:CEFR_TEST_VERSION,status:'new',attemptId:'',answers:{},listening:{},heard:[],speaking:{},writing:{},results:[]});
const text=(v:unknown,max:number)=>typeof v==='string'&&v.trim().length>0&&v.length<=max;
export function validWritingAssessment(value:unknown,taskId:string):WritingAssessment|null{
 if(!value||typeof value!=='object')return null;const a=value as WritingAssessment;
 if(a.version!==WRITING_ASSESSMENT_VERSION||a.provider!=='OpenAI'||a.taskId!==taskId||!text(a.model,100)||!Number.isFinite(Date.parse(a.assessedAt))||!/^[a-f0-9]{64}$/.test(a.textHash)||!Number.isInteger(a.taskAchievement)||a.taskAchievement<0||a.taskAchievement>4)return null;
 if(!WRITING_DIMENSIONS.every(k=>Number.isInteger(a.dimensions?.[k]?.score)&&a.dimensions[k].score>=0&&a.dimensions[k].score<=6&&text(a.dimensions[k].evidence,600)))return null;
 if(![a.strengths,a.nextSteps].every(v=>Array.isArray(v)&&v.length>0&&v.length<=3&&v.every(s=>text(s,400))))return null;
 return {version:a.version,provider:a.provider,model:a.model,taskId,assessedAt:a.assessedAt,textHash:a.textHash,taskAchievement:a.taskAchievement,dimensions:Object.fromEntries(WRITING_DIMENSIONS.map(k=>[k,{score:a.dimensions[k].score,evidence:a.dimensions[k].evidence}])) as WritingAssessment['dimensions'],strengths:[...a.strengths],nextSteps:[...a.nextSteps]};
}
const validAnswers=(input:unknown,bank:readonly {id:string;options:string[]}[],skip=false)=>{const value=input as Record<string,number>|undefined,out:Record<string,number>={};for(const q of bank){const n=value?.[q.id];if(Number.isInteger(n)&&n!>=(skip?-2:-1)&&n!<q.options.length)out[q.id]=n!;}return out;};
const allAnswered=(answers:Record<string,number>,bank:readonly {id:string}[])=>bank.every(q=>Object.hasOwn(answers,q.id));
export const cefrQuestionsComplete=(answers:Record<string,number>)=>allAnswered(validAnswers(answers,CEFR_QUESTIONS),CEFR_QUESTIONS);
export const cefrListeningComplete=(answers:Record<string,number>)=>allAnswered(validAnswers(answers,CEFR_LISTENING,true),CEFR_LISTENING);
export const cefrSpeakingTasks=(level:CefrLevel)=>CEFR_SPEAKING.filter(t=>t.level===level);
export const cefrWritingTasks=(level:CefrLevel)=>CEFR_WRITING.filter(t=>t.level===level);
function validResponses(input:Partial<CefrRecord>,out:CefrRecord){
 if(!out.taskLevel)return;
 for(const task of cefrSpeakingTasks(out.taskLevel)){const r=input.speaking?.[task.id];if(r?.status==='skipped')out.speaking[task.id]={status:'skipped'};else if(r?.status==='recorded'&&r.recorded===true)out.speaking[task.id]={status:'recorded',recorded:true,ratings:{}};else if(r?.status==='assessed'&&r.recorded===true){const assessment=validSpeakingAssessment(r.assessment,task.id);if(assessment)out.speaking[task.id]={status:'assessed',recorded:true,assessment};}}
 for(const task of cefrWritingTasks(out.taskLevel)){const r=input.writing?.[task.id];if(!r||typeof r.text!=='string'||r.text.length>12000)continue;if(r.status==='skipped'||r.status==='draft')out.writing[task.id]={status:r.status,text:r.text};else if(r.status==='assessed'){const assessment=validWritingAssessment(r.assessment,task.id);if(assessment)out.writing[task.id]={status:'assessed',text:r.text,assessment};else out.writing[task.id]={status:'draft',text:r.text};}}
}
export function cefrFinished(record:Pick<CefrRecord,'answers'|'listening'|'taskLevel'|'speaking'|'writing'>){return cefrQuestionsComplete(record.answers)&&cefrListeningComplete(record.listening)&&!!record.taskLevel&&cefrSpeakingTasks(record.taskLevel).every(t=>['assessed','skipped'].includes(record.speaking[t.id]?.status))&&cefrWritingTasks(record.taskLevel).every(t=>['assessed','skipped'].includes(record.writing[t.id]?.status));}
export function readCefrRecord(value:unknown):CefrRecord{
 const out=emptyCefrRecord();if(!value||typeof value!=='object')return out;const data=value as CefrRecord;if(data.version!==CEFR_TEST_VERSION)return out;
 if(['new','in-progress','skipped','complete'].includes(data.status))out.status=data.status;
 out.attemptId=typeof data.attemptId==='string'&&/^[\w-]{6,80}$/.test(data.attemptId)?data.attemptId:'';
 out.answers=validAnswers(data.answers,CEFR_QUESTIONS);out.listening=validAnswers(data.listening,CEFR_LISTENING,true);
 out.heard=Array.isArray(data.heard)?Array.from(new Set(data.heard.filter(id=>CEFR_LISTENING.some(q=>q.id===id)))):[];
 if(CEFR_LEVELS.includes(data.taskLevel!))out.taskLevel=data.taskLevel;
 validResponses(data,out);
 if(Array.isArray(data.results))for(const item of data.results){if(!item||item.version!==CEFR_TEST_VERSION||typeof item.id!=='string'||!/^[\w-]{6,80}$/.test(item.id)||!Number.isFinite(Date.parse(item.completedAt)))continue;const r=readCefrRecord({...item,status:'new',attemptId:item.id,results:[]});if(cefrFinished(r))out.results.push({id:item.id,version:CEFR_TEST_VERSION,completedAt:item.completedAt,answers:r.answers,listening:r.listening,taskLevel:r.taskLevel!,speaking:r.speaking,writing:r.writing});}
 if(out.status==='complete'&&!out.results.length)out.status='new';if(out.status==='in-progress'&&!out.attemptId)out.status='new';return out;
}
export function objectiveSkill(answers:Record<string,number>,bank:readonly {id:string;level:CefrLevel;options:string[];answer:number}[]){
 const bands=CEFR_LEVELS.map(level=>{const items=bank.filter(q=>q.level===level),done=items.filter(q=>Object.hasOwn(answers,q.id)&&answers[q.id]!==-2);return {level,total:items.length,answered:done.length,correct:done.filter(q=>answers[q.id]===q.answer).length};});
 const assessed=bands.reduce((n,b)=>n+b.answered,0),correct=bands.reduce((n,b)=>n+b.correct,0);
 // Each receptive skill has three items per band; without all six A1/A2 items, report no skill band.
 let index:number|null=bands.slice(0,2).every(b=>b.answered===b.total)?0:null;
 if(index!==null)for(let i=0;i<bands.length;i++){const b=bands[i];if(b.answered===b.total&&b.correct>=Math.ceil(b.total*2/3)&&bands.slice(0,i).every(l=>l.answered===l.total&&l.correct>=Math.ceil(l.total*2/3)))index=i+1;}
 return {level:index===null?null:index===0?'Pre-A1' as const:CEFR_LEVELS[index-1],index,correct,total:bank.length,assessed,skipped:bank.filter(q=>answers[q.id]===-2).length,bands,percent:assessed?Math.round(correct/assessed*100):null};
}
export function cefrTaskLevel(answers:Record<string,number>,listening:Record<string,number>):CefrLevel{
 const reading=objectiveSkill(answers,CEFR_QUESTIONS.filter(q=>q.domain==='reading')),heard=objectiveSkill(listening,CEFR_LISTENING),indices=[reading.index,heard.index].filter((n):n is number=>n!==null);return CEFR_LEVELS[Math.max(0,(indices.length?Math.min(...indices):1)-1)];
}
function writtenBand(a:WritingAssessment,level:CefrLevel){const scores=WRITING_DIMENSIONS.map(k=>a.dimensions[k].score);return a.taskAchievement>=2?Math.min(CEFR_LEVELS.indexOf(level)+1,Math.floor(scores.reduce((n,s)=>n+s,0)/scores.length),Math.min(...scores)+1):0;}
export const cefrLevelIndex=(level:CefrEstimate)=>level==='Pre-A1'?0:CEFR_LEVELS.indexOf(level)+1;
export function cefrProfile(result:CefrResult){
 if(!cefrFinished(result))throw new Error('A completed CEFR diagnostic record is required.');
 const reading=objectiveSkill(result.answers,CEFR_QUESTIONS.filter(q=>q.domain==='reading')),listening=objectiveSkill(result.listening,CEFR_LISTENING);
 const spoken=cefrSpeakingTasks(result.taskLevel).flatMap(t=>{const r=result.speaking[t.id];return r?.status==='assessed'?[{task:t,assessment:r.assessment,band:speakingBand(r.assessment,t.level)}]:[];});
 const written=cefrWritingTasks(result.taskLevel).flatMap(t=>{const r=result.writing[t.id];return r?.status==='assessed'?[{task:t,assessment:r.assessment,band:writtenBand(r.assessment,t.level)}]:[];});
 const productive=(items:{band:number}[])=>items.length===2?Math.min(...items.map(a=>a.band)):null;
 const s=productive(spoken),w=productive(written),band=(n:number|null):CefrEstimate|null=>n===null?null:n===0?'Pre-A1':CEFR_LEVELS[n-1];
 const speaking={level:band(s),assessed:spoken.length,percent:s===null?null:Math.round(spoken.reduce((n,a)=>n+SPEAKING_DIMENSIONS.reduce((m,k)=>m+a.assessment.dimensions[k].score,0)/4,0)/2/6*100)};
 const writing={level:band(w),assessed:written.length,percent:w===null?null:Math.round(written.reduce((n,a)=>n+WRITING_DIMENSIONS.reduce((m,k)=>m+a.assessment.dimensions[k].score,0)/4,0)/2/6*100)};
 const skills={reading,listening,speaking,writing},indices=Object.values(skills).flatMap(skill=>skill.level?[cefrLevelIndex(skill.level)]:[]),complete=Object.values(skills).every(skill=>skill.level!==null)&&listening.assessed===CEFR_LISTENING.length,minimum=indices.length?Math.min(...indices):0,level:CefrEstimate=minimum===0?'Pre-A1':CEFR_LEVELS[minimum-1],studyLevel:CefrLevel=level==='Pre-A1'?'A1':level;
 const language=CEFR_QUESTIONS.filter(q=>q.domain!=='reading'),languageCorrect=language.filter(q=>result.answers[q.id]===q.answer).length;
 const weakest=(Object.keys(skills) as (keyof typeof skills)[]).filter(k=>skills[k].level!==null).sort((a,b)=>cefrLevelIndex(skills[a].level!)-cefrLevelIndex(skills[b].level!)||(skills[a].percent||0)-(skills[b].percent||0));
 const priorities:StudyPriority[]=weakest.length?[weakest[0]]:['grammar'];for(const k of ['listening','speaking','writing'] as const)if(skills[k].level!==null&&!priorities.includes(k)&&(cefrLevelIndex(skills[k].level!)<=minimum||cefrLevelIndex(skills[k].level!)<cefrLevelIndex(reading.level||'Pre-A1')))priorities.push(k);
 const asStudy=(l:CefrEstimate|null)=>l&&l!=='Pre-A1'?l:studyLevel;
 const means=Object.fromEntries(SPEAKING_DIMENSIONS.map(k=>[k,spoken.reduce((n,a)=>n+a.assessment.dimensions[k].score,0)/(spoken.length||1)]));
 const adaptation:StudyAdaptation={baseLevel:studyLevel,levels:{reading:asStudy(reading.level),listening:asStudy(listening.level),speaking:asStudy(speaking.level),writing:asStudy(writing.level),grammar:studyLevel,vocabulary:studyLevel},priorities,...(s!==null?{speakingFocus:[...SPEAKING_DIMENSIONS].sort((a,b)=>means[a]-means[b])[0]}:{})};
 return {level,studyLevel,complete,skills,index:complete?Math.round(Object.values(skills).reduce((n,skill)=>n+skill.percent!,0)/4):null,languageCorrect,languageTotal:language.length,objectiveCorrect:reading.correct+listening.correct,objectiveTotal:reading.assessed+listening.assessed,adaptation,priority:priorities[0]};
}

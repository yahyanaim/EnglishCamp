import { PLACEMENT_LEVELS,PLACEMENT_QUESTIONS,PLACEMENT_VERSION,type PlacementLevel,type PlacementDomain } from '@/data/placement/questions';
import { readCefrRecord,type CefrRecord } from './cefrPlacement';
import { CEFR_LEVELS } from '@/data/placement/cefr';
import { readStudyReviews,type StudyReview } from './studyReadiness';
import type { SessionStorage } from './sessionProfile';
import { validCommunication,communicationSummary,type CommunicationCheck } from './placementCommunication';
import { PLACEMENT_LISTENING,PLACEMENT_SPEAKING } from '@/data/placement/communication';
import { speakingBand,studyBand,SPEAKING_DIMENSIONS,type SpeakingDimension } from './speakingAssessment';
export const PLACEMENT_KEY='englishcamp-placement-v1';
export type PlacementAnswers=Record<string,number>;
export type PlacementResult={id:string;completedAt:string;version:typeof PLACEMENT_VERSION;answers:PlacementAnswers;communication?:CommunicationCheck};
export type StudyGoal='everyday'|'ielts'|'toefl'|'b2-first';
export type StudySchedule={id:string;updatedAt:string;startDate:string;time:string;days:number[];minutes:15|25|40|60;goal:StudyGoal;startingLevel:PlacementLevel;weeks?:4|8|12};
export type PlacementRecord={version:1;status:'new'|'skipped'|'in-progress'|'complete';answers:PlacementAnswers;startedAt:string;results:PlacementResult[];schedule:StudySchedule|null;communication?:CommunicationCheck;studyDone?:string[];studyReviews?:Record<string,StudyReview>;cefr?:CefrRecord};
export const emptyPlacement=():PlacementRecord=>({version:1,status:'new',answers:{},startedAt:'',results:[],schedule:null});
export function validAnswers(value:unknown):PlacementAnswers{const out:PlacementAnswers={};if(!value||typeof value!=='object')return out;for(const q of PLACEMENT_QUESTIONS){const n=(value as Record<string,unknown>)[q.id];if(Number.isInteger(n)&&Number(n)>=-1&&Number(n)<q.options.length)out[q.id]=Number(n);}return out;}
export const placementComplete=(answers:PlacementAnswers)=>PLACEMENT_QUESTIONS.every(q=>Object.prototype.hasOwnProperty.call(answers,q.id)&&Number.isInteger(answers[q.id])&&answers[q.id]>=-1&&answers[q.id]<q.options.length);
export function gradePlacement(answers:PlacementAnswers){
 if(!placementComplete(answers))throw new Error('Finish every question before receiving a placement result.');
 const bands=Object.fromEntries(PLACEMENT_LEVELS.map(level=>[level,{correct:0,total:0}])) as Record<PlacementLevel,{correct:number;total:number}>;
 const domains={grammar:{correct:0,total:0},vocabulary:{correct:0,total:0},reading:{correct:0,total:0}};
 let correct=0;for(const q of PLACEMENT_QUESTIONS){const right=answers[q.id]===q.answer;bands[q.level].total++;domains[q.domain].total++;if(right){bands[q.level].correct++;domains[q.domain].correct++;correct++;}}
 let level:PlacementLevel='A1';for(let i=0;i<PLACEMENT_LEVELS.length;i++){const candidate=PLACEMENT_LEVELS[i];if(bands[candidate].correct>=6&&PLACEMENT_LEVELS.slice(0,i).every(lower=>bands[lower].correct>=5))level=candidate;}
 const weakDomain=(Object.keys(domains) as PlacementDomain[]).sort((a,b)=>domains[a].correct/domains[a].total-domains[b].correct/domains[b].total)[0];
 const mixed=PLACEMENT_LEVELS.some((band,i)=>i>PLACEMENT_LEVELS.indexOf(level)&&bands[band].correct>=6);
 return {level,correct,total:PLACEMENT_QUESTIONS.length,bands,domains,weakDomain,mixed,foundationReview:bands.A1.correct<6};
}
const isDate=(s:unknown)=>typeof s==='string'&&Number.isFinite(Date.parse(s));
export function validStudySchedule(value:unknown):value is StudySchedule{
 if(!value||typeof value!=='object')return false;const s=value as StudySchedule;
 return typeof s.id==='string'&&/^[\w-]{6,80}$/.test(s.id)&&isDate(s.updatedAt)&&typeof s.startDate==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s.startDate)&&/^([01]\d|2[0-3]):[0-5]\d$/.test(s.time)&&Array.isArray(s.days)&&s.days.length>0&&s.days.length<=7&&new Set(s.days).size===s.days.length&&s.days.every(n=>Number.isInteger(n)&&n>=0&&n<=6)&&[15,25,40,60].includes(s.minutes)&&['everyday','ielts','toefl','b2-first'].includes(s.goal)&&CEFR_LEVELS.includes(s.startingLevel)&&(s.weeks===undefined||[4,8,12].includes(s.weeks));
}
export function readPlacement(storage:SessionStorage):PlacementRecord{
 try{const data=JSON.parse(storage.getItem(PLACEMENT_KEY)||'null');if(data?.version!==1)return emptyPlacement();const results=Array.isArray(data.results)?data.results.filter((r:PlacementResult)=>r&&typeof r.id==='string'&&/^[\w-]{6,80}$/.test(r.id)&&r.version===PLACEMENT_VERSION&&isDate(r.completedAt)&&placementComplete(validAnswers(r.answers))).map((r:PlacementResult)=>({...r,answers:validAnswers(r.answers),...(r.communication?{communication:validCommunication(r.communication)}:{})})):[];
 const cefr=data.cefr?readCefrRecord(data.cefr):undefined;const status=['new','skipped','in-progress','complete'].includes(data.status)?data.status:'new';return {version:1,status:status==='complete'&&!results.length&&!cefr?.results.length?'new':status,answers:validAnswers(data.answers),startedAt:isDate(data.startedAt)?data.startedAt:'',results,schedule:validStudySchedule(data.schedule)?data.schedule:null,...(data.communication?{communication:validCommunication(data.communication)}:{}),...(cefr?{cefr}:{}),...(data.studyReviews?{studyReviews:readStudyReviews(data.studyReviews)}:{}),...(Array.isArray(data.studyDone)?{studyDone:Array.from(new Set(data.studyDone.filter((id:unknown)=>typeof id==='string'&&/^[\w-]{6,100}$/.test(id)))) as string[]}:{})};}catch{return emptyPlacement();}
}
export function savePlacement(storage:SessionStorage,record:PlacementRecord){storage.setItem(PLACEMENT_KEY,JSON.stringify(record));}
export const placementDomainLabel={grammar:'Language use',vocabulary:'Vocabulary',reading:'Reading'};
export type StudyPriority=PlacementDomain|'listening'|'speaking'|'writing';
export const studySkillLabel={...placementDomainLabel,listening:'Listening',speaking:'Speaking',writing:'Writing'};
export type StudyAdaptation={baseLevel:PlacementLevel;levels:Partial<Record<StudyPriority,PlacementLevel>>;priorities:StudyPriority[];speakingFocus?:SpeakingDimension};
/** Conservative study placement, not a psychometrically validated CEFR classification.
 * Keep skill levels separate: stronger reading never cancels a listening/speaking gap.
 * Legacy self-ratings are deliberately excluded from all level and priority calculations.
 */
export function placementProfile(result:PlacementResult){
 const core=gradePlacement(result.answers),c=validCommunication(result.communication),summary=communicationSummary(c);
 const listeningBands=Object.fromEntries(PLACEMENT_LEVELS.map(level=>{const items=PLACEMENT_LISTENING.filter(q=>q.level===level),answered=items.filter(q=>c.listening[q.id]!==undefined&&c.listening[q.id]!==-2);return [level,{total:answered.length,correct:answered.filter(q=>c.listening[q.id]===q.answer).length}];})) as Record<PlacementLevel,{total:number;correct:number}>;
 // Two questions per band are sparse evidence. Require all six foundation items before reporting even a provisional band.
 const listeningReady=['A1','A2','B1'].every(level=>listeningBands[level as PlacementLevel].total===2);
 let listeningLevel:PlacementLevel|null=null;
 if(listeningReady){listeningLevel='A1';for(let i=1;i<PLACEMENT_LEVELS.length;i++){const level=PLACEMENT_LEVELS[i];if(listeningBands[level].total===2&&listeningBands[level].correct===2&&PLACEMENT_LEVELS.slice(0,i).every(l=>listeningBands[l].total===2&&listeningBands[l].correct>=1))listeningLevel=level;}}
 const assessed=PLACEMENT_SPEAKING.flatMap(task=>{const r=c.speaking[task.id];return r?.status==='assessed'?[{task,assessment:r.assessment,band:speakingBand(r.assessment,task.level)}]:[];});
 let speakingLevel:PlacementLevel|null=null,supported=0;
 if(assessed.length>=2){for(let candidate=1;candidate<=5;candidate++){
   const supporting=assessed.filter(a=>a.band>=Math.min(candidate,PLACEMENT_LEVELS.indexOf(a.task.level)+1));
   if(supporting.some(a=>PLACEMENT_LEVELS.indexOf(a.task.level)+1>=candidate)&&supporting.filter(a=>PLACEMENT_LEVELS.indexOf(a.task.level)+1>=Math.max(1,candidate-1)).length>=2)supported=candidate;
  }speakingLevel=studyBand(supported);}
 const levels=[core.level,...(listeningLevel?[listeningLevel]:[]),...(speakingLevel?[speakingLevel]:[])];
 const level=PLACEMENT_LEVELS[Math.min(...levels.map(l=>PLACEMENT_LEVELS.indexOf(l)))];
 const scores:{skill:StudyPriority;band:number;score:number}[]=Object.entries(core.domains).map(([skill,s])=>({skill:skill as PlacementDomain,band:PLACEMENT_LEVELS.indexOf(core.level),score:s.correct/s.total}));
 if(listeningLevel)scores.push({skill:'listening',band:PLACEMENT_LEVELS.indexOf(listeningLevel),score:summary.listening.correct/summary.listening.total});
 if(speakingLevel)scores.push({skill:'speaking',band:PLACEMENT_LEVELS.indexOf(speakingLevel),score:assessed.reduce((s,a)=>s+a.band/(PLACEMENT_LEVELS.indexOf(a.task.level)+1),0)/assessed.length});
 scores.sort((a,b)=>a.band-b.band||a.score-b.score);
 const priority=scores[0].skill,priorities:StudyPriority[]=[priority];
 for(const skill of ['listening','speaking'] as const){const score=scores.find(s=>s.skill===skill);if(score&&!priorities.includes(skill)&&(score.band<PLACEMENT_LEVELS.indexOf(core.level)||score.score<.7))priorities.push(skill);}
 const dimensionMeans=Object.fromEntries(SPEAKING_DIMENSIONS.map(k=>[k,assessed.length?assessed.reduce((s,a)=>s+a.assessment.dimensions[k].score,0)/assessed.length:0])) as Record<SpeakingDimension,number>;
 const speakingFocus=speakingLevel?[...SPEAKING_DIMENSIONS].sort((a,b)=>dimensionMeans[a]-dimensionMeans[b])[0]:undefined;
 const adaptation:StudyAdaptation={baseLevel:level,levels:{grammar:core.level,vocabulary:core.level,reading:core.level,...(listeningLevel?{listening:listeningLevel}:{}),...(speakingLevel?{speaking:speakingLevel}:{}),writing:level},priorities,...(speakingFocus?{speakingFocus}:{})};
 return {level,language:core.level,listening:listeningLevel,speaking:speakingLevel,complete:!!listeningLevel&&!!speakingLevel,mixed:new Set(levels).size>1,priority,adaptation,listeningBands,speakingAssessed:assessed.length,speakingFoundationReview:speakingLevel!==null&&supported===0};
}
export function placementPriority(result:PlacementResult):StudyPriority{return placementProfile(result).priority;}

import { PLACEMENT_LISTENING,PLACEMENT_SPEAKING,SPEAKING_CRITERIA,type SpeakingCriterion } from '@/data/placement/communication';
import { validSpeakingAssessment,type SpeakingAssessment } from './speakingAssessment';
export type SpeakingReview={status:'recorded'|'reviewed';ratings:Partial<Record<SpeakingCriterion,0|1|2>>;recorded:true}|{status:'assessed';recorded:true;assessment:SpeakingAssessment}|{status:'skipped'};
export type CommunicationCheck={listening:Record<string,number>;heard:string[];speaking:Record<string,SpeakingReview>};
export const emptyCommunication=():CommunicationCheck=>({listening:{},heard:[],speaking:{}});
/** Ignore damaged/unknown fields while preserving every valid saved response. -2 means unassessed. */
export function validCommunication(value:unknown):CommunicationCheck{
 const out=emptyCommunication();if(!value||typeof value!=='object')return out;const input=value as CommunicationCheck;
 for(const q of PLACEMENT_LISTENING){const a=input.listening?.[q.id];if(Number.isInteger(a)&&a>=-2&&a<q.options.length)out.listening[q.id]=a;}
 out.heard=Array.isArray(input.heard)?Array.from(new Set(input.heard.filter(id=>PLACEMENT_LISTENING.some(q=>q.id===id)))):[];
 for(const task of PLACEMENT_SPEAKING){const review=input.speaking?.[task.id];if(review?.status==='skipped')out.speaking[task.id]={status:'skipped'};else if(review?.status==='assessed'&&review.recorded===true){const assessment=validSpeakingAssessment(review.assessment,task.id);if(assessment)out.speaking[task.id]={status:'assessed',recorded:true,assessment};}else if((review?.status==='reviewed'||review?.status==='recorded')&&review.recorded===true){const ratings=Object.fromEntries(SPEAKING_CRITERIA.filter(k=>Number.isInteger(review.ratings?.[k])&&[0,1,2].includes(review.ratings[k]!)).map(k=>[k,review.ratings[k]]));out.speaking[task.id]={status:SPEAKING_CRITERIA.every(k=>Object.hasOwn(ratings,k))?'reviewed':'recorded',recorded:true,ratings};}}
 return out;
}
export const listeningComplete=(c:CommunicationCheck)=>PLACEMENT_LISTENING.every(q=>Object.hasOwn(c.listening,q.id));
export const speakingComplete=(c:CommunicationCheck)=>PLACEMENT_SPEAKING.every(q=>c.speaking[q.id]?.status==='assessed'||c.speaking[q.id]?.status==='skipped');
export function communicationSummary(value?:CommunicationCheck){
 const c=validCommunication(value),answered=PLACEMENT_LISTENING.filter(q=>c.listening[q.id]!==undefined&&c.listening[q.id]!==-2),correct=answered.filter(q=>c.listening[q.id]===q.answer).length;
 const reviewed=PLACEMENT_SPEAKING.filter(p=>c.speaking[p.id]?.status==='reviewed');
 return {listening:{correct,total:answered.length,skipped:PLACEMENT_LISTENING.filter(q=>c.listening[q.id]===-2).length,complete:listeningComplete(c)},speaking:{reviewed:reviewed.length,assessed:PLACEMENT_SPEAKING.filter(p=>c.speaking[p.id]?.status==='assessed').length,skipped:PLACEMENT_SPEAKING.filter(p=>c.speaking[p.id]?.status==='skipped').length,complete:speakingComplete(c),confidence:null}};
}

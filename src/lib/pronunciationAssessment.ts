import {SHADOW_LESSONS} from '@/data/shadowing';
export const PRONUNCIATION_CONSENT='englishcamp-openpronounce-v1';
export const PRONUNCIATION_LINES=[
 {id:'introduce',title:'Introductions',text:'Hello, it is nice to meet you. How are you today?'},
 {id:'coffee',title:'At a café',text:'Could I have a small coffee and a glass of water, please?'},
 {id:'directions',title:'Asking for directions',text:'Excuse me, could you tell me how to get to the station?'},
 {id:'appointment',title:'Booking an appointment',text:'I would like to make an appointment for Thursday morning.'},
 {id:'work',title:'At work',text:'Thank you for your help. Shall we discuss the project tomorrow?'},
 {id:'weekend',title:'Making plans',text:'Would you like to go for a walk with us this weekend?'},
] as const;
export type PronunciationReference={kind:'practice';id:string}|{kind:'shadow';lessonId:string;line:number};
export function pronunciationText(reference:PronunciationReference):string|null{
 if(reference?.kind==='practice')return PRONUNCIATION_LINES.find(p=>p.id===reference.id)?.text??null;
 if(reference?.kind==='shadow'&&Number.isInteger(reference.line)&&reference.line>=0)return SHADOW_LESSONS.find(l=>l.id===reference.lessonId)?.lines[reference.line]?.text??null;
 return null;
}
export type PronunciationError={position:number;word:string;expected:string;actual:string;confidence:number;phones:{expected:string;heard:string[];confidence:number}[]};
export type PronunciationResult={version:typeof PRONUNCIATION_CONSENT;score:number;transcript:string;errors:PronunciationError[];audioHash:string};
export function validPronunciationResult(value:unknown,text:string):value is PronunciationResult{
 const v=value as PronunciationResult,words=text.match(new RegExp("[\\p{L}\\p{N}_](?:[\\p{L}\\p{N}_']*[\\p{L}\\p{N}_])?",'gu'))??[];
 return !!v&&v.version===PRONUNCIATION_CONSENT&&Number.isFinite(v.score)&&v.score>=0&&v.score<=100&&typeof v.transcript==='string'&&v.transcript.length<=2000&&/^[a-f0-9]{64}$/.test(v.audioHash)&&Array.isArray(v.errors)&&v.errors.length<=words.length&&v.errors.every(e=>Number.isInteger(e.position)&&e.position>=0&&e.position<words.length&&typeof e.word==='string'&&e.word.toLowerCase()===words[e.position].toLowerCase()&&typeof e.expected==='string'&&e.expected.length<=200&&typeof e.actual==='string'&&e.actual.length<=200&&Number.isFinite(e.confidence)&&e.confidence>=0&&e.confidence<=1&&Array.isArray(e.phones)&&e.phones.length<=60&&e.phones.every(p=>typeof p.expected==='string'&&p.expected.length<=30&&Array.isArray(p.heard)&&p.heard.length<=30&&p.heard.every(h=>typeof h==='string'&&h.length<=30)&&Number.isFinite(p.confidence)&&p.confidence>=0&&p.confidence<=1));
}

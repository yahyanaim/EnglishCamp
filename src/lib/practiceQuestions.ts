export function prefixStem(verb:string,prefix:string){const letters=prefix.replace(/-$/,'');return verb.startsWith(letters)?verb.slice(letters.length):verb;}
export function modalAnswers(item:{answer:string;accepted?:readonly string[]}){return Array.from(new Set([item.answer,...(item.accepted||[])].map(s=>s.trim().toLowerCase().replace(/\s+/g,' '))));}
export function relativeAnswers(item:{blank:string;sentence:string;options:string[]}){
 const candidates=item.blank==='whom'?['whom','who']:item.blank==='which'&&item.options.includes('that')?['which','that']:item.blank==='that'&&item.sentence.startsWith('The dog ')?['that','who']:[item.blank];
 return candidates.filter(word=>item.options.includes(word));
}
import type { VerbConjugation } from '@/data/conjugaise';
import { conjugatedForm } from './verbTenses';
export function verbPuzzleForms(verb:VerbConjugation,tense:'present'|'past'){return [0,1,2,3,4,4].map(index=>conjugatedForm(verb,tense,index));}
export function phrasalParticles(item:{verb:string;particle:string}){return item.verb==='fill in'?['in','out']:[item.particle];}
export function maskPracticeTarget(text:string,target:string){return text.replace(new RegExp('\\b'+target.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\b','gi'),'___');}
export function questionWordAnswers(item:{correct:string;question:string}){return item.correct==='Who'&&/did you (see|give)/.test(item.question)?['Who','Whom']:[item.correct];}

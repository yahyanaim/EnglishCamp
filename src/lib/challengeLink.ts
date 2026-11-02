import type { ChallengeWord } from "@/data/challenge-words";
export type PartnerChallenge={id:string;creator:string;words:ChallengeWord[];createdAt:string};
export function encodeChallenge(challenge:PartnerChallenge){const bytes=new TextEncoder().encode(JSON.stringify(challenge));return btoa(Array.from(bytes,byte=>String.fromCharCode(byte)).join('')).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');}
export function decodeChallenge(value:string):PartnerChallenge|null{try{
 if(!value||value.length>12000)return null;const binary=atob(value.replace(/-/g,'+').replace(/_/g,'/'));let json:string;try{json=new TextDecoder('utf-8',{fatal:true}).decode(Uint8Array.from(binary,char=>char.charCodeAt(0)));}catch{json=binary;}
 const input=JSON.parse(json);if(!input||typeof input.id!=='string'||input.id.length>80||typeof input.creator!=='string'||input.creator.length>80||typeof input.createdAt!=='string'||!Array.isArray(input.words)||input.words.length<1||input.words.length>20)return null;
 if(!input.words.every((w:ChallengeWord)=>w&&typeof w.de==='string'&&w.de.length>0&&w.de.length<150&&typeof w.en==='string'&&w.en.length>0&&w.en.length<150&&!/^(der|die|das)\s/i.test(w.de)&&(!w.alternatives||(Array.isArray(w.alternatives)&&w.alternatives.length<=5&&w.alternatives.every(a=>typeof a==='string'&&a.length<150)))))return null;
 return input as PartnerChallenge;
 }catch{return null;}}
const normal=(text:string)=>text.normalize('NFKC').trim().toLowerCase().replace(/[\u064b-\u065f\u0640]/g,'').replace(/[أإآ]/g,'ا').replace(/\s+/g,' ').replace(/^ال/,'');
export function matchesChallengeMeaning(word:ChallengeWord,answer:string){return [word.en,...word.alternatives||[]].some(value=>normal(value)===normal(answer));}

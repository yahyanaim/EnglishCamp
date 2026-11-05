import { IDIOMS, type IdiomEntry } from '@/data/redewendungen';
export function idiomRounds(random:()=>number=Math.random) {
 const shuffle=<T,>(a:T[])=>{for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
 const meanings=new Set<string>(),ids=new Set<string>();const unique=shuffle([...IDIOMS]).filter(p=>{const key=p.meaning.trim().toLowerCase();if(!p.idiom.trim()||!key||meanings.has(key)||ids.has(p.idiom))return false;meanings.add(key);ids.add(p.idiom);return true;});
 return Array.from({length:3},(_,i)=>{const pairs=unique.slice(i*5,i*5+5);return {pairs,left:shuffle([...pairs]),right:shuffle([...pairs])};}).filter(r=>r.pairs.length===5);
}
export const idiomMatches=(pairs:IdiomEntry[],left:string,right:string)=>left===right&&pairs.some(p=>p.idiom===left);

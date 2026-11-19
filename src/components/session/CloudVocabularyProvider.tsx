"use client";
import {createContext,useContext,useEffect,useRef,useState,type ReactNode} from 'react';
import {useSessionProfile} from './SessionProvider';
import {useVocabulary} from '@/store/useVocabulary';
import {cloudLearnerPrefix} from '@/lib/learnerStorage';
import {readSessionProfile} from '@/lib/sessionProfile';
import {isRestoringLearner,restoringLearner} from '@/lib/learnerStores';
import {cleanVocabulary,mergeVocabulary,sameVocabulary,type CloudVocabulary} from '@/lib/cloudVocabulary';

type Status='local'|'syncing'|'saved'|'offline';
type VocabularyContext={status:Status;message:string;sync:()=>Promise<void>};
const Context=createContext<VocabularyContext|null>(null);
const key=(id:string)=>cloudLearnerPrefix(id)+'vocabulary-sync-v1';
/** `dirty` survives reloads so words saved offline still upload later. A device's first sync always uploads. */
function load(id:string){try{const value=JSON.parse(localStorage.getItem(key(id))||'null');return{dirty:value?.dirty!==false,change:Number.isSafeInteger(value?.change)?value.change as number:0};}catch{return{dirty:true,change:0};}}
function save(id:string,data:{dirty:boolean;change:number}){try{localStorage.setItem(key(id),JSON.stringify(data));}catch{/* Storage full: the next change retries. */}}
const local=():CloudVocabulary=>{const s=useVocabulary.getState();return cleanVocabulary({words:s.words,removed:s.removed});};

export function CloudVocabularyProvider({children}:{children:ReactNode}){
 const {profile,ready}=useSessionProfile(),id=profile?.cloudId;
 const [status,setStatus]=useState<Status>('local'),[message,setMessage]=useState('');
 const applying=useRef(false),flight=useRef<{id:string;work:Promise<void>}|null>(null),timer=useRef<ReturnType<typeof setTimeout>>();
 const same=(selected:string)=>readSessionProfile(sessionStorage)?.cloudId===selected;
 function apply(merged:CloudVocabulary){
  const words={...merged.words} as ReturnType<typeof useVocabulary.getState>['words'];
  applying.current=true;try{restoringLearner(()=>useVocabulary.setState({words,removed:merged.removed}));}finally{applying.current=false;}
 }
 async function sync(){
  if(!id||!same(id))return;if(flight.current?.id===id)return flight.current.work;const selected=id;
  const work=(async()=>{setStatus('syncing');try{
   for(let round=0;round<3&&same(selected);round++){
    const before=load(selected),mine=local(),controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);let response:Response;
    try{response=await fetch('/api/learners/vocabulary',{method:before.dirty?'PUT':'GET',credentials:'same-origin',cache:'no-store',signal:controller.signal,headers:{'X-EnglishCamp-Learner':selected,...(before.dirty?{'Content-Type':'application/json'}:{})},...(before.dirty?{body:JSON.stringify({vocabulary:mine})}:{})});}finally{clearTimeout(timeout);}
    const result=await response.json().catch(()=>({}));
    if(!response.ok)throw new Error(response.status===401||response.status===409&&result.code!=='retry_sync'?'Reconnect your profile in Your learning session to sync your word bank.':result.error||'Your word bank could not sync. Your words are kept on this device.');
    if(!same(selected))return;
    const after=load(selected),merged=mergeVocabulary(local(),result.vocabulary);apply(merged);
    // Upload again only if this device still has something the server lacks.
    const needsUpload=!sameVocabulary(merged,cleanVocabulary(result.vocabulary))||after.change!==before.change;
    save(selected,{dirty:needsUpload,change:after.change});if(!needsUpload)break;
   }
   if(same(selected)){setStatus('saved');setMessage('Your word bank is saved online.');}
  }catch(problem){if(same(selected)){setStatus('offline');setMessage(problem instanceof Error&&problem.name!=='AbortError'?problem.message:'Your word bank could not sync. Your words are kept on this device.');}}
  finally{if(flight.current?.id===selected)flight.current=null;}})();
  flight.current={id:selected,work};return work;
 }
 useEffect(()=>{if(!ready||!id){setStatus('local');setMessage('');return;}const selected=id;let disposed=false;
  const unsubscribe=useVocabulary.subscribe((next,old)=>{if(applying.current||isRestoringLearner()||!same(selected))return;if(next.words===old.words&&next.removed===old.removed)return;const data=load(selected);save(selected,{dirty:true,change:data.change+1});setStatus('syncing');if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>{if(!disposed)void sync();},1500);});
  const refresh=()=>{if(!disposed&&document.visibilityState==='visible'&&navigator.onLine)void sync();};
  // Wait for this learner's saved words to load, so the first sync never uploads an empty bank in their place.
  const start=()=>{if(!disposed)void sync();};const stopHydration=useVocabulary.persist.hasHydrated()?(start(),()=>{}):useVocabulary.persist.onFinishHydration(start);window.addEventListener('online',refresh);window.addEventListener('focus',refresh);document.addEventListener('visibilitychange',refresh);const interval=setInterval(refresh,60000);
  return()=>{disposed=true;unsubscribe();stopHydration();if(timer.current)clearTimeout(timer.current);clearInterval(interval);window.removeEventListener('online',refresh);window.removeEventListener('focus',refresh);document.removeEventListener('visibilitychange',refresh);};
 },[id,ready]);
 return <Context.Provider value={{status,message,sync}}>{children}</Context.Provider>;
}
export function useCloudVocabulary():VocabularyContext{return useContext(Context)??{status:'local',message:'',sync:async()=>{}};}

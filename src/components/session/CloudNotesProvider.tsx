"use client";
import {createContext,useContext,useEffect,useRef,useState,type ReactNode} from 'react';
import {useSessionProfile} from './SessionProvider';
import {useNotes} from '@/store/useNotes';
import {cloudLearnerPrefix} from '@/lib/learnerStorage';
import {readSessionProfile} from '@/lib/sessionProfile';
import {isRestoringLearner} from '@/lib/learnerStores';
import {validNoteOperation,type CloudNote,type NoteOperation,type NoteConflict} from '@/lib/cloudNotes';
type Metadata={initialized:boolean;revisions:Record<string,number>;pending:Record<string,NoteOperation>;conflicts:Record<string,NoteConflict>;localOnly:Record<string,boolean>};
type NotesContext={status:'local'|'syncing'|'saved'|'offline'|'conflict';message:string;conflicts:Record<string,NoteConflict>;sync:()=>Promise<void>;resolve:(lessonId:string,choice:'local'|'remote')=>void;version:(lessonId:string)=>number;saveNote:(lessonId:string,text:string,baseRevision?:number)=>void};
const Context=createContext<NotesContext|null>(null);
const key=(id:string)=>cloudLearnerPrefix(id)+'notes-sync-v1';
function load(id:string):Metadata{try{const value=JSON.parse(localStorage.getItem(key(id))||'null');return{initialized:value?.initialized===true,revisions:value?.revisions??{},pending:Object.fromEntries(Object.entries(value?.pending??{}).filter(([,v])=>validNoteOperation(v))) as Record<string,NoteOperation>,conflicts:value?.conflicts??{},localOnly:value?.localOnly??{}};}catch{return{initialized:false,revisions:{},pending:{},conflicts:{},localOnly:{}};}}
function save(id:string,data:Metadata){localStorage.setItem(key(id),JSON.stringify(data));}
export function CloudNotesProvider({children}:{children:ReactNode}){
 const {profile,ready}=useSessionProfile(),id=profile?.cloudId;
 const [status,setStatus]=useState<NotesContext['status']>('local'),[message,setMessage]=useState(''),[conflicts,setConflicts]=useState<Record<string,NoteConflict>>({});
 const applying=useRef(false),flight=useRef<{id:string;work:Promise<void>}|null>(null),timer=useRef<ReturnType<typeof setTimeout>>();
 const same=(selected:string)=>readSessionProfile(sessionStorage)?.cloudId===selected;
 async function sync(){
  if(!id||!same(id))return;if(flight.current?.id===id)return flight.current.work;
  const selected=id;
  const work=(async()=>{setStatus('syncing');try{let more=true;while(more&&same(selected)){
   const previous=load(selected),batch=Object.values(previous.pending).filter(op=>!previous.conflicts[op.lessonId]).slice(0,4),controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
   let response:Response;try{response=await fetch('/api/learners/notes',{method:batch.length?'PUT':'GET',credentials:'same-origin',cache:'no-store',signal:controller.signal,headers:{'X-EnglishCamp-Learner':selected,...(batch.length?{'Content-Type':'application/json'}:{})},...(batch.length?{body:JSON.stringify({operations:batch})}:{})});}finally{clearTimeout(timeout);}
   const result=await response.json();if(!response.ok)throw new Error(response.status===401||response.status===409?'Reconnect your profile in Your learning session to sync notes.':result.error||'Notes could not sync. Your local copy is kept.');if(!same(selected))return;
   const current=load(selected),ack=new Set<string>(result.acknowledged??[]);
   for(const sent of batch){const pending=current.pending[sent.lessonId],remote=result.notes?.[sent.lessonId];if(ack.has(sent.id)&&pending&&pending.id!==sent.id&&pending.baseRevision===sent.baseRevision&&remote?.text===sent.text)pending.baseRevision=remote.revision;}
   for(const [lessonId,op] of Object.entries(current.pending))if(ack.has(op.id)){delete current.pending[lessonId];delete current.conflicts[lessonId];}
   for(const [lessonId,conflict] of Object.entries(result.conflicts??{}) as [string,NoteConflict][])if(current.pending[lessonId]?.id===conflict.operationId)current.conflicts[lessonId]=conflict;
   const next={...useNotes.getState().notes};for(const [lessonId,note] of Object.entries(result.notes??{}) as [string,CloudNote][]){current.revisions[lessonId]=note.revision;if(!current.pending[lessonId]&&!current.localOnly[lessonId])next[lessonId]=note.text;}
   save(selected,current);applying.current=true;try{useNotes.setState({notes:next});}finally{applying.current=false;}
   setConflicts(current.conflicts);more=Object.values(current.pending).some(op=>!current.conflicts[op.lessonId]);
  }if(same(selected)){const data=load(selected),conflict=Object.keys(data.conflicts).length>0,localOnly=Object.keys(data.localOnly).length>0;setStatus(conflict?'conflict':localOnly?'offline':'saved');setMessage(conflict?'Another device edited a note. Review both copies before choosing which to keep.':localOnly?'A note exceeds the sync limit or has an unsupported label. Its full local copy is kept; edit it before syncing.':'Your lesson notes are saved online.');}
  }catch(problem){if(same(selected)){setStatus('offline');setMessage(problem instanceof Error?problem.message:'Notes could not sync. Your local copy is kept.');}}finally{if(flight.current?.id===selected)flight.current=null;}})();flight.current={id:selected,work};return work;
 }
 function resolve(lessonId:string,choice:'local'|'remote'){
  if(!id||!same(id))return;const data=load(id),conflict=data.conflicts[lessonId];if(!conflict)return;
  data.revisions[lessonId]=conflict.revision;
  if(choice==='local')data.pending[lessonId]={id:crypto.randomUUID(),lessonId,text:useNotes.getState().notes[lessonId]??'',baseRevision:conflict.revision};
  else{delete data.pending[lessonId];applying.current=true;try{useNotes.getState().setNote(lessonId,conflict.text);}finally{applying.current=false;}}
  delete data.conflicts[lessonId];save(id,data);setConflicts({...data.conflicts});void sync();
 }
 function saveNote(lessonId:string,text:string,baseRevision?:number){
  if(!id||!same(id)){useNotes.getState().setNote(lessonId,text);return;}
  // Keep the revision from when typing began, even if a remote refresh arrived mid-draft.
  const data=load(id),op={id:crypto.randomUUID(),lessonId,text,baseRevision:baseRevision??data.revisions[lessonId]??0};
  applying.current=true;try{useNotes.getState().setNote(lessonId,text);}finally{applying.current=false;}
  if(validNoteOperation(op)){data.pending[lessonId]=op;delete data.localOnly[lessonId];}else{data.localOnly[lessonId]=true;delete data.pending[lessonId];}
  save(id,data);setStatus('syncing');if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>void sync(),1500);
 }
 useEffect(()=>{if(!ready||!id){setStatus('local');setMessage('');setConflicts({});return;}const selected=id;let disposed=false;
  function enqueue(next:Record<string,string>,old:Record<string,string>){if(applying.current||isRestoringLearner()||!same(selected))return;try{const data=load(selected);for(const [lessonId,text]of Object.entries(next))if(text!==old[lessonId]){const op={id:crypto.randomUUID(),lessonId,text,baseRevision:data.revisions[lessonId]??0};if(validNoteOperation(op)){data.pending[lessonId]=op;delete data.localOnly[lessonId];}else{data.localOnly[lessonId]=true;delete data.pending[lessonId];}}save(selected,data);setStatus('syncing');if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>{if(!disposed)void sync();},1500);}catch(problem){setStatus('offline');setMessage(problem instanceof Error?problem.message:'Notes stay on this device until storage is available.');}}
  try{const data=load(selected);if(!data.initialized){enqueue(useNotes.getState().notes,{});const initialized=load(selected);initialized.initialized=true;save(selected,initialized);}}catch{setStatus('offline');setMessage('Browser storage is full or unavailable. Keep a copy of your notes before clearing storage.');return;}
  setConflicts(load(selected).conflicts);void sync();
  const unsubscribe=useNotes.subscribe((next,old)=>{if(next.notes!==old.notes)enqueue(next.notes,old.notes);});const refresh=()=>{if(!disposed&&document.visibilityState==='visible'&&navigator.onLine)void sync();};window.addEventListener('online',refresh);window.addEventListener('focus',refresh);document.addEventListener('visibilitychange',refresh);const interval=setInterval(refresh,60000);
  return()=>{disposed=true;unsubscribe();if(timer.current)clearTimeout(timer.current);clearInterval(interval);window.removeEventListener('online',refresh);window.removeEventListener('focus',refresh);document.removeEventListener('visibilitychange',refresh);};
 },[id,ready]);
 return <Context.Provider value={{status,message,conflicts,sync,resolve,version:lessonId=>id?load(id).revisions[lessonId]??0:0,saveNote}}>{children}</Context.Provider>;
}
export function useCloudNotes():NotesContext{return useContext(Context)??{status:'local',message:'',conflicts:{},sync:async()=>{},resolve:()=>{},version:()=>0,saveNote:(lessonId,text)=>useNotes.getState().setNote(lessonId,text)};}

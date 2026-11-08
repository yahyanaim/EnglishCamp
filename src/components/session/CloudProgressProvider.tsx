"use client";
import {createContext,useContext,useEffect,useRef,useState,type ReactNode} from 'react';
import {useSessionProfile} from './SessionProvider';
import {useProgress} from '@/store/useProgress';
import {useAchievements} from '@/store/useAchievements';
import {useDailyChallenge} from '@/store/useDailyChallenge';
import {cleanProgress,cleanBadges,cleanEvents,eventKey,mergeProgress,mergeBadges,type CloudAccount,type CloudSnapshot} from '@/lib/cloudProgress';
import {readSessionProfile} from '@/lib/sessionProfile';
import {cloudLearnerPrefix} from '@/lib/learnerStorage';
import {isRestoringLearner,restoringLearner} from '@/lib/learnerStores';

type Status='connecting'|'local'|'syncing'|'saved'|'offline'|'reconnect'|'unavailable';
type Metadata={observed:string[];pending:ReturnType<typeof cleanEvents>;dirty:boolean;change:number};
type CloudContext={status:Status;message:string;busy:boolean;recoveryCode:string|null;clearRecoveryCode:()=>void;create:(name:string)=>Promise<boolean>;restore:(name:string,code:string)=>Promise<boolean>;sync:()=>Promise<boolean>;disconnect:()=>Promise<boolean>;remove:()=>Promise<boolean>};
const Context=createContext<CloudContext|null>(null);
const metadataKey=(id:string)=>cloudLearnerPrefix(id)+'englishcamp-cloud-sync-v1';
function metadata(id:string):Metadata{try{const data=JSON.parse(localStorage.getItem(metadataKey(id))||'null');return{observed:Array.isArray(data?.observed)?data.observed.filter((s:unknown)=>typeof s==='string').slice(-2000):[],pending:cleanEvents(data?.pending,Array.isArray(data?.pending)?data.pending.length:0),dirty:data?.dirty===true,change:Number.isSafeInteger(data?.change)?data.change:0};}catch{return{observed:[],pending:[],dirty:false,change:0};}}
function saveMetadata(id:string,data:Metadata){localStorage.setItem(metadataKey(id),JSON.stringify(data));}
function currentProgress(){const daily=useDailyChallenge.getState();return cleanProgress({...useProgress.getState(),dailySummary:daily.completed&&daily.lastDate?{day:daily.lastDate,completed:true,score:daily.score,total:daily.total,xpEarned:daily.xpEarned}:undefined});}
async function api(action:string,method='GET',body?:object,id?:string){const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);try{const response=await fetch('/api/learners/'+action,{method,signal:controller.signal,credentials:'same-origin',cache:'no-store',headers:{...(body?{'Content-Type':'application/json'}:{}),...(id?{'X-EnglishCamp-Learner':id}:{})},...(body?{body:JSON.stringify(body)}:{})});const data=await response.json().catch(()=>({error:'Online progress is unavailable.'}));if(!response.ok)throw Object.assign(new Error(data.error||'Could not sync. Your local progress is kept.'),{status:response.status,code:data.code});return data;}catch(error){if((error as {status?:number}).status)throw error;throw new Error('Could not reach online storage. Your progress is kept on this device; reconnect to sync.');}finally{clearTimeout(timeout);}}

export function CloudProgressProvider({children}:{children:ReactNode}){
 const session=useSessionProfile(),sessionRef=useRef(session);sessionRef.current=session;
 const [status,setStatus]=useState<Status>('local'),[message,setMessage]=useState(''),[busy,setBusy]=useState(false),[recoveryCode,setRecoveryCode]=useState<string|null>(null);
 const account=useRef<CloudAccount|null>(null),applying=useRef(false),operation=useRef(false),flight=useRef<Promise<boolean>|null>(null),timer=useRef<ReturnType<typeof setTimeout>>();
 const currentId=()=>readSessionProfile(sessionStorage)?.cloudId;
 function fail(problem:unknown){const error=problem as Error&{status?:number;code?:string};if(error.status===401||error.code==='learner_changed'){account.current=null;setStatus('reconnect');}else setStatus(error.status===503?'unavailable':'offline');setMessage(error.message||'You are offline. Your progress is saved on this device and will sync when you reconnect.');}
 function capture(){if(applying.current||isRestoringLearner())return;const id=currentId();if(!id)return;const data=metadata(id),events=cleanEvents(useProgress.getState().events),observed=new Set(data.observed),pending=new Map(data.pending.map(e=>[eventKey(e),e]));for(const event of events)if(!observed.has(eventKey(event)))pending.set(eventKey(event),event);saveMetadata(id,{observed:events.map(eventKey),pending:Array.from(pending.values()),dirty:true,change:data.change+1});if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>{void sync();},1500);}
 function apply(snapshot:CloudSnapshot,id:string,replace=false){
  if(currentId()!==id)return;applying.current=true;
  try{const data=metadata(id),raw=useProgress.getState(),merged=replace?snapshot.progress:mergeProgress(raw,snapshot.progress);
   // Keep answers and review detail local; the server stores score summaries only.
   const quizResults={...merged.quizResults};for(const band of Object.keys(quizResults) as (keyof typeof quizResults)[])quizResults[band]=quizResults[band].map(result=>raw.quizResults[band]?.find(q=>q.takenAt===result.takenAt)??result);
   if(data.pending.length)merged.xp=Math.max(raw.xp,snapshot.progress.xp);else merged.xp=snapshot.progress.xp;
   const attempts=merged.activityAttempts.map(a=>raw.activityAttempts.find(old=>old.moduleId===a.moduleId&&old.taskId===a.taskId&&old.at===a.at)??a);
   restoringLearner(()=>{useProgress.setState({...merged,quizResults,activityAttempts:attempts});useAchievements.setState({unlocked:mergeBadges(useAchievements.getState().unlocked,snapshot.badges),newlyUnlocked:[]});const daily=snapshot.progress.dailySummary,local=useDailyChallenge.getState();if(daily&&(!local.lastDate||daily.day>=local.lastDate))useDailyChallenge.setState({completed:true,lastDate:daily.day,score:daily.score,total:daily.total,xpEarned:daily.xpEarned,results:[],attempt:null});});
   saveMetadata(id,{...data,observed:merged.events.map(eventKey)});
  }finally{applying.current=false;}
 }
 function sync():Promise<boolean>{
  if(flight.current)return flight.current;const selected=account.current;if(!selected||currentId()!==selected.id||operation.current)return Promise.resolve(false);
  const work=(async()=>{setStatus('syncing');setMessage('');try{
   let remaining=true;while(remaining){if(currentId()!==selected.id)return false;const data=metadata(selected.id),batch=data.pending.slice(0,100);
    const result=data.dirty||batch.length?await api('progress','PUT',{progress:currentProgress(),badges:cleanBadges(useAchievements.getState().unlocked),pendingEvents:batch},selected.id):await api('progress','GET',undefined,selected.id);
    if(currentId()!==selected.id)return false;const latest=metadata(selected.id),acknowledged=new Set<string>(result.acknowledged??[]);const pending=latest.pending.filter(e=>!acknowledged.has(eventKey(e)));
    const changed=latest.change!==data.change;saveMetadata(selected.id,{...latest,pending,dirty:changed});apply(result.snapshot,selected.id);remaining=pending.length>0||changed;
   }setStatus('saved');setMessage('Your progress and badges are up to date.');return true;
  }catch(error){fail(error);return false;}finally{flight.current=null;}})();flight.current=work;return work;
 }
 async function connect(remote:CloudAccount,snapshot:CloudSnapshot,link=false){
  if(!sessionRef.current.activateCloud(remote,link))return false;account.current=remote;const data=metadata(remote.id);
  if(!data.observed.length&&!data.pending.length)saveMetadata(remote.id,{observed:cleanEvents(useProgress.getState().events).map(eventKey),pending:[],dirty:false,change:0});
  apply(snapshot,remote.id,!link&&!data.dirty&&!data.pending.length);setStatus('saved');setMessage('Your progress and badges are up to date.');return true;
 }
 async function create(name:string){if(operation.current||!sessionRef.current.canSwitch())return false;setBusy(true);operation.current=true;setMessage('');try{
   if(!sessionRef.current.profile&&!sessionRef.current.signIn(name))return false;sessionRef.current.closePlacementOffer();
   const profile=readSessionProfile(sessionStorage);if(!profile)throw new Error('Start a named session first.');if(profile.cloudId)throw new Error('This profile already has online storage. Use its recovery code to reconnect.');
   const result=await api('create','POST',{name:profile.name,fruit:profile.fruit,progress:currentProgress(),badges:cleanBadges(useAchievements.getState().unlocked)});
   setRecoveryCode(result.recoveryCode);if(!await connect(result.account,result.snapshot,true))throw new Error('Online profile created, but this device could not open it. Keep the recovery code.');return true;
  }catch(error){fail(error);return false;}finally{operation.current=false;setBusy(false);}}
 async function restore(name:string,code:string){if(operation.current||!sessionRef.current.canSwitch())return false;if(account.current&&!await sync())return false;setBusy(true);operation.current=true;setMessage('');try{const result=await api('restore','POST',{name,code});const connected=await connect(result.account,result.snapshot);return connected;}catch(error){fail(error);return false;}finally{operation.current=false;setBusy(false);if(account.current)void sync();}}
 async function disconnect(){if(!sessionRef.current.canSwitch())return false;const selected=account.current;if(selected){if(!await sync())return false;try{await api('logout','POST',{},selected.id);}catch(error){fail(error);return false;}}account.current=null;setStatus('local');setMessage('');setRecoveryCode(null);return true;}
 async function remove(){if(!sessionRef.current.canSwitch())return false;const selected=account.current;if(!selected){setMessage('Reconnect with your recovery code before deleting an online profile.');return false;}try{if(flight.current)await flight.current;await api('profile','DELETE',{confirm:'delete'},selected.id);account.current=null;setRecoveryCode(null);setStatus('local');setMessage('');return true;}catch(error){fail(error);return false;}}
 useEffect(()=>{if(!session.ready)return;let cancelled=false;void(async()=>{try{const result=await api('session');if(cancelled||operation.current)return;const active=readSessionProfile(sessionStorage);if(result.account&&(!active||active.cloudId===result.account.id)){const data=await api('progress','GET',undefined,result.account.id);if(cancelled)return;await connect(data.account,data.snapshot);void sync();}else if(active?.cloudId){setStatus('reconnect');setMessage('Enter your recovery code to reconnect. Your downloaded progress is kept on this device.');}}catch(error){if(!cancelled&&readSessionProfile(sessionStorage)?.cloudId)fail(error);}})();return()=>{cancelled=true;};},[session.ready]);
 useEffect(()=>{if(!session.ready)return;const unsubscribers=[useProgress.subscribe(capture),useDailyChallenge.subscribe((next,old)=>{if(next.completed!==old.completed||next.lastDate!==old.lastDate)capture();}),useAchievements.subscribe((next,old)=>{if(next.unlocked!==old.unlocked)capture();})];const refresh=()=>{if(document.visibilityState==='visible'&&navigator.onLine)void sync();};window.addEventListener('online',refresh);window.addEventListener('focus',refresh);document.addEventListener('visibilitychange',refresh);const interval=setInterval(refresh,60000);return()=>{unsubscribers.forEach(fn=>fn());window.removeEventListener('online',refresh);window.removeEventListener('focus',refresh);document.removeEventListener('visibilitychange',refresh);clearInterval(interval);if(timer.current)clearTimeout(timer.current);};},[session.ready]);
 useEffect(()=>{if(!session.profile?.cloudId){account.current=null;setStatus('local');}else if(account.current?.id!==session.profile.cloudId)setStatus('reconnect');},[session.profile?.cloudId]);
 return <Context.Provider value={{status,message,busy,recoveryCode,clearRecoveryCode:()=>{setRecoveryCode(null);sessionRef.current.offerPlacement();},create,restore,sync,disconnect,remove}}>{children}</Context.Provider>;
}
export function useCloudProgress(){const value=useContext(Context);if(!value)throw new Error('CloudProgressProvider is required.');return value;}

"use client";
import {useEffect,useState} from 'react';
import {PageWrapper} from '@/components/layout/PageWrapper';
import {PageBanner} from '@/components/ui/PageBanner';
import {BackButton} from '@/components/ui/BackButton';
import {Card} from '@/components/ui/shadcn/card';
import {Button} from '@/components/ui/shadcn/button';
import {BrandMark} from '@/components/brand/BrandMark';
import {FruitAvatar} from '@/components/session/FruitAvatar';
import {useCloudProgress} from '@/components/session/CloudProgressProvider';
import {useCloudNotes} from '@/components/session/CloudNotesProvider';
import {useSessionProfile} from '@/components/session/SessionProvider';
import {rememberDeviceLink,clearDeviceLink} from '@/lib/deviceLink';
import {FRUITS} from '@/lib/sessionProfile';
type Preview={name:string;fruit:typeof FRUITS[number];expiresAt:number};
export default function ConnectDevice(){
 const cloud=useCloudProgress(),notes=useCloudNotes(),session=useSessionProfile();
 const [token,setToken]=useState(''),[preview,setPreview]=useState<Preview|null>(null),[loading,setLoading]=useState(true),[error,setError]=useState(''),[busy,setBusy]=useState(false);
 useEffect(()=>{
  let disposed=false,sequence=0,active:AbortController|null=null,timer:ReturnType<typeof setTimeout>|undefined;
  function load(){
   const current=++sequence;active?.abort();if(timer)clearTimeout(timer);
   const selected=rememberDeviceLink(window.location,window.history);setToken(selected);setPreview(null);setError('');setLoading(true);
   if(!selected){setError('Scan a new QR code from Your learning session on your other device.');setLoading(false);return;}
   const controller=new AbortController();active=controller;const timeout=setTimeout(()=>controller.abort(),15000);timer=timeout;
   fetch('/api/learners/device-link/preview',{method:'POST',signal:controller.signal,headers:{'Content-Type':'application/json'},body:JSON.stringify({token:selected})})
    .then(async r=>{const data=await r.json();if(!r.ok)throw new Error(data.error||'This link is unavailable.');if(!disposed&&current===sequence)setPreview(data);})
    .catch(problem=>{if(!disposed&&current===sequence)setError(controller.signal.aborted?'The connection check timed out. Rescan the QR code to try again.':problem instanceof Error?problem.message:'Could not check this QR code.');})
    .finally(()=>{clearTimeout(timeout);if(!disposed&&current===sequence)setLoading(false);});
  }
  load();window.addEventListener('hashchange',load);
  return()=>{disposed=true;sequence++;active?.abort();if(timer)clearTimeout(timer);window.removeEventListener('hashchange',load);};
 },[]);
 async function connect(){if(!preview||!token||busy)return;setBusy(true);setError('');try{await notes.sync();if(await cloud.connectDevice(token)){clearDeviceLink();window.location.replace('/dashboard');}else setError('The device could not connect. Create a new QR code on your other device and try again. Your existing records are kept.');}finally{setBusy(false);}}
 return <PageWrapper back={<nav className="camp-page-back" aria-label="Return navigation"><BackButton href="/">Back to home</BackButton></nav>}><PageBanner><h1>Connect your learning profile</h1><p>Continue with your saved progress, badges and lesson notes.</p></PageBanner><Card className="camp-device-connect"><header><BrandMark size={36}/><div><h2>Continue on this device</h2><p>No new account or email needed.</p></div></header>{loading?<p role="status">Checking your private QR code…</p>:preview?<><div className="camp-device-identity"><FruitAvatar fruit={preview.fruit} size={48}/><div><small>Learning profile</small><strong dir="auto">{preview.name}</strong></div></div><p>Only connect if this is your profile. Anyone with the QR code can use it before it expires.</p>{session.profile&&<p>Your current profile <strong dir="auto">{session.profile.name}</strong> stays saved. Connecting switches this device to the profile shown above.</p>}<Button disabled={busy||cloud.busy||!session.ready} onClick={connect}>{busy?'Connecting your profile…':'Connect this device'}</Button></>:null}{error&&<p role="alert" className="camp-device-error">{error}</p>}<p className="camp-device-fine">The code works once, for five minutes. Saved online changes keep syncing after connection; unsynced local work stays on its original device.</p></Card></PageWrapper>;
}

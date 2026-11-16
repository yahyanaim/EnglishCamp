"use client";
import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {InvitationRequestForm} from '@/components/session/InvitationRequestForm';
import {EntryHeader} from '@/components/session/EntryHeader';
import { BrandMark } from '@/components/brand/BrandMark';
import {LearningArt} from '@/components/brand/LearningArt';
import {AdminIcon} from '@/components/admin/AdminIcon';
import { Card } from '@/components/ui/shadcn/card';
import { Button } from '@/components/ui/shadcn/button';
import { Input } from '@/components/ui/shadcn/input';
import { useCloudProgress } from '@/components/session/CloudProgressProvider';
import { useSessionProfile } from '@/components/session/SessionProvider';

function destination() {
  try { const value = new URL(window.location.href).searchParams.get('next') || '/dashboard', url = new URL(value, window.location.origin);
    return url.origin === window.location.origin && !['/invite','/admin/invitations'].includes(url.pathname) ? url.pathname + url.search + url.hash : '/dashboard';
  } catch { return '/dashboard'; }
}
export default function InvitePage() {
  const router=useRouter();
  const[email,setEmail]=useState(''),[requestOpen,setRequestOpen]=useState(false);
  useEffect(()=>{const params=new URLSearchParams(location.hash.slice(1));if(params.get('invite')){setCode((params.get('invite')||'').slice(0,80));setEmail((params.get('email')||'').slice(0,254));setName((params.get('name')||'').slice(0,40));history.replaceState(null,'',location.pathname+location.search);}},[]);
  const cloud = useCloudProgress(), session = useSessionProfile();
  const [mode, setMode] = useState<'invite'|'restore'>('invite'), [name, setName] = useState(''), [code, setCode] = useState(''), [granted, setGranted] = useState(false),[visible,setVisible]=useState(false),[failed,setFailed]=useState(false),[dismissedMessage,setDismissedMessage]=useState('');
  useEffect(() => { document.title = 'Join EnglishCamp'; void fetch('/api/access/session', {cache:'no-store'}).then(r=>r.json()).then(data=>setGranted(data.granted===true)).catch(()=>{}); }, []);
  useEffect(() => { if(session.profile?.cloudId&&!cloud.recoveryCode){setMode('restore');setName(session.profile.name);} }, [session.profile?.cloudId,cloud.recoveryCode]);
  const hasError=!!cloud.message&&!cloud.busy&&['offline','unavailable','reconnect'].includes(cloud.status)&&cloud.message!==dismissedMessage;
  const savedLocalName = !session.profile?.cloudId ? session.profile?.name : undefined;
  async function submit(event: FormEvent) {
    event.preventDefault();setFailed(false);setDismissedMessage('');if(mode==='restore'){if(await cloud.restore(name,code.trim()))window.location.replace(destination());else setFailed(true);}
    else if(!await cloud.create(savedLocalName||name,code.trim(),email.trim()))setFailed(true);
  }
  function downloadRecovery() {
    const blob = new Blob([`EnglishCamp recovery details\nName: ${session.profile?.name || name}\nRecovery code: ${cloud.recoveryCode}\nSign in at https://englishcamp.yahyanaim2001.workers.dev/invite\nKeep this file private. Anyone with these details can open your learning profile.\n`],{type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob), link = document.createElement('a'); link.href=url;link.download='englishcamp-recovery.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  return <div className="camp-entry-auth camp-learner-entry"><EntryHeader/>
    <main className="camp-auth-stage"><Card className="camp-auth-card camp-learner-auth-card">
      <header className="camp-session-dialog-heading"><BrandMark size={36}/><div><h1>{cloud.recoveryCode?'Your learning starts here':granted&&session.profile?.cloudId?'Welcome back':'Make yourself at home'}</h1><p>{cloud.recoveryCode?'One last step to keep your progress safe.':'Your name, your progress, your space to learn.'}</p></div></header>
      {cloud.recoveryCode?<section className="camp-session-form camp-recovery-step"><h2>Keep your recovery code</h2><p>Use your name and this private code to return on another device. Your invitation has been accepted.</p><div className="camp-entry-saved-name"><LearningArt name="document" size={20}/><strong dir="auto">{session.profile?.name}</strong></div><code className="camp-access-code" dir="ltr">{cloud.recoveryCode}</code><Button variant="outline" onClick={downloadRecovery}>Download recovery details</Button><Button onClick={()=>{cloud.clearRecoveryCode();router.replace(destination());}}>I saved my code · continue<AdminIcon name="arrow" size={14}/></Button><small>Save the code privately. It will not be shown again.</small></section>
      :granted&&session.profile?.cloudId?<section className="camp-session-form"><h2 dir="auto">Welcome back, {session.profile.name}</h2><p>Your progress and badges are ready.</p><Button onClick={()=>window.location.replace(destination())}>Continue learning<AdminIcon name="arrow" size={14}/></Button></section>
      :requestOpen?<InvitationRequestForm onBack={()=>setRequestOpen(false)}/>:<><div className="camp-invitation-request-link"><AdminIcon name="mail" size={20}/><div><strong>New to EnglishCamp?</strong><button disabled={cloud.busy} onClick={()=>setRequestOpen(true)}>Request access with your name and email <AdminIcon name="arrow" size={11}/></button></div></div><div className="camp-session-modes camp-entry-modes" role="group" aria-label="How to enter"><Button disabled={cloud.busy} type="button" variant={mode==='invite'?'secondary':'ghost'} aria-pressed={mode==='invite'} onClick={()=>{setMode('invite');setCode('');setFailed(false);setDismissedMessage(cloud.message);setVisible(false);}}>New profile</Button><Button disabled={cloud.busy} type="button" variant={mode==='restore'?'secondary':'ghost'} aria-pressed={mode==='restore'} onClick={()=>{setMode('restore');setCode('');setFailed(false);setDismissedMessage(cloud.message);setVisible(false);}}>I have a recovery code</Button></div>
       <form onSubmit={submit} className="camp-session-form camp-auth-form"><p className="camp-entry-form-intro">{mode==='invite'?'Enter your name and the invitation code shared with you.':'Pick up where you left off with your name and saved recovery code.'}</p><label htmlFor="invite-name">Your name</label><Input id="invite-name" dir="auto" value={mode==='invite'&&savedLocalName?savedLocalName:name} readOnly={mode==='invite'&&!!savedLocalName} onChange={event=>setName(event.target.value)} required maxLength={40} autoComplete="nickname" placeholder="What should we call you?" disabled={cloud.busy}/>{mode==='invite'&&savedLocalName&&<Button type="button" variant="link" disabled={cloud.busy} onClick={()=>session.signOut()}>Use a different name · keep saved progress</Button>}
       {mode==='invite'&&<><label htmlFor="invite-email">Email used for your invitation <small>For emailed codes</small></label><Input id="invite-email" type="email" dir="ltr" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email" maxLength={254} disabled={cloud.busy} placeholder="you@example.com"/></>}<label htmlFor="invite-code">{mode==='invite'?'Invitation code':'Recovery code'}</label><div className="camp-auth-secret camp-learner-secret"><Input id="invite-code" dir="ltr" value={code} onChange={event=>setCode(event.target.value)} required type={visible?'text':'password'} autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={80} placeholder={mode==='invite'?'ECI-…':'EC1-…'} disabled={cloud.busy} aria-describedby="entry-code-help" aria-invalid={failed||hasError}/><button type="button" disabled={cloud.busy} aria-label={visible?'Hide code':'Show code'} aria-pressed={visible} onClick={()=>setVisible(v=>!v)}><AdminIcon name={visible?'eye-off':'eye'} size={17}/></button></div><small id="entry-code-help">{mode==='invite'?'Each invitation creates one profile. Existing local progress is kept.':'Returning learners use their recovery code. No new invitation is needed.'}</small>
       {(failed||hasError)&&cloud.message&&<p className="camp-auth-error" role="alert">{cloud.message}</p>}<Button type="submit" disabled={cloud.busy||!session.ready}>{cloud.busy?'Opening your profile…':mode==='invite'?'Start my session':'Restore my progress'}<AdminIcon name="arrow" size={14}/></Button>{mode==='invite'&&<Button type="button" variant="link" disabled={cloud.busy} onClick={()=>{setRequestOpen(true);setFailed(false);}}>Need a code? Request an invitation</Button>}</form></>}
      {session.storageNotice&&<p className="camp-auth-error" role="alert">{session.storageNotice}</p>}<div className="camp-entry-privacy"><LearningArt name="book" size={18}/><p>Your progress, badges and notes stay with your profile. Email is used for invitation requests; returning learners keep their recovery code.</p></div>
    </Card>{!requestOpen&&!cloud.recoveryCode&&!(granted&&session.profile?.cloudId)&&<p className="camp-entry-support">{mode==='invite'?'Already joined?':'Have a new invitation?'} <button onClick={()=>{setMode(mode==='invite'?'restore':'invite');setCode('');setFailed(false);setDismissedMessage(cloud.message);setVisible(false);}} disabled={cloud.busy}>{mode==='invite'?'Restore your progress':'Create your profile'}</button></p>}</main><footer className="camp-entry-auth-footer">EnglishCamp <span>Learn a little. Come back stronger.</span></footer>
  </div>;
}

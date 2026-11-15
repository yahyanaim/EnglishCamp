"use client";
import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BrandMark } from '@/components/brand/BrandMark';
import { PageBanner } from '@/components/ui/PageBanner';
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
  const cloud = useCloudProgress(), session = useSessionProfile();
  const [mode, setMode] = useState<'invite'|'restore'>('invite'), [name, setName] = useState(''), [code, setCode] = useState(''), [granted, setGranted] = useState(false);
  useEffect(() => { document.title = 'Join EnglishCamp'; void fetch('/api/access/session', {cache:'no-store'}).then(r=>r.json()).then(data=>setGranted(data.granted===true)).catch(()=>{}); }, []);
  useEffect(() => { if(session.profile?.cloudId&&!cloud.recoveryCode){setMode('restore');setName(session.profile.name);} }, [session.profile?.cloudId,cloud.recoveryCode]);
  const savedLocalName = !session.profile?.cloudId ? session.profile?.name : undefined;
  async function submit(event: FormEvent) {
    event.preventDefault(); if (mode === 'restore') { if (await cloud.restore(name, code.trim())) window.location.replace(destination()); }
    else await cloud.create(savedLocalName || name, code.trim());
  }
  function downloadRecovery() {
    const blob = new Blob([`EnglishCamp recovery details\nName: ${session.profile?.name || name}\nRecovery code: ${cloud.recoveryCode}\nSign in at https://englishcamp.yahyanaim2001.workers.dev/invite\nKeep this file private. Anyone with these details can open your learning profile.\n`],{type:'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob), link = document.createElement('a'); link.href=url;link.download='englishcamp-recovery.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  return <div className="camp-access camp-access-narrow">
    <Link href="/" className="camp-access-brand"><BrandMark size={36}/><strong>EnglishCamp</strong></Link>
    <PageBanner><h1>Your invitation to learn</h1><p>A small learning community, with room to practise.</p></PageBanner>
    <Card className="camp-access-card">
      {cloud.recoveryCode ? <section className="camp-access-form"><h2>Keep your recovery code</h2><p>Use your name and this private code to return on any device. Your invitation has been used successfully.</p><strong dir="auto">{session.profile?.name}</strong><code className="camp-access-code" dir="ltr">{cloud.recoveryCode}</code><Button variant="outline" onClick={downloadRecovery}>Download recovery details</Button><Button onClick={()=>{cloud.clearRecoveryCode();router.replace(destination());}}>I saved my code · continue</Button><small>Save it before leaving this page. It will not be shown again.</small></section>
      : granted && session.profile?.cloudId ? <section className="camp-access-form"><h2>Welcome back, <bdi>{session.profile.name}</bdi></h2><p>Your learning profile is ready.</p><Button onClick={()=>window.location.replace(destination())}>Continue learning</Button></section>
      : <><div className="camp-access-tabs" role="group" aria-label="How to enter"><Button variant={mode==='invite'?'secondary':'ghost'} aria-pressed={mode==='invite'} onClick={()=>{setMode('invite');setCode('');}}>I have an invitation</Button><Button variant={mode==='restore'?'secondary':'ghost'} aria-pressed={mode==='restore'} onClick={()=>{setMode('restore');setCode('');}}>I already have a profile</Button></div>
        <form onSubmit={submit} className="camp-access-form"><h2>{mode==='invite'?'Join EnglishCamp':'Welcome back'}</h2><p>{mode==='invite'?'Enter the code shared with you by the owner.':'Use your existing name and recovery code. No new invitation is needed.'}</p>
          <label htmlFor="invite-name">Your name</label><Input id="invite-name" value={mode==='invite'&&savedLocalName?savedLocalName:name} readOnly={mode==='invite'&&!!savedLocalName} onChange={event=>setName(event.target.value)} required maxLength={40} autoComplete="off"/>
          {mode==='invite'&&savedLocalName&&<Button type="button" variant="link" onClick={()=>session.signOut()}>Use a different name · keep saved progress</Button>}
          <label htmlFor="invite-code">{mode==='invite'?'Invitation code':'Recovery code'}</label><Input id="invite-code" value={code} onChange={event=>setCode(event.target.value)} required type="password" autoComplete="off" spellCheck={false} maxLength={80} placeholder={mode==='invite'?'ECI-…':'EC1-…'}/>
          <Button type="submit" disabled={cloud.busy||!session.ready}>{cloud.busy?'Opening your profile…':mode==='invite'?'Use invitation':'Restore my progress'}</Button>
          {mode==='invite'&&<small>Each invitation works once. Saved local progress is kept and copied into your profile.</small>}
        </form></>}
      {cloud.message&&!cloud.recoveryCode&&!granted&&<p className="camp-access-message" role="status">{cloud.message}</p>}
      {session.storageNotice&&<p className="camp-access-message" role="alert">{session.storageNotice}</p>}
    </Card><p className="camp-access-fine">We store your name, learning progress, badges and saved lesson notes. No email is required. Recordings stay on your device unless you approve an assessment.</p>
    <footer className="camp-access-footer"><span>Have a private QR connection? Open the link from your other device.</span><Link href="/admin/invitations">Manage invitations</Link></footer>
  </div>;
}

"use client";
import {useEffect,useState,type FormEvent} from 'react';
import {useTheme} from 'next-themes';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {AdminIcon} from '@/components/admin/AdminIcon';
import {EntryHeader} from '@/components/session/EntryHeader';
import '@/app/invitations.css';
import {Button} from '@/components/ui/shadcn/button';
import {Input} from '@/components/ui/shadcn/input';
import {useSettings} from '@/store/useSettings';
import {accentPalette} from '@/lib/accentPalette';

export default function Login(){
  const [key,setKey]=useState(''),[code,setCode]=useState(''),[twoFactor,setTwoFactor]=useState(false),[error,setError]=useState(''),[busy,setBusy]=useState(false),[checking,setChecking]=useState(true),[visible,setVisible]=useState(false);
  const {resolvedTheme}=useTheme(),router=useRouter();
  const accent=useSettings(s=>s.accentColor);
  useEffect(()=>{for(const [name,value] of Object.entries(accentPalette(accent,resolvedTheme==='dark')))document.documentElement.style.setProperty(name,value);},[accent,resolvedTheme]);
  useEffect(()=>{let active=true;void fetch('/api/invitations/admin/session',{cache:'no-store',signal:AbortSignal.timeout(15000)}).then(r=>r.json()).then(d=>{if(!active)return;if(d.authenticated)router.replace('/admin/dashboard');else{setTwoFactor(!!d.twoFactor);setChecking(false);}}).catch(()=>{if(active)setChecking(false);});return()=>{active=false;};},[router]);
  async function submit(e:FormEvent){
    e.preventDefault();if(busy)return;setBusy(true);setError('');
    try{
      const r=await fetch('/api/invitations/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(twoFactor?{password:key,code}:{password:key}),signal:AbortSignal.timeout(15000)});
      const d=await r.json();if(!r.ok)throw new Error(d.error||'Administrator sign-in is unavailable.');
      setKey('');setCode('');router.replace('/admin/dashboard');
    }catch(e){setError(e instanceof Error&&e.name!=='TimeoutError'?e.message:'Connection timed out. Please try again.');}finally{setBusy(false);}
  }
  return <div className="camp-entry-auth camp-admin-entry">
    <EntryHeader admin/>
    <main className="camp-auth-stage"><section className="camp-auth-card" aria-label="Administrator sign-in"><div className="camp-auth-intro"><span className="camp-auth-security"><AdminIcon name="shield" size={14}/>Private administration</span><h1>Admin sign in</h1><p>Manage learners, invitations and learning progress in EnglishCamp.</p></div>
      <form onSubmit={submit} className="camp-auth-form" aria-busy={checking||busy}><label htmlFor="owner-key">Management key</label><div className="camp-auth-secret"><AdminIcon name="lock" size={17}/><Input id="owner-key" type={visible?'text':'password'} autoComplete="current-password" value={key} onChange={e=>setKey(e.target.value)} required maxLength={256} placeholder="Your private key" aria-describedby="admin-key-help" disabled={busy||checking}/><button type="button" disabled={busy||checking} aria-label={visible?'Hide management key':'Show management key'} aria-pressed={visible} onClick={()=>setVisible(v=>!v)}><AdminIcon name={visible?'eye-off':'eye'} size={17}/></button></div><small id="admin-key-help">Use the private key issued for this administrator workspace.</small>{twoFactor&&<><label htmlFor="owner-code">Authenticator code</label><div className="camp-auth-secret"><AdminIcon name="shield" size={17}/><Input id="owner-code" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={code} onChange={e=>setCode(e.target.value.replace(/\D/g,''))} required placeholder="6-digit code" aria-describedby="admin-code-help" disabled={busy||checking}/></div><small id="admin-code-help">Open your authenticator app and enter the current code.</small></>}{error&&<p role="alert" className="camp-auth-error">{error}</p>}<Button type="submit" disabled={busy||checking}>{checking?'Checking access…':busy?'Signing in…':'Sign in'}<AdminIcon name="arrow" size={15}/></Button></form>
      <div className="camp-auth-divider"/><p className="camp-auth-return">Here to learn? <Link href="/invite">Open learner sign-in <AdminIcon name="arrow" size={12}/></Link></p>
    </section></main><footer className="camp-entry-auth-footer">EnglishCamp administration <span>Secure access for platform administrators</span></footer>
  </div>;
}

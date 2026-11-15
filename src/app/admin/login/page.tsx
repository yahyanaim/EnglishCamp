"use client";
import {useEffect,useState,type FormEvent} from 'react';
import {useTheme} from 'next-themes';
import Link from 'next/link';
import {ArrowRight,Eye,EyeOff,LockKeyhole,Moon,Sun,ShieldCheck} from 'lucide-react';
import {BrandMark} from '@/components/brand/BrandMark';
import {LearningArt} from '@/components/brand/LearningArt';
import {Button} from '@/components/ui/shadcn/button';
import {Input} from '@/components/ui/shadcn/input';
import {useSettings} from '@/store/useSettings';
import {accentPalette} from '@/lib/accentPalette';

export default function Login(){
  const [key,setKey]=useState(''),[error,setError]=useState(''),[busy,setBusy]=useState(false),[checking,setChecking]=useState(true),[visible,setVisible]=useState(false);
  const {resolvedTheme,setTheme}=useTheme();
  const accent=useSettings(s=>s.accentColor);
  useEffect(()=>{for(const [name,value] of Object.entries(accentPalette(accent,resolvedTheme==='dark')))document.documentElement.style.setProperty(name,value);},[accent,resolvedTheme]);
  useEffect(()=>{let active=true;void fetch('/api/invitations/admin/session',{cache:'no-store',signal:AbortSignal.timeout(15000)}).then(r=>r.json()).then(d=>{if(!active)return;if(d.authenticated)window.location.replace('/admin/dashboard');else setChecking(false);}).catch(()=>{if(active)setChecking(false);});return()=>{active=false;};},[]);
  async function submit(e:FormEvent){
    e.preventDefault();if(busy)return;setBusy(true);setError('');
    try{
      const r=await fetch('/api/invitations/admin/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({password:key}),signal:AbortSignal.timeout(15000)});
      const d=await r.json();if(!r.ok)throw new Error(d.error||'Administrator sign-in is unavailable.');
      setKey('');window.location.replace('/admin/dashboard');
    }catch(e){setError(e instanceof Error&&e.name!=='TimeoutError'?e.message:'Connection timed out. Please try again.');}finally{setBusy(false);}
  }
  return <div className="admin-auth">
    <header className="admin-auth-header"><Link href="/" className="admin-auth-brand"><BrandMark size={36}/><strong>EnglishCamp</strong><span>Administration</span></Link><button className="admin-auth-theme" onClick={()=>setTheme(resolvedTheme==='dark'?'light':'dark')} aria-label="Toggle theme">{resolvedTheme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button></header>
    <div className="admin-auth-layout">
      <section className="admin-auth-story"><span className="admin-auth-eyebrow">THE MANAGEMENT WORKSPACE</span><h2>A clearer view<br/>of learning.</h2><p>Understand progress, welcome learners and keep EnglishCamp moving forward.</p><div className="admin-auth-art" aria-hidden="true"><div className="admin-auth-art-main"><BrandMark size={88}/></div><span><LearningArt name="book" size={30}/></span><span><LearningArt name="trophy" size={30}/></span><span><LearningArt name="headphones" size={30}/></span></div><div className="admin-auth-principles"><span>Learning insights</span><span>Access management</span><span>Course oversight</span></div></section>
      <section className="admin-auth-form-panel" aria-label="Administrator sign-in"><div className="admin-auth-form-inner"><span className="admin-auth-lock"><LockKeyhole size={22}/></span><p className="admin-auth-eyebrow">PRIVATE ADMINISTRATOR ACCESS</p><h1>Admin sign in</h1><p>Sign in to the EnglishCamp management console.</p>
        {checking?<p role="status">Checking your administrator session…</p>:<form onSubmit={submit}><label htmlFor="owner-key">Management key</label><div className="admin-password-field"><Input id="owner-key" type={visible?'text':'password'} autoComplete="current-password" value={key} onChange={e=>setKey(e.target.value)} required maxLength={256} aria-describedby="admin-key-help"/><button type="button" aria-label={visible?'Hide management key':'Show management key'} aria-pressed={visible} onClick={()=>setVisible(v=>!v)}>{visible?<EyeOff size={18}/>:<Eye size={18}/>}</button></div><small id="admin-key-help">Use your private administrator key. Learner invitation and recovery codes belong to learner sign-in.</small>{error&&<p role="alert" className="admin-auth-error">{error}</p>}<Button type="submit" disabled={busy}>{busy?'Signing in…':'Sign in'}<ArrowRight size={16}/></Button></form>}
        <div className="admin-auth-security"><ShieldCheck size={16}/><span>Separate administrator session · Protected access</span></div><div className="admin-auth-learner">Here to learn? <Link href="/invite">Go to learner sign-in <ArrowRight size={13}/></Link></div>
      </div></section>
    </div><footer className="admin-auth-footer">EnglishCamp administration <span>Learning records stay with their existing profiles.</span></footer>
  </div>;
}

"use client";
import {useEffect,useState,type ReactNode} from 'react';
import {usePathname} from 'next/navigation';
import {useTheme} from 'next-themes';
import Link from 'next/link';
import {AdminIcon} from './AdminIcon';
import {LearningArt} from '@/components/brand/LearningArt';
import {BrandMark} from '@/components/brand/BrandMark';
import {Button} from '@/components/ui/shadcn/button';
import {AccentPicker} from '@/components/layout/AccentPicker';
import {adminNavigation,adminGroups} from './adminNavigation';
import './admin.css';
export const adminPages=adminNavigation.map(p=>p.id);

export function AdminShell({children}:{children:ReactNode}){
  const pathname=usePathname(),login=pathname==='/admin/login';
  const [ready,setReady]=useState(false),[open,setOpen]=useState(false),[error,setError]=useState('');
  const {resolvedTheme,setTheme}=useTheme();
  const active=adminNavigation.find(p=>pathname==='/admin/'+p.id)||adminNavigation[0];
  useEffect(()=>{
    if(login)return;
    let active=true;
    void fetch('/api/invitations/admin/session',{cache:'no-store'}).then(r=>r.json()).then(d=>{
      if(!active)return;
      if(d.authenticated)setReady(true);else window.location.replace('/admin/login');
    }).catch(()=>setError('Could not check your management session. Reload to retry.'));
    return()=>{active=false;};
  },[login,pathname]);
  useEffect(()=>{setOpen(false);},[pathname]);
  useEffect(()=>{
    if(login)return;
    const verify=()=>{void fetch('/api/invitations/admin/session',{cache:'no-store'}).then(r=>r.json()).then(d=>{
      if(d.authenticated===false)window.location.replace('/admin/login');
    }).catch(()=>{});};
    window.addEventListener('focus',verify);return()=>window.removeEventListener('focus',verify);
  },[login]);
  useEffect(()=>{
    if(!open)return;
    const before=document.activeElement as HTMLElement|null;
    const previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
    const root=document.getElementById('admin-navigation');
    const items=()=>Array.from(root?.querySelectorAll<HTMLElement>('a,button')||[]).filter(e=>e.getClientRects().length);
    items()[0]?.focus();
    function key(e:KeyboardEvent){
      if(e.key==='Escape')setOpen(false);
      if(e.key==='Tab'){
        const a=items(),first=a[0],last=a.at(-1);
        if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
        else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}
      }
    }
    window.addEventListener('keydown',key);
    return()=>{window.removeEventListener('keydown',key);document.body.style.overflow=previousOverflow;before?.focus();};
  },[open]);
  async function logout(){
    const r=await fetch('/api/invitations/admin/logout',{method:'POST',headers:{'Content-Type':'application/json'},body:'{}'});
    if(r.ok)window.location.replace('/admin/login');else setError('Sign out failed. Please try again.');
  }
  if(login)return <>{children}</>;
  if(!ready)return <p role="status">{error||'Checking owner access…'}</p>;
  return <div className="camp-admin">
    <a href="#admin-content" className="sr-only focus:not-sr-only">Skip to content</a>
    <header className="admin-header">
      <div className="admin-header-brand">
        <Button variant="unstyled" className="admin-icon-button admin-menu" aria-label="Menu" aria-expanded={open} onClick={()=>setOpen(true)}><AdminIcon name="menu" size={18}/></Button>
        <Link href="/admin/dashboard" className="admin-brand"><BrandMark size={42}/><span><strong>EnglishCamp</strong><small>Admin workspace</small></span></Link>
      </div>
      <nav className="admin-topnav" aria-label="Admin workspace sections">{adminGroups.map(group=><Link key={group} href={'/admin/'+adminNavigation.find(p=>p.group===group)!.id} aria-current={active.group===group?'true':undefined}>{group}</Link>)}</nav>
      <div className="admin-utilities">
        <div className="admin-utility-pill">
          <Link href="/admin/learners" className="admin-icon-button" aria-label="Search learners" title="Search learners"><AdminIcon name="search" size={18}/></Link>
          <button className="admin-icon-button" onClick={()=>setTheme(resolvedTheme==='dark'?'light':'dark')} aria-label="Toggle theme"><AdminIcon name="sun" size={18} className="admin-light-icon"/><AdminIcon name="moon" size={18} className="admin-dark-icon"/></button>
          <AccentPicker/>
        </div>
        <Button variant="unstyled" className="admin-signout" onClick={logout}><AdminIcon name="logout" size={18}/><span>Sign out</span></Button>
      </div>
    </header>
    {open&&<button className="admin-scrim" aria-label="Close navigation" onClick={()=>setOpen(false)}/>}
    <div className="admin-workspace">
      <aside id="admin-navigation" role={open?'dialog':undefined} aria-modal={open?true:undefined} aria-label="Admin navigation" className={'admin-sidebar'+(open?' is-open':'')}>
        <div className="admin-drawer-heading"><BrandMark size={32}/><strong>Administration</strong><button className="admin-icon-button" aria-label="Close navigation" onClick={()=>setOpen(false)}><AdminIcon name="close" size={18}/></button></div>
        <div className="admin-rail-theme"><button onClick={()=>setTheme('light')} aria-label="Light mode" aria-pressed={resolvedTheme!=='dark'}><AdminIcon name="sun" size={17}/></button><button onClick={()=>setTheme('dark')} aria-label="Dark mode" aria-pressed={resolvedTheme==='dark'}><AdminIcon name="moon" size={17}/></button></div>
        <nav aria-label="Administration">{adminNavigation.map(p=><Link key={p.id} href={'/admin/'+p.id} aria-label={p.label} aria-current={active.id===p.id?'page':undefined}>{p.icon==='trophy'?<LearningArt name="trophy" size={21}/>:<AdminIcon name={p.icon} size={21}/>}<span>{p.label}</span></Link>)}</nav>
        <button className="admin-rail-logout" onClick={logout} aria-label="Sign out"><AdminIcon name="logout" size={18}/><span>Sign out</span></button>
      </aside>
      <div className="admin-main">

        {error&&<p role="alert" className="admin-notice">{error}</p>}
        <section id="admin-content" className="admin-content" aria-label="Admin page">{children}</section>
        <footer>EnglishCamp administration <span>Online records only · Practice completion is not a proficiency score.</span></footer>
      </div>
    </div>
  </div>;
}

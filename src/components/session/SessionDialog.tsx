"use client";
import { useState, type FormEvent, type RefObject } from "react";
import Link from "next/link";
import { X, ShieldCheck, ArrowUpRight, LogOut, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/shadcn/dialog";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { LearningArt } from "@/components/brand/LearningArt";
import { useSessionProfile } from "./SessionProvider";
import { FruitAvatar } from "./FruitAvatar";
import { BrandMark } from "@/components/brand/BrandMark";
import { profileTag } from "@/lib/sessionProfile";
import { useProgress } from "@/store/useProgress";

export function SessionDialog({ open, onOpenChange, trigger }: { open: boolean; onOpenChange: (open: boolean) => void; trigger: RefObject<HTMLButtonElement> }) {
  const { profile, signIn, signOut, deleteSession, storageNotice } = useSessionProfile();
  const [confirmDelete, setConfirmDelete] = useState(false),[name, setName] = useState(""),[error, setError] = useState("");
  const {getTotalXP,getLevel}=useProgress();const level=getLevel().level;
  function submit(event: FormEvent) {event.preventDefault();setError("");try { if (signIn(name)) onOpenChange(false); }catch (problem) {setError(problem instanceof Error ? problem.message : "Please enter your name.");}}
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="camp-session-dialog camp-session-dialog-refined" onCloseAutoFocus={event => { event.preventDefault(); trigger.current?.focus(); }}>
    <Button variant="ghost" size="icon" className="camp-dialog-close" aria-label="Close sign-in" onClick={() => onOpenChange(false)}><X size={18}/></Button>
    <header className="camp-session-dialog-heading" role="presentation"><BrandMark size={36}/><DialogHeader><DialogTitle>{profile ? "Your learning session" : "Make yourself at home"}</DialogTitle><DialogDescription>{profile ? "A personal space for your progress and study plans." : "Start with a name. No email, password or account needed."}</DialogDescription></DialogHeader></header>
    {profile ? <>
      <section className="camp-session-identity" aria-label="Current learner"><FruitAvatar fruit={profile.fruit} size={60}/><div><h2 dir="auto">{profile.name}</h2><p className="camp-profile-tag" dir="ltr">{profileTag(profile)}</p><span>Local profile #{String(profile.number).padStart(4,"0")}</span></div><span className="camp-session-saved"><span/>Saved in this tab</span></section>
      <div className="camp-session-metrics"><span><LearningArt name="spark" size={17}/><strong>{getTotalXP()}</strong> XP earned</span><span><LearningArt name="flag" size={17}/>Learning level <strong>{level}</strong></span></div>
      <nav className="camp-session-destinations" aria-label="Your learning tools"><Link href="/placement-test" onClick={()=>onOpenChange(false)}><LearningArt name="document" size={24}/><span><strong>Placement & certificate</strong><small>Find your starting point or view your result</small></span><ArrowUpRight size={16}/></Link><Link href="/study-plan" onClick={()=>onOpenChange(false)}><LearningArt name="calendar" size={24}/><span><strong>My study timetable</strong><small>Your lessons, study time and calendar file</small></span><ArrowUpRight size={16}/></Link></nav>
      <div className="camp-session-controls"><Button variant="outline" onClick={()=>{if(signOut())onOpenChange(false);}}><LogOut size={16}/>Sign out · keep progress</Button><Button variant="ghost" onClick={()=>setConfirmDelete(true)}><Trash2 size={15}/>Delete this learning session</Button></div>
      {confirmDelete&&<section className="camp-delete-session" role="group" aria-label="Confirm session deletion"><strong>Delete {profile.name}’s learning records?</strong><p>This removes this name’s progress, badges, vocabulary, notes and placement results from this tab. This cannot be undone. Other learners and guest progress are kept.</p><div><Button variant="outline" onClick={()=>setConfirmDelete(false)}>Keep my session</Button><Button variant="destructive" onClick={()=>{if(deleteSession())onOpenChange(false);}}>Delete my session</Button></div></section>}
    </> : <form onSubmit={submit} className="camp-session-form"><label htmlFor="session-name">Your name</label><Input id="session-name" name="name" value={name} onChange={event=>setName(event.target.value)} placeholder="What should we call you?" autoComplete="off" maxLength={40} required aria-invalid={!!error} aria-describedby={error?"session-name-error":"session-name-help"}/><p id="session-name-help">Use the same name to return to your saved progress in this tab.</p>{error&&<p id="session-name-error" role="alert" className="text-[var(--color-text-error)]">{error}</p>}<Button type="submit">Start my session <ArrowUpRight size={16}/></Button></form>}
    {storageNotice&&<p role="status" className="camp-storage-notice">{storageNotice}</p>}
    <section className="camp-session-privacy camp-session-privacy-refined"><ShieldCheck size={18}/><div><strong>No account data collection</strong><p>Your name and learning records stay in this tab. Signing out keeps them; deleting the session or closing the tab removes them.</p><details><summary>Privacy and storage details</summary><p>Your name, avatar and named learning records use this tab’s session storage and survive reloads. No account data is sent to an EnglishCamp server. The first named session inherits existing guest progress. Other names have separate records.</p><p>This is local name-only access, not a password-protected account or cross-device backup. Optional videos connect to YouTube. Missing pronunciation uses Microsoft; personal text is sent only after approval. Optional speaking or writing assessment sends your selected response and task prompt to OpenAI only after separate approval; its transcript and result stay in your named tab session.</p></details></div></section>
  </DialogContent></Dialog>;
}

"use client";
import { useState, type FormEvent, type RefObject } from "react";
import { X, ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/shadcn/dialog";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { useSessionProfile } from "./SessionProvider";
import { FruitAvatar } from "./FruitAvatar";
import { BrandMark } from "@/components/brand/BrandMark";
import { profileTag } from "@/lib/sessionProfile";

export function SessionDialog({ open, onOpenChange, trigger }: { open: boolean; onOpenChange: (open: boolean) => void; trigger: RefObject<HTMLButtonElement> }) {
  const { profile, signIn, signOut, deleteSession, storageNotice } = useSessionProfile();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  function submit(event: FormEvent) {
    event.preventDefault(); setError("");
    try { if (signIn(name)) onOpenChange(false); }
    catch (problem) { setError(problem instanceof Error ? problem.message : "Please enter your name."); }
  }
  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="camp-session-dialog" onCloseAutoFocus={event => { event.preventDefault(); trigger.current?.focus(); }}>
    <Button variant="ghost" size="icon" className="camp-dialog-close" aria-label="Close sign-in" onClick={() => onOpenChange(false)}><X size={18} /></Button>
    <div className="camp-session-brand"><BrandMark size={52}/></div>
    <DialogHeader><DialogTitle>{profile ? "Your learning session" : "Make yourself at home"}</DialogTitle><DialogDescription>{profile ? "Your progress, badges and learning level belong to this name." : "Use a name to start, or return to a saved learner in this tab."}</DialogDescription></DialogHeader>
    {profile ? <div className="camp-session-details"><span className="camp-profile-portrait"><FruitAvatar fruit={profile.fruit} size={76} /></span><h2>{profile.name}</h2><p className="camp-profile-tag">{profileTag(profile)}</p><p>Local profile #{String(profile.number).padStart(4, "0")}</p><Button variant="outline" onClick={() => { if (signOut()) onOpenChange(false); }}>Sign out · keep progress</Button><Button variant="ghost" onClick={() => setConfirmDelete(true)}>Delete this learning session</Button>{confirmDelete && <div className="camp-delete-session" role="group" aria-label="Confirm session deletion"><strong>Delete {profile.name}’s learning records?</strong><p>This removes this name’s progress, badges, vocabulary and notes from this tab. This cannot be undone. Other learners and guest progress are kept.</p><div><Button variant="outline" onClick={() => setConfirmDelete(false)}>Keep my session</Button><Button onClick={() => { if (deleteSession()) onOpenChange(false); }}>Delete my session</Button></div></div>}</div> : <form onSubmit={submit} className="camp-session-form">
      <label htmlFor="session-name">Your name</label><Input id="session-name" name="name" value={name} onChange={event => setName(event.target.value)} placeholder="What should we call you?" autoComplete="off" maxLength={40} required aria-invalid={!!error} aria-describedby={error ? "session-name-error" : "session-name-help"} />
      <p id="session-name-help">No email, password or account needed.</p>{error && <p id="session-name-error" role="alert" className="text-[var(--color-text-error)]">{error}</p>}<Button type="submit">Start my session</Button>
    </form>}
    {storageNotice && <p role="status" className="camp-storage-notice">{storageNotice}</p>}
    <div className="camp-session-privacy"><ShieldCheck size={19} /><div><strong>No account data collection</strong><p>Your name, avatar and named learning records stay in this tab’s session storage and survive reloads. Sign out keeps them; use the same name to return. Delete the learning session or close this tab to remove them. No account data is sent to an EnglishCamp server.</p><p>The first named session inherits existing guest progress. Other names have separate records. This is local name-only access, not a password-protected account or cross-device backup. Optional videos connect to YouTube. Missing pronunciation uses Microsoft; personal text is sent only after approval.</p></div></div>
  </DialogContent></Dialog>;
}

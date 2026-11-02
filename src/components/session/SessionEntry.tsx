"use client";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { LearningArt } from "@/components/brand/LearningArt";
import { Button } from "@/components/ui/shadcn/button";
import { FruitAvatar } from "./FruitAvatar";
import { useSessionProfile } from "./SessionProvider";
import { profileTag } from "@/lib/sessionProfile";
const SessionDialog = dynamic(() => import("./SessionDialog").then(module => module.SessionDialog), { ssr: false });

export function SessionEntry() {
  const { profile, ready } = useSessionProfile();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  return <>
    <Button ref={trigger} variant="ghost" disabled={!ready} onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open} className="camp-session-entry" aria-label={profile ? `Your session: ${profile.name}` : "Sign in with your name"}>
      {profile ? <><span className="camp-session-avatar"><FruitAvatar fruit={profile.fruit} size={32} /></span><span className="camp-session-label"><strong>{profile.name}</strong><small>{profileTag(profile)}</small></span></> : <><LearningArt name="chat" size={20} /><span>Sign in</span></>}
    </Button>
    {open && <SessionDialog open={open} onOpenChange={setOpen} trigger={trigger} />}
  </>;
}

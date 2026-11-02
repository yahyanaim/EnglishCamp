"use client";
import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { clearSessionProfile, readSessionProfile, type SessionProfile } from "@/lib/sessionProfile";
import { startLearnerSession, deleteLearnerSession } from "@/lib/learnerProfiles";
import { restoreLearnerStores } from "@/lib/learnerStores";
import { stopNaturalSpeech } from "@/lib/naturalSpeech";
import { hasUnsavedActivity, deleteLearnerTakes } from "@/lib/activityState";
import { learnerRecordingPrefix } from "@/lib/learnerStorage";

type SessionContext = { profile: SessionProfile | null; ready: boolean; storageNotice: string; signIn: (name: string) => boolean; signOut: () => boolean; deleteSession: () => boolean };
const Context = createContext<SessionContext | null>(null);
const useRestoreEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function SessionProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<SessionProfile | null>(null);
  const [ready, setReady] = useState(false);
  const [storageNotice, setStorageNotice] = useState("");
  useRestoreEffect(() => {
    try { const saved = readSessionProfile(window.sessionStorage); if (saved) setProfile(startLearnerSession(window.localStorage, window.sessionStorage, saved.name, 0)); restoreLearnerStores(); }
    catch { setStorageNotice("Session storage is unavailable. Enable browser storage to keep a named learning session."); }
    setReady(true);
  }, []);
  function signIn(name: string) {
    if (hasUnsavedActivity()) { setStorageNotice("Finish or save the current recording or response before switching learners."); return false; }
    const random = window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
    try {
      const next = startLearnerSession(window.localStorage, window.sessionStorage, name, random);
      stopNaturalSpeech(); restoreLearnerStores(); setProfile(next); setStorageNotice(""); return true;
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("Enter a name")) throw error;
      setStorageNotice("Your learning session could not be saved. Browser storage may be full or unavailable. Existing records have been kept."); return false;
    }
  }
  function signOut() {
    if (hasUnsavedActivity()) { setStorageNotice("Finish or save the current recording or response before switching learners."); return false; }
    try { clearSessionProfile(window.sessionStorage); stopNaturalSpeech(); restoreLearnerStores(); setProfile(null); setStorageNotice(""); return true; }
    catch { setStorageNotice("Could not switch sessions. Your saved records are unchanged."); return false; }
  }
  function deleteSession() {
    if (!profile || hasUnsavedActivity()) { setStorageNotice("Finish or save the current recording or response first."); return false; }
    try { const prefix = learnerRecordingPrefix(profile.number); deleteLearnerSession(window.sessionStorage, profile); void deleteLearnerTakes(prefix).catch(() => {}); stopNaturalSpeech(); restoreLearnerStores(); setProfile(null); setStorageNotice(""); return true; }
    catch { setStorageNotice("Could not delete the learning session. Please retry."); return false; }
  }
  return <Context.Provider value={{ profile, ready, storageNotice, signIn, signOut, deleteSession }}><div key={profile?.number ?? "guest"} className="camp-session-scope">{children}</div></Context.Provider>;
}
export function useSessionProfile() {
  const value = useContext(Context);
  if (!value) throw new Error("SessionProvider is required.");
  return value;
}

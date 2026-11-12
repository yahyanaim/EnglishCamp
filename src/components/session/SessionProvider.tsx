"use client";
import { createContext, useContext, useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { clearSessionProfile, readSessionProfile, type SessionProfile } from "@/lib/sessionProfile";
import { startLearnerSession, deleteLearnerSession, activateCloudLearner } from "@/lib/learnerProfiles";
import type { CloudAccount } from '@/lib/cloudProgress';
import { restoreLearnerStores } from "@/lib/learnerStores";
import { stopNaturalSpeech } from "@/lib/naturalSpeech";
import { hasUnsavedActivity, deleteLearnerTakes } from "@/lib/activityState";
import { readPlacement } from "@/lib/placement";
import { learnerStorage } from "@/lib/learnerStorage";
import { learnerRecordingPrefix } from "@/lib/learnerStorage";
import { CloudProgressProvider } from './CloudProgressProvider';
import { CloudNotesProvider } from './CloudNotesProvider';

type SessionContext = { profile: SessionProfile | null; ready: boolean; storageNotice: string; placementOffer: boolean; closePlacementOffer: () => void; offerPlacement:()=>void; signIn: (name: string) => boolean; signOut: () => boolean; deleteSession: () => boolean; activateCloud:(account:CloudAccount,linkCurrent?:boolean)=>boolean; canSwitch:()=>boolean };
const Context = createContext<SessionContext | null>(null);
const useRestoreEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function SessionProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<SessionProfile | null>(null);
  const [placementOffer, setPlacementOffer] = useState(false);
  const [ready, setReady] = useState(false);
  const [storageNotice, setStorageNotice] = useState("");
  useRestoreEffect(() => {
    try { const saved = readSessionProfile(window.sessionStorage); if (saved) setProfile(saved.cloudId?saved:startLearnerSession(window.localStorage, window.sessionStorage, saved.name, 0)); restoreLearnerStores(); }
    catch { setStorageNotice("Session storage is unavailable. Enable browser storage to keep a named learning session."); }
    setReady(true);
  }, []);
  function canSwitch(){if(hasUnsavedActivity()){setStorageNotice('Finish or save the current recording or response before switching learners.');return false;}return true;}
  function activateCloud(account:CloudAccount,linkCurrent=false){if(!canSwitch())return false;try{const next=activateCloudLearner(window.localStorage,window.sessionStorage,account,linkCurrent);stopNaturalSpeech();restoreLearnerStores();setProfile(next);setStorageNotice('');return true;}catch{setStorageNotice('Could not restore this profile on this device. Existing learning records are kept.');return false;}}
  function signIn(name: string) {
    if (hasUnsavedActivity()) { setStorageNotice("Finish or save the current recording or response before switching learners."); return false; }
    const random = window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
    try {
      const next = startLearnerSession(window.localStorage, window.sessionStorage, name, random);
      stopNaturalSpeech(); restoreLearnerStores(); setProfile(next); setPlacementOffer(readPlacement(learnerStorage).status === "new"); setStorageNotice(""); return true;
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("Enter a name")) throw error;
      setStorageNotice("Your learning session could not be saved. Browser storage may be full or unavailable. Existing records have been kept."); return false;
    }
  }
  function signOut() {
    if (hasUnsavedActivity()) { setStorageNotice("Finish or save the current recording or response before switching learners."); return false; }
    try { clearSessionProfile(window.sessionStorage); stopNaturalSpeech(); restoreLearnerStores(); setProfile(null); setPlacementOffer(false); setStorageNotice(""); return true; }
    catch { setStorageNotice("Could not switch sessions. Your saved records are unchanged."); return false; }
  }
  function deleteSession() {
    if (!profile || hasUnsavedActivity()) { setStorageNotice("Finish or save the current recording or response first."); return false; }
    try { const prefix = learnerRecordingPrefix(profile.number); deleteLearnerSession(window.sessionStorage, profile, window.localStorage); void deleteLearnerTakes(prefix).catch(() => {}); stopNaturalSpeech(); restoreLearnerStores(); setProfile(null); setPlacementOffer(false); setStorageNotice(""); return true; }
    catch { setStorageNotice("Could not delete the learning session. Please retry."); return false; }
  }
  return <Context.Provider value={{ profile, ready, storageNotice, placementOffer, closePlacementOffer: () => setPlacementOffer(false),offerPlacement:()=>setPlacementOffer(readPlacement(learnerStorage).status==='new'), signIn, signOut, deleteSession,activateCloud,canSwitch }}><CloudProgressProvider><CloudNotesProvider><div key={profile?.number ?? "guest"} className="camp-session-scope">{children}</div></CloudNotesProvider></CloudProgressProvider></Context.Provider>;
}
export function useSessionProfile() {
  const value = useContext(Context);
  if (!value) throw new Error("SessionProvider is required.");
  return value;
}

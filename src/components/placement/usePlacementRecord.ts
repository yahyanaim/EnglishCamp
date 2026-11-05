"use client";
import { useEffect, useState, useCallback } from 'react';
import { useSessionProfile } from '@/components/session/SessionProvider';
import { learnerStorage } from '@/lib/learnerStorage';
import { readSessionProfile } from '@/lib/sessionProfile';
import { emptyPlacement, readPlacement, savePlacement, type PlacementRecord } from '@/lib/placement';
const EVENT='camp:placement-update';
export function usePlacementRecord(){
 const {profile,ready:sessionReady}=useSessionProfile();
 const [record,setRecord]=useState<PlacementRecord>(emptyPlacement),[ready,setReady]=useState(false),[error,setError]=useState('');
 useEffect(()=>{if(!sessionReady)return;const refresh=()=>{setRecord(profile?readPlacement(learnerStorage):emptyPlacement());setReady(true);};refresh();window.addEventListener(EVENT,refresh);return()=>window.removeEventListener(EVENT,refresh);},[sessionReady,profile?.number]);
 const update=useCallback((change:(current:PlacementRecord)=>PlacementRecord)=>{try{if(!profile||readSessionProfile(sessionStorage)?.number!==profile.number)throw new Error('Sign in to save your placement and study plan.');const next=change(readPlacement(learnerStorage));savePlacement(learnerStorage,next);setRecord(next);setError('');window.dispatchEvent(new Event(EVENT));return true;}catch(problem){setError(problem instanceof Error?problem.message:'Could not save. Check browser storage and try again.');return false;}},[profile]);
 return {profile,record,ready,error,update};
}

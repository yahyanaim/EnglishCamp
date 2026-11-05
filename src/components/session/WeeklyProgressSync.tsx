"use client";
import { useEffect } from "react";
import { useProgress } from "@/store/useProgress";
import { useGoals } from "@/store/useGoals";
import { useSessionProfile } from "./SessionProvider";
/** One observer serves every weekly-goal consumer and waits for named-store restoration. */
export function WeeklyProgressSync() {
  const {ready}=useSessionProfile();
  const {events,lessons,quizResults}=useProgress();
  const sync=useGoals(s=>s.syncProgress);
  useEffect(()=>{if(ready)sync({events,lessons,quizResults});},[ready,events,lessons,quizResults,sync]);
  return null;
}

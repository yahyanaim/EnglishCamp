"use client";
import { useEffect, useState } from "react";
import type { ActivityTask } from "@/data/types";
import { activityStorageKey } from "@/lib/courseActivity";
import { attemptKey, initialAttempt, restoreAttempt, setRecordingRisk, type AttemptState } from "@/lib/activityState";

export function useActivityAttempt(exerciseId: string, task: ActivityTask) {
  const [state, setState] = useState<AttemptState>(() => initialAttempt(task));
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState("Responses are saved on this device.");
  const key = attemptKey(exerciseId, task);
  useEffect(() => {
    try { setState(restoreAttempt(task, localStorage.getItem(key), localStorage.getItem(activityStorageKey(exerciseId, task.id)))); }
    catch { setSaving("Storage is unavailable. Copy your response before leaving."); }
    setLoaded(true);
  // Task is immutable for this keyed component; do not reload on each parent render.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(key, JSON.stringify(state)); setRecordingRisk(key + ":draft", false); }
    catch { setSaving("Your latest response could not be saved. Copy it before leaving."); setRecordingRisk(key + ":draft", true); }
  }, [state, loaded, key]);
  useEffect(() => () => setRecordingRisk(key + ":draft", false), [key]);
  const patch = (next: Partial<AttemptState>) => setState(previous => ({ ...previous, ...next }));
  return { state, setState, patch, loaded, saving, key };
}

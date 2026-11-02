"use client";
import { learnerStorage } from "@/lib/learnerStorage";
import { useEffect, useState } from "react";

export function clearDrillAttempt(id: string) {
  try { learnerStorage.removeItem(`englishcamp-drill-v2:${id}`); } catch { /* A retry remains available without storage. */ }
}
/** Local drafts are content-scoped. Only an explicit Retry drill clears the attempt. */
export function useDrillAttempt<T extends object>(id: string, content: unknown, initial: T) {
  const key = `englishcamp-drill-v2:${id}`, signature = JSON.stringify(content);
  const [state, setState] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      const raw = learnerStorage.getItem(key);
      if (raw) {
        const saved = JSON.parse(raw);
        if (saved.signature === signature && saved.state && typeof saved.state === "object") setState(previous => ({ ...previous, ...saved.state, award: 0 }));
      }
    } catch { /* Keep the activity usable when browser storage is unavailable. */ }
    setLoaded(true);
  }, [key, signature]);
  useEffect(() => {
    if (loaded) { try { learnerStorage.setItem(key, JSON.stringify({ signature, state })); } catch { /* Never block an answer on storage. */ } }
  }, [state, key, signature, loaded]);
  const patch = (values: Partial<T>) => setState(previous => ({ ...previous, ...values }));
  return { state, patch, loaded };
}

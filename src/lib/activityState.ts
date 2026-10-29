import type { ActivityTask } from "@/data/types";
import { activityStorageKey } from "./courseActivity";

/** Non-security content fingerprint: changed prompts never inherit checked-answer evidence. */
export function taskSignature(task: ActivityTask): string {
  if (task.compatibleWithSignature) return task.compatibleWithSignature;
  let hash = 2166136261;
  for (const char of JSON.stringify(task)) hash = Math.imul(hash ^ char.charCodeAt(0), 16777619);
  return `v${task.contentVersion ?? 1}-${(hash >>> 0).toString(16)}`;
}
export type AttemptState = {
  text: string; previous: string; answers: Record<string, string>; index: number;
  submitted: boolean; checks: string[]; heard: boolean; remaining: number;
  timerPhase: "preparation" | "response"; alternative: boolean; studyNotes: string;
  earlierPrompt: boolean; promptIndex: number; heardPrompts: number[];
};
export const STUDY_REVIEW_CRITERIA = [
  "I reviewed the written prompt and possible response or transcript.",
  "I identified a specific feature of the wording, meaning or organisation to practise.",
  "I understand that written study does not demonstrate listening or spoken performance.",
  "I identified an appropriate next activity or human feedback for the performance skill.",
];
export function initialAttempt(task: ActivityTask): AttemptState {
  return { text: "", previous: "", answers: {}, index: 0, submitted: false, checks: [], heard: !task.audio,
    remaining: task.preparationSeconds ?? task.seconds ?? 0, timerPhase: task.preparationSeconds ? "preparation" : "response",
    alternative: false, studyNotes: "", earlierPrompt: false, promptIndex: 0, heardPrompts: [] };
}
export function attemptKey(exerciseId: string, task: ActivityTask): string {
  return `${activityStorageKey(exerciseId, task.id)}:attempt-v2:${taskSignature(task)}`;
}
export function restoreAttempt(task: ActivityTask, raw: string | null, legacy: string | null): AttemptState {
  const initial = initialAttempt(task);
  try {
    if (!raw && legacy && task.kind === "writing") {
      const old = JSON.parse(legacy);
      if ((task.contentVersion ?? 1) > 1) return { ...initial, previous: typeof old.text === "string" ? old.text : "", earlierPrompt: true };
      return { ...initial, text: typeof old.text === "string" ? old.text : "", previous: typeof old.previous === "string" ? old.previous : "" };
    }
    if (!raw) return initial;
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object") return initial;
    const answers = Object.fromEntries((task.questions ?? []).flatMap(q => typeof saved.answers?.[q.id] === "string" ? [[q.id, saved.answers[q.id]]] : []));
    return { ...initial, answers,
      text: typeof saved.text === "string" ? saved.text : "", previous: typeof saved.previous === "string" ? saved.previous : "",
      index: Number.isInteger(saved.index) ? Math.max(0, Math.min(saved.index, (task.questions?.length ?? 1) - 1)) : 0,
      submitted: saved.submitted === true, heard: saved.heard === true || !task.audio,
      checks: Array.isArray(saved.checks) ? saved.checks.filter((v: unknown) => typeof v === "string" && (task.rubric?.includes(v) || STUDY_REVIEW_CRITERIA.includes(v))) : [],
      remaining: Number.isFinite(saved.remaining) && saved.remaining >= 0 ? saved.remaining : initial.remaining,
      timerPhase: saved.timerPhase === "preparation" && task.preparationSeconds ? "preparation" : "response",
      promptIndex: Number.isInteger(saved.promptIndex) ? Math.max(0, Math.min(saved.promptIndex, (task.spokenItems?.length ?? 1) - 1)) : 0,
      heardPrompts: Array.isArray(saved.heardPrompts) ? saved.heardPrompts.filter((v: unknown) => Number.isInteger(v) && Number(v) >= 0 && Number(v) < (task.spokenItems?.length ?? 0)) : [],
      alternative: saved.alternative === true, studyNotes: typeof saved.studyNotes === "string" ? saved.studyNotes : "", earlierPrompt: saved.earlierPrompt === true,
    };
  } catch { return initial; }
}

function recordingsDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("englishcamp-local-recordings", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("takes");
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error("Recording storage is blocked"));
    request.onsuccess = () => resolve(request.result);
  });
}
/** One latest take per task/prompt; never uploaded. The old take remains if a new save fails. */
export async function saveTake(key: string, blob: Blob): Promise<void> {
  const db = await recordingsDB();
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction("takes", "readwrite"); tx.objectStore("takes").put(blob, key);
      tx.oncomplete = () => resolve(); tx.onerror = () => reject(tx.error); tx.onabort = () => reject(tx.error);
    });
  } finally { db.close(); }
}
export async function loadTake(key: string): Promise<Blob | undefined> {
  const db = await recordingsDB();
  try {
    return await new Promise<Blob | undefined>((resolve, reject) => {
      const request = db.transaction("takes", "readonly").objectStore("takes").get(key);
      request.onsuccess = () => resolve(request.result instanceof Blob ? request.result : undefined);
      request.onerror = () => reject(request.error);
    });
  } finally { db.close(); }
}

const recordingRisks = new Set<string>();
export function hasUnsavedActivity() { return recordingRisks.size > 0; }
export function setRecordingRisk(key: string, risky: boolean) {
  if (risky) recordingRisks.add(key); else recordingRisks.delete(key);
}
export function confirmActivityNavigation(): boolean {
  return !recordingRisks.size || window.confirm("An activity response or recording has not been saved, or recording is still active. Copy your response or save the recording before leaving. Leave anyway?");
}

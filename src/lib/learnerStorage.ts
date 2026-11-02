import { readSessionProfile, type SessionStorage } from "./sessionProfile";

export const PROFILE_DIRECTORY_KEY = "englishcamp-session-learners-v1";
export const learnerPrefix = (number: number) => `englishcamp-learner-v1:${number}:`;
type BrowserStorage = SessionStorage & Pick<Storage, "key" | "length">;

/** Guests keep the original device storage. Named learners have separate tab-local records. */
export function createLearnerStorage(device: SessionStorage, session: SessionStorage): SessionStorage {
  function target(key: string) {
    const profile = readSessionProfile(session);
    return profile ? { storage: session, key: learnerPrefix(profile.number) + key } : { storage: device, key };
  }
  return {
    getItem(key) { const value = target(key); return value.storage.getItem(value.key); },
    setItem(key, data) { const value = target(key); value.storage.setItem(value.key, data); },
    removeItem(key) { const value = target(key); value.storage.removeItem(value.key); },
  };
}

export const learnerStorage: SessionStorage = {
  getItem: key => typeof localStorage === "undefined" ? null : typeof sessionStorage === "undefined" ? localStorage.getItem(key) : createLearnerStorage(localStorage, sessionStorage).getItem(key),
  setItem: (key, value) => { if (typeof localStorage !== "undefined") { if (typeof sessionStorage === "undefined") localStorage.setItem(key, value); else createLearnerStorage(localStorage, sessionStorage).setItem(key, value); } },
  removeItem: key => { if (typeof localStorage !== "undefined") { if (typeof sessionStorage === "undefined") localStorage.removeItem(key); else createLearnerStorage(localStorage, sessionStorage).removeItem(key); } },
};

const excluded = new Set(["englishcamp-settings", "englishcamp-sidebar-sections"]);
export function isLearningKey(key: string) {
  return !excluded.has(key) && !key.startsWith("englishcamp-session-") && !key.startsWith("englishcamp-learner-") &&
    (key.startsWith("englishcamp-") || key.startsWith("srs-") || key === "speedmatch-best");
}

/** Copy, never move or erase, legacy guest learning records into the first named session. */
export function inheritGuestLearning(device: BrowserStorage, session: SessionStorage, number: number) {
  const copied: string[] = [];
  try {
    for (let i = 0; i < device.length; i++) {
      const key = device.key(i);
      if (!key || !isLearningKey(key)) continue;
      const value = device.getItem(key);
      if (value !== null) { const destination = learnerPrefix(number) + key; session.setItem(destination, value); copied.push(destination); }
    }
  } catch (error) { copied.forEach(key => session.removeItem(key)); throw error; }
}

export function removeLearnerRecords(session: BrowserStorage, number: number) {
  const prefix = learnerPrefix(number), keys: string[] = [];
  for (let i = 0; i < session.length; i++) { const key = session.key(i); if (key?.startsWith(prefix)) keys.push(key); }
  keys.forEach(key => session.removeItem(key));
}

/** Recording blobs use an opaque tab ID as well as the learner number: tabs share IndexedDB. */
export function learnerRecordingPrefix(number?: number): string {
  if (typeof sessionStorage === "undefined") return "";
  const profile = readSessionProfile(sessionStorage);
  if (number === undefined && !profile) return "";
  const key = "englishcamp-session-recording-id-v1";
  let tab = sessionStorage.getItem(key);
  if (!tab) { tab = crypto.randomUUID(); sessionStorage.setItem(key, tab); }
  return `englishcamp-named-recording:${tab}:${number ?? profile!.number}:`;
}

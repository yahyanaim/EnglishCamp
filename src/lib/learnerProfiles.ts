import { createSessionProfile, readSessionProfile, saveSessionProfile, PROFILE_KEY, SIGN_IN_COUNT_KEY, type SessionProfile, type SessionStorage } from "./sessionProfile";
import { PROFILE_DIRECTORY_KEY, inheritGuestLearning, removeLearnerRecords } from "./learnerStorage";

type Directory = { version: 1; inheritedGuest: boolean; profiles: SessionProfile[] };
export const learnerNameKey = (name: string) => name.normalize("NFKC").trim().replace(/\s+/g, " ").toLowerCase();
export function readLearnerDirectory(session: SessionStorage): Directory {
  try {
    const data = JSON.parse(session.getItem(PROFILE_DIRECTORY_KEY) || "null");
    if (data?.version === 1 && Array.isArray(data.profiles)) {
      const profiles = data.profiles.filter((profile: unknown) => readSessionProfile({ getItem: () => JSON.stringify(profile), setItem() {}, removeItem() {} }));
      return { version: 1, inheritedGuest: data.inheritedGuest === true, profiles };
    }
  } catch { /* Keep malformed storage out of active learner state. */ }
  return { version: 1, inheritedGuest: false, profiles: [] };
}

export function startLearnerSession(device: Storage, session: Storage, name: string, random: number) {
  const validated = createSessionProfile(name, session.getItem(SIGN_IN_COUNT_KEY), random);
  const directory = readLearnerDirectory(session);
  const current = readSessionProfile(session);
  if (current && !directory.profiles.some(p => p.number === current.number)) directory.profiles.push(current);
  const existing = directory.profiles.find(p => learnerNameKey(p.name) === learnerNameKey(validated.name));
  const profile = existing || validated;
  if (!directory.inheritedGuest) inheritGuestLearning(device, session, profile.number);
  if (!existing) {
    directory.profiles.push(profile);
  }
  directory.inheritedGuest = true;
  // Write the directory before the active pointer; failed writes never switch progress owners.
  session.setItem(PROFILE_DIRECTORY_KEY, JSON.stringify(directory));
  if (existing) session.setItem(PROFILE_KEY, JSON.stringify(profile));
  else saveSessionProfile(session, profile);
  return profile;
}

export function deleteLearnerSession(session: Storage, profile: SessionProfile) {
  const directory = readLearnerDirectory(session);
  directory.profiles = directory.profiles.filter(p => p.number !== profile.number);
  session.setItem(PROFILE_DIRECTORY_KEY, JSON.stringify(directory));
  removeLearnerRecords(session, profile.number);
  session.removeItem(PROFILE_KEY);
}

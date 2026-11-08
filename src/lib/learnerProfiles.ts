import { createSessionProfile, readSessionProfile, saveSessionProfile, PROFILE_KEY, SIGN_IN_COUNT_KEY, type SessionProfile, type SessionStorage } from "./sessionProfile";
import { PROFILE_DIRECTORY_KEY, inheritGuestLearning, removeLearnerRecords, learnerPrefix, cloudLearnerPrefix } from "./learnerStorage";
import type { CloudAccount } from './cloudProgress';

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
  const existing = directory.profiles.find(p => !p.cloudId && learnerNameKey(p.name) === learnerNameKey(validated.name));
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

/** Cloud identity is the server ID, never the display name. Copy local data before switching its pointer. */
export function activateCloudLearner(device:Storage,session:Storage,account:CloudAccount,linkCurrent=false){
 const directory=readLearnerDirectory(session),current=readSessionProfile(session);
 const known=directory.profiles.find(p=>p.cloudId===account.id);
 const local=linkCurrent&&current&&!current.cloudId?current:known;
 const nextNumber=Math.max(Number(session.getItem(SIGN_IN_COUNT_KEY))||0,...directory.profiles.map(p=>p.number))+1;
 const profile:SessionProfile={...(local??createSessionProfile(account.name,String(nextNumber-1),0)),name:account.name,fruit:account.fruit as SessionProfile['fruit'],cloudId:account.id,cloudNumber:account.number};
 if(linkCurrent&&local){const prefix=learnerPrefix(local.number);for(let i=0;i<session.length;i++){const key=session.key(i);if(key?.startsWith(prefix)){const value=session.getItem(key);if(value!==null)device.setItem(cloudLearnerPrefix(account.id)+key.slice(prefix.length),value);}}}
 directory.profiles=directory.profiles.filter(p=>p.number!==profile.number);directory.profiles.push(profile);directory.inheritedGuest=true;
 session.setItem(PROFILE_DIRECTORY_KEY,JSON.stringify(directory));saveSessionProfile(session,profile);return profile;
}

export function deleteLearnerSession(session: Storage, profile: SessionProfile, device?:Storage) {
  const directory = readLearnerDirectory(session);
  directory.profiles = directory.profiles.filter(p => p.number !== profile.number);
  session.setItem(PROFILE_DIRECTORY_KEY, JSON.stringify(directory));
  removeLearnerRecords(session, profile.number);
  if(profile.cloudId&&device){const prefix=cloudLearnerPrefix(profile.cloudId),keys:string[]=[];for(let i=0;i<device.length;i++){const key=device.key(i);if(key?.startsWith(prefix))keys.push(key);}keys.forEach(key=>device.removeItem(key));}
  session.removeItem(PROFILE_KEY);
}

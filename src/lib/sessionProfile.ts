export const PROFILE_KEY = "englishcamp-session-profile-v1";
export const SIGN_IN_COUNT_KEY = "englishcamp-session-sign-ins-v1";
export const FRUITS = ["apple", "pear", "orange", "lemon", "cherry", "strawberry", "grapes", "peach"] as const;
export type Fruit = typeof FRUITS[number];
export type SessionProfile = { version: 1; name: string; fruit: Fruit; number: number };
export type SessionStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;

export function profileTag(profile: SessionProfile) {
  const name = profile.name.normalize("NFKC").toLowerCase().replace(new RegExp("[^\\p{L}\\p{N}]+", "gu"), "").slice(0, 20) || "learner";
  return `#${name}-${String(profile.number).padStart(4, "0")}`;
}

export function readSessionProfile(storage: SessionStorage): SessionProfile | null {
  try {
    const profile = JSON.parse(storage.getItem(PROFILE_KEY) || "null");
    if (profile?.version !== 1 || typeof profile.name !== "string" || !profile.name.trim() || profile.name.length > 40 || !FRUITS.includes(profile.fruit) || !Number.isSafeInteger(profile.number) || profile.number < 1) return null;
    return { version: 1, name: profile.name, fruit: profile.fruit, number: profile.number };
  } catch { return null; }
}

export function createSessionProfile(name: string, previousCount: string | null, randomValue: number): SessionProfile {
  const cleanName = name.normalize("NFKC").replace(new RegExp("[\\p{Cc}\\p{Cf}]", "gu"), "").trim().replace(/\s+/g, " ");
  if (!cleanName || cleanName.length > 40) throw new Error("Enter a name with 1–40 characters.");
  const oldCount = Number(previousCount);
  const number = Number.isSafeInteger(oldCount) && oldCount >= 0 && oldCount < Number.MAX_SAFE_INTEGER ? oldCount + 1 : 1;
  const fruitIndex = Math.min(FRUITS.length - 1, Math.max(0, Math.floor(randomValue * FRUITS.length)));
  return { version: 1, name: cleanName, fruit: FRUITS[Number.isFinite(fruitIndex) ? fruitIndex : 0], number };
}

export function saveSessionProfile(storage: SessionStorage, profile: SessionProfile) {
  storage.setItem(SIGN_IN_COUNT_KEY, String(profile.number));
  storage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function clearSessionProfile(storage: SessionStorage) { storage.removeItem(PROFILE_KEY); }

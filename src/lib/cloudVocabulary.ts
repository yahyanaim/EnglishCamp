/**
 * Word bank sync. Each saved word carries `updatedAt`; a deleted word leaves a dated tombstone
 * in `removed` so a deletion on one device is not undone by another device's older copy.
 * Merging is commutative and idempotent, so devices converge whatever order they sync in.
 */
export type CloudWord = {
  de: string; en: string; category: string; notes: string; addedAt: string; updatedAt: string;
  timesReviewed: number; lastReview: string | null; mastery: 0 | 1 | 2 | 3;
  example?: string; definition?: string; translationKind?: "word" | "context";
};
export type CloudVocabulary = { words: Record<string, CloudWord>; removed: Record<string, string> };
export const MAX_SYNCED_WORDS = 2500;
const TOMBSTONE_DAYS = 365;

const object = (value: unknown): Record<string, any> => value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, any> : {};
const text = (value: unknown, max: number) => typeof value === "string" ? value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/g, "").slice(0, max) : "";
const date = (value: unknown) => typeof value === "string" && Number.isFinite(Date.parse(value)) ? new Date(value).toISOString() : null;
const validId = (id: string) => id.length > 0 && id.length <= 160 && !["__proto__", "constructor", "prototype"].includes(id) && !/[\u0000-\u001f\u007f]/.test(id);
export const wordStamp = (word: Pick<CloudWord, "updatedAt" | "addedAt">) => word.updatedAt || word.addedAt;

export function cleanWord(value: unknown): CloudWord | null {
  const w = object(value), de = text(w.de, 200).trim(), addedAt = date(w.addedAt);
  if (!de || !addedAt) return null;
  const mastery = [0, 1, 2, 3].includes(w.mastery) ? w.mastery as CloudWord["mastery"] : 0;
  const reviews = typeof w.timesReviewed === "number" && Number.isFinite(w.timesReviewed) ? Math.min(100000, Math.max(0, Math.floor(w.timesReviewed))) : 0;
  return {
    de, en: text(w.en, 400), category: text(w.category, 60) || "general", notes: text(w.notes, 2000), addedAt,
    updatedAt: date(w.updatedAt) ?? addedAt, timesReviewed: reviews, lastReview: date(w.lastReview), mastery,
    ...(text(w.example, 500) ? { example: text(w.example, 500) } : {}),
    ...(text(w.definition, 500) ? { definition: text(w.definition, 500) } : {}),
    ...(w.translationKind === "word" || w.translationKind === "context" ? { translationKind: w.translationKind } : {}),
  };
}

export function cleanVocabulary(value: unknown, now = Date.now()): CloudVocabulary {
  const v = object(value), words: Record<string, CloudWord> = {}, removed: Record<string, string> = {};
  const cutoff = now - TOMBSTONE_DAYS * 86400000;
  for (const [id, raw] of Object.entries(object(v.words))) { const word = validId(id) && cleanWord(raw); if (word) words[id] = word; }
  for (const [id, at] of Object.entries(object(v.removed))) { const stamp = validId(id) && date(at); if (stamp && Date.parse(stamp) >= cutoff) removed[id] = stamp; }
  // A word saved again after it was deleted is live; an older copy stays deleted.
  for (const id of Object.keys(removed)) if (words[id] && wordStamp(words[id]) > removed[id]) delete removed[id]; else delete words[id];
  const kept = Object.entries(words).sort(([, a], [, b]) => wordStamp(b).localeCompare(wordStamp(a))).slice(0, MAX_SYNCED_WORDS);
  const tombstones = Object.entries(removed).sort(([, a], [, b]) => b.localeCompare(a)).slice(0, MAX_SYNCED_WORDS);
  return { words: Object.fromEntries(kept), removed: Object.fromEntries(tombstones) };
}

export function mergeVocabulary(left: unknown, right: unknown): CloudVocabulary {
  const a = cleanVocabulary(left), b = cleanVocabulary(right);
  const words: Record<string, CloudWord> = { ...a.words };
  for (const [id, word] of Object.entries(b.words)) {
    const old = words[id];
    if (!old) { words[id] = word; continue; }
    const newer = wordStamp(word) > wordStamp(old) || (wordStamp(word) === wordStamp(old) && JSON.stringify(word) > JSON.stringify(old)) ? word : old;
    const lastReview = [old.lastReview, word.lastReview].filter((d): d is string => !!d).sort().at(-1) ?? null;
    words[id] = { ...newer, addedAt: [old.addedAt, word.addedAt].sort()[0], timesReviewed: Math.max(old.timesReviewed, word.timesReviewed), lastReview };
  }
  const removed: Record<string, string> = { ...a.removed };
  for (const [id, at] of Object.entries(b.removed)) if (!removed[id] || at > removed[id]) removed[id] = at;
  return cleanVocabulary({ words, removed });
}

export const sameVocabulary = (a: CloudVocabulary, b: CloudVocabulary) => JSON.stringify(sortKeys(a)) === JSON.stringify(sortKeys(b));
function sortKeys(v: CloudVocabulary) {
  const order = (r: Record<string, unknown>) => Object.fromEntries(Object.keys(r).sort().map(k => [k, r[k]]));
  return { words: order(Object.fromEntries(Object.entries(v.words).map(([k, w]) => [k, order(w as unknown as Record<string, unknown>)]))), removed: order(v.removed) };
}

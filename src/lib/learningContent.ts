import { CEFR_LEVELS, type CefrLevel } from "@/data/placement/cefr";
import type { ReadingLesson } from "@/data/reading-lessons";
import { validateQuestions } from "./comprehension";
import { BUNDLED_LISTENING, safeVoaAudio, voaArticleId, VOA_ATTRIBUTION, type ListeningLesson } from "./listeningLessons";

export type ContentKind = "reading" | "listening";
/** Administrator decisions about bundled lessons. Stored in D1; bundled data is never edited. */
export type ContentState = { status: "published" | "hidden"; level?: CefrLevel };
export type ContentCatalogue = { states: Record<string, ContentState>; reading: ReadingLesson[]; listening: ListeningLesson[] };

const clean = (value: unknown, max: number) => typeof value === "string" ? value.normalize("NFKC").replace(/[\u0000-\u0008\u000b-\u001f\u007f​-‏‪-‮⁦-⁩]/g, "").replace(/[ \t]+/g, " ").trim().slice(0, max) : "";
const level = (value: unknown): CefrLevel | null => CEFR_LEVELS.find(item => item === value) ?? null;
const arabic = /[؀-ۿ]/;
export const contentId = (value: unknown) => typeof value === "string" && /^[a-z0-9][a-z0-9-]{2,63}$/.test(value) ? value : null;

export type ValidationResult<T> = { value: T | null; errors: string[] };

/** Plain text only. React escapes it on display; no HTML from administrators or VOA is rendered. */
export function validateReadingPayload(input: unknown, id: string, publishing: boolean): ValidationResult<ReadingLesson> {
  const data = input && typeof input === "object" ? input as Record<string, unknown> : {}, errors: string[] = [];
  const title = clean(data.title, 120), category = clean(data.category, 40), cefr = level(data.level);
  const paragraphs = (Array.isArray(data.paragraphs) ? data.paragraphs : []).map(p => clean(p, 2000)).filter(Boolean).slice(0, 12);
  const glossary = (Array.isArray(data.glossary) ? data.glossary : []).slice(0, 30).map(entry => {
    const e = entry && typeof entry === "object" ? entry as Record<string, unknown> : {};
    return { word: clean(e.word, 60), ar: clean(e.ar, 200), def: clean(e.def, 300) };
  }).filter(e => e.word);
  if (!title) errors.push("Add a title (up to 120 characters).");
  if (!cefr) errors.push("Choose a CEFR level.");
  if (!category) errors.push("Add a category.");
  if (!paragraphs.length) errors.push("Add at least one English paragraph.");
  if (glossary.some(e => !arabic.test(e.ar))) errors.push("Every glossary word needs an Arabic translation.");
  const checked = validateQuestions(data.questions, paragraphs.join(" "));
  if (publishing) errors.push(...checked.errors);
  if (errors.length && publishing) return { value: null, errors };
  if (!title || !cefr || !category || !paragraphs.length) return { value: null, errors };
  return { value: { id, title, level: cefr, category, paragraphs, glossary: glossary.filter(e => arabic.test(e.ar)), questions: checked.errors.length ? [] : checked.questions.map(q => ({ ...q, id: `${id}-${q.id}` })), status: "review", source: "admin" }, errors: [...errors, ...checked.errors] };
}

export function validateListeningPayload(input: unknown, id: string, publishing: boolean): ValidationResult<ListeningLesson> {
  const data = input && typeof input === "object" ? input as Record<string, unknown> : {}, errors: string[] = [];
  const title = clean(data.title, 120), description = clean(data.description, 300), topic = clean(data.topic, 40), cefr = level(data.level);
  const seconds = Number(data.seconds), audioUrl = safeVoaAudio(data.audioUrl), article = voaArticleId(data.sourceUrl);
  const transcript = typeof data.transcript === "string" ? data.transcript.normalize("NFKC").replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "").trim().slice(0, 6000) : "";
  const words = (Array.isArray(data.words) ? data.words : []).slice(0, 20).map(entry => {
    const e = entry && typeof entry === "object" ? entry as Record<string, unknown> : {};
    return { word: clean(e.word, 60), arabic: clean(e.arabic, 200), example: clean(e.example, 300) };
  }).filter(e => e.word);
  if (!title) errors.push("Add a title.");
  if (!description) errors.push("Add a short description.");
  if (!topic) errors.push("Add a topic.");
  if (!cefr) errors.push("Assign a CEFR level after listening to the recording.");
  if (!Number.isFinite(seconds) || seconds < 5 || seconds > 1800) errors.push("Enter the checked audio duration in seconds (5–1800).");
  if (!audioUrl) errors.push("Use a VOA MP3 address from voa-audio.voanews.eu.");
  if (!article) errors.push("Use the VOA Learning English article address (learningenglish.voanews.com/a/….html).");
  if (words.some(e => !arabic.test(e.arabic))) errors.push("Every listed word needs an Arabic translation.");
  const checked = validateQuestions(data.questions, transcript || null);
  if (publishing) errors.push(...checked.errors);
  const required = title && description && topic && cefr && audioUrl && article && Number.isFinite(seconds) && seconds >= 5 && seconds <= 1800;
  if (!required || (publishing && errors.length)) return { value: null, errors };
  return { value: {
    id, title, description, level: cefr!, topic, seconds: Math.round(seconds * 100) / 100, ...(data.excerpt === true ? { excerpt: true } : {}),
    audioUrl: audioUrl!, sourceUrl: `https://learningenglish.voanews.com/a/${article}.html`, attribution: VOA_ATTRIBUTION,
    ...(transcript ? { transcript } : {}), words: words.filter(e => arabic.test(e.arabic)),
    questions: checked.errors.length ? [] : checked.questions.map(q => ({ ...q, id: `${id}-${q.id}` })), status: "review", origin: "imported",
  }, errors: [...errors, ...checked.errors] };
}

/** Applies administrator states to bundled lessons and appends published administrator lessons. */
export function applyCatalogue<T extends { id: string; level: CefrLevel; status: "published" | "review" }>(bundled: readonly T[], states: Record<string, ContentState>, added: readonly T[]): T[] {
  const ids = new Set(bundled.map(item => item.id));
  return [
    ...bundled.map(item => {
      const state = states[item.id];
      return { ...item, level: state?.level ?? item.level, status: state ? (state.status === "published" ? "published" : "review") : item.status } as T;
    }),
    ...added.filter(item => !ids.has(item.id)).map(item => ({ ...item, status: "published" }) as T),
  ].filter(item => item.status === "published");
}

let pending: Promise<ContentCatalogue | null> | null = null;
/** One small request per page load. Offline or static previews fall back to the reviewed bundle. */
export function loadCatalogue(): Promise<ContentCatalogue | null> {
  if (typeof fetch === "undefined") return Promise.resolve(null);
  pending ??= fetch("/api/content/catalogue", { credentials: "same-origin" })
    .then(async response => response.ok ? await response.json() as ContentCatalogue : null)
    .then(data => data && typeof data === "object" && data.states && Array.isArray(data.reading) && Array.isArray(data.listening) ? data : null)
    .catch(() => null);
  return pending;
}
export const publishedListening = (catalogue: ContentCatalogue | null) => applyCatalogue(BUNDLED_LISTENING, catalogue?.states ?? {}, catalogue?.listening ?? []);

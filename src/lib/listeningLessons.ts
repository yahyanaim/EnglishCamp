import { VOA_LISTENING, VOA_ORIGIN, voaArticleUrl, type VoaListeningClip } from "@/data/voa-listening";
import { CEFR_LEVELS, type CefrLevel } from "@/data/placement/cefr";
import { placeCorrect, type ComprehensionQuestion } from "./comprehension";

export type ListeningWord = { word: string; arabic: string; example: string };
export type ListeningLesson = {
  id: string;
  title: string;
  description: string;
  /** EnglishCamp's teaching estimate, not VOA's own difficulty label. */
  level: CefrLevel;
  topic: string;
  seconds: number;
  /** Play only the first `seconds` of a longer recording. */
  excerpt?: boolean;
  audioUrl: string;
  sourceUrl: string;
  attribution: string;
  transcript?: string;
  words: ListeningWord[];
  questions: ComprehensionQuestion[];
  status: "published" | "review";
  origin: "bundled" | "imported";
};

export const VOA_ATTRIBUTION = "Audio and transcript: VOA Learning English (public domain). Questions and translations: EnglishCamp.";
const AUDIO_HOST = "https://voa-audio.voanews.eu";

/** Only VOA's own MP3 host is accepted for playback. */
export function safeVoaAudio(value: unknown): string | null {
  if (typeof value !== "string" || value.length > 300) return null;
  try {
    const url = new URL(value);
    return url.origin === AUDIO_HOST && /^\/vle\/[0-9/]+\/[\w-]+\.mp3$/.test(url.pathname) && !url.username && !url.password && !url.search && !url.hash ? url.href : null;
  } catch { return null; }
}
/** VOA Learning English article pages only: https://learningenglish.voanews.com/a/<id>.html */
export function voaArticleId(value: unknown): number | null {
  if (typeof value !== "string" || value.length > 300) return null;
  try {
    const url = new URL(value.trim());
    const match = url.pathname.match(/^\/a\/(?:[\w-]+\/)?(\d{5,9})\.html$/);
    return url.origin === VOA_ORIGIN && match && !url.username && !url.password ? Number(match[1]) : null;
  } catch { return null; }
}

/**
 * Builds a varied exercise set from reviewed clip data only: a main-idea question (other clips'
 * summaries as distractors), the remaining detail question, a true/false restatement and,
 * when a published transcript excerpt exists, a gap fill copied from it.
 */
export function clipQuestions(clip: VoaListeningClip, catalogue: readonly VoaListeningClip[] = VOA_LISTENING): ComprehensionQuestion[] {
  const peers = catalogue.filter(other => other.level === clip.level && other.id !== clip.id);
  const start = catalogue.indexOf(clip) % Math.max(1, peers.length);
  const distractors = [peers[start], peers[(start + 1) % peers.length]].filter((item, i, all) => item && all.indexOf(item) === i).map(item => item!.description);
  const mainId = `${clip.id}-main`;
  const questions: ComprehensionQuestion[] = [{
    id: mainId, type: "multiple-choice", skill: "main-idea", prompt: "What is the recording mainly about?",
    ...placeCorrect(mainId, [clip.description, ...distractors]), evidence: clip.description,
    feedback: clip.description,
  }];
  const kept = clip.questions[clip.trueFalse.replaces === 0 ? 1 : 0];
  questions.push({ id: `${clip.id}-detail`, type: "multiple-choice", skill: "detail", prompt: kept.prompt, choices: [...kept.choices], correct: kept.correct, evidence: kept.feedback, feedback: kept.feedback });
  questions.push({ id: `${clip.id}-true-false`, type: "true-false", skill: "detail", prompt: clip.trueFalse.statement, correct: clip.trueFalse.correct, evidence: clip.trueFalse.feedback, feedback: clip.trueFalse.feedback });
  if (clip.gap && clip.transcriptExcerpt) questions.push({ id: `${clip.id}-gap`, type: "gap-fill", skill: "detail", prompt: clip.gap.prompt, answers: [clip.gap.answer], evidence: clip.gap.prompt.replace("___", clip.gap.answer), feedback: `The speaker says: “${clip.gap.prompt.replace("___", clip.gap.answer)}”` });
  return questions;
}

export const BUNDLED_LISTENING: readonly ListeningLesson[] = VOA_LISTENING.map(clip => ({
  id: clip.id, title: clip.title, description: clip.description, level: clip.level, topic: clip.topic, seconds: clip.seconds,
  ...(clip.excerpt ? { excerpt: true } : {}), audioUrl: clip.audioUrl, sourceUrl: voaArticleUrl(clip.articleId), attribution: VOA_ATTRIBUTION,
  ...(clip.transcriptExcerpt ? { transcript: clip.transcriptExcerpt } : {}),
  words: clip.words.map(word => ({ ...word })), questions: clipQuestions(clip), status: "published", origin: "bundled",
}));

export const levelOrder = (level: CefrLevel) => CEFR_LEVELS.indexOf(level);

/** Suggests the next unfinished lesson at the learner's level, then the nearest levels. */
export function recommendLessons<T extends { id: string; level: CefrLevel }>(lessons: readonly T[], done: (id: string) => boolean, level?: CefrLevel, count = 3): T[] {
  const open = lessons.filter(lesson => !done(lesson.id));
  if (!open.length) return [];
  const finished = lessons.filter(lesson => done(lesson.id)).map(lesson => levelOrder(lesson.level));
  const target = level ? levelOrder(level) : finished.length ? Math.max(...finished) : Math.min(...open.map(lesson => levelOrder(lesson.level)));
  return [...open].sort((a, b) => Math.abs(levelOrder(a.level) - target) - Math.abs(levelOrder(b.level) - target) || levelOrder(a.level) - levelOrder(b.level)).slice(0, count);
}

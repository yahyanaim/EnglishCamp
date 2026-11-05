import { type PlacementLevel } from '@/data/placement/questions';

import { CEFR_LEVELS as PLACEMENT_LEVELS } from '@/data/placement/cefr';
export const SPEAKING_ASSESSMENT_VERSION = 'englishcamp-speaking-v2';
export const SPEAKING_CONSENT_VERSION = 'speaking-openai-v1';
export const SPEAKING_DIMENSIONS = ['intelligibility', 'fluency', 'grammar', 'vocabulary'] as const;
export type SpeakingDimension = typeof SPEAKING_DIMENSIONS[number];
export const speakingDimensionLabel: Record<SpeakingDimension, string> = {
  intelligibility: 'Clarity', fluency: 'Fluency and coherence', grammar: 'Grammar', vocabulary: 'Vocabulary',
};
export type SpeakingAssessment = {
  version: typeof SPEAKING_ASSESSMENT_VERSION|'englishcamp-speaking-v1';
  provider: 'OpenAI'; model: string; assessedAt: string; taskId: string; audioHash: string;
  transcript: string; taskAchievement: number;
  dimensions: Record<SpeakingDimension, { score: number; evidence: string }>;
  strengths: string[]; nextSteps: string[];
};
const text = (v: unknown, limit: number): v is string => typeof v === 'string' && v.trim().length > 0 && v.length <= limit;
/** The provider response is untrusted. Invalid, missing or out-of-range evidence never becomes a grade. */
export function validSpeakingAssessment(value: unknown, taskId: string): SpeakingAssessment | null {
  if (!value || typeof value !== 'object') return null;
  const a = value as SpeakingAssessment;
  if (![SPEAKING_ASSESSMENT_VERSION,'englishcamp-speaking-v1'].includes(a.version) || a.provider !== 'OpenAI' || a.taskId !== taskId ||
      !text(a.model, 100) || !Number.isFinite(Date.parse(a.assessedAt)) || !/^[a-f0-9]{64}$/.test(a.audioHash) ||
      !text(a.transcript, 10000) || !Number.isInteger(a.taskAchievement) || a.taskAchievement < 0 || a.taskAchievement > 4) return null;
  if (!SPEAKING_DIMENSIONS.every(k => Number.isInteger(a.dimensions?.[k]?.score) && a.dimensions[k].score >= 0 && a.dimensions[k].score <= (a.version==='englishcamp-speaking-v1'?5:6) && text(a.dimensions[k].evidence, 600))) return null;
  if (![a.strengths, a.nextSteps].every(items => Array.isArray(items) && items.length > 0 && items.length <= 3 && items.every(item => text(item, 400)))) return null;
  return { version: a.version, provider: a.provider, model: a.model, assessedAt: a.assessedAt, taskId, audioHash: a.audioHash,
    transcript: a.transcript, taskAchievement: a.taskAchievement,
    dimensions: Object.fromEntries(SPEAKING_DIMENSIONS.map(k => [k, { score: a.dimensions[k].score, evidence: a.dimensions[k].evidence }])) as SpeakingAssessment['dimensions'],
    strengths: [...a.strengths], nextSteps: [...a.nextSteps] };
}
/** Ordinal rubric: 0 below A1 evidence, 1 A1 ... 5 C1. This is an authored study rubric, not a validated CEFR conversion. */
export function speakingBand(a: SpeakingAssessment, taskLevel: PlacementLevel): number {
  const scores = SPEAKING_DIMENSIONS.map(k => a.dimensions[k].score);
  const supported = Math.min(Math.floor(scores.reduce((s, n) => s + n, 0) / scores.length), Math.min(...scores) + 1);
  // A simple introduction cannot establish advanced proficiency; an off-task response cannot establish a band.
  return a.taskAchievement >= 2 ? Math.min(supported, PLACEMENT_LEVELS.indexOf(taskLevel) + 1) : 0;
}
export const studyBand = (index: number): PlacementLevel => PLACEMENT_LEVELS[Math.max(0, Math.min(5, index - 1))];

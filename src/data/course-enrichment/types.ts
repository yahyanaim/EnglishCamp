import type { LessonPrinciple } from "../lesson-principles/types";
import type { TeachingDiagram } from "../teaching-diagrams/types";
/** Additive teaching material: never included in activity signatures or scoring. */
export type TeachingVideo = {
  id: string;
  title: string;
  publisher: string;
  source: string;
  reviewed: string;
  segment: string;
  start: number;
  end?: number;
  before: string;
  notice: string;
  after: string;
  alternative: string;
  /** Explicitly identifies a supporting skill or an uncovered part of a mixed module. */
  coverage?: string;
};
export type TeachingVisual = { src: string; alt: string; caption: string; width: number; height: number };
export type SourcedTeachingImage = TeachingVisual & {
  title: string;
  creator: string;
  source: string;
  license: string;
  licenseUrl: string;
  changes: string;
};
export type VisualExplanation = {
  title: string;
  introduction: string;
  images: SourcedTeachingImage[];
  prompt: string;
  explanation: string;
};
export type InlineLessonImages = VisualExplanation & {
  /** Exact existing teaching heading; images follow its full explanation. */
  placement: { heading: string };
};
export type CourseEnrichment = {
  inlineImages?: InlineLessonImages;
  teachingDiagram?: TeachingDiagram;
  principle?: LessonPrinciple;
  title: string;
  context: string;
  before: string;
  after: string;
  reasoning: string;
  rows: [string, string, string][];
  transfer: { prompt: string; answer: string };
  visual?: TeachingVisual;
  video?: TeachingVideo;
  visualExplanation?: VisualExplanation;
};

export function example(
  title: string, context: string, before: string, after: string, reasoning: string,
  rows: [string, string, string][], prompt: string, answer: string,
): CourseEnrichment {
  return { title, context, before, after, reasoning, rows, transfer: { prompt, answer } };
}

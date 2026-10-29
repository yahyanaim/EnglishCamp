import type { InlineLessonImages } from "../course-enrichment/types";
import { lessonImageAssets } from "./assets";

type AuthoredImageLesson = {
  heading: string;
  title: string;
  introduction: string;
  assets: string[];
  prompt: string;
  explanation: string;
};

/** Explicit authored placements; no keyword-based matching at runtime. */
export function defineImageLessons(entries: Record<string, AuthoredImageLesson>): Record<string, InlineLessonImages> {
  return Object.fromEntries(Object.entries(entries).map(([id, entry]) => [id, {
    title: entry.title,
    introduction: entry.introduction,
    images: entry.assets.map(key => {
      const image = lessonImageAssets[key];
      if (!image) throw new Error(`Missing lesson image: ${id}/${key}`);
      return image;
    }),
    placement: { heading: entry.heading },
    prompt: entry.prompt,
    explanation: entry.explanation,
  }]));
}

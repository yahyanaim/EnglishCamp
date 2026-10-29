import type { CourseActivityData } from "@/data/types";
/** Display-only correction: retain historical task content fingerprints and saved responses. */
export function courseLabel(text: string): string {
  return text.replaceAll("Vocabulary: AWL Sublists 4-5", "Vocabulary: precise claims and natural collocations");
}

/** Planning must expose its target before the independent response is unlocked. */
export function planningPrompt(data: CourseActivityData, stage: number): string | undefined {
  return stage === 0 && data.tasks[0].title === "Guided task planning" ? data.tasks[1].instructions : undefined;
}

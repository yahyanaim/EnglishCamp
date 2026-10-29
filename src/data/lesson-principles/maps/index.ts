import { foundationRuleMaps } from "./foundation";
import { academicRuleMaps } from "./academic";
import { toeflRuleMaps } from "./toefl";
import { generalRuleMaps } from "./general";
import type { LessonRuleMap } from "./types";

export const lessonRuleMaps: Record<string, LessonRuleMap> = {
  ...foundationRuleMaps, ...academicRuleMaps, ...toeflRuleMaps, ...generalRuleMaps,
};

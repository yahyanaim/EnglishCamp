import { foundationPrinciples } from "./foundation";
import { academicPrinciples } from "./academic";
import { toeflPrinciples } from "./toefl";
import { generalPrinciples } from "./general";
import type { LessonPrinciple } from "./types";
import { lessonRuleMaps } from "./maps";

/** Original concept explanations; serialized only for the selected lesson. */
export const lessonPrinciples: Record<string, LessonPrinciple> = {
  ...foundationPrinciples, ...academicPrinciples, ...toeflPrinciples, ...generalPrinciples,
};

for (const [lessonId, map] of Object.entries(lessonRuleMaps)) {
  lessonPrinciples[lessonId].ruleMap = map;
}

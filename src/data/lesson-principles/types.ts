import type { LessonRuleMap } from "./maps/types";

export type LessonPrinciple = {
  ruleMap?: LessonRuleMap;
  title: string;
  statement: string;
  explanation: string;
  example: string;
  interpretation: string;
};

export function principle(title: string, statement: string, explanation: string, example: string, interpretation: string): LessonPrinciple {
  return { title, statement, explanation, example, interpretation };
}

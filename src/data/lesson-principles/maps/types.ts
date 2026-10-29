export type RuleBranch = { label: string; rule: string; example: string };
export type LessonRuleMap = { root: string; branches: [RuleBranch, RuleBranch, RuleBranch] };
type BranchInput = [label: string, rule: string, example: string];
export function ruleMap(root: string, ...branches: [BranchInput, BranchInput, BranchInput]): LessonRuleMap {
  return { root, branches: branches.map(([label, rule, example]) => ({ label, rule, example })) as LessonRuleMap["branches"] };
}

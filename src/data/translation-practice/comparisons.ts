import { COMPARISON_RULES } from "../vergleiche";
import { fromRules } from "./rules";
export const comparisons = fromRules(COMPARISON_RULES, "comparison");

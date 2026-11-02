import { FRAGEN_RULES } from "../fragen";
import { fromRules } from "./rules";
export const questions = fromRules(FRAGEN_RULES, "question");

import { SENTENCE_PATTERNS } from "../satzmuster";
export const patterns = SENTENCE_PATTERNS.flatMap(rule => rule.examples.map((ex, i) => ({ id: `pattern-${rule.id}-${i}`, english: ex.english, arabic: ex.arabic, topic: rule.title })));

import type { TranslationEntry } from "@/lib/translationPractice";
export const fromRules = (rules: { id: string; title: string; examples: { de: string; ar?: string }[] }[], prefix: string): TranslationEntry[] => rules.flatMap(rule => rule.examples.filter(ex => ex.ar).map((ex, i) => ({ id: `${prefix}-${rule.id}-${i}`, english: ex.de, arabic: ex.ar!, topic: rule.title })));

import { COMPOUND_WORDS } from "../da-komposita";
export const compounds = COMPOUND_WORDS.map((item, i) => ({ id: `compound-${i}`, english: item.word, arabic: item.arabic, topic: item.type }));

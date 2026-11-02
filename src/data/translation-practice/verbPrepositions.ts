import { VERB_PREPOSITIONS } from "../verben-mit-prapositionen";
export const verbPrepositions = VERB_PREPOSITIONS.map((item, i) => ({ id: `verb-preposition-${i}`, english: `${item.verb} ${item.preposition}`, arabic: item.arabic, topic: item.meaning }));

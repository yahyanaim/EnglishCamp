import { NOUN_VERB_COLLOCATIONS } from "../nomen-verb-verbindungen";
export const verbNoun = NOUN_VERB_COLLOCATIONS.map((item, i) => ({ id: `verb-noun-${i}`, english: `${item.verb} ${item.noun}`, arabic: item.arabic, topic: item.meaning }));

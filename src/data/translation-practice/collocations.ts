import { COLLOCATIONS } from "../kollokationen";
export const collocations = COLLOCATIONS.map((item, i) => ({ id: `collocation-${i}`, english: item.collocation, arabic: item.arabic, topic: item.type }));

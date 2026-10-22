import type { CollocationEntry } from "./kollokationen";
import { COLLOCATIONS } from "./kollokationen";

export function searchCollocations(query: string): CollocationEntry[] {
  const q = query.toLowerCase();
  return COLLOCATIONS.filter(
    (k) =>
      k.collocation.toLowerCase().includes(q) ||
      k.meaning.toLowerCase().includes(q) ||
      k.example.toLowerCase().includes(q) ||
      k.arabic.toLowerCase().includes(q)
  );
}

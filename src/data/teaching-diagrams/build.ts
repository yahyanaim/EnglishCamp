import { lessonPrinciples } from "../lesson-principles";
import type { ConceptVisual, DiagramNode, TeachingDiagram } from "./types";

export const node = (label: string, detail: string): DiagramNode => ({ label, detail });
export function illustration(id: string, heading: string, visual: ConceptVisual, takeaway?: string): TeachingDiagram {
  const principle = lessonPrinciples[id];
  return {
    kind: "concept", visual, title: principle.title,
    introduction: principle.statement,
    placement: { relation: "after-section", heading },
    takeaway: takeaway ?? principle.interpretation,
  };
}

export function defineIllustrations(entries: Record<string, [string, ConceptVisual, string?]>): Record<string, TeachingDiagram> {
  return Object.fromEntries(Object.entries(entries).map(([id, [heading, visual, takeaway]]) => [id, illustration(id, heading, visual, takeaway)]));
}

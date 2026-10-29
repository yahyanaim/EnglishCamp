export type DiagramNode = { label: string; detail: string };
export type ConceptVisual =
  | { layout: "contrast"; left: DiagramNode; right: DiagramNode; relationship: string; symbol?: "≠" | "+" | "↔" | "→" }
  | { layout: "flow"; nodes: DiagramNode[]; links: string[] }
  | { layout: "argument"; claim: DiagramNode; reason: DiagramNode; example: DiagramNode; limit: DiagramNode }
  | { layout: "sentence"; parts: DiagramNode[]; from: number; to: number; relationship: string }
  | { layout: "evidence"; source: DiagramNode; outcomes: [DiagramNode, DiagramNode, DiagramNode] }
  | { layout: "chart"; bars: { label: string; value: number }[]; unit: string; annotation: string }
  | { layout: "cycle"; centre: string; nodes: [DiagramNode, DiagramNode, DiagramNode, DiagramNode] }
  | { layout: "decision"; question: string; nextQuestion: string; results: [DiagramNode, DiagramNode, DiagramNode] }
  | { layout: "map"; facing: string; turn: string; destination: string }
  | { layout: "sound"; tokens: string[]; prominent: number[]; meaning: string }
  | { layout: "causal"; factor: DiagramNode; first: DiagramNode; second: DiagramNode };

export type TeachingDiagram = {
  kind: "word-family" | "tense-timeline" | "article-decision" | "concept";
  visual?: ConceptVisual;
  title: string;
  introduction: string;
  /** Position is tied to an existing teaching block, without editing that block. */
  placement: { relation: "before" | "after" | "after-section"; heading: string };
  takeaway: string;
  source?: { title: string; url: string };
};

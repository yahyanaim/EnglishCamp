import type { Block } from "@/data/types";
import type { TeachingDiagram } from "@/data/teaching-diagrams/types";
import { LessonContent } from "@/components/lesson/LessonContent";
import { LessonTeachingDiagram } from "./LessonTeachingDiagram";
import type { InlineLessonImages } from "@/data/course-enrichment/types";
import { LessonImageExplanation } from "./LessonImageExplanation";

export function IllustratedLessonContent({ blocks, diagram, images }: { blocks: Block[]; diagram?: TeachingDiagram; images?: InlineLessonImages }) {
  if (!diagram && !images) return <LessonContent blocks={blocks} />;
  const inserts: { at: number; key: string; content: React.ReactNode }[] = [];
  if (diagram) {
  const anchor = blocks.findIndex(block => block.kind === "callout" && block.title === diagram.placement.heading);
  // Retain all teaching if an anchor is changed; coverage tests detect the missing placement.
  let split = anchor < 0 ? blocks.length : anchor + (diagram.placement.relation === "before" ? 0 : 1);
  if (anchor >= 0 && diagram.placement.relation === "after-section") {
    while (split < blocks.length && blocks[split].kind !== "callout") split++;
  }
    inserts.push({ at: split, key: "diagram", content: <LessonTeachingDiagram diagram={diagram} /> });
  }
  if (images) {
    const anchor = blocks.findIndex(block => block.kind === "callout" && block.title === images.placement.heading);
    let split = anchor < 0 ? blocks.length : anchor + 1;
    while (split < blocks.length && blocks[split].kind !== "callout") split++;
    inserts.push({ at: split, key: "images", content: <LessonImageExplanation content={images} /> });
  }
  // Where both support one section, show the concrete image before its conceptual diagram.
  inserts.sort((a, b) => a.at - b.at || (a.key === "images" ? -1 : 1));
  let cursor = 0;
  return <div className="space-y-6">{inserts.map(insert => {
    const segment = blocks.slice(cursor, insert.at);
    cursor = insert.at;
    return <div key={insert.key} className="space-y-6"><LessonContent blocks={segment} />{insert.content}</div>;
  })}<LessonContent blocks={blocks.slice(cursor)} /></div>;
}

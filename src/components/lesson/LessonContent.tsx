"use client";
import { motion } from "framer-motion";
import type { Block } from "@/data/types";
import { TableBlock } from "./TableBlock";
import { CalloutBlock } from "./CalloutBlock";
import { ExamplesBlock } from "./ExamplesBlock";
import { ListBlock } from "./ListBlock";
import { ConjugationBlock } from "./ConjugationBlock";
import { DialogueBlock } from "./DialogueBlock";

interface Props { blocks: Block[] }

type Group =
  | { type: "block"; block: Block }
  | { type: "section"; title: string; paragraphs: string[] }
  | { type: "check"; prompt: string; answer: string };

/** Presentation-only grouping: a titled rule followed by paragraphs reads as one section,
 *  and a "Pause and apply" prompt with its answer becomes one self-check card. Content is unchanged. */
function groupBlocks(blocks: Block[]): Group[] {
  const out: Group[] = [];
  for (let i = 0; i < blocks.length; i++) {
    const b = blocks[i];
    const next = blocks[i + 1];
    if (b.kind === "callout" && b.tone === "rule" && b.title && next?.kind === "p") {
      const paragraphs = [b.text];
      while (blocks[i + 1]?.kind === "p") paragraphs.push((blocks[++i] as Extract<Block, { kind: "p" }>).text);
      out.push({ type: "section", title: b.title, paragraphs });
      continue;
    }
    if (b.kind === "callout" && b.title === "Pause and apply" && next?.kind === "callout" && next.title === "Compare your reasoning") {
      out.push({ type: "check", prompt: b.text, answer: next.text });
      i++;
      continue;
    }
    out.push({ type: "block", block: b });
  }
  return out;
}

export function LessonContent({ blocks }: Props) {
  const groups = groupBlocks(blocks);
  return (
    <div className="camp-lesson-flow">
      {groups.map((group, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: Math.min(i, 8) * 0.05 }}>
          {group.type === "section" ? (
            <section className="camp-lesson-section">
              <h3>{group.title}</h3>
              {group.paragraphs.map((text, k) => <p key={k}>{text}</p>)}
            </section>
          ) : group.type === "check" ? (
            <div className="camp-lesson-check">
              <span className="camp-lesson-check-label">Pause and apply</span>
              <p>{group.prompt}</p>
              <details>
                <summary>Compare your reasoning</summary>
                <p>{group.answer}</p>
              </details>
            </div>
          ) : (
            <BlockRenderer block={group.block} />
          )}
        </motion.div>
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.kind) {
    case "p":
      return <p className="camp-lesson-p">{block.text}</p>;
    case "callout":
      return <CalloutBlock tone={block.tone} title={block.title} text={block.text} />;
    case "list":
      return <ListBlock items={block.items} />;
    case "examples":
      return <ExamplesBlock items={block.items} />;
    case "table":
      return <TableBlock headers={block.headers} rows={block.rows} />;
    case "conjugation":
      return <ConjugationBlock verb={block.verb} rows={block.rows} />;
    case "dialogue":
      return <DialogueBlock title={block.title} lines={block.lines} />;
    default:
      return null;
  }
}

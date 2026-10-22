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

export function LessonContent({ blocks }: Props) {
  return (
    <div className="space-y-8">
      {blocks.map((block, i) => (
        <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
          <BlockRenderer block={block} />
        </motion.div>
      ))}
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.kind) {
    case "p":
      return <p className="font-body leading-relaxed text-lg text-[var(--color-text-primary)]">{block.text}</p>;
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

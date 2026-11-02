"use client";
import { useState } from "react";
import { Button } from "./shadcn/button";
import { Modal } from "./Modal";
import { LearningArt } from "@/components/brand/LearningArt";
import { chooseEncouragement, type Encouragement } from "@/lib/encouragement";

export function LevelEncouragement({ level }: { level: number }) {
  const [quote, setQuote] = useState<Encouragement | null>(null);
  const [open, setOpen] = useState(false);
  return <>
    <Button variant="unstyled" size="unstyled" className="camp-level-badge" aria-label={`Learning level ${level}: show encouragement`} onClick={()=>{setQuote(chooseEncouragement(level,quote?.id));setOpen(true);}}><span>{level}</span></Button>
    <Modal open={open} onClose={()=>setOpen(false)} title={`A little encouragement · Level ${level}`}>
      {quote && <div className="camp-encouragement"><LearningArt name="idea" size={24} /><blockquote aria-live="polite">{quote.text}</blockquote><p>{quote.action}</p><Button variant="outline" onClick={()=>setQuote(chooseEncouragement(level,quote.id))}>Another thought</Button></div>}
    </Modal>
  </>;
}

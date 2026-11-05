"use client";
import { useState } from "react";
import { Button } from "./shadcn/button";
import { Modal } from "./Modal";
import { NumberSeal } from './NumberSeal';
import { EncouragementPanel } from './EncouragementPanel';
import { chooseEncouragement, type Encouragement } from "@/lib/encouragement";

export function LevelEncouragement({ level }: { level: number }) {
  const [quote, setQuote] = useState<Encouragement | null>(null);
  const [open, setOpen] = useState(false);
  return <>
    <Button variant="unstyled" size="unstyled" className="camp-learning-level-trigger" aria-label={`Learning level ${level}: show encouragement`} onClick={()=>{setQuote(chooseEncouragement(level,quote?.id));setOpen(true);}}><NumberSeal value={level} label={`Learning level ${level}`}/></Button>
    <Modal open={open} onClose={()=>setOpen(false)} title="A little encouragement" className="camp-celebration-modal">
      {quote && <EncouragementPanel level={level} quote={quote} onAnother={()=>setQuote(chooseEncouragement(level,quote.id))} onContinue={()=>setOpen(false)}/>}
    </Modal>
  </>;
}

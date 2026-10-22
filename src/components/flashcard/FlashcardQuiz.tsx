"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect } from "@/lib/audio";
import { CheckCircle2, XCircle, Volume2, Brain } from "lucide-react";
import type { FlashcardData } from "@/data/flashcards";

interface Props {
  card: FlashcardData;
  pool: FlashcardData[];
  onComplete: (correct: boolean) => void;
  index: number;
  total: number;
}

function speak(text: string) {
  if (typeof window === "undefined") return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

export function FlashcardQuiz({ card, pool, onComplete, index, total }: Props) {
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const options = useMemo(() => {
    const correct = card.en;
    const others = pool
      .filter((c) => c.en !== correct)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((c) => c.en);
    const all = [correct, ...others].sort(() => Math.random() - 0.5);
    return all;
  }, [card.id]);

  const isCorrect = selected === card.en;

  function handleSelect(opt: string) {
    if (answered) return;
    setSelected(opt);
    setAnswered(true);
    if (opt === card.en) playCorrect();
    setTimeout(() => onComplete(opt === card.en), 800);
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <span
        className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] px-3 py-1.5 text-xs font-bold"
        style={{ backgroundColor: "var(--color-primary-subtle)", color: "var(--color-primary-dark)" }}
      >
        <Brain className="w-3.5 h-3.5" />
        Quiz {index + 1} / {total}
      </span>

      {/* Question card */}
      <div
        className="w-full max-w-md bg-[var(--color-surface)] rounded-[var(--radius-3xl)] p-8 border-2 border-[var(--color-border-default)] text-center"
        style={{ boxShadow: "0 4px 0 var(--color-border-default)" }}
      >
        <span
          className="font-body font-semibold text-[10px] uppercase tracking-widest mb-3 block"
          style={{ color: "var(--color-text-disabled)" }}
        >
          {card.cat}
        </span>
        <p className="font-display font-extrabold mb-2" style={{ fontSize: "28px", color: "var(--color-text-primary)" }}>
          {card.de}
        </p>
        <button
          onClick={() => speak(card.de)}
          className="inline-flex items-center gap-1 font-body text-xs transition-colors"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <Volume2 className="w-3.5 h-3.5" /> Listen
        </button>
        <p className="font-body text-xs mt-4" style={{ color: "var(--color-text-disabled)" }}>
          Choose the correct translation
        </p>
      </div>

      {/* Options */}
      <div className="w-full max-w-md grid grid-cols-1 gap-2">
        <AnimatePresence>
          {options.map((opt) => (
            <motion.button
              key={opt}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => handleSelect(opt)}
              disabled={answered}
              className="flex items-center gap-3 w-full px-4 py-3.5 rounded-[var(--radius-lg)] text-sm font-bold transition-all duration-150 border-2"
              style={getOptionStyle(opt, card.en, selected, answered)}
            >
              {answered && opt === card.en && <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: "var(--color-success-dark)" }} />}
              {answered && opt === selected && !isCorrect && <XCircle className="w-4 h-4 shrink-0" style={{ color: "var(--color-error)" }} />}
              <span>{opt}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Example */}
      {card.example && answered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-[var(--radius-lg)] p-4 border-2"
          style={{
            backgroundColor: "var(--color-neutral-50)",
            borderColor: "var(--color-border-default)",
          }}
        >
          <p className="font-body text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>Example</p>
          <p className="font-body text-sm" style={{ color: "var(--color-text-primary)" }}>{card.example.de}</p>
          <p className="font-body text-xs italic mt-0.5" style={{ color: "var(--color-text-disabled)" }}>{card.example.en}</p>
          {card.example.ar && (
            <p className="font-arabic text-xs italic mt-0.5" style={{ color: "var(--color-text-disabled)" }} lang="ar">
              {card.example.ar}
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
}

function getOptionStyle(opt: string, correct: string, selected: string | null, answered: boolean): React.CSSProperties {
  if (!answered) {
    return {
      backgroundColor: "var(--color-surface)",
      borderColor: "var(--color-border-default)",
      color: "var(--color-text-primary)",
      boxShadow: "0 2px 0 var(--color-border-default)",
    };
  }
  if (opt === correct) {
    return {
      backgroundColor: "var(--color-success-bg)",
      borderColor: "var(--color-success)",
      color: "var(--color-success-dark)",
      boxShadow: "0 2px 0 var(--color-success-dark)",
    };
  }
  if (opt === selected && opt !== correct) {
    return {
      backgroundColor: "var(--color-error-bg)",
      borderColor: "var(--color-error)",
      color: "var(--color-text-primary)",
      boxShadow: "0 2px 0 var(--color-error)",
    };
  }
  return {
    backgroundColor: "var(--color-surface)",
    borderColor: "var(--color-border-default)",
    color: "var(--color-text-disabled)",
    boxShadow: "0 2px 0 var(--color-border-default)",
    opacity: 0.5,
  };
}

"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { playCorrect } from "@/lib/audio";
import { ChevronLeft, ChevronRight, Sparkles, RotateCcw } from "lucide-react";
import type { FlashcardData } from "@/data/flashcards";

interface Props {
  card: FlashcardData;
  cardId: string;
  onNext: () => void;
  onPrev: () => void;
  index: number;
  total: number;
}

const SRS_INTERVALS: Record<string, number> = { easy: 7, medium: 3, hard: 1 };

const ARTICLE_STYLE: Record<string, { fg: string; bg: string; border: string }> = {
  a: { fg: "var(--color-info-dark)", bg: "var(--color-info-bg)", border: "var(--color-info)" },
  an: { fg: "var(--color-warning-dark)", bg: "var(--color-warning-bg)", border: "var(--color-warning)" },
  the: { fg: "var(--color-primary-dark)", bg: "var(--color-primary-subtle)", border: "var(--color-primary)" },
};

export function FlashCard({ card, cardId, onNext, onPrev, index, total }: Props) {
  const [flipped, setFlipped] = useState(false);
  const [rated, setRated] = useState(false);
  const { markCardSeen, getCardSeenCount } = useProgress();
  const seen = getCardSeenCount(cardId);

  function handleFlip() {
    if (!flipped) markCardSeen(cardId);
    setFlipped((f) => !f);
  }

  function handleRate(level: string) {
    if (rated) return;
    setRated(true);
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + (SRS_INTERVALS[level] || 1));
    const key = `srs-${cardId}`;
    try { localStorage.setItem(key, JSON.stringify({ level, nextDate: nextDate.toISOString() })); } catch {}
    playCorrect();
    setTimeout(() => {
      setFlipped(false);
      setRated(false);
      onNext();
    }, 400);
  }

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Top bar */}
      <div className="flex items-center gap-3 w-full max-w-md justify-between">
        <div className="flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1 rounded-[var(--radius-pill)] px-3 py-1 text-xs font-bold"
            style={{ backgroundColor: "var(--color-neutral-50)", color: "var(--color-text-secondary)" }}
          >
            <Sparkles className="w-3 h-3" />
            {index + 1} / {total}
          </span>
          {seen > 0 && (
            <span
              className="inline-flex items-center gap-1 rounded-[var(--radius-pill)] px-3 py-1 text-xs font-bold"
              style={{ backgroundColor: "var(--color-primary-subtle)", color: "var(--color-primary-dark)" }}
            >
              <RotateCcw className="w-3 h-3" />
              {seen}x
            </span>
          )}
        </div>
      </div>

      {/* Card */}
      <div
        className="relative w-full max-w-md h-80 cursor-pointer select-none"
        style={{ perspective: "1000px" }}
        onClick={handleFlip}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleFlip(); }}
        tabIndex={0}
        role="button"
        aria-label={flipped ? "Tap to flip back" : "Tap to reveal answer"}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full h-full"
        >
          {/* Front */}
          <div
            className="absolute inset-0 bg-[var(--color-surface)] rounded-[var(--radius-3xl)] flex flex-col items-center justify-center p-8 border-2 border-[var(--color-border-default)]"
            style={{ backfaceVisibility: "hidden", boxShadow: "0 4px 0 var(--color-border-default)" }}
          >
            {card.article ? (
              <span
                className="mb-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-[var(--radius-pill)] border-2"
                style={{
                  color: ARTICLE_STYLE[card.article]?.fg || "var(--color-text-secondary)",
                  backgroundColor: ARTICLE_STYLE[card.article]?.bg || "var(--color-neutral-50)",
                  borderColor: ARTICLE_STYLE[card.article]?.border || "var(--color-border-default)",
                }}
              >
                {card.article}
              </span>
            ) : (
              <span
                className="mb-4 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-[var(--radius-pill)] border-2"
                style={{
                  color: "var(--color-text-disabled)",
                  backgroundColor: "var(--color-neutral-50)",
                  borderColor: "var(--color-border-default)",
                }}
              >
                {card.cat}
              </span>
            )}
            <p className="font-display font-extrabold text-center leading-tight" style={{ fontSize: "28px", color: "var(--color-text-primary)" }}>
              {card.de}
            </p>
            <p className="font-body text-xs mt-8" style={{ color: "var(--color-text-disabled)" }}>tap to reveal</p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-[var(--color-surface)] rounded-[var(--radius-3xl)] flex flex-col items-center justify-center p-8 border-2"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              borderColor: "var(--color-success)",
              boxShadow: "0 4px 0 var(--color-success-dark)",
            }}
          >
            <p
              className="font-display font-extrabold text-center mb-1"
              style={{ fontSize: "24px", color: "var(--color-success-dark)" }}
            >
              {card.en}
            </p>
            {card.ar && (
              <p className="font-arabic text-lg text-center mt-0.5" style={{ color: "var(--color-success)" }} lang="ar">
                {card.ar}
              </p>
            )}

            {card.plural && (
              <p className="font-body text-xs mt-1" style={{ color: "var(--color-text-secondary)" }}>
                <span className="font-medium">Plural:</span> {card.plural}
              </p>
            )}

            {card.example && (
              <div
                className="mt-5 pt-4 w-full max-w-xs text-center"
                style={{ borderTop: "1px solid var(--color-border-default)" }}
              >
                <p className="font-body text-xs font-medium mb-1" style={{ color: "var(--color-text-secondary)" }}>Example</p>
                <p className="font-body text-sm" style={{ color: "var(--color-text-primary)" }}>{card.example.de}</p>
                <p className="font-body text-xs italic mt-1" style={{ color: "var(--color-text-disabled)" }}>{card.example.en}</p>
                {card.example.ar && (
                  <p className="font-arabic text-xs italic mt-0.5" style={{ color: "var(--color-text-disabled)" }} lang="ar">
                    {card.example.ar}
                  </p>
                )}
              </div>
            )}

            <p className="font-body text-xs mt-5" style={{ color: "var(--color-text-disabled)" }}>tap to flip back</p>
          </div>
        </motion.div>
      </div>

      {/* Rate buttons */}
      {flipped && !rated && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
          <button
            onClick={() => handleRate("hard")}
            className="px-5 py-2.5 text-xs font-bold rounded-[var(--radius-pill)] border-2 transition-all duration-150"
            style={{
              backgroundColor: "var(--color-error-bg)",
              color: "var(--color-error-dark)",
              borderColor: "var(--color-error)",
              boxShadow: "0 2px 0 var(--color-error-dark)",
            }}
          >
            Hard
          </button>
          <button
            onClick={() => handleRate("medium")}
            className="px-5 py-2.5 text-xs font-bold rounded-[var(--radius-pill)] border-2 transition-all duration-150"
            style={{
              backgroundColor: "var(--color-warning-bg)",
              color: "var(--color-warning-dark)",
              borderColor: "var(--color-warning)",
              boxShadow: "0 2px 0 var(--color-warning-dark)",
            }}
          >
            Medium
          </button>
          <button
            onClick={() => handleRate("easy")}
            className="px-5 py-2.5 text-xs font-bold rounded-[var(--radius-pill)] border-2 transition-all duration-150"
            style={{
              backgroundColor: "var(--color-primary-subtle)",
              color: "var(--color-primary-dark)",
              borderColor: "var(--color-primary)",
              boxShadow: "0 2px 0 var(--color-primary-dark)",
            }}
          >
            Easy
          </button>
        </motion.div>
      )}

      {/* Nav buttons */}
      {!flipped && (
        <div className="flex items-center gap-3">
          <button
            onClick={onPrev}
            disabled={index === 0}
            className="w-11 h-11 rounded-[var(--radius-md)] flex items-center justify-center transition-all duration-150"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "2px solid var(--color-border-default)",
              boxShadow: "0 2px 0 var(--color-border-default)",
              color: index === 0 ? "var(--color-text-disabled)" : "var(--color-text-secondary)",
            }}
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-body text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-disabled)" }}>
            or tap card
          </span>
          <button
            onClick={() => { if (!flipped) handleFlip(); }}
            className="px-6 h-11 rounded-[var(--radius-pill)] font-bold text-sm transition-all duration-150"
            style={{
              backgroundColor: "var(--color-primary)",
              color: "white",
              boxShadow: "0 4px 0 var(--color-primary-dark)",
            }}
          >
            <span className="flex items-center gap-1.5">Flip <ChevronRight className="w-4 h-4" /></span>
          </button>
        </div>
      )}
    </div>
  );
}

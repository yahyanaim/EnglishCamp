"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect } from "@/lib/audio";
import { CheckCircle2, XCircle, Send, RefreshCw, Lightbulb, BookOpen, PenLine } from "lucide-react";
import type { FlashcardData } from "@/data/flashcards";

interface Props {
  card: FlashcardData;
  onComplete: (correct: boolean) => void;
  index: number;
  total: number;
}

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
}

function getStripped(en: string) {
  return en.replace(/^(a|an|the)\s+/i, "").trim();
}

export function FlashcardWrite({ card, onComplete, index, total }: Props) {
  const [input, setInput] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [card.id]);

  const acceptable = [card.de, getStripped(card.de)];
  const isCorrect = submitted && acceptable.some((a) => normalize(a) === normalize(input));

  function handleSubmit() {
    if (!input.trim() || submitted) return;
    setSubmitted(true);
    if (isCorrect) playCorrect();
  }

  function handleNext() {
    setInput("");
    setSubmitted(false);
    onComplete(isCorrect);
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      if (!submitted) handleSubmit();
      else handleNext();
    }
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <span
        className="inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] px-3 py-1.5 text-xs font-bold"
        style={{ backgroundColor: "var(--color-warning-bg)", color: "var(--color-warning-dark)" }}
      >
        <PenLine className="w-3.5 h-3.5" />
        Write {index + 1} / {total}
      </span>

      {/* Prompt card */}
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
        <p className="font-display font-extrabold mb-2" style={{ fontSize: "24px", color: "var(--color-text-primary)" }}>
          {card.en}
        </p>
        {!submitted && (
          <p className="font-body text-xs" style={{ color: "var(--color-text-disabled)" }}>
            Type the English word
          </p>
        )}
      </div>

      {/* Input + feedback */}
      <div className="w-full max-w-md">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={submitted}
            placeholder="Type your answer..."
            className="w-full h-[52px] px-4 bg-[var(--color-surface)] rounded-[var(--radius-md)] text-sm font-bold outline-none transition-all duration-150 border-2"
            style={getInputStyle(submitted, isCorrect)}
          />
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={!input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center transition-all duration-150"
              style={{
                backgroundColor: "var(--color-primary)",
                color: "white",
                boxShadow: "0 2px 0 var(--color-primary-dark)",
                opacity: input.trim() ? 1 : 0.4,
              }}
            >
              <Send className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center transition-all duration-150"
              style={{
                backgroundColor: "var(--color-neutral-200)",
                color: "var(--color-text-secondary)",
              }}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>

        <AnimatePresence>
          {submitted && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 space-y-2">
              {/* Result card */}
              <div
                className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] border-2"
                style={{
                  backgroundColor: isCorrect ? "var(--color-success-bg)" : "var(--color-error-bg)",
                  borderColor: isCorrect ? "var(--color-success)" : "var(--color-error)",
                }}
              >
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--color-success-dark)" }} />
                ) : (
                  <XCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--color-error)" }} />
                )}
                <div>
                  <p
                    className="font-display font-bold text-sm"
                    style={{ color: isCorrect ? "var(--color-success-dark)" : "var(--color-error-dark)" }}
                  >
                    {isCorrect ? "Correct!" : "Not quite"}
                  </p>
                  {!isCorrect && (
                    <p className="font-body text-sm mt-1" style={{ color: "var(--color-text-primary)" }}>
                      Correct answer: <strong>{card.de}</strong>
                    </p>
                  )}
                  {card.example && (
                    <div className="mt-2 pt-2" style={{ borderTop: "1px solid var(--color-border-default)" }}>
                      <p className="font-body text-xs" style={{ color: "var(--color-text-secondary)" }}>{card.example.de}</p>
                      <p className="font-body text-xs italic mt-0.5" style={{ color: "var(--color-text-disabled)" }}>{card.example.en}</p>
                      {card.example.ar && (
                        <p className="font-arabic text-xs italic mt-0.5" style={{ color: "var(--color-text-disabled)" }} lang="ar">
                          {card.example.ar}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Tips */}
              {!isCorrect && (
                <>
                  <div
                    className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] border-2"
                    style={{
                      backgroundColor: "var(--color-warning-bg)",
                      borderColor: "var(--color-warning)",
                    }}
                  >
                    <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--color-warning-dark)" }} />
                    <div>
                      <p className="font-display font-bold text-sm" style={{ color: "var(--color-warning-dark)" }}>Tip</p>
                      <p className="font-body text-sm mt-1" style={{ color: "var(--color-text-primary)" }}>
                        Pay attention to spelling and phrasing — try to memorize each word with its meaning and usage!
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] border-2"
                    style={{
                      backgroundColor: "var(--color-info-bg)",
                      borderColor: "var(--color-info)",
                    }}
                  >
                    <BookOpen className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "var(--color-info-dark)" }} />
                    <div>
                      <p className="font-display font-bold text-sm" style={{ color: "var(--color-info-dark)" }}>Suggestion</p>
                      <p className="font-body text-sm mt-1" style={{ color: "var(--color-text-primary)" }}>
                        Review this word in Browse mode. Try writing it 3 times while saying it aloud.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function getInputStyle(submitted: boolean, isCorrect: boolean): React.CSSProperties {
  if (!submitted) {
    return {
      borderColor: "var(--color-border-default)",
      color: "var(--color-text-primary)",
      boxShadow: "0 2px 0 var(--color-border-default)",
    };
  }
  if (isCorrect) {
    return {
      borderColor: "var(--color-success)",
      backgroundColor: "var(--color-success-bg)",
      color: "var(--color-success-dark)",
      boxShadow: "0 2px 0 var(--color-success-dark)",
    };
  }
  return {
    borderColor: "var(--color-error)",
    backgroundColor: "var(--color-error-bg)",
    color: "var(--color-text-primary)",
    boxShadow: "0 2px 0 var(--color-error)",
  };
}

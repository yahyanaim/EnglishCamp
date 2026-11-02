"use client";
import { SelectField } from "@/components/ui/shadcn/select-field";
import { LearningArt } from "@/components/brand/LearningArt";
import { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { FlashCard } from "./FlashCard";
import { FlashcardQuiz } from "./FlashcardQuiz";
import { FlashcardWrite } from "./FlashcardWrite";
import { FLASHCARDS } from "@/data/flashcards";
import type { FlashcardData } from "@/data/flashcards";
import { Search, X, BookOpen, Clock, BarChart3, Brain, PenLine, Eye, Target } from "lucide-react";

type Mode = "browse" | "quiz" | "write";

const MODES: { id: Mode; label: string; icon: typeof Eye }[] = [
  { id: "browse", label: "Browse", icon: Eye },
  { id: "quiz", label: "Quiz", icon: Brain },
  { id: "write", label: "Write", icon: PenLine },
];

const ALL_CATEGORIES = Array.from(new Set(FLASHCARDS.map((c) => c.cat))).sort();

const STATS_CONFIG = [
  { label: "Cards", icon: BookOpen, fg: "var(--color-primary-dark)", bg: "var(--color-primary-subtle)", border: "var(--color-primary)" },
  { label: "Done", icon: Target, fg: "var(--color-success-dark)", bg: "var(--color-success-bg)", border: "var(--color-success)" },
  { label: "Accuracy", icon: BarChart3, fg: "var(--color-warning-dark)", bg: "var(--color-warning-bg)", border: "var(--color-warning)" },
  { label: "Filtered", icon: Clock, fg: "var(--color-info-dark)", bg: "var(--color-info-bg)", border: "var(--color-info)" },
] as const;

export function FlashcardDeck({ initialCategory = "All" }: { initialCategory?: string }) {
  const [index, setIndex] = useState(0);
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<Mode>("browse");
  const [session, setSession] = useState({ correct: 0, incorrect: 0, total: 0 });

  const filtered = useMemo(() => {
    let cards = category === "All" ? FLASHCARDS : FLASHCARDS.filter((c) => c.cat === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      cards = cards.filter((c) => c.de.toLowerCase().includes(q) || c.en.toLowerCase().includes(q));
    }
    return cards;
  }, [category, search]);

  const card = filtered[index] || null;
  const totalCards = FLASHCARDS.length;
  const currentCatCount = category === "All" ? totalCards : FLASHCARDS.filter((c) => c.cat === category).length;

  useEffect(() => { setIndex(0); setSession({ correct: 0, incorrect: 0, total: 0 }); }, [category, search, mode]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "ArrowLeft" && mode === "browse") setIndex((i) => Math.max(i - 1, 0));
    if (e.key === "ArrowRight" && mode === "browse") setIndex((i) => Math.min(i + 1, filtered.length - 1));
  }, [filtered.length, mode]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const catCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const c of FLASHCARDS) counts[c.cat] = (counts[c.cat] || 0) + 1;
    return counts;
  }, []);

  const accuracy = session.total > 0 ? Math.round((session.correct / session.total) * 100) : 0;

  function advance() {
    setIndex((i) => Math.min(i + 1, filtered.length - 1));
  }

  function handleQuizComplete(correct: boolean) {
    setSession((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      incorrect: s.incorrect + (correct ? 0 : 1),
      total: s.total + 1,
    }));
    advance();
  }

  function handleWriteComplete(correct: boolean) {
    setSession((s) => ({
      correct: s.correct + (correct ? 1 : 0),
      incorrect: s.incorrect + (correct ? 0 : 1),
      total: s.total + 1,
    }));
    advance();
  }

  const statValues = {
    Cards: currentCatCount,
    Done: session.total,
    Accuracy: session.total > 0 ? `${accuracy}%` : "\u2014",
    Filtered: filtered.length,
  };

  return (
    <div className="camp-flashcard-deck space-y-5">
      {/* Mode switcher */}
      <div className="flex gap-1.5 bg-[var(--color-neutral-100)] rounded-[var(--radius-lg)] p-1 w-fit">
        {MODES.map((m) => {
          const Icon = m.icon;
          return (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              aria-pressed={mode === m.id}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-[var(--radius-md)] text-xs font-bold transition-all duration-150 ${
                mode === m.id
                  ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-[var(--shadow-2)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <LearningArt name={Icon.displayName || "book"} size={14} className="w-3.5 h-3.5" />
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-4 gap-2.5">
        {STATS_CONFIG.map((s) => (
          <div
            key={s.label}
            className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-3 border-2 transition-all duration-200"
            style={{ borderColor: s.border, boxShadow: `0 2px 0 ${s.border}` }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <LearningArt name={s.icon.displayName || "book"} size={14} className="w-3.5 h-3.5" />
              <span className="font-body font-semibold text-[9px] uppercase tracking-wider" style={{ color: "var(--color-text-secondary)" }}>
                {s.label}
              </span>
            </div>
            <p className="font-display font-extrabold" style={{ fontSize: "16px", color: "var(--color-text-primary)" }}>
              {statValues[s.label]}
            </p>
          </div>
        ))}
      </div>

      {/* Search */}
      {(mode === "browse" || mode === "quiz") && (
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "var(--color-text-disabled)" }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cards..."
            className="w-full h-12 pl-10 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border-2 border-[var(--color-border-default)] text-sm font-medium text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] placeholder:italic outline-none transition-all duration-150"
            style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}
            onFocus={(e) => { e.target.style.borderColor = "var(--color-border-focus)"; e.target.style.boxShadow = "0 2px 0 var(--color-border-focus), 0 0 0 3px rgba(126,34,206,0.15)"; }}
            onBlur={(e) => { e.target.style.borderColor = "var(--color-border-default)"; e.target.style.boxShadow = "0 2px 0 var(--color-border-default)"; }}
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4" style={{ color: "var(--color-text-secondary)" }} />
            </button>
          )}
        </div>
      )}

      <label className="camp-flashcard-category">Category<SelectField value={category} onValueChange={setCategory} aria-label="Flashcard category"><option value="All">All categories ({totalCards})</option>{ALL_CATEGORIES.map(cat=><option key={cat} value={cat}>{cat} ({catCounts[cat] || 0})</option>)}</SelectField></label>

      {/* Progress */}
      {filtered.length > 0 && (
        <div className="w-full h-1.5 bg-[var(--color-neutral-100)] rounded-[var(--radius-pill)] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((index + 1) / filtered.length) * 100}%` }}
            transition={{ duration: 0.3 }}
            className="h-full rounded-[var(--radius-pill)] bg-[var(--color-primary)]"
          />
        </div>
      )}

      {/* Card area */}
      {card ? (
        <>
          {mode === "browse" && (
            <FlashCard
              card={card}
              cardId={card.id}
              index={index}
              total={filtered.length}
              onNext={() => setIndex((i) => Math.min(i + 1, filtered.length - 1))}
              onPrev={() => setIndex((i) => Math.max(i - 1, 0))}
            />
          )}
          {mode === "quiz" && (
            <FlashcardQuiz
              card={card}
              pool={filtered}
              onComplete={handleQuizComplete}
              index={index}
              total={filtered.length}
            />
          )}
          {mode === "write" && (
            <FlashcardWrite
              card={card}
              onComplete={handleWriteComplete}
              index={index}
              total={filtered.length}
            />
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <span className="text-4xl block mb-3">🔍</span>
          <p className="font-display font-bold text-sm" style={{ color: "var(--color-text-secondary)" }}>No cards found</p>
          <p className="font-body text-xs mt-1" style={{ color: "var(--color-text-disabled)" }}>Try a different category or search term</p>
        </div>
      )}
    </div>
  );
}

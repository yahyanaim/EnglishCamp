"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { playCorrect, playWrong } from "@/lib/audio";
import { Lightbulb, BookOpen } from "lucide-react";

import { createWordSearchPuzzle, appendWordSearchCell } from "@/lib/wordSearch";
function getWordSearchTip(): { tip: string; suggest: string } {
  return {
    tip: "Look for words horizontally (left→right) or vertically (top→bottom). Look for common English letter combinations like TH, SH, CH, ING, ED.",
    suggest: "Practice vocabulary recognition with flashcards and the Vocabulary trainer in Practice Hub.",
  };
}

export function WordSearch() {
  const { completeExercise } = useProgress();
  const [puzzle, setPuzzle] = useState(createWordSearchPuzzle);
  const [found, setFound] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<[number, number][]>([]);
  const [done, setDone] = useState(false);
  const [wrongFeedback, setWrongFeedback] = useState(false);

  const handleCellClick = useCallback((r: number, c: number) => {
    setSelected(previous => appendWordSearchCell(previous, [r,c], done));
  }, [done]);

  function checkWord() {
    if (selected.length < 2) return;
    const letters = selected.map(([r, c]) => puzzle.grid[r][c]).join("");
    const reversed = letters.split("").reverse().join("");
    const match = puzzle.words.find((w) => (w === letters || w === reversed) && !found.has(w));
    if (match) {
      setFound((f) => new Set(f).add(match));
      playCorrect();
      completeExercise(`wordsearch-${puzzle.rewardIds[match] || match}`, 10);
      if (found.size + 1 >= puzzle.words.length) setDone(true);
      setWrongFeedback(false);
    } else {
      playWrong();
      setWrongFeedback(true);
      setTimeout(() => setWrongFeedback(false), 4000);
    }
    setSelected([]);
  }

  function clearSelection() {
    setSelected([]);
  }

  function newGame() {
    setPuzzle(createWordSearchPuzzle());
    setFound(new Set());
    setSelected([]);
    setDone(false);
  }

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--camp-control-ink)] uppercase tracking-wider">Word Search</span>
        <PracticeButton onClick={newGame} className="text-xs font-medium text-[var(--color-text-link)] hover:text-[var(--color-text-link)]">New Puzzle</PracticeButton>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="camp-word-search-board min-w-0" role="region" aria-label="Word search grid" tabIndex={0}>
          <div className="camp-word-search-grid grid" style={{ gridTemplateColumns: `repeat(${puzzle.size}, minmax(0, 1fr))` }}>
            {puzzle.grid.map((row, r) =>
              row.map((ch, c) => {
                const isSelected = selected.some(([rr, cc]) => rr === r && cc === c);
                return (
                  <PracticeButton
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    aria-label={`Row ${r+1}, column ${c+1}, ${ch}`} aria-pressed={isSelected}
                    className={`camp-word-search-cell text-xs font-bold font-mono flex items-center justify-center rounded transition-all duration-150 ${
                      isSelected ? "bg-brand-200 text-[var(--color-text-link)] ring-2 ring-brand-400" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
                    }`}
                  >
                    {ch}
                  </PracticeButton>
                );
              })
            )}
          </div>
        </div>

        <div className="flex-1">
          <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase mb-2">Find these words:</p>
          <div className="space-y-1.5">
            {puzzle.words.map((w) => (
              <div key={w} className={`text-sm font-mono font-medium px-3 py-1 rounded transition-all ${found.has(w) ? "bg-[var(--color-success-bg)] text-[var(--color-text-success)] " : "text-[var(--color-text-primary)]"}`}>
                {found.has(w) ? "✓" : "○"} {w}
                {found.has(w) && <span className="text-xs text-[var(--color-text-secondary)] ml-2 not-italic font-sans">— <span lang="ar" dir="rtl">{puzzle.translations[w]}</span></span>}
              </div>
            ))}
          </div>

          {selected.length >= 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 mt-4">
              <PracticeButton onClick={checkWord} className="text-xs font-medium bg-[var(--color-primary)] text-[var(--color-on-brand)] px-4 py-2 rounded-[var(--radius-md)] hover:bg-[var(--color-primary-hover)] transition-all">✓ Check</PracticeButton>
              <PracticeButton onClick={clearSelection} className="text-xs font-medium bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] px-4 py-2 rounded-[var(--radius-md)] hover:bg-[var(--color-border-default)] transition-all">✗ Clear</PracticeButton>
            </motion.div>
          )}

          <AnimatePresence>
            {wrongFeedback && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mt-3 space-y-2">
                <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] ring-1 ring-[var(--color-warning)]">
                  <LearningArt name="Lightbulb" size={20} className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-text-warning)]" />
                  <div>
                    <p className="font-semibold text-sm">Tip</p>
                    <p className="text-sm mt-1">{getWordSearchTip().tip}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info-bg)] text-[var(--color-text-info)] ring-1 ring-[var(--color-info)]">
                  <LearningArt name="BookOpen" size={20} className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-text-info)]" />
                  <div>
                    <p className="font-semibold text-sm">Suggestion</p>
                    <p className="text-sm mt-1">{getWordSearchTip().suggest}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {done && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 bg-[var(--color-success-bg)] text-[var(--color-text-success)] rounded-[var(--radius-md)] p-3 border border-[var(--color-success)] text-center">
              <p className="text-sm font-bold text-[var(--color-text-success)]"><LearningArt name="🎉" size={16} /> All words found!</p>
              <PracticeButton onClick={newGame} className="mt-2 text-xs font-medium bg-[var(--color-primary)] text-[var(--color-on-brand)] px-4 py-1.5 rounded-[var(--radius-md)] hover:bg-[var(--color-primary-hover)] transition-all">Play Again</PracticeButton>
            </motion.div>
          )}

          <p className="text-xs text-[var(--color-text-secondary)] mt-3">Click letters in order to select a word, then press Check.</p>
        </div>
      </div>
    </PracticeCard>
  );
}

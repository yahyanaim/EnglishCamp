"use client";
import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { playCorrect, playWrong } from "@/lib/audio";
import { Lightbulb, BookOpen } from "lucide-react";

type Puzzle = { words: string[]; grid: string[][]; size: number; translations: Record<string, string> };

const WORD_SETS: { words: string[]; translations: Record<string, string> }[] = [
  { words: ["HAUS", "BUCH", "TISCH", "SCHULE", "GARTEN"], translations: { HAUS: "house", BUCH: "book", TISCH: "table", SCHULE: "school", GARTEN: "garden" } },
  { words: ["WASSER", "BLUME", "FENSTER", "TUR", "STUHL"], translations: { WASSER: "water", BLUME: "flower", FENSTER: "window", TUR: "door", STUHL: "chair" } },
  { words: ["APFEL", "BROT", "MILCH", "KATZE", "HUND"], translations: { APFEL: "apple", BROT: "bread", MILCH: "milk", KATZE: "cat", HUND: "dog" } },
  { words: ["SONNE", "MOND", "STERNE", "WOLKE", "REGEN"], translations: { SONNE: "sun", MOND: "moon", STERNE: "stars", WOLKE: "cloud", REGEN: "rain" } },
  { words: ["BAUM", "BLATT", "WURZEL", "AST", "STAMM"], translations: { BAUM: "tree", BLATT: "leaf", WURZEL: "root", AST: "branch", STAMM: "trunk" } },
  { words: ["FREUDE", "GLUCK", "LIEBE", "TRAUER", "ANGST"], translations: { FREUDE: "joy", GLUCK: "luck/happiness", LIEBE: "love", TRAUER: "sorrow", ANGST: "fear" } },
];

function generatePuzzle(): Puzzle {
  const set = WORD_SETS[Math.floor(Math.random() * WORD_SETS.length)];
  const chosen = set.words;
  const size = 10;
  const grid: string[][] = Array.from({ length: size }, () => Array(size).fill(""));
  const placed: { word: string; row: number; col: number; dir: "h" | "v" }[] = [];

  for (const word of chosen) {
    let row, col, dir: "h" | "v", ok = false;
    for (let attempt = 0; attempt < 100 && !ok; attempt++) {
      dir = Math.random() < 0.5 ? "h" : "v";
      if (dir === "h") {
        row = Math.floor(Math.random() * size);
        col = Math.floor(Math.random() * (size - word.length));
        ok = true;
        for (let i = 0; i < word.length; i++) {
          if (grid[row][col + i] && grid[row][col + i] !== word[i]) { ok = false; break; }
        }
        if (ok) {
          for (let i = 0; i < word.length; i++) grid[row][col + i] = word[i];
          placed.push({ word, row, col, dir });
        }
      } else {
        row = Math.floor(Math.random() * (size - word.length));
        col = Math.floor(Math.random() * size);
        ok = true;
        for (let i = 0; i < word.length; i++) {
          if (grid[row + i][col] && grid[row + i][col] !== word[i]) { ok = false; break; }
        }
        if (ok) {
          for (let i = 0; i < word.length; i++) grid[row + i][col] = word[i];
          placed.push({ word, row, col, dir });
        }
      }
    }
    if (!ok) continue;
  }

  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (!grid[r][c]) grid[r][c] = String.fromCharCode(65 + Math.floor(Math.random() * 26));

  return { words: chosen, grid, size, translations: set.translations };
}

function getWordSearchTip(): { tip: string; suggest: string } {
  return {
    tip: "Look for words horizontally (left→right) or vertically (top→bottom). Look for common English letter combinations like TH, SH, CH, ING, ED.",
    suggest: "Practice vocabulary recognition with flashcards and the Vocabulary trainer in Practice Hub.",
  };
}

export function WordSearch() {
  const { completeExercise } = useProgress();
  const [puzzle, setPuzzle] = useState(generatePuzzle);
  const [found, setFound] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<[number, number][]>([]);
  const [phase, setPhase] = useState<"select" | "check">("select");
  const [done, setDone] = useState(false);
  const [wrongFeedback, setWrongFeedback] = useState(false);

  const handleCellClick = useCallback((r: number, c: number) => {
    if (done || phase === "check") return;
    if (selected.some(([rr, cc]) => rr === r && cc === c)) return;
    const next = [...selected, [r, c] as [number, number]];
    setSelected(next);
    if (next.length >= 2) setPhase("check");
  }, [selected, done, phase]);

  function checkWord() {
    if (selected.length < 2) return;
    const letters = selected.map(([r, c]) => puzzle.grid[r][c]).join("");
    const reversed = letters.split("").reverse().join("");
    const match = puzzle.words.find((w) => (w === letters || w === reversed) && !found.has(w));
    if (match) {
      setFound((f) => new Set(f).add(match));
      playCorrect();
      completeExercise(`wordsearch-${match}`, 10);
      if (found.size + 1 >= puzzle.words.length) setDone(true);
      setWrongFeedback(false);
    } else {
      playWrong();
      setWrongFeedback(true);
      setTimeout(() => setWrongFeedback(false), 4000);
    }
    setSelected([]);
    setPhase("select");
  }

  function clearSelection() {
    setSelected([]);
    setPhase("select");
  }

  function newGame() {
    setPuzzle(generatePuzzle());
    setFound(new Set());
    setSelected([]);
    setPhase("select");
    setDone(false);
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[#FFD700] uppercase tracking-wider">Word Search</span>
        <button onClick={newGame} className="text-xs font-medium text-[var(--color-primary-dark)] hover:text-[var(--color-primary-dark)]">New Puzzle</button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="min-w-0 max-w-full overflow-x-auto lg:shrink-0" role="region" aria-label="Word search grid" tabIndex={0}>
          <div className="grid gap-0.5 w-max" style={{ gridTemplateColumns: `repeat(${puzzle.size}, minmax(0, 1fr))` }}>
            {puzzle.grid.map((row, r) =>
              row.map((ch, c) => {
                const isSelected = selected.some(([rr, cc]) => rr === r && cc === c);
                return (
                  <button
                    key={`${r}-${c}`}
                    onClick={() => handleCellClick(r, c)}
                    className={`w-8 h-8 text-xs font-bold font-mono flex items-center justify-center rounded transition-all duration-150 ${
                      isSelected ? "bg-brand-200 text-[var(--color-primary-dark)] ring-2 ring-brand-400 scale-110 z-10" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"
                    }`}
                  >
                    {ch}
                  </button>
                );
              })
            )}
          </div>
        </div>

        <div className="flex-1">
          <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase mb-2">Find these words:</p>
          <div className="space-y-1.5">
            {puzzle.words.map((w) => (
              <div key={w} className={`text-sm font-mono font-medium px-3 py-1 rounded transition-all ${found.has(w) ? "bg-[var(--color-success)] text-white " : "text-[var(--color-text-primary)]"}`}>
                {found.has(w) ? "✓" : "○"} {w}
                {found.has(w) && <span className="text-xs text-[var(--color-text-disabled)] ml-2 not-italic font-sans">— {puzzle.translations[w]}</span>}
              </div>
            ))}
          </div>

          {selected.length >= 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2 mt-4">
              <button onClick={checkWord} className="text-xs font-medium bg-[var(--color-primary)] text-white px-4 py-2 rounded-[var(--radius-md)] hover:bg-brand-600 transition-all">✓ Check</button>
              <button onClick={clearSelection} className="text-xs font-medium bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] px-4 py-2 rounded-[var(--radius-md)] hover:bg-[var(--color-border-default)] transition-all">✗ Clear</button>
            </motion.div>
          )}

          <AnimatePresence>
            {wrongFeedback && (
              <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="mt-3 space-y-2">
                <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning)] text-white ring-1 ring-[var(--color-warning)]">
                  <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-warning)]" />
                  <div>
                    <p className="font-semibold text-sm">Astuce (Tip)</p>
                    <p className="text-sm mt-1">{getWordSearchTip().tip}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info)] text-white ring-1 ring-[var(--color-info)]">
                  <BookOpen className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-info)]" />
                  <div>
                    <p className="font-semibold text-sm">Suggestion</p>
                    <p className="text-sm mt-1">{getWordSearchTip().suggest}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {done && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 bg-[var(--color-success)] text-white rounded-[var(--radius-md)] p-3 border border-[var(--color-success)] text-center">
              <p className="text-sm font-bold text-[var(--color-success)]">🎉 All words found!</p>
              <button onClick={newGame} className="mt-2 text-xs font-medium bg-[var(--color-primary)] text-white px-4 py-1.5 rounded-[var(--radius-md)] hover:bg-brand-600 transition-all">Play Again</button>
            </motion.div>
          )}

          <p className="text-xs text-[var(--color-text-disabled)] mt-3">Click letters in order to select a word, then press Check.</p>
        </div>
      </div>
    </div>
  );
}

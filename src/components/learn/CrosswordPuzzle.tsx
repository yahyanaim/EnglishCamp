"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { playCorrect, playWrong } from "@/lib/audio";
import { Lightbulb, BookOpen } from "lucide-react";

interface CrosswordCell { value: string; row: number; col: number; clueIndex: number; answer: string }
interface Clue { clue: string; answer: string; row: number; col: number; dir: "across" | "down"; length: number }

const GRID_SIZE = 5;

function generateCrossword(): { clues: Clue[]; cells: (CrosswordCell | null)[][] } {
  const sets = [
    { words: ["HOUSE", "APPLE", "CLOCK", "CHAIR", "LIGHT"], clues: [
      "Building to live in", "Red or green fruit", "Tells the time", "You sit on this", "Brightness from the sun or a lamp"
    ]},
    { words: ["SCHOOL", "STORY", "OCEAN", "GREEN", "TABLE"], clues: [
      "Where children learn", "A short tale or novel", "A large sea", "A colour between blue and yellow", "You eat at this"
    ]},
  ];
  const set = sets[Math.floor(Math.random() * sets.length)];
  const clues: Clue[] = [];
  const data: (CrosswordCell | null)[][] = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(null));

  const placements = [
    { word: set.words[0], row: 0, col: 0, dir: "across" as const },
    { word: set.words[1], row: 0, col: 0, dir: "down" as const },
    { word: set.words[2], row: 1, col: 2, dir: "across" as const },
    { word: set.words[3], row: 2, col: 1, dir: "down" as const },
    { word: set.words[4], row: 3, col: 0, dir: "across" as const },
  ];

  for (let i = 0; i < placements.length; i++) {
    const { word, row, col, dir } = placements[i];
    for (let j = 0; j < word.length; j++) {
      const r = dir === "down" ? row + j : row;
      const c = dir === "across" ? col + j : col;
      if (r < GRID_SIZE && c < GRID_SIZE) {
        data[r][c] = { value: "", row: r, col: c, clueIndex: i, answer: word[j] };
      }
    }
    clues.push({ clue: set.clues[i], answer: word, row, col, dir, length: word.length });
  }

  return { clues, cells: data };
}

function getWordTip(answer: string, clue: string): { tip: string; suggest: string } {
  const a = answer.toLowerCase();
  if (a === "house") return { tip: '"house" — spelled H-O-U-S-E. Silent e at the end makes the vowel long.', suggest: "Review silent e spelling patterns in the Spelling trainer." };
  if (a === "apple") return { tip: '"apple" — spelled A-P-P-L-E. Double p before adding endings like -s.', suggest: "Practice double consonant spelling rules." };
  if (a === "clock") return { tip: '"clock" — spelled C-L-O-C-K. The letter c before l or r makes a /k/ sound.', suggest: "Review hard c and soft c rules." };
  if (a === "chair") return { tip: '"chair" — spelled C-H-A-I-R. The spelling "ch" makes a /tʃ/ sound.', suggest: "Practice the ch digraph in the Phonics trainer." };
  if (a === "light") return { tip: '"light" — spelled L-I-G-H-T. Silent gh can make the previous vowel long.', suggest: "Review silent gh spelling patterns." };
  if (a === "school") return { tip: '"school" — spelled S-C-H-O-O-L. The "oo" makes a long /uː/ sound.', suggest: "Practice long vowel digraphs." };
  if (a === "story") return { tip: '"story" — spelled S-T-O-R-Y. Plural is "stories" (y → ies).', suggest: "Review the y → ies plural rule." };
  if (a === "ocean") return { tip: '"ocean" — spelled O-C-E-A-N. The letter c here makes a /ʃ/ sound before e.', suggest: "Practice c making /ʃ/ sound like in ocean, social." };
  if (a === "green") return { tip: '"green" — spelled G-R-E-E-N. Double ee for the long /iː/ sound.', suggest: "Review ee digraph in the Phonics trainer." };
  if (a === "table") return { tip: '"table" — spelled T-A-B-L-E. Words ending in -le often drop the e before adding -ing: tabling.', suggest: "Review -le ending spelling rules." };
  return { tip: `"${answer}" means "${clue.toLowerCase()}". Check the spelling letter by letter.`, suggest: "Review this word with flashcards in the Vocabulary section." };
}

export function CrosswordPuzzle() {
  const { completeExercise } = useProgress();
  const [puzzle] = useState(generateCrossword);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [allCorrect, setAllCorrect] = useState(false);
  const [wrongClues, setWrongClues] = useState<number[]>([]);

  function handleChange(row: number, col: number, val: string) {
    const key = `${row}-${col}`;
    setInputs((prev) => ({ ...prev, [key]: val.toUpperCase() }));
  }

  function handleCheck() {
    let correct = 0;
    const wrong: number[] = [];
    for (let i = 0; i < puzzle.clues.length; i++) {
      const clue = puzzle.clues[i];
      const word = clue.answer;
      let allMatch = true;
      for (let j = 0; j < word.length; j++) {
        const r = clue.dir === "down" ? clue.row + j : clue.row;
        const c = clue.dir === "across" ? clue.col + j : clue.col;
        const key = `${r}-${c}`;
        if ((inputs[key] || "").toUpperCase() !== word[j]) { allMatch = false; break; }
      }
      if (allMatch) correct++;
      else wrong.push(i);
    }
    setScore(correct);
    setChecked(true);
    setWrongClues(wrong);
    if (correct === puzzle.clues.length) {
      setAllCorrect(true);
      playCorrect();
      puzzle.clues.forEach((_, i) => completeExercise(`crossword-${i}`, 10));
    } else {
      playWrong();
    }
  }

  function handleReset() {
    setInputs({});
    setChecked(false);
    setScore(0);
    setAllCorrect(false);
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-lime-600 uppercase tracking-wider">Crossword Puzzle</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div>
          <div className="grid gap-px" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 2.5rem)` }}>
            {puzzle.cells.map((row, r) =>
              row.map((cell, c) => {
                if (!cell) return <div key={`${r}-${c}`} className="w-10 h-10 bg-[var(--color-surface-alt)] rounded" />;
                const key = `${r}-${c}`;
                const isFirstInClue = puzzle.clues.some((cl) => cl.row === r && cl.col === c);
                return (
                  <div key={key} className="relative w-10 h-10">
                    {isFirstInClue && <span className="absolute -top-2 -left-1 text-[9px] font-bold text-[var(--color-text-disabled)] z-10">{puzzle.clues.findIndex((cl) => cl.row === r && cl.col === c) + 1}</span>}
                    <input
                      value={inputs[key] || ""}
                      onChange={(e) => handleChange(r, c, e.target.value.slice(-1))}
                      maxLength={1}
                      className={`w-full h-full text-center text-sm font-bold font-mono uppercase border-2 rounded transition-all duration-150 ${
                        checked
                          ? (inputs[key] || "").toUpperCase() === cell.answer
                            ? "bg-[var(--color-success)] text-white border-[var(--color-success)]"
                            : "bg-[var(--color-error)] text-white border-[var(--color-error)]"
                          : "bg-[var(--color-surface)] border-[var(--color-border-default)] text-[var(--color-text-primary)] focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                      }`}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase mb-2">Clues</p>
          <div className="space-y-2">
            {puzzle.clues.map((clue, i) => (
              <div key={i} className="text-xs">
                <span className="font-bold text-[var(--color-text-secondary)]">{i + 1}. </span>
                <span className="text-[var(--color-text-primary)]">{clue.clue}</span>
                <span className="text-[var(--color-text-disabled)] ml-1">({clue.dir}, {clue.length})</span>
              </div>
            ))}
          </div>

          {!checked ? (
            <button onClick={handleCheck} className="mt-4 text-xs font-medium bg-[var(--color-primary)] text-white px-5 py-2 rounded-[var(--radius-md)] hover:bg-brand-600 transition-all">
              Check Answers
            </button>
          ) : (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 space-y-3">
              <p className={`text-sm font-medium ${allCorrect ? "text-[var(--color-success)]" : "text-[var(--color-text-secondary)]"}`}>
                {allCorrect ? "🎉 All correct! +10 XP each" : `${score}/${puzzle.clues.length} correct`}
              </p>

              {!allCorrect && wrongClues.length > 0 && (
                <div className="space-y-2">
                  {wrongClues.map((ci) => {
                    const clue = puzzle.clues[ci];
                    const wt = getWordTip(clue.answer, clue.clue);
                    return (
                      <div key={ci}>
                        <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning)] text-white ring-1 ring-[var(--color-warning)]">
                          <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-warning)]" />
                          <div>
                            <p className="font-semibold text-sm">Astuce (Tip) — #{ci + 1}: {clue.answer}</p>
                            <p className="text-sm mt-1">{wt.tip}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info)] text-white ring-1 ring-[var(--color-info)] mt-2">
                          <BookOpen className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-info)]" />
                          <div>
                            <p className="font-semibold text-sm">Suggestion</p>
                            <p className="text-sm mt-1">{wt.suggest}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <button onClick={handleReset} className="text-xs font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-4 py-1.5 rounded-[var(--radius-md)] hover:bg-[var(--color-primary)] transition-all">
                Try Again
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

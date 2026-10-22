"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { playCorrect, playWrong } from "@/lib/audio";
import { SpeakerButton } from "@/components/ui/SpeakerButton";

const WORDS: { word: string; hint: string }[] = [
  { word: "HOUSE", hint: "A building where people live" },
  { word: "SCHOOL", hint: "A place where children learn" },
  { word: "MONEY", hint: "What you use to buy things" },
  { word: "FRIEND", hint: "A person you like and trust" },
  { word: "WATER", hint: "A clear liquid you drink" },
  { word: "BOOK", hint: "A collection of pages with stories" },
  { word: "TEACHER", hint: "A person who teaches" },
  { word: "GARDEN", hint: "An outdoor area behind a house" },
  { word: "KITCHEN", hint: "A room where you cook" },
  { word: "WINDOW", hint: "You look through this" },
  { word: "FLOWER", hint: "A colorful plant" },
  { word: "CITY", hint: "A large settlement" },
  { word: "WEEK", hint: "Seven days" },
  { word: "YEAR", hint: "Twelve months" },
  { word: "HOUR", hint: "Sixty minutes" },
  { word: "COMPUTER", hint: "An electronic device for work" },
  { word: "MUSIC", hint: "Sounds and songs" },
  { word: "ANIMAL", hint: "A living creature" },
  { word: "PLANET", hint: "Earth is one of these" },
  { word: "BRIDGE", hint: "A structure over water" },
];

const STAGES = [
  "   \n   \n   \n   \n   \n______",
  "   \n   \n   \n   \n  |\n__|___",
  "   \n   \n   \n  |\n  |\n__|___",
  "   \n   \n  O\n  |\n  |\n__|___",
  "   \n   \n  O\n /|\\\n  |\n__|___",
  "   \n  O\n /|\\\n  |\n / \\\n__|___",
];

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export function Hangman() {
  const { completeExercise } = useProgress();
  const [pool] = useState(() => [...WORDS].sort(() => Math.random() - 0.5).slice(0, 5));
  const [wordIndex, setWordIndex] = useState(0);
  const [guessed, setGuessed] = useState<Set<string>>(new Set());
  const [wrongCount, setWrongCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [finished, setFinished] = useState(false);

  const current = pool[wordIndex];
  if (!current) return null;

  const wordSet = new Set(current.word.split(""));
  const revealed = current.word.split("").map((ch) => (guessed.has(ch) ? ch : "_"));
  const wonRound = !revealed.includes("_");

  function handleGuess(letter: string) {
    if (gameOver || wonRound) return;
    if (guessed.has(letter)) return;
    setGuessed((g) => new Set(g).add(letter));
    if (!wordSet.has(letter)) {
      const nextWrong = wrongCount + 1;
      setWrongCount(nextWrong);
      if (nextWrong >= 6) {
        setGameOver(true);
        playWrong();
        return;
      }
    } else {
      const newRevealed = current.word.split("").map((ch) => (guessed.has(letter) || ch === letter ? ch : "_"));
      if (!newRevealed.includes("_")) {
        setWon(true);
        setGameOver(true);
        completeExercise(`hangman-${current.word}`, 15);
        playCorrect();
        return;
      }
      playCorrect();
    }
  }

  function handleNext() {
    if (wordIndex + 1 >= pool.length) { setFinished(true); return; }
    setWordIndex((i) => i + 1);
    setGuessed(new Set());
    setWrongCount(0);
    setGameOver(false);
    setWon(false);
  }

  function handleRestart() {
    setWordIndex(0);
    setGuessed(new Set());
    setWrongCount(0);
    setGameOver(false);
    setWon(false);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">🎮</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Hangman Complete!</h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">Great job with all words!</p>
        <button onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again 🔄</button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--color-warning)] uppercase tracking-wider">Hangman</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{wordIndex + 1}/{pool.length}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center justify-center">
          <pre className="font-mono text-sm text-[var(--color-text-secondary)] leading-tight bg-[var(--color-surface-alt)] p-4 rounded-[var(--radius-md)] border border-[var(--color-border-default)]">{STAGES[wrongCount]}</pre>
          <p className="text-xs text-[var(--color-text-disabled)] mt-2">Wrong: {wrongCount}/6</p>
        </div>

        <div>
          <div className="flex items-center justify-center gap-1 mb-3">
            <span className="text-sm text-[var(--color-text-secondary)] mr-1">Hint:</span>
            <span className="text-sm text-[var(--color-text-secondary)] italic">{current.hint}</span>
          </div>

          <div className="flex items-center justify-center gap-1 mb-4">
            {revealed.map((ch, i) => (
              <span key={i} className={`w-8 h-10 flex items-center justify-center border-b-2 text-xl font-display font-extrabold font-mono ${ch !== "_" ? "border-[var(--color-primary)] text-[var(--color-primary-dark)]" : "border-[var(--color-border-default)] text-[var(--color-text-disabled)]"}`}>
                {ch}
              </span>
            ))}
          </div>

          {gameOver && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-4">
              {won ? (
                <p className="text-sm font-medium text-[var(--color-success)]">🎉 Correct! The word was <strong>{current.word}</strong> +15 XP</p>
              ) : (
                <p className="text-sm font-medium text-[var(--color-error)]">Game Over! The word was <strong>{current.word}</strong></p>
              )}
              <button onClick={handleNext} className="mt-2 text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
                {wordIndex + 1 >= pool.length ? "See Results" : "Next Word →"}
              </button>
            </motion.div>
          )}

          <div className="flex flex-wrap justify-center gap-1.5 max-w-xs mx-auto">
            {LETTERS.map((ch) => {
              const used = guessed.has(ch);
              const isCorrect = used && wordSet.has(ch);
              const isWrong = used && !wordSet.has(ch);
              return (
                <button key={ch} onClick={() => handleGuess(ch)} disabled={used || gameOver} className={`w-8 h-8 text-xs font-bold rounded-[var(--radius-md)] border transition-all duration-150 ${isCorrect ? "bg-emerald-100 border-[var(--color-success)] text-[var(--color-success)]" : isWrong ? "bg-red-100 border-[var(--color-error)] text-[var(--color-error)] line-through" : used ? "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-disabled)] cursor-not-allowed" : "bg-[var(--color-surface)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-[var(--color-primary-subtle)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-dark)]"}`}>
                  {ch}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

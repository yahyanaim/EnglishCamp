"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { playCorrect, playWrong } from "@/lib/audio";

const RACE_DURATION = 60;

const FALLBACK_CARDS = [
  { word: "apple", meaning: "a red or green fruit" }, { word: "book", meaning: "something you read" }, { word: "cat", meaning: "a small pet" },
  { word: "dog", meaning: "a pet that barks" }, { word: "egg", meaning: "food from chickens" }, { word: "fish", meaning: "an animal that swims" },
  { word: "green", meaning: "the color of grass" }, { word: "house", meaning: "a building for living" }, { word: "ice", meaning: "frozen water" },
  { word: "jump", meaning: "to move off the ground" }, { word: "king", meaning: "a male ruler" }, { word: "lamp", meaning: "gives light" },
  { word: "milk", meaning: "a white drink" }, { word: "name", meaning: "what people call you" }, { word: "open", meaning: "not closed" },
  { word: "pink", meaning: "a light red color" }, { word: "queen", meaning: "a female ruler" }, { word: "rain", meaning: "water from the sky" },
  { word: "sun", meaning: "the bright star in daytime" }, { word: "tree", meaning: "a tall plant" },
];

export function FlashcardRace() {
  const { completeExercise } = useProgress();
  const [raceCards] = useState(() => [...FALLBACK_CARDS].sort(() => Math.random() - 0.5).slice(0, 20));
  const [index, setIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(RACE_DURATION);
  const [score, setScore] = useState(0);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    if (!started || finished || timeLeft <= 0) return;
    const t = setInterval(() => { setTimeLeft((v) => { if (v <= 1) { setFinished(true); return 0; } return v - 1; }); }, 1000);
    return () => clearInterval(t);
  }, [started, finished, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0) setFinished(true);
  }, [timeLeft]);

  const current = raceCards[index];

  function handleKnown() {
    if (!current || finished) return;
    setScore((s) => s + 1);
    playCorrect();
    completeExercise(`flashrace-${current.word}`, 5);
    if (index + 1 >= raceCards.length) { setFinished(true); return; }
    setIndex((i) => i + 1); setFlipped(false);
  }

  function handleUnknown() {
    if (!current || finished) return;
    playWrong();
    if (index + 1 >= raceCards.length) { setFinished(true); return; }
    setIndex((i) => i + 1); setFlipped(false);
  }

  function handleRestart() {
    setIndex(0); setTimeLeft(RACE_DURATION); setScore(0);
    setStarted(true); setFinished(false); setFlipped(false);
  }

  if (!started) {
    return (
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm text-center py-10" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
        <span className="text-5xl block mb-3">⏱️</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-2">Flashcard Race</h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-2">How many cards can you get through in {RACE_DURATION} seconds?</p>
        <p className="text-xs text-[var(--color-text-disabled)] mb-6">Flip each card, then mark Known or Skip</p>
        <button onClick={() => setStarted(true)} className="text-sm font-medium bg-[var(--color-primary)] text-white px-6 py-2.5 rounded-[var(--radius-lg)] hover:bg-brand-600 transition-all">Start Race 🏁</button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">{score >= 10 ? "🏆" : score >= 5 ? "👍" : "💪"}</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Time&apos;s Up!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)] mb-1">{score} cards known</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{score >= 10 ? "Lightning fast!" : score >= 5 ? "Good pace!" : "Speed comes with practice!"}</p>
        <button onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again 🔄</button>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">Flashcard Race</span>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-mono font-bold ${timeLeft <= 10 ? "text-[var(--color-error)]" : "text-[var(--color-text-secondary)]"}`}>{timeLeft}s</span>
          <span className="text-xs text-[var(--color-text-disabled)]">{index + 1}/{raceCards.length}</span>
        </div>
      </div>

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-4 cursor-pointer"
        onClick={() => setFlipped(true)}
      >
        <div className={`relative w-full max-w-sm mx-auto h-44 rounded-[var(--radius-lg)] border-2 transition-all duration-300 flex items-center justify-center ${flipped ? "bg-[var(--color-success)] text-white border-[var(--color-success)]" : "bg-[var(--color-surface)] border-[var(--color-border-default)] hover:border-[var(--color-primary)] hover:shadow-md"}`}>
          {!flipped ? (
            <div className="text-center">
              <span className="text-4xl block mb-2">🃏</span>
              <p className="text-sm text-[var(--color-text-disabled)]">Tap to flip</p>
            </div>
          ) : (
            <div className="text-center p-4">
              <p className="text-2xl font-display font-extrabold text-[var(--color-text-primary)]">{current.word}</p>
               <p className="text-sm text-[var(--color-text-secondary)] mt-1">{current.meaning}</p>
            </div>
          )}
        </div>
      </motion.div>

      <div className="flex justify-center gap-3">
        <motion.button whileTap={{ scale: 0.95 }} onClick={handleKnown} className="text-sm font-medium bg-[var(--color-success)] text-white  border border-[var(--color-success)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-emerald-100 transition-all">
          ✓ Known
        </motion.button>
        <motion.button whileTap={{ scale: 0.95 }} onClick={handleUnknown} className="text-sm font-medium bg-[var(--color-error)] text-white  border border-[var(--color-error)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-red-100 transition-all">
          ✗ Skip
        </motion.button>
      </div>

      <div className="flex justify-center gap-1 mt-4">
        {raceCards.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i <= index ? "bg-rose-300" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </div>
  );
}

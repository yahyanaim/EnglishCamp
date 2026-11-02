"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { speak, playCorrect, playWrong } from "@/lib/audio";

const ITEMS = [
  { word: "apple", hint: "a red or green fruit" },
  { word: "book", hint: "something you read" },
  { word: "cat", hint: "a small pet that says meow" },
  { word: "dog", hint: "a pet that barks" },
  { word: "egg", hint: "a food that comes from chickens" },
  { word: "fish", hint: "an animal that swims" },
  { word: "green", hint: "the color of grass" },
  { word: "house", hint: "a building where people live" },
  { word: "ice", hint: "frozen water" },
  { word: "jump", hint: "to move up off the ground" },
  { word: "king", hint: "a male ruler of a country" },
  { word: "lamp", hint: "something that gives light" },
  { word: "milk", hint: "a white drink from cows" },
  { word: "name", hint: "what people call you" },
  { word: "open", hint: "not closed" },
  { word: "pink", hint: "a light red color" },
  { word: "queen", hint: "a female ruler of a country" },
  { word: "rain", hint: "water that falls from the sky" },
  { word: "sun", hint: "the bright star in the day sky" },
  { word: "tree", hint: "a tall plant with leaves" },
];

export function Dictation() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();
  const [pool] = useState(() => [...ITEMS].sort(() => Math.random() - 0.5).slice(0, 8));
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<"correct" | "wrong" | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const [hintUsed, setHintUsed] = useState(false);

  const current = pool[index];

  const playAudio = useCallback(() => {
    if (current) speak(current.word, "en-US");
  }, [current]);

  useEffect(() => {
    if (autoPlay && current) {
      const t = setTimeout(() => playAudio(), 400);
      return () => clearTimeout(t);
    }
  }, [index, autoPlay, current, playAudio]);

  if (!current && !done) return null;

  function handleSubmit() {
    if (result || !current) return;
    const normalized = input.trim().toLowerCase();
    const expected = current.word.toLowerCase();
    const isCorrect = normalized === expected;
    setResult(isCorrect ? "correct" : "wrong");
    setTotal((t) => t + 1);
    if (isCorrect) {
      setScore((s) => s + 1);
      playCorrect();
      completeExercise(`dictation-${index}`, 10);
    } else {
      playWrong();
      addError({
        question: `Dictation: "${current.hint}"`,
        userAnswer: input,
        correctAnswer: current.word,
        explanation: `You heard "${current.word}" — ${current.hint}`,
        source: "dictation",
        sourceId: `dictation-${index}`,
      });
    }
  }

  function handleNext() {
    if (!current) return;
    if (index + 1 >= pool.length) { setDone(true); return; }
    setIndex((i) => i + 1);
    setInput("");
    setResult(null);
    setHintUsed(false);
  }

  function handleRestart() {
    setIndex(0);
    setInput("");
    setResult(null);
    setScore(0);
    setTotal(0);
    setDone(false);
    setHintUsed(false);
  }

  if (done) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "💪"}</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Dictation Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-text-link)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "Excellent listening skills!" : "Keep practicing!"}</p>
        <PracticeButton onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again <LearningArt name="🔄" size={16} /></PracticeButton>
      </div>
    );
  }

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--color-text-warning)] uppercase tracking-wider">Dictation</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{index + 1}/{pool.length}</span>
      </div>

      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <PracticeButton onClick={playAudio} className="w-14 h-14 rounded-[var(--radius-pill)] bg-[var(--color-primary-subtle)] hover:bg-[var(--color-primary)] border border-[var(--color-primary)] flex items-center justify-center transition-all hover:scale-105">
            <LearningArt name="🔊" size={24} className="" />
          </PracticeButton>
          <PracticeButton onClick={() => setAutoPlay(!autoPlay)} className={`text-xs font-medium px-3 py-1 rounded-[var(--radius-pill)] border transition-all ${autoPlay ? "bg-[var(--color-primary-subtle)] border-[var(--color-primary)] text-[var(--color-text-link)]" : "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-secondary)]"}`}>
            Auto
          </PracticeButton>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Type what you hear</p>
        <p className="text-xs text-[var(--color-text-secondary)] italic mt-1">({current.hint})</p>
      </div>

      <div className="flex items-center justify-center gap-2 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
          placeholder="Type what you hear..."
          disabled={!!result}
          className="w-full max-w-md px-4 py-3 text-center text-lg font-medium border border-[var(--color-border-default)] rounded-[var(--radius-lg)] bg-[var(--color-surface)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:border-brand-400 focus:ring-2 focus:ring-brand-100 outline-none transition-all disabled:opacity-60"
        />
        <PracticeButton onClick={() => { setHintUsed(true); playAudio(); }} className="text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-secondary)] px-2 py-1 rounded hover:bg-[var(--color-surface-alt)] transition-all"><LearningArt name="🔁" size={16} /></PracticeButton>
      </div>

      {!result && input.trim() && (
        <div className="text-center">
          <PracticeButton onClick={handleSubmit} className="text-sm font-medium bg-[var(--color-primary)] text-[var(--color-on-brand)] px-6 py-2.5 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary-hover)] transition-all">
            Check
          </PracticeButton>
        </div>
      )}

      {result && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-1 ${result === "correct" ? "text-[var(--color-text-success)]" : "text-[var(--color-text-error)]"}`}>
            {result === "correct" ? "✓ Correct! +10 XP" : `✗ Correct: "${current.word}"`}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] mb-3">{current.hint}</p>
          <PracticeButton onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {index + 1 >= pool.length ? "See Results" : "Next →"}
          </PracticeButton>
        </motion.div>
      )}

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-orange-300" : i === index ? "bg-orange-500" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </PracticeCard>
  );
}

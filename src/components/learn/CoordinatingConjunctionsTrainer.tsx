"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type ConjunctionItem = { clause1: string; clause2: string; conjunction: string; en: string };

const ITEMS: ConjunctionItem[] = [
  { clause1: "I like tea", clause2: "my brother likes coffee", conjunction: "but", en: "I like tea, but my brother likes coffee" },
  { clause1: "He studies medicine", clause2: "she studies law", conjunction: "and", en: "He studies medicine and she studies law" },
  { clause1: "Do you take the bus", clause2: "do you walk", conjunction: "or", en: "Do you take the bus or walk?" },
  { clause1: "He didn't come to the party", clause2: "he was sick", conjunction: "because", en: "He didn't come to the party because he was sick" },
  { clause1: "That is not green", clause2: "blue", conjunction: "but rather", en: "That is not green but rather blue" },
  { clause1: "I learn English", clause2: "my friend learns French", conjunction: "and", en: "I learn English and my friend learns French" },
  { clause1: "She is tired", clause2: "she continues", conjunction: "but", en: "She is tired but she continues" },
  { clause1: "Do we go to the cinema", clause2: "do we stay at home", conjunction: "or", en: "Do we go to the cinema or stay at home?" },
  { clause1: "We must hurry", clause2: "the train is coming soon", conjunction: "because", en: "We must hurry because the train is coming soon" },
  { clause1: "That is not a table", clause2: "a desk", conjunction: "but rather", en: "That is not a table but rather a desk" },
  { clause1: "He has little money", clause2: "he is happy", conjunction: "but", en: "He has little money but he is happy" },
  { clause1: "I cook dinner", clause2: "you set the table", conjunction: "and", en: "I cook dinner and you set the table" },
  { clause1: "Would you like coffee", clause2: "tea", conjunction: "or", en: "Would you like coffee or tea?" },
  { clause1: "She speaks English well", clause2: "she practices every day", conjunction: "because", en: "She speaks English well because she practices every day" },
  { clause1: "That is not expensive", clause2: "very cheap", conjunction: "but rather", en: "That is not expensive but rather very cheap" },
];

const CONJUNCTIONS = ["and", "but", "or", "because", "but rather"];

export function CoordinatingConjunctionsTrainer() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();
  const [pool, setPool] = useState<ConjunctionItem[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setPool([...ITEMS].sort(() => Math.random() - 0.5).slice(0, 12));
  }, []);

  const current = pool[index];
  if (!current && !done) return null;

  function handleSelect(conj: string) {
    if (selected || !current) return;
    setSelected(conj);
    setTotal((t) => t + 1);
    if (conj === current.conjunction) {
      setScore((s) => s + 1);
      playCorrect();
      completeExercise(`conj-${index}`, 5);
    } else {
      playWrong();
      addError({ question: `Conjunction: "${current.clause1} ___ ${current.clause2}"`, userAnswer: conj, correctAnswer: current.conjunction, explanation: `"${current.conjunction}" connects: ${current.en}`, source: "conjunction", sourceId: `conj-${index}` });
    }
  }

  function handleNext() {
    if (!current) return;
    if (index + 1 >= pool.length) { setDone(true); return; }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  function handleRestart() {
    setPool([...ITEMS].sort(() => Math.random() - 0.5).slice(0, 12));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setTotal(0);
    setDone(false);
  }

  if (done) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "💪"}</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Conjunctions Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "Excellent conjunction skills!" : "Keep practicing!"}</p>
        <button onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again 🔄</button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-teal-500 uppercase tracking-wider">Conjunctions</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-5">
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">Choose the correct conjunction</p>
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4 border border-[var(--color-border-default)] mb-1">
            <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">
              {current.clause1} <span className="text-[var(--color-primary-dark)] font-bold">___</span> {current.clause2}
            </p>
          </div>
          <p className="text-xs text-[var(--color-text-disabled)] italic">{current.en}</p>
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {CONJUNCTIONS.map((c) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700";
          if (selected) {
            if (c === current.conjunction) style = "bg-[var(--color-success)] text-white border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (c === selected) style = "bg-[var(--color-error)] text-white border-[var(--color-error)]";
            else style = "opacity-40";
          }
          return (
            <button key={c} onClick={() => handleSelect(c)} disabled={!!selected} className={`px-5 py-2.5 text-sm font-bold rounded-[var(--radius-lg)] border-2 transition-all duration-200 ${style}`}>
              {c}
            </button>
          );
        })}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-3 ${selected === current.conjunction ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}>
            {selected === current.conjunction ? "✓ Correct! +5 XP" : `✗ Correct: "${current.conjunction}"`}
          </p>
          <button onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {index + 1 >= pool.length ? "See Results" : "Next →"}
          </button>
        </motion.div>
      )}

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-teal-300" : i === index ? "bg-teal-500" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </div>
  );
}

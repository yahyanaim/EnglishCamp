"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type Item = { sentence: string; options: string[]; correct: string; explanation: string; noun: string };

const ITEMS: Item[] = [
  { noun: "student", sentence: "I see three ___ in the library.", correct: "students", options: ["student", "students", "student's", "students'"], explanation: "Regular plural: student + s → students" },
  { noun: "name", sentence: "My ___ is John.", correct: "name", options: ["name", "names", "name's", "names'"], explanation: "Singular: 'my name' refers to one name." },
  { noun: "name", sentence: "Do you know their ___?", correct: "names", options: ["name", "names", "name's", "names'"], explanation: "Plural: 'their names' means more than one name." },
  { noun: "child", sentence: "The ___ are playing in the garden.", correct: "children", options: ["child", "children", "childs", "child's"], explanation: "Irregular plural: child → children" },
  { noun: "child", sentence: "I gave the ___ a ball.", correct: "child", options: ["child", "children", "childs", "child's"], explanation: "Singular: 'the child' refers to one child." },
  { noun: "man", sentence: "Good morning, ___ Smith!", correct: "Mr", options: ["Mr", "Mrs", "Ms", "Sir"], explanation: "'Mr' is used before a man's surname." },
  { noun: "man", sentence: "The ___ are working hard.", correct: "men", options: ["man", "men", "mans", "man's"], explanation: "Irregular plural: man → men" },
  { noun: "colleague", sentence: "My ___ name is Peter.", correct: "colleague's", options: ["colleague", "colleagues", "colleague's", "colleagues'"], explanation: "Possessive: colleague + 's → colleague's (one colleague)" },
  { noun: "colleague", sentence: "I help my ___ with their work.", correct: "colleagues", options: ["colleague", "colleagues", "colleague's", "colleagues'"], explanation: "Plural: more than one colleague." },
  { noun: "person", sentence: "All ___ are mortal.", correct: "people", options: ["person", "people", "persons", "person's"], explanation: "Irregular plural: person → people" },
  { noun: "person", sentence: "That is a friendly ___.", correct: "person", options: ["person", "people", "persons", "person's"], explanation: "Singular: 'a person' refers to one individual." },
  { noun: "neighbor", sentence: "Our ___ has a dog.", correct: "neighbor", options: ["neighbor", "neighbors", "neighbor's", "neighbors'"], explanation: "Singular: one neighbor." },
  { noun: "neighbor", sentence: "We visit our ___ house.", correct: "neighbor's", options: ["neighbor", "neighbors", "neighbor's", "neighbors'"], explanation: "Possessive singular: neighbor + 's → neighbor's house" },
  { noun: "president", sentence: "The ___ is giving a speech.", correct: "president", options: ["president", "presidents", "president's", "presidents'"], explanation: "Singular: one president." },
  { noun: "president", sentence: "The speech of the ___ was great.", correct: "president", options: ["president", "presidents", "president's", "presidents'"], explanation: "Singular: 'the president' (no change after 'of the')." },
];

export function WeakNounsTrainer() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();
  const [pool, setPool] = useState<Item[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => { setPool([...ITEMS].sort(() => Math.random() - 0.5).slice(0, 12)); }, []);

  const current = pool[index];
  if (!current && !done) return null;

  function handleSelect(opt: string) {
    if (selected || !current) return;
    setSelected(opt);
    setTotal((t) => t + 1);
    if (opt === current.correct) { setScore((s) => s + 1); playCorrect(); completeExercise(`weak-${current.noun}-${index}`, 10); }
    else { playWrong(); addError({ question: `Weak noun: "${current.sentence}"`, userAnswer: opt, correctAnswer: current.correct, explanation: current.explanation, source: "weaknoun", sourceId: `weak-${current.noun}-${index}` }); }
  }

  function handleNext() {
    if (!current) return;
    if (index + 1 >= pool.length) { setDone(true); return; }
    setIndex((i) => i + 1); setSelected(null);
  }

  function handleRestart() {
    setPool([...ITEMS].sort(() => Math.random() - 0.5).slice(0, 12));
    setIndex(0); setSelected(null); setScore(0); setTotal(0); setDone(false);
  }

  if (done) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "💪"}</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Noun Forms Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "Excellent irregular plural skills!" : "Keep practicing!"}</p>
        <button onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again 🔄</button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Noun Forms</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-5">
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">Choose the correct form of <strong className="text-[var(--color-text-primary)]">{current.noun}</strong></p>
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4 border border-[var(--color-border-default)]">
            <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">{current.sentence}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {current.options.map((opt) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-stone-50 hover:border-stone-300 hover:text-stone-700";
          if (selected) {
            if (opt === current.correct) style = "bg-[var(--color-success)] text-white border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (opt === selected) style = "bg-[var(--color-error)] text-white border-[var(--color-error)]";
            else style = "opacity-40";
          }
          return (
            <button key={opt} onClick={() => handleSelect(opt)} disabled={!!selected} className={`text-sm font-medium px-4 py-3 rounded-[var(--radius-lg)] border-2 transition-all duration-200 ${style}`}>
              {opt}
            </button>
          );
        })}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-1 ${selected === current.correct ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}>
            {selected === current.correct ? "✓ Correct! +10 XP" : `✗ Correct: ${current.correct}`}
          </p>
          <p className="text-xs text-[var(--color-text-disabled)] mb-3">{current.explanation}</p>
          <button onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {index + 1 >= pool.length ? "See Results" : "Next →"}
          </button>
        </motion.div>
      )}

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-stone-300" : i === index ? "bg-stone-500" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type Item = { sentence: string; blank: string; options: string[]; explanation: string };

const ITEMS: Item[] = [
  { sentence: "I ___ like it.", blank: "don't", options: ["don't", "do not", "dont", "doesnt"], explanation: "do not → don't (negative)" },
  { sentence: "She ___ coming.", blank: "isn't", options: ["isn't", "is not", "arent", "wasn't"], explanation: "is not → isn't (negative)" },
  { sentence: "They ___ arrive on time.", blank: "won't", options: ["won't", "will not", "wouldn't", "wont"], explanation: "will not → won't (future negative)" },
  { sentence: "I ___ seen him.", blank: "haven't", options: ["haven't", "have not", "hasn't", "hadn't"], explanation: "have not → haven't (present perfect)" },
  { sentence: "He ___ finished yet.", blank: "hasn't", options: ["hasn't", "has not", "haven't", "hadn't"], explanation: "has not → hasn't (third person)" },
  { sentence: "We ___ go there.", blank: "can't", options: ["can't", "cannot", "couldn't", "cant"], explanation: "cannot → can't (ability)" },
  { sentence: "You ___ tell anyone.", blank: "mustn't", options: ["mustn't", "must not", "might not", "shouldn't"], explanation: "must not → mustn't (prohibition)" },
  { sentence: "It ___ raining.", blank: "wasn't", options: ["wasn't", "was not", "weren't", "isn't"], explanation: "was not → wasn't (past negative)" },
  { sentence: "___ you help me?", blank: "Couldn't", options: ["Couldn't", "Could not", "Can't", "Cannot"], explanation: "Could not → Couldn't (polite question)" },
  { sentence: "I ___ rather stay.", blank: "wouldn't", options: ["wouldn't", "would not", "won't", "shouldn't"], explanation: "would not → wouldn't (conditional)" },
  { sentence: "___ late!", blank: "Don't be", options: ["Don't be", "Do not be", "Not be", "Don't"], explanation: "Do not be → Don't be (imperative)" },
  { sentence: "She ___ like coffee.", blank: "doesn't", options: ["doesn't", "does not", "don't", "didn't"], explanation: "does not → doesn't (third person present)" },
  { sentence: "I ___ know the answer.", blank: "didn't", options: ["didn't", "did not", "don't", "doesn't"], explanation: "did not → didn't (past simple)" },
  { sentence: "They ___ ready yet.", blank: "aren't", options: ["aren't", "are not", "isn't", "weren't"], explanation: "are not → aren't (present negative)" },
  { sentence: "___ a nice day!", blank: "What a", options: ["What a", "How a", "What", "Such a"], explanation: "\"What a\" is used in exclamations" },
];

export function EnglishContractionsTrainer() {
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
    if (opt === current.blank) { setScore((s) => s + 1); playCorrect(); completeExercise(`prepcontr-${index}`, 5); }
    else { playWrong(); addError({ question: `Prepositional contraction: "${current.sentence}"`, userAnswer: opt, correctAnswer: current.blank, explanation: current.explanation, source: "prepcontr", sourceId: `prepcontr-${index}` }); }
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
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">English Contractions Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "Excellent contraction skills!" : "Keep practicing!"}</p>
        <button onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again 🔄</button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--color-error)] uppercase tracking-wider">English Contractions</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-5">
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4 border border-[var(--color-border-default)]">
            <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">
              {current.sentence.replace("___", <span className="text-[var(--color-primary-dark)] font-bold">___</span> as any)}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {current.options.map((opt) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-[var(--color-error)] text-white hover:border-red-300 hover:text-red-700";
          if (selected) {
            if (opt === current.blank) style = "bg-[var(--color-success)] text-white border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (opt === selected) style = "bg-[var(--color-error)] text-white border-[var(--color-error)]";
            else style = "opacity-40";
          }
          return (
            <button key={opt} onClick={() => handleSelect(opt)} disabled={!!selected} className={`px-4 py-2.5 text-sm font-bold rounded-[var(--radius-lg)] border-2 transition-all duration-200 ${style}`}>
              {opt}
            </button>
          );
        })}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-1 ${selected === current.blank ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}>
            {selected === current.blank ? "✓ Correct! +5 XP" : `✗ Correct: ${current.blank}`}
          </p>
          <p className="text-xs text-[var(--color-text-disabled)] mb-3">{current.explanation}</p>
          <button onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {index + 1 >= pool.length ? "See Results" : "Next →"}
          </button>
        </motion.div>
      )}

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-red-300" : i === index ? "bg-red-500" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </div>
  );
}

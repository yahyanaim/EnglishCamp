"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type TwoWayEntry = { sentence: string; answer: "in" | "into"; en: string; hint: string };

const TWO_WAY: TwoWayEntry[] = [
  { sentence: "I go ____ the cinema.", answer: "into", en: "movement toward the interior", hint: "direction or location?" },
  { sentence: "I am ____ the cinema.", answer: "in", en: "location inside", hint: "direction or location?" },
  { sentence: "The book lies ____ the drawer.", answer: "in", en: "location inside the drawer", hint: "direction or location?" },
  { sentence: "I put the book ____ the drawer.", answer: "into", en: "movement toward the interior", hint: "direction or location?" },
  { sentence: "She goes ____ the school.", answer: "into", en: "movement toward", hint: "direction or location?" },
  { sentence: "She studies ____ the school.", answer: "in", en: "location", hint: "direction or location?" },
  { sentence: "The cat jumps ____ the box.", answer: "into", en: "movement toward the interior", hint: "direction or location?" },
  { sentence: "The cat sleeps ____ the box.", answer: "in", en: "location inside", hint: "direction or location?" },
  { sentence: "We drive ____ the city.", answer: "into", en: "movement toward", hint: "direction or location?" },
  { sentence: "We live ____ the city.", answer: "in", en: "location", hint: "direction or location?" },
  { sentence: "He threw the ball ____ the water.", answer: "into", en: "movement", hint: "direction or location?" },
  { sentence: "The fish swim ____ the water.", answer: "in", en: "location", hint: "direction or location?" },
];

export function TwoWayPrepositionsTrainer() {
  const { completeExercise } = useProgress(); const { addError } = useErrors();
  const [pool, setPool] = useState<TwoWayEntry[]>([]);
  const [current, setCurrent] = useState(0); const [score, setScore] = useState(0); const [total, setTotal] = useState(0);
  const [answered, setAnswered] = useState(false); const [correct, setCorrect] = useState(false); const [done, setDone] = useState(false);

  useEffect(() => { setPool([...TWO_WAY].sort(() => Math.random() - 0.5).slice(0, 8)); }, []);

  const item = pool[current];

  function handleAnswer(choice: "in" | "into") {
    if (answered || !item) return;
    const isCorrect = choice === item.answer;
    setCorrect(isCorrect); setAnswered(true); setTotal((t) => t + 1);
    if (isCorrect) { setScore((s) => s + 1); playCorrect(); }
    else { playWrong(); addError({ question: `Preposition: "${item.sentence}"`, userAnswer: choice, correctAnswer: item.answer, explanation: item.en, source: "exercise", sourceId: `twoway-${current}` }); }
  }

  function next() {
    if (!item) return; if (correct) completeExercise(`twoway-${current}`, 5);
    if (current + 1 >= pool.length) { setDone(true); return; }
    setCurrent((c) => c + 1); setAnswered(false); setCorrect(false);
  }

  function restart() { setPool([...TWO_WAY].sort(() => Math.random() - 0.5).slice(0, 8)); setCurrent(0); setScore(0); setTotal(0); setAnswered(false); setCorrect(false); setDone(false); }

  if (done) return <div className="text-center py-8"><span className="text-5xl block mb-3">🏆</span><h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Prepositions Done!</h3><p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)]">{score}/{total}</p><button onClick={restart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-4">Play Again 🔄</button></div>;
  if (!item) return null;

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--color-info)] uppercase tracking-wider">Two-Way Prepositions</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{current + 1}/{pool.length}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="mb-4">
          <p className="text-xs text-[var(--color-text-disabled)] mb-1">{item.hint}</p>
          <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)] font-mono">{item.sentence}</p>
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { value: "into" as const, label: "into (movement)" },
          { value: "in" as const, label: "in (location)" },
        ].map((opt) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] hover:bg-[var(--color-primary-subtle)] hover:border-[var(--color-primary)]";
          if (answered) {
            if (opt.value === item.answer) style = "bg-[var(--color-success)] text-white border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else style = "bg-[var(--color-error)] text-white border-[var(--color-error)] opacity-50";
          }
          return (
            <button key={opt.value} onClick={() => handleAnswer(opt.value)} disabled={answered}
              className={`p-4 rounded-[var(--radius-lg)] border-2 text-sm font-semibold transition-all ${style}`}>
              {opt.label}
            </button>
          );
        })}
      </div>
      {answered && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-2 ${correct ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}>
            {correct ? "✓ Correct!" : `✗ Correct: ${item.answer === "into" ? "into" : "in"}`}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] mb-2">{item.en}</p>
          <button onClick={next} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {current + 1 >= pool.length ? "Results" : "Next →"}
          </button>
        </motion.div>
      )}
    </div>
  );
}

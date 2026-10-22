"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type AdjEntry = { context: string; noun: string; adj: string; correct: string; hint: string };

const ADJ: AdjEntry[] = [
  { context: "a", noun: "man", adj: "tall", correct: "tall", hint: "base form: tall" },
  { context: "a", noun: "woman", adj: "kind", correct: "kind", hint: "base form: kind" },
  { context: "a", noun: "child", adj: "happy", correct: "happy", hint: "base form: happy" },
  { context: "the", noun: "man", adj: "old", correct: "old", hint: "base form: old" },
  { context: "a", noun: "day", adj: "beautiful", correct: "beautiful", hint: "base form: beautiful" },
  { context: "a", noun: "car", adj: "fast", correct: "fast", hint: "base form: fast" },
  { context: "a", noun: "book", adj: "interest", correct: "interesting", hint: "add -ing: interesting" },
  { context: "a", noun: "story", adj: "excite", correct: "exciting", hint: "add -ing: exciting" },
  { context: "a", noun: "film", adj: "bore", correct: "boring", hint: "add -ing: boring" },
  { context: "an", noun: "experience", adj: "amaze", correct: "amazing", hint: "add -ing: amazing" },
  { context: "a", noun: "game", adj: "tire", correct: "tiring", hint: "add -ing: tiring" },
  { context: "a", noun: "lesson", adj: "interest", correct: "interesting", hint: "add -ing: interesting" },
  { context: "a", noun: "job", adj: "tire", correct: "tiring", hint: "add -ing: tiring" },
  { context: "a", noun: "person", adj: "interest", correct: "interesting", hint: "add -ing: interesting" },
  { context: "an", noun: "idea", adj: "excite", correct: "exciting", hint: "add -ing: exciting" },
];

const ENDINGS = ["-ing", "-ed", "-ful", "-less", ""];

export function AdjectiveEndingsTrainer() {
  const { completeExercise } = useProgress(); const { addError } = useErrors();
  const [pool, setPool] = useState<AdjEntry[]>([]);
  const [current, setCurrent] = useState(0); const [score, setScore] = useState(0); const [total, setTotal] = useState(0);
  const [answered, setAnswered] = useState(false); const [correct, setCorrect] = useState(false); const [done, setDone] = useState(false);

  useEffect(() => { setPool([...ADJ].sort(() => Math.random() - 0.5).slice(0, 10)); }, []);

  const item = pool[current];

  function handleAnswer(ending: string) {
    if (answered || !item) return;
    const full = item.adj + ending;
    const isCorrect = full === item.correct || ending === item.correct;
    setCorrect(isCorrect); setAnswered(true); setTotal((t) => t + 1);
    if (isCorrect) { setScore((s) => s + 1); playCorrect(); }
    else { playWrong(); addError({ question: `Adjective form: "${item.context} ____ ${item.noun}" (${item.adj})`, userAnswer: item.context + " " + full, correctAnswer: `${item.context} ${item.correct} ${item.noun}`, explanation: `${item.hint}`, source: "exercise", sourceId: `adj-${current}` }); }
  }

  function next() {
    if (!item) return; if (correct) completeExercise(`adj-${current}`, 5);
    if (current + 1 >= pool.length) { setDone(true); return; }
    setCurrent((c) => c + 1); setAnswered(false); setCorrect(false);
  }

  function restart() { setPool([...ADJ].sort(() => Math.random() - 0.5).slice(0, 10)); setCurrent(0); setScore(0); setTotal(0); setAnswered(false); setCorrect(false); setDone(false); }

  if (done) return <div className="text-center py-8"><span className="text-5xl block mb-3">🏆</span><h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Adjective Forms Done!</h3><p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)]">{score}/{total}</p><button onClick={restart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-4">Play Again 🔄</button></div>;
  if (!item) return null;

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-fuchsia-600 uppercase tracking-wider">Adjective Endings</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{current + 1}/{pool.length}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-4">
          <p className="text-xs text-[var(--color-text-disabled)] mb-2">Choose the correct adjective form:</p>
          <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">
            {item.context} <span className="text-[var(--color-primary-dark)]">{item.adj}</span>___{item.noun}
          </p>
          <p className="text-xs text-[var(--color-text-disabled)] italic">{item.hint}</p>
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-5 gap-2 mb-4">
        {ENDINGS.map((e) => {
          const full = item.adj + e;
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] hover:bg-[var(--color-primary-subtle)] hover:border-[var(--color-primary)]";
          if (answered) {
            const isThisCorrect = (item.adj + e) === item.correct || e === item.correct;
            if (isThisCorrect) style = "bg-[var(--color-success)] text-white border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else style = "bg-[var(--color-error)] text-white border-[var(--color-error)] opacity-50";
          }
          return (
            <button key={e} onClick={() => handleAnswer(e)} disabled={answered}
              className={`p-3 rounded-[var(--radius-lg)] border-2 text-sm font-mono font-bold transition-all ${style}`}>
              {e}
            </button>
          );
        })}
      </div>
      {answered && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-2 ${correct ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}>
              {correct ? "✓ Correct!" : `✗ Correct: "${item.context} ${item.correct} ${item.noun}"`}
          </p>
          <button onClick={next} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {current + 1 >= pool.length ? "Results" : "Next →"}
          </button>
        </motion.div>
      )}
    </div>
  );
}

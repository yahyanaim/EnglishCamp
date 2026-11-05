"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

import { WORD_ORDER_PRACTICE } from "@/data/practice-audit-corrections";

type WOEntry = { en: string; options: string[]; correct: string; explanation: string };

const WO: WOEntry[] = WORD_ORDER_PRACTICE;

export function WordOrderTrainer() {
  const { completeExercise } = useProgress(); const { addError } = useErrors();
  const [pool, setPool] = useState<WOEntry[]>([]);
  const [current, setCurrent] = useState(0); const [score, setScore] = useState(0); const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<string | null>(null); const [answered, setAnswered] = useState(false); const [correct, setCorrect] = useState(false); const [done, setDone] = useState(false);

  useEffect(() => { setPool([...WO].sort(() => Math.random() - 0.5)); }, []);

  const item = pool[current];

  function handleAnswer(opt: string) {
    if (answered || !item) return;
    const isCorrect = opt === item.correct;
    setSelected(opt); setCorrect(isCorrect); setAnswered(true); setTotal((t) => t + 1);
    if (isCorrect) { setScore((s) => s + 1); playCorrect(); }
    else { playWrong(); addError({ question: `Word order: "${item.en}"`, userAnswer: opt, correctAnswer: item.correct, explanation: item.explanation, source: "exercise", sourceId: `wo-${current}` }); }
  }

  function next() {
    if (!item) return; if (correct) completeExercise(`wo-${current}`, 5);
    if (current + 1 >= pool.length) { setDone(true); return; }
    setCurrent((c) => c + 1); setSelected(null); setAnswered(false); setCorrect(false);
  }

  function restart() { setPool([...WO].sort(() => Math.random() - 0.5)); setCurrent(0); setScore(0); setTotal(0); setSelected(null); setAnswered(false); setCorrect(false); setDone(false); }

  if (done) return <div data-practice-surface="result" className="practice-card text-center py-8"><LearningArt name="🏆" size={36} className=" block mb-3" /><h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Word Order Done!</h3><p className="text-lg font-display font-extrabold text-[var(--color-text-link)]">{score}/{total}</p><PracticeButton onClick={restart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-4">Play Again <LearningArt name="🔄" size={16} /></PracticeButton></div>;
  if (!item) return null;

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--camp-control-ink)] uppercase tracking-wider">Word Order</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{current + 1}/{pool.length}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="mb-4">
          <p className="text-xs text-[var(--color-text-secondary)] mb-1">Choose the correct sentence:</p>
          <p className="text-sm font-semibold text-[var(--color-text-secondary)] italic">{item.en}</p>
        </motion.div>
      </AnimatePresence>
      <div className="space-y-2 mb-4">
        {item.options.map((opt, i) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] hover:bg-[var(--color-primary-subtle)] hover:border-[var(--color-primary)]";
          if (answered) {
            if (opt === item.correct) style = "bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (opt === selected) style = "bg-[var(--color-error-bg)] text-[var(--color-text-error)] border-[var(--color-error)]";
            else style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] opacity-50";
          }
          return (
            <PracticeButton key={i} onClick={() => handleAnswer(opt)} disabled={answered}
              className={`w-full text-left p-3 rounded-[var(--radius-lg)] border text-sm transition-all font-mono ${style}`}>
              {opt}
            </PracticeButton>
          );
        })}
      </div>
      {answered && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <p className={`text-sm font-medium mb-1 ${correct ? "text-[var(--color-text-success)]" : "text-[var(--color-text-error)]"}`}>
            {correct ? "✓ Correct!" : "✗ Wrong"}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] mb-2">{item.explanation}</p>
          <PracticeButton onClick={next} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {current + 1 >= pool.length ? "Results" : "Next →"}
          </PracticeButton>
        </motion.div>
      )}
    </PracticeCard>
  );
}

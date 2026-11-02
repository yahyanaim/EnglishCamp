"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type NegEntry = { sentence: string; answer: string; options: string[]; en: string };

const NEG: NegEntry[] = [
  { sentence: "I have ____ time.", answer: "no", options: ["not", "no", "never", "nothing"], en: "I have no time." },
  { sentence: "That is ____ correct.", answer: "not", options: ["not", "no", "never", "nothing"], en: "That is not correct." },
  { sentence: "He has ____ dog.", answer: "no", options: ["not", "no", "never", "nothing"], en: "He has no dog." },
  { sentence: "She eats ____ meat.", answer: "no", options: ["not", "no", "never", "nothing"], en: "She eats no meat." },
  { sentence: "We do ____ live in London.", answer: "not", options: ["not", "no", "never", "nothing"], en: "We do not live in London." },
  { sentence: "I have ____ money.", answer: "no", options: ["not", "no", "never", "nothing"], en: "I have no money." },
  { sentence: "The book is ____ interesting.", answer: "not", options: ["not", "no", "never", "nothing"], en: "The book is not interesting." },
  { sentence: "She has ____ siblings.", answer: "no", options: ["not", "no", "never", "nothing"], en: "She has no siblings." },
  { sentence: "I drink ____ coffee.", answer: "no", options: ["not", "no", "never", "nothing"], en: "I drink no coffee." },
  { sentence: "He does ____ work on Sunday.", answer: "not", options: ["not", "no", "never", "nothing"], en: "He does not work on Sunday." },
];

export function NegationTrainer() {
  const { completeExercise } = useProgress(); const { addError } = useErrors();
  const [pool, setPool] = useState<NegEntry[]>([]);
  const [current, setCurrent] = useState(0); const [score, setScore] = useState(0); const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<string | null>(null); const [answered, setAnswered] = useState(false); const [correct, setCorrect] = useState(false); const [done, setDone] = useState(false);

  useEffect(() => { setPool([...NEG].sort(() => Math.random() - 0.5)); }, []);

  const item = pool[current];

  function handleAnswer(opt: string) {
    if (answered || !item) return;
    const isCorrect = opt === item.answer;
    setSelected(opt); setCorrect(isCorrect); setAnswered(true); setTotal((t) => t + 1);
    if (isCorrect) { setScore((s) => s + 1); playCorrect(); }
    else { playWrong(); addError({ question: `Negation: "${item.sentence}"`, userAnswer: opt, correctAnswer: item.answer, explanation: `"${item.answer}" corrects the sentence: ${item.en}`, source: "exercise", sourceId: `neg-${current}` }); }
  }

  function next() {
    if (!item) return; if (correct) completeExercise(`neg-${current}`, 5);
    if (current + 1 >= pool.length) { setDone(true); return; }
    setCurrent((c) => c + 1); setSelected(null); setAnswered(false); setCorrect(false);
  }

  function restart() { setPool([...NEG].sort(() => Math.random() - 0.5)); setCurrent(0); setScore(0); setTotal(0); setSelected(null); setAnswered(false); setCorrect(false); setDone(false); }

  if (done) return <div data-practice-surface="result" className="practice-card text-center py-8"><LearningArt name="🏆" size={36} className=" block mb-3" /><h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Negation Done!</h3><p className="text-lg font-display font-extrabold text-[var(--color-text-link)]">{score}/{total}</p><PracticeButton onClick={restart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-4">Play Again <LearningArt name="🔄" size={16} /></PracticeButton></div>;
  if (!item) return null;

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-display font-extrabold text-[#E0115F] uppercase tracking-wider">Negation (nicht/kein)</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{current + 1}/{pool.length}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="mb-4">
          <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)] font-mono">{item.sentence}</p>
          <p className="text-xs text-[var(--color-text-secondary)] italic mt-1">{item.en}</p>
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {item.options.map((opt) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] hover:bg-[var(--color-primary-subtle)] hover:border-[var(--color-primary)]";
          if (answered) {
            if (opt === item.answer) style = "bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (opt === selected) style = "bg-[var(--color-error-bg)] text-[var(--color-text-error)] border-[var(--color-error)]";
            else style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] opacity-50";
          }
          return (
            <PracticeButton key={opt} onClick={() => handleAnswer(opt)} disabled={answered}
              className={`p-3 rounded-[var(--radius-lg)] border text-sm font-mono font-bold transition-all ${style}`}>{opt}</PracticeButton>
          );
        })}
      </div>
      {answered && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-2 ${correct ? "text-[var(--color-text-success)]" : "text-[var(--color-text-error)]"}`}>
            {correct ? "✓ Correct!" : `✗ Correct: "${item.answer}"`}
          </p>
          <PracticeButton onClick={next} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {current + 1 >= pool.length ? "Results" : "Next →"}
          </PracticeButton>
        </motion.div>
      )}
    </PracticeCard>
  );
}

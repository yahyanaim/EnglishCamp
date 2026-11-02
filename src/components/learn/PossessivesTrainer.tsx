"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type PossEntry = { pronoun: string; poss: string; example: string };

const POSSESSIVES: PossEntry[] = [
  { pronoun: "I", poss: "my", example: "my book" },
  { pronoun: "you", poss: "your", example: "your dog" },
  { pronoun: "he", poss: "his", example: "his house" },
  { pronoun: "she", poss: "her", example: "her cat" },
  { pronoun: "it", poss: "its", example: "its tail" },
  { pronoun: "we", poss: "our", example: "our car" },
  { pronoun: "they", poss: "their", example: "their friend" },
  { pronoun: "you (pl.)", poss: "your", example: "your house" },
];

const PRONOUNS = ["I", "you", "he", "she", "it", "we", "they", "you (pl.)"];

export function PossessivesTrainer() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();
  const [pool, setPool] = useState<{ pronoun: string; options: string[] }[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const allOptions = POSSESSIVES.map((p) => p.poss);
    const qs = PRONOUNS.map((pr) => {
      const entry = POSSESSIVES.find((p) => p.pronoun === pr)!;
      const options = [entry.poss, ...allOptions.filter((o) => o !== entry.poss)].sort(() => Math.random() - 0.5).slice(0, 4);
      return { pronoun: pr, options };
    });
    setPool(qs.sort(() => Math.random() - 0.5));
  }, []);

  const item = pool[current];
  const entry = item ? POSSESSIVES.find((p) => p.pronoun === item.pronoun) : null;

  function handleAnswer(choice: string) {
    if (answered || !entry) return;
    const isCorrect = choice === entry.poss;
    setSelected(choice);
    setAnswered(true);
    setCorrect(isCorrect);
    setTotal((t) => t + 1);
    if (isCorrect) { setScore((s) => s + 1); playCorrect(); }
    else { playWrong();       addError({ question: `Possessive for "${item.pronoun}"`, userAnswer: choice, correctAnswer: entry.poss, explanation: `"${item.pronoun}" → "${entry.poss}": ${entry.example}`, source: "exercise", sourceId: `poss-${item.pronoun}` }); }
  }

  function next() {
    if (!entry) return;
    if (correct) completeExercise(`poss-${item.pronoun}`, 5);
    if (current + 1 >= pool.length) { setDone(true); return; }
    setCurrent((c) => c + 1);
    setSelected(null);
    setAnswered(false);
    setCorrect(false);
  }

  function restart() {
    const allOptions = POSSESSIVES.map((p) => p.poss);
    const qs = PRONOUNS.map((pr) => {
      const e = POSSESSIVES.find((p) => p.pronoun === pr)!;
      const options = [e.poss, ...allOptions.filter((o) => o !== e.poss)].sort(() => Math.random() - 0.5).slice(0, 4);
      return { pronoun: pr, options };
    });
    setPool(qs.sort(() => Math.random() - 0.5));
    setCurrent(0); setScore(0); setTotal(0); setSelected(null); setAnswered(false); setCorrect(false); setDone(false);
  }

  if (done) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">{pct >= 80 ? "🏆" : "👍"}</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Possessives Done!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-text-link)]">{score}/{total} ({pct}%)</p>
        <PracticeButton onClick={restart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-4">Play Again <LearningArt name="🔄" size={16} /></PracticeButton>
      </div>
    );
  }

  if (!item || !entry) return null;

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[#E0115F] uppercase tracking-wider">Possessives Trainer</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{current + 1}/{pool.length}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-4">
          <p className="text-xs text-[var(--color-text-secondary)] mb-2">Possessive pronoun for:</p>
          <span className="text-2xl font-display font-extrabold text-[var(--color-text-primary)]">&ldquo;{item.pronoun}&rdquo;</span>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">e.g. ___ {entry.example.split(" ")[1]}</p>
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {item.options.map((opt) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] hover:bg-[var(--color-primary-subtle)] hover:border-[var(--color-primary)]";
          if (answered) {
            if (opt === entry.poss) style = "bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (opt === selected) style = "bg-[var(--color-error-bg)] text-[var(--color-text-error)] border-[var(--color-error)]";
            else style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] opacity-50";
          }
          return (
            <PracticeButton key={opt} onClick={() => handleAnswer(opt)} disabled={answered}
              className={`p-3 rounded-[var(--radius-lg)] border text-sm font-semibold transition-all ${style}`}>
              {opt}
            </PracticeButton>
          );
        })}
      </div>
      {answered && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-2 ${correct ? "text-[var(--color-text-success)]" : "text-[var(--color-text-error)]"}`}>
            {correct ? "✓ Correct!" : `✗ Correct: "${entry.poss}"`}
          </p>
            <p className="text-xs text-[var(--color-text-secondary)] mb-2">{entry.example}</p>
          <PracticeButton onClick={next} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {current + 1 >= pool.length ? "Results" : "Next →"}
          </PracticeButton>
        </motion.div>
      )}
    </PracticeCard>
  );
}

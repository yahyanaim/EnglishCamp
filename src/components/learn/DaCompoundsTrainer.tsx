"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type DaItem = { question: string; answer: string; options: string[]; en: string };

const ITEMS: DaItem[] = [
  { question: "Are you waiting for the bus? → Yes, I'm waiting ___ it.", answer: "for", options: ["for", "on", "at", "with"], en: "Yes, I'm waiting for it." },
  { question: "Do you think about the exam? → Yes, I think ___ it.", answer: "about", options: ["about", "of", "on", "for"], en: "Yes, I think about it." },
  { question: "Do you agree with the plan? → Yes, I agree ___ it.", answer: "with", options: ["with", "to", "on", "for"], en: "Yes, I agree with it." },
  { question: "Are you interested in art? → Yes, I'm interested ___ it.", answer: "in", options: ["in", "on", "at", "for"], en: "Yes, I'm interested in it." },
  { question: "Are you against the proposal? → No, I'm not ___ it.", answer: "against", options: ["against", "for", "with", "about"], en: "No, I'm not against it." },
  { question: "Can you answer the question? → Yes, I can answer ___ it.", answer: "for", options: ["for", "to", "with", "about"], en: "Yes, I can answer it." },
  { question: "Did you hear about the accident? → Yes, I heard ___ it.", answer: "about", options: ["about", "of", "for", "from"], en: "Yes, I heard about it." },
  { question: "Does that remind you of your childhood? → Yes, it reminds me ___ it.", answer: "of", options: ["of", "about", "for", "with"], en: "Yes, it reminds me of it." },
  { question: "Does the movie start at 8? → Yes, I'm looking forward ___ it.", answer: "to", options: ["to", "for", "at", "on"], en: "Yes, I'm looking forward to it." },
  { question: "Are you dealing with the topic? → Yes, I'm dealing ___ it.", answer: "with", options: ["with", "about", "for", "on"], en: "Yes, I'm dealing with it." },
  { question: "Are you for the idea? → Yes, I'm ___ it.", answer: "for", options: ["for", "with", "about", "in"], en: "Yes, I'm for it." },
  { question: "Is that in the law? → Yes, it's ___ there.", answer: "in", options: ["in", "on", "at", "by"], en: "Yes, it's in there." },
  { question: "Are you coming by train? → Yes, I'm coming ___ it.", answer: "by", options: ["by", "with", "on", "in"], en: "Yes, I'm coming by it." },
  { question: "Are you talking about the problem? → Yes, I'm talking ___ it.", answer: "about", options: ["about", "of", "to", "with"], en: "Yes, I'm talking about it." },
  { question: "Did you ask about the price? → Yes, I asked ___ it.", answer: "about", options: ["about", "for", "after", "of"], en: "Yes, I asked about it." },
];

export function DaCompoundsTrainer() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();
  const [pool, setPool] = useState<DaItem[]>([]);
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

  function handleSelect(opt: string) {
    if (selected || !current) return;
    setSelected(opt);
    setTotal((t) => t + 1);
    if (opt === current.answer) {
      setScore((s) => s + 1);
      playCorrect();
      completeExercise(`da-${index}`, 10);
    } else {
      playWrong();
      addError({ question: `Preposition: "${current.question}"`, userAnswer: opt, correctAnswer: current.answer, explanation: `The correct preposition is "${current.answer}" (${current.en})`, source: "preposition", sourceId: `da-${index}` });
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
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Prepositions Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-text-link)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "Excellent preposition skills!" : "Keep practicing!"}</p>
        <PracticeButton onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again <LearningArt name="🔄" size={16} /></PracticeButton>
      </div>
    );
  }

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[#E0115F] uppercase tracking-wider">Prepositions with Pronouns</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="mb-5">
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">Complete with the correct preposition</p>
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4 border border-[var(--color-border-default)]">
            <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">{current.question}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {current.options.map((opt) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-pink-50 hover:border-pink-300 hover:text-pink-700";
          if (selected) {
            if (opt === current.answer) style = "bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (opt === selected) style = "bg-[var(--color-error-bg)] text-[var(--color-text-error)] border-[var(--color-error)]";
            else style = "opacity-40";
          }
          return (
            <PracticeButton key={opt} onClick={() => handleSelect(opt)} disabled={!!selected} className={`text-sm font-medium px-4 py-3 rounded-[var(--radius-lg)] border transition-all duration-200 ${style}`}>
              {opt}
            </PracticeButton>
          );
        })}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-1 ${selected === current.answer ? "text-[var(--color-text-success)]" : "text-[var(--color-text-error)]"}`}>
            {selected === current.answer ? "✓ Correct! +10 XP" : `✗ Correct: ${current.answer}`}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] mb-3">{current.en}</p>
          <PracticeButton onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {index + 1 >= pool.length ? "See Results" : "Next →"}
          </PracticeButton>
        </motion.div>
      )}

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-pink-300" : i === index ? "bg-pink-500" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </PracticeCard>
  );
}

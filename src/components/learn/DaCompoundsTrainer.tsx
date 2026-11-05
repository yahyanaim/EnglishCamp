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
  { question: "The bus is late. I am still waiting ___ it.", answer: "for", options: ["for", "on", "at", "with"], en: "The bus is late. I am still waiting for it." },
  { question: "That exam was difficult. I still think ___ it.", answer: "about", options: ["about", "at", "on", "for"], en: "That exam was difficult. I still think about it." },
  { question: "The plan sounds sensible. I agree ___ it.", answer: "with", options: ["with", "from", "on", "for"], en: "The plan sounds sensible. I agree with it." },
  { question: "Art is fascinating. I am interested ___ it.", answer: "in", options: ["in", "on", "at", "for"], en: "Art is fascinating. I am interested in it." },
  { question: "I oppose this harmful proposal. I am ___ it.", answer: "against", options: ["against", "for", "with", "about"], en: "I oppose this harmful proposal. I am against it." },
  { question: "Please pay attention. I am speaking directly ___ you.", answer: "to", options: ["to", "at", "on", "for"], en: "Please pay attention. I am speaking directly to you." },
  { question: "There was an accident. I heard ___ it on the news.", answer: "about", options: ["about", "at", "for", "from"], en: "There was an accident. I heard about it on the news." },
  { question: "That song brings back my childhood. It reminds me ___ it.", answer: "of", options: ["of", "at", "for", "with"], en: "That song brings back my childhood. It reminds me of it." },
  { question: "The holiday starts soon. I am looking forward ___ it.", answer: "to", options: ["to", "for", "at", "on"], en: "The holiday starts soon. I am looking forward to it." },
  { question: "This problem is urgent. I am dealing ___ it now.", answer: "with", options: ["with", "about", "for", "on"], en: "This problem is urgent. I am dealing with it now." },
  { question: "I support this idea. I am ___ it.", answer: "for", options: ["for", "with", "about", "in"], en: "I support this idea. I am for it." },
  { question: "They added a clause to the law. You can find it ___ there.", answer: "in", options: ["in", "on", "at", "by"], en: "They added a clause to the law. You can find it in there." },
  { question: "I lent her a book, but I have not heard ___ her since.", answer: "from", options: ["from", "to", "at", "with"], en: "I lent her a book, but I have not heard from her since." },
  { question: "We need to discuss this problem. Let us talk ___ it.", answer: "about", options: ["about", "at", "to", "with"], en: "We need to discuss this problem. Let us talk about it." },
  { question: "I needed details concerning the price, so I asked ___ it.", answer: "about", options: ["about", "at", "after", "of"], en: "I needed details concerning the price, so I asked about it." },
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
      <div data-practice-surface="result" className="practice-card text-center">
        <LearningArt name="trophy" size={30} className="camp-result-art"/>
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
        <span className="text-xs font-semibold text-[var(--camp-control-ink)] uppercase tracking-wider">Prepositions with Pronouns</span>
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
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-[var(--camp-purple-soft)] hover:border-[var(--color-primary-light)] hover:text-[var(--camp-control-ink)]";
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
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-[var(--camp-purple)]" : i === index ? "bg-[var(--camp-purple)]" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </PracticeCard>
  );
}

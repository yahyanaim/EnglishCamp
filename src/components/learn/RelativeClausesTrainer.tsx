"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type Item = { sentence: string; blank: string; options: string[]; explanation: string };

const ITEMS: Item[] = [
  { sentence: "The man ___ helped me is kind.", blank: "who", options: ["who", "whom", "which", "whose"], explanation: "'who' for people as subject of the clause" },
  { sentence: "The woman ___ I know comes from London.", blank: "whom", options: ["who", "whom", "which", "whose"], explanation: "'whom' for people as object of the clause (formal)" },
  { sentence: "The child ___ toy is broken is crying.", blank: "whose", options: ["whose", "who", "which", "whom"], explanation: "'whose' for possession (genitive)" },
  { sentence: "The dog ___ plays in the garden is mine.", blank: "that", options: ["who", "that", "whom", "whose"], explanation: "'that' for animals as subject" },
  { sentence: "The students ___ passed the exam are happy.", blank: "who", options: ["who", "whom", "which", "whose"], explanation: "'who' for people (plural) as subject" },
  { sentence: "The friend ___ I trust is honest.", blank: "whom", options: ["who", "whom", "which", "whose"], explanation: "'whom' for people as object (whom I trust)" },
  { sentence: "The book ___ I am reading is exciting.", blank: "that", options: ["who", "that", "whose", "whom"], explanation: "'that' for things" },
  { sentence: "The lady ___ bag was stolen called the police.", blank: "whose", options: ["whose", "who", "which", "whom"], explanation: "'whose' for possession with a person" },
  { sentence: "The doctor ___ I called will come tomorrow.", blank: "whom", options: ["who", "whom", "which", "whose"], explanation: "'whom' for people as object" },
  { sentence: "The people ___ we invited are all coming.", blank: "whom", options: ["who", "whom", "which", "whose"], explanation: "'whom' for people as object (formal)" },
  { sentence: "The car ___ I bought is very fast.", blank: "that", options: ["who", "that", "whose", "whom"], explanation: "'that' for things as object" },
  { sentence: "The hotel ___ we stayed at was very expensive.", blank: "which", options: ["which", "who", "whom", "whose"], explanation: "'which' for things after a preposition" },
  { sentence: "The city ___ I come from is small.", blank: "which", options: ["which", "who", "that", "whose"], explanation: "'which' for things (or 'that')" },
  { sentence: "The movie ___ we saw was boring.", blank: "that", options: ["who", "that", "whose", "whom"], explanation: "'that' for things" },
  { sentence: "The children ___ parents live abroad stay with their grandma.", blank: "whose", options: ["whose", "who", "which", "whom"], explanation: "'whose' for possession with people" },
];

export function RelativeClausesTrainer() {
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
    if (opt === current.blank) { setScore((s) => s + 1); playCorrect(); completeExercise(`relative-${index}`, 10); }
    else { playWrong(); addError({ question: `Relative pronoun: "${current.sentence}"`, userAnswer: opt, correctAnswer: current.blank, explanation: current.explanation, source: "relative", sourceId: `relative-${index}` }); }
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
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Relative Clauses Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-text-link)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "Excellent relative clause skills!" : "Keep practicing!"}</p>
        <PracticeButton onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again <LearningArt name="🔄" size={16} /></PracticeButton>
      </div>
    );
  }

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-sky-600 uppercase tracking-wider">Relative Clauses</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-5">
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4 border border-[var(--color-border-default)]">
            <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">___ {current.sentence.replace("___", "")}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {current.options.map((opt) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-sky-50 hover:border-sky-300 hover:text-sky-700";
          if (selected) {
            if (opt === current.blank) style = "bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (opt === selected) style = "bg-[var(--color-error-bg)] text-[var(--color-text-error)] border-[var(--color-error)]";
            else style = "opacity-40";
          }
          return (
            <PracticeButton key={opt} onClick={() => handleSelect(opt)} disabled={!!selected} className={`px-4 py-2.5 text-sm font-bold rounded-[var(--radius-lg)] border transition-all duration-200 ${style}`}>
              {opt}
            </PracticeButton>
          );
        })}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-1 ${selected === current.blank ? "text-[var(--color-text-success)]" : "text-[var(--color-text-error)]"}`}>
            {selected === current.blank ? "✓ Correct! +10 XP" : `✗ Correct: ${current.blank}`}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] mb-3">{current.explanation}</p>
          <PracticeButton onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {index + 1 >= pool.length ? "See Results" : "Next →"}
          </PracticeButton>
        </motion.div>
      )}

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-sky-300" : i === index ? "bg-sky-500" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </PracticeCard>
  );
}

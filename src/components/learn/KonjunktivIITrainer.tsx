"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type Item = { prompt: string; correct: string; options: string[]; explanation: string };

const ITEMS: Item[] = [
  { prompt: "If I ___ rich, I would travel. (be)", correct: "were", options: ["were", "am", "was", "will be"], explanation: "Second conditional: 'If I were' (subjunctive 'were' for all persons)" },
  { prompt: "If it rains, I ___ home. (stay)", correct: "will stay", options: ["will stay", "stayed", "would stay", "stay"], explanation: "First conditional: if + present, will + infinitive" },
  { prompt: "I ___ a car if I had money. (buy)", correct: "would buy", options: ["would buy", "will buy", "bought", "buy"], explanation: "Second conditional: if + past, would + infinitive" },
  { prompt: "If I ___ you, I would say sorry. (be)", correct: "were", options: ["were", "am", "was", "would be"], explanation: "Second conditional: 'If I were' is used for unreal situations" },
  { prompt: "If she studies hard, she ___ the exam. (pass)", correct: "will pass", options: ["will pass", "would pass", "passed", "passes"], explanation: "First conditional: if + present, will + infinitive" },
  { prompt: "We ___ to the beach if it was sunny. (go)", correct: "would go", options: ["would go", "will go", "went", "go"], explanation: "Second conditional: if + past, would + infinitive" },
  { prompt: "If he had known, he ___ come. (would + come)", correct: "would have come", options: ["would have come", "would come", "will come", "came"], explanation: "Third conditional: if + had + past participle, would have + past participle" },
  { prompt: "If I had more time, I ___ more books. (read)", correct: "would read", options: ["would read", "will read", "read", "have read"], explanation: "Second conditional: imaginary situation in present/future" },
  { prompt: "If you heat ice, it ___ . (melt)", correct: "melts", options: ["melts", "melted", "would melt", "will melt"], explanation: "Zero conditional: general truth — if + present, present" },
  { prompt: "What ___ you do if you won the lottery? (would)", correct: "would", options: ["would", "will", "did", "do"], explanation: "Second conditional question: 'What would you do if...?'" },
  { prompt: "If they arrive early, we ___ dinner together. (have)", correct: "will have", options: ["will have", "would have", "had", "have"], explanation: "First conditional: likely future situation" },
  { prompt: "If she had left earlier, she ___ the bus. (catch)", correct: "would have caught", options: ["would have caught", "would catch", "will catch", "caught"], explanation: "Third conditional: unreal situation in the past" },
  { prompt: "I ___ happy if you came. (be)", correct: "would be", options: ["would be", "will be", "am", "was"], explanation: "Second conditional: 'would be' + if + past" },
  { prompt: "If I ___ tired, I go to bed early. (be)", correct: "am", options: ["am", "was", "were", "would be"], explanation: "Zero conditional: habitual action" },
  { prompt: "If we had left now, we ___ late. (be)", correct: "would be", options: ["would be", "will be", "are", "were"], explanation: "Second conditional: present unreal situation" },
];

export function KonjunktivIITrainer() {
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
    if (opt === current.correct) { setScore((s) => s + 1); playCorrect(); completeExercise(`konjunktiv2-${index}`, 10); }
    else { playWrong(); addError({ question: `Conditional: ${current.prompt}`, userAnswer: opt, correctAnswer: current.correct, explanation: current.explanation, source: "conditional", sourceId: `conditional-${index}` }); }
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
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Conditionals Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-text-link)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "Excellent subjunctive skills!" : "Keep practicing!"}</p>
        <PracticeButton onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again <LearningArt name="🔄" size={16} /></PracticeButton>
      </div>
    );
  }

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--color-text-warning)] uppercase tracking-wider">Conditionals</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-5">
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">Choose the correct conditional form</p>
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4 border border-[var(--color-border-default)]">
            <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">{current.prompt}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {current.options.map((opt) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-[var(--color-warning-bg)]  hover:border-[var(--color-warning)] hover:";
          if (selected) {
            if (opt === current.correct) style = "bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
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
          <p className={`text-sm font-medium mb-1 ${selected === current.correct ? "text-[var(--color-text-success)]" : "text-[var(--color-text-error)]"}`}>
            {selected === current.correct ? "✓ Correct! +10 XP" : `✗ Correct: ${current.correct}`}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] mb-3">{current.explanation}</p>
          <PracticeButton onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {index + 1 >= pool.length ? "See Results" : "Next →"}
          </PracticeButton>
        </motion.div>
      )}

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-amber-300" : i === index ? "bg-amber-500" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </PracticeCard>
  );
}

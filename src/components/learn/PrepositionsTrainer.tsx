"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

const PREPOSITIONS: { prep: string; case: "time" | "place" | "movement" | "manner"; meaning: string; example: string }[] = [
  { prep: "at", case: "place", meaning: "at a specific location", example: "at the bus stop" },
  { prep: "in", case: "place", meaning: "inside something", example: "in the room" },
  { prep: "on", case: "place", meaning: "on a surface", example: "on the table" },
  { prep: "under", case: "place", meaning: "below something", example: "under the bed" },
  { prep: "next to", case: "place", meaning: "beside something", example: "next to the school" },
  { prep: "between", case: "place", meaning: "in the middle of two things", example: "between the houses" },
  { prep: "behind", case: "place", meaning: "at the back of", example: "behind the door" },
  { prep: "in front of", case: "place", meaning: "before something", example: "in front of the cinema" },
  { prep: "to", case: "movement", meaning: "going towards", example: "to the park" },
  { prep: "from", case: "movement", meaning: "coming away from", example: "from London" },
  { prep: "into", case: "movement", meaning: "entering", example: "into the house" },
  { prep: "out of", case: "movement", meaning: "leaving", example: "out of the car" },
  { prep: "in", case: "time", meaning: "months, years, seasons", example: "in July" },
  { prep: "on", case: "time", meaning: "days and dates", example: "on Monday" },
  { prep: "at", case: "time", meaning: "specific times", example: "at 5 o'clock" },
  { prep: "since", case: "time", meaning: "from a point in time", example: "since 2020" },
  { prep: "for", case: "time", meaning: "duration of time", example: "for two hours" },
  { prep: "by", case: "manner", meaning: "method of transport", example: "by bus" },
  { prep: "with", case: "manner", meaning: "together or using", example: "with my friend" },
  { prep: "without", case: "manner", meaning: "not having", example: "without sugar" },
];

const CASE_LABELS: Record<string, string> = { time: "Time", place: "Place", movement: "Movement", manner: "Manner" };

const CASES = ["time", "place", "movement", "manner"] as const;

export function PrepositionsTrainer() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();
  const [pool, setPool] = useState<typeof PREPOSITIONS>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setPool([...PREPOSITIONS].sort(() => Math.random() - 0.5));
  }, []);

  const item = pool[current];

  function handleAnswer(choice: string) {
    if (answered || !item) return;
    const isCorrect = choice === item.case;
    setCorrect(isCorrect);
    setAnswered(true);
    setTotal((t) => t + 1);
    if (isCorrect) { setScore((s) => s + 1); playCorrect(); }
    else { playWrong(); addError({ question: `Case of "${item.prep}"`, userAnswer: CASE_LABELS[choice] || choice, correctAnswer: CASE_LABELS[item.case], explanation: `"${item.prep}" takes ${CASE_LABELS[item.case]}: ${item.example}`, source: "exercise", sourceId: `prep-${item.prep}` }); }
  }

  function next() {
    if (!item) return;
    if (correct) completeExercise(`prep-${item.prep}`, 5);
    if (current + 1 >= pool.length) { setDone(true); return; }
    setCurrent((c) => c + 1);
    setAnswered(false);
    setCorrect(false);
  }

  function restart() { setPool([...PREPOSITIONS].sort(() => Math.random() - 0.5)); setCurrent(0); setScore(0); setTotal(0); setAnswered(false); setCorrect(false); setDone(false); }

  if (done) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">{pct >= 80 ? "🏆" : "👍"}</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Prepositions Done!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-text-link)]">{score}/{total} ({pct}%)</p>
        <PracticeButton onClick={restart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-4">Play Again <LearningArt name="🔄" size={16} /></PracticeButton>
      </div>
    );
  }

  if (!item) return null;

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-cyan-600 uppercase tracking-wider">Prepositions Trainer</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{current + 1}/{pool.length}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-6">
          <p className="text-xs text-[var(--color-text-secondary)] mb-1">Which case does this preposition take?</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-display font-extrabold font-mono text-[var(--color-text-primary)]">{item.prep}</span>
            <span className="text-sm text-[var(--color-text-secondary)] italic">({item.meaning})</span>
          </div>
          <p className="text-xs text-[var(--color-text-secondary)] mt-1">e.g. {item.example}</p>
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {CASES.map((c) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] hover:bg-[var(--color-primary-subtle)] hover:border-[var(--color-primary)]";
          if (answered) {
            if (c === item.case) style = "bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (c !== item.case && answered) style = "bg-[var(--color-error-bg)] text-[var(--color-text-error)] border-[var(--color-error)]";
          }
          return (
            <PracticeButton key={c} onClick={() => handleAnswer(c)} disabled={answered}
              className={`p-3 rounded-[var(--radius-lg)] border text-sm font-medium transition-all ${style}`}>
              {CASE_LABELS[c]}
            </PracticeButton>
          );
        })}
      </div>
      {answered && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-2 ${correct ? "text-[var(--color-text-success)]" : "text-[var(--color-text-error)]"}`}>
            {correct ? "✓ Correct!" : `✗ Correct: ${CASE_LABELS[item.case]}`}
          </p>
          <PracticeButton onClick={next} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {current + 1 >= pool.length ? "Results" : "Next →"}
          </PracticeButton>
        </motion.div>
      )}
      <div className="flex justify-between mt-4 text-xs text-[var(--color-text-secondary)]">
        <span>{score}/{total}</span>
      </div>
    </PracticeCard>
  );
}

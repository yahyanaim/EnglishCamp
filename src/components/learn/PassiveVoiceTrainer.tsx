"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type PassiveItem = { active: string; passive: string; tense: string };

const ITEMS: PassiveItem[] = [
  { active: "The cook cooks the food.", passive: "The food is cooked.", tense: "Present" },
  { active: "The teacher explains the grammar.", passive: "The grammar is explained.", tense: "Present" },
  { active: "The company builds a house.", passive: "A house is built.", tense: "Present" },
  { active: "The mechanic repairs the car.", passive: "The car is repaired.", tense: "Present" },
  { active: "The students read the book.", passive: "The book is read.", tense: "Present" },
  { active: "The doctor examined the patient.", passive: "The patient was examined.", tense: "Past" },
  { active: "The mother baked the cake.", passive: "The cake was baked.", tense: "Past" },
  { active: "The artist painted the picture.", passive: "The picture was painted.", tense: "Past" },
  { active: "The children played the game.", passive: "The game was played.", tense: "Past" },
  { active: "The police officer stopped the car.", passive: "The car was stopped.", tense: "Past" },
  { active: "Someone has opened the window.", passive: "The window has been opened.", tense: "Present Perfect" },
  { active: "Someone has closed the door.", passive: "The door has been closed.", tense: "Present Perfect" },
  { active: "Someone has written the letter.", passive: "The letter has been written.", tense: "Present Perfect" },
  { active: "Someone has sung the song.", passive: "The song has been sung.", tense: "Present Perfect" },
  { active: "Someone has set the table.", passive: "The table has been set.", tense: "Present Perfect" },
];

export function PassiveVoiceTrainer() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();
  const [pool, setPool] = useState<PassiveItem[]>([]);
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

  const wrongOptions = ITEMS.filter((i) => i.passive !== current.passive).sort(() => Math.random() - 0.5).slice(0, 3).map((i) => i.passive);
  const options = [current.passive, ...wrongOptions].sort(() => Math.random() - 0.5);

  function handleSelect(opt: string) {
    if (selected || !current) return;
    setSelected(opt);
    setTotal((t) => t + 1);
    if (opt === current.passive) {
      setScore((s) => s + 1);
      playCorrect();
      completeExercise(`passive-${index}`, 10);
    } else {
      playWrong();
      addError({ question: `Passive of: "${current.active}"`, userAnswer: opt, correctAnswer: current.passive, explanation: `The passive (${current.tense}) is: "${current.passive}"`, source: "passive", sourceId: `passive-${index}` });
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
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Passive Voice Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-text-link)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "Excellent passive skills!" : "Keep practicing!"}</p>
        <PracticeButton onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again <LearningArt name="🔄" size={16} /></PracticeButton>
      </div>
    );
  }

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wider">Passive Voice</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="mb-5">
          <p className="text-xs text-[var(--color-text-secondary)] mb-1">Turn this active sentence into passive (<span className="font-semibold">{current.tense}</span>):</p>
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4 border border-[var(--color-border-default)]">
            <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">{current.active}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 gap-2 mb-4">
        {options.map((opt) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-700";
          if (selected) {
            if (opt === current.passive) style = "bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (opt === selected) style = "bg-[var(--color-error-bg)] text-[var(--color-text-error)] border-[var(--color-error)]";
            else style = "opacity-40";
          }
          return (
            <PracticeButton key={opt} onClick={() => handleSelect(opt)} disabled={!!selected} className={`text-sm font-medium px-4 py-3 rounded-[var(--radius-lg)] border transition-all duration-200 text-left ${style}`}>
              {opt}
            </PracticeButton>
          );
        })}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-3 ${selected === current.passive ? "text-[var(--color-text-success)]" : "text-[var(--color-text-error)]"}`}>
            {selected === current.passive ? "✓ Correct! +10 XP" : `✗ Correct: ${current.passive}`}
          </p>
          <PracticeButton onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {index + 1 >= pool.length ? "See Results" : "Next →"}
          </PracticeButton>
        </motion.div>
      )}

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-indigo-300" : i === index ? "bg-indigo-500" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </PracticeCard>
  );
}

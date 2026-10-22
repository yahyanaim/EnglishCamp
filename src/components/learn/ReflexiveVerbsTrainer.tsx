"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type Pronoun = "I" | "you" | "he/she/it" | "we" | "you (pl)" | "they";
type Reflexive = "myself" | "yourself" | "himself/herself/itself" | "ourselves" | "yourselves" | "themselves";

const VERBS: { verb: string; en: string; pronoun: Pronoun; correct: Reflexive }[] = [
  { verb: "enjoy oneself", en: "to have fun", pronoun: "I", correct: "myself" },
  { verb: "enjoy oneself", en: "to have fun", pronoun: "you", correct: "yourself" },
  { verb: "enjoy oneself", en: "to have fun", pronoun: "he/she/it", correct: "himself/herself/itself" },
  { verb: "enjoy oneself", en: "to have fun", pronoun: "we", correct: "ourselves" },
  { verb: "enjoy oneself", en: "to have fun", pronoun: "you (pl)", correct: "yourselves" },
  { verb: "enjoy oneself", en: "to have fun", pronoun: "they", correct: "themselves" },
  { verb: "teach oneself", en: "to learn without help", pronoun: "I", correct: "myself" },
  { verb: "teach oneself", en: "to learn without help", pronoun: "you", correct: "yourself" },
  { verb: "teach oneself", en: "to learn without help", pronoun: "we", correct: "ourselves" },
  { verb: "hurt oneself", en: "to cause pain to oneself", pronoun: "he/she/it", correct: "himself/herself/itself" },
  { verb: "hurt oneself", en: "to cause pain to oneself", pronoun: "they", correct: "themselves" },
  { verb: "introduce oneself", en: "to say who you are", pronoun: "I", correct: "myself" },
  { verb: "introduce oneself", en: "to say who you are", pronoun: "you (pl)", correct: "yourselves" },
  { verb: "remind oneself", en: "to not forget", pronoun: "you", correct: "yourself" },
  { verb: "remind oneself", en: "to not forget", pronoun: "we", correct: "ourselves" },
  { verb: "behave oneself", en: "to act properly", pronoun: "they", correct: "themselves" },
  { verb: "behave oneself", en: "to act properly", pronoun: "you (pl)", correct: "yourselves" },
  { verb: "express oneself", en: "to say one's thoughts", pronoun: "I", correct: "myself" },
  { verb: "express oneself", en: "to say one's thoughts", pronoun: "you", correct: "yourself" },
  { verb: "express oneself", en: "to say one's thoughts", pronoun: "he/she/it", correct: "himself/herself/itself" },
];

const ALL_REFLEXIVE: Reflexive[] = ["myself", "yourself", "himself/herself/itself", "ourselves", "yourselves", "themselves"];

export function ReflexiveVerbsTrainer() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();
  const [pool, setPool] = useState<typeof VERBS>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setPool([...VERBS].sort(() => Math.random() - 0.5).slice(0, 15));
  }, []);

  const current = pool[index];
  if (!current && !done) return null;

  function handleSelect(reflexive: string) {
    if (selected || !current) return;
    setSelected(reflexive);
    setTotal((t) => t + 1);
    if (reflexive === current.correct) {
      setScore((s) => s + 1);
      playCorrect();
      completeExercise(`reflexive-${current.verb}-${current.pronoun}`, 5);
    } else {
      playWrong();
      addError({ question: `Reflexive pronoun for "${current.verb}" with ${current.pronoun}`, userAnswer: reflexive, correctAnswer: current.correct, explanation: `"${current.verb}" with ${current.pronoun} takes "${current.correct}"`, source: "reflexive", sourceId: `reflexive-${current.verb}-${current.pronoun}` });
    }
  }

  function handleNext() {
    if (!current) return;
    if (index + 1 >= pool.length) { setDone(true); return; }
    setIndex((i) => i + 1);
    setSelected(null);
  }

  function handleRestart() {
    setPool([...VERBS].sort(() => Math.random() - 0.5).slice(0, 15));
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
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Reflexive Verbs Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "Great reflexive pronoun skills!" : "Keep practicing!"}</p>
        <button onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again 🔄</button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">Reflexive Verbs</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-5">
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">Choose the correct reflexive pronoun</p>
          <p className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">
            {current.pronoun} <span className="text-[var(--color-primary-dark)]">{current.verb.replace("oneself", "...")}</span>
          </p>
          <p className="text-sm text-[var(--color-text-disabled)] italic">({current.en})</p>
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-wrap justify-center gap-3 mb-5">
        {ALL_REFLEXIVE.map((r) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] hover:bg-rose-50 hover:border-rose-300 hover:text-rose-700";
          if (selected) {
            if (r === current.correct) style = "bg-[var(--color-success)] text-white border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (r === selected) style = "bg-[var(--color-error)] text-white border-[var(--color-error)]";
            else style = "opacity-40";
          }
          return (
            <button key={r} onClick={() => handleSelect(r)} disabled={!!selected} className={`w-16 h-12 text-sm font-bold rounded-[var(--radius-lg)] border-2 transition-all duration-200 ${style}`}>
              {r}
            </button>
          );
        })}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-3 ${selected === current.correct ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}>
            {selected === current.correct ? "✓ Correct! +5 XP" : `✗ Correct: ${current.pronoun} ${current.correct} ${current.verb.replace("oneself", "...")}`}
          </p>
          <button onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {index + 1 >= pool.length ? "See Results" : "Next →"}
          </button>
        </motion.div>
      )}

      <div className="flex justify-between mt-4 text-xs text-[var(--color-text-disabled)]">
        <span>Score: {score}/{total}</span>
        <div className="flex gap-1">
          {pool.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-rose-300" : i === index ? "bg-rose-500" : "bg-[var(--color-border-default)]"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

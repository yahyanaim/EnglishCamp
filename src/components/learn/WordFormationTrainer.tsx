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
  { prompt: "drive → ___ (person who drives)", correct: "driver", options: ["driver", "drive", "driven", "driveman"], explanation: "-er suffix turns verb into noun: drive → driver" },
  { prompt: "teach → ___ (person who teaches)", correct: "teacher", options: ["teacher", "teache", "teachman", "taught"], explanation: "-er suffix: teach → teacher" },
  { prompt: "happy → ___ (state of being happy)", correct: "happiness", options: ["happiness", "happyness", "happies", "happing"], explanation: "-ness suffix turns adjective into noun: happy → happiness" },
  { prompt: "kind → ___ (state of being kind)", correct: "kindness", options: ["kindness", "kindness", "kindful", "kinding"], explanation: "-ness suffix: kind → kindness" },
  { prompt: "possible → ___ (state of being possible)", correct: "possibility", options: ["possibility", "possibleness", "possibleity", "possible"], explanation: "-ity suffix (y changes to i): possible → possibility" },
  { prompt: "active → ___ (state of being active)", correct: "activity", options: ["activity", "activeness", "activety", "activing"], explanation: "-ity suffix: active → activity" },
  { prompt: "decide → ___ (the act of deciding)", correct: "decision", options: ["decision", "deciding", "decided", "decidion"], explanation: "-ion suffix: decide → decision (de changes to s)" },
  { prompt: "inform → ___ (the act of informing)", correct: "information", options: ["information", "informtion", "informant", "informing"], explanation: "-ation suffix: inform → information" },
  { prompt: "create → ___ (the act of creating)", correct: "creation", options: ["creation", "creature", "create", "creatist"], explanation: "-ion suffix: create → creation" },
  { prompt: "friend → ___ (state of friendship)", correct: "friendship", options: ["friendship", "friendness", "friendhood", "friendance"], explanation: "-ship suffix: friend → friendship" },
  { prompt: "owner → ___ (state of owning)", correct: "ownership", options: ["ownership", "ownerness", "ownerhood", "ownerage"], explanation: "-ship suffix: owner → ownership" },
  { prompt: "music → ___ (person who makes music)", correct: "musician", options: ["musician", "musician", "musicer", "musicist"], explanation: "-ian suffix: music → musician" },
  { prompt: "politics → ___ (person in politics)", correct: "politician", options: ["politician", "politician", "politister", "politicser"], explanation: "-ian suffix: politics → politician" },
  { prompt: "govern → ___ (person who governs)", correct: "governor", options: ["governor", "governer", "government", "governant"], explanation: "-or suffix: govern → governor" },
  { prompt: "act → ___ (person who acts)", correct: "actor", options: ["actor", "acter", "action", "actist"], explanation: "-or suffix: act → actor" },
];

export function WordFormationTrainer() {
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
    if (opt === current.correct) { setScore((s) => s + 1); playCorrect(); completeExercise(`wordform-${index}`, 10); }
    else { playWrong(); addError({ question: `Word formation: "${current.prompt}"`, userAnswer: opt, correctAnswer: current.correct, explanation: current.explanation, source: "wordform", sourceId: `wordform-${index}` }); }
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
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Word Formation Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-text-link)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "Excellent vocabulary building skills!" : "Keep practicing!"}</p>
        <PracticeButton onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again <LearningArt name="🔄" size={16} /></PracticeButton>
      </div>
    );
  }

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--color-text-warning)] uppercase tracking-wider">Word Formation</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-5">
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)] p-5 border border-[var(--color-border-default)]">
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
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-orange-300" : i === index ? "bg-orange-500" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </PracticeCard>
  );
}

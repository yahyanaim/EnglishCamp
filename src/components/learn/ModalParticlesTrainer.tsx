"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type Item = { sentence: string; correct: string; options: string[]; explanation: string };

const ITEMS: Item[] = [
  { sentence: "___ , I don't think that's true.", correct: "Actually", options: ["Actually", "Basically", "Honestly", "Obviously"], explanation: "'Actually' is used to introduce a correction or new information." },
  { sentence: "___ , you just need to practice every day.", correct: "Basically", options: ["Basically", "Actually", "Honestly", "Anyway"], explanation: "'Basically' introduces a simplified summary of the main point." },
  { sentence: "___ , I have no idea what happened.", correct: "Honestly", options: ["Honestly", "Actually", "Basically", "Obviously"], explanation: "'Honestly' emphasizes that you are being sincere." },
  { sentence: "___ , English is not very difficult!", correct: "Actually", options: ["Actually", "Anyway", "Basically", "Well"], explanation: "'Actually' can express a contrary opinion politely." },
  { sentence: "___ , let's change the subject.", correct: "Anyway", options: ["Anyway", "Actually", "Basically", "So"], explanation: "'Anyway' is used to return to the main topic or change the subject." },
  { sentence: "___ shall we go now?", correct: "So", options: ["So", "Well", "Anyway", "Basically"], explanation: "'So' is used to begin a question or transition." },
  { sentence: "___ , I'm not sure about that.", correct: "Well", options: ["Well", "So", "Anyway", "Actually"], explanation: "'Well' is used as a hesitation marker or to politely disagree." },
  { sentence: "___ , that was a great meal!", correct: "Well", options: ["Well", "So", "Anyway", "Basically"], explanation: "'Well' can express satisfaction or closure." },
  { sentence: "It's ___ obvious that he's lying.", correct: "obviously", options: ["obviously", "basically", "honestly", "actually"], explanation: "'Obviously' emphasizes that something is easy to see or understand." },
  { sentence: "I ___ don't know what to say.", correct: "honestly", options: ["honestly", "obviously", "basically", "anyway"], explanation: "'Honestly' adds sincerity to a statement." },
  { sentence: "He's ___ a really nice person.", correct: "actually", options: ["actually", "basically", "obviously", "anyway"], explanation: "'Actually' adds a nuance of 'contrary to what you might think'." },
  { sentence: "___ speaking, this is a bad idea.", correct: "Honestly", options: ["Honestly", "Actually", "Basically", "Anyway"], explanation: "'Honestly speaking' introduces a frank opinion." },
  { sentence: "___ , that's all I wanted to say.", correct: "So", options: ["So", "Well", "Anyway", "Basically"], explanation: "'So' signals the conclusion of what you wanted to say." },
  { sentence: "___ , it's quite simple once you understand.", correct: "Basically", options: ["Basically", "Actually", "Honestly", "Anyway"], explanation: "'Basically' simplifies a potentially complex explanation." },
  { sentence: "What do you ___ think about this?", correct: "actually", options: ["actually", "basically", "obviously", "anyway"], explanation: "'Actually' in questions adds a sense of genuine curiosity." },
];

export function ModalParticlesTrainer() {
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
    if (opt === current.correct) { setScore((s) => s + 1); playCorrect(); completeExercise(`modalpart-${index}`, 10); }
    else { playWrong(); addError({ question: `Discourse marker: "${current.sentence}"`, userAnswer: opt, correctAnswer: current.correct, explanation: current.explanation, source: "discourse", sourceId: `discourse-${index}` }); }
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
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Discourse Markers Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "Excellent particle skills (B2 level)!" : "Keep practicing!"}</p>
        <button onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again 🔄</button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-lime-600 uppercase tracking-wider">Discourse Markers</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-5">
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">Choose the correct discourse marker</p>
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4 border border-[var(--color-border-default)]">
            <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">{current.sentence}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex flex-wrap justify-center gap-3 mb-4">
        {current.options.map((opt) => {
          const displayOpt = opt.charAt(0).toUpperCase() + opt.slice(1);
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-lime-50 hover:border-lime-300 hover:text-lime-700";
          if (selected) {
            if (opt === current.correct) style = "bg-[var(--color-success)] text-white border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (opt === selected) style = "bg-[var(--color-error)] text-white border-[var(--color-error)]";
            else style = "opacity-40";
          }
          return (
            <button key={opt} onClick={() => handleSelect(opt)} disabled={!!selected} className={`px-5 py-2.5 text-sm font-bold rounded-[var(--radius-lg)] border-2 transition-all duration-200 ${style}`}>
              {displayOpt}
            </button>
          );
        })}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-1 ${selected === current.correct ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}>
            {selected === current.correct ? "✓ Correct! +10 XP" : `✗ Correct: ${current.correct}`}
          </p>
          <p className="text-xs text-[var(--color-text-disabled)] mb-3">{current.explanation}</p>
          <button onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {index + 1 >= pool.length ? "See Results" : "Next →"}
          </button>
        </motion.div>
      )}

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-lime-300" : i === index ? "bg-lime-500" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type Item = { prompt: string; correct: string; options: string[]; rule: string };

const ITEMS: Item[] = [
  { prompt: "The opposite of 'hot' is ___.", correct: "cold", options: ["cold", "cool", "could", "call"], rule: "cold = not hot. Remember: c-o-l-d" },
  { prompt: "Another word for 'big' is ___.", correct: "large", options: ["large", "lodge", "lounge", "lunge"], rule: "large = big. L-a-r-g-e." },
  { prompt: "You write on a ___.", correct: "paper", options: ["paper", "pepper", "puppet", "popper"], rule: "paper: p-a-p-e-r. Double p, single e, single r." },
  { prompt: "The color of the sky is ___.", correct: "blue", options: ["blue", "blow", "blew", "bloo"], rule: "blue: b-l-u-e. Not 'bloo'!" },
  { prompt: "The number after nine is ___.", correct: "ten", options: ["ten", "tin", "tan", "ton"], rule: "ten: t-e-n. Simple three-letter word." },
  { prompt: "The past tense of 'eat' is ___.", correct: "ate", options: ["ate", "eat", "eaten", "eight"], rule: "ate = past of eat. A-t-e. Not 'eight' (8)!" },
  { prompt: "A baby cat is called a ___.", correct: "kitten", options: ["kitten", "kitchen", "kiting", "kitten"], rule: "kitten: k-i-t-t-e-n. Double t, then -en." },
  { prompt: "The opposite of 'day' is ___.", correct: "night", options: ["night", "knight", "nite", "nit"], rule: "night: n-i-g-h-t. Silent 'gh'." },
  { prompt: "Something that tells the time is a ___.", correct: "clock", options: ["clock", "block", "clerk", "crock"], rule: "clock: c-l-o-c-k. Not 'clerk' (a person who works in an office)." },
  { prompt: "The past tense of 'run' is ___.", correct: "ran", options: ["ran", "run", "runned", "ron"], rule: "ran = past of run. 'Run' → 'ran' (irregular)." },
  { prompt: "A round fruit that is red or green is an ___.", correct: "apple", options: ["apple", "applaud", "april", "ample"], rule: "apple: a-p-p-l-e. Double p." },
  { prompt: "The opposite of 'begin' is ___.", correct: "finish", options: ["finish", "Finnish", "furnish", "finite"], rule: "finish: f-i-n-i-s-h. Not to be confused with 'Finnish' (from Finland)." },
  { prompt: "You use this to cut paper: ___.", correct: "scissors", options: ["scissors", "scissor", "sisters", "sensors"], rule: "scissors: s-c-i-s-s-o-r-s. Always plural." },
  { prompt: "The plural of 'child' is ___.", correct: "children", options: ["children", "childs", "childes", "childrens"], rule: "children = irregular plural of 'child'. No -s ending!" },
  { prompt: "The past tense of 'write' is ___.", correct: "wrote", options: ["wrote", "written", "write", "rote"], rule: "write → wrote (past). W-r-o-t-e." },
];

export function SpellingTrainer() {
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
    if (opt === current.correct) { setScore((s) => s + 1); playCorrect(); completeExercise(`spelling-${index}`, 10); }
    else { playWrong(); addError({ question: `Spelling: "${current.prompt}"`, userAnswer: opt, correctAnswer: current.correct, explanation: current.rule, source: "spelling", sourceId: `spelling-${index}` }); }
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
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Spelling Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "Master of English spelling!" : "Keep practicing!"}</p>
        <button onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again 🔄</button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--color-info)] uppercase tracking-wider">English Spelling</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-5">
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">Choose the correct spelling</p>
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)] p-5 border border-[var(--color-border-default)]">
            <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)] font-mono">{current.prompt}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {current.options.map((opt) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-[var(--color-info)] text-white hover:border-blue-300 hover:";
          if (selected) {
            if (opt === current.correct) style = "bg-[var(--color-success)] text-white border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (opt === selected) style = "bg-[var(--color-error)] text-white border-[var(--color-error)]";
            else style = "opacity-40";
          }
          return (
            <button key={opt} onClick={() => handleSelect(opt)} disabled={!!selected} className={`text-sm font-medium px-4 py-3 rounded-[var(--radius-lg)] border-2 transition-all duration-200 font-mono ${style}`}>
              {opt}
            </button>
          );
        })}
      </div>

      {selected && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-1 ${selected === current.correct ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}>
            {selected === current.correct ? "✓ Correct! +10 XP" : `✗ Correct: ${current.correct}`}
          </p>
          <p className="text-xs text-[var(--color-text-disabled)] mb-3">{current.rule}</p>
          <button onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {index + 1 >= pool.length ? "See Results" : "Next →"}
          </button>
        </motion.div>
      )}

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-blue-300" : i === index ? "bg-blue-500" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </div>
  );
}

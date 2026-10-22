"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type Item = { sentence: string; correct: string; options: string[]; explanation: string };

const ITEMS: Item[] = [
  { sentence: "Tomorrow I ___ to Berlin. (travel - will)", correct: "will travel", options: ["will travel", "travel", "travelled", "am travelling"], explanation: "Future with 'will': will + infinitive" },
  { sentence: "Next year they ___ a house. (buy - going to)", correct: "are going to buy", options: ["are going to buy", "buy", "bought", "will buy"], explanation: "'going to' for planned future: be + going to + infinitive" },
  { sentence: "In one hour the film ___. (end - will)", correct: "will end", options: ["will end", "ends", "ended", "is ending"], explanation: "Future with 'will': will + infinitive" },
  { sentence: "You ___ your exam for sure. (pass - will)", correct: "will pass", options: ["will pass", "pass", "passed", "are passing"], explanation: "Future with 'will': will + infinitive" },
  { sentence: "It ___ again soon. (rain - going to)", correct: "is going to rain", options: ["is going to rain", "rains", "rained", "will rain"], explanation: "'going to' for prediction based on evidence" },
  { sentence: "In the future, people ___ longer. (live - will)", correct: "will live", options: ["will live", "live", "lived", "are living"], explanation: "Future with 'will' for predictions about the future" },
  { sentence: "I ___ you tomorrow. (call - will)", correct: "will call", options: ["will call", "call", "called", "am calling"], explanation: "Future with 'will' for spontaneous decisions" },
  { sentence: "The sun ___ early tomorrow. (rise - will)", correct: "will rise", options: ["will rise", "rises", "rose", "is rising"], explanation: "Future with 'will' for factual future events" },
  { sentence: "What ___ you ___ later? (become - will)", correct: "will ... become", options: ["will ... become", "do ... become", "did ... become", "are ... becoming"], explanation: "Future question: will + subject + infinitive" },
  { sentence: "She ___ us next week. (visit - going to)", correct: "is going to visit", options: ["is going to visit", "visits", "visited", "will visit"], explanation: "'going to' for planned arrangements" },
  { sentence: "I ___ you the truth later. (tell - will)", correct: "will tell", options: ["will tell", "tell", "told", "am telling"], explanation: "Future with 'will': will + infinitive" },
  { sentence: "We ___ you at 8 o'clock. (pick up - will)", correct: "will pick up", options: ["will pick up", "pick up", "picked up", "are picking up"], explanation: "Future with 'will' for promises/offers" },
  { sentence: "He ___ next semester in London. (study - going to)", correct: "is going to study", options: ["is going to study", "studies", "studied", "will study"], explanation: "'going to' for future intentions" },
  { sentence: "They ___ a party on Friday. (have - will)", correct: "will have", options: ["will have", "have", "had", "are having"], explanation: "Future with 'will'" },
  { sentence: "I think it ___ tomorrow. (snow - will)", correct: "will snow", options: ["will snow", "snows", "snowed", "is snowing"], explanation: "'I think + will' for predictions based on opinion" },
];

export function FutureTenseTrainer() {
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
    if (opt === current.correct) { setScore((s) => s + 1); playCorrect(); completeExercise(`future-${index}`, 10); }
    else { playWrong(); addError({ question: `Future tense: "${current.sentence}"`, userAnswer: opt, correctAnswer: current.correct, explanation: current.explanation, source: "future", sourceId: `future-${index}` }); }
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
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Future Tense Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "Excellent future tense skills!" : "Keep practicing!"}</p>
        <button onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again 🔄</button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[#FFD700] uppercase tracking-wider">Future Tense</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-5">
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4 border border-[var(--color-border-default)]">
            <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">{current.sentence}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        {current.options.map((opt) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:bg-[var(--color-primary-subtle)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary-dark)]";
          if (selected) {
            if (opt === current.correct) style = "bg-[var(--color-success)] text-white border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (opt === selected) style = "bg-[var(--color-error)] text-white border-[var(--color-error)]";
            else style = "opacity-40";
          }
          return (
            <button key={opt} onClick={() => handleSelect(opt)} disabled={!!selected} className={`text-sm font-medium px-4 py-3 rounded-[var(--radius-lg)] border-2 transition-all duration-200 ${style}`}>
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
          <p className="text-xs text-[var(--color-text-disabled)] mb-3">{current.explanation}</p>
          <button onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {index + 1 >= pool.length ? "See Results" : "Next →"}
          </button>
        </motion.div>
      )}

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-yellow-300" : i === index ? "bg-yellow-500" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </div>
  );
}

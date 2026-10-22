"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type SepEntry = { verb: string; particle: string; definition: string; example: string };

const VERBS: SepEntry[] = [
  { verb: "turn on", particle: "on", definition: "to activate / start", example: "Please turn on the light." },
  { verb: "turn off", particle: "off", definition: "to deactivate / stop", example: "Turn off the TV." },
  { verb: "pick up", particle: "up", definition: "to collect / lift", example: "I will pick you up at 5." },
  { verb: "put on", particle: "on", definition: "to wear / place on body", example: "She puts on her coat." },
  { verb: "take off", particle: "off", definition: "to remove", example: "Take off your shoes." },
  { verb: "get up", particle: "up", definition: "to rise from bed", example: "I get up at 7 am." },
  { verb: "go out", particle: "out", definition: "to leave the house", example: "Let's go out tonight." },
  { verb: "come back", particle: "back", definition: "to return", example: "She comes back tomorrow." },
  { verb: "look for", particle: "for", definition: "to search", example: "I am looking for my keys." },
  { verb: "wait for", particle: "for", definition: "to await", example: "Wait for me!" },
  { verb: "give up", particle: "up", definition: "to quit / stop trying", example: "Don't give up!" },
  { verb: "call back", particle: "back", definition: "to return a call", example: "Please call me back." },
  { verb: "find out", particle: "out", definition: "to discover", example: "I need to find out the truth." },
  { verb: "fill in", particle: "in", definition: "to complete (a form)", example: "Fill in this form." },
  { verb: "show up", particle: "up", definition: "to arrive / appear", example: "He didn't show up." },
  { verb: "break down", particle: "down", definition: "to stop functioning", example: "The car broke down." },
];

export function SeparableVerbsTrainer() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();
  const [pool, setPool] = useState<SepEntry[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => { setPool([...VERBS].sort(() => Math.random() - 0.5).slice(0, 10)); }, []);

  const item = pool[current];

  function handleAnswer(particle: string) {
    if (answered || !item) return;
    const isCorrect = particle === item.particle;
    setCorrect(isCorrect);
    setAnswered(true);
    setTotal((t) => t + 1);
    if (isCorrect) { setScore((s) => s + 1); playCorrect(); }
    else { playWrong(); addError({ question: `Particle of "${item.verb}"`, userAnswer: particle, correctAnswer: item.particle, explanation: `"${item.verb}" uses the particle "${item.particle}": ${item.example}`, source: "exercise", sourceId: `phrasal-${item.verb}` }); }
  }

  function next() {
    if (!item) return;
    if (correct) completeExercise(`phrasal-${item.verb}`, 5);
    if (current + 1 >= pool.length) { setDone(true); return; }
    setCurrent((c) => c + 1);
    setAnswered(false);
    setCorrect(false);
  }

  function restart() { setPool([...VERBS].sort(() => Math.random() - 0.5).slice(0, 10)); setCurrent(0); setScore(0); setTotal(0); setAnswered(false); setCorrect(false); setDone(false); }

  if (done) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">{pct >= 80 ? "🏆" : "👍"}</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Phrasal Verbs Done!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)]">{score}/{total} ({pct}%)</p>
        <button onClick={restart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-4">Play Again 🔄</button>
      </div>
    );
  }

  if (!item) return null;

  const particles = Array.from(new Set(VERBS.map((v) => v.particle))).sort(() => Math.random() - 0.5).slice(0, 6);
  if (!particles.includes(item.particle)) particles[0] = item.particle;

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-teal-600 uppercase tracking-wider">Phrasal Verbs</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{current + 1}/{pool.length}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-4">
          <p className="text-xs text-[var(--color-text-disabled)] mb-2">Which particle completes this phrasal verb?</p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">{item.verb}</span>
            <span className="text-xs text-[var(--color-text-disabled)] italic">({item.definition})</span>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {particles.map((p) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] hover:bg-[var(--color-primary-subtle)] hover:border-[var(--color-primary)]";
          if (answered) {
            if (p === item.particle) style = "bg-[var(--color-success)] text-white border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            else if (p !== item.particle && answered) style = "bg-[var(--color-error)] text-white border-[var(--color-error)]";
          }
          return (
            <button key={p} onClick={() => handleAnswer(p)} disabled={answered}
              className={`p-3 rounded-[var(--radius-lg)] border-2 text-sm font-semibold transition-all ${style}`}>
              {p}
            </button>
          );
        })}
      </div>
      {answered && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <p className={`text-sm font-medium mb-2 ${correct ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}>
            {correct ? "✓ Correct!" : `✗ Correct particle: "${item.particle}"`}
          </p>
          <p className="text-xs text-[var(--color-text-secondary)] mb-2">{item.example}</p>
          <button onClick={next} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            {current + 1 >= pool.length ? "Results" : "Next →"}
          </button>
        </motion.div>
      )}
    </div>
  );
}

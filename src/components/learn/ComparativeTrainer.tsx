"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";
import { Lightbulb, BookOpen } from "lucide-react";

type CompEntry = { adj: string; comparative: string; superlative: string };

const COMPS: CompEntry[] = [
  { adj: "good", comparative: "better", superlative: "best" },
  { adj: "bad", comparative: "worse", superlative: "worst" },
  { adj: "big", comparative: "bigger", superlative: "biggest" },
  { adj: "small", comparative: "smaller", superlative: "smallest" },
  { adj: "fast", comparative: "faster", superlative: "fastest" },
  { adj: "slow", comparative: "slower", superlative: "slowest" },
  { adj: "young", comparative: "younger", superlative: "youngest" },
  { adj: "old", comparative: "older", superlative: "oldest" },
  { adj: "warm", comparative: "warmer", superlative: "warmest" },
  { adj: "cold", comparative: "colder", superlative: "coldest" },
  { adj: "high", comparative: "higher", superlative: "highest" },
  { adj: "happy", comparative: "happier", superlative: "happiest" },
  { adj: "easy", comparative: "easier", superlative: "easiest" },
  { adj: "hot", comparative: "hotter", superlative: "hottest" },
  { adj: "beautiful", comparative: "more beautiful", superlative: "most beautiful" },
];

function getCompTip(item: CompEntry, mode: Mode): { tip: string; suggest: string } {
  if (mode === "comparative") {
    if (item.comparative === "better" || item.comparative === "worse") {
      return { tip: `"${item.adj}" is an IRREGULAR comparative: it changes completely (${item.adj} → ${item.comparative}). These must be memorized!`, suggest: "Review the list of irregular comparatives in the Comparatives lesson." };
    }
    if (item.comparative.startsWith("more")) {
      return { tip: `Long adjectives use "more" instead of -er: ${item.adj} → ${item.comparative}. This applies to most adjectives with 3+ syllables.`, suggest: "Practice long-form comparatives with the Comparatives trainer." };
    }
    return { tip: `Regular comparative: adjective + "-er". ${item.adj} → ${item.comparative}. Most short adjectives follow this rule!`, suggest: "Check the Comparatives lesson for more examples." };
  }
  if (mode === "superlative") {
    if (item.superlative === "best" || item.superlative === "worst") {
      return { tip: `"${item.adj}" is IRREGULAR in the superlative too: ${item.adj} → ${item.comparative} → ${item.superlative}. Memorize these!`, suggest: "Review irregular forms (good → better → best) in the Comparatives lesson." };
    }
    if (item.superlative.startsWith("most")) {
      return { tip: `Long adjectives use "most" + adjective: ${item.adj} → ${item.superlative}.`, suggest: "Practice the superlative with long adjectives." };
    }
    if (item.superlative.endsWith("iest")) {
      return { tip: `Adjectives ending in -y change to -iest: ${item.adj} → ${item.superlative}.`, suggest: "Review the -y → -iest rule in the Comparatives lesson." };
    }
    return { tip: `Regular superlative: "the" + adjective + "-est". ${item.adj} → ${item.superlative}.`, suggest: "Practice the superlative with the Comparatives trainer." };
  }
  return { tip: `Compare: ${item.adj} → ${item.comparative} → ${item.superlative}. The comparative uses "than" (He is bigger THAN me).`, suggest: "Review the Comparatives lesson in Practice Hub." };
}

type Mode = "comparative" | "superlative";

export function ComparativeTrainer() {
  const { completeExercise } = useProgress(); const { addError } = useErrors();
  const [pool, setPool] = useState<CompEntry[]>([]);
  const [current, setCurrent] = useState(0); const [score, setScore] = useState(0); const [total, setTotal] = useState(0);
  const [input, setInput] = useState(""); const [mode, setMode] = useState<Mode>("comparative");
  const [answered, setAnswered] = useState(false); const [isCorrect, setIsCorrect] = useState(false); const [done, setDone] = useState(false);

  useEffect(() => { setPool([...COMPS].sort(() => Math.random() - 0.5).slice(0, 8)); }, []);

  const item = pool[current];
  const expected = item ? (mode === "comparative" ? item.comparative : item.superlative) : "";

  function handleSubmit() {
    if (answered || !item) return;
    const correct = input.trim().toLowerCase() === expected.toLowerCase();
    setIsCorrect(correct); setAnswered(true); setTotal((t) => t + 1);
    if (correct) { setScore((s) => s + 1); playCorrect(); }
    else { playWrong(); addError({ question: `${mode === "comparative" ? "Comparative" : "Superlative"} of "${item.adj}"`, userAnswer: input.trim(), correctAnswer: expected, explanation: `${item.adj} → ${item.comparative} → ${item.superlative}`, source: "exercise", sourceId: `comp-${item.adj}-${mode}` }); }
  }

  function next() {
    if (!item) return; if (isCorrect) completeExercise(`comp-${item.adj}-${mode}`, 5);
    if (current + 1 >= pool.length) { if (mode === "comparative") { setMode("superlative"); setCurrent(0); setInput(""); setAnswered(false); setIsCorrect(false); return; } setDone(true); return; }
    setCurrent((c) => c + 1); setInput(""); setAnswered(false); setIsCorrect(false);
  }

  function restart() { setPool([...COMPS].sort(() => Math.random() - 0.5).slice(0, 8)); setCurrent(0); setScore(0); setTotal(0); setInput(""); setMode("comparative"); setAnswered(false); setIsCorrect(false); setDone(false); }

  if (done) return <div className="text-center py-8"><span className="text-5xl block mb-3">🏆</span><h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Comparatives Done!</h3><p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)]">{score}/{total}</p><button onClick={restart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-4">Play Again 🔄</button></div>;
  if (!item) return null;

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[#FFD700] uppercase tracking-wider">{mode === "comparative" ? "Comparative" : "Superlative"}</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{current + 1}/{pool.length} · {mode === "comparative" ? "Phase 1/2" : "Phase 2/2"}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={`${mode}-${current}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-4">
          <p className="text-xs text-[var(--color-text-disabled)] mb-1">Write the {mode} form of:</p>
          <span className="text-2xl font-display font-extrabold text-[var(--color-text-primary)]">{item.adj}</span>
        </motion.div>
      </AnimatePresence>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !answered && handleSubmit()} disabled={answered}
        placeholder={mode === "comparative" ? "e.g. better" : "e.g. best"}
        className={`w-full px-3 py-2 rounded-[var(--radius-lg)] border font-mono text-center text-sm bg-[var(--color-surface-alt)] outline-none transition-all ${
          answered ? (isCorrect ? "border-[var(--color-success)] bg-emerald-500 text-white font-bold" : "border-red-300 bg-red-500 text-white font-bold") : "border-[var(--color-border-default)] text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-brand-100"
        }`}
      />
      {!answered && <div className="flex justify-center mt-3"><button onClick={handleSubmit} disabled={!input.trim()} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all disabled:opacity-50">Check ✓</button></div>}
      {answered && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
          {isCorrect ? (
            <p className="text-sm font-medium text-[var(--color-success)] text-center mb-2">✓ Correct!</p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm font-medium text-[var(--color-error)] text-center mb-2">✗ Correct: {'\u201C'}{expected}{'\u201D'}</p>

              <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning)] text-white ring-1 ring-[var(--color-warning)]">
                <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-warning)]" />
                <div>
                  <p className="font-semibold text-sm">Astuce (Tip)</p>
                  <p className="text-sm mt-1">{getCompTip(item, mode).tip}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info)] text-white ring-1 ring-[var(--color-info)]">
                <BookOpen className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-info)]" />
                <div>
                  <p className="font-semibold text-sm">Suggestion</p>
                  <p className="text-sm mt-1">{getCompTip(item, mode).suggest}</p>
                </div>
              </div>
            </div>
          )}
          <div className="text-center mt-3">
            <button onClick={next} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
              {current + 1 >= pool.length && mode === "superlative" ? "Results" : "Next →"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

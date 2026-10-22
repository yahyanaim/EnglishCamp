"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { playCorrect, playWrong } from "@/lib/audio";
import { Lightbulb, BookOpen } from "lucide-react";

type NumEntry = { prompt: string; answer: string };

const NUMBERS: NumEntry[] = [
  { prompt: "1", answer: "one" }, { prompt: "2", answer: "two" }, { prompt: "3", answer: "three" },
  { prompt: "4", answer: "four" }, { prompt: "5", answer: "five" }, { prompt: "6", answer: "six" },
  { prompt: "7", answer: "seven" }, { prompt: "8", answer: "eight" }, { prompt: "9", answer: "nine" },
  { prompt: "10", answer: "ten" }, { prompt: "11", answer: "eleven" }, { prompt: "12", answer: "twelve" },
  { prompt: "13", answer: "thirteen" }, { prompt: "14", answer: "fourteen" }, { prompt: "15", answer: "fifteen" },
  { prompt: "20", answer: "twenty" }, { prompt: "21", answer: "twenty-one" }, { prompt: "30", answer: "thirty" },
  { prompt: "50", answer: "fifty" }, { prompt: "100", answer: "one hundred" },
  { prompt: "22", answer: "twenty-two" }, { prompt: "33", answer: "thirty-three" },
  { prompt: "47", answer: "forty-seven" }, { prompt: "99", answer: "ninety-nine" },
];

function getNumberTip(prompt: string, answer: string): { tip: string; suggest: string } {
  const n = parseInt(prompt, 10);
  if (n <= 12) {
    return {
      tip: `Numbers 1-12 are unique forms you need to memorize: one, two, three, four, five, six, seven, eight, nine, ten, eleven, twelve. There's no pattern — just practice!`,
      suggest: "Review the Numbers lesson and try the Numbers category in Practice Hub for more repetition.",
    };
  }
  if (n >= 13 && n <= 19) {
    return {
      tip: `Numbers 13-19 follow a pattern: digit + "teen". For example, ${prompt} → "${answer}" = four + "teen" = fourteen. (Exceptions: eleven, twelve.)`,
      suggest: "Practice teen numbers with the Numbers lesson and daily flashcards.",
    };
  }
  if (n >= 20 && n < 100) {
    if (answer.includes("-")) {
      const parts = answer.split("-");
      return {
        tip: `English tens use the pattern: tens + "-" + ones. For example, "${answer}" = "${parts[0]}" + "${parts[1]}". Always say the tens first!`,
        suggest: "Practice with the Numbers trainer and try writing numbers as words.",
      };
    }
    return {
      tip: `Tens in English end with "-ty": twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety.`,
      suggest: "Master tens with repeated practice in the Numbers trainer.",
    };
  }
  if (n >= 100) {
    return {
      tip: `Hundreds in English: "one hundred" (100) or "two hundred" (200). Then add the tens/ones: "one hundred twenty-three" = 123.`,
      suggest: "Review large numbers in the Numbers lesson section on hundreds and thousands.",
    };
  }
  return {
    tip: `"${answer}" is the English word for ${prompt}. Focus on the spelling.`,
    suggest: "Practice regularly with the Numbers trainer to build automatic recall.",
  };
}

export function NumbersTrainer() {
  const { completeExercise } = useProgress();
  const [pool, setPool] = useState<NumEntry[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [input, setInput] = useState("");
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => { setPool([...NUMBERS].sort(() => Math.random() - 0.5).slice(0, 12)); }, []);

  const item = pool[current];

  function handleSubmit() {
    if (answered || !item) return;
    const correct = input.trim().toLowerCase() === item.answer.toLowerCase();
    setIsCorrect(correct);
    setAnswered(true);
    setTotal((t) => t + 1);
    if (correct) { setScore((s) => s + 1); playCorrect(); }
    else { playWrong(); }
  }

  function next() {
    if (!item) return;
    if (isCorrect) completeExercise(`num-${item.prompt}`, 3);
    if (current + 1 >= pool.length) { setDone(true); return; }
    setCurrent((c) => c + 1); setInput(""); setAnswered(false); setIsCorrect(false);
  }

  function restart() { setPool([...NUMBERS].sort(() => Math.random() - 0.5).slice(0, 12)); setCurrent(0); setScore(0); setTotal(0); setInput(""); setAnswered(false); setIsCorrect(false); setDone(false); }

  if (done) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">{pct >= 80 ? "🏆" : "👍"}</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Numbers Done!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)]">{score}/{total} ({pct}%)</p>
        <button onClick={restart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-4">Play Again 🔄</button>
      </div>
    );
  }

  if (!item) return null;

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--color-warning)] uppercase tracking-wider">Numbers Trainer</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{current + 1}/{pool.length}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-4">
          <p className="text-xs text-[var(--color-text-disabled)] mb-2">Write this number in English:</p>
          <span className="text-5xl font-display font-extrabold text-[var(--color-text-primary)]">{item.prompt}</span>
        </motion.div>
      </AnimatePresence>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !answered && handleSubmit()} disabled={answered}
        placeholder="e.g. twenty-three"
        className={`w-full px-3 py-2 rounded-[var(--radius-lg)] border font-mono text-center text-sm bg-[var(--color-surface-alt)] outline-none transition-all ${
          answered ? (isCorrect ? "border-[var(--color-success)] text-[var(--color-success)]" : "border-red-300 text-[var(--color-error)]") : "border-[var(--color-border-default)] text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-brand-100"
        }`}
      />
      {!answered && (
        <div className="flex justify-center mt-3">
          <button onClick={handleSubmit} disabled={!input.trim()} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all disabled:opacity-50">Check ✓</button>
        </div>
      )}
      {answered && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
          {isCorrect ? (
            <p className="text-sm font-medium text-[var(--color-success)] text-center mb-2">✓ Correct!</p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm font-medium text-[var(--color-error)] text-center mb-2">✗ Correct: {'\u201C'}{item.answer}{'\u201D'}</p>

              <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning)] text-white ring-1 ring-[var(--color-warning)]">
                <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-warning)]" />
                <div>
                  <p className="font-semibold text-sm">Astuce (Tip)</p>
                  <p className="text-sm mt-1">{getNumberTip(item.prompt, item.answer).tip}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info)] text-white ring-1 ring-[var(--color-info)]">
                <BookOpen className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-info)]" />
                <div>
                  <p className="font-semibold text-sm">Suggestion</p>
                  <p className="text-sm mt-1">{getNumberTip(item.prompt, item.answer).suggest}</p>
                </div>
              </div>
            </div>
          )}
          <div className="text-center mt-3">
            <button onClick={next} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
              {current + 1 >= pool.length ? "Results" : "Next →"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

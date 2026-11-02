"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";
import { Lightbulb, BookOpen } from "lucide-react";

type PluralEntry = { singular: string; plural: string; pattern: string };

const PLURALS: PluralEntry[] = [
  { singular: "man", plural: "men", pattern: "irregular: vowel change" },
  { singular: "woman", plural: "women", pattern: "irregular: vowel change" },
  { singular: "child", plural: "children", pattern: "irregular: -ren" },
  { singular: "book", plural: "books", pattern: "regular: +s" },
  { singular: "house", plural: "houses", pattern: "regular: +s" },
  { singular: "table", plural: "tables", pattern: "regular: +s" },
  { singular: "school", plural: "schools", pattern: "regular: +s" },
  { singular: "car", plural: "cars", pattern: "regular: +s" },
  { singular: "dog", plural: "dogs", pattern: "regular: +s" },
  { singular: "cat", plural: "cats", pattern: "regular: +s" },
  { singular: "flower", plural: "flowers", pattern: "regular: +s" },
  { singular: "city", plural: "cities", pattern: "y → ies" },
  { singular: "country", plural: "countries", pattern: "y → ies" },
  { singular: "baby", plural: "babies", pattern: "y → ies" },
  { singular: "apple", plural: "apples", pattern: "regular: +s" },
  { singular: "father", plural: "fathers", pattern: "regular: +s" },
  { singular: "mother", plural: "mothers", pattern: "regular: +s" },
  { singular: "window", plural: "windows", pattern: "regular: +s" },
  { singular: "plate", plural: "plates", pattern: "regular: +s" },
  { singular: "student", plural: "students", pattern: "regular: +s" },
  { singular: "box", plural: "boxes", pattern: "add +es (after s, x, sh, ch)" },
  { singular: "leaf", plural: "leaves", pattern: "f/fe → ves" },
  { singular: "knife", plural: "knives", pattern: "f/fe → ves" },
  { singular: "mouse", plural: "mice", pattern: "irregular: vowel change" },
  { singular: "tooth", plural: "teeth", pattern: "irregular: vowel change" },
  { singular: "foot", plural: "feet", pattern: "irregular: vowel change" },
  { singular: "sheep", plural: "sheep", pattern: "no change (same form)" },
  { singular: "fish", plural: "fish", pattern: "no change (same form)" },
  { singular: "potato", plural: "potatoes", pattern: "add +es (after o)" },
  { singular: "photo", plural: "photos", pattern: "add +s (after o, short form)" },
];

function getPluralTip(item: PluralEntry): { tip: string; suggest: string } {
  const p = item.pattern;
  if (p === "regular: +s") return { tip: `Most English nouns add -s to form the plural: "${item.singular}" → "${item.plural}".`, suggest: "Practice regular plurals with the Plural trainer." };
  if (p === "y → ies") return { tip: `Nouns ending in consonant + y change y to i and add -es: "${item.singular}" → "${item.plural}".`, suggest: "Review the y → ies rule in the Plural lesson." };
  if (p === "add +es (after s, x, sh, ch)") return { tip: `Nouns ending in s, x, sh, or ch add -es: "${item.singular}" → "${item.plural}".`, suggest: "Practice -es endings with the Plural trainer." };
  if (p === "f/fe → ves") return { tip: `Nouns ending in f or fe change to -ves: "${item.singular}" → "${item.plural}".`, suggest: "Memorize common f/fe → ves words with flashcards." };
  if (p === "irregular: vowel change") return { tip: `Some nouns change the vowel in the plural: "${item.singular}" → "${item.plural}". These must be memorized.`, suggest: "Practice irregular plurals with the Plural trainer and flashcards." };
  if (p === "irregular: -ren") return { tip: `A few nouns add -ren: "${item.singular}" → "${item.plural}". 'Child → children' is the most common example.`, suggest: "Memorize this special irregular plural form." };
  if (p === "no change (same form)") return { tip: `Some nouns have the same form for singular and plural: "${item.singular}" → "${item.plural}".`, suggest: "Practice unchanged plurals in the Plural trainer." };
  if (p === "add +es (after o)") return { tip: `Some nouns ending in o add -es: "${item.singular}" → "${item.plural}". But others just add -s.`, suggest: "Memorize common -o words with their plurals." };
  if (p === "add +s (after o, short form)") return { tip: `Shortened words ending in o usually add just -s: "${item.singular}" → "${item.plural}".`, suggest: "Practice with the Plural trainer." };
  return { tip: `The plural of "${item.singular}" is "${item.plural}" (${item.pattern}).`, suggest: "Review plural patterns in the Plural trainer." };
}

export function PluralTrainer() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();
  const [pool, setPool] = useState<PluralEntry[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [input, setInput] = useState("");
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => { setPool([...PLURALS].sort(() => Math.random() - 0.5).slice(0, 12)); }, []);

  const item = pool[current];

  function handleSubmit() {
    if (answered || !item) return;
    const correct = input.trim().toLowerCase() === item.plural.toLowerCase();
    setIsCorrect(correct);
    setAnswered(true);
    setTotal((t) => t + 1);
    if (correct) { setScore((s) => s + 1); playCorrect(); }
    else { playWrong(); addError({ question: `Plural of "${item.singular}"`, userAnswer: input.trim(), correctAnswer: item.plural, explanation: `Plural: ${item.plural} (${item.pattern})`, source: "exercise", sourceId: `plural-${item.singular}` }); }
  }

  function next() {
    if (!item) return;
    if (isCorrect) completeExercise(`plural-${item.singular}`, 5);
    if (current + 1 >= pool.length) { setDone(true); return; }
    setCurrent((c) => c + 1);
    setInput("");
    setAnswered(false);
    setIsCorrect(false);
  }

  function restart() { setPool([...PLURALS].sort(() => Math.random() - 0.5).slice(0, 12)); setCurrent(0); setScore(0); setTotal(0); setInput(""); setAnswered(false); setIsCorrect(false); setDone(false); }

  if (done) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">{pct >= 80 ? "🏆" : "👍"}</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Plurals Done!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-text-link)]">{score}/{total} ({pct}%)</p>
        <PracticeButton onClick={restart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-4">Play Again <LearningArt name="🔄" size={16} /></PracticeButton>
      </div>
    );
  }

  if (!item) return null;

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-display font-extrabold text-[#E0115F] uppercase tracking-wider">Plural Trainer</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{current + 1}/{pool.length}</span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <p className="text-xs text-[var(--color-text-secondary)] mb-2">Write the plural form:</p>
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">{item.singular}</span>
          </div>
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && !answered && handleSubmit()} disabled={answered}
            placeholder="plural form..."
            className={`w-full px-3 py-2 rounded-[var(--radius-lg)] border font-mono text-center text-sm bg-[var(--color-surface-alt)] outline-none transition-all ${
              answered ? (isCorrect ? "border-[var(--color-success)] bg-emerald-500 text-white font-bold" : "border-red-300 bg-red-500 text-white font-bold") : "border-[var(--color-border-default)] text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-brand-100"
            }`}
          />
        </motion.div>
      </AnimatePresence>
      {!answered && (
        <PracticeButton onClick={handleSubmit} disabled={!input.trim()} className="mt-3 text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all disabled:opacity-50">
          Check ✓
        </PracticeButton>
      )}
      {answered && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3">
          {isCorrect ? (
            <p className="text-sm font-medium text-[var(--color-text-success)]">✓ Correct!</p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm font-medium text-[var(--color-text-error)]">✗ Correct: {item.plural} ({item.pattern})</p>

              <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] ring-1 ring-[var(--color-warning)]">
                <LearningArt name="Lightbulb" size={20} className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-text-warning)]" />
                <div>
                  <p className="font-semibold text-sm">Astuce (Tip)</p>
                  <p className="text-sm mt-1">{getPluralTip(item).tip}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info-bg)] text-[var(--color-text-info)] ring-1 ring-[var(--color-info)]">
                <LearningArt name="BookOpen" size={20} className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-text-info)]" />
                <div>
                  <p className="font-semibold text-sm">Suggestion</p>
                  <p className="text-sm mt-1">{getPluralTip(item).suggest}</p>
                </div>
              </div>
            </div>
          )}
          <div className="mt-3">
            <PracticeButton onClick={next} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
              {current + 1 >= pool.length ? "Results" : "Next →"}
            </PracticeButton>
          </div>
        </motion.div>
      )}
    </PracticeCard>
  );
}

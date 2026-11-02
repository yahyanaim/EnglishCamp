"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";

type Item = { word: string; meaning: string; correct: string; options: string[]; explanation: string };

const ITEMS: Item[] = [
  { word: "actually", meaning: "used to emphasize a fact", correct: "actually", options: ["actually", "currently", "nowadays", "really"], explanation: "In Arabic, بعض الطلاب يخلطون between 'actually' and 'currently'." },
  { word: "sensible", meaning: "reasonable / practical", correct: "sensible", options: ["sensible", "sensitive", "sensory", "sensual"], explanation: "Arabic speakers may confuse 'sensible' (reasonable) with 'sensitive' (emotional)." },
  { word: "sympathy", meaning: "feeling of pity / compassion", correct: "sympathy", options: ["sympathy", "empathy", "apathy", "antipathy"], explanation: "'Sympathy' and 'empathy' are often confused. Sympathy = feeling for someone; Empathy = feeling with someone." },
  { word: "library", meaning: "a place with books", correct: "library", options: ["library", "bookshop", "bookstore", "bookcase"], explanation: "Arabic speakers sometimes confuse 'library' (مكتبة عامة) with 'bookshop' (مكتبة تجارية)." },
  { word: "eventually", meaning: "finally / in the end", correct: "eventually", options: ["eventually", "possibly", "actually", "potentially"], explanation: "Arabic speakers may think 'eventually' means 'possibly' (ربما), but it means 'finally' (في النهاية)." },
  { word: "embarrassed", meaning: "feeling shy / ashamed", correct: "embarrassed", options: ["embarrassed", "pregnant", "married", "engaged"], explanation: "In Arabic, some confuse 'embarrassed' (محرج) with 'pregnant' (حامل) due to similar sounds." },
  { word: "preservative", meaning: "something that preserves food", correct: "preservative", options: ["preservative", "conservative", "reservation", "preservation"], explanation: "'Preservative' (مادة حافظة) is often confused with 'conservative' (محافظ)." },
  { word: "parents", meaning: "mother and father", correct: "parents", options: ["parents", "relatives", "peasants", "presidents"], explanation: "Arabic speakers may mishear 'parents' (والدان) as 'relatives' (أقارب)." },
  { word: "satisfied", meaning: "pleased / content", correct: "satisfied", options: ["satisfied", "suffocated", "sacrificed", "specified"], explanation: "In Arabic, راضٍ = satisfied vs. مختنق = suffocated. The words sound different but may be confused." },
  { word: "vacation", meaning: "holiday / time off", correct: "vacation", options: ["vacation", "vocation", "vibration", "vaccination"], explanation: "'Vacation' (عطلة) and 'vocation' (مهنة) look similar but have very different meanings." },
  { word: "college", meaning: "a place for higher education", correct: "college", options: ["college", "colleague", "collage", "courage"], explanation: "Arabic speakers may confuse 'college' (كلية) with 'colleague' (زميل)." },
  { word: "exit", meaning: "way out", correct: "exit", options: ["exit", "exist", "exile", "exact"], explanation: "'Exit' (مخرج) and 'exist' (يوجد) look almost the same but have different meanings." },
  { word: "affect", meaning: "to influence or change", correct: "affect", options: ["affect", "effect", "effort", "infect"], explanation: "'Affect' (يؤثر) is a verb; 'effect' (تأثير) is a noun. Very commonly confused by Arabic speakers." },
  { word: "dessert", meaning: "sweet food after a meal", correct: "dessert", options: ["dessert", "desert", "deserve", "dessert"], explanation: "'Dessert' (حلوى) has two s's. 'Desert' (صحراء) has one s. Easy to confuse!" },
  { word: "principal", meaning: "head of a school", correct: "principal", options: ["principal", "principle", "primary", "primitive"], explanation: "'Principal' (مدير مدرسة) vs 'principle' (مبدأ). Look similar but meanings differ." },
];

export function FalseFriendsTrainer() {
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
    if (opt === current.correct) { setScore((s) => s + 1); playCorrect(); completeExercise(`falsefriend-${index}`, 10); }
    else { playWrong(); addError({ question: `False friend: "${current.word}"`, userAnswer: opt, correctAnswer: current.correct, explanation: current.explanation, source: "falsefriend", sourceId: `falsefriend-${index}` }); }
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
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">False Friends Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-text-link)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{pct >= 80 ? "Excellent vocabulary awareness!" : "Keep practicing!"}</p>
        <PracticeButton onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again <LearningArt name="🔄" size={16} /></PracticeButton>
      </div>
    );
  }

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--color-text-warning)] uppercase tracking-wider">False Friends</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="text-center mb-5">
          <p className="text-sm text-[var(--color-text-secondary)] mb-1">What does this English word mean?</p>
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-md)] p-4 border border-[var(--color-border-default)]">
            <p className="text-2xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">{current.word}</p>
            <p className="text-sm text-[var(--color-text-secondary)]">(be careful — it can be confusing!)</p>
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

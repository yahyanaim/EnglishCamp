"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";
import { SpeakerButton } from "@/components/ui/SpeakerButton";

const NOUNS: { noun: string; article: "a" | "an" }[] = [
  { noun: "apple", article: "an" },
  { noun: "banana", article: "a" },
  { noun: "hour", article: "an" },
  { noun: "university", article: "a" },
  { noun: "umbrella", article: "an" },
  { noun: "dog", article: "a" },
  { noun: "honest person", article: "an" },
  { noun: "European", article: "a" },
  { noun: "orange", article: "an" },
  { noun: "cat", article: "a" },
  { noun: "elephant", article: "an" },
  { noun: "house", article: "a" },
  { noun: "ice cream", article: "an" },
  { noun: "book", article: "a" },
  { noun: "animal", article: "an" },
  { noun: "car", article: "a" },
  { noun: "airport", article: "an" },
  { noun: "table", article: "a" },
  { noun: "egg", article: "an" },
  { noun: "chair", article: "a" },
  { noun: "island", article: "an" },
  { noun: "school", article: "a" },
  { noun: "honor", article: "an" },
  { noun: "one-way street", article: "a" },
  { noun: "office", article: "an" },
  { noun: "garden", article: "a" },
  { noun: "answer", article: "an" },
  { noun: "tree", article: "a" },
  { noun: "interesting job", article: "an" },
  { noun: "friend", article: "a" },
];

const ARTICLES = ["a", "an"] as const;

export function NounGenderTrainer() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();

  const [pool, setPool] = useState<typeof NOUNS>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const shuffled = [...NOUNS].sort(() => Math.random() - 0.5);
    setPool(shuffled.slice(0, 15));
  }, []);

  const item = pool[current];

  function handleAnswer(article: string) {
    if (answered || !item) return;
    const isCorrect = article === item.article;
    setCorrect(isCorrect);
    setAnswered(true);
    setTotal((t) => t + 1);
    if (isCorrect) {
      setScore((s) => s + 1);
      playCorrect();
    } else {
      playWrong();
      addError({
        question: `Article for "${item.noun}"`,
        userAnswer: article,
        correctAnswer: item.article,
        explanation: `"${item.noun}" takes "${item.article}"`,
        source: "gender",
        sourceId: `gender-${item.noun}`,
      });
    }
  }

  function next() {
    if (!item) return;
    if (correct) completeExercise(`gender-${item.noun}`, 5);
    if (current + 1 >= pool.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setAnswered(false);
      setCorrect(false);
    }
  }

  function restart() {
    const shuffled = [...NOUNS].sort(() => Math.random() - 0.5);
    setPool(shuffled.slice(0, 15));
    setCurrent(0);
    setScore(0);
    setTotal(0);
    setAnswered(false);
    setCorrect(false);
    setDone(false);
  }

  if (done) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "💪"}</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Article Trainer Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-text-link)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">
          {pct >= 80 ? "Great article knowledge!" : "Keep practicing!"}
        </p>
        <PracticeButton
          onClick={restart}
          className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all"
        >
          Play Again <LearningArt name="🔄" size={16} />
        </PracticeButton>
      </div>
    );
  }

  if (!item) return null;

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[#9B59B6] uppercase tracking-wider">Article Trainer</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{current + 1} / {pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="text-center mb-6"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl font-display font-extrabold text-[var(--color-text-primary)]">{item.noun}</span>
            <SpeakerButton text={item.noun} />
          </div>
          <p className="text-sm text-[var(--color-text-secondary)] italic">Choose a or an</p>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-3 mb-6">
        {ARTICLES.map((article) => {
          let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] hover:bg-[var(--color-primary-subtle)] hover:border-[var(--color-primary)] hover:text-[var(--color-text-link)]";
          if (answered) {
            if (article === item.article) {
              style = "bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-[var(--color-success)] ring-2 ring-[var(--color-success)]";
            } else if (article !== item.article) {
              style = "bg-[var(--color-error-bg)] text-[var(--color-text-error)] border-[var(--color-error)] opacity-50";
            }
          }
          return (
            <PracticeButton
              key={article}
              onClick={() => handleAnswer(article)}
              disabled={answered}
              className={`w-20 h-14 text-lg font-display font-extrabold rounded-[var(--radius-lg)] border transition-all duration-200 ${style}`}
            >
              {article}
            </PracticeButton>
          );
        })}
      </div>

      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className={`text-sm font-medium mb-3 ${correct ? "text-[var(--color-text-success)]" : "text-[var(--color-text-error)]"}`}>
            {correct ? "✓ Correct! +5 XP" : `✗ Correct: ${item.article} ${item.noun}`}
          </p>
          <PracticeButton
            onClick={next}
            className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all"
          >
            {current + 1 >= pool.length ? "See Results" : "Next →"}
          </PracticeButton>
        </motion.div>
      )}

      <div className="flex justify-between mt-4 text-xs text-[var(--color-text-secondary)]">
        <span>Score: {score}/{total}</span>
        <div className="flex gap-1">
          {pool.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-[var(--radius-pill)] ${
                i < current ? "bg-[var(--color-primary)]" : i === current ? "bg-[var(--color-primary)]" : "bg-[var(--color-border-default)]"
              }`}
            />
          ))}
        </div>
      </div>
    </PracticeCard>
  );
}

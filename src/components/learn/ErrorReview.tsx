"use client";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useErrors } from "@/store/useErrors";
import { useProgress } from "@/store/useProgress";
import { useVocabulary, vocabId } from "@/store/useVocabulary";
import { playCorrect, playWrong } from "@/lib/audio";

export function ErrorReview() {
  const { errors, markReviewed } = useErrors();
  const { completeExercise } = useProgress();
  const { addWord } = useVocabulary();

  const unreviewed = useMemo(() => errors.filter((e) => !e.reviewed), [errors]);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const item = unreviewed[index];

  function handleGotIt() {
    if (!item) return;
    const realIndex = errors.indexOf(item);
    markReviewed(realIndex);
    completeExercise(`error-review-${realIndex}`, 5);
    playCorrect();
    const words = item.correctAnswer.split(" ");
    for (const w of words) {
      if (w.length > 2) addWord(w, item.question.slice(0, 60), "error-review");
    }
    next();
  }

  function next() {
    if (index + 1 >= unreviewed.length) {
      setIndex(0);
      setRevealed(false);
    } else {
      setIndex((i) => i + 1);
      setRevealed(false);
    }
  }

  function skip() {
    playWrong();
    next();
  }

  if (unreviewed.length === 0) {
    return (
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm text-center" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
        <span className="text-4xl block mb-2">🎉</span>
        <p className="text-sm font-medium text-[var(--color-text-primary)]">No errors to review!</p>
        <p className="text-xs text-[var(--color-text-disabled)] mt-1">Keep up the great work</p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-[var(--color-error)] uppercase tracking-wider">Error Review</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{index + 1}/{unreviewed.length} remaining</span>
      </div>

      {!revealed ? (
        <div>
          <p className="text-sm font-medium text-[var(--color-text-primary)] mb-4">{item?.question}</p>
          <p className="text-sm text-[var(--color-text-secondary)] mb-2">Your answer: <span className="text-[var(--color-error)] font-medium">{item?.userAnswer}</span></p>
          <button onClick={() => setRevealed(true)}
            className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
            Show Correct Answer
          </button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm font-medium text-[var(--color-text-primary)] mb-1">{item?.question}</p>
          <div className="bg-[var(--color-success)] text-white border border-[var(--color-success)] rounded-[var(--radius-lg)] p-3 mb-3">
            <p className="text-sm font-semibold text-[var(--color-success)]">Correct: {item?.correctAnswer}</p>
            <p className="text-xs text-[var(--color-success)] mt-1">{item?.explanation}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleGotIt}
              className="text-sm font-medium bg-[var(--color-success)] text-white  border border-[var(--color-success)] px-4 py-2 rounded-[var(--radius-lg)] hover:bg-emerald-100 transition-all">
              Got it! (+5 XP)
            </button>
            <button onClick={skip}
              className="text-sm font-medium text-[var(--color-text-secondary)] border border-[var(--color-border-default)] px-4 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-surface-alt)] transition-all">
              Skip
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

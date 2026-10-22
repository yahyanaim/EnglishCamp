"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { useErrors } from "@/store/useErrors";
import { useVocabulary } from "@/store/useVocabulary";
import { useProgress } from "@/store/useProgress";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { speak } from "@/lib/audio";
import { Brain, RotateCcw, Check, X, ChevronRight, Speaker, Volume2 } from "lucide-react";

type ReviewItem = {
  id: string;
  type: "error" | "vocab" | "flashcard";
  front: string;
  back: string;
  source: string;
  sourceId: string;
  ease: number;
  interval: number;
  nextReview: number;
};

function sm2(quality: number, prevEase: number, prevInterval: number): { ease: number; interval: number } {
  let ease = prevEase + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (ease < 1.3) ease = 1.3;
  let interval: number;
  if (quality < 3) {
    interval = 1;
  } else if (prevInterval === 0) {
    interval = 1;
  } else if (prevInterval === 1) {
    interval = 6;
  } else {
    interval = Math.round(prevInterval * ease);
  }
  return { ease, interval };
}

export default function ReviewPage() {
  const errors = useErrors();
  const vocab = useVocabulary();
  const progress = useProgress();
  const [sessionItems, setSessionItems] = useState<ReviewItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [stats, setStats] = useState({ correct: 0, wrong: 0, total: 0 });
  const [schedule, setSchedule] = useState<Record<string, { ease: number; interval: number; nextReview: number }>>({});

  useEffect(() => {
    const stored = localStorage.getItem("englishcamp-review-schedule");
    if (stored) {
      try { setSchedule(JSON.parse(stored)); } catch {}
    }
  }, []);

  useEffect(() => {
    if (Object.keys(schedule).length > 0) {
      localStorage.setItem("englishcamp-review-schedule", JSON.stringify(schedule));
    }
  }, [schedule]);

  const startSession = useCallback(() => {
    const now = Date.now();
    const items: ReviewItem[] = [];

    const unreviewed = errors.getUnreviewed();
    for (const err of unreviewed.slice(0, 10)) {
      const key = `error-${err.timestamp}`;
      const s = schedule[key] || { ease: 2.5, interval: 0, nextReview: 0 };
      if (s.nextReview <= now) {
        items.push({
          id: key,
          type: "error",
          front: err.question,
          back: err.correctAnswer,
          source: err.source,
          sourceId: err.sourceId,
          ...s,
        });
      }
    }

    const allVocab = vocab.getAll();
    for (const [id, v] of allVocab.slice(0, 20)) {
      const key = `vocab-${id}`;
      const s = schedule[key] || { ease: 2.5, interval: 0, nextReview: 0 };
      if (s.nextReview <= now && v.mastery < 3) {
        items.push({
          id: key,
          type: "vocab",
          front: v.de,
          back: v.en,
          source: "vocabulary",
          sourceId: id,
          ...s,
        });
      }
    }

    if (items.length === 0) {
      setSessionComplete(true);
      return;
    }

    items.sort((a, b) => a.nextReview - b.nextReview);
    setSessionItems(items.slice(0, 20));
    setCurrentIndex(0);
    setShowAnswer(false);
    setSessionComplete(false);
    setStats({ correct: 0, wrong: 0, total: items.length });
  }, [errors, vocab, schedule]);

  useEffect(() => {
    if (sessionItems.length === 0 && !sessionComplete) {
      startSession();
    }
  }, []);

  const current = sessionItems[currentIndex];

  const handleAnswer = (quality: number) => {
    if (!current) return;
    const { ease, interval } = sm2(quality, current.ease, current.interval);
    const nextReview = Date.now() + interval * 24 * 60 * 60 * 1000;

    setSchedule((s) => ({
      ...s,
      [current.id]: { ease, interval, nextReview },
    }));

    if (current.type === "vocab") {
      const mastery = quality >= 4 ? Math.min(3, (vocab.getWord(current.sourceId)?.mastery ?? 0) + 1) as 0|1|2|3 : 0;
      vocab.updateMastery(current.sourceId, mastery);
      if (quality >= 3) vocab.recordReview(current.sourceId);
    }

    setStats((s) => ({
      ...s,
      correct: s.correct + (quality >= 3 ? 1 : 0),
      wrong: s.wrong + (quality < 3 ? 1 : 0),
    }));

    if (currentIndex < sessionItems.length - 1) {
      setCurrentIndex((i) => i + 1);
      setShowAnswer(false);
    } else {
      setSessionComplete(true);
    }
  };

  const progressPct = sessionItems.length > 0
    ? Math.round((currentIndex / sessionItems.length) * 100)
    : 0;

  if (sessionComplete) {
    return (
      <PageWrapper>
        <div className="text-center py-16 space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-[var(--color-success)] text-white flex items-center justify-center mx-auto">
            <Brain className="w-10 h-10 text-[var(--color-success)]" />
          </div>
          <h2 className="text-2xl font-display font-extrabold text-[var(--color-text-primary)]">Session Complete!</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xs mx-auto">
            <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border-2 border-[var(--color-border-default)]">
              <p className="text-2xl font-display font-extrabold text-[var(--color-success)]">{stats.correct}</p>
              <p className="text-[10px] text-[var(--color-text-disabled)]">Correct</p>
            </div>
            <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border-2 border-[var(--color-border-default)]">
              <p className="text-2xl font-display font-extrabold text-[var(--color-error)]">{stats.wrong}</p>
              <p className="text-[10px] text-[var(--color-text-disabled)]">Wrong</p>
            </div>
            <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border-2 border-[var(--color-border-default)]">
              <p className="text-2xl font-display font-extrabold text-[var(--color-text-secondary)]">{stats.total}</p>
              <p className="text-[10px] text-[var(--color-text-disabled)]">Total</p>
            </div>
          </div>
          {stats.total > 0 && (
            <p className="text-lg font-semibold text-[var(--color-text-secondary)]">
              {Math.round((stats.correct / stats.total) * 100)}% accuracy
            </p>
          )}
          <button onClick={startSession} className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)] font-semibold hover:bg-brand-600 transition-colors">
            <RotateCcw className="w-4 h-4" /> Start New Session
          </button>
        </div>
      </PageWrapper>
    );
  }

  if (sessionItems.length === 0) {
    return (
      <PageWrapper>
        <div className="text-center py-16 space-y-6">
          <div className="w-20 h-20 rounded-3xl bg-[var(--color-surface-alt)] flex items-center justify-center mx-auto">
            <Brain className="w-10 h-10 text-[var(--color-text-disabled)]" />
          </div>
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Nothing to Review</h2>
          <p className="text-sm text-[var(--color-text-secondary)]">Complete lessons, exercises, and add vocabulary to build your review queue.</p>
          <button onClick={startSession} className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)] font-semibold hover:bg-brand-600 transition-colors">
            <RotateCcw className="w-4 h-4" /> Check Again
          </button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Spaced Repetition</h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">Review {currentIndex + 1} of {sessionItems.length}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="info">{current.type}</Badge>
            <span className="text-xs text-[var(--color-text-disabled)]">
              Interval: {current.interval}d | Ease: {current.ease.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="w-full h-2 rounded-full bg-[var(--color-surface-alt)] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-[var(--color-primary)]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-8 shadow-sm border-2 border-[var(--color-border-default)]"
          >
            <div className="text-center space-y-6">
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-disabled)] uppercase tracking-wider mb-2">
                  {current.type === "error" ? "Question" : "Word"}
                </p>
                <p className="text-xl font-bold text-[var(--color-text-primary)] leading-relaxed">{current.front}</p>
              </div>

              {current.type === "vocab" && (
                <button onClick={() => speak(current.front)} className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-disabled)] hover:text-[var(--color-primary)] transition-colors">
                  <Volume2 className="w-4 h-4" /> Listen
                </button>
              )}

              {!showAnswer ? (
                <button
                  onClick={() => setShowAnswer(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)] font-display font-extrabold hover:bg-[var(--color-primary-dark)] transition-all active:translate-y-0.5" style={{ boxShadow: "0 4px 0 var(--color-primary-dark)" }}
                >
                  Show Answer <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)] p-4">
                    <p className="text-xs font-semibold text-[var(--color-text-disabled)] uppercase tracking-wider mb-1">
                      {current.type === "error" ? "Correct Answer" : "English"}
                    </p>
                    <p className="text-lg font-semibold text-[var(--color-success)]">{current.back}</p>
                  </div>

                  {current.type === "vocab" && (
                    <button onClick={() => speak(current.back, "en-US")} className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-disabled)] hover:text-[var(--color-primary)] transition-colors">
                      <Volume2 className="w-4 h-4" /> Listen (English)
                    </button>
                  )}

                  <p className="text-xs font-semibold text-[var(--color-text-disabled)] uppercase tracking-wider">How well did you know this?</p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[
                      { q: 1, label: "Forgot", emoji: "😵", color: "red" },
                      { q: 2, label: "Hard", emoji: "😓", color: "orange" },
                      { q: 3, label: "Okay", emoji: "😐", color: "amber" },
                      { q: 4, label: "Easy", emoji: "😊", color: "emerald" },
                      { q: 5, label: "Perfect", emoji: "🎉", color: "brand" },
                    ].map((btn) => (
                      <button
                        key={btn.q}
                        onClick={() => handleAnswer(btn.q)}
                        className={`px-4 py-2 rounded-[var(--radius-lg)] text-sm font-semibold transition-all hover:scale-105 ${
                          btn.color === "red" ? "bg-[var(--color-error)] text-white text-red-700 hover:bg-[var(--color-error)] text-white" :
                          btn.color === "orange" ? "bg-[var(--color-warning)] text-white hover:bg-orange-100" :
                          btn.color === "amber" ? "bg-[var(--color-warning)] text-white hover:bg-amber-100" :
                          btn.color === "emerald" ? "bg-[var(--color-success)] text-white hover:bg-[var(--color-success)] text-white" :
                          "bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] hover:bg-[var(--color-primary)]"
                        }`}
                      >
                        {btn.emoji} {btn.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between text-xs text-[var(--color-text-disabled)]">
          <span>Correct: {stats.correct} | Wrong: {stats.wrong}</span>
          <button onClick={startSession} className="flex items-center gap-1 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
            <RotateCcw className="w-3 h-3" /> Restart
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}

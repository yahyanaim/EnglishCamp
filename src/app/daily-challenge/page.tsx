"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useDailyChallenge } from "@/store/useDailyChallenge";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import { NounGenderTrainer } from "@/components/learn/NounGenderTrainer";
import { ConjugationTrainer } from "@/components/learn/ConjugationTrainer";
import { SentenceBuilder } from "@/components/learn/SentenceBuilder";
import { quizQuestions } from "@/data/quizzes";
import { exercises } from "@/data/exercises";
import { Button } from "@/components/ui/Button";
import { Zap, RefreshCw } from "lucide-react";

type Phase = "idle" | "playing" | "done";

export default function DailyChallengePage() {
  const { completeExercise } = useProgress();
  const { isTodayDone, setCompleted } = useDailyChallenge();
  const { addError } = useErrors();

  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [xpEarned, setXpEarned] = useState(0);
  const [results, setResults] = useState<{ id: string; correct: boolean }[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [answerCorrect, setAnswerCorrect] = useState(false);

  const dailyQuestions = quizQuestions.sort(() => Math.random() - 0.5).slice(0, 5);

  useEffect(() => {
    if (isTodayDone()) setPhase("done");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleAnswer(choice: number) {
    if (answered) return;
    const q = dailyQuestions[currentQ];
    if (!q) return;
    const correct = choice === q.correct;
    setSelected(choice);
    setAnswered(true);
    setAnswerCorrect(correct);
    setTotal((t) => t + 1);
    setResults((r) => [...r, { id: q.id, correct }]);
    if (correct) {
      setScore((s) => s + 1);
      setXpEarned((x) => x + q.xpReward + 5);
      playCorrect();
    } else {
      playWrong();
      addError({
        question: q.question,
        userAnswer: q.options[choice],
        correctAnswer: q.options[q.correct],
        explanation: q.explain,
        source: "quiz",
        sourceId: q.id,
      });
    }
  }

  function next() {
    if (answerCorrect) completeExercise(`daily-${currentQ}`, 5);
    if (currentQ + 1 >= dailyQuestions.length) {
      setPhase("done");
      playXP();
      setCompleted(score, total, xpEarned, results.map((r) => ({ questionId: r.id, correct: r.correct })));
    } else {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setAnswered(false);
      setAnswerCorrect(false);
    }
  }

  const todayDone = isTodayDone();

  if (todayDone && phase === "done") {
    return (
      <div className="text-center py-12">
        <span className="text-7xl block mb-4">✅</span>
        <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)] mb-2">Today&apos;s Challenge Complete!</h1>
        <p className="text-[var(--color-text-secondary)] mb-2">You already completed today&apos;s challenge. Come back tomorrow!</p>
        <p className="text-lg font-semibold text-[var(--color-primary-dark)]">+{xpEarned} XP earned</p>
      </div>
    );
  }

  if (phase === "done") {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div className="text-center py-8">
        <span className="text-6xl block mb-4">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "💪"}</span>
        <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)] mb-1">Daily Challenge Done!</h1>
        <p className="text-lg font-semibold text-[var(--color-primary-dark)] mb-1">{score}/{total} correct ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mb-2">+{xpEarned} XP earned (includes {score} streak bonus!)</p>
        <div className="flex justify-center gap-2 mt-4">
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="w-4 h-4" /> New Challenge
          </Button>
        </div>
      </div>
    );
  }

  const q = dailyQuestions[currentQ];

  if (phase === "idle") {
    return (
      <div className="text-center py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-7xl block mb-4">⚡</span>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)] mb-2">Daily Challenge</h1>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Answer {dailyQuestions.length} mixed questions for bonus XP!
          </p>
          <Button onClick={() => setPhase("playing")} size="lg">
            <Zap className="w-5 h-5" /> Start Challenge
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-lg font-bold text-[var(--color-text-primary)]">Daily Challenge</h1>
          <p className="text-xs text-[var(--color-text-secondary)]">Question {currentQ + 1} of {dailyQuestions.length}</p>
        </div>
        <div className="flex items-center gap-1">
          <Zap className="w-4 h-4 text-[var(--color-warning)]" />
          <span className="text-sm font-bold text-[var(--color-warning)]">{xpEarned} XP</span>
        </div>
      </div>

      <div className="flex gap-1 mb-6">
        {dailyQuestions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i < currentQ ? "bg-[var(--color-primary)]" : i === currentQ ? "bg-[var(--color-primary)]" : "bg-[var(--color-border-default)]"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-6">{q?.question}</h2>

          <div className="space-y-2">
            {q?.options.map((option, i) => {
              let style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]";
              if (answered) {
                if (i === q.correct) style = "bg-[var(--color-success)] text-white border-emerald-300 ring-2 ring-[var(--color-success)]";
                else if (i === selected) style = "bg-[var(--color-error)] text-white border-[var(--color-error)]";
                else style = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] opacity-50";
              }
              return (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  disabled={answered}
                  className={`w-full text-left p-3 rounded-[var(--radius-lg)] border transition-all ${style}`}
                >
                  <span className="text-sm text-[var(--color-text-primary)]">{option}</span>
                </button>
              );
            })}
          </div>

          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <p className={`text-sm font-medium mb-1 ${answerCorrect ? "text-[var(--color-success)]" : "text-[var(--color-error)]"}`}>
                {answerCorrect ? "✓ Correct!" : "✗ Wrong"}
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] mb-3">{q?.explain}</p>
              <button
                onClick={next}
                className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all"
              >
                {currentQ + 1 >= dailyQuestions.length ? "See Results" : "Next →"}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

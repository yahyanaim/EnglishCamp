"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";
import { Lightbulb, BookOpen, CheckCircle, XCircle, ArrowRight, Sparkles } from "lucide-react";
import { ERRORS, type ErrorEntry } from "@/data/korrektur";

function getErrorTip(entry: ErrorEntry): { tip: string; suggest: string } {
  if (entry.category === "Prepositions") return { tip: "Each preposition has fixed usage. Memorise verb + preposition collocations: 'interested IN', 'good AT', 'afraid OF', 'married TO'.", suggest: "Practice with the Grammar Reference and exercises in Practice Hub." };
  if (entry.category === "Tenses") return { tip: "Past simple = finished time. Present perfect = past with present relevance. Conditional: if + present, will + infinitive.", suggest: "Review the Tenses guide and practice with tense exercises." };
  if (entry.category === "Subject-Verb Agreement") return { tip: "Third-person singular (he/she/it) takes -s: he goes, she does, it works. Uncountable nouns take singular verbs.", suggest: "Practice subject-verb agreement with verb conjugation exercises." };
  if (entry.category === "Conditionals") return { tip: "First conditional: if + present, will + infinitive. No 'will' in the if-clause.", suggest: "Review the Conditionals section in the Grammar reference." };
  if (entry.category === "Reported Speech") return { tip: "Past reporting verb → tense shifts back: present → past, past → past perfect, will → would.", suggest: "Review the Reported Speech (reported speech) lesson." };
  if (entry.category === "Relative Clauses") return { tip: "who → people, which → things, that → both. In defining relative clauses, 'that' is more common in speech.", suggest: "Practice relative clauses with the Relative Clauses trainer." };
  if (entry.category === "Vocabulary") return { tip: "Learn words in context. Pay attention to whether verbs take gerunds or infinitives.", suggest: "Review the vocabulary sections in each topic area." };
  if (entry.category === "Countable/Uncountable") return { tip: "Uncountable nouns (information, advice, furniture, news) take singular verbs and no 'a/an'. Use 'some' or 'a piece of'.", suggest: "Practice with uncountable noun exercises in the Grammar reference." };
  if (entry.category === "Negation") return { tip: "English does not allow double negatives. Use 'any-' words with negative verbs or 'no-' words with positive verbs.", suggest: "Review negation rules in the Grammar reference." };
  if (entry.category === "Word Order") return { tip: "English: adjective BEFORE noun. Adverbs of degree AFTER the object. Indirect questions have NO inversion.", suggest: "Review word order rules in the Word Order lesson." };
  if (entry.category === "Passive Voice") return { tip: "Passive: be (conjugated) + past participle (V3). The agent uses 'by' + person.", suggest: "Review the Passive Voice lesson and practice with the Passive Voice trainer." };
  if (entry.category === "Conjunctions") return { tip: "'Despite' is a preposition (followed by noun/gerund). 'Although/even though' are conjunctions (followed by clause).", suggest: "Review connector rules in the Conjunctions lesson." };
  if (entry.category === "Articles") return { tip: "Cities, countries, and general concepts take NO article. First mention → a/an. Specific → the.", suggest: "Review article usage in the Grammar reference." };
  return { tip: "Read the sentence carefully. Check the verb form, word order, prepositions, and subject-verb agreement.", suggest: "Review the Grammar Reference in Practice Hub for detailed rules." };
}

export function Proofreading() {
  const { completeExercise, addXP } = useProgress();
  const { addError } = useErrors();
  const [pool, setPool] = useState(() => [...ERRORS].sort(() => Math.random() - 0.5).slice(0, 10));
  const [index, setIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [userGuess, setUserGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);

  const current = pool[index];

  function handleCheck() {
    if (!current || revealed) return;
    setRevealed(true);
    setTotal((t) => t + 1);
    const correct = userGuess.trim().toLowerCase() === current.correct.toLowerCase();
    setIsCorrect(correct);
    if (correct) {
      setScore((s) => s + 1);
      playCorrect();
      completeExercise(`korrektur-${current.id}`, 10);
    } else {
      playWrong();
      addError({
        question: `Error correction: "${current.incorrect}"`,
        userAnswer: userGuess.trim(),
        correctAnswer: current.correct,
        explanation: current.explanation,
        source: "exercise",
        sourceId: `korrektur-${current.id}`,
      });
    }
  }

  function next() {
    if (index + 1 >= pool.length) {
      const xp = Math.round((score / total) * 50);
      addXP(xp);
      setDone(true);
    } else {
      setIndex((i) => i + 1);
      setShowHint(false);
      setRevealed(false);
      setUserGuess("");
      setIsCorrect(false);
    }
  }

  function restart() {
    const newPool = [...ERRORS].sort(() => Math.random() - 0.5).slice(0, 10);
    setPool(newPool);
    setIndex(0);
    setShowHint(false);
    setRevealed(false);
    setUserGuess("");
    setIsCorrect(false);
    setScore(0);
    setTotal(0);
    setDone(false);
  }

  if (done) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <PracticeCard data-practice-surface="result" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 sm:p-6 text-center shadow-[var(--shadow-1)]">
        <LearningArt name="Sparkles" className="w-14 h-14 text-[var(--color-primary)] mx-auto mb-4" />
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Error Correction Done!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-text-link)]">{score}/{total} ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-sm mx-auto">
          {pct >= 80 ? "Excellent! You have a sharp eye for errors." : pct >= 50 ? "Good start! Keep practising." : "Keep going! Error correction gets easier with practice."}
        </p>
        <PracticeButton onClick={restart} className="mt-4 text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
          Play Again ↺
        </PracticeButton>
      </PracticeCard>
    );
  }

  if (!current) return null;

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-[var(--shadow-1)] max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--color-text-error)] uppercase tracking-wider">Error Correction</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{index + 1}/{pool.length}</span>
      </div>

      <div className="flex gap-1.5 mb-6">
        {pool.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-[var(--radius-pill)] transition-colors ${i < index ? "bg-emerald-400" : i === index ? "bg-red-400" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div>
            <p className="text-xs text-[var(--color-text-secondary)] mb-1">Find and fix the error in this sentence:</p>
            <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)] font-mono bg-[var(--color-error-bg)] text-[var(--color-text-error)] rounded-[var(--radius-lg)] px-4 py-3 ring-1 ring-[var(--color-error)]">
              {current.incorrect}
            </p>
          </div>

          <div className="space-y-3">
            <textarea
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              disabled={revealed}
              placeholder="Type the corrected sentence..."
              rows={2}
              className="w-full px-4 py-3 rounded-[var(--radius-lg)] text-sm border border-[var(--color-border-default)] focus:ring-2 focus:ring-brand-500 outline-none resize-none bg-[var(--color-surface)]"
            />

            <div className="flex items-center gap-2">
              {!revealed && (
                <>
                  <PracticeButton
                    onClick={handleCheck}
                    disabled={!userGuess.trim()}
                    className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-[var(--color-on-brand)] rounded-[var(--radius-lg)] font-semibold text-sm hover:bg-[var(--color-primary-hover)] disabled:opacity-50 transition-all"
                  >
                    <CheckCircle className="w-4 h-4" /> Check
                  </PracticeButton>
                  <PracticeButton
                    onClick={() => setShowHint(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] rounded-[var(--radius-lg)] font-medium text-sm hover:bg-amber-100 border border-[var(--color-warning)] transition-all"
                  >
                    <LearningArt name="Lightbulb" size={16} className="w-4 h-4" /> Hint
                  </PracticeButton>
                </>
              )}
            </div>

            {showHint && !revealed && (
              <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-2 p-3 rounded-[var(--radius-lg)] bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] ring-1 ring-[var(--color-warning)]">
                <LearningArt name="Lightbulb" size={16} className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="text-sm">{current.hints[0]}</p>
              </motion.div>
            )}
          </div>

          {revealed && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
              {isCorrect ? (
                <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-success-bg)] text-[var(--color-text-success)] ring-1 ring-[var(--color-success)] text-[var(--color-text-success)]">
                  <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Correct! +10 XP</p>
                    <p className="text-sm mt-1">{current.explanation}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-error-bg)] text-[var(--color-text-error)] ring-1 ring-[var(--color-error)] text-[var(--color-text-error)]">
                    <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Not quite</p>
                      <p className="text-sm mt-1">
                        Your answer: <span className="line-through text-[var(--color-text-error)]">{userGuess.trim()}</span>
                      </p>
                      <p className="text-sm">
                        Correct: <span className="font-mono font-bold text-[var(--color-text-success)]">{current.correct}</span>
                      </p>
                      <p className="text-sm mt-2 text-[var(--color-text-secondary)]">{current.explanation}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] ring-1 ring-[var(--color-warning)]">
                    <LearningArt name="Lightbulb" size={20} className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-text-warning)]" />
                    <div>
                      <p className="font-semibold text-sm">Tip</p>
                      <p className="text-sm mt-1">{getErrorTip(current).tip}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info-bg)] text-[var(--color-text-info)] ring-1 ring-[var(--color-info)]">
                    <LearningArt name="BookOpen" size={20} className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-text-info)]" />
                    <div>
                      <p className="font-semibold text-sm">Suggestion</p>
                      <p className="text-sm mt-1">{getErrorTip(current).suggest}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <PracticeButton
                  onClick={next}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-[var(--color-on-brand)] rounded-[var(--radius-lg)] font-semibold text-sm hover:bg-[var(--color-primary-hover)] transition-all"
                >
                  {index + 1 >= pool.length ? "See Results" : "Next"} <ArrowRight className="w-4 h-4" />
                </PracticeButton>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </PracticeCard>
  );
}

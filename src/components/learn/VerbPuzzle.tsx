"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import { VERBS, type VerbConjugation } from "@/data/conjugaise";
import { Lightbulb, BookOpen, CheckCircle2, XCircle, RefreshCw } from "lucide-react";

type Tense = "present" | "past";

const PRONOUNS = ["I", "you", "he/she/it", "we", "you (pl)", "they"] as const;

const TENSE_LABELS: Record<Tense, string> = { present: "Present", past: "Past" };
const TENSE_EN: Record<Tense, string> = { present: "Present Tense", past: "Past Tense" };

interface PuzzleCell {
  pronounIdx: number;
  correct: string;
}

function generatePuzzle(): { verb: VerbConjugation; tense: Tense; cells: PuzzleCell[] } {
  const verb = VERBS[Math.floor(Math.random() * VERBS.length)];
  const tense: Tense = Math.random() < 0.6 ? "present" : "past";
  const forms = tense === "present" ? verb.present : verb.past;
  const cellCount = 3 + Math.floor(Math.random() * 2);
  const indices = Array.from({ length: 6 }, (_, i) => i).sort(() => Math.random() - 0.5).slice(0, cellCount);
  const cells = indices.map((i) => ({
    pronounIdx: i,
    correct: Array.isArray(forms) ? (forms[i] || "") : "",
  }));
  return { verb, tense, cells };
}

function getVerbTip(verb: VerbConjugation, tense: Tense): { tip: string; suggest: string } {
  const v = verb.infinitive;
  if (v === "be" || v === "have" || v === "do") {
    return { tip: `"${v}" is an IRREGULAR verb. Its forms don't follow normal patterns. Memorize all forms for both tenses.`, suggest: "Practice with the Conjugation trainer and review the Irregular Verbs lesson." };
  }
  if (tense === "past") {
    return { tip: `Past tense: regular verbs add -ed (work → worked). Irregular verbs change form (go → went, eat → ate).`, suggest: "Practice past tense with the Past Tense trainer in Practice Hub." };
  }
  return { tip: `Present tense: I/you/we/they use the base form. He/she/it adds -s (or -es). Some verbs are irregular (be → am/is/are).`, suggest: "Practice regular and irregular verbs with the Conjugation trainer." };
}

export function VerbPuzzle() {
  const { completeExercise, addXP } = useProgress();
  const [round] = useState(() => Array.from({ length: 8 }, () => generatePuzzle()));
  const [index, setIndex] = useState(0);
  const [inputs, setInputs] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [done, setDone] = useState(false);

  const current = round[index];

  function handleInputChange(pronounIdx: number, value: string) {
    if (revealed) return;
    setInputs((prev) => ({ ...prev, [pronounIdx]: value }));
  }

  function handleCheck() {
    if (!current || revealed) return;
    setRevealed(true);
    const res: Record<number, boolean> = {};
    let correctCount = 0;
    for (const cell of current.cells) {
      const user = (inputs[cell.pronounIdx] || "").trim().toLowerCase();
      const ok = user === cell.correct.toLowerCase();
      res[cell.pronounIdx] = ok;
      if (ok) correctCount++;
    }
    setResults(res);
    setTotal((t) => t + current.cells.length);
    setScore((s) => s + correctCount);
    if (correctCount === current.cells.length) {
      playCorrect();
      completeExercise(`verbpuzzle-${current.verb.infinitive}-${current.tense}`, 15);
    } else {
      playWrong();
    }
  }

  function next() {
    if (index + 1 >= round.length) {
      addXP(Math.round((score / Math.max(total, 1)) * 40));
      setDone(true);
    } else {
      setIndex((i) => i + 1);
      setInputs({});
      setRevealed(false);
      setResults({});
    }
  }

  function restart() {
    setIndex(0);
    setInputs({});
    setRevealed(false);
    setResults({});
    setScore(0);
    setTotal(0);
    setDone(false);
  }

  if (done) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <PracticeCard data-practice-surface="result" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 sm:p-6 text-center shadow-[var(--shadow-1)]">
        <LearningArt name="CheckCircle2" className="w-14 h-14 text-[var(--color-text-success)] mx-auto mb-4" />
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Verb-Puzzle Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-text-link)]">{score}/{total} ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">{pct >= 80 ? "Great conjugation skills!" : pct >= 50 ? "Getting there! Keep practicing." : "Practice more to master English verb forms."}</p>
        <PracticeButton onClick={restart} className="mt-4 text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
          Play Again \u21ba
        </PracticeButton>
      </PracticeCard>
    );
  }

  if (!current) return null;

  const forms: string[] = current.tense === "present" ? current.verb.present : [current.verb.past];

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-[var(--shadow-1)] max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[#9B59B6] uppercase tracking-wider">Verb-Puzzle</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{index + 1}/{round.length}</span>
      </div>

      <div className="flex gap-1.5 mb-6">
        {round.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-[var(--radius-pill)] transition-colors ${i < index ? "bg-emerald-400" : i === index ? "bg-[#9B59B6]" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={`${current.verb.infinitive}-${current.tense}-${index}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="text-center mb-4">
            <span className="text-2xl font-display font-extrabold text-[var(--color-text-primary)]">{current.verb.infinitive}</span>
            <span className="text-sm text-[var(--color-text-secondary)] ml-2">({current.verb.english})</span>
            <div className="inline-flex items-center gap-2 mt-2">
              <span className="text-[10px] font-semibold bg-[var(--color-info-bg)] text-violet-700 px-2.5 py-1 rounded-[var(--radius-pill)]">{TENSE_LABELS[current.tense]}</span>
              <span className="text-[10px] font-semibold bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] px-2.5 py-1 rounded-[var(--radius-pill)]">{current.verb.thirdPerson}</span>
            </div>
          </div>

          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] overflow-hidden">
            <div className="grid grid-cols-3 gap-px bg-[var(--color-border-default)]">
              <div className="bg-[var(--color-surface-alt)] px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] text-center">Pronoun</div>
              <div className="bg-[var(--color-surface-alt)] px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] text-center">{TENSE_EN[current.tense]}</div>
              <div className="bg-[var(--color-surface-alt)] px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-secondary)] text-center">English</div>

              {PRONOUNS.map((pronoun, pi) => {
                const cell = current.cells.find((c) => c.pronounIdx === pi);
                const isBlank = !!cell;
                const isCorrect = results[pi];


                let rowClass = "bg-[var(--color-surface)]";
                if (revealed && isBlank) {
                  rowClass = isCorrect ? "bg-[var(--color-success-bg)] text-[var(--color-text-success)]" : "bg-[var(--color-error-bg)] text-[var(--color-text-error)]";
                }

                return (
                  <div key={pi} className={`contents ${rowClass}`}>
                    <div className="px-3 py-2.5 text-sm font-semibold text-[var(--color-text-primary)]">{pronoun}</div>
                    <div className="px-3 py-2.5">
                      {isBlank ? (
                        <input
                          type="text"
                          value={inputs[pi] || ""}
                          onChange={(e) => handleInputChange(pi, e.target.value)}
                          disabled={revealed}
                          placeholder="..."
                          className={`w-full px-2 py-1 rounded-[var(--radius-md)] text-sm font-mono text-center border outline-none transition-all ${
                            revealed
                              ? isCorrect
                                ? "border-[var(--color-success)] bg-[var(--color-success-bg)] text-[var(--color-text-success)] "
                                : "border-red-300 bg-[var(--color-error-bg)] text-[var(--color-text-error)] "
                              : "border-[var(--color-border-default)] bg-[var(--color-surface)] text-[var(--color-text-primary)] focus:border-violet-400"
                          }`}
                        />
                      ) : (
                        <span className="text-sm font-mono text-[var(--color-text-secondary)]">{forms[pi]}</span>
                      )}
                    </div>
                    <div className="px-3 py-2.5 text-sm text-[var(--color-text-secondary)] italic">
                      {revealed && isBlank && !isCorrect && (
                        <span className="text-[var(--color-text-success)] font-medium">{forms[pi]}</span>
                      )}
                      {revealed && isBlank && isCorrect && <CheckCircle2 className="w-4 h-4 text-[var(--color-text-success)]" />}
                      {(!revealed || !isBlank) && <span className="text-xs">({current.verb.english})</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {!revealed ? (
            <div className="camp-quiz-actions flex justify-center">
              <PracticeButton
                onClick={handleCheck}
                disabled={current.cells.some((c) => !inputs[c.pronounIdx]?.trim())}
                className="flex items-center gap-2 px-6 py-2.5 bg-violet-600 text-white rounded-[var(--radius-lg)] font-semibold text-sm hover:bg-violet-700 disabled:opacity-50 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" /> Check Answers
              </PracticeButton>
            </div>
          ) : (
            <div className="space-y-3">
              {current.cells.filter((c) => !results[c.pronounIdx]).length > 0 && (
                <>
                  <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] ring-1 ring-[var(--color-warning)]">
                    <LearningArt name="Lightbulb" size={20} className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-text-warning)]" />
                    <div>
                      <p className="font-semibold text-sm">Astuce (Tip)</p>
                      <p className="text-sm mt-1">{getVerbTip(current.verb, current.tense).tip}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info-bg)] text-[var(--color-text-info)] ring-1 ring-[var(--color-info)]">
                    <LearningArt name="BookOpen" size={20} className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-text-info)]" />
                    <div>
                      <p className="font-semibold text-sm">Suggestion</p>
                      <p className="text-sm mt-1">{getVerbTip(current.verb, current.tense).suggest}</p>
                    </div>
                  </div>
                </>
              )}
              <div className="flex justify-end">
                <PracticeButton
                  onClick={next}
                  className="flex items-center gap-2 px-6 py-2.5 bg-violet-600 text-white rounded-[var(--radius-lg)] font-semibold text-sm hover:bg-violet-700 transition-all"
                >
                  {index + 1 >= round.length ? "See Results" : "Next"} \u2192
                </PracticeButton>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </PracticeCard>
  );
}

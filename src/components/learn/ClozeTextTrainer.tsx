"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { SelectField } from "@/components/ui/shadcn/select-field";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";
import { Lightbulb, BookOpen } from "lucide-react";

import { CLOZE_PASSAGES as ITEMS, type ClozeItem } from "@/data/cloze-passages";

function getClozeTip(blank: ClozeItem["blanks"][0]): { tip: string; suggest: string } {
  const a = blank.answer.toLowerCase();
  if (a.includes("have") || a.includes("has")) return { tip: "Present Perfect = have/has + past participle. Regular: add -ed. Irregular: change form (go → gone, eat → eaten).", suggest: "Practice with the Present Perfect tense lesson." };
  if (a.includes("was") || a.includes("were")) return { tip: "Simple Past of 'to be': I/he/she/it was, you/we/they were. Used for past states and descriptions.", suggest: "Review the Simple Past of 'to be' in the conjugation trainer." };
  if (a.includes("went") || a.includes("ate") || a.includes("saw") || a.includes("took")) return { tip: "Irregular past tense verbs don't follow the -ed pattern. Memorize common irregulars: go→went, eat→ate, see→saw, take→took.", suggest: "Practice irregular verbs with the Past Tense trainer in Practice Hub." };
  if (a.includes("ing")) return { tip: "Present Continuous = am/is/are + verb-ing. Use for actions happening now or temporary situations.", suggest: "Review the Present Continuous tense lesson." };
  if (a.includes("will")) return { tip: "Future with 'will': use for spontaneous decisions, promises, and predictions. Structure: will + base verb.", suggest: "Practice Future tense in the Tenses lesson." };
  if (a.includes("to ")) return { tip: "Infinitives with 'to': use after certain verbs (want, need, hope, plan) and adjectives (easy, difficult, important).", suggest: "Review the Infinitive usage lesson." };
  if (a.endsWith("s") && !a.endsWith("ing")) return { tip: "Simple Present: he/she/it takes -s. I/you/we/they take the base form. Use for habits, facts, and routines.", suggest: "Review Simple Present conjugation." };
  return { tip: `"${blank.answer}" fits here based on the context. Pay attention to subject-verb agreement and tense.`, suggest: "Try more Cloze Text exercises and review the grammar lesson for this topic." };
}


export function ClozeTextTrainer() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();
  const [pool] = useState(() => [...ITEMS].sort(() => Math.random() - 0.5).slice(0, 5));
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [roundScore, setRoundScore] = useState(0);
  const [done, setDone] = useState(false);

  const current = pool[index];
  if (!current && !done) return null;

  function handleSelect(blankIndex: number, value: string) {
    if (showResults) return;
    setAnswers((a) => ({ ...a, [blankIndex]: value }));
  }

  function handleCheck() {
    let correct = 0;
    for (const b of current.blanks) {
      if (answers[b.index] === b.answer) correct++;
      else {
        playWrong();
        addError({ question: `Cloze: "${current.title}" word ${b.index + 1}`, userAnswer: answers[b.index] || "", correctAnswer: b.answer, explanation: `The correct word was "${b.answer}"`, source: "cloze", sourceId: `cloze-${index}-${b.index}` });
      }
    }
    setRoundScore(correct);
    setScore(s => s + correct);
    if (correct === current.blanks.length) { playCorrect(); completeExercise(`cloze-${index}`, 10 * correct); }
    setShowResults(true);
  }

  function handleNext() {
    if (index + 1 >= pool.length) { setDone(true); return; }
    setIndex((i) => i + 1); setAnswers({}); setShowResults(false);
  }

  function handleRestart() { setIndex(0); setAnswers({}); setShowResults(false); setScore(0); setDone(false); }

  if (done) {
    return (
      <div className="text-center py-8">
        <LearningArt name="📖" size={36} className=" block mb-3" />
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Cloze Reading Complete!</h3>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6">{score} / {pool.reduce((n,item)=>n+item.blanks.length,0)} gaps correct</p>
        <PracticeButton onClick={handleRestart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">Play Again <LearningArt name="🔄" size={16} /></PracticeButton>
      </div>
    );
  }

  const allFilled = current.blanks.every((b) => answers[b.index]);

  return (
    <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--color-text-success)] uppercase tracking-wider">Cloze Text</span>
        <span className="text-xs text-[var(--color-text-secondary)]">{index + 1}/{pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={index} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
          <div className="flex items-center gap-2 mb-4">
            <h4 className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">{current.title}</h4>
            <span className="text-xs text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-2 py-0.5 rounded-[var(--radius-pill)]">{current.en}</span>
          </div>
          <div className="bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)] p-5 border border-[var(--color-border-default)] leading-8 text-base text-[var(--color-text-primary)] mb-6">
            {current.text.map((word, i) => {
              const blank = current.blanks.find((b) => b.index === i);
              if (blank) {
                return (
                  <span key={i} className="inline-block mx-0.5">
                    <SelectField
                      value={answers[blank.index] || ""}
                      onValueChange={value => handleSelect(blank.index, value)}
                      className={`text-sm font-mono font-semibold px-2 py-0.5 rounded-[var(--radius-md)] border outline-none transition-all ${
                        showResults
                          ? answers[blank.index] === blank.answer ? "bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-[var(--color-success)]" : "bg-[var(--color-error-bg)] text-[var(--color-text-error)] border-[var(--color-error)]"
                          : "bg-[var(--color-surface)] border-[var(--color-border-default)] text-[var(--color-text-primary)] focus:border-emerald-400"
                      }`}
                    >
                      <option value="" disabled>___</option>
                      {blank.options.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </SelectField>
                  </span>
                );
              }
              return <span key={i}>{word} </span>;
            })}
          </div>

          {!showResults ? (
            <div className="text-center">
              <PracticeButton onClick={handleCheck} disabled={!allFilled} className={`text-sm font-medium px-6 py-2.5 rounded-[var(--radius-lg)] transition-all ${allFilled ? "bg-[var(--color-primary)] text-[var(--color-on-brand)] hover:bg-[var(--color-primary-hover)]" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] cursor-not-allowed"}`}>
                Check Answers
              </PracticeButton>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="text-center mb-4">
                <p className="text-sm font-medium text-[var(--color-text-secondary)] mb-3">{roundScore} / {current.blanks.length} correct</p>
              </div>

              <div className="space-y-3 mb-4">
                {current.blanks.filter((b) => answers[b.index] !== b.answer).map((b) => {
                  const ct = getClozeTip(b);
                  return (
                    <div key={b.index}>
                      <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] ring-1 ring-[var(--color-warning)]">
                        <LearningArt name="Lightbulb" size={20} className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-text-warning)]" />
                        <div>
                          <p className="font-semibold text-sm">Tip — Word {b.index + 1}</p>
                          <p className="text-sm mt-1">{ct.tip}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info-bg)] text-[var(--color-text-info)] ring-1 ring-[var(--color-info)] mt-2">
                        <LearningArt name="BookOpen" size={20} className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-text-info)]" />
                        <div>
                          <p className="font-semibold text-sm">Suggestion</p>
                          <p className="text-sm mt-1">{ct.suggest}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center">
                <PracticeButton onClick={handleNext} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
                  {index + 1 >= pool.length ? "See Results" : "Next Text →"}
                </PracticeButton>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center gap-1 mt-4">
        {pool.map((_, i) => (
          <div key={i} className={`w-2 h-2 rounded-[var(--radius-pill)] ${i < index ? "bg-emerald-300" : i === index ? "bg-emerald-500" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>
    </PracticeCard>
  );
}

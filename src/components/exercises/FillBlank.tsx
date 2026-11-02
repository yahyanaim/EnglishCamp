"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { useDrillAttempt } from "@/hooks/useDrillAttempt";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { Button } from "@/components/ui/Button";
import { normalizeAnswer } from "@/lib/courseActivity";
import { playCorrect, playWrong } from "@/lib/audio";
import { Lightbulb, CheckCircle, XCircle, BookOpen, ArrowRight } from "lucide-react";

export interface FillBlankData {
  sentence: string;
  answer: string;
  acceptedAnswers?: string[];
  explanation?: string;
  hint?: string;
  xpReward: number;
  id: string;
}

function getExampleSentence(answer: string, sentence: string): string {
  const filled = sentence.replace(/_{3,}/, `"${answer}"`);
  return filled;
}

export function FillBlank({ data }: { data: FillBlankData }) {
  const { state: { input, checked, correct, award }, patch } = useDrillAttempt(data.id, data, { input: "", checked: false, correct: false, award: 0 });
  const setInput = (input: string) => patch({ input });
  const setChecked = (checked: boolean) => patch({ checked });
  const setCorrect = (correct: boolean) => patch({ correct });
  const { completeExercise } = useProgress();
  const { addError } = useErrors();

  const parts = data.sentence.split(/_{3,}/);

  function check() {
    const isCorrect = (data.acceptedAnswers ?? [data.answer]).some(answer => normalizeAnswer(input) === normalizeAnswer(answer));
    setCorrect(isCorrect);
    setChecked(true);
    if (isCorrect) {
      playCorrect();
      patch({ award: completeExercise(data.id, data.xpReward) });
    } else {
      playWrong();
      addError({
        question: `Fill blank: "${data.sentence}"`,
        userAnswer: input.trim(),
        correctAnswer: data.answer,
        explanation: data.hint ?? `The correct answer is "${data.answer}"`,
        source: "exercise",
        sourceId: data.id,
      });
    }
  }

  const grammarNote = data.explanation ?? data.hint ?? null;
  const exampleSentence = getExampleSentence(data.answer, data.sentence);

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 border-2 border-[var(--color-border-default)] space-y-4" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex flex-wrap items-center gap-2 font-body text-lg text-[var(--color-text-primary)]">
        <span>{parts[0]}</span>
        <input aria-label={`Complete the blank: ${data.sentence}`} type="text" value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !checked && check()} disabled={checked}
          placeholder="___"
          className={`inline-block w-40 px-4 py-2 rounded-[var(--radius-md)] border-2 font-mono text-center bg-[var(--color-surface)] outline-none transition-all ${
            checked ? (correct ? "border-[var(--color-success)] text-[var(--color-text-success)] bg-[var(--color-success-bg)]" : "border-[var(--color-error)] text-[var(--color-text-error)] bg-[var(--color-error-bg)]") : "border-[var(--color-border-default)] text-[var(--color-text-primary)] focus:border-[var(--color-border-focus)]"
          }`}
          style={!checked ? { boxShadow: "0 2px 0 var(--color-border-default)" } : correct ? { boxShadow: "0 2px 0 var(--color-success)" } : { boxShadow: "0 2px 0 var(--color-error)" }}
          onFocus={(e) => { if (!checked) { e.target.style.borderColor = "var(--color-border-focus)"; e.target.style.boxShadow = "0 2px 0 var(--color-border-focus)"; }}}
          onBlur={(e) => { if (!checked) { e.target.style.borderColor = "var(--color-border-default)"; e.target.style.boxShadow = "0 2px 0 var(--color-border-default)"; }}}
        />
        <span>{parts[1]}</span>
      </div>

      {data.hint && !checked && (
        <div className="flex items-start gap-2 font-body text-sm text-[var(--color-text-secondary)]">
          <LearningArt name="Lightbulb" size={16} className="w-4 h-4 mt-0.5 shrink-0 text-[var(--color-warning)]" />
          <span>{data.hint}</span>
        </div>
      )}

      <AnimatePresence>
        {checked && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            {correct ? (
              <div className="flex items-center gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-2 border-[var(--color-success)]" style={{ boxShadow: "0 2px 0 var(--color-success)" }}>
                <CheckCircle className="w-5 h-5 shrink-0 text-[var(--color-success)]" />
                <div>
                  <p className="font-display font-extrabold">Correct! {award > 0 ? `+${award} XP earned` : "Previously credited · no additional XP"}</p>
                  <p className="font-body text-sm text-[var(--color-text-primary)] mt-0.5">{'\u201C'}{data.answer}{'\u201D'} is right</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-error-bg)] text-[var(--color-text-error)] border-2 border-[var(--color-error)]" style={{ boxShadow: "0 2px 0 var(--color-error)" }}>
                  <XCircle className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-text-error)]" />
                  <div>
                    <p className="font-display font-extrabold">Not quite</p>
                    <p className="font-body text-sm mt-1">
                      Your answer: <span className="line-through text-[var(--color-text-error)]">{'\u201C'}{input.trim()}{'\u201D'}</span>
                    </p>
                    <p className="font-body text-sm">
                      Correct answer: <span className="font-display font-bold text-[var(--color-text-success)]">{'\u201C'}{data.answer}{'\u201D'}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info-bg)] text-[var(--color-text-info)] border-2 border-[var(--color-info)]" style={{ boxShadow: "0 2px 0 var(--color-info)" }}>
                  <ArrowRight className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-info)]" />
                  <div>
                    <p className="font-display font-extrabold text-sm">In context</p>
                    <p className="font-body text-sm mt-1 font-mono">&ldquo;{exampleSentence}&rdquo;</p>
                  </div>
                </div>

                {grammarNote && (
                  <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] border-2 border-[var(--color-warning)]" style={{ boxShadow: "0 2px 0 var(--color-warning)" }}>
                    <LearningArt name="BookOpen" size={20} className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-warning)]" />
                    <div>
                      <p className="font-display font-extrabold text-sm">Grammar Tip</p>
                      <p className="font-body text-sm mt-1">{grammarNote}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!checked && <Button onClick={check} size="sm">Check ✓</Button>}
    </div>
  );
}

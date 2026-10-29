"use client";
import { useDrillAttempt } from "@/hooks/useDrillAttempt";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { Button } from "@/components/ui/Button";
import { playCorrect, playWrong } from "@/lib/audio";
import { CheckCircle, XCircle, BookOpen } from "lucide-react";

export interface MultipleChoiceData {
  question: string;
  options: string[];
  correct: number;
  explanation?: string;
  xpReward: number;
  id: string;
}

export function MultipleChoice({ data }: { data: MultipleChoiceData }) {
  const { state: { selected, checked, award }, patch, loaded } = useDrillAttempt(data.id, data, { selected: null as number | null, checked: false, award: 0 });
  const setSelected = (selected: number) => patch({ selected });
  const setChecked = (checked: boolean) => patch({ checked });
  const { completeExercise } = useProgress();
  const { addError } = useErrors();

  const isCorrect = checked && selected === data.correct;

  function handleSelect(index: number) {
    if (checked) return;
    setSelected(index);
  }

  function check() {
    if (selected === null) return;
    const correct = selected === data.correct;
    setChecked(true);
    if (correct) {
      playCorrect();
      patch({ award: completeExercise(data.id, data.xpReward) });
    } else {
      playWrong();
      addError({
        question: data.question,
        userAnswer: data.options[selected],
        correctAnswer: data.options[data.correct],
        explanation: data.explanation ?? `The correct answer is: "${data.options[data.correct]}"`,
        source: "exercise",
        sourceId: data.id,
      });
    }
  }

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 border-2 border-[var(--color-border-default)] space-y-4" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-start gap-3">
        <span className="text-xl mt-0.5">🤔</span>
        <p className="font-body text-base font-medium text-[var(--color-text-primary)]">{data.question}</p>
      </div>

      <div className="space-y-2">
        {data.options.map((option, i) => {
          let stateClass = "bg-[var(--color-surface)] border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-surface-alt)] cursor-pointer";
          if (checked) {
            if (i === data.correct) {
              stateClass = "bg-[var(--color-success-bg)] border-[var(--color-success)] text-[var(--color-text-success)]";
            } else if (i === selected && i !== data.correct) {
              stateClass = "bg-[var(--color-error-bg)] border-[var(--color-error)] text-[var(--color-text-error)]";
            } else {
              stateClass = "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-secondary)]";
            }
          } else if (i === selected) {
            stateClass = "border-[var(--color-primary)] bg-[var(--color-primary-subtle)] text-[var(--color-text-link)]";
          }

          return (
            <button key={i} onClick={() => handleSelect(i)} aria-pressed={selected === i} disabled={!loaded || checked}
              className={`w-full text-left p-4 rounded-[var(--radius-lg)] font-body text-sm transition-all duration-150 border-2 ${stateClass}`}
              style={!checked && i === selected ? { boxShadow: "0 2px 0 var(--color-primary)" } : checked && i === data.correct ? { boxShadow: "0 2px 0 var(--color-success)" } : checked && i === selected && i !== data.correct ? { boxShadow: "0 2px 0 var(--color-error)" } : { boxShadow: "0 2px 0 var(--color-border-default)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-[var(--radius-circle)] flex items-center justify-center font-display font-extrabold text-xs border-2 shrink-0 ${
                    checked && i === data.correct
                      ? "bg-[var(--color-success)] text-[var(--color-on-brand)] border-[var(--color-success)]"
                      : checked && i === selected && i !== data.correct
                        ? "bg-[var(--color-error)] text-[var(--color-on-brand)] border-[var(--color-error)]"
                        : i === selected
                          ? "bg-[var(--color-primary)] text-[var(--color-on-brand)] border-[var(--color-primary)]"
                          : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] border-[var(--color-border-default)]"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span>{option}</span>
                </div>
                {checked && i === data.correct && <CheckCircle className="w-5 h-5 text-[var(--color-success)] shrink-0" />}
                {checked && i === selected && i !== data.correct && <XCircle className="w-5 h-5 text-[var(--color-text-error)] shrink-0" />}
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {checked && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            {isCorrect ? (
              <div className="flex items-center gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-2 border-[var(--color-success)]" style={{ boxShadow: "0 2px 0 var(--color-success)" }}>
                <CheckCircle className="w-5 h-5 shrink-0 text-[var(--color-success)]" />
                <div>
                  <p className="font-display font-extrabold">Correct! {award > 0 ? `+${award} XP earned` : "Previously credited · no additional XP"}</p>
                  <p className="font-body text-sm text-[var(--color-text-primary)] mt-0.5">{data.options[data.correct]}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-error-bg)] text-[var(--color-text-error)] border-2 border-[var(--color-error)]" style={{ boxShadow: "0 2px 0 var(--color-error)" }}>
                  <XCircle className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-text-error)]" />
                  <div>
                    <p className="font-display font-extrabold">Not quite</p>
                    <p className="font-body text-sm mt-1">
                      Your choice: <span className="line-through text-[var(--color-text-error)]">{data.options[selected!]}</span>
                    </p>
                    <p className="font-body text-sm">
                      Correct answer: <span className="font-display font-bold text-[var(--color-text-success)]">{data.options[data.correct]}</span>
                    </p>
                    {data.explanation && (
                      <p className="font-body text-sm mt-2 text-[var(--color-text-secondary)]">{data.explanation}</p>
                    )}
                  </div>
                </div>


              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!checked && selected !== null && <Button onClick={check} size="sm">Check ✓</Button>}
    </div>
  );
}

"use client";
import { useDrillAttempt } from "@/hooks/useDrillAttempt";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { Button } from "@/components/ui/Button";
import { playCorrect, playWrong } from "@/lib/audio";
import { GripVertical, CheckCircle, XCircle, BookOpen, ArrowRight } from "lucide-react";

export interface ReorderData {
  words: string[];
  sentence: string;
  xpReward: number;
  id: string;
}

export function ReorderExercise({ data }: { data: ReorderData }) {
  const { state: { items, checked, correct, award }, patch } = useDrillAttempt(data.id, data, { items: [...data.words].reverse(), checked: false, correct: false, award: 0 });
  const setItems = (items: string[]) => patch({ items });
  const setChecked = (checked: boolean) => patch({ checked });
  const setCorrect = (correct: boolean) => patch({ correct });
  const { completeExercise } = useProgress();
  const { addError } = useErrors();

  function check() {
    const isCorrect = items.join(" ") === data.sentence;
    setCorrect(isCorrect);
    setChecked(true);
    if (isCorrect) {
      playCorrect();
      patch({ award: completeExercise(data.id, data.xpReward) });
    } else {
      playWrong();
      addError({
        question: `Reorder: "${data.words.join(" ")}"`,
        userAnswer: items.join(" "),
        correctAnswer: data.sentence,
        explanation: `The correct order is: "${data.sentence}"`,
        source: "exercise",
        sourceId: data.id,
      });
    }
  }

  const correctWords = data.sentence.split(" ");
  const grammarNote = null;

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 border-2 border-[var(--color-border-default)] space-y-4" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-2">
        {items.map((item, itemIndex) => (
          <Reorder.Item key={item} value={item}
            className="flex items-center gap-3 p-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] cursor-grab active:cursor-grabbing select-none"
            style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}
          >
            <GripVertical className="w-4 h-4 text-[var(--color-text-disabled)] shrink-0" />
            <span className="font-body text-[var(--color-text-primary)]">{item}</span>
            <div className="ml-auto flex gap-2">
              <button type="button" disabled={checked || itemIndex === 0} aria-label={`Move ${item} up`} onClick={() => { const next = [...items]; [next[itemIndex - 1], next[itemIndex]] = [next[itemIndex], next[itemIndex - 1]]; setItems(next); }} className="p-2 border rounded border-[var(--color-border-default)]">↑</button>
              <button type="button" disabled={checked || itemIndex === items.length - 1} aria-label={`Move ${item} down`} onClick={() => { const next = [...items]; [next[itemIndex + 1], next[itemIndex]] = [next[itemIndex], next[itemIndex + 1]]; setItems(next); }} className="p-2 border rounded border-[var(--color-border-default)]">↓</button>
            </div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <AnimatePresence>
        {checked && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            {correct ? (
              <div className="flex items-center gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-2 border-[var(--color-success)]" style={{ boxShadow: "0 2px 0 var(--color-success)" }}>
                <CheckCircle className="w-5 h-5 shrink-0 text-[var(--color-success)]" />
                <div>
                  <p className="font-display font-extrabold">Correct! {award > 0 ? `+${award} XP earned` : "Previously credited · no additional XP"}</p>
                  <p className="font-body text-sm text-[var(--color-text-primary)] mt-0.5">{'\u201C'}{data.sentence}{'\u201D'}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-error-bg)] text-[var(--color-text-error)] border-2 border-[var(--color-error)]" style={{ boxShadow: "0 2px 0 var(--color-error)" }}>
                  <XCircle className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-text-error)]" />
                  <div>
                    <p className="font-display font-extrabold">Not quite — positions are off</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {items.map((word, i) => {
                        const isInCorrectPos = correctWords[i] === word;
                        return (
                          <span key={`${word}-${i}`}
                            className={`px-2.5 py-1 rounded-[var(--radius-md)] font-body text-sm font-mono border-2 ${
                              isInCorrectPos
                                ? "bg-[var(--color-success-bg)] text-[var(--color-text-success)] border-[var(--color-success)]"
                                : "bg-[var(--color-error-bg)] text-[var(--color-text-error)] border-[var(--color-error)]"
                            }`}
                          >
                            {word}
                            {!isInCorrectPos && <span className="ml-1 text-xs opacity-70">✗</span>}
                          </span>
                        );
                      })}
                    </div>
                    <p className="font-body text-sm mt-2">
                      Correct: <span className="font-display font-bold text-[var(--color-text-success)]">{'\u201C'}{data.sentence}{'\u201D'}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info-bg)] text-[var(--color-text-info)] border-2 border-[var(--color-info)]" style={{ boxShadow: "0 2px 0 var(--color-info)" }}>
                  <ArrowRight className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-info)]" />
                  <div>
                    <p className="font-display font-extrabold text-sm">Correct order</p>
                    <p className="font-body text-sm mt-1 font-mono">{correctWords.map((w, i) => (
                      <span key={w} className={`${i > 0 ? "ml-1" : ""} px-1.5 py-0.5 rounded bg-[var(--color-info-bg)]`}>{w}</span>
                    ))}</p>
                  </div>
                </div>

                {grammarNote && (
                  <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] border-2 border-[var(--color-warning)]" style={{ boxShadow: "0 2px 0 var(--color-warning)" }}>
                    <BookOpen className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-warning)]" />
                    <div>
                      <p className="font-display font-extrabold text-sm">Word Order Tip</p>
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

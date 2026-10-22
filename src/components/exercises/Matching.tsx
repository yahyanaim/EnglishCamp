"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { Button } from "@/components/ui/Button";
import { playCorrect, playWrong } from "@/lib/audio";
import { CheckCircle, XCircle, BookOpen } from "lucide-react";

export interface MatchingData {
  pairs: [string, string][];
  xpReward: number;
  id: string;
}

function getGrammarNote(pairs: [string, string][]): string | null {
  if (pairs.length >= 3) {
    return "Matching exercises help build vocabulary associations. Look for patterns like synonyms, antonyms, or collocations.";
  }
  return null;
}

export function Matching({ data }: { data: MatchingData }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [matched, setMatched] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const { completeExercise } = useProgress();
  const { addError } = useErrors();

  const pairMap = useMemo(() => {
    const m = new Map<string, string>();
    for (const [l, r] of data.pairs) m.set(l, r);
    return m;
  }, [data.pairs]);

  const leftItems = data.pairs.map(([l]) => l);
  const rightItems = useMemo(
    () => data.pairs.map(([, r]) => r).sort(() => Math.random() - 0.5),
    [data.pairs]
  );

  function selectLeft(item: string) {
    if (matched[item] || checked) return;
    setSelected(item);
  }

  function selectRight(item: string) {
    if (!selected || matched[selected] || checked) return;
    setMatched((prev) => ({ ...prev, [selected]: item }));
    setSelected(null);
  }

  function resetMatch() {
    setMatched({});
    setChecked(false);
    setSelected(null);
  }

  function check() {
    let allCorrect = true;
    for (const [l, r] of data.pairs) {
      if (matched[l] !== r) { allCorrect = false; break; }
    }
    setChecked(true);
    if (allCorrect) {
      playCorrect();
      completeExercise(data.id, data.xpReward);
    } else {
      playWrong();
      addError({
        question: `Match: ${data.pairs.map(([l, r]) => `${l} ↔ ${r}`).join(", ")}`,
        userAnswer: Object.entries(matched).map(([l, r]) => `${l} → ${r}`).join(", "),
        correctAnswer: data.pairs.map(([l, r]) => `${l} → ${r}`).join(", "),
        explanation: "Not all pairs were matched correctly.",
        source: "exercise",
        sourceId: data.id,
      });
    }
  }

  const allMatched = Object.keys(matched).length === data.pairs.length;
  const isCorrect = checked && data.pairs.every(([l, r]) => matched[l] === r);
  const grammarNote = getGrammarNote(data.pairs);

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 border-2 border-[var(--color-border-default)] space-y-4" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          {leftItems.map((item) => {
            const isSelected = selected === item;
            const matchedRight = matched[item];
            const isMatched = !!matchedRight;
            const isWrong = checked && matchedRight && matchedRight !== pairMap.get(item);
            const isRightMatch = checked && matchedRight && matchedRight === pairMap.get(item);
            return (
              <button key={item} onClick={() => selectLeft(item)}
                className={`w-full text-left p-3 rounded-[var(--radius-md)] font-body text-sm transition-all duration-150 border-2 ${
                  isSelected
                    ? "border-[var(--color-primary)] bg-[var(--color-primary-subtle)]"
                    : isRightMatch
                      ? "bg-[var(--color-success-bg)] border-[var(--color-success)] text-[var(--color-success-dark)]"
                      : isWrong
                        ? "bg-[var(--color-error-bg)] border-[var(--color-error)] text-[var(--color-error)]"
                        : isMatched
                          ? "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-disabled)]"
                          : "bg-[var(--color-surface)] border-[var(--color-border-default)] hover:border-[var(--color-border-strong)]"
                }`}
                style={{ boxShadow: isSelected ? "0 2px 0 var(--color-primary)" : isRightMatch ? "0 2px 0 var(--color-success)" : isWrong ? "0 2px 0 var(--color-error)" : "0 2px 0 var(--color-border-default)" }}
              >
                <div className="flex items-center justify-between">
                  <span>{item}</span>
                  {isRightMatch && <CheckCircle className="w-4 h-4 text-[var(--color-success)] shrink-0" />}
                  {isWrong && <XCircle className="w-4 h-4 text-[var(--color-error)] shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>
        <div className="space-y-2">
          {rightItems.map((item) => {
            const isMatched = Object.values(matched).includes(item);
            const matchedLeft = Object.entries(matched).find(([, v]) => v === item)?.[0];
            const isCorrectMatch = matchedLeft && pairMap.get(matchedLeft) === item;
            return (
              <button key={item} onClick={() => selectRight(item)}
                className={`w-full text-left p-3 rounded-[var(--radius-md)] font-body text-sm transition-all duration-150 border-2 ${
                  checked && isMatched
                    ? isCorrectMatch
                      ? "bg-[var(--color-success-bg)] border-[var(--color-success)] text-[var(--color-success-dark)]"
                      : "bg-[var(--color-error-bg)] border-[var(--color-error)] text-[var(--color-error)]"
                    : isMatched
                      ? "bg-[var(--color-surface-alt)] border-[var(--color-border-default)] text-[var(--color-text-disabled)]"
                      : "bg-[var(--color-surface)] border-[var(--color-border-default)] hover:border-[var(--color-border-strong)]"
                }`}
                style={{ boxShadow: checked && isMatched && isCorrectMatch ? "0 2px 0 var(--color-success)" : checked && isMatched && !isCorrectMatch ? "0 2px 0 var(--color-error)" : "0 2px 0 var(--color-border-default)" }}
              >
                <div className="flex items-center justify-between">
                  <span>{item}</span>
                  {checked && isMatched && isCorrectMatch && <CheckCircle className="w-4 h-4 text-[var(--color-success)] shrink-0" />}
                  {checked && isMatched && !isCorrectMatch && <XCircle className="w-4 h-4 text-[var(--color-error)] shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {checked && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            {isCorrect ? (
              <div className="flex items-center gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-success-bg)] text-[var(--color-success-dark)] border-2 border-[var(--color-success)]" style={{ boxShadow: "0 2px 0 var(--color-success)" }}>
                <CheckCircle className="w-5 h-5 shrink-0 text-[var(--color-success)]" />
                <div>
                  <p className="font-display font-extrabold">All matched correctly! +{data.xpReward} XP</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-error-bg)] text-[var(--color-error)] border-2 border-[var(--color-error)]" style={{ boxShadow: "0 2px 0 var(--color-error)" }}>
                  <XCircle className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-error)]" />
                  <div className="w-full">
                    <p className="font-display font-extrabold mb-2">Some matches are wrong</p>
                    <div className="space-y-1.5">
                      {data.pairs.map(([l, r]) => {
                        const userMatch = matched[l];
                        const isMatchCorrect = userMatch === r;
                        return (
                          <div key={l} className={`flex items-center gap-2 font-body text-sm px-3 py-2 rounded-[var(--radius-md)] border-2 ${
                            isMatchCorrect ? "bg-[var(--color-success-bg)] border-[var(--color-success)] text-[var(--color-success-dark)]" : "bg-[var(--color-error-bg)] border-[var(--color-error)] text-[var(--color-error)]"
                          }`}>
                            <span className="font-mono">{l}</span>
                            <span className="text-[var(--color-text-disabled)]">→</span>
                            {isMatchCorrect ? (
                              <span className="font-mono font-bold">{r}</span>
                            ) : (
                              <>
                                <span className="line-through font-mono">{userMatch ?? "—"}</span>
                                <span className="text-[var(--color-text-disabled)]">|</span>
                                <span className="font-mono font-bold text-[var(--color-success-dark)]">{r}</span>
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {grammarNote && (
                  <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning-bg)] text-[var(--color-warning-dark)] border-2 border-[var(--color-warning)]" style={{ boxShadow: "0 2px 0 var(--color-warning)" }}>
                    <BookOpen className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-warning)]" />
                    <div>
                      <p className="font-display font-extrabold text-sm">Study Tip</p>
                      <p className="font-body text-sm mt-1">{grammarNote}</p>
                    </div>
                  </div>
                )}

                <Button onClick={resetMatch} size="sm" variant="secondary">Try Again ↻</Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {allMatched && !checked && <Button onClick={check} size="sm">Check ✓</Button>}
    </div>
  );
}

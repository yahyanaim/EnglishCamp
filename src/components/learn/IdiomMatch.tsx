"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { playCorrect, playWrong } from "@/lib/audio";
import { IDIOMS } from "@/data/redewendungen";
import { Lightbulb, BookOpen, CheckCircle2, XCircle, ArrowRight, Sparkles, Shuffle } from "lucide-react";

function pick<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

function generateRound() {
  const selected = pick(IDIOMS, 5);
  const pairs = selected.map((item) => ({
    id: item.idiom,
    idiom: item.idiom,
    meaning: item.meaning,
    example: item.example,
  }));
  const shuffledIdiom = [...pairs].sort(() => Math.random() - 0.5);
  const shuffledMeaning = [...pairs].sort(() => Math.random() - 0.5);
  return { pairs, shuffledIdiom, shuffledMeaning };
}

type Round = ReturnType<typeof generateRound>;

export function IdiomMatch() {
  const { completeExercise, addXP } = useProgress();
  const [rounds] = useState(() => Array.from({ length: 3 }, () => generateRound()));
  const [roundIdx, setRoundIdx] = useState(0);
  const [selectedIdiom, setSelectedIdiom] = useState<string | null>(null);
  const [selectedMeaning, setSelectedMeaning] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ idiom: string; meaning: string } | null>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [roundDone, setRoundDone] = useState(false);
  const [done, setDone] = useState(false);
  const [showTip, setShowTip] = useState(false);

  const current = rounds[roundIdx];
  const unmatchedIdiom = current.shuffledIdiom.filter((p) => !matched.has(p.id));
  const unmatchedMeaning = current.shuffledMeaning.filter((p) => !matched.has(p.id));

  function handleSelectIdiom(id: string) {
    if (roundDone || matched.has(id)) return;
    setSelectedIdiom(id);
    setWrongPair(null);
    if (selectedMeaning) tryMatch(id, selectedMeaning);
  }

  function handleSelectMeaning(meaning: string) {
    if (roundDone) return;
    const pair = current.pairs.find((p) => p.meaning === meaning);
    if (!pair || matched.has(pair.id)) return;
    setSelectedMeaning(meaning);
    setWrongPair(null);
    if (selectedIdiom) tryMatch(selectedIdiom, meaning);
  }

  function tryMatch(idiomId: string, meaningValue: string) {
    const pair = current.pairs.find((p) => p.id === idiomId);
    if (!pair) return;
    setAttempts((a) => a + 1);
    if (pair.meaning === meaningValue) {
      setMatched((m) => new Set(m).add(idiomId));
      setSelectedIdiom(null);
      setSelectedMeaning(null);
      setScore((s) => s + 1);
      completeExercise(`idiom-${idiomId}`, 10);
      playCorrect();
      if (matched.size + 1 >= current.pairs.length) {
        setRoundDone(true);
      }
    } else {
      setWrongPair({ idiom: idiomId, meaning: meaningValue });
      playWrong();
      setTimeout(() => {
        setSelectedIdiom(null);
        setSelectedMeaning(null);
        setWrongPair(null);
      }, 1000);
    }
  }

  function nextRound() {
    if (roundIdx + 1 >= rounds.length) {
      addXP(Math.round((score / Math.max(attempts, 1)) * 30));
      setDone(true);
    } else {
      setRoundIdx((i) => i + 1);
      setSelectedIdiom(null);
      setSelectedMeaning(null);
    setMatched(new Set());
    setWrongPair(null);
    setScore(0);
    setAttempts(0);
    setRoundDone(false);
    setDone(false);
    setShowTip(false);
    }
  }

  if (done) {
    const pct = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
    return (
      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-10 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <Sparkles className="w-14 h-14 text-[var(--color-warning)] mx-auto mb-4" />
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Idiom Match Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)]">{score}/{attempts} ({pct}%)</p>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">{pct >= 80 ? "You really know your idioms!" : pct >= 50 ? "Good start! Idioms take practice." : "Keep practicing English idioms!"}</p>
        <button onClick={() => { setRoundIdx(0); setScore(0); setAttempts(0); setDone(false); }} className="mt-4 text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all">
          Play Again ↺
        </button>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.08)] max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--color-warning)] uppercase tracking-wider">Idiom Match</span>
        <span className="text-xs text-[var(--color-text-disabled)]">Round {roundIdx + 1}/{rounds.length}</span>
      </div>

      <div className="flex gap-1.5 mb-4">
        {rounds.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-[var(--radius-pill)] transition-colors ${i < roundIdx ? "bg-emerald-400" : i === roundIdx ? "bg-amber-400" : "bg-[var(--color-border-default)]"}`} />
        ))}
      </div>

      <p className="text-xs text-[var(--color-text-secondary)] mb-4 text-center">
        Match each idiom to its meaning. Click one from each column.
      </p>

      <div className="flex items-start gap-2 mb-4">
        <Shuffle className="w-3.5 h-3.5 text-[var(--color-text-disabled)] mt-0.5" />
        <p className="text-xs text-[var(--color-text-disabled)]">Matched: {matched.size}/{current.pairs.length}</p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={roundIdx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-disabled)] mb-2 text-center">Idiom</p>
              <div className="space-y-2">
                {unmatchedIdiom.map((p) => {
                  const isSelected = selectedIdiom === p.id;
                  const isWrong = wrongPair?.idiom === p.id;
                  return (
                    <motion.button
                      key={p.id}
                      onClick={() => handleSelectIdiom(p.id)}
                      disabled={roundDone}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left px-3 py-2.5 rounded-[var(--radius-lg)] text-sm font-medium border-2 transition-all ${
                        isWrong
                          ? "border-red-300 bg-[var(--color-error)] text-white text-red-700"
                          : isSelected
                            ? "border-amber-400 bg-[var(--color-warning)] text-white "
                            : "border-[var(--color-border-default)] bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-warning)] hover:bg-amber-50/50"
                      }`}
                    >
                      {p.idiom}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-text-disabled)] mb-2 text-center">English (Meaning)</p>
              <div className="space-y-2">
                {unmatchedMeaning.map((p) => {
                  const isSelected = selectedMeaning === p.meaning;
                  const isWrong = wrongPair?.meaning === p.meaning;
                  return (
                    <motion.button
                      key={p.id}
                      onClick={() => handleSelectMeaning(p.meaning)}
                      disabled={roundDone}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full text-left px-3 py-2.5 rounded-[var(--radius-lg)] text-sm font-medium border-2 transition-all ${
                        isWrong
                          ? "border-red-300 bg-[var(--color-error)] text-white text-red-700"
                          : isSelected
                            ? "border-amber-400 bg-[var(--color-warning)] text-white "
                            : "border-[var(--color-border-default)] bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:border-[var(--color-warning)] hover:bg-amber-50/50"
                      }`}
                    >
                      {p.meaning}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>

          {roundDone && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-2">
              <div className="bg-[var(--color-success)] text-white rounded-[var(--radius-lg)] p-4 ring-1 ring-[var(--color-success)]">
                  <p className="text-sm font-semibold text-[var(--color-success)] mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> All matched!
                  </p>
                <div className="space-y-3">
                  {current.pairs.map((p) => (
                    <div key={p.id} className="text-xs">
                      <p className="font-mono font-bold text-[var(--color-text-primary)]">{p.idiom}</p>
                      <p className="text-[var(--color-success)]">{p.meaning}</p>
                      <p className="text-[var(--color-text-disabled)] mt-0.5">{p.example}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <button onClick={nextRound} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)] font-display font-extrabold text-sm hover:bg-[var(--color-primary-dark)] transition-all active:translate-y-0.5" style={{ boxShadow: "0 4px 0 var(--color-primary-dark)" }}>
                  {roundIdx + 1 >= rounds.length ? "See Results" : "Next Round"} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

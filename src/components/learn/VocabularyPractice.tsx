"use client";

import { speak } from "@/lib/audio";
import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect } from "@/lib/audio";
import { CheckCircle2, XCircle, Volume2, RefreshCw, Send, Brain, PenLine, Target, BarChart3 } from "lucide-react";
import { useVocabulary } from "@/store/useVocabulary";

type VocabMode = "quiz" | "write";


function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
}

const MotionPracticeButton = motion.create(PracticeButton);

export function VocabularyPractice() {
  const { getAll } = useVocabulary();
  const [mode, setMode] = useState<VocabMode>("quiz");
  const [index, setIndex] = useState(0);
  const [session, setSession] = useState({ correct: 0, incorrect: 0, total: 0 });

  const words = useMemo(() => {
    const all = getAll();
    const withEn = all.filter(([, v]) => v.en);
    withEn.sort((a, b) => a[1].mastery - b[1].mastery);
    return withEn;
  }, []);

  const current = words[index];
  const accuracy = session.total > 0 ? Math.round((session.correct / session.total) * 100) : 0;

  // Quiz mode
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  const options = useMemo(() => {
    if (!current) return [];
    const correct = current[1].en;
    const others = getAll()
      .filter(([, v]) => v.en !== correct && v.en)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map(([, v]) => v.en);
    return [correct, ...others].sort(() => Math.random() - 0.5);
  }, [index, mode]);

  // Write mode
  const [input, setInput] = useState("");
  const [writeSubmitted, setWriteSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, [index]);

  function resetState() {
    setSelected(null);
    setAnswered(false);
    setInput("");
    setWriteSubmitted(false);
  }

  function advance() {
    resetState();
    setIndex((i) => Math.min(i + 1, words.length - 1));
  }

  function handleQuizSelect(opt: string) {
    if (answered) return;
    setSelected(opt);
    setAnswered(true);
    if (opt === current[1].en) playCorrect();
    setTimeout(() => {
      setSession((s) => ({ ...s, correct: s.correct + (opt === current[1].en ? 1 : 0), incorrect: s.incorrect + (opt === current[1].en ? 0 : 1), total: s.total + 1 }));
      advance();
    }, 900);
  }

  const acceptable = current ? [current[1].de] : [];
  const isCorrect = writeSubmitted && acceptable.some((a) => normalize(a) === normalize(input));

  function handleWriteSubmit() {
    if (!input.trim() || writeSubmitted) return;
    setWriteSubmitted(true);
    if (isCorrect) playCorrect();
  }

  function handleWriteNext() {
    setSession((s) => ({ ...s, correct: s.correct + (isCorrect ? 1 : 0), incorrect: s.incorrect + (isCorrect ? 0 : 1), total: s.total + 1 }));
    advance();
  }

  function handleWriteKey(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      if (!writeSubmitted) handleWriteSubmit();
      else handleWriteNext();
    }
  }

  if (words.length === 0) {
    return (
      <PracticeCard data-practice-surface="question" className="text-center py-12 text-[var(--color-text-secondary)] bg-[var(--color-surface)] rounded-[16px] border border-[var(--color-border-default)] p-8">
        <LearningArt name="Brain" size={36} className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p className="text-sm font-medium text-[var(--color-text-secondary)]">No vocabulary to practice</p>
        <p className="text-xs mt-1">Save some words during lessons to start practicing</p>
      </PracticeCard>
    );
  }

  if (index >= words.length) {
    return (
      <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[16px] border border-[var(--color-border-default)] p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-center">
        <LearningArt name="🎉" size={36} className=" block mb-3" />
        <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">Session complete!</p>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">You reviewed all {session.total} words</p>
        <p className="text-2xl font-display font-extrabold text-[var(--color-text-link)] mt-3">{accuracy}% accuracy</p>
        <PracticeButton
          onClick={() => { setIndex(0); setSession({ correct: 0, incorrect: 0, total: 0 }); }}
          className="mt-4 px-6 py-2.5 rounded-[12px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-[var(--color-primary-hover)] transition-all"
        >
          Start again
        </PracticeButton>
      </PracticeCard>
    );
  }

  const word = current[1];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 bg-[var(--color-surface-alt)] rounded-[12px] p-1 w-fit">
        {(["quiz", "write"] as const).map((m) => (
          <PracticeButton
            key={m}
            onClick={() => { setMode(m); resetState(); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-bold transition-all ${
              mode === m ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[var(--color-border-default)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {m === "quiz" ? <LearningArt name="Brain" size={14} className="w-3.5 h-3.5" /> : <LearningArt name="PenLine" size={14} className="w-3.5 h-3.5" />}
            {m === "quiz" ? "Quiz" : "Write"}
          </PracticeButton>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[12px] border border-[var(--color-border-default)] p-2.5">
          <p className="text-[9px] font-semibold text-[var(--color-text-secondary)] uppercase">Done</p>
          <p className="text-sm font-bold text-[var(--color-text-primary)]">{session.total}</p>
        </PracticeCard>
        <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[12px] border border-[var(--color-border-default)] p-2.5">
          <p className="text-[9px] font-semibold text-[var(--color-text-secondary)] uppercase">Accuracy</p>
          <p className="text-sm font-bold text-[var(--color-text-primary)]">{session.total > 0 ? `${accuracy}%` : "—"}</p>
        </PracticeCard>
        <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[12px] border border-[var(--color-border-default)] p-2.5">
          <p className="text-[9px] font-semibold text-[var(--color-text-secondary)] uppercase">Remaining</p>
          <p className="text-sm font-bold text-[var(--color-text-primary)]">{words.length - index}</p>
        </PracticeCard>
      </div>

      {/* Quiz mode */}
      {mode === "quiz" && (
        <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[16px] border border-[var(--color-border-default)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div className="text-center mb-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-2">{word.category}</p>
            <p className="font-display text-2xl font-display font-extrabold text-[var(--color-text-primary)]">{word.de}</p>
            <PracticeButton onClick={() => speak(word.de)} className="mt-1 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-secondary)]"><Volume2 className="w-3.5 h-3.5 inline mr-1" />Listen</PracticeButton>
          </div>
          <div className="space-y-2">
            {options.map((opt) => {
              let cls = "bg-[var(--color-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:ring-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]";
              if (answered && opt === word.en) cls = "bg-[var(--color-success-bg)] text-[var(--color-text-success)] ring-2 ring-emerald-400 text-[var(--color-text-success)]";
              if (answered && opt === selected && opt !== word.en) cls = "bg-[var(--color-error-bg)] text-[var(--color-text-error)] ring-2 ring-red-300 text-[var(--color-text-error)]";
              return (
                <MotionPracticeButton
                  key={opt} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  onClick={() => handleQuizSelect(opt)} disabled={answered}
                  className={`flex items-center gap-2 w-full px-4 py-3 rounded-[12px] text-sm font-medium transition-all ${cls}`}
                >
                  {answered && opt === word.en && <CheckCircle2 className="w-4 h-4 text-[var(--color-text-success)] shrink-0" />}
                  {answered && opt === selected && opt !== word.en && <XCircle className="w-4 h-4 text-[var(--color-text-error)] shrink-0" />}
                  <span>{opt}</span>
                </MotionPracticeButton>
              );
            })}
          </div>
        </PracticeCard>
      )}

      {/* Write mode */}
      {mode === "write" && (
        <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[16px] border border-[var(--color-border-default)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div className="text-center mb-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-secondary)] mb-2">{word.category}</p>
            <p className="font-display text-xl font-display font-extrabold text-[var(--color-text-primary)]">{word.en}</p>
            <p className="text-xs text-[var(--color-text-secondary)] mt-1">Type the English word</p>
          </div>

          <div className="relative max-w-sm mx-auto">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleWriteKey}
              disabled={writeSubmitted}
              placeholder="Type your answer..."
              className={`w-full h-[48px] px-4 bg-[var(--color-surface)] rounded-[12px] border text-sm font-medium outline-none transition-all ${
                !writeSubmitted
                  ? "border-[var(--color-border-default)] text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(126,34,206,0.15)]"
                  : isCorrect ? "border-emerald-400 bg-[var(--color-success-bg)] text-[var(--color-text-success)] text-[var(--color-text-success)]" : "border-red-300 bg-[var(--color-error-bg)] text-[var(--color-text-error)] text-[var(--color-text-error)]"
              }`}
            />
            {!writeSubmitted ? (
              <PracticeButton onClick={handleWriteSubmit} disabled={!input.trim()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[8px] bg-[var(--color-primary)] text-[var(--color-on-brand)] flex items-center justify-center hover:bg-[var(--color-primary-hover)] disabled:opacity-40 transition-all">
                <Send className="w-3.5 h-3.5" />
              </PracticeButton>
            ) : (
              <PracticeButton onClick={handleWriteNext}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[8px] bg-[var(--color-border-default)] text-[var(--color-text-secondary)] flex items-center justify-center hover:bg-slate-300 transition-all">
                <RefreshCw className="w-3.5 h-3.5" />
              </PracticeButton>
            )}
          </div>

          <AnimatePresence>
            {writeSubmitted && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 max-w-sm mx-auto">
                <div className={`flex items-start gap-2 p-3 rounded-[12px] ${isCorrect ? "bg-[var(--color-success-bg)] text-[var(--color-text-success)]" : "bg-[var(--color-error-bg)] text-[var(--color-text-error)]"}`}>
                  {isCorrect ? <CheckCircle2 className="w-4 h-4 text-[var(--color-text-success)] shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 text-[var(--color-text-error)] shrink-0 mt-0.5" />}
                  <div>
                    <p className={`text-sm font-medium ${isCorrect ? "text-[var(--color-text-success)]" : "text-[var(--color-text-error)]"}`}>
                      {isCorrect ? "Correct!" : `Correct: ${word.de}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </PracticeCard>
      )}
    </div>
  );
}

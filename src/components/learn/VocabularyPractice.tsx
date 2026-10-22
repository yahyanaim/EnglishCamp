"use client";
import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect } from "@/lib/audio";
import { CheckCircle2, XCircle, Volume2, RefreshCw, Send, Brain, PenLine, Target, BarChart3 } from "lucide-react";
import { useVocabulary } from "@/store/useVocabulary";

type VocabMode = "quiz" | "write";

function speak(text: string) {
  if (typeof window === "undefined") return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "en-US";
  u.rate = 0.85;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
}

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
      <div className="text-center py-12 text-[var(--color-text-disabled)] bg-[var(--color-surface)] rounded-[16px] border-2 border-[var(--color-border-default)] p-8">
        <Brain className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p className="text-sm font-medium text-[var(--color-text-secondary)]">No vocabulary to practice</p>
        <p className="text-xs mt-1">Save some words during lessons to start practicing</p>
      </div>
    );
  }

  if (index >= words.length) {
    return (
      <div className="bg-[var(--color-surface)] rounded-[16px] border-2 border-[var(--color-border-default)] p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08)] text-center">
        <span className="text-4xl block mb-3">🎉</span>
        <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">Session complete!</p>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">You reviewed all {session.total} words</p>
        <p className="text-2xl font-display font-extrabold text-[var(--color-primary-dark)] mt-3">{accuracy}% accuracy</p>
        <button
          onClick={() => { setIndex(0); setSession({ correct: 0, incorrect: 0, total: 0 }); }}
          className="mt-4 px-6 py-2.5 rounded-[12px] bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-brand-600 transition-all"
        >
          Start again
        </button>
      </div>
    );
  }

  const word = current[1];

  return (
    <div className="space-y-4">
      <div className="flex gap-2 bg-[var(--color-surface-alt)] rounded-[12px] p-1 w-fit">
        {(["quiz", "write"] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); resetState(); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[10px] text-xs font-bold transition-all ${
              mode === m ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-[0_2px_8px_rgba(0,0,0,0.08)] border-2 border-[var(--color-border-default)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {m === "quiz" ? <Brain className="w-3.5 h-3.5" /> : <PenLine className="w-3.5 h-3.5" />}
            {m === "quiz" ? "Quiz" : "Write"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        <div className="bg-[var(--color-surface)] rounded-[12px] border-2 border-[var(--color-border-default)] p-2.5">
          <p className="text-[9px] font-semibold text-[var(--color-text-disabled)] uppercase">Done</p>
          <p className="text-sm font-bold text-[var(--color-text-primary)]">{session.total}</p>
        </div>
        <div className="bg-[var(--color-surface)] rounded-[12px] border-2 border-[var(--color-border-default)] p-2.5">
          <p className="text-[9px] font-semibold text-[var(--color-text-disabled)] uppercase">Accuracy</p>
          <p className="text-sm font-bold text-[var(--color-text-primary)]">{session.total > 0 ? `${accuracy}%` : "—"}</p>
        </div>
        <div className="bg-[var(--color-surface)] rounded-[12px] border-2 border-[var(--color-border-default)] p-2.5">
          <p className="text-[9px] font-semibold text-[var(--color-text-disabled)] uppercase">Remaining</p>
          <p className="text-sm font-bold text-[var(--color-text-primary)]">{words.length - index}</p>
        </div>
      </div>

      {/* Quiz mode */}
      {mode === "quiz" && (
        <div className="bg-[var(--color-surface)] rounded-[16px] border-2 border-[var(--color-border-default)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div className="text-center mb-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-disabled)] mb-2">{word.category}</p>
            <p className="font-display text-2xl font-display font-extrabold text-[var(--color-text-primary)]">{word.de}</p>
            <button onClick={() => speak(word.de)} className="mt-1 text-xs text-[var(--color-text-disabled)] hover:text-[var(--color-text-secondary)]"><Volume2 className="w-3.5 h-3.5 inline mr-1" />Listen</button>
          </div>
          <div className="space-y-2">
            {options.map((opt) => {
              let cls = "bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:ring-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]";
              if (answered && opt === word.en) cls = "bg-[var(--color-success)] text-white ring-2 ring-emerald-400 text-emerald-800";
              if (answered && opt === selected && opt !== word.en) cls = "bg-[var(--color-error)] text-white ring-2 ring-red-300 text-red-700";
              return (
                <motion.button
                  key={opt} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  onClick={() => handleQuizSelect(opt)} disabled={answered}
                  className={`flex items-center gap-2 w-full px-4 py-3 rounded-[12px] text-sm font-medium transition-all ${cls}`}
                >
                  {answered && opt === word.en && <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] shrink-0" />}
                  {answered && opt === selected && opt !== word.en && <XCircle className="w-4 h-4 text-[var(--color-error)] shrink-0" />}
                  <span>{opt}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* Write mode */}
      {mode === "write" && (
        <div className="bg-[var(--color-surface)] rounded-[16px] border-2 border-[var(--color-border-default)] p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <div className="text-center mb-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-disabled)] mb-2">{word.category}</p>
            <p className="font-display text-xl font-display font-extrabold text-[var(--color-text-primary)]">{word.en}</p>
            <p className="text-xs text-[var(--color-text-disabled)] mt-1">Type the English word</p>
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
              className={`w-full h-[48px] px-4 bg-[var(--color-surface)] rounded-[12px] border-2 text-sm font-medium outline-none transition-all ${
                !writeSubmitted
                  ? "border-[var(--color-border-default)] text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:shadow-[0_0_0_3px_rgba(28,176,246,0.15)]"
                  : isCorrect ? "border-emerald-400 bg-[var(--color-success)] text-white text-emerald-800" : "border-red-300 bg-[var(--color-error)] text-white text-red-800"
              }`}
            />
            {!writeSubmitted ? (
              <button onClick={handleWriteSubmit} disabled={!input.trim()}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[8px] bg-[var(--color-primary)] text-white flex items-center justify-center hover:bg-brand-600 disabled:opacity-40 transition-all">
                <Send className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button onClick={handleWriteNext}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-[8px] bg-[var(--color-border-default)] text-[var(--color-text-secondary)] flex items-center justify-center hover:bg-slate-300 transition-all">
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <AnimatePresence>
            {writeSubmitted && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 max-w-sm mx-auto">
                <div className={`flex items-start gap-2 p-3 rounded-[12px] ${isCorrect ? "bg-[var(--color-success)] text-white" : "bg-[var(--color-error)] text-white"}`}>
                  {isCorrect ? <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] shrink-0 mt-0.5" /> : <XCircle className="w-4 h-4 text-[var(--color-error)] shrink-0 mt-0.5" />}
                  <div>
                    <p className={`text-sm font-medium ${isCorrect ? "text-[var(--color-success)]" : "text-red-700"}`}>
                      {isCorrect ? "Correct!" : `Correct: ${word.de}`}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

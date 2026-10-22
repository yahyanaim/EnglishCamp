"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import { useProgress } from "@/store/useProgress";
import { DISCOURSE_MARKERS } from "@/data/modalpartikel";
import { RefreshCw, Sparkles, MessageSquare, CheckCircle2, XCircle, ArrowRight } from "lucide-react";

type Item = { particle: string; meaning: string; usage: string; sentence: string; sentenceEn: string; ar?: string };

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function ModalpartikelUebersetzer() {
  const { addXP } = useProgress();
  const [items, setItems] = useState<Item[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [direction, setDirection] = useState<"sentence" | "meaning" | "ar">("sentence");

  function initGame() {
    const pool: Item[] = DISCOURSE_MARKERS.map((mp) => ({
      particle: mp.marker, meaning: mp.meaning, usage: mp.function, sentence: mp.example, sentenceEn: mp.exampleEn, ar: mp.arabic
    }));
    setItems(shuffle(pool).slice(0, 10));
    setIndex(0);
    setSelected(null);
    setScore(0);
    setPhase("playing");
  }

  const current = items[index];
  type Opts = { opts: string[]; correctVal: string };
  const question = useMemo((): Opts => {
    if (!current) return { opts: [], correctVal: "" };
    if (direction === "sentence" || direction === "ar") {
      const parts = items.map((x) => x.particle).filter((p, i, a) => p !== current.particle && a.indexOf(p) === i);
      const wrong = shuffle(parts).slice(0, 3);
      return { opts: shuffle([current.particle, ...wrong]), correctVal: current.particle };
    }
    const meanings = items.map((x) => x.meaning).filter((m, i, a) => m !== current.meaning && a.indexOf(m) === i);
    const wrong = shuffle(meanings).slice(0, 3);
    return { opts: shuffle([current.meaning, ...wrong]), correctVal: current.meaning };
  }, [current, direction, index]);

  function handleSelect(opt: string) {
    if (selected !== null || !current) return;
    setSelected(opt);
    if (opt === question.correctVal) { setScore((s) => s + 10); playCorrect(); }
    else { playWrong(); }
  }

  function handleNext() {
    if (index + 1 >= items.length) { setPhase("done"); addXP(score + (score >= 80 ? 20 : 0)); playXP(); return; }
    setIndex((i) => i + 1); setSelected(null);
  }

  if (phase === "ready") return (
    <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-8 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] max-w-lg mx-auto">
      <MessageSquare className="w-14 h-14 text-[var(--color-primary)] mx-auto mb-4" />
      <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Discourse Markers Practice</h2>
      <p className="text-sm text-[var(--color-text-secondary)] mt-2">Learn English discourse markers (actually, basically, however, therefore...) with Arabic translations</p>
      <div className="flex items-center justify-center gap-2 mt-5">
        <button onClick={() => setDirection("sentence")} className={`rounded-[10px] px-4 py-2 text-xs font-bold transition-all ${direction === "sentence" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}>Sentence → Marker</button>
        <button onClick={() => setDirection("meaning")} className={`rounded-[10px] px-4 py-2 text-xs font-bold transition-all ${direction === "meaning" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}>Sentence → Meaning</button>
        <button onClick={() => setDirection("ar")} className={`rounded-[10px] px-4 py-2 text-xs font-bold transition-all ${direction === "ar" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border-default)]"}`}>AR → Marker</button>
      </div>
      <button onClick={initGame} className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-2 shadow-[0_4px_0_rgba(28,176,246,0.3)]"><MessageSquare className="w-4 h-4" /> Start Learning</button>
    </div>
  );

  if (phase === "done") {
    const pct = Math.round((score / (items.length * 10)) * 100);
    return (
      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-10 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)] max-w-lg mx-auto">
        <span className="text-5xl block mb-4">{pct >= 80 ? "🎉" : pct >= 50 ? "💪" : "📚"}</span>
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Session Complete!</h2>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div><p className="text-3xl font-display font-extrabold text-[var(--color-success)]">{score}<span className="text-lg text-[var(--color-text-disabled)]">/{items.length * 10}</span></p><p className="text-xs text-[var(--color-text-secondary)]">Points</p></div>
          <div className="w-px h-10 bg-[var(--color-border-default)]" />
          <div><p className="text-3xl font-display font-extrabold text-[var(--color-primary-dark)]">{pct}%</p><p className="text-xs text-[var(--color-text-secondary)]">Accuracy</p></div>
        </div>
        <p className="mt-4 text-sm font-bold bg-amber-500 text-white font-extrabold shadow-sm px-4 py-2 rounded-[10px] inline-flex items-center gap-1.5"><Sparkles className="w-4 h-4" /> +{score + (pct >= 80 ? 20 : 0)} XP</p>
        <button onClick={() => setPhase("ready")} className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-2"><RefreshCw className="w-4 h-4" /> New Session</button>
      </div>
    );
  }

  if (!current) return null;
  const pct = ((index + (selected ? 1 : 0)) / items.length) * 100;
  const prompt = direction === "sentence" ? "Which discourse marker is used here?" : direction === "ar" ? "Which discourse marker matches this Arabic sentence?" : "What does this marker mean in this context?";

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-primary-subtle)] px-3 py-1 text-xs font-semibold text-[var(--color-primary-dark)]"><MessageSquare className="w-3 h-3" /> {index + 1}/{items.length}</span>
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-success)] text-white px-3 py-1 text-xs font-semibold"><Sparkles className="w-3 h-3" /> {score}</span>
      </div>
      <div className="w-full h-1.5 rounded-[var(--radius-pill)] bg-[var(--color-surface-alt)] overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.3 }} className="h-full rounded-[var(--radius-pill)] bg-[var(--color-primary)]" /></div>
      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-8 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <div className="mb-2"><span className="text-xs text-[var(--color-text-disabled)] font-medium uppercase tracking-wide">{prompt}</span></div>
        <div className="mb-4 p-4 rounded-[16px] bg-[var(--color-warning)] text-white">
          <p className="text-lg font-display font-extrabold text-[var(--color-text-primary)] text-center leading-relaxed">{direction === "ar" ? (current.ar || current.sentenceEn) : current.sentence}</p>
          <p className="text-xs text-[var(--color-text-disabled)] text-center mt-2 italic">{direction === "ar" ? current.sentenceEn : current.sentenceEn}</p>
        </div>
        <div className="space-y-2">
          {question.opts.map((opt) => {
            let cls = "bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:ring-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]";
            if (selected === opt && opt === question.correctVal) cls = "bg-[var(--color-success)] text-white ring-2 ring-emerald-400 text-emerald-800";
            else if (selected === opt && opt !== question.correctVal) cls = "bg-[var(--color-error)] text-white ring-2 ring-red-300 text-red-700";
            else if (selected !== null && opt === question.correctVal) cls = "bg-emerald-50/50 ring-1 ring-[var(--color-success)] text-[var(--color-success)]";
            return (
              <motion.button key={opt} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => handleSelect(opt)} disabled={selected !== null}
                className={`flex items-center gap-2 w-full px-4 py-3 rounded-[14px] text-sm font-medium transition-all ${cls}`}
              >
                {selected !== null && opt === question.correctVal && <CheckCircle2 className="w-4 h-4 text-[var(--color-success)] shrink-0" />}
                {selected === opt && opt !== question.correctVal && <XCircle className="w-4 h-4 text-[var(--color-error)] shrink-0" />}
                <span>{opt}</span>
              </motion.button>
            );
          })}
        </div>
        <AnimatePresence>{selected !== null && (
          <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 rounded-[10px] bg-[var(--color-surface-alt)] text-xs text-[var(--color-text-secondary)]">
            <p><strong className="text-[var(--color-text-secondary)]">{current.particle}</strong> — {current.meaning}</p>
            <p className="mt-1 text-[var(--color-text-disabled)]">{current.usage}</p>
          </motion.div>
        )}</AnimatePresence>
      </div>
      {selected !== null && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center">
          <button onClick={handleNext} className="px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-brand-600 transition-all shadow-[0_4px_0_rgba(28,176,246,0.3)] inline-flex items-center gap-1.5">
            {index + 1 >= items.length ? "See results" : "Next"} <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </div>
  );
}

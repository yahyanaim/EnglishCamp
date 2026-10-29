"use client";
import { useState, useMemo, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playCorrect, playWrong, playXP } from "@/lib/audio";
import { useProgress } from "@/store/useProgress";
import { FLASHCARDS } from "@/data/flashcards";
import { NOUN_VERB_COLLOCATIONS } from "@/data/nomen-verb-verbindungen";
import { VERB_PREPOSITIONS } from "@/data/verben-mit-prapositionen";
import { VERBS } from "@/data/conjugaise";
import { Brain, RefreshCw, Target, BarChart3, Trophy, CheckCircle2, XCircle, Sparkles, Lightbulb, BookOpen } from "lucide-react";

type QuestionSource = "flashcard-de" | "flashcard-en" | "nvv" | "verb-prep" | "conjugation";

type Question = {
  id: string;
  source: QuestionSource;
  prompt: string;
  correct: string;
  options: string[];
  explanation?: string;
};

const ROUND_SIZE = 10;

function shuffle<T>(a: T[]): T[] {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickN<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

function buildQuestions(): Question[] {
  const questions: Question[] = [];

  // Flashcard DE→EN
  for (const c of pickN(FLASHCARDS, 30)) {
    const wrong = pickN(Array.from(new Set(FLASHCARDS.map(x => x.en))).filter(x => x !== c.en), 3);
    questions.push({
      id: `fc-de-${c.id}`, source: "flashcard-de",
      prompt: c.de, correct: c.en,
      options: shuffle([c.en, ...wrong]),
    });
  }

  // Flashcard EN→DE
  for (const c of pickN(FLASHCARDS, 30)) {
    const wrong = pickN(Array.from(new Set(FLASHCARDS.map(x => x.de))).filter(x => x !== c.de), 3);
    questions.push({
      id: `fc-en-${c.id}`, source: "flashcard-en",
      prompt: c.en, correct: c.de,
      options: shuffle([c.de, ...wrong]),
    });
  }

  // NVV: match verb to collocation
  for (const nvv of NOUN_VERB_COLLOCATIONS) {
    const expression = `___ ${nvv.noun}`;
    const wrongVerbs = pickN(
      ["sleep", "arrive", "vanish", "exist"],
      3
    );
    if (wrongVerbs.length < 3) continue;
    questions.push({
      id: `nvv-${nvv.verb}-${nvv.noun}`, source: "nvv",
      prompt: `Which verb completes "${expression}"?`,
      correct: nvv.verb,
      options: shuffle([nvv.verb, ...wrongVerbs]),
      explanation: nvv.meaning,
    });
  }

  // Verb+Preposition
  for (const vp of VERB_PREPOSITIONS) {
    const pattern = `${vp.verb} ${vp.preposition}`;
    const wrong = pickN(Array.from(new Set(VERB_PREPOSITIONS.map(x => `${x.verb} ${x.preposition}`))).filter(x => x !== pattern && !x.startsWith(`${vp.verb} `)), 3);
    if (wrong.length < 3) continue;
    questions.push({
      id: `vp-${vp.verb}`, source: "verb-prep",
      prompt: `Which verb pattern means "${vp.meaning}"?`,
      correct: pattern,
      options: shuffle([pattern, ...wrong]),
      explanation: `${vp.meaning}. Example: ${vp.example}`,
    });
  }

  // Conjugation: pick correct form
  const PRONOUNS = ["I", "you", "he/she/it", "we", "they"];
  const PRONOUN_INDEX: Record<string, number> = { "I": 0, "you": 1, "he/she/it": 2, "we": 3, "they": 4 };
  for (const verb of pickN(VERBS, 10)) {
    const pronoun = pickN(PRONOUNS, 1)[0];
    const idx = PRONOUN_INDEX[pronoun] ?? 0;
    const correct = verb.present[idx];
    const wrong = shuffle(
      Array.from(new Set([...verb.present, verb.past, verb.pastParticiple, verb.presentParticiple])).filter(form => form !== correct)
    ).slice(0, 3);
    questions.push({
      id: `conj-${verb.infinitive}-${pronoun}`, source: "conjugation",
      prompt: `${pronoun} ___ (${verb.infinitive}, Present Simple)`,
      correct,
      options: shuffle([correct, ...wrong]),
      explanation: verb.english,
    });
  }

  return shuffle(questions.filter(q => new Set(q.options).size === q.options.length && q.options.length >= 3));
}

const SOURCE_LABELS: Record<QuestionSource, string> = {
  "flashcard-de": "Vocabulary",
  "flashcard-en": "Vocabulary",
  nvv: "Noun-Verb Combos",
  "verb-prep": "Verbs + Prepositions",
  conjugation: "Conjugation",
};

function getKCTip(source: QuestionSource): { tip: string; suggest: string } {
  if (source === "flashcard-de" || source === "flashcard-en") return { tip: "Build vocabulary through spaced repetition. Associate each word with a mental image or a sentence context. Try to learn words in phrases, not isolation.", suggest: "Use the Flashcards section and Vocabulary trainer for daily practice." };
  if (source === "nvv") return { tip: "Noun-Verb Combinations (collocations) are fixed pairings (e.g. make a decision, take responsibility). Memorize them as single units, not word by word.", suggest: "Review Collocations and Noun-Verb Combinations in the Practice Hub." };
  if (source === "verb-prep") return { tip: "Many English verbs require a specific preposition (e.g. depend on, insist on, look forward to). Memorize verbs WITH their prepositions as one unit!", suggest: "Practice with the Verbs with Prepositions trainer in Practice Hub." };
  if (source === "conjugation") return { tip: "English regular verbs take -s/-es for 3rd person singular (he/she/it). Irregular verbs change form in past and past participle (e.g. go/went/gone).", suggest: "Practice with the Conjugation trainer and Irregular Verbs tables." };
  return { tip: "Review the grammar rule behind this question. Break the sentence down: find the subject, verb, and objects.", suggest: "Practice with relevant exercises in the Practice Hub." };
}

export function KnowledgeCheck() {
  const { addXP } = useProgress();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [results, setResults] = useState<{ q: string; correct: boolean }[]>([]);
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");

  useEffect(() => {
    setQuestions(buildQuestions());
  }, []);

  const current = questions[index];
  const isCorrect = selected === current?.correct;
  const correctCount = results.filter((r) => r.correct).length;
  const accuracy = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0;

  function handleSelect(opt: string) {
    if (selected !== null) return;
    setSelected(opt);
    if (opt === current.correct) playCorrect();
    else playWrong();
    setResults((r) => [...r, { q: current.id, correct: opt === current.correct }]);
  }

  function handleNext() {
    if (index + 1 >= ROUND_SIZE) {
      setPhase("done");
      const xp = correctCount * 5 + (accuracy >= 80 ? 10 : 0);
      addXP(xp);
      playXP();
      return;
    }
    setSelected(null);
    setIndex((i) => i + 1);
  }

  function handleRestart() {
    setQuestions(buildQuestions());
    setIndex(0);
    setSelected(null);
    setResults([]);
    setPhase("ready");
  }

  // Filter to only ROUND_SIZE questions
  const round = useMemo(() => questions.slice(0, ROUND_SIZE), [questions]);

  if (phase === "ready" && round.length > 0) {
    return (
      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-10 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <Brain className="w-14 h-14 text-[var(--color-primary)] mx-auto mb-4" />
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Knowledge Check</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2 max-w-sm mx-auto">
          Mixed questions from vocabulary, noun-verb combos, verbs with prepositions, and conjugation
        </p>
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {(["flashcard-de", "nvv", "verb-prep", "conjugation"] as const).map((s) => (
            <span key={s} className="text-[10px] font-semibold bg-[var(--color-primary-subtle)] text-[var(--color-text-link)] px-2.5 py-1 rounded-[var(--radius-pill)]">{SOURCE_LABELS[s]}</span>
          ))}
        </div>
        <p className="text-xs text-[var(--color-text-disabled)] mt-4">{ROUND_SIZE} questions per round</p>
        <button
          onClick={() => setPhase("playing")}
          className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-2 shadow-[0_4px_0_rgba(28,176,246,0.3)]"
        >
          <Target className="w-4 h-4" /> Start
        </button>
      </div>
    );
  }

  if (phase === "done") {
    return (
      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-10 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <span className="text-5xl block mb-4">{accuracy >= 80 ? "🎉" : accuracy >= 50 ? "💪" : "📚"}</span>
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Round complete!</h2>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div>
            <p className="text-3xl font-display font-extrabold text-[var(--color-success)]">{correctCount}<span className="text-lg text-[var(--color-text-disabled)]">/{ROUND_SIZE}</span></p>
            <p className="text-xs text-[var(--color-text-secondary)]">Correct</p>
          </div>
          <div className="w-px h-10 bg-[var(--color-border-default)]" />
          <div>
            <p className="text-3xl font-display font-extrabold text-[var(--color-text-link)]">{accuracy}%</p>
            <p className="text-xs text-[var(--color-text-secondary)]">Accuracy</p>
          </div>
        </div>
        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold bg-amber-500 text-[var(--color-on-brand)] font-extrabold shadow-sm px-4 py-2 rounded-[10px]">
          <Sparkles className="w-4 h-4" /> +{correctCount * 5 + (accuracy >= 80 ? 10 : 0)} XP
        </div>
        <div className="mt-6 space-y-1.5 max-w-sm mx-auto">
          {results.map((r, i) => (
            <div key={i} className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-[var(--radius-md)] ${r.correct ? "bg-[var(--color-success)] text-[var(--color-on-brand)] " : "bg-[var(--color-error)] text-[var(--color-on-brand)]"}`}>
              {r.correct ? <CheckCircle2 className="w-3 h-3 shrink-0" /> : <XCircle className="w-3 h-3 shrink-0" />}
              <span className="truncate">Q{i + 1}</span>
            </div>
          ))}
        </div>
        <button
          onClick={handleRestart}
          className="mt-6 px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> New round
        </button>
      </div>
    );
  }

  if (!current) return null;

  const pct = ((index + 1) / ROUND_SIZE) * 100;

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-primary-subtle)] px-3 py-1 text-xs font-semibold text-[var(--color-text-link)]">
          <Brain className="w-3 h-3" />
          {index + 1}/{ROUND_SIZE}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-[10px] bg-[var(--color-surface-alt)] px-3 py-1 text-xs font-semibold text-[var(--color-text-secondary)]">
          <BarChart3 className="w-3 h-3" />
          {correctCount}/{results.length}
        </span>
      </div>

      <div className="w-full h-1.5 rounded-[var(--radius-pill)] bg-[var(--color-surface-alt)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }} animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3 }}
          className="h-full rounded-[var(--radius-pill)] bg-[var(--color-primary)]"
        />
      </div>

      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-6 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[var(--color-text-disabled)] mb-3 px-2.5 py-1 rounded-[var(--radius-pill)] bg-[var(--color-surface-alt)]">
          {SOURCE_LABELS[current.source]}
        </span>
        <p className="font-display text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-5">{current.prompt}</p>

        <div className="space-y-2">
          {current.options.map((opt) => {
            let cls = "bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:ring-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)]";
            if (selected === opt && opt === current.correct) cls = "bg-[var(--color-success)] text-[var(--color-on-brand)] ring-2 ring-emerald-400";
            else if (selected === opt && opt !== current.correct) cls = "bg-[var(--color-error)] text-[var(--color-on-brand)] ring-2 ring-red-300";
            else if (selected !== null && opt === current.correct) cls = "bg-[var(--color-success-bg)] ring-1 ring-[var(--color-success)] text-[var(--color-text-success)]";

            return (
              <motion.button
                key={opt} layout initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => handleSelect(opt)} disabled={selected !== null}
                className={`flex items-center gap-2 w-full px-4 py-3 rounded-[14px] text-sm font-medium transition-all ${cls}`}
              >
                {selected !== null && opt === current.correct && <CheckCircle2 className="w-4 h-4 text-current shrink-0" />}
                {selected === opt && opt !== current.correct && <XCircle className="w-4 h-4 text-current shrink-0" />}
                <span>{opt}</span>
              </motion.button>
            );
          })}
        </div>

        {selected !== null && current.explanation && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4 text-xs text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] rounded-[12px] p-3">
            {current.explanation}
          </motion.div>
        )}

        {selected !== null && selected !== current.correct && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-3 space-y-2">
            <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning)] text-[var(--color-on-brand)] ring-1 ring-[var(--color-warning)]">
              <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-warning)]" />
              <div>
                <p className="font-semibold text-sm">Astuce (Tip)</p>
                <p className="text-sm mt-1">{getKCTip(current.source).tip}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info)] text-[var(--color-on-brand)] ring-1 ring-[var(--color-info)]">
              <BookOpen className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-info)]" />
              <div>
                <p className="font-semibold text-sm">Suggestion</p>
                <p className="text-sm mt-1">{getKCTip(current.source).suggest}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {selected !== null && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center">
          <button
            onClick={handleNext}
            className="px-8 py-3 rounded-[14px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-brand-600 transition-all shadow-[0_4px_0_rgba(28,176,246,0.3)]"
          >
            {index + 1 >= ROUND_SIZE ? "See results" : "Next"}
          </button>
        </motion.div>
      )}
    </div>
  );
}

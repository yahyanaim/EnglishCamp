"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { useErrors } from "@/store/useErrors";
import { playCorrect, playWrong } from "@/lib/audio";
import { SpecialCharsKeyboard } from "@/components/ui/AccentsKeyboard";
import { SpeakerButton } from "@/components/ui/SpeakerButton";
import { Lightbulb, BookOpen } from "lucide-react";

type Pronoun = "I" | "you" | "he/she/it" | "we" | "you (pl)" | "they";

type VerbEntry = {
  infinitive: string;
  en: string;
  conjugations: Record<Pronoun, string>;
};

const VERBS: VerbEntry[] = [
  { infinitive: "be", en: "to be", conjugations: { "I": "am", "you": "are", "he/she/it": "is", "we": "are", "you (pl)": "are", "they": "are" } },
  { infinitive: "have", en: "to have", conjugations: { "I": "have", "you": "have", "he/she/it": "has", "we": "have", "you (pl)": "have", "they": "have" } },
  { infinitive: "do", en: "to do", conjugations: { "I": "do", "you": "do", "he/she/it": "does", "we": "do", "you (pl)": "do", "they": "do" } },
  { infinitive: "go", en: "to go", conjugations: { "I": "go", "you": "go", "he/she/it": "goes", "we": "go", "you (pl)": "go", "they": "go" } },
  { infinitive: "say", en: "to say", conjugations: { "I": "say", "you": "say", "he/she/it": "says", "we": "say", "you (pl)": "say", "they": "say" } },
  { infinitive: "make", en: "to make", conjugations: { "I": "make", "you": "make", "he/she/it": "makes", "we": "make", "you (pl)": "make", "they": "make" } },
  { infinitive: "take", en: "to take", conjugations: { "I": "take", "you": "take", "he/she/it": "takes", "we": "take", "you (pl)": "take", "they": "take" } },
  { infinitive: "come", en: "to come", conjugations: { "I": "come", "you": "come", "he/she/it": "comes", "we": "come", "you (pl)": "come", "they": "come" } },
  { infinitive: "see", en: "to see", conjugations: { "I": "see", "you": "see", "he/she/it": "sees", "we": "see", "you (pl)": "see", "they": "see" } },
  { infinitive: "eat", en: "to eat", conjugations: { "I": "eat", "you": "eat", "he/she/it": "eats", "we": "eat", "you (pl)": "eat", "they": "eat" } },
  { infinitive: "drink", en: "to drink", conjugations: { "I": "drink", "you": "drink", "he/she/it": "drinks", "we": "drink", "you (pl)": "drink", "they": "drink" } },
  { infinitive: "read", en: "to read", conjugations: { "I": "read", "you": "read", "he/she/it": "reads", "we": "read", "you (pl)": "read", "they": "read" } },
  { infinitive: "write", en: "to write", conjugations: { "I": "write", "you": "write", "he/she/it": "writes", "we": "write", "you (pl)": "write", "they": "write" } },
  { infinitive: "speak", en: "to speak", conjugations: { "I": "speak", "you": "speak", "he/she/it": "speaks", "we": "speak", "you (pl)": "speak", "they": "speak" } },
  { infinitive: "live", en: "to live", conjugations: { "I": "live", "you": "live", "he/she/it": "lives", "we": "live", "you (pl)": "live", "they": "live" } },
  { infinitive: "work", en: "to work", conjugations: { "I": "work", "you": "work", "he/she/it": "works", "we": "work", "you (pl)": "work", "they": "work" } },
  { infinitive: "study", en: "to study", conjugations: { "I": "study", "you": "study", "he/she/it": "studies", "we": "study", "you (pl)": "study", "they": "study" } },
  { infinitive: "teach", en: "to teach", conjugations: { "I": "teach", "you": "teach", "he/she/it": "teaches", "we": "teach", "you (pl)": "teach", "they": "teach" } },
  { infinitive: "help", en: "to help", conjugations: { "I": "help", "you": "help", "he/she/it": "helps", "we": "help", "you (pl)": "help", "they": "help" } },
  { infinitive: "like", en: "to like", conjugations: { "I": "like", "you": "like", "he/she/it": "likes", "we": "like", "you (pl)": "like", "they": "like" } },
];

const PRONOUNS: Pronoun[] = ["I", "you", "he/she/it", "we", "you (pl)", "they"];

function getConjTip(verb: VerbEntry, pronoun: Pronoun): { tip: string; suggest: string } {
  const inf = verb.infinitive;
  const conj = verb.conjugations[pronoun];
  const isToBe = inf === "be";
  const isToHave = inf === "have";
  const isToDo = inf === "do";

  if (isToBe) return { tip: "IRREGULAR: to be = I am, you are, he/she/it is, we are, you (pl) are, they are. This is the most important verb in English — memorize all forms!", suggest: "Review 'to be' in the Conjugation trainer and practice with flashcards." };
  if (isToHave) return { tip: "IRREGULAR: to have = I have, you have, he/she/it has, we have, you (pl) have, they have. Only he/she/it changes to 'has'.", suggest: "Practice 'to have' with the Conjugation trainer — focus on he/she/it form." };
  if (isToDo) return { tip: "IRREGULAR: to do = I do, you do, he/she/it does, we do, you (pl) do, they do. Note the he/she/it form changes to 'does'.", suggest: "Review 'to do' — it's used for questions and negatives too!" };

  if (pronoun === "he/she/it") return { tip: `For he/she/it, regular verbs add -s or -es: ${inf} → ${conj}. Verbs ending in -s, -sh, -ch, -x, -o add -es.`, suggest: `Practice all six pronoun forms in the Conjugation trainer.` };
  if (pronoun === "you (pl)") return { tip: `In English, 'you' (singular) and 'you' (plural) use the same form: ${inf} → ${conj}. No difference!`, suggest: `Practice all six pronoun forms in the Conjugation trainer.` };

  return { tip: `Regular "${inf}" conjugation: ${pronoun} → ${conj}. In English, only the he/she/it form changes (adds -s). All other forms stay the same as the base verb.`, suggest: "Practice with the Conjugation trainer in Practice Hub for more verbs." };
}

export function ConjugationTrainer() {
  const { completeExercise } = useProgress();
  const { addError } = useErrors();

  const [pool, setPool] = useState<{ verb: VerbEntry; pronoun: Pronoun }[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [input, setInput] = useState("");
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const qs: { verb: VerbEntry; pronoun: Pronoun }[] = [];
    const shuffledVerbs = [...VERBS].sort(() => Math.random() - 0.5);
    for (const verb of shuffledVerbs.slice(0, 8)) {
      const pronoun = PRONOUNS[Math.floor(Math.random() * PRONOUNS.length)];
      qs.push({ verb, pronoun });
    }
    setPool(qs);
  }, []);

  const item = pool[current];

  function handleSubmit() {
    if (answered || !item) return;
    const correct = input.trim().toLowerCase() === item.verb.conjugations[item.pronoun].toLowerCase();
    setIsCorrect(correct);
    setAnswered(true);
    setTotal((t) => t + 1);
    if (correct) {
      setScore((s) => s + 1);
      playCorrect();
    } else {
      playWrong();
      addError({
        question: `Conjugate "${item.verb.infinitive}" for "${item.pronoun}"`,
        userAnswer: input.trim(),
        correctAnswer: item.verb.conjugations[item.pronoun],
        explanation: `${item.pronoun} ${item.verb.conjugations[item.pronoun]} (${item.verb.en})`,
        source: "conjugation",
        sourceId: `conj-${item.verb.infinitive}-${item.pronoun}`,
      });
    }
  }

  function next() {
    if (!item) return;
    if (isCorrect) completeExercise(`conj-${item.verb.infinitive}-${item.pronoun}`, 5);
    if (current + 1 >= pool.length) {
      setDone(true);
    } else {
      setCurrent((c) => c + 1);
      setInput("");
      setAnswered(false);
      setIsCorrect(false);
    }
  }

  function restart() {
    const qs: { verb: VerbEntry; pronoun: Pronoun }[] = [];
    const shuffledVerbs = [...VERBS].sort(() => Math.random() - 0.5);
    for (const verb of shuffledVerbs.slice(0, 8)) {
      const pronoun = PRONOUNS[Math.floor(Math.random() * PRONOUNS.length)];
      qs.push({ verb, pronoun });
    }
    setPool(qs);
    setCurrent(0);
    setScore(0);
    setTotal(0);
    setInput("");
    setAnswered(false);
    setIsCorrect(false);
    setDone(false);
  }

  if (done) {
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "💪"}</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Conjugation Practice Done!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)] mb-1">{score}/{total} correct ({pct}%)</p>
        <button onClick={restart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-4">
          Play Again 🔄
        </button>
      </div>
    );
  }

  if (!item) return null;

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--color-success)] uppercase tracking-wider">Conjugation Trainer</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{current + 1} / {pool.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-[var(--color-text-secondary)]">Conjugate:</span>
            <span className="text-lg font-display font-extrabold text-[var(--color-text-primary)]">{item.verb.infinitive}</span>
            <SpeakerButton text={item.verb.infinitive} />
            <span className="text-xs text-[var(--color-text-disabled)] italic">({item.verb.en})</span>
          </div>

          <div className="flex items-center gap-2 text-lg">
            <span className="font-semibold text-[var(--color-primary-dark)]">{item.pronoun}</span>
            <div className="flex-1 flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !answered && handleSubmit()}
                disabled={answered}
                placeholder="type conjugation..."
                className={`flex-1 px-3 py-2 rounded-[var(--radius-lg)] border font-mono text-center text-sm bg-[var(--color-surface-alt)] outline-none transition-all ${
                  answered
                    ? isCorrect
                      ? "border-[var(--color-success)] bg-emerald-500 text-white font-bold"
                      : "border-red-300 bg-red-500 text-white font-bold"
                    : "border-[var(--color-border-default)] text-[var(--color-text-primary)] focus:border-[var(--color-primary)] focus:ring-2 focus:ring-brand-100"
                }`}
              />
              <SpecialCharsKeyboard onInsert={(c) => setInput((p) => p + c)} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {!answered && (
        <button
          onClick={handleSubmit}
          disabled={!input.trim()}
          className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Check ✓
        </button>
      )}

      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3"
        >
          {isCorrect ? (
            <p className="text-sm font-medium text-[var(--color-success)]">✓ Correct! +5 XP</p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm font-medium text-[var(--color-error)]">✗ Correct: {item.pronoun} {item.verb.conjugations[item.pronoun]}</p>

              <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning)] text-white ring-1 ring-[var(--color-warning)]">
                <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-warning)]" />
                <div>
                  <p className="font-semibold text-sm">Astuce (Tip)</p>
                  <p className="text-sm mt-1">{getConjTip(item.verb, item.pronoun).tip}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info)] text-white ring-1 ring-[var(--color-info)]">
                <BookOpen className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-info)]" />
                <div>
                  <p className="font-semibold text-sm">Suggestion</p>
                  <p className="text-sm mt-1">{getConjTip(item.verb, item.pronoun).suggest}</p>
                </div>
              </div>
            </div>
          )}
          <div className="mt-3">
            <button
              onClick={next}
              className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all"
            >
              {current + 1 >= pool.length ? "See Results" : "Next →"}
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

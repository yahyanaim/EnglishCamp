"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { playCorrect, playWrong } from "@/lib/audio";
import { SpeakerButton } from "@/components/ui/SpeakerButton";
import { Shuffle, Lightbulb, BookOpen } from "lucide-react";

type SentenceEntry = {
  sentence: string;
  hint: string;
};

const SENTENCES: SentenceEntry[] = [
  { sentence: "My name is Max.", hint: "Introduce yourself" },
  { sentence: "Where do you come from?", hint: "Asking about origin" },
  { sentence: "How are you today?", hint: "Greeting someone" },
  { sentence: "I come from London.", hint: "Talking about where you are from" },
  { sentence: "This is a book.", hint: "Pointing to an object" },
  { sentence: "The dog is big.", hint: "Describing an animal" },
  { sentence: "She has a cat.", hint: "Talking about pets" },
  { sentence: "We are going home.", hint: "Talking about movement" },
  { sentence: "Can you help me?", hint: "Asking for assistance" },
  { sentence: "I have no time.", hint: "Saying you are busy" },
  { sentence: "The weather is nice today.", hint: "Talking about the weather" },
  { sentence: "He lives in London.", hint: "Talking about where someone lives" },
  { sentence: "We eat dinner together.", hint: "Talking about meals" },
  { sentence: "She speaks English very well.", hint: "Describing language ability" },
  { sentence: "I must go now.", hint: "Saying you need to leave" },
  { sentence: "Can I have a glass of water?", hint: "Making a polite request" },
  { sentence: "The food tastes excellent.", hint: "Complimenting food" },
  { sentence: "He gave me a present.", hint: "Talking about gifts" },
  { sentence: "We are going on vacation tomorrow.", hint: "Talking about plans" },
  { sentence: "I have been learning English for a year.", hint: "Talking about learning" },
];

function getSentenceTip(sentence: string): { tip: string; suggest: string } {
  const s = sentence.toLowerCase();
  if (s.startsWith("i ") || s.startsWith("you ") || s.startsWith("he ") || s.startsWith("she ") || s.startsWith("it ") || s.startsWith("we ") || s.startsWith("they ")) {
    if (s.includes("?")) return { tip: "Questions in English: for to be, put the verb first: 'Are you...?' For other verbs, use do/does: 'Do you like...?'", suggest: "Practice question formation in the Questions lesson." };
    if (s.includes("must") || s.includes("can") || s.includes("may") || s.includes("should") || s.includes("will")) return { tip: "Modal verbs: the modal comes before the main verb. Example: 'I can speak English.' No to after modals.", suggest: "Practice modal verbs with the Modal Verbs trainer." };
    return { tip: "In English sentences, the subject comes first, then the verb, then the object. Example: 'She eats an apple.'", suggest: "Review basic sentence structure in the Sentence Structure lesson." };
  }
  if (s.includes("?")) return { tip: "Yes/no questions start with the verb (to be) or do/does. Wh-questions start with the question word: 'Where do you live?'", suggest: "Practice question formation in the Questions lesson." };
  if (s.includes("have") || s.includes("has")) return { tip: "Present perfect tense: have/has + past participle. 'He has given me a present.'", suggest: "Review present perfect tense in the Tenses lesson." };
  if (s.split(" ").length >= 5) return { tip: "Longer English sentences follow this order: subject + verb + indirect object + direct object + place + time. 'I gave my friend a book yesterday.'", suggest: "Practice advanced word order with the Word Order trainer." };
  return { tip: "English word order: subject + verb + object. Adjectives come before nouns: 'a big house.' Adverbs can go after the verb.", suggest: "Review the Sentence Structure lesson for more practice." };
}

export function SentenceBuilder() {
  const { completeExercise } = useProgress();

  const [shuffled, setShuffled] = useState<string[][]>([]);
  const [pool, setPool] = useState<SentenceEntry[]>([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [tiles, setTiles] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const shuffledPool = [...SENTENCES].sort(() => Math.random() - 0.5).slice(0, 8);
    setPool(shuffledPool);
    initRound(shuffledPool[0]);
  }, []);

  function initRound(entry: SentenceEntry) {
    const words = entry.sentence.split(" ");
    const shuffledWords = [...words].sort(() => Math.random() - 0.5);
    setTiles(shuffledWords);
    setSelected([]);
    setAnswered(false);
    setCorrect(false);
  }

  function selectTile(word: string, index: number) {
    if (answered) return;
    setSelected((prev) => [...prev, word]);
    setTiles((prev) => prev.filter((_, i) => i !== index));
  }

  function undoLast() {
    if (answered || selected.length === 0) return;
    const last = selected[selected.length - 1];
    setSelected((prev) => prev.slice(0, -1));
    setTiles((prev) => [...prev, last]);
  }

  function handleSubmit() {
    if (answered || !pool[current]) return;
    const answer = selected.join(" ");
    const isCorrect = answer === pool[current].sentence;
    setCorrect(isCorrect);
    setAnswered(true);
    if (isCorrect) {
      setScore((s) => s + 1);
      playCorrect();
    } else {
      playWrong();
    }
  }

  function next() {
    if (correct) completeExercise(`sentence-${current}`, 10);
    if (current + 1 >= pool.length) {
      setDone(true);
    } else {
      const nextIdx = current + 1;
      setCurrent(nextIdx);
      initRound(pool[nextIdx]);
    }
  }

  function restart() {
    const shuffledPool = [...SENTENCES].sort(() => Math.random() - 0.5).slice(0, 8);
    setPool(shuffledPool);
    setCurrent(0);
    setScore(0);
    setAnswered(false);
    setCorrect(false);
    setDone(false);
    initRound(shuffledPool[0]);
  }

  if (done) {
    const pct = pool.length > 0 ? Math.round((score / pool.length) * 100) : 0;
    return (
      <div className="text-center py-8">
        <span className="text-5xl block mb-3">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "💪"}</span>
        <h3 className="text-xl font-display font-extrabold text-[var(--color-text-primary)] mb-1">Sentence Builder Complete!</h3>
        <p className="text-lg font-display font-extrabold text-[var(--color-primary-dark)] mb-1">{score}/{pool.length} correct ({pct}%)</p>
        <button onClick={restart} className="text-sm font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-5 py-2 rounded-[var(--radius-lg)] hover:bg-[var(--color-primary)] transition-all mt-4">
          Play Again 🔄
        </button>
      </div>
    );
  }

  if (!pool[current]) return null;

  return (
    <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-6 shadow-sm" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-[var(--color-warning)] uppercase tracking-wider">Sentence Builder</span>
        <span className="text-xs text-[var(--color-text-disabled)]">{current + 1} / {pool.length}</span>
      </div>

      <div className="flex items-center gap-2 mb-4 text-sm text-[var(--color-text-secondary)]">
        <Shuffle className="w-3.5 h-3.5" />
        <span>Arrange the words to form a correct English sentence</span>
      </div>

      <p className="text-xs text-[var(--color-text-disabled)] italic mb-4">{pool[current].hint}</p>

      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {/* Selected area */}
          <div className="min-h-[48px] bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--color-border-default)] p-2 mb-3 flex flex-wrap gap-1.5">
            {selected.map((word, i) => (
              <span key={`sel-${i}`} className="px-2.5 py-1.5 bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] text-sm font-medium rounded-[var(--radius-md)] border border-[var(--color-primary)]">
                {word}
              </span>
            ))}
          </div>

          {/* Tiles */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {tiles.map((word, i) => (
              <motion.button
                key={`tile-${i}`}
                initial={{ scale: 1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => selectTile(word, i)}
                className="px-3 py-1.5 bg-[var(--color-surface)] text-[var(--color-text-primary)] text-sm font-medium rounded-[var(--radius-md)] border border-[var(--color-border-default)] hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-subtle)] shadow-sm transition-all"
              >
                {word}
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={undoLast}
              disabled={selected.length === 0 || answered}
              className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] px-3 py-1.5 rounded-[var(--radius-md)] border border-[var(--color-border-default)] hover:bg-[var(--color-surface-alt)] transition-all disabled:opacity-50"
            >
              ← Undo
            </button>
            <button
              onClick={() => initRound(pool[current])}
              disabled={answered}
              className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] px-3 py-1.5 rounded-[var(--radius-md)] border border-[var(--color-border-default)] hover:bg-[var(--color-surface-alt)] transition-all disabled:opacity-50"
            >
              Reset
            </button>
            {!answered && (
              <button
                onClick={handleSubmit}
                disabled={selected.length === 0}
                className="text-xs font-medium bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-4 py-1.5 rounded-[var(--radius-md)] hover:bg-[var(--color-primary)] transition-all ml-auto disabled:opacity-50"
              >
                Check ✓
              </button>
            )}
          </div>

          {answered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              {correct ? (
                <div className="p-3 rounded-[var(--radius-lg)] border text-sm">
                  <p className="font-medium text-[var(--color-success)] mb-1">✓ Correct! +10 XP</p>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="p-3 rounded-[var(--radius-lg)] border text-sm">
                    <p className="font-medium text-[var(--color-error)] mb-1">✗ Not quite</p>
                    <div className="flex items-center gap-2 text-[var(--color-text-secondary)]">
                      <span className="font-medium">Correct:</span>
                      <span>{pool[current].sentence}</span>
                      <SpeakerButton text={pool[current].sentence} />
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning)] text-white ring-1 ring-[var(--color-warning)]">
                    <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-warning)]" />
                    <div>
                      <p className="font-semibold text-sm">Astuce (Tip)</p>
                      <p className="text-sm mt-1">{getSentenceTip(pool[current].sentence).tip}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info)] text-white ring-1 ring-[var(--color-info)]">
                    <BookOpen className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-info)]" />
                    <div>
                      <p className="font-semibold text-sm">Suggestion</p>
                      <p className="text-sm mt-1">{getSentenceTip(pool[current].sentence).suggest}</p>
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

"use client";
import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { useProgress } from "@/store/useProgress";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { speak } from "@/lib/audio";
import { Check, Copy, Share2, Users, Zap, Trophy, RotateCcw, Send, ExternalLink, Volume2, Lightbulb, BookOpen } from "lucide-react";

type Challenge = {
  id: string;
  creator: string;
  words: { de: string; en: string }[];
  createdAt: string;
};

type ChallengeResult = {
  challengeId: string;
  score: number;
  total: number;
  completedAt: string;
};

const WORDS_POOL = [
  { de: "der Hund", en: "dog" },
  { de: "die Katze", en: "cat" },
  { de: "das Haus", en: "house" },
  { de: "der Baum", en: "tree" },
  { de: "das Buch", en: "book" },
  { de: "der Tisch", en: "table" },
  { de: "die Blume", en: "flower" },
  { de: "die Sonne", en: "sun" },
  { de: "die Lampe", en: "lamp" },
  { de: "das Fenster", en: "window" },
  { de: "der Stuhl", en: "chair" },
  { de: "die Tür", en: "door" },
  { de: "das Wasser", en: "water" },
  { de: "das Brot", en: "bread" },
  { de: "der Apfel", en: "apple" },
  { de: "die Milch", en: "milk" },
  { de: "der Zug", en: "train" },
  { de: "die Stadt", en: "city" },
  { de: "das Jahr", en: "year" },
  { de: "der Freund", en: "friend" },
];

function generateId() {
  return Math.random().toString(36).substring(2, 10);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ChallengePage() {
  const { addXP, xp } = useProgress();
  const [mode, setMode] = useState<"create" | "solve" | "done">("create");
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [results, setResults] = useState<ChallengeResult[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [copied, setCopied] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("englishcamp-challenge-results");
    if (stored) {
      try { setResults(JSON.parse(stored)); } catch {}
    }

    const params = new URLSearchParams(window.location.search);
    const data = params.get("c");
    if (data) {
      try {
        const decoded = JSON.parse(atob(data));
        setChallenge(decoded);
        setMode("solve");
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (results.length > 0) {
      localStorage.setItem("englishcamp-challenge-results", JSON.stringify(results));
    }
  }, [results]);

  const createChallenge = useCallback(() => {
    const picked = shuffle(WORDS_POOL).slice(0, 10);
    const c: Challenge = {
      id: generateId(),
      creator: "You",
      words: picked,
      createdAt: new Date().toISOString(),
    };
    setChallenge(c);

    const encoded = btoa(JSON.stringify(c));
    const url = `${window.location.origin}/challenge?c=${encoded}`;

    return url;
  }, []);

  const handleCreate = () => {
    const url = createChallenge();
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmitAnswer = () => {
    if (!challenge) return;
    const word = challenge.words[currentWordIndex];
    const isCorrect = inputValue.trim().toLowerCase() === word.en.toLowerCase();
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore((s) => s + 1);

    setTimeout(() => {
      if (currentWordIndex < challenge.words.length - 1) {
        setCurrentWordIndex((i) => i + 1);
        setInputValue("");
        setFeedback(null);
      } else {
        const total = challenge.words.length;
        const xpGained = score * 5 + (isCorrect ? 5 : 0);
        setEarnedXP(xpGained);
        addXP(xpGained);
        setMode("done");
        setResults((r) => [...r, {
          challengeId: challenge.id,
          score: score + (isCorrect ? 1 : 0),
          total,
          completedAt: new Date().toISOString(),
        }]);
      }
    }, 1200);
  };

  if (mode === "done" && challenge) {
    return (
      <PageWrapper>
        <div className="text-center py-12 space-y-6">
          <div className="w-16 h-16 rounded-[var(--radius-lg)] bg-[var(--color-success)] text-white flex items-center justify-center mx-auto">
            <Trophy className="w-8 h-8 text-[var(--color-success)]" />
          </div>
          <h2 className="text-2xl font-display font-extrabold text-[var(--color-text-primary)]">Challenge Complete!</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xs mx-auto">
            <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border-2 border-[var(--color-border-default)]">
              <p className="text-2xl font-display font-extrabold text-[var(--color-success)]">{score}</p>
              <p className="text-[10px] text-[var(--color-text-disabled)]">Correct</p>
            </div>
            <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border-2 border-[var(--color-border-default)]">
              <p className="text-2xl font-display font-extrabold text-[var(--color-error)]">{challenge.words.length - score}</p>
              <p className="text-[10px] text-[var(--color-text-disabled)]">Wrong</p>
            </div>
            <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border-2 border-[var(--color-border-default)]">
              <p className="text-2xl font-display font-extrabold text-[var(--color-primary-dark)]">+{earnedXP}</p>
              <p className="text-[10px] text-[var(--color-text-disabled)]">XP</p>
            </div>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {score === challenge.words.length ? "Perfect score! 🎉" : score >= challenge.words.length / 2 ? "Good job! Keep practicing." : "Try again to improve your score."}
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setMode("create"); setChallenge(null); setCurrentWordIndex(0); setInputValue(""); setScore(0); setFeedback(null); setEarnedXP(0); }} className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white rounded-[var(--radius-lg)] font-semibold text-sm hover:bg-slate-700 transition-colors">
              <RotateCcw className="w-4 h-4" /> New Challenge
            </button>
            <button onClick={handleCreate} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)] font-semibold text-sm hover:bg-brand-600 transition-colors">
              <Share2 className="w-4 h-4" /> Share & Challenge Friend
            </button>
          </div>

          {results.length > 1 && (
            <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border-2 border-[var(--color-border-default)]">
              <p className="text-xs font-bold text-[var(--color-text-secondary)] mb-2">Past Results</p>
              <div className="space-y-1">
                {results.slice(-5).reverse().map((r, i) => (
                  <div key={i} className="flex justify-between text-xs text-[var(--color-text-secondary)]">
                    <span>#{results.length - i}</span>
                    <span>{r.score}/{r.total} ({Math.round((r.score / r.total) * 100)}%)</span>
                    <span className="text-[var(--color-text-disabled)]">{new Date(r.completedAt).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </PageWrapper>
    );
  }

  if (mode === "solve" && challenge) {
    const word = challenge.words[currentWordIndex];
    return (
      <PageWrapper>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-xl font-extrabold text-[var(--color-text-primary)]">Partner Challenge</h1>
              <p className="text-sm text-[var(--color-text-secondary)]">From {challenge.creator}</p>
            </div>
            <Badge variant="info">{currentWordIndex + 1}/{challenge.words.length}</Badge>
          </div>

          <div className="w-full h-1.5 rounded-full bg-[var(--color-surface-alt)] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[var(--color-primary)]"
              initial={{ width: 0 }}
              animate={{ width: `${((currentWordIndex) / challenge.words.length) * 100}%` }}
            />
          </div>

          <motion.div
            key={currentWordIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-8 shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] border-2 border-[var(--color-border-default)] text-center" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
          >
            <p className="text-xs font-semibold text-[var(--color-text-disabled)] uppercase tracking-wider mb-2">English</p>
            <p className="text-3xl font-display font-extrabold text-[var(--color-text-primary)] mb-2">{word.de}</p>
            <button onClick={() => speak(word.de)} className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-disabled)] hover:text-[var(--color-primary)] transition-colors mb-6">
              <Volume2 className="w-3.5 h-3.5" /> Listen
            </button>

            <div className="space-y-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && inputValue.trim() && !feedback && handleSubmitAnswer()}
                placeholder="Type the English translation..."
                className="w-full px-4 py-3 rounded-[var(--radius-lg)] text-sm border-2 border-[var(--color-border-default)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                autoFocus
                disabled={!!feedback}
              />
              <button
                onClick={handleSubmitAnswer}
                disabled={!inputValue.trim() || !!feedback}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)] font-semibold hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" /> Submit
              </button>
            </div>

            {feedback && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 space-y-2"
              >
                <div className={`p-3 rounded-[var(--radius-lg)] text-sm font-semibold ${
                  feedback === "correct" ? "bg-[var(--color-success)] text-white" : "bg-[var(--color-error)] text-white text-red-700"
                }`}>
                  {feedback === "correct" ? "✓ Correct!" : `✗ Wrong — ${word.en}`}
                </div>

                {feedback === "wrong" && (
                  <>
                    <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning)] text-white ring-1 ring-amber-200 text-[var(--color-warning)]">
                      <Lightbulb className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-warning)]" />
                      <div>
                        <p className="font-semibold text-sm">Astuce (Tip)</p>
                        <p className="text-sm mt-1">Always learn new words with their article! <strong>{word.de}</strong> — try connecting it to a mental image or a phrase you already know.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info)] text-white ring-1 ring-blue-200 text-[var(--color-info)]">
                      <BookOpen className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-info)]" />
                      <div>
                        <p className="font-semibold text-sm">Suggestion</p>
                        <p className="text-sm mt-1">Review this word in the Vocabulary or Flashcards section. Practice with a friend to make it stick!</p>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="max-w-xl mx-auto space-y-6">
        <div className="bg-gradient-to-br from-violet-500 to-violet-700 rounded-[var(--radius-lg)] p-8 text-white shadow-lg">
          <Users className="w-10 h-10 mb-3 text-violet-200" />
          <h1 className="font-display text-2xl font-extrabold mb-1">Partner Challenges</h1>
          <p className="text-violet-100 text-sm">Challenge a friend to an English vocab duel</p>
        </div>

        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-primary-subtle)] flex items-center justify-center">
                <Share2 className="w-5 h-5 text-[var(--color-primary-dark)]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--color-text-primary)]">Create a Challenge</p>
                <p className="text-xs text-[var(--color-text-disabled)]">Generate a 10-word vocab challenge and share the link</p>
              </div>
            </div>
            <button onClick={handleCreate} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)] font-semibold hover:bg-brand-600 transition-colors">
              <Zap className="w-4 h-4" /> Create & Copy Link
            </button>

            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-[var(--color-success)] text-white rounded-[var(--radius-lg)] text-xs text-[var(--color-success)] font-medium"
              >
                <Check className="w-4 h-4" /> Link copied! Share it with a friend.
              </motion.div>
            )}
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-warning)] text-white flex items-center justify-center">
                <Trophy className="w-5 h-5 text-[var(--color-warning)]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--color-text-primary)]">How it works</p>
                <p className="text-xs text-[var(--color-text-disabled)]">Quick guide to partner challenges</p>
              </div>
            </div>
            <ul className="space-y-2 text-xs text-[var(--color-text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-dark)] flex items-center justify-center flex-shrink-0 text-[10px] font-bold">1</span>
                Click &ldquo;Create &amp; Copy Link&rdquo; to generate a challenge
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-dark)] flex items-center justify-center flex-shrink-0 text-[10px] font-bold">2</span>
                Share the link with a friend via chat or email
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-dark)] flex items-center justify-center flex-shrink-0 text-[10px] font-bold">3</span>
                They open the link and translate 10 English words to your language
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[var(--color-primary)] text-[var(--color-primary-dark)] flex items-center justify-center flex-shrink-0 text-[10px] font-bold">4</span>
                Compare scores and see who remembers more vocabulary!
              </li>
            </ul>
          </div>
        </Card>

        {results.length > 0 && (
          <Card>
            <p className="text-sm font-bold text-[var(--color-text-primary)] mb-3 border-l-4 border-[var(--color-primary)] pl-3">Your History</p>
            <div className="space-y-2">
              {results.slice(-5).reverse().map((r, i) => (
                <div key={i} className="flex items-center justify-between bg-[var(--color-surface-alt)] rounded-[var(--radius-lg)] p-3">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-[var(--color-warning)]" />
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">{r.score}/{r.total}</span>
                    <span className="text-xs text-[var(--color-text-disabled)]">({Math.round((r.score / r.total) * 100)}%)</span>
                  </div>
                  <span className="text-[10px] text-[var(--color-text-disabled)]">{new Date(r.completedAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </PageWrapper>
  );
}

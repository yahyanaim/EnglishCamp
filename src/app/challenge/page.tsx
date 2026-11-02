"use client";
import { learnerStorage } from "@/lib/learnerStorage";

import { CHALLENGE_WORDS } from "@/data/challenge-words";
import { encodeChallenge, decodeChallenge, matchesChallengeMeaning, type PartnerChallenge } from "@/lib/challengeLink";
import { PageBanner } from "@/components/ui/PageBanner";
import { LearningArt } from "@/components/brand/LearningArt";
import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { useProgress } from "@/store/useProgress";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { speak } from "@/lib/audio";
import { Check, Copy, Share2, Users, Zap, Trophy, RotateCcw, Send, ExternalLink, Volume2, Lightbulb, BookOpen } from "lucide-react";

type Challenge = PartnerChallenge;

type ChallengeResult = {
  challengeId: string;
  score: number;
  total: number;
  completedAt: string;
};

const WORDS_POOL = CHALLENGE_WORDS;

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
  const [linkError, setLinkError] = useState(false);
  const [createdLink, setCreatedLink] = useState("");
  const advanceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (advanceRef.current) clearTimeout(advanceRef.current); }, []);
  const [copied, setCopied] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  useEffect(() => {
    const stored = learnerStorage.getItem("englishcamp-challenge-results");
    if (stored) {
      try { setResults(JSON.parse(stored)); } catch {}
    }

    const params = new URLSearchParams(window.location.search);
    const data = params.get("c");
    if (data) {
      try {
        const decoded = decodeChallenge(data);
        if (decoded) { setChallenge(decoded); setMode("solve"); } else setLinkError(true);
      } catch {}
    }
  }, []);

  useEffect(() => {
    if (results.length > 0) {
      learnerStorage.setItem("englishcamp-challenge-results", JSON.stringify(results));
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

    const encoded = encodeChallenge(c);
    const url = `${window.location.origin}/challenge?c=${encoded}`;

    setCreatedLink(url);
    return url;
  }, []);

  const handleCreate = async () => {
    const url = createChallenge();
    try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 3000); } catch { setCopied(false); }
  };

  const handleSubmitAnswer = () => {
    if (!challenge || feedback) return;
    const word = challenge.words[currentWordIndex];
    const isCorrect = matchesChallengeMeaning(word, inputValue);
    setFeedback(isCorrect ? "correct" : "wrong");
    if (isCorrect) setScore((s) => s + 1);

    advanceRef.current = setTimeout(() => {
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
          <div className="w-16 h-16 rounded-[var(--radius-lg)] bg-[var(--color-success-bg)] text-[var(--color-text-success)] flex items-center justify-center mx-auto">
            <LearningArt name="Trophy" size={32} className="w-8 h-8 text-[var(--color-text-success)]" />
          </div>
          <h2 className="text-2xl font-display font-extrabold text-[var(--color-text-primary)]">Challenge Complete!</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xs mx-auto">
            <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border border-[var(--color-border-default)]">
              <p className="text-2xl font-display font-extrabold text-[var(--color-text-success)]">{score}</p>
              <p className="text-[10px] text-[var(--color-text-secondary)]">Correct</p>
            </div>
            <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border border-[var(--color-border-default)]">
              <p className="text-2xl font-display font-extrabold text-[var(--color-text-error)]">{challenge.words.length - score}</p>
              <p className="text-[10px] text-[var(--color-text-secondary)]">Wrong</p>
            </div>
            <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border border-[var(--color-border-default)]">
              <p className="text-2xl font-display font-extrabold text-[var(--color-text-link)]">+{earnedXP}</p>
              <p className="text-[10px] text-[var(--color-text-secondary)]">XP</p>
            </div>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {score === challenge.words.length ? "Perfect score! 🎉" : score >= challenge.words.length / 2 ? "Good job! Keep practicing." : "Try again to improve your score."}
          </p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => { setMode("create"); setChallenge(null); setCurrentWordIndex(0); setInputValue(""); setScore(0); setFeedback(null); setEarnedXP(0); }} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--camp-purple)] text-white rounded-[var(--radius-lg)] font-semibold text-sm hover:bg-[var(--camp-purple-hover)] transition-colors">
              <RotateCcw className="w-4 h-4" /> New Challenge
            </button>
            <button onClick={handleCreate} className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-[var(--color-on-brand)] rounded-[var(--radius-lg)] font-semibold text-sm hover:bg-[var(--color-primary-hover)] transition-colors">
              <Share2 className="w-4 h-4" /> Share & Challenge Friend
            </button>
          </div>

          {results.length > 1 && (
            <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border border-[var(--color-border-default)]">
              <p className="text-xs font-bold text-[var(--color-text-secondary)] mb-2">Past Results</p>
              <div className="space-y-1">
                {results.slice(-5).reverse().map((r, i) => (
                  <div key={i} className="flex justify-between text-xs text-[var(--color-text-secondary)]">
                    <span>#{results.length - i}</span>
                    <span>{r.score}/{r.total} ({Math.round((r.score / r.total) * 100)}%)</span>
                    <span className="text-[var(--color-text-secondary)]">{new Date(r.completedAt).toLocaleDateString()}</span>
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
            className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08),0_1px_3px_rgba(0,0,0,0.05)] border border-[var(--color-border-default)] text-center" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
          >
            <p className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wider mb-2">English</p>
            <p className="text-3xl font-display font-extrabold text-[var(--color-text-primary)] mb-2">{word.de}</p>
            <button onClick={() => speak(word.de)} className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors mb-6">
              <Volume2 className="w-3.5 h-3.5" /> Listen
            </button>

            <div className="space-y-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && inputValue.trim() && !feedback && handleSubmitAnswer()}
                placeholder="Type the Arabic meaning..."
                lang="ar" dir="auto"
                className="w-full px-4 py-3 rounded-[var(--radius-lg)] text-sm border border-[var(--color-border-default)] focus:ring-2 focus:ring-[var(--color-primary)] outline-none"
                autoFocus
                disabled={!!feedback}
              />
              <button
                onClick={handleSubmitAnswer}
                disabled={!inputValue.trim() || !!feedback}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-[var(--color-on-brand)] rounded-[var(--radius-lg)] font-semibold hover:bg-[var(--color-primary-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                  feedback === "correct" ? "bg-[var(--color-success-bg)] text-[var(--color-text-success)]" : "bg-[var(--color-error-bg)] text-[var(--color-text-error)] text-[var(--color-text-error)]"
                }`}>
                  {feedback === "correct" ? "✓ Correct!" : `✗ Wrong — ${word.en}`}
                </div>

                {feedback === "wrong" && (
                  <>
                    <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] ring-1 ring-amber-200 text-[var(--color-text-warning)]">
                      <LearningArt name="Lightbulb" size={20} className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-text-warning)]" />
                      <div>
                        <p className="font-semibold text-sm">Tip</p>
                        <p className="text-sm mt-1">Learn each word in a useful sentence. <strong>{word.de}</strong> — try connecting it to a mental image or a phrase you already know.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-[var(--radius-lg)] bg-[var(--color-info-bg)] text-[var(--color-text-info)] ring-1 ring-blue-200 text-[var(--color-text-info)]">
                      <LearningArt name="BookOpen" size={20} className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-text-info)]" />
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
      <div className="camp-partner-challenge space-y-6">
        <PageBanner><h1>Partner Challenges</h1><p>Create a vocabulary challenge to practise with a friend.</p></PageBanner>

        {linkError && <p role="alert" className="camp-challenge-link-note">This link is invalid or uses an older language bank. Create a new English challenge below.</p>}
        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-primary-subtle)] flex items-center justify-center">
                <Share2 className="w-5 h-5 text-[var(--color-text-link)]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--color-text-primary)]">Create a Challenge</p>
                <p className="text-xs text-[var(--color-text-secondary)]">Generate a 10-word vocab challenge and share the link</p>
              </div>
            </div>
            <button onClick={handleCreate} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-[var(--color-on-brand)] rounded-[var(--radius-lg)] font-semibold hover:bg-[var(--color-primary-hover)] transition-colors">
              <LearningArt name="Zap" size={16} className="w-4 h-4" /> Create & Copy Link
            </button>

            {createdLink && <label className="camp-challenge-share-link">Challenge link<input readOnly value={createdLink} onFocus={event => event.target.select()} /></label>}
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 p-3 bg-[var(--color-success-bg)] text-[var(--color-text-success)] rounded-[var(--radius-lg)] text-xs text-[var(--color-text-success)] font-medium"
              >
                <Check className="w-4 h-4" /> Link copied! Share it with a friend.
              </motion.div>
            )}
          </div>
        </Card>

        <Card>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[var(--radius-lg)] bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] flex items-center justify-center">
                <LearningArt name="Trophy" size={20} className="w-5 h-5 text-[var(--color-text-warning)]" />
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--color-text-primary)]">How it works</p>
                <p className="text-xs text-[var(--color-text-secondary)]">Quick guide to partner challenges</p>
              </div>
            </div>
            <ul className="space-y-2 text-xs text-[var(--color-text-secondary)]">
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[var(--camp-purple)] text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold">1</span>
                Click &ldquo;Create &amp; Copy Link&rdquo; to generate a challenge
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[var(--camp-purple)] text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold">2</span>
                Share the link with a friend via chat or email
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[var(--camp-purple)] text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold">3</span>
                They open the link and translate 10 English words into Arabic
              </li>
              <li className="flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-[var(--camp-purple)] text-white flex items-center justify-center flex-shrink-0 text-[10px] font-bold">4</span>
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
                    <LearningArt name="Trophy" size={16} className="w-4 h-4 text-[var(--color-text-warning)]" />
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">{r.score}/{r.total}</span>
                    <span className="text-xs text-[var(--color-text-secondary)]">({Math.round((r.score / r.total) * 100)}%)</span>
                  </div>
                  <span className="text-[10px] text-[var(--color-text-secondary)]">{new Date(r.completedAt).toLocaleDateString()}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </PageWrapper>
  );
}

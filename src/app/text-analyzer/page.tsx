"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { FileText, Hash, Type, AlignLeft, PieChart, BarChart3, Sparkles, RotateCcw, BookOpen } from "lucide-react";

function countSyllables(word: string): number {
  const vowels = word.match(/[aeiouAEIOU]/g);
  return vowels ? vowels.length : 1;
}

function isEnglishArticle(word: string): boolean {
  return ["a", "an", "the"].includes(word.toLowerCase());
}

function isEnglishPreposition(word: string): boolean {
  return ["about", "above", "across", "after", "against", "along", "among", "around", "at", "before", "behind", "below", "beneath", "beside", "between", "beyond", "by", "down", "during", "except", "for", "from", "in", "inside", "into", "like", "near", "of", "off", "on", "onto", "out", "outside", "over", "past", "through", "throughout", "to", "toward", "under", "underneath", "until", "up", "upon", "with", "within", "without"].includes(word.toLowerCase());
}

function isEnglishConjunction(word: string): boolean {
  return ["and", "or", "but", "because", "so", "if", "when", "while", "although", "though", "unless", "since", "after", "before", "until", "as", "than", "whether", "yet", "nor", "once", "whereas", "wherever", "whenever"].includes(word.toLowerCase());
}

function isEnglishModalVerb(word: string): boolean {
  return ["can", "could", "may", "might", "must", "shall", "should", "will", "would"].includes(word.toLowerCase());
}

export default function TextAnalyzerPage() {
  const [text, setText] = useState("");

  const analysis = useMemo(() => {
    if (!text.trim()) return null;

    const clean = text.trim();
    const chars = clean.length;
    const words = clean.split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const sentences = clean.split(/[.!?]+/).filter(Boolean);
    const sentenceCount = sentences.length;
    const avgWordLength = wordCount > 0 ? Math.round((chars / wordCount) * 10) / 10 : 0;
    const avgSyllablesPerWord = wordCount > 0 ? Math.round((words.reduce((s, w) => s + countSyllables(w), 0) / wordCount) * 10) / 10 : 0;
    const avgWordsPerSentence = sentenceCount > 0 ? Math.round((wordCount / sentenceCount) * 10) / 10 : 0;
    const uniqueWords = new Set(words.map((w) => w.toLowerCase().replace(/[^a-z]/g, ""))).size;

    const articles = words.filter(isEnglishArticle).length;
    const prepositions = words.filter(isEnglishPreposition).length;
    const conjunctions = words.filter(isEnglishConjunction).length;
    const modals = words.filter(isEnglishModalVerb).length;

    const sentenceFeatures: string[] = [];
    if (words.length >= 2 && ["what", "where", "when", "why", "how", "who", "whose", "whom", "do", "does", "did", "is", "are", "was", "were", "have", "has", "had", "will", "would", "can", "could", "should", "may", "might", "must"].includes(words[0].toLowerCase())) {
      sentenceFeatures.push("Question or inverted structure detected");
    }
    if (words.length >= 3 && words[words.length - 1].endsWith(".")) {
      sentenceFeatures.push("Declarative sentence ending");
    }

    let difficulty: string;
    if (avgWordsPerSentence < 10 && avgSyllablesPerWord < 1.5) difficulty = "A1 — Beginner";
    else if (avgWordsPerSentence < 15 && avgSyllablesPerWord < 1.8) difficulty = "A2 — Elementary";
    else if (avgWordsPerSentence < 20 && avgSyllablesPerWord < 2.1) difficulty = "B1 — Intermediate";
    else if (avgWordsPerSentence < 25) difficulty = "B2 — Upper Intermediate";
    else difficulty = "C1+ — Advanced";

    return {
      wordCount, chars, sentenceCount, avgWordLength, avgSyllablesPerWord,
      avgWordsPerSentence, uniqueWords, articles, prepositions, conjunctions, modals,
      difficulty, sentenceFeatures, words,
    };
  }, [text]);

  return (
    <PageWrapper>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <LearningArt name="FileText" className="w-6 h-6 text-[var(--color-primary)]" />
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Text Analyzer</h1>
        </div>
        <p className="text-sm text-[var(--color-text-secondary)]">Paste text to analyze its complexity and structure</p>
      </motion.div>

      <div className="mt-6 space-y-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text here..."
          rows={8}
          className="w-full bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-4 text-sm text-[var(--color-text-primary)] outline-none focus:ring-2 focus:ring-brand-100 focus:border-brand-300 shadow-sm resize-y transition-all"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-[var(--color-text-secondary)]">{analysis?.wordCount ?? 0} words, {analysis?.chars ?? 0} characters</p>
          {text && (
            <button onClick={() => setText("")} className="text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-secondary)] transition-colors flex items-center gap-1">
              <RotateCcw className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {analysis && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
            <div className="camp-analyzer-difficulty">
              <div className="flex items-center gap-2 mb-1">
                <LearningArt name="Sparkles" size={20} className="w-5 h-5" />
                <span className="text-sm font-semibold">Estimated Difficulty</span>
              </div>
              <p className="text-2xl font-display font-extrabold">{analysis.difficulty}</p>
              <p className="text-sm mt-1">
                Based on avg sentence length ({analysis.avgWordsPerSentence} words) and avg syllables per word ({analysis.avgSyllablesPerWord})
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Hash, label: "Words", value: analysis.wordCount.toString() },
                { icon: Type, label: "Characters", value: analysis.chars.toString() },
                { icon: AlignLeft, label: "Sentences", value: analysis.sentenceCount.toString() },
                { icon: BarChart3, label: "Unique Words", value: `${analysis.uniqueWords} (${Math.round((analysis.uniqueWords / analysis.wordCount) * 100)}%)` },
              ].map((s) => (
                <div key={s.label} className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <LearningArt name={s.icon.displayName || "book"} className="w-4 h-4 text-[var(--color-primary)]" />
                    <span className="text-xs text-[var(--color-text-secondary)]">{s.label}</span>
                  </div>
                  <p className="text-lg font-bold text-[var(--color-text-primary)]">{s.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-[var(--color-primary)]" />
                Grammar Structure Detected
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Articles", value: analysis.articles, color: "bg-[var(--color-info-bg)]" },
                  { label: "Prepositions", value: analysis.prepositions, color: "bg-[var(--color-success-bg)]" },
                  { label: "Conjunctions", value: analysis.conjunctions, color: "bg-[#9B59B6]" },
                  { label: "Modal Verbs", value: analysis.modals, color: "bg-[var(--color-warning-bg)]" },
                ].map((s) => {
                  const pct = analysis.wordCount > 0 ? Math.round((s.value / analysis.wordCount) * 100) : 0;
                  return (
                    <div key={s.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[var(--color-text-secondary)]">{s.label}</span>
                        <span className="text-[var(--color-text-secondary)]">{s.value} ({pct}%)</span>
                      </div>
                      <div className="w-full h-2 bg-[var(--color-surface-alt)] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${s.color} transition-all duration-500`} style={{ width: `${Math.min(pct, 100)}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {analysis.sentenceFeatures.length > 0 && (
              <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2 flex items-center gap-2">
                  <LearningArt name="BookOpen" className="w-4 h-4 text-[var(--color-primary)]" />
                  Sentence Structure Analysis
                </h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.sentenceFeatures.map((f, i) => (
                    <span key={i} className="camp-analyzer-feature">{f}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 shadow-sm">
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Readability Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div><span className="text-[var(--color-text-secondary)]">Avg word length:</span> <span className="font-semibold text-[var(--color-text-primary)]">{analysis.avgWordLength} chars</span></div>
                <div><span className="text-[var(--color-text-secondary)]">Avg syllables/word:</span> <span className="font-semibold text-[var(--color-text-primary)]">{analysis.avgSyllablesPerWord}</span></div>
                <div><span className="text-[var(--color-text-secondary)]">Avg words/sentence:</span> <span className="font-semibold text-[var(--color-text-primary)]">{analysis.avgWordsPerSentence}</span></div>
                <div><span className="text-[var(--color-text-secondary)]">Lexical diversity:</span> <span className="font-semibold text-[var(--color-text-primary)]">{Math.round((analysis.uniqueWords / analysis.wordCount) * 100)}%</span></div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}

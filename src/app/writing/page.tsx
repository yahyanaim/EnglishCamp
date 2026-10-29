"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { WRITING_PROMPTS, type WritingPrompt } from "@/data/writing";
import { useProgress } from "@/store/useProgress";
import { levels } from "@/data/content";
import { playCorrect, playXP } from "@/lib/audio";
import { FileText, Lightbulb, AlertCircle, RotateCcw, Send, ChevronDown, ChevronUp, CheckCircle2, Clock, Sparkles, ArrowLeft } from "lucide-react";

const TYPE_LABELS: Record<string, string> = {
  essay: "Essays", email: "Emails", letter: "Letters", description: "Descriptions",
  argumentation: "Arguments", summary: "Summaries", report: "Reports", dialogue: "Dialogues",
};

const TYPE_ICONS: Record<string, string> = {
  essay: "📝", email: "✉️", letter: "📨", description: "🖼️",
  argumentation: "💬", summary: "📋", report: "📊", dialogue: "🎭",
};

function countWords(text: string): number {
  return text.trim() ? text.trim().split(/\s+/).length : 0;
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03 } },
};

const itemAnim = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0, 0, 0.2, 1] } },
};

export default function WritingPage() {
  const { addXP } = useProgress();
  const [text, setText] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState<WritingPrompt | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showCorrection, setShowCorrection] = useState(false);
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [showHints, setShowHints] = useState(true);

  const types = Array.from(new Set(WRITING_PROMPTS.map((p) => p.type)));

  const filtered = useMemo(() => {
    return WRITING_PROMPTS.filter((p) => {
      if (levelFilter !== "all" && p.levelId !== levelFilter) return false;
      if (typeFilter !== "all" && p.type !== typeFilter) return false;
      return true;
    });
  }, [levelFilter, typeFilter]);

  const wordCount = countWords(text);
  const wordStatus = selectedPrompt
    ? wordCount < selectedPrompt.wordCount.min
      ? "too-short"
      : wordCount > selectedPrompt.wordCount.max
      ? "extended"
      : "good"
    : "none";
  const canSubmit = Boolean(selectedPrompt && wordCount >= selectedPrompt.wordCount.min && text.trim().length > 0);

  function handleSelect(prompt: WritingPrompt) {
    setSelectedPrompt(prompt);
    setText("");
    setSubmitted(false);
    setShowCorrection(false);
    setShowHints(true);
  }

  function handleSubmit() {
    if (!selectedPrompt) return;
    if (wordCount < selectedPrompt.wordCount.min || !text.trim()) return;
    setSubmitted(true);
    playCorrect();
    playXP();
    const baseXP = selectedPrompt.levelId === "band4-5" ? 20 : selectedPrompt.levelId === "band5-6" ? 30 : selectedPrompt.levelId === "band6-7" ? 40 : 50;
    addXP(baseXP);
  }

  function handleReset() {
    setSelectedPrompt(null);
    setText("");
    setSubmitted(false);
  }

  return (
    <PageWrapper>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
        {/* Header */}
        <motion.div variants={itemAnim} className="flex items-center gap-3">
          <div className="inline-flex items-center justify-center w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-amethyst)]" style={{ background: "#9B59B6" }}>
            <FileText className="w-4.5 h-4.5 text-white" />
          </div>
          <div>
            <h1 className="font-display font-extrabold text-[var(--color-text-primary)]" style={{ fontSize: "26px", letterSpacing: "0.3px" }}>
              Writing Practice
            </h1>
            <p className="font-body text-sm text-[var(--color-text-secondary)] mt-0.5">Practice your English writing with guided prompts</p>
          </div>
        </motion.div>

        {!selectedPrompt ? (
          <>
            {/* Filters */}
            <motion.div variants={itemAnim} className="flex flex-wrap gap-2 items-center">
              <select value={levelFilter} onChange={(e) => setLevelFilter(e.target.value)}
                className="max-w-full min-w-0 font-body text-sm bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] rounded-[var(--radius-md)] px-3 py-2.5 outline-none text-[var(--color-text-primary)] transition-all duration-150"
                style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}>
                <option value="all">All Levels</option>
                {levels.map((lv) => <option key={lv.id} value={lv.id}>{lv.title}</option>)}
              </select>
              <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
                className="max-w-full min-w-0 font-body text-sm bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] rounded-[var(--radius-md)] px-3 py-2.5 outline-none text-[var(--color-text-primary)] transition-all duration-150"
                style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}>
                <option value="all">All Types</option>
                {types.map((t) => <option key={t} value={t}>{TYPE_LABELS[t] || t}</option>)}
              </select>
              <span className="font-body text-xs text-[var(--color-text-secondary)] ml-auto">{filtered.length} prompts</span>
            </motion.div>

            {/* Prompts grid */}
            <motion.div variants={itemAnim} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map((prompt, i) => (
                <motion.button
                  key={prompt.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(prompt)}
                  className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border-2 border-[var(--color-border-default)] transition-all duration-200 hover:border-[var(--color-border-strong)]"
                  style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{TYPE_ICONS[prompt.type] || "📄"}</span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-bold text-sm text-[var(--color-text-primary)]">{prompt.titleEn}</h3>
                        {prompt.titleAr && <p className="text-xs font-arabic text-[var(--color-text-secondary)]" lang="ar">{prompt.titleAr}</p>}
                        <span className="font-display font-extrabold text-[10px] uppercase text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-1.5 py-0.5 rounded-[var(--radius-pill)]">{prompt.levelId.toUpperCase()}</span>
                      </div>
                      <p className="font-body text-xs text-[var(--color-text-secondary)] mt-0.5">{prompt.titleDe}</p>
                      <p className="font-body text-xs text-[var(--color-text-disabled)] mt-1">{prompt.wordCount.min}–{prompt.wordCount.max} words · {TYPE_LABELS[prompt.type]}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {prompt.tags.slice(0, 3).map((t) => (
                          <span key={t} className="font-body text-[10px] font-semibold text-[var(--color-primary-dark)] bg-[var(--color-primary-subtle)] px-1.5 py-0.5 rounded-[var(--radius-pill)]">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={selectedPrompt.id} variants={itemAnim} className="space-y-5">
              {/* Back & title */}
              <div className="flex items-center justify-between">
                <div>
                  <button onClick={handleReset}
                    className="inline-flex items-center gap-1.5 font-display font-extrabold text-sm px-4 py-2 rounded-[var(--radius-md)] border-2 border-[var(--color-border-default)] text-[var(--color-text-primary)] bg-[var(--color-surface)] transition-all duration-150 hover:border-[var(--color-border-strong)] active:translate-y-0.5 mb-2"
                    style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}>
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <h2 className="font-display font-extrabold text-lg text-[var(--color-text-primary)]">{selectedPrompt.titleEn}</h2>
                  {selectedPrompt.titleAr && <p className="font-body text-sm text-[var(--color-text-secondary)]" lang="ar">{selectedPrompt.titleAr}</p>}
                  <p className="font-body text-sm text-[var(--color-text-secondary)]">{selectedPrompt.titleDe}</p>
                </div>
                <span className="font-display font-extrabold text-[10px] uppercase text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-2 py-1 rounded-[var(--radius-pill)]">{selectedPrompt.levelId.toUpperCase()}</span>
              </div>

              {/* Instructions */}
              <div className="bg-[var(--color-info-bg)] rounded-[var(--radius-lg)] p-4 border-2 border-[var(--color-info)]" style={{ boxShadow: "0 3px 0 var(--color-info)" }}>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-[var(--color-info)] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-display font-extrabold text-sm text-[var(--color-info-dark)]">Instructions</p>
                    <p className="font-body text-sm text-[var(--color-text-primary)] mt-1">{selectedPrompt.instructions}</p>
                    {selectedPrompt.instructionsAr && <p className="font-body text-sm text-[var(--color-text-primary)] font-arabic mt-1" lang="ar">{selectedPrompt.instructionsAr}</p>}
                  </div>
                </div>
              </div>

              {/* Hints */}
              <div>
                <button onClick={() => setShowHints(!showHints)}
                  className="flex items-center gap-2 font-display font-bold text-sm text-[var(--color-warning-dark)] hover:text-[var(--color-warning)] transition-colors">
                  <Lightbulb className="w-4 h-4" />
                  {showHints ? "Hide" : "Show"} hints ({selectedPrompt.hints.length})
                  {showHints ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>
                <AnimatePresence>
                  {showHints && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="mt-2 space-y-1.5">
                        {selectedPrompt.hints.map((hint, i) => (
                          <div key={i} className="flex items-start gap-2 font-body text-sm text-[var(--color-warning-dark)] bg-[var(--color-warning-bg)] rounded-[var(--radius-md)] px-3 py-2 border border-[var(--color-warning)]/30">
                            <span className="font-display font-extrabold text-[var(--color-warning)] shrink-0">{i + 1}.</span>
                            <div>
                              <span>{hint}</span>
                              {selectedPrompt.hintsAr?.[i] && <p className="text-sm text-[var(--color-warning-dark)] font-arabic mt-0.5" lang="ar">{selectedPrompt.hintsAr[i]}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => { if (!submitted) setText(e.target.value); }}
                  placeholder="Write your text here..."
                  disabled={submitted}
                  rows={10}
                  className="w-full bg-[var(--color-surface)] border-2 border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-4 font-body text-sm text-[var(--color-text-primary)] outline-none transition-all duration-150 resize-y disabled:bg-[var(--color-surface-alt)] disabled:text-[var(--color-text-disabled)]"
                  style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}
                  onFocus={(e) => { e.target.style.borderColor = "var(--color-border-focus)"; e.target.style.boxShadow = "0 2px 0 var(--color-border-focus), 0 0 0 3px rgba(28,176,246,0.15)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "var(--color-border-default)"; e.target.style.boxShadow = "0 2px 0 var(--color-border-default)"; }}
                />
                <div className="flex items-center justify-between mt-2 px-1">
                  <div className="flex items-center gap-3 font-body text-xs">
                    {selectedPrompt && (
                      <>
                        <span className="text-[var(--color-text-disabled)]">Min requirement: {selectedPrompt.wordCount.min} words (Target: {selectedPrompt.wordCount.min}–{selectedPrompt.wordCount.max})</span>
                        <span className={`font-bold ${
                          wordStatus === "good" ? "text-[var(--color-success-dark)]" : wordStatus === "extended" ? "text-[var(--color-primary)]" : "text-[var(--color-warning-dark)]"
                        }`}>
                          <Clock className="w-3.5 h-3.5 inline mr-1" />
                          {wordCount} words
                        </span>
                        {wordStatus === "too-short" && <span className="text-[var(--color-warning-dark)] font-medium">({selectedPrompt.wordCount.min - wordCount} more words needed to submit)</span>}
                        {wordStatus === "extended" && <span className="text-[var(--color-primary)] flex items-center gap-1 font-medium"><CheckCircle2 className="w-3.5 h-3.5" /> Well developed response (exceeds {selectedPrompt.wordCount.min} min)</span>}
                        {wordStatus === "good" && <span className="text-[var(--color-success-dark)] flex items-center gap-1 font-medium"><CheckCircle2 className="w-3.5 h-3.5" /> Target length met</span>}
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {text && !submitted && (
                      <button onClick={() => setText("")} className="font-body text-xs text-[var(--color-text-disabled)] hover:text-[var(--color-text-secondary)] transition-colors flex items-center gap-1">
                        <RotateCcw className="w-3 h-3" /> Clear
                      </button>
                    )}
                    {!submitted && (
                      <button
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                        className="inline-flex items-center gap-1.5 font-display font-extrabold text-xs bg-[var(--color-primary)] text-white px-5 py-2.5 rounded-[var(--radius-md)] border-2 border-[var(--color-primary-dark)] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 active:translate-y-0.5"
                        style={{ boxShadow: canSubmit ? "0 3px 0 var(--color-primary-dark)" : undefined }}
                      >
                        <Send className="w-3.5 h-3.5" /> Submit Response
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Correction */}
              <div>
                <div className="flex gap-2">
                  {!showCorrection ? (
                    <button onClick={() => setShowCorrection(true)}
                      className="inline-flex items-center gap-1.5 font-display font-extrabold text-sm px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-success-bg)] text-[var(--color-success-dark)] border-2 border-[var(--color-success)] transition-all duration-150 active:translate-y-0.5"
                      style={{ boxShadow: "0 3px 0 var(--color-success)" }}>
                      <Sparkles className="w-4 h-4" /> Show correction
                    </button>
                  ) : (
                    <button onClick={() => setShowCorrection(false)}
                      className="inline-flex items-center gap-1.5 font-display font-extrabold text-sm px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-warning-bg)] text-[var(--color-warning-dark)] border-2 border-[var(--color-warning)] transition-all duration-150 active:translate-y-0.5"
                      style={{ boxShadow: "0 3px 0 var(--color-warning)" }}>
                      Hide correction
                    </button>
                  )}
                </div>
                <AnimatePresence>
                  {showCorrection && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mt-4">
                      <div className="bg-[var(--color-success-bg)] rounded-[var(--radius-lg)] border-2 border-[var(--color-success)] p-5" style={{ boxShadow: "0 3px 0 var(--color-success)" }}>
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-4 h-4 text-[var(--color-success)]" />
                          <h4 className="font-display font-extrabold text-xs text-[var(--color-success-dark)] uppercase tracking-wider">Model Answer</h4>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <p className="font-display font-bold text-xs text-[var(--color-success-dark)] mb-1">DE</p>
                            <p className="font-body text-sm text-[var(--color-text-primary)] whitespace-pre-wrap leading-relaxed">{selectedPrompt.correction.de}</p>
                          </div>
                          <div>
                            <p className="font-display font-bold text-xs text-[var(--color-success-dark)] mb-1">EN</p>
                            <p className="font-body text-sm text-[var(--color-text-secondary)] italic whitespace-pre-wrap leading-relaxed">{selectedPrompt.correction.en}</p>
                            {selectedPrompt.correction.ar && <p className="font-body text-sm text-[var(--color-text-secondary)] italic whitespace-pre-wrap leading-relaxed font-arabic mt-1" lang="ar">{selectedPrompt.correction.ar}</p>}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submitted state */}
              <AnimatePresence>
                {submitted && (
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-[var(--color-success-bg)] rounded-[var(--radius-lg)] border-2 border-[var(--color-success)] p-5" style={{ boxShadow: "0 3px 0 var(--color-success)" }}>
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-6 h-6 text-[var(--color-success)] shrink-0" />
                      <div>
                        <h3 className="font-display font-extrabold text-sm text-[var(--color-success-dark)]">Submission received!</h3>
                        <p className="font-body text-sm text-[var(--color-text-primary)] mt-1">
                          Great work! You wrote <strong>{wordCount} words</strong> on &ldquo;{selectedPrompt.titleEn}&rdquo;.
                        </p>
                        <div className="flex flex-wrap gap-4 mt-3 font-body text-xs">
                          <div className="flex items-center gap-1.5 text-[var(--color-success-dark)]">
                            <CheckCircle2 className="w-4 h-4" /> Word count target met
                          </div>
                          <div className="flex items-center gap-1.5 text-[var(--color-success-dark)]">
                            <Sparkles className="w-4 h-4" /> XP awarded
                          </div>
                          <span className="font-display font-extrabold text-[var(--color-success-dark)]">+{
                            selectedPrompt.levelId === "band4-5" ? 20 : selectedPrompt.levelId === "band5-6" ? 30 : selectedPrompt.levelId === "band6-7" ? 40 : 50
                          } XP</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border-2 border-[var(--color-border-default)]" style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}>
                      <p className="font-display font-bold text-xs text-[var(--color-text-secondary)] mb-2">Your text:</p>
                      <p className="font-body text-sm text-[var(--color-text-primary)] whitespace-pre-wrap leading-relaxed">{text}</p>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button onClick={handleReset}
                        className="inline-flex items-center gap-1.5 font-display font-extrabold text-sm px-4 py-2 rounded-[var(--radius-md)] border-2 border-[var(--color-border-default)] text-[var(--color-text-primary)] bg-[var(--color-surface)] transition-all duration-150 active:translate-y-0.5"
                        style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}>
                        Try another prompt
                      </button>
                      <button onClick={() => { setSubmitted(false); }}
                        className="inline-flex items-center gap-1.5 font-display font-extrabold text-sm px-5 py-2.5 rounded-[var(--radius-md)] bg-[var(--color-primary)] text-white border-2 border-[var(--color-primary-dark)] transition-all duration-150 active:translate-y-0.5"
                        style={{ boxShadow: "0 3px 0 var(--color-primary-dark)" }}>
                        Revise this text
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </PageWrapper>
  );
}

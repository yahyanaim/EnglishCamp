"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { SelectField } from "@/components/ui/shadcn/select-field";
import { Button } from "@/components/ui/shadcn/button";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { WRITING_PROMPTS, type WritingPrompt } from "@/data/writing";
import { useProgress } from "@/store/useProgress";
import { levels } from "@/data/content";
import { playCorrect, playXP } from "@/lib/audio";
import { RotateCcw, Send, ChevronDown, ChevronUp, CheckCircle2, ArrowLeft, ArrowUpRight } from "lucide-react";

const TYPE_LABELS: Record<string, string> = {
  essay: "Essays", email: "Emails", letter: "Letters", description: "Descriptions",
  argumentation: "Arguments", summary: "Summaries", report: "Reports", dialogue: "Dialogues",
};

const TYPE_ICONS: Record<string, string> = {
  essay: "note", email: "chat", letter: "document", description: "book",
  argumentation: "compare", summary: "plan", report: "table", dialogue: "chat",
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
      <motion.div variants={container} initial="hidden" animate="show" className="camp-writing space-y-6">
        {/* Header */}
        <motion.div variants={itemAnim} className="flex items-center gap-3">
          <div className="camp-writing-symbol">
            <LearningArt name="note" size={22} />
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
            <motion.div variants={itemAnim} className="camp-writing-filters">
              <SelectField value={levelFilter} onValueChange={value => setLevelFilter(value)}
                aria-label="Filter writing prompts by level">
                <option value="all">All Levels</option>
                {levels.map((lv) => <option key={lv.id} value={lv.id}>{lv.title}</option>)}
              </SelectField>
              <SelectField value={typeFilter} onValueChange={value => setTypeFilter(value)}
                aria-label="Filter writing prompts by type">
                <option value="all">All Types</option>
                {types.map((t) => <option key={t} value={t}>{TYPE_LABELS[t] || t}</option>)}
              </SelectField>
              <span className="camp-writing-count" aria-live="polite">{filtered.length} prompts</span>
            </motion.div>

            {/* Prompts grid */}
            <motion.div variants={itemAnim} className="camp-writing-grid">
              {filtered.map((prompt, i) => (
                <motion.button
                  key={prompt.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(prompt)}
                  className="camp-writing-card"
                >
                  <div className="camp-writing-card-top">
                    <span className="camp-writing-kind"><LearningArt name={TYPE_ICONS[prompt.type] || "document"} size={22} />{TYPE_LABELS[prompt.type]}</span>
                    <span className="camp-writing-level">{prompt.levelId.replace("band", "Band ").replace("-", "–")}</span>
                  </div>
                  <div className="camp-writing-card-copy">
                    <h3>{prompt.titleEn}</h3>
                    {prompt.titleAr && <p className="font-arabic" lang="ar" dir="rtl">{prompt.titleAr}</p>}
                    {prompt.titleDe !== prompt.titleEn && <p>{prompt.titleDe}</p>}
                  </div>
                  <div className="camp-writing-tags">
                    {prompt.tags.slice(0, 3).map((t) => <span key={t}>{t}</span>)}
                  </div>
                  <div className="camp-writing-card-footer">
                    <span>{prompt.wordCount.min}–{prompt.wordCount.max} words</span>
                    <span>Open prompt <ArrowUpRight size={14} aria-hidden="true" /></span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div key={selectedPrompt.id} variants={itemAnim} className="camp-writing-detail space-y-5">
              {/* Back & title */}
              <div className="camp-writing-detail-heading">
                <div className="min-w-0">
                  <Button variant="outline" onClick={handleReset} className="mb-3">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </Button>
                  <h2 className="font-display font-extrabold text-lg text-[var(--color-text-primary)]">{selectedPrompt.titleEn}</h2>
                  {selectedPrompt.titleAr && <p className="font-arabic text-sm text-[var(--color-text-secondary)] mt-2" lang="ar" dir="rtl">{selectedPrompt.titleAr}</p>}
                  {selectedPrompt.titleDe !== selectedPrompt.titleEn && <p className="font-body text-sm text-[var(--color-text-secondary)]">{selectedPrompt.titleDe}</p>}
                </div>
                <span className="camp-writing-level">{selectedPrompt.levelId.replace("band", "Band ").replace("-", "–")}</span>
              </div>

              {/* Instructions */}
              <div className="camp-writing-panel camp-writing-instructions">
                <div className="flex items-start gap-3">
                  <LearningArt name="FileText" size={20} className="w-5 h-5 text-[var(--color-text-info)] mt-0.5 shrink-0" />
                  <div>
                    <p className="font-display font-extrabold text-sm text-[var(--color-info-dark)]">Instructions</p>
                    <p className="font-body text-sm text-[var(--color-text-primary)] mt-1">{selectedPrompt.instructions}</p>
                    {selectedPrompt.instructionsAr && <p className="font-body text-sm text-[var(--color-text-primary)] font-arabic mt-1" lang="ar">{selectedPrompt.instructionsAr}</p>}
                  </div>
                </div>
              </div>

              {/* Hints */}
              <div>
                <Button variant="ghost" onClick={() => setShowHints(!showHints)} aria-expanded={showHints}
                  className="camp-writing-hint-toggle">
                  <LearningArt name="Lightbulb" size={16} className="w-4 h-4" />
                  {showHints ? "Hide" : "Show"} hints ({selectedPrompt.hints.length})
                  {showHints ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </Button>
                <AnimatePresence>
                  {showHints && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="mt-2 space-y-1.5">
                        {selectedPrompt.hints.map((hint, i) => (
                          <div key={i} className="camp-writing-hint">
                            <span className="camp-writing-hint-number">{i + 1}.</span>
                            <div>
                              <span>{hint}</span>
                              {selectedPrompt.hintsAr?.[i] && <p className="text-sm text-[var(--color-text-secondary)] font-arabic mt-1" lang="ar" dir="rtl">{selectedPrompt.hintsAr[i]}</p>}
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
                <label htmlFor="writing-response" className="sr-only">Your response</label>
                <Textarea
                  id="writing-response"
                  value={text}
                  onChange={(e) => { if (!submitted) setText(e.target.value); }}
                  placeholder="Write your text here..."
                  disabled={submitted}
                  rows={10}
                  className="camp-writing-response p-4 font-body resize-y disabled:bg-[var(--color-surface-alt)]"
                />
                <div className="camp-writing-editor-footer">
                  <div className="camp-writing-word-count font-body text-xs" aria-live="polite">
                    {selectedPrompt && (
                      <>
                        <span className="text-[var(--color-text-secondary)]">Min requirement: {selectedPrompt.wordCount.min} words (Target: {selectedPrompt.wordCount.min}–{selectedPrompt.wordCount.max})</span>
                        <span className={`font-bold ${
                          wordStatus === "good" ? "text-[var(--color-success-dark)]" : wordStatus === "extended" ? "text-[var(--color-primary)]" : "text-[var(--color-warning-dark)]"
                        }`}>
                          <LearningArt name="Clock" size={14} className="w-3.5 h-3.5 inline mr-1" />
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
                      <Button variant="ghost" onClick={() => setText("")}>
                        <RotateCcw className="w-3 h-3" /> Clear
                      </Button>
                    )}
                    {!submitted && (
                      <Button
                        onClick={handleSubmit}
                        disabled={!canSubmit}
                      >
                        <Send className="w-3.5 h-3.5" /> Submit Response
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Correction */}
              <div>
                <div className="flex gap-2">
                  {!showCorrection ? (
                    <Button variant="outline" onClick={() => setShowCorrection(true)} aria-expanded={false}>
                      <LearningArt name="Sparkles" size={16} className="w-4 h-4" /> Show correction
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={() => setShowCorrection(false)} aria-expanded={true}>
                      Hide correction
                    </Button>
                  )}
                </div>
                <AnimatePresence>
                  {showCorrection && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden mt-4">
                      <div className="camp-writing-panel camp-writing-model">
                        <div className="flex items-center gap-2 mb-3">
                          <LearningArt name="Sparkles" className="w-4 h-4 text-[var(--color-text-success)]" />
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
                  <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="bg-[var(--color-success-bg)] rounded-[var(--radius-lg)] border border-[var(--color-success)] p-5" style={{ boxShadow: "0 3px 0 var(--color-success)" }}>
                    <div className="flex items-start gap-3">
                      <LearningArt name="Sparkles" size={24} className="w-6 h-6 text-[var(--color-text-success)] shrink-0" />
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
                            <LearningArt name="Sparkles" size={16} className="w-4 h-4" /> XP awarded
                          </div>
                          <span className="font-display font-extrabold text-[var(--color-success-dark)]">+{
                            selectedPrompt.levelId === "band4-5" ? 20 : selectedPrompt.levelId === "band5-6" ? 30 : selectedPrompt.levelId === "band6-7" ? 40 : 50
                          } XP</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border border-[var(--color-border-default)]" style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}>
                      <p className="font-display font-bold text-xs text-[var(--color-text-secondary)] mb-2">Your text:</p>
                      <p className="font-body text-sm text-[var(--color-text-primary)] whitespace-pre-wrap leading-relaxed">{text}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button variant="outline" onClick={handleReset}>
                        Try another prompt
                      </Button>
                      <Button onClick={() => { setSubmitted(false); }}>
                        Revise this text
                      </Button>
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

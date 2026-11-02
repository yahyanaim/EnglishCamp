"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeCard, PracticeButton } from "@/components/ui/PracticeSurface";
import { StudyTips } from "@/components/ui/StudyTips";
import { LETTER_PROMPTS } from "@/data/letter-prompts";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { BRIEFE, ASTUCES_BRIEFE, BRIEF_PHRASES } from "@/data/briefe";
import { FileText, RefreshCw, Sparkles, Eye, EyeOff, ChevronRight, CheckCircle2, Lightbulb, BookOpen, Languages } from "lucide-react";

export function BriefeSchreiben() {
  const { completeExercise } = useProgress();
  const [drafts, setDrafts] = useState<Record<string,string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [expandedAstuce, setExpandedAstuce] = useState<string | null>(null);

  const brief = selected ? BRIEFE.find((b) => b.id === selected) : null;

  function handleComplete() {
    if (!brief || completed.includes(brief.id) || !drafts[brief.id]?.trim()) return;
    completeExercise(`letter-${brief.id}`, 15);
    setCompleted((c) => [...c, brief.id]);
    setShowAnswer(true);
  }

  function handleReset() {
    setSelected(null);
    setShowAnswer(false);
  }

  if (brief) {
    return (
      <div className="space-y-4 camp-letter-workspace">
        <PracticeButton onClick={handleReset} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
          <ChevronRight className="w-4 h-4 rotate-180" /> Back to topics
        </PracticeButton>

        <div className="camp-letter-writing-grid"><div className={`rounded-[16px] p-4 ring-1 shadow-[0_2px_8px_rgba(0,0,0,0.06)] ${
          brief.type === "formal" ? "bg-[var(--color-info-bg)] text-[var(--color-text-info)] ring-blue-200" : "bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] ring-amber-200"
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-[var(--radius-pill)] ${
              brief.type === "formal" ? "bg-blue-200 text-[var(--color-text-info)]" : "bg-amber-200 text-[var(--color-text-warning)]"
            }`}>{brief.type === "formal" ? "Formal" : "Informal"}</span>
            <span className="text-xs text-[var(--color-text-secondary)] font-medium">{brief.subject}</span>
          </div>
          <h3 className="text-base font-bold text-[var(--color-text-primary)] mt-2">Task</h3>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{LETTER_PROMPTS[brief.id]}</p>
          <p className="camp-writing-task-note">Aim for 140–190 words for this B2-style practice. This is self-reviewed writing, not an automatically marked examination.</p>
        </div>

        <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[16px] border border-[var(--color-border-default)] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <label htmlFor="practice-letter" className="text-sm font-bold text-[var(--color-text-primary)] mb-2">Your letter</label>
          <textarea id="practice-letter" value={drafts[brief.id] || ""} onChange={event => setDrafts(d => ({...d,[brief.id]:event.target.value}))}
            placeholder={`Write your ${brief.type === "formal" ? "formal letter" : "informal letter"} here...`}
            className="w-full h-48 p-3 rounded-[12px] border border-[var(--color-border-default)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:ring-2 focus:ring-brand-400 resize-y"
          />
          <p className="camp-letter-wordcount">{(drafts[brief.id] || "").trim().split(/\s+/).filter(Boolean).length} words · draft kept while you browse these topics</p>
        </PracticeCard></div>

        <div className="flex flex-wrap items-center gap-2">
          <PracticeButton disabled={completed.includes(brief.id) || !drafts[brief.id]?.trim()} onClick={handleComplete}
            className="px-5 py-2.5 rounded-[12px] bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm hover:bg-[var(--color-primary-hover)] transition-all inline-flex items-center gap-1.5 shadow-[0_3px_0_rgba(126,34,206,0.3)]"
          >
            <CheckCircle2 className="w-4 h-4" /> {completed.includes(brief.id) ? "Practised" : "Mark as Practised"}
          </PracticeButton>
          <PracticeButton onClick={() => setShowAnswer(!showAnswer)}
            className="px-4 py-2.5 rounded-[12px] bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] font-semibold text-sm hover:bg-[var(--color-border-default)] transition-all inline-flex items-center gap-1.5"
          >
            {showAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showAnswer ? "Hide" : "Show"} Model Answer
          </PracticeButton>
        </div>

        <AnimatePresence>
          {showAnswer && (
            <motion.div key="model-answer" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="bg-[var(--color-surface)] rounded-[16px] ring-1 ring-[var(--color-success)] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-text-success)]" />
                <span className="text-xs font-bold text-[var(--color-text-success)] uppercase">Model Answer</span>
              </div>
              <p className="camp-writing-task-note">This model illustrates purpose, organisation and tone. {brief.content.trim().split(/\s+/).length < 140 ? "It is shorter than a complete 140–190-word B2 response; develop your own response to meet the task length." : "Compare its choices with your own response."}</p>
              <pre className="text-sm text-[var(--color-text-primary)] leading-relaxed whitespace-pre-wrap font-sans">{brief.content}</pre>
              <div className="mt-3 pt-3 border-t border-emerald-100">
                <div className="flex items-center gap-1.5 mb-2">
                  <LearningArt name="Languages" size={14} className="w-3.5 h-3.5 text-[var(--color-text-success)]" />
                  <span className="text-[10px] font-bold text-[var(--color-text-success)] uppercase tracking-wider">Translation support</span>
                </div>

                {brief.arabicTranslation && <p className="font-arabic text-xs text-[var(--color-text-secondary)] leading-relaxed mt-1" lang="ar">{brief.arabicTranslation}</p>}
              </div>
            </motion.div>
          )}
          {showAnswer && (
            <motion.div key="useful-phrases" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="bg-[var(--color-surface)] rounded-[16px] ring-1 ring-blue-100 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-center gap-1.5 mb-3">
                <LearningArt name="BookOpen" size={14} className="w-3.5 h-3.5 text-[var(--color-text-info)]" />
                <span className="text-[10px] font-bold text-[var(--color-text-info)] uppercase tracking-wider">Useful Phrases for {brief.type === "formal" ? "Formal" : "Informal"} Letters</span>
              </div>
              <div className="space-y-2">
                {BRIEF_PHRASES.filter((p) => p.art === brief.type || p.art === "both").map((p, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <span className="text-[9px] font-bold text-[var(--color-text-info)] uppercase shrink-0 w-16 pt-0.5">{p.category}</span>
                    <div className="flex-1">
                      <p className="text-[var(--color-text-primary)] font-medium">{p.de}</p>
                      {p.ar && <p className="font-arabic text-xs text-[var(--color-text-secondary)] mt-0.5" lang="ar">{p.ar}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  const formal = BRIEFE.filter((b) => b.type === "formal");
  const informal = BRIEFE.filter((b) => b.type === "informal");

  return (
    <div className="space-y-6 camp-letter-topics">
      <PracticeCard data-practice-surface="question" className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 sm:p-6 text-center shadow-[var(--shadow-1)]">
        <LearningArt name="FileText" className="w-14 h-14 text-[var(--color-primary)] mx-auto mb-4" />
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Letters</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">Practice writing formal and informal English letters</p>
      </PracticeCard>

      <StudyTips title="Writing tips" items={ASTUCES_BRIEFE} />
      <div className="camp-letter-topic-grid">
      <div>
        <h3 className="text-sm font-bold text-[var(--color-text-secondary)] mb-2 flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-[var(--color-primary-subtle)] text-[var(--color-text-info)] flex items-center justify-center text-[10px] font-bold">F</span>
          Formal Letters
        </h3>
        <div className="space-y-2">
          {formal.map((b) => (
            <PracticeButton key={b.id} onClick={() => { setSelected(b.id); setShowAnswer(false); }}
              className="flex items-center gap-3 w-full text-left bg-[var(--color-surface)] rounded-[14px] border border-[var(--color-border-default)] p-4 hover:ring-[var(--color-primary)] hover:shadow-sm transition-all"
            >
              <div className="w-8 h-8 rounded-[10px] bg-[var(--color-info-bg)] text-[var(--color-text-info)]  flex items-center justify-center text-xs font-bold shrink-0">F</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[var(--color-text-primary)] truncate">{b.subject}</p>
                <p className="text-[11px] text-[var(--color-text-secondary)] truncate">{b.content.slice(0, 60)}...</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--color-text-secondary)] shrink-0" />
            </PracticeButton>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[var(--color-text-secondary)] mb-2 flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] flex items-center justify-center text-[10px] font-bold">I</span>
          Informal Letters
        </h3>
        <div className="space-y-2">
          {informal.map((b) => (
            <PracticeButton key={b.id} onClick={() => { setSelected(b.id); setShowAnswer(false); }}
              className="flex items-center gap-3 w-full text-left bg-[var(--color-surface)] rounded-[14px] border border-[var(--color-border-default)] p-4 hover:ring-[var(--color-primary)] hover:shadow-sm transition-all"
            >
              <div className="w-8 h-8 rounded-[10px] bg-[var(--color-warning-bg)] text-[var(--color-text-warning)]  flex items-center justify-center text-xs font-bold shrink-0">I</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[var(--color-text-primary)] truncate">{b.subject}</p>
                <p className="text-[11px] text-[var(--color-text-secondary)] truncate">{b.content.slice(0, 60)}...</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--color-text-secondary)] shrink-0" />
            </PracticeButton>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}
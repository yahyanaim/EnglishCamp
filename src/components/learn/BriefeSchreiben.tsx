"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { BRIEFE, ASTUCES_BRIEFE, BRIEF_PHRASES } from "@/data/briefe";
import { FileText, RefreshCw, Sparkles, Eye, EyeOff, ChevronRight, CheckCircle2, Lightbulb, BookOpen, Languages } from "lucide-react";

export function BriefeSchreiben() {
  const { addXP } = useProgress();
  const [selected, setSelected] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [expandedAstuce, setExpandedAstuce] = useState<string | null>(null);

  const brief = selected ? BRIEFE.find((b) => b.id === selected) : null;

  function handleComplete() {
    if (!brief) return;
    addXP(15);
    setCompleted((c) => [...c, brief.id]);
    setShowAnswer(true);
  }

  function handleReset() {
    setSelected(null);
    setShowAnswer(false);
  }

  if (brief) {
    return (
      <div className="space-y-4 max-w-2xl mx-auto">
        <button onClick={handleReset} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">
          <ChevronRight className="w-4 h-4 rotate-180" /> Back to topics
        </button>

        <div className={`rounded-[16px] p-4 ring-1 shadow-[0_2px_8px_rgba(0,0,0,0.06)] ${
          brief.type === "formal" ? "bg-[var(--color-info)] text-white ring-blue-200" : "bg-[var(--color-warning)] text-white ring-amber-200"
        }`}>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-[var(--radius-pill)] ${
              brief.type === "formal" ? "bg-blue-200 text-[var(--color-info)]" : "bg-amber-200 text-[var(--color-warning)]"
            }`}>{brief.type === "formal" ? "Formal" : "Informal"}</span>
            <span className="text-xs text-[var(--color-text-disabled)] font-medium">{brief.subject}</span>
          </div>
          <h3 className="text-base font-bold text-[var(--color-text-primary)] mt-2">Task</h3>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{brief.content}</p>
          {brief.arabicTranslation && <p className="font-arabic text-sm text-[var(--color-text-secondary)] mt-1" lang="ar">{brief.arabicTranslation}</p>}
        </div>

        <div className="bg-[var(--color-surface)] rounded-[16px] border-2 border-[var(--color-border-default)] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-2">Your letter</h3>
          <textarea
            placeholder={`Write your ${brief.type === "formal" ? "formal letter" : "informal letter"} here...`}
            className="w-full h-48 p-3 rounded-[12px] border-2 border-[var(--color-border-default)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] focus:outline-none focus:ring-2 focus:ring-brand-400 resize-y"
          />
        </div>

        <div className="flex items-center gap-2">
          <button onClick={handleComplete}
            className="px-5 py-2.5 rounded-[12px] bg-[var(--color-primary)] text-white font-bold text-sm hover:bg-brand-600 transition-all inline-flex items-center gap-1.5 shadow-[0_3px_0_rgba(28,176,246,0.3)]"
          >
            <CheckCircle2 className="w-4 h-4" /> Mark as Practiced
          </button>
          <button onClick={() => setShowAnswer(!showAnswer)}
            className="px-4 py-2.5 rounded-[12px] bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] font-semibold text-sm hover:bg-[var(--color-border-default)] transition-all inline-flex items-center gap-1.5"
          >
            {showAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showAnswer ? "Hide" : "Show"} Model Answer
          </button>
        </div>

        <AnimatePresence>
          {showAnswer && (
            <motion.div key="model-answer" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              className="bg-[var(--color-surface)] rounded-[16px] ring-1 ring-[var(--color-success)] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-center gap-1.5 mb-2">
                <CheckCircle2 className="w-4 h-4 text-[var(--color-success)]" />
                <span className="text-xs font-bold text-[var(--color-success)] uppercase">Model Answer</span>
              </div>
              <pre className="text-sm text-[var(--color-text-primary)] leading-relaxed whitespace-pre-wrap font-sans">{brief.content}</pre>
              <div className="mt-3 pt-3 border-t border-emerald-100">
                <div className="flex items-center gap-1.5 mb-2">
                  <Languages className="w-3.5 h-3.5 text-[var(--color-success)]" />
                  <span className="text-[10px] font-bold text-[var(--color-success)] uppercase tracking-wider">English Translation</span>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{brief.englishTranslation}</p>
                {brief.arabicTranslation && <p className="font-arabic text-xs text-[var(--color-text-secondary)] leading-relaxed mt-1" lang="ar">{brief.arabicTranslation}</p>}
              </div>
            </motion.div>
          )}
          {showAnswer && (
            <motion.div key="useful-phrases" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="bg-[var(--color-surface)] rounded-[16px] ring-1 ring-blue-100 p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
            >
              <div className="flex items-center gap-1.5 mb-3">
                <BookOpen className="w-3.5 h-3.5 text-[var(--color-info)]" />
                <span className="text-[10px] font-bold text-[var(--color-info)] uppercase tracking-wider">Useful Phrases for {brief.type === "formal" ? "Formal" : "Informal"} Letters</span>
              </div>
              <div className="space-y-2">
                {BRIEF_PHRASES.filter((p) => p.art === brief.type || p.art === "both").map((p, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <span className="text-[9px] font-bold text-[var(--color-info)] uppercase shrink-0 w-16 pt-0.5">{p.category}</span>
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
    <div className="space-y-6 max-w-lg mx-auto">
      <div className="bg-[var(--color-surface)] rounded-[24px] border-2 border-[var(--color-border-default)] p-8 text-center shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
        <FileText className="w-14 h-14 text-[var(--color-primary)] mx-auto mb-4" />
        <h2 className="text-xl font-display font-extrabold text-[var(--color-text-primary)]">Letters</h2>
        <p className="text-sm text-[var(--color-text-secondary)] mt-2">Practice writing formal and informal English letters</p>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-[var(--color-primary)]" />
          Tips &amp; Topic Suggestions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ASTUCES_BRIEFE.map((ast) => (
            <motion.div key={ast.id} layout className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] shadow-sm overflow-hidden" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
              <button
                onClick={() => setExpandedAstuce(expandedAstuce === ast.id ? null : ast.id)}
                className="w-full text-left p-4 hover:bg-[var(--color-surface-alt)] transition-colors flex items-start gap-3"
              >
                <span className="text-xl shrink-0">{ast.icon}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-[var(--color-text-primary)]">{ast.topic}</h4>
                  {ast.topicAr && <p className="font-arabic text-xs font-bold text-[var(--color-text-primary)]" lang="ar">{ast.topicAr}</p>}
                  <p className="text-xs text-[var(--color-text-disabled)] mt-0.5 line-clamp-2">{ast.tip}</p>
                </div>
              </button>
              <AnimatePresence>
                {expandedAstuce === ast.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="border-t border-[var(--color-border-default)]"
                  >
                    <div className="p-4 space-y-3">
                      <div className="flex items-start gap-2.5">
                        <Lightbulb className="w-4 h-4 text-[var(--color-warning)] mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-[var(--color-text-secondary)] mb-0.5">Tip</p>
                          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{ast.tip}</p>
                          {ast.tipAr && <p className="font-arabic text-xs text-[var(--color-text-secondary)] leading-relaxed mt-0.5" lang="ar">{ast.tipAr}</p>}
                        </div>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <BookOpen className="w-4 h-4 text-[var(--color-info)] mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-[var(--color-text-secondary)] mb-0.5">Suggestion</p>
                          <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{ast.suggest}</p>
                          {ast.suggestAr && <p className="font-arabic text-xs text-[var(--color-text-secondary)] leading-relaxed mt-0.5" lang="ar">{ast.suggestAr}</p>}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[var(--color-text-secondary)] mb-2 flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-blue-100 text-[var(--color-info)] flex items-center justify-center text-[10px] font-bold">F</span>
          Formal Letters
        </h3>
        <div className="space-y-2">
          {formal.map((b) => (
            <button key={b.id} onClick={() => { setSelected(b.id); setShowAnswer(false); }}
              className="flex items-center gap-3 w-full text-left bg-[var(--color-surface)] rounded-[14px] border-2 border-[var(--color-border-default)] p-4 hover:ring-[var(--color-primary)] hover:shadow-sm transition-all"
            >
              <div className="w-8 h-8 rounded-[10px] bg-[var(--color-info)] text-white  flex items-center justify-center text-xs font-bold shrink-0">F</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[var(--color-text-primary)] truncate">{b.subject}</p>
                <p className="text-[11px] text-[var(--color-text-disabled)] truncate">{b.content.slice(0, 60)}...</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--color-text-disabled)] shrink-0" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-[var(--color-text-secondary)] mb-2 flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-amber-100 text-[var(--color-warning)] flex items-center justify-center text-[10px] font-bold">I</span>
          Informal Letters
        </h3>
        <div className="space-y-2">
          {informal.map((b) => (
            <button key={b.id} onClick={() => { setSelected(b.id); setShowAnswer(false); }}
              className="flex items-center gap-3 w-full text-left bg-[var(--color-surface)] rounded-[14px] border-2 border-[var(--color-border-default)] p-4 hover:ring-[var(--color-primary)] hover:shadow-sm transition-all"
            >
              <div className="w-8 h-8 rounded-[10px] bg-[var(--color-warning)] text-white  flex items-center justify-center text-xs font-bold shrink-0">I</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[var(--color-text-primary)] truncate">{b.subject}</p>
                <p className="text-[11px] text-[var(--color-text-disabled)] truncate">{b.content.slice(0, 60)}...</p>
              </div>
              <ChevronRight className="w-4 h-4 text-[var(--color-text-disabled)] shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
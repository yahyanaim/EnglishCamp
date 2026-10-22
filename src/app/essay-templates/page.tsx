"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ESSAY_TEMPLATES } from "@/data/essay-templates";
import { Search, X, ChevronDown, Lightbulb, BookOpen, ArrowRight } from "lucide-react";

export default function EssayTemplatesPage() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = ESSAY_TEMPLATES.filter(
    (t) =>
      !search.trim() ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.task.toLowerCase().includes(search.toLowerCase()) ||
      t.sections.some((section) =>
        section.name.toLowerCase().includes(search.toLowerCase()) ||
        section.phrases.some((p) => p.de.toLowerCase().includes(search.toLowerCase()) || p.en.toLowerCase().includes(search.toLowerCase()))
      )
  );

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Essay Templates</h1>
          <p className="text-sm text-[var(--color-text-disabled)] mt-1">Structured templates with phrase banks for English writing tasks</p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-disabled)]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="w-full h-[52px] pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border-2 border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-disabled)] placeholder:italic outline-none transition-all duration-150 focus:border-[var(--color-info)] focus:shadow-[0_0_0_3px_rgba(28,176,246,0.15)]"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-disabled)]" /></button>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filtered.map((template) => {
            const open = expanded === template.id;
            return (
              <motion.div key={template.id} layout className="bg-[var(--color-surface)] rounded-[var(--radius-lg)]  border-2 border-[var(--color-border-default)] overflow-hidden" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
                <button onClick={() => setExpanded(open ? null : template.id)} className="w-full text-left p-5 hover:bg-[var(--color-surface-alt)] transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display font-bold text-[var(--color-text-primary)]">{template.title}</h3>
                      {template.titleAr && <p className="text-xs font-arabic text-[var(--color-text-secondary)]" lang="ar">{template.titleAr}</p>}
                      <p className="text-xs text-[var(--color-text-disabled)] mt-0.5">{template.task}</p>
                      {template.taskAr && <p className="text-xs text-[var(--color-text-disabled)] font-arabic" lang="ar">{template.taskAr}</p>}
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] font-display font-bold uppercase px-2 py-0.5 rounded-[var(--radius-pill)] bg-[var(--color-primary-subtle)] text-[var(--color-primary-dark)]">{template.level}</span>
                        <span className="text-[10px] text-[var(--color-text-disabled)]">{template.structure}</span>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[var(--color-text-disabled)] mt-1 transition-transform shrink-0 ${open ? "rotate-180" : ""}`} />
                  </div>
                </button>

                <AnimatePresence>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 space-y-4 border-t border-[var(--color-border-default)] pt-4">
                        {template.sections.map((section, i) => (
                          <div key={i}>
                            <div className="flex items-center gap-2 mb-2">
                              <BookOpen className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                              <p className="text-xs font-bold text-[var(--color-text-primary)] uppercase tracking-wider">{section.name}</p>
                              <span className="text-[10px] text-[var(--color-text-disabled)]">— {section.description}</span>
                              {section.descriptionAr && <span className="text-[10px] text-[var(--color-text-disabled)] font-arabic" lang="ar">— {section.descriptionAr}</span>}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {section.phrases.map((phrase, j) => (
                                <span key={j} className="group relative text-xs bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] px-2.5 py-1.5 rounded-[var(--radius-md)] border-2 border-[var(--color-border-default)] cursor-default transition-all hover:bg-[var(--color-primary-subtle)] hover:ring-brand-200">
                                  <span className="block group-hover:hidden">{phrase.de}</span>
                                  <span className="hidden group-hover:block text-[var(--color-primary-dark)] font-body font-semibold">{phrase.en}</span>
                                  {phrase.ar && <span className="hidden group-hover:block text-xs text-[var(--color-text-disabled)] font-arabic" lang="ar">{phrase.ar}</span>}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}

                        <div className="flex items-start gap-2 p-3 bg-[var(--color-warning-bg)] rounded-[var(--radius-md)]">
                          <Lightbulb className="w-4 h-4 text-[var(--color-warning-dark)] mt-0.5 shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-[var(--color-text-warning)] mb-1">Tips</p>
                            <ul className="space-y-1">
                              {template.tips.map((tip, i) => (
                                <li key={i} className="text-xs text-[var(--color-text-warning)]/80 flex items-start gap-1.5">
                                  <ArrowRight className="w-3 h-3 mt-0.5 shrink-0" />
                                  <div>
                                    <span>{tip}</span>
                                    {template.tipsAr?.[i] && <p className="text-xs text-[var(--color-text-warning)]/80 font-arabic mt-0.5" lang="ar">{template.tipsAr[i]}</p>}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-16"><span className="text-4xl block mb-3">🔍</span><p className="text-sm text-[var(--color-text-disabled)]">No essay templates found</p></div>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}

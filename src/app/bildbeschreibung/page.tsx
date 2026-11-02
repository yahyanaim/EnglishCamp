"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ChevronLeft, BookOpen } from "lucide-react";
import { BILD_SECTIONS, BILD_EXAMPLE, BILD_VOCABULARY } from "@/data/bildbeschreibung";

export default function PictureDescriptionPage() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const section = selectedSection ? BILD_SECTIONS.find((s) => s.id === selectedSection) : null;

  if (section) {
    return (
      <PageWrapper>
        <button onClick={() => setSelectedSection(null)} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to overview
        </button>

        <div className="bg-[var(--color-surface-alt)]    rounded-[var(--radius-lg)] ring-1 ring-sky-200/50 p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <LearningArt name={section.icon} size={24} className="" />
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{section.title}</h2>
              {section.titleAr && <p className="text-sm font-arabic text-[var(--color-text-secondary)]" lang="ar">{section.titleAr}</p>}
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">{section.explanation}</p>
              {section.explanationAr && <p className="text-sm text-[var(--color-text-secondary)] font-arabic mt-1" lang="ar">{section.explanationAr}</p>}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {section.phrases.map((p, i) => (
            <motion.div key={p.de} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
              className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-4 shadow-sm"
            >
              <p className="text-sm font-mono font-medium text-[var(--color-text-primary)] mb-0.5">{p.de}</p>
              <p className="text-xs text-[var(--color-text-secondary)] italic">{p.en}</p>
              {p.ar && <p className="text-xs text-[var(--color-text-secondary)] italic font-arabic mt-0.5" lang="ar">{p.ar}</p>}
            </motion.div>
          ))}
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Picture Description</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Master the picture description task for B2 speaking (Teil 1)</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {BILD_SECTIONS.map((s, i) => (
            <motion.button key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedSection(s.id)}
              className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3">
                <LearningArt name={s.icon} size={24} className="" />
                <div>
                  <h3 className="text-sm font-bold text-[var(--color-text-primary)]">{s.title}</h3>
                  {s.titleAr && <p className="text-xs font-arabic text-[var(--color-text-secondary)]" lang="ar">{s.titleAr}</p>}
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 line-clamp-2">{s.explanation}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <LearningArt name="BookOpen" className="w-4 h-4 text-[var(--color-primary)]" />
            <h3 className="text-sm font-bold text-[var(--color-text-primary)]">Complete Example</h3>
          </div>
          <p className="text-sm text-[var(--color-text-primary)] leading-relaxed whitespace-pre-line">{BILD_EXAMPLE.description}</p>
          {BILD_EXAMPLE.descriptionAr && <p className="text-sm text-[var(--color-text-primary)] leading-relaxed whitespace-pre-line font-arabic mt-2" lang="ar">{BILD_EXAMPLE.descriptionAr}</p>}
        </div>

        <div className="bg-[var(--color-warning-bg)] text-[var(--color-text-warning)] rounded-[var(--radius-lg)] ring-1 ring-[var(--color-warning)] p-5 shadow-sm">
          <h3 className="text-sm font-bold text-[var(--color-text-warning)] mb-3">Useful Vocabulary</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {BILD_VOCABULARY.map((v) => (
              <div key={v.de} className="flex items-center justify-between bg-[var(--color-surface)]/60 px-3 py-1.5 rounded-lg">
                <span className="text-sm font-mono font-medium text-[var(--color-text-primary)]">{v.de}</span>
                <span className="text-xs text-[var(--color-text-secondary)] italic ml-2">{v.en}</span>
                {v.ar && <span className="text-xs text-[var(--color-text-secondary)] italic font-arabic ml-2" lang="ar">{v.ar}</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

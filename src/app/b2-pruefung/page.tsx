"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ChevronLeft, ExternalLink, GraduationCap } from "lucide-react";
import { Fragment } from "react";
import Link from "next/link";
import { IELTS_INFO, TOEFL_INFO, WRITING_TEMPLATES } from "@/data/b2-pruefung";

export default function B2PruefungPage() {
  const [view, setView] = useState<"ielts" | "toefl">("ielts");
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const EXAM_INFO = view === "ielts" ? IELTS_INFO : TOEFL_INFO;
  const section = selectedSection ? EXAM_INFO.find((s) => s.id === selectedSection) : null;
  const template = selectedTemplate ? WRITING_TEMPLATES.find((t) => t.id === selectedTemplate) : null;

  if (template) {
    return (
      <PageWrapper>
        <button onClick={() => { setSelectedTemplate(null); setSelectedSection("writing"); }} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to writing section
        </button>

        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-[var(--radius-lg)] ring-1 ring-purple-200/50 p-6 shadow-sm mb-6">
          <div className="flex items-center gap-4">
            <span className="text-3xl">{template.icon}</span>
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{template.title}</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">{template.desc}</p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-5 shadow-sm mb-6">
          <h3 className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">Template Structure</h3>
          <div className="space-y-2">
            {template.template.map((line, i) => (
              <Fragment key={i}>
                <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">{line}</p>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="bg-[var(--color-warning)] text-white rounded-[var(--radius-lg)] ring-1 ring-[var(--color-warning)] p-5 shadow-sm">
          <h3 className="text-xs font-bold text-[var(--color-warning)] uppercase tracking-wider mb-2">Tips</h3>
          <ul className="space-y-1">
            {template.notes.map((note, i) => (
              <li key={i} className="text-sm text-[var(--color-warning)] flex items-start gap-2">
                <span className="text-[var(--color-warning)] mt-0.5 shrink-0">•</span>
                <div>
                  <span>{note}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </PageWrapper>
    );
  }

  if (section) {
    return (
      <PageWrapper>
        <button onClick={() => setSelectedSection(null)} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to overview
        </button>

        <div className="space-y-6">
          <div className={`bg-gradient-to-br from-slate-50 to-[var(--color-info)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)]/50 p-6 shadow-sm`}>
            <div className="flex items-center gap-4">
              <span className="text-3xl">{section.icon}</span>
              <div>
                <h2 className={`text-xl font-bold ${section.color}`}>{section.title}</h2>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">{section.subtitle}</p>
              </div>
            </div>
          </div>

          {section.details.map((detail, i) => (
            <div key={i} className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-5 shadow-sm">
              <p className="text-sm text-[var(--color-text-secondary)]">{detail}</p>
            </div>
          ))}

          {section.id === "writing" && (
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3">Writing Templates</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WRITING_TEMPLATES.map((t) => (
                  <motion.button key={t.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedTemplate(t.id)}
                    className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-4 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xl">{t.icon}</span>
                      <div>
                        <h4 className="text-sm font-bold text-[var(--color-text-primary)]">{t.title}</h4>
                        <p className="text-xs text-[var(--color-text-disabled)]">{t.desc}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Cambridge B2 First (FCE) Guide</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Exam structure, strategies, and writing templates for Cambridge B2 First</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXAM_INFO.map((s, i) => (
            <motion.button key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedSection(s.id)}
              className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <h3 className={`text-sm font-bold ${s.color}`}>{s.title}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">{s.subtitle}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="bg-gradient-to-br from-[var(--color-warning)] to-[#FFD700] rounded-[var(--radius-lg)] ring-1 ring-[var(--color-warning)] p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <span className="text-xl">🎯</span>
            <div>
              <h3 className="text-sm font-bold text-[var(--color-text-primary)]">Quick Overview</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                {["Reading & Use of English 75min", "Writing 80min", "Listening 40min", "Speaking 14min"].map((item) => (
                  <div key={item} className="bg-[var(--color-surface)]/60 rounded-lg px-3 py-2 text-center">
                    <p className="text-xs font-semibold text-[var(--color-text-primary)]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

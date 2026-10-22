"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { ChevronLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import { IELTS_GUIDE_CONTENT } from "@/data/b2-pruefung";

export default function IELTSGuidePage() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const section = selectedSection ? IELTS_GUIDE_CONTENT.find((s) => s.id === selectedSection) : null;

  if (section) {
    return (
      <PageWrapper>
        <button onClick={() => setSelectedSection(null)} className="flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to overview
        </button>
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)]/50 p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <span className="text-3xl">{section.icon}</span>
              <div>
                <h2 className="text-xl font-bold text-orange-600">{section.title}</h2>
                <p className="text-sm text-[var(--color-text-secondary)] mt-1">{section.subtitle}</p>
              </div>
            </div>
            <p className="text-sm text-[var(--color-text-secondary)] mt-4 leading-relaxed">{section.description}</p>
          </div>
          {section.topics.map((topic, i) => (
            <div key={i} className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-5 shadow-sm">
              <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3">{topic.title}</h3>
              <div className="space-y-2">
                {topic.body.map((item, j) => (
                  <p key={j} className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">IELTS Guide</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Complete preparation guide for the IELTS exam — Academic & General Training</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {IELTS_GUIDE_CONTENT.map((s, i) => (
            <motion.button key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedSection(s.id)}
              className="text-left bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-4 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <h3 className="text-sm font-bold text-orange-600">{s.title}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">{s.subtitle}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

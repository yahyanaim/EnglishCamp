"use client";
import { motion } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { CORRELATIVE_CONJUNCTIONS } from "@/data/zweiteilige-konnektoren";

export default function ZweiteiligeKonnektorenPage() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">Two-Part Connectives</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Correlative conjunctions — paired conjunctions and their word order</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {CORRELATIVE_CONJUNCTIONS.map((k, i) => (
            <motion.div
              key={`${k.conjunction}-${i}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
              className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] p-4 shadow-sm"
            >
              <div className="mb-2">
                <span className="text-sm font-mono font-bold text-[var(--color-primary-dark)]">{k.conjunction}</span>
              </div>
              <p className="text-xs text-[var(--color-text-secondary)] mb-2">{k.usage}</p>
              <div className="bg-[var(--color-surface-alt)] rounded-lg p-3">
                <p className="text-xs font-mono text-[var(--color-text-primary)] leading-relaxed">{k.exampleEn}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

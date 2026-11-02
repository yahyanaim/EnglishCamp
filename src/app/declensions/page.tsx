"use client";
import { StudyTips } from "@/components/ui/StudyTips";
import { PageBanner } from "@/components/ui/PageBanner";

import { LearningArt } from "@/components/brand/LearningArt";
import { useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Search, X, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { PREPOSITIONS, LOCATION_DIRECTION_PAIRS, PREPOSITION_TIPS, PRONOUNS_AFTER_PREPOSITIONS } from "@/data/declensions";

const CATEGORIES = [
  { id: "location" as const, label: "Location", color: "text-[var(--color-text-success)]", icon: "📍" },
  { id: "direction" as const, label: "Direction", color: "text-[var(--color-text-info)]", icon: "➡️" },
  { id: "time" as const, label: "Time", color: "text-[var(--color-text-warning)]", icon: "⏰" },
  { id: "other" as const, label: "Other", color: "text-[#9B59B6]", icon: "📌" },
];

export default function DeclensionsPage() {
  const [search, setSearch] = useState("");
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  const filtered = PREPOSITIONS.filter(
    (p) => p.preposition.toLowerCase().includes(search.toLowerCase()) || p.usage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageWrapper>
      <div className="space-y-6">
        <PageBanner>
          <h1 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">English Prepositions</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">
            Location, direction, time, and other prepositions — with examples and Arabic translations
          </p>
        </PageBanner>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prepositions..."
            className="w-full h-[52px] pl-11 pr-10 bg-[var(--color-surface)] rounded-[var(--radius-md)] border border-[var(--color-border-default)] text-[16px] font-body font-medium text-[var(--color-text-secondary)] placeholder:text-[var(--color-text-secondary)] placeholder:italic outline-none transition-all duration-150 focus:border-[#7E22CE] focus:shadow-[0_0_0_3px_rgba(126,34,206,0.15)]"
          />
          {search && <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2"><X className="w-4 h-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-secondary)]" /></button>}
        </div>

        {CATEGORIES.map((cat) => {
          const items = filtered.filter((p) => p.category === cat.id);
          if (!items.length) return null;
          return (
            <div key={cat.id}>
              <h3 className={`text-sm font-bold ${cat.color} mb-3 flex items-center gap-2`}>
                <LearningArt name={cat.icon} size={24} className="" /> {cat.label}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((p, i) => (
                  <div key={`${p.preposition}-${i}`} className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-4 shadow-sm">
                    <span className="text-lg font-mono font-bold text-[var(--color-text-link)]">{p.preposition}</span>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">{p.usage}</p>
                    {p.usageAr && <p className="text-xs text-[var(--color-text-secondary)] font-arabic" lang="ar">{p.usageAr}</p>}
                    <div className="bg-[var(--color-surface-alt)] rounded-lg p-2.5 mt-2 space-y-0.5">
                      <p className="text-xs font-mono text-[var(--color-text-primary)]">{p.example}</p>
                      {p.exampleAr && <p className="text-xs text-[var(--color-text-secondary)] italic font-arabic" lang="ar">{p.exampleAr}</p>}
                    </div>
                    <p className="text-xs text-[var(--color-text-secondary)] italic mt-1 font-arabic" lang="ar">{p.arabic}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16"><LearningArt name="🔍" size={36} className=" block mb-3" /><p className="text-sm font-medium text-[var(--color-text-secondary)]">No prepositions found</p></div>
        )}

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 shadow-sm">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3">Location vs Direction Pairs</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[var(--color-border-default)]">
                  <th className="text-left py-2 pr-3 font-semibold text-[var(--color-text-secondary)]">Preposition</th>
                  <th className="text-left py-2 pr-3 font-semibold text-[var(--color-text-secondary)]">Location (static)</th>
                  <th className="text-left py-2 pr-3 font-semibold text-[var(--color-text-secondary)]">Example</th>
                  <th className="text-left py-2 pr-3 font-semibold text-[var(--color-text-secondary)]">Direction (movement)</th>
                  <th className="text-left py-2 font-semibold text-[var(--color-text-secondary)]">Example</th>
                </tr>
              </thead>
              <tbody>
                {LOCATION_DIRECTION_PAIRS.map((pair, i) => (
                  <tr key={i} className="border-b border-[var(--color-border-default)] last:border-0">
                    <td className="py-2 pr-3 font-mono font-bold text-[var(--color-text-link)]">{pair.preposition}</td>
                    <td className="py-2 pr-3 font-mono text-[var(--color-text-secondary)]">{pair.location}</td>
                    <td className="py-2 pr-3 text-[var(--color-text-primary)]">{pair.locationExample}</td>
                    <td className="py-2 pr-3 font-mono text-[var(--color-text-secondary)]">{pair.direction}</td>
                    <td className="py-2 text-[var(--color-text-primary)]">{pair.directionExample}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] border border-[var(--color-border-default)] p-5 shadow-sm">
          <h3 className="text-sm font-bold text-[var(--color-text-primary)] mb-3">Pronouns After Prepositions</h3>
          <p className="text-xs text-[var(--color-text-secondary)] mb-3">Personal pronouns after prepositions normally use the object form: with me, for her, between us.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-[var(--color-border-default)]">
                  <th className="text-left py-2 pr-3 font-semibold text-[var(--color-text-secondary)]"></th>
                  {PRONOUNS_AFTER_PREPOSITIONS.subject.map((p) => (
                    <th key={p} className="text-left py-2 pr-3 font-semibold text-[var(--color-text-secondary)]">{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 pr-3 font-semibold text-[var(--color-text-secondary)]">Subject</td>
                  {PRONOUNS_AFTER_PREPOSITIONS.subject.map((p) => (
                    <td key={p} className="py-2 pr-3 font-mono text-[var(--color-text-primary)]">{p}</td>
                  ))}
                </tr>
                <tr>
                  <td className="py-2 pr-3 font-semibold text-[var(--color-text-secondary)]">Object (after preposition)</td>
                  {PRONOUNS_AFTER_PREPOSITIONS.object.map((p) => (
                    <td key={p} className="py-2 pr-3 font-mono font-bold text-[var(--color-text-link)]">{p}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <StudyTips title="Tips & practice suggestions" items={PREPOSITION_TIPS} />
      </div>
    </PageWrapper>
  );
}

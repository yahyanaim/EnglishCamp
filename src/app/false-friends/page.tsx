"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { useState } from "react";
import { VocabularyPage } from "@/components/layout/VocabularyPage";
import { FALSE_FRIENDS } from "@/data/false-friends";
import { Search, X, ChevronDown } from "lucide-react";

export default function FalseFriendsPage() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const needle = search.trim().toLowerCase();

  const filtered = FALSE_FRIENDS.filter(
    (f) =>
      !needle ||
      f.word1.toLowerCase().includes(needle) ||
      f.word2.toLowerCase().includes(needle) ||
      f.meaning1.toLowerCase().includes(needle) ||
      f.meaning2.toLowerCase().includes(needle)
  );

  const toggle = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <VocabularyPage title="Confusing English words" description="Compare meanings and learn when to use each word.">
      <section className="camp-hub-filters camp-ff-filters" aria-label="Find a word pair">
        <label className="camp-hub-search">
          <Search size={16} aria-hidden="true" />
          <span className="sr-only">Search confusing words</span>
          <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search word pairs…" />
        </label>
        <p className="camp-hub-count" role="status">
          {filtered.length} of {FALSE_FRIENDS.length} word pairs
          {needle ? <> · <button type="button" onClick={() => setSearch("")}><X size={13} aria-hidden="true" />Clear</button></> : null}
        </p>
      </section>

      <section className="camp-learning-library-group" aria-labelledby="ff-heading">
        <h2 id="ff-heading">Word pairs <span className="camp-hub-section-count">{filtered.length}</span></h2>
        <div className="camp-ff-grid">
          {filtered.map((entry) => {
            const open = expanded.has(entry.id);
            return (
              <article key={entry.id} className="camp-ff-card" data-open={open}>
                <button type="button" className="camp-ff-head" aria-expanded={open} onClick={() => toggle(entry.id)}>
                  <span className="camp-ff-pair">
                    <strong>{entry.word1}</strong>
                    <span className="camp-ff-vs" aria-label="versus">vs</span>
                    <strong>{entry.word2}</strong>
                  </span>
                  <ChevronDown className="camp-ff-chevron" size={18} aria-hidden="true" />
                </button>
                <dl className="camp-ff-meanings">
                  <div><dt>{entry.word1}</dt><dd>{entry.meaning1}</dd></div>
                  <div><dt>{entry.word2}</dt><dd>{entry.meaning2}</dd></div>
                </dl>
                {open && (
                  <div className="camp-ff-detail">
                    <div className="camp-ff-examples">
                      <blockquote><small>{entry.word1}</small>&ldquo;{entry.example1}&rdquo;</blockquote>
                      <blockquote><small>{entry.word2}</small>&ldquo;{entry.example2}&rdquo;</blockquote>
                    </div>
                    <p className="camp-ff-tip"><LearningArt name="Lightbulb" size={16} />{entry.tip}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="camp-ff-empty"><LearningArt name="🔍" size={32} /><p>No word pairs match “{search}”.</p></div>
        )}
      </section>
    </VocabularyPage>
  );
}

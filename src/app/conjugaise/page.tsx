"use client";


import { BackButton } from "@/components/ui/BackButton";
import { LearningArt } from "@/components/brand/LearningArt";
import { PageBanner } from "@/components/ui/PageBanner";
import { ArabicText } from "@/components/ui/ArabicText";
import { SelectField } from "@/components/ui/shadcn/select-field";
import { VERB_TENSES, conjugatedForm, unusualReferenceForm, tenseExample, referenceUsage, type VerbTense } from "@/lib/verbTenses";
import { Input } from "@/components/ui/shadcn/input";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Search, X, ArrowRight } from "lucide-react";
import { VERBS } from "@/data/conjugaise";
import type { VerbConjugation } from "@/data/conjugaise";

const PRONOUNS = ["I", "you", "he / she / it", "we", "they"] as const;

const verbArtwork = ["note", "book", "plan", "pattern"];

function VerbCard({ verb, onClick, index }: { verb: VerbConjugation; onClick: () => void; index: number }) {
  const artwork = verbArtwork[index % verbArtwork.length];
  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="camp-grammar-topic-card camp-verb-card group"
    >
      <div className="flex items-start gap-3">
        <span className="camp-verb-symbol"><LearningArt name={artwork} size={22} /></span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-display font-bold text-base text-[var(--color-text-primary)] font-mono">{verb.infinitive}</h3>
          </div>
          <p className="font-body text-xs text-[var(--color-text-secondary)] italic mt-0.5 truncate">{verb.english}</p>
          {verb.arabic && <p className="font-body text-xs text-[var(--color-text-secondary)] italic font-arabic truncate mt-0.5" lang="ar" dir="rtl">{verb.arabic}</p>}
        </div>
        <ArrowRight className="w-4 h-4 text-[var(--color-text-secondary)] group-hover:text-[var(--color-primary)] transition-colors mt-1 shrink-0" />
      </div>
    </motion.button>
  );
}

function ConjugationTable({ verb, tense }: { verb: VerbConjugation; tense: VerbTense }) {
  const meta = VERB_TENSES.find(item=>item.id===tense)!;
  return (
    <div className="camp-conjugation-table">
      <div className="camp-conjugation-table-heading">
        <LearningArt name="clock" size={18} />
        <span className="font-display font-extrabold text-sm">{meta.label}{unusualReferenceForm(verb, tense) ? " · pattern comparison" : ""}</span>
      </div>
      <table aria-label={`${verb.infinitive}: ${meta.label}`}><tbody>
        {PRONOUNS.map((p, i) => (
          <tr key={p}>
            <th scope="row">{p}</th>
            <td>
              {unusualReferenceForm(verb, tense) ? <s>{conjugatedForm(verb, tense, i)}</s> : conjugatedForm(verb, tense, i)}
            </td>
          </tr>
        ))}
      </tbody></table>
    </div>
  );
}

function VerbDetail({ verb, onBack }: { verb: VerbConjugation; onBack: () => void }) {
  const [tense, setTense] = useState<VerbTense>("present");
  const meta = VERB_TENSES.find(item => item.id === tense)!;
  const usage = referenceUsage(verb, tense);
  const examples = (verb.infinitive === "happen" ? [2, 4] : [0, 2]).map(index => tenseExample(verb, tense, index));
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="camp-verb-detail">
    <BackButton onClick={onBack}>Back to verbs</BackButton>
    <header className="camp-verb-identity">
      <div><h2>{verb.infinitive}</h2>{verb.arabic && <ArabicText text={verb.arabic} />}</div>
      <dl className="camp-verb-parts">
        <div><dt>Past</dt><dd>{verb.past}</dd></div>
        <div><dt>Past participle</dt><dd>{verb.pastParticiple}</dd></div>
        <div><dt>-ing form</dt><dd>{verb.presentParticiple}</dd></div>
      </dl>
    </header>
    <div className="camp-verb-workspace">
      <div className="camp-verb-reference">
        <section className="camp-verb-tense-picker" aria-label="Tense and formation">
          <div><label htmlFor="verb-tense">Choose a tense</label><SelectField id="verb-tense" value={tense} onValueChange={value => setTense(value as VerbTense)}>{VERB_TENSES.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}</SelectField></div>
          <div className="camp-verb-formation camp-grammar-formation">
            <p className="camp-verb-formula">{meta.rule}</p>
            <ArabicText text={meta.ar} className="camp-verb-tense-arabic" />
          </div>
        </section>
        <ConjugationTable verb={verb} tense={tense} />
      </div>
      <section className="camp-verb-examples" aria-label="Selected tense examples">
        <h3>{meta.label} in context</h3>
        {usage && <div className="camp-verb-usage"><p>{usage.en}</p><ArabicText text={usage.ar} /></div>}
        <ol>{examples.map((example, index) => <li key={index}>
          {example.preferred ? <><span className="camp-verb-example-label">Usually avoid in this meaning</span><p><s>{example.sentence}</s></p><span className="camp-verb-example-label">Preferred</span><p className="camp-verb-preferred">{example.preferred}</p></> : <p>{example.sentence}</p>}
        </li>)}</ol>
      </section>
    </div>
  </motion.div>;
}

export default function VerbConjugationPage() {
  const [search, setSearch] = useState("");
  const [selectedVerb, setSelectedVerb] = useState<VerbConjugation | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return VERBS;
    const q = search.toLowerCase();
    return VERBS.filter(
      (v) => v.infinitive.toLowerCase().includes(q) || v.english.toLowerCase().includes(q) || (v.arabic && v.arabic.includes(q))
    );
  }, [search]);

  return (
    <PageWrapper className="camp-grammar-page">
      <PageBanner><h1>Verb Conjugation</h1><p>Explore {VERBS.length} verbs in 12 tense and aspect forms, with matching examples.</p></PageBanner>
      <AnimatePresence mode="wait">
        {selectedVerb ? (
          <motion.div key="detail">
            <VerbDetail verb={selectedVerb} onBack={() => setSelectedVerb(null)} />
          </motion.div>
        ) : (
          <motion.div key="list" className="camp-verbs space-y-5">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-secondary)]" />
              <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search verbs..."
                aria-label="Search verbs"
                className="h-11 pl-10 pr-12 font-body"
              />
              {search && (
                <button onClick={() => setSearch("")} aria-label="Clear verb search" className="camp-grammar-control camp-verb-clear">
                  <X className="w-4 h-4 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]" />
                </button>
              )}
            </div>

            {/* Count */}
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xs text-[var(--color-text-secondary)] bg-[var(--color-surface-alt)] px-2.5 py-1 rounded-[var(--radius-pill)]">
                {filtered.length} / {VERBS.length} verbs
              </span>
            </div>

            {/* Results */}
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <LearningArt name="🔍" size={36} className=" block mb-3" />
                <p className="font-display font-bold text-sm text-[var(--color-text-secondary)]">No verbs found</p>
                <p className="font-body text-xs text-[var(--color-text-secondary)] mt-1">Try a different search term</p>
              </div>
            ) : (
              <div className="camp-verb-grid">
                {filtered.map((verb, i) => (
                  <VerbCard key={verb.infinitive} verb={verb} index={i} onClick={() => setSelectedVerb(verb)} />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}

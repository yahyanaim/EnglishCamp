import { DIALOGS } from "./alltagsdialoge";
import { EXAM_INFO } from "./b2-pruefung";
import { BILD_SECTIONS } from "./bildbeschreibung";
import { VERBS } from "./conjugaise";
import { COMPOUND_WORDS } from "./da-komposita";
import { PREPOSITIONS, LOCATION_DIRECTION_PAIRS } from "./declensions";
import { FRAGEN_RULES } from "./fragen";
import { FUTURE_TENSES } from "./futur";
import { INDIREKTE_REDE_RULES } from "./indirekte-rede";
import { COLLOCATIONS } from "./kollokationen";
import { CONDITIONAL_RULES } from "./konjunktiv-ii";
import { KONNEKTOREN } from "./konnektoren";
import { CULTURE_QUESTIONS } from "./landeskunde";
import { DISCOURSE_MARKERS } from "./modalpartikel";
import { WEAK_NOUN_RULES } from "./n-deklination";
import { NEBENSAETZE_RULES } from "./nebensaetze";
import { NOUN_VERB_COLLOCATIONS } from "./nomen-verb-verbindungen";
import { NOMINALIZATIONS } from "./nominalisierung";
import { PARTICIPLE_RULES } from "./partizipien-als-adjektive";
import { PASSIVE_RULES } from "./passiv";
import { PAST_PERFECT_RULES } from "./plusquamperfekt";
import { PRAETERITUM_RULES } from "./praeteritum";
import { REDEMITTEL } from "./redemittel";
import { IDIOMS } from "./redewendungen";
import { REFLEXIVE_VERBS } from "./reflexive-verben";
import { RELATIVE_RULES } from "./relativsaetze";
import { SYNTAX_RULES } from "./satzbau";
import { TOPICS } from "./themen-wortschatz";
import { MISTAKES } from "./typische-fehler";
import { VERB_PATTERNS } from "./unregelmaessige-verben";
import { VERB_PREPOSITIONS } from "./verben-mit-prapositionen";
import { COMPARISON_RULES } from "./vergleiche";
import { PREFIXES, SUFFIXES } from "./wortbildung";
import { WORD_FAMILIES } from "./wortfamilien";
import { CORRELATIVE_CONJUNCTIONS } from "./zweiteilige-konnektoren";

export type SearchEntry = {
  sourceId: string;
  sourceLabel: string;
  sourceHref: string;
  title: string;
  text: string;
  level?: string;
};

function extractTexts(item: any): string[] {
  const texts: string[] = [];
  if (typeof item === "string") { texts.push(item); return texts; }
  if (!item) return texts;
  const keys = ["explanation", "description", "situation", "meaning", "phrase", "english", "note", "desc", "root", "prefix", "type", "formation", "ar", "question_ar", "explain_ar"];
  for (const key of keys) { if (typeof item[key] === "string" && item[key]) texts.push(item[key]); }
  if (item.examples) {
    if (Array.isArray(item.examples)) {
      texts.push(...item.examples.flatMap((e: any) => {
        if (typeof e === "string") return [e];
        if (e.de && e.en) return [e.de, e.en, e.ar].filter(Boolean);
        if (e.example) return [e.example];
        if (e.english) return [e.english, e.arabic].filter(Boolean);
        return [];
      }));
    }
  }
  if (item.words) texts.push(...item.words.flatMap((w: any) => [w.word, w.meaning, w.type, w.definition, w.example].filter(Boolean)));
  if (item.conjugations) texts.push(...item.conjugations.flatMap((c: any) => [c.tense, ...(c.forms || [])].filter(Boolean)));
  if (item.items) texts.push(...item.items.flatMap((sub: any) => extractTexts(sub)));
  if (item.subRules) texts.push(...item.subRules.flatMap((s: any) => [s.label, ...(s.items || [])].filter(Boolean)));
  if (item.lines) texts.push(...item.lines.flatMap((l: any) => [l.de, l.en, l.ar].filter(Boolean)));
  if (item.rows) texts.push(...item.rows.flatMap((r: any) => Object.values(r).filter(Boolean)));
  return texts;
}

function collect(entries: { sourceId: string; sourceLabel: string; sourceHref: string; title: string; text: string; level?: string; }[]): SearchEntry[] {
  return entries;
}

function fromRules(items: any[], sourceId: string, sourceLabel: string, sourceHref: string, titleKey = "title"): SearchEntry[] {
  return items.map((item) => ({
    sourceId, sourceLabel, sourceHref,
    title: typeof item === "string" ? item : item[titleKey] || item.label || item.phrase || item.infinitive || item.root || item.prefix || item.mistake || item.word || "",
    text: extractTexts(item).join(" "),
  }));
}

export const GRAMMAR_SEARCH_INDEX: SearchEntry[] = [
  ...fromRules(DIALOGS.map((d) => ({ title: d.title, explanation: d.situation, lines: d.lines })), "alltagsdialoge", "Everyday Dialogues", "/alltagsdialoge"),
  ...fromRules(EXAM_INFO, "b2-pruefung", "B2 Exam Guide", "/b2-first-guide"),
  ...fromRules(BILD_SECTIONS.map((s: any) => ({ title: s.title, explanation: s.explanation, items: s.phrases })), "bildbeschreibung", "Picture Description", "/picture-description"),
  ...VERBS.slice(0, 200).flatMap((v) => ({
    sourceId: "conjugaise", sourceLabel: "Verb Conjugation", sourceHref: "/verb-conjugation",
    title: v.infinitive, text: extractTexts(v).join(" "),
  })),
  ...fromRules(COMPOUND_WORDS, "da-komposita", "Compound Adverbs", "/compound-words"),
  ...PREPOSITIONS.flatMap((d) => ({
    sourceId: "declensions", sourceLabel: "English Prepositions", sourceHref: "/prepositions",
    title: d.preposition || "Prepositions", text: extractTexts(d).join(" "),
  })),
  ...fromRules(FRAGEN_RULES, "fragen", "Questions", "/question-formation"),
  ...fromRules(FUTURE_TENSES, "futur", "Future Tenses", "/future-tenses"),
  ...fromRules(INDIREKTE_REDE_RULES, "indirekte-rede", "Indirect Speech", "/reported-speech"),
  ...fromRules(COLLOCATIONS, "kollokationen", "Collocations", "/collocations"),
  ...fromRules(CONDITIONAL_RULES, "konjunktiv-ii", "Conditionals", "/conditionals-and-wishes"),
  ...fromRules(KONNEKTOREN, "konnektoren", "Connectives", "/linking-words"),
  ...fromRules(CULTURE_QUESTIONS, "landeskunde", "Cultural Studies", "/landeskunde"),
  ...fromRules(DISCOURSE_MARKERS, "modalpartikel", "Discourse Markers", "/discourse-markers"),
  ...fromRules(WEAK_NOUN_RULES, "n-deklination", "Irregular Plurals", "/irregular-plurals"),
  ...fromRules(NEBENSAETZE_RULES, "nebensaetze", "Subordinate Clauses", "/subordinate-clauses"),
  ...fromRules(NOUN_VERB_COLLOCATIONS, "nomen-verb-verbindungen", "Verb-Noun Collocations", "/verb-noun-collocations"),
  ...fromRules(NOMINALIZATIONS, "nominalisierung", "Nominalization", "/nominalisierung"),
  ...fromRules(PARTICIPLE_RULES, "partizipien-als-adjektive", "Participles as Adj.", "/participle-adjectives"),
  ...fromRules(PASSIVE_RULES, "passiv", "Passive Voice", "/passive-voice"),
  ...fromRules(PAST_PERFECT_RULES, "plusquamperfekt", "Past Perfect", "/past-perfect"),
  ...fromRules(PRAETERITUM_RULES, "praeteritum", "Simple Past", "/simple-past"),
  ...fromRules(REDEMITTEL, "redemittel", "Useful Phrases", "/useful-phrases"),
  ...fromRules(IDIOMS, "redewendungen", "Idioms", "/idioms"),
  ...fromRules(REFLEXIVE_VERBS, "reflexive-verben", "Reflexive Verbs", "/reflexive-verbs"),
  ...fromRules(RELATIVE_RULES, "relativsaetze", "Relative Clauses", "/relative-clauses"),
  ...fromRules(SYNTAX_RULES, "satzbau", "Sentence Structure", "/sentence-structure"),
  ...fromRules(TOPICS, "themen-wortschatz", "Topic Vocabulary", "/topic-vocabulary", "label"),
  ...fromRules(MISTAKES, "typische-fehler", "Common Mistakes", "/common-mistakes", "mistake"),
  ...fromRules(VERB_PATTERNS, "unregelmaessige-verben", "Irregular Verbs", "/irregular-verbs"),
  ...fromRules(VERB_PREPOSITIONS, "verben-mit-prapositionen", "Verbs + Preps", "/verbs-and-prepositions"),
  ...fromRules(COMPARISON_RULES, "vergleiche", "Comparisons", "/comparisons"),
  ...fromRules(PREFIXES, "wortbildung", "Word Formation", "/word-formation", "prefix"),
  ...fromRules(SUFFIXES, "wortbildung", "Word Formation", "/word-formation", "suffix"),
  ...fromRules(WORD_FAMILIES, "wortfamilien", "Word Families", "/wortfamilien"),
  ...fromRules(CORRELATIVE_CONJUNCTIONS, "zweiteilige-konnektoren", "Two-Part Conn.", "/paired-conjunctions"),
];

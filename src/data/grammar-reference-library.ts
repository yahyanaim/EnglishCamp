import type { CheatItem } from './grammar-cheat-sheet';
import { GRAMMAR_SECTIONS } from './grammar-cheat-sheet';
import type { GrammarLesson } from './grammar-reference-more';
import { SYNTAX_RULES } from './satzbau';
import { FRAGEN_RULES } from './fragen';
import { WEAK_NOUN_RULES } from './n-deklination';
import { PRAETERITUM_RULES } from './praeteritum';
import { PAST_PERFECT_RULES } from './plusquamperfekt';
import { PARTICIPLE_RULES } from './partizipien-als-adjektive';
import { NEBENSAETZE_RULES } from './nebensaetze';
import { RELATIVE_RULES } from './relativsaetze';
import { CORRELATIVE_CONJUNCTIONS } from './zweiteilige-konnektoren';
import { DISCOURSE_MARKERS } from './modalpartikel';

/**
 * Grammar Reference lessons built from the grammar guides EnglishCamp already teaches
 * (the topic pages and the printable grammar cheat sheet). English text only; the source
 * banks stay unchanged and keep their own Arabic translations on their pages.
 */
type BankExample = string | { en?: string; english?: string; de?: string };
type BankRule = { title: string; explanation: string; formation?: string; formula?: string; examples: BankExample[]; subRules?: { label: string; items: string[] }[] };

const exampleText = (e: BankExample) => typeof e === 'string' ? e : (e.en ?? e.english ?? e.de ?? '');
const fromBank = (rules: readonly BankRule[]): CheatItem[] => rules.map(rule => {
  const pattern = rule.formation ?? rule.formula;
  const notes = [...(pattern ? [`Pattern: ${pattern}`] : []), ...(rule.subRules?.[0]?.items.slice(0, 4) ?? [])];
  return { title: rule.title, formation: rule.explanation, examples: rule.examples.map(exampleText).filter(Boolean).slice(0, 4).map(en => ({ en })), ...(notes.length ? { notes } : {}) };
});
const cheat = (id: string): CheatItem[] => (GRAMMAR_SECTIONS.find(section => section.id === id)?.content ?? []).map(item => ({ title: item.title, formation: item.formation, examples: item.examples.map(e => ({ en: e.en })), ...(item.notes ? { notes: item.notes } : {}) }));

const pairedConjunctions = (): CheatItem[] => {
  const groups: Record<string, typeof CORRELATIVE_CONJUNCTIONS> = {};
  for (const item of CORRELATIVE_CONJUNCTIONS) groups[item.conjunction] = [...(groups[item.conjunction] ?? []), item];
  return Object.entries(groups).map(([pair, items]) => ({ title: pair, formation: items[0].usage, examples: items.slice(0, 3).map(i => ({ en: i.exampleEn })), ...(items.length > 1 ? { notes: items.slice(1, 3).map(i => i.usage) } : {}) }));
};
const MARKER_FUNCTIONS: Record<string, string> = { adding: 'Adding and correcting', contrasting: 'Contrasting', opinion: 'Giving an opinion', explaining: 'Explaining', summarizing: 'Summarising', sequencing: 'Sequencing', attitude: 'Showing attitude' };
const discourseMarkers = (): CheatItem[] => Object.entries(MARKER_FUNCTIONS).map(([fn, title]) => {
  const items = DISCOURSE_MARKERS.filter(m => m.function === fn);
  return { title, formation: `Markers: ${items.map(m => m.marker).join(', ')}.`, examples: items.slice(0, 3).map(m => ({ en: m.example })), notes: items.slice(0, 3).map(m => `${m.marker}: ${m.meaning}`) };
}).filter(item => item.examples.length > 0);

export const GRAMMAR_LIBRARY: (GrammarLesson & { art?: string; from: string })[] = [
  // A1
  { id: 'word-order', title: 'Word order and sentence building', level: 'A1', art: 'pattern', from: '/sentence-structure',
    intro: 'English depends on word order: subject, verb, object, then place and time. These patterns also cover questions, negatives and commands.',
    content: fromBank(SYNTAX_RULES as unknown as BankRule[]) },
  { id: 'asking-questions', title: 'Asking questions', level: 'A1', art: 'pattern', from: '/question-formation',
    intro: 'Open wh- questions, yes/no questions, subject questions, question tags and polite indirect questions, each with its word order.',
    content: fromBank(FRAGEN_RULES as unknown as BankRule[]) },
  // A2
  { id: 'simple-past-guide', title: 'Simple past in depth', level: 'A2', art: 'clock', from: '/simple-past',
    intro: 'When to use the simple past, regular and irregular forms, was/were, negatives and questions, and how it differs from the present perfect.',
    content: fromBank(PRAETERITUM_RULES as unknown as BankRule[]) },
  { id: 'irregular-plurals-guide', title: 'Irregular plural nouns', level: 'A2', art: 'book', from: '/irregular-plurals',
    intro: 'Plurals that do not add -s: -man to -men, vowel changes like foot to feet, and the everyday nouns to learn by heart.',
    content: fromBank(WEAK_NOUN_RULES as unknown as BankRule[]) },
  { id: 'tense-overview', title: 'Tense and aspect overview', level: 'A2', art: 'clock', from: '/grammar/cheat-sheet',
    intro: 'A one-page map of the main tenses: present, past, present perfect, past perfect and the ways to talk about the future.',
    content: cheat('tenses') },
  // B1
  { id: 'past-perfect-guide', title: 'Past perfect: the past before the past', level: 'B1', art: 'clock', from: '/past-perfect',
    intro: 'Use had + past participle to show which past event happened first, with time words like before, after, by the time and already.',
    content: fromBank(PAST_PERFECT_RULES as unknown as BankRule[]) },
  { id: 'participle-adjectives-guide', title: '-ing and -ed adjectives', level: 'B1', art: 'pattern', from: '/participle-adjectives',
    intro: 'Boring or bored? -ing adjectives describe the cause of a feeling; -ed adjectives describe the person who has the feeling.',
    content: fromBank(PARTICIPLE_RULES as unknown as BankRule[]) },
  { id: 'clauses-guide', title: 'Main and subordinate clauses', level: 'B1', art: 'pattern', from: '/subordinate-clauses',
    intro: 'Build longer sentences with clauses of reason, time, condition, purpose, concession and result, and the conjunctions that introduce them.',
    content: fromBank(NEBENSAETZE_RULES as unknown as BankRule[]) },
  { id: 'relative-clauses-guide', title: 'Relative clauses in depth', level: 'B1', art: 'pattern', from: '/relative-clauses',
    intro: 'Who, which, that, whose and whom; defining and non-defining clauses; leaving out the pronoun; and prepositions in relative clauses.',
    content: fromBank(RELATIVE_RULES as unknown as BankRule[]) },
  { id: 'linking-words-guide', title: 'Linking words by meaning', level: 'B1', art: 'pattern', from: '/linking-words',
    intro: 'Connectors grouped by what they express: cause, contrast, condition, time, purpose, result, addition and more.',
    content: cheat('connectives') },
  // B2
  { id: 'paired-conjunctions-guide', title: 'Paired conjunctions', level: 'B2', art: 'pattern', from: '/paired-conjunctions',
    intro: 'Both…and, either…or, neither…nor, not only…but also and whether…or: how each pair links two balanced ideas.',
    content: pairedConjunctions() },
  { id: 'discourse-markers-guide', title: 'Discourse markers by function', level: 'B2', art: 'pattern', from: '/discourse-markers',
    intro: 'Actually, however, basically, to sum up: markers that organise speech and writing, grouped by what they do.',
    content: discourseMarkers() },
];

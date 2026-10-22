"use client";
import { useEffect, useCallback } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import {
  BarChart3, BookHeart, BookOpen, BookCopy, MessageSquareText,
  Gamepad2, FileText, BookMarked, Table2, Search,
  Languages, ArrowLeftRight, Printer, Layout, Link2, Shield, Gem,
  GitFork, MessageSquareQuote, CaseSensitive, Network, Split,
  CornerDownRight, History, Clock, Clock9, ArrowBigRightDash, UserMinus,
  Scale, HelpCircle, MessageSquare, GitBranch, RefreshCcw, AlertCircle,
  Puzzle, BookA, MapPin, Mic, Users, Image, BookOpenText, AlertTriangle,
  Quote, BookText, BarChart4, Zap, RotateCcw, Trophy, Target, Calendar,
  GraduationCap, Sparkles, Lightbulb, Library, ChevronRight, Brain, Ear, Shuffle, Globe, MessageCircle,
} from "lucide-react";
import { levels } from "@/data/content";
import type { LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CmdItem = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  group: string;
};

const MAIN_ITEMS: CmdItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/dashboard", icon: BarChart3, group: "Main" },
  { id: "vocabulary", label: "Vocabulary", href: "/vocabulary", icon: BookHeart, group: "Main" },
  { id: "flashcards", label: "Flashcards", href: "/flashcards", icon: BookOpen, group: "Main" },
  { id: "custom-flashcards", label: "My Cards", href: "/custom-flashcards", icon: BookCopy, group: "Main" },
  { id: "phonics", label: "Phonics / IPA", href: "/phonics", icon: MessageSquareText, group: "Main" },
];

const PRACTICE_ITEMS: CmdItem[] = [
  { id: "practice", label: "Practice Hub", href: "/practice", icon: Gamepad2, group: "Practice" },
  { id: "writing", label: "Writing", href: "/writing", icon: FileText, group: "Practice" },
  { id: "conjugaise", label: "Conjugaise", href: "/conjugaise", icon: BookMarked, group: "Practice" },
  { id: "declensions", label: "Prepositions Guide", href: "/declensions", icon: Table2, group: "Practice" },
  { id: "text-analyzer", label: "Text Analyzer", href: "/text-analyzer", icon: FileText, group: "Practice" },
  { id: "search-page", label: "Search", href: "/search", icon: Search, group: "Practice" },
  { id: "knowledge-check", label: "Knowledge Check", href: "/knowledge-check", icon: Brain, group: "Practice" },
  { id: "speed-match", label: "Speed Match", href: "/speed-match", icon: Zap, group: "Practice" },
  { id: "listening-lab", label: "Listening Lab", href: "/listening-lab", icon: Ear, group: "Practice" },
  { id: "buchstabensalat", label: "Word Scramble", href: "/buchstabensalat", icon: Shuffle, group: "Practice" },
  { id: "sprint", label: "Sprint", href: "/sprint", icon: Zap, group: "Practice" },
  { id: "konjunktionen-challenge", label: "Conjunctions Challenge", href: "/konjunktionen-challenge", icon: Link2, group: "Practice" },
  { id: "tenses-quiz", label: "Tenses Quiz", href: "/tenses-quiz", icon: Clock, group: "Practice" },
  { id: "briefe-schreiben", label: "Letter Writing", href: "/briefe-schreiben", icon: FileText, group: "Practice" },
  { id: "landeskunde-quiz", label: "Culture Quiz", href: "/landeskunde-quiz", icon: Globe, group: "Practice" },
  { id: "redemittel-praxis", label: "Phrases Practice", href: "/redemittel-praxis", icon: MessageSquare, group: "Practice" },
  { id: "artikel-meister", label: "Article Master", href: "/artikel-meister", icon: Target, group: "Practice" },
  { id: "satz-ubersetzer", label: "Sentence Translator", href: "/satz-ubersetzer", icon: ArrowLeftRight, group: "Practice" },
  { id: "themen-vokabeln", label: "Topic Vocab", href: "/themen-vokabeln", icon: BookText, group: "Practice" },
  { id: "redewendungen-ubersetzer", label: "Idioms Translator", href: "/redewendungen-ubersetzer", icon: Quote, group: "Practice" },
  { id: "kollokationen-ubersetzer", label: "Collocations Translator", href: "/kollokationen-ubersetzer", icon: Link2, group: "Practice" },
  { id: "dialoge-ubersetzer", label: "Dialogues Translator", href: "/dialoge-ubersetzer", icon: MessageCircle, group: "Practice" },
  { id: "modalpartikel-ubersetzer", label: "Discourse Markers", href: "/modalpartikel-ubersetzer", icon: MessageSquare, group: "Practice" },
  { id: "nvv-ubersetzer", label: "Collocations Translator", href: "/nvv-ubersetzer", icon: BookMarked, group: "Practice" },
  { id: "verbprep-ubersetzer", label: "Verbs+Preps Translator", href: "/verben-mit-praepositionen-ubersetzer", icon: ArrowLeftRight, group: "Practice" },
  { id: "dakomp-ubersetzer", label: "Compound Adverbs", href: "/da-komposita-ubersetzer", icon: Link2, group: "Practice" },
  { id: "satzmuster-ubersetzer", label: "Patterns Translator", href: "/satzmuster-ubersetzer", icon: Layout, group: "Practice" },
  { id: "wortpaare-quiz", label: "Word Pairs Quiz", href: "/wortpaare-quiz", icon: Shuffle, group: "Practice" },
  { id: "vergleiche-ubersetzer", label: "Comparisons Translator", href: "/vergleiche-ubersetzer", icon: Scale, group: "Practice" },
  { id: "false-friends-ubersetzer", label: "False Friends Translator", href: "/false-friends-ubersetzer", icon: AlertTriangle, group: "Practice" },
  { id: "fragen-ubersetzer", label: "Questions Translator", href: "/fragen-ubersetzer", icon: HelpCircle, group: "Practice" },
  { id: "praeteritum-ubersetzer", label: "Past Tense Translator", href: "/praeteritum-ubersetzer", icon: Clock, group: "Practice" },
  { id: "essay-templates", label: "Essay Templates", href: "/essay-templates", icon: FileText, group: "Practice" },
];

const GRAMMAR_ITEMS: CmdItem[] = [
  { id: "grammar", label: "Grammar Ref", href: "/grammar", icon: Languages, group: "Grammar" },
  { id: "grammar-compare", label: "Compare", href: "/grammar-compare", icon: ArrowLeftRight, group: "Grammar" },
  { id: "cheat-sheet", label: "Cheat Sheet", href: "/grammar/cheat-sheet", icon: Printer, group: "Grammar" },
  { id: "satzbau", label: "Sentence Structure", href: "/satzbau", icon: Layout, group: "Grammar" },
  { id: "konnektoren", label: "Connectives", href: "/konnektoren", icon: Link2, group: "Grammar" },
  { id: "passiv", label: "Passive Voice", href: "/passiv", icon: Shield, group: "Grammar" },
  { id: "konjunktiv-ii", label: "Conditionals & Wishes", href: "/konjunktiv-ii", icon: Gem, group: "Grammar" },
  { id: "relativsaetze", label: "Relative Clauses", href: "/relativsaetze", icon: GitFork, group: "Grammar" },
  { id: "indirekte-rede", label: "Indirect Speech", href: "/indirekte-rede", icon: MessageSquareQuote, group: "Grammar" },
  { id: "partizipien", label: "Participles as Adj.", href: "/partizipien-als-adjektive", icon: CaseSensitive, group: "Grammar" },
  { id: "nebensaetze", label: "Subordinate Clauses", href: "/nebensaetze", icon: Network, group: "Grammar" },
  { id: "zweiteilige-konnektoren", label: "Two-Part Conn.", href: "/zweiteilige-konnektoren", icon: Split, group: "Grammar" },
  { id: "da-komposita", label: "Compound Adverbs", href: "/da-komposita", icon: CornerDownRight, group: "Grammar" },
  { id: "praeteritum", label: "Simple Past", href: "/praeteritum", icon: History, group: "Grammar" },
  { id: "plusquamperfekt", label: "Past Perfect", href: "/plusquamperfekt", icon: Clock9, group: "Grammar" },
  { id: "futur", label: "Future Tenses", href: "/futur", icon: ArrowBigRightDash, group: "Grammar" },
  { id: "n-deklination", label: "Irregular Plurals", href: "/n-deklination", icon: UserMinus, group: "Grammar" },
  { id: "vergleiche", label: "Comparisons", href: "/vergleiche", icon: Scale, group: "Grammar" },
  { id: "fragen", label: "Questions", href: "/fragen", icon: HelpCircle, group: "Grammar" },
  { id: "modalpartikel", label: "Discourse Markers", href: "/modalpartikel", icon: MessageSquare, group: "Grammar" },
  { id: "unregelmaessige-verben", label: "Irregular Verbs", href: "/unregelmaessige-verben", icon: GitBranch, group: "Grammar" },
  { id: "reflexive-verben", label: "Reflexive Verbs", href: "/reflexive-verben", icon: RefreshCcw, group: "Grammar" },
  { id: "typische-fehler", label: "Common Mistakes", href: "/typische-fehler", icon: AlertCircle, group: "Grammar" },
  { id: "wortbildung", label: "Word Formation", href: "/wortbildung", icon: Puzzle, group: "Grammar" },
  { id: "verb-tables", label: "Verb Tables", href: "/verb-tables", icon: Table2, group: "Grammar" },
  { id: "satzmuster", label: "Sentence Patterns", href: "/satzmuster", icon: Layout, group: "Grammar" },
  { id: "tenses-guide", label: "Tenses Guide", href: "/tenses-guide", icon: CaseSensitive, group: "Grammar" },
  { id: "prefix-verbs", label: "Prefix Verbs", href: "/prefix-verbs", icon: GitBranch, group: "Grammar" },
  { id: "wortpaare", label: "Word Pairs", href: "/wortpaare", icon: ArrowLeftRight, group: "Grammar" },
];

const VOCAB_ITEMS: CmdItem[] = [
  { id: "redemittel", label: "Useful Phrases", href: "/redemittel", icon: MessageSquare, group: "Vocab & Speaking" },
  { id: "redewendungen", label: "Idioms", href: "/redewendungen", icon: Quote, group: "Vocab & Speaking" },
  { id: "themen-wortschatz", label: "Topic Vocabulary", href: "/themen-wortschatz", icon: BookText, group: "Vocab & Speaking" },
  { id: "nomen-verb-verbindungen", label: "Verb-Noun Collocations", href: "/nomen-verb-verbindungen", icon: BookA, group: "Vocab & Speaking" },
  { id: "verben-mit-prapositionen", label: "Verbs + Preps", href: "/verben-mit-prapositionen", icon: MapPin, group: "Vocab & Speaking" },
  { id: "pronunciation", label: "Pronunciation", href: "/pronunciation", icon: Mic, group: "Vocab & Speaking" },
  { id: "conversation", label: "Conversations", href: "/conversation", icon: Users, group: "Vocab & Speaking" },
  { id: "bildbeschreibung", label: "Picture Desc.", href: "/bildbeschreibung", icon: Image, group: "Vocab & Speaking" },
  { id: "reading", label: "Reading", href: "/vocabulary", icon: BookOpenText, group: "Vocab & Speaking" },
  { id: "false-friends", label: "False Friends", href: "/false-friends", icon: AlertTriangle, group: "Vocab & Speaking" },
  { id: "kollokationen", label: "Collocations", href: "/kollokationen", icon: Link2, group: "Vocab & Speaking" },
  { id: "british-vs-american", label: "British vs American", href: "/british-vs-american", icon: Globe, group: "Vocab & Speaking" },
];

const PROGRESS_ITEMS: CmdItem[] = [
  { id: "daily-challenge", label: "Daily Challenge", href: "/daily-challenge", icon: Zap, group: "Progress" },
  { id: "review", label: "Review Queue", href: "/review", icon: RotateCcw, group: "Progress" },
  { id: "badges", label: "Badges", href: "/badges", icon: Trophy, group: "Progress" },
  { id: "weak-areas", label: "Weak Areas", href: "/weak-areas", icon: AlertTriangle, group: "Progress" },
  { id: "stats", label: "Statistics", href: "/stats", icon: BarChart4, group: "Progress" },
  { id: "study-plan", label: "Study Plan", href: "/study-plan", icon: Target, group: "Progress" },
  { id: "weekly-report", label: "Weekly Report", href: "/weekly-report", icon: Calendar, group: "Progress" },
  { id: "exam-guide", label: "IELTS & TOEFL Guide", href: "/b2-pruefung", icon: GraduationCap, group: "Progress" },
  { id: "mock-exam", label: "Mock Exam", href: "/mock-exam", icon: Shield, group: "Progress" },
  { id: "challenge", label: "Challenges", href: "/challenge", icon: Zap, group: "Progress" },
  { id: "study-strategies", label: "Study Strategies", href: "/study-strategies", icon: Target, group: "Progress" },
];

const LEVEL_ICONS: LucideIcon[] = [Sparkles, Lightbulb, BookMarked, Library];

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const run = useCallback((href: string) => {
    onOpenChange(false);
    router.push(href);
  }, [router, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="fixed inset-0 bg-[var(--color-surface-overlay)]" onClick={() => onOpenChange(false)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-[640px] bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] overflow-hidden sm:mx-auto"
            style={{ boxShadow: "0 4px 0 var(--color-border-default), var(--shadow-4)" }}
          >
            <Command label="Navigation search" shouldFilter={true}>
              <div className="flex items-center gap-2 px-4 border-b border-[var(--color-border-default)]">
                <Search className="w-4 h-4 text-[var(--color-text-secondary)] shrink-0" />
                <Command.Input
                  placeholder="Search pages..."
                  className="w-full h-12 bg-transparent font-body text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-disabled)] outline-none border-0"
                  autoFocus
                />
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[var(--color-neutral-100)] text-[10px] font-mono text-[var(--color-text-disabled)] border border-[var(--color-border-default)] shrink-0">
                  ESC
                </kbd>
              </div>
              <div className="max-h-[420px] overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center">
                  <span className="text-2xl block mb-2">🔍</span>
                  <p className="font-display font-bold text-sm text-[var(--color-text-secondary)]">No results found</p>
                  <p className="font-body text-xs text-[var(--color-text-disabled)] mt-1">Try a different search term</p>
                </Command.Empty>

                {[MAIN_ITEMS, PRACTICE_ITEMS, GRAMMAR_ITEMS, VOCAB_ITEMS, PROGRESS_ITEMS].map((group) => (
                  <Command.Group key={group[0]?.group || "x"} heading={group[0]?.group || ""}>
                    {group.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Command.Item
                          key={item.id}
                          value={item.id}
                          onSelect={() => run(item.href)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] font-body text-sm text-[var(--color-text-primary)] cursor-pointer data-[selected=true]:bg-[var(--color-primary-subtle)] data-[selected=true]:text-[var(--color-primary-dark)] transition-all"
                        >
                          <Icon className="w-4 h-4 text-[var(--color-text-secondary)] shrink-0" />
                          <span>{item.label}</span>
                        </Command.Item>
                      );
                    })}
                  </Command.Group>
                ))}

                <Command.Group heading="Practice Courses">
                  {levels.map((level, i) => {
                    const Icon = LEVEL_ICONS[i % LEVEL_ICONS.length];
                    return (
                      <Command.Item
                        key={`course-${level.id}`}
                        value={`course-${level.title}-${level.id}`}
                        onSelect={() => run(`/levels/${level.id}`)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] font-body text-sm text-[var(--color-text-primary)] cursor-pointer data-[selected=true]:bg-[var(--color-primary-subtle)] data-[selected=true]:text-[var(--color-primary-dark)] transition-all"
                      >
                        <Icon className="w-4 h-4 shrink-0" style={{ color: level.accent }} />
                        <span className="truncate">{level.title}</span>
                        <span className="ml-auto font-display font-extrabold text-[10px] uppercase px-1.5 py-0.5 rounded shrink-0" style={{ color: level.accent, backgroundColor: `${level.accent}15` }}>{level.examBadge || level.id}</span>
                      </Command.Item>
                    );
                  })}
                </Command.Group>

                <Command.Group heading="Mock Tests">
                  {[
                    { href: "/mock-exam?exam=ielts-academic", label: "IELTS Academic Mock Exam", badge: "Band 9", accent: "#a855f7" },
                    { href: "/mock-exam?exam=ielts-general", label: "IELTS General Mock Exam", badge: "General", accent: "#f97316" },
                    { href: "/mock-exam?exam=toefl-ibt", label: "TOEFL iBT Mock Exam", badge: "120 Pts", accent: "#0ea5e9" },
                    { href: "/b2-pruefung", label: "B2 First (FCE) Cambridge Exam", badge: "Cambridge", accent: "#10b981" },
                  ].map((test) => (
                    <Command.Item
                      key={test.href}
                      value={`mock-test-${test.label}`}
                      onSelect={() => run(test.href)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] font-body text-sm text-[var(--color-text-primary)] cursor-pointer data-[selected=true]:bg-[var(--color-primary-subtle)] data-[selected=true]:text-[var(--color-primary-dark)] transition-all"
                    >
                      <Shield className="w-4 h-4 shrink-0" style={{ color: test.accent }} />
                      <span className="truncate">{test.label}</span>
                      <span className="ml-auto font-display font-extrabold text-[10px] uppercase px-1.5 py-0.5 rounded shrink-0" style={{ color: test.accent, backgroundColor: `${test.accent}15` }}>{test.badge}</span>
                    </Command.Item>
                  ))}
                </Command.Group>
              </div>
              <div className="flex items-center gap-4 px-4 py-2.5 border-t border-[var(--color-border-default)] bg-[var(--color-surface-alt)]">
                <div className="flex items-center gap-1.5 text-[10px] text-[var(--color-text-disabled)]">
                  <kbd className="px-1 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border-default)] font-mono text-[10px]">↑↓</kbd>
                  <span>navigate</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[var(--color-text-disabled)]">
                  <kbd className="px-1 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border-default)] font-mono text-[10px]">↵</kbd>
                  <span>open</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-[var(--color-text-disabled)]">
                  <kbd className="px-1 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border-default)] font-mono text-[10px]">esc</kbd>
                  <span>close</span>
                </div>
              </div>
            </Command>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

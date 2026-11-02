"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { LevelEncouragement } from "@/components/ui/LevelEncouragement";
import { ExamTrackLinks } from "./ExamTrackLinks";
import { BrandMark } from "@/components/brand/BrandMark";
import { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  GraduationCap, BarChart3, BookOpen, Library, Lightbulb,
  ChevronRight, Sparkles, BookMarked, MessageSquareText,
  BookHeart, Search, Zap, AlertTriangle, Languages,
  BookOpenText, BookCopy, BarChart4, Gamepad2, ChevronDown,
  Table2, Link2, MapPin, BookA, MessageCircle,
  Puzzle, Layout, Quote, BookText,
  MessageSquare, Image, GitBranch, RefreshCcw, AlertCircle,
  Shield, Gem, Split, GitFork, MessageSquareQuote, CaseSensitive,
  CornerDownRight, Network, History, UserMinus, Clock, Clock9, ArrowBigRightDash, Scale, HelpCircle,
  FileText, ArrowLeftRight, Target, Trophy, RotateCcw, Users, Mic, Calendar, Printer, Brain, Ear, Shuffle, Globe, NotepadText, Award,
  Dumbbell, X,
} from "lucide-react";
import { useProgress } from "@/store/useProgress";
import { getLevelInfo } from "@/lib/xp";
import { courseCatalogue as levels } from "@/data/course-catalogue";
import type { LucideIcon } from "lucide-react";

type NavLink = { href: string; label: string; icon: LucideIcon; dot?: boolean; accent?: string };
type NavSection = { id: string; label: string; icon: LucideIcon; links: NavLink[] };

const NAV_MAIN: NavLink[] = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/dashboard#courses", label: "Courses", icon: Library },
  { href: "/practice", label: "Practice", icon: Gamepad2 },
  { href: "/mock-exam", label: "Mock Exams", icon: GraduationCap },
  { href: "/vocabulary", label: "Vocabulary", icon: BookHeart },
  { href: "/flashcards", label: "Flashcards", icon: BookOpen },
  { href: "/shadowing-english", label: "Shadowing English", icon: Mic },
];

const NAV_SECTIONS: NavSection[] = [
  {
    id: "practice", label: "Practice library", icon: Gamepad2,
    links: [
      { href: "/practice", label: "Practice Hub", icon: Gamepad2 },
      { href: "/writing", label: "Writing", icon: FileText },
      { href: "/verb-conjugation", label: "Verb Conjugation", icon: BookMarked },
      { href: "/prepositions", label: "Prepositions Guide", icon: Table2 },
      { href: "/text-analyzer", label: "Text Analyzer", icon: FileText },
      { href: "/search", label: "Search", icon: Search },
      { href: "/knowledge-check", label: "Knowledge Check", icon: Brain },
      { href: "/speed-match", label: "Speed Match", icon: Zap },
      { href: "/listening-lab", label: "Listening Lab", icon: Ear },
      { href: "/word-scramble", label: "Word Scramble", icon: Shuffle },
      { href: "/sprint", label: "Sprint", icon: Zap },
      { href: "/conjunction-challenge", label: "Conjunctions", icon: Link2 },
      { href: "/tenses-quiz", label: "Tenses Quiz", icon: Clock },
      { href: "/letter-writing", label: "Letter Writing", icon: FileText },
      { href: "/culture-quiz", label: "Culture Quiz", icon: Globe },
      { href: "/phrases-practice", label: "Phrases Practice", icon: MessageSquare },
      { href: "/article-master", label: "Article Master", icon: Target },
      { href: "/sentence-translation", label: "Sentence Translator", icon: ArrowLeftRight },
      { href: "/topic-vocabulary-practice", label: "Topic Vocab", icon: BookText },
      { href: "/idiom-practice", label: "Idioms Practice", icon: Quote },
      { href: "/collocation-practice", label: "Collocations Practice", icon: Link2 },
      { href: "/dialogue-practice", label: "Dialogues Practice", icon: MessageCircle },
      { href: "/discourse-marker-practice", label: "Discourse Markers", icon: MessageSquare },
      { href: "/verb-noun-collocation-practice", label: "Collocations Practice", icon: BookMarked },
      { href: "/verb-preposition-practice", label: "Verbs+Preps Practice", icon: ArrowLeftRight },
      { href: "/compound-adverbs-practice", label: "Compound Adverbs", icon: Link2 },
      { href: "/sentence-pattern-practice", label: "Patterns Practice", icon: Layout },
      { href: "/word-pairs-quiz", label: "Word Pairs Quiz", icon: Shuffle },
      { href: "/comparison-practice", label: "Comparisons Practice", icon: Scale },
      { href: "/false-friends-practice", label: "False Friends Practice", icon: AlertTriangle },
      { href: "/question-practice", label: "Questions Practice", icon: HelpCircle },
      { href: "/past-tense-practice", label: "Past Tense Practice", icon: Clock },
      { href: "/essay-templates", label: "Essay Templates", icon: FileText },
    ],
  },
  {
    id: "grammar", label: "Grammar", icon: Languages,
    links: [
      { href: "/grammar", label: "Grammar Ref", icon: Languages },
      { href: "/grammar-compare", label: "Compare", icon: ArrowLeftRight },
      { href: "/grammar/cheat-sheet", label: "Cheat Sheet", icon: Printer },
      { href: "/sentence-structure", label: "Sentence Structure", icon: Layout },
      { href: "/linking-words", label: "Connectives", icon: Link2 },
      { href: "/passive-voice", label: "Passive Voice", icon: Shield },
      { href: "/conditionals-and-wishes", label: "Conditionals & Wishes", icon: Gem },
      { href: "/relative-clauses", label: "Relative Clauses", icon: GitFork },
      { href: "/reported-speech", label: "Indirect Speech", icon: MessageSquareQuote },
      { href: "/participle-adjectives", label: "Participles as Adj.", icon: CaseSensitive },
      { href: "/subordinate-clauses", label: "Subordinate Clauses", icon: Network },
      { href: "/paired-conjunctions", label: "Two-Part Conn.", icon: Split },
      { href: "/compound-words", label: "Compound Adverbs", icon: CornerDownRight },
      { href: "/simple-past", label: "Simple Past", icon: History },
      { href: "/past-perfect", label: "Past Perfect", icon: Clock9 },
      { href: "/future-tenses", label: "Future Tenses", icon: ArrowBigRightDash },
      { href: "/irregular-plurals", label: "Irregular Plurals", icon: UserMinus },
      { href: "/comparisons", label: "Comparisons", icon: Scale },
      { href: "/question-formation", label: "Questions", icon: HelpCircle },
      { href: "/discourse-markers", label: "Discourse Markers", icon: MessageSquare },
      { href: "/irregular-verbs", label: "Irregular Verbs", icon: GitBranch },
      { href: "/reflexive-verbs", label: "Reflexive Verbs", icon: RefreshCcw },
      { href: "/common-mistakes", label: "Common Mistakes", icon: AlertCircle },
      { href: "/word-formation", label: "Word Formation", icon: Puzzle },
      { href: "/verb-tables", label: "Verb Tables", icon: Table2 },
      { href: "/sentence-patterns", label: "Sentence Patterns", icon: Layout },
      { href: "/tenses-guide", label: "Tenses Guide", icon: CaseSensitive },
      { href: "/prefix-verbs", label: "Prefix Verbs", icon: GitBranch },
      { href: "/word-pairs", label: "Word Pairs", icon: ArrowLeftRight },
    ],
  },
  {
    id: "vocab-speaking", label: "Vocab & Speaking", icon: BookHeart,
    links: [
      { href: "/custom-flashcards", label: "My Cards", icon: BookCopy },
      { href: "/phonics", label: "Phonics / IPA", icon: MessageSquareText },
      { href: "/useful-phrases", label: "Useful Phrases", icon: MessageCircle },
      { href: "/idioms", label: "Idioms", icon: Quote },
      { href: "/topic-vocabulary", label: "Topic Vocabulary", icon: BookText },
      { href: "/verb-noun-collocations", label: "Verb-Noun Collocations", icon: BookA },
      { href: "/verbs-and-prepositions", label: "Verbs + Preps", icon: MapPin },
      { href: "/pronunciation", label: "Pronunciation", icon: Mic },
      { href: "/conversation", label: "Conversations", icon: Users },
      { href: "/picture-description", label: "Picture Desc.", icon: Image },
      { href: "/vocabulary", label: "Reading", icon: BookOpenText },
      { href: "/false-friends", label: "False Friends", icon: AlertTriangle },
      { href: "/collocations", label: "Collocations", icon: Link2 },
      { href: "/british-vs-american", label: "British vs American", icon: Globe },
    ],
  },
  {
    id: "progress", label: "Progress", icon: BarChart4,
    links: [
      { href: "/my-notes", label: "My notes", icon: NotepadText },
      { href: "/daily-challenge", label: "Daily Challenge", icon: Zap },
      { href: "/review", label: "Review Queue", icon: RotateCcw },
      { href: "/badges", label: "Badges", icon: Trophy },
      { href: "/weak-areas", label: "Weak Areas", icon: AlertTriangle },
      { href: "/stats", label: "Statistics", icon: BarChart4 },
      { href: "/study-plan", label: "Study Plan", icon: Target },
      { href: "/weekly-report", label: "Weekly Report", icon: Calendar },
      { href: "/b2-first-guide", label: "B2 First (FCE) Guide", icon: GraduationCap },
      { href: "/ielts", label: "IELTS Guide", icon: GraduationCap },
      { href: "/toefl", label: "TOEFL Guide", icon: GraduationCap },
      { href: "/mock-exam", label: "Mock Exam", icon: Shield },
      { href: "/challenge", label: "Challenges", icon: Zap },
      { href: "/study-strategies", label: "Study Strategies", icon: Target },
    ],
  },
];

const LEVEL_ICONS = [Sparkles, Lightbulb, BookMarked, Library];



const SECTION_STORAGE_KEY = "englishcamp-sidebar-sections";

function getDefaultOpen(): Record<string, boolean> {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(SECTION_STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {};
}

function NavItem({ href, icon: Icon, label, active }: { href: string; icon: LucideIcon; label: string; active: boolean }) {
  return (
    <Link prefetch={false} href={href} className={cn(
      "group relative flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-all duration-200",
      active
        ? "bg-[var(--color-primary-subtle)] text-[var(--color-text-link)]"
        : "text-[var(--color-text-secondary)] hover:bg-[var(--color-neutral-50)] hover:text-[var(--color-text-primary)]"
    )}>
      {active && (
        <motion.span layoutId="sidebar-active" className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-[var(--color-primary)]" />
      )}
      <div className={cn(
        "flex items-center justify-center w-7 h-7 rounded-[var(--radius-md)] transition-all duration-200 flex-shrink-0",
        active ? "bg-[var(--color-primary-subtle)] text-[var(--color-primary)]" : "bg-transparent text-[var(--color-text-secondary)] group-hover:bg-[var(--color-neutral-50)] group-hover:text-[var(--color-text-secondary)]"
      )}>
        <LearningArt name={Icon.displayName || "book"} className="w-4 h-4" />
      </div>
      <span className="truncate">{label}</span>
    </Link>
  );
}

function CollapsibleSection({ section, pathname, isOpen, onToggle }: {
  section: NavSection;
  pathname: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const isAnyActive = section.links.some((l) => pathname === l.href);
  return (
    <div className="mb-0.5 px-1">
      <button
        onClick={onToggle}
        className={cn(
          "flex items-center gap-2 w-full px-2 py-2 rounded-[var(--radius-md)] text-xs font-display font-bold uppercase tracking-widest transition-all",
          isAnyActive ? "text-[var(--color-primary)]" : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-secondary)]"
        )}
      >
        <div className={cn(
          "flex items-center justify-center w-5 h-5 rounded-[var(--radius-sm)] transition-all",
          isAnyActive ? "bg-[var(--color-primary-subtle)] text-[var(--color-primary)]" : "text-[var(--color-text-secondary)]"
        )}>
          <LearningArt name={section.icon.displayName || "book"} className="w-3.5 h-3.5" />
        </div>
        <span className="flex-1 text-left">{section.label}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3.5 h-3.5" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={section.id}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="ml-2 pl-2 border-l border-[var(--color-border-default)] space-y-0.5 mt-0.5">
              {section.links.map((item) => (
                <NavItem key={item.href} {...item} active={pathname === item.href} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Sidebar({ open, onClose }: { open?: boolean; onClose?: () => void }) {
  const pathname = usePathname().replace(/^\/(?:en|ar)(?=\/)/, "");
  const drawerRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const xp = useProgress(state => state.xp);
  const levelInfo = getLevelInfo(xp);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setOpenSections(getDefaultOpen());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try { localStorage.setItem(SECTION_STORAGE_KEY, JSON.stringify(openSections)); } catch {}
  }, [openSections, mounted]);

  useEffect(() => {
    if (!open || !onClose) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) onClose(); };
    document.body.style.overflow = "hidden";
    closeRef.current?.focus({ preventScroll: true });
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onClose(); }
      if (event.key !== "Tab") return;
      const controls = Array.from(drawerRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]') ?? [])
        .filter(element => element.getClientRects().length > 0);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    desktop.addEventListener("change", closeOnDesktop);
    closeOnDesktop();
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKey);
      desktop.removeEventListener("change", closeOnDesktop);
      previousFocus?.focus({ preventScroll: true });
    };
  }, [open, onClose]);

  const toggleSection = (id: string) => {
    setOpenSections((s) => ({ ...s, [id]: !s[id] }));
  };

  const progressPct = levelInfo.nextXP === Infinity ? 100 : Math.min(100, Math.round((xp / levelInfo.nextXP) * 100));

  const sidebarContent = (
    <>
      <div className="px-4 py-4 border-b border-[var(--color-border-default)] flex items-center justify-between gap-2">
        <Link prefetch={false} href="/" className="flex items-center gap-3" onClick={onClose ? (e) => { e.preventDefault(); onClose(); } : undefined}>
          <BrandMark size={36} />
          <div>
            <span className="font-display text-lg font-extrabold tracking-tight block leading-tight">
              <span className="text-[var(--color-text-primary)]">English</span>
              <span className="text-[var(--color-primary)]">Camp</span>
            </span>
            <span className="text-[9px] font-medium text-[var(--color-text-secondary)] tracking-wide uppercase">A1 to B2 English</span>
          </div>
        </Link>
        {onClose && <button ref={closeRef} onClick={onClose} aria-label="Close navigation menu" className="h-11 w-11 shrink-0 flex items-center justify-center rounded-[var(--radius-md)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-alt)]"><X className="w-5 h-5" /></button>}
      </div>

      <nav className="flex-1 min-h-0 overflow-y-auto px-2.5 py-3 scrollbar-thin space-y-0.5" onClick={event => { if (onClose && (event.target as Element).closest("a[href]")) onClose(); }}>
        <div className="mb-1 px-1">
          <div className="flex items-center gap-1.5 px-2 mb-1.5">
            <div className="w-1 h-3 rounded-full bg-[var(--color-primary)]" />
            <p className="text-[10px] font-display font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">Main</p>
          </div>
          <div className="space-y-0.5">
            {NAV_MAIN.map((item) => (
              <NavItem key={item.href} {...item} active={pathname === item.href || pathname.startsWith(item.href + "/")} />
            ))}
          </div>
        </div>

        {NAV_SECTIONS.map((section) => (
          <CollapsibleSection
            key={section.id}
            section={section}
            pathname={pathname}
            isOpen={openSections[section.id] ?? false}
            onToggle={() => toggleSection(section.id)}
          />
        ))}

        <details className="camp-nav-folder" open={pathname.startsWith("/levels")}><summary>Course library<ChevronDown size={14} /></summary><div className="pt-3 mt-2 border-t-2 border-[var(--color-border-default)] px-1">
          <div className="flex items-center justify-between px-2 mb-1.5">
            <div className="flex items-center gap-1.5">
              <div className="w-1 h-3 rounded-full bg-[var(--color-primary)]" />
              <p className="text-[10px] font-display font-bold text-[var(--color-text-secondary)] uppercase tracking-widest">Practice Courses</p>
            </div>
            <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[var(--color-primary-subtle)] text-[var(--color-text-link)]">Exam Prep</span>
          </div>
          <div className="space-y-0.5">
            <Link prefetch={false}
              href="/exercises/band1-listening-format"
              className={cn(
                "group relative flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-md)] text-xs font-bold transition-all duration-200 mb-1.5 border",
                pathname.startsWith("/exercises")
                  ? "bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30"
                  : "bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:bg-[var(--color-neutral-50)] hover:text-indigo-600 border-[var(--color-border-default)] hover:border-indigo-400"
              )}
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-[var(--radius-md)] bg-indigo-500/10 text-indigo-500 shrink-0">
                <Dumbbell className="w-3.5 h-3.5" />
              </div>
              <span className={cn("flex-1 min-w-0", onClose ? "break-words" : "truncate")}>Practice Drills & Revision</span>
              <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 shrink-0">Hub</span>
            </Link>

            {levels.map((level, i) => {
              const Icon = LEVEL_ICONS[i % LEVEL_ICONS.length];
              const active = pathname === `/levels/${level.id}` || pathname.startsWith(`/levels/${level.id}/`);
              return (
                <Link prefetch={false} key={level.id} href={`/levels/${level.id}`} className={cn(
                  "group relative flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-md)] text-sm font-medium transition-all duration-200",
                  active ? "bg-[var(--color-primary-subtle)] text-[var(--color-text-link)]" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-neutral-50)] hover:text-[var(--color-text-primary)]"
                )} style={active ? { boxShadow: "0 2px 0 var(--color-primary-dark)" } : undefined}>
                  {active && <motion.span layoutId="sidebar-level-active" className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full bg-[var(--color-primary)]" />}
                  <div className={cn(
                    "flex items-center justify-center w-7 h-7 rounded-[var(--radius-md)] transition-all duration-200 flex-shrink-0",
                    active ? "bg-[var(--color-primary-subtle)]" : "bg-transparent group-hover:bg-[var(--color-neutral-50)]"
                  )}>
                    <LearningArt name={Icon.displayName || "book"} className="w-3.5 h-3.5" />
                  </div>
                  <span className={cn("flex-1 min-w-0", onClose ? "break-words" : "truncate")}>{level.title}</span>
                  <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-[var(--radius-pill)] shrink-0" style={{ color: "var(--camp-control-ink)", backgroundColor: "var(--camp-purple-soft)" }}>{level.examBadge || level.id}</span>
                </Link>
              );
            })}
          </div>
        </div></details>

        <details className="camp-nav-folder" open={pathname === "/mock-exam"}><summary>Examination tracks<ChevronDown size={14}/></summary><Suspense fallback={null}><ExamTrackLinks onNavigate={onClose}/></Suspense></details>
      </nav>

      <div className="m-2.5 p-3 rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)] bg-[var(--color-surface)]" style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}>
        <div className="flex items-center gap-2.5 mb-2.5">
          <LevelEncouragement level={mounted ? levelInfo.level : 1} />
          <div className="flex-1 min-w-0">
            <p suppressHydrationWarning className="text-[11px] font-display font-bold text-[var(--color-text-primary)] truncate">{mounted ? levelInfo.title : "Beginner"}</p>
            {levelInfo.nextXP !== Infinity && (
              <p suppressHydrationWarning className="text-[9px] text-[var(--color-text-secondary)]">{mounted ? xp.toLocaleString() : 0} / {levelInfo.nextXP.toLocaleString()} XP</p>
            )}
          </div>
        </div>
        {levelInfo.nextXP !== Infinity && (
          <div className="w-full h-2 rounded-[var(--radius-pill)] bg-[var(--color-neutral-100)] overflow-hidden border border-[var(--color-border-default)]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${mounted ? progressPct : 0}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-[var(--radius-pill)] bg-[var(--color-primary)]"
              style={progressPct > 0 ? { boxShadow: "inset 0 1px 0 rgba(255,255,255,0.3)" } : undefined}
            />
          </div>
        )}
      </div>
    </>
  );

  if (onClose) {
    return (
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/40"
              onClick={onClose}
            />
            <motion.aside
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="camp-sidebar camp-mobile-sidebar fixed left-0 top-0 bottom-0 w-80 max-w-[calc(100vw-2rem)] pb-[env(safe-area-inset-bottom,0px)] z-50 bg-[var(--color-surface)] border-r-2 border-[var(--color-border-default)] flex flex-col shadow-2xl"
              style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  return (
    <aside className="camp-sidebar">
      {sidebarContent}
    </aside>
  );
}

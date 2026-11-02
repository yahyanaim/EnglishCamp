"use client";

import { LearningArt } from "@/components/brand/LearningArt";
import { PracticeFrame } from "@/components/ui/PracticeFrame";
import { useSessionProfile } from "@/components/session/SessionProvider";
import { DashboardArt } from "@/components/brand/DashboardArt";
import { CoursePreviewCard } from "@/components/course/CoursePreviewCard";
import { PracticeBanner as PageBanner } from "@/components/ui/PracticeBanner";
import { motion } from "framer-motion";
import { useProgress } from "@/store/useProgress";
import { getLevelInfo } from "@/lib/xp";
import { hasModuleCredit } from "@/lib/courseProgress";
import { courseCatalogue as levels } from "@/data/course-catalogue";
import { Progress } from "@/components/ui/Progress";
import { Card } from "@/components/ui/Card";
import { XPBar } from "@/components/dashboard/XPBar";
import { StreakWidget } from "@/components/dashboard/StreakWidget";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { WordOfDay } from "@/components/ui/WordOfDay";
import { StudyTimer } from "@/components/ui/StudyTimer";
import { ProgressChart } from "@/components/ui/ProgressChart";
import { ActivityChart } from "@/components/ui/ActivityChart";
import { NounGenderTrainer } from "@/components/learn/NounGenderTrainer";
import { SentenceBuilder } from "@/components/learn/SentenceBuilder";
import { ErrorReview } from "@/components/learn/ErrorReview";
import { WeeklyGoalWidget } from "@/components/ui/WeeklyGoalWidget";
import { useDailyChallenge } from "@/store/useDailyChallenge";
import { useErrors } from "@/store/useErrors";
import { useVocabulary } from "@/store/useVocabulary";
import { useAchievements } from "@/store/useAchievements";
import Link from "next/link";
import {
  Zap, BookHeart, AlertTriangle, Trophy, Target, FileText,
  ArrowLeftRight, RotateCcw, Users, Mic, Calendar, Printer,
  Table2, Layout, CaseSensitive, Globe, GraduationCap, Brain,
  Sparkles, ChevronRight, BookOpen, Flame, BarChart3, Star,
  Hash, ScrollText,
} from "lucide-react";

const TROPHIES = [
  { xp: 50, label: "First Steps", icon: "🌱" },
  { xp: 200, label: "Dedicated Learner", icon: "📚" },
  { xp: 500, label: "Vocabulary Star", icon: "⭐" },
  { xp: 1000, label: "Grammar Hero", icon: "🦸" },
  { xp: 1500, label: "Quiz Master", icon: "🧠" },
  { xp: 2000, label: "B1 Warrior", icon: "⚔️" },
  { xp: 3000, label: "Streak King", icon: "🔥" },
  { xp: 4000, label: "B2 Champion", icon: "🏆" },
  { xp: 5000, label: "Polyglot", icon: "🌍" },
  { xp: 7500, label: "EnglishMaster", icon: "👑" },
];

const QUICK_LINKS = [
  { href: "/daily-challenge", label: "Daily Challenge", icon: Zap, hue: "primary" },
  { href: "/vocabulary", label: "Vocabulary", icon: BookHeart, hue: "sapphire" },
  { href: "/writing", label: "Writing", icon: FileText, hue: "amethyst" },
  { href: "/my-notes", label: "My notes", icon: FileText, hue: "amethyst" },
  { href: "/review", label: "Review Queue", icon: RotateCcw, hue: "ruby" },
  { href: "/study-plan", label: "Study Plan", icon: Target, hue: "emerald" },
  { href: "/grammar-compare", label: "Grammar Compare", icon: ArrowLeftRight, hue: "info" },
  { href: "/mock-exam", label: "Mock Exam", icon: GraduationCap, hue: "gold" },
  { href: "/conversation", label: "Conversations", icon: Users, hue: "emerald" },
  { href: "/pronunciation", label: "Pronunciation", icon: Mic, hue: "sapphire" },
  { href: "/badges", label: "Badges", icon: Trophy, hue: "warning" },
  { href: "/grammar/cheat-sheet", label: "Cheat Sheet", icon: Printer, hue: "primary" },
  { href: "/weekly-report", label: "Weekly Report", icon: Calendar, hue: "emerald" },
  { href: "/verb-tables", label: "Verb Tables", icon: Table2, hue: "info" },
  { href: "/sentence-patterns", label: "Sentence Patterns", icon: Layout, hue: "amethyst" },
  { href: "/tenses-guide", label: "Tenses Guide", icon: CaseSensitive, hue: "gold" },
  { href: "/study-strategies", label: "Study Strategies", icon: Brain, hue: "ruby" },
  { href: "/british-vs-american", label: "British vs American", icon: Globe, hue: "sapphire" },
];

const HUE_MAP: Record<string, { fg: string; bg: string; border: string }> = Object.fromEntries(
  ["primary", "warning", "info", "gold", "amethyst", "ruby", "emerald", "sapphire"].map(hue => [hue, {
    fg: "var(--camp-control-ink)", bg: "var(--camp-purple-soft)", border: "var(--camp-purple)",
  }]),
);

function getBadge(link: typeof QUICK_LINKS[number], vocabCount: number, unlockedBadges: number, isTodayDone: boolean) {
  switch (link.label) {
    case "Vocabulary": return `${vocabCount} words`;
    case "Badges": return `${unlockedBadges} unlocked`;
    case "Daily Challenge": return isTodayDone ? "Done ✓" : "Available";
    default: return undefined;
  }
}

function SectionHeader({ icon: Icon, label, color }: { icon: any; label: string; color?: string }) {
  return (
    <div className="camp-section-heading flex items-center gap-3 mb-4">
      <div
        className="inline-flex items-center justify-center w-7 h-7 rounded-[var(--radius-md)]"
        style={{ background: color || "var(--color-primary)" }}
      >
        <LearningArt name={Icon.displayName || "book"} size={16} className="w-4 h-4 text-white" />
      </div>
      <h2
        className="font-display font-extrabold text-[var(--color-text-primary)]"
        style={{ fontSize: "20px", letterSpacing: "0.3px" }}
      >
        {label}
      </h2>
    </div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

const itemAnim = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0, 0, 0.2, 1] } },
};

export default function Dashboard() {
  const { profile } = useSessionProfile();
  const { xp, streak, modules, quizResults, exercisesDone, lessons } = useProgress();
  const { level, title, nextXP } = getLevelInfo(xp);
  const todayDone = useDailyChallenge(state => state.completed && state.lastDate === new Date().toISOString().split("T")[0]);
  const vocabCount = useVocabulary(state => Object.keys(state.words).length);
  const unreviewedErrors = useErrors(state => state.errors.filter(error => !error.reviewed).length);
  const unlockedBadges = useAchievements(state => Object.keys(state.unlocked).length);

  const doneLessons = Object.values(lessons).filter((l) => l.completed).length;
  const doneExercises = Object.values(exercisesDone).filter(Boolean).length;
  const quizzesTaken = Object.values(quizResults).reduce((s, arr) => s + arr.length, 0);
  const stats = [
    { value: doneLessons, label: "Lessons", hue: "primary" },
    { value: doneExercises, label: "Exercises", hue: "ruby" },
    { value: quizzesTaken, label: "Quizzes", hue: "info" },
  ] as const;

  const statColors: Record<string, string> = {
    primary: "var(--color-primary-dark)",
    ruby: "#B0004A",
    info: "var(--color-info-dark)",
  };

  return (
    <motion.div variants={container} initial={false} animate="show" className="camp-section-stack learning-page space-y-6">
      {/* ─── Header ─── */}
      <PageBanner className="camp-dashboard-banner">
        <div>
          <h1
            className="font-display font-extrabold tracking-tight text-[var(--color-text-primary)]"
            style={{ fontSize: "28px" }}
          >
            {profile ? `Welcome, ${profile.name}!` : "Welcome to EnglishCamp!"}
          </h1>
          <p className="font-body text-sm mt-1 text-[var(--color-text-secondary)]">
            Keep up the great work — you&apos;re making progress every day
          </p>
        </div>
      </PageBanner>

      {/* ─── Stats Bar ─── */}
      <motion.div
        variants={itemAnim}
        className="camp-dashboard-stats bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 border border-[var(--color-border-default)] transition-all duration-200"
        style={{ boxShadow: "var(--shadow-1)" }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <div className="flex-1 min-w-0">
            <XPBar xp={xp} level={level} title={title} nextXP={nextXP} />
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <div className="basis-full sm:basis-auto"><StreakWidget streak={streak} /></div>
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center">
                {i > 0 && (
                  <div className="hidden md:block w-px h-10 bg-[var(--color-border-default)]" />
                )}
                <div className="text-center px-2">
                  <p
                    className="font-display font-extrabold text-[var(--color-text-primary)]"
                    style={{ fontSize: "22px" }}
                  >
                    {s.value}
                  </p>
                  <p className="font-body font-semibold text-[10px] mt-0.5 uppercase tracking-wide text-[var(--color-text-secondary)]">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ─── Quick Access ─── */}
      <motion.div variants={itemAnim}>
        <SectionHeader icon={Sparkles} label="Quick Access" color="var(--color-primary)" />
        <div className="camp-quick-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {QUICK_LINKS.map((link) => {
            const h = HUE_MAP[link.hue];
            const badgeText = getBadge(link, vocabCount, unlockedBadges, todayDone);
            return (
              <Link prefetch={false} key={link.href} href={link.href} className="group">
                <motion.div
                  whileHover={{ y: -2 }}
                  className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border border-[var(--color-border-default)] transition-all duration-200 group-hover:border-[var(--color-border-strong)] cursor-pointer"
                  style={{ boxShadow: "var(--shadow-1)" }}
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <div
                      className="inline-flex items-center justify-center w-9 h-9 rounded-[var(--radius-md)] transition-transform duration-200 group-hover:scale-110"
                      style={{ backgroundColor: h.bg }}
                    >
                      <DashboardArt route={link.href} size={24} />
                    </div>
                    {badgeText && (
                      <span className="font-body text-[10px] font-semibold text-[var(--color-text-secondary)]">
                        {badgeText}
                      </span>
                    )}
                  </div>
                  <p className="font-display font-bold text-sm text-[var(--color-text-primary)]">
                    {link.label}
                  </p>
                </motion.div>
              </Link>
            );
          })}

          {/* Weak Areas */}
          {unreviewedErrors > 0 && (
            <Link prefetch={false} href="/weak-areas" className="group">
              <motion.div
                whileHover={{ y: -2 }}
                className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-4 border border-[var(--color-error)] transition-all duration-200 group-hover:border-[var(--color-error-dark)] cursor-pointer"
                style={{ boxShadow: "0 3px 0 var(--color-error)" }}
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="inline-flex items-center justify-center w-9 h-9 rounded-[var(--radius-md)] bg-[var(--color-error-bg)]">
                    <AlertTriangle className="w-4.5 h-4.5 text-[var(--color-text-error)]" />
                  </div>
                  <span className="font-body text-[10px] font-bold text-[var(--color-error-dark)]">
                    {unreviewedErrors} to fix
                  </span>
                </div>
                <p className="font-display font-bold text-sm text-[var(--color-text-primary)]">Weak Areas</p>
              </motion.div>
            </Link>
          )}

          {/* Challenges CTA */}
          <Link prefetch={false} href="/challenge" className="group">
            <motion.div
              whileHover={{ y: -2 }}
              className="rounded-[var(--radius-lg)] p-4 border border-transparent transition-all duration-200 cursor-pointer"
              style={{ background: "var(--camp-purple)", boxShadow: "var(--shadow-1)" }}
            >
              <div className="flex items-center justify-between h-full">
                <div>
                  <p className="font-display font-extrabold text-sm text-white">Challenges</p>
                  <p className="font-body text-[10px] font-semibold text-white mt-0.5">Share & play</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[var(--color-on-brand)]" />
              </div>
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* ─── Widgets ─── */}
      <motion.div variants={itemAnim} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WordOfDay />
        <StudyTimer />
        <ProgressChart />
        <WeeklyGoalWidget />
      </motion.div>

      {/* ─── Activity Chart ─── */}
      <motion.div variants={itemAnim}>
        <ActivityChart />
      </motion.div>

      {/* ─── Level Progress ─── */}
      <motion.div variants={itemAnim} id="courses">
        <SectionHeader icon={GraduationCap} label="Level Progress" color="#CE82FF" />
        <div className="camp-course-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {levels.map((lv) => {
            const p = lv.lessons.length ? Math.round(lv.lessons.filter(lesson => hasModuleCredit(lesson.id, modules, lessons) || !!lessons[lesson.id]?.completed).length / lv.lessons.length * 100) : 0;
            const best = Math.max(0, ...(quizResults[lv.id]?.map((r) => r.score) ?? []));
            return (
              <CoursePreviewCard key={lv.id} course={lv} progress={p} best={best} />
            );
          })}
        </div>
      </motion.div>

      {/* ─── Training ─── */}
      <motion.div variants={itemAnim} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PracticeFrame illustration="none" layout="quiz"><NounGenderTrainer /></PracticeFrame>
        <PracticeFrame illustration="none" layout="quiz"><SentenceBuilder /></PracticeFrame>
      </motion.div>

      {/* ─── Error Review ─── */}
      <motion.div variants={itemAnim}>
        <PracticeFrame illustration="none" layout="quiz"><ErrorReview /></PracticeFrame>
      </motion.div>

      {/* ─── Achievements ─── */}
      <motion.div variants={itemAnim}>
        <SectionHeader icon={Trophy} label="Achievements" color="var(--color-warning)" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {TROPHIES.map((t, i) => {
            const earned = xp >= t.xp;
            return (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                className={`flex flex-col items-center p-5 rounded-[var(--radius-lg)] border transition-all duration-300 ${
                  earned
                    ? "border-[var(--color-warning)]"
                    : "border-[var(--color-border-default)] opacity-40 grayscale"
                }`}
                style={{
                  backgroundColor: earned ? "var(--color-warning-bg)" : "var(--color-surface)",
                  boxShadow: earned ? "0 3px 0 var(--color-warning)" : "var(--shadow-1)",
                }}
              >
                <LearningArt name={t.icon} size={24} className="" />
                <p
                  className="font-display font-bold text-xs mt-2 text-center"
                  style={{ color: earned ? "var(--color-text-primary)" : "var(--color-text-secondary)" }}
                >
                  {t.label}
                </p>
                <p className="font-body text-[10px] mt-1 text-[var(--color-text-secondary)]">
                  {t.xp} XP
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ─── Recent Activity ─── */}
      <motion.div variants={itemAnim}>
        <SectionHeader icon={BarChart3} label="Recent Activity" color="var(--color-info)" />
        <RecentActivity lessonsDone={doneLessons} exercisesDone={doneExercises} quizzesTaken={quizzesTaken} />
      </motion.div>
    </motion.div>
  );
}

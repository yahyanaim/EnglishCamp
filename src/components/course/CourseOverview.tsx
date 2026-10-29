"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { courseCatalogue as levels, type CourseSummary } from "@/data/course-catalogue";
import { resumeModule, cycleComplete } from "@/lib/courseProgress";
import { useProgress } from "@/store/useProgress";
import { Progress } from "@/components/ui/Progress";
import { CheckCircle, Lock, Play, BookOpen, Zap, Dumbbell, Headphones, BookText, PenTool, Mic, Sparkles } from "lucide-react";

export function CourseOverview({ level }: { level: CourseSummary }) {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const [filter, setFilter] = useState<string>("all");
  const { isLessonDone, getLevelProgress, getBestScore, modules, lessons } = useProgress();
  const resume = ready ? resumeModule(level.lessons.map(l => l.id), modules, lessons) : level.lessons[0]?.id;
  const hasHistory = ready && level.lessons.some(l => modules[l.id]?.lastActiveAt || isLessonDone(l.id));
  const practiceCount = ready ? level.lessons.filter(l => cycleComplete(modules[l.id])).length : 0;
  const progress = !ready ? 0 : getLevelProgress(level.id, level.lessons.length, (id) => isLessonDone(id), level.lessons.map(l => l.id));
  const bestQuiz = getBestScore(level.id as any);

  const filteredLessons = level.lessons.filter(lesson => filter === "all" || lesson.skills.includes(filter));

  return (
    <div className="space-y-8">
      {/* Practice Courses Switcher Bar */}
      {level.examBadge && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <span className="text-[var(--color-text-secondary)] font-bold shrink-0 hidden sm:inline">Practice Courses:</span>
          {levels.filter((l) => l.examBadge).map((lvl) => {
            const isCurrent = lvl.id === level.id;
            return (
              <Link
                key={lvl.id}
                href={`/levels/${lvl.id}`}
                aria-current={isCurrent ? "page" : undefined}
                className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 border ${
                  isCurrent
                    ? "bg-blue-500 text-[var(--color-on-brand)] border-blue-500 shadow-sm"
                    : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border-default)] hover:border-blue-400 hover:text-[var(--color-text-primary)]"
                }`}
              >
                {lvl.examBadge || lvl.title}
              </Link>
            );
          })}
        </div>
      )}

      {/* Header Banner */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 sm:p-8 shadow-sm border-2 border-[var(--color-border-default)] border-l-4"
        style={{ borderLeftColor: level.accent }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {level.examBadge && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-[var(--color-text-link)] border border-blue-500/20">
                  {level.examBadge}
                </span>
              )}
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-[var(--color-text-info)] border border-indigo-500/20">
                {level.lessons.length} Modules
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[var(--color-text-primary)] mb-2">
              {level.title}
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] mb-3">{level.subtitle}</p>
            <p className="text-[var(--color-text-secondary)] text-sm mb-5 leading-relaxed">{level.intro}</p>
            <Progress value={progress} color={level.accent} size="lg" label />
            <p className="text-xs text-[var(--color-text-secondary)] mt-3">{practiceCount}/25 current practice cycles completed. Course credit includes retained historical completions. Writing and Speaking are self-reviewed; this percentage is not an exam score.</p>
          </div>
          <div className="flex flex-col gap-3 shrink-0 sm:w-56">
            <Link href={`/levels/${level.id}/lessons/${resume}`} className="inline-flex justify-center items-center gap-2 rounded-[var(--radius-pill)] px-6 py-2.5 font-display font-bold text-sm uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
              <Dumbbell className="w-4 h-4" /> {hasHistory ? "Resume module" : "Start course"}
            </Link>
            <Link href={level.examHref || "/mock-exam"} className="inline-flex justify-center items-center gap-2 rounded-[var(--radius-pill)] px-6 py-2.5 font-display font-bold text-sm uppercase tracking-wider border-2 border-[var(--color-border-strong)] text-[var(--color-text-secondary)]">
              <Zap className="w-4 h-4 text-amber-500" /> Full Mock Exam
            </Link>
            <Link href="/flashcards" className="inline-flex justify-center items-center gap-2 rounded-[var(--radius-pill)] px-6 py-2.5 font-display font-bold text-sm uppercase tracking-wider border-2 border-[var(--color-border-strong)] text-[var(--color-text-secondary)]">
              <BookOpen className="w-4 h-4 text-[var(--color-text-link)]" /> Flashcards
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {level.goals.slice(0, 4).map((g, i) => (
            <span key={i} className="inline-flex items-center rounded-full bg-[var(--color-primary-subtle)] px-3 py-1 text-xs font-medium text-[var(--color-text-link)] border border-blue-200 dark:border-blue-900">
              ✓ {g}
            </span>
          ))}
        </div>
      </motion.div>

      {level.id === "band4-5" && <div className="text-sm text-[var(--color-text-primary)] bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-2xl p-5 space-y-3">
        <p className="font-bold">Core language support before exam tasks</p>
        <p>If you are comfortable with everyday connected English but need grammar support, use these existing modules before returning to Module 1. This course does not provide beginner placement.</p>
        <div className="flex flex-wrap gap-4">{[3,18,19,1].map(number => <Link key={number} className="text-[var(--color-text-link)] underline" href={`/levels/${level.id}/lessons/${level.lessons[number - 1].id}`}>Module {number}: {level.lessons[number - 1].title}</Link>)}</div>
      </div>}
      {level.id === "band7-8" && <div className="text-sm text-[var(--color-text-primary)] bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-2xl p-5 space-y-3">
        <p className="font-bold">Shared IELTS Listening and Speaking practice</p>
        <p>These skills are shared by General Training and Academic IELTS. The links open existing shared-skill modules; General Training letters and Reading remain in this course. Synthetic voices provide focused practice rather than an accent-coverage guarantee.</p>
        <div className="flex flex-wrap gap-4"><Link className="text-[var(--color-text-link)] underline" href="/exercises/band2-listening-maps">Plans, directions and facilities matching</Link><Link className="text-[var(--color-text-link)] underline" href="/exercises/band2-speaking-cue-card">Part 1 answers and Part 2 planning</Link><Link className="text-[var(--color-text-link)] underline" href="/exercises/band4-mock-ielts-listening">GT plan-labelling checkpoint</Link></div>
      </div>}

      {bestQuiz > 0 && (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="bg-amber-500/10 border border-amber-500/30 rounded-[var(--radius-lg)] p-5 flex items-center gap-4"
        >
          <span className="text-2xl">🏆</span>
          <div>
            <p className="text-[var(--color-text-primary)] font-bold">Best quiz score: {bestQuiz}%</p>
            <p className="text-[var(--color-text-warning)] text-sm font-medium">{bestQuiz >= 80 ? "Strong local quiz result. Continue applying the skills." : "Keep practicing to improve!"}</p>
          </div>
        </motion.div>
      )}

      {/* Course Curriculum & Fast Navigation Filter */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[var(--color-border-default)] pb-4">
          <div>
            <h2 className="font-display text-2xl font-extrabold text-[var(--color-text-primary)]">
              Course Modules ({filteredLessons.length})
            </h2>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Study Lesson follows the complete learning journey. Practice Drills opens the same saved activity directly.
            </p>
          </div>

          {/* Skill Filter Pills */}
          <div className="flex items-center flex-wrap gap-1.5 p-1 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-default)]">
            {[
              { id: "all", label: "All", count: level.lessons.length },
              { id: "listening", label: "Listening", icon: Headphones },
              { id: "reading", label: "Reading", icon: BookText },
              { id: "writing", label: "Writing", icon: PenTool },
              { id: "speaking", label: "Speaking", icon: Mic },
              { id: "grammar", label: "Grammar", icon: Sparkles },
              { id: "vocabulary", label: "Vocabulary", icon: BookText },
            ].map((tab) => (
              <button
                key={tab.id}
                aria-pressed={filter === tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  filter === tab.id
                    ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm border border-[var(--color-border-default)]"
                    : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                }`}
              >
                {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lesson List */}
        <div className="space-y-3">
          {filteredLessons.map((lesson, i) => {
            const done = ready && isLessonDone(lesson.id);

            return (
              <motion.div key={lesson.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.03, 0.3) }}>
                <div className={`bg-[var(--color-surface)] rounded-2xl p-4 sm:p-5 border-2 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  done ? "border-emerald-500/40 bg-emerald-500/5" : "border-[var(--color-border-default)] hover:border-blue-400/50"
                }`}>
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      done ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-[var(--color-surface-alt)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)]"
                    }`}>
                      {done ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <span className="font-display font-bold text-xs">{lesson.moduleNumber}</span>}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--color-surface-alt)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)] uppercase">
                          Module {lesson.moduleNumber}
                        </span>
                        <span className="text-[10px] font-bold text-[var(--color-text-warning)] flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-500" /> +{lesson.xpReward} module XP
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-base text-[var(--color-text-primary)] break-words">
                        {lesson.title}
                      </h3>
                      {done && <p className="text-xs text-[var(--color-text-success)]">{cycleComplete(modules[lesson.id]) ? "Practice cycle completed" : "Historical completion credit retained"}</p>}
                      {lesson.subtitle && (
                        <p className="text-xs text-[var(--color-text-secondary)] break-words">
                          {lesson.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                    <Link
                      href={`/levels/${level.id}/lessons/${lesson.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[var(--color-surface-alt)] hover:bg-[var(--color-neutral-100)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] transition-all"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[var(--color-text-link)]" />
                      <span>Study Lesson</span>
                    </Link>
                    <Link
                      href={`/exercises/${lesson.id}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm transition-all"
                    >
                      <Dumbbell className="w-3.5 h-3.5" />
                      <span>Practice Drills</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

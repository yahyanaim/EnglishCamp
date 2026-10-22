"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";
import { levels } from "@/data/content";
import { useProgress } from "@/store/useProgress";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { CheckCircle, Lock, Play, BookOpen, Zap, Dumbbell, Headphones, BookText, PenTool, Mic, Sparkles } from "lucide-react";

export default function LevelPage({ params }: { params: { id: string } }) {
  const level = levels.find((l) => l.id === params.id);
  if (!level) notFound();

  const [filter, setFilter] = useState<string>("all");
  const { isLessonDone, getLevelProgress, getBestScore } = useProgress();
  const progress = getLevelProgress(level.id, level.lessons.length, (id) => isLessonDone(id), level.lessons.map(l => l.id));
  const bestQuiz = getBestScore(level.id as any);

  const filteredLessons = level.lessons.filter((lesson) => {
    if (filter === "all") return true;
    const title = lesson.title.toLowerCase();
    const id = lesson.id.toLowerCase();
    if (filter === "listening") return id.includes("listening") || title.includes("listening");
    if (filter === "reading") return id.includes("reading") || title.includes("reading");
    if (filter === "writing") return id.includes("writing") || title.includes("writing") || id.includes("essay") || title.includes("task");
    if (filter === "speaking") return id.includes("speaking") || title.includes("speaking");
    if (filter === "grammar") return id.includes("grammar") || title.includes("grammar") || id.includes("tense") || title.includes("article");
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Practice Courses Switcher Bar */}
      {level.examBadge && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
          <span className="text-[var(--color-text-disabled)] font-bold shrink-0 hidden sm:inline">Practice Courses:</span>
          {levels.filter((l) => l.examBadge).map((lvl) => {
            const isCurrent = lvl.id === level.id;
            return (
              <Link
                key={lvl.id}
                href={`/levels/${lvl.id}`}
                className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 border ${
                  isCurrent
                    ? "bg-blue-500 text-white border-blue-500 shadow-sm"
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
        className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-8 shadow-sm border-2 border-[var(--color-border-default)] border-l-4"
        style={{ borderLeftColor: level.accent }}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              {level.examBadge && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  {level.examBadge}
                </span>
              )}
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                {level.lessons.length} Modules
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-[var(--color-text-primary)] mb-2">
              {level.title}
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] mb-3">{level.subtitle}</p>
            <p className="text-[var(--color-text-secondary)] text-sm mb-5 leading-relaxed">{level.intro}</p>
            <Progress value={progress} color={level.accent} size="lg" label />
          </div>
          <div className="flex flex-col gap-3 shrink-0 sm:w-56">
            <Link href={`/exercises/${level.lessons[0]?.id || "band1-listening-format"}`}>
              <Button className="w-full justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                <Dumbbell className="w-4 h-4" /> Start Practice Hub
              </Button>
            </Link>
            <Link href={level.examHref || `/mock-exam`}>
              <Button variant="secondary" className="w-full justify-center gap-2 border-[var(--color-border-default)]">
                <Zap className="w-4 h-4 text-amber-500" /> Full Mock Exam
              </Button>
            </Link>
            <Link href={`/flashcards`}>
              <Button variant="secondary" className="w-full justify-center gap-2 border-[var(--color-border-default)]">
                <BookOpen className="w-4 h-4 text-blue-500" /> Flashcards
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-6">
          {level.goals.slice(0, 4).map((g, i) => (
            <span key={i} className="inline-flex items-center rounded-full bg-[var(--color-primary-subtle)] px-3 py-1 text-xs font-medium text-[var(--color-primary-dark)] border border-blue-200 dark:border-blue-900">
              ✓ {g}
            </span>
          ))}
        </div>
      </motion.div>

      {bestQuiz > 0 && (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          className="bg-amber-500/10 border border-amber-500/30 rounded-[var(--radius-lg)] p-5 flex items-center gap-4"
        >
          <span className="text-2xl">🏆</span>
          <div>
            <p className="text-[var(--color-text-primary)] font-bold">Best quiz score: {bestQuiz}%</p>
            <p className="text-amber-600 dark:text-amber-400 text-sm font-medium">{bestQuiz >= 80 ? "Excellent! You're mastering this level." : "Keep practicing to improve!"}</p>
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
              Select a module to read the theory or jump straight into the practice drills.
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
            ].map((tab) => (
              <button
                key={tab.id}
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
            const done = isLessonDone(lesson.id);

            return (
              <motion.div key={lesson.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(i * 0.03, 0.3) }}>
                <div className={`bg-[var(--color-surface)] rounded-2xl p-4 sm:p-5 border-2 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                  done ? "border-emerald-500/40 bg-emerald-500/5" : "border-[var(--color-border-default)] hover:border-blue-400/50"
                }`}>
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      done ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-[var(--color-surface-alt)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)]"
                    }`}>
                      {done ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : <span className="font-display font-bold text-xs">{i + 1}</span>}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--color-surface-alt)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)] uppercase">
                          Module {i + 1}
                        </span>
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                          <Zap className="w-3 h-3 text-amber-500" /> +{lesson.xpReward} XP
                        </span>
                      </div>
                      <h3 className="font-display font-bold text-base text-[var(--color-text-primary)] truncate">
                        {lesson.title}
                      </h3>
                      {lesson.subtitle && (
                        <p className="text-xs text-[var(--color-text-secondary)] truncate">
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
                      <BookOpen className="w-3.5 h-3.5 text-blue-500" />
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

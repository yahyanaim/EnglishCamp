"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { exercises } from "@/data/exercises";
import { levels } from "@/data/content";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { LessonContent } from "@/components/lesson/LessonContent";
import { FillBlank, type FillBlankData } from "@/components/exercises/FillBlank";
import { Matching, type MatchingData } from "@/components/exercises/Matching";
import { MultipleChoice, type MultipleChoiceData } from "@/components/exercises/MultipleChoice";
import { ReorderExercise, type ReorderData } from "@/components/exercises/Reorder";
import { Translation, type TranslationData } from "@/components/exercises/Translation";
import { Button } from "@/components/ui/Button";
import {
  BookOpen, Dumbbell, ChevronLeft, ChevronRight, ChevronDown, Sparkles,
  Lightbulb, Zap, ArrowRight, CheckCircle2, LayoutGrid, Check
} from "lucide-react";
import Link from "next/link";

export default function ExercisesPage({ params }: { params: { lessonId: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"exercises" | "revision">("revision");
  const lessonExercises = exercises.filter((ex) => ex.lessonId === params.lessonId);

  const level = levels.find((l) => l.lessons.some((ls) => ls.id === params.lessonId));
  const lesson = level?.lessons.find((l) => l.id === params.lessonId);

  if (!level || !lesson) {
    return (
      <PageWrapper>
        <div className="text-center py-20 bg-[var(--color-surface)] rounded-2xl border-2 border-[var(--color-border-default)]">
          <p className="text-3xl mb-3">🔍</p>
          <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">Lesson Not Found</h2>
          <p className="text-sm text-[var(--color-text-secondary)] mb-6">Could not find lesson &ldquo;{params.lessonId}&rdquo;.</p>
          <Link href="/levels/band4-5" className="px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-white font-bold text-sm shadow-sm hover:opacity-90 transition-opacity">
            Return to Practice Courses
          </Link>
        </div>
      </PageWrapper>
    );
  }

  const currentIndex = level.lessons.findIndex((l) => l.id === params.lessonId);
  const prevLesson = currentIndex > 0 ? level.lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < level.lessons.length - 1 ? level.lessons[currentIndex + 1] : null;

  const totalXP = lessonExercises.reduce((sum, e) => sum + e.xpReward, 0);

  // Other practice courses for easy cross-course navigation
  const examLevels = levels.filter((l) => l.examBadge);

  return (
    <PageWrapper>
      {/* Top Cross-Course Switcher Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none text-xs">
        <span className="text-[var(--color-text-disabled)] font-bold shrink-0 hidden sm:inline">Course:</span>
        {examLevels.map((lvl) => {
          const isCurrentLevel = lvl.id === level.id;
          return (
            <Link
              key={lvl.id}
              href={`/exercises/${lvl.lessons[0]?.id || "band1-listening-format"}`}
              className={`px-3 py-1.5 rounded-full font-bold transition-all shrink-0 border ${
                isCurrentLevel
                  ? "bg-blue-500 text-white border-blue-500 shadow-sm"
                  : "bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border-default)] hover:border-blue-400 hover:text-[var(--color-text-primary)]"
              }`}
            >
              {lvl.examBadge || lvl.title}
            </Link>
          );
        })}
      </div>

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm text-[var(--color-text-disabled)] mb-4">
        <Link
          href={`/levels/${level.id}`}
          className="flex items-center gap-1 hover:text-[var(--color-text-primary)] transition-colors font-medium"
        >
          <ChevronLeft className="w-4 h-4" />
          {level.title}
        </Link>
        <span>/</span>
        <span className="hover:text-[var(--color-text-primary)] transition-colors font-medium truncate max-w-xs text-[var(--color-text-secondary)]">
          Module {currentIndex + 1}: {lesson.title}
        </span>
        <span>/</span>
        <span className="text-[var(--color-text-primary)] font-semibold">Practice & Revision</span>
      </div>

      {/* Header Banner */}
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 mb-6 border-2 border-[var(--color-border-default)] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {level.examBadge && (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  {level.examBadge}
                </span>
              )}
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                Module {currentIndex + 1} of {level.lessons.length}
              </span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-500" /> +{totalXP} XP
              </span>
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-extrabold text-[var(--color-text-primary)] mb-1">
              {lesson.title}
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {lesson.subtitle || "Revise authentic exam material and test your mastery with interactive drills."}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-default)] shrink-0 self-start md:self-auto">
            <button
              onClick={() => setActiveTab("revision")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "revision"
                  ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm border border-[var(--color-border-default)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span>Revise Course</span>
            </button>
            <button
              onClick={() => setActiveTab("exercises")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === "exercises"
                  ? "bg-[var(--color-surface)] text-[var(--color-text-primary)] shadow-sm border border-[var(--color-border-default)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <Dumbbell className="w-4 h-4 text-indigo-500" />
              <span>Practice Drills ({lessonExercises.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Navigation & Module Jumper */}
      <div className="bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border-default)] p-3 sm:p-4 mb-8 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Module Dropdown Selector */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span className="text-xs font-bold text-[var(--color-text-secondary)] shrink-0 hidden sm:inline">
            Select Module:
          </span>
          <div className="relative flex-1 min-w-0">
            <select
              value={lesson.id}
              onChange={(e) => router.push(`/exercises/${e.target.value}`)}
              className="w-full appearance-none bg-[var(--color-surface-alt)] text-[var(--color-text-primary)] font-bold text-xs rounded-xl px-3 py-2.5 pr-8 border border-[var(--color-border-default)] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer truncate"
            >
              {level.lessons.map((ls, idx) => (
                <option key={ls.id} value={ls.id}>
                  {idx + 1}. {ls.title} ({ls.xpReward} XP)
                </option>
              ))}
            </select>
            <ChevronDown className="w-4 h-4 text-[var(--color-text-disabled)] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Quick Prev / Next Module Buttons */}
        <div className="flex items-center gap-2 shrink-0 justify-between sm:justify-end">
          {prevLesson ? (
            <Link
              href={`/exercises/${prevLesson.id}`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-[var(--color-border-default)] bg-[var(--color-surface-alt)] hover:bg-[var(--color-surface)] text-[var(--color-text-primary)] transition-all"
              title={prevLesson.title}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Prev Module</span>
              <span className="sm:hidden">Prev</span>
            </Link>
          ) : (
            <button disabled className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-[var(--color-border-default)] bg-[var(--color-surface-alt)] opacity-40 text-[var(--color-text-disabled)] cursor-not-allowed">
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Prev</span>
            </button>
          )}

          <Link
            href={`/levels/${level.id}`}
            className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold border border-[var(--color-border-default)] bg-[var(--color-surface-alt)] hover:bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all"
            title="View full course syllabus"
          >
            <LayoutGrid className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden sm:inline">Syllabus</span>
          </Link>

          {nextLesson ? (
            <Link
              href={`/exercises/${nextLesson.id}`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 dark:text-blue-400 transition-all"
              title={nextLesson.title}
            >
              <span className="hidden sm:inline">Next Module</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <Link
              href={`/levels/${level.id}`}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-all"
            >
              <span>Course Complete</span>
              <Check className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "revision" ? (
          <motion.div
            key="revision-tab"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Quick Strategy & Exam Tips Box */}
            <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-transparent border border-blue-500/25 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-base text-[var(--color-text-primary)] mb-1">
                    Pre-Practice Revision Briefing
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3">
                    Carefully review the explanations, phonetic audio pronunciations, and structural rules below before attempting the practice exercises.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Read connected speech & formulas
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" /> Tap speaker buttons to hear sound shifts
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--color-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" /> Avoid common examiner distractors
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Course Modules from Lesson */}
            <div className="bg-[var(--color-surface)] rounded-2xl border-2 border-[var(--color-border-default)] p-6 sm:p-8">
              <LessonContent blocks={lesson.blocks} />
            </div>

            {/* CTA to start exercises */}
            <div className="pt-2 text-center">
              <Button onClick={() => setActiveTab("exercises")} size="lg" className="gap-2 px-8">
                <Dumbbell className="w-5 h-5" />
                <span>I'm Ready — Start Practice Exercises ({lessonExercises.length} Drills)</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Bottom Course Navigation Bar */}
            <div className="bg-[var(--color-surface)] rounded-2xl border-2 border-[var(--color-border-default)] p-5 sm:p-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              {prevLesson ? (
                <Link
                  href={`/exercises/${prevLesson.id}`}
                  className="flex items-center gap-2.5 text-xs font-bold text-[var(--color-text-primary)] hover:text-blue-500 transition-colors p-3 rounded-xl border border-[var(--color-border-default)] hover:border-blue-400 bg-[var(--color-surface-alt)] w-full sm:w-auto"
                >
                  <ChevronLeft className="w-4 h-4 text-blue-500 shrink-0" />
                  <div className="text-left">
                    <span className="block text-[10px] text-[var(--color-text-disabled)] font-normal">Previous Module</span>
                    <span className="truncate max-w-[200px] block font-bold">{prevLesson.title}</span>
                  </div>
                </Link>
              ) : (
                <div className="text-xs text-[var(--color-text-disabled)] font-medium p-3">
                  First Module in this Course
                </div>
              )}

              <Link
                href={`/levels/${level.id}`}
                className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-[var(--color-surface-alt)] hover:bg-[var(--color-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:border-indigo-400 transition-all"
              >
                <LayoutGrid className="w-4 h-4 text-indigo-500" />
                <span>All {level.lessons.length} Modules in Course</span>
              </Link>

              {nextLesson ? (
                <Link
                  href={`/exercises/${nextLesson.id}`}
                  className="flex items-center justify-end gap-2.5 text-xs font-bold text-[var(--color-text-primary)] hover:text-blue-500 transition-colors p-3 rounded-xl border border-[var(--color-border-default)] hover:border-blue-400 bg-[var(--color-surface-alt)] w-full sm:w-auto text-right"
                >
                  <div className="text-right">
                    <span className="block text-[10px] text-[var(--color-text-disabled)] font-normal">Next Module</span>
                    <span className="truncate max-w-[200px] block font-bold">{nextLesson.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-blue-500 shrink-0" />
                </Link>
              ) : (
                <Link
                  href={`/levels/${level.id}`}
                  className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 p-3"
                >
                  <span>Course Complete! Back to Overview</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="exercises-tab"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {lessonExercises.length === 0 ? (
              <div className="text-center py-16 text-[var(--color-text-disabled)] bg-[var(--color-surface)] rounded-[var(--radius-lg)] border-2 border-[var(--color-border-default)]">
                <p className="text-4xl mb-4">📝</p>
                <p className="font-medium">No exercises available for this lesson yet.</p>
                <button
                  onClick={() => setActiveTab("revision")}
                  className="mt-4 text-xs text-blue-500 font-bold hover:underline"
                >
                  ← Return to Course Revision
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between px-2">
                  <p className="text-xs font-semibold text-[var(--color-text-secondary)]">
                    Solve each question carefully. Check your answers for instant feedback.
                  </p>
                  <button
                    onClick={() => setActiveTab("revision")}
                    className="text-xs font-bold text-blue-500 hover:underline flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" /> Need a hint? Review course theory
                  </button>
                </div>

                <div className="space-y-6">
                  {lessonExercises.map((exercise, idx) => (
                    <div
                      key={exercise.id}
                      className="bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-2xl p-6 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-3 text-xs text-[var(--color-text-secondary)] font-medium">
                        <span className="flex items-center gap-1.5 font-bold text-indigo-500">
                          <span className="w-5 h-5 rounded-full bg-indigo-500/15 flex items-center justify-center text-[10px] font-extrabold">
                            {idx + 1}
                          </span>
                          Exercise Question
                        </span>
                        <span className="text-amber-600 dark:text-amber-400 font-bold">
                          +{exercise.xpReward} XP
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">
                        {exercise.prompt}
                      </p>
                      {exercise.type === "fill-blank" && (
                        <FillBlank data={{ ...(exercise.data as FillBlankData), xpReward: exercise.xpReward, id: exercise.id }} />
                      )}
                      {exercise.type === "multiple-choice" && (
                        <MultipleChoice data={{ ...(exercise.data as MultipleChoiceData), xpReward: exercise.xpReward, id: exercise.id }} />
                      )}
                      {exercise.type === "matching" && (
                        <Matching data={{ ...(exercise.data as MatchingData), xpReward: exercise.xpReward, id: exercise.id }} />
                      )}
                      {exercise.type === "reorder" && (
                        <ReorderExercise data={{ ...(exercise.data as ReorderData), xpReward: exercise.xpReward, id: exercise.id }} />
                      )}
                      {exercise.type === "translation" && (
                        <Translation data={{ ...(exercise.data as TranslationData), xpReward: exercise.xpReward, id: exercise.id }} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Bottom Practice Navigation Bar */}
                <div className="bg-[var(--color-surface)] rounded-2xl border-2 border-[var(--color-border-default)] p-5 sm:p-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  {prevLesson ? (
                    <Link
                      href={`/exercises/${prevLesson.id}`}
                      className="flex items-center gap-2.5 text-xs font-bold text-[var(--color-text-primary)] hover:text-blue-500 transition-colors p-3 rounded-xl border border-[var(--color-border-default)] hover:border-blue-400 bg-[var(--color-surface-alt)] w-full sm:w-auto"
                    >
                      <ChevronLeft className="w-4 h-4 text-blue-500 shrink-0" />
                      <div className="text-left">
                        <span className="block text-[10px] text-[var(--color-text-disabled)] font-normal">Prev Module Drills</span>
                        <span className="truncate max-w-[200px] block font-bold">{prevLesson.title}</span>
                      </div>
                    </Link>
                  ) : (
                    <button
                      onClick={() => setActiveTab("revision")}
                      className="flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl border border-[var(--color-border-default)] bg-[var(--color-surface-alt)] text-[var(--color-text-primary)]"
                    >
                      <BookOpen className="w-4 h-4 text-blue-500" />
                      <span>Review This Lesson</span>
                    </button>
                  )}

                  <Link
                    href={`/levels/${level.id}`}
                    className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-[var(--color-surface-alt)] hover:bg-[var(--color-surface)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] hover:border-indigo-400 transition-all"
                  >
                    <LayoutGrid className="w-4 h-4 text-indigo-500" />
                    <span>Course Syllabus ({level.lessons.length} Modules)</span>
                  </Link>

                  {nextLesson ? (
                    <Link
                      href={`/exercises/${nextLesson.id}`}
                      className="flex items-center justify-end gap-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors p-3 rounded-xl shadow-sm w-full sm:w-auto text-right"
                    >
                      <div className="text-right">
                        <span className="block text-[10px] text-blue-200 font-normal">Next Module Drills</span>
                        <span className="truncate max-w-[200px] block font-bold">{nextLesson.title}</span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-white shrink-0" />
                    </Link>
                  ) : (
                    <Link
                      href={`/levels/${level.id}`}
                      className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 p-3"
                    >
                      <span>Course Complete! Back to Hub</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}

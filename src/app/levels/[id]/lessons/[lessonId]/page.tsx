"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { notFound, useRouter } from "next/navigation";
import { levels } from "@/data/content";
import { exercises } from "@/data/exercises";
import { useProgress } from "@/store/useProgress";
import { LessonContent } from "@/components/lesson/LessonContent";
import { FillBlank, type FillBlankData } from "@/components/exercises/FillBlank";
import { Matching, type MatchingData } from "@/components/exercises/Matching";
import { MultipleChoice, type MultipleChoiceData } from "@/components/exercises/MultipleChoice";
import { ReorderExercise, type ReorderData } from "@/components/exercises/Reorder";
import { Translation, type TranslationData } from "@/components/exercises/Translation";
import { Button } from "@/components/ui/Button";
import { BookmarkButton } from "@/components/ui/BookmarkButton";
import { NotesEditor } from "@/components/ui/NotesEditor";
import { CheckCircle, ArrowLeft, ArrowRight, Zap, ChevronLeft, Dumbbell, Sparkles } from "lucide-react";
import Link from "next/link";

export default function LessonPage({ params }: { params: { id: string; lessonId: string } }) {
  const router = useRouter();
  const level = levels.find((l) => l.id === params.id);
  const lesson = level?.lessons.find((l) => l.id === params.lessonId);
  if (!level || !lesson) notFound();

  const { completeLesson, isLessonDone } = useProgress();
  const [completed, setCompleted] = useState(false);
  const alreadyDone = isLessonDone(lesson.id);

  const lessonIndex = level.lessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = level.lessons[lessonIndex + 1];
  const prevLesson = level.lessons[lessonIndex - 1];

  const lessonExercises = exercises.filter((ex) => ex.lessonId === lesson.id);

  function handleComplete() {
    if (!alreadyDone && lesson) completeLesson(lesson.id, lesson.xpReward);
    setCompleted(true);
  }

  return (
    <div>
      {/* Course Context & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--color-text-disabled)] mb-6">
        <div className="flex items-center gap-2">
          <button onClick={() => router.push(`/levels/${level.id}`)} className="flex items-center gap-1 hover:text-[var(--color-text-primary)] transition-colors font-medium">
            <ChevronLeft className="w-4 h-4" />
            {level.title}
          </button>
          <span className="text-[var(--color-text-disabled)]">/</span>
          <span className="text-[var(--color-text-primary)] font-medium truncate">{lesson.title}</span>
        </div>
        <div className="flex items-center gap-2">
          {level.examBadge && (
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
              {level.examBadge}
            </span>
          )}
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[var(--color-surface)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)]">
            Lesson {lessonIndex + 1} of {level.lessons.length}
          </span>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-[var(--color-text-primary)] mb-2 leading-tight tracking-tight">
              {lesson.title}
            </h1>
            {lesson.subtitle && (
              <p className="text-[var(--color-text-secondary)] text-lg">{lesson.subtitle}</p>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <BookmarkButton lessonId={lesson.id} />
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25 flex-shrink-0">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="font-bold text-sm">{lesson.xpReward}</span>
              <span className="text-xs font-semibold">XP</span>
            </div>
          </div>
        </div>
        <div className="h-px bg-[var(--color-border-default)] mt-6" />
      </motion.div>

      {/* Lesson Content Modules */}
      <LessonContent blocks={lesson.blocks} />

      {/* Embedded Interactive Practice Lab */}
      {lessonExercises.length > 0 && (
        <section className="mt-14 pt-8 border-t border-[var(--color-border-default)]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold">
                <Dumbbell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Interactive Practice Lab</h2>
                <p className="text-xs text-[var(--color-text-secondary)]">Solve real exam questions to lock in what you just learned</p>
              </div>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500">
              {lessonExercises.length} Interactive Drills
            </span>
          </div>

          <div className="space-y-6">
            {lessonExercises.map((exercise, idx) => (
              <div key={exercise.id} className="bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-3 text-xs text-[var(--color-text-secondary)] font-medium">
                  <span className="flex items-center gap-1.5 font-semibold text-indigo-500">
                    <span className="w-5 h-5 rounded-full bg-indigo-500/15 flex items-center justify-center text-[10px] font-bold">
                      {idx + 1}
                    </span>
                    Checkpoint Drill
                  </span>
                  <span className="text-[var(--color-warning)] font-semibold">+{exercise.xpReward} XP</span>
                </div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)] mb-4">{exercise.prompt}</p>
                {exercise.type === "fill-blank" && <FillBlank data={{ ...(exercise.data as FillBlankData), xpReward: exercise.xpReward, id: exercise.id }} />}
                {exercise.type === "multiple-choice" && <MultipleChoice data={{ ...(exercise.data as MultipleChoiceData), xpReward: exercise.xpReward, id: exercise.id }} />}
                {exercise.type === "matching" && <Matching data={{ ...(exercise.data as MatchingData), xpReward: exercise.xpReward, id: exercise.id }} />}
                {exercise.type === "reorder" && <ReorderExercise data={{ ...(exercise.data as ReorderData), xpReward: exercise.xpReward, id: exercise.id }} />}
                {exercise.type === "translation" && <Translation data={{ ...(exercise.data as TranslationData), xpReward: exercise.xpReward, id: exercise.id }} />}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Exercises Link */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
        <Link href={`/exercises/${lesson.id}`} className="group flex items-center justify-between bg-indigo-500/5 rounded-[var(--radius-lg)] p-5 ring-1 ring-indigo-500/20 hover:ring-indigo-500/30 hover:shadow-md transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-[var(--radius-lg)] bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <p className="font-semibold text-[var(--color-text-primary)]">Full Practice Mode</p>
              <p className="text-xs text-[var(--color-text-secondary)]">Open these {lessonExercises.length} questions in distraction-free exam practice mode</p>
            </div>
          </div>
          <ArrowRight className="w-5 h-5 text-indigo-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
        </Link>
      </motion.div>

      {/* Personal Notes */}
      <div className="mt-10">
        <NotesEditor lessonId={lesson.id} />
      </div>

      <AnimatePresence>
        {!completed ? (
          <motion.div key="cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-12 pt-8 flex items-center justify-between"
          >
            {prevLesson ? (
              <button onClick={() => router.push(`/levels/${level.id}/lessons/${prevLesson.id}`)}
                className="flex items-center gap-2 text-[var(--color-text-disabled)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium"
              ><ArrowLeft className="w-4 h-4" /> Previous Lesson</button>
            ) : <div />}
            <Button onClick={handleComplete} size="lg">
              <CheckCircle className="w-5 h-5" /> Complete Lesson · +{lesson.xpReward} XP
            </Button>
          </motion.div>
        ) : (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="mt-12 bg-emerald-500/15 border-2 border-emerald-500/30 rounded-3xl p-10 text-center"
          >
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              className="text-6xl block mb-4">🎉</motion.span>
            <h2 className="font-display text-3xl font-display font-extrabold text-[var(--color-text-primary)] mb-2">Lesson Complete!</h2>
            <p className="text-emerald-600 dark:text-emerald-400 text-xl font-bold mb-8">+{lesson.xpReward} XP earned</p>
            <div className="flex gap-4 justify-center flex-wrap">
              {nextLesson && (
                <Button onClick={() => router.push(`/levels/${level.id}/lessons/${nextLesson.id}`)}>
                  Next Lesson <ArrowRight className="w-4 h-4" />
                </Button>
              )}
              <Button variant="secondary" onClick={() => router.push(`/exercises/${lesson.id}`)}>
                Practice Exercises
              </Button>
              <Button variant="ghost" onClick={() => router.push(`/levels/${level.id}`)}>
                Back to {level.title}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { SelectField } from "@/components/ui/shadcn/select-field";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Dumbbell, Zap } from "lucide-react";
import type { Lesson, Exercise } from "@/data/types";
import type { CourseSummary } from "@/data/course-catalogue";
import { ExerciseRenderer } from "@/components/exercises/ExerciseRenderer";
import { IllustratedLessonContent } from "./IllustratedLessonContent";
import { CourseEnrichment } from "./CourseEnrichment";
import { CourseVideoLesson } from "./CourseVideoLesson";
import { LessonPrinciple } from "./LessonPrinciple";
import type { CourseEnrichment as Enrichment } from "@/data/course-enrichment/types";
import { BookmarkButton } from "@/components/ui/BookmarkButton";
import { NotesEditor } from "@/components/ui/NotesEditor";
import { useProgress } from "@/store/useProgress";
import { courseLabel } from "@/lib/courseLabels";
import { cycleComplete } from "@/lib/courseProgress";
import { confirmActivityNavigation, hasUnsavedActivity } from "@/lib/activityState";

export function ModuleExperience({ course, lesson, exercises, enrichment, focused = false }: { course: CourseSummary; lesson: Lesson; exercises: Exercise[]; enrichment?: Enrichment; focused?: boolean }) {
  const router = useRouter();
  const index = course.lessons.findIndex(item => item.id === lesson.id);
  const visit = useProgress(s => s.visitModule);
  const state = useProgress(s => s.modules[lesson.id]);
  const attempts = useProgress(s => s.activityAttempts);
  const done = cycleComplete(state);
  const legacy = !!state?.legacyStudy || !!state?.legacyPractice;
  const href = (id: string) => focused ? `/exercises/${id}` : `/levels/${course.id}/lessons/${id}`;
  useEffect(() => { visit(lesson.id); }, [lesson.id, visit]);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (hasUnsavedActivity()) { event.preventDefault(); event.returnValue = ""; } };
    const guard = (event: MouseEvent) => {
      const link = (event.target as Element)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (link && !link.download && link.target !== "_blank" && link.origin === location.origin && (link.pathname !== location.pathname || link.search !== location.search) && !confirmActivityNavigation()) { event.preventDefault(); event.stopPropagation(); }
    };
    window.addEventListener("beforeunload", warn); document.addEventListener("click", guard, true);
    return () => { window.removeEventListener("beforeunload", warn); document.removeEventListener("click", guard, true); };
  }, []);
  const previous = course.lessons[index - 1], next = course.lessons[index + 1];
  const navigation = <nav aria-label="Module navigation" className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-2xl">
    {previous && <Link className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-text-link)]" href={href(previous.id)} title={previous.title}><ArrowLeft className="w-4 h-4" />Previous module</Link>}
    <Link className="text-sm font-bold text-[var(--color-text-link)]" href={`/levels/${course.id}`}>Back to course</Link>
    {next && <Link className="inline-flex items-center gap-2 text-sm font-bold text-[var(--color-text-link)]" href={href(next.id)} title={next.title}>Next module<ArrowRight className="w-4 h-4" /></Link>}
  </nav>;
  return <div className="camp-module-experience camp-section-stack space-y-5 text-[var(--color-text-primary)]">
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-[var(--color-text-secondary)]">
      <Link className="font-bold hover:text-[var(--color-text-link)]" href={`/levels/${course.id}`}>{course.title}</Link>
      <span className="text-xs font-semibold rounded-full px-3 py-1 border border-[var(--color-border-default)] bg-[var(--color-surface)]">Module {index + 1} of {course.lessons.length} · {focused ? "Focused practice" : "Learn and practise"}</span>
    </div>
    <motion.div initial={false} animate={{ opacity: 1, y: 0 }}>
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-6">
        <div className="flex-1 min-w-0 w-full">
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-[var(--color-text-primary)] mb-2 leading-tight tracking-tight">{lesson.title}</h1>
          {lesson.subtitle && <p className="text-[var(--color-text-secondary)] text-base">{lesson.subtitle}</p>}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <BookmarkButton lessonId={lesson.id} />
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 text-[var(--color-text-warning)] border border-amber-500/25 text-sm font-bold"><LearningArt name="Zap" size={16} className="w-4 h-4" />{lesson.xpReward} module XP</span>
        </div>
      </div>
      <div className="h-px bg-[var(--color-border-default)] mt-6" />
    </motion.div>
    <div className="flex flex-col sm:flex-row sm:items-end gap-3">
      <label className="w-full min-w-0 flex-1 text-xs font-bold">Select module
        <SelectField aria-label="Select module" className="mt-2 w-full bg-[var(--color-surface-alt)] text-[var(--color-text-primary)] border border-[var(--color-border-default)] rounded-xl p-3 focus:ring-2 focus:ring-blue-500" value={lesson.id} onValueChange={value => { if (confirmActivityNavigation()) router.push(href(value)); }}>
          {course.lessons.map(item => <option key={item.id} value={item.id}>{item.moduleNumber}. {item.title}</option>)}
        </SelectField>
      </label>
      <Link href={focused ? `/levels/${course.id}/lessons/${lesson.id}` : `/exercises/${lesson.id}`} className="inline-flex items-center justify-center gap-2 shrink-0 rounded-xl px-4 py-3 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700"><Dumbbell className="w-4 h-4" />{focused ? "Study lesson" : "Open focused practice"}</Link>
    </div>
    {navigation}
    {enrichment?.video && <CourseVideoLesson video={enrichment.video} principle={enrichment.principle} example={enrichment} lessonId={lesson.id} lessonTitle={lesson.title} />}
    <details open={!focused} className="camp-lesson-theory text-[var(--color-text-primary)] space-y-5">
      <summary className="cursor-pointer font-display font-bold text-lg text-[var(--color-text-link)]">{focused ? "Review lesson theory / hint" : "Learn and worked examples"}</summary>
      {enrichment && <nav aria-label="Lesson sections" className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold underline text-[var(--color-text-link)]">
        <a href="#additional-worked-example">Jump to the additional worked example and reference</a>
        {enrichment.principle && <a href="#lesson-principle">{enrichment.teachingDiagram ? "Jump to the visual explanation" : "Jump to the rule mind map recap"}</a>}
        {enrichment.inlineImages && <a href="#lesson-images">Jump to the lesson images</a>}
      </nav>}
      <div className="pt-4"><IllustratedLessonContent blocks={lesson.blocks} diagram={enrichment?.teachingDiagram} images={enrichment?.inlineImages} /></div>
      {enrichment && <CourseEnrichment key={lesson.id} content={enrichment} />}
      {enrichment?.principle && !enrichment.teachingDiagram && <div className="pt-5 border-t border-[var(--color-border-default)]"><LessonPrinciple principle={enrichment.principle} /></div>}
    </details>
    <section id="practice" aria-label="Module practice" className="space-y-5 pt-5 border-t border-[var(--color-border-default)]">
      <div><h2 className="font-display text-xl font-bold">Interactive Practice Lab</h2><p className="text-sm text-[var(--color-text-secondary)] mt-2">Complete guided practice, independent practice and the fresh assessment to finish the module. Short drills are optional reinforcement. Writing and Speaking use self-review, not automatic scoring.</p></div>
      {exercises.filter(exercise => exercise.type === "course-activity").map(exercise => <div key={exercise.id} className="bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs font-semibold text-[var(--color-text-secondary)]"><span className="text-[var(--color-text-info)]">Three-stage module activity</span><span className="text-[var(--color-text-warning)]">{exercise.xpReward} activity XP · once</span></div>
        <p className="text-sm font-semibold mb-4">{courseLabel(exercise.prompt)}</p>
        <ExerciseRenderer exercise={exercise} lessonXP={lesson.xpReward} />
      </div>)}
      {exercises.some(exercise => exercise.type !== "course-activity") && <details className="space-y-4"><summary className="font-bold text-[var(--color-text-link)] cursor-pointer">Optional short drills ({exercises.filter(exercise => exercise.type !== "course-activity").length})</summary>
        {exercises.filter(exercise => exercise.type !== "course-activity").map((exercise, idx) => <div key={exercise.id} className="bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-2xl p-4 sm:p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs font-semibold text-[var(--color-text-secondary)]"><span className="text-[var(--color-text-info)]">Optional short drill {idx + 1}</span><span className="text-[var(--color-text-warning)]">{exercise.xpReward} activity XP · once</span></div>
          <p className="text-sm font-semibold mb-4">{exercise.prompt.replace("The full interactive activity below", "The three-stage module activity above")}</p>
          <ExerciseRenderer exercise={exercise} />
        </div>)}
      </details>}
    </section>
    <div role="status" className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-default)] p-5 text-sm space-y-2">
      <p className="font-bold">{done ? "Module practice completed" : "Module practice in progress"}</p>
      <p>{["Guided", "Independent", "Assessment"].map((name, i) => `${name}: ${state?.stages[i] ? state.stages[i].outcome === "checked" ? "checked task completed" : state.stages[i].outcome === "self-reviewed" ? "self-reviewed" : "study alternative completed" : i === 2 && state?.assessmentAttemptedAt ? "attempted" : "not completed"}`).join(" · ")}</p>
      {legacy && <p>Earlier completion credit and XP are retained as historical engagement. They do not establish demonstrated skill.</p>}
      <p>Course percentages count completed activity cycles and retained historical credit. They are not exam scores or a certification of mastery.</p>
    </div>
    <details className="text-sm"><summary className="cursor-pointer font-bold text-[var(--color-text-link)]">Recent practice history and revision</summary>
      <ul className="space-y-2 mt-3">{attempts.filter(item => item.moduleId === lesson.id).slice(-6).reverse().map((item, i) => <li key={`${item.at}-${i}`}>{["Guided", "Independent", "Assessment"][item.stage]} · {item.status}{item.total !== undefined ? ` · ${item.correct}/${item.total} checked answers` : ` · ${item.outcome ?? "self-review"}`}</li>)}</ul>
      <Link className="inline-block mt-3 underline text-[var(--color-text-link)]" href="/weak-areas">Review saved errors</Link>
    </details>
    {!enrichment?.video && <NotesEditor key={lesson.id} lessonId={lesson.id} lessonTitle={lesson.title} />}
    {navigation}
  </div>;
}

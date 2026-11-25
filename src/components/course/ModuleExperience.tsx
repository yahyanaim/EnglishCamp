"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { SelectField } from "@/components/ui/shadcn/select-field";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import type { Lesson, Exercise } from "@/data/types";
import type { CourseSummary } from "@/data/course-catalogue";
import { ExerciseRenderer } from "@/components/exercises/ExerciseRenderer";
import { IllustratedLessonContent } from "./IllustratedLessonContent";
import { CourseEnrichment } from "./CourseEnrichment";
import { CourseVideoLesson } from "./CourseVideoLesson";
import { LessonPrinciple } from "./LessonPrinciple";
import { LessonOutline } from "./LessonOutline";
import { LessonDoneButton, lessonReadKey } from "./LessonDoneButton";
import type { CourseEnrichment as Enrichment } from "@/data/course-enrichment/types";
import { BookmarkButton } from "@/components/ui/BookmarkButton";
import { NotesEditor } from "@/components/ui/NotesEditor";
import { useProgress } from "@/store/useProgress";
import { courseLabel } from "@/lib/courseLabels";
import { cycleComplete } from "@/lib/courseProgress";
import { confirmActivityNavigation, hasUnsavedActivity } from "@/lib/activityState";

type Tab = "watch" | "learn" | "practise";

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
  const readSaved = useProgress(s => !!s.exercisesDone[lessonReadKey(lesson.id)]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const hasVideo = !!enrichment?.video;
  const [tab, setTab] = useState<Tab>(focused ? "practise" : hasVideo ? "watch" : "learn");
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (!id) return;
      if (id === "practice") setTab("practise");
      else if (id === "video-lesson" && hasVideo) setTab("watch");
      else if (document.querySelector(`[data-panel="learn"] #${CSS.escape(id)}`)) setTab("learn");
      else return;
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    };
    open(); window.addEventListener("hashchange", open); return () => window.removeEventListener("hashchange", open);
  }, [hasVideo]);
  // Each stage opens at its start. #module-start sits in normal flow just above the (sometimes sticky) tabs, so it
  // can be scrolled to even while the tabs are stuck; its scroll-margin keeps it clear of the header.
  const go = (next: Tab) => { setTab(next); requestAnimationFrame(() => document.getElementById("module-start")?.scrollIntoView({ block: "start", behavior: "instant" })); };
  const stagesDone = mounted ? [0, 1, 2].filter(i => state?.stages[i]).length : 0;
  const read = mounted && readSaved;
  const tabs: { id: Tab; label: string; meta: string; done: boolean; show: boolean }[] = [
    { id: "watch", label: "Watch", meta: "Video & recap", done: false, show: hasVideo },
    { id: "learn", label: "Learn", meta: read ? "Read" : "Lesson & examples", done: read, show: true },
    { id: "practise", label: "Practise", meta: `${stagesDone}/3 stages`, done: mounted && done, show: true },
  ];
  const visibleTabs = tabs.filter(t => t.show);
  const pager = <nav aria-label="Module navigation" className="camp-module-pager">
    {previous ? <Link className="camp-module-pager-link" data-dir="prev" href={href(previous.id)} title={previous.title}><ArrowLeft size={18} aria-hidden="true" /><span><small>Previous · Module {index}</small><strong>{previous.title}</strong></span></Link> : <span />}
    {next ? <Link className="camp-module-pager-link" data-dir="next" href={href(next.id)} title={next.title}><span><small>Next · Module {index + 2}</small><strong>{next.title}</strong></span><ArrowRight size={18} aria-hidden="true" /></Link> : <Link className="camp-module-pager-link" data-dir="next" href={`/levels/${course.id}`}><span><small>Last module</small><strong>Back to the course</strong></span><ArrowRight size={18} aria-hidden="true" /></Link>}
  </nav>;
  return <div className="camp-module-experience camp-lesson-v2 text-[var(--color-text-primary)]">
    <header className="camp-lesson-head">
      <div className="camp-lesson-crumbs">
        <Link href={`/levels/${course.id}`}><ArrowLeft size={15} aria-hidden="true" />{course.title}</Link>
        <SelectField aria-label="Select module" className="camp-lesson-jump" value={lesson.id} onValueChange={value => { if (confirmActivityNavigation()) router.push(href(value)); }}>
          {course.lessons.map(item => <option key={item.id} value={item.id}>{item.moduleNumber}. {item.title}</option>)}
        </SelectField>
      </div>
      <div className="camp-lesson-title-row">
        <div className="min-w-0">
          <span className="camp-lesson-eyebrow">Module {index + 1} of {course.lessons.length}{focused ? " · Focused practice" : ""}</span>
          <h1>{lesson.title}</h1>
          {lesson.subtitle && <p>{lesson.subtitle}</p>}
        </div>
        <div className="camp-lesson-head-actions">
          <BookmarkButton lessonId={lesson.id} />
          <span className="camp-lesson-xp"><LearningArt name="Zap" size={16} />{lesson.xpReward} XP</span>
        </div>
      </div>
      <div className="camp-lesson-course-progress" aria-hidden="true"><span style={{ width: `${((index + 1) / course.lessons.length) * 100}%` }} /></div>
    </header>
    <span id="module-start" className="camp-module-start" aria-hidden="true" />
    <div id="module-tabs" role="tablist" aria-label="Lesson steps" className="camp-lesson-tabs" data-count={visibleTabs.length}>
      {visibleTabs.map((t, i) => <button key={t.id} type="button" role="tab" id={`tab-${t.id}`} aria-controls={`panel-${t.id}`} aria-selected={tab === t.id} onClick={() => go(t.id)}>
        <span className="camp-lesson-tab-num" data-done={t.done}>{t.done ? <Check size={14} aria-hidden="true" /> : i + 1}</span>
        <span><strong>{t.label}</strong><small>{t.meta}</small></span>
      </button>)}
    </div>
    {enrichment?.video && <div role="tabpanel" id="panel-watch" aria-labelledby="tab-watch" data-panel="watch" hidden={tab !== "watch"} className="camp-lesson-panel">
      <CourseVideoLesson video={enrichment.video} principle={enrichment.principle} example={enrichment} lessonId={lesson.id} lessonTitle={lesson.title} />
      <button type="button" className="camp-lesson-continue" onClick={() => go("learn")}>Continue to the lesson<ArrowRight size={16} aria-hidden="true" /></button>
    </div>}
    <div role="tabpanel" id="panel-learn" aria-labelledby="tab-learn" data-panel="learn" hidden={tab !== "learn"} className="camp-lesson-panel camp-lesson-theory">
      <div className="camp-reader">
      <LessonOutline bodyId="lesson-reader-body" lessonId={lesson.id} />
      <div id="lesson-reader-body" className="camp-reader-body">
      {enrichment && <nav aria-label="Lesson sections" className="camp-lesson-onpage">
        <span>On this page</span>
        <a href="#additional-worked-example">Worked example</a>
        {enrichment.principle && <a href="#lesson-principle" aria-label={enrichment.teachingDiagram ? "Jump to the visual explanation" : "Jump to the rule mind map recap"}>{enrichment.teachingDiagram ? "Visual explanation" : "Rule map"}</a>}
        {enrichment.inlineImages && <a href="#lesson-images">Lesson images</a>}
      </nav>}
      <IllustratedLessonContent blocks={lesson.blocks} diagram={enrichment?.teachingDiagram} images={enrichment?.inlineImages} />
      {enrichment && <CourseEnrichment key={lesson.id} content={enrichment} />}
      {enrichment?.principle && !enrichment.teachingDiagram && <div className="camp-lesson-principle-wrap" data-outline="visual" data-outline-label="Rule map" data-outline-kind="visual"><LessonPrinciple principle={enrichment.principle} /></div>}
      {!enrichment?.video && <NotesEditor key={lesson.id} lessonId={lesson.id} lessonTitle={lesson.title} />}
      <div className="camp-lesson-finish" id="lesson-finish" data-outline="finish" data-outline-label="Finish & practise" data-outline-kind="finish">
        <LessonDoneButton lessonId={lesson.id}/>
        <button type="button" className="camp-lesson-continue" onClick={() => go("practise")}>Continue to practice<ArrowRight size={16} aria-hidden="true" /></button>
      </div>
      </div>
      </div>
    </div>
    <div role="tabpanel" id="panel-practise" aria-labelledby="tab-practise" data-panel="practise" hidden={tab !== "practise"} className="camp-lesson-panel">
    <section id="practice" aria-label="Module practice" className="camp-lesson-practice">
      <div className="camp-lesson-practice-head">
        <div><h2>Interactive Practice Lab</h2><p>Guided practice, independent practice and a fresh assessment finish the module. Writing and Speaking use self-review.</p></div>
        <ol className="camp-lesson-stages" aria-label="Module stages">{["Guided", "Independent", "Assessment"].map((name, i) => { const st = mounted ? state?.stages[i] : undefined; return <li key={name} data-done={!!st}><span>{st ? <Check size={13} aria-hidden="true" /> : i + 1}</span>{name}<small>{st ? st.outcome === "checked" ? "Checked" : st.outcome === "self-reviewed" ? "Self-reviewed" : "Study alternative" : i === 2 && mounted && state?.assessmentAttemptedAt ? "Attempted" : "To do"}</small></li>; })}</ol>
      </div>
      {exercises.filter(exercise => exercise.type === "course-activity").map(exercise => <div key={exercise.id} className="camp-lesson-activity">
        <div className="camp-lesson-activity-meta"><span>Three-stage module activity</span><span>{exercise.xpReward} XP · once</span></div>
        <p className="camp-lesson-activity-prompt">{courseLabel(exercise.prompt)}</p>
        <ExerciseRenderer exercise={exercise} lessonXP={lesson.xpReward} />
      </div>)}
      {exercises.some(exercise => exercise.type !== "course-activity") && <details className="camp-lesson-drills"><summary>Optional short drills <span>{exercises.filter(exercise => exercise.type !== "course-activity").length}</span></summary>
        {exercises.filter(exercise => exercise.type !== "course-activity").map((exercise, idx) => <div key={exercise.id} className="camp-lesson-activity">
          <div className="camp-lesson-activity-meta"><span>Short drill {idx + 1}</span><span>{exercise.xpReward} XP · once</span></div>
          <p className="camp-lesson-activity-prompt">{exercise.prompt.replace("The full interactive activity below", "The three-stage module activity above")}</p>
          <ExerciseRenderer exercise={exercise} />
        </div>)}
      </details>}
    </section>
    <div role="status" className="camp-lesson-status">
      <p><strong>{done ? "Module practice completed" : "Module practice in progress"}</strong> · percentages count finished stages, not exam scores.</p>
      {legacy && <p>Earlier completion credit and XP are retained as historical engagement. They do not establish demonstrated skill.</p>}
    </div>
    <details className="camp-lesson-history"><summary>Recent practice history</summary>
      <ul>{attempts.filter(item => item.moduleId === lesson.id).slice(-6).reverse().map((item, i) => <li key={`${item.at}-${i}`}>{["Guided", "Independent", "Assessment"][item.stage]} · {item.status}{item.total !== undefined ? ` · ${item.correct}/${item.total} checked answers` : ` · ${item.outcome ?? "self-review"}`}</li>)}</ul>
      <Link href="/weak-areas">Review saved errors</Link>
    </details>
    </div>
    {pager}
  </div>;
}

import type { ActivityTask, LessonProgress } from "@/data/types";

export type TaskOutcome = "checked" | "self-reviewed" | "study-alternative";
export type StageEvidence = { finishedAt: string; signature: string; kind: ActivityTask["kind"]; outcome: TaskOutcome };
export type ModuleProgress = {
  viewedAt?: string;
  lastActiveAt?: string;
  currentStage?: number;
  guidedStartedAt?: string;
  assessmentAttemptedAt?: string;
  stages: Record<number, StageEvidence>;
  expectedSignatures?: string[];
  legacyStudy?: boolean;
  legacyPractice?: boolean;
};
export type ActivityAttempt = {
  moduleId: string; taskId: string; signature: string; stage: number; at: string;
  status: "attempted" | "correct" | "incorrect" | "revised" | "completed";
  outcome?: TaskOutcome; correct?: number; total?: number; wrongQuestionIds?: string[];
};
export function cycleComplete(module?: ModuleProgress): boolean {
  return !!module && [0, 1, 2].every(stage => !!module.stages[stage] && (!module.expectedSignatures || module.expectedSignatures[stage] === module.stages[stage].signature));
}
export function hasModuleCredit(id: string, modules: Record<string, ModuleProgress>, lessons: Record<string, LessonProgress>): boolean {
  const m = modules[id];
  return cycleComplete(m) || !!m?.legacyStudy || !!m?.legacyPractice || !!lessons[id]?.completed;
}

/** One definition shared by course cards, overviews, statistics and the learning rail. */
export function courseSnapshot(ids: string[], modules: Record<string, ModuleProgress>, lessons: Record<string, LessonProgress>) {
  let completed=0, started=0, stages=0;
  for (const id of ids) {
    const module=modules[id];
    if (hasModuleCredit(id,modules,lessons)) { completed++; stages+=3; }
    else if (module) {
      if (module.viewedAt || module.lastActiveAt || Object.keys(module.stages).length) started++;
      stages += [0,1,2].filter(index=>module.stages[index]&&(!module.expectedSignatures||module.expectedSignatures[index]===module.stages[index].signature)).length;
    }
  }
  return {completed,started,stages,total:ids.length,percent:ids.length?Math.round(stages/(ids.length*3)*100):0};
}
/** Preserve the original fields and rewards. A legacy boolean proves engagement, not skill. */
export function migrateCourseProgress(saved: unknown) {
  const state = (saved && typeof saved === "object" ? saved : {}) as Record<string, unknown>;
  const modules = { ...((state.modules as Record<string, ModuleProgress>) ?? {}) };
  for (const [id, lesson] of Object.entries((state.lessons ?? {}) as Record<string, LessonProgress>)) {
    if (lesson.completed) modules[id] = { ...modules[id], stages: modules[id]?.stages ?? {}, legacyStudy: true };
  }
  for (const [exerciseId, completed] of Object.entries((state.exercisesDone ?? {}) as Record<string, boolean>)) {
    if (completed && exerciseId.startsWith("activity-")) {
      const id = exerciseId.slice(9);
      modules[id] = { ...modules[id], stages: modules[id]?.stages ?? {}, legacyPractice: true };
    }
  }
  return { ...state, modules, activityAttempts: (state.activityAttempts as ActivityAttempt[]) ?? [] };
}
export function resumeModule(ids: string[], modules: Record<string, ModuleProgress>, lessons: Record<string, LessonProgress>): string | undefined {
  const unfinished = ids.filter(id => !hasModuleCredit(id, modules, lessons));
  const active = unfinished.filter(id => modules[id]?.lastActiveAt).sort((a, b) => (modules[b].lastActiveAt ?? "").localeCompare(modules[a].lastActiveAt ?? ""));
  if (active[0]) return active[0];
  const latest = ids.filter(id => modules[id]?.lastActiveAt).sort((a, b) => (modules[b].lastActiveAt ?? "").localeCompare(modules[a].lastActiveAt ?? ""))[0];
  const next = latest ? ids.slice(ids.indexOf(latest) + 1).find(id => unfinished.includes(id)) : undefined;
  return next ?? unfinished[0] ?? ids[ids.length - 1];
}

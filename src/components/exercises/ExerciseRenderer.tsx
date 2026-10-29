"use client";
import { useState } from "react";
import type { Exercise, CourseActivityData } from "@/data/types";
import { FillBlank, type FillBlankData } from "./FillBlank";
import { MultipleChoice, type MultipleChoiceData } from "./MultipleChoice";
import { Matching, type MatchingData } from "./Matching";
import { ReorderExercise, type ReorderData } from "./Reorder";
import { Translation, type TranslationData } from "./Translation";
import { CourseActivity } from "./CourseActivity";
import { clearDrillAttempt } from "@/hooks/useDrillAttempt";
import { Button } from "@/components/ui/Button";

export function ExerciseRenderer({ exercise, lessonXP = 0 }: { exercise: Exercise; lessonXP?: number }) {
  const [attempt, setAttempt] = useState(0);
  if (exercise.type === "course-activity") return <CourseActivity data={exercise.data as CourseActivityData} id={exercise.id} xpReward={exercise.xpReward} moduleId={exercise.lessonId} lessonXP={lessonXP} />;
  const shared = { id: exercise.id, xpReward: exercise.xpReward };
  return <div className="space-y-3"><div key={attempt}>
    {exercise.type === "fill-blank" && <FillBlank data={{ ...(exercise.data as FillBlankData), ...shared }} />}
    {exercise.type === "multiple-choice" && <MultipleChoice data={{ ...(exercise.data as MultipleChoiceData), ...shared }} />}
    {exercise.type === "matching" && <Matching data={{ ...(exercise.data as MatchingData), ...shared }} />}
    {exercise.type === "reorder" && <ReorderExercise data={{ ...(exercise.data as ReorderData), ...shared }} />}
    {exercise.type === "translation" && <Translation data={{ ...(exercise.data as TranslationData), ...shared }} />}
  </div><Button variant="ghost" size="sm" onClick={() => { clearDrillAttempt(exercise.id); setAttempt(a => a + 1); }}>Retry drill</Button></div>;
}

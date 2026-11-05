"use client";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { useProgress } from "@/store/useProgress";
export const lessonReadKey = (id: string) => `lesson-read:${id}`;

export function LessonDoneButton({ lessonId }: { lessonId: string }) {
  const complete = useProgress(s => s.completeExercise);
  const saved = useProgress(s => !!s.exercisesDone[lessonReadKey(lessonId)]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const read = mounted && saved;
  return <section className="camp-lesson-done" aria-label="Lesson reading completion"><div><strong>{read ? "Lesson read" : "Finished reading?"}</strong><p role="status">{read ? "Reading saved. Continue the practice below to finish this module." : "Save this lesson as read, then continue to practice."}</p></div><Button className="camp-primary-action" onClick={() => complete(lessonReadKey(lessonId), 0)} disabled={!mounted || read} aria-pressed={read}><Check size={16}/>Done</Button></section>;
}

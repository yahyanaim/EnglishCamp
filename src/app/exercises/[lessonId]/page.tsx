import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getModuleData } from "@/lib/courseData";
import { ModuleExperience } from "@/components/course/ModuleExperience";

type Props = { params: { lessonId: string } };
export function generateMetadata({ params }: Props): Metadata {
  const data = getModuleData(params.lessonId);
  return { title: data ? `Practice: ${data.lesson.title} | EnglishCamp` : "Module not found | EnglishCamp" };
}
export default function ExercisePage({ params }: Props) {
  const data = getModuleData(params.lessonId);
  if (!data) notFound();
  return <ModuleExperience key={data.lesson.id} {...data} focused />;
}

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courseCatalogue } from "@/data/course-catalogue";
import { CourseOverview } from "@/components/course/CourseOverview";

type Props = { params: { id: string } };
export function generateMetadata({ params }: Props): Metadata {
  const level = courseCatalogue.find(item => item.id === params.id);
  return { title: level ? `${level.title} | EnglishCamp` : "Course not found | EnglishCamp" };
}
export default function LevelPage({ params }: Props) {
  const level = courseCatalogue.find(item => item.id === params.id);
  if (!level) notFound();
  return <CourseOverview key={level.id} level={level} />;
}

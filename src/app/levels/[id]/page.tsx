import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courseCatalogue } from "@/data/course-catalogue";
import { CourseOverview } from "@/components/course/CourseOverview";

// Next.js 15+ passes route params as a promise.
type Props = { params: Promise<{ id: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const level = courseCatalogue.find(item => item.id === id);
  return { title: level ? `${level.title} | EnglishCamp` : "Course not found | EnglishCamp" };
}
export default async function LevelPage({ params }: Props) {
  const { id } = await params;
  const level = courseCatalogue.find(item => item.id === id);
  if (!level) notFound();
  return <CourseOverview key={level.id} level={level} />;
}

"use client";
import { usePathname } from "next/navigation";
import { learningBackDestination } from "@/lib/learningNavigation";
import { BackButton } from "@/components/ui/BackButton";

export function SectionBack() {
  const pathname = usePathname();
  // Both legacy server paths and public English paths resolve to the same parent.
  const destination = learningBackDestination(pathname || "");
  return destination ? <nav data-automatic-back className="camp-page-back no-print" aria-label="Return navigation"><BackButton href={destination.href}>{destination.label}</BackButton></nav> : null;
}

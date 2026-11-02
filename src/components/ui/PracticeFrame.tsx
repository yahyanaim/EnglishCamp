"use client";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { practiceScene } from "@/components/brand/PracticeIllustration";
import { PracticeArtContext } from "./PracticeSurface";

type PracticeLayout = "quiz" | "matching" | "writing" | "reference";

/** Presentation only: trainers keep their own questions, state, handlers and storage. */
export function PracticeFrame({ children, layout = "quiz", topic }: { children: ReactNode; layout?: PracticeLayout; topic?: string; illustration?: "inline" | "none" }) {
  const pathname = usePathname();
  const scene = practiceScene(topic || pathname || "", layout);
  if (layout === "reference") return <>{children}</>;
  return <PracticeArtContext.Provider value={scene}><section className={`camp-practice camp-practice--${layout}`} aria-label="Practice activity">
    <div className="camp-practice-body">{children}</div>
  </section></PracticeArtContext.Provider>;
}

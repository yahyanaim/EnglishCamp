"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SITE = "EnglishCamp";
/** Pages whose main heading is personal or decorative get a fixed, recognisable name instead. */
const NAMED: Record<string, string> = { "/dashboard": "Dashboard", "/stats": "Progress", "/practice": "Practice", "/mock-exam": "Mock exams" };
/** The title this component last wrote. Kept across routes: React does not rewrite an unchanged default <title>. */
let lastSet = "";

/**
 * Many learner pages are client pages without their own metadata, so they all shared the site's default title
 * (audit U04). This keeps the default only until the page renders, then names the tab after the page's main
 * heading, e.g. "Weak areas · EnglishCamp". Pages that set their own title (lessons, exercises) are left alone.
 */
export function DocumentTitle() {
  const pathname = usePathname();
  useEffect(() => {
    const main = document.querySelector("main");
    let frame = 0;
    const apply = () => {
      frame = 0;
      const current = document.title;
      if (current !== lastSet && !current.startsWith(`${SITE} — `)) return;
      const heading = main?.querySelector("h1")?.textContent?.replace(/\s+/g, " ").trim();
      const name = NAMED[pathname] || heading;
      if (!name) return;
      const next = `${name} · ${SITE}`;
      lastSet = next;
      if (next !== current) document.title = next;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(apply); };
    schedule();
    // Trainers and dialogs replace the main heading without a route change.
    const observer = main ? new MutationObserver(schedule) : null;
    observer?.observe(main!, { childList: true, subtree: true, characterData: true });
    return () => { observer?.disconnect(); if (frame) cancelAnimationFrame(frame); };
  }, [pathname]);
  return null;
}

"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { useState, useEffect } from "react";
import { useProgress } from "@/store/useProgress";
import { useTheme } from "next-themes";
import { Moon, Sun, Zap, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/shadcn/button";
import dynamic from "next/dynamic";
import { SessionEntry } from "@/components/session/SessionEntry";

const CommandPalette = dynamic(() => import("./CommandPalette").then(module => module.CommandPalette), { ssr: false });

const PAGE_TITLES: Record<string, string> = {
  "/shadowing-english": "Shadowing English",
  "/dashboard": "Dashboard",
  "/my-notes": "My notes",
  "/phrases-practice": "Phrases Practice",
  "/mock-exam": "Mock Examinations",
  "/verb-conjugation": "Verb Conjugation",
  "/vocabulary": "Vocabulary & Reading",
  "/flashcards": "Flashcards",
  "/custom-flashcards": "My Cards",
  "/alphabet": "Alphabet",
  "/practice": "Practice Hub",
  "/daily-challenge": "Daily Challenge",
  "/grammar": "Grammar Reference",
  "/search": "Search",
  "/weak-areas": "Weak Areas",
  "/stats": "Statistics",
};

export function TopBar({ onMenuClick, menuOpen = false }: { onMenuClick?: () => void; menuOpen?: boolean }) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const xp = useProgress(state => state.xp);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname().replace(/^\/(?:en|ar)(?=\/)/, "");

  useEffect(() => {
    setMounted(true);
    const handleSearchShortcut = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault(); setPaletteOpen(value => !value);
      }
    };
    document.addEventListener("keydown", handleSearchShortcut);
    return () => document.removeEventListener("keydown", handleSearchShortcut);
  }, []);

  const currentXP = mounted ? xp : 0;

  const pageTitle = Object.entries(PAGE_TITLES).find(([path]) => pathname.startsWith(path))?.[1] || "EnglishCamp";

  return (
    <header className="camp-toolbar">
      <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden shrink-0" aria-label="Open navigation menu" aria-haspopup="dialog" aria-expanded={menuOpen}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
      </Button>
      <SessionEntry />
      <span className="sr-only">{pageTitle}</span>
      <Button variant="outline" aria-label="Search courses, lessons and practice" disabled={!mounted} onClick={() => setPaletteOpen(true)} className="camp-search" onPointerEnter={() => { void import("./CommandPalette"); }} onFocus={() => { void import("./CommandPalette"); }}>
        <Search size={17} /><span>Search courses, lessons and practice...</span><kbd>⌘ K</kbd>
      </Button>
      {paletteOpen && <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />}
      <span className="camp-toolbar-xp" suppressHydrationWarning><LearningArt name="Zap" size={14}  />{currentXP.toLocaleString()}<span className="sr-only"> XP</span></span>
      <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} title="Toggle theme" aria-label="Toggle color theme" className="camp-theme-toggle">
        {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </Button>
    </header>
  );
}

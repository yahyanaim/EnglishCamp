"use client";
import { useState, useEffect } from "react";
import { useProgress } from "@/store/useProgress";
import { getLevelInfo } from "@/lib/xp";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Moon, Sun, Zap, Flame, Search, GraduationCap, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { CommandPalette } from "./CommandPalette";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
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
  const { xp, streak } = useProgress();
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentXP = mounted ? xp : 0;
  const currentStreak = mounted ? streak : 0;
  const levelInfo = getLevelInfo(currentXP);

  const pageTitle = Object.entries(PAGE_TITLES).find(([path]) => pathname.startsWith(path))?.[1] || "EnglishCamp";

  return (
    <header className="h-16 bg-[var(--color-surface)] backdrop-blur-md border-b border-[var(--color-border-default)] flex items-center justify-between gap-2 px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-1 sm:gap-2 min-w-0">
        <button
          onClick={onMenuClick}
          className="lg:hidden h-11 w-11 shrink-0 flex items-center justify-center p-2 -ml-2 rounded-[var(--radius-md)] hover:bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all"
          aria-label="Open navigation menu"
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.5 5H17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M2.5 10H17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M2.5 15H17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <span className="font-body text-sm text-[var(--color-text-secondary)] hidden sm:inline">EnglishCamp</span>
        <ChevronRight className="w-3.5 h-3.5 text-[var(--color-text-secondary)] hidden sm:block" />
        <motion.h1
          key={pageTitle}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display font-extrabold text-sm text-[var(--color-text-primary)]"
        >
          {pageTitle}
        </motion.h1>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setPaletteOpen(true)}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-md)] bg-[var(--color-surface-alt)] border border-[var(--color-border-default)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-secondary)] hover:border-[var(--color-border-strong)] transition-all font-body text-xs"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Search</span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[var(--color-neutral-100)] text-[10px] font-mono text-[var(--color-text-secondary)] border border-[var(--color-border-default)]">
            ⌘K
          </kbd>
        </motion.button>

        <CommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />

        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-[var(--radius-pill)] bg-[var(--color-warning-bg)] border-[1.5px] border-[var(--color-warning)]" style={{ boxShadow: "0 2px 0 var(--color-warning)" }}>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-[var(--color-warning)]" />
            <span suppressHydrationWarning className="font-display font-extrabold text-sm text-[var(--color-text-warning)]">{currentXP.toLocaleString()}</span>
          </div>
          <div className="w-px h-4 bg-[var(--color-warning)]/30" />
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-[var(--color-warning)]" />
            <span suppressHydrationWarning className="font-display font-extrabold text-sm text-[var(--color-text-warning)]">{currentStreak}</span>
          </div>
        </div>

        <div className="flex sm:hidden items-center gap-1 px-2.5 py-1.5 rounded-[var(--radius-pill)] bg-[var(--color-warning-bg)] border-[1.5px] border-[var(--color-warning)]" style={{ boxShadow: "0 2px 0 var(--color-warning)" }}>
          <Zap className="w-3.5 h-3.5 text-[var(--color-warning)]" />
          <span suppressHydrationWarning className="font-display font-extrabold text-xs text-[var(--color-text-warning)]">{currentXP.toLocaleString()}</span>
        </div>

        <div className="hidden sm:block w-px h-6 bg-[var(--color-border-default)]" />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-11 w-11 sm:h-auto sm:w-auto flex items-center justify-center p-2 rounded-[var(--radius-md)] hover:bg-[var(--color-surface-alt)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-all border-2 border-[var(--color-border-default)] bg-[var(--color-surface)]"
          style={{ boxShadow: "0 2px 0 var(--color-border-default)" }}
          title="Toggle theme"
          aria-label="Toggle color theme"
        >
          {mounted && theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </motion.button>

        <div suppressHydrationWarning className="w-8 h-8 rounded-full bg-[var(--color-primary)] border-2 border-[var(--color-primary-dark)] flex items-center justify-center text-[var(--color-on-brand)] font-display font-extrabold text-xs" style={{ boxShadow: "0 2px 0 var(--color-primary-dark)" }}>
          {levelInfo.level}
        </div>
      </div>
    </header>
  );
}

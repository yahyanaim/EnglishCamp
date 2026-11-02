"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Menu, X, Moon, Sun, BarChart3, GraduationCap, BookOpen, Brain, Zap } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/flashcards", label: "Flashcards", icon: GraduationCap },
  { href: "/practice", label: "Practice", icon: Brain },
  { href: "/daily-challenge", label: "Challenge", icon: Zap },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[var(--color-neutral-900)] backdrop-blur-xl border-b border-[var(--color-neutral-700)]">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display text-2xl font-extrabold">
          <LearningArt name="GraduationCap" size={24} className="w-6 h-6 text-[var(--color-primary)]" />
          <span className="text-white">English<span className="text-[var(--color-primary)]">Camp</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-[var(--radius-md)] text-sm font-bold transition-all duration-200 ${
                  active
                    ? "bg-[var(--color-primary)]/20 text-[var(--color-primary)] border border-[var(--color-primary)]/40"
                    : "text-[var(--color-text-disabled)] hover:text-white hover:bg-[var(--color-neutral-700)]"
                }`}
              >
                <LearningArt name={Icon.displayName || "book"} size={16} className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="ml-2 p-2 rounded-[var(--radius-md)] hover:bg-[var(--color-neutral-700)] text-[var(--color-text-disabled)] hover:text-white transition-all"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-[var(--radius-md)] hover:bg-[var(--color-neutral-700)] text-[var(--color-text-disabled)] transition-all"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[var(--color-neutral-700)] bg-[var(--color-neutral-900)] backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const active = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-[var(--radius-md)] text-sm font-bold transition-all ${
                      active ? "bg-[var(--color-primary)]/20 text-[var(--color-primary)]" : "text-[var(--color-text-disabled)] hover:text-white hover:bg-[var(--color-neutral-700)]"
                    }`}
                  >
                    <LearningArt name={Icon.displayName || "book"} size={16} className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-[var(--radius-md)] text-sm font-bold text-[var(--color-text-disabled)] hover:text-white hover:bg-[var(--color-neutral-700)] transition-all"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

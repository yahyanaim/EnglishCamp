"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BarChart3, Gamepad2, BookHeart, Languages, BarChart4 } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/practice", label: "Practice", icon: Gamepad2 },
  { href: "/vocabulary", label: "Vocab", icon: BookHeart },
  { href: "/grammar", label: "Grammar", icon: Languages },
  { href: "/stats", label: "Progress", icon: BarChart4 },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--color-surface)] border-t-2 border-[var(--color-border-default)] px-2 pb-[env(safe-area-inset-bottom,0px)]">
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          const Icon = item.icon;
          return (
            <Link prefetch={false}
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-1 flex-col items-center justify-center gap-0.5 min-h-11 px-1 sm:px-3 py-1 rounded-[var(--radius-md)] transition-all min-w-0",
                active
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-secondary)]"
              )}
            >
              <LearningArt name={Icon.displayName || "book"} className={cn("w-5 h-5", active && "drop-shadow-[0_1px_0_var(--color-primary-dark)]")} />
              <span className={cn(
                "text-[10px] font-display font-bold whitespace-nowrap",
                active && "text-[var(--color-primary)]"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

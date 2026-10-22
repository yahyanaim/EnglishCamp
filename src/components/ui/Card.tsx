"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Props {
  children:   React.ReactNode;
  className?: string;
  hover?:     boolean;
  glow?:      string;
  delay?:     number;
}

export function Card({ children, className, hover, glow, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      whileHover={hover ? { y: -3, transition: { duration: 0.2 } } : undefined}
      className={cn(
        "bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-2)] ring-1 ring-[var(--color-border-default)] hover:shadow-[var(--shadow-3)] transition-all duration-200",
        hover && "cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  );
}

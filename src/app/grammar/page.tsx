"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import { motion } from "framer-motion";
import { GrammarReference } from "@/components/learn/GrammarReference";
import { Languages } from "lucide-react";

export default function GrammarPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-info-bg)]">
          <LearningArt name="Languages" className="w-4.5 h-4.5 text-white" />
        </div>
        <div>
          <h1 className="font-display font-extrabold text-[var(--color-text-primary)]" style={{ fontSize: "26px", letterSpacing: "0.3px" }}>
            Grammar Reference
          </h1>
          <p className="font-body text-sm text-[var(--color-text-secondary)] mt-0.5">Quick lookup for English grammar rules</p>
        </div>
      </motion.div>
      <GrammarReference />
    </div>
  );
}

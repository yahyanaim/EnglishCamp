"use client";
import { LearningArt } from "@/components/brand/LearningArt";
import Link from "next/link";
import { ArrowLeft, Home, BookOpen, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center bg-[var(--color-surface)] border border-[var(--color-border-default)] rounded-[var(--radius-xl)] p-5 sm:p-6 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-4 border border-amber-500/20">
          <LearningArt name="Compass" size={32} className="w-8 h-8" />
        </div>
        
        <h1 className="font-display font-black text-4xl text-[var(--color-text-primary)] mb-2">
          404
        </h1>
        <h2 className="font-display font-bold text-lg text-[var(--color-text-primary)] mb-2">
          Page Not Found
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] mb-6 leading-relaxed">
          The page or lesson you are looking for doesn&apos;t exist or may have been relocated.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-primary)] text-[var(--color-on-brand)] font-bold text-sm shadow-sm hover:opacity-90 transition-opacity"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link
            href="/levels/band4-5"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-surface-alt)] border border-[var(--color-border-default)] text-[var(--color-text-primary)] font-bold text-sm hover:bg-[var(--color-neutral-100)] transition-colors"
          >
            <LearningArt name="BookOpen" size={16} className="w-4 h-4 text-blue-500" />
            <span>Practice Courses</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

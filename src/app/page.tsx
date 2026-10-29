"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { levels } from "@/data/content";
import { useProgress } from "@/store/useProgress";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { BookOpen, Brain, Zap, BarChart3, Flame, GraduationCap, Sparkles, ChevronRight, ArrowRight } from "lucide-react";

const FEATURES = [
  { icon: BookOpen, label: "Practice Courses", desc: "IELTS, TOEFL & B2", color: "var(--color-primary)", href: "/levels/band5-6" },
  { icon: BarChart3, label: "Full Mock Exams", desc: "Timed Official Simulations", color: "var(--color-error)", href: "/mock-exam" },
  { icon: Zap, label: "Flashcards", desc: "430+ AWL Cards", color: "var(--color-warning)", href: "/flashcards" },
  { icon: Brain, label: "Practice Hub", desc: "50+ Interactive Trainers", color: "var(--color-info)", href: "/practice" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0, 0, 0.2, 1] } },
};

export default function Home() {
  const { getLevelProgress, getTotalXP, streak } = useProgress();
  const hasXP = getTotalXP() > 0;

  return (
    <div className="min-h-screen">
      {/* ─── Hero ─── */}
      <section className="relative pt-16 pb-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-primary-subtle)]/40 to-transparent pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
          className="relative z-10"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-[var(--radius-2xl)] bg-[var(--color-primary-subtle)] text-4xl mb-6"
          >
            🇬🇧
          </motion.span>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight mb-4">
            English<span style={{ color: "var(--color-text-link)" }}>Camp</span>
          </h1>
          <p className="font-body text-lg md:text-xl" style={{ color: "var(--color-text-secondary)" }}>
            Your complete path from{" "}
            <span className="font-semibold" style={{ color: "var(--color-text-primary)" }}>IELTS Band 4 to 8+</span>
          </p>

          {/* Stats badges */}
          {hasXP && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.35 }}
              className="flex items-center justify-center gap-3 mt-6 mb-8"
            >
              <div
                className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] px-4 py-2"
                style={{ background: "var(--color-warning-bg)", border: "1.5px solid var(--color-warning)" }}
              >
                <Zap className="w-4 h-4" style={{ color: "var(--color-text-warning)" }} />
                <span className="font-display font-extrabold text-base" style={{ color: "var(--color-text-warning)" }}>
                  {getTotalXP()} XP
                </span>
              </div>
              <div
                className="inline-flex items-center gap-2 rounded-[var(--radius-pill)] px-4 py-2"
                style={{ background: "var(--color-warning-bg)", border: "1.5px solid var(--color-warning)" }}
              >
                <Flame className="w-4 h-4" style={{ color: "var(--color-text-warning)" }} />
                <span className="font-display font-extrabold text-base" style={{ color: "var(--color-text-warning)" }}>
                  {streak}
                </span>
                <span className="font-body text-xs" style={{ color: "var(--color-text-warning)" }}>day streak</span>
              </div>
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.35 }}
            className="flex items-center justify-center gap-3 flex-wrap mt-2"
          >
            <Link href="/dashboard">
              <Button size="lg">
                {hasXP ? "Continue Learning" : "Start Learning"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/levels/band4-5">
              <Button variant="secondary" size="lg">Browse Courses</Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── Features ─── */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20"
      >
        {FEATURES.map((f) => {
          const Icon = f.icon;
          return (
            <motion.div key={f.label} variants={childVariants}>
              <Link
                href={f.href}
                className="group block bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-6 text-center shadow-[var(--shadow-2)] border-2 border-[var(--color-border-default)] hover:border-[var(--color-border-strong)] transition-all duration-200 hover:-translate-y-0.5"
                style={{ boxShadow: "0 3px 0 var(--color-border-default)" }}
              >
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-[var(--radius-lg)] mb-4 transition-transform duration-200 group-hover:scale-110"
                  style={{ background: "var(--color-primary-subtle)" }}
                >
                  <Icon className="w-6 h-6" style={{ color: f.color }} />
                </div>
                <p className="font-display font-bold text-base" style={{ color: "var(--color-text-primary)" }}>
                  {f.label}
                </p>
                <p className="font-body text-sm mt-1" style={{ color: "var(--color-text-secondary)" }}>
                  {f.desc}
                </p>
              </Link>
            </motion.div>
          );
        })}
      </motion.section>

      {/* ─── Practice Courses ─── */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <GraduationCap className="w-6 h-6" style={{ color: "var(--color-primary)" }} />
              <h2 className="font-display text-2xl md:text-3xl font-extrabold" style={{ color: "var(--color-text-primary)" }}>
                Test Practice Courses
              </h2>
            </div>
            <p className="font-body text-sm" style={{ color: "var(--color-text-secondary)" }}>
              Structured preparation courses with practice materials designed for IELTS Academic, IELTS General, TOEFL iBT, and Cambridge B2 First.
            </p>
          </div>
          <Link href="/mock-exam">
            <Button variant="secondary" size="sm" className="gap-2 shrink-0">
              <BarChart3 className="w-4 h-4 text-[var(--color-error)]" />
              <span>Full Mock Exam Simulations</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {levels.map((level) => {
            const progress = getLevelProgress(level.id, level.lessons.length, () => false, level.lessons.map(l => l.id));
            const isComplete = progress === 100;
            return (
              <motion.div key={level.id} variants={childVariants}>
                <Link href={`/levels/${level.id}`} className="block group h-full">
                  <div
                    className="h-full flex flex-col justify-between bg-[var(--color-surface)] rounded-[var(--radius-lg)] p-5 border-2 border-[var(--color-border-default)] transition-all duration-200 group-hover:-translate-y-1 group-hover:border-[var(--color-border-strong)]"
                    style={{
                      boxShadow: "0 3px 0 var(--color-border-default)",
                      borderLeft: `4px solid ${level.accent}`,
                    }}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span
                          className="font-display text-lg font-extrabold leading-snug"
                          style={{ color: `var(--color-course-${level.id})` }}
                        >
                          {level.title}
                        </span>
                        {level.examBadge && (
                          <span
                            className="text-[10px] font-display font-extrabold uppercase px-2 py-0.5 rounded-full shrink-0"
                            style={{ color: `var(--color-course-${level.id})`, backgroundColor: `${level.accent}18` }}
                          >
                            {level.examBadge}
                          </span>
                        )}
                        {isComplete && (
                          <div
                            className="inline-flex items-center justify-center w-7 h-7 rounded-full shrink-0"
                            style={{ background: "var(--color-success-bg)" }}
                          >
                            <Sparkles className="w-4 h-4" style={{ color: "var(--color-success-dark)" }} />
                          </div>
                        )}
                      </div>
                      <p className="font-body text-xs font-semibold mb-2" style={{ color: "var(--color-text-secondary)" }}>
                        {level.subtitle}
                      </p>
                      <p
                        className="font-body text-xs mb-4 line-clamp-3 leading-relaxed"
                        style={{ color: "var(--color-text-secondary)" }}
                      >
                        {level.intro}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex-1">
                          <div
                            className="h-2 rounded-[var(--radius-pill)] overflow-hidden"
                            style={{ background: "var(--color-neutral-100)" }}
                          >
                            <motion.div
                              className="h-full rounded-[var(--radius-pill)]"
                              style={{ background: level.accent }}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${progress}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.6, ease: [0, 0, 0.2, 1], delay: 0.2 }}
                            />
                          </div>
                        </div>
                        <span className="font-display font-bold text-xs whitespace-nowrap" style={{ color: "var(--color-text-secondary)" }}>
                          {progress}%
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border-default)]">
                        <span className="font-body text-xs font-medium" style={{ color: "var(--color-text-secondary)" }}>
                          {level.lessons.length} Lessons · {level.duration}
                        </span>
                        <span
                          className="font-display font-bold text-xs inline-flex items-center gap-1"
                          style={{ color: `var(--color-course-${level.id})` }}
                        >
                          {progress > 0 ? "Continue" : "Start Course"}
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}

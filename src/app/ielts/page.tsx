'use client';
import { motion } from 'framer-motion';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { IELTS_GUIDE_CONTENT, IELTS_COMPARISON, WRITING_TEMPLATES } from '@/data/b2-pruefung';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';
import { ExternalLink, GraduationCap, ChevronRight, BookOpen, Headphones, Pen, Mic, TrendingUp, Calendar, Target, AlertTriangle } from 'lucide-react';

const sectionIcons: Record<string, React.ReactNode> = {
  overview: <GraduationCap className="w-5 h-5" />,
  listening: <Headphones className="w-5 h-5" />,
  reading: <BookOpen className="w-5 h-5" />,
  'writing-task1': <Pen className="w-5 h-5" />,
  'writing-task2': <Pen className="w-5 h-5" />,
  speaking: <Mic className="w-5 h-5" />,
  'band-guide': <TrendingUp className="w-5 h-5" />,
  'study-plans': <Calendar className="w-5 h-5" />,
  'free-resources': <Target className="w-5 h-5" />,
  'common-mistakes': <AlertTriangle className="w-5 h-5" />,
};

export default function IELTSPage() {
  return (
    <PageWrapper>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[var(--radius-lg)] p-8 text-white"
        >
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-8 h-8" />
            <h1 className="font-display text-3xl font-extrabold">IELTS Academic</h1>
          </div>
          <p className="text-white/80 max-w-2xl">
            The International English Language Testing System (IELTS) is the world&apos;s most popular English
            proficiency test for university admission and migration. This comprehensive study guide covers everything
            from exam format and scoring to detailed strategies for each section, study plans, and free resources.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {IELTS_GUIDE_CONTENT.map((section, i) => (
            <motion.a
              key={section.id}
              href={`#section-${section.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-3 p-3 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border-default)] hover:border-[var(--color-primary)] transition-all"
            >
              <span className={`text-${section.color}-500`}>{sectionIcons[section.id] || '📌'}</span>
              <span className="text-xs font-display font-bold">{section.title}</span>
            </motion.a>
          ))}
        </div>

        {IELTS_GUIDE_CONTENT.map((section, si) => (
          <motion.div
            key={section.id}
            id={`section-${section.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.05 }}
          >
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{section.icon}</span>
                <div>
                  <h2 className="font-display text-xl font-extrabold">{section.title}</h2>
                  <p className="text-sm text-[var(--color-text-disabled)]">{section.subtitle}</p>
                </div>
              </div>
              <p className="text-sm text-[var(--color-text-secondary)] mb-6 leading-relaxed">{section.description}</p>

              <div className="space-y-4">
                {section.topics.map((topic, ti) => (
                  <details key={ti} className="group">
                    <summary className="flex items-center gap-2 cursor-pointer p-3 rounded-[var(--radius-lg)] hover:bg-[var(--color-surface-alt)] transition-colors">
                      <ChevronRight className="w-4 h-4 text-[var(--color-text-disabled)] transition-transform group-open:rotate-90" />
                      <span className="font-display font-bold text-sm">{topic.title}</span>
                    </summary>
                    <div className="pl-6 pr-3 pb-4 space-y-2">
                      {topic.body.map((p, pi) => (
                        <p key={pi} className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{p}</p>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </Card>
          </motion.div>
        ))}

        <Card>
          <h2 className="font-display text-xl font-extrabold mb-4">Writing Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {WRITING_TEMPLATES.filter((t) => t.id.startsWith('ielts')).map((tpl) => (
              <details key={tpl.id} className="group">
                <summary className="flex items-center gap-3 cursor-pointer p-3 rounded-[var(--radius-lg)] hover:bg-[var(--color-surface-alt)] transition-colors">
                  <span className="text-xl">{tpl.icon}</span>
                  <div className="flex-1">
                    <p className="font-display font-bold text-sm">{tpl.title}</p>
                    <p className="text-xs text-[var(--color-text-disabled)]">{tpl.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 transition-transform group-open:rotate-90" />
                </summary>
                <div className="pl-11 pr-3 pb-4 space-y-2">
                  {tpl.template.map((line, i) => (
                    <p key={i} className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{line}</p>
                  ))}
                  <div className="mt-3 pt-3 border-t border-[var(--color-border-default)]">
                    <p className="text-xs font-display font-bold mb-2 text-[var(--color-primary)]">Tips</p>
                    {tpl.notes.map((note, i) => (
                      <p key={i} className="text-xs text-[var(--color-text-secondary)] leading-relaxed">• {note}</p>
                    ))}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-display text-xl font-extrabold mb-4">IELTS vs TOEFL Comparison</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-[var(--color-border-default)]">
                  {IELTS_COMPARISON.rows[0].map((h, i) => (
                    <th key={i} className="text-left p-3 font-display font-bold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {IELTS_COMPARISON.rows.slice(1).map((row, i) => (
                  <tr key={i} className="border-b border-[var(--color-border-default)]">
                    {row.map((cell, j) => (
                      <td key={j} className={`p-3 ${j === 0 ? 'font-semibold' : ''}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="flex gap-4">
          <Link href="/levels/band4-5">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)] font-display font-extrabold hover:bg-[var(--color-primary-dark)] transition-all">
              Start IELTS Preparation <ChevronRight className="w-4 h-4" />
            </span>
          </Link>
          <Link href="/mock-exam">
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-surface)] text-[var(--color-text-primary)] rounded-[var(--radius-lg)] font-display font-extrabold border-2 border-[var(--color-border-default)] hover:border-[var(--color-primary)] transition-all">
              Take IELTS Mock Test <ExternalLink className="w-4 h-4" />
            </span>
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}

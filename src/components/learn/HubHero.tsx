"use client";
import { useMemo, useState, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { LearningArt } from "@/components/brand/LearningArt";

export type HubStat = { label: string; value: ReactNode };

/**
 * Header shared by the Read, Grammar and Practice hubs. It follows the course module header: eyebrow, title,
 * one line of purpose, a few numbers that matter to the learner and the single most useful next step.
 */
export function HubHero({ eyebrow, title, description, art, stats, progress, action }: {
  eyebrow: string; title: string; description: string; art: string; stats: HubStat[];
  progress?: { value: number; total: number; label: string }; action?: ReactNode;
}) {
  const percent = progress && progress.total ? Math.round(progress.value / progress.total * 100) : 0;
  return (
    <header className="camp-hub-hero">
      <div className="camp-hub-hero-main">
        <span className="camp-hub-hero-art" aria-hidden="true"><LearningArt name={art} size={30} /></span>
        <div className="min-w-0">
          <span className="camp-lesson-eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
      </div>
      <dl className="camp-hub-stats">
        {stats.map(stat => <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>)}
      </dl>
      {action && <div className="camp-hub-hero-action">{action}</div>}
      {progress && (
        <div className="camp-hub-hero-progress">
          <span className="camp-hub-hero-progress-label">{progress.label}<strong>{percent}%</strong></span>
          <span className="camp-lesson-course-progress" role="progressbar" aria-label={progress.label} aria-valuemin={0} aria-valuemax={progress.total} aria-valuenow={progress.value}>
            <span style={{ width: `${percent}%` }} />
          </span>
        </div>
      )}
    </header>
  );
}

/** The single most useful next step in a hub ("Continue reading …"). Renders as a button or a link-like button. */
export function HubContinue({ kicker, title, meta, art, onClick }: { kicker: string; title: string; meta?: string; art: string; onClick: () => void }) {
  return (
    <button type="button" className="camp-hub-continue" onClick={onClick}>
      <span className="camp-hub-continue-art" aria-hidden="true"><LearningArt name={art} size={24} /></span>
      <span className="camp-hub-continue-copy"><small>{kicker}</small><strong>{title}</strong>{meta && <span>{meta}</span>}</span>
      <ChevronRight className="camp-hub-continue-arrow" size={20} aria-hidden="true" />
    </button>
  );
}

/** Level filter shown as a rail of tiles with a count and a progress bar each. */
export function LevelRail<T extends string>({ label, value, onChange, items }: {
  label: string; value: T | "all"; onChange: (value: T | "all") => void;
  items: { value: T; name: string; total: number; done: number }[];
}) {
  return (
    <div className="camp-level-rail" role="group" aria-label={label}>
      <button type="button" className="camp-level-rail-tile" aria-pressed={value === "all"} onClick={() => onChange("all")}>
        <span className="camp-level-rail-head"><span className="camp-hub-level">All</span><span className="camp-level-rail-name">Every level</span></span>
        <span className="camp-level-rail-count"><strong>{items.reduce((n, item) => n + item.done, 0)}</strong> / {items.reduce((n, item) => n + item.total, 0)}</span>
        <span className="camp-level-rail-bar" aria-hidden="true"><span style={{ width: `${pct(items.reduce((n, item) => n + item.done, 0), items.reduce((n, item) => n + item.total, 0))}%` }} /></span>
      </button>
      {items.map(item => (
        <button key={item.value} type="button" className="camp-level-rail-tile" aria-pressed={value === item.value} disabled={!item.total}
          onClick={() => onChange(value === item.value ? "all" : item.value)}>
          <span className="camp-level-rail-head"><span className="camp-hub-level">{item.value}</span><span className="camp-level-rail-name">{item.name}</span></span>
          <span className="camp-level-rail-count">{item.total ? <><strong>{item.done}</strong> / {item.total}</> : "Coming soon"}</span>
          <span className="camp-level-rail-bar" aria-hidden="true"><span style={{ width: `${pct(item.done, item.total)}%` }} /></span>
        </button>
      ))}
    </div>
  );
}

const pct = (value: number, total: number) => total ? Math.round(value / total * 100) : 0;

/** Groups near-duplicate topic names (Sport / Sports, case) under one key. */
export const topicKey = (topic: string) => topic.trim().toLowerCase().replace(/s$/, "");

/**
 * Topic filter chips: the most common topics first, the rest behind "More topics".
 * The selected topic always stays visible.
 */
export function TopicChips({ label, values, value, onChange, max = 8 }: { label: string; values: string[]; value: string; onChange: (key: string) => void; max?: number }) {
  const [open, setOpen] = useState(false);
  const groups = useMemo(() => {
    const map = new Map<string, { key: string; label: string; count: number; labels: Map<string, number> }>();
    for (const raw of values) {
      const key = topicKey(raw), g = map.get(key) ?? { key, label: raw, count: 0, labels: new Map() };
      g.count++; g.labels.set(raw, (g.labels.get(raw) ?? 0) + 1); map.set(key, g);
    }
    return Array.from(map.values()).map(g => ({ key: g.key, count: g.count, label: Array.from(g.labels.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0][0] }))
      .sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  }, [values]);
  const top = groups.slice(0, max), rest = groups.slice(max), selectedHidden = rest.find(g => g.key === value);
  const shown = open ? groups : selectedHidden ? [...top, selectedHidden] : top;
  return (
    <div className="camp-hub-chips camp-topic-chips" role="group" aria-label={label}>
      <button type="button" aria-pressed={value === "all"} onClick={() => onChange("all")}>All topics</button>
      {shown.map(g => <button key={g.key} type="button" aria-pressed={value === g.key} onClick={() => onChange(value === g.key ? "all" : g.key)}>{g.label}<span className="camp-topic-count">{g.count}</span></button>)}
      {rest.length > 0 && <button type="button" className="camp-topic-more" aria-expanded={open} onClick={() => setOpen(o => !o)}>{open ? "Fewer topics" : `More topics (${rest.length})`}</button>}
    </div>
  );
}

"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

type Item = { id: string; label: string; kind: "section" | "example" | "visual" | "finish" };

const slug = (text: string, used: Set<string>) => {
  const base = "sec-" + text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
  let id = base, n = 2;
  while (used.has(id) || (document.getElementById(id) && !document.getElementById(id)?.dataset.outline)) id = `${base}-${n++}`;
  used.add(id);
  return id;
};

/** Presentation-only reading aid: builds the outline from the headings already rendered
 *  in the Learn panel, highlights the section in view and shows reading progress. */
export function LessonOutline({ bodyId, lessonId }: { bodyId: string; lessonId: string }) {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const targets = useRef<HTMLElement[]>([]);

  const collect = useCallback(() => {
    const body = document.getElementById(bodyId);
    if (!body || body.offsetParent === null) return;
    const used = new Set<string>();
    const found: Item[] = [];
    const els: HTMLElement[] = [];
    body.querySelectorAll<HTMLElement>("h3, [data-outline]").forEach(el => {
      if (el.closest("details:not([open])")) return;
      // A heading inside a labelled container is represented by that container.
      if (!el.matches("[data-outline]") && el.parentElement?.closest("[data-outline]:not([data-outline='auto'])")) return;
      const owner = el;
      const label = (owner.dataset.outlineLabel || el.textContent || "").trim();
      if (!label) return;
      if (!owner.id) { owner.id = slug(label, used); owner.dataset.outline = owner.dataset.outline || "auto"; }
      const kind = (owner.dataset.outlineKind as Item["kind"]) || "section";
      found.push({ id: owner.id, label, kind });
      els.push(owner);
    });
    targets.current = els;
    setItems(found);
  }, [bodyId]);

  useEffect(() => {
    collect();
    const body = document.getElementById(bodyId);
    if (!body) return;
    const panel = body.closest("[data-panel]");
    const mo = new MutationObserver(() => collect());
    if (panel) mo.observe(panel, { attributes: true, attributeFilter: ["hidden"] });
    const t = window.setTimeout(collect, 500);
    return () => { mo.disconnect(); window.clearTimeout(t); };
  }, [bodyId, lessonId, collect]);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const body = document.getElementById(bodyId);
        if (!body || body.offsetParent === null) return;
        const rect = body.getBoundingClientRect();
        const span = Math.max(1, rect.height - window.innerHeight * 0.6);
        setProgress(Math.min(1, Math.max(0, -rect.top / span + 0.02)));
        let idx = 0;
        targets.current.forEach((el, i) => { if (el.getBoundingClientRect().top < 200) idx = i; });
        setActive(idx);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(frame); };
  }, [bodyId, items]);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    setOpen(false);
    const y = el.getBoundingClientRect().top + window.scrollY - 170;
    window.scrollTo({ top: y, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  if (items.length < 2) return null;
  const pct = Math.round(progress * 100);
  const current = items[active];
  return <aside className="camp-outline" aria-label="Lesson outline">
    <div className="camp-outline-head">
      <span className="camp-outline-ring" style={{ "--p": pct } as React.CSSProperties} aria-hidden="true"><span>{pct}%</span></span>
      <div><strong>Lesson outline</strong><small>{items.length} parts · {pct >= 98 ? "read through" : `${pct}% read`}</small></div>
    </div>
    <button type="button" className="camp-outline-toggle" aria-expanded={open} onClick={() => setOpen(v => !v)}>
      <span className="camp-outline-bar" aria-hidden="true"><i style={{ width: `${pct}%` }} /></span>
      <span className="camp-outline-now"><b>{active + 1}/{items.length}</b>{current?.label}</span>
      <ChevronDown size={16} aria-hidden="true" />
    </button>
    <ol className="camp-outline-list" data-open={open}>
      {items.map((item, i) => <li key={item.id} data-state={i < active ? "done" : i === active ? "active" : "next"} data-kind={item.kind}>
        <button type="button" onClick={() => jump(item.id)} aria-current={i === active ? "location" : undefined}>
          <span className="camp-outline-dot" aria-hidden="true">{i < active ? <Check size={11} strokeWidth={3} /> : i + 1}</span>
          <span className="camp-outline-label">{item.label}</span>
        </button>
      </li>)}
    </ol>
  </aside>;
}

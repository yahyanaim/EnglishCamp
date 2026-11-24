import type { ReactNode } from "react";
import type { ConceptVisual, DiagramNode } from "@/data/teaching-diagrams/types";

/* Card-based concept diagrams: every idea sits in a card, relationships are labelled
   connectors, steps are numbered, and the canvas carries a light dot grid.
   Wide (800) and narrow (320) versions are laid out from measured text, so nothing overlaps. */

const ink = "var(--color-text-primary)", muted = "var(--color-text-secondary)", accent = "var(--camp-purple, #7e22ce)", surface = "var(--color-surface)", border = "var(--color-border-strong)";
type Of<K extends ConceptVisual["layout"]> = Extract<ConceptVisual, { layout: K }>;
type Built = { body: ReactNode; height: number };
type Tone = "accent" | "neutral" | "muted";

export function wrapDiagramText(text: string, max: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split("\n")) {
    let line = "";
    for (const word of paragraph.split(/\s+/)) {
      if (line && line.length + word.length + 1 > max) { lines.push(line); line = word; }
      else line = line ? `${line} ${word}` : word;
    }
    if (line) lines.push(line);
  }
  return lines;
}
const CHAR = 0.52;
const fit = (text: string, width: number, size: number) => wrapDiagramText(text, Math.max(8, Math.floor(width / (size * CHAR))));
const display = { fontFamily: "var(--font-display), Nunito, sans-serif" };

function Lines({ lines, x, y, size, fill = ink, bold = false, anchor = "start", gap = 7 }: { lines: string[]; x: number; y: number; size: number; fill?: string; bold?: boolean; anchor?: "start" | "middle" | "end"; gap?: number }) {
  return <text x={x} y={y} textAnchor={anchor} fill={fill} fontSize={size} fontWeight={bold ? 800 : 400} style={bold ? display : undefined}>
    {lines.map((part, i) => <tspan key={i} x={x} dy={i ? size + gap : 0}>{part}</tspan>)}
  </text>;
}

/** Card metrics: label (accent, bold) over detail (ink). */
function cardLayout(node: DiagramNode, w: number, c: boolean, badge?: string | number, flip = false) {
  const ls = flip ? (c ? 19 : 21) : (c ? 16 : 17), ds = flip ? (c ? 14 : 15) : (c ? 15 : 16);
  const inset = badge !== undefined ? 50 : 18;
  const top = flip ? node.detail : node.label, bottom = flip ? node.label : node.detail;
  const L = fit(top, w - inset - 18, ls), D = fit(bottom, w - inset - 18, ds);
  const h = 18 + ls + (L.length - 1) * (ls + 6) + 10 + D.length * (ds + 7) + 12;
  return { ls, ds, inset, L, D, h: Math.max(h, badge !== undefined ? 60 : 0) };
}
const cardH = (node: DiagramNode, w: number, c: boolean, badge?: string | number, flip = false) => cardLayout(node, w, c, badge, flip).h;

function Card({ node, x, y, w, c, id, tone = "neutral", badge, flip = false, h: forced }: { node: DiagramNode; x: number; y: number; w: number; c: boolean; id: string; tone?: Tone; badge?: string | number; flip?: boolean; h?: number }) {
  const m = cardLayout(node, w, c, badge, flip), h = forced ?? m.h;
  const tint = tone === "accent";
  return <g>
    <rect x={x} y={y} width={w} height={h} rx={16} fill={surface} stroke={tint ? accent : border} strokeOpacity={tint ? .55 : .7} strokeDasharray={tone === "muted" ? "6 5" : undefined} filter={`url(#${id}-shadow)`} />
    {tint && <rect x={x} y={y} width={w} height={h} rx={16} fill={`url(#${id}-tint)`} />}
    {tone !== "muted" && <rect x={x} y={y + 14} width={4} height={Math.max(12, h - 28)} rx={2} fill={accent} opacity={tint ? 1 : .45} />}
    {badge !== undefined && <g>
      <circle cx={x + 28} cy={y + 30} r={14} fill={accent} />
      <text x={x + 28} y={y + 35} textAnchor="middle" fill="#fff" fontSize={13} fontWeight={800} style={display}>{badge}</text>
    </g>}
    <Lines lines={m.L} x={x + m.inset} y={y + 18 + m.ls - 2} size={m.ls} fill={flip ? ink : accent} bold />
    <Lines lines={m.D} x={x + m.inset} y={y + 18 + m.ls + (m.L.length - 1) * (m.ls + 6) + 10 + m.ds} size={m.ds} fill={flip ? accent : tone === "muted" ? muted : ink} bold={flip} />
  </g>;
}

function pillLayout(text: string, maxW: number, size = 13) {
  const L = fit(text, maxW - 24, size);
  const w = Math.min(maxW, Math.max(...L.map(l => l.length)) * size * CHAR + 26);
  return { L, w, h: L.length * (size + 6) + 12, size };
}
function Pill({ text, cx, y, maxW, strong = false }: { text: string; cx: number; y: number; maxW: number; strong?: boolean }) {
  const p = pillLayout(text, maxW);
  return <g>
    <rect x={cx - p.w / 2} y={y} width={p.w} height={p.h} rx={p.h > 28 ? 12 : p.h / 2} fill={strong ? accent : surface} stroke={accent} strokeOpacity={strong ? 0 : .35} />
    <Lines lines={p.L} x={cx} y={y + 6 + p.size} size={p.size} fill={strong ? "#fff" : muted} anchor="middle" gap={6} bold={strong} />
  </g>;
}
function Edge({ d, id, dashed = false }: { d: string; id: string; dashed?: boolean }) {
  return <path d={d} fill="none" stroke={accent} strokeOpacity={dashed ? .55 : .75} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dashed ? "6 6" : undefined} markerEnd={dashed ? undefined : `url(#${id}-arrow)`} />;
}

/** Vertical chain used by every narrow layout: cards with labelled connectors between. */
function chain(items: { node: DiagramNode; tone?: Tone; badge?: string | number; flip?: boolean; link?: string }[], W: number, id: string, top = 16): Built {
  const out: ReactNode[] = [];
  let y = top;
  items.forEach((it, i) => {
    const w = W - 24, h = cardH(it.node, w, true, it.badge, it.flip);
    out.push(<Card key={`c${i}`} node={it.node} x={12} y={y} w={w} c id={id} tone={it.tone} badge={it.badge} flip={it.flip} />);
    y += h;
    if (i < items.length - 1) {
      const label = items[i + 1].link;
      const p = label ? pillLayout(label, W - 90) : { h: 0 };
      const gap = Math.max(40, p.h + 24);
      out.push(<Edge key={`e${i}`} d={`M36 ${y + 4}V${y + gap - 6}`} id={id} />);
      if (label) out.push(<Pill key={`p${i}`} text={label} cx={56 + Math.min(W - 90, pillLayout(label, W - 90).w) / 2} y={y + (gap - p.h) / 2} maxW={W - 90} />);
      y += gap;
    }
  });
  return { body: <>{out}</>, height: y + 16 };
}

function Contrast({ v, c, id, W }: { v: Of<"contrast">; c: boolean; id: string; W: number }): Built {
  const sym = v.symbol ?? "↔";
  if (c) {
    const w = W - 24, h1 = cardH(v.left, w, c), h2 = cardH(v.right, w, c), y2 = 16 + h1 + 64, pr = pillLayout(v.relationship, W - 24);
    return { height: y2 + h2 + 24 + pr.h + 16, body: <>
      <Card node={v.left} x={12} y={16} w={w} c id={id} tone="accent" />
      <circle cx={W / 2} cy={16 + h1 + 32} r={22} fill={accent} /><text x={W / 2} y={16 + h1 + 41} textAnchor="middle" fill="#fff" fontSize={24} fontWeight={800}>{sym}</text>
      <Card node={v.right} x={12} y={y2} w={w} c id={id} />
      <Pill text={v.relationship} cx={W / 2} y={y2 + h2 + 24} maxW={W - 24} />
    </> };
  }
  const w = 330, h = Math.max(cardH(v.left, w, c), cardH(v.right, w, c)), pr = pillLayout(v.relationship, 620);
  return { height: 24 + h + 28 + pr.h + 20, body: <>
    <Card node={v.left} x={40} y={24} w={w} c={c} id={id} tone="accent" h={h} />
    <Card node={v.right} x={430} y={24} w={w} c={c} id={id} h={h} />
    <circle cx={400} cy={24 + h / 2} r={26} fill={accent} filter={`url(#${id}-shadow)`} /><text x={400} y={24 + h / 2 + 10} textAnchor="middle" fill="#fff" fontSize={28} fontWeight={800}>{sym}</text>
    <Edge d={`M400 ${24 + h + 2}V${24 + h + 24}`} id={id} dashed />
    <Pill text={v.relationship} cx={400} y={24 + h + 28} maxW={620} />
  </> };
}

function Flow({ v, c, id, W }: { v: Of<"flow">; c: boolean; id: string; W: number }): Built {
  if (c) return chain(v.nodes.map((node, i) => ({ node, badge: i + 1, tone: i === v.nodes.length - 1 ? "accent" as Tone : "neutral" as Tone, link: i ? v.links[i - 1] : undefined })), W, id);
  const n = v.nodes.length, gap = 64, w = (W - 48 - gap * (n - 1)) / n;
  const pills = v.links.map(l => pillLayout(l, Math.min(200, w + gap - 12)));
  const band = pills.length ? Math.max(...pills.map(p => p.h)) : 0, cy = 16 + band + 26;
  const h = Math.max(...v.nodes.map(node => cardH(node, w, c, "")));
  return { height: cy + h + 20, body: <>
    {v.nodes.map((node, i) => { const x = 24 + i * (w + gap); return <g key={i}>
      <Card node={node} x={x} y={cy} w={w} c={c} id={id} badge={i + 1} h={h} tone={i === n - 1 ? "accent" : "neutral"} />
      {i < n - 1 && <>
        <Edge d={`M${x + w + 6} ${cy + 30}H${x + w + gap - 8}`} id={id} />
        <path d={`M${x + w + gap / 2} ${16 + pills[i].h}V${cy + 22}`} stroke={accent} strokeOpacity={.3} strokeDasharray="3 4" />
        <Pill text={v.links[i]} cx={x + w + gap / 2} y={16} maxW={Math.min(200, w + gap - 12)} />
      </>}
    </g>; })}
  </> };
}

function Argument({ v, c, id, W }: { v: Of<"argument">; c: boolean; id: string; W: number }): Built {
  if (c) return chain([{ node: v.claim, tone: "accent" }, { node: v.reason, link: "because" }, { node: v.example, link: "illustrated by" }, { node: v.limit, tone: "muted", link: "qualified by" }], W, id);
  const ch = cardH(v.claim, 440, c), rw = 330, rh = Math.max(cardH(v.reason, rw - 10, c), cardH(v.example, rw - 10, c)), ry = 24 + ch + 72, lh = cardH(v.limit, 520, c), ly = ry + rh + 72;
  return { height: ly + lh + 20, body: <>
    <Card node={v.claim} x={180} y={24} w={440} c={c} id={id} tone="accent" />
    <Edge d={`M260 ${24 + ch + 2}C260 ${ry - 30} 195 ${ry - 40} 195 ${ry - 6}`} id={id} />
    <Pill text="because" cx={205} y={24 + ch + 22} maxW={160} />
    <Card node={v.reason} x={24} y={ry} w={rw - 10} c={c} id={id} h={rh} />
    <Card node={v.example} x={456} y={ry} w={rw - 10} c={c} id={id} h={rh} />
    <Edge d={`M${24 + rw - 4} ${ry + rh / 2}H${450}`} id={id} />
    <Pill text="illustrated by" cx={400} y={ry + rh / 2 - pillLayout("illustrated by", 96).h / 2} maxW={96} />
    <Edge d={`M400 ${ry + rh + 4}V${ly - 6}`} id={id} dashed />
    <Pill text="qualified by" cx={400} y={ry + rh + 22} maxW={160} />
    <Card node={v.limit} x={140} y={ly} w={520} c={c} id={id} tone="muted" />
  </> };
}

function Sentence({ v, c, id, W }: { v: Of<"sentence">; c: boolean; id: string; W: number }): Built {
  const hot = (i: number) => i === v.from || i === v.to;
  if (c) {
    const w = W - 60, out: ReactNode[] = [], tops: number[] = [];
    let y = 16;
    v.parts.forEach((part, i) => { const h = cardH(part, w, c, undefined, true); tops.push(y + h / 2); out.push(<Card key={i} node={part} x={12} y={y} w={w} c id={id} flip tone={hot(i) ? "accent" : "neutral"} />); y += h + 14; });
    const pr = pillLayout(v.relationship, W - 24);
    return { height: y + 10 + pr.h + 16, body: <>
      {out}
      <Edge d={`M${12 + w + 6} ${tops[v.from]}H${W - 14}V${tops[v.to]}H${12 + w + 8}`} id={id} />
      <Pill text={v.relationship} cx={W / 2} y={y + 10} maxW={W - 24} />
    </> };
  }
  const n = v.parts.length, gap = 16, w = (W - 48 - gap * (n - 1)) / n, top = 96;
  const h = Math.max(...v.parts.map(p => cardH(p, w, c, undefined, true)));
  const cx = (i: number) => 24 + i * (w + gap) + w / 2, pr = pillLayout(v.relationship, 640);
  return { height: top + h + 26 + pr.h + 18, body: <>
    <Edge d={`M${cx(v.from)} ${top - 6}C${cx(v.from)} ${top - 80} ${cx(v.to)} ${top - 80} ${cx(v.to)} ${top - 8}`} id={id} />
    {v.parts.map((part, i) => <Card key={i} node={part} x={24 + i * (w + gap)} y={top} w={w} c={c} id={id} flip h={h} tone={hot(i) ? "accent" : "neutral"} />)}
    <Pill text={v.relationship} cx={400} y={top + h + 26} maxW={640} />
  </> };
}

function Evidence({ v, c, id, W }: { v: Of<"evidence">; c: boolean; id: string; W: number }): Built {
  const toneOf = (n: DiagramNode): Tone => /^not\b/i.test(n.label) ? "muted" : "neutral";
  if (c) {
    const sh = cardH(v.source, W - 24, c), out: ReactNode[] = [<Card key="s" node={v.source} x={12} y={16} w={W - 24} c id={id} tone="accent" />];
    let y = 16 + sh + 28; const ys: number[] = [];
    v.outcomes.forEach((o, i) => { const h = cardH(o, W - 60, c); ys.push(y + 28); out.push(<Card key={i} node={o} x={48} y={y} w={W - 60} c id={id} tone={toneOf(o)} />); y += h + 16; });
    return { height: y + 6, body: <>
      <path d={`M24 ${16 + sh}V${ys[2]}`} fill="none" stroke={accent} strokeOpacity={.4} strokeWidth={2} />
      {ys.map((yy, i) => <Edge key={i} d={`M24 ${yy}H42`} id={id} />)}
      {out}
    </> };
  }
  const sh = cardH(v.source, 520, c), w = 232, gap = 20, oy = 24 + sh + 70, h = Math.max(...v.outcomes.map(o => cardH(o, w, c)));
  const xs = [0, 1, 2].map(i => 24 + 10 + i * (w + gap)), mid = 24 + sh + 34;
  return { height: oy + h + 20, body: <>
    <Card node={v.source} x={140} y={24} w={520} c={c} id={id} tone="accent" />
    <path d={`M400 ${24 + sh}V${mid}M${xs[0] + w / 2} ${mid}H${xs[2] + w / 2}`} fill="none" stroke={accent} strokeOpacity={.45} strokeWidth={2} />
    {xs.map((x, i) => <Edge key={i} d={`M${x + w / 2} ${mid}V${oy - 6}`} id={id} />)}
    {v.outcomes.map((o, i) => <Card key={i} node={o} x={xs[i]} y={oy} w={w} c={c} id={id} h={h} tone={toneOf(o)} />)}
  </> };
}

function Chart({ v, c, id, W }: { v: Of<"chart">; c: boolean; id: string; W: number }): Built {
  const limit = v.unit.includes("%") ? 100 : Math.max(...v.bars.map(b => b.value)) || 1;
  const pct = v.unit.includes("%") ? "%" : "";
  const unit = fit(v.unit, W - 48, 14);
  const left = c ? 16 : 200, width = c ? W - 80 : 480, top = 26 + unit.length * 20, step = c ? 62 : 54;
  const rows = v.bars.map((bar, i) => {
    const y = top + i * step + (c ? 22 : 0), w = Math.max(6, bar.value / limit * width);
    return <g key={bar.label}>
      {c ? <text x={left} y={y - 8} fill={ink} fontSize={14} fontWeight={600}>{bar.label}</text>
        : <Lines lines={fit(bar.label, 170, 15)} x={left - 16} y={y + 19} size={15} anchor="end" gap={4} />}
      <rect x={left} y={y} width={width} height={28} rx={14} fill={accent} opacity={.08} />
      <rect x={left} y={y} width={w} height={28} rx={14} fill={`url(#${id}-bar)`} />
      <text x={left + w + 10} y={y + 20} fill={accent} fontSize={c ? 15 : 17} fontWeight={800} style={display}>{bar.value}{pct}</text>
    </g>;
  });
  const end = top + (v.bars.length - 1) * step + (c ? 22 : 0) + 28;
  const note: DiagramNode = { label: "What the numbers show", detail: v.annotation };
  const nh = cardH(note, W - 48, c);
  return { height: end + 36 + nh + 20, body: <>
    <Lines lines={unit} x={W / 2} y={22} size={14} fill={muted} anchor="middle" gap={6} />
    {rows}
    <text x={left} y={end + 20} fill={muted} fontSize={12} textAnchor="middle">0</text>
    <text x={left + width} y={end + 20} fill={muted} fontSize={12} textAnchor="middle">{limit}{pct}</text>
    <Card node={note} x={24} y={end + 36} w={W - 48} c={c} id={id} tone="accent" />
  </> };
}

function Cycle({ v, c, id, W }: { v: Of<"cycle">; c: boolean; id: string; W: number }): Built {
  if (c) {
    const r = chain(v.nodes.map((node, i) => ({ node, badge: i + 1 })), W, id, 70);
    return { height: r.height + 10, body: <>
      <Pill text={`↻ ${v.centre}`} cx={W / 2} y={16} maxW={W - 40} strong />
      {r.body}
    </> };
  }
  const w = 300, h = Math.max(...v.nodes.map(n => cardH(n, w, c, 1))), y1 = 24, y2 = y1 + h + 150, cy = (y1 + h + y2) / 2;
  const pos = [[40, y1], [460, y1], [460, y2], [40, y2]];
  return { height: y2 + h + 24, body: <>
    <Edge d={`M${40 + w + 8} ${y1 + h / 2}H${452}`} id={id} />
    <Edge d={`M${460 + w / 2} ${y1 + h + 6}V${y2 - 8}`} id={id} />
    <Edge d={`M${452} ${y2 + h / 2}H${40 + w + 8}`} id={id} />
    <Edge d={`M${40 + w / 2} ${y2 - 6}V${y1 + h + 8}`} id={id} />
    <circle cx={400} cy={cy} r={62} fill={`url(#${id}-orb)`} filter={`url(#${id}-shadow)`} />
    <Lines lines={fit(v.centre, 100, 16)} x={400} y={cy - (fit(v.centre, 100, 16).length - 1) * 11 + 5} size={16} fill="#fff" anchor="middle" bold gap={6} />
    {v.nodes.map((n, i) => <Card key={i} node={n} x={pos[i][0]} y={pos[i][1]} w={w} c={c} id={id} badge={i + 1} h={h} />)}
  </> };
}

function Decision({ v, c, id, W }: { v: Of<"decision">; c: boolean; id: string; W: number }): Built {
  const q1: DiagramNode = { label: "Ask", detail: v.question }, q2: DiagramNode = { label: "If not, ask", detail: v.nextQuestion };
  if (c) return chain([{ node: q1, tone: "accent" }, { node: v.results[0], link: "Yes" }, { node: q2, tone: "accent", link: "No — go back and ask" }, { node: v.results[1], link: "Yes" }, { node: v.results[2], tone: "muted", link: "No" }], W, id);
  const qh = cardH(q1, 440, c), r2y = 24 + qh + 74, rw = 330, h2 = Math.max(cardH(v.results[0], rw, c), cardH(q2, rw, c)), r3y = r2y + h2 + 74, w3 = 200, h3 = Math.max(cardH(v.results[1], w3, c), cardH(v.results[2], w3, c));
  return { height: r3y + h3 + 20, body: <>
    <Card node={q1} x={180} y={24} w={440} c={c} id={id} tone="accent" />
    <Edge d={`M280 ${24 + qh + 2}C280 ${r2y - 30} 205 ${r2y - 40} 205 ${r2y - 6}`} id={id} />
    <Pill text="Yes" cx={220} y={24 + qh + 20} maxW={60} strong />
    <Edge d={`M520 ${24 + qh + 2}C520 ${r2y - 30} 595 ${r2y - 40} 595 ${r2y - 6}`} id={id} />
    <Pill text="No" cx={580} y={24 + qh + 20} maxW={60} />
    <Card node={v.results[0]} x={40} y={r2y} w={rw} c={c} id={id} h={h2} />
    <Card node={q2} x={430} y={r2y} w={rw} c={c} id={id} tone="accent" h={h2} />
    <Edge d={`M540 ${r2y + h2 + 2}C540 ${r3y - 30} 490 ${r3y - 40} 490 ${r3y - 6}`} id={id} />
    <Pill text="Yes" cx={505} y={r2y + h2 + 20} maxW={60} strong />
    <Edge d={`M650 ${r2y + h2 + 2}C650 ${r3y - 30} 700 ${r3y - 40} 700 ${r3y - 6}`} id={id} />
    <Pill text="No" cx={690} y={r2y + h2 + 20} maxW={60} />
    <Card node={v.results[1]} x={390} y={r3y} w={w3} c={c} id={id} h={h3} />
    <Card node={v.results[2]} x={600} y={r3y} w={w3 - 20} c={c} id={id} h={h3} tone="muted" />
  </> };
}

function Orientation({ v, c, id, W }: { v: Of<"map">; c: boolean; id: string; W: number }): Built {
  const gx = c ? 40 : 220, gw = c ? 240 : 360, gy = 50, gh = 260, cx = gx + gw / 2;
  const compass = (t: string, x: number, y: number) => <g key={t}><circle cx={x} cy={y} r={15} fill={surface} stroke={accent} strokeOpacity={.4} /><text x={x} y={y + 5} textAnchor="middle" fill={accent} fontSize={14} fontWeight={800}>{t}</text></g>;
  const route = `${v.turn} → ${v.destination}`, p = pillLayout(route, W - 40), cap = pillLayout("Fixed compass; changing viewpoint", W - 40);
  return { height: gy + gh + 40 + p.h + 12 + cap.h + 20, body: <>
    <rect x={gx} y={gy} width={gw} height={gh} rx={18} fill={accent} opacity={.06} />
    <path d={`M${gx} ${gy + gh / 3}H${gx + gw}M${gx} ${gy + 2 * gh / 3}H${gx + gw}M${gx + gw / 3} ${gy}V${gy + gh}M${gx + 2 * gw / 3} ${gy}V${gy + gh}`} stroke={accent} strokeOpacity={.18} strokeDasharray="4 6" />
    {compass("N", cx, gy - 22)}{compass("S", cx, gy + gh + 22)}{compass("E", gx + gw + 24, gy + gh / 2)}{compass("W", gx - 24, gy + gh / 2)}
    <path d={`M${cx} ${gy + 70}V${gy + 160}Q${cx} ${gy + 200} ${cx + 40} ${gy + 200}H${gx + gw - 26}`} fill="none" stroke={accent} strokeWidth={5} strokeLinecap="round" markerEnd={`url(#${id}-arrow)`} />
    <circle cx={cx} cy={gy + 60} r={12} fill={accent} stroke="#fff" strokeWidth={3} />
    <Pill text={`Facing ${v.facing}`} cx={cx} y={gy + 14} maxW={gw - 20} />
    <Pill text={route} cx={W / 2} y={gy + gh + 40} maxW={W - 40} strong />
    <Pill text="Fixed compass; changing viewpoint" cx={W / 2} y={gy + gh + 40 + p.h + 12} maxW={W - 40} />
  </> };
}

function Sound({ v, c, id, W }: { v: Of<"sound">; c: boolean; id: string; W: number }): Built {
  let x = 20, row = 0;
  const size = c ? 18 : 22, chips = v.tokens.map((token, i) => {
    const focus = v.prominent.includes(i), w = token.length * size * .6 + 26;
    if (x + w > W - 20) { row++; x = 20; }
    const item = { x, y: 70 + row * 64, w, token, focus }; x += w + 8; return item;
  });
  const end = 70 + row * 64 + 44, note: DiagramNode = { label: "Meaning", detail: v.meaning }, nh = cardH(note, W - 40, c);
  const foot = pillLayout("Focus marks are illustrative, not a measured audio trace.", W - 40);
  return { height: end + 24 + nh + 16 + foot.h + 16, body: <>
    <Pill text="Prominence marks the contrast" cx={W / 2} y={14} maxW={W - 40} />
    {chips.map((p, i) => <g key={i}>
      <rect x={p.x} y={p.y} width={p.w} height={44} rx={14} fill={p.focus ? `url(#${id}-bar)` : surface} stroke={p.focus ? "none" : border} strokeOpacity={.6} />
      {p.focus && <circle cx={p.x + p.w / 2} cy={p.y - 10} r={5} fill={accent} />}
      <text x={p.x + p.w / 2} y={p.y + 29} textAnchor="middle" fill={p.focus ? "#fff" : ink} fontSize={size} fontWeight={p.focus ? 800 : 500} style={p.focus ? display : undefined}>{p.token}</text>
    </g>)}
    <Card node={note} x={20} y={end + 24} w={W - 40} c={c} id={id} tone="accent" />
    <Pill text="Focus marks are illustrative, not a measured audio trace." cx={W / 2} y={end + 24 + nh + 16} maxW={W - 40} />
  </> };
}

function Causal({ v, c, id, W }: { v: Of<"causal">; c: boolean; id: string; W: number }): Built {
  const note = "A possible alternative path, not an established finding.";
  if (c) {
    const r = chain([{ node: v.factor, tone: "accent" }, { node: v.first, link: "may affect" }, { node: v.second, link: "may affect" }], W, id);
    const p = pillLayout("association ≠ proof of cause", W - 24), n = pillLayout(note, W - 24);
    return { height: r.height + p.h + 12 + n.h + 16, body: <>{r.body}<Pill text="association ≠ proof of cause" cx={W / 2} y={r.height} maxW={W - 24} strong /><Pill text={note} cx={W / 2} y={r.height + p.h + 12} maxW={W - 24} /></> };
  }
  const fh = cardH(v.factor, 440, c), w = 300, oy = 24 + fh + 84, h = Math.max(cardH(v.first, w, c), cardH(v.second, w, c));
  const p = pillLayout("association ≠ proof of cause", 220);
  return { height: oy + h + 30 + 40, body: <>
    <Card node={v.factor} x={180} y={24} w={440} c={c} id={id} tone="accent" />
    <Edge d={`M300 ${24 + fh + 2}C300 ${oy - 34} 190 ${oy - 44} 190 ${oy - 6}`} id={id} />
    <Edge d={`M500 ${24 + fh + 2}C500 ${oy - 34} 610 ${oy - 44} 610 ${oy - 6}`} id={id} />
    <Pill text="may affect" cx={215} y={24 + fh + 24} maxW={120} />
    <Pill text="may affect" cx={585} y={24 + fh + 24} maxW={120} />
    <Card node={v.first} x={40} y={oy} w={w} c={c} id={id} h={h} />
    <Card node={v.second} x={460} y={oy} w={w} c={c} id={id} h={h} />
    <path d={`M${348} ${oy + h / 2}H${452}`} stroke={accent} strokeWidth={2} strokeDasharray="5 5" />
    <Pill text="association ≠ proof of cause" cx={400} y={oy + h / 2 - p.h - 8} maxW={110} strong />
    <Pill text={note} cx={400} y={oy + h + 26} maxW={520} />
  </> };
}

export function describe(v:ConceptVisual):string{
  const node=(n:DiagramNode)=>`${n.label}: ${n.detail}.`;
  switch(v.layout){
    case "contrast":return `${node(v.left)} ${v.relationship}. ${node(v.right)}`;
    case "flow":return v.nodes.map((n,i)=>`${node(n)} ${v.links[i]??""}`).join(" ");
    case "argument":return [v.claim,v.reason,v.example,v.limit].map(node).join(" ");
    case "sentence":return `${v.parts.map(node).join(" ")} ${v.relationship}.`;
    case "evidence":return `${node(v.source)} ${v.outcomes.map(node).join(" ")}`;
    case "chart":return `${v.unit}. ${v.bars.map(b=>`${b.label}: ${b.value}`).join("; ")}. ${v.annotation}`;
    case "cycle":return `${v.centre}: ${v.nodes.map(node).join(" ")} Fresh evidence updates the cycle.`;
    case "decision":return `${v.question} Yes: ${node(v.results[0])} No: ${v.nextQuestion} Yes: ${node(v.results[1])} No: ${node(v.results[2])}`;
    case "map":return `North stays at the top. A traveller facing ${v.facing} turns ${v.turn} towards ${v.destination}.`;
    case "sound":return `${v.tokens.join(" ")} Prominent: ${v.prominent.map(i=>v.tokens[i]).join(", ")}. ${v.meaning}`;
    case "causal":return `${node(v.factor)} This may affect both ${node(v.first)} and ${node(v.second)} The association alone does not establish cause; the alternative path is hypothetical: a possible alternative path, not an established finding.`;
  }
}
export function ConceptTeachingGraphic({ visual: v, compact: c }: { visual: ConceptVisual; compact: boolean }) {
  const W = c ? 320 : 800, id = `concept-${v.layout}-${c ? "narrow" : "wide"}`;
  const props = { c, id, W } as const;
  const built: Built = v.layout === "contrast" ? Contrast({ v, ...props }) : v.layout === "flow" ? Flow({ v, ...props }) : v.layout === "argument" ? Argument({ v, ...props }) : v.layout === "sentence" ? Sentence({ v, ...props }) : v.layout === "evidence" ? Evidence({ v, ...props }) : v.layout === "chart" ? Chart({ v, ...props }) : v.layout === "cycle" ? Cycle({ v, ...props }) : v.layout === "decision" ? Decision({ v, ...props }) : v.layout === "map" ? Orientation({ v, ...props }) : v.layout === "sound" ? Sound({ v, ...props }) : Causal({ v, ...props });
  const H = Math.ceil(built.height);
  return <svg className={c ? "md:hidden w-full max-w-sm mx-auto camp-concept-svg" : "hidden md:block w-full max-w-4xl mx-auto camp-concept-svg"} viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby={`${id}-title ${id}-desc`} style={{ fontFamily: "var(--font-body), sans-serif", overflow: "visible" }}>
    <title id={`${id}-title`}>{v.layout === "chart" ? "Numerical comparison" : v.layout === "sentence" ? "Sentence relationships" : `${v.layout[0].toUpperCase()}${v.layout.slice(1)} illustration`}</title>
    <desc id={`${id}-desc`}>{describe(v)}</desc>
    <defs>
      <marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill={accent} /></marker>
      <filter id={`${id}-shadow`} x="-10%" y="-10%" width="120%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#4c1d95" floodOpacity=".10" /></filter>
      <linearGradient id={`${id}-tint`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={accent} stopOpacity=".10" /><stop offset="1" stopColor={accent} stopOpacity=".03" /></linearGradient>
      <linearGradient id={`${id}-bar`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#a855f7" /><stop offset="1" stopColor={accent} /></linearGradient>
      <radialGradient id={`${id}-orb`} cx=".35" cy=".3" r=".8"><stop offset="0" stopColor="#c084fc" /><stop offset="1" stopColor={accent} /></radialGradient>
      <pattern id={`${id}-dots`} width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill={accent} opacity=".13" /></pattern>
    </defs>
    <rect x="0" y="0" width={W} height={H} rx="20" fill={`url(#${id}-dots)`} />
    {built.body}
  </svg>;
}

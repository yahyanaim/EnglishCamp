/**
 * Keeps card and button grids symmetric: when the last row is not full, its items share
 * the whole row instead of leaving a gap on the right. Works with media queries, container
 * queries and auto-fit grids because it reads the column count the browser actually used.
 */
const MARK = "data-grid-balanced";
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);

function reset(grid: HTMLElement) {
  grid.style.gridTemplateColumns = "";
  for (const child of Array.from(grid.children) as HTMLElement[]) child.style.gridColumn = "";
  grid.removeAttribute(MARK);
}

function plan(grid: HTMLElement) {
  if (grid.closest("[data-grid-free],[role=grid],table,svg")) return null;
  const style = getComputedStyle(grid);
  if (!style.display.endsWith("grid") || style.gridTemplateAreas !== "none" || !style.gridAutoFlow.startsWith("row") || grid.style.gridTemplateColumns) return null;
  const tracks = style.gridTemplateColumns.split(" ").filter(Boolean).map(parseFloat);
  const columns = tracks.length;
  if (columns < 2 || columns > 6 || tracks.some(t => !Number.isFinite(t) || Math.abs(t - tracks[0]) > 1)) return null;
  const items: HTMLElement[] = [];
  for (const child of Array.from(grid.children) as HTMLElement[]) {
    const own = getComputedStyle(child);
    if (own.display === "none") continue;
    if (own.position === "absolute" || own.position === "fixed") return null;
    if (child.style.gridColumn || own.gridColumnStart !== "auto" || own.gridColumnEnd !== "auto") return null;
    items.push(child);
  }
  const rest = items.length % columns;
  if (items.length <= columns || rest === 0) return null;
  const span = columns * rest / gcd(columns, rest);
  return { grid, items, columns, rest, span };
}

const CHIP = "data-chip-row";
/**
 * Marks wrapping rows of word chips (filters, topic tabs) so CSS can let them fill their rows.
 * Letter keyboards, sentence word tiles (a tile ends with punctuation) and short action rows are left alone.
 */
function markChipRows(root: ParentNode) {
  for (const row of Array.from(root.querySelectorAll<HTMLElement>(".flex-wrap"))) {
    const buttons = Array.from(row.children) as HTMLElement[];
    const labels = buttons.map(b => (b.textContent ?? "").trim());
    const chips = buttons.length >= 4 && buttons.every(b => b.tagName === "BUTTON") && labels.every(t => t.length >= 2) && labels.reduce((n, t) => n + t.length, 0) / labels.length >= 3
      && !labels.some(t => /[.?!,]$/.test(t)) && !row.closest("[data-grid-free]") && !buttons.some(b => b.draggable || b.closest("[data-practice-tiles]"));
    if (chips) row.setAttribute(CHIP, ""); else row.removeAttribute(CHIP);
  }
}

export function balanceGrids(root: ParentNode) {
  markChipRows(root);
  const grids = Array.from(root.querySelectorAll<HTMLElement>("*")).filter(el => el.hasAttribute(MARK) || el.children.length > 2);
  grids.filter(el => el.hasAttribute(MARK)).forEach(reset);
  const plans = grids.map(plan).filter((p): p is NonNullable<ReturnType<typeof plan>> => !!p);
  for (const { grid, items, columns, rest, span } of plans) {
    grid.setAttribute(MARK, "");
    grid.style.gridTemplateColumns = `repeat(${span},minmax(0,1fr))`;
    items.forEach((item, index) => { item.style.gridColumn = `span ${index >= items.length - rest ? span / rest : span / columns}`; });
  }
}

export function watchGridBalance(root: HTMLElement) {
  let timer: ReturnType<typeof setTimeout> | undefined, width = -1;
  const schedule = () => { clearTimeout(timer); timer = setTimeout(() => requestAnimationFrame(() => balanceGrids(root)), 120); };
  const resize = new ResizeObserver(entries => { const next = Math.round(entries[0]?.contentRect.width ?? 0); if (next !== width) { width = next; schedule(); } });
  const mutation = new MutationObserver(records => { if (records.some(r => r.type === "childList")) schedule(); });
  resize.observe(root);
  mutation.observe(root, { childList: true, subtree: true });
  schedule();
  return () => { clearTimeout(timer); resize.disconnect(); mutation.disconnect(); };
}

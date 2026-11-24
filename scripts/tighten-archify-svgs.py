"""Trims the empty canvas around Archify workflow SVGs so they display larger in lessons.
Measures content in a headless browser, then edits only the root viewBox/size, the baked
background rect and lane frame widths. Usage: python3 scripts/tighten-archify-svgs.py"""
import json, re, pathlib
from playwright.sync_api import sync_playwright
root = pathlib.Path(__file__).resolve().parent.parent
out = root / "public/media/diagrams"
manifest_path = root / "src/data/teaching-diagrams/archify-manifest.json"
manifest = json.loads(manifest_path.read_text())
MEASURE = """() => {
  const svg = document.querySelector('svg');
  const lanes = [...svg.querySelectorAll('rect[data-composition-frame-kind="lane"]')];
  const skip = new Set([...lanes, ...svg.querySelectorAll('rect.archify-bake-background, rect[fill="url(#grid)"]')]);
  let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
  for (const el of svg.querySelectorAll('rect, path, text, circle, line, polyline, polygon')) {
    if (skip.has(el) || el.closest('defs, marker, pattern, symbol, clipPath, mask')) continue;
    const b = el.getBBox(); if (!b.width && !b.height) continue;
    const m = el.getCTM(); const r = svg.getCTM().inverse().multiply(m);
    const pts = [[b.x, b.y], [b.x + b.width, b.y + b.height]].map(([x, y]) => new DOMPoint(x, y).matrixTransform(r));
    x0 = Math.min(x0, ...pts.map(p => p.x)); y0 = Math.min(y0, ...pts.map(p => p.y));
    x1 = Math.max(x1, ...pts.map(p => p.x)); y1 = Math.max(y1, ...pts.map(p => p.y));
  }
  const L = lanes.map(l => ({ x: +l.getAttribute('x'), y: +l.getAttribute('y'), w: +l.getAttribute('width'), h: +l.getAttribute('height') }));
  return { x0, y0, x1, y1, lanes: L };
}"""
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page()
    for id_, asset in manifest.items():
        dims = None
        for theme in ("light", "dark"):
            f = out / f"{id_}-{theme}.svg"; s = f.read_text()
            if dims is None:
                pg.set_content("<html><body>" + s[s.index("<svg"):] + "</body></html>")
                m = pg.evaluate(MEASURE)
                lx = min([l["x"] for l in m["lanes"]] + [m["x0"]])
                ly = min([l["y"] for l in m["lanes"]] + [m["y0"]])
                right = m["x1"] + 18
                bottom = max([l["y"] + l["h"] for l in m["lanes"]] + [m["y1"]])
                vx, vy = max(0, lx - 14), max(0, ly - 14)
                vw, vh = round(right + 14 - vx), round(bottom + 14 - vy)
                dims = (vx, vy, vw, vh, right)
            vx, vy, vw, vh, right = dims
            s = re.sub(r'(<svg[^>]*?)viewBox="[^"]*"', lambda mm: f'{mm.group(1)}viewBox="{vx:g} {vy:g} {vw} {vh}"', s, count=1)
            s = re.sub(r'(<svg[^>]*?)\swidth="[^"]*"', lambda mm: f'{mm.group(1)} width="{vw}"', s, count=1)
            s = re.sub(r'(<svg[^>]*?)\sheight="[^"]*"', lambda mm: f'{mm.group(1)} height="{vh}"', s, count=1)
            s = re.sub(r'<rect class="archify-bake-background" x="0" y="0" width="[^"]*" height="[^"]*"', f'<rect class="archify-bake-background" x="{vx:g}" y="{vy:g}" width="{vw}" height="{vh}"', s, count=1)
            s = re.sub(r'(<rect data-graph-role="structural-frame" data-composition-frame-kind="lane"[^>]*?x=")([\d.]+)("[^>]*?width=")([\d.]+)"', lambda mm: f'{mm.group(1)}{mm.group(2)}{mm.group(3)}{round(right - float(mm.group(2)))}"', s)
            f.write_text(s)
        asset["width"], asset["height"] = vw, vh
    b.close()
manifest_path.write_text(json.dumps(manifest, indent=2) + "\n")
print("tightened", len(manifest))

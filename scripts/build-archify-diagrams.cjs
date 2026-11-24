/* Builds the lesson concept diagrams with Archify (https://github.com/tt-a1i/archify), the
   same JSON → SVG diagram compiler used for the Nexora documentation.
   Usage: ARCHIFY=/path/to/archify/archify node scripts/build-archify-diagrams.cjs
   Writes candidate specs to src/data/teaching-diagrams/archify/*.json and static light/dark
   SVGs to public/media/diagrams/. Chart, map and sound layouts keep the in-app renderer. */
require("../tests/register.cjs");
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");
const { teachingDiagrams } = require("../src/data/teaching-diagrams/index.ts");
const root = path.join(__dirname, ".."), specDir = path.join(root, "src/data/teaching-diagrams/archify"), outDir = path.join(root, "public/media/diagrams");
const bin = path.join(process.env.ARCHIFY || "/tmp/archify/archify", "bin/archify.mjs");
fs.mkdirSync(specDir, { recursive: true }); fs.mkdirSync(outDir, { recursive: true });

const SUPPORTED = new Set(["flow", "contrast", "argument", "sentence", "evidence", "cycle", "decision", "causal"]);
const fitWidth = (...texts) => Math.min(340, Math.max(150, Math.ceil(Math.max(...texts.map((t, i) => (t || "").length * (i ? 5.3 : 7.4))) + 40)));
const node = (id, lane, col, n, type, icon, extra = {}) => ({ id, lane, col, type, label: n.label, sublabel: n.detail, icon, width: fitWidth(n.label, n.detail), ...extra });

function spec(id, d) {
  const v = d.visual;
  const meta = { title: d.title, locale: "en", quality_profile: "standard", visual_preset: "classic", animation: "none", feedback_links: false, legend: { mode: "hidden" }, output: `${id}.html` };
  let lanes, nodes, edges, mainPath;
  switch (v.layout) {
    case "flow":
      lanes = [{ id: "steps", label: "Step by step" }];
      nodes = v.nodes.map((n, i) => node(`n${i}`, "steps", i, n, i === 0 ? "frontend" : i === v.nodes.length - 1 ? "database" : "backend", i === 0 ? "start" : i === v.nodes.length - 1 ? "success" : "active"));
      edges = v.links.map((l, i) => ({ id: `e${i}`, from: `n${i}`, to: `n${i + 1}`, label: l, variant: i === v.links.length - 1 ? "emphasis" : "default" }));
      mainPath = nodes.map(n => n.id); break;
    case "contrast":
      lanes = [{ id: "compare", label: "Compare" }];
      nodes = [node("left", "compare", 0, v.left, "frontend", "neutral"), node("right", "compare", 3, v.right, "backend", "neutral")];
      edges = [{ id: "rel", from: "left", to: "right", label: `${v.symbol ?? "↔"} ${v.relationship}`, variant: "emphasis" }];
      break;
    case "argument":
      lanes = [{ id: "position", label: "Position" }, { id: "support", label: "Support" }, { id: "limit", label: "Limit" }];
      nodes = [node("claim", "position", 0, v.claim, "frontend", "flag"), node("reason", "support", 1, v.reason, "backend", "decision"), node("example", "support", 2, v.example, "database", "success"), node("limit", "limit", 1, v.limit, "security", "waiting")];
      edges = [{ id: "because", from: "claim", to: "reason", label: "because", variant: "emphasis" }, { id: "illustrated", from: "reason", to: "example", label: "illustrated by" }, { id: "qualified", from: "claim", to: "limit", label: "qualified by", variant: "dashed", role: "branch" }];
      mainPath = ["claim", "reason", "example"]; break;
    case "sentence": {
      lanes = [{ id: "text", label: "Sentence parts" }];
      nodes = v.parts.map((p, i) => ({ id: `p${i}`, lane: "text", col: i, type: i === v.from || i === v.to ? "backend" : "external", label: p.detail, sublabel: p.label, icon: "none", width: fitWidth(p.detail, p.label) }));
      edges = [];
      for (let i = 0; i < v.parts.length - 1; i++) {
        const linked = (i === v.from && i + 1 === v.to) || (i === v.to && i + 1 === v.from);
        edges.push(linked ? { id: `rel`, from: `p${v.from}`, to: `p${v.to}`, label: v.relationship, variant: "emphasis" } : { id: `s${i}`, from: `p${i}`, to: `p${i + 1}`, variant: "dashed" });
      }
      if (!edges.some(e => e.id === "rel")) edges.push({ id: "rel", from: `p${v.from}`, to: `p${v.to}`, label: v.relationship, variant: "emphasis", route: "bottom-channel", fromSide: "bottom", toSide: "bottom" });
      break;
    }
    case "evidence":
      lanes = [{ id: "src", label: "Source text" }, { id: "ans", label: "What it can answer" }];
      nodes = [node("source", "src", 1, v.source, "frontend", "flag"), ...v.outcomes.map((o, i) => node(`out${i}`, "ans", i * 2, o, /^not\b/i.test(o.label) ? "security" : "database", /^not\b/i.test(o.label) ? "failure" : "success"))];
      edges = v.outcomes.map((o, i) => ({ id: `q${i}`, from: "source", to: `out${i}`, variant: /^not\b/i.test(o.label) ? "dashed" : "default" }));
      break;
    case "cycle":
      lanes = [{ id: "top", label: v.centre }, { id: "bottom", label: "Repeat" }];
      nodes = [node("c0", "top", 0, v.nodes[0], "frontend", "start"), node("c1", "top", 2, v.nodes[1], "backend", "active"), node("c2", "bottom", 2, v.nodes[2], "backend", "active"), node("c3", "bottom", 0, v.nodes[3], "database", "success")];
      edges = [{ id: "a", from: "c0", to: "c1" }, { id: "b", from: "c1", to: "c2" }, { id: "c", from: "c2", to: "c3" }, { id: "d", from: "c3", to: "c0", variant: "dashed", role: "return", label: "fresh evidence" }];
      break;
    case "decision":
      lanes = [{ id: "ask", label: "Questions" }, { id: "result", label: "Results" }];
      nodes = [{ id: "q1", lane: "ask", col: 0, type: "frontend", label: v.question, icon: "decision", width: fitWidth(v.question) }, { id: "q2", lane: "ask", col: 2, type: "frontend", label: v.nextQuestion, icon: "decision", width: fitWidth(v.nextQuestion) },
        node("r0", "result", 0, v.results[0], "security", "stop"), node("r1", "result", 2, v.results[1], "database", "success"), node("r2", "result", 4, v.results[2], "security", "failure")];
      edges = [{ id: "y1", from: "q1", to: "r0", label: "Yes", variant: "security" }, { id: "n1", from: "q1", to: "q2", label: "No", variant: "emphasis" }, { id: "y2", from: "q2", to: "r1", label: "Yes", variant: "emphasis" }, { id: "n2", from: "q2", to: "r2", label: "No", variant: "security" }];
      break;
    case "causal":
      lanes = [{ id: "a", label: "Possible path" }, { id: "b", label: "Observed" }];
      nodes = [node("factor", "a", 0, v.factor, "external", "decision"), node("first", "a", 2, v.first, "backend", "neutral"), node("second", "b", 2, v.second, "database", "neutral")];
      edges = [{ id: "m1", from: "factor", to: "first", label: "may affect", variant: "dashed" }, { id: "m2", from: "factor", to: "second", label: "may affect", variant: "dashed" }, { id: "assoc", from: "first", to: "second", label: "association ≠ proof of cause", variant: "security" }];
      break;
  }
  return { schema_version: 2, diagram_type: "workflow", meta, lanes, ...(mainPath ? { mainPath } : {}), nodes, edges };
}

const manifest = {}, failures = [];
for (const [id, d] of Object.entries(teachingDiagrams)) {
  if (d.kind !== "concept" || !d.visual || !SUPPORTED.has(d.visual.layout)) continue;
  const file = path.join(specDir, `${id}.json`);
  fs.writeFileSync(file, JSON.stringify(spec(id, d), null, 2) + "\n");
  try {
    const res = JSON.parse(execFileSync("node", [bin, "export-svg", "workflow", file, path.join(outDir, id), "--theme", "both", "--json"], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }));
    if (!res.ok) throw new Error(JSON.stringify(res).slice(0, 400));
    const light = res.outputs.find(o => o.theme === "light"), dark = res.outputs.find(o => o.theme === "dark");
    const vb = fs.readFileSync(light.path, "utf8").match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
    manifest[id] = { title: d.title, light: "/media/diagrams/" + path.basename(light.path), dark: "/media/diagrams/" + path.basename(dark.path), width: Math.round(+vb[1]), height: Math.round(+vb[2]) };
  } catch (e) { failures.push([id, d.visual.layout, String(e.stdout || e.message).slice(0, 600)]); }
}
fs.writeFileSync(path.join(root, "src/data/teaching-diagrams/archify-manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log("built", Object.keys(manifest).length, "failed", failures.length);
for (const f of failures.slice(0, 8)) console.log(f.join(" | "));

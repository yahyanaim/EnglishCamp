const consistency=require('./fixtures/consistency-content-contract.json');
const notesBrand=require('./fixtures/notes-brand-contract.json');
const violet=require('./fixtures/violet-session-contract.json');
const fullsize=require('./fixtures/fullsize-ui-contract.json');
require("./register.cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs"),
  path = require("node:path"),
  crypto = require("node:crypto");
const { MOCK_PAPERS } = require("../src/data/mock-exams/index.ts");
const {
  freshAttempt,
  advanceAttempt,
  availableSections,
  questionMarks,
  resultFor,
  restoreExam,
  attemptStorageKey,
  recordingKey,
  routeModule,
} = require("../src/lib/mockExam.ts");
const papers = Object.values(MOCK_PAPERS),
  allSections = papers.flatMap((p) => [...p.reading, ...p.listening]);
const uniqueSections = Array.from(
  new Map(allSections.map((s) => [s.id, s])).values(),
);
const allQuestions = uniqueSections
  .flatMap((s) => s.questions)
  .concat(papers.flatMap((p) => p.sentenceBuilding || []));
const words = (s) => (s.trim().match(/\S+/g) || []).length;
const root = path.join(__dirname, "..");
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const hash = (s) => crypto.createHash("sha256").update(s).digest("hex");

test("four versioned tracks have complete IELTS/B2 papers and both TOEFL follow-up banks", () => {
  assert.deepEqual(
    papers.map((p) => p.id),
    ["ielts-academic", "ielts-general", "toefl-ibt", "b2-first"],
  );
  for (const p of papers) {
    assert.equal(p.version, "2026.2");
    assert.equal(p.form, "01");
    assert.equal(p.order.length, 4);
    assert.equal(new Set(p.order).size, 4);
    assert.match(p.provenance.status, /independent teacher review.*pending/i);
  }
  for (const id of ["ielts-academic", "ielts-general"]) {
    const p = MOCK_PAPERS[id];
    assert.deepEqual(
      p.listening.map((s) => s.questions.length),
      [10, 10, 10, 10],
    );
    assert.equal(
      p.reading.reduce((n, s) => n + s.questions.length, 0),
      40,
    );
    assert.equal(p.reading.length, 3);
    const length = p.reading.reduce((n, s) => n + words(s.passage), 0);
    assert.ok(
      length >= 2150 && length <= (id === "ielts-general" ? 2375 : 2750),
      `${id}: ${length}`,
    );
    assert.deepEqual(
      p.writing.map((w) => w.minimumWords),
      [150, 250],
    );
    assert.equal(p.speaking.length, 3);
    assert.equal(p.speaking[1].preparationSeconds, 60);
    assert.equal(p.seconds.reading, 3600);
    assert.equal(p.seconds.writing, 3600);
  }
  assert.strictEqual(
    MOCK_PAPERS["ielts-academic"].listening,
    MOCK_PAPERS["ielts-general"].listening,
  );
  assert.match(
    MOCK_PAPERS["ielts-general"].notices.join(" "),
    /share the same listening/,
  );
  const b = MOCK_PAPERS["b2-first"];
  assert.deepEqual(
    b.reading.map((s) => s.questions.length),
    [8, 8, 8, 6, 6, 6, 10],
  );
  assert.deepEqual(
    [1, 2, 3, 4].map((part) =>
      b.listening
        .filter((s) => s.part === part)
        .reduce((n, s) => n + s.questions.length, 0),
    ),
    [8, 10, 5, 7],
  );
  assert.ok(b.listening.every((s) => s.plays === 2));
  assert.equal(b.writing.filter((w) => w.choiceGroup).length, 3);
  assert.ok(
    b.writing.every((w) => w.minimumWords === 140 && w.maximumWords === 190),
  );
  const r = resultFor(b, freshAttempt(b));
  assert.equal(r.reading.possible, 42);
  assert.equal(r.useOfEnglish.possible, 28);
  assert.equal(r.listening.possible, 30);
  const t = MOCK_PAPERS["toefl-ibt"];
  assert.deepEqual(t.order, ["reading", "listening", "writing", "speaking"]);
  for (const skill of ["reading", "listening"]) {
    const counts = ["router", "lower", "upper"].map((stage) =>
      t[skill]
        .filter((s) => s.stage === stage)
        .reduce((n, s) => n + s.questions.length, 0),
    );
    assert.deepEqual(counts, skill === "reading" ? [25, 25, 25] : [23, 24, 24]);
  }
  assert.equal(t.sentenceBuilding.length, 10);
  assert.equal(t.writing[0].seconds, 420);
  assert.equal(t.writing[1].seconds, 600);
  assert.equal(t.speaking.filter((s) => s.kind === "repeat").length, 7);
  assert.equal(t.speaking.filter((s) => s.kind === "interview").length, 4);
  assert.ok(
    t.speaking.every(
      (s) =>
        s.preparationSeconds === 0 &&
        s.prompts.length === 0 &&
        s.stimulus.length,
    ),
  );
});

test("all original answers earn their stated marks, wrong/empty answers earn zero, and all evidence is present", () => {
  assert.equal(
    new Set(allQuestions.map((q) => q.id)).size,
    allQuestions.length,
  );
  for (const q of allQuestions) {
    assert.ok(q.evidence.length > 15, q.id);
    assert.ok(q.explanation.length > 15, q.id);
    assert.ok(q.answers.length, q.id);
    for (const answer of q.answers) {
      assert.equal(questionMarks(q, answer), q.marks, q.id + ": " + answer);
      assert.equal(
        questionMarks(q, "  " + answer.toUpperCase() + "  "),
        q.marks,
        q.id,
      );
      if (q.options) assert.ok(q.options.includes(answer), q.id);
    }
    assert.equal(questionMarks(q, ""), 0, q.id);
    assert.equal(questionMarks(q, "Not an accepted answer 12345"), 0, q.id);
    if (q.options)
      assert.equal(new Set(q.options).size, q.options.length, q.id);
  }
  const b = MOCK_PAPERS["b2-first"];
  const transform = b.reading[3].questions[0];
  assert.equal(questionMarks(transform, "haven't seen"), 2);
  assert.equal(questionMarks(transform, "not seen"), 1);
  assert.equal(questionMarks(transform, "seen"), 0);
  assert.equal(
    questionMarks(transform, "I really have not seen him for a while"),
    0,
  );
  const one = MOCK_PAPERS["ielts-academic"].listening[0].questions[0];
  assert.equal(questionMarks(one, "Nadia Mercer"), 0);
  const date = MOCK_PAPERS["ielts-academic"].listening[0].questions[2];
  assert.equal(questionMarks(date, "12"), 1);
  assert.equal(questionMarks(date, "12th"), 1);
  const sentence = MOCK_PAPERS["toefl-ibt"].sentenceBuilding[0];
  assert.equal(questionMarks(sentence, "Where is the equipment desk?"), 1);
});

test("productive examples meet the stated word ranges and contain specific task analysis", () => {
  for (const p of papers)
    for (const w of p.writing) {
      const n = words(w.model);
      assert.ok(n >= w.minimumWords, `${w.id}: ${n}`);
      if (w.maximumWords) assert.ok(n <= w.maximumWords, `${w.id}: ${n}`);
      assert.ok(w.analysis.length > 60);
      assert.equal(w.rubric.length, 4);
    }
  for (const p of papers)
    for (const task of p.speaking) {
      assert.ok(task.model.length > 20);
      assert.ok(task.analysis.length > 50);
      assert.ok(task.responseSeconds > 0);
    }
  for (const task of MOCK_PAPERS["toefl-ibt"].speaking.filter(
    (s) => s.kind === "repeat",
  )) {
    assert.match(task.rubric.join(" "), /do not paraphrase/i);
    assert.ok(!/paraphrase when needed/i.test(task.rubric.join(" ")));
  }
  for (const task of MOCK_PAPERS["b2-first"].speaking)
    assert.match(task.rubric.join(" "), /solo audio cannot establish/i);
});

test("routing selects one distinct branch, locks the router and preserves its answers for review", () => {
  const p = MOCK_PAPERS["toefl-ibt"];
  let a = freshAttempt(p, 1000, "test");
  const router = p.reading
    .filter((s) => s.stage === "router")
    .flatMap((s) => s.questions);
  assert.equal(routeModule(p.reading, {}), "lower");
  a.answers = Object.fromEntries(
    router.slice(0, 18).map((q) => [q.id, q.answers[0]]),
  );
  assert.equal(routeModule(p.reading, a.answers), "upper");
  a = advanceAttempt(p, a, 2000);
  assert.equal(a.branches.reading, "upper");
  assert.equal(a.deadline, 902000);
  assert.ok(
    availableSections(p, a, "reading").every((s) => s.stage === "upper"),
  );
  assert.equal(
    availableSections(p, a, "reading", true).flatMap((s) => s.questions).length,
    50,
  );
  a = advanceAttempt(p, a, 3000);
  assert.equal(p.order[a.skillIndex], "listening");
  assert.deepEqual(
    a.answers,
    Object.fromEntries(router.slice(0, 18).map((q) => [q.id, q.answers[0]])),
  );
  assert.ok(
    availableSections(p, a, "listening").every((s) => s.stage === "router"),
  );
  a = advanceAttempt(p, a, 4000);
  assert.equal(a.branches.listening, "lower");
  assert.equal(
    availableSections(p, a, "listening", true).flatMap((s) => s.questions)
      .length,
    47,
  );
});

test("empty submission never invents writing, speaking, an overall band or concordance", () => {
  for (const p of papers) {
    const a = freshAttempt(p),
      r = resultFor(p, a);
    assert.equal(r.reading.earned, 0);
    assert.equal(r.listening.earned, 0);
    assert.equal(r.writingScore, null);
    assert.equal(r.speakingScore, null);
    assert.equal(r.overallScore, null);
    assert.equal(r.speakingRecorded, 0);
    assert.ok(r.writing.every((w) => w.words === 0 && !w.assessed));
    assert.equal(r.concordance, undefined);
  }
  const p = MOCK_PAPERS["b2-first"],
    a = freshAttempt(p);
  a.writing[p.writing[2].id] = "unselected draft";
  assert.ok(!resultFor(p, a).writing.some((w) => w.id === p.writing[2].id));
});

test("section/module deadlines cannot be reset by restoration or long interruptions", () => {
  const p = MOCK_PAPERS["toefl-ibt"];
  let a = freshAttempt(p, 1000, "deadlines");
  let b = restoreExam(p, JSON.stringify(a));
  assert.equal(a.deadline, b.deadline);
  // The runner passes the expired deadline, rather than granting a new budget at resume time.
  while (!a.finishedAt) a = advanceAttempt(p, a, a.deadline);
  assert.equal(a.finishedAt, 1000 + (30 + 29 + 23 + 8) * 60000);
  const b2 = MOCK_PAPERS["b2-first"];
  let c = freshAttempt(b2, 0, "b2");
  for (let i = 0; i < 4; i++) c = advanceAttempt(b2, c, c.deadline);
  assert.equal(c.finishedAt, (75 + 80 + 40 + 14) * 60000);
  assert.strictEqual(advanceAttempt(b2, c), c);
});

test("restoration rejects obsolete content and filters unknown response/recording IDs", () => {
  const p = MOCK_PAPERS["ielts-academic"],
    a = freshAttempt(p, 1000, "restore");
  a.answers[p.reading[0].questions[0].id] = "test";
  a.answers["old-question"] = "obsolete";
  a.recordings = ["is2-p1", "unknown", "is2-p1"];
  a.sectionIndex = 999;
  a.playback["il2-p1"] = { completed: 0, offset: 12 };
  const b = restoreExam(p, JSON.stringify(a));
  assert.ok(b);
  assert.equal(b.answers["old-question"], undefined);
  assert.deepEqual(b.recordings, ["is2-p1"]);
  assert.equal(b.sectionIndex, 3);
  assert.equal(b.playback["il2-p1"].offset, 12);
  assert.equal(
    restoreExam(p, JSON.stringify({ ...a, version: "2026.1" })),
    null,
  );
  assert.equal(restoreExam(p, "{bad json"), null);
  assert.equal(
    restoreExam(p, JSON.stringify({ ...a, certification: "toefl-ibt" })),
    null,
  );
  assert.notEqual(
    attemptStorageKey(p),
    attemptStorageKey(MOCK_PAPERS["ielts-general"]),
  );
  assert.ok(recordingKey(a, "is2-p1").includes(a.id));
});

test("new audio covers all exact fixed scripts with complete local PCM and verified boundaries", () => {
  const manifest = JSON.parse(read("public/media/mock-exams/v2/manifest.json"));
  const expected = uniqueSections
    .filter((s) => s.segments)
    .map((s) => [s.id, s.segments]);
  for (const p of [MOCK_PAPERS["ielts-academic"], MOCK_PAPERS["toefl-ibt"]])
    for (const s of p.speaking)
      if (s.stimulus) expected.push([s.id, s.stimulus]);
  assert.equal(expected.length, 77);
  assert.equal(
    new Set(
      manifest
        .filter((m) => m.id.startsWith("b22-l3-"))
        .map((m) => m.segments[0].voice),
    ).size,
    5,
    "B2 matching task has five distinct voices",
  );
  assert.deepEqual(
    manifest.map((m) => m.id).sort(),
    expected.map(([id]) => id).sort(),
  );
  for (const m of manifest) {
    const segments = expected.find(([id]) => id === m.id)[1];
    assert.deepEqual(
      m.segments.map((s) => [s.role, s.text, s.pauseAfter || 0]),
      segments.map((s) => [s.role, s.text, s.pauseAfter || 0]),
      m.id,
    );
    assert.match(m.engine, /Microsoft neural TTS/);
    assert.ok(m.duration > 1);
    assert.ok(m.rms > 0.003 && m.clippedFraction < 0.001);
    const bytes = fs.readFileSync(path.join(root, "public", m.src));
    assert.equal(hash(bytes), m.sha256);
    assert.equal(bytes.toString("ascii", 0, 4), "RIFF");
    assert.equal(bytes.readUInt32LE(4) + 8, bytes.length);
    assert.equal(bytes.toString("ascii", 8, 12), "WAVE");
  }
});

test("integration uses native recording and preserves the established design tokens and course files", () => {
  const contract = require("./fixtures/mock-rebuild-contract.json");
  const styling = require("./fixtures/style-refinement-contract.json");
  const recovery = require("./fixtures/ui-recovery-contract.json");
  const reference = require("./fixtures/reference-ui-contract.json");
  for (const [file, delta] of Object.entries(contract.integration))
    assert.equal(hash(read(file)), consistency.files[file]?.after??notesBrand.files[file]?.after ?? violet.files[file]?.after ?? fullsize.files[file]?.after ?? reference.files[file]?.after ?? recovery.files[file]?.after ?? styling.files[file]?.after ?? delta.after, file);
  for (const [file, digest] of Object.entries(contract.protectedUI))
    assert.equal(hash(fs.readFileSync(path.join(root, file))), consistency.files[file]?.after??notesBrand.files[file]?.after ?? violet.files[file]?.after ?? fullsize.files[file]?.after ?? reference.files[file]?.after ?? recovery.files[file]?.after ?? styling.files[file]?.after ?? digest, file);
  for (const [file, change] of Object.entries(contract.routingOnly)) {
    let restored = (recovery.historicalNavigation[file] ?? read(file)).replaceAll(change.newUrl, change.oldUrl);
    for (const pair of change.textReplacements || [])
      restored = restored.replaceAll(pair.after, pair.before);
    assert.equal(
      hash(restored),
      contract.integration[file].before,
      file + " routing-only delta",
    );
  }
  const source =
    read("src/app/mock-exam/page.tsx") +
    read("src/components/mock-exam/ExamElements.tsx") +
    read("src/components/mock-exam/ExamReview.tsx");
  for (const token of [
    "font-display",
    "font-body",
    "var(--color-surface)",
    "var(--color-text-primary)",
    "var(--radius-lg)",
    "grid-cols-1 lg:grid-cols-12",
    "lg:col-span-7",
    "lg:col-span-5",
    "max-w-5xl",
    "max-w-6xl",
    "#065f46",
  ])
    assert.ok(source.includes(token), token);
  assert.ok(
    !/psychometrically validated|Official Diagnostic Report|calculateToeflScore|calculateIeltsOverallBand/.test(
      source,
    ),
  );
  const recorder = read("src/components/mock-exam/ExamRecorder.tsx");
  assert.match(recorder, /getUserMedia\(\{\s*audio:\s*true\s*\}\)/);
  assert.match(recorder, /createRecordingSession/);
  assert.match(recorder, /saveTake/);
  assert.match(recorder, /loadTake/);
  assert.match(recorder, /waiter\.current/);
});

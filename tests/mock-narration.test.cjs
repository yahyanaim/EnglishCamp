require("./register.cjs");
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs"),
  path = require("node:path"),
  crypto = require("node:crypto");
const { ALL_MOCK_EXAMS } = require("../src/data/mock-exam.ts");
const { mockExamAudio } = require("../src/data/mock-exam-audio.ts");
const contract = require("./fixtures/mock-narration-contract.json");
const manifest = require("../public/media/mock-exams/manifest.json");
const root = path.join(__dirname, "..");
const hash = (b) => crypto.createHash("sha256").update(b).digest("hex");

test("all certification listening sections resolve to complete local neural recordings of their exact scripts", () => {
  const sections = new Map(
    Object.values(ALL_MOCK_EXAMS).flatMap((e) =>
      e.listeningSections.map((s) => [s.id, s]),
    ),
  );
  assert.equal(sections.size, 4);
  assert.deepEqual(
    Object.keys(mockExamAudio).sort(),
    [...sections.keys()].sort(),
  );
  assert.deepEqual(
    manifest.map((m) => m.id).sort(),
    [...sections.keys()].sort(),
  );
  for (const m of manifest) {
    assert.equal(m.src, mockExamAudio[m.id]);
    assert.match(m.src, /^\/media\/mock-exams\/[\w-]+\.wav$/);
    assert.equal(m.text, sections.get(m.id).audioScript);
    assert.equal(m.scriptSha256, hash(m.text));
    assert.equal(
      m.turns.map((t) => t.text).join(" "),
      m.text,
      m.id + " complete dialogue",
    );
    assert.match(m.engine, /Microsoft neural TTS/);
    const voices = new Map();
    for (const t of m.turns) {
      assert.match(t.voice, /Neural$/);
      if (voices.has(t.speaker)) assert.equal(voices.get(t.speaker), t.voice);
      voices.set(t.speaker, t.voice);
    }
    assert.equal(
      new Set(voices.values()).size,
      voices.size,
      m.id + " distinct speaker roles",
    );
    if (m.id.startsWith("toefl"))
      assert.ok(m.turns.every((t) => t.voice.startsWith("en-US-")));
  }
  assert.deepEqual(
    manifest.find((m) => m.id === "ielts-acad-l1").turns.map((t) => t.voice),
    [
      "en-GB-SoniaNeural",
      "en-CA-LiamNeural",
      "en-GB-SoniaNeural",
      "en-CA-LiamNeural",
      "en-GB-SoniaNeural",
      "en-CA-LiamNeural",
      "en-GB-SoniaNeural",
    ],
  );
  assert.strictEqual(
    ALL_MOCK_EXAMS["ielts-general"].listeningSections,
    ALL_MOCK_EXAMS["ielts-academic"].listeningSections,
  );
});

test("mock recordings have valid complete PCM, matching durations, audible signal and no material clipping", () => {
  for (const m of manifest) {
    const b = fs.readFileSync(path.join(root, "public", m.src));
    assert.equal(hash(b), m.sha256);
    assert.equal(b.toString("ascii", 0, 4), "RIFF");
    assert.equal(b.toString("ascii", 8, 12), "WAVE");
    assert.equal(b.readUInt32LE(4) + 8, b.length);
    let fmt, data;
    for (let off = 12; off + 8 <= b.length; ) {
      const size = b.readUInt32LE(off + 4),
        end = off + 8 + size;
      assert.ok(end <= b.length);
      const name = b.toString("ascii", off, off + 4);
      if (name === "fmt ") fmt = b.subarray(off + 8, end);
      if (name === "data") data = b.subarray(off + 8, end);
      off = end + (size % 2);
    }
    assert.ok(fmt && data);
    assert.equal(fmt.readUInt16LE(0), 1);
    assert.equal(fmt.readUInt16LE(2), 1);
    assert.equal(fmt.readUInt32LE(4), 24000);
    assert.equal(fmt.readUInt16LE(14), 16);
    assert.ok(Math.abs(data.length / 48000 - m.durationSeconds) < 0.002);
    assert.ok(m.durationSeconds > 30);
    let energy = 0,
      clipped = 0;
    for (let i = 0; i < data.length; i += 2) {
      const n = data.readInt16LE(i);
      energy += n * n;
      if (Math.abs(n) >= 32760) clipped++;
    }
    const frames = data.length / 2;
    assert.ok(Math.sqrt(energy / frames) / 32768 > 0.005);
    assert.ok(clipped / frames < 0.001);
  }
});

test("the archived sample data and recordings remain unchanged after the authorised rebuild", () => {
  assert.equal(
    hash(fs.readFileSync(path.join(root, "src/data/mock-exam.ts"))),
    contract.examDataSha256,
  );
  assert.equal(
    hash(JSON.stringify(ALL_MOCK_EXAMS)),
    contract.examSnapshotSha256,
  );
  const source = fs.readFileSync(
    path.join(root, "src/app/mock-exam/page.tsx"),
    "utf8",
  );
  assert.ok(!/speechSynthesis|SpeechSynthesisUtterance/.test(source));
  assert.match(source, /MOCK_PAPERS/);
  const audio = fs.readFileSync(
    path.join(root, "src/components/mock-exam/ExamAudio.tsx"),
    "utf8",
  );
  assert.match(audio, /AI-generated neural audio/);
  assert.match(audio, /<audio\s+ref=/);
});

test("review audio speeds use values compatible with numeric playback rates", () => {
  const source = fs.readFileSync(
    path.join(root, "src/components/mock-exam/ExamAudio.tsx"),
    "utf8",
  );
  const values = [
    ...source.matchAll(/<option value="([\d.]+)">[^<]*Speed/g),
  ].map((m) => m[1]);
  assert.deepEqual(values, ["0.8", "0.9", "1"]);
  for (const value of values) assert.equal(String(Number(value)), value);
  assert.match(source, /el.playbackRate\s*=\s*review\s*\?\s*speed\s*:\s*1/);
});

require('./register.cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { levels } = require('../src/data/content.ts');
const { exercises } = require('../src/data/exercises.ts');
const { courseActivities } = require('../src/data/course-activities.ts');
const { checkActivityAnswer, countWords, normalizeAnswer, activityStorageKey, microphoneError, createLocalRecording } = require('../src/lib/courseActivity.ts');
const root = path.join(__dirname, '..');
const original = JSON.parse(fs.readFileSync(path.join(__dirname, 'fixtures/approved-contract.json')));
const allTasks = courseActivities.flatMap(e => e.data.tasks);

test('all four canonical courses keep 25 lesson IDs and original rewards', () => {
  assert.equal(levels.length, 4);
  for (const [i, level] of levels.entries()) {
    assert.equal(level.id, original.levels[i].id);
    assert.equal(level.lessons.length, 25);
    for (const [j, lesson] of level.lessons.entries()) {
      assert.equal(lesson.id, original.levels[i].lessons[j].id);
      assert.equal(lesson.xpReward, original.levels[i].lessons[j].xpReward);
    }
  }
});
test('every old exercise identifier and XP reward survives; no orphan lesson references', () => {
  const lessons = new Set(levels.flatMap(l => l.lessons.map(x => x.id)));
  assert.equal(new Set(exercises.map(e => e.id)).size, exercises.length);
  for (const old of original.exercises) {
    const current = exercises.find(e => e.id === old.id);
    assert.ok(current, old.id); assert.equal(current.xpReward, old.xpReward);
  }
  for (const e of exercises) assert.ok(lessons.has(e.lessonId), e.id);
});
test('approved 214 IELTS/TOEFL short drills remain unchanged', () => {
  const ids = new Set(original.levels.slice(1, 3).flatMap(l => l.lessons.map(x => x.id)));
  const approved = original.exercises.filter(e => ids.has(e.lessonId));
  assert.equal(approved.length, 214);
  for (const old of approved) assert.equal(require('node:crypto').createHash('sha256').update(JSON.stringify(exercises.find(e => e.id === old.id))).digest('hex'), old.sha256);
});
test('100 activities provide 300 distinct guided, independent and assessment records', () => {
  assert.equal(courseActivities.length, 100); assert.equal(allTasks.length, 300);
  assert.equal(new Set(allTasks.map(t => t.id)).size, 300);
  for (const e of courseActivities) {
    assert.ok(e.data.learn.length > 180); assert.ok(e.data.worked.reasoning);
    const [guided, independent, assessment] = e.data.tasks;
    const stimulus = t => JSON.stringify([t.source, t.audio?.src, t.spokenItems?.map(i => i.audioSrc), t.instructions, t.questions?.map(q => q.prompt)]);
    assert.notEqual(stimulus(guided), stimulus(independent), e.lessonId);
    assert.notEqual(stimulus(independent), stimulus(assessment), e.lessonId);
  }
});
test('all authored keys validate; invalid and incomplete answers do not', () => {
  let count = 0;
  for (const t of allTasks) for (const q of t.questions || []) {
    count++;
    assert.ok(q.explanation && q.evidence, t.id + q.id);
    assert.ok(checkActivityAnswer(q, q.selectCount ? JSON.stringify(q.answers) : q.answers[0]), t.id + q.id);
    assert.ok(!checkActivityAnswer(q, 'definitely-not-an-answer'), t.id + q.id);
    if (q.options) {
      assert.equal(new Set(q.options).size, q.options.length, t.id + q.id);
      for (const key of q.answers) assert.ok(q.options.includes(key), t.id + q.id);
    }
  }
  assert.ok(count > 500);
});
test('word limits, normalisation and multiple selection are enforced', () => {
  assert.equal(countWords('  one\n two  three '), 3); assert.equal(countWords('  '), 0);
  assert.equal(normalizeAnswer('  DON’T   wait  '), "don't wait");
  assert.ok(!checkActivityAnswer({ answers: ['a b'], maxWords: 1 }, 'a b'));
  const q = { answers: ['A','C'], selectCount: 2 };
  assert.ok(checkActivityAnswer(q, '["C","A"]'));
  for (const response of ['["A"]','["A","A"]','["A","B"]','["A","C","D"]','{}']) assert.ok(!checkActivityAnswer(q,response));
});
test('writing tasks include relevant targets, complete models and criterion-based review', () => {
  const writing = allTasks.filter(t => t.kind === 'writing'); assert.ok(writing.length > 60);
  for (const t of writing) { assert.ok(t.minWords > 0); assert.ok(countWords(t.model) >= t.minWords, `${t.id}: ${countWords(t.model)} < ${t.minWords}`); assert.ok(t.rubric.length >= 4); assert.ok(t.analysis); }
  for (const l of levels) assert.ok(courseActivities.filter(e => e.lessonId.startsWith(l.lessons[0].id.slice(0,6))).length);
});
test('every course has real audio, extended writing, passage reading and speaking production', () => {
  for (const l of levels) {
    const ids = new Set(l.lessons.map(x => x.id)); const tasks = courseActivities.filter(e => ids.has(e.lessonId)).flatMap(e => e.data.tasks);
    for (const kind of ['listening','reading','writing','speaking']) assert.ok(tasks.some(t => t.kind === kind), `${l.id} ${kind}`);
    assert.ok(tasks.some(t => t.kind === 'writing' && t.minWords >= (l.id === 'band6-7' ? 100 : 140)));
  }
});
test('all audio files contain actual PCM samples and match the provenance manifest', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'public/media/courses/audio-manifest.json')));
  assert.ok(manifest.length >= 95); assert.ok(new Set(manifest.map(x => x.voice)).size >= 2);
  const used = allTasks.flatMap(t => [...(t.audio ? [t.audio.src] : []), ...(t.spokenItems || []).map(i => i.audioSrc), ...(t.modelAudio ? [t.modelAudio.src] : [])]);
  assert.ok(new Set(used).size >= 95);
  for (const src of used) {
    const file = fs.readFileSync(path.join(root,'public',src));
    assert.equal(file.toString('ascii',0,4),'RIFF'); assert.equal(file.toString('ascii',8,12),'WAVE');
    assert.ok(file.length > 20000); assert.ok(file.subarray(1000,20000).some(x=>x !== 0));
    const entry = manifest.find(m => m.path === 'public'+src); assert.ok(entry && entry.durationSeconds > 1, src);
  }
});
test('graphical tasks use actual SVGs with titles and accessible text alternatives', () => {
  const tasks = allTasks.filter(t => t.visual); assert.ok(tasks.length >= 8);
  for (const t of tasks) { const svg=fs.readFileSync(path.join(root,'public',t.visual.src),'utf8'); assert.ok(svg.includes('<svg') && svg.includes('<title')); assert.ok(t.visual.alt.length > 40); }
});
test('current TOEFL includes seven repetition prompts and four interview questions', () => {
  const repeat = courseActivities.find(e => e.lessonId === 'band3-speaking-part3').data.tasks[1]; assert.equal(repeat.spokenItems.length,7);
  const interview = courseActivities.find(e => e.lessonId === 'band3-speaking-opinions').data.tasks[1]; assert.equal(interview.spokenItems.length,4);
  for (const e of courseActivities.filter(e=>e.data.exam === 'TOEFL iBT 2026')) for (const t of e.data.tasks) for (const q of t.questions || []) assert.ok(!q.options?.includes('NOT GIVEN'), 'IELTS family leaked into TOEFL');
});
test('draft keys isolate lesson and stage; microphone errors give actionable messages', () => {
  assert.notEqual(activityStorageKey('lesson-a','task-1'),activityStorageKey('lesson-a','task-2'));
  assert.notEqual(activityStorageKey('lesson-a','task-1'),activityStorageKey('lesson-b','task-1'));
  for (const [name,word] of [['NotAllowedError','denied'],['NotFoundError','No microphone'],['NotReadableError','busy']]) { const error=new Error(); error.name=name; assert.ok(microphoneError(error).includes(word)); }
});
test('recording constructor failures stop the acquired microphone stream', async () => {
  let stopped=0;
  const media={getTracks:()=>[{stop:()=>stopped++}]};
  await assert.rejects(createLocalRecording({getUserMedia:async constraints=>{assert.deepEqual(constraints,{audio:true});return media;}},class {constructor(){throw Error('codec unavailable');}}));
  assert.equal(stopped,1);
});
test('recording request failures propagate; successful construction keeps stream for capture', async () => {
  let requested=0,stopped=0;const media={getTracks:()=>[{stop:()=>stopped++}]};
  await assert.rejects(createLocalRecording({getUserMedia:async()=>{throw Error('denied');}},class {}));
  class Recorder {constructor(stream){assert.equal(stream,media);requested++;}}
  const capture=await createLocalRecording({getUserMedia:async()=>media},Recorder);
  assert.equal(requested,1);assert.equal(stopped,0);assert.equal(capture.media,media);
});
test('completion is idempotent for original and new exercise XP', () => {
  const {useProgress}=require('../src/store/useProgress.ts');useProgress.getState().reset();
  const complete=useProgress.getState().completeExercise;
  complete('existing-test',15);complete('existing-test',15);complete('activity-test',20);complete('activity-test',20);
  assert.equal(useProgress.getState().xp,35);assert.equal(Object.keys(useProgress.getState().exercisesDone).length,2);
  assert.equal(JSON.parse(localStorage.getItem('englishcamp-progress')).state.xp,35);
});

const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
test('initial listening UI hides transcript and answers until review', () => {
  const {CourseActivity}=require('../src/components/exercises/CourseActivity.tsx');
  const e=courseActivities.find(e=>e.lessonId==='band2-listening-mcq');
  const html=renderToStaticMarkup(React.createElement(CourseActivity,{data:e.data,id:e.id,xpReward:e.xpReward}));
  assert.ok(html.includes('<audio'));assert.ok(!html.includes(e.data.tasks[0].audio.transcript));assert.ok(!html.includes('Accepted answer:'));assert.ok(html.includes('disabled'));assert.ok(html.includes('Guided practice'));
});
test('initial writing UI provides labelled response input and no model leak', () => {
  const {CourseActivity}=require('../src/components/exercises/CourseActivity.tsx');
  const e=courseActivities.find(e=>e.lessonId==='band2-writing-line-graphs');
  const html=renderToStaticMarkup(React.createElement(CourseActivity,{data:e.data,id:e.id,xpReward:e.xpReward}));
  assert.ok(html.includes('<textarea'));assert.ok(html.includes('Your written response'));assert.ok(!html.includes(e.data.tasks[0].model));assert.ok(html.includes('Start timer'));
});
test('three- and four-underscore legacy blanks both render their trailing context', () => {
  const {FillBlank}=require('../src/components/exercises/FillBlank.tsx');
  for(const blank of ['___','____']) {
    const html=renderToStaticMarkup(React.createElement(FillBlank,{data:{id:'qa',sentence:`Before ${blank} after`,answer:'middle',xpReward:0}}));
    assert.ok(html.includes('Before'));assert.ok(html.includes('after'));assert.ok(html.includes('<input'));assert.ok(!html.includes('middle'));
  }
});

test('Complete the Words prefixes and missing-letter counts match their restored words', () => {
  const activity=courseActivities.find(e=>e.lessonId==='band3-reading-summary-completion');
  for(const task of activity.data.tasks)for(const q of task.questions){
    const partial=q.prompt.match(/: ([a-z]+)(_+)$/i);assert.ok(partial,q.id);
    assert.ok(q.answers[0].startsWith(partial[1]));assert.equal(q.answers[0].length,partial[1].length+partial[2].length,q.prompt);
  }
});

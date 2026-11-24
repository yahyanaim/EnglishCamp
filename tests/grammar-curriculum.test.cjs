require('./register.cjs');
const { test } = require('node:test'), assert = require('node:assert/strict');
const { GRAMMAR_CURRICULUM, GRAMMAR_LESSON_LEVELS, grammarLessonKey, grammarLevelProgress, grammarLearnedCount } = require('../src/data/grammar-curriculum.ts');
const { SECTIONS } = require('../src/components/learn/GrammarReference.tsx');
const { ACHIEVEMENTS } = require('../src/store/useAchievements.ts');

test('every grammar lesson belongs to one CEFR level in the curriculum, and every curriculum point has a lesson', () => {
  const ids = new Set(SECTIONS.map(s => s.id));
  for (const level of GRAMMAR_CURRICULUM) for (const point of level.points) {
    assert.ok(point.lessons.length > 0, point.title);
    for (const id of point.lessons) assert.ok(ids.has(id), `${point.title}: ${id}`);
  }
  for (const section of SECTIONS) assert.equal(section.level, GRAMMAR_LESSON_LEVELS[section.id], section.id);
  assert.deepEqual(GRAMMAR_CURRICULUM.map(l => l.level), ['A1', 'A2', 'B1', 'B2']);
});

test('learned grammar lessons drive level progress and the grammar badges', () => {
  const a1 = GRAMMAR_CURRICULUM[0].points.flatMap(p => p.lessons).filter(id => GRAMMAR_LESSON_LEVELS[id] === 'A1');
  const done = Object.fromEntries(a1.map(id => [grammarLessonKey(id), true]));
  const progress = grammarLevelProgress(done);
  assert.equal(progress[0].complete, true);
  assert.equal(progress[1].learned, 0);
  assert.equal(grammarLearnedCount(done), new Set(a1).size);
  const inputs = { xp: 0, streak: 0, lessonsDone: 0, exercisesDone: 0, vocabCount: 0, quizzesTaken: 0, errorsFixed: 0, cardsReviewed: 0, grammarLearned: grammarLearnedCount(done), grammarLevels: progress.filter(l => l.complete).map(l => l.level), listeningDone: 0, readingDone: 0 };
  const unlocked = ACHIEVEMENTS.filter(a => a.condition(inputs)).map(a => a.id);
  for (const id of ['grammar-1', 'grammar-10', 'grammar-A1']) assert.ok(unlocked.includes(id), id);
  assert.ok(!unlocked.includes('grammar-A2'));
});

test('wrong answers reach Weak areas and point to an existing grammar lesson', () => {
  const { logMistake, mistakeInfo } = require('../src/lib/mistakes.ts');
  const { useErrors } = require('../src/store/useErrors.ts');
  const ids = new Set(SECTIONS.map(s => s.id));
  const before = useErrors.getState().errors.length;
  logMistake('relative', 'rel-1', 'The man ___ lives here', 'which', 'who', 'Use who for people.');
  logMistake('relative', 'rel-1', 'Same answer', 'who', 'who');
  assert.equal(useErrors.getState().errors.length, before + 1);
  for (const source of ['conjugation', 'passive', 'relative', 'preposition', 'conditional', 'narrative-past', 'question-formation', 'subordinate-clauses', 'sentence-builder', 'verb-puzzle', 'discourse']) {
    const lesson = mistakeInfo(source).lesson;
    assert.ok(lesson && ids.has(lesson), `${source} -> ${lesson}`);
  }
  assert.equal(mistakeInfo('listening').category, 'skills');
  assert.equal(mistakeInfo('reading').category, 'skills');
});

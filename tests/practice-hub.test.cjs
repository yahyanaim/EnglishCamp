require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const meta=require('../src/data/practice-meta.ts');
test('every Practice Hub trainer has a reviewed level and time, and the hub has no back button',()=>{
 const src=fs.readFileSync('src/app/practice/page.tsx','utf8'),block=src.slice(src.indexOf('const CATEGORIES'),src.indexOf('function trainerLabel'));
 const ids=[...block.matchAll(/\{ id: "([a-z0-9-]+)", label:/g)].map(m=>m[1]);assert.ok(ids.length>=80);
 const metaSrc=fs.readFileSync('src/data/practice-meta.ts','utf8');
 for(const id of ids){assert.ok(metaSrc.includes(`"${id}"`),id+' has an explicit level');assert.ok(meta.PRACTICE_LEVELS.includes(meta.practiceLevel(id)));assert.ok(meta.PRACTICE_TIMES.includes(meta.practiceMinutes(id)));}
 assert.match(src,/className="camp-practice-hub" back=\{false\}/);
 assert.match(fs.readFileSync('src/lib/learnerStores.ts','utf8'),/usePracticeHistory\]/,'history switches with the learner');
});

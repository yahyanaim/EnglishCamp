require('./register.cjs');
const {test}=require('node:test');const assert=require('node:assert/strict');
const {courseSupplements}=require('../src/data/course-instruction/supplements.ts');
const {courseInstruction}=require('../src/data/course-instruction/index.ts');
const {foundationInstruction}=require('../src/data/course-instruction/foundation.ts');
const {academicInstruction}=require('../src/data/course-instruction/academic.ts');
const {toeflInstruction}=require('../src/data/course-instruction/toefl.ts');
const {generalInstruction}=require('../src/data/course-instruction/general.ts');
const {getModuleData}=require('../src/lib/courseData.ts');
const authored={...foundationInstruction,...academicInstruction,...toeflInstruction,...generalInstruction};

test('supplements only extend existing chapters and keep authored teaching first and unchanged',()=>{
 for(const [id,extra] of Object.entries(courseSupplements)){
  assert.ok(authored[id],`supplement for unknown module ${id}`);
  const chapter=courseInstruction[id];
  assert.deepEqual(chapter.sections.slice(0,authored[id].sections.length),authored[id].sections);
  assert.deepEqual(chapter.sections.slice(authored[id].sections.length),extra);
  assert.deepEqual({...chapter,sections:authored[id].sections},authored[id]);
 }
 for(const [id,chapter] of Object.entries(authored))if(!courseSupplements[id])assert.equal(courseInstruction[id],chapter);
});

test('every supplementary section is complete, has a reasoning check and renders in its module',()=>{
 for(const [id,extra] of Object.entries(courseSupplements)){
  const blocks=getModuleData(id).lesson.blocks;
  for(const s of extra){
   assert.ok(s.paragraphs.length>=2&&s.paragraphs.every(p=>p.length>80),`${id}: ${s.title}`);
   assert.ok(s.check&&s.check.prompt&&s.check.answer,`${id}: ${s.title} needs a check`);
   if(s.table)assert.ok(s.table.rows.length>=3&&s.table.rows.every(r=>r.length===s.table.headers.length));
   assert.ok(blocks.some(b=>b.kind==='callout'&&b.title===s.title),`${id}: ${s.title} not rendered`);
  }
  const last=blocks[blocks.length-1];assert.equal(last.title,'Apply this in the practice lab');
 }
});

test('the fifteen requested topics are each taught somewhere in the library',()=>{
 const text=Object.values(courseInstruction).flatMap(c=>c.sections.map(s=>s.title+' '+s.paragraphs.join(' '))).join('\n');
 for(const re of [/parts of speech/i,/tense map/i,/modal verbs/i,/zero, first, second and third/i,/mixed conditional/i,/reported speech/i,/gerund or infinitive/i,/comparatives and superlatives/i,/conjunctions/i,/punctuation and capitalisation/i,/antonyms/i,/notes? (at different levels|for fast notes)/i,/accents/i,/topic sentence/i,/IPA/])assert.match(text,re);
});

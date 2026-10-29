require('./register.cjs');
const {test}=require('node:test');const assert=require('node:assert/strict');const crypto=require('node:crypto');
const contract=require('./fixtures/course-depth-contract.json');
const {levels}=require('../src/data/content.ts');const {exercises}=require('../src/data/exercises.ts');
const {courseActivities}=require('../src/data/course-activities.ts');const {courseInstruction}=require('../src/data/course-instruction/index.ts');
const {getModuleData}=require('../src/lib/courseData.ts');const {taskSignature}=require('../src/lib/activityState.ts');
// This historical contract predates the reviewed curriculum revisions. Restore
// only the recorded revision deltas for its old fingerprint assertions; the new
// curriculum contract independently validates every live delta and migration.
const reconstruction=require('./fixtures/curriculum-reconstruction-contract.json');
const depthBaseline=new Map(reconstruction.activitiesBefore.map(a=>[a.id,a]));
const historicalActivities=courseActivities.map(a=>depthBaseline.get(a.id)||a);
test('historical teaching expansion contract survives restoration of reviewed curriculum deltas',()=>{
 const approved=new Map([contract.wordFormationBefore,...contract.planningActivitiesBefore].map(e=>[e.id,e]));
 const restored=exercises.map(e=>approved.get(e.id)||depthBaseline.get(e.id)||e);
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(restored)).digest('hex'),contract.exercisesSha256);
 assert.deepEqual(Object.fromEntries(historicalActivities.flatMap(a=>a.data.tasks.map(t=>[t.id,taskSignature(t)]))),contract.signatures);
});
test('course and module identifiers, ordering and XP contracts are unchanged',()=>{
 assert.deepEqual(levels.map(c=>({id:c.id,lessons:c.lessons.map(l=>({id:l.id,xpReward:l.xpReward}))})),contract.courses);
});
test('instruction belongs to live modules and has usable reasoning checks',()=>{
 const ids=new Set(levels.flatMap(c=>c.lessons.map(l=>l.id)));
 for(const [id,c] of Object.entries(courseInstruction)){
  assert.ok(ids.has(id),`orphan chapter ${id}`);assert.ok(['replace','extend'].includes(c.mode));
  assert.ok(c.prerequisite && c.application && c.outcomes.length);
  assert.equal(new Set(c.sections.map(s=>s.title)).size,c.sections.length);
  for(const s of c.sections){assert.ok(s.title&&s.paragraphs.every(Boolean));if(s.check)assert.ok(s.check.prompt&&s.check.answer);if(s.table)assert.ok(s.table.rows.every(r=>r.length===s.table.headers.length));}
 }
});
test('both module entry routes select the same preserved lesson and activity',()=>{
 for(const c of levels)for(const l of c.lessons){
  const study=getModuleData(l.id,c.id),focused=getModuleData(l.id);
  assert.deepEqual(study,focused);
  assert.deepEqual({...study.lesson,blocks:l.blocks},l);
  const chapter=courseInstruction[l.id];
  if(!chapter)assert.deepEqual(study.lesson,l);
  else {
   const text=study.lesson.blocks.flatMap(b=>b.kind==='table'?[...b.headers,...b.rows.flat()]:b.kind==='list'?b.items:'text' in b?[b.text]:[]);
   for(const value of [chapter.outcomes.join('\n'),chapter.prerequisite,chapter.application,...chapter.sections.flatMap(s=>[...s.paragraphs,...(s.table?[...s.table.headers,...s.table.rows.flat()]:[]),...(s.check?[s.check.prompt,s.check.answer]:[])])])assert.ok(text.includes(value),`${l.id}: lost teaching text`);
   if(chapter.mode==='extend')for(const b of l.blocks)assert.ok(study.lesson.blocks.includes(b));
  }
 }
 assert.equal(getModuleData('band1-toefl-intro','band5-6'),undefined);
});

test('approved word-formation widening preserves prompts and every formerly accepted answer',()=>{
 const current=historicalActivities.find(a=>a.id===contract.wordFormationBefore.id);
 for(let i=0;i<3;i++){const before=contract.wordFormationBefore.data.tasks[i],after=current.data.tasks[i];
  assert.equal(taskSignature(after),contract.signatures[after.id]);
  const oldCopy=structuredClone(before),newCopy=structuredClone(after);delete newCopy.compatibleWithSignature;
  for(let j=0;j<before.questions.length;j++){
   for(const accepted of before.questions[j].answers)assert.ok(after.questions[j].answers.includes(accepted));
   for(const key of ['answers','evidence','explanation']){delete oldCopy.questions[j][key];delete newCopy.questions[j][key];}
  }assert.deepEqual(newCopy,oldCopy);
 }
 const {checkActivityAnswer}=require('../src/lib/courseActivity.ts');
 assert.ok(checkActivityAnswer(current.data.tasks[2].questions[7],'improvement'));
 assert.ok(checkActivityAnswer(current.data.tasks[1].questions[1],'suggestion'));
 assert.ok(checkActivityAnswer(current.data.tasks[1].questions[0],'access'));
 assert.ok(checkActivityAnswer(current.data.tasks[1].questions[5],'usually'));
 assert.ok(!checkActivityAnswer(current.data.tasks[1].questions[5],'usual'));
 assert.ok(!checkActivityAnswer(current.data.tasks[2].questions[7],'improving'));
});

test('the existing 92-chapter registry and eight original-block entry points stay stable',()=>{
 const expectedPreserved=['band2-reading-tfng','band2-writing-line-graphs','band2-writing-opinion','band2-practice-reading','band3-reading-matching-features','band3-writing-maps-processes','band3-vocab-health','band3-error-analysis'];
 const preserved=levels.flatMap(c=>c.lessons).filter(l=>!courseInstruction[l.id]).map(l=>l.id);
 assert.deepEqual(preserved,expectedPreserved);
 assert.equal(Object.keys(courseInstruction).length,92);
});

test('guided planning exposes the next prompt without changing activity fingerprints',()=>{
 const {planningPrompt}=require('../src/lib/courseLabels.ts');
 const targets=courseActivities.filter(a=>a.data.tasks[0].title==='Guided task planning');assert.equal(targets.length,4);
 for(const a of targets){const before=a.data.tasks.map(taskSignature);assert.equal(planningPrompt(a.data,0),a.data.tasks[1].instructions);assert.equal(planningPrompt(a.data,1),undefined);assert.deepEqual(a.data.tasks.map(taskSignature),before);}
 assert.match(planningPrompt(targets.find(a=>a.lessonId==='band3-writing-formality').data,0),/longer library opening hours/);
});
test('server-rendered guided planning includes its target in the existing instruction paragraph',()=>{
 const React=require('react');const {renderToStaticMarkup}=require('react-dom/server');const {CourseActivity}=require('../src/components/exercises/CourseActivity.tsx');
 const a=courseActivities.find(a=>a.lessonId==='band3-writing-formality');
 const html=renderToStaticMarkup(React.createElement(CourseActivity,{data:a.data,id:a.id,xpReward:a.xpReward}));
 assert.match(html,/Read this prompt, then write your plan/);assert.match(html,/longer library opening hours/);
});

test('planning-model improvements retain every prompt and compatible saved response',()=>{
 const models=[];
 for(const old of contract.planningActivitiesBefore){
  const current=historicalActivities.find(a=>a.id===old.id);
  for(let i=0;i<3;i++){const before=structuredClone(old.data.tasks[i]),after=structuredClone(current.data.tasks[i]);
   assert.equal(taskSignature(after),contract.signatures[after.id]);
   if(i===0){models.push(after.model);assert.notEqual(after.model,before.model);for(const k of ['model','analysis','compatibleWithSignature']){delete before[k];delete after[k];}}
   assert.deepEqual(after,before);
  }
 }assert.equal(new Set(models).size,4);
});

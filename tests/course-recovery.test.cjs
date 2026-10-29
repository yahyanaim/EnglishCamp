require('./register.cjs');
const {test}=require('node:test');
const assert=require('node:assert/strict');
const {courseActivities}=require('../src/data/course-activities.ts');
const {checkActivityAnswer}=require('../src/lib/courseActivity.ts');
const task=(id,stage)=>courseActivities.find(e=>e.lessonId===id).data.tasks[stage];
test('moderated tense variants fit their time references; incorrect aspects stay rejected',()=>{
 const [residence,investment,state]=task('band1-ielts-vs-toefl',2).questions;
 for(const answer of ['had lived','had been living','lived','  HAD   BEEN LIVING. '])assert.ok(checkActivityAnswer(residence,answer),answer);
 for(const answer of ['has lived','has been living','had been live','was live'])assert.ok(!checkActivityAnswer(residence,answer),answer);
 for(const answer of ['has invested','has been investing'])assert.ok(checkActivityAnswer(investment,answer));
 for(const answer of ['have invested','invested','has been invested'])assert.ok(!checkActivityAnswer(investment,answer));
 assert.ok(checkActivityAnswer(state,'understand'));assert.ok(!checkActivityAnswer(state,'am understanding'));
});
test('concise source-based references and deadline variants no longer block a valid response',()=>{
 const refs=task('band4-reading-time-pressure',0).questions[0];
 for(const answer of ['references','supporting references',' REFERENCES. '])assert.ok(checkActivityAnswer(refs,answer));
 for(const answer of ['application form','late application','reference','some supporting references later'])assert.ok(!checkActivityAnswer(refs,answer));
 const expiry=task('band4-reading-time-pressure',2).questions[0];
 for(const answer of ['before expiry','before it expires','before the deadline'])assert.ok(checkActivityAnswer(expiry,answer));
 assert.ok(!checkActivityAnswer(expiry,'after expiry'));
});
test('normalisation preserves internal punctuation, exact spelling, word and numeric constraints',()=>{
 const q={answers:['21'],maxWords:1,punctuation:'terminal'};
 assert.ok(checkActivityAnswer(q,'21.'));assert.ok(!checkActivityAnswer(q,'12'));assert.ok(!checkActivityAnswer(q,'21 days'));
 assert.ok(!checkActivityAnswer({answers:['re-sign'],punctuation:'terminal'},'resign'));
 assert.ok(!checkActivityAnswer({answers:['accommodation'],punctuation:'terminal'},'accomodation'));
 assert.ok(!checkActivityAnswer({answers:['Why now?'],punctuation:'exact'},'why now'));
});
test('all 60 moderated reading items have specific options, direct source anchors and varied key positions',()=>{
 const positions=[0,0,0,0];let total=0;const stems=new Set();
 for(const e of courseActivities)for(const t of e.data.tasks)for(const q of t.questions||[]){
  assert.ok(!q.options?.includes('The scheme is guaranteed to succeed everywhere.'));
  if(q.reviewId==='EC-03'){
   total++;positions[q.options.indexOf(q.answers[0])]++;stems.add(q.prompt);
   assert.ok(t.source.includes(q.evidence),t.id);assert.equal(new Set(q.options).size,4);
   for(const wrong of q.options.filter(x=>!q.answers.includes(x)))assert.ok(!checkActivityAnswer(q,wrong));
  }
 }
 assert.equal(total,60);assert.equal(stems.size,60);assert.deepEqual(positions,[15,15,15,15]);
});
test('TOEFL transfer writing preserves the email/discussion communication family and current timing',()=>{
 const models=new Set();
 for(const [id,family,seconds] of [['band3-writing-maps-processes','email',420],['band3-writing-task-response','email',420],['band3-writing-multiple-charts','discussion',600],['band3-writing-formality','discussion',600],['band3-practice-essay','email',420]]){
  const t=task(id,2);assert.equal(t.taskFamily,family);assert.equal(t.seconds,seconds);assert.ok(t.instructions.includes(family==='email'?'Email':'Professor:'));models.add(t.model);
 }
 assert.equal(models.size,5);assert.equal(task('band3-practice-essay',1).seconds,600);
});
test('XP labels describe platform engagement rather than examination scores',()=>{
 const {XP_LEVELS,getLevelInfo}=require('../src/lib/xp.ts');assert.equal(getLevelInfo(125).title,'Learning level 2');
 for(const level of XP_LEVELS)assert.ok(!/band|ielts|toefl|master/i.test(level.title));
});

test('v2 migration preserves XP, records, unknown compatible data and historical credit without fabricating skills',()=>{
 const {migrateCourseProgress,hasModuleCredit,cycleComplete}=require('../src/lib/courseProgress.ts');
 const old={xp:125,streak:4,lessons:{old:{completed:true,xpEarned:60,attempts:1,completedAt:'2026-10-20'}},exercisesDone:{'activity-practised':true,'drill-only':true},flashcardSeen:{x:2},quizResults:{'band4-5':[{score:90}]},custom:'retain'};
 const updated=migrateCourseProgress(old);
 assert.equal(updated.xp,125);assert.equal(updated.streak,4);assert.deepEqual(updated.lessons,old.lessons);assert.deepEqual(updated.exercisesDone,old.exercisesDone);assert.equal(updated.custom,'retain');
 assert.ok(hasModuleCredit('old',updated.modules,updated.lessons));assert.ok(hasModuleCredit('practised',updated.modules,updated.lessons));assert.ok(!hasModuleCredit('drill-only',updated.modules,updated.lessons));
 for(const m of Object.values(updated.modules)){assert.deepEqual(m.stages,{});assert.ok(!cycleComplete(m));}
});
test('all three stages, rather than page position or acknowledgements, establish a new cycle; rewards remain idempotent',()=>{
 const {useProgress}=require('../src/store/useProgress.ts');const {cycleComplete}=require('../src/lib/courseProgress.ts');
 useProgress.getState().reset();useProgress.getState().visitModule('new-module');
 assert.ok(!cycleComplete(useProgress.getState().modules['new-module']));
 for(const stage of [0,1,2]){
  const award=useProgress.getState().finishStage('new-module',stage,{kind:'writing',outcome:'self-reviewed',signature:'v1'},60);
  assert.equal(award,stage===2?60:0);assert.equal(cycleComplete(useProgress.getState().modules['new-module']),stage===2);
 }
 assert.equal(useProgress.getState().completeExercise('activity-new-module',20),20);
 assert.equal(useProgress.getState().completeExercise('activity-new-module',20),0);
 assert.equal(useProgress.getState().finishStage('new-module',2,{kind:'writing',outcome:'self-reviewed',signature:'v1'},60),0);
 assert.equal(useProgress.getState().xp,80);
 assert.equal(useProgress.getState().getLevelProgress('band4-5',25,()=>false,['new-module',...Array.from({length:24},(_,i)=>'untouched'+i)]),4);
 assert.equal(useProgress.getState().modules['new-module'].stages[2].outcome,'self-reviewed');
 useProgress.getState().registerContent('new-module',['v1','v1','v2']);assert.ok(!cycleComplete(useProgress.getState().modules['new-module']));
 // An unversioned already completed cycle remains credited as history when content changes.
 assert.equal(useProgress.getState().xp,80);
});
test('resume prefers the latest unfinished module, ignores other courses, then advances from a credited module',()=>{
 const {resumeModule}=require('../src/lib/courseProgress.ts');
 const modules={a:{stages:{},lastActiveAt:'2026-10-20'},b:{stages:{},lastActiveAt:'2026-10-22'},other:{stages:{},lastActiveAt:'2026-10-25'}};
 assert.equal(resumeModule(['a','b','c'],modules,{}),'b');
 modules.b.legacyStudy=true;assert.equal(resumeModule(['a','b','c'],modules,{}),'a');
 modules.a.legacyStudy=true;assert.equal(resumeModule(['a','b','c'],modules,{}),'c');
});
test('answer, question, feedback, timer phase and draft state survive serialization; changed prompts use a separate key',()=>{
 const {restoreAttempt,attemptKey,initialAttempt}=require('../src/lib/activityState.ts');
 const t=task('band1-ielts-intro',0);const saved={...initialAttempt(t),index:2,answers:{q1:'set up',q2:'at'},submitted:true,checks:[],remaining:17};
 const restored=restoreAttempt(t,JSON.stringify(saved),null);
 assert.equal(restored.index,2);assert.equal(restored.answers.q1,'set up');assert.ok(restored.submitted);assert.equal(restored.remaining,17);
 const newPrompt={...t,instructions:'A genuinely new prompt',contentVersion:(t.contentVersion??1)+1};delete newPrompt.compatibleWithSignature;
 assert.notEqual(attemptKey('ex',t),attemptKey('ex',newPrompt));
 const revised={...task('band3-writing-maps-processes',2),contentVersion:2};
 const migrated=restoreAttempt(revised,null,JSON.stringify({text:'old valuable draft'}));
 assert.equal(migrated.text,'');assert.equal(migrated.previous,'old valuable draft');assert.ok(migrated.earlierPrompt);
 assert.deepEqual(restoreAttempt(t,'broken json',null),initialAttempt(t));
});
test('new course errors feed revision and a correct retry resolves only the corresponding question',()=>{
 const {useErrors}=require('../src/store/useErrors.ts');useErrors.setState({errors:[]});
 const base={question:'A question',userAnswer:'Incorrect response',correctAnswer:'A',explanation:'Specific evidence',source:'course-activity',sourceId:'module',taskId:'task'};
 useErrors.getState().addError({...base,questionId:'q1'});useErrors.getState().addError({...base,questionId:'q2'});
 useErrors.getState().resolveActivityErrors('module','task',['q1']);
 assert.equal(useErrors.getState().errors.find(e=>e.questionId==='q1').reviewed,true);assert.equal(useErrors.getState().errors.find(e=>e.questionId==='q2').reviewed,false);
});
test('explicit skill membership retains canonical numbers and distinguishes article writing from articles',()=>{
 const {courseCatalogue}=require('../src/data/course-catalogue.ts');
 const b2=courseCatalogue[0],speaking=courseCatalogue[2].lessons.filter(l=>l.skills.includes('speaking'));
 assert.ok(b2.lessons[2].skills.includes('grammar'));assert.ok(!b2.lessons[10].skills.includes('grammar'));assert.equal(speaking[0].moduleNumber,13);
 for(const course of courseCatalogue){assert.equal(course.lessons.length,25);assert.deepEqual(course.lessons.map(l=>l.moduleNumber),Array.from({length:25},(_,i)=>i+1));}
});

test('GT now provides listening matching, multiple-answer selection and an unlabelled plan',()=>{
 const matching=task('band4-listening-accents',1).questions.filter(q=>q.prompt.startsWith('Match '));assert.equal(matching.length,3);
 const multiple=task('band4-listening-distractors',1).questions.find(q=>q.selectCount===2);assert.ok(multiple);assert.ok(checkActivityAnswer(multiple,JSON.stringify(['Photo identification','Order number'])));assert.ok(!checkActivityAnswer(multiple,JSON.stringify(['Order number','Printed delivery invoice'])));
 const plan=task('band4-mock-ielts-listening',0);assert.ok(plan.visual.src.endsWith('recovery-gt-plan.svg'));assert.equal(plan.questions.filter(q=>q.id.startsWith('plan-')).length,3);
});
test('long-turn teaching includes developed original models, preparation, audio and no invented spoken word minimum',()=>{
 const {countWords}=require('../src/lib/courseActivity.ts');
 for(const id of ['band2-speaking-cue-card','band2-speaking-describe','band4-speaking-storytelling']){
  const t=task(id,1);assert.ok(countWords(t.model)>280);assert.equal(t.preparationSeconds,60);assert.equal(t.seconds,120);assert.ok(t.modelAudio);assert.ok(t.analysis.includes('no official spoken-word minimum'));
 }
 assert.equal(task('band2-speaking-describe',0).seconds,45);
});
test('vocabulary transfer requires retrieval and final GT modules have distinct outcomes and models',()=>{
 for(const id of ['band4-writing-lexical-resource','band4-vocab-awl4','band4-vocab-science','band4-vocab-globalization'])for(const stage of [1,2]){
  const t=task(id,stage);assert.ok(t.questions.some(q=>!q.options&&!q.prompt.startsWith('Arrange')&&!q.prompt.startsWith('What')&&!q.prompt.startsWith('Which')));
 }
 for(const stage of [0,1,2])assert.notEqual(task('band4-exam-day-strategies',stage).model,task('band4-review',stage).model);
 assert.ok(task('band4-review',1).instructions.includes('Listening, Reading, Writing and Speaking'));
});
test('catalogue and server registry agree after unused historical declarations are removed',()=>{
 const {levels}=require('../src/data/content.ts');const {courseCatalogue}=require('../src/data/course-catalogue.ts');
 for(const [i,course] of levels.entries()){
  assert.equal(course.intro,courseCatalogue[i].intro);assert.deepEqual(course.lessons.map(l=>[l.id,l.title,l.xpReward]),courseCatalogue[i].lessons.map(l=>[l.id,l.title,l.xpReward]));
 }
 const fs=require('node:fs');const source=fs.readFileSync(require.resolve('../src/data/content.ts'),'utf8');assert.ok(!/const band[23]Lesson\d+:/.test(source));
});

test('TOEFL detail distractors match the question type and the old irrelevant cross-stage templates are gone',()=>{
 for(const e of courseActivities.filter(e=>e.data.exam==='TOEFL iBT 2026'))for(const t of e.data.tasks)for(const q of t.questions||[]){
  assert.ok(!q.options?.includes('Yes, I can swim.'));assert.ok(!q.options?.includes('Friday is my favourite colour.'));
  if(q.reviewId==='EC-03-detail')assert.ok(!q.options.includes('Not stated in the passage'));
 }
});

test('resume advances from a completed later module before wrapping to earlier unfinished work',()=>{
 const {resumeModule}=require('../src/lib/courseProgress.ts');
 const modules={six:{stages:{},legacyPractice:true,lastActiveAt:'2026-10-27'}};
 assert.equal(resumeModule(['one','two','six','seven','eight'],modules,{}),'seven');
});

test('accessible-study review survives refresh without requiring an unperformed recording attestation',()=>{
 const {STUDY_REVIEW_CRITERIA,initialAttempt,restoreAttempt}=require('../src/lib/activityState.ts');
 const t=task('band3-speaking-part3',0);const state={...initialAttempt(t),alternative:true,studyNotes:'I will compare the complete sentence wording and plan a suitable follow-up.',submitted:true,checks:STUDY_REVIEW_CRITERIA};
 const restored=restoreAttempt(t,JSON.stringify(state),null);assert.deepEqual(restored.checks,STUDY_REVIEW_CRITERIA);
 assert.ok(!STUDY_REVIEW_CRITERIA.some(item=>/I replayed|my pronunciation|I recorded/.test(item)));
});

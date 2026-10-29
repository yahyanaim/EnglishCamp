require('./register.cjs');
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const contract=require('./fixtures/curriculum-reconstruction-contract.json');
const depth=require('./fixtures/course-depth-contract.json');
const uiProportions=require('./fixtures/ui-proportions-contract.json');
const mobileLayout=require('./fixtures/mobile-layout-contract.json');
const narration=require('./fixtures/natural-narration-contract.json');
const enrichment=require('./fixtures/course-enrichment-contract.json');
const principles=require('./fixtures/lesson-principles-contract.json');
const {courseActivities}=require('../src/data/course-activities.ts');
const {levels}=require('../src/data/content.ts');
const {courseInstruction}=require('../src/data/course-instruction/index.ts');
const {getModuleData}=require('../src/lib/courseData.ts');
const {exercises}=require('../src/data/exercises.ts');
const {taskSignature,attemptKey,restoreAttempt,initialAttempt}=require('../src/lib/activityState.ts');
const {checkActivityAnswer,countWords}=require('../src/lib/courseActivity.ts');
const activity=id=>courseActivities.find(a=>a.lessonId===id);
const task=(id,s)=>activity(id).data.tasks[s-1];
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');

test('curriculum revisions preserve all course/module identifiers, ordering, XP and activity IDs',()=>{
 assert.deepEqual(levels.map(c=>({id:c.id,lessons:c.lessons.map(l=>({id:l.id,xpReward:l.xpReward}))})),contract.coursesBefore);
 assert.deepEqual(courseActivities.map(a=>[a.id,a.lessonId,a.type,a.xpReward,a.data.tasks.map(t=>[t.id,t.kind,(t.questions||[]).map(q=>q.id)])]),contract.activitiesBefore.map(a=>[a.id,a.lessonId,a.type,a.xpReward,a.data.tasks.map(t=>[t.id,t.kind,(t.questions||[]).map(q=>q.id)])]));
});
test('protected production files remain identical except the reviewed UI, narration and additive teaching integration',()=>{
 assert.deepEqual(Object.keys(uiProportions).sort(),['src/app/vocabulary/page.tsx','src/components/course/CourseOverview.tsx','src/components/course/ModuleExperience.tsx']);
 assert.deepEqual(Object.keys(mobileLayout).sort(),["src/app/dashboard/page.tsx","src/app/mock-exam/page.tsx","src/app/practice/page.tsx","src/app/writing/page.tsx","src/components/dashboard/XPBar.tsx","src/components/layout/LayoutShell.tsx","src/components/layout/MobileBottomNav.tsx","src/components/layout/Sidebar.tsx","src/components/layout/TopBar.tsx","src/components/learn/SpeedMatch.tsx","src/components/learn/WordSearch.tsx"]);
 assert.equal(narration.clips.length,99);
 assert.deepEqual(Object.keys(narration.files).sort(),[...narration.clips.map(c=>c.path),'public/media/courses/audio-manifest.json','src/components/exercises/CourseActivity.tsx'].sort());
 const reviewedUI={...uiProportions,...mobileLayout,...narration.files};
 for(const [name,delta]of Object.entries(reviewedUI)){assert.equal(delta.before,contract.protectedFiles[name],name+' original boundary');assert.notEqual(delta.after,delta.before,name+' reviewed UI delta');}
 assert.deepEqual(Object.keys(enrichment.integration).sort(),['src/components/course/ModuleExperience.tsx','src/components/exercises/CourseActivity.tsx','src/lib/courseData.ts']);
 for(const [name,delta]of Object.entries(enrichment.integration)){assert.equal(delta.before,reviewedUI[name]?.after??contract.protectedFiles[name],name+' prior boundary');assert.notEqual(delta.after,delta.before);}
 const prior={...reviewedUI,...enrichment.integration};
 assert.deepEqual(Object.keys(principles.integration).sort(),['src/components/course/ModuleExperience.tsx']);
 for(const [name,delta]of Object.entries(principles.integration)){assert.equal(delta.before,prior[name]?.after??contract.protectedFiles[name],name+' principle boundary');assert.notEqual(delta.after,delta.before);}
 const reviewedAll={...prior,...principles.integration};
 for(const [name,expected]of Object.entries(contract.protectedFiles))assert.equal(hash(fs.readFileSync(path.join(__dirname,'..',name))),reviewedAll[name]?.after??expected,name);
});
test('three lessons classified strong and their complete activities remain exactly preserved',()=>{
 for(const old of contract.strong){assert.deepEqual(getModuleData(old.lesson.id).lesson,old.lesson);assert.deepEqual(activity(old.lesson.id),old.activity);}
});
test('every live task delta has a reviewed version policy; valid compatibility is field-limited',()=>{
 const changes=new Map(contract.changes.map(x=>[x.taskId,x]));let touched=0;
 for(const oldA of contract.activitiesBefore){const current=activity(oldA.lessonId);
  for(let i=0;i<3;i++){
   const before=oldA.data.tasks[i],after=current.data.tasks[i],delta=changes.get(after.id);
   if(!delta){assert.deepEqual(after,before);continue;}touched++;
   assert.equal(delta.beforeSignature,taskSignature(before));
   if(delta.policy==='versioned'){
    assert.equal(after.contentVersion,(before.contentVersion??1)+1);
    assert.equal(after.compatibleWithSignature,undefined);
    assert.notEqual(taskSignature(after),taskSignature(before));
   }else{
    assert.equal(taskSignature(after),taskSignature(before));
    const a=structuredClone(after),b=structuredClone(before);
    for(const key of ['compatibleWithSignature','model','analysis','rubric']){delete a[key];delete b[key];}
    for(let j=0;j<(b.questions||[]).length;j++){
     for(const accepted of b.questions[j].answers)assert.ok(a.questions[j].answers.includes(accepted),after.id);
     for(const key of ['explanation']){delete a.questions[j][key];delete b.questions[j][key];}
     if(after.id==='band4-vocab-globalization-stage-2'&&j===0){for(const key of ['answers','evidence']){delete a.questions[j][key];delete b.questions[j][key];}}
    }
    assert.deepEqual(a,b,after.id);
   }
   assert.deepEqual(after.audio,before.audio,after.id+' audio');
   assert.deepEqual(after.spokenItems,before.spokenItems,after.id+' spoken prompts');
  }
 }
 assert.equal(touched,contract.changes.length);
});
test('new task versions isolate old answers while keeping old stored drafts and historical XP',()=>{
 const old=contract.activitiesBefore.find(a=>a.lessonId==='band3-writing-multiple-charts');const current=activity(old.lessonId);
 const oldKey=attemptKey(old.id,old.data.tasks[0]),newKey=attemptKey(current.id,current.data.tasks[0]);
 const saved={...initialAttempt(old.data.tasks[0]),text:'A valuable earlier draft',submitted:true};localStorage.setItem(oldKey,JSON.stringify(saved));
 assert.notEqual(oldKey,newKey);assert.equal(localStorage.getItem(newKey),null);assert.equal(JSON.parse(localStorage.getItem(oldKey)).text,'A valuable earlier draft');
 assert.equal(restoreAttempt(current.data.tasks[0],localStorage.getItem(newKey),null).submitted,false);
 const {useProgress}=require('../src/store/useProgress.ts');const {cycleComplete,hasModuleCredit}=require('../src/lib/courseProgress.ts');
 useProgress.getState().reset();useProgress.getState().registerContent(old.lessonId,old.data.tasks.map(taskSignature));
 for(let i=0;i<3;i++)useProgress.getState().finishStage(old.lessonId,i,{kind:'writing',outcome:'self-reviewed',signature:taskSignature(old.data.tasks[i])},50);
 const earned=useProgress.getState().xp;assert.ok(cycleComplete(useProgress.getState().modules[old.lessonId]));
 useProgress.getState().registerContent(old.lessonId,current.data.tasks.map(taskSignature));
 const state=useProgress.getState();assert.equal(state.xp,earned);assert.ok(!cycleComplete(state.modules[old.lessonId]));assert.ok(hasModuleCredit(old.lessonId,state.modules,state.lessons));
});
test('compatible writing feedback preserves the existing draft key and serialized response',()=>{
 const old=contract.activitiesBefore.find(a=>a.lessonId==='band1-writing-task1-overview').data.tasks[0];const current=task('band1-writing-task1-overview',1);
 assert.equal(attemptKey('activity-band1-writing-task1-overview',current),attemptKey('activity-band1-writing-task1-overview',old));
 const saved={...initialAttempt(old),text:'My unfinished practical-course paragraph',previous:'A previous revision',remaining:93};
 const restored=restoreAttempt(current,JSON.stringify(saved),null);assert.equal(restored.text,saved.text);assert.equal(restored.previous,saved.previous);assert.equal(restored.remaining,93);
});
test('all optional drills survive after restoring the explicitly reviewed activity deltas',()=>{
 const before=new Map(contract.activitiesBefore.map(a=>[a.id,a]));
 const historical=new Map([depth.wordFormationBefore,...depth.planningActivitiesBefore].map(a=>[a.id,a]));
 assert.equal(hash(JSON.stringify(exercises.map(e=>historical.get(e.id)||before.get(e.id)||e))),depth.exercisesSha256);
});
test('all authored keys pass their actual validators and all writing models meet their stated local limits',()=>{
 for(const a of courseActivities)for(const t of a.data.tasks){
  for(const q of t.questions||[]){
   if(q.selectCount)assert.ok(checkActivityAnswer(q,JSON.stringify(q.answers)),t.id);
   else for(const answer of q.answers)assert.ok(checkActivityAnswer(q,answer),t.id+' '+q.id+' '+answer);
   if(q.options)for(const answer of q.answers)assert.ok(q.options.includes(answer),t.id+' option');
  }
  if(t.kind==='writing'){assert.ok(countWords(t.model)>=t.minWords,t.id+' model below local minimum');if(t.maxWords)assert.ok(countWords(t.model)<=t.maxWords,t.id+' model above maximum');}
 }
});
test('specific moderated errors now have uniquely supported demands or accepted alternatives',()=>{
 const date=task('band3-listening-section3',2).questions[1];assert.match(date.prompt,/explicitly confirms/);assert.match(date.explanation,/could be appropriate in another conversation/);
 const word=task('band3-reading-summary-completion',1).questions[0];assert.ok(checkActivityAnswer(word,'opportunity'));assert.ok(!checkActivityAnswer(word,'tunity'));
 const chapter=JSON.stringify(courseInstruction['band3-reading-summary-completion']);assert.match(chapter,/enter careful/);assert.ok(!chapter.includes('then enter ul, not careful'));
 assert.match(chapter,/Optional short drills keep their own explicit input rules/);
 const endingDrill=exercises.find(e=>e.id==='ex-band3-reading-summary-completion-content-01');assert.equal(endingDrill.data.answer,'e');assert.match(endingDrill.prompt,/Missing letters only/);
 const cost=task('band4-vocab-globalization',2).questions[0];assert.ok(checkActivityAnswer(cost,'breakages'));assert.ok(checkActivityAnswer(cost,'staff time'));assert.ok(!checkActivityAnswer(cost,'visitor totals'));
 assert.match(task('band4-writing-lexical-resource',2).questions[6].prompt,/not final/);assert.ok(!task('band4-writing-lexical-resource',2).questions[6].prompt.includes('based on observation'));
 assert.match(task('band2-mistakes-prepositions',2).instructions,/per item/);
 const discussion=task('band3-writing-multiple-charts',1);assert.equal(discussion.taskFamily,'discussion');assert.match(discussion.instructions,/Professor:/);
});
test('judgement sets include supported agreement, contradiction and missing information without the previous repeated pair',()=>{
 for(const id of ['band2-reading-tfng','band4-reading-writers-views']){
  const labels=activity(id).data.tasks.flatMap(t=>t.questions.filter(q=>q.options?.includes('NOT GIVEN')).map(q=>q.answers[0]));
  assert.ok(labels.includes(id.startsWith('band2')?'TRUE':'YES'));assert.ok(labels.includes(id.startsWith('band2')?'FALSE':'NO'));assert.ok(labels.includes('NOT GIVEN'));
 }
});
test('repetition reviews exact heard wording; solo interview rubrics do not demand a partner',()=>{
 for(const id of ['band3-speaking-part3','band3-speaking-toefl4'])for(const t of activity(id).data.tasks){assert.match(t.rubric.join(' '),/omissions, substitutions/);assert.ok(!t.rubric.join(' ').includes('specific reason or example'));}
 for(const t of activity('band1-speaking-part1-intro').data.tasks)assert.ok(!t.rubric.join(' ').includes('invite'));
 for(const a of courseActivities)for(const t of a.data.tasks)assert.ok(!(t.model||'').includes('A useful comparison should remain focused on the task'));
});

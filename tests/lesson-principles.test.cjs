require('./register.cjs');
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const {courseCatalogue}=require('../src/data/course-catalogue.ts');
const {lessonPrinciples}=require('../src/data/lesson-principles/index.ts');
const {lessonRuleMaps}=require('../src/data/lesson-principles/maps/index.ts');
const {getModuleData}=require('../src/lib/courseData.ts');
const {LessonPrinciple}=require('../src/components/course/LessonPrinciple.tsx');
const {LessonRuleMindMap}=require('../src/components/course/LessonRuleMindMap.tsx');

test('all 100 live lessons have original concept explanations and examples, selected server-side for both routes',()=>{
 const ids=courseCatalogue.flatMap(course=>course.lessons.map(lesson=>lesson.id));
 assert.equal(ids.length,100);
 assert.deepEqual(Object.keys(lessonPrinciples).sort(),ids.slice().sort());
 for(const field of ['title','statement','explanation','example','interpretation']){
  assert.equal(new Set(Object.values(lessonPrinciples).map(item=>item[field])).size,100,field+' must be specific');
 }
 for(const course of courseCatalogue)for(const lesson of course.lessons){
  const item=lessonPrinciples[lesson.id];
  for(const field of ['title','statement','explanation','example','interpretation'])assert.ok(item[field]?.trim().length>15,lesson.id+' '+field);
  assert.deepEqual(getModuleData(lesson.id,course.id).enrichment.principle,item);
  assert.deepEqual(getModuleData(lesson.id).enrichment.principle,item);
  const html=renderToStaticMarkup(React.createElement(LessonPrinciple,{principle:item}));
  assert.match(html,/id="lesson-principle"/);assert.match(html,/Lesson rule mind map/);
  assert.match(html,/What it means:/);assert.match(html,/<details[^>]*>/);assert.ok(!html.includes('<details open'));
  assert.ok(html.indexOf('<figure')<html.indexOf('<details'));
  assert.deepEqual(item.ruleMap,lessonRuleMaps[lesson.id]);
  // Each field is actually rendered, including punctuation escaped by React.
  for(const value of Object.values(item).filter(v=>typeof v==='string'))assert.ok(html.includes(renderToStaticMarkup(React.createElement(React.Fragment,null,value))),lesson.id);
 }
});

test('every lesson has its own visible rule diagram with three specific branches and examples',()=>{
 const ids=courseCatalogue.flatMap(course=>course.lessons.map(lesson=>lesson.id));
 assert.deepEqual(Object.keys(lessonRuleMaps).sort(),ids.slice().sort());
 assert.equal(new Set(Object.values(lessonRuleMaps).map(map=>map.root)).size,100);
 assert.equal(new Set(Object.values(lessonRuleMaps).map(map=>JSON.stringify(map.branches))).size,100);
 for(const id of ids){
  const map=lessonRuleMaps[id];assert.equal(map.branches.length,3);
  const html=renderToStaticMarkup(React.createElement(LessonRuleMindMap,{map,statement:lessonPrinciples[id].statement}));
  assert.match(html,/<figure aria-label="Lesson rule:/);assert.match(html,/<figcaption/);
  assert.equal((html.match(/<h4 /g)||[]).length,3);
  assert.match(html,/aria-hidden="true"/);assert.ok(!html.includes('<details'));
  for(const branch of map.branches){
   for(const field of ['label','rule','example']){
    assert.ok(branch[field].trim().length>=(field==='label'?3:15),id+' '+field);
    assert.ok(html.includes(renderToStaticMarkup(React.createElement(React.Fragment,null,branch[field]))),id+' '+field);
   }
  }
 }
 const concession=lessonRuleMaps['band1-ielts-intro'];assert.match(concession.branches[0].rule,/tensed verb/);assert.match(concession.branches[1].rule,/noun phrase.*-ing/);
 const numbers=lessonRuleMaps['band2-mistakes-prepositions'];assert.match(numbers.branches[2].example,/30 people.*50%.*60/);
 const repeat=lessonRuleMaps['band3-speaking-part3'];assert.match(repeat.branches[2].rule,/paraphrase/);
 const participle=lessonRuleMaps['band4-grammar-participles'];assert.match(participle.branches[0].rule,/main subject/);assert.match(participle.branches[2].example,/Noor checked first/);
});

test('meaning-sensitive principles preserve numerical, grammatical and task distinctions',()=>{
 const p=id=>lessonPrinciples[id];
 assert.match(p('band1-ielts-intro').explanation,/Despite the fact that/);
 assert.match(p('band1-ielts-vs-toefl').explanation,/does not itself establish completion/);
 assert.match(p('band2-writing-bar-pie').example,/10 percentage points.*25%/);
 assert.match(p('band2-mistakes-prepositions').example,/60 to 90.*by 30.*50%/);
 assert.match(p('band2-vocab-collocations').interpretation,/900 ÷ 300 = 3.*600/);
 assert.match(p('band2-reading-tfng').explanation,/TRUE\/FALSE.*YES\/NO.*NOT GIVEN/);
 assert.match(p('band2-writing-letter').explanation,/not a blanket rule/);
 assert.match(p('band3-speaking-part3').statement,/reproduction.*rather than a paraphrase/);
 assert.match(p('band4-grammar-participles').statement,/shared/);
 assert.match(p('band4-grammar-participles').interpretation,/Noor.*checking precedes/);
 assert.match(p('band4-vocab-science').interpretation,/separate question/);
 assert.match(p('band4-mock-toefl-reading').explanation,/General Training/);
});

test('lesson-specific diagrams recap the teaching before practice without importing the full map registry into client components',()=>{
 const module=fs.readFileSync(path.join(__dirname,'../src/components/course/ModuleExperience.tsx'),'utf8');
 const overview=fs.readFileSync(path.join(__dirname,'../src/components/course/CourseOverview.tsx'),'utf8');
 assert.ok(module.indexOf('<CourseVideoLesson')<module.indexOf('<IllustratedLessonContent'));
 assert.ok(module.indexOf('<CourseEnrichment key=')<module.indexOf('<LessonPrinciple'));
 assert.ok(module.indexOf('<LessonPrinciple')<module.indexOf('</details>\n    <section id="practice"'));
 assert.match(module,/href="#lesson-principle"/);
 assert.match(module,/Jump to the visual explanation/);
 assert.match(module,/!enrichment.teachingDiagram/);
 assert.ok(!module.includes('CourseMindMap'));assert.ok(!overview.includes('CourseMindMap'));
 assert.ok(!module.includes('lesson-principles/index'));
 const component=fs.readFileSync(path.join(__dirname,'../src/components/course/LessonPrinciple.tsx'),'utf8');
 assert.match(component,/<LessonRuleMindMap map=\{principle.ruleMap\}/);
 assert.ok(!component.includes('maps/index'));
 const diagram=fs.readFileSync(path.join(__dirname,'../src/components/course/LessonRuleMindMap.tsx'),'utf8');
 assert.ok(!diagram.includes('maps/index'));assert.ok(!diagram.includes('course-catalogue'));
});

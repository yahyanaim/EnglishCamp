require('./register.cjs');
const {test}=require('node:test');
const assert=require('node:assert/strict');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const {teachingDiagrams}=require('../src/data/teaching-diagrams/index.ts');
const {getModuleData}=require('../src/lib/courseData.ts');
const {courseCatalogue}=require('../src/data/course-catalogue.ts');
const {IllustratedLessonContent}=require('../src/components/course/IllustratedLessonContent.tsx');
const {LessonTeachingDiagram}=require('../src/components/course/LessonTeachingDiagram.tsx');

test('all 100 lessons select a subject-specific illustration on both routes with an unambiguous inline anchor',()=>{
 assert.deepEqual(Object.keys(teachingDiagrams).sort(),courseCatalogue.flatMap(c=>c.lessons.map(l=>l.id)).sort());
 assert.equal(Object.values(teachingDiagrams).filter(d=>d.kind==='concept').length,97);
 assert.equal(new Set(Object.values(teachingDiagrams).filter(d=>d.visual).map(d=>JSON.stringify(d.visual))).size,97);
 assert.equal(new Set(Object.values(teachingDiagrams).map(d=>d.kind)).size,4);
 for(const course of courseCatalogue)for(const lesson of course.lessons){
  const data=getModuleData(lesson.id,course.id);const diagram=teachingDiagrams[lesson.id];
  assert.deepEqual(data.enrichment.teachingDiagram,diagram);
  assert.deepEqual(getModuleData(lesson.id).enrichment.teachingDiagram,diagram);
  if(!diagram)continue;
  const matches=data.lesson.blocks.filter(b=>b.kind==='callout'&&b.title===diagram.placement.heading);
  assert.equal(matches.length,1,lesson.id);
  const html=renderToStaticMarkup(React.createElement(IllustratedLessonContent,{blocks:data.lesson.blocks,diagram}));
  assert.equal((html.match(/id="lesson-principle"/g)||[]).length,1);
  const anchor=html.indexOf(diagram.placement.heading),figure=html.indexOf('id="lesson-principle"');
  assert.ok(diagram.placement.relation==='before'?figure<anchor:figure>anchor,lesson.id);
  if(diagram.placement.relation==='after-section'){
   const at=data.lesson.blocks.findIndex(b=>b.kind==='callout'&&b.title===diagram.placement.heading);
   const next=data.lesson.blocks.slice(at+1).find(b=>b.kind==='callout');
   for(const block of data.lesson.blocks.slice(at+1)){
    if(block.kind==='callout')break;
    if(block.kind==='p')assert.ok(html.indexOf(renderToStaticMarkup(React.createElement(React.Fragment,null,block.text)),anchor)<figure,lesson.id+' after full explanation');
   }
   if(next)assert.ok(figure<html.indexOf(renderToStaticMarkup(React.createElement(React.Fragment,null,next.title)),anchor+diagram.placement.heading.length),lesson.id+' before next teaching section');
  }
  // Render every original block in order, with no teaching replaced by a diagram.
  let previous=-1;
  for(const block of data.lesson.blocks){
   const content=block.kind==='callout'?block.title:block.kind==='p'?block.text:null;
   if(!content)continue;
   const escaped=renderToStaticMarkup(React.createElement(React.Fragment,null,content));
   const index=html.indexOf(escaped,previous+1);assert.ok(index>previous,lesson.id+' '+content.slice(0,30));previous=index;
  }
 }
});

test('all illustrations have responsive versions and complete alternatives, with no external image dependencies',()=>{
 for(const diagram of Object.values(teachingDiagrams)){
  const html=renderToStaticMarkup(React.createElement(LessonTeachingDiagram,{diagram}));
  assert.equal((html.match(/<svg /g)||[]).length,2);
  assert.equal((html.match(/role="img"/g)||[]).length,2);
  assert.equal((html.match(/<desc /g)||[]).length,2);
  assert.equal((html.match(/<title /g)||[]).length,2);
  assert.match(html,/md:hidden/);assert.match(html,/hidden md:block/);
  assert.ok(!html.includes('<image'));assert.ok(!html.includes('<iframe'));
  assert.ok(html.includes(diagram.takeaway.replace(/'/g,'&#x27;')));
 }
});

test('new diagram examples preserve word roles, completion limits, article scope and sound-based choice',()=>{
 const word=renderToStaticMarkup(React.createElement(LessonTeachingDiagram,{diagram:teachingDiagrams['band1-toefl-intro']}));
 for(const expression of ['success','succeed','successful','successfully','noun','verb','adjective','adverb'])assert.ok(word.includes(expression));
 assert.match(word,/The project is successful/);
 const tense=renderToStaticMarkup(React.createElement(LessonTeachingDiagram,{diagram:teachingDiagrams['band1-ielts-vs-toefl']}));
 assert.match(tense,/two doors/);assert.match(tense,/since nine/);assert.match(tense,/has just stopped/);assert.match(tense,/does not establish how many/);
 const articles=renderToStaticMarkup(React.createElement(LessonTeachingDiagram,{diagram:teachingDiagrams['band1-grammar-articles']}));
 for(const expression of ['a university','an hour','another determiner','common patterns','General meaning','Advice helps.'])assert.ok(articles.includes(expression));
 assert.match(articles,/One singular/);assert.match(articles,/countable item/);
});


test('lesson-specific structures carry valid relationships, complete branches and bounded numerical examples',()=>{
 const layouts=new Set();
 for(const [id,d] of Object.entries(teachingDiagrams)){
  if(!d.visual)continue;const v=d.visual;layouts.add(v.layout);
  const checkNode=n=>{assert.ok(n.label.trim(),id);assert.ok(n.detail.trim(),id);};
  if(v.layout==='flow'){assert.ok(v.nodes.length>=2&&v.nodes.length<=4,id);assert.equal(v.links.length,v.nodes.length-1,id);v.nodes.forEach(checkNode);v.links.forEach(l=>assert.ok(l.trim(),id));}
  if(v.layout==='sentence'){assert.ok(v.from>=0&&v.to<v.parts.length&&v.from!==v.to,id);v.parts.forEach(checkNode);}
  if(v.layout==='evidence'){assert.equal(v.outcomes.length,3,id);checkNode(v.source);v.outcomes.forEach(checkNode);}
  if(v.layout==='cycle'){assert.equal(v.nodes.length,4,id);v.nodes.forEach(checkNode);}
  if(v.layout==='decision'){assert.equal(v.results.length,3,id);v.results.forEach(checkNode);assert.ok(v.question&&v.nextQuestion,id);}
  if(v.layout==='sound'){v.prominent.forEach(i=>assert.ok(i>=0&&i<v.tokens.length,id));}
  if(v.layout==='chart'){assert.match(v.unit,/Fictional/i,id);v.bars.forEach(b=>assert.ok(Number.isFinite(b.value)&&b.value>=0,id));if(v.unit.includes('%'))v.bars.forEach(b=>assert.ok(b.value<=100,id));}
  if(v.layout==='causal'){checkNode(v.factor);checkNode(v.first);checkNode(v.second);}
 }
 assert.equal(layouts.size,11);
 const share=teachingDiagrams['band2-writing-bar-pie'].visual;
 assert.deepEqual(share.bars.map(b=>b.value),[40,50]);assert.match(share.annotation,/10 percentage points/);assert.match(share.annotation,/25% relative/);
 const evidence=teachingDiagrams['band2-reading-mcq'].visual;
 assert.equal(evidence.outcomes[2].label,'Not established');
 assert.match(teachingDiagrams['band2-reading-tfng'].takeaway,/every class costs £20/);
 assert.match(teachingDiagrams['band2-reading-tfng'].takeaway,/no information about weekend/);
 assert.match(teachingDiagrams['band3-speaking-part3'].takeaway,/heard wording/);
 const conditional=teachingDiagrams['band3-grammar-conditionals'].visual;
 assert.equal(conditional.nodes.length,2);assert.match(conditional.nodes[1].detail,/can join/i);
 for(const id of ['band2-vocab-environment','band3-vocab-health']){
  const html=renderToStaticMarkup(React.createElement(LessonTeachingDiagram,{diagram:teachingDiagrams[id]}));
  assert.match(html,/may affect/);assert.match(html,/hypothetical/);assert.match(html,/not an established finding/);
 }
});

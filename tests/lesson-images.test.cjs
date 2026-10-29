require('./register.cjs');
const {test}=require('node:test');const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const React=require('react'),{renderToStaticMarkup:render}=require('react-dom/server');
const {lessonImages}=require('../src/data/lesson-images');
const {lessonImageAssets}=require('../src/data/lesson-images/assets');
const {courseCatalogue}=require('../src/data/course-catalogue');
const {getModuleData}=require('../src/lib/courseData');
const {IllustratedLessonContent}=require('../src/components/course/IllustratedLessonContent');
const {LessonImageExplanation}=require('../src/components/course/LessonImageExplanation');
const {CourseEnrichment}=require('../src/components/course/CourseEnrichment');
const root=path.join(__dirname,'..'),escape=s=>render(React.createElement(React.Fragment,null,s));

test('all 100 lessons select explicitly placed internet images with distinct teaching prompts on both routes',()=>{
 const ids=courseCatalogue.flatMap(c=>c.lessons.map(l=>l.id));
 assert.deepEqual(Object.keys(lessonImages).sort(),ids.sort());
 assert.equal(new Set(Object.values(lessonImages).map(x=>x.prompt)).size,100);
 assert.equal(new Set(Object.values(lessonImages).map(x=>x.explanation)).size,100);
 assert.equal(Object.values(lessonImages).flatMap(x=>x.images).length,102);
 for(const course of courseCatalogue)for(const lesson of course.lessons){
  const selected=lessonImages[lesson.id],data=getModuleData(lesson.id,course.id);
  assert.deepEqual(data.enrichment.inlineImages,selected,lesson.id);
  assert.deepEqual(getModuleData(lesson.id).enrichment.inlineImages,selected,lesson.id);
  const anchors=data.lesson.blocks.filter(b=>b.kind==='callout'&&b.title===selected.placement.heading);
  assert.equal(anchors.length,1,lesson.id+' exact placement');
  for(const field of ['title','introduction','prompt','explanation'])assert.ok(selected[field].trim().length>20,lesson.id+' '+field);
 }
});

test('every image has verifiable local bytes, actual dimensions, creator, source and reusable licence',()=>{
 const manifest=require('../public/media/courses/lesson-images/manifest.json');assert.equal(manifest.length,35);
 const used=new Set(Object.values(lessonImages).flatMap(x=>x.images.map(i=>i.src)));
 assert.deepEqual(used,new Set(Object.values(lessonImageAssets).map(i=>i.src)));
 function jpegSize(b){let n=2;while(n<b.length){assert.equal(b[n],255);const marker=b[n+1];n+=2;if(marker===0xda||marker===0xd9)break;const length=b.readUInt16BE(n);if([0xc0,0xc1,0xc2].includes(marker))return {height:b.readUInt16BE(n+3),width:b.readUInt16BE(n+5)};n+=length;}throw Error('JPEG dimensions missing');}
 for(const [key,image]of Object.entries(lessonImageAssets)){
  const entry=manifest.find(m=>m.key===key);assert.ok(entry,key);
  const bytes=fs.readFileSync(path.join(root,'public',image.src));assert.equal(bytes.length,entry.bytes,key);
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),entry.sha256,key);
  assert.match(image.src,/^\/media\/courses\/(lesson-images|sourced)\/[a-z-]+\.(jpg|png)$/);
  for(const field of ['title','creator','source','license','licenseUrl','changes'])assert.ok(image[field]?.trim(),key+' '+field);
  for(const field of ['source','licenseUrl'])assert.match(image[field],/^https:\/\//);
  assert.match(image.license,/^(CC BY|CC0|Public domain|NASA\/JPL)/,key);
  assert.ok(image.alt.length>=80&&image.caption.length>=70,key+' meaningful alternatives');
  assert.ok(image.width>=600&&image.height>=300,key+' usable resolution');
  const actual=image.src.endsWith('.png')?{width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20)}:jpegSize(bytes);
  assert.deepEqual(actual,{width:image.width,height:image.height},key);
 }
});

test('inline images follow their full explanation, retain every original block, and do not duplicate the old end-of-lesson gallery',()=>{
 for(const course of courseCatalogue)for(const lesson of course.lessons){
  const {lesson:teaching,enrichment:e}=getModuleData(lesson.id,course.id),images=e.inlineImages;
  const html=render(React.createElement(IllustratedLessonContent,{blocks:teaching.blocks,diagram:e.teachingDiagram,images}));
  const at=html.indexOf('id="lesson-images"'),anchor=html.indexOf(escape(images.placement.heading));
  assert.equal((html.match(/id="lesson-images"/g)||[]).length,1,lesson.id);assert.ok(at>anchor,lesson.id);
  assert.equal((html.match(/id="lesson-principle"/g)||[]).length,1,lesson.id+' retain approved diagram');
  const anchorBlock=teaching.blocks.findIndex(b=>b.kind==='callout'&&b.title===images.placement.heading);
  let next;
  for(const block of teaching.blocks.slice(anchorBlock+1)){
   if(block.kind==='callout'){next=block;break;}
   if(block.kind==='p')assert.ok(html.indexOf(escape(block.text),anchor)<at,lesson.id+' image follows explanation');
  }
  if(next)assert.ok(at<html.indexOf(escape(next.title),anchor+images.placement.heading.length),lesson.id+' image before next application');
  let previous=-1;
  for(const block of teaching.blocks){const value=block.kind==='callout'?block.title:block.kind==='p'?block.text:null;if(!value)continue;const pos=html.indexOf(escape(value),previous+1);assert.ok(pos>previous,lesson.id+' preserve block order');previous=pos;}
  for(const image of images.images){assert.ok(html.includes(image.src),lesson.id);assert.ok(html.includes(image.source));assert.ok(html.includes(image.licenseUrl));}
  const extra=render(React.createElement(CourseEnrichment,{content:e}));
  assert.ok(!extra.includes('<img'),lesson.id+' no duplicate legacy images');assert.match(extra,/Try a new example/);
 }
});

test('image explanations stay accessible, responsive and unscored with answers initially hidden',()=>{
 for(const entry of Object.values(lessonImages)){
  const html=render(React.createElement(LessonImageExplanation,{content:entry}));
  assert.equal((html.match(/<img /g)||[]).length,entry.images.length);
  assert.match(html,/loading="lazy"/);assert.match(html,/h-auto/);assert.match(html,/bg-white/);
  assert.match(html,/<details><summary[^>]*>Compare your explanation/);assert.ok(!html.includes('<details open'));
  assert.ok(!html.includes('<iframe')&&!html.includes('<input')&&!html.includes('<form'));
  for(const image of entry.images)assert.ok(html.includes(escape(image.alt)));
 }
});

test('real-source examples preserve time, quantity, reference and evidence boundaries',()=>{
 const text=id=>lessonImages[id].explanation;
 assert.match(text('band2-writing-bar-pie'),/no exact percentages or time comparison/);
 assert.match(text('band2-reading-tfng'),/Tuesday closed/);assert.match(text('band2-reading-tfng'),/not established/);
 assert.match(text('band2-vocab-collocations'),/900 divided by 300/);assert.match(text('band2-vocab-collocations'),/600 more/);
 assert.match(text('band2-mistakes-prepositions'),/50 per cent.*original 60/);
 assert.match(text('band3-speaking-part3'),/not exact repetition/);
 assert.match(text('band3-vocab-health'),/Neither a photograph nor a reported association establishes a causal health effect/);
 assert.match(text('band4-grammar-participles'),/oven prepared the dough/);
 assert.match(text('band4-mock-toefl-reading'),/Sunday appointments are not established/);
 assert.match(text('band4-exam-day-strategies'),/no test-centre identification/);
});

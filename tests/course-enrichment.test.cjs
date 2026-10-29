require('./register.cjs');
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const React=require('react');const {renderToStaticMarkup}=require('react-dom/server');
const {levels}=require('../src/data/content.ts');
const {courseActivities}=require('../src/data/course-activities.ts');
const {courseEnrichment}=require('../src/data/course-enrichment/index.ts');
const {CourseEnrichment}=require('../src/components/course/CourseEnrichment.tsx');
const {CourseVideoLesson}=require('../src/components/course/CourseVideoLesson.tsx');
const {videoCatalogue}=require('../src/data/course-enrichment/video-catalogue.ts');
const {getModuleData}=require('../src/lib/courseData.ts');
const {taskSignature}=require('../src/lib/activityState.ts');
const contract=require('./fixtures/course-enrichment-contract.json');
const principles=require('./fixtures/lesson-principles-contract.json');
const root=path.join(__dirname,'..');

test('all 100 live modules have distinct additive examples, complete tables and new transfer checks on both routes',()=>{
 const ids=levels.flatMap(c=>c.lessons.map(l=>l.id));
 assert.deepEqual(Object.keys(courseEnrichment).sort(),ids.slice().sort());
 assert.equal(new Set(Object.values(courseEnrichment).map(e=>e.context)).size,100);
 assert.equal(new Set(Object.values(courseEnrichment).map(e=>e.transfer.prompt)).size,100);
 for(const course of levels)for(const lesson of course.lessons){
  const item=courseEnrichment[lesson.id];
  for(const field of ['title','context','before','after','reasoning'])assert.ok(item[field]?.trim(),lesson.id+' '+field);
  assert.notEqual(item.before,item.after,lesson.id);
  assert.ok(item.rows.length>=3&&item.rows.every(r=>r.length===3&&r.every(x=>x.trim())),lesson.id);
  assert.ok(item.transfer.prompt&&item.transfer.answer,lesson.id);
  assert.deepEqual(getModuleData(lesson.id,course.id).enrichment,item);
  assert.deepEqual(getModuleData(lesson.id).enrichment,item);
  const html=renderToStaticMarkup(React.createElement(CourseEnrichment,{content:item}));
  assert.match(html,/<table/);assert.match(html,/Try a new example/);
  assert.match(html,/<details><summary[^>]*>Compare your reasoning after trying/);
  assert.ok(!html.includes('<details open'),lesson.id+' answer should start collapsed');
 }
});

test('teaching-only additions preserve all original lessons, activities, saved-attempt fingerprints and narration bytes',()=>{
 const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
 for(const [name,expected]of Object.entries(contract.preserved))assert.equal(hash(fs.readFileSync(path.join(root,name))),principles.integration[name]?.after??contract.integration[name]?.after??expected,name);
 assert.deepEqual(Object.fromEntries(courseActivities.flatMap(a=>a.data.tasks.map(t=>[t.id,taskSignature(t)]))),contract.signatures);
});

test('12 new teaching diagrams have local assets, meaningful alternatives and valid dimensions',()=>{
 const visuals=Object.values(courseEnrichment).flatMap(e=>e.visual?[e.visual]:[]);
 assert.equal(visuals.length,12);assert.equal(new Set(visuals.map(v=>v.src)).size,12);
 for(const visual of visuals){
  assert.match(visual.src,/^\/media\/courses\/teaching\/[a-z-]+\.svg$/);
  const svg=fs.readFileSync(path.join(root,'public',visual.src),'utf8');
  assert.match(svg,/<title id="title">[^<]+<\/title>/);assert.match(svg,/<desc id="desc">[^<]+<\/desc>/);
  assert.ok(svg.includes(`viewBox="0 0 ${visual.width} ${visual.height}"`));
  assert.ok(visual.alt.length>60&&visual.caption.length>60);
  assert.ok(!/<(?:script|foreignObject|image)\b|https?:\/\//.test(svg.replace('http://www.w3.org/2000/svg','')));
 }
});

test('all 100 modules expose a directly rendered, non-autoplay video lesson with publisher attribution and written alternatives',()=>{
 const entries=Object.values(courseEnrichment).filter(e=>e.video);
 assert.equal(entries.length,100);assert.equal(new Set(entries.map(e=>e.video.id)).size,59);
 assert.equal(Object.keys(videoCatalogue).length,59);
 for(const item of entries){
  const v=item.video;assert.match(v.id,/^[\w-]{11}$/);assert.ok(v.start>=0);if(v.end)assert.ok(v.end>v.start);
  assert.ok(['IELTS Official','English with Cambridge','Oxford Online English','BBC Learning English','TST Prep TOEFL','IELTS Advantage','Cambridge English Spain','English Too','Fastrack IELTS','Academic English UK','Wireless Philosophy','Khan Academy','CFR Education','IELTS by IDP'].includes(v.publisher));
  for(const field of ['source','reviewed','segment','before','notice','after','alternative'])assert.ok(v[field],v.id+' '+field);
  const html=renderToStaticMarkup(React.createElement(CourseVideoLesson,{video:v}));
  assert.equal((html.match(/<iframe /g)||[]).length,1);assert.match(html,/youtube-nocookie\.com\/embed\//);
  assert.match(html,/autoplay=0/);assert.match(html,/loading="lazy"/);assert.match(html,/referrerPolicy="strict-origin-when-cross-origin"/);
  assert.ok(!html.includes('Load optional YouTube video'));assert.match(html,/Written alternative:/);
  const extra=renderToStaticMarkup(React.createElement(CourseEnrichment,{content:item}));
  assert.ok(!extra.includes('<iframe'));assert.match(extra,/href="#video-lesson"/);
 }
});

test('video associations remain topic-specific and distinguish current TOEFL task guides from transferable language support',()=>{
 const v=id=>courseEnrichment[id].video;
 assert.match(v('band1-toefl-intro').notice,/word-formation/);
 assert.match(v('band1-speaking-independent').title,/Speaking Exam Part Two/);
 for(const id of ['band3-speaking-part3','band3-speaking-toefl4'])assert.match(v(id).title,/Listen and Repeat.*2026/);
 assert.match(v('band3-speaking-opinions').title,/Interview.*2026/);
 assert.match(v('band3-writing-maps-processes').title,/Email.*2026/);
 assert.match(v('band3-writing-discussion').title,/Sentence.*2026/);
 assert.match(v('band3-writing-multiple-charts').notice,/earlier recording.*retained task/);
 assert.match(v('band4-mock-toefl-reading').notice,/General Training/);
 assert.ok(!v('band4-mock-toefl-reading').title.includes('TOEFL'));
 assert.match(v('band4-grammar-participles').title,/participle/);
});

test('numerical and meaning-sensitive examples retain their stated limits',()=>{
 const graph=courseEnrichment['band2-writing-line-graphs'];assert.match(graph.context,/North 100.*180.*South 160.*140/);assert.match(graph.after,/North.*higher.*2025/);
 const shares=courseEnrichment['band2-writing-bar-pie'];assert.match(shares.after,/10 percentage points.*50%/);assert.match(shares.reasoning,/headcount/);
 assert.match(courseEnrichment['band3-speaking-part3'].reasoning,/changes words, number/);
 assert.match(courseEnrichment['band3-vocab-health'].reasoning,/before attending/);
 assert.match(courseEnrichment['band4-grammar-participles'].after,/the researcher revised/);
});

test('reviewed replacements explain the actual topic and disclose partial coverage',()=>{
 const v=id=>courseEnrichment[id].video;
 for(const [lesson,id] of Object.entries({
  'band1-listening-format':'S0-1KUJddwk',
  'band1-writing-trends':'OMsu3YqlVGI',
  'band1-grammar-agreement':'yY89V2jX36E',
  'band2-listening-maps':'-aBW-RHtcrE',
  'band2-listening-form-completion':'WsalKKtxbfs',
  'band2-writing-letter':'A6_0QjlNJqk',
  'band2-mistakes-prepositions':'e4kYvMEQU3w',
  'band3-vocab-awl3':'9cGxewHh3bw',
  'band3-vocab-health':'U-_f8RQIIiw',
  'band4-vocab-science':'N6IAzlugWw0',
  'band4-vocab-globalization':'D4WNSQ0APMI',
  'band4-vocab-idioms':'lDH7jPlEWXI',
  'band4-mock-toefl-reading':'9ycjqXlTwoE',
 }))assert.equal(v(lesson).id,id,lesson);
 assert.equal(v('band2-writing-letter').start,919);
 assert.equal(v('band2-listening-form-completion').start,350);
 assert.equal(v('band2-listening-form-completion').end,1326);
 assert.match(v('band1-writing-essay-structure').coverage,/review.*report/);
 assert.match(v('band3-practice-essay').coverage,/email.*Academic Discussion/);
 assert.match(v('band3-review').coverage,/written course guidance/);
 const html=renderToStaticMarkup(React.createElement(CourseVideoLesson,{video:v('band3-vocab-health')}));
 assert.match(html,/What this covers:/);assert.match(html,/critical-thinking explanation/);
 const selected=new Set(Object.values(courseEnrichment).map(e=>e.video.id));
 assert.deepEqual(new Set(Object.values(videoCatalogue).map(v=>v.id)),selected);
});

test('sourced images have local bytes, accurate dimensions, attribution and usable licence links',()=>{
 const {sourcedTeachingImages}=require('../src/data/course-enrichment/media.ts');
 const manifest=require('../public/media/courses/sourced/manifest.json');
 assert.equal(Object.keys(sourcedTeachingImages).length,5);assert.equal(manifest.length,5);
 function jpegSize(bytes){
  let n=2;
  while(n<bytes.length){
   assert.equal(bytes[n],255);const marker=bytes[n+1];n+=2;
   if(marker===0xd9||marker===0xda)break;
   const size=bytes.readUInt16BE(n);
   if([0xc0,0xc1,0xc2].includes(marker))return {height:bytes.readUInt16BE(n+3),width:bytes.readUInt16BE(n+5)};
   n+=size;
  }
  throw new Error('JPEG dimensions missing');
 }
 for(const [key,img] of Object.entries(sourcedTeachingImages)){
  const entry=manifest.find(m=>m.key===key);assert.ok(entry,key);
  assert.match(img.src,/^\/media\/courses\/sourced\/[a-z-]+\.(jpg|png|svg)$/);
  for(const field of ['title','creator','source','license','licenseUrl','changes'])assert.ok(img[field]?.trim(),key+' '+field);
  for(const field of ['source','licenseUrl'])assert.match(img[field],/^https:\/\//);
  const bytes=fs.readFileSync(path.join(root,'public',img.src));
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),entry.sha256);
  assert.equal(bytes.length,entry.bytes);
  assert.ok(img.alt.length>80&&img.caption.length>80);
  if(img.src.endsWith('.png'))assert.deepEqual({width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20)},{width:img.width,height:img.height});
  if(img.src.endsWith('.jpg'))assert.deepEqual(jpegSize(bytes),{width:img.width,height:img.height});
  if(img.src.endsWith('.svg')){
   const svg=bytes.toString();assert.match(svg,new RegExp(`width="${img.width}" height="${img.height}"`));
   assert.ok(!/<(?:script|foreignObject|image)\b|\bon\w+\s*=|(?:href|url\()/.test(svg));
  }
 }
});

test('the retained earlier image registry remains compatible as a fallback without changing original examples',()=>{
 const {visualExplanations}=require('../src/data/course-enrichment/media.ts');
 assert.equal(Object.keys(visualExplanations).length,8);
 assert.equal(Object.values(visualExplanations).flatMap(x=>x.images).length,9);
 for(const [lesson,visual] of Object.entries(visualExplanations)){
  assert.equal(courseEnrichment[lesson].visualExplanation,visual);
  assert.ok(visual.title&&visual.introduction&&visual.prompt&&visual.explanation.length>180,lesson);
  const html=renderToStaticMarkup(React.createElement(CourseEnrichment,{content:{...courseEnrichment[lesson],inlineImages:undefined}}));
  assert.match(html,/aria-label="Visual explanation"/);assert.match(html,/Look closely:/);
  assert.match(html,/<details><summary[^>]*>Compare your visual explanation/);
  assert.ok(!html.includes('<details open'));assert.match(html,/bg-white/);
  for(const img of visual.images){assert.ok(html.includes(img.source));assert.ok(html.includes(img.licenseUrl));}
 }
 assert.match(visualExplanations['band2-writing-line-graphs'].explanation,/different quantities/);
 assert.match(visualExplanations['band2-writing-line-graphs'].explanation,/fictional cycling/);
 assert.match(visualExplanations['band2-writing-letter'].explanation,/no quantities or exact durations/);
 assert.match(visualExplanations['band3-vocab-health'].explanation,/hypothesis to check, not proof/);
 assert.match(visualExplanations['band1-speaking-independent'].explanation,/No learners are visible/);
});

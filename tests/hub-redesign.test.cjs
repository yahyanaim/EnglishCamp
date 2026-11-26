require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const src=f=>fs.readFileSync(f,'utf8');

test('Read, Grammar and Practice hubs share the module-style hero, level rail and toolbar',()=>{
 const hubs={'src/components/learn/ReadingSection.tsx':'title="Read"','src/components/learn/GrammarReference.tsx':'title="Grammar"','src/components/practice/PracticeHubHome.tsx':'title="Practice Hub"'};
 for(const[file,title]of Object.entries(hubs)){
  const code=src(file);
  assert.ok(code.includes('<HubHero')&&code.includes(title),file+' renders the hub hero');
  assert.ok(code.includes('<HubContinue'),file+' offers one next step');
  assert.ok(code.includes('<LevelRail'),file+' filters by CEFR level');
  assert.ok(/className="camp-hub-toolbar[\s"]/.test(code),file+' groups search and filters');
  assert.ok(code.includes('camp-hub-group-head'),file+' shows per-group progress');
 }
 assert.match(src('src/components/learn/HubHero.tsx'),/<h1>\{title\}<\/h1>/);
});

test('each hub page has exactly one h1 after the banner was replaced by the hero',()=>{
 for(const page of ['src/app/reading/page.tsx','src/app/grammar/page.tsx'])assert.ok(!src(page).includes('<h1')&&!src(page).includes('PageBanner'),page);
 const practice=src('src/app/practice/page.tsx'),hub=practice.slice(practice.indexOf('const open = (id: string)'));
 assert.ok(!hub.includes('<h1')&&!hub.includes('<PageBanner'),'Practice hub heading comes from the hero');
 assert.match(practice,/<h1 ref=\{activityHeading\}/,'the trainer view keeps its focused heading');
});

test('lesson views use a module header with an h1, position and previous/next navigation',()=>{
 for(const file of ['src/components/learn/ReadingLessonView.tsx','src/components/learn/GrammarReference.tsx']){
  const code=src(file);
  assert.ok(code.includes('className="camp-lesson-head"'),file);
  assert.ok(code.includes('camp-module-pager'),file);
  assert.match(code,/<h1 [^>]*id=|<h1 ref=/,file+' lesson title is the page h1');
 }
});

test('redesign styles load globally, respect reduced motion and never use aria-labels that hide visible card text',()=>{
 assert.match(src('src/components/layout/GridBalance.tsx'),/import "\.\.\/learn\/hub-v2\.css";/);
 for(const f of ['src/components/learn/HubHero.tsx','src/components/learn/ReadingLessonView.tsx'])assert.ok(!src(f).includes('hub-v2.css'),f+' does not import CSS directly');
 const css=src('src/components/learn/hub-v2.css');
 assert.match(css,/prefers-reduced-motion/);
 assert.ok(!/className="camp-read-card"[^>]*aria-label/.test(src('src/components/learn/ReadingSection.tsx')));
});

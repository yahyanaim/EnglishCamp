require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const {learningBackDestination}=require('../src/lib/learningNavigation.ts');
const read=f=>fs.readFileSync(f,'utf8');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(d+'/'+e.name):[d+'/'+e.name]);

test('U01/U02: a stage change opens the new stage at its start, and phones keep only the header and outline pinned',()=>{
 const module=read('src/components/course/ModuleExperience.tsx');
 assert.match(module,/<span id="module-start" className="camp-module-start" aria-hidden="true" \/>\s*<div id="module-tabs"/);
 assert.match(module,/const go = \(next: Tab\) => \{ setTab\(next\); requestAnimationFrame\(\(\) => document\.getElementById\("module-start"\)\?\.scrollIntoView\(\{ block: "start", behavior: "instant" \}\)\); \};/);
 const css=read('src/components/course/course-v2.css');
 assert.match(css,/\.camp-module-start \{ display: block; height: 0; scroll-margin-top: 88px; \}/);
 const phone=css.slice(css.lastIndexOf('@container camp-main (max-width: 679px)'));
 assert.match(phone,/\.camp-lesson-tabs \{ position: relative; top: auto; \}/);
 assert.match(phone,/\.camp-outline \{ top: 84px; \}/);
});

test('U03: the course library is a page of its own, linked from the menu, notes and the phone bottom bar',()=>{
 assert.match(read('src/app/courses/layout.tsx'),/title: 'Courses · EnglishCamp'/);
 const {default:CoursesPage}=require('../src/app/courses/page.tsx');
 const html=renderToStaticMarkup(React.createElement(CoursesPage));
 assert.match(html,/<h1>Courses<\/h1>/);
 assert.equal((html.match(/class="camp-course-card"/g)||[]).length,require('../src/data/course-catalogue.ts').courseCatalogue.length);
 assert.ok(!walk('src').some(f=>/\.(tsx?|css)$/.test(f)&&read(f).includes('/dashboard#courses')),'no link points at the old dashboard anchor');
 const nav=read('src/components/layout/MobileBottomNav.tsx');
 assert.match(nav,/\{ href: "\/courses", label: "Courses", icon: GraduationCap \}/);
 assert.match(nav,/item\.href === "\/courses" && \/\^\\\/\(levels\|exercises\)\\\/\/\.test\(pathname\)/);
 assert.equal((nav.match(/\{ href: "\//g)||[]).length,6);
});

test('U11/U13: copy matches the content and the placement offer stays on the Dashboard',()=>{
 assert.equal(learningBackDestination('/shadowing-english'),null,'Shadowing is a top-level page, not part of Vocabulary');
 assert.ok(!walk('src').some(f=>/\.tsx?$/.test(f)&&/A1 to B2/i.test(read(f))));
 assert.match(read('src/app/dashboard/page.tsx'),/xp > 0 \? <>Keep up the great work[^<]*<\/> : "Start with one short lesson today\. Every step counts\."/);
 assert.match(read('src/components/placement/PlacementOffer.tsx'),/record\.status!=='new'\|\|pathname!=='\/dashboard'\)return null;/);
});

test('U14: the open trainer is in the URL, so reload and the Back gesture return to the Practice hub',()=>{
 const page=read('src/app/practice/page.tsx');
 assert.match(page,/window\.history\.pushState\(null, "", `\/practice\?trainer=\$\{encodeURIComponent\(trainer\.id\)\}`\)/);
 assert.match(page,/new URLSearchParams\(window\.location\.search\)\.get\("trainer"\)/);
 assert.match(page,/window\.addEventListener\("popstate", sync\)/);
 assert.match(page,/<BackButton onClick=\{close\}>Back to practice<\/BackButton>/);
});

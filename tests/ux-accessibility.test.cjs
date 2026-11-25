require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const {accentPalette,contrast,ACCENT_PRESETS}=require('../src/lib/accentPalette.ts');
const read=f=>fs.readFileSync(f,'utf8');

test('U04: client pages are named after their main heading once rendered',()=>{
 const title=read('src/components/layout/DocumentTitle.tsx');
 assert.match(title,/if \(current !== lastSet && !current\.startsWith\(`\$\{SITE\} — `\)\) return;/,'pages with their own title are left alone');
 assert.match(title,/"\/dashboard": "Dashboard", "\/stats": "Progress", "\/practice": "Practice", "\/mock-exam": "Mock exams"/);
 assert.match(title,/new MutationObserver\(schedule\)/);
 assert.match(read('src/components/layout/LayoutShell.tsx'),/<DocumentTitle\/>/);
});

test('U05: a skip link leads to the content and the activity heatmap adds no Tab stops',()=>{
 const shell=read('src/components/layout/LayoutShell.tsx');
 assert.match(shell,/<a href="#main-content" className="camp-skip-link">Skip to content<\/a>/);
 assert.match(shell,/<main id="main-content" tabIndex=\{-1\}/);
 assert.match(read('src/app/reference.css'),/\.camp-skip-link:focus \{ top:12px;/);
 const {ActivityChart}=require('../src/components/ui/ActivityChart.tsx');
 const html=renderToStaticMarkup(React.createElement(ActivityChart,{activity:{}}));
 assert.ok(!/tabindex/i.test(html),'no focusable days');
 assert.match(html,/role="list" aria-label="Daily activity, oldest first"/);
 assert.equal((html.match(/role="listitem"/g)||[]).length,28);
});

test('U06/U10/U12: targets, pagination and small markup fixes',()=>{
 assert.match(read('src/components/learn/read-listening.css'),/\.camp-library-pagination > div \{ flex:1 1 100%; flex-wrap:nowrap; gap:4px; \}\s*\.camp-library-pagination button \{ min-width:36px;/);
 assert.match(read('src/app/reference.css'),/\.rail-stats-link \{ display:inline-grid; place-items:center; min-width:24px; min-height:24px;/);
 assert.match(read('src/components/layout/LearningRail.tsx'),/className="rail-stats-link"/);
 assert.match(read('src/components/course/course-v2.css'),/\.camp-lesson-crumbs > a \{ display: inline-flex; align-items: center; gap: 6px; min-width: 0; min-height: 24px;/);
 assert.ok(!/<main/.test(read('src/app/membership/page.tsx')),'membership sits inside the shell main');
 assert.match(read('src/components/speaking/PronunciationFeedback.tsx'),/<h2>Pronunciation feedback<\/h2>/);
 assert.match(read('src/components/admin/admin.css'),/\.admin-filter-pills>button>span\{opacity:1\}/);
 assert.match(read('src/components/layout/page-polish.css'),/\.camp-grammar-path-head, \.camp-grammar-path-name \{ min-width:0; \}/);
});

test('U07: in the dark theme every accent keeps course colours and brand text at 4.5:1 or more',()=>{
 for(const preset of ACCENT_PRESETS){
  const vars=accentPalette(preset.color,true);
  for(const band of ['4-5','5-6','6-7','7-8']){
   const colour=vars[`--color-course-band${band}`];
   for(const bg of ['#17121e','#2e1d3e','#1C1C1E'])assert.ok(contrast(colour,bg)>=4.5,`${preset.name} band ${band} on ${bg}: ${contrast(colour,bg).toFixed(2)}`);
  }
  const light=accentPalette(preset.color,false);
  assert.equal(light['--color-course-band4-5'],light['--color-primary'],'light theme unchanged');
 }
 assert.match(read('src/app/reference.css'),/\.dark \.text-\\\[var\\\(--color-primary\\\)\\\] \{ color: var\(--camp-control-ink\); \}/);
});

test('U08/U09: controls are named, and names contain the visible words',()=>{
 const timer=read('src/components/ui/StudyTimer.tsx');
 assert.match(timer,/aria-label=\{running \? "Pause study timer" : "Start study timer"\}/);
 assert.match(timer,/aria-label="Reset study timer"/);
 assert.match(read('src/components/course/CoursePreviewCard.tsx'),/aria-label=\{`View course: \$\{course\.title\}`\}/);
 assert.match(read('src/components/session/SessionEntry.tsx'),/aria-label=\{profile \? `\$\{profile\.name\} \$\{profileTag\(profile\)\}, your session`/);
 assert.match(read('src/components/layout/TopBar.tsx'),/<span>Search courses, lessons and practice<\/span><kbd aria-hidden="true" data-shortcut="⌘ K" \/>/);
 assert.match(read('src/app/reference.css'),/\.camp-search kbd\[data-shortcut\]::after \{ content: attr\(data-shortcut\); \}/);
 const sidebar=read('src/components/layout/Sidebar.tsx');
 assert.ok(!sidebar.includes('aria-label="EnglishCamp home"'));
 assert.match(sidebar,/<span className="sr-only">, home<\/span>/);
});

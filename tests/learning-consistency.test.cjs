require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict');
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const {learningBackDestination,LEARNING_SECTIONS}=require('../src/lib/learningNavigation.ts');
const {BackButton}=require('../src/components/ui/BackButton.tsx');
const {SectionBack}=require('../src/components/layout/SectionBack.tsx');
const {PathnameContext}=require('next/dist/shared/lib/hooks-client-context.shared-runtime');
const {SHADOW_LESSONS,shadowTopics}=require('../src/data/shadowing.ts');
const {ShadowLessonCard}=require('../src/components/shadowing/ShadowLessonCard.tsx');
const {lessonReadKey}=require('../src/components/course/LessonDoneButton.tsx');
const {useProgress}=require('../src/store/useProgress.ts');
const {courseSnapshot}=require('../src/lib/courseProgress.ts');
const {GRAMMAR_SECTIONS}=require('../src/data/grammar-cheat-sheet.ts');
const {CheatSheetContent,cheatDisplayText}=require('../src/components/learn/CheatSheetContent.tsx');

test('learning back destinations are stable across English aliases, locales and direct visits',()=>{
 for(const [route,section]of Object.entries(LEARNING_SECTIONS)){
  const target=learningBackDestination(route);assert.equal(target.href,route===`/${section}`?'/dashboard':`/${section}`);
  assert.deepEqual(learningBackDestination('/ar'+route+'/?view=one#section'),target);
 }
 assert.deepEqual(learningBackDestination('/conjugaise'),learningBackDestination('/verb-conjugation'));
 assert.deepEqual(learningBackDestination('/en/redemittel-praxis'),{href:'/practice',label:'Back to practice'});
 assert.equal(learningBackDestination('/grammar/cheat-sheet').href,'/grammar');
 assert.equal(learningBackDestination('/quiz/band4-5').href,'/practice');
 assert.equal(learningBackDestination('/dashboard'),null);assert.equal(learningBackDestination('/levels/band4-5/lessons/example'),null);
});

test('the shared back control retains link or local-detail semantics with a consistent icon',()=>{
 const link=renderToStaticMarkup(React.createElement(BackButton,{href:'/grammar'},'Back to grammar'));
 assert.ok(link.includes('href="/grammar"'));assert.ok(link.includes('camp-back-button'));assert.ok(link.includes('Back to grammar'));assert.ok(!link.includes('<button'));
 const local=renderToStaticMarkup(React.createElement(BackButton,{onClick:()=>{}},'Back to topics'));
 assert.ok(local.includes('<button'));assert.ok(local.includes('type="button"'));assert.ok(local.includes('data-local-back'));assert.equal((local.match(/<svg/g)||[]).length,1);
});

test('rewritten learning pages render the same back row on the server and browser without a layout shift',()=>{
 const render=pathname=>renderToStaticMarkup(React.createElement(PathnameContext.Provider,{value:pathname},React.createElement(SectionBack)));
 for(const [legacy,english]of [['/redemittel-praxis','/phrases-practice'],['/conjugaise','/verb-conjugation'],['/ar/grammar','/grammar']]){assert.equal(render(legacy),render(english));assert.ok(render(legacy).includes('camp-page-back'));}
 assert.equal(render('/dashboard'),'');
});

test('shadowing cards omit CEFR badges and preserve authored topic badges',()=>{
 for(const lesson of SHADOW_LESSONS){const html=renderToStaticMarkup(React.createElement(ShadowLessonCard,{lesson,selected:true,onSelect:()=>{}}));
  assert.ok(!/>[AB][12]</.test(html));assert.ok(!/camp-shadow-thumb[\s\S]*?<small>/.test(html.split('camp-shadow-lesson-copy')[0]));
  assert.ok(html.includes('aria-pressed="true"'));assert.ok(shadowTopics(lesson).length>0);
  for(const topic of shadowTopics(lesson))assert.ok(html.includes('>'+topic+'<'),topic);
 }
});

test('Done saves one reading activity without inventing practice results or repeat rewards',()=>{
 useProgress.getState().reset();const key=lessonReadKey('band1-toefl-intro');
 assert.equal(useProgress.getState().completeExercise(key,0),0);assert.equal(useProgress.getState().completeExercise(key,0),0);
 const state=useProgress.getState();assert.equal(state.exercisesDone[key],true);assert.equal(state.xp,0);assert.deepEqual(state.lessons,{});
 assert.equal(state.events.filter(e=>e.source===key).length,1);assert.equal(courseSnapshot(['band1-toefl-intro'],state.modules,state.lessons).completed,0);
 assert.equal(lessonReadKey('one')===lessonReadKey('two'),false);
});

test('the grammar page content can render every rule and example without Arabic explanations',()=>{
 for(const section of GRAMMAR_SECTIONS){const html=renderToStaticMarkup(React.createElement(CheatSheetContent,{section,showArabic:false}));assert.ok(!/[\u0600-\u06ff]/.test(html));assert.ok(!html.includes('lang="ar"'));for(const item of section.content){const expected=renderToStaticMarkup(React.createElement('span',null,cheatDisplayText(item.examples[0].en))).slice(6,-7);assert.ok(html.includes(expected),item.title);}}
});

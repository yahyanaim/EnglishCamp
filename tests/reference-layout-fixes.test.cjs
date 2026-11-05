require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const {VERBS}=require('../src/data/conjugaise.ts');
const {VERB_TENSES,tenseExample,unusualReferenceForm,continuousPracticeAllowed}=require('../src/lib/verbTenses.ts');
const {VERB_EXAMPLE_CONTEXTS}=require('../src/data/verb-example-contexts.ts');
const {ArabicText}=require('../src/components/ui/ArabicText.tsx');
const {PageWrapper}=require('../src/components/layout/PageWrapper.tsx');
const {PageBanner}=require('../src/components/ui/PageBanner.tsx');
const {PracticeBanner}=require('../src/components/ui/PracticeBanner.tsx');
const {PracticeCard}=require('../src/components/ui/PracticeSurface.tsx');
const {LearningArt}=require('../src/components/brand/LearningArt.tsx');
const {PathnameContext}=require('next/dist/shared/lib/hooks-client-context.shared-runtime');
const {POSITION_WORDS}=require('../src/data/position-lesson.ts');
const {PositionLesson}=require('../src/components/learn/PositionLesson.tsx');
const {VocabularyPractice}=require('../src/components/learn/VocabularyPractice.tsx');
const {useVocabulary}=require('../src/store/useVocabulary.ts');

test('all 60 verb contexts produce selected-tense examples with subject agreement',()=>{
 assert.equal(Object.keys(VERB_EXAMPLE_CONTEXTS).length,VERBS.length);
 for(const verb of VERBS)for(const tense of VERB_TENSES)for(const i of [0,2,4]){
  const ex=tenseExample(verb,tense.id,i);assert.ok(!ex.sentence.includes('undefined'),`${verb.infinitive} ${tense.id}`);
  assert.ok(ex.sentence.startsWith(`${ex.subject} ${ex.form} `));assert.equal(Boolean(ex.preferred),unusualReferenceForm(verb,tense.id));
 }
 const get=v=>VERBS.find(x=>x.infinitive===v);
 assert.equal(tenseExample(get('write'),'past-perfect',2).sentence,'She had written notes for the new course before the meeting started.');
 assert.equal(tenseExample(get('have'),'present-continuous',0).sentence,'I am having a meeting with the project team at the moment.');
 assert.equal(tenseExample(get('be'),'past-continuous',2).sentence,'She was being helpful to the new students when the tutor arrived.');
 assert.equal(tenseExample(get('happen'),'present',4).sentence,'Technical problems happen during the rehearsals.');
 assert.equal(tenseExample(get('know'),'present-continuous',2).preferred,'She knows the answer to this question at the moment.');
 assert.equal(continuousPracticeAllowed(get('know')),false);assert.equal(continuousPracticeAllowed(get('have')),false);
});

test('return controls follow a banner inside nested wrappers and preserve the body',()=>{
 for(const Banner of [PageBanner,PracticeBanner]){
  const html=renderToStaticMarkup(React.createElement(PathnameContext.Provider,{value:'/culture-quiz'},React.createElement(PageWrapper,null,React.createElement('section',null,React.createElement(Banner,null,React.createElement('h1',null,'PAGE HEADING')),React.createElement('p',null,'EXERCISE BODY')))));
  assert.ok(html.indexOf('PAGE HEADING')<html.indexOf('camp-page-back'));assert.ok(html.indexOf('camp-page-back')<html.indexOf('EXERCISE BODY'));assert.equal((html.match(/aria-label="Return navigation"/g)||[]).length,1);
 }
});

test('return placement preserves render-prop children such as video controls',()=>{
 const RenderProp=({children})=>children({label:'VIDEO CONTROLS'});
 const html=renderToStaticMarkup(React.createElement(PathnameContext.Provider,{value:'/practice'},React.createElement(PageWrapper,null,React.createElement(RenderProp,null,({label})=>React.createElement('p',null,label)))));
 assert.ok(html.includes('VIDEO CONTROLS'));
});

test('Arabic supports RTL reading order and isolates Latin terms without changing text',()=>{
 const html=renderToStaticMarkup(React.createElement(ArabicText,{text:'نستخدم have been مع الفعل.'}));
 assert.match(html,/lang="ar" dir="rtl"/);assert.ok(html.includes('<bdi dir="ltr">have been</bdi>'));assert.ok(html.includes('نستخدم '));
});

test('quiz cards remove standalone decoration and retain action icons and content',()=>{
 const html=renderToStaticMarkup(React.createElement(PracticeCard,null,React.createElement(LearningArt,{name:'book'}),React.createElement('p',null,'Question'),React.createElement('button',null,React.createElement(LearningArt,{name:'headphones'}),'Listen')));
 assert.ok(!html.includes('camp-practice-card-icon'));assert.ok(html.includes('Question'));assert.equal((html.match(/<svg/g)||[]).length,1);assert.ok(html.includes('Listen'));
});

test('the outer vocabulary mode can show writing directly without duplicate mode controls',()=>{
 useVocabulary.setState({words:{}});useVocabulary.getState().addWord('helpful','مفيد','general');
 const write=renderToStaticMarkup(React.createElement(VocabularyPractice,{mode:'write',showModeSwitch:false}));
 assert.ok(write.includes('Type the English word'));assert.ok(write.includes('placeholder="Type your answer..."'));assert.ok(!write.includes('>Quiz<'));assert.ok(!write.includes('>Write<'));
 const quiz=renderToStaticMarkup(React.createElement(VocabularyPractice,{mode:'quiz',showModeSwitch:false}));assert.ok(!quiz.includes('Type the English word'));assert.ok(quiz.includes('helpful'));useVocabulary.setState({words:{}});
});

test('the position lesson supplies sixteen accessible diagrams, contextual examples and movement contrasts',()=>{
 assert.equal(POSITION_WORDS.length,16);assert.equal(new Set(POSITION_WORDS.map(x=>x.id)).size,16);
 const html=renderToStaticMarkup(React.createElement(PositionLesson));assert.equal((html.match(/role="img"/g)||[]).length,16);
 assert.equal((html.match(/<figcaption>/g)||[]).length,16);for(const word of POSITION_WORDS){assert.ok(html.includes(word.example));assert.ok(word.description.length>30);}
 assert.ok(html.includes('contact with a surface'));assert.ok(!/[\u0600-\u06ff]/.test(html));
});

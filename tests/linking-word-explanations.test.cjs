require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const {KONNEKTOREN}=require('../src/data/konnektoren.ts');
const {LINKING_WORD_EXPLANATIONS,linkingWordExplanation,linkingWordKey}=require('../src/data/linking-word-explanations.ts');
const {LinkingWordExample}=require('../src/components/learn/LinkingWordExample.tsx');
const escape=text=>renderToStaticMarkup(React.createElement('span',null,text)).slice(6,-7);

test('every linking-word sense has its own Arabic meaning and usage explanation',()=>{
 const expected=KONNEKTOREN.map(linkingWordKey).sort();assert.equal(expected.length,77);
 assert.deepEqual(Object.keys(LINKING_WORD_EXPLANATIONS).sort(),expected);
 const explanations=KONNEKTOREN.map(linkingWordExplanation);assert.equal(new Set(explanations).size,77);
 for(const word of KONNEKTOREN){const text=linkingWordExplanation(word);assert.ok(text.length>65,linkingWordKey(word));assert.match(text,/[\u0600-\u06ff]/);assert.match(text,/[A-Za-z]/);assert.notEqual(text,word.exampleAr);}
 assert.notEqual(linkingWordExplanation({word:'since',category:'causal'}),linkingWordExplanation({word:'since',category:'temporal'}));
 assert.match(linkingWordExplanation({word:'in case',category:'conditional'}),/احتياط/);
 assert.match(linkingWordExplanation({word:'like',category:'modal'}),/المقارنة/);
});

test('each Example panel retains the sentence and translation, then presents an RTL Arabic explanation',()=>{
 for(const word of KONNEKTOREN){
  const html=renderToStaticMarkup(React.createElement(LinkingWordExample,{word}));
  const sentence=html.indexOf(escape(word.exampleEn)),translation=html.indexOf(escape(word.exampleAr));
  const explanation=html.indexOf('معنى أداة الربط واستخدامها');
  assert.ok(sentence>=0&&translation>sentence&&explanation>translation,linkingWordKey(word));
  assert.equal((html.match(/<p[^>]*lang="ar" dir="rtl"/g)||[]).length,2);
  assert.ok(html.includes('<bdi dir="ltr">'),linkingWordKey(word));
 }
});

test('because explains the connective itself without analysing the fixed sample sentence',()=>{
 const text=linkingWordExplanation({word:'because',category:'causal'});
 assert.ok(text.includes('«لأن»'));assert.ok(text.includes('فاعل وفعل'));
 assert.ok(!/تعلّم الإنجليزية|العمل بالخارج|في هذا المثال/.test(text));
 for(const explanation of Object.values(LINKING_WORD_EXPLANATIONS))assert.ok(!/في هذا المثال|يعرض المثال|توضح الجملة|يستخدم المثال/.test(explanation));
});

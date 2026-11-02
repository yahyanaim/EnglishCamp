require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const {CONJUNCTION_QUESTIONS}=require('../src/data/conjunction-questions.ts');
const {CONFUSED_PAIRS}=require('../src/data/wortpaare.ts'),{wordPairQuestions}=require('../src/data/word-pair-questions.ts');
const {CULTURE_QUESTIONS}=require('../src/data/landeskunde.ts');
const {CLOZE_PASSAGES}=require('../src/data/cloze-passages.ts');
const {KONNEKTOREN}=require('../src/data/konnektoren.ts');
const {GRAMMAR_SECTIONS}=require('../src/data/grammar-cheat-sheet.ts');
const {courseEnrichment}=require('../src/data/course-enrichment/index.ts');
const {LessonRecap}=require('../src/components/course/LessonRecap.tsx');
const {LETTER_PROMPTS}=require('../src/data/letter-prompts.ts'),{BRIEFE}=require('../src/data/briefe.ts');
const text=s=>renderToStaticMarkup(React.createElement('span',null,s)).slice(6,-7);

test('all conjunction categories have authored gaps, distinct choices and explanations',()=>{
 assert.equal(CONJUNCTION_QUESTIONS.length,44);const cats=new Map();
 for(const q of CONJUNCTION_QUESTIONS){assert.equal(q.sentence.split('___').length,2,q.sentence);assert.equal(new Set(q.options.map(s=>s.toLowerCase())).size,4,q.sentence);assert.equal(q.options.filter(x=>x===q.answer).length,1);assert.ok(q.focus.trim()&&q.english.trim());cats.set(q.category,(cats.get(q.category)||0)+1);}
 assert.equal(cats.size,11);for(const count of cats.values())assert.equal(count,4);
 assert.equal(CONJUNCTION_QUESTIONS.find(q=>q.sentence.includes('heavy rain')).answer,'because of');
});

test('word-pair questions test actual gaps and handle dialect and overlapping distance meanings',()=>{
 const items=CONFUSED_PAIRS.flatMap(wordPairQuestions);assert.equal(items.length,45);
 for(const q of items){assert.equal(q.example.split('___').length,2,q.pairKey);assert.ok(q.wordA!==q.wordB);assert.ok(q.correct==='A'||q.correct==='B');}
 const affect=items.find(q=>q.pairKey==='affect/effect');assert.equal(affect.correct,'A');assert.equal(affect.example.replace('___',affect.wordA),'Lack of sleep can affect your concentration.');
 const distance=items.filter(q=>q.pairKey==='farther/further');assert.equal(distance.length,1);assert.ok(distance[0].focus.includes('Both farther and further'));assert.equal(distance[0].correct,'B');
 assert.ok(items.find(q=>q.pairKey==='practice/practise').focus.includes('British English'));
});

test('culture questions retain unique IDs and exclude the previous false monarchy and national-sport keys',()=>{
 assert.equal(CULTURE_QUESTIONS.length,50);assert.equal(new Set(CULTURE_QUESTIONS.map(q=>q.id)).size,50);
 for(const q of CULTURE_QUESTIONS){assert.equal(new Set(q.options).size,4);assert.ok(q.options[q.correctIndex]);assert.ok(q.explanation.length>30);}
 const get=id=>CULTURE_QUESTIONS.find(q=>q.id===id);
 assert.match(get('cq-25').question,/winter/);assert.match(get('cq-25').explanation,/lacrosse/);
 assert.equal(get('cq-45').options[get('cq-45').correctIndex],'Canada');assert.ok(!get('cq-45').options.includes('All of the above'));
 assert.match(get('cq-44').question,/federal level/);assert.match(get('cq-46').question,/ARPANET/);
});

test('cloze passages retain every sentence fragment around two explicit gaps',()=>{
 assert.equal(CLOZE_PASSAGES.length,8);
 for(const p of CLOZE_PASSAGES){assert.equal(p.blanks.length,2);for(const b of p.blanks){assert.equal(p.text[b.index],'');assert.equal(new Set(b.options).size,4);assert.ok(b.options.includes(b.answer));}}
 const p=CLOZE_PASSAGES.find(p=>p.title==='At the Restaurant');assert.equal(p.text.map((s,i)=>p.blanks.find(b=>b.index===i)?.answer||s).join(' '),'Yesterday I went to a restaurant with friends. We ordered pizza and salad.');
});

test('the expanded linking library distinguishes clauses, phrases and transitions and resolves duplicate senses',()=>{
 assert.equal(KONNEKTOREN.length,77);assert.equal(new Set(KONNEKTOREN.map(k=>k.word+':'+k.category)).size,77);
 assert.equal(KONNEKTOREN.find(k=>k.word==='because').position,'verb-last');assert.equal(KONNEKTOREN.find(k=>k.word==='despite').position,'phrase');assert.equal(KONNEKTOREN.find(k=>k.word==='however').position,'1');
 assert.equal(KONNEKTOREN.find(k=>k.word==='and').position,'0');assert.equal(KONNEKTOREN.find(k=>k.word==='both...and').position,'paired');
});

test('all 100 recaps teach the principle, explain an example and provide an application with a concealed answer',()=>{
 let count=0;for(const e of Object.values(courseEnrichment)){
 const html=renderToStaticMarkup(React.createElement(LessonRecap,{principle:e.principle,example:e,video:e.video}));
 for(const value of [e.principle.explanation,e.principle.example,e.reasoning,e.transfer.prompt,e.transfer.answer])assert.ok(html.includes(text(value)),e.title);
 assert.match(html,/<details>/);assert.ok(!html.includes('<details open'));count++;}assert.equal(count,100);
});

test('printable grammar has eleven nonempty sections including all preposition relationships',()=>{
 assert.equal(GRAMMAR_SECTIONS.length,11);assert.equal(new Set(GRAMMAR_SECTIONS.map(s=>s.id)).size,11);
 for(const s of GRAMMAR_SECTIONS){assert.ok(s.content.length>0);for(const i of s.content){assert.ok(i.formation&&i.examples.length);}}
 assert.deepEqual(GRAMMAR_SECTIONS.find(s=>s.id==='prepositions').content.map(x=>x.title),['Time','Location','Direction','Other relationships']);
});

test('letter-writing instructions are separate from the models and cover every existing topic',()=>{
 assert.deepEqual(Object.keys(LETTER_PROMPTS).sort(),BRIEFE.map(x=>x.id).sort());
 for(const letter of BRIEFE){assert.ok(LETTER_PROMPTS[letter.id].length>120);assert.notEqual(LETTER_PROMPTS[letter.id],letter.content);assert.ok(!LETTER_PROMPTS[letter.id].startsWith('Dear'));}
});

test('the reviewed consistency changes preserve course banks, state stores, original fonts and unrelated source data',()=>{
 const c=require('./fixtures/consistency-content-contract.json'),root=path.join(__dirname,'..');const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
 for(const[file,digest]of Object.entries(c.preserved))assert.equal(hash(fs.readFileSync(path.join(root,file))),digest,file);
 for(const[file,delta]of Object.entries(c.files))assert.equal(hash(fs.readFileSync(path.join(root,file))),delta.after,file);
 assert.equal(hash(fs.readFileSync(path.join(root,'src/app/layout.tsx')).toString().split('export const metadata')[0]),c.fontSetup);
});

test('the downloadable grammar PDF stays in sync with the complete online reference',()=>{
 const p=path.join(__dirname,'../public/media/grammar/englishcamp-grammar-reference.pdf');const pdf=fs.readFileSync(p),manifest=JSON.parse(fs.readFileSync(p.replace(/pdf$/,'json')));
 const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
 assert.equal(pdf.subarray(0,5).toString(),'%PDF-');assert.equal(hash(pdf),manifest.pdfSha256);assert.equal(hash(JSON.stringify(GRAMMAR_SECTIONS,null,2)),manifest.sourceSha256);assert.equal(manifest.sections,11);assert.deepEqual(manifest.fonts,['Nunito','DM Sans']);
});


test('the practice catalogue keeps every trainer assignment and changes only the inaccurate word-pairs description',()=>{
 const catalogue=require('./practice-catalogue-fingerprint.cjs'),c=require('./fixtures/consistency-content-contract.json');
 const current=JSON.stringify(catalogue(fs.readFileSync(path.join(__dirname,'../src/app/practice/page.tsx'),'utf8')));
 const restored=current.replace('Choose between commonly confused words (affect/effect, their/there)','Choose the right word (since/for, if/when)');
 assert.equal(crypto.createHash('sha256').update(restored).digest('hex'),c.practiceCatalogue.before);
 assert.equal(c.practiceCatalogue.before,require('./fixtures/fullsize-ui-contract.json').practiceCatalogue);
});

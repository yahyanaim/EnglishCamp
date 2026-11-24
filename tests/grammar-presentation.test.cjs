require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),ts=require('typescript');
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const {GrammarReference}=require('../src/components/learn/GrammarReference.tsx');
const contract=require('./fixtures/grammar-presentation-contract.json'),reviewed=require('./fixtures/read-listening-contract.json').grammarUi||{};
const {SECTIONS}=require('../src/components/learn/GrammarReference.tsx');
// Words added by the reviewed CEFR level filter (search, level chips, empty state); the authored teaching text before them is unchanged.
const LEVEL_UI_WORDS=['id:lesson.id','title:lesson.title','id:lesson.id','title:lesson.title','Search grammar lessons','All','No lessons match “','”. Try another word or choose All.'];
const withoutLevelUi=words=>{const w=[...words];for(const x of LEVEL_UI_WORDS){const i=w.lastIndexOf(x);if(i>=0)w.splice(i,1);}return w;};
const hash=x=>crypto.createHash('sha256').update(x).digest('hex'),root=path.join(__dirname,'..');
test('the grammar UI pass preserves teaching banks, event handlers and initial learning state',()=>{
 assert.equal(contract.pages.length,30);assert.ok(Object.keys(contract.data).length>=30);
 for(const[file,digest]of Object.entries(contract.data))assert.equal(hash(fs.readFileSync(path.join(root,file))),digest,file);
 for(const[file,digest]of Object.entries(contract.handlers)){
  const s=fs.readFileSync(path.join(root,file),'utf8'),a=ts.createSourceFile(file,s,99,true,4),handlers=[],state=[];
  function walk(n){if(ts.isJsxAttribute(n)&&/^on(?:Click|Change|ValueChange|KeyDown|Submit|Toggle)$/.test(n.name.text))handlers.push([n.name.text,n.initializer?.getText(a)]);if(ts.isCallExpression(n)&&n.expression.getText(a)==='useState')state.push(n.arguments.map(x=>x.getText(a)));ts.forEachChild(n,walk);}walk(a);
  assert.equal(hash(JSON.stringify(handlers)),reviewed[file]?.handlers??digest,file+' interactions');assert.equal(hash(JSON.stringify(state)),reviewed[file]?.initialState??contract.initialState[file],file+' state');
 }
});
test('the inline grammar explanations, examples and section labels remain unchanged',()=>{
 for(const [file,digest]of Object.entries(contract.inlineTeachingText)){
  const source=fs.readFileSync(path.join(root,file),'utf8').replace('  ...GRAMMAR_EXTENSIONS.map(lesson=>({id:lesson.id,title:lesson.title,content:<GrammarFoundationLesson lesson={lesson}/>})),\n','').replace('  ...GRAMMAR_EXTENSIONS.map(lesson=>({id:lesson.id,title:lesson.title,content:<GrammarFoundationLesson lesson={lesson} translateOnInteraction/>})),\n',''),a=ts.createSourceFile(file,source,99,true,4),words=[];
  function walk(n){if(ts.isJsxText(n)){const text=n.text.replace(/\s+/g,' ').trim();if(text)words.push(text);}if(ts.isJsxAttribute(n)&&['de','en'].includes(n.name.text))words.push(n.name.text+':'+n.initializer.getText(a));if(ts.isPropertyAssignment(n)&&['title','id'].includes(n.name.getText(a)))words.push(n.name.getText(a)+':'+n.initializer.getText(a));ts.forEachChild(n,walk);}walk(a);
  assert.equal(hash(JSON.stringify(file.endsWith('GrammarReference.tsx')?withoutLevelUi(words):words)),digest,file);
 }
});
test('grammar disclosures expose topic headings, unique toggle names and collapsed state',()=>{
 const html=renderToStaticMarkup(React.createElement(GrammarReference));
 const ids=[...html.matchAll(/id="grammar-toggle-([^"]+)"/g)].map(m=>m[1]);
 const n=SECTIONS.length;assert.ok(n>=35);
 assert.equal(ids.length,n);assert.equal(new Set(ids).size,n);assert.equal((html.match(/<h3 class="camp-grammar-section-header"/g)||[]).length,n);
 for(const level of ['A1','A2','B1','B2'])assert.ok(html.includes(`id="grammar-level-${level}"`),level);
 assert.equal((html.match(/aria-expanded="false"/g)||[]).length,n);
 for(const id of ids)assert.ok(html.includes(`aria-controls="grammar-${id}"`),id);
 assert.ok(!/[\u0600-\u06ff]/.test(html));
});

require('./register.cjs');
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),Module=require('node:module'),ts=require('typescript');
// Exercise the actual question builders without mounting timers, sounds or user progress.
function builder(filename,name){
 const absolute=path.join(__dirname,'../src/components/learn',filename);
 const m=new Module(absolute,module);m.filename=absolute;m.paths=Module._nodeModulePaths(path.dirname(absolute));
 const source=fs.readFileSync(absolute,'utf8')+`\nexport const exposedBuilder = ${name};`;
 m._compile(ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,jsx:ts.JsxEmit.ReactJSX,esModuleInterop:true}}).outputText,absolute);
 return m.exports.exposedBuilder;
}
test('Sprint always produces actual gaps and one distinct correct option',()=>{
 const build=builder('Sprint.tsx','buildQuestions');
 for(let round=0;round<10;round++){
  const qs=build(80);assert.ok(qs.length>=30,`Only ${qs.length} usable questions`);
  for(const q of qs){assert.ok(q.sentence.includes('___'),q.id);assert.equal(new Set(q.options).size,q.options.length);assert.equal(q.options.filter(x=>x===q.correctAnswer).length,1);}
 }
});
test('Knowledge Check never creates duplicate or missing answer options',()=>{
 const build=builder('KnowledgeCheck.tsx','buildQuestions');
 for(let round=0;round<10;round++)for(const q of build()){
  assert.ok(q.options.length>=3,q.id);assert.equal(new Set(q.options).size,q.options.length,q.id);assert.equal(q.options.filter(x=>x===q.correct).length,1,q.id);
  if(q.source==='nvv')assert.ok(q.prompt.includes('___'),q.id);
 }
});
test('Sentence Translator rounds contain parallel English/Arabic items and unique prompts',()=>{
 const build=builder('SatzUebersetzer.tsx','buildItems');
 for(let round=0;round<10;round++){
  const items=build(10);assert.equal(items.length,10);assert.equal(new Set(items.map(x=>x.english)).size,10);assert.equal(new Set(items.map(x=>x.arabic)).size,10);
  for(const item of items){assert.ok(/[a-z]/i.test(item.english));assert.ok(/[\u0600-\u06ff]/.test(item.arabic));assert.ok(!/[\u0600-\u06ff]/.test(item.english));}
 }
});
test('Listening Lab stimuli are English and answer translations are Arabic in both modes',()=>{
 const build=builder('ListeningLab.tsx','buildItems');
 for(const mode of ['words','phrases'])for(const item of build(mode)){
  assert.ok(/[a-z]/i.test(item.de));assert.ok(!/[\u0600-\u06ff]/.test(item.de));assert.ok(/[\u0600-\u06ff]/.test(item.en));
 }
});

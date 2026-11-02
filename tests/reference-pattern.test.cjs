const consistency=require('./fixtures/consistency-content-contract.json');
const notesBrand=require('./fixtures/notes-brand-contract.json');
const violet=require('./fixtures/violet-session-contract.json');
const fullsize=require('./fixtures/fullsize-ui-contract.json');
require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {translationPools,dialogueGroups}=require('../src/data/translation-practice.ts');
const {translationQuestion,translationSession,validTranslation}=require('../src/lib/translationPractice.ts');
const {SENTENCE_PATTERNS}=require('../src/data/satzmuster.ts');
const contract=require('./fixtures/reference-ui-contract.json');
const prior=require('./fixtures/ui-recovery-contract.json');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const root=path.join(__dirname,'..');
let seed=91247;const random=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);

test('the visual rebuild preserves all existing teaching banks and saved learning state',()=>{
 for(const[file,digest]of Object.entries({...contract.banks,...contract.state}))assert.equal(hash(fs.readFileSync(path.join(root,file))),consistency.files[file]?.after??digest,file);
 for(const[file,change]of Object.entries(contract.practiceCorrections))assert.equal(change.before,prior.logic[file],file+' explicit correction boundary');
 for(const[file,change]of Object.entries(contract.files))assert.equal(hash(fs.readFileSync(path.join(root,file))),consistency.files[file]?.after??notesBrand.files[file]?.after??violet.files[file]?.after??fullsize.files[file]?.after??change.after,file+' reviewed UI/correction delta');
});

test('sentence-pattern practice uses every authored bilingual example with correct language roles',()=>{
 assert.equal(translationPools.patterns.length,SENTENCE_PATTERNS.reduce((n,r)=>n+r.examples.length,0));
 for(const rule of SENTENCE_PATTERNS)for(const ex of rule.examples)assert.ok(translationPools.patterns.some(p=>p.english===ex.english&&p.arabic===ex.arabic&&p.topic===rule.title));
});

test('all nine translators provide unique options, one displayed correct answer and the requested target language',()=>{
 for(const[name,pool]of Object.entries(translationPools)){
  assert.ok(pool.length>=10,name);assert.ok(pool.every(validTranslation),name+' bilingual pairs');
  for(const direction of ['ar','en'])for(const entry of pool){
   const q=translationQuestion(entry,pool,direction,random);
   assert.equal(q.prompt,direction==='ar'?entry.arabic:entry.english);
   assert.equal(q.answer,direction==='ar'?entry.english:entry.arabic);
   assert.equal(q.options.length,4,name);assert.equal(new Set(q.options).size,4,name);
   assert.equal(q.options.filter(x=>q.accepted.includes(x)).length,1,name+' unambiguous choices');
   assert.ok(q.options.includes(q.answer));
   for(const option of q.options)assert.equal(/[\u0600-\u06ff]/.test(option),direction==='en',name+' answer language');
  }
 }
});

test('sessions avoid repeated prompts; equivalent translations are never marked as distractors',()=>{
 for(const pool of Object.values(translationPools))for(const direction of ['ar','en']){
  const items=translationSession(pool,direction,random);assert.equal(items.length,10);
  assert.equal(new Set(items.map(x=>direction==='ar'?x.arabic:x.english)).size,10);
 }
 const pair={id:'one',english:'Hello.',arabic:'مرحباً.',topic:'Greeting'};
 const q=translationQuestion(pair,[pair,{...pair,id:'two',english:'Hi.'},{...pair,id:'three',english:'Goodbye.',arabic:'وداعاً.'},{...pair,id:'four',english:'Thanks.',arabic:'شكراً.'},{...pair,id:'five',english:'Yes.',arabic:'نعم.'}],'ar',random);
 assert.ok(q.accepted.includes('Hi.'));assert.ok(!q.options.includes('Hi.'));assert.equal(q.options.length,4);
 for(const group of dialogueGroups)assert.equal(translationSession(translationPools.dialogues.filter(x=>x.groupId===group.id),'ar',random).length,6,group.id+' filter retained');
});

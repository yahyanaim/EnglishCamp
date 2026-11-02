const consistency=require('./fixtures/consistency-content-contract.json');
const notesBrand=require('./fixtures/notes-brand-contract.json');
const violet=require('./fixtures/violet-session-contract.json');
require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const current=require('./fixtures/fullsize-ui-contract.json'),prior=require('./fixtures/reference-ui-contract.json');
const {translationPools,dialogueGroups}=require('../src/data/translation-practice.ts');
const normalize=require('./ui-recovery-normalize.cjs'),catalogue=require('./practice-catalogue-fingerprint.cjs');
const root=path.join(__dirname,'..'),read=file=>fs.readFileSync(path.join(root,file)),hash=value=>crypto.createHash('sha256').update(value).digest('hex');

test('full-window styling and lazy loading preserve teaching content, translation data and saved state',()=>{
 for(const[file,digest]of Object.entries(current.preserved))assert.equal(hash(read(file)),consistency.files[file]?.after??digest,file);
 assert.equal(hash(JSON.stringify({translationPools,dialogueGroups})),current.translationHash,'all 432 bilingual pairs and dialogue filters are identical after splitting their modules');
 assert.equal(hash(JSON.stringify(catalogue(read('src/app/practice/page.tsx').toString()))),consistency.practiceCatalogue?.after??current.practiceCatalogue,'trainer catalogue retains the reviewed presentation and description boundary');
});

test('the presentation update follows the prior reviewed boundary and retains translator scoring logic',()=>{
 for(const[file,delta]of Object.entries(current.files)){
  if(prior.files[file])assert.equal(delta.before,prior.files[file].after,file+' starts at the prior reviewed version');
  assert.equal(hash(read(file)),consistency.files[file]?.after??notesBrand.files[file]?.after??violet.files[file]?.after??delta.after,file+' limited presentation or loading delta');
 }
 for(const[file,delta]of Object.entries(current.practiceLoading)){
  assert.equal(delta.before,prior.practiceCorrections[file].after,file+' prior translator implementation');
  assert.equal(hash(normalize(read(file).toString(),file)),delta.after,file+' module boundary delta');
 }
});

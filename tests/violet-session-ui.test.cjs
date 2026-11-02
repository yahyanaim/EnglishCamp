const consistency=require('./fixtures/consistency-content-contract.json');
const notesBrand=require('./fixtures/notes-brand-contract.json');
require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const current=require('./fixtures/violet-session-contract.json'),prior=require('./fixtures/fullsize-ui-contract.json');
const root=path.join(__dirname,'..'),hash=value=>crypto.createHash('sha256').update(value).digest('hex');

test('violet styling and local profiles preserve all teaching banks, saved progress, scoring and original fonts',()=>{
 for(const[file,digest]of Object.entries(current.preserved))assert.equal(hash(fs.readFileSync(path.join(root,file))),consistency.files[file]?.after??notesBrand.files[file]?.after??digest,file);
 for(const[file,delta]of Object.entries(current.files)){
  if(prior.files[file])assert.equal(delta.before,prior.files[file].after,file+' starts at the prior reviewed version');
  assert.equal(hash(fs.readFileSync(path.join(root,file))),consistency.files[file]?.after??notesBrand.files[file]?.after??delta.after,file+' presentation delta');
 }
});

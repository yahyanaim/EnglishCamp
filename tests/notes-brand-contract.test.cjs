const consistency=require('./fixtures/consistency-content-contract.json');
const {test}=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const contract=require('./fixtures/notes-brand-contract.json'),prior=require('./fixtures/violet-session-contract.json');
const selectors=require('./selector-contract.cjs');
const root=path.join(__dirname,'..'),read=file=>fs.readFileSync(path.join(root,file)),hash=x=>crypto.createHash('sha256').update(x).digest('hex');

test('recaps, notes and branding preserve authored course data, saved learning state and scoring',()=>{
 for(const[file,digest]of Object.entries(contract.preserved))assert.equal(hash(read(file)),consistency.files[file]?.after??digest,file);
 for(const[file,delta]of Object.entries(contract.files)){
  if(prior.files[file])assert.equal(delta.before,prior.files[file].after,file+' prior reviewed boundary');
  assert.equal(hash(read(file)),consistency.files[file]?.after??delta.after,file+' authorised feature delta');
 }
 assert.equal(hash(read('src/app/layout.tsx').toString().split('export const metadata')[0]),contract.fontSetup,'font declarations stay exactly the same');
});

test('all 14 migrated selectors retain their original values, option text and state-update handlers',()=>{
 let count=0;
 for(const[file,digest]of Object.entries(contract.selectors)){
  const current=selectors(read(file).toString(),file);count+=current.length;
  assert.equal(hash(JSON.stringify(current)),consistency.selectors[file]?.after??digest,file);
 }
 assert.equal(count,14);
});

test('the favicon is a real ICO with the new 32px PNG mark',()=>{
 const ico=read('public/favicon.ico');assert.equal(ico.readUInt16LE(2),1);assert.equal(ico[6],32);assert.equal(ico[7],32);
 assert.equal(ico.readUInt32LE(18),22);assert.ok(ico.subarray(22).equals(read('public/media/brand/englishcamp-icon-32.png')));
});

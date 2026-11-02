const consistency=require('./fixtures/consistency-content-contract.json');
const notesBrand=require('./fixtures/notes-brand-contract.json');
const violet=require('./fixtures/violet-session-contract.json');
const fullsize=require('./fixtures/fullsize-ui-contract.json');
require('./register.cjs');
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const contract=require('./fixtures/ui-recovery-contract.json');
const reference=require('./fixtures/reference-ui-contract.json');
const normalize=require('./ui-recovery-normalize.cjs');
const root=path.join(__dirname,'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');

test('UI recovery preserves unaffected practice logic and applies reviewed translator corrections',()=>{
 for(const[file,digest]of Object.entries(contract.logic))assert.equal(hash(normalize(read(file),file)),consistency.practicePresentation[file]?.after??notesBrand.practicePresentation[file]?.after??violet.practicePresentation[file]?.after??fullsize.practiceLoading[file]?.after??reference.practiceCorrections[file]?.after??digest,file);
 for(const[file,digest]of Object.entries(contract.preserved))assert.equal(hash(fs.readFileSync(path.join(root,file))),consistency.files[file]?.after??notesBrand.files[file]?.after??digest,file);
 for(const[file,delta]of Object.entries(contract.files))assert.equal(hash(fs.readFileSync(path.join(root,file))),consistency.files[file]?.after??notesBrand.files[file]?.after??violet.files[file]?.after??fullsize.files[file]?.after??reference.files[file]?.after??delta.after,file+' reviewed presentation/navigation delta');
});

test('English URLs are unique, target existing implementations and preserve locale aliases',async()=>{
 const routes=(await import('../src/lib/english-routes.mjs')).default;
 const config=(await import('../next.config.mjs')).default;
 const redirects=await config.redirects(),rewrites=await config.rewrites();
 assert.equal(new Set(Object.values(routes)).size,Object.keys(routes).length);
 for(const[old,current]of Object.entries(routes)){
  assert.match(current,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(fs.existsSync(path.join(root,'src/app',old,'page.tsx')),old);
  assert.ok(!Object.hasOwn(routes,current),'no redirect loops');
  for(const prefix of ['', '/en','/ar']){
   assert.deepEqual(redirects.find(r=>r.source===prefix+'/'+old+'/:path*'),{source:prefix+'/'+old+'/:path*',destination:prefix+'/'+current+'/:path*',permanent:true});
   assert.deepEqual(rewrites.find(r=>r.source===prefix+'/'+current+'/:path*'),{source:prefix+'/'+current+'/:path*',destination:'/'+old+'/:path*'});
  }
 }
 const nav=read('src/components/layout/Sidebar.tsx')+read('src/components/layout/CommandPalette.tsx')+read('src/data/searchIndex.ts');
 for(const old of Object.keys(routes))assert.ok(!nav.includes('"/'+old+'"'),'legacy navigation '+old);
 let search=read('src/data/searchIndex.ts');
 for(const[old,current]of Object.entries(routes))search=search.replaceAll('"/'+current+'"','"/'+old+'"');
 search=search.replaceAll('sourceLabel: "Verb Conjugation"','sourceLabel: "Conjugaise"');
 assert.equal(search,contract.searchNavigation.before,'search teaching entries change only URL and the translated navigation label');
});

function rgb(hex){return hex.slice(1).match(/../g).map(x=>parseInt(x,16)/255);}
function luminance(c){const x=c.map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return x[0]*.2126+x[1]*.7152+x[2]*.0722;}
function contrast(f,b){const a=luminance(f),c=luminance(b);return(Math.max(a,c)+.05)/(Math.min(a,c)+.05);}
test('semantic feedback text and primary action text meet 4.5:1 in light and dark themes',()=>{
 const css=read('src/app/globals.css');
 const light=css.slice(css.indexOf(':root {'),css.indexOf('.dark {'));
 const dark=css.slice(css.indexOf('.dark {'));
 for(const block of [light,dark]){
  const value=name=>block.match(new RegExp('--color-'+name+':\\s*([^;]+);'))?.[1]?.trim();
  const surface=rgb(value('surface'));
  for(const role of ['success','error','warning','info']){
   const raw=value(role+'-bg');let bg;
   if(raw.startsWith('#'))bg=rgb(raw);
   else{const n=raw.match(/[\d.]+/g).map(Number);bg=n.slice(0,3).map((x,i)=>x/255*n[3]+surface[i]*(1-n[3]));}
   assert.ok(contrast(rgb(value('text-'+role)),bg)>=4.5,role+' on '+raw);
  }
  for(const fill of ['primary','primary-hover'])assert.ok(contrast(rgb(value('on-brand')??light.match(/--color-on-brand:\s*([^;]+);/)[1].trim()),rgb(value(fill)))>=4.5,fill);
 }
});

test('palette follows the approved violet update while font roles and other tokens are preserved',()=>{
 const current={};
 for(const m of read('src/app/globals.css').matchAll(/(--[\w-]+):\s*([^;]+);/g))(current[m[1]]??=[]).push(m[2].trim());
 for(const[name,values]of Object.entries(contract.themeTokens))assert.deepEqual(current[name],violet.themeTokens[name]??values,name);
});

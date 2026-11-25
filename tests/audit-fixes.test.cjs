require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto'),{DatabaseSync}=require('node:sqlite');
const worker=require('../cloudflare/worker.ts').default;
const {CONTENT_SECURITY_POLICY,withSecurityHeaders}=require('../cloudflare/securityHeaders.ts');
const {verifyAdminKey,verifyAdminTotp,totpCode,adminCredentialConfigured}=require('../cloudflare/adminCredential.ts');
const {speechDailyChars}=require('../cloudflare/speechQuota.ts');
const {globalDailyLimit}=require('../cloudflare/aiShared.ts');
const hash=v=>crypto.createHash('sha256').update(v).digest('hex');

function fixture(extra={}){
 const sql=new DatabaseSync(':memory:');sql.exec('PRAGMA foreign_keys=ON');for(const f of fs.readdirSync('migrations').filter(f=>f.endsWith('.sql')).sort())sql.exec(fs.readFileSync('migrations/'+f,'utf8'));
 function prepare(q){let v=[];const execute=()=>({meta:{changes:Number(sql.prepare(q).run(...v).changes)}});return{bind(...a){v=a;return this},async first(){return sql.prepare(q).get(...v)||null},async run(){return execute()},execute}}
 const env={LEARNERS_DB:{prepare,async batch(s){sql.exec('BEGIN');try{const r=s.map(x=>x.execute());sql.exec('COMMIT');return r}catch(e){sql.exec('ROLLBACK');throw e}}},INVITATION_REQUIRED:'true',ASSETS:{fetch:async()=>new Response('<html>EnglishCamp</html>',{headers:{'Content-Type':'text/html'}})},...extra};
 const call=(path,body,cookie='')=>worker.fetch(new Request('https://camp.test'+path,{method:body?'POST':'GET',headers:{origin:'https://camp.test',cookie,...(body?{'Content-Type':'application/json'}:{})},...(body?{body:JSON.stringify(body)}:{})}),env);
 return{sql,env,call};
}

test('F03: every Worker response carries the browser security headers',async()=>{
 const {call}=fixture();
 for(const path of ['/invite','/api/access/session','/missing-api-route','/api/learners/session']){
  const r=await call(path);
  assert.match(r.headers.get('content-security-policy')||'',/frame-ancestors 'none'/,path);
  assert.equal(r.headers.get('x-frame-options'),'DENY');
  assert.equal(r.headers.get('x-content-type-options'),'nosniff');
  assert.equal(r.headers.get('referrer-policy'),'strict-origin-when-cross-origin');
  assert.match(r.headers.get('strict-transport-security')||'',/max-age=31536000/);
  assert.match(r.headers.get('content-security-policy'),/upgrade-insecure-requests$/);
 }
 assert.match(CONTENT_SECURITY_POLICY,/object-src 'none'/);
 assert.match(CONTENT_SECURITY_POLICY,/frame-src https:\/\/www\.youtube-nocookie\.com/);
 const local=withSecurityHeaders(new Request('http://127.0.0.1/'),new Response('x'));
 assert.equal(local.headers.get('strict-transport-security'),null,'no HSTS on plain http');
 assert.ok(!local.headers.get('content-security-policy').includes('upgrade-insecure-requests'));
});

test('F01/F05/F10/F16: delivery and deployment rules stay in place',()=>{
 const deploy=fs.readFileSync('.github/workflows/cloudflare-deploy.yml','utf8');
 const migrate=deploy.indexOf('d1 migrations apply'),ship=deploy.indexOf('npm run deploy:cloudflare');
 assert.ok(migrate>0&&ship>migrate,'migrations are applied before the Worker deploy');
 const pr=fs.readFileSync('.github/workflows/pull-request-checks.yml','utf8');
 for(const step of ['pull_request:','npm run lint','npm run build:cloudflare','npm test'])assert.ok(pr.includes(step),step);
 const config=JSON.parse(fs.readFileSync('wrangler.jsonc','utf8'));
 assert.equal(config.vars.INVITATION_REQUIRED,'true','per-learner AI and speech quotas need invitation access');
 assert.equal(config.observability.enabled,true);
 assert.ok(fs.readFileSync('docs/deployment-rules.md','utf8').includes('INVITATION_REQUIRED'));
});

test('F04: admin key accepts legacy SHA-256 and salted PBKDF2, plus an optional TOTP code',async()=>{
 assert.equal(await verifyAdminKey('correct horse',{INVITATION_ADMIN_HASH:hash('correct horse')}),true);
 assert.equal(await verifyAdminKey('wrong',{INVITATION_ADMIN_HASH:hash('correct horse')}),false);
 const salt=crypto.randomBytes(16),derived=crypto.pbkdf2Sync('correct horse',salt,100000,32,'sha256');
 const pbkdf2=`pbkdf2$100000$${salt.toString('base64')}$${derived.toString('base64')}`;
 assert.equal(adminCredentialConfigured({INVITATION_ADMIN_HASH:pbkdf2}),true);
 assert.equal(await verifyAdminKey('correct horse',{INVITATION_ADMIN_HASH:pbkdf2}),true);
 assert.equal(await verifyAdminKey('correct horsf',{INVITATION_ADMIN_HASH:pbkdf2}),false);
 // RFC 6238 SHA-1 test secret "12345678901234567890" at T=59s → 94287082 (last six digits).
 const secret='GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ';
 assert.equal(await totpCode(secret,1),'287082');
 assert.equal(await verifyAdminTotp('287082',{ADMIN_TOTP_SECRET:secret},59000),true);
 assert.equal(await verifyAdminTotp('000000',{ADMIN_TOTP_SECRET:secret},59000),false);
 assert.equal(await verifyAdminTotp(undefined,{},59000),true,'no second factor configured');
});

test('F04: login requires the authenticator code when TOTP is configured',async()=>{
 const secret='GEZDGNBVGY3TQOJQGEZDGNBVGY3TQOJQ';
 const {call}=fixture({INVITATION_ADMIN_HASH:hash('owner key'),ADMIN_TOTP_SECRET:secret});
 const status=await (await call('/api/invitations/admin/session')).json();
 assert.equal(status.twoFactor,true);
 assert.equal((await call('/api/invitations/admin/login',{password:'owner key'})).status,401);
 const code=await totpCode(secret,Math.floor(Date.now()/30000));
 const ok=await call('/api/invitations/admin/login',{password:'owner key',code});
 assert.equal(ok.status,200);assert.match(ok.headers.get('set-cookie')||'',/HttpOnly/);
});

test('F08/F09: speech and global AI caps are bounded and configurable',()=>{
 assert.equal(speechDailyChars({}),30000);
 assert.equal(speechDailyChars({SPEECH_DAILY_CHARS_PER_LEARNER:'5000'}),5000);
 assert.equal(speechDailyChars({SPEECH_DAILY_CHARS_PER_LEARNER:'10'}),30000);
 assert.equal(globalDailyLimit('coach',{}),200);
 assert.equal(globalDailyLimit('pronunciation',{}),100);
 assert.equal(globalDailyLimit('coach',{AI_COACH_DAILY_GLOBAL:'500'}),500);
 assert.equal(globalDailyLimit('coach',{AI_COACH_DAILY_GLOBAL:'abc'}),200);
});

test('F08: a learner over the daily speech allowance is refused before the provider is called',async()=>{
 const {sql,env,call}=fixture({AZURE_SPEECH_KEY:'synthetic',AZURE_SPEECH_REGION:'westeurope',SPEECH_DAILY_CHARS_PER_LEARNER:'1000'});
 const code='ECI-'+'s'.repeat(32);sql.prepare("INSERT INTO cloud_invitations(id,code_hash,display_code,label,created_at,expires_at) VALUES('t',?,'m','Fixture',unixepoch(),9999999999)").run(hash(code));
 const created=await call('/api/learners/create',{name:'Synthetic speech learner',invitationCode:code,progress:{},badges:{}});assert.equal(created.status,201);
 const cookie=created.headers.get('set-cookie').split(';')[0];
 const big=await worker.fetch(new Request('https://camp.test/api/speech',{method:'POST',headers:{origin:'https://camp.test',cookie,'Content-Type':'application/json'},body:JSON.stringify({text:'a'.repeat(1200),approvedPersonal:true})}),env);
 assert.equal(big.status,429);assert.equal((await big.json()).code,'speech_limit');
});

test('F12/F13: search highlighting escapes content and notes metadata writes are guarded',()=>{
 const search=fs.readFileSync('src/app/search/page.tsx','utf8');
 assert.match(search,/const safeText = escapeHtml\(text\)/);
 assert.match(fs.readFileSync('src/components/session/CloudNotesProvider.tsx','utf8'),/function save\(id:string,data:Metadata\)\{try\{localStorage\.setItem/);
});

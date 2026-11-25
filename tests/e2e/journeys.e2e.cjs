/**
 * Browser journeys against the real Worker, local D1 and exported pages (wrangler dev).
 * Run after `npm run build:cloudflare`:
 *   npm i --no-save playwright@1.63.0 && npx playwright install chromium
 *   node --test tests/e2e/
 * Uses synthetic invitations and a synthetic admin key in a throwaway local database;
 * it never contacts Cloudflare, PayPal, OpenAI or Azure.
 */
const {test,before,after}=require('node:test'),assert=require('node:assert/strict');
const {spawn,spawnSync}=require('node:child_process'),crypto=require('node:crypto'),fs=require('node:fs'),os=require('node:os'),path=require('node:path'),net=require('node:net');
const {chromium}=require(process.env.E2E_PLAYWRIGHT||'playwright');

const root=path.join(__dirname,'..','..'),sha=v=>crypto.createHash('sha256').update(v).digest('hex');
const ADMIN_KEY='e2e-'+crypto.randomBytes(12).toString('hex');
const codes=Array.from({length:4},()=>'ECI-'+crypto.randomBytes(24).toString('base64url').slice(0,32));
let server,browser,base,state,serverLog='';

const freePort=()=>new Promise(resolve=>{const s=net.createServer();s.listen(0,'127.0.0.1',()=>{const {port}=s.address();s.close(()=>resolve(port));});});
function wrangler(args){
 const r=spawnSync('npx',['wrangler',...args],{cwd:root,encoding:'utf8',env:{...process.env,WRANGLER_SEND_METRICS:'false',CI:'true'}});
 if(r.status!==0)throw new Error(`wrangler ${args.slice(0,3).join(' ')} failed:\n${r.stdout}\n${r.stderr}`);
}

before(async()=>{
 assert.ok(fs.existsSync(path.join(root,'.cloudflare-build/app/out/index.html')),'run npm run build:cloudflare first');
 state=fs.mkdtempSync(path.join(os.tmpdir(),'englishcamp-e2e-'));
 wrangler(['d1','migrations','apply','englishcamp-learners','--local','--persist-to',state]);
 const seed=path.join(state,'seed.sql');
 fs.writeFileSync(seed,codes.map((c,i)=>`INSERT INTO cloud_invitations(id,code_hash,display_code,label,created_at,expires_at) VALUES('e2e-${i}','${sha(c)}','e2e-${i}','E2E',unixepoch(),unixepoch()+86400);`).join('\n'));
 wrangler(['d1','execute','englishcamp-learners','--local','--persist-to',state,'--file',seed]);
 const port=await freePort();base=`http://127.0.0.1:${port}/`;
 server=spawn('npx',['wrangler','dev','--local','--persist-to',state,'--ip','127.0.0.1','--port',String(port),'--var',`INVITATION_ADMIN_HASH:${sha(ADMIN_KEY)}`],{cwd:root,env:{...process.env,WRANGLER_SEND_METRICS:'false'},detached:true});
 server.stdout.on('data',d=>serverLog+=d);server.stderr.on('data',d=>serverLog+=d);
 for(let i=0;i<120&&!/Ready on/.test(serverLog);i++)await new Promise(r=>setTimeout(r,500));
 assert.match(serverLog,/Ready on/,'wrangler dev did not start:\n'+serverLog.slice(-2000));
 browser=await chromium.launch();
});

after(async()=>{
 await browser?.close();
 if(server)try{process.kill(-server.pid,'SIGTERM');}catch{}
 if(state)fs.rmSync(state,{recursive:true,force:true});
});

async function page(){
 const context=await browser.newContext(),p=await context.newPage(),errors=[];
 p.on('pageerror',e=>errors.push(e.message));
 return {context,p,errors};
}
async function createAccount(p,name,code,next){
 await p.goto(base+'invite?next='+encodeURIComponent(next),{waitUntil:'networkidle'});
 await p.getByRole('button',{name:'Create account'}).first().click();
 await p.fill('#invite-name',name);await p.fill('#invite-email','e2e@example.invalid');await p.fill('#invite-code',code);
 await p.locator('form button[type=submit]').click();
 const recovery=(await p.locator('text=/EC1-[A-Za-z0-9_-]{20,}/').first().innerText({timeout:15000})).trim();
 await p.getByRole('button',{name:/I saved my code/}).click();
 await p.waitForURL(u=>new URL(u).pathname===next,{timeout:15000});
 return recovery;
}

test('J1: signed-out visitors are sent to the invitation page and pages are never cached',async()=>{
 const {context,p}=await page();
 const redirect=await p.request.get(base+'dashboard',{maxRedirects:0});
 assert.equal(redirect.status(),303);assert.match(redirect.headers()['cache-control']||'',/no-store/);
 await p.goto(base+'dashboard',{waitUntil:'networkidle'});
 assert.equal(new URL(p.url()).pathname,'/invite');assert.equal(new URL(p.url()).searchParams.get('next'),'/dashboard');
 const api=await p.request.get(base+'api/progress');assert.equal(api.status(),401);
 await context.close();
});

test('J2: an invitation creates an account once, and the code cannot be reused',async()=>{
 const {context,p,errors}=await page();
 const recovery=await createAccount(p,'E2E Learner',codes[0],'/dashboard');
 assert.match(recovery,/^EC1-/);
 assert.ok((await p.locator('main').innerText()).length>50,'dashboard renders');
 const again=await browser.newContext(),q=await again.newPage();
 await q.goto(base+'invite?next=/dashboard',{waitUntil:'networkidle'});
 await q.getByRole('button',{name:'Create account'}).first().click();
 await q.fill('#invite-name','Second Person');await q.fill('#invite-email','e2e@example.invalid');await q.fill('#invite-code',codes[0]);
 await q.locator('form button[type=submit]').click();
 await q.waitForTimeout(1500);
 assert.equal(new URL(q.url()).pathname,'/invite','a redeemed code does not open the app');
 assert.equal(await q.locator('text=/EC1-/').count(),0);
 assert.deepEqual(errors,[]);
 await again.close();await context.close();
});

test('J3: a word saved while reading follows the learner to a second device',async()=>{
 const {context,p,errors}=await page();
 const recovery=await createAccount(p,'Bank Tester',codes[1],'/reading');
 await p.locator('.camp-reading-card, [data-lesson-id], button:has-text("Read")').first().click();
 const word=p.locator('[data-word-index]').nth(5);await word.waitFor();
 const text=(await word.innerText()).trim().toLowerCase().replace(/[^a-z']/g,'');
 await word.click();
 await p.getByRole('button',{name:'Save to My Bank'}).click();
 await p.waitForTimeout(2500);// cloud sync is debounced
 const other=await browser.newContext(),q=await other.newPage();
 await q.goto(base+'invite?next=/vocabulary',{waitUntil:'networkidle'});
 await q.fill('#invite-name','Bank Tester');await q.fill('#invite-code',recovery);
 await q.locator('form button[type=submit]').click();
 await q.waitForURL('**/vocabulary',{timeout:15000});
 await q.getByText(text,{exact:true}).first().waitFor({timeout:15000});
 assert.deepEqual(errors,[]);
 await other.close();await context.close();
});

test('J4: lessons, exercises and search work for a signed-in learner',async()=>{
 const {context,p,errors}=await page();
 await createAccount(p,'Course Tester',codes[2],'/dashboard');
 await p.goto(base+'levels/band4-5/lessons/band1-grammar-articles',{waitUntil:'networkidle'});
 assert.ok((await p.locator('h1').first().innerText()).length>3,'lesson heading');
 await p.goto(base+'exercises/band1-listening-format',{waitUntil:'networkidle'});
 const src=await p.locator('audio[aria-label="Task audio"]').first().getAttribute('src');
 const duration=await p.evaluate(s=>new Promise(r=>{const a=new Audio(s);a.onloadedmetadata=()=>r(a.duration);a.onerror=()=>r(-1);a.load();}),src);
 assert.ok(duration>1,'task audio loads ('+src+')');
 await p.goto(base+'search',{waitUntil:'networkidle'});
 await p.fill('input','present perfect');
 await p.getByText(/Found [1-9]\d* match/).first().waitFor({timeout:10000});
 assert.deepEqual(errors,[]);
 await context.close();
});

test('J5: administration stays behind the owner key',async()=>{
 const {context,p}=await page();
 await p.goto(base+'admin/content',{waitUntil:'networkidle'});
 assert.equal(new URL(p.url()).pathname,'/admin/login');
 await p.fill('#owner-key','not-the-key');await p.locator('form button[type=submit]').click();
 await p.getByText('The management key is incorrect.').waitFor();
 await p.fill('#owner-key',ADMIN_KEY);await p.locator('form button[type=submit]').click();
 await p.waitForURL('**/admin/dashboard',{timeout:15000});
 const learnerOnly=await browser.newContext(),q=await learnerOnly.newPage();
 await q.goto(base+'admin/dashboard',{waitUntil:'networkidle'});
 assert.equal(new URL(q.url()).pathname,'/admin/login','a learner session is not an admin session');
 await learnerOnly.close();await context.close();
});

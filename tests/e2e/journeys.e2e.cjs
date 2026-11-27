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
const codes=Array.from({length:5},()=>'ECI-'+crypto.randomBytes(24).toString('base64url').slice(0,32));
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

test('J6: after the CEFR check, the study plan builds a 26-week route to the next level and keeps checkpoint answers',async()=>{
 require(path.join(root,'tests/register.cjs'));
 const {PLACEMENT_QUESTIONS:Q,PLACEMENT_VERSION}=require(path.join(root,'src/data/placement/questions.ts'));
 const L=['A1','A2','B1','B2','C1'],answers=Object.fromEntries(Q.map(q=>[q.id,L.indexOf(q.level)<=L.indexOf('B1')?q.answer:-1]));
 const record={version:1,status:'complete',answers,startedAt:'2026-11-20T10:00:00Z',results:[{id:'e2e-placement-b1',completedAt:'2026-11-20T10:30:00Z',version:PLACEMENT_VERSION,answers}],schedule:null};
 const {context,p,errors}=await page();
 await createAccount(p,'Route Tester',codes[4],'/dashboard');
 // Store a B1 placement result for this learner exactly where the app keeps it.
 await p.evaluate(rec=>{const profile=JSON.parse(sessionStorage.getItem('englishcamp-session-profile-v1'));const key=profile.cloudId?`englishcamp-cloud-learner-v1:${profile.cloudId}:englishcamp-placement-v1`:`englishcamp-learner-v1:${profile.number}:englishcamp-placement-v1`;(profile.cloudId?localStorage:sessionStorage).setItem(key,JSON.stringify(rec));},record);
 await p.goto(base+'study-plan',{waitUntil:'networkidle'});
 assert.match(await p.locator('button[aria-label="Planning window"]').innerText(),/6 months · CEFR route/,'learners with a CEFR result start on the 6-month route');
 assert.match(await p.locator('button[aria-label="Plan level"]').innerText(),/B1/);
 await p.locator('button[aria-label="Session length"]').click();await p.getByRole('option',{name:'90 minutes'}).click();
 const saturday=p.locator('.camp-study-days label',{hasText:'Sat'}).locator('input');if(!(await saturday.isChecked()))await saturday.click();
 await p.getByRole('button',{name:'Save my study timetable'}).click();
 await p.locator('#route-heading').waitFor({timeout:10000});
 assert.match(await p.locator('#route-heading').innerText(),/B1\s*→?\s*(to\s*)?B2/);
 assert.equal(await p.locator('.camp-route-exam strong').innerText(),'B2 First');
 assert.equal(await p.locator('.camp-route-step').count(),6,'six monthly steps in the study roadmap');
 assert.equal(await p.locator('.camp-route-gantt-bar').count(),6,'six bars in the study schedule');
 assert.equal(await p.locator('.camp-route-gantt-diamond').count(),6,'six checkpoints in the study schedule');
 const courses=await p.locator('.camp-route-courses li strong').allInnerTexts();
 assert.ok(courses.includes('Foundation & B2 First Course')&&courses.includes('EnglishCamp route lessons'),'courses: '+courses.join(', '));
 assert.equal(await p.locator('.camp-route-checks > ol > li').count(),6);

 // Study calendar (AIHubTools career calendar): week grid, drawer, month view.
 const cal=p.locator('.camp-cal');
 assert.ok(await cal.locator('.camp-cal-desktop .camp-cal-event').count()>=6,'this week shows its six sessions in the hour grid');
 assert.equal(await cal.locator('.camp-cal-phases button').count(),6);
 assert.equal(await p.locator('.camp-route-verdict').getAttribute('data-verdict'),'on-track','six 90-minute sessions reach about 200 hours');

 await cal.locator('.camp-cal-event:visible').first().click();
 const drawer=p.getByRole('dialog');
 await drawer.getByRole('button',{name:'Mark session done'}).click();
 assert.equal(await drawer.locator('.camp-cal-chip-state').innerText(),'Done');
 await drawer.getByRole('button',{name:'Close'}).click();
 assert.equal(await cal.locator('.camp-cal-event:visible').first().getAttribute('data-done'),'true');
 await cal.getByRole('button',{name:'Next week'}).click();
 assert.match(await cal.locator('.camp-cal-range').innerText(),/^W\d+\/26/);
 await cal.getByRole('button',{name:'Month',exact:true}).click();
 assert.equal(await cal.locator('.camp-cal-month-week').count(),4,'month view shows four weeks');
 await cal.getByRole('button',{name:'Day',exact:true}).click();
 assert.equal(await cal.locator('.camp-cal-daychips button').count(),7);
 const firstCheck=p.locator('.camp-route-checks > ol > li').first();
 if(await firstCheck.locator('details').getAttribute('open')===null)await firstCheck.locator('summary').click();
 await firstCheck.locator('.camp-route-weak button',{hasText:'Speaking'}).click();
 await p.reload({waitUntil:'networkidle'});
 assert.match(await p.locator('.camp-route-progress-label').innerText(),/^1 of 156 sessions done/);
 assert.deepEqual(await p.locator('.camp-route-step').nth(1).locator('.camp-route-step-tags span[data-boost="true"]').allInnerTexts(),['Grammar & vocabulary +','Speaking +'],'the checkpoint answer gives speaking more time from month 2');
 assert.deepEqual(await p.locator('.camp-route-step').first().locator('.camp-route-step-tags span[data-boost="true"]').allInnerTexts(),['Grammar & vocabulary +'],'month 1 keeps the placement priority only');
 // Open a route lesson from month 1, answer it, complete it, and see it ticked in the plan.
 const {ROUTE_LESSONS}=require(path.join(root,'src/data/route-lessons.ts'));
 const lesson=ROUTE_LESSONS.find(l=>l.id==='b1-present-perfect');
 await p.locator('.camp-route-step').first().getByRole('link',{name:lesson.title}).click();
 await p.waitForURL(u=>new URL(u).pathname==='/study-plan/lesson/b1-present-perfect',{timeout:15000});
 assert.equal(await p.locator('h1').first().innerText(),lesson.title);
 const items=p.locator('.camp-route-quiz > li');
 for(let i=0;i<lesson.practice.length;i++)await items.nth(i).getByText(lesson.practice[i].options[lesson.practice[i].answer],{exact:true}).click();
 await p.getByRole('button',{name:'Check answers'}).click();
 assert.match(await p.locator('.camp-route-quiz-actions').innerText(),/5 \/ 5 correct/);
 for(const box of await p.locator('.camp-route-checklist input').all())await box.check();
 await p.getByRole('button',{name:/Mark lesson complete/}).click();
 assert.match(await p.locator('.camp-route-lesson-done').innerText(),/Lesson complete · \+25 XP/);
 // A first-ever XP award opens the existing "First Steps" badge celebration; close it like a learner would.
 const badge=p.getByRole('dialog',{name:/Congratulations/});
 if(await badge.isVisible({timeout:3000}).catch(()=>false))await badge.getByRole('button',{name:'Keep learning'}).click();
 await p.getByRole('link',{name:'Back to my plan'}).click();
 await p.locator('.camp-route-step').first().waitFor();
 assert.equal(await p.locator('.camp-route-step').first().locator('li',{hasText:lesson.title}).getAttribute('data-done'),'true','the plan shows the lesson as done');
 assert.deepEqual(errors,[]);
 await context.close();
});

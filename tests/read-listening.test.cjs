require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const {DatabaseSync}=require('node:sqlite');
const {ALL_ARTICLES}=require('../src/data/articles/index.ts');
const {READING_LESSONS,CEFR_LEVELS,readingMinutes,readingLessonById}=require('../src/data/reading-lessons.ts');
const {VOA_LISTENING}=require('../src/data/voa-listening.ts');
const {BUNDLED_LISTENING,clipQuestions,recommendLessons,safeVoaAudio,voaArticleId}=require('../src/lib/listeningLessons.ts');
const C=require('../src/lib/comprehension.ts');
const {lookupWord}=require('../src/lib/vocabularyLookup.ts');
const {applyCatalogue,validateReadingPayload,validateListeningPayload}=require('../src/lib/learningContent.ts');
const {cleanEvents}=require('../src/lib/cloudProgress.ts');
const {useProgress}=require('../src/store/useProgress.ts');
const {importVoaDraft}=require('../cloudflare/learningContent.ts');
const worker=require('../cloudflare/worker.ts').default;
const src=file=>fs.readFileSync(file,'utf8');
const origin='https://camp.test';

test('Vocabulary is word learning only: no reading, listening or audio-lesson views remain',()=>{
 const page=src('src/app/vocabulary/page.tsx');
 for(const removed of ['VocabularyListening','ArticleReader','"listening" as const','"read" as const','Read & Listen','Headphones','ALL_ARTICLES'])assert.ok(!page.includes(removed),removed);
 for(const kept of ['"browse" as const','"bank" as const','"quiz" as const','"write" as const','VocabularyPractice','exportWords','importWords'])assert.ok(page.includes(kept),kept);
 assert.match(page,/<h1>Vocabulary<\/h1>/);
 assert.match(page,/requested === "read"\) router\.replace\("\/reading"\)/);assert.match(page,/requested === "listening"\) router\.replace\("\/listening"\)/);
 assert.ok(!fs.existsSync('src/components/learn/VocabularyListening.tsx')&&!fs.existsSync('src/components/learn/ArticleReader.tsx'));
 // Shared audio utilities stay available for other sections.
 for(const kept of ['src/lib/readingAudio.ts','src/lib/naturalSpeech.ts','src/components/ui/SpeakerButton.tsx'])assert.ok(fs.existsSync(kept),kept);
});

test('navigation places Listening directly below Vocabulary and renames Read & Listen to Read everywhere',()=>{
 const sidebar=src('src/components/layout/Sidebar.tsx'),main=sidebar.slice(sidebar.indexOf('const NAV_MAIN'),sidebar.indexOf('const NAV_SECTIONS'));
 const hrefs=[...main.matchAll(/href: "([^"]+)", label: "([^"]+)"/g)].map(m=>[m[1],m[2]]);
 const i=hrefs.findIndex(([href])=>href==='/vocabulary');
 assert.deepEqual(hrefs[i+1],['/listening','Listening']);assert.deepEqual(hrefs[i+2],['/reading','Read']);
 assert.ok(!/href: "\/vocabulary", label: "Reading"/.test(sidebar));
 const palette=src('src/components/layout/CommandPalette.tsx');assert.match(palette,/label: "Listening", href: "\/listening"/);assert.match(palette,/label: "Read", href: "\/reading"/);
 assert.match(src('src/components/layout/TopBar.tsx'),/"\/reading": "Read"/);assert.match(src('src/components/layout/TopBar.tsx'),/"\/vocabulary": "Vocabulary",/);
 const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(d+'/'+e.name):[d+'/'+e.name]);
 for(const file of walk('src').filter(f=>/\.(tsx?|css)$/.test(f)))assert.ok(!/Read\s*(&|&amp;)\s*Listen/i.test(src(file)),file);
 assert.match(src('src/app/reading/page.tsx'),/<h1>Read<\/h1>/);assert.match(src('src/app/listening/page.tsx'),/<h1>Listening<\/h1>/);
 assert.ok(!src('scripts/build-cloudflare.cjs').includes('ReadingRedirect'),'the static build ships the Read page');
});

test('Read is text-only: no audio controls, no full Arabic translation and no hidden Play buttons',()=>{
 for(const file of ['src/components/learn/ReadingSection.tsx','src/components/learn/ReadingLessonView.tsx','src/app/reading/page.tsx']){
  const code=src(file);
  for(const banned of ['<audio','Play','Pause','playbackRate','speed','NaturalSpeech','SpeakerButton','articleRecording','wordRecording','.ar}','Show Arabic','Arabic translation"','camp-reader-arabic','Words from'])assert.ok(!code.includes(banned),`${file}: ${banned}`);
 }
 assert.match(src('src/components/learn/ReadingLessonView.tsx'),/heading="Comprehension Questions"/);
 // Migrated lessons carry English paragraphs only; Arabic exists only in the word glossary.
 for(const lesson of READING_LESSONS){for(const p of lesson.paragraphs){assert.equal(typeof p,'string');assert.ok(!/[؀-ۿ]/.test(p),lesson.id);}}
});

test('word lookups give single-word Arabic meanings and never fall back to a paragraph translation',()=>{
 const garden=readingLessonById('community-garden');
 const soil=lookupWord('soil.',garden,0);assert.equal(soil.translationKind,'word');assert.match(soil.meaning,/[؀-ۿ]/);assert.ok(soil.example.includes('soil'));
 const plural=lookupWord('neighbours',garden,0);assert.equal(plural.translationKind,'word','simple inflections reuse the singular entry');
 const unknown=lookupWord('zzqx',garden,0);assert.equal(unknown.meaning,'');assert.equal(unknown.translationKind,'none');
 for(const article of ALL_ARTICLES)for(const [i] of article.paragraphs.entries()){const r=lookupWord('zzqx',readingLessonById(article.id),i);assert.ok(!article.paragraphs.some(p=>p.ar===r.meaning&&r.meaning));}
});

test('reading passages cover A1–C2 with complete lesson data and preserve every original article',()=>{
 assert.deepEqual([...CEFR_LEVELS],['A1','A2','B1','B2','C1','C2']);
 for(const level of CEFR_LEVELS)assert.ok(READING_LESSONS.some(l=>l.level===level),level);
 assert.ok(READING_LESSONS.filter(l=>l.level==='A1').length>=7&&READING_LESSONS.filter(l=>l.level==='B1').length>=10);
 assert.equal(new Set(READING_LESSONS.map(l=>l.id)).size,READING_LESSONS.length);
 for(const article of ALL_ARTICLES){const lesson=readingLessonById(article.id);assert.ok(lesson,article.id);assert.deepEqual(lesson.paragraphs,article.paragraphs.map(p=>p.en));assert.equal(lesson.status,'published');assert.equal(lesson.category,article.category);}
 const words=l=>l.paragraphs.join(' ').split(/\s+/).length,avg=level=>{const xs=READING_LESSONS.filter(l=>l.level===level).map(words);return xs.reduce((a,b)=>a+b,0)/xs.length;};
 assert.ok(avg('A1')<avg('A2')&&avg('A2')<avg('B1')&&avg('B1')<avg('C1')&&avg('B2')<avg('C2'),'complexity grows with level');
 for(const lesson of READING_LESSONS){
  assert.ok(lesson.title&&lesson.category&&readingMinutes(lesson)>=1);
  assert.ok(lesson.questions.length>=4,lesson.id);assert.ok(lesson.questions.some(q=>q.skill==='main-idea'),lesson.id);
  assert.ok(new Set(lesson.questions.map(q=>q.type)).size>=2,lesson.id);
  const text=lesson.paragraphs.join(' ');
  for(const q of lesson.questions){
   assert.ok(text.includes(q.evidence),`${q.id} evidence is quoted from its own passage`);assert.ok(q.feedback.trim());
   if(q.type==='multiple-choice'){assert.ok(q.choices.length>=3&&new Set(q.choices).size===q.choices.length);assert.ok(q.choices[q.correct]);}
   if(q.type==='short-answer')assert.ok(q.answers.length>=1);
  }
 }
 // New beginner passages are not shown until an administrator publishes them.
 const fresh=READING_LESSONS.filter(l=>!l.articleId);assert.ok(fresh.length>=3&&fresh.every(l=>l.status==='review'));
 const visible=applyCatalogue(READING_LESSONS,{},[]);assert.ok(!visible.some(l=>l.status!=='published'));assert.equal(visible.length,ALL_ARTICLES.length);
 const published=applyCatalogue(READING_LESSONS,{'a1-omar-morning':{status:'published'},'community-garden':{status:'hidden'},'tech-computers':{status:'published',level:'A1'}},[]);
 assert.ok(published.some(l=>l.id==='a1-omar-morning'));assert.ok(!published.some(l=>l.id==='community-garden'));assert.equal(published.find(l=>l.id==='tech-computers').level,'A1');
 const mcq=READING_LESSONS.flatMap(l=>l.questions).filter(q=>q.type==='multiple-choice');assert.equal(new Set(mcq.map(q=>q.correct)).size,4,'answer keys are not always in the same position');
});

test('comprehension scoring is deterministic and rewards each lesson only once',()=>{
 const [mc,tf,sa]=[
  {id:'a',type:'multiple-choice',choices:['x','y','z'],correct:2},{id:'b',type:'true-false',correct:false},{id:'c',type:'short-answer',answers:['seven to eight','7-8']}];
 assert.ok(C.isCorrect(mc,2)&&!C.isCorrect(mc,1)&&!C.isCorrect(mc,undefined));
 assert.ok(C.isCorrect(tf,false)&&!C.isCorrect(tf,true));
 for(const ok of ['Seven to eight.','  7 to 8 ','the seven to eight','7-8'])assert.ok(C.isCorrect(sa,ok),ok);
 for(const bad of ['','eight','seven','7 8 9'])assert.ok(!C.isCorrect(sa,bad),bad);
 assert.ok(C.isCorrect({type:'gap-fill',answers:['Pete']},'pete!'));
 assert.deepEqual(C.scoreAnswers([mc,tf,sa],{a:2,b:true,c:'7 to 8'}),{correct:2,total:3,percent:67});
 assert.equal(C.skillLessonXp(4,4),20);assert.equal(C.skillLessonXp(0,4),5);assert.equal(C.skillLessonXp(9,4),20);assert.equal(C.skillLessonXp(1,0),0);
 useProgress.getState().reset();const key=C.readingExerciseId('community-garden');
 assert.equal(useProgress.getState().completeExercise(key,C.skillLessonXp(3,4)),15);assert.equal(useProgress.getState().completeExercise(key,20),0,'a second submission cannot earn more XP');
 assert.equal(useProgress.getState().xp,15);assert.equal(useProgress.getState().events.filter(e=>e.source===key).length,1);
});

test('the server caps Read and Listening rewards whatever a client claims',()=>{
 const at=new Date().toISOString();
 const events=cleanEvents([{id:'1',kind:'exercise',source:'reading:community-garden',xp:9999,at},{id:'2',kind:'exercise',source:'listening:find-a-pen',xp:15,at},{id:'3',kind:'exercise',source:'idiom-1',xp:50,at}]);
 assert.deepEqual(events.map(e=>e.xp),[C.SKILL_LESSON_MAX_XP,15,50]);
});

test('every Listening lesson offers varied, grounded questions and reuses the verified VOA catalogue',()=>{
 assert.equal(BUNDLED_LISTENING.length,VOA_LISTENING.length);
 for(const clip of VOA_LISTENING){
  const questions=clipQuestions(clip),types=new Set(questions.map(q=>q.type));
  assert.ok(questions.length>=3&&types.has('multiple-choice')&&types.has('true-false'),clip.id);
  assert.ok(questions.some(q=>q.skill==='main-idea'));assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
  const main=questions[0];assert.equal(main.choices[main.correct],clip.description);assert.ok(main.choices.length>=3);
  const replaced=clip.questions[clip.trueFalse.replaces];assert.ok(!questions.some(q=>q.prompt===replaced.prompt),'a fact is not asked twice');
  if(clip.gap){const gap=questions.find(q=>q.type==='gap-fill');assert.ok(clip.transcriptExcerpt.includes(gap.evidence));assert.ok(gap.prompt.includes('___'));}
 }
 assert.ok(BUNDLED_LISTENING.some(l=>l.questions.some(q=>q.type==='gap-fill')));
 assert.equal(new Set(VOA_LISTENING.map(c=>c.articleId)).size,VOA_LISTENING.length,'no VOA lesson is listed twice');assert.equal(new Set(VOA_LISTENING.map(c=>c.audioUrl)).size,VOA_LISTENING.length);
 for(const lesson of BUNDLED_LISTENING){assert.ok(safeVoaAudio(lesson.audioUrl),lesson.id);assert.equal(voaArticleId(lesson.sourceUrl)!==null,true);assert.match(lesson.attribution,/VOA Learning English/);}
 const done=new Set(['meet-your-neighbor']);const next=recommendLessons(BUNDLED_LISTENING,id=>done.has(id),'B1',3);assert.ok(next.every(l=>l.level==='B1'));
 assert.ok(recommendLessons(BUNDLED_LISTENING,id=>done.has(id)).every(l=>l.level==='A1'&&l.id!=='meet-your-neighbor'));
 const page=src('src/components/learn/ListeningSection.tsx');
 const pager=src('src/components/learn/LibraryPagination.tsx');assert.match(pager,/aria-current=\{n === page \? "page"/);
 for(const file of ['src/components/learn/ReadingSection.tsx','src/components/learn/ListeningSection.tsx']){const code=src(file);assert.match(code,/LibraryPagination/);assert.match(code,/pageSlice\(/);assert.match(code,/setPage\(1\)/,'filters return to the first page');}
 for(const feature of ['<audio','playbackRate','type="range"','Replay from the start','Resume','savePosition','Show transcript','role="alert"','Search listening lessons','Listening level','Listening topic','Continue listening','Suggested for you'])assert.ok(page.includes(feature),feature);
 assert.match(page,/\/api\/listening\/audio\?id=/);
});

test('external VOA addresses are validated strictly; nothing user-supplied is fetched',async()=>{
 for(const good of ['https://learningenglish.voanews.com/a/7941440.html','https://learningenglish.voanews.com/a/some-title/7941440.html'])assert.equal(voaArticleId(good),7941440);
 for(const bad of ['http://learningenglish.voanews.com/a/7941440.html','https://evil.test/a/7941440.html','https://learningenglish.voanews.com.evil.test/a/7941440.html','https://user:pw@learningenglish.voanews.com/a/7941440.html','https://learningenglish.voanews.com/a/../../x/7941440.html','javascript:alert(1)',42])assert.equal(voaArticleId(bad),null,String(bad));
 assert.ok(safeVoaAudio('https://voa-audio.voanews.eu/vle/2016/02/08/49485bf8-4277-47f6-9abe-617ee2473f8c.mp3'));
 for(const bad of ['https://evil.test/vle/1/a.mp3','https://voa-audio.voanews.eu/vle/1/a.mp3?x=1','https://voa-audio.voanews.eu/other/a.mp3'])assert.equal(safeVoaAudio(bad),null,bad);
 const audio='https://voa-audio.voanews.eu/vle/2025/01/01/new-lesson.mp3',requested=[];
 const page=`<meta property="og:title" content="Let&#39;s Learn &amp; Listen"><meta property="og:description" content="A short lesson."><audio><source src="${audio}"></audio>`;
 const draft=await importVoaDraft('https://learningenglish.voanews.com/a/some-slug/7000001.html?utm=1',async(url,options)=>{requested.push(url);assert.equal(options.redirect,'manual');
  return requested.length===1?new Response(null,{status:301,headers:{Location:'/a/lets-learn/7000001.html'}}):new Response(page);});
 assert.deepEqual(requested,['https://learningenglish.voanews.com/a/7000001.html','https://learningenglish.voanews.com/a/lets-learn/7000001.html']);
 assert.equal(draft.payload.title,"Let's Learn & Listen");assert.equal(draft.payload.audioUrl,audio);assert.equal(draft.payload.level,null,'levels are assigned by an administrator, never copied');
 await assert.rejects(importVoaDraft('https://learningenglish.voanews.com/a/7000001.html',async()=>new Response(null,{status:302,headers:{Location:'https://evil.test/a/7000001.html'}})),/unexpected address/);
 await assert.rejects(importVoaDraft('https://169.254.169.254/a/7000001.html',async()=>assert.fail('must not fetch')),/VOA Learning English article/);
});

test('administrator content must be complete, sanitized and grounded before publication',()=>{
 const reading={title:'  A <b>Walk</b>\u0000 ',level:'A1',category:'Daily life',paragraphs:['I walk to the park every morning. It is green and quiet.'],glossary:[{word:'park',ar:'حديقة عامة',def:'A public garden.'}],
  questions:[{type:'multiple-choice',skill:'main-idea',prompt:'What is it about?',choices:['A walk','A car'],correct:0,evidence:'I walk to the park',feedback:'It describes a walk.'},
   {type:'true-false',skill:'detail',prompt:'The park is noisy.',correct:false,evidence:'It is green and quiet.',feedback:'It is quiet.'},
   {type:'short-answer',skill:'detail',prompt:'When?',answers:['every morning'],evidence:'every morning',feedback:'Every morning.'}]};
 const ok=validateReadingPayload(reading,'read-a-walk-1',true);assert.deepEqual(ok.errors,[]);assert.equal(ok.value.title,'A <b>Walk</b>','stored as plain text; React escapes markup on display');
 const ungrounded=validateReadingPayload({...reading,questions:[...reading.questions.slice(0,2),{...reading.questions[2],evidence:'invented words'}]},'x',true);assert.equal(ungrounded.value,null);assert.match(ungrounded.errors.join(' '),/evidence must be copied exactly/);
 assert.equal(validateReadingPayload({...reading,level:'Band 4'},'x',true).value,null);
 const listening={title:'T',description:'D',level:'B1',topic:'Work',seconds:90,sourceUrl:'https://learningenglish.voanews.com/a/7000001.html',audioUrl:'https://evil.test/a.mp3',questions:reading.questions};
 assert.match(validateListeningPayload(listening,'voa-7000001',true).errors.join(' '),/voa-audio\.voanews\.eu/);
 assert.ok(validateListeningPayload({...listening,audioUrl:'https://voa-audio.voanews.eu/vle/2025/01/01/a.mp3'},'voa-7000001',true).value);
});

function fixture(){
 const sql=new DatabaseSync(':memory:');for(const file of fs.readdirSync('migrations').filter(f=>f.endsWith('.sql')).sort())sql.exec(fs.readFileSync('migrations/'+file,'utf8'));
 function prepare(query){let values=[];const execute=()=>({meta:{changes:Number(sql.prepare(query).run(...values).changes)}});return{bind(...v){values=v;return this;},async first(){return sql.prepare(query).get(...values)||null;},async run(){return execute();},execute};}
 const db={prepare,async batch(statements){sql.exec('BEGIN');try{const result=statements.map(s=>s.execute());sql.exec('COMMIT');return result;}catch(error){sql.exec('ROLLBACK');throw error;}}};
 const password='synthetic-content-admin-key',env={LEARNERS_DB:db,INVITATION_REQUIRED:'false',INVITATION_ADMIN_HASH:crypto.createHash('sha256').update(password).digest('hex'),ASSETS:{fetch:async()=>new Response('asset')}};
 const call=(path,method='GET',body,headers={})=>worker.fetch(new Request(origin+path,{method,headers:{Origin:origin,'CF-Connecting-IP':'192.0.2.9',...(body?{'Content-Type':'application/json'}:{}),...headers},...(body?{body:JSON.stringify(body)}:{})}),env);
 const admin=async()=>{const r=await call('/api/invitations/admin/login','POST',{password});assert.equal(r.status,200);return{Cookie:r.headers.get('set-cookie').split(';')[0]};};
 return{sql,call,admin};
}

test('content management is admin-only, reviewed before publication and duplicate-safe',async()=>{
 const f=fixture(),realFetch=global.fetch;try{
  // The migration is additive: learner tables and data are untouched.
  assert.ok(f.sql.prepare("SELECT name FROM sqlite_master WHERE name='learning_content_items'").get());
  assert.equal((await f.call('/api/invitations/admin/content')).status,401);
  assert.equal((await f.call('/api/invitations/admin/content-state','POST',{id:'community-garden',kind:'reading',status:'hidden'})).status,401);
  const auth=await f.admin();
  assert.equal((await f.call('/api/invitations/admin/content-state','POST',{id:'community-garden',kind:'reading',status:'hidden'},{...auth,Origin:'https://other.test'})).status,403);
  const library=await (await f.call('/api/invitations/admin/content','GET',undefined,auth)).json();
  assert.equal(library.library.filter(r=>r.kind==='reading').length,READING_LESSONS.length);assert.equal(library.library.filter(r=>r.kind==='listening').length,VOA_LISTENING.length);
  assert.equal(library.library.find(r=>r.id==='a1-omar-morning').status,'hidden');
  assert.equal((await f.call('/api/invitations/admin/content-state','POST',{id:'a1-omar-morning',kind:'reading',status:'published'},auth)).status,200);
  assert.equal((await f.call('/api/invitations/admin/content-state','POST',{id:'tech-computers',kind:'reading',status:'published',level:'A1'},auth)).status,200);
  assert.equal((await f.call('/api/invitations/admin/content-state','POST',{id:'not-a-lesson',kind:'reading',status:'published'},auth)).status,400);
  let catalogue=await (await f.call('/api/content/catalogue')).json();
  assert.deepEqual(catalogue.states['a1-omar-morning'],{status:'published'});assert.equal(catalogue.states['tech-computers'].level,'A1');
  // Importing an existing bundled VOA lesson is refused before any request is made.
  global.fetch=async()=>assert.fail('duplicate import must not fetch');
  assert.equal((await f.call('/api/invitations/admin/content-import','POST',{url:'https://learningenglish.voanews.com/a/3111026.html'},auth)).status,409);
  global.fetch=async url=>{assert.ok(String(url).startsWith('https://learningenglish.voanews.com/'));return new Response('<meta property="og:title" content="New lesson"><source src="https://voa-audio.voanews.eu/vle/2025/02/02/new.mp3">');};
  const imported=await f.call('/api/invitations/admin/content-import','POST',{url:'https://learningenglish.voanews.com/a/7000002.html'},auth);assert.equal(imported.status,201);
  const {id}=await imported.json();assert.equal(id,'voa-7000002');
  assert.equal((await f.call('/api/invitations/admin/content-import','POST',{url:'https://learningenglish.voanews.com/a/7000002.html'},auth)).status,409,'duplicate imports are prevented');
  assert.equal((await f.call('/api/invitations/admin/content-publish','POST',{id,published:true},auth)).status,422,'an unreviewed import cannot be published');
  catalogue=await (await f.call('/api/content/catalogue')).json();assert.equal(catalogue.listening.length,0);
  const payload={title:'New lesson',description:'Two coworkers plan a meeting.',level:'B1',topic:'Work',seconds:75,sourceUrl:'https://learningenglish.voanews.com/a/7000002.html',audioUrl:'https://voa-audio.voanews.eu/vle/2025/02/02/new.mp3',transcript:'Let us meet on Friday at noon.',words:[],
   questions:[{type:'multiple-choice',skill:'main-idea',prompt:'What do they plan?',choices:['A meeting','A trip'],correct:0,evidence:'meet on Friday',feedback:'They plan to meet.'},{type:'true-false',skill:'detail',prompt:'They meet on Monday.',correct:false,evidence:'Friday',feedback:'Friday.'},{type:'gap-fill',skill:'detail',prompt:'Let us meet on Friday at ___.',answers:['noon'],evidence:'at noon',feedback:'At noon.'}]};
  assert.equal((await f.call('/api/invitations/admin/content-save','POST',{id,kind:'listening',payload},auth)).status,200);
  assert.equal((await f.call('/api/invitations/admin/content-publish','POST',{id,published:true},auth)).status,200);
  catalogue=await (await f.call('/api/content/catalogue')).json();assert.equal(catalogue.listening.length,1);assert.equal(catalogue.listening[0].questions.length,3);
  // Editing a published lesson returns it to draft for another review.
  assert.equal((await f.call('/api/invitations/admin/content-save','POST',{id,kind:'listening',payload:{...payload,title:'Edited'}},auth)).status,200);
  catalogue=await (await f.call('/api/content/catalogue')).json();assert.equal(catalogue.listening.length,0);
 }finally{global.fetch=realFetch;f.sql.close();}
});

test('library pagination slices pages and never shows an empty page',()=>{
 const {pageCount,pageSlice}=require('../src/components/learn/LibraryPagination.tsx');
 const items=Array.from({length:25},(_,i)=>i);
 assert.equal(pageCount(25,9),3);assert.equal(pageCount(0,9),1);
 assert.deepEqual(pageSlice(items,1,9),items.slice(0,9));assert.deepEqual(pageSlice(items,3,9),[18,19,20,21,22,23,24]);
 assert.equal(pageCount(VOA_LISTENING.length,8)>1,true,'the Listening library now spans several pages');
});

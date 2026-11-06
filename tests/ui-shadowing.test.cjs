require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),path=require('path');
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const {ORIGINAL_SHADOW_LESSONS,SHADOW_LESSONS,SHADOW_LEVELS,normalizeDictation}=require('../src/data/shadowing.ts');
const {resourceParts,RESOURCE_LINKS}=require('../src/data/resource-links.ts');
const {ResourceText}=require('../src/components/ui/ResourceText.tsx');
const {CHALLENGE_WORDS}=require('../src/data/challenge-words.ts');
const {encodeChallenge,decodeChallenge,matchesChallengeMeaning}=require('../src/lib/challengeLink.ts');
const {isFixedSpeech,neuralVoice}=require('../src/lib/speechServer.ts');
const {POST}=require('../src/app/api/speech/route.ts');

test('the original short-video bank remains verified and the visible selection contains real conversations',()=>{
 assert.deepEqual(SHADOW_LEVELS,['A1','A2','B1','B2']);assert.equal(ORIGINAL_SHADOW_LESSONS.length,12);assert.equal(new Set(SHADOW_LESSONS.map(l=>l.id)).size,SHADOW_LESSONS.length);
 const verified={'introduce-yourself':['65iWtWqWmgY',29],'connected-youre':['C_HDrYHJrzo',31],'break-the-ice':['Tn7a8Cv64B4',60],'give-and-take':['J8EWSLZ36s0',60],'wait-a-moment':['mqPgWweY1vA',60],'productive-day':['DLi2txV9IVc',59],'obvious-choice':['b_ka3-253h0',60],'plans-and-dreams':['gBYnewP1MmY',61],'say-thank-you':['VDDB2tWE0jU',20],'making-party-plans':['fNk6ZFK8NsI',60],'sharing-difficult-news':['BKNJxpdNAtY',61],'fresh-start':['iVk7Ft6gl5w',60]};
 for(const lesson of ORIGINAL_SHADOW_LESSONS){assert.deepEqual([lesson.videoId,lesson.duration],verified[lesson.id]);assert.ok(lesson.duration>0&&lesson.duration<120);assert.ok(lesson.focus&&lesson.task);assert.ok(lesson.lines.length>=2);for(const line of lesson.lines){assert.ok(line.text.trim());assert.match(line.ar,/[\u0600-\u06ff]/);assert.ok(isFixedSpeech(line.text),line.text);for(const word of line.text.match(/[a-z]+(?:['’][a-z]+)?/gi)||[])assert.ok(isFixedSpeech(word),word);}}
 assert.equal(normalizeDictation("You're here!"),normalizeDictation('you’re here.'));assert.notEqual(normalizeDictation('you are here'),normalizeDictation("you're here"));
});
test('resource links preserve text and avoid matching names inside unrelated words',()=>{
 const original='Practice gets easier. Try ETS, IELTS.org and the Academic Word List (AWL).';const parts=resourceParts(original);assert.equal(parts.map(p=>p.text).join(''),original);assert.deepEqual(parts.filter(p=>p.url).map(p=>p.text),['ETS','IELTS.org','Academic Word List (AWL)']);
 for(const resource of RESOURCE_LINKS){assert.equal(new URL(resource.url).protocol,'https:');for(const name of resource.names)assert.ok(resourceParts(name).some(p=>p.url===resource.url),name);}
 const html=renderToStaticMarkup(React.createElement(ResourceText,{text:'<script>bad</script> IELTS Liz'}));assert.ok(!html.includes('<script>'));assert.ok(html.includes('rel="noreferrer"'));assert.ok(html.includes('href="https://ieltsliz.com/"'));
});
test('partner challenges contain English prompts and Arabic meanings, with Unicode-safe share links',()=>{
 assert.equal(CHALLENGE_WORDS.length,20);assert.equal(new Set(CHALLENGE_WORDS.map(w=>w.de)).size,20);for(const word of CHALLENGE_WORDS){assert.match(word.de,/^[a-z]+$/);assert.match(word.en,/[\u0600-\u06ff]/);assert.ok(matchesChallengeMeaning(word,word.en));assert.ok(!matchesChallengeMeaning(word,'not the answer'));}
 const input={id:'qa-link',creator:'لينا',createdAt:'2026-11-01T05:00:00Z',words:CHALLENGE_WORDS.slice(0,10)};const encoded=encodeChallenge(input);assert.match(encoded,/^[a-z0-9_-]+$/i);assert.deepEqual(decodeChallenge(encoded),input);assert.ok(matchesChallengeMeaning(CHALLENGE_WORDS.find(w=>w.de==='house'),'البيت'));assert.ok(matchesChallengeMeaning(CHALLENGE_WORDS.find(w=>w.de==='cat'),'قِطّة'));
 for(const value of ['%',btoa('{}'),encodeChallenge({...input,words:[]}),encodeChallenge({...input,words:[{de:'der Hund',en:'dog'}]})])assert.equal(decodeChallenge(value),null);
});
test('speech recognises fixed published text and never silently approves personal text',async()=>{
 assert.ok(isFixedSpeech('I am Pete.'));assert.ok(isFixedSpeech('European'));assert.ok(!isFixedSpeech('PRIVATE_QA_SENTENCE_c0263f'));assert.equal(neuralVoice('hello'),'en-GB-SoniaNeural');assert.equal(neuralVoice('مرحبا'),'ar-SA-ZariyahNeural');
 const request=(body,headers={})=>new Request('http://localhost:3030/api/speech',{method:'POST',headers:{'content-type':'application/json',...headers},body:typeof body==='string'?body:JSON.stringify(body)});
 const denied=await POST(request({text:'PRIVATE_QA_SENTENCE_c0263f'}));assert.equal(denied.status,403);assert.deepEqual(await denied.json(),{requiresConsent:true});
 assert.equal((await POST(request({text:'hello'},{origin:'https://other.example'}))).status,403);assert.equal((await POST(request({text:''}))).status,400);assert.equal((await POST(request('{bad'))).status,400);assert.equal((await POST(request({text:'a'.repeat(12001)}))).status,400);
});
test('browser pronunciation has no SpeechSynthesisUtterance fallback anywhere in application source',()=>{
 const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);for(const file of walk(path.join(__dirname,'../src')).filter(p=>/\.tsx?$/.test(p)))assert.ok(!fs.readFileSync(file,'utf8').includes('new SpeechSynthesisUtterance'),file);
});
test('package metadata and dependencies retain only the reviewed narration, certificate and Cloudflare additions',()=>{
 const crypto=require('crypto'),pkg=require('../package.json'),prior=require('./fixtures/notes-brand-contract.json').files['package.json'].after;const copy=JSON.parse(JSON.stringify(pkg));assert.equal(copy.scripts.prebuild,'node scripts/collect-speech-catalogue.cjs');assert.equal(copy.scripts['voice:catalogue'],'node scripts/collect-speech-catalogue.cjs');delete copy.scripts.prebuild;delete copy.scripts['voice:catalogue'];assert.equal(copy.dependencies.qrcode,'^1.5.4');assert.ok(copy.devDependencies['@types/qrcode']);delete copy.dependencies.qrcode;delete copy.devDependencies['@types/qrcode'];
 const hosting={'build:cloudflare':'node scripts/build-cloudflare.cjs','preview:cloudflare':'wrangler dev --ip 127.0.0.1 --port 3034','deploy:cloudflare':'wrangler deploy','check:cloudflare':'wrangler deploy --dry-run --outdir .cloudflare-build/worker'};
 for(const [key,value] of Object.entries(hosting)){assert.equal(copy.scripts[key],value);delete copy.scripts[key];}assert.equal(copy.devDependencies.wrangler,'4.158.0');delete copy.devDependencies.wrangler;
 assert.equal(crypto.createHash('sha256').update(JSON.stringify(copy,null,2)+'\n').digest('hex'),prior);
});

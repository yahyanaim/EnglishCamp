require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {ALL_ARTICLES}=require('../src/data/articles/index.ts');
const {TOPICS}=require('../src/data/themen-wortschatz.ts');
const {CONVERSATIONS}=require('../src/data/conversations.ts');
const {FLASHCARDS}=require('../src/data/flashcards.ts');
const {NOUN_VERB_COLLOCATIONS}=require('../src/data/nomen-verb-verbindungen.ts');
const {articleTokens,cueAtTime}=require('../src/lib/readingAudio.ts');
const {chooseEncouragement,encouragementPool}=require('../src/lib/encouragement.ts');
const preserved=require('./fixtures/reading-topics-preserved.json'),manifest=require('../src/data/practice-audio.json');
const hash=x=>crypto.createHash('sha256').update(JSON.stringify(x)).digest('hex');
const file=src=>path.join(__dirname,'../public',src);
const key=text=>text.normalize('NFKC').trim().replace(/\s+/g,' ').toLowerCase();

test('six new complete bilingual articles preserve every original article',()=>{
 assert.equal(ALL_ARTICLES.length,22);assert.equal(new Set(ALL_ARTICLES.map(a=>a.id)).size,22);
 for(const [id,sha] of Object.entries(preserved.articles))assert.equal(hash(ALL_ARTICLES.find(a=>a.id===id)),sha,id);
 for(const article of ALL_ARTICLES.filter(a=>!preserved.articles[a.id])){assert.equal(article.paragraphs.length,3);assert.equal(article.vocabulary.length,5);for(const p of article.paragraphs){assert.ok(p.en.split(/\s+/).length>=35,article.id);assert.match(p.ar,/[\u0600-\u06ff]/);}for(const v of article.vocabulary){assert.ok(v.word&&v.def);assert.match(v.ar,/[\u0600-\u06ff]/);}}
});
test('six new topics add 72 contextual entries and preserve all original topics',()=>{
 assert.equal(TOPICS.length,18);assert.equal(new Set(TOPICS.map(t=>t.id)).size,18);assert.equal(TOPICS.reduce((n,t)=>n+t.words.length,0),264);
 for(const [id,sha] of Object.entries(preserved.topics))assert.equal(hash(TOPICS.find(t=>t.id===id)),sha,id);
 for(const topic of TOPICS.filter(t=>!preserved.topics[t.id])){assert.equal(topic.words.length,12);assert.equal(new Set(topic.words.map(w=>w.word.toLowerCase())).size,12);for(const w of topic.words){assert.ok(w.pos&&w.definition&&w.example);assert.match(w.arabic,/[\u0600-\u06ff]/);}}
});
test('natural recordings cover every Conversation line and Listening Lab item',()=>{
 let lines=0;for(const scenario of CONVERSATIONS){assert.equal(manifest.conversation[scenario.id].length,scenario.lines.length);for(const [i,line] of scenario.lines.entries()){assert.ok(manifest.conversation[scenario.id][i],line.text);lines++;}}
 assert.equal(lines,205);
 for(const text of [...FLASHCARDS.map(c=>c.de),...NOUN_VERB_COLLOCATIONS.map(c=>`${c.verb} ${c.noun}`),...ALL_ARTICLES.flatMap(a=>a.vocabulary.map(v=>v.word))])assert.ok(manifest.speech[key(text)],text);
 const assets=new Set([...Object.values(manifest.speech),...Object.values(manifest.conversation).flat(),...Object.values(manifest.articles).map(a=>a.src)]);assert.equal(assets.size,884);
 for(const src of assets){assert.match(src,/^\/media\/practice-audio\/[a-f0-9]{20}\.mp3$/);assert.ok(fs.statSync(file(src)).size>1200,src);const bytes=fs.readFileSync(file(src));assert.ok(bytes[0]===0xff||bytes.subarray(0,3).toString()==='ID3',src);}
});
test('all 22 narrations have ordered, complete cues matching the visible word segments',()=>{
 assert.equal(Object.keys(manifest.articles).length,22);
 for(const article of ALL_ARTICLES){const recording=manifest.articles[article.id];assert.ok(recording,article.id);const cues=JSON.parse(fs.readFileSync(file(recording.cues)));const tokens=articleTokens(article.paragraphs).flat().filter(t=>t.index>=0);assert.equal(cues.length,tokens.length,article.id);
 for(const [i,cue] of cues.entries()){assert.equal(cue.text,tokens[i].text);assert.ok(Number.isFinite(cue.start)&&cue.start>=0&&cue.end>cue.start);if(i){const prev=cues[i-1];assert.ok(cue.start>=prev.end-.001 || (cue.start===prev.start && cue.end===prev.end),`${article.id}:${i}`);}const active=cueAtTime(cues,(cue.start+cue.end)/2);assert.equal(cues[active].start,cue.start);assert.equal(cues[active].end,cue.end);}
 assert.equal(cueAtTime(cues,-1),-1);assert.equal(cueAtTime(cues,cues.at(-1).end+1),-1);
 }
});
test('segmentation keeps punctuation, apostrophes and paragraph boundaries intact',()=>{
 const input=[{en:'“A café,” she said. — It’s open.'},{en:'Re-read it at 9:30.'}];const tokens=articleTokens(input);assert.deepEqual(tokens.map(p=>p.map(t=>t.text).join('')),input.map(p=>p.en));assert.deepEqual(tokens.flat().filter(t=>t.index>=0).map(t=>t.index),[0,1,2,3,4,5,6,7,8,9]);
});
test('encouragement follows the learning stage and excludes the previous message',()=>{
 const groups=[encouragementPool(1),encouragementPool(4),encouragementPool(7)];assert.equal(new Set(groups.flat().map(q=>q.id)).size,15);
 for(let level=1;level<=10;level++){let previous;for(let i=0;i<20;i++){const quote=chooseEncouragement(level,previous);assert.ok(encouragementPool(level).includes(quote));assert.notEqual(quote.id,previous);assert.ok(quote.text&&quote.action);previous=quote.id;}}
});

test('recording provenance matches every fixed script, speaker role and audio checksum',()=>{
 const index=require('../public/media/practice-audio/manifest.json');assert.equal(index.recordings.length,884);const bySrc=new Map(index.recordings.map(r=>[r.src,r]));assert.equal(bySrc.size,884);
 for(const recording of index.recordings){const bytes=fs.readFileSync(file(recording.src));assert.equal(bytes.length,recording.bytes);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),recording.sha256);}
 for(const scenario of CONVERSATIONS)for(const[i,line]of scenario.lines.entries()){const recording=bySrc.get(manifest.conversation[scenario.id][i]);assert.equal(recording.text,line.text);assert.equal(recording.voice,line.speaker==='user'?'en-GB-RyanNeural':'en-GB-SoniaNeural');}
 for(const article of ALL_ARTICLES){const recording=bySrc.get(manifest.articles[article.id].src);assert.equal(recording.text.replace(/\s+/g,' ').trim(),article.paragraphs.map(p=>p.en).join(' '));}
 for(const [text,src] of Object.entries(manifest.speech)){assert.equal(key(bySrc.get(src).text),text);assert.equal(bySrc.get(src).voice,'en-GB-SoniaNeural');}
});

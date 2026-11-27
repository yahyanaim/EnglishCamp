require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {buildCrossword}=require('../src/lib/crossword.ts');
const {FRIEND_WORDS,pickWords,makeCrosswordWords,encodeFriendGame,decodeFriendGame,friendGameUrl,validHangmanWord,cleanWord}=require('../src/lib/friendGames.ts');
const src=f=>fs.readFileSync(f,'utf8');

function runs(c){const out=[];
 for(let r=0;r<c.rows;r++){let s=-1;for(let col=0;col<=c.cols;col++){const ch=col<c.cols?c.cells[r][col]:null;if(ch&&s<0)s=col;if(!ch&&s>=0){if(col-s>=2)out.push(`across:${r},${s}`);s=-1;}}}
 for(let col=0;col<c.cols;col++){let s=-1;for(let r=0;r<=c.rows;r++){const ch=r<c.rows?c.cells[r][col]:null;if(ch&&s<0)s=r;if(!ch&&s>=0){if(r-s>=2)out.push(`down:${s},${col}`);s=-1;}}}
 return out;}

test('crosswords are valid: every letter run is a clued word, letters agree at crossings, numbering is ordered',()=>{
 for(let t=0;t<200;t++){
  const c=buildCrossword(pickWords(8));
  for(const e of c.entries)for(let i=0;i<e.answer.length;i++){const r=e.row+(e.dir==='down'?i:0),col=e.col+(e.dir==='across'?i:0);assert.equal(c.cells[r][col],e.answer[i]);}
  const entries=new Set(c.entries.map(e=>`${e.dir}:${e.row},${e.col}`));
  for(const run of runs(c))assert.ok(entries.has(run),'no accidental word '+run);
  const starts=[...new Map(c.entries.map(e=>[`${e.row},${e.col}`,e])).values()].sort((a,b)=>a.row-b.row||a.col-b.col);
  starts.forEach((e,i)=>assert.equal(e.number,i+1));
 }
});

test('the same word list always builds the same grid, and generated sets place every word',()=>{
 const words=FRIEND_WORDS.slice(0,8);assert.deepEqual(buildCrossword(words),buildCrossword(words));
 for(let i=0;i<40;i++){const set=makeCrosswordWords(),grid=buildCrossword(set);assert.ok(set.length>=6,'at least 6 words');assert.equal(grid.entries.length,set.length);assert.ok(grid.cols<=11,'narrow enough to tap on a phone');}
 for(const w of FRIEND_WORDS){assert.match(w.answer,/^[A-Z]{3,14}$/);assert.ok(w.clue.length>5&&!w.clue.toUpperCase().includes(w.answer),w.answer+' clue does not give the answer');}
});

test('friend game links round-trip, hide the answers and reject tampered or oversized data',()=>{
 const hangman={g:'hangman',id:'k3x9',creator:'Yahia',word:'HOLIDAY',hint:'Time off work or school',createdAt:'2026-11-27T00:00:00Z'};
 const encoded=encodeFriendGame(hangman),raw=Buffer.from(encoded.replace(/-/g,'+').replace(/_/g,'/'),'base64').toString();
 assert.deepEqual(decodeFriendGame(encoded),hangman);assert.ok(!raw.includes('HOLIDAY'),'the secret word is not readable in the link');
 const cross={g:'crossword',id:'p0q1',creator:'Sara',words:makeCrosswordWords(),createdAt:'2026-11-27T00:00:00Z'};
 const c2=encodeFriendGame(cross);assert.deepEqual(decodeFriendGame(c2),cross);
 const rawCross=Buffer.from(c2.replace(/-/g,'+').replace(/_/g,'/'),'base64').toString();for(const w of cross.words)assert.ok(!rawCross.includes(`"${w.answer}"`));
 assert.match(friendGameUrl('https://x.test',hangman),/^https:\/\/x\.test\/challenge\?g=hangman&d=[A-Za-z0-9_-]+$/);
 for(const bad of [null,'','%%%','e30',Buffer.from(JSON.stringify({g:'hangman',id:'a',c:'b',w:'zz',h:'',t:''})).toString('base64'),'A'.repeat(7000)])assert.equal(decodeFriendGame(bad),null);
 const wrongKey=JSON.parse(Buffer.from(encoded.replace(/-/g,'+').replace(/_/g,'/'),'base64').toString());wrongKey.id='other';
 assert.equal(decodeFriendGame(Buffer.from(JSON.stringify(wrongKey)).toString('base64url')),null,'a changed id cannot decode the word');
 assert.equal(cleanWord(' Holi-day 2 '),'HOLIDAY');assert.ok(validHangmanWord('CAT'));assert.ok(!validHangmanWord('AB'));assert.ok(!validHangmanWord('ÉCOLE'));
});

test('the challenge page offers Hangman and Crossword links and plays them from ?g=',()=>{
 const page=src('src/app/challenge/page.tsx');
 assert.match(page,/<FriendGameCreator \/>/);assert.match(page,/decodeFriendGame\(params\.get\("d"\)\)/);assert.match(page,/<FriendGamePlay /);
 const games=src('src/components/challenge/FriendGames.tsx');
 for(const text of ['Hangman duel','Crossword · mots croisés','Random word','Create crossword link','Copy link','Send a game back'])assert.ok(games.includes(text),text);
 const hangman=src('src/components/challenge/FriendHangman.tsx');assert.match(hangman,/window\.addEventListener\("keydown"/,'physical keyboard works');assert.match(hangman,/aria-label=\{`Letter \$\{letter\}/);
 const cross=src('src/components/challenge/FriendCrossword.tsx');for(const key of ['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Backspace'])assert.ok(cross.includes(key),key);
 assert.match(src('src/components/layout/GridBalance.tsx'),/import "\.\.\/challenge\/friend-games\.css";/);
});

test('recorder shows three steps and explains what to do next before a pronunciation check',()=>{
 const rec=src('src/components/shadowing/ShadowRecorder.tsx');
 for(const text of ['"Record"','"Listen back"','"Check pronunciation"','role="timer"','Download my recording','Recording stays on this device'])assert.ok(rec.includes(text),text);
 const fb=src('src/components/speaking/PronunciationFeedback.tsx');
 assert.match(fb,/<h2>Pronunciation feedback<\/h2>/);
 for(const text of ['Record yourself first (step 1)','Tick the box above to allow sending','is not saved in the lesson-notes database','does not assess a whole speaking level'])assert.ok(fb.includes(text),text);
 assert.match(src('src/components/layout/GridBalance.tsx'),/import "\.\.\/shadowing\/recorder-v2\.css";/);
 assert.match(src('src/components/shadowing/recorder-v2.css'),/prefers-reduced-motion/);
});

test('Listening uses the hub layout and the hero puts the continue card beside the four stats',()=>{
 const l=src('src/components/learn/ListeningSection.tsx');
 for(const part of ['<HubHero','title="Listening"','<HubContinue','<LevelRail label="Listening level"','className="camp-hub-toolbar"','label="Listening topic"','camp-hub-group-head'])assert.ok(l.includes(part),part);
 assert.ok(!src('src/app/listening/page.tsx').includes('PageBanner'));
 const css=src('src/components/learn/hub-v2.css');
 assert.match(css,/grid-template-areas: "main main" "stats action" "progress progress"/);
 assert.match(css,/\.camp-hub-hero-action \{ align-self: stretch;/);
});

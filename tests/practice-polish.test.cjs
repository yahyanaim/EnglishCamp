require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict');
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const {WORD_SEARCH_SETS}=require('../src/data/word-search.ts');
const {createWordSearchPuzzle,appendWordSearchCell}=require('../src/lib/wordSearch.ts');
const {PageWrapper}=require('../src/components/layout/PageWrapper.tsx'),{PageBanner}=require('../src/components/ui/PageBanner.tsx'),{BackButton}=require('../src/components/ui/BackButton.tsx');
const {PathnameContext}=require('next/dist/shared/lib/hooks-client-context.shared-runtime');
const {CertificatePreview}=require('../src/components/placement/CertificatePreview.tsx');
const {PLACEMENT_QUESTIONS,PLACEMENT_VERSION}=require('../src/data/placement/questions.ts');
test('word search teaches English with Arabic meanings and preserves every prior concept reward ID',()=>{
 const prior=['HAUS','BUCH','TISCH','SCHULE','GARTEN','WASSER','BLUME','FENSTER','TUR','STUHL','APFEL','BROT','MILCH','KATZE','HUND','SONNE','MOND','STERNE','WOLKE','REGEN','BAUM','BLATT','WURZEL','AST','STAMM','FREUDE','GLUCK','LIEBE','TRAUER','ANGST'];assert.equal(WORD_SEARCH_SETS.length,6);
 assert.deepEqual(WORD_SEARCH_SETS.flatMap(s=>s.words.map(w=>s.rewardIds[w])),prior);for(const set of WORD_SEARCH_SETS){assert.equal(set.words.length,5);assert.equal(new Set(set.words).size,5);for(const word of set.words){assert.match(word,/^[A-Z]{3,9}$/);assert.match(set.translations[word],/[\u0600-\u06ff]/);assert.ok(!prior.includes(word));}}
});
test('every displayed word is reachable in the generated grid across seeded puzzles',()=>{
 function seeded(n){let state=n;return()=>{state=(Math.imul(state,1664525)+1013904223)>>>0;return state/4294967296}}
 const seen=new Set;for(let seed=1;seed<=400;seed++){const random=seeded(seed*7919),puzzle=createWordSearchPuzzle(random);assert.equal(puzzle.size,10);assert.ok(puzzle.words.length>=4);assert.ok(puzzle.grid.every(row=>row.length===10&&row.every(c=>/^[A-Z]$/.test(c))));for(const word of puzzle.words){seen.add(word);let found=false;for(let r=0;r<10;r++)for(let c=0;c<10;c++)for(const [dr,dc]of [[0,1],[1,0]]){if(Array.from(word).every((ch,i)=>puzzle.grid[r+dr*i]?.[c+dc*i]===ch))found=true;}assert.ok(found,word);assert.ok(puzzle.rewardIds[word]);}}
 assert.equal(seen.size,30);
});
test('word-search selection can extend beyond two letters without duplicates or moves after completion',()=>{
 let selected=[];for(let c=0;c<9;c++)selected=appendWordSearchCell(selected,[0,c]);assert.equal(selected.length,9);assert.deepEqual(selected.map(c=>c[1]),[0,1,2,3,4,5,6,7,8]);assert.equal(appendWordSearchCell(selected,[0,2]),selected);assert.equal(appendWordSearchCell(selected,[1,0],true),selected);
});
test('embedded activities receive one local back control after the same banner used by standalone pages',()=>{
 const node=React.createElement(PathnameContext.Provider,{value:'/practice'},React.createElement(PageWrapper,{back:React.createElement('nav',{'aria-label':'Return navigation'},React.createElement(BackButton,{onClick:()=>{}},'Back to practice'))},React.createElement(PageBanner,null,React.createElement('h1',null,'Activity title')),React.createElement('p',null,'Existing activity')));
 const html=renderToStaticMarkup(node);assert.equal((html.match(/camp-back-button/g)||[]).length,1);assert.ok(!html.includes('Back to dashboard'));assert.ok(html.indexOf('Activity title')<html.indexOf('Back to practice'));assert.ok(html.includes('Existing activity'));
});
test('certificate preview uses the actual completed result and safely renders Latin and Arabic names',()=>{
 const result={id:'qa-preview-certificate',completedAt:'2026-11-03T12:00:00Z',version:PLACEMENT_VERSION,answers:Object.fromEntries(PLACEMENT_QUESTIONS.map(q=>[q.id,q.answer]))};
 const html=renderToStaticMarkup(React.createElement(CertificatePreview,{name:'QA <script>name',result,working:false,onDownload:()=>{}}));assert.ok(html.includes('QA &lt;script&gt;name'));assert.ok(!html.includes('<script>'));assert.ok(html.includes('C1'));assert.ok(html.includes('40 / 40 correct'));assert.ok(html.includes('original scoring version'));
 const ar=renderToStaticMarkup(React.createElement(CertificatePreview,{name:'ليلى عبد الرحمن',result,working:true,onDownload:()=>{}}));assert.ok(ar.includes('lang="ar"'));assert.ok(ar.includes('dir="auto"'));assert.ok(ar.includes('Preparing certificate'));assert.ok(ar.includes('disabled=""'));
});

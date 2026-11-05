/** Reproducible inventory and literal-bank screening. No learner storage is read. */
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),ts=require('typescript');
const root=path.join(__dirname,'..'),folder=path.join(root,'src/components/learn');
function literalBanks(file){
 const raw=fs.readFileSync(path.join(folder,file),'utf8'),sf=ts.createSourceFile(file,raw,99,true,4),out=[];
 function walk(n){if(ts.isVariableDeclaration(n)&&n.initializer&&ts.isArrayLiteralExpression(n.initializer)){try{const js=ts.transpileModule('('+n.initializer.getText(sf)+')',{compilerOptions:{target:99}}).outputText,items=vm.runInNewContext(js,{}, {timeout:250});if(Array.isArray(items)&&items.some(q=>q&&typeof q==='object'&&q.options&&(q.correct!==undefined||q.answer!==undefined)))out.push({file,name:n.name.getText(sf),items});}catch{}}ts.forEachChild(n,walk);}walk(sf);return out;
}
function catalogue(){
 const source=fs.readFileSync(path.join(root,'src/app/practice/page.tsx'),'utf8'),sf=ts.createSourceFile('practice.tsx',source,99,true,4),bindings={},map={},groups=[];
 function walk(n){if(ts.isVariableDeclaration(n)&&n.initializer){const name=n.name.getText(sf),text=n.initializer.getText(sf),imp=text.match(/import\("@\/components\/learn\/([^"/]+)"\)/),exp=text.match(/module\s*=>\s*module\.([\p{L}\p{N}_$]+)/u);if(imp&&exp)bindings[name]={file:imp[1]+'.tsx',exportName:exp[1]};if(name==='TRAINER_COMPONENTS')for(const p of n.initializer.properties)map[p.name.text]=p.initializer.getText(sf);if(name==='CATEGORIES')groups.push(...vm.runInNewContext('('+text+')'));}ts.forEachChild(n,walk);}walk(sf);
 return groups.flatMap(g=>g.trainers.map(t=>({id:t.id,label:t.label,category:g.label,...bindings[map[t.id]]})));
}
const changed=['ComparativeTrainer.tsx','CompoundNounTrainer.tsx','DaCompoundsTrainer.tsx','DoubleInfinitiveTrainer.tsx','FalseFriendsTrainer.tsx','FragewörterTrainer.tsx','ImperativeTrainer.tsx','KonjunktivIITrainer.tsx','ModalpartikelUebersetzer.tsx','SpellingTrainer.tsx','SubordinateClausesTrainer.tsx','TimedChallenge.tsx','VocabularyPractice.tsx','WeakNounsTrainer.tsx','WordFormationTrainer.tsx'];
const inventory=catalogue().map(item=>({...item,review:changed.includes(item.file)?'corrected in follow-up':['grammar-reference','verb-explorer','briefe','error-review'].includes(item.id)?'reference or review; answers intentionally available':'screened question, feedback and reveal paths'}));
const banks=Array.from(new Set(inventory.map(i=>i.file))).flatMap(literalBanks);
const result={trainers:inventory.length,files:inventory.length,bankCount:banks.length,literalQuestions:banks.reduce((n,b)=>n+b.items.length,0),changedComponents:changed,inventory,banks:banks.map(b=>({file:b.file,name:b.name,items:b.items.length}))};
if(require.main===module)process.stdout.write(JSON.stringify(result,null,2)+'\n');
module.exports={catalogue,literalBanks,audit:result};

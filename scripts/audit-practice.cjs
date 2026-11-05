/** Source-bank audit; run from the repository root. It never accesses learner storage. */
require('../tests/register.cjs');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),ts=require('typescript');
const corrected=require('../src/data/practice-audit-corrections.ts');
const files=[
 ['WordOrderTrainer.tsx','WO','/practice','Completed answer removed; task constraints and distractors clarified.'],
 ['NegationTrainer.tsx','NEG','/practice','Completed sentence delayed until after answering; ambiguous frequency distractors removed.'],
 ['CoordinatingConjunctionsTrainer.tsx','ITEMS','/practice','Completed linker sentence delayed; intended relationship supplied instead.'],
 ['PrefixVerbsTrainer.tsx','ITEMS','/practice','Hyphenated prefix is removed from the displayed word stem.'],
 ['ModalVerbsTrainer.tsx','MODALS','/practice','Answer removed from the prompt; purpose and valid equivalent responses used.'],
 ['RelativeClausesTrainer.tsx','ITEMS','/practice','Gap stays in its original location; valid who/whom and which/that alternatives accepted.'],
 ['GenitiveTrainer.tsx','ITEMS','/practice','Extra appended gap removed; explanation corrected.'],
 ['PrepositionsTrainer.tsx','PREPOSITIONS','/practice','Usage categories replace the misleading grammatical-case question; definition follows the response.'],
 ['PrepositionalContractionsTrainer.tsx','ITEMS','/practice','Gap renders as text; expanded-form cue disambiguates contractions; unrelated exclamation replaced.'],
 ['ReflexiveVerbsTrainer.tsx','VERBS','/practice','Subject and infinitive phrase labelled separately, avoiding a false finite sentence.'],
 ['SeparableVerbsTrainer.tsx','VERBS','/practice','The missing particle is replaced by a gap instead of printed in the question.'],
 ['TensesQuiz.tsx','TENSE_IDENTIFICATION_PRACTICE','/practice','Thirty explicitly labelled questions replace unreliable tense guessing; continuous forms and feedback are supported.']
];
function bank(file,name){if(name==='TENSE_IDENTIFICATION_PRACTICE')return corrected.TENSE_IDENTIFICATION_PRACTICE;const text=fs.readFileSync(path.join(__dirname,'../src/components/learn',file),'utf8'),sf=ts.createSourceFile(file,text,99,true,4);let literal;function walk(node){if(ts.isVariableDeclaration(node)&&node.name.getText(sf)===name)literal=node.initializer.getText(sf);ts.forEachChild(node,walk);}walk(sf);if(literal==='WORD_ORDER_PRACTICE')return corrected.WORD_ORDER_PRACTICE;if(literal==='MODAL_PRACTICE')return corrected.MODAL_PRACTICE;return vm.runInNewContext('('+literal+')',{}, {timeout:1000});}
const reviewed=files.map(([file,name,route,correction])=>{const items=bank(file,name);return {file,bank:name,route,items:items.length,correction};});
const folder=path.join(__dirname,'../src/components/learn'),sources=fs.readdirSync(folder).filter(s=>s.endsWith('.tsx')).map(file=>({file,text:fs.readFileSync(path.join(folder,file),'utf8')}));
const possibleAnswerReferences=sources.filter(s=>/\{(?:current|item|q|question)\.(?:answer|correct|en|verb|meaning)/.test(s.text)).map(s=>s.file);
const generated=[{file:'VerbPuzzle.tsx',verbs:require('../src/data/conjugaise.ts').VERBS.length,tenseTemplates:2,formsPerTable:6,correction:'All past and present cells use the existing conjugation helper; the answer-bearing header is removed.'}];
const result={scanFiles:sources.length,screening:'Source-pattern screening for visible answer fields; flags require human review and are not proof of a defect.',possibleAnswerReferences,reviewedTrainers:reviewed.length+generated.length,reviewedItems:reviewed.reduce((n,s)=>n+s.items,0),reviewed,generated};
if(require.main===module)process.stdout.write(JSON.stringify(result,null,2)+'\n');
module.exports={bank,audit:result};

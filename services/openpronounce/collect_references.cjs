// Fixed public text only. This file never reads profiles, notes or recordings.
require('../../tests/register.cjs');
const fs=require('node:fs'),path=require('node:path');
const {PRONUNCIATION_LINES}=require('../../src/lib/pronunciationAssessment.ts');
const {SHADOW_LESSONS}=require('../../src/data/shadowing.ts');
const lines=[...new Set([...PRONUNCIATION_LINES.map(l=>l.text),...SHADOW_LESSONS.flatMap(l=>l.lines.map(x=>x.text))])];
fs.writeFileSync(path.join(__dirname,'references.json'),JSON.stringify(lines,null,2)+'\n');
console.log(`Prepared ${lines.length} authored reference lines for the backend build.`);

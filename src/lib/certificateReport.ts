import QRCode from 'qrcode';
import { CEFR_TEST_VERSION,CEFR_LEVELS,type CefrEstimate } from '@/data/placement/cefr';
import { cefrProfile,readCefrRecord,type CefrResult } from './cefrPlacement';
import { gradePlacement,placementProfile,type PlacementResult } from './placement';
import { communicationSummary } from './placementCommunication';
export type CertificateResult=CefrResult|PlacementResult;
export const cefrLevelName:Record<CefrEstimate,string>={'Pre-A1':'A1 foundations',A1:'Beginner',A2:'Elementary',B1:'Intermediate',B2:'Upper intermediate',C1:'Advanced',C2:'Proficient'};
export function certificateReport(result:CertificateResult){
 if(result.version===CEFR_TEST_VERSION){const valid=readCefrRecord({version:CEFR_TEST_VERSION,results:[result]});if(!valid.results.length)throw new Error('A completed diagnostic result is required.');const p=cefrProfile(valid.results[0]);return {aligned:true,level:p.level,index:p.index,complete:p.complete,headline:p.complete?'CEFR study estimate':'Partial skill profile',score:p.index!==null?`${p.index}/100`:`${p.objectiveCorrect}/${p.objectiveTotal}`,scoreLabel:p.index!==null?'EnglishCamp score':'Assessed receptive answers',language:`Language use: ${p.languageCorrect} / ${p.languageTotal} correct`,skills:Object.entries(p.skills).map(([key,s])=>({key,label:key[0].toUpperCase()+key.slice(1),level:s.level,percent:'correct' in s&&s.assessed<s.total?null:s.percent,detail:'correct' in s?`${s.correct}/${s.total} correct${s.skipped?` · ${s.skipped} unassessed`:''}`:`${s.assessed}/2 assessed responses`})),scope:'A personal study estimate based on EnglishCamp tasks mapped to CEFR descriptors.'};}
 const g=gradePlacement(result.answers),p=placementProfile(result),s=communicationSummary(result.communication);
 return {aligned:false,level:p.level as CefrEstimate,index:null,complete:false,headline:'Original placement check · study estimate',score:`${g.correct}/${g.total}`,scoreLabel:'Original language & reading score',language:`${g.correct} / ${g.total} correct`,skills:[{key:'reading',label:'Reading',level:null,percent:g.domains.reading.correct/g.domains.reading.total*100,detail:`${g.domains.reading.correct}/${g.domains.reading.total} correct`},{key:'listening',label:'Listening',level:p.listening,percent:s.listening.total?s.listening.correct/s.listening.total*100:null,detail:s.listening.total?`${s.listening.correct}/${s.listening.total} correct`:'Not assessed'},{key:'writing',label:'Writing',level:null,percent:null,detail:'Not assessed'},{key:'speaking',label:'Speaking',level:p.speaking,percent:null,detail:`${s.speaking.assessed} assessed recordings`}],scope:'Earlier placement result preserved under its original scoring version.'};
}
export function certificateQRPayload(name:string,result:CertificateResult){
 const r=certificateReport(result);return ['EnglishCamp diagnostic',result.version,`Name: ${name}`,`Date: ${result.completedAt.slice(0,10)}`,`Study: ${r.level} | ${r.complete?'four skills':'partial'}`,`Score: ${r.score} | ${r.index!==null?'EC index':'receptive'}`,...r.skills.map(s=>`${s.label}: ${s.level||'unassessed'}`),`ID: ${result.id}`].join('\n');
}
export function certificateQR(name:string,result:CertificateResult){return QRCode.create(certificateQRPayload(name,result),{errorCorrectionLevel:'M'});}
export function certificateQRPath(name:string,result:CertificateResult){const qr=certificateQR(name,result),size=qr.modules.size;let path='';for(let y=0;y<size;y++)for(let x=0;x<size;x++)if(qr.modules.data[y*size+x])path+=`M${x+4} ${y+4}h1v1h-1z`;return {path,size:size+8};}
export { CEFR_LEVELS };

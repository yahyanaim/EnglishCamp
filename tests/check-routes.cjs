require('./register.cjs');
const fs=require('node:fs'),path=require('node:path');
const {levels}=require('../src/data/content.ts');
const base=process.argv[2]||'http://127.0.0.1:3023';
const destinations=[{url:'/',kind:'page'},...levels.map(l=>({url:`/levels/${l.id}`,kind:'page'})),...levels.flatMap(l=>l.lessons.flatMap(lesson=>[{url:`/levels/${l.id}/lessons/${lesson.id}`,kind:'page'},{url:`/exercises/${lesson.id}`,kind:'page'}])),...['speed-match','sprint','knowledge-check','listening-lab','satz-ubersetzer'].map(route=>({url:`/${route}`,kind:'trainer'}))];
const media=fs.readdirSync(path.join(__dirname,'../public/media/courses')).filter(name=>/\.(wav|svg)$/.test(name));
for(const name of media)destinations.push({url:`/media/courses/${name}`,kind:name.endsWith('wav')?'audio':'visual'});
const results=[];
(async()=>{
 let cursor=0;
 async function worker(){while(cursor<destinations.length){const item=destinations[cursor++];try{const response=await fetch(base+item.url,{headers:item.kind==='audio'?{Range:'bytes=0-255'}:{}});let valid=response.status===(item.kind==='audio'?206:200);if(item.kind==='audio'){const buffer=Buffer.from(await response.arrayBuffer());valid&&=buffer.subarray(0,4).toString()==='RIFF';}else{const body=await response.text();valid&&=body.length>100;if(item.kind==='visual')valid&&=body.includes('<svg');if(item.kind==='page'||item.kind==='trainer')valid&&=!body.includes('Internal Server Error')&&!body.includes('Lesson Not Found');}results.push({...item,status:response.status,valid});}catch(e){results.push({...item,valid:false,error:e.message});}}}
 await Promise.all([worker(),worker(),worker(),worker()]);
 const summary={base,checked:results.length,passed:results.filter(r=>r.valid).length,failed:results.filter(r=>!r.valid),counts:Object.fromEntries(['page','trainer','audio','visual'].map(kind=>[kind,results.filter(r=>r.kind===kind).length])),results};
 const destination=process.env.ENGLISHCAMP_ROUTE_REPORT;if(destination)fs.writeFileSync(destination,JSON.stringify(summary,null,2)+'\n');console.log(JSON.stringify({...summary,results:undefined},null,2));process.exitCode=summary.failed.length?1:0;
})();

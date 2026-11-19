import type {LearnerDatabase} from './learners';
import {cleanVocabulary,mergeVocabulary,type CloudVocabulary} from '../src/lib/cloudVocabulary';
const reply=(body:object,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store, private','X-Content-Type-Options':'nosniff'}});
type Row={vocabulary_json:string;revision:number};
const empty=():CloudVocabulary=>({words:{},removed:{}});
/** The stored bank is merged with each upload under an optimistic revision check, so no device's words are lost. */
export async function vocabularyResponse(request:Request,db:LearnerDatabase,id:string,input?:{vocabulary?:unknown}){
 const read=()=>db.prepare('SELECT vocabulary_json,revision FROM cloud_vocabulary WHERE learner_id=?').bind(id).first<Row>();
 if(request.method==='GET'){const row=await read();return reply({vocabulary:row?cleanVocabulary(JSON.parse(row.vocabulary_json)):empty()});}
 if(request.method!=='PUT')return reply({error:'Method not allowed.'},405);
 if(!input||typeof input.vocabulary!=='object'||input.vocabulary===null)return reply({error:'Send your word bank.'},400);
 const incoming=cleanVocabulary(input.vocabulary);
 for(let attempt=0;attempt<4;attempt++){
  const row=await read(),merged=mergeVocabulary(row?JSON.parse(row.vocabulary_json):empty(),incoming),now=new Date().toISOString(),json=JSON.stringify(merged);
  const result=row
   ?await db.prepare('UPDATE cloud_vocabulary SET vocabulary_json=?,revision=revision+1,updated_at=? WHERE learner_id=? AND revision=?').bind(json,now,id,row.revision).run()
   :await db.prepare('INSERT OR IGNORE INTO cloud_vocabulary(learner_id,vocabulary_json,revision,updated_at) VALUES(?,?,1,?)').bind(id,json,now).run();
  if(result.meta.changes)return reply({vocabulary:merged});
 }
 return reply({error:'Your word bank changed on another device. Please sync again; your local words are kept.',code:'retry_sync'},409);
}

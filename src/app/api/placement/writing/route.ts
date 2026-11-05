import { NextResponse } from 'next/server';
import { assessPlacementWriting } from '@/lib/writingAssessmentServer';
import { AssessmentError,speakingServiceReady } from '@/lib/speakingAssessmentServer';
import { WRITING_CONSENT_VERSION } from '@/lib/cefrPlacement';
export const runtime='nodejs';export const dynamic='force-dynamic';
const json=(body:object,status=200)=>NextResponse.json(body,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
let active=0,used=0,windowStart=0;
export async function GET(){return json({available:speakingServiceReady(),provider:'OpenAI',consentVersion:WRITING_CONSENT_VERSION});}
export async function POST(request:Request){
 if(request.headers.get('origin')!==new URL(request.url).origin)return json({error:'Invalid origin.'},403);
 if(!speakingServiceReady())return json({error:'Automatic writing assessment needs server configuration. Your draft stays local.'},503);
 if(!request.headers.get('content-type')?.startsWith('application/json'))return json({error:'A JSON request is required.'},415);
 const reader=request.body?.getReader();if(!reader)return json({error:'No response was supplied.'},400);
 try{let size=0;const chunks:Uint8Array[]=[];for(;;){const item=await reader.read();if(item.done)break;size+=item.value.length;if(size>52000){await reader.cancel();return json({error:'Choose a shorter response.'},413);}chunks.push(item.value);}const bytes=new Uint8Array(size);let at=0;for(const c of chunks){bytes.set(c,at);at+=c.length;}const value=JSON.parse(new TextDecoder().decode(bytes));
  if(value?.consent!==WRITING_CONSENT_VERSION)return json({error:'Approve sending this response before assessment.'},403);
  if(typeof value.taskId!=='string'||typeof value.text!=='string'||value.text.length>12000)return json({error:'Choose a valid task and response.'},400);
  if(Date.now()-windowStart>3600000){used=0;windowStart=Date.now();}const limit=Number(process.env.ENGLISHCAMP_SPEAKING_HOURLY_LIMIT||30);if(active>=2||used>=(Number.isInteger(limit)&&limit>0?limit:30))return json({error:'The assessment allowance has been reached. Try again later.'},429);
  active++;used++;try{return json({assessment:await assessPlacementWriting(value.taskId,value.text,fetch,request.signal)});}finally{active--;}
 }catch(problem){return json({error:problem instanceof AssessmentError?problem.message:'The writing response could not be assessed.'},problem instanceof AssessmentError?problem.status:400);}
}

import { NextResponse } from "next/server";
import { generateNeuralSpeech, isFixedSpeech } from "@/lib/speechServer";
export const runtime="nodejs";
export const dynamic="force-dynamic";
export async function POST(request:Request){
  const origin=request.headers.get('origin');if(origin&&origin!==new URL(request.url).origin)return NextResponse.json({error:'Invalid origin.'},{status:403});
  if(!request.headers.get('content-type')?.startsWith('application/json'))return NextResponse.json({error:'JSON required.'},{status:415});
  let input:unknown;try{const body=await request.text();if(body.length>25000)return NextResponse.json({error:'Text too long.'},{status:413});input=JSON.parse(body);}catch{return NextResponse.json({error:'Invalid request.'},{status:400});}
  const value=input as {text?:unknown;approvedPersonal?:unknown};if(typeof value?.text!=='string'||!value.text.trim()||value.text.length>12000)return NextResponse.json({error:'Choose a shorter text.'},{status:400});
  if(!isFixedSpeech(value.text)&&value.approvedPersonal!==true)return NextResponse.json({requiresConsent:true},{status:403});
  try{const audio=await generateNeuralSpeech(value.text);return new Response(new Uint8Array(audio),{headers:{'Content-Type':'audio/mpeg','Cache-Control':'private, max-age=604800','X-Content-Type-Options':'nosniff'}});}catch{return NextResponse.json({error:'Natural audio is unavailable. Please try again.'},{status:503});}
}

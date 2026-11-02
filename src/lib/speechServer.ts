import { createHash } from "node:crypto";
import { spawn } from "node:child_process";
import { readFile, mkdir, writeFile, rename, unlink } from "node:fs/promises";
import path from "node:path";
import catalogue from "@/data/speech-catalogue.json";
export const normalizeSpeech=(text:string)=>text.normalize("NFKC").trim().replace(/\s+/g," ").toLowerCase();
const fixed=new Set(catalogue);
export const isFixedSpeech=(text:string)=>fixed.has(normalizeSpeech(text));
export const neuralVoice=(text:string)=>/[\u0600-\u06ff]/.test(text)?"ar-SA-ZariyahNeural":"en-GB-SoniaNeural";
const pending=new Map<string,Promise<Buffer>>();let running=0;
export async function generateNeuralSpeech(text:string):Promise<Buffer>{
  const voice=neuralVoice(text),key=createHash('sha256').update(voice+'\0'+normalizeSpeech(text)).digest('hex');
  const folder=path.resolve(process.env.ENGLISHCAMP_VOICE_CACHE||path.join(process.cwd(),'.camp-cache/voices'));const file=path.join(folder,key+'.mp3');
  try{return await readFile(file);}catch{}
  const existing=pending.get(key);if(existing)return existing;
  if(running>=3)throw new Error('BUSY');
  const task=(async()=>{running++;try{
    const bytes=await new Promise<Buffer>((resolve,reject)=>{
      const child=spawn(process.env.ENGLISHCAMP_TTS_PYTHON||'python3',[path.join(process.cwd(),'scripts/neural-speech.py')],{stdio:['pipe','pipe','pipe']});
      const chunks:Buffer[]=[];let size=0;const timer=setTimeout(()=>{child.kill('SIGTERM');reject(new Error('TIMEOUT'));},90000);
      child.stdout.on('data',(chunk:Buffer)=>{size+=chunk.length;if(size>16*1024*1024){child.kill('SIGTERM');return reject(new Error('SIZE'));}chunks.push(chunk);});
      child.stderr.resume();child.on('error',()=>{clearTimeout(timer);reject(new Error('VOICE_UNAVAILABLE'));});child.on('close',code=>{clearTimeout(timer);if(code!==0||size<1200)reject(new Error('VOICE_UNAVAILABLE'));else resolve(Buffer.concat(chunks));});
      child.stdin.on('error',()=>{});child.stdin.end(JSON.stringify({text,voice}));
    });
    await mkdir(folder,{recursive:true});const temporary=file+'.'+process.pid+'.partial';try{await writeFile(temporary,bytes);await rename(temporary,file);}finally{await unlink(temporary).catch(()=>{});}return bytes;
  }finally{running--;pending.delete(key);}})();pending.set(key,task);return task;
}

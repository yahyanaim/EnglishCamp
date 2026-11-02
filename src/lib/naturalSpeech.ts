"use client";
import recordings from "@/data/practice-audio.json";
export type SpeechState="loading"|"playing"|"stopped"|"error";
export const speechKey=(text:string)=>text.normalize("NFKC").trim().replace(/\s+/g," ").toLowerCase();
const manifest=recordings as {speech:Record<string,string>;conversation:Record<string,string[]>;articles:Record<string,{src:string;cues:string}>};
export const wordRecording=(text:string)=>manifest.speech[speechKey(text)];
export const conversationRecording=(id:string,line:number)=>manifest.conversation[id]?.[line];
export const articleRecording=(id:string)=>manifest.articles[id];
type Owner={src:string;audio?:HTMLAudioElement;controller?:AbortController;objectUrl?:string;state?:(value:SpeechState)=>void};
let current:Owner|null=null;
function release(owner:Owner){owner.audio?.pause();owner.controller?.abort();if(owner.objectUrl)URL.revokeObjectURL(owner.objectUrl);}
export function stopNaturalSpeech(onlySrc?:string){if(onlySrc&&current?.src!==onlySrc)return;const old=current;current=null;if(old){release(old);old.state?.("stopped");}if(typeof window!=="undefined")window.dispatchEvent(new Event("camp:speech-cancel"));}
function begin(owner:Owner){stopNaturalSpeech();window.speechSynthesis?.cancel();window.dispatchEvent(new Event("camp:natural-audio"));current=owner;owner.state?.("loading");}
async function playOwner(owner:Owner,src:string,rate=1){
  if(current!==owner)return;const audio=new Audio(src);owner.audio=audio;audio.playbackRate=rate;audio.preservesPitch=true;
  const finish=(state:SpeechState)=>{if(current===owner){current=null;release(owner);owner.state?.(state);if(state==="error"&&!owner.state)window.dispatchEvent(new Event("camp:speech-error"));}};
  audio.onended=()=>finish("stopped");audio.onerror=()=>finish("error");
  try{await audio.play();if(current===owner)owner.state?.("playing");}catch(error){if(current===owner){finish("error");throw error;}}
}
export async function playNaturalClip(src:string,options:{rate?:number;onState?:(value:SpeechState)=>void}={}){
  if(typeof window==="undefined")return;const owner:Owner={src,state:options.onState};begin(owner);await playOwner(owner,src,options.rate);
}
function consent(text:string){return new Promise<boolean>(resolve=>window.dispatchEvent(new CustomEvent("camp:speech-consent",{detail:{text,resolve}})));}
/** Existing files play locally. Missing clips use Microsoft; personal text requires an explicit choice. */
export async function playNaturalText(text:string,options:{rate?:number;onState?:(value:SpeechState)=>void}={}){
  const recorded=wordRecording(text);if(recorded)return playNaturalClip(recorded,options);
  if(typeof window==="undefined")return;
  const owner:Owner={src:"speech:"+speechKey(text),controller:new AbortController(),state:options.onState};begin(owner);
  const request=(approvedPersonal=false)=>fetch('/api/speech',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text,approvedPersonal}),signal:owner.controller?.signal});
  try{let response=await request();if(response.status===403){const notice=await response.json();if(notice.requiresConsent){const approved=await consent(text);if(current!==owner)return;if(!approved){stopNaturalSpeech();return;}response=await request(true);}}
    if(!response.ok)throw new Error('Natural audio could not load. Please try again.');const blob=await response.blob();if(current!==owner)return;owner.objectUrl=URL.createObjectURL(blob);await playOwner(owner,owner.objectUrl,options.rate);
  }catch(error){if(current!==owner)return;current=null;release(owner);owner.state?.("error");throw error;}
}
export async function playPracticeText(text:string,rate=1,onState?:(value:SpeechState)=>void){await playNaturalText(text,{rate,onState});}

import type {LearnerEnv} from './learners';
import {AiError,aiJson,aiOrigin,aiBody,aiQuota,wavBase64} from './aiShared';
import {PRONUNCIATION_CONSENT,pronunciationText,validPronunciationResult} from '../src/lib/pronunciationAssessment';
export type PronunciationEnv=LearnerEnv&{OPENPRONOUNCE_URL?:string;OPENPRONOUNCE_TOKEN?:string;OPENPRONOUNCE_MODAL_KEY?:string;OPENPRONOUNCE_MODAL_SECRET?:string};
function endpoint(env:PronunciationEnv){try{const u=new URL(env.OPENPRONOUNCE_URL||'');if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash||!env.OPENPRONOUNCE_TOKEN?.trim())return null;
 const modal=u.hostname.endsWith('.modal.run'),key=env.OPENPRONOUNCE_MODAL_KEY?.trim(),secret=env.OPENPRONOUNCE_MODAL_SECRET?.trim();
 // Modal authenticates at its edge before starting the metered model container.
 // Never forward workspace credentials to a different hosting provider.
 if(modal?(!key||!secret):(!!key||!!secret))return null;return u;}catch{return null;}}
export async function pronunciationResponse(request:Request,env:PronunciationEnv,fetcher:typeof fetch=fetch):Promise<Response>{
 const url=endpoint(env),available=!!url&&!!env.LEARNERS_DB;
 if(request.method==='GET')return aiJson({available,provider:'OpenPronounce',consentVersion:PRONUNCIATION_CONSENT});
 if(request.method!=='POST')return aiJson({error:'Method not allowed.'},405);
 try{aiOrigin(request);if(!available)throw new AiError('OpenPronounce needs a connected pronunciation server. Your recording has not been uploaded.',503);
  const input=await aiBody(request,1500000);if(input.consent!==PRONUNCIATION_CONSENT)throw new AiError('Approve sending this recording and the displayed line for pronunciation feedback.',403);
  const text=pronunciationText(input.reference);if(!text||text.length>600)throw new AiError('Choose a valid short practice line.');
  if(!wavBase64(input.audio)||typeof input.audioHash!=='string'||!/^[a-f0-9]{64}$/.test(input.audioHash))throw new AiError('Use three to 30 seconds of clear recorded speech.');const audioHash=input.audioHash;
  await aiQuota(request,env.LEARNERS_DB!,'pronunciation');
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),90000),abort=()=>controller.abort(),signal=request.signal;
  if(signal?.aborted)controller.abort();else signal?.addEventListener('abort',abort,{once:true});
  const headers:Record<string,string>={Authorization:'Bearer '+env.OPENPRONOUNCE_TOKEN,'Content-Type':'application/json'};
  if(url!.hostname.endsWith('.modal.run')){headers['Modal-Key']=env.OPENPRONOUNCE_MODAL_KEY!.trim();headers['Modal-Secret']=env.OPENPRONOUNCE_MODAL_SECRET!.trim();}
  // Workers supports manual redirects; every non-2xx reply is rejected below.
  // Never follow a redirect carrying either layer of service credentials.
  try{const response=await fetcher(url!,{method:'POST',headers,body:JSON.stringify({audio:input.audio,expected_text:text,lang:'en'}),signal:controller.signal,redirect:'manual'});
   if(!response.ok){await response.body?.cancel();if(response.status===422)throw new AiError('No clear speech could be assessed. Record the displayed line again in a quiet place.',422);throw new AiError(response.status===429?'The pronunciation server is busy. Please try again shortly.':'Pronunciation feedback is temporarily unavailable. Your recording stays on this device.',response.status===429?429:502);}
   const result=await response.json();if(!validPronunciationResult(result,text)||result.audioHash!==audioHash)throw new AiError('The pronunciation result did not match this recording. No score was saved.',502);
   return aiJson({result});
  }finally{clearTimeout(timeout);signal?.removeEventListener('abort',abort);}
 }catch(e){return e instanceof AiError?aiJson({error:e.message},e.status):aiJson({error:'The pronunciation service could not finish. Your recording is kept; please try again later.'},503);}
}

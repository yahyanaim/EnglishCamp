import type {LearnerEnv} from './learners';
import {AiError,aiJson,aiOrigin,aiBody,aiQuota,wavBase64} from './aiShared';
import {PRONUNCIATION_CONSENT,pronunciationText,validPronunciationResult} from '../src/lib/pronunciationAssessment';
export type PronunciationEnv=LearnerEnv&{OPENPRONOUNCE_URL?:string;OPENPRONOUNCE_TOKEN?:string};
function endpoint(env:PronunciationEnv){try{const u=new URL(env.OPENPRONOUNCE_URL||'');if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash||!env.OPENPRONOUNCE_TOKEN?.trim())return null;return u;}catch{return null;}}
export async function pronunciationResponse(request:Request,env:PronunciationEnv,fetcher:typeof fetch=fetch):Promise<Response>{
 const url=endpoint(env),available=!!url&&!!env.LEARNERS_DB;
 if(request.method==='GET')return aiJson({available,provider:'OpenPronounce',consentVersion:PRONUNCIATION_CONSENT});
 if(request.method!=='POST')return aiJson({error:'Method not allowed.'},405);
 try{aiOrigin(request);if(!available)throw new AiError('OpenPronounce needs a connected pronunciation server. Your recording has not been uploaded.',503);
  const input=await aiBody(request,1500000);if(input.consent!==PRONUNCIATION_CONSENT)throw new AiError('Approve sending this recording and the displayed line for pronunciation feedback.',403);
  const text=pronunciationText(input.reference);if(!text||text.length>600)throw new AiError('Choose a valid short practice line.');
  if(!wavBase64(input.audio)||typeof input.audioHash!=='string'||!/^[a-f0-9]{64}$/.test(input.audioHash))throw new AiError('Use three to 30 seconds of clear recorded speech.');const audioHash=input.audioHash;
  await aiQuota(request,env.LEARNERS_DB!,'pronunciation');
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),90000),abort=()=>controller.abort();request.signal.addEventListener('abort',abort,{once:true});
  try{const response=await fetcher(url!,{method:'POST',headers:{Authorization:'Bearer '+env.OPENPRONOUNCE_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({audio:input.audio,expected_text:text,lang:'en'}),signal:controller.signal,redirect:'error'});
   if(!response.ok){await response.body?.cancel();throw new AiError(response.status===429?'The pronunciation server is busy. Please try again shortly.':'Pronunciation feedback is temporarily unavailable. Your recording stays on this device.',response.status===429?429:502);}
   const result=await response.json();if(!validPronunciationResult(result,text)||result.audioHash!==audioHash)throw new AiError('The pronunciation result did not match this recording. No score was saved.',502);
   return aiJson({result});
  }finally{clearTimeout(timeout);request.signal.removeEventListener('abort',abort);}
 }catch(e){return e instanceof AiError?aiJson({error:e.message},e.status):aiJson({error:'The pronunciation service could not finish. Your recording is kept; please try again later.'},503);}
}

import type { ShadowLesson } from './shadowing';
import { LEGACY_SHADOW_CUES } from './shadowing-timings';
/** Real two-speaker exchanges from short VOA videos. The player opens on the dialogue. */
export function conversationSelection(originals:ShadowLesson[]):ShadowLesson[]{
 const selections:[string,number[],string[],string][]=[
  ['making-party-plans',[0,1,2,3,4,5],['Speaker 1','Speaker 1','Speaker 2','Speaker 1','Speaker 2','Speaker 1'],'Making plans together'],
  ['wait-a-moment',[0,1,2,3,4,5],['Speaker 1','Speaker 2','Speaker 2','Speaker 1','Speaker 2','Speaker 1'],'Asking someone for help'],
  ['productive-day',[0,1,2,3,4,5],['Speaker 1','Speaker 2','Speaker 2','Speaker 1','Speaker 2','Speaker 1'],'How was your day?'],
  ['sharing-difficult-news',[0,1,2,3,4],['Andrew','Andrew','Anna','Anna','Anna'],'Giving difficult news politely'],
  ['fresh-start',[0,1,2,3,4],['Speaker 1','Speaker 1','Speaker 2','Speaker 1','Speaker 2'],'Talking about habits'],
  ['break-the-ice',[5,6,7,8],['Speaker 1','Speaker 2','Speaker 1','Speaker 2'],'Meeting new people'],
  ['obvious-choice',[0,1,2,3,4,5],['Speaker 1','Speaker 2','Speaker 2','Speaker 1','Speaker 2','Speaker 1'],'Sharing an opinion about a TV show'],
  ['plans-and-dreams',[0,1,2,3,4],['Speaker 1','Speaker 2','Speaker 2','Speaker 1','Speaker 2'],'Discussing plans and ambitions'],
 ];
 const selected=selections.map(([id,indices,speakers,title])=>{const source=originals.find(l=>l.id===id)!;const lines=indices.map((line,i)=>{const cue=LEGACY_SHADOW_CUES[id].find(c=>c.line===line)!;return {...source.lines[line],speaker:speakers[i],start:cue.start,end:cue.end};});return {...source,title,kind:'conversation' as const,sourceDuration:source.duration,clipStart:lines[0].start,clipEnd:lines[lines.length-1].end,duration:lines[lines.length-1].end-lines[0].start,lines};});
 const source=originals.find(l=>l.id==='give-and-take')!;
 selected.push({...source,title:'Responding to criticism',kind:'conversation',sourceDuration:source.duration,clipStart:20,clipEnd:40,duration:20,lines:[
  {text:'Sometimes Dee really bothers me.',ar:'تزعجني دي أحياناً كثيراً.',speaker:'Speaker 1',start:20,end:22.5},
  {text:'Uh-oh. What happened?',ar:'يا إلهي. ماذا حدث؟',speaker:'Speaker 2',start:22.5,end:24.75},
  {...source.lines[1],speaker:'Speaker 1',start:30,end:32.25},
  {...source.lines[2],speaker:'Speaker 1',start:34,end:36.25},
  {text:"Oh, so she can dish it out but she can't take it!",ar:'آه، إذن هي تنتقد الآخرين لكنها لا تتقبّل النقد!',speaker:'Speaker 2',start:36.25,end:40},
 ]});return selected;
}

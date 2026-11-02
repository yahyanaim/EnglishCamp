export type WordCue = { text: string; start: number; end: number };
const letters = new RegExp("[\\p{L}\\p{N}]", "u");
export function articleTokens(paragraphs: readonly {en:string}[]) {
  let word=0;
  return paragraphs.map(p=>p.en.split(/(\s+)/).filter(Boolean).map(text=>({text,index:letters.test(text)?word++:-1})));
}
export function cueAtTime(cues:readonly WordCue[],time:number) {
  let lo=0,hi=cues.length-1,index=-1;
  while(lo<=hi){const mid=(lo+hi)>>1;if(cues[mid].start<=time){index=mid;lo=mid+1;}else hi=mid-1;}
  return index>=0 && time<=cues[index].end+.1?index:-1;
}

export type ShadowCue={start:number;end:number;line?:number};
/** No invented timestamps: an untimed selection returns -1. Gaps keep captions off screen. */
export function shadowCueAt(cues:readonly ShadowCue[],time:number):number{
 if(!Number.isFinite(time))return -1;
 const index=cues.findIndex(cue=>time>=cue.start&&time<cue.end);
 return index<0?-1:cues[index].line??index;
}
export function shadowClipBounds(cues:readonly ShadowCue[],fallbackDuration:number){
 return cues.length?{start:cues[0].start,end:cues[cues.length-1].end}:{start:0,end:fallbackDuration};
}

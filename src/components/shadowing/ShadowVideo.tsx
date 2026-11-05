"use client";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState, type ReactNode } from "react";
import { Play, Video, ExternalLink } from "lucide-react";
import { Button } from '@/components/ui/shadcn/button';
import { stopNaturalSpeech } from "@/lib/naturalSpeech";
import { shadowCueAt, type ShadowCue } from '@/lib/shadowTimeline';
type Player={playVideo:()=>void;pauseVideo:()=>void;seekTo:(time:number,allow:boolean)=>void;getCurrentTime:()=>number;setPlaybackRate:(rate:number)=>void;getAvailablePlaybackRates:()=>number[];destroy:()=>void};
type Api={Player:new (element:HTMLIFrameElement,options:{events:{onReady:()=>void;onStateChange:(event:{data:number})=>void;onPlaybackRateChange:(event:{data:number})=>void;onError:()=>void}})=>Player};
type VideoWindow=Window&{YT?:Api;onYouTubeIframeAPIReady?:()=>void};
let apiPromise:Promise<Api>|null=null;
function loadApi(){const win=window as VideoWindow;if(win.YT?.Player)return Promise.resolve(win.YT);if(apiPromise)return apiPromise;apiPromise=new Promise<Api>((resolve,reject)=>{const previous=win.onYouTubeIframeAPIReady;win.onYouTubeIframeAPIReady=()=>{previous?.();if(win.YT)resolve(win.YT);};const script=document.createElement('script');script.src='https://www.youtube.com/iframe_api';script.async=true;script.onerror=()=>{apiPromise=null;reject(new Error('Video unavailable'));};document.head.appendChild(script);});return apiPromise;}
export type ShadowVideoHandle={selectLine:(index:number)=>void;toggle:()=>void;replay:()=>void};
export type ShadowVideoControls={ready:boolean;playing:boolean;speed:number;currentTime:number;toggle:()=>void;replay:()=>void;setSpeed:(rate:number)=>void};
type Props={videoId:string;title:string;channel?:string;cues:readonly ShadowCue[];start:number;end:number;active:number;onCueChange:(index:number,playing:boolean)=>void;children:(controls:ShadowVideoControls)=>ReactNode};
export const ShadowVideo=forwardRef<ShadowVideoHandle,Props>(function ShadowVideo({videoId,title,channel='VOA Learning English',cues,start,end,active,onCueChange,children},ref){
 const [host,setHost]=useState("www.youtube-nocookie.com");
 const [loaded,setLoaded]=useState(false),[ready,setReady]=useState(false),[error,setError]=useState(false),[speed,setSpeed]=useState(1),[playing,setPlaying]=useState(false),[currentTime,setCurrentTime]=useState(start);
 const frame=useRef<HTMLIFrameElement>(null),player=useRef<Player|null>(null),playingRef=useRef(false),onceEnd=useRef<number|null>(null);
 const state=useRef({cues,start,end,active,onCueChange});state.current={cues,start,end,active,onCueChange};
 const publish=(time:number)=>{setCurrentTime(time);const s=state.current;s.onCueChange(shadowCueAt(s.cues,time),playingRef.current);};
 function selectLine(index:number){const cue=state.current.cues.find((cue,i)=>(cue.line??i)===index);if(!cue){player.current?.pauseVideo();return;}onceEnd.current=null;const resume=playingRef.current;player.current?.seekTo(cue.start,true);if(!resume)player.current?.pauseVideo();publish(cue.start);}
 function replay(){const s=state.current,cue=s.cues.find((cue,i)=>(cue.line??i)===s.active);onceEnd.current=cue?.end??null;stopNaturalSpeech();player.current?.seekTo(cue?.start??s.start,true);player.current?.playVideo();}
 function toggle(){if(playingRef.current)player.current?.pauseVideo();else{const s=state.current,t=player.current?.getCurrentTime()??s.start;onceEnd.current=null;if(t<s.start||t>=s.end-.1)player.current?.seekTo(s.cues.find((cue,i)=>(cue.line??i)===s.active)?.start??s.start,true);stopNaturalSpeech();player.current?.playVideo();}}
 useImperativeHandle(ref,()=>({selectLine,toggle,replay}));
 useEffect(()=>{
  if(!loaded)return;let disposed=false;setReady(false);setError(false);
  const deadline=window.setTimeout(()=>{if(!disposed)setError(true);},10000);
  const pause=()=>player.current?.pauseVideo();window.addEventListener('camp:natural-audio',pause);
  loadApi().then(api=>{if(disposed||!frame.current)return;player.current=new api.Player(frame.current,{events:{
   onReady:()=>{if(disposed)return;window.clearTimeout(deadline);setError(false);setReady(true);const s=state.current;player.current?.seekTo(s.cues.find((cue,i)=>(cue.line??i)===s.active)?.start??s.start,true);player.current?.pauseVideo();},
   onStateChange:event=>{if(disposed)return;playingRef.current=event.data===1;setPlaying(playingRef.current);if(playingRef.current)stopNaturalSpeech();publish(player.current?.getCurrentTime()??state.current.start);},
   onPlaybackRateChange:event=>{if(!disposed)setSpeed(event.data);},onError:()=>{if(!disposed){setError(true);setPlaying(false);playingRef.current=false;}}
  }});}).catch(()=>{if(!disposed)setError(true);});
  const timer=window.setInterval(()=>{if(!player.current||!playingRef.current)return;const time=player.current.getCurrentTime();const boundary=onceEnd.current??state.current.end;if(time>=boundary){player.current.pauseVideo();onceEnd.current=null;publish(Math.max(state.current.start,boundary-.01));}else publish(time);},100);
  return()=>{disposed=true;window.clearTimeout(deadline);window.clearInterval(timer);window.removeEventListener('camp:natural-audio',pause);player.current?.destroy();player.current=null;playingRef.current=false;};
  // The keyed player owns its lifecycle; current captions and callbacks live in state.current.
  // eslint-disable-next-line react-hooks/exhaustive-deps
 },[videoId,loaded,host]);
 const controls:ShadowVideoControls={ready:ready&&!error,playing,speed,currentTime,toggle,replay,setSpeed:next=>{if(player.current?.getAvailablePlaybackRates().includes(next)){player.current.setPlaybackRate(next);setSpeed(next);}}};
 return <section className="camp-shadow-video" aria-label="Shadowing video" data-video-time={currentTime.toFixed(1)} data-video-playing={playing} data-video-ready={ready&&!error}>
  <div className="camp-video-frame"><div className="camp-video-toolbar"><span><Video size={15}/>Lesson player</span><a href={`https://www.youtube.com/watch?v=${videoId}&t=${Math.floor(start)}`} target="_blank" rel="noreferrer" aria-label="Open this lesson on YouTube"><ExternalLink size={15}/></a></div>
   <div className="camp-video-stage">{loaded?<iframe key={host} className="camp-video-iframe" ref={frame} title={title} src={`https://${host}/embed/${videoId}?enablejsapi=1&playsinline=1&rel=0&hl=en&cc_load_policy=1&cc_lang_pref=en&start=${Math.floor(start)}&end=${Math.ceil(end)}&origin=${encodeURIComponent(window.location.origin)}`} referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>:<button type="button" className="camp-video-placeholder" onClick={()=>setLoaded(true)} aria-label={`Load video lesson: ${title}`}><span className="camp-video-play"><Play size={26} fill="currentColor"/></span><strong>Load lesson video</strong><span>{channel}</span><small>Connects to YouTube only when you choose to load it</small></button>}</div>
   <div className="camp-video-caption"><span>{title}</span><span>{cues.length?'Video-linked practice':'Video + model practice'}</span></div>
  </div>{children(controls)}{error&&<div className="camp-shadow-video-retry" role="status"><p>The embedded player did not respond. Retry using the standard YouTube player, or open the original video.</p>{host!=="www.youtube.com"&&<Button variant="outline" size="sm" onClick={()=>setHost("www.youtube.com")}>Retry YouTube player</Button>}<a href={`https://www.youtube.com/watch?v=${videoId}&t=${Math.floor(start)}`} target="_blank" rel="noreferrer">Open on YouTube ↗</a></div>}
 </section>;
});

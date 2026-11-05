"use client";
import { useEffect,useRef,useState } from 'react';
import { Button } from '@/components/ui/shadcn/button';
import { LearningArt } from '@/components/brand/LearningArt';
import type { ListeningCheck } from '@/data/placement/communication';
export function PlacementListening({question,heard,onHeard}:{question:ListeningCheck;heard:boolean;onHeard:()=>void}){
 const players=useRef<(HTMLAudioElement|null)[]>([]),finished=useRef(new Set<number>());
 const [playing,setPlaying]=useState<number|null>(null),[error,setError]=useState('');
 useEffect(()=>{const audio=players.current;return()=>audio.forEach(a=>a?.pause());},[]);
 async function play(index:number){
  const player=players.current[index];if(!player)return;
  if(!player.paused){player.pause();setPlaying(null);return;}
  players.current.forEach(a=>{if(a!==player)a?.pause();});setError('');
  if(player.ended||player.error){player.currentTime=0;if(player.error)player.load();}
  try{await player.play();setPlaying(index);}catch{setPlaying(null);setError('The recording could not play. Try again, or mark this listening item as unassessed.');}
 }
 return <section className="camp-placement-audio" aria-label="Listening recording"><div><LearningArt name="headphones" size={28}/><div><strong>Listen before choosing</strong><p>{question.clips.length>1?'Play both short recordings in order.':'Play the recording to the end.'} You can listen again.</p></div></div>
 <div className="camp-placement-audio-controls">{question.clips.map((clip,index)=><div key={clip.src+index}><audio hidden preload="metadata" ref={el=>{players.current[index]=el;}} src={clip.src} onPause={()=>setPlaying(current=>current===index?null:current)} onEnded={()=>{setPlaying(null);finished.current.add(index);if(finished.current.size===question.clips.length)onHeard();}} onError={()=>setError('The recording could not load. Retry, or mark this item as unassessed.')}/><Button variant="outline" onClick={()=>void play(index)} aria-label={`${playing===index?'Pause':'Play'} listening recording ${index+1}`}><LearningArt name="headphones" size={17}/>{playing===index?'Pause':'Play'}{question.clips.length>1?` ${index+1}`:' recording'}</Button></div>)}</div>
 <p role="status">{heard?'Recording heard. Choose your answer below.':'Answer choices unlock after the recording ends.'}</p>{error&&<p role="alert">{error}</p>}</section>;
}

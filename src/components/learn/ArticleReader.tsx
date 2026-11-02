"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Pause, Play, RotateCcw } from "lucide-react";
import type { ReadingArticle } from "@/data/reading-articles";
import { LEVEL_LABELS } from "@/data/articles";
import { ReadingIllustration } from "@/components/brand/ReadingIllustration";
import { Button } from "@/components/ui/shadcn/button";
import { NaturalSpeechButton } from "@/components/ui/NaturalSpeechButton";
import { articleRecording, stopNaturalSpeech, wordRecording } from "@/lib/naturalSpeech";
import { articleTokens, cueAtTime, type WordCue } from "@/lib/readingAudio";

const clock = (seconds:number) => `${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,"0")}`;

export default function ArticleReader({ article, onBack }: {article:ReadingArticle;onBack:()=>void}) {
  const recording = articleRecording(article.id);
  const audioRef = useRef<HTMLAudioElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const stopAt = useRef<number|null>(null);
  const [cues,setCues] = useState<WordCue[]>([]);
  const [playing,setPlaying] = useState(false);
  const [active,setActive] = useState(-1);
  const [focused,setFocused] = useState(0);
  const [speed,setSpeed] = useState(1);
  const [position,setPosition] = useState(0);
  const [duration,setDuration] = useState(0);
  const [error,setError] = useState("");
  const [arabic,setArabic] = useState(false);
  const paragraphs = useMemo(()=>articleTokens(article.paragraphs),[article]);

  useEffect(()=> {
    const controller = new AbortController();
    fetch(recording.cues,{signal:controller.signal}).then(r=>{if(!r.ok) throw new Error();return r.json();}).then(setCues).catch(e=>{if(e.name!=="AbortError")setError("Word playback could not load. Reopen the article to retry.");});
    const audio = audioRef.current;
    const pause = () => audio?.pause();
    window.addEventListener("camp:natural-audio",pause);
    return ()=>{controller.abort();audio?.pause();window.removeEventListener("camp:natural-audio",pause);};
  },[recording.cues]);

  useEffect(()=> {
    if(!playing) return;
    let frame=0;
    const tick=()=> {
      const audio=audioRef.current;
      if(!audio) return;
      const time=audio.currentTime;
      if(stopAt.current!==null && time>=stopAt.current){audio.pause();stopAt.current=null;}
      setActive(cueAtTime(cues,time));
      frame=requestAnimationFrame(tick);
    };
    frame=requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(frame);
  },[playing,cues]);

  async function play(index?:number) {
    const audio=audioRef.current;if(!audio)return;
    stopNaturalSpeech();window.speechSynthesis?.cancel();
    if(index!==undefined){const cue=cues[index];if(!cue)return;audio.currentTime=cue.start;stopAt.current=cue.end+.025;setFocused(index);}
    else {stopAt.current=null;if(audio.ended)audio.currentTime=0;}
    audio.playbackRate=speed;audio.preservesPitch=true;setError("");
    try{await audio.play();}catch{setError("Audio could not play. Press Play to retry.");}
  }
  const pause = ()=>audioRef.current?.pause();
  return <article className="camp-article-reader">
    <Button variant="ghost" className="justify-self-start" onClick={onBack}><ArrowLeft size={16}/> Back to articles</Button>
    <header className="camp-article-heading"><div><p className="camp-article-meta">{LEVEL_LABELS[article.level]} · {article.category}</p><h2>{article.title}</h2><p>Read, listen and explore the words in context.</p></div><ReadingIllustration article={article}/></header>
    <section className="camp-reader-controls" aria-label="Article audio">
      <audio ref={audioRef} src={recording.src} preload="metadata" onPlay={e=>{setPlaying(true);if(Number.isFinite(e.currentTarget.duration))setDuration(e.currentTarget.duration);}} onPause={()=>setPlaying(false)} onEnded={()=>{setPlaying(false);setActive(-1);}} onLoadedMetadata={e=>setDuration(e.currentTarget.duration)} onDurationChange={e=>{if(Number.isFinite(e.currentTarget.duration))setDuration(e.currentTarget.duration);}} onTimeUpdate={e=>setPosition(e.currentTarget.currentTime)} onError={()=>setError("Audio could not load. Press Play to retry.")}/>
      <div className="camp-reader-control-row"><Button onClick={()=>{if(playing)pause();else void play();}}>{playing?<Pause size={16}/>:<Play size={16}/>} {playing?"Pause":"Play article"}</Button><Button variant="outline" aria-label="Restart article" onClick={()=>{if(audioRef.current)audioRef.current.currentTime=0;void play();}}><RotateCcw size={16}/></Button><Button variant="secondary" aria-pressed={speed===.8} onClick={()=>{const next=speed===1?.8:1;setSpeed(next);if(audioRef.current)audioRef.current.playbackRate=next;}}>{speed===1?"Normal speed":"Slow speed"}</Button><span className="camp-reader-time">{clock(position)} / {clock(duration)}</span></div>
      <label className="camp-reader-seek"><span className="sr-only">Audio position</span><input type="range" min="0" max={duration||1} step=".05" value={position} onChange={e=>{if(audioRef.current){stopAt.current=null;audioRef.current.currentTime=Number(e.target.value);setPosition(Number(e.target.value));}}}/></label>
      <p>Follow the highlighted words. Select a word to replay it in context. Use arrow keys to move between words.</p>
      {error&&<p role="alert">{error}</p>}
    </section>
    <div ref={bodyRef} className="camp-reader-text">
      {paragraphs.map((tokens,p)=><section key={p} aria-label={`Paragraph ${p+1}`}><p>{tokens.map((token,t)=>token.index<0?<span key={t}>{token.text}</span>:<button type="button" className="camp-reader-word" key={t} data-word-index={token.index} data-active={active===token.index || (active>=0 && cues[token.index]?.start===cues[active]?.start && cues[token.index]?.end===cues[active]?.end)} tabIndex={focused===token.index?0:-1} aria-label={`Hear ${token.text}`} disabled={!cues.length} onFocus={()=>setFocused(token.index)} onClick={()=>void play(token.index)} onKeyDown={e=>{if(e.key!=="ArrowLeft"&&e.key!=="ArrowRight")return;e.preventDefault();const target=Math.max(0,Math.min(cues.length-1,token.index+(e.key==="ArrowRight"?1:-1)));setFocused(target);bodyRef.current?.querySelector<HTMLButtonElement>(`[data-word-index="${target}"]`)?.focus();}}>{token.text}</button>)}</p>{arabic&&<p className="camp-reader-arabic" lang="ar" dir="rtl">{article.paragraphs[p].ar}</p>}</section>)}
      <Button variant="outline" aria-pressed={arabic} onClick={()=>setArabic(!arabic)}>{arabic?"Hide Arabic translation":"Show Arabic translation"}</Button>
    </div>
    <section className="camp-reader-vocabulary"><h3>Words from this article</h3><div>{article.vocabulary.map(v=><div key={v.word} className="camp-reader-vocab-item"><div><h4>{v.word}</h4><NaturalSpeechButton src={wordRecording(v.word)} label={`Hear ${v.word}`} onBeforePlay={pause}/></div><p lang="ar" dir="rtl">{v.ar}</p><p>{v.def}</p></div>)}</div></section>
  </article>;
}

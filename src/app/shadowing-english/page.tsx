"use client";
import { useEffect, useRef, useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/shadcn/button";
import { SelectField } from "@/components/ui/shadcn/select-field";
import { SpeakerButton } from "@/components/ui/SpeakerButton";
import { LearningArt } from "@/components/brand/LearningArt";
import { ShadowLessonCard } from "@/components/shadowing/ShadowLessonCard";
import { shadowClipBounds } from "@/lib/shadowTimeline";
import type { ShadowVideoHandle } from "@/components/shadowing/ShadowVideo";
import { ShadowVideo } from "@/components/shadowing/ShadowVideo";
import { ShadowRecorder } from "@/components/shadowing/ShadowRecorder";
import { ShadowPracticeProgress } from '@/components/shadowing/ShadowPracticeProgress';
import { SessionEntry } from "@/components/session/SessionEntry";
import { useSessionProfile } from "@/components/session/SessionProvider";
import { playNaturalText, stopNaturalSpeech, type SpeechState } from "@/lib/naturalSpeech";
import { SHADOW_LESSONS, normalizeDictation, shadowTimedCues, shadowChannel } from "@/data/shadowing";
import { SkipBack, SkipForward, RotateCcw, Play, Square, Loader2, Eye, Languages, Pencil, Video, ShieldCheck } from "lucide-react";

export default function ShadowingPage() {
  const [lessonId,setLessonId] = useState(SHADOW_LESSONS[0].id);
  const [mode, setMode] = useState<"read" | "spell">("read");
  const [panel, setPanel] = useState<"transcript" | "videos">("videos");
  const [spelling, setSpelling] = useState(true);
  const videoRef=useRef<ShadowVideoHandle>(null);
  const [videoGap,setVideoGap]=useState(false);
  const { profile } = useSessionProfile();
  const [active, setActive] = useState(0), [arabic, setArabic] = useState(false);
  const [answer, setAnswer] = useState(""), [checked, setChecked] = useState(false), [word, setWord] = useState("");
  const [speech, setSpeech] = useState<SpeechState>("stopped"), [rate, setRate] = useState(1);
  const lesson = SHADOW_LESSONS.find(item => item.id === lessonId)!;
  const line = lesson.lines[active] || lesson.lines[0];
  const cues=shadowTimedCues(lesson),bounds={start:lesson.clipStart??shadowClipBounds(cues,lesson.duration).start,end:lesson.clipEnd??shadowClipBounds(cues,lesson.duration).end};
  function lineTime(index:number){const time=cues.find(cue=>cue.line===index)?.start;return time===undefined?"Model":`${Math.floor(time/60)}:${String(Math.floor(time%60)).padStart(2,"0")}`;}
  const busy = speech === "playing" || speech === "loading";
  const correct = normalizeDictation(answer) === normalizeDictation(line.text);
  useEffect(() => () => stopNaturalSpeech(), [lessonId, active]);
  function chooseLine(index: number) { stopNaturalSpeech(); setActive(index); setAnswer(""); setChecked(false); setWord(""); setVideoGap(false); videoRef.current?.selectLine(index); }
  function syncLine(index:number,playing:boolean){setVideoGap(playing&&index<0);if(index>=0&&index!==active&&(playing||cues.some(cue=>cue.line===active))){setActive(index);setAnswer("");setChecked(false);setWord("");}}
  function chooseLesson(id: string) { stopNaturalSpeech(); setLessonId(id); setActive(0); setAnswer(""); setChecked(false); setWord(""); setVideoGap(false); }
  function playLine(replay = false) {
    if (busy && !replay) { stopNaturalSpeech(); return; }
    if (replay) stopNaturalSpeech();
    void playNaturalText(line.text, { rate, onState: setSpeech }).catch(() => {});
  }
  useEffect(() => {
    const keyboard = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat || event.ctrlKey || event.metaKey || event.altKey || document.querySelector('[role="dialog"]')) return;
      const target = event.target as HTMLElement;
      if (target.closest?.('input,textarea,select,button,a,[role="combobox"],[contenteditable="true"]')) return;
      if (event.code === 'Space') { event.preventDefault(); videoRef.current?.toggle(); }
      else if (event.key.toLowerCase() === 'r') { event.preventDefault(); if(cues.some(cue=>cue.line===active))videoRef.current?.replay();else playLine(true); }
      else if (event.key === 'ArrowLeft' && active > 0) { event.preventDefault(); chooseLine(active - 1); }
      else if (event.key === 'ArrowRight' && active < lesson.lines.length - 1) { event.preventDefault(); chooseLine(active + 1); }
    };
    window.addEventListener('keydown', keyboard);
    return () => window.removeEventListener('keydown', keyboard);
    // The shortcuts always use the current line, playback state and speed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, lessonId, busy, rate]);

  return <PageWrapper><div className="camp-shadow-page">
    <header className="camp-shadow-library-bar"><div><h1>Shadowing English</h1><p>Listen to a short conversation, then practise each speaker’s lines.</p></div></header>
    <div className="camp-shadow-workspace">
      <div className="camp-shadow-main">
        <ShadowVideo ref={videoRef} key={lesson.id} videoId={lesson.videoId} title={lesson.title} channel={shadowChannel(lesson)} cues={cues} start={bounds.start} end={bounds.end} active={active} onCueChange={syncLine}>{video => <div className="camp-shadow-playbar" role="group" aria-label="Playback controls">
          <Button className="camp-shadow-transport" variant="outline" aria-label="Previous line" title="Previous line (left arrow)" disabled={active === 0} onClick={() => chooseLine(active - 1)}><SkipBack size={20}/><small>←</small></Button>
          <Button className="camp-shadow-transport" variant="outline" aria-label="Replay line" title="Replay this video line (R)" disabled={cues.some(cue=>cue.line===active)&&!video.ready} onClick={()=>cues.some(cue=>cue.line===active)?video.replay():playLine(true)}><RotateCcw size={20}/><small>R</small></Button>
          <Button className="camp-shadow-transport camp-shadow-transport-primary" disabled={!video.ready} onClick={video.toggle} aria-label={video.playing ? "Pause video" : "Play video"} title="Play video (Space)">{video.playing ? <Square size={20}/> : <Play size={23}/>}<small>Space</small></Button>
          <Button className="camp-shadow-transport camp-shadow-transport-next" variant="outline" aria-label="Next line" title="Next line (right arrow)" disabled={active >= lesson.lines.length - 1} onClick={() => chooseLine(active + 1)}><SkipForward size={20}/><small>→</small></Button>
          <span className="shadow-control-divider"/>
          <span className="camp-shadow-time" aria-label="Video time">{Math.floor(video.currentTime/60)}:{String(Math.floor(video.currentTime%60)).padStart(2,"0")}</span>

          <SelectField aria-label="Video speed" title="Original video speed" disabled={!video.ready} value={video.speed} onValueChange={value => video.setSpeed(Number(value))}><option value="0.75">0.75× video</option><option value="1">1× video</option><option value="1.25">1.25× video</option></SelectField>
        </div>}</ShadowVideo>
        <section className="camp-shadow-practice" aria-label="Practice the selected lines">
          <div className="camp-shadow-sentence-meta"><span>{line.speaker?`${line.speaker} · `:""}Line {active + 1} / {lesson.lines.length}</span><span>{lesson.id==="say-thank-you"&&active===1?"Phrase focus":cues.some(cue=>cue.line===active)?"Follows the video":"Microsoft model practice"}</span></div>
          <div className="camp-shadow-current">{videoGap ? <p className="camp-shadow-caption-gap">Listen to the video. The next selected practice line will appear here.</p> : mode === "read" ? <div className="camp-shadow-line-text">{line.text.split(/\s+/).map((token, i) => <button key={i} type="button" aria-label={`Explore ${token}`} onClick={() => { const selected = token.replace(/^[^a-z]+|[^a-z']+$/gi, ""); setWord(selected); void playNaturalText(selected, { rate }).catch(() => {}); }}><span>{token}</span>{spelling && <small aria-hidden="true">{token.replace(/[^a-z']/gi, "").split("").join(" · ")}</small>}</button>)}</div> : <form onSubmit={event => { event.preventDefault(); if (answer.trim()) setChecked(true); }}><label htmlFor="shadow-answer">Listen, then type the line</label><input id="shadow-answer" autoComplete="off" spellCheck={false} value={answer} onChange={event => { setAnswer(event.target.value); setChecked(false); }}/><Button disabled={!answer.trim()}>Check spelling</Button>{checked && <p role="status">{correct ? "The words match. Now say the line aloud." : `Compare your words with: ${line.text}`}</p>}</form>}
            {word && !videoGap && mode === "read" && <div className="camp-shadow-word" aria-live="polite"><strong>{word}</strong><span aria-label={`Spelled ${word}`}>{word.split("").join(" · ")}</span><SpeakerButton text={word}/></div>}
            {arabic && !videoGap && <p className="camp-shadow-arabic" lang="ar" dir="rtl">{line.ar}</p>}
          </div>
          <div className="camp-shadow-sentence-tools"><Button variant="outline" size="sm" onClick={()=>playLine()} aria-label={busy?"Stop model voice":"Play Microsoft model voice"}>{speech==="loading"?<Loader2 size={15} className="animate-spin"/>:busy?<Square size={15}/>:<Play size={15}/>}Model voice</Button><SelectField aria-label="Microsoft voice speed" value={rate} onValueChange={value=>{stopNaturalSpeech();setRate(Number(value));}}><option value="0.75">0.75× voice</option><option value="1">1× voice</option><option value="1.25">1.25× voice</option></SelectField><Button variant="outline" size="sm" aria-pressed={spelling} onClick={() => setSpelling(!spelling)}><Eye size={15}/>Spelling</Button><Button variant="outline" size="sm" aria-pressed={arabic} onClick={() => setArabic(!arabic)}><Languages size={15}/>Translate</Button><Button variant="outline" size="sm" aria-pressed={mode === "spell"} onClick={() => { setMode(mode === "read" ? "spell" : "read"); setAnswer(""); setChecked(false); }}><Pencil size={15}/>{mode === "spell" ? "Read & repeat" : "Listen & spell"}</Button></div>
          {speech === "error" && <p role="alert" className="camp-shadow-error">The Microsoft audio could not load. Please try again.</p>}
        </section>
        <ShadowRecorder key={`recorder:${lesson.id}:${active}`} lineId={`${lesson.id}:${active}`} />
        <ShadowPracticeProgress key={`progress:${lesson.id}:${active}`} lesson={lesson} index={active}/>
        <div className="camp-shadow-session-save"><ShieldCheck size={20}/><div><strong>{profile ? `Practising as ${profile.name}` : "Keep your learning under your name"}</strong><p>{profile ? "Your level and badges stay with this learning session." : "Sign in with a name. Your progress stays in this tab."}</p></div><SessionEntry/></div>
        <details className="camp-shadow-task"><summary>Try it yourself</summary><p>{lesson.task}</p></details>
      </div>
      <aside className="camp-shadow-side" aria-label="Transcript and practice videos">
        <div className="camp-shadow-side-tabs"><Button id="shadow-transcript-tab" aria-pressed={panel === "transcript"} aria-controls="shadow-resource-panel" variant={panel === "transcript" ? "default" : "secondary"} onClick={() => setPanel("transcript")}>Transcript</Button><Button id="shadow-videos-tab" aria-pressed={panel === "videos"} aria-controls="shadow-resource-panel" variant={panel === "videos" ? "default" : "secondary"} onClick={() => setPanel("videos")}>More videos to practice</Button></div>
        <p className="camp-shadow-library-heading">{panel==="videos"?`${SHADOW_LESSONS.length} short conversations`:`${lesson.lines.length} dialogue lines`}</p>
        <div id="shadow-resource-panel" role="region" aria-labelledby={panel === "transcript" ? "shadow-transcript-tab" : "shadow-videos-tab"} className="camp-shadow-resource-content">
          {panel === "transcript" ? <><div className="camp-shadow-transcript-intro"><strong>Selected lines</strong><p>Choose a timestamped line to seek the video. Model lines use the separate voice control.</p></div><ol className="camp-shadow-transcript-list">{lesson.lines.map((item, index) => <li key={index}><button type="button" aria-current={index === active ? "step" : undefined} onClick={() => chooseLine(index)}><span>{lineTime(index)}</span><span>{item.speaker&&<strong className="camp-shadow-speaker">{item.speaker}</strong>}{item.text}{arabic && <small lang="ar" dir="rtl">{item.ar}</small>}</span></button></li>)}</ol><p className="camp-shadow-transcript-note">{cues.length?"Dialogue lines follow the video. Choose a line to seek to it; Replay plays that line once. Repeat both roles, then make the conversation your own.":"This original clip has no timed caption track. These selected lines use the Microsoft model; they do not seek the video."}</p></> : <div className="camp-shadow-video-list">{SHADOW_LESSONS.map(item => <ShadowLessonCard key={item.id} lesson={item} selected={item.id === lesson.id} onSelect={chooseLesson}/>)}</div>}
        </div>
        <p className="camp-shadow-focus"><LearningArt name="idea" size={20}/>{lesson.focus}</p>
      </aside>
    </div>
    <footer className="camp-shadow-credit"><a href={`https://www.youtube.com/watch?v=${lesson.videoId}`} target="_blank" rel="noreferrer">Original video: {shadowChannel(lesson)} ↗</a>{lesson.sourceUrl&&<a href={lesson.sourceUrl} target="_blank" rel="noreferrer">Publisher source ↗</a>}{!lesson.track&&<a href="https://learningenglish.voanews.com/p/6021.html" target="_blank" rel="noreferrer">Source terms ↗</a>}<p>Everyday conversations from VOA Learning English. Each original video is under two minutes; the player opens on its dialogue. No automated pronunciation score is given.</p></footer>
  </div></PageWrapper>;
}

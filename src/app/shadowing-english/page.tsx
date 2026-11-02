"use client";
import { useEffect, useState } from "react";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { Button } from "@/components/ui/shadcn/button";
import { SelectField } from "@/components/ui/shadcn/select-field";
import { SpeakerButton } from "@/components/ui/SpeakerButton";
import { LearningArt } from "@/components/brand/LearningArt";
import { ShadowVideo } from "@/components/shadowing/ShadowVideo";
import { ShadowRecorder } from "@/components/shadowing/ShadowRecorder";
import { SessionEntry } from "@/components/session/SessionEntry";
import { useSessionProfile } from "@/components/session/SessionProvider";
import { playNaturalText, stopNaturalSpeech, type SpeechState } from "@/lib/naturalSpeech";
import { SHADOW_LEVELS, SHADOW_LESSONS, normalizeDictation, type ShadowLevel } from "@/data/shadowing";
import { SkipBack, SkipForward, RotateCcw, Play, Square, Loader2, Eye, Languages, Pencil, Video, ShieldCheck } from "lucide-react";

export default function ShadowingPage() {
  const [level, setLevel] = useState<ShadowLevel>("A1");
  const [mode, setMode] = useState<"read" | "spell">("read");
  const [panel, setPanel] = useState<"transcript" | "videos">("videos");
  const [spelling, setSpelling] = useState(true);
  const { profile } = useSessionProfile();
  const [active, setActive] = useState(0), [arabic, setArabic] = useState(false);
  const [answer, setAnswer] = useState(""), [checked, setChecked] = useState(false), [word, setWord] = useState("");
  const [speech, setSpeech] = useState<SpeechState>("stopped"), [rate, setRate] = useState(1);
  const lesson = SHADOW_LESSONS.find(item => item.level === level)!;
  const line = lesson.lines[active] || lesson.lines[0];
  const busy = speech === "playing" || speech === "loading";
  const correct = normalizeDictation(answer) === normalizeDictation(line.text);
  useEffect(() => () => stopNaturalSpeech(), [level, active]);
  function chooseLine(index: number) { stopNaturalSpeech(); setActive(index); setAnswer(""); setChecked(false); setWord(""); }
  function changeLevel(value: ShadowLevel) { stopNaturalSpeech(); setLevel(value); chooseLine(0); }
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
      if (event.code === 'Space') { event.preventDefault(); playLine(); }
      else if (event.key.toLowerCase() === 'r') { event.preventDefault(); playLine(true); }
      else if (event.key === 'ArrowLeft' && active > 0) { event.preventDefault(); chooseLine(active - 1); }
      else if (event.key === 'ArrowRight' && active < lesson.lines.length - 1) { event.preventDefault(); chooseLine(active + 1); }
    };
    window.addEventListener('keydown', keyboard);
    return () => window.removeEventListener('keydown', keyboard);
    // The shortcuts always use the current line, playback state and speed.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, level, busy, rate]);

  return <PageWrapper><div className="camp-shadow-page">
    <h1 className="sr-only">Shadowing English</h1>
    <div className="camp-shadow-workspace">
      <div className="camp-shadow-main">
        <ShadowVideo key={lesson.id} videoId={lesson.videoId} title={lesson.title}>{video => <div className="camp-shadow-playbar" role="group" aria-label="Playback controls">
          <Button className="camp-shadow-transport" variant="outline" aria-label="Previous line" title="Previous line (left arrow)" disabled={active === 0} onClick={() => chooseLine(active - 1)}><SkipBack size={20}/><small>←</small></Button>
          <Button className="camp-shadow-transport" variant="outline" aria-label="Replay line" title="Replay Microsoft model (R)" onClick={() => playLine(true)}><RotateCcw size={20}/><small>R</small></Button>
          <Button className="camp-shadow-transport camp-shadow-transport-primary" onClick={() => playLine()} aria-busy={speech === "loading"} aria-label={busy ? "Stop line audio" : "Play line audio"} title="Play Microsoft model (Space)">{speech === "loading" ? <Loader2 size={22} className="animate-spin"/> : busy ? <Square size={20}/> : <Play size={23}/>}<small>Space</small></Button>
          <Button className="camp-shadow-transport camp-shadow-transport-next" variant="outline" aria-label="Next line" title="Next line (right arrow)" disabled={active >= lesson.lines.length - 1} onClick={() => chooseLine(active + 1)}><SkipForward size={20}/><small>→</small></Button>
          <span className="shadow-control-divider"/>
          <SelectField aria-label="Microsoft voice speed" title="Microsoft model speed" value={rate} onValueChange={value => { stopNaturalSpeech(); setRate(Number(value)); }}><option value="0.75">0.75× voice</option><option value="1">1× voice</option><option value="1.25">1.25× voice</option></SelectField>
          <Button className="camp-shadow-video-toggle" variant="outline" disabled={!video.ready} aria-label={video.playing ? "Pause video" : "Play video"} onClick={video.toggle}><Video size={17}/>{video.playing ? "Pause" : "Video"}</Button>
          <SelectField aria-label="Video speed" title="Original video speed" disabled={!video.ready} value={video.speed} onValueChange={value => video.setSpeed(Number(value))}><option value="0.75">0.75× video</option><option value="1">1× video</option><option value="1.25">1.25× video</option></SelectField>
        </div>}</ShadowVideo>
        <section className="camp-shadow-practice" aria-label="Practice the selected lines">
          <div className="camp-shadow-sentence-meta"><span>{level} · Line {active + 1} / {lesson.lines.length}</span><span>Microsoft neural model</span></div>
          <div className="camp-shadow-current">{mode === "read" ? <div className="camp-shadow-line-text">{line.text.split(/\s+/).map((token, i) => <button key={i} type="button" aria-label={`Explore ${token}`} onClick={() => { const selected = token.replace(/^[^a-z]+|[^a-z']+$/gi, ""); setWord(selected); void playNaturalText(selected, { rate }).catch(() => {}); }}><span>{token}</span>{spelling && <small aria-hidden="true">{token.replace(/[^a-z']/gi, "").split("").join(" · ")}</small>}</button>)}</div> : <form onSubmit={event => { event.preventDefault(); if (answer.trim()) setChecked(true); }}><label htmlFor="shadow-answer">Listen, then type the line</label><input id="shadow-answer" autoComplete="off" spellCheck={false} value={answer} onChange={event => { setAnswer(event.target.value); setChecked(false); }}/><Button disabled={!answer.trim()}>Check spelling</Button>{checked && <p role="status">{correct ? "The words match. Now say the line aloud." : `Compare your words with: ${line.text}`}</p>}</form>}
            {word && mode === "read" && <div className="camp-shadow-word" aria-live="polite"><strong>{word}</strong><span aria-label={`Spelled ${word}`}>{word.split("").join(" · ")}</span><SpeakerButton text={word}/></div>}
            {arabic && <p className="camp-shadow-arabic" lang="ar" dir="rtl">{line.ar}</p>}
          </div>
          <div className="camp-shadow-sentence-tools"><span className="shadow-accent-label">UK voice</span><Button variant="outline" size="sm" aria-pressed={spelling} onClick={() => setSpelling(!spelling)}><Eye size={15}/>Spelling</Button><Button variant="outline" size="sm" aria-pressed={arabic} onClick={() => setArabic(!arabic)}><Languages size={15}/>Translate</Button><Button variant="outline" size="sm" aria-pressed={mode === "spell"} onClick={() => { setMode(mode === "read" ? "spell" : "read"); setAnswer(""); setChecked(false); }}><Pencil size={15}/>{mode === "spell" ? "Read & repeat" : "Listen & spell"}</Button></div>
          {speech === "error" && <p role="alert" className="camp-shadow-error">The Microsoft audio could not load. Please try again.</p>}
        </section>
        <ShadowRecorder key={`${lesson.id}:${active}`} lineId={`${lesson.id}:${active}`} />
        <div className="camp-shadow-session-save"><ShieldCheck size={20}/><div><strong>{profile ? `Practising as ${profile.name}` : "Keep your learning under your name"}</strong><p>{profile ? "Your level and badges stay with this learning session." : "Sign in with a name. Your progress stays in this tab."}</p></div><SessionEntry/></div>
        <details className="camp-shadow-task"><summary>Try it yourself</summary><p>{lesson.task}</p></details>
      </div>
      <aside className="camp-shadow-side" aria-label="Transcript and practice videos">
        <div className="camp-shadow-side-tabs"><Button id="shadow-transcript-tab" aria-pressed={panel === "transcript"} aria-controls="shadow-resource-panel" variant={panel === "transcript" ? "default" : "secondary"} onClick={() => setPanel("transcript")}>Transcript</Button><Button id="shadow-videos-tab" aria-pressed={panel === "videos"} aria-controls="shadow-resource-panel" variant={panel === "videos" ? "default" : "secondary"} onClick={() => setPanel("videos")}>More videos to practice</Button></div>
        <div className="camp-shadow-levels" aria-label="Choose a practice level">{SHADOW_LEVELS.map(value => <Button key={value} variant={level === value ? "secondary" : "ghost"} aria-pressed={level === value} onClick={() => changeLevel(value)}>{value}</Button>)}</div>
        <div id="shadow-resource-panel" role="region" aria-labelledby={panel === "transcript" ? "shadow-transcript-tab" : "shadow-videos-tab"} className="camp-shadow-resource-content">
          {panel === "transcript" ? <><div className="camp-shadow-transcript-intro"><strong>Selected lines</strong><p>Choose a line to practise below the video.</p></div><ol className="camp-shadow-transcript-list">{lesson.lines.map((item, index) => <li key={index}><button type="button" aria-current={index === active ? "step" : undefined} onClick={() => chooseLine(index)}><span>{String(index + 1).padStart(2, "0")}</span><span>{item.text}{arabic && <small lang="ar" dir="rtl">{item.ar}</small>}</span></button></li>)}</ol><p className="camp-shadow-transcript-note">Selected teaching lines, not a complete transcript for every clip. Selecting a line changes the practice model; it does not seek the video.</p></> : <div className="camp-shadow-video-list">{SHADOW_LESSONS.map(item => <button key={item.id} type="button" aria-pressed={item.id === lesson.id} onClick={() => { changeLevel(item.level); }}><span className="camp-shadow-thumb"><img src={`https://i.ytimg.com/vi/${item.videoId}/mqdefault.jpg`} alt="" loading="lazy" width={144} height={81}/><small>{item.level}</small></span><span><strong>{item.title}</strong><small>{item.duration}s · {item.lines.length} selected lines</small><small>VOA Learning English</small><span className="camp-shadow-topic">{item.level === "A1" || item.level === "A2" ? "Pronunciation" : "Everyday English"}</span></span></button>)}</div>}
        </div>
        <p className="camp-shadow-focus"><LearningArt name="idea" size={20}/>{lesson.focus}</p>
      </aside>
    </div>
    <footer className="camp-shadow-credit"><a href={`https://www.youtube.com/watch?v=${lesson.videoId}`} target="_blank" rel="noreferrer">Original video: VOA Learning English ↗</a><a href="https://learningenglish.voanews.com/p/6021.html" target="_blank" rel="noreferrer">Public-domain source terms ↗</a><p>Levels are suggested practice levels. No automated pronunciation score is given.</p></footer>
  </div></PageWrapper>;
}

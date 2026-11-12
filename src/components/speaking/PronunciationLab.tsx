"use client";
import {useState} from 'react';
import {PRONUNCIATION_LINES} from '@/lib/pronunciationAssessment';
import {ShadowRecorder} from '@/components/shadowing/ShadowRecorder';
import {SelectField} from '@/components/ui/shadcn/select-field';
import {SpeakerButton} from '@/components/ui/SpeakerButton';
export function PronunciationLab(){const [id,setId]=useState<string>(PRONUNCIATION_LINES[0].id),line=PRONUNCIATION_LINES.find(l=>l.id===id)!;return <section className="camp-pronunciation-lab"><div className="camp-pronunciation-lab-heading"><div><h2>Read, record and compare</h2><p>Practise a useful line before trying the sound guide.</p></div><SelectField aria-label="Choose a pronunciation situation" value={id} onValueChange={setId}>{PRONUNCIATION_LINES.map(p=><option value={p.id} key={p.id}>{p.title}</option>)}</SelectField></div><blockquote>{line.text}<SpeakerButton text={line.text}/></blockquote><ShadowRecorder key={id} lineId={'pronunciation:'+id} maxSeconds={30} reference={{kind:'practice',id}}/></section>;}

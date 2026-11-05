"use client";
import { useEffect, useRef, useState } from 'react';
import { loadTake } from '@/lib/activityState';
import { ExamRecorder } from '@/components/mock-exam/ExamRecorder';
import { Button } from '@/components/ui/shadcn/button';
import type { CefrSpeakingTask } from '@/data/placement/cefr';
import { SPEAKING_CONSENT_VERSION, SPEAKING_DIMENSIONS, speakingDimensionLabel, validSpeakingAssessment } from '@/lib/speakingAssessment';
import { prepareSpeakingAudio } from '@/lib/speakingAudio';
import type { SpeakingReview } from '@/lib/placementCommunication';
import { readSessionProfile } from '@/lib/sessionProfile';
import { useSessionProfile } from '@/components/session/SessionProvider';

export function PlacementSpeaking({ task, attemptId, review, onReview, onBusy }: {
  task: CefrSpeakingTask; attemptId: string; review?: SpeakingReview;
  onReview: (review: SpeakingReview) => void; onBusy: (busy: boolean) => void;
}) {
  const { profile } = useSessionProfile(), owner = profile?.number;
  const storageKey = `placement-${attemptId}-${task.id}`;
  const [available, setAvailable] = useState(false), [service, setService] = useState<'checking'|'ready'|'unavailable'>('checking');
  const [consent, setConsent] = useState(false), [assessing, setAssessing] = useState(false), [recording, setRecording] = useState(false), [error, setError] = useState('');
  const live = useRef(true), controller = useRef<AbortController | null>(null), revision = useRef(0);
  const callbacks = useRef({ onReview, onBusy }); callbacks.current = { onReview, onBusy };
  useEffect(() => {
    live.current = true;
    loadTake(storageKey).then(take => { if (live.current) setAvailable(!!take); }).catch(() => {});
    const status = new AbortController();
    fetch('/api/placement/speaking', { cache: 'no-store', signal: status.signal }).then(r => r.json()).then(value => {
      if (live.current) setService(value.available === true && value.consentVersion === SPEAKING_CONSENT_VERSION ? 'ready' : 'unavailable');
    }).catch(() => { if (live.current) setService('unavailable'); });
    return () => { live.current = false; revision.current++; status.abort(); controller.current?.abort(); callbacks.current.onBusy(false); };
  }, [storageKey]);
  useEffect(() => { callbacks.current.onBusy(recording || assessing); }, [recording, assessing]);
  const sameOwner = () => live.current && !!owner && readSessionProfile(sessionStorage)?.number === owner;
  async function assess() {
    if (!consent || assessing || service !== 'ready' || !sameOwner()) return;
    const sequence = ++revision.current, request = new AbortController(); controller.current = request;
    setAssessing(true); setError('');
    try {
      const take = await loadTake(storageKey);
      if (!take) throw new Error('Your recording is unavailable. Record a response first.');
      const { bytes, hash } = await prepareSpeakingAudio(take);
      if (!sameOwner() || sequence !== revision.current || request.signal.aborted) return;
      const form = new FormData(); form.set('taskId', task.id); form.set('consent', SPEAKING_CONSENT_VERSION);
      form.set('audio', new Blob([bytes as Uint8Array<ArrayBuffer>], { type: 'audio/wav' }), 'response.wav');
      const response = await fetch('/api/placement/speaking', { method: 'POST', body: form, signal: request.signal, cache: 'no-store' });
      const body = await response.json();
      if (!response.ok) throw new Error(typeof body.error === 'string' ? body.error : 'Assessment failed. Your recording is still available.');
      const assessment = validSpeakingAssessment(body.assessment, task.id);
      if (!assessment || assessment.audioHash !== hash) throw new Error('The result does not match this recording. No score has been saved.');
      if (sameOwner() && sequence === revision.current) callbacks.current.onReview({ status: 'assessed', recorded: true, assessment });
    } catch (problem) {
      if (sameOwner() && sequence === revision.current) setError(request.signal.aborted ? 'Assessment cancelled. Your recording stays on this device.' : problem instanceof Error ? problem.message : 'Assessment is unavailable. Try again.');
    } finally { if (live.current && sequence === revision.current) { setAssessing(false); setConsent(false); } }
  }
  const assessment = review?.status === 'assessed' ? review.assessment : null;
  return <div className="camp-placement-speaking">
    <p>Prepare, record and replay your answer. Then choose automatic assessment to evaluate the recording. You can leave a task unassessed.</p>
    <ExamRecorder key={attemptId + task.id} task={{ id: task.id, title: task.title, instructions: task.prompt, prompts: [task.prompt], preparationSeconds: task.preparation, responseSeconds: task.seconds, kind: 'long-turn', model: '', analysis: '', rubric: [...task.targets] }}
      storageKey={storageKey} review={assessing} allowRetake
      privacyNotice="Recording stays on this device until you approve and choose Assess my speaking. Automatic assessment sends this recording and the task prompt to OpenAI."
      onSaved={() => { if (!sameOwner()) return; setAvailable(true); setConsent(false); setError(''); callbacks.current.onReview({ status: 'recorded', recorded: true, ratings: {} }); }} onBusy={setRecording}/>
    {!assessment && <section className="camp-speaking-assessment" aria-label="Automatic speaking assessment">
      <h3>Assess my speaking</h3><p>Get feedback on task completion, clarity, fluency, grammar and vocabulary. At least two assessed tasks are needed for a speaking starting-level estimate.</p>
      {service === 'checking' ? <p role="status">Checking assessment availability…</p> : service === 'unavailable' ? <p role="status">Automatic assessment is unavailable on this server. Your recording remains local and speaking stays unassessed. You can save and return later, or skip this task.</p> : <>
        <label className="camp-speaking-consent"><input type="checkbox" checked={consent} disabled={!available || recording || assessing} onChange={e => setConsent(e.target.checked)}/><span>I approve sending this recording and its task prompt to OpenAI for assessment. My account name, notes and other answers are not included.</span></label>
        <p className="camp-placement-fine">EnglishCamp does not save the upload on its server. The result and transcript are saved in your named tab session. OpenAI may retain API data for abuse monitoring for up to 30 days under its <a href="https://developers.openai.com/api/docs/guides/your-data" target="_blank" rel="noreferrer">data controls</a>. Declining leaves this task unassessed.</p>
        <div className="camp-placement-actions"><Button disabled={!available || !consent || recording || assessing} onClick={assess}>{assessing ? 'Listening and assessing…' : 'Assess my speaking'}</Button>{assessing && <Button variant="outline" onClick={() => controller.current?.abort()}>Cancel assessment</Button>}</div>
      </>}
      {error && <p role="alert" className="camp-placement-error">{error}</p>}
      {review?.status === 'reviewed' && <p className="camp-placement-fine">Your earlier self-review is retained. It is not used as an assessed speaking result.</p>}
    </section>}
    {assessment && <section className="camp-speaking-assessment" aria-label="Speaking assessment result"><h3>Your speaking feedback</h3><p>Task completion: {assessment.taskAchievement} / 4</p><dl className="camp-speaking-scores">{SPEAKING_DIMENSIONS.map(k => <div key={k}><dt>{speakingDimensionLabel[k]} <strong>{assessment.dimensions[k].score} / {assessment.version==='englishcamp-speaking-v1'?5:6}</strong></dt><dd>{assessment.dimensions[k].evidence}</dd></div>)}</dl><h4>What worked</h4><ul>{assessment.strengths.map(s => <li key={s}>{s}</li>)}</ul><h4>Practise next</h4><ul>{assessment.nextSteps.map(s => <li key={s}>{s}</li>)}</ul><details><summary>Recording transcript</summary><p>{assessment.transcript}</p></details><p className="camp-placement-fine">Automated study feedback can make mistakes. Language scores use an internal 0–6 rubric and are not official CEFR or exam marks. Saving another response clears this feedback so the new recording can be assessed.</p></section>}
  </div>;
}

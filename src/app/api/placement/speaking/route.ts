import { assessSpeakingAudio, AssessmentError, MAX_ASSESSMENT_BYTES, speakingServiceReady } from '@/lib/speakingAssessmentServer';
import { SPEAKING_CONSENT_VERSION } from '@/lib/speakingAssessment';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
const json = (body: object, status = 200) => Response.json(body, { status, headers });
let active = 0, used = 0, windowStart = 0;
export async function GET() { return json({ available: speakingServiceReady(), provider: 'OpenAI', consentVersion: SPEAKING_CONSENT_VERSION }); }
export async function POST(request: Request) {
  if (request.headers.get('origin') !== new URL(request.url).origin) return json({ error: 'Invalid origin.' }, 403);
  if (!speakingServiceReady()) return json({ error: 'Automatic speaking assessment needs server configuration. Your recording stays local.' }, 503);
  if (!request.headers.get('content-type')?.startsWith('multipart/form-data;')) return json({ error: 'An audio upload is required.' }, 415);
  // Bounded streaming before multipart parsing also limits chunked requests without Content-Length.
  const reader = request.body?.getReader(); if (!reader) return json({ error: 'No recording was supplied.' }, 400);
  const chunks: Uint8Array[] = []; let size = 0;
  try {
    for (;;) { const item = await reader.read(); if (item.done) break; size += item.value.length;
      if (size > MAX_ASSESSMENT_BYTES + 4096) { await reader.cancel(); return json({ error: 'This recording is too large.' }, 413); } chunks.push(item.value); }
    const bytes = new Uint8Array(size); let at = 0; for (const chunk of chunks) { bytes.set(chunk, at); at += chunk.length; }
    const form = await new Response(bytes, { headers: { 'Content-Type': request.headers.get('content-type')! } }).formData();
    if (form.get('consent') !== SPEAKING_CONSENT_VERSION) return json({ error: 'Approve sending this recording for assessment first.' }, 403);
    const taskId = form.get('taskId'), audio = form.get('audio');
    if (typeof taskId !== 'string' || !audio || typeof audio === 'string' || audio.type !== 'audio/wav') return json({ error: 'Choose a valid task and WAV recording.' }, 400);
    if (Date.now() - windowStart > 3_600_000) { windowStart = Date.now(); used = 0; }
    const configured = Number(process.env.ENGLISHCAMP_SPEAKING_HOURLY_LIMIT || 30), limit = Number.isInteger(configured) && configured > 0 ? configured : 30;
    if (active >= 2 || used >= limit) return json({ error: 'The assessment service is busy or its hourly allowance has been reached. Try again later.' }, 429);
    active++; used++;
    try { return json({ assessment: await assessSpeakingAudio(taskId, new Uint8Array(await audio.arrayBuffer()), fetch, request.signal) }); }
    finally { active--; }
  } catch (problem) { return json({ error: problem instanceof AssessmentError ? problem.message : 'The recording could not be assessed. Try again.' }, problem instanceof AssessmentError ? problem.status : 400); }
}

import catalogue from '../src/data/speech-catalogue.json';

const fixed = new Set(catalogue);
export const normalizeSpeech = (text: string) => text.normalize('NFKC').trim().replace(/\s+/g, ' ').toLowerCase();
export const isFixedSpeech = (text: string) => fixed.has(normalizeSpeech(text));
export const neuralVoice = (text: string) => /[\u0600-\u06ff]/.test(text) ? 'ar-SA-ZariyahNeural' : 'en-GB-SoniaNeural';
export type SpeechEnv = { AZURE_SPEECH_KEY?: string; AZURE_SPEECH_REGION?: string };
const xml = (text: string) => text.replace(/[&<>"']/g, value => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }[value]!));
const json = (body: object, status = 200) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });
let active = 0, used = 0, started = 0;
/** Official Microsoft REST synthesis. No Python, browser speech fallback, or persistent learner text. */
export async function speechResponse(request: Request, env: SpeechEnv, fetcher: typeof fetch = fetch) {
  const origin = request.headers.get('origin');
  if (origin && origin !== new URL(request.url).origin) return json({ error: 'Invalid origin.' }, 403);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return json({ error: 'JSON required.' }, 415);
  const reader = request.body?.getReader(); if (!reader) return json({ error: 'Invalid request.' }, 400);
  let size = 0; const chunks: Uint8Array[] = [];
  try {
    for (;;) { const part = await reader.read(); if (part.done) break; size += part.value.length; if (size > 25_000) { await reader.cancel(); return json({ error: 'Text too long.' }, 413); } chunks.push(part.value); }
    const bytes = new Uint8Array(size); let offset = 0; for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    let input;
    try { input = JSON.parse(new TextDecoder().decode(bytes)); } catch { return json({ error: 'Invalid JSON.' }, 400); }
    if (typeof input?.text !== 'string' || !input.text.trim() || input.text.length > 12_000 || /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(input.text)) return json({ error: 'Choose a shorter text.' }, 400);
    if (!isFixedSpeech(input.text) && input.approvedPersonal !== true) return json({ requiresConsent: true }, 403);
    if (!env.AZURE_SPEECH_KEY?.trim() || !/^[a-z0-9-]{2,40}$/.test(env.AZURE_SPEECH_REGION || '')) return json({ error: 'On-demand natural audio has not been configured. Bundled lesson recordings remain available.' }, 503);
    if (Date.now() - started > 60_000) { used = 0; started = Date.now(); }
    // Azure F0 allows 20 transactions/minute. This local guard supplements the provider's quota.
    if (active >= 2 || used >= 18) return json({ error: 'Natural audio is busy. Please try again shortly.' }, 429);
    active++; used++;
    try {
      const voice = neuralVoice(input.text), language = voice === 'ar-SA-ZariyahNeural' ? 'ar-SA' : 'en-GB';
      const response = await fetcher(`https://${env.AZURE_SPEECH_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`, {
        method: 'POST', headers: { 'Ocp-Apim-Subscription-Key': env.AZURE_SPEECH_KEY, 'Content-Type': 'application/ssml+xml', 'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3', 'User-Agent': 'EnglishCamp' },
        body: `<speak version="1.0" xml:lang="${language}"><voice name="${voice}"><prosody rate="-2%">${xml(input.text)}</prosody></voice></speak>`,
        signal: AbortSignal.any([request.signal, AbortSignal.timeout(75_000)]),
      });
      if (!response.ok) { await response.body?.cancel(); return json({ error: 'Natural audio is unavailable. Please try again later.' }, response.status === 429 ? 429 : 503); }
      const audioReader = response.body?.getReader();
      if (!audioReader) return json({ error: 'Natural audio could not be generated.' }, 503);
      const audioChunks: Uint8Array[] = []; let audioSize = 0;
      for (;;) {
        const part = await audioReader.read(); if (part.done) break;
        audioSize += part.value.length;
        if (audioSize > 16 * 1024 * 1024) { await audioReader.cancel(); return json({ error: 'Natural audio could not be generated.' }, 503); }
        audioChunks.push(part.value);
      }
      if (audioSize < 1200) return json({ error: 'Natural audio could not be generated.' }, 503);
      const audio = new Uint8Array(audioSize); let audioOffset = 0;
      for (const chunk of audioChunks) { audio.set(chunk, audioOffset); audioOffset += chunk.length; }
      return new Response(audio, { headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': 'private, max-age=604800', 'X-Content-Type-Options': 'nosniff' } });
    } finally { active--; }
  } catch { return json({ error: 'Natural audio is unavailable. Please try again.' }, 503); }
}

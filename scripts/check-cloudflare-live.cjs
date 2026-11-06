/** Public post-deployment check. Reads no credentials and sends only fixed learning text. */
const origin = 'https://englishcamp.yahyanaim2001.workers.dev';
const routes = ['/', '/vocabulary', '/grammar/cheat-sheet', '/levels/band4-5', '/mock-exam', '/shadowing-english'];

async function checkLiveSite(fetcher = fetch) {
  for (const route of routes) {
    const response = await fetcher(origin + route, { signal: AbortSignal.timeout(30_000) });
    if (response.status !== 200 || !response.headers.get('content-type')?.includes('text/html')) {
      await response.body?.cancel();
      throw new Error(`Page check failed: ${route} (HTTP ${response.status}).`);
    }
    const html = await response.text();
    if (!html.includes('EnglishCamp')) throw new Error(`Page check failed: ${route} did not return EnglishCamp.`);
  }

  const response = await fetcher(origin + '/api/speech', {
    method: 'POST',
    headers: { Origin: origin, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'absorb' }),
    signal: AbortSignal.timeout(80_000),
  });
  if (response.status !== 200 || !response.headers.get('content-type')?.startsWith('audio/mpeg')) {
    await response.body?.cancel();
    throw new Error(`Microsoft voice check failed (HTTP ${response.status}). Check the Worker's AZURE_SPEECH_KEY, AZURE_SPEECH_REGION and Azure quota; keep credentials out of build variables.`);
  }
  const audio = new Uint8Array(await response.arrayBuffer());
  const mp3 = (audio[0] === 0x49 && audio[1] === 0x44 && audio[2] === 0x33)
    || (audio[0] === 0xff && (audio[1] & 0xe0) === 0xe0);
  if (audio.length < 1200 || audio.length > 16 * 1024 * 1024 || !mp3) {
    throw new Error('Microsoft voice check failed: the response was not a usable MP3.');
  }
  return { origin, pages: routes.length, microsoftVoice: 'passed', audioBytes: audio.length };
}

if (require.main === module) {
  checkLiveSite().then(result => console.log(JSON.stringify(result))).catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
module.exports = { checkLiveSite };

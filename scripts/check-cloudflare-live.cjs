/** Post-deployment check. Only a dedicated synthetic profile may be supplied; no secret is logged. */
const origin = 'https://englishcamp.yahyanaim2001.workers.dev';
const routes = ['/learning-home', '/vocabulary', '/grammar/cheat-sheet', '/levels/band4-5', '/mock-exam', '/shadowing-english'];

async function checkLiveSite(fetcher = fetch, profile) {
  const status=await fetcher(origin+'/api/access/session',{signal:AbortSignal.timeout(30000)});
  if(!status.ok)throw new Error('Invitation access check failed.');
  const access=await status.json();let auth={},learnerId;
  if(access.required===true){
    for(const route of routes){const response=await fetcher(origin+route,{redirect:'manual',signal:AbortSignal.timeout(30000)});await response.body?.cancel();
      if(response.status!==303||new URL(response.headers.get('location')||'/',origin).pathname!=='/invite')throw new Error(`Invitation protection failed: ${route}.`);}
    const welcome=await fetcher(origin+'/',{redirect:'manual',signal:AbortSignal.timeout(30000)});
    const welcomeHtml=await welcome.text();
    if(welcome.status!==200||!welcomeHtml.includes('Request access')||!welcomeHtml.includes('Find your voice'))throw new Error('Public welcome page check failed.');
    const blocked=await fetcher(origin+'/api/speech',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({text:'absorb'}),signal:AbortSignal.timeout(30000)});await blocked.body?.cancel();
    if(blocked.status!==401)throw new Error('Unauthenticated Microsoft access was not blocked.');
    if(!profile?.name||!profile?.recoveryCode)throw new Error('Set the private deployment-check profile secret to verify invited access and Microsoft voice.');
    const restored=await fetcher(origin+'/api/learners/restore',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({name:profile.name,code:profile.recoveryCode}),signal:AbortSignal.timeout(30000)});
    if(!restored.ok){await restored.body?.cancel();throw new Error('The private deployment-check profile could not sign in.');}
    const data=await restored.json(),cookie=restored.headers.get('set-cookie')?.split(';')[0];
    if(!cookie||!data.account?.id)throw new Error('The deployment-check profile did not receive a session.');auth={Cookie:cookie};learnerId=data.account.id;
  }
  try {
  for (const route of routes) {
    const response = await fetcher(origin + route, { headers:auth,redirect:'manual',signal: AbortSignal.timeout(30_000) });
    if (response.status !== 200 || !response.headers.get('content-type')?.includes('text/html')) {
      await response.body?.cancel();
      throw new Error(`Page check failed: ${route} (HTTP ${response.status}).`);
    }
    const html = await response.text();
    if (!html.includes('EnglishCamp')) throw new Error(`Page check failed: ${route} did not return EnglishCamp.`);
  }

  const response = await fetcher(origin + '/api/speech', {
    method: 'POST',
    headers: { ...auth, Origin: origin, 'Content-Type': 'application/json' },
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
  return { origin, pages: routes.length, invitationProtection:access.required===true?'passed':'disabled',microsoftVoice: 'passed', audioBytes: audio.length };
  }finally{
    if(learnerId){const logout=await fetcher(origin+'/api/learners/logout',{method:'POST',headers:{...auth,Origin:origin,'Content-Type':'application/json','X-EnglishCamp-Learner':learnerId},body:'{}',signal:AbortSignal.timeout(15000)});await logout.body?.cancel();}
  }
}

if (require.main === module) {
  let profile;try{profile=JSON.parse(process.env.ENGLISHCAMP_SMOKE_PROFILE||'null');}catch{console.error('The private deployment-check profile is not valid JSON.');process.exit(1);}
  checkLiveSite(fetch,profile).then(result => console.log(JSON.stringify(result))).catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
module.exports = { checkLiveSite };

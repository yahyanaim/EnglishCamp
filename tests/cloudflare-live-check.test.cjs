const { test } = require('node:test');
const assert = require('node:assert/strict');
const { checkLiveSite } = require('../scripts/check-cloudflare-live.cjs');
const page = () => new Response('<title>EnglishCamp</title>', { headers: { 'Content-Type': 'text/html' } });
const mp3 = new Uint8Array(1300); mp3.set([0xff, 0xfb]);
const accessStatus=()=>Response.json({required:false,granted:true});

test('deployment check visits public learning pages and tests fixed Microsoft pronunciation without credentials', async () => {
  const calls = [];
  const result = await checkLiveSite(async (url, options) => {
    calls.push(url);
    assert.ok(options.signal);
    assert.equal(options.headers?.Authorization, undefined);
    if(url.endsWith('/api/access/session'))return accessStatus();
    if (!url.endsWith('/api/speech')) return page();
    assert.equal(options.method, 'POST');
    assert.equal(options.headers.Origin, new URL(url).origin);
    assert.deepEqual(JSON.parse(options.body), { text: 'absorb' });
    return new Response(mp3, { headers: { 'Content-Type': 'audio/mpeg' } });
  });
  assert.equal(calls.length, 8);
  assert.equal(result.microsoftVoice, 'passed');
  assert.equal(result.audioBytes, 1300);
});

test('deployment check fails when a learning route is missing or replaced by a hosting error page', async () => {
  await assert.rejects(checkLiveSite(async url => url.endsWith('/api/access/session')?accessStatus():new Response('missing', { status: 404 })), /Page check failed/);
  await assert.rejects(checkLiveSite(async url => url.endsWith('/api/access/session')?accessStatus():new Response('<title>Hosting error</title>', { headers: { 'Content-Type': 'text/html' } })), /did not return EnglishCamp/);
});

test('deployment check detects missing Microsoft configuration and quota errors without logging provider bodies', async () => {
  for (const status of [503, 429]) {
    await assert.rejects(checkLiveSite(async url => url.endsWith('/api/access/session')?accessStatus():url.endsWith('/api/speech')
      ? new Response('provider details must not be logged', { status }) : page()), error => {
      assert.match(error.message, /Microsoft voice check failed/);
      assert.ok(!error.message.includes('provider details'));
      return true;
    });
  }
});

test('deployment check rejects invalid audio even when the endpoint returns HTTP 200', async () => {
  for (const audio of [new Uint8Array(100), new Uint8Array(1300)]) {
    await assert.rejects(checkLiveSite(async url => url.endsWith('/api/access/session')?accessStatus():url.endsWith('/api/speech')
      ? new Response(audio, { headers: { 'Content-Type': 'audio/mpeg' } }) : page()), /not a usable MP3/);
  }
});

test('invitation deployment checks reject public bypasses and authenticate Microsoft playback with a synthetic profile',async()=>{
 const profile={name:'Deployment check',recoveryCode:'synthetic-not-a-real-code'};let loggedOut=false;
 const fetcher=async(url,options)=>{
  const path=new URL(url).pathname;if(path==='/api/access/session')return Response.json({required:true,granted:false});
  if(path==='/api/learners/restore'){assert.deepEqual(JSON.parse(options.body),{name:profile.name,code:profile.recoveryCode});return Response.json({account:{id:'test-profile'}},{headers:{'Set-Cookie':'__Host-camp-session=synthetic-session; HttpOnly; Secure'}});}
  if(path==='/api/learners/logout'){loggedOut=true;return Response.json({ok:true});}
  if(path==='/')return new Response('<h1>Find your voice</h1><a>Request access</a>');
  if(path==='/api/speech')return options.headers.Cookie?new Response(mp3,{headers:{'Content-Type':'audio/mpeg'}}):Response.json({error:'Sign in'},{status:401});
  return options.headers?.Cookie?page():new Response(null,{status:303,headers:{Location:new URL('/invite',url).href}});
 };
 const result=await checkLiveSite(fetcher,profile);assert.equal(result.invitationProtection,'passed');assert.equal(result.microsoftVoice,'passed');assert.equal(loggedOut,true);
 await assert.rejects(checkLiveSite(fetcher),/private deployment-check profile/);
 await assert.rejects(checkLiveSite(async url=>new URL(url).pathname==='/api/access/session'?Response.json({required:true}):page(),profile),/Invitation protection failed/);
});

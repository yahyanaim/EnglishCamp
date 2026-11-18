require('./register.cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { LISTENING_LEVELS, VOA_LISTENING, VOA_PODCAST_URL } = require('../src/data/voa-listening.ts');
const { voaListeningResponse } = require('../cloudflare/voaListening.ts');

function request(id, method = 'GET') {
  return new Request('https://example.test/api/vocabulary/listening?id=' + id, { method });
}

test('the curated VOA catalogue has four short clips and varied situations at each level', () => {
  assert.equal(new Set(VOA_LISTENING.map(clip => clip.id)).size, VOA_LISTENING.length);
  for (const level of LISTENING_LEVELS) {
    const clips = VOA_LISTENING.filter(clip => clip.level === level);
    assert.equal(clips.length, 4);
    assert.ok(new Set(clips.map(clip => clip.topic)).size >= 3, level);
  }
  for (const clip of VOA_LISTENING) {
    assert.ok(clip.seconds > 20 && clip.seconds < 180, clip.id);
    assert.match(clip.audioUrl, /^https:\/\/voa-audio\.voanews\.eu\/vle\/.+\.mp3$/);
    assert.ok(clip.words.length >= 2);
    for (const entry of clip.words) {
      assert.match(entry.arabic, /[\u0600-\u06ff]/);
      assert.ok(entry.example);
    }
  }
});

test('every VOA clip has two distinct questions with three choices and feedback', () => {
  for (const clip of VOA_LISTENING) {
    assert.equal(clip.questions.length, 2, clip.id);
    assert.equal(new Set(clip.questions.map(question => question.prompt)).size, 2, clip.id);
    for (const { prompt, choices, correct, feedback } of clip.questions) {
      assert.ok(prompt.endsWith('?'), clip.id);
      assert.equal(choices.length, 3, prompt);
      assert.equal(new Set(choices).size, 3, prompt);
      assert.ok(Number.isInteger(correct) && choices[correct], prompt);
      assert.ok(feedback.trim().length > 0, prompt);
    }
  }
});

test('the resolver reads the selected VOA player or matching RSS item without accepting user-supplied source URLs', async () => {
  const audio = 'https://voa-audio.voanews.eu/vle/2025/01/01/updated.mp3';
  const lesson = VOA_LISTENING[0];
  const media = await voaListeningResponse(request(lesson.id), async (url, options) => {
    assert.equal(url, 'https://learningenglish.voanews.com/pp/3181231/ppt0.html');
    assert.equal(options.redirect, 'manual');
    return new Response(`<video><source src="https://invalid.test/other"></video><audio><source src="${audio}"></audio>`);
  });
  assert.deepEqual(await media.json(), { audioUrl: audio });
  assert.match(media.headers.get('cache-control'), /private, max-age=3600/);

  const podcast = await voaListeningResponse(request('too-many-commitments'), async url => {
    assert.equal(url, VOA_PODCAST_URL);
    return new Response(`<rss><channel><item><link>https://learningenglish.voanews.com/a/123.html</link><enclosure url="https://invalid.test/no.mp3"/></item><item><link>https://learningenglish.voanews.com/a/7941440.html</link><enclosure url="${audio}"/></item></channel></rss>`);
  });
  assert.deepEqual(await podcast.json(), { audioUrl: audio });

  const unexpectedFetch = async () => assert.fail('Unknown request reached the publisher');
  assert.equal((await voaListeningResponse(request('https://invalid.test'), unexpectedFetch)).status, 404);
  assert.equal((await voaListeningResponse(request(lesson.id, 'POST'), unexpectedFetch)).status, 405);
});

test('publisher failures and non-VOA audio URLs use the reviewed fallback', async () => {
  const clip = VOA_LISTENING[0];
  for (const fetcher of [
    async () => new Response(null, { status: 503 }),
    async () => new Response(null, { status: 302, headers: { Location: 'https://other.test/redirect' } }),
    async () => new Response('<audio><source src="https://other.test/audio.mp3"></audio>'),
    async () => new Response('x'.repeat(512 * 1024 + 1)),
  ]) {
    const response = await voaListeningResponse(request(clip.id), fetcher);
    assert.deepEqual(await response.json(), { audioUrl: clip.audioUrl });
    assert.match(response.headers.get('cache-control'), /private, max-age=60/);
  }
});

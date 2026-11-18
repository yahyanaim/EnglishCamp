require('./register.cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { LISTENING_LEVELS, VOA_LISTENING, VOA_PODCAST_URL } = require('../src/data/voa-listening.ts');
const { voaListeningResponse } = require('../cloudflare/voaListening.ts');

function request(id, method = 'GET') {
  return new Request('https://example.test/api/vocabulary/listening?id=' + id, { method });
}

test('the curated VOA catalogue contains two short clips and contextual Arabic vocabulary per level', () => {
  assert.equal(new Set(VOA_LISTENING.map(clip => clip.id)).size, VOA_LISTENING.length);
  for (const level of LISTENING_LEVELS) {
    assert.equal(VOA_LISTENING.filter(clip => clip.level === level).length, 2);
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

test('the resolver reads the selected VOA player or matching RSS item without accepting user-supplied source URLs', async () => {
  const audio = 'https://voa-audio.voanews.eu/vle/2025/01/01/updated.mp3';
  const lesson = VOA_LISTENING[0];
  const media = await voaListeningResponse(request(lesson.id), async url => {
    assert.equal(url, 'https://learningenglish.voanews.com/pp/3181231/ppt0.html');
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
    async () => new Response('<audio><source src="https://other.test/audio.mp3"></audio>'),
    async () => new Response('x'.repeat(512 * 1024 + 1)),
  ]) {
    const response = await voaListeningResponse(request(clip.id), fetcher);
    assert.deepEqual(await response.json(), { audioUrl: clip.audioUrl });
    assert.match(response.headers.get('cache-control'), /private, max-age=60/);
  }
});

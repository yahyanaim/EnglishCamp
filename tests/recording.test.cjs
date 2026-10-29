require('./register.cjs');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { createRecordingSession } = require('../src/lib/courseActivity.ts');

function setup({ startError, stopError, permission } = {}) {
  const events = [], recordings = [];
  let trackStops = 0, instance;
  const media = { getTracks: () => [{ stop: () => trackStops++ }] };
  class Recorder {
    state = 'inactive';
    mimeType = 'audio/ogg';
    constructor(stream) { assert.equal(stream, media); instance = this; }
    start() { if (startError) throw startError; this.state = 'recording'; }
    stop() {
      if (stopError) throw stopError;
      this.state = 'inactive';
      this.ondataavailable?.({ data: new Blob(['final']) });
      this.onstop?.();
    }
    chunk(value) { this.ondataavailable?.({ data: new Blob([value]) }); }
  }
  const session = createRecordingSession({ getUserMedia: async constraints => {
    assert.deepEqual(constraints, { audio: true });
    if (permission) await permission;
    return media;
  } }, Recorder, {
    onStart: () => events.push('start'),
    onReady: audio => { events.push('ready'); recordings.push(audio); },
    onError: message => events.push(message),
  });
  return { session, events, recordings, get recorder() { return instance; }, get trackStops() { return trackStops; } };
}

test('recording joins chunks including final stop data, retaining replay MIME type', async () => {
  const take = setup();
  await take.session.start(); await take.session.start();
  assert.deepEqual(take.events, ['start']); assert.equal(take.trackStops, 0);
  take.recorder.chunk('first'); take.recorder.chunk('');
  take.session.stop(); take.session.stop(); take.session.dispose();
  assert.deepEqual(take.events, ['start', 'ready']); assert.equal(take.trackStops, 1);
  assert.equal(take.recordings[0].type, 'audio/ogg');
  assert.equal(await take.recordings[0].text(), 'firstfinal');
  assert.equal(take.recorder.ondataavailable, null); assert.equal(take.recorder.onstop, null);
});

test('a start failure releases the microphone and never marks the take ready', async () => {
  const take = setup({ startError: new Error('codec failed to start') });
  await take.session.start();
  assert.equal(take.trackStops, 1); assert.equal(take.recordings.length, 0);
  assert.equal(take.events.length, 1); assert.match(take.events[0], /could not start/);
  take.session.dispose(); assert.equal(take.trackStops, 1);
});

test('an empty take releases the stream and asks for another recording', async () => {
  const take = setup(); await take.session.start();
  take.recorder.state = 'inactive'; take.recorder.onstop();
  assert.deepEqual(take.events, ['start', 'No audio was captured. Please record again.']);
  assert.equal(take.trackStops, 1); assert.equal(take.recordings.length, 0);
});

test('a recorder error discards queued final data and reports a single failure', async () => {
  const take = setup(); await take.session.start();
  const queuedStop = take.recorder.onstop, queuedData = take.recorder.ondataavailable;
  take.recorder.chunk('partial'); take.recorder.onerror();
  queuedData({ data: new Blob(['late']) }); queuedStop();
  assert.deepEqual(take.events, ['start', 'Recording was interrupted. Please try again.']);
  assert.equal(take.trackStops, 1); assert.equal(take.recordings.length, 0);
  assert.equal(take.recorder.state, 'inactive');
});

test('a stop failure still releases the microphone and cannot complete the take', async () => {
  const take = setup({ stopError: new Error('device lost') }); await take.session.start();
  take.session.stop(); take.session.dispose();
  assert.deepEqual(take.events, ['start', 'Recording could not stop normally. Please record again.']);
  assert.equal(take.trackStops, 1); assert.equal(take.recordings.length, 0);
});

test('navigation during capture stops tracks and suppresses queued callbacks', async () => {
  const take = setup(); await take.session.start();
  const queuedError = take.recorder.onerror, queuedStop = take.recorder.onstop;
  take.session.dispose(); queuedError(); queuedStop();
  assert.equal(take.trackStops, 1); assert.equal(take.recorder.state, 'inactive');
  assert.deepEqual(take.events, ['start']); assert.equal(take.recordings.length, 0);
});

test('permission resolving after navigation immediately releases the new stream', async () => {
  let allow;
  const take = setup({ permission: new Promise(resolve => { allow = resolve; }) });
  const pending = take.session.start(); take.session.dispose(); allow(); await pending;
  assert.equal(take.trackStops, 1); assert.deepEqual(take.events, []);
  assert.equal(take.recorder.state, 'inactive');
});

test('permission denial reports once while mounted and stays silent after navigation', async () => {
  for (const navigate of [false, true]) {
    let deny;
    const take = setup({ permission: new Promise((_, reject) => { deny = reject; }) });
    const pending = take.session.start();
    if (navigate) take.session.dispose();
    const error = new Error('denied'); error.name = 'NotAllowedError'; deny(error); await pending;
    assert.equal(take.trackStops, 0);
    assert.equal(take.events.length, navigate ? 0 : 1);
    if (!navigate) assert.match(take.events[0], /access was denied/);
  }
});

require('./register.cjs');
const { test } = require('node:test'), assert = require('node:assert/strict');
const { startLearnerSession, deleteLearnerSession } = require('../src/lib/learnerProfiles.ts');
const { learnerStorage, createLearnerStorage, learnerPrefix, learnerRecordingPrefix } = require('../src/lib/learnerStorage.ts');
const { clearSessionProfile, readSessionProfile, saveSessionProfile, createSessionProfile } = require('../src/lib/sessionProfile.ts');
const { restoreLearnerStores } = require('../src/lib/learnerStores.ts');
const { useProgress } = require('../src/store/useProgress.ts');
const { useAchievements } = require('../src/store/useAchievements.ts');
const { useNotes } = require('../src/store/useNotes.ts');
function memory() { const values = new Map(); return { get length() { return values.size; }, key: i => [...values.keys()][i] ?? null, getItem: k => values.get(k) ?? null, setItem: (k,v) => values.set(k,String(v)), removeItem: k => values.delete(k), clear: () => values.clear() }; }

test('named storage changes no XP rewards, levels, achievement conditions or authored curriculum data', () => {
  const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),contract=require('./fixtures/named-learner-contract.json');
  const hash=value=>crypto.createHash('sha256').update(value).digest('hex'),root=path.join(__dirname,'..');
  for(const [file,digest] of Object.entries(contract.stores)) {
    const source=fs.readFileSync(path.join(root,file),'utf8').replace('import { learnerStorage } from "@/lib/learnerStorage";\n','').replaceAll('learnerStorage','localStorage').replace('skipHydration: true, ','');
    assert.equal(hash(source),digest,file+' changes only the storage route and hydration timing');
  }
  for(const [file,digest] of Object.entries(contract.preserved)) assert.equal(hash(fs.readFileSync(path.join(root,file))),digest,file);
});

test('same name restores its stable profile, progress and badges; another name starts separately', () => {
  const device = memory(), session = memory(), storage = createLearnerStorage(device,session);
  device.setItem('englishcamp-progress',JSON.stringify({state:{xp:355,lessons:{intro:{completed:true}}},version:2}));
  device.setItem('englishcamp-achievements',JSON.stringify({state:{unlocked:{'xp-100':{unlockedAt:'before'}}},version:0}));
  const first = startLearnerSession(device,session,'Mira',.5);
  assert.equal(JSON.parse(storage.getItem('englishcamp-progress')).state.xp,355);
  storage.setItem('englishcamp-progress',JSON.stringify({state:{xp:420,lessons:{intro:{completed:true}}},version:2}));
  clearSessionProfile(session);
  assert.equal(JSON.parse(storage.getItem('englishcamp-progress')).state.xp,355,'legacy guest progress is untouched');
  const second = startLearnerSession(device,session,'Alex',0);
  assert.notEqual(first.number,second.number); assert.equal(storage.getItem('englishcamp-progress'),null); assert.equal(storage.getItem('englishcamp-achievements'),null);
  storage.setItem('englishcamp-progress','alex-progress');
  clearSessionProfile(session);
  assert.deepEqual(startLearnerSession(device,session,'  MIRA  ',0),first);
  assert.equal(JSON.parse(storage.getItem('englishcamp-progress')).state.xp,420);
  assert.equal(JSON.parse(storage.getItem('englishcamp-achievements')).state.unlocked['xp-100'].unlockedAt,'before');
  assert.equal(session.getItem(learnerPrefix(second.number)+'englishcamp-progress'),'alex-progress');
});

test('an existing name-only session migrates its device progress once without changing its avatar or number', () => {
  const device = memory(), session = memory(), original = createSessionProfile('ليلى',null,.75);
  device.setItem('englishcamp-progress','legacy-progress'); saveSessionProfile(session,original);
  assert.deepEqual(startLearnerSession(device,session,'ليلى',0),original);
  const storage = createLearnerStorage(device,session); assert.equal(storage.getItem('englishcamp-progress'),'legacy-progress');
  storage.setItem('englishcamp-progress','updated-progress');
  startLearnerSession(device,session,'ليلى',0); assert.equal(storage.getItem('englishcamp-progress'),'updated-progress','reload never overwrites named progress with a stale guest copy');
});

test('deleting one named session clears only that learner and does not reimport guest progress', () => {
  const device = memory(),session = memory(),storage = createLearnerStorage(device,session);
  device.setItem('englishcamp-progress','guest');
  const first = startLearnerSession(device,session,'Mira',0); storage.setItem('englishcamp-notes','mira-notes');
  clearSessionProfile(session); const other = startLearnerSession(device,session,'Alex',0); storage.setItem('englishcamp-progress','alex');
  startLearnerSession(device,session,'Mira',0); deleteLearnerSession(session,first);
  assert.equal(readSessionProfile(session),null); assert.equal(session.getItem(learnerPrefix(first.number)+'englishcamp-notes'),null);
  assert.equal(device.getItem('englishcamp-progress'),'guest'); assert.equal(session.getItem(learnerPrefix(other.number)+'englishcamp-progress'),'alex');
  const fresh = startLearnerSession(device,session,'Mira',0); assert.notEqual(fresh.number,first.number); assert.equal(storage.getItem('englishcamp-progress'),null);
});

test('rehydration resets missing fields and restores the correct XP, badges and notes across learners', () => {
  const session = memory(), device = memory();
  Object.defineProperty(global,'localStorage',{configurable:true,value:device}); Object.defineProperty(global,'sessionStorage',{configurable:true,value:session});
  restoreLearnerStores(); useProgress.getState().addXP(95);
  const first = startLearnerSession(device,session,'Mira',0); restoreLearnerStores();
  useProgress.getState().completeExercise('qa-first',10); useAchievements.getState().checkAndUnlock();
  useNotes.getState().setNote('lesson-intro','My example');
  assert.equal(useProgress.getState().xp,105); assert.ok(useAchievements.getState().isUnlocked('xp-100'));
  clearSessionProfile(session); startLearnerSession(device,session,'Alex',0); restoreLearnerStores();
  assert.equal(useProgress.getState().xp,0); assert.deepEqual(useProgress.getState().exercisesDone,{}); assert.deepEqual(useAchievements.getState().unlocked,{}); assert.equal(useNotes.getState().getNote('lesson-intro'),'');
  startLearnerSession(device,session,'Mira',0); restoreLearnerStores();
  assert.equal(useProgress.getState().xp,105); assert.ok(useProgress.getState().exercisesDone['qa-first']); assert.ok(useAchievements.getState().isUnlocked('xp-100')); assert.equal(useNotes.getState().getNote('lesson-intro'),'My example');
  assert.equal(readSessionProfile(session).number,first.number); assert.equal(JSON.parse(learnerStorage.getItem('englishcamp-progress')).state.xp,105);
});

test('recording namespaces separate tabs and learners without using their names in blob keys', () => {
  const a=memory(),b=memory(),device=memory();
  Object.defineProperty(global,'sessionStorage',{configurable:true,value:a}); startLearnerSession(device,a,'Mira',0); const first=learnerRecordingPrefix();
  clearSessionProfile(a); startLearnerSession(device,a,'Alex',0); const second=learnerRecordingPrefix();
  Object.defineProperty(global,'sessionStorage',{configurable:true,value:b}); startLearnerSession(device,b,'Mira',0); const otherTab=learnerRecordingPrefix();
  assert.notEqual(first,second); assert.notEqual(first,otherTab); assert.ok(!first.toLowerCase().includes('mira'));
  clearSessionProfile(b); assert.equal(learnerRecordingPrefix(),'');
});

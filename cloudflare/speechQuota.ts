import { accessHash, approvedLearner, invitationRequired } from './access';
import type { LearnerEnv } from './learners';
import { speechResponse, type SpeechEnv } from './speech';

export type SpeechQuotaEnv = LearnerEnv & SpeechEnv & { SPEECH_DAILY_CHARS_PER_LEARNER?: string };

/** Characters of synthesised speech one learner may request per UTC day (bounded 1,000–1,000,000). */
export function speechDailyChars(env?: SpeechQuotaEnv) {
  const raw = Number(env?.SPEECH_DAILY_CHARS_PER_LEARNER);
  return Number.isInteger(raw) && raw >= 1000 && raw <= 1_000_000 ? raw : 30_000;
}

const json = (body: object, status: number) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' } });

/**
 * Charges the learner's daily character budget before calling the speech provider and refunds it
 * when no audio was produced. Without invitation access there is no learner identity, so only the
 * provider-side guard in speechResponse applies (see the deployment rule in docs/deployment-rules.md).
 */
export async function speechWithQuota(request: Request, env: SpeechQuotaEnv, fetcher: typeof fetch = fetch): Promise<Response> {
  const db = env.LEARNERS_DB;
  if (!invitationRequired(env) || !db) return speechResponse(request, env, fetcher);
  const learnerId = await approvedLearner(request, db);
  if (!learnerId) return json({ error: 'Restore your invited learning profile to use natural audio.' }, 401);
  let chars = 0;
  try {
    const raw = await request.clone().text();
    if (raw.length <= 25_000) { const input = JSON.parse(raw); if (typeof input?.text === 'string') chars = input.text.length; }
  } catch { /* speechResponse rejects malformed bodies itself */ }
  if (!chars) return speechResponse(request, env, fetcher);
  const now = Math.floor(Date.now() / 1000), expiry = (Math.floor(now / 86400) + 1) * 86400, limit = speechDailyChars(env);
  const bucket = await accessHash(`speech:learner:${learnerId}:${expiry}`);
  await db.prepare('DELETE FROM cloud_ai_limits WHERE expires_at<?').bind(now).run();
  const charged = await db.prepare('INSERT INTO cloud_ai_limits(bucket,used,expires_at) SELECT ?,?,? WHERE ?<=? ON CONFLICT(bucket) DO UPDATE SET used=used+? WHERE used+?<=? RETURNING used')
    .bind(bucket, chars, expiry, chars, limit, chars, chars, limit).first();
  if (!charged) return json({ error: 'You have used today’s natural-audio allowance. Bundled lesson recordings still work, and the allowance resets tomorrow.', code: 'speech_limit' }, 429);
  const response = await speechResponse(request, env, fetcher);
  if (!response.ok) await db.prepare('UPDATE cloud_ai_limits SET used=MAX(0,used-?) WHERE bucket=?').bind(chars, bucket).run().catch(() => {});
  return response;
}

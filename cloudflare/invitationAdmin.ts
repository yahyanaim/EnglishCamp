import type { LearnerEnv, LearnerDatabase } from './learners';
import {adminReport} from './adminReports';
import { accessHash, accessJson, accessSecret, readCookie } from './access';
import {InvitationMailError,invitationRequests,sendInvitation,declineInvitation,reopenInvitation} from './invitationEmail';
import {emailLearner,deleteLearner} from './adminLearnerActions';
import {securityReport} from './adminSecurity';
import {contentAdmin} from './learningContent';

const now = () => Math.floor(Date.now() / 1000);
const cookieName = (r: Request) => new URL(r.url).protocol === 'https:' ? '__Host-camp-invite-admin' : 'camp_local_admin';
const cookie = (r: Request, token: string, age = 28800) => `${cookieName(r)}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${age}${new URL(r.url).protocol === 'https:' ? '; Secure' : ''}`;
const configured = (env: LearnerEnv) => /^[a-f0-9]{64}$/.test(env.INVITATION_ADMIN_HASH || '');
class AdminError extends Error { constructor(message: string, readonly status = 400) { super(message); } }
async function input(request: Request,maximum=4096) {
  if (!request.headers.get('content-type')?.startsWith('application/json')) throw new AdminError('Use a valid form.');
  const reader = request.body?.getReader(); if (!reader) throw new AdminError('Complete the form.');
  let bytes = 0; const chunks: Uint8Array[] = [];
  while (true) { const next = await reader.read(); if (next.done) break; bytes += next.value.length;
    if (bytes > maximum) { await reader.cancel(); throw new AdminError('This request is too large.', 413); } chunks.push(next.value); }
  const data = new Uint8Array(bytes); let offset = 0; for (const chunk of chunks) { data.set(chunk, offset); offset += chunk.length; }
  try { const value = JSON.parse(new TextDecoder().decode(data)); if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(); return value; }
  catch { throw new AdminError('Use a valid form.'); }
}
export async function adminSession(request: Request, env: LearnerEnv) {
  const token = readCookie(request, cookieName(request));
  if (!configured(env) || !token || !/^[A-Za-z0-9_-]{32}$/.test(token)) return null;
  const hash = await accessHash(token);
  return await env.LEARNERS_DB!.prepare('SELECT token_hash FROM cloud_admin_sessions WHERE token_hash=? AND credential_version=? AND expires_at>?')
    .bind(hash, await accessHash(env.INVITATION_ADMIN_HASH!), now()).first() ? hash : null;
}
async function loginRate(request: Request, db: LearnerDatabase) {
  const expiry = (Math.floor(now() / 600) + 1) * 600;
  await db.prepare('DELETE FROM cloud_auth_limits WHERE expires_at<?').bind(now()).run();
  for (const [subject, limit] of [[request.headers.get('CF-Connecting-IP') || 'local', 6], ['global', 60]] as const) {
    const row = await db.prepare('INSERT INTO cloud_auth_limits(bucket,attempts,expires_at) VALUES(?,1,?) ON CONFLICT(bucket) DO UPDATE SET attempts=attempts+1 WHERE attempts<? RETURNING attempts')
      .bind(await accessHash(`invitation-admin:${subject}:${expiry}`), expiry, limit).first();
    if (!row) throw new AdminError('Too many attempts. Please wait ten minutes.', 429);
  }
}
async function items(db: LearnerDatabase, sql: string) {
  const row = await db.prepare(sql).first<{ payload: string }>(); return JSON.parse(row?.payload || '[]');
}
export async function invitationAdmin(request: Request, env: LearnerEnv): Promise<Response> {
  const url = new URL(request.url), action = url.pathname.slice('/api/invitations/admin/'.length), db = env.LEARNERS_DB;
  if (!db || !configured(env)) return accessJson({ error: 'Invitation management is not configured.', configured: false }, 503);
  if (!['GET', 'POST'].includes(request.method)) return accessJson({ error: 'Method not allowed.' }, 405);
  if (request.method !== 'GET' && request.headers.get('origin') !== url.origin) return accessJson({ error: 'Open invitation management on EnglishCamp.' }, 403);
  try {
    if (action === 'login' && request.method === 'POST') {
      await loginRate(request, db); const body = await input(request);
      const password = typeof body.password === 'string' && body.password.length <= 256 ? body.password : '';
      const actual = await accessHash(password), expected = env.INVITATION_ADMIN_HASH!;
      let different = 0; for (let i = 0; i < 64; i++) different |= actual.charCodeAt(i) ^ expected.charCodeAt(i);
      if (!password || different) return accessJson({ error: 'The management key is incorrect.' }, 401);
      const token = accessSecret();
      await db.batch([db.prepare('DELETE FROM cloud_admin_sessions WHERE expires_at<=?').bind(now()),
        db.prepare('INSERT INTO cloud_admin_sessions(token_hash,credential_version,expires_at) VALUES(?,?,?)').bind(await accessHash(token), await accessHash(expected), now() + 28800)]);
      return accessJson({ authenticated: true }, 200, cookie(request, token));
    }
    const session = await adminSession(request, env);
    if (action === 'session' && request.method === 'GET') return accessJson({ configured: true, authenticated: !!session });
    if (!session) return accessJson({ error: 'Sign in to manage invitations.' }, 401);
    if(action==='content'||action.startsWith('content-'))return contentAdmin(action,request,env);
    if(action==='security'&&request.method==='GET')return accessJson(await securityReport(url,env,session));
    if(['report','directory','detail','catalogue','infrastructure','settings','invitation-directory'].includes(action)&&request.method==='GET')return accessJson(await adminReport(action,url,env));
    if(request.method==='POST'&&['create','revoke','admissions','learner','profile','revoke-sessions','email-invitation','decline-request','reopen-request','email-learner','delete-learner'].includes(action)){const expiry=(Math.floor(now()/600)+1)*600;const used=await db.prepare('INSERT INTO cloud_auth_limits(bucket,attempts,expires_at) VALUES(?,1,?) ON CONFLICT(bucket) DO UPDATE SET attempts=attempts+1 WHERE attempts<120 RETURNING attempts').bind(await accessHash(`admin-write:${session}:${expiry}`),expiry).first();if(!used)throw new AdminError('Too many changes. Wait a few minutes.',429);}
    if(action==='email-learner'&&request.method==='POST')return accessJson(await emailLearner(request,env,await input(request,20000)));
    if(action==='delete-learner'&&request.method==='POST')return accessJson(await deleteLearner(env,await input(request)));
    if(action==='requests'&&request.method==='GET')return accessJson(await invitationRequests(url,env));
    if(action==='email-invitation'&&request.method==='POST')return accessJson(await sendInvitation(request,env,await input(request)));
    if(action==='reopen-request'&&request.method==='POST')return accessJson(await reopenInvitation(env,(await input(request)).id));
    if(action==='decline-request'&&request.method==='POST')return accessJson(await declineInvitation(env,(await input(request)).id));
    if(action==='profile'&&request.method==='POST'){
      const value=await input(request),clean=(v:unknown)=>typeof v==='string'?v.normalize('NFKC').replace(/[\u0000-\u001f\u007f]/g,'').trim():'';
      const displayName=clean(value.displayName),roleTitle=clean(value.roleTitle);
      if(!displayName||displayName.length>60||!roleTitle||roleTitle.length>60)throw new AdminError('Enter a display name and role of 1–60 characters.');
      await db.prepare('UPDATE cloud_admin_profile SET display_name=?,role_title=? WHERE id=1').bind(displayName,roleTitle).run();
      return accessJson({ok:true});
    }
    if(action==='revoke-sessions'&&request.method==='POST'){
      const result=await db.prepare('DELETE FROM cloud_admin_sessions WHERE token_hash<>?').bind(session).run();
      return accessJson({ok:true,revoked:result.meta.changes});
    }
    if (action === 'logout' && request.method === 'POST') {
      await db.prepare('DELETE FROM cloud_admin_sessions WHERE token_hash=?').bind(session).run();
      return accessJson({ ok: true }, 200, cookie(request, '', 0));
    }
    if (action === 'list' && request.method === 'GET') {
      const invitations = await items(db, `SELECT json_group_array(json_object('id',id,'displayCode',display_code,'label',label,'createdAt',created_at,'expiresAt',expires_at,'revokedAt',revoked_at,'redeemedAt',redeemed_at)) payload FROM (SELECT * FROM cloud_invitations ORDER BY created_at DESC,rowid DESC LIMIT 200)`);
      const learners = await items(db, `SELECT json_group_array(json_object('id',id,'name',name,'number',number,'status',status,'source',source)) payload FROM (SELECT l.id,l.name,l.number,a.status,a.source FROM cloud_learners l JOIN cloud_access a ON a.learner_id=l.id ORDER BY l.number DESC LIMIT 200)`);
      const settings = await db.prepare('SELECT accepting FROM cloud_invitation_settings WHERE id=1').first<{ accepting: number }>();
      return accessJson({ invitations, learners, accepting: settings?.accepting === 1, limits: { pronunciationDaily: 1, pronunciationMonthlyTotal: 500, coachDaily: 20 } });
    }
    if (action === 'create' && request.method === 'POST') {
      const body = await input(request), count = Number(body.count), days = Number(body.days);
      const label = typeof body.label === 'string' ? body.label.trim().replace(/[\u0000-\u001f\u007f]/g, '') : '';
      if (!Number.isInteger(count) || count < 1 || count > 20 || ![1,7,14,30].includes(days) || label.length > 64) throw new AdminError('Choose 1–20 codes, a valid expiry and a label up to 64 characters.');
      const codes = Array.from({ length: count }, () => ({ id: crypto.randomUUID(), code: 'ECI-' + accessSecret() }));
      const createdAt=now(),expiresAt=createdAt+days*86400;
      const records=await Promise.all(codes.map(async item=>({id:item.id,hash:await accessHash(item.code),display:item.code.slice(0,8)+'…'+item.code.slice(-4)})));
      // The capacity check and complete batch insert share one SQLite write statement.
      // Concurrent requests can never pass a separate read and exceed the ready-code limit.
      const inserted=await db.prepare(`INSERT INTO cloud_invitations(id,code_hash,display_code,label,created_at,expires_at)
        SELECT json_extract(value,'$.id'),json_extract(value,'$.hash'),json_extract(value,'$.display'),?,?,?
        FROM json_each(?) WHERE (SELECT COUNT(*) FROM cloud_invitations WHERE redeemed_at IS NULL AND revoked_at IS NULL AND expires_at>?) + ? <= 100`)
        .bind(label,createdAt,expiresAt,JSON.stringify(records),createdAt,count).run();
      if(inserted.meta.changes!==count)throw new AdminError('This batch exceeds the limit of 100 ready codes. Reduce its size or revoke unused invitations.',409);
      return accessJson({ codes, label, createdAt, expiresAt }, 201);
    }
    if (action === 'revoke' && request.method === 'POST') {
      const body = await input(request); if (typeof body.id !== 'string' || body.id.length > 64) throw new AdminError('Choose an invitation.');
      const changed=await db.prepare('UPDATE cloud_invitations SET revoked_at=? WHERE id=? AND redeemed_at IS NULL AND revoked_at IS NULL AND expires_at>? RETURNING id').bind(now(), body.id,now()).first();
      if(!changed){const existing=await db.prepare('SELECT redeemed_at,revoked_at FROM cloud_invitations WHERE id=?').bind(body.id).first<{redeemed_at:number|null;revoked_at:number|null}>();
        if(!existing)throw new AdminError('This invitation no longer exists.',404);
        if(!existing.revoked_at||existing.redeemed_at)throw new AdminError('This invitation has already been used or expired. Refresh the list.',409);
      }
      return accessJson({ ok: true });
    }
    if (action === 'admissions' && request.method === 'POST') {
      const body = await input(request); if (typeof body.accepting !== 'boolean') throw new AdminError('Choose an admission setting.');
      await db.prepare('UPDATE cloud_invitation_settings SET accepting=? WHERE id=1').bind(body.accepting ? 1 : 0).run();
      return accessJson({ ok: true });
    }
    if (action === 'learner' && request.method === 'POST') {
      const body = await input(request);
      if (typeof body.id !== 'string' || body.id.length > 64 || !['approved','suspended'].includes(body.status)) throw new AdminError('Choose a learner and access status.');
      await db.prepare('UPDATE cloud_access SET status=? WHERE learner_id=?').bind(body.status, body.id).run();
      return accessJson({ ok: true });
    }
    return accessJson({ error: 'Not found.' }, 404);
  } catch (error) {
    return error instanceof TypeError ? accessJson({error:'Choose valid filters and pagination.'},400) : (error instanceof AdminError || error instanceof InvitationMailError) ? accessJson({ error: error.message }, error.status)
      : accessJson({ error: 'Invitation management is temporarily unavailable. No learner records have been deleted.' }, 503);
  }
}

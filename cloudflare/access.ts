import {membershipAllowed,billingEnabled} from './membership';
import {adminSession} from './invitationAdmin';
import type { LearnerDatabase, LearnerEnv } from './learners';

export const invitationRequired = (env: LearnerEnv) => env.INVITATION_REQUIRED === 'true';
export const accessJson = (body: object, status = 200, cookie?: string) => Response.json(body, {
  status, headers: { 'Cache-Control': 'no-store, private', 'X-Content-Type-Options': 'nosniff',
    ...(cookie ? { 'Set-Cookie': cookie } : {}) },
});
export const accessHash = async (value: string) => Array.from(new Uint8Array(await crypto.subtle.digest(
  'SHA-256', new TextEncoder().encode(value),
))).map(v => v.toString(16).padStart(2, '0')).join('');
export function accessSecret() {
  return btoa(String.fromCharCode(...Array.from(crypto.getRandomValues(new Uint8Array(24)))))
    .replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
}
export function readCookie(request: Request, name: string) {
  return request.headers.get('cookie')?.split(';').map(v => v.trim()).find(v => v.startsWith(name + '='))?.slice(name.length + 1);
}
export async function approvedLearner(request: Request, db: LearnerDatabase): Promise<string | null> {
  const name = new URL(request.url).protocol === 'https:' ? '__Host-camp-session' : 'camp_local_session';
  const token = readCookie(request, name);
  if (!token || !/^[A-Za-z0-9_-]{32}$/.test(token)) return null;
  const row = await db.prepare(`SELECT s.learner_id FROM cloud_sessions s JOIN cloud_access a ON a.learner_id=s.learner_id
    WHERE s.token_hash=? AND s.expires_at>? AND a.status='approved'`).bind(await accessHash(token), Math.floor(Date.now() / 1000)).first<{ learner_id: string }>();
  return row?.learner_id ?? null;
}
export async function learnerApproved(id: string, db: LearnerDatabase) {
  return !!await db.prepare("SELECT learner_id FROM cloud_access WHERE learner_id=? AND status='approved'").bind(id).first();
}
export function publicAccessPath(path: string) {
  try { const decoded=decodeURIComponent(path);if(decoded.includes('\\')||decoded.includes('%')||/(?:^|\/)\.{1,2}(?:\/|$)/.test(decoded))return false; }
  catch { return false; }
  const page = path.replace(/\.(?:html|txt)$/, '').replace(/\/$/, '') || '/';
  return ['/', '/index.html', '/index.txt'].includes(path) || ['/invite', '/membership', '/admin/login', '/connect-device'].includes(page)
    || (path.startsWith('/_next/static/') && /\.(?:js|css|woff2?|png|webp|jpg|svg)$/.test(path))
    || /^\/media\/brand\/[A-Za-z0-9_.-]+\.(?:png|webp|svg|ico)$/.test(path)
    || ['/favicon.ico', '/robots.txt'].includes(path)
    || ['/api/access/session', '/api/invitations/request', '/api/learners/create', '/api/learners/restore', '/api/learners/session',
      '/api/learners/device-link/preview', '/api/learners/device-link/claim'].includes(path)
    || ['/api/learners/logout', '/api/learners/profile'].includes(path)
    || path.startsWith('/api/invitations/admin/')||path.startsWith('/api/billing/');
}
/** Authorize HTML, exported RSC payloads, media and APIs before asset serving or provider calls. */
export async function accessGuard(request: Request, env: LearnerEnv): Promise<Response | null> {
  let normalized:string;try{const decoded=decodeURIComponent(new URL(request.url).pathname);if(decoded.includes('%')||decoded.includes('\\'))return accessJson({error:'Invalid path.'},400);normalized=new URL(decoded,request.url).pathname;}catch{return accessJson({error:'Invalid path.'},400);}
  const adminPath=normalized.replace(/\.(?:html|txt)$/,'').replace(/\/$/,'');
  if(adminPath.startsWith('/admin/')&&adminPath!=='/admin/login'){
    try{if(env.LEARNERS_DB&&await adminSession(request,env))return null;}catch{return accessJson({error:'Administration is temporarily unavailable.'},503);}
    return new Response(null,{status:303,headers:{Location:new URL('/admin/login',request.url).toString(),'Cache-Control':'no-store, private'}});
  }
  if (!invitationRequired(env) || publicAccessPath(new URL(request.url).pathname)) return null;
  try {
    if (!env.LEARNERS_DB) throw new Error('Unavailable');
    const learner=await approvedLearner(request, env.LEARNERS_DB);
    if(learner){
      if(new URL(request.url).pathname.startsWith('/api/learners/')||await membershipAllowed(env.LEARNERS_DB,learner,env))return null;
      if(new URL(request.url).pathname.startsWith('/api/'))return accessJson({error:'Your free period has ended. Open membership to continue; your progress is saved.',code:'membership_required'},402);
      return new Response(null,{status:303,headers:{Location:new URL('/membership',request.url).toString(),'Cache-Control':'no-store, private'}});
    }
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) return accessJson({ error: 'Sign in with an invitation or restore your existing profile.', code: 'invitation_required' }, 401);
    const destination = new URL('/invite', url);
    destination.searchParams.set('next', url.pathname + url.search);
    return new Response(null, { status: 303, headers: { Location: destination.toString(), 'Cache-Control': 'no-store, private' } });
  } catch {
    return accessJson({ error: 'Access could not be checked. Your saved progress is kept. Please try again shortly.' }, 503);
  }
}
export async function accessStatus(request: Request, env: LearnerEnv) {
  if (request.method !== 'GET') return accessJson({ error: 'Method not allowed.' }, 405);
  if (!invitationRequired(env)) return accessJson({ required: false, granted: true });
  try {
    if (!env.LEARNERS_DB) throw new Error('Unavailable');
    const id=await approvedLearner(request,env.LEARNERS_DB),allowed=id?await membershipAllowed(env.LEARNERS_DB,id,env):false;
    return accessJson({required:true,granted:allowed,destination:id&&!allowed?'/membership':'/invite',trialDays:billingEnabled(env)?7:null});
  } catch { return accessJson({ error: 'Access is temporarily unavailable. Please try again.' }, 503); }
}

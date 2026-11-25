import {billingResponse} from './billing';
import englishRoutes from '../src/lib/english-routes.mjs';
import { type SpeechEnv } from './speech';
import { speechWithQuota } from './speechQuota';
import { GET as speakingStatus, POST as speakingAssessment } from '../src/app/api/placement/speaking/route';
import { GET as writingStatus, POST as writingAssessment } from '../src/app/api/placement/writing/route';
import { learnerResponse, type LearnerEnv } from './learners';
import {coachResponse,type CoachEnv} from './coach';
import {pronunciationResponse,type PronunciationEnv} from './pronunciation';
import {accessGuard,accessStatus,invitationRequired,publicAccessPath} from './access';
import {invitationAdmin} from './invitationAdmin';
import {requestInvitation} from './invitationEmail';
import {recordSecurity} from './adminSecurity';
import {voaListeningResponse} from './voaListening';
import {contentCatalogueResponse} from './learningContent';
import {withSecurityHeaders} from './securityHeaders';
import { gatedCacheControl } from './cachePolicy';

type Env = SpeechEnv & LearnerEnv & CoachEnv & PronunciationEnv & { ASSETS: { fetch(request: Request): Promise<Response> } };
const json = (body: object, status: number) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
async function handleRequest(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url), parts = url.pathname.split('/').filter(Boolean);
    const locale = parts[0] === 'en' || parts[0] === 'ar';
    if (locale) parts.shift();
    const legacy = parts[0] && Object.prototype.hasOwnProperty.call(englishRoutes, parts[0]) ? parts[0] as keyof typeof englishRoutes : undefined;
    if (legacy || locale) { if (legacy) parts[0] = englishRoutes[legacy]; url.pathname = '/' + parts.join('/'); return Response.redirect(url.toString(), 308); }
    const denied=await accessGuard(request,env);if(denied)return denied;
    if (url.pathname.startsWith('/api/')) {
      if(url.pathname.startsWith('/api/billing/'))return billingResponse(request,env);
      if(url.pathname==='/api/invitations/request')return requestInvitation(request,env);
      if(url.pathname==='/api/access/session')return accessStatus(request,env);
      if(url.pathname.startsWith('/api/invitations/admin/'))return invitationAdmin(request,env);
      if(url.pathname==='/api/coach')return coachResponse(request,env);
      if(url.pathname==='/api/pronunciation')return pronunciationResponse(request,env);
      // /api/vocabulary/listening stays for cached clients from before Listening became its own section.
      if(url.pathname==='/api/listening/audio'||url.pathname==='/api/vocabulary/listening')return voaListeningResponse(request);
      if(url.pathname==='/api/content/catalogue')return contentCatalogueResponse(request,env);
      if (url.pathname.startsWith('/api/learners/')) return learnerResponse(request,env);
      if (url.pathname === '/api/speech') return request.method === 'POST' ? speechWithQuota(request, env) : json({ error: 'Method not allowed.' }, 405);
      const endpoint = url.pathname === '/api/placement/speaking' ? { GET: speakingStatus, POST: speakingAssessment } : url.pathname === '/api/placement/writing' ? { GET: writingStatus, POST: writingAssessment } : undefined;
      if (!endpoint) return json({ error: 'Not found.' }, 404);
      if (request.method === 'GET') return endpoint.GET();
      if (request.method === 'POST') return endpoint.POST(request);
      return json({ error: 'Method not allowed.' }, 405);
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') return json({ error: 'Method not allowed.' }, 405);
    const asset = await env.ASSETS.fetch(request);
    if (asset.status !== 404) {
      if(decodeURIComponent(url.pathname).startsWith('/admin/')||(invitationRequired(env)&&!publicAccessPath(url.pathname))){
        const response=new Response(asset.body,asset);response.headers.set('Cache-Control',gatedCacheControl(url.pathname));response.headers.set('Vary','Cookie');return response;
      }
      return asset;
    }
    // Let missing legacy URLs reach this Worker before serving the exported 404.
    // assets.not_found_handling='404-page' would swallow those redirects first.
    await asset.body?.cancel();
    url.pathname = '/404.html'; url.search = '';
    const missing = await env.ASSETS.fetch(new Request(url, { method: request.method }));
    return new Response(missing.body, { status: 404, headers: missing.headers });
}
export default {
  async fetch(request:Request,env:Env,context?:{waitUntil(promise:Promise<unknown>):void}){
    const response=withSecurityHeaders(request,await handleRequest(request,env)),metrics=recordSecurity(request,response,env);
    if(context)context.waitUntil(metrics);else await metrics;
    return response;
  }
};

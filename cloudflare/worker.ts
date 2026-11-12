import englishRoutes from '../src/lib/english-routes.mjs';
import { speechResponse, type SpeechEnv } from './speech';
import { GET as speakingStatus, POST as speakingAssessment } from '../src/app/api/placement/speaking/route';
import { GET as writingStatus, POST as writingAssessment } from '../src/app/api/placement/writing/route';
import { learnerResponse, type LearnerEnv } from './learners';
import {coachResponse,type CoachEnv} from './coach';
import {pronunciationResponse,type PronunciationEnv} from './pronunciation';

type Env = SpeechEnv & LearnerEnv & CoachEnv & PronunciationEnv & { ASSETS: { fetch(request: Request): Promise<Response> } };
const json = (body: object, status: number) => Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url), parts = url.pathname.split('/').filter(Boolean);
    const locale = parts[0] === 'en' || parts[0] === 'ar';
    if (locale) parts.shift();
    const legacy = parts[0] && Object.prototype.hasOwnProperty.call(englishRoutes, parts[0]) ? parts[0] as keyof typeof englishRoutes : undefined;
    if (legacy || locale) { if (legacy) parts[0] = englishRoutes[legacy]; url.pathname = '/' + parts.join('/'); return Response.redirect(url.toString(), 308); }
    if (url.pathname === '/reading' || url.pathname === '/reading/') { url.pathname = '/vocabulary'; return Response.redirect(url.toString(), 307); }
    if (url.pathname.startsWith('/api/')) {
      if(url.pathname==='/api/coach')return coachResponse(request,env);
      if(url.pathname==='/api/pronunciation')return pronunciationResponse(request,env);
      if (url.pathname.startsWith('/api/learners/')) return learnerResponse(request,env);
      if (url.pathname === '/api/speech') return request.method === 'POST' ? speechResponse(request, env) : json({ error: 'Method not allowed.' }, 405);
      const endpoint = url.pathname === '/api/placement/speaking' ? { GET: speakingStatus, POST: speakingAssessment } : url.pathname === '/api/placement/writing' ? { GET: writingStatus, POST: writingAssessment } : undefined;
      if (!endpoint) return json({ error: 'Not found.' }, 404);
      if (request.method === 'GET') return endpoint.GET();
      if (request.method === 'POST') return endpoint.POST(request);
      return json({ error: 'Method not allowed.' }, 405);
    }
    if (request.method !== 'GET' && request.method !== 'HEAD') return json({ error: 'Method not allowed.' }, 405);
    const asset = await env.ASSETS.fetch(request);
    if (asset.status !== 404) return asset;
    // Let missing legacy URLs reach this Worker before serving the exported 404.
    // assets.not_found_handling='404-page' would swallow those redirects first.
    await asset.body?.cancel();
    url.pathname = '/404.html'; url.search = '';
    const missing = await env.ASSETS.fetch(new Request(url, { method: request.method }));
    return new Response(missing.body, { status: 404, headers: missing.headers });
  },
};

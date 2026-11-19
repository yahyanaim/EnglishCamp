import type { LearnerDatabase, LearnerEnv } from './learners';
import { accessHash, accessJson } from './access';
import { publisherDocument, podcastAudio } from './voaListening';
import { READING_LESSONS, type ReadingLesson } from '../src/data/reading-lessons';
import { VOA_LISTENING, VOA_ORIGIN, VOA_PODCAST_URL } from '../src/data/voa-listening';
import { BUNDLED_LISTENING, safeVoaAudio, voaArticleId, type ListeningLesson } from '../src/lib/listeningLessons';
import { CEFR_LEVELS } from '../src/data/placement/cefr';
import { contentId, validateListeningPayload, validateReadingPayload, type ContentKind, type ContentState } from '../src/lib/learningContent';

type Row = { id: string; kind: ContentKind; status: 'draft' | 'published'; source_key: string | null; payload_json: string; updated_at: number };
type StateRow = { content_id: string; kind: ContentKind; status: 'published' | 'hidden'; level: string | null };
class ContentError extends Error { constructor(message: string, readonly status = 400, readonly errors: string[] = []) { super(message); } }

const now = () => Math.floor(Date.now() / 1000);
const bundled = { reading: READING_LESSONS, listening: BUNDLED_LISTENING } as const;
const validate = (kind: ContentKind, payload: unknown, id: string, publishing: boolean) => kind === 'reading' ? validateReadingPayload(payload, id, publishing) : validateListeningPayload(payload, id, publishing);
async function all<T>(db: LearnerDatabase, sql: string, ...values: unknown[]): Promise<T[]> {
  const row = await db.prepare(`SELECT json_group_array(json(r)) payload FROM (${sql})`).bind(...values).first<{ payload: string }>();
  return JSON.parse(row?.payload || '[]');
}
async function states(db: LearnerDatabase) {
  return all<StateRow>(db, `SELECT json_object('content_id',content_id,'kind',kind,'status',status,'level',level) r FROM learning_content_state`);
}

/** Public, learner-facing catalogue: administrator states plus published, re-validated lessons. */
export async function contentCatalogueResponse(request: Request, env: LearnerEnv) {
  if (request.method !== 'GET') return accessJson({ error: 'Method not allowed.' }, 405);
  const db = env.LEARNERS_DB;
  if (!db) return accessJson({ states: {}, reading: [], listening: [] });
  try {
    const stateMap: Record<string, ContentState> = {};
    for (const s of await states(db)) stateMap[s.content_id] = { status: s.status, ...(CEFR_LEVELS.includes(s.level as never) ? { level: s.level as ContentState['level'] } : {}) };
    const rows = await all<Row>(db, `SELECT json_object('id',id,'kind',kind,'status',status,'payload_json',payload_json) r FROM learning_content_items WHERE status='published' ORDER BY created_at LIMIT 200`);
    const reading: ReadingLesson[] = [], listening: ListeningLesson[] = [];
    for (const row of rows) {
      if (row.kind === 'reading') { const checked = validateReadingPayload(JSON.parse(row.payload_json), row.id, true); if (checked.value) reading.push({ ...checked.value, status: 'published' }); }
      else { const checked = validateListeningPayload(JSON.parse(row.payload_json), row.id, true); if (checked.value) listening.push({ ...checked.value, status: 'published' }); }
    }
    return Response.json({ states: stateMap, reading, listening }, { headers: { 'Cache-Control': 'private, max-age=60', 'X-Content-Type-Options': 'nosniff' } });
  } catch {
    // Before the migration runs, learners still receive the reviewed bundled lessons.
    return accessJson({ states: {}, reading: [], listening: [] });
  }
}

async function body(request: Request, maximum = 65536) {
  if (!request.headers.get('content-type')?.startsWith('application/json')) throw new ContentError('Use a valid form.');
  const text = await request.text();
  if (text.length > maximum) throw new ContentError('This lesson is too large.', 413);
  try { const value = JSON.parse(text); if (value && typeof value === 'object' && !Array.isArray(value)) return value as Record<string, unknown>; } catch {}
  throw new ContentError('Use a valid form.');
}
async function limited(db: LearnerDatabase, action: string, limit: number) {
  const expiry = (Math.floor(now() / 600) + 1) * 600;
  const row = await db.prepare('INSERT INTO cloud_auth_limits(bucket,attempts,expires_at) VALUES(?,1,?) ON CONFLICT(bucket) DO UPDATE SET attempts=attempts+1 WHERE attempts<? RETURNING attempts')
    .bind(await accessHash(`content-admin:${action}:${expiry}`), expiry, limit).first();
  if (!row) throw new ContentError('Too many content changes. Please wait ten minutes.', 429);
}
const decode = (value: string) => value.replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16))).replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&');
const meta = (document: string, property: string) => {
  const tag = document.match(new RegExp(`<meta\\b[^>]*\\b(?:property|name)=["']${property}["'][^>]*>`, 'i'))?.[0];
  return tag ? decode(tag.match(/\bcontent=["']([^"']*)["']/i)?.[1] ?? '').replace(/\s+/g, ' ').trim().slice(0, 300) : '';
};

/**
 * Imports metadata for one VOA Learning English article into a draft. Only the canonical article
 * address built from its numeric ID is requested; one same-site redirect to the same article is allowed.
 */
export async function importVoaDraft(sourceUrl: unknown, fetcher: typeof fetch = fetch, signal?: AbortSignal) {
  const article = voaArticleId(sourceUrl);
  if (!article) throw new ContentError('Paste a VOA Learning English article address, for example https://learningenglish.voanews.com/a/7941440.html');
  let target = `${VOA_ORIGIN}/a/${article}.html`, document = '';
  for (let hop = 0; hop < 2; hop++) {
    const response = await fetcher(target, { redirect: 'manual', signal: AbortSignal.any([AbortSignal.timeout(6000), ...(signal ? [signal] : [])]), headers: { Accept: 'text/html' } });
    if (response.status >= 300 && response.status < 400) {
      await response.body?.cancel();
      const next = response.headers.get('location');
      const resolved = next ? new URL(next, target).href : '';
      if (hop === 0 && voaArticleId(resolved) === article) { target = resolved; continue; }
      throw new ContentError('VOA redirected this article to an unexpected address. Nothing was imported.', 502);
    }
    document = await publisherDocument(response);
    break;
  }
  if (!document) throw new ContentError('The VOA article could not be read. Check the address or try again later.', 502);
  const pageAudio = Array.from(document.matchAll(/https:\/\/voa-audio\.voanews\.eu\/vle\/[0-9/]+\/[\w-]+\.mp3/g)).map(m => safeVoaAudio(m[0])).find(Boolean);
  let audioUrl = pageAudio ?? null;
  if (!audioUrl) {
    try {
      const feed = await fetcher(VOA_PODCAST_URL, { redirect: 'manual', signal: AbortSignal.timeout(4500) });
      audioUrl = safeVoaAudio(podcastAudio(await publisherDocument(feed), `${VOA_ORIGIN}/a/${article}.html`));
    } catch { audioUrl = null; }
  }
  return {
    article,
    payload: { title: meta(document, 'og:title'), description: meta(document, 'og:description'), sourceUrl: `${VOA_ORIGIN}/a/${article}.html`, audioUrl: audioUrl ?? '', seconds: null, level: null, topic: '', transcript: '', words: [], questions: [] },
    audioFound: !!audioUrl,
  };
}

function newId(kind: ContentKind, title: unknown) {
  const slug = (typeof title === 'string' ? title : '').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40) || kind;
  const suffix = Array.from(crypto.getRandomValues(new Uint8Array(3))).map(b => b.toString(16).padStart(2, '0')).join('');
  return `${kind === 'reading' ? 'read' : 'listen'}-${slug}-${suffix}`;
}

/** Administrator content API. The caller has already verified the administrator session. */
export async function contentAdmin(action: string, request: Request, env: LearnerEnv, fetcher: typeof fetch = fetch): Promise<Response> {
  const db = env.LEARNERS_DB!;
  try {
    if (action === 'content' && request.method === 'GET') {
      const [stateRows, rows, engagement] = await Promise.all([
        states(db),
        all<Row>(db, `SELECT json_object('id',id,'kind',kind,'status',status,'source_key',source_key,'payload_json',payload_json,'updated_at',updated_at) r FROM learning_content_items ORDER BY updated_at DESC LIMIT 200`),
        all<{ source: string; learners: number }>(db, `SELECT json_object('source',source,'learners',COUNT(DISTINCT learner_id)) r FROM cloud_events WHERE kind='exercise' AND (source LIKE 'reading:%' OR source LIKE 'listening:%') GROUP BY source`),
      ]);
      const stateMap = new Map(stateRows.map(s => [s.content_id, s]));
      const completions = Object.fromEntries(engagement.map(e => [e.source, e.learners]));
      const library = (['reading', 'listening'] as const).flatMap(kind => bundled[kind].map(item => {
        const state = stateMap.get(item.id);
        return { id: item.id, kind, origin: 'bundled', title: item.title, defaultLevel: item.level, level: state?.level ?? item.level, defaultStatus: item.status, status: state ? state.status : item.status === 'published' ? 'published' : 'hidden', questions: item.questions.length, completions: completions[`${kind}:${item.id}`] ?? 0 };
      }));
      const items = rows.map(row => {
        const payload = JSON.parse(row.payload_json), checked = validate(row.kind, payload, row.id, true);
        return { id: row.id, kind: row.kind, origin: 'admin', status: row.status, payload, errors: checked.errors, sourceKey: row.source_key, updatedAt: row.updated_at, completions: completions[`${row.kind}:${row.id}`] ?? 0 };
      });
      return accessJson({ library, items, voaArticles: VOA_LISTENING.map(c => c.articleId) });
    }
    if (request.method !== 'POST') throw new ContentError('Not found.', 404);
    await limited(db, action === 'content-import' ? 'import' : 'write', action === 'content-import' ? 20 : 120);
    const input = await body(request);
    const kind = input.kind === 'reading' || input.kind === 'listening' ? input.kind : null;

    if (action === 'content-state') {
      const id = contentId(input.id), status = input.status === 'published' || input.status === 'hidden' ? input.status : null;
      const level = input.level === null || input.level === undefined ? null : CEFR_LEVELS.find(l => l === input.level) ?? 'invalid';
      if (!kind || !id || !status || level === 'invalid' || !bundled[kind].some(item => item.id === id)) throw new ContentError('Choose a bundled lesson, a status and a valid level.');
      await db.prepare('INSERT INTO learning_content_state(content_id,kind,status,level,updated_at) VALUES(?,?,?,?,?) ON CONFLICT(content_id) DO UPDATE SET status=excluded.status,level=excluded.level,updated_at=excluded.updated_at')
        .bind(id, kind, status, level, now()).run();
      return accessJson({ ok: true });
    }
    if (action === 'content-import') {
      const article = voaArticleId(input.url);
      if (article && VOA_LISTENING.some(clip => clip.articleId === article)) throw new ContentError('This VOA lesson is already in the Listening library.', 409);
      if (article && await db.prepare('SELECT id FROM learning_content_items WHERE source_key=?').bind(`voa:${article}`).first()) throw new ContentError('This VOA lesson was already imported. Open the existing draft instead.', 409);
      const draft = await importVoaDraft(input.url, fetcher, request.signal);
      const id = `voa-${draft.article}`, time = now();
      const inserted = await db.prepare('INSERT OR IGNORE INTO learning_content_items(id,kind,status,source_key,payload_json,created_at,updated_at) VALUES(?,?,?,?,?,?,?)')
        .bind(id, 'listening', 'draft', `voa:${draft.article}`, JSON.stringify(draft.payload), time, time).run();
      if (inserted.meta.changes !== 1) throw new ContentError('This VOA lesson was already imported.', 409);
      return accessJson({ id, payload: draft.payload, audioFound: draft.audioFound }, 201);
    }
    if (action === 'content-save') {
      if (!kind) throw new ContentError('Choose reading or listening.');
      const existing = input.id === undefined ? null : contentId(input.id);
      if (input.id !== undefined && !existing) throw new ContentError('Choose a valid lesson.');
      const id = existing ?? newId(kind, (input.payload as Record<string, unknown> | undefined)?.title);
      const checked = validate(kind, input.payload, id, false);
      if (!checked.value) throw new ContentError('Complete the required fields before saving.', 422, checked.errors);
      const payload = JSON.stringify(input.payload), article = kind === 'listening' ? voaArticleId((input.payload as Record<string, unknown>).sourceUrl) : null;
      if (article && VOA_LISTENING.some(clip => clip.articleId === article)) throw new ContentError('This VOA lesson is already in the Listening library.', 409);
      const sourceKey = article ? `voa:${article}` : null, time = now();
      if (existing) {
        const row = await db.prepare('SELECT kind FROM learning_content_items WHERE id=?').bind(id).first<{ kind: string }>();
        if (!row || row.kind !== kind) throw new ContentError('This lesson no longer exists.', 404);
        // Edits return a published lesson to draft so changed content is reviewed again before learners see it.
        await db.prepare("UPDATE learning_content_items SET payload_json=?,source_key=?,status='draft',updated_at=? WHERE id=?").bind(payload, sourceKey, time, id).run()
          .catch(() => { throw new ContentError('Another lesson already uses this VOA article.', 409); });
      } else {
        await db.prepare('INSERT INTO learning_content_items(id,kind,status,source_key,payload_json,created_at,updated_at) VALUES(?,?,?,?,?,?,?)').bind(id, kind, 'draft', sourceKey, payload, time, time).run()
          .catch(() => { throw new ContentError('Another lesson already uses this VOA article.', 409); });
      }
      return accessJson({ id, errors: checked.errors });
    }
    if (action === 'content-publish') {
      const id = contentId(input.id);
      if (!id || typeof input.published !== 'boolean') throw new ContentError('Choose a lesson.');
      const row = await db.prepare('SELECT kind,payload_json FROM learning_content_items WHERE id=?').bind(id).first<{ kind: ContentKind; payload_json: string }>();
      if (!row) throw new ContentError('This lesson no longer exists.', 404);
      if (input.published) {
        const checked = validate(row.kind, JSON.parse(row.payload_json), id, true);
        if (!checked.value) throw new ContentError('Review the remaining issues before publishing.', 422, checked.errors);
      }
      await db.prepare('UPDATE learning_content_items SET status=?,updated_at=? WHERE id=?').bind(input.published ? 'published' : 'draft', now(), id).run();
      return accessJson({ ok: true });
    }
    throw new ContentError('Not found.', 404);
  } catch (error) {
    if (error instanceof ContentError) return accessJson({ error: [error.message, ...error.errors.slice(0, 4)].join(' '), ...(error.errors.length ? { errors: error.errors } : {}) }, error.status);
    return accessJson({ error: 'Content management is temporarily unavailable. Published lessons are unchanged.' }, 503);
  }
}

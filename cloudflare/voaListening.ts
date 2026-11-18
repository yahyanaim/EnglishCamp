import { VOA_LISTENING, VOA_ORIGIN, VOA_PODCAST_URL, voaArticleUrl } from '../src/data/voa-listening';

const maxDocumentBytes = 512 * 1024;

async function publisherDocument(response: Response): Promise<string> {
  if (!response.ok || Number(response.headers.get('content-length')) > maxDocumentBytes) {
    await response.body?.cancel();
    return '';
  }
  const reader = response.body?.getReader();
  if (!reader) return '';
  const decoder = new TextDecoder();
  let length = 0;
  let text = '';
  for (;;) {
    const part = await reader.read();
    if (part.done) return text + decoder.decode();
    length += part.value.byteLength;
    if (length > maxDocumentBytes) {
      await reader.cancel();
      return '';
    }
    text += decoder.decode(part.value, { stream: true });
  }
}

function publisherAudio(document: string, articleId: number, mediaId: number | undefined) {
  const source = mediaId
    ? document.match(/<audio\b[^>]*>[\s\S]*?<source\b[^>]*\bsrc="([^"]+)"/i)?.[1]
    : podcastAudio(document, voaArticleUrl(articleId));

  if (!source) return;
  const url = new URL(source);
  return url.origin === 'https://voa-audio.voanews.eu' && /^\/vle\/[0-9/]+\/[\w-]+\.mp3$/.test(url.pathname) &&
    !url.username && !url.password && !url.search && !url.hash ? url.href : undefined;
}

function podcastAudio(document: string, articleUrl: string) {
  const position = document.indexOf(`<link>${articleUrl}</link>`);
  if (position === -1) return;
  const first = document.lastIndexOf('<item>', position);
  const last = document.indexOf('</item>', position);
  if (first === -1 || last === -1) return;
  return document.slice(first, last).match(/<enclosure\b[^>]*\burl="([^"]+)"/i)?.[1];
}

export async function voaListeningResponse(request: Request, fetcher: typeof fetch = fetch) {
  if (request.method !== 'GET') return Response.json({ error: 'Method not allowed.' }, { status: 405, headers: { Allow: 'GET' } });
  const id = new URL(request.url).searchParams.get('id');
  const clip = VOA_LISTENING.find(item => item.id === id);
  if (!clip) return Response.json({ error: 'Recording not found.' }, { status: 404 });
  const publisherUrl = clip.mediaId ? `${VOA_ORIGIN}/pp/${clip.mediaId}/ppt0.html` : VOA_PODCAST_URL;
  let audioUrl = clip.audioUrl;
  let resolved = false;
  try {
    const options = {
      redirect: 'error' as const,
      signal: AbortSignal.any([request.signal, AbortSignal.timeout(4500)]),
      cf: { cacheEverything: true, cacheTtlByStatus: { '200-299': 86400, '400-599': 300 } },
    };
    const response = await fetcher(publisherUrl, options);
    const originAudio = publisherAudio(await publisherDocument(response), clip.articleId, clip.mediaId);
    if (originAudio) {
      audioUrl = originAudio;
      resolved = true;
    }
  } catch {
    // Keep the reviewed publisher MP3 available if its player page or feed fails.
  }
  return Response.json({ audioUrl }, {
    headers: {
      'Cache-Control': `private, max-age=${resolved ? 3600 : 60}`,
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

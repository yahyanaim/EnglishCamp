/**
 * Browser security headers added to every Worker response (pages, assets, APIs, redirects).
 * The CSP allows only what the exported app loads: its own files, YouTube embeds and their
 * thumbnails, VOA audio, and blob/data URLs for recordings and generated speech.
 * 'unsafe-inline' remains for scripts and styles because the Next.js static export inlines
 * its bootstrap data; every other script origin is closed.
 */
export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://www.youtube.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://i.ytimg.com",
  "media-src 'self' blob: data: https://voa-audio.voanews.eu",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-src https://www.youtube-nocookie.com https://www.youtube.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

export const SECURITY_HEADERS: Record<string, string> = {
  'Content-Security-Policy': CONTENT_SECURITY_POLICY,
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), geolocation=(), microphone=(self), payment=()',
};

export function withSecurityHeaders(request: Request, response: Response): Response {
  const secured = new Response(response.body, response);
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) secured.headers.set(name, value);
  // HTTPS-only rules stay off plain-http local previews so their own assets keep loading.
  if (new URL(request.url).protocol === 'https:') {
    secured.headers.set('Content-Security-Policy', `${CONTENT_SECURITY_POLICY}; upgrade-insecure-requests`);
    secured.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }
  return secured;
}

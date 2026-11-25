/** Pages stay uncached; static files a signed-in learner already opened may be reused by that browser only (never shared caches). */
export const gatedCacheControl = (path: string) =>
  path.startsWith('/_next/static/') ? 'private, max-age=31536000, immutable'
  : path.startsWith('/media/') ? 'private, max-age=86400'
  : 'no-store, private';

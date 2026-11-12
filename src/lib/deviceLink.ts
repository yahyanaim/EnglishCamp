export const DEVICE_LINK_TTL = 300;
export const validDeviceToken = (value: unknown): value is string => typeof value === 'string' && /^[A-Za-z0-9_-]{32}$/.test(value);

/** The short-lived credential is a fragment, never a query string or third-party QR URL. */
export function deviceLinkUrl(origin: string, token: string) {
  if (!validDeviceToken(token)) throw new Error('Invalid device link.');
  const url = new URL('/connect-device', origin);
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error('Use an EnglishCamp address.');
  url.hash = new URLSearchParams({ link: token }).toString();
  return url.toString();
}

// Survives the learner-scope remount after an existing cookie restores a profile.
// It is never written to local/session storage and disappears on a full reload.
let pending: { token: string; until: number } | null = null;
export function rememberDeviceLink(location: Pick<Location, 'hash' | 'pathname' | 'search'>, history: Pick<History, 'replaceState'>) {
  if (location.hash) {
    const token = new URLSearchParams(location.hash.slice(1)).get('link');
    pending = validDeviceToken(token) ? { token, until: Date.now() + DEVICE_LINK_TTL * 1000 } : null;
    history.replaceState(null, '', location.pathname + location.search);
  }
  if (pending && pending.until > Date.now()) return pending.token;
  pending = null;
  return '';
}
export function clearDeviceLink() { pending = null; }

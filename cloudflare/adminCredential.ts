/**
 * Administrator credential checks.
 *
 * INVITATION_ADMIN_HASH accepts two formats:
 *  - legacy: 64 hex characters, SHA-256 of the management key (still accepted);
 *  - recommended: `pbkdf2$<iterations>$<salt base64>$<hash base64>` (PBKDF2-SHA-256), generated with
 *    `node scripts/admin-credential.cjs`.
 * ADMIN_TOTP_SECRET (base32, optional) turns on a six-digit authenticator code as a second factor.
 */
export type AdminCredentialEnv = { INVITATION_ADMIN_HASH?: string; ADMIN_TOTP_SECRET?: string };

const PBKDF2 = /^pbkdf2\$(\d{4,6})\$([A-Za-z0-9+/=]{16,128})\$([A-Za-z0-9+/=]{40,128})$/;
const encoder = new TextEncoder();
const fromBase64 = (value: string) => Uint8Array.from(atob(value), c => c.charCodeAt(0));
const hex = (bytes: ArrayBuffer) => Array.from(new Uint8Array(bytes)).map(v => v.toString(16).padStart(2, '0')).join('');

function sameBytes(a: Uint8Array, b: Uint8Array) {
  let different = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i++) different |= (a[i] ?? 0) ^ (b[i] ?? 0);
  return different === 0;
}

export function adminCredentialConfigured(env: AdminCredentialEnv) {
  const stored = env.INVITATION_ADMIN_HASH || '';
  if (!(/^[a-f0-9]{64}$/.test(stored) || PBKDF2.test(stored))) return false;
  return !env.ADMIN_TOTP_SECRET || /^[A-Z2-7]{16,64}=*$/.test(env.ADMIN_TOTP_SECRET.trim().toUpperCase());
}

export const adminTotpEnabled = (env: AdminCredentialEnv) => !!env.ADMIN_TOTP_SECRET?.trim();

export async function verifyAdminKey(key: string, env: AdminCredentialEnv): Promise<boolean> {
  const stored = env.INVITATION_ADMIN_HASH || '';
  if (!key || key.length > 256) return false;
  const pbkdf2 = stored.match(PBKDF2);
  if (pbkdf2) {
    const iterations = Number(pbkdf2[1]);
    if (iterations < 10_000 || iterations > 100_000) return false; // Workers caps PBKDF2 at 100,000 iterations.
    const material = await crypto.subtle.importKey('raw', encoder.encode(key), 'PBKDF2', false, ['deriveBits']);
    const expected = fromBase64(pbkdf2[3]);
    const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt: fromBase64(pbkdf2[2]), iterations }, material, expected.length * 8);
    return sameBytes(new Uint8Array(bits), expected);
  }
  if (!/^[a-f0-9]{64}$/.test(stored)) return false;
  const actual = hex(await crypto.subtle.digest('SHA-256', encoder.encode(key)));
  return sameBytes(encoder.encode(actual), encoder.encode(stored));
}

function base32(secret: string) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567', clean = secret.trim().toUpperCase().replace(/=+$/, '');
  let bits = '';
  for (const char of clean) { const index = alphabet.indexOf(char); if (index < 0) throw new Error('Invalid base32'); bits += index.toString(2).padStart(5, '0'); }
  const bytes = new Uint8Array(Math.floor(bits.length / 8));
  for (let i = 0; i < bytes.length; i++) bytes[i] = parseInt(bits.slice(i * 8, i * 8 + 8), 2);
  return bytes;
}

export async function totpCode(secret: string, step: number): Promise<string> {
  const counter = new Uint8Array(8);
  let value = step;
  for (let i = 7; i >= 0; i--) { counter[i] = value & 0xff; value = Math.floor(value / 256); }
  const key = await crypto.subtle.importKey('raw', base32(secret), { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']);
  const mac = new Uint8Array(await crypto.subtle.sign('HMAC', key, counter));
  const offset = mac[mac.length - 1] & 0x0f;
  const binary = ((mac[offset] & 0x7f) << 24) | (mac[offset + 1] << 16) | (mac[offset + 2] << 8) | mac[offset + 3];
  return String(binary % 1_000_000).padStart(6, '0');
}

/** Accepts the current 30-second code and one step either side for clock drift. */
export async function verifyAdminTotp(code: unknown, env: AdminCredentialEnv, now = Date.now()): Promise<boolean> {
  if (!adminTotpEnabled(env)) return true;
  if (typeof code !== 'string' || !/^\d{6}$/.test(code)) return false;
  const step = Math.floor(now / 30_000);
  let matched = false;
  for (const drift of [-1, 0, 1]) matched = sameBytes(encoder.encode(await totpCode(env.ADMIN_TOTP_SECRET!, step + drift)), encoder.encode(code)) || matched;
  return matched;
}

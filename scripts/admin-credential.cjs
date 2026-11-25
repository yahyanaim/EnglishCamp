#!/usr/bin/env node
/*
 * Generates administrator credentials for the Worker secrets (run locally, never in CI):
 *   node scripts/admin-credential.cjs            -> new random management key + PBKDF2 hash
 *   node scripts/admin-credential.cjs --totp     -> also an authenticator (TOTP) secret
 * Then:  wrangler secret put INVITATION_ADMIN_HASH   (paste the pbkdf2$… value)
 *        wrangler secret put ADMIN_TOTP_SECRET       (paste the base32 value, only with --totp)
 * Existing 64-character SHA-256 hashes keep working until you replace them.
 */
const crypto = require('node:crypto');
const iterations = 100000; // Cloudflare Workers' PBKDF2 maximum.
const key = crypto.randomBytes(24).toString('base64url');
const salt = crypto.randomBytes(16);
const hash = crypto.pbkdf2Sync(key, salt, iterations, 32, 'sha256');
console.log('Management key (store it in your password manager):');
console.log('  ' + key);
console.log('INVITATION_ADMIN_HASH:');
console.log(`  pbkdf2$${iterations}$${salt.toString('base64')}$${hash.toString('base64')}`);
if (process.argv.includes('--totp')) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567', bytes = crypto.randomBytes(20);
  let bits = '', secret = '';
  for (const b of bytes) bits += b.toString(2).padStart(8, '0');
  for (let i = 0; i + 5 <= bits.length; i += 5) secret += alphabet[parseInt(bits.slice(i, i + 5), 2)];
  console.log('ADMIN_TOTP_SECRET (add it to your authenticator app, then as a Worker secret):');
  console.log('  ' + secret);
  console.log('  otpauth://totp/EnglishCamp:admin?secret=' + secret + '&issuer=EnglishCamp');
}

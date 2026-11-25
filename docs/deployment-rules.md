# EnglishCamp deployment rules

These rules keep production safe. `tests/audit-fixes.test.cjs` fails if the configuration breaks them.

## Access and quotas
- `INVITATION_REQUIRED` must stay `"true"` in production. Per-learner daily limits for the English coach, pronunciation and natural audio (text-to-speech) need a signed-in learner. With invitations off, only the per-IP and global limits remain.
- Optional Worker vars (defaults in brackets):
  - `AI_COACH_DAILY_PER_LEARNER` [20], `AI_PRONUNCIATION_DAILY_PER_LEARNER` [1]
  - `AI_COACH_DAILY_GLOBAL` [200], `AI_PRONUNCIATION_DAILY_GLOBAL` [100]: shared by all learners; size them from the usage cost audit.
  - `SPEECH_DAILY_CHARS_PER_LEARNER` [30000]

## Administrator access
- `INVITATION_ADMIN_HASH` accepts the legacy 64-character SHA-256 hash or the recommended salted PBKDF2 format. Generate a new key with `node scripts/admin-credential.cjs` (add `--totp` for an authenticator secret).
- `ADMIN_TOTP_SECRET` (optional) turns on a six-digit authenticator code at admin sign-in.
- Changing `INVITATION_ADMIN_HASH` signs out every admin session.

## Releases
- Every push to `main` applies pending D1 migrations, then deploys the Worker (`cloudflare-deploy.yml`). Migrations must stay backward compatible with the Worker that is still live until the deploy finishes.
- Pull requests run lint, build, tests and the Worker bundle check (`pull-request-checks.yml`).

## Browser security headers
- `cloudflare/securityHeaders.ts` sets CSP, HSTS, X-Frame-Options, Referrer-Policy and Permissions-Policy on every response.
- A new external script, image, audio, video or iframe source must be added to the CSP there, or browsers will block it.

## Logs
- Worker observability is on with 25% sampling and records request metadata only. Never log learner text, recordings, notes or tokens. Invitation and device-link tokens travel in URL fragments, which are not sent to the server.

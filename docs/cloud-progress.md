# Cross-device progress with Cloudflare D1

An online learner signs in with a display name and a generated `EC1-` recovery code. The name is not an authentication secret or a unique account key. Download recovery details when creating the profile; someone with both details can open it. There is no email recovery service. Device-only sessions and guest practice remain available.

## Stored data

- Display name, generated fruit avatar and stable profile number.
- Course stages and completion evidence, completed exercises, XP, activity dates, flashcard review counters and quiz score summaries.
- Completed daily-challenge summary and earned badges.
- Hashed recovery credentials, hashed session tokens with expiry, and short-lived hashed rate-limit buckets for sign-in protection.

Written answers, quiz answer arrays, notes, saved word-bank content, placement response text, assessment audio and microphone recordings are not included in synchronization. The server validates an explicit field allowlist before storing progress. Online profiles use a per-account device cache; they never share a cache merely because names match.

## Synchronization

Changes are queued on the device, then sent after a short debounce. Returning to a visible tab, reconnecting to the network, or selecting **Sync now** retries synchronization. A visible tab checks for other-device updates once a minute. Unchanged checks use reads rather than rewriting the snapshot. Pending events survive closing a tab in the device cache.

Completion and badge merges preserve evidence from both devices. A SQL event ledger gives each lesson/exercise reward a stable key; retries and the same exercise completed on two devices cannot award it twice. Repeatable practice uses its event ID. Imported XP is retained as a baseline. A database trigger maintains the additional XP total without repeatedly scanning the full event history. Snapshot revisions protect concurrent updates from overwriting one another. The daily summary follows the first completed result saved for that day.

Each mutation requires a same-origin request and the authenticated learner ID, so another tab switching accounts cannot send the previous learner's progress into the new account. Production cookies are Secure, HttpOnly and SameSite=Strict. API responses are not cached. Signing out retains server records. The existing explicit deletion confirmation deletes the authenticated cloud profile and the downloaded records on that device; other devices can retain local caches.

## Deployment

Use the existing Workers Free account. D1 has [free quotas](https://developers.cloudflare.com/d1/platform/pricing/); no paid binding is required. The existing Microsoft Speech secrets remain on the Worker and do not belong in the database or build environment.

1. Create the `englishcamp-learners` D1 database in the same Cloudflare account as the `englishcamp` Worker.
2. Add its actual database ID to `wrangler.jsonc` as `LEARNERS_DB`, with `migrations_dir` set to `migrations`.
3. Apply the SQL files before deploying the code: `npx wrangler d1 migrations apply englishcamp-learners --remote`.
4. Deploy the existing Worker using the established GitHub Actions workflow. Keep the Azure Speech secret bindings unchanged.
5. Verify a disposable test profile can save progress, sign out, and restore its totals and badges in a separate browser session. Never log recovery codes, session cookies or API secrets.

Database administration needs D1 access. The earlier Wrangler authorization covered Worker scripts only, so D1 setup requires additional authorization; the application itself uses a D1 binding without a database password. Routine deployments that only use the existing binding do not need database credentials in the browser. Apply future schema migrations deliberately before deploying code that depends on them.

## Local verification

The isolated QA configuration under `.camp-cache` uses a separate local D1 database and does not deploy it. Run both migrations with the local configuration and persist directory used by the QA Worker. `tests/cloud-progress-rtl.test.cjs` runs the same SQL against an in-memory SQLite database, checking recovery, account isolation, request validation, idempotent XP, privacy filtering and deletion boundaries. Browser QA additionally checks the real registration and recovery interfaces.

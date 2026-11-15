# Invitation-only EnglishCamp

The existing Cloudflare Worker and D1 database enforce access. No extra paid service is used. Learner course content, fonts, workspace layout, progress, rewards and Microsoft voices are preserved. Modal's cardless $1 cap, scale-to-zero configuration and one-container maximum are unchanged.

## Owner access

Open `/admin/invitations` and use the private management key. A learner recovery code cannot manage invitations, and a management session cannot call learner AI APIs. The owner key is a generated 256-bit secret, supplied to Cloudflare only as `INVITATION_ADMIN_HASH`. Management sessions are HttpOnly, Secure, SameSite=Strict cookies, expire after eight hours, and stop working if the hash is rotated.

`node scripts/prepare-invitation-owner.cjs` prepares `.camp-cache/invitations/owner-access.txt` and private deployment files without printing the key. The directory is mode 700, files are mode 600, and the entire cache is excluded from Git and static export. An existing owner key is preserved on rerun. Copy/save the private file securely; never share it with learners or add it to build variables.

The page creates 1–20 invitations at a time, with 1-, 7-, 14- or 30-day expiry and an optional group label. Codes have 192 bits of random entropy. Only hashes and masked display labels are stored in D1; full codes appear once and can be downloaded by the owner. Unused codes can be revoked. The owner can pause all new admissions or pause/restore a learner's access without deleting learning records. The list displays the latest 200 invitations and learners.

## Learner access and retained progress

`/invite` accepts an invitation and name, or an existing name and recovery code. Redemption, profile creation, admission, initial progress import and session creation are one D1 transaction. A replay, expiry, revocation or database failure cannot create a partial account or consume a code without its profile. Deleting an admitted account does not make its invitation reusable.

Migration `0006_invitations.sql` approves every existing online learner and adds new access tables. It does not update or delete existing accounts, progress, rewards, notes, recovery hashes or sessions. Existing recovery and QR connections continue to work on another device without another invitation. Local-only data remains on the device; it can be imported into a new invited online profile. A local display name alone cannot authenticate an existing online account.

`INVITATION_REQUIRED=true` enables the gate. The Worker runs before static assets so direct HTML, exported RSC payloads, audio files and API calls cannot bypass it. Public exceptions are the entrance, management and QR-connection pages, strictly bounded static support assets, and the necessary authentication endpoints. All management actions still require the separate owner session. Client navigation also checks access. Private responses use `no-store`; admission lookup failures close access with a retry message and keep local records.

## Compute protection

Approved learners receive one successful pronunciation correction per UTC day and 20 coach requests per UTC day, on top of the existing IP/global limits. Pronunciation also has a shared 500-attempt UTC-calendar-month ceiling. Failed assessments restore the learner's daily correction allowance, but retain their shared attempt charge because the server may have done work. Monthly pool rejection restores the daily allowance too. Counters are atomic D1 updates and survive Worker restarts and IP changes.

The request ceiling is a conservative traffic limit, not a dollar-meter or promise of 500 assessments. Longer takes, cold starts, builds and other usage consume credit; Modal's existing provider-locked $1 limit remains the financial backstop. No billing setting or plan is changed. Existing one-at-a-time pronunciation processing, bounded recordings, provider consent and backend authentication remain intact.

## Deployment

1. Run application tests and the Cloudflare export/bundle check. Test the new pages with a local migrated D1 database, including phone widths.
2. Prepare the private owner key. Preserve all existing Azure, Gemini, OpenPronounce and D1 settings. Upload only the new hash through Cloudflare's secret manager.
3. Record D1's built-in Time Travel bookmark (recovery metadata only), keeping learner records inside Cloudflare. Then apply migration 0006 with the owner's D1-authorized Wrangler session and verify existing record counts. Local migration tests also verify exact progress, badge and credential preservation. Workers Free retains seven days of recovery history; see [Cloudflare Time Travel](https://developers.cloudflare.com/d1/reference/time-travel/). Do not export learner data locally without separate authorization.
4. Configure `ENGLISHCAMP_SMOKE_PROFILE` as an encrypted GitHub Actions secret containing only a dedicated synthetic deployment-check profile's `name` and `recoveryCode`. It has learner access, never management access, and contains no real learner data. The workflow passes it only to the live-check step, not the build.
5. Deploy the Worker and exported pages together through the existing GitHub workflow. After cutover, backfill only missing access rows for accounts created by the old Worker during the migration/deploy window. New-code registrations already create their access row atomically.
6. Test actual owner sign-in, single-use redemption, protected routes, recovery/QR, notes/progress retention and Microsoft MP3 playback. The deployment smoke check verifies unauthenticated rejection, signs in its synthetic profile, checks the real pages/voice and logs out. It never prints profile credentials.

Tests using SQLite and stubbed providers check failure/transaction behavior; they do not establish live Cloudflare integration. Production tests use fixed non-personal learning text. Keep recovery metadata, test credentials, management keys and full invitation downloads out of Git and logs.

To rotate a lost owner key, generate a new private key, update only its hash secret and sign in again; existing management sessions become invalid. To reopen public access deliberately, the owner can redeploy with `INVITATION_REQUIRED=false`; this leaves all access and progress records intact. Pausing admissions in the owner page is the normal way to stop growth while keeping current learners active.

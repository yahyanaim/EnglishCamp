# Advanced administration

Routes: `/admin/login`, `/admin/dashboard`, `/admin/learners`, `/admin/invitations`, `/admin/analytics`, `/admin/courses`, `/admin/achievements`, `/admin/infrastructure`, `/admin/settings`.

The existing hashed management key, secure HttpOnly/SameSite cookie, eight-hour D1 sessions, same-origin checks and logout remain authoritative. Worker authorization covers administrative HTML and exported RSC payloads, including encoded paths. A learner session grants no administrative access. Management mutations have an additional session-scoped rate limit. The learner entrance no longer advertises administration. No secrets or billing settings are changed.

Migration 0007 adds only `cloud_admin_summaries` and two date indexes. It changes no learner/progress/note records. Cached summaries contain recorded totals, canonical course credits, actual signature-matched stages, badge IDs/timestamps and quiz score summaries. They contain no notes, microphone recordings, private answers, recovery credentials or session hashes. Profile deletion cascades to its summary. The cache retains data only while its learner exists.

Each data request refreshes at most five changed profiles, identified by the existing progress revision; it never rescans all raw progress JSON. A visible pending counter tells the owner to refresh further batches. Learning charts cover a bounded maximum of 201 summarized profiles (appropriate for the initial 100–200 learners), and disclose partial coverage. Account counts and XP totals query all registered online accounts. There is no continuous polling, paid telemetry, extra database or background service.

Date filters apply only to timestamped registrations, redemptions, event-ledger activity, quiz attempts and badge awards. Historical imported activity may be incomplete. Device-only guests and unsynced work are unknown. Legacy lesson/course credits are distinguished from recorded guided, independent and assessment-stage evidence. Neither XP, self-reviewed speaking/writing nor course completion is an official proficiency assessment. Learner detail shows server revision/update, not an invented live synchronization status.

Directory and invitation APIs use bounded 25-row pagination and validated filters. Learner filtering supports status, recent recorded activity, name and registration period. Details expose only authorized account and learning summaries. Suspension requires confirmation; it preserves all learning records. Existing creation limits, single-use invitations, expiry, revocation and admissions controls remain. Full invitation codes are displayed only at creation.

`scripts/admin-coverage.cjs` generates read-only catalogue metadata from the actual course data, current `MOCK_PAPERS`, achievement definitions and published media. The existing Cloudflare build refreshes these manifests. Course editing remains a repository workflow; no conflicting D1 editor is introduced.

Infrastructure checks execute a lightweight D1 read and show sanitized configuration flags. Provider configuration is explicitly not claimed to be a live availability check. Billing and uncollected API/sync error statistics display unavailable states. The GitHub commit is displayed when supplied by the deployment build. Shared request counters come from the existing quota buckets; they are not provider billing or successful-assessment counts. Authentication counters count requests, not confirmed failures. Observability stays disabled, OpenAI assessment stays disabled, Cloudflare remains Free and the Modal $1 cap remains unchanged.

The only lint configuration change scopes an existing Next.js lint rule to the established local `module` variable in `courseProgress.ts`; its code and completion behavior remain unchanged. Existing hook/image warnings are not hidden globally.

Future work, requiring separate scope: instructor roles/classes, centrally authorized assessment workflows, a deliberate versioned content editor, provider billing integrations and opt-in operational error aggregation. None is presented as an existing feature.

The Worker preservation hash is updated only for the reviewed no-store protection on admin assets, including when invitation gating is disabled. Dedicated routing/cache authorization tests cover that change; teaching banks, fonts and learner stores retain their existing preservation checks.

## Dashboard visual reference

The administration presentation follows the floating workspace in [AI-hub's AdminDashboardClient](https://github.com/yahyanaim/AI-hub/blob/main/components/admin/AdminDashboardClient.tsx): grouped header navigation, a compact desktop icon rail, an identity strip, contextual page headers, illustrated KPI cards, responsive charts and a learner detail drawer. The reference's orange accent, quotas, payments, Redis/Vercel integrations and backend operations are not imported. EnglishCamp retains its palette, fonts, learning content, APIs, permissions and service limits.

Time charts use only timestamped records returned by EnglishCamp. Gaps are not filled with invented historical observations. Values remain available in expandable tables, and points can be focused by keyboard. Metric coverage explanations remain available under “How metrics work.” The interface uses existing SVG/icon assets and React components; no chart dependency or polling is added.

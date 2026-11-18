# Administration: operations and progress

Reviewed 17 November 2026 against the actual AIhubtools admin infrastructure, security and settings source. EnglishCamp retains its fonts, vector artwork, shared palette, authentication and existing quota policies.

Infrastructure now separates a live Worker/D1 check from provider configuration. It shows one sampled database-query duration, exact UTC allowance windows and counters, and counts of stored profiles, progress snapshots and nonempty notes. It never returns note bodies or provider credentials. A snapshot is not a successful current sync connection, a request counter is not a completed correction, and a single read is not uptime or a latency percentile. CPU and charges remain in provider dashboards; no billable model probes or monitoring permissions were added. The existing $1 Modal cap, 500 shared monthly pronunciation attempts and other protection limits are unchanged.

Security pairs the existing time chart with a pie of four disjoint recorded API-response categories: 401, 403, 429 and 503. The legend exposes counts and percentages, supports keyboard highlighting and does not rely on colour alone. Empty periods remain empty; a period containing one category renders a whole circle correctly. This distribution excludes successful requests and does not claim an attack rate, unique-person count or overall error rate. Changing the report period hides stale data until the requested report is available. Existing session revocation is retained.

Settings uses a compact category menu and one grouped editing surface per category instead of four competing cards. Profile save/reset, device theme and accent, admission confirmations, membership policy and practice limits remain functional. A legacy definition-list selector was isolated from the new page so it cannot widen the category column on desktop.

Achievements adds only useful learning milestones: badges, profiles with badges, cumulative module credits, the selected-period quiz-practice average, badge-award dates, signature-matched practice stages and course-level progress. Quiz results are practice performance, not a CEFR proficiency score. Learning charts remain bounded to 201 summarized profiles; pending summary refresh and coverage limits stay visible. Unknown historical badge IDs remain included in chronological award totals without fabricating catalogue names. No learning records, rewards or badge definitions were changed.

Validation uses an isolated local D1 database with synthetic progress and notes, meaningful quota-counter and date-boundary tests, and browser review across phone, tablet and desktop widths. Production deployment runs the existing live-page and Microsoft MP3 verification. Credentials stay out of exports, logs, source and browser responses.

References:

- [AIhubtools: actual admin dashboard source](https://github.com/yahyanaim/AI-hub/blob/main/components/admin/AdminDashboardClient.tsx).
- [Cloudflare: Worker metrics and invocation errors](https://developers.cloudflare.com/workers/observability/metrics-and-analytics/).
- [Cloudflare: observability](https://developers.cloudflare.com/workers/observability/).
- [Carbon Design System: data visualization](https://www.carbondesignsystem.com/building-blocks/data-visualization/overview).

Follow-up on 18 November 2026: the response chart now follows AIhubtools’ `HorizontalBreakdown` donut variant, with rounded ring segments, a centered total, hover/focus percentages and a matching legend. Adjacent infrastructure cards and desktop settings cards share equal widths and heights; phone cards keep natural heights in one column. Data, quotas, authentication and learner progress are unchanged. Reference: [AIhubtools chart implementation](https://github.com/yahyanaim/AI-hub/blob/main/components/admin/AdminCharts.tsx#L564).

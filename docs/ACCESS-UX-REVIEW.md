# Access, loading and admin UX review

Reviewed on 17 November 2026. EnglishCamp keeps its original fonts, palette controls, faceted artwork, account identities, course content and progress stores.

The former access boundary replaced the entire workspace with a plain message on every route change. The new boundary keeps the previously verified navigation mounted, while the new page remains hidden behind structural placeholders until its own access check succeeds. Initial access still fails closed. Loading indicators follow actual pending work, respect reduced motion and show no invented percentage or artificial waiting period. Connection failures expose a retry action without exposing the requested page.

Learner access now has one normal entry page with two clear paths: **Sign in** with an existing name and recovery code, or **Create account** using an invitation. Requesting access is a secondary action. Existing invitation-email links still prefill the form and remove their private fragment from the address bar. The recovery step distinguishes the consumed invitation from the new sign-in code, with copy and download actions. The existing hashed-code and secure-session mechanisms are preserved; no password migration is required.

The optional CEFR offer appears inside the page after a new account saves its recovery details. It no longer opens a blocking dialog. Choosing Explore first or dismissing it keeps the intended destination. Assessment questions, scoring, certificate logic and separate consent requirements are unchanged.

Settings follows the compact action-card structure in AIhubtools, organized into General, Appearance, and Access & limits. It provides real profile editing with unsaved-change feedback, theme previews, shared accent controls, existing admissions controls and read-only membership/provider policy. Provider keys and billing prices cannot be edited in the browser. The Modal $1 monthly limit and all existing quotas are unchanged.

Security retains the existing chart component and shows recorded 401/403/429/503 response totals, recent UTC aggregates, current-session expiry, and the working action to revoke other administrator sessions. Its CSV contains aggregates only. Configuration presence is labelled as configuration, never as a successful live provider health check. No fake MFA switches, fabricated incidents, raw credentials, private notes or IP-address tables were added.

Validation uses an isolated local D1 database and synthetic accounts. Browser review covers 320, 375, 390, 768 and 1440 pixels, private invitation links, request consent, account creation and recovery, optional-test dismissal, persistent navigation, reduced motion, Arabic administrator names, theme/palette controls, CSV export and administrator-session revocation that retains learner access. Forty-five responsive checks passed without runtime errors or horizontal overflow. Follow-up checks cover all four access forms at 320, 375 and 390 pixels, including readable placeholder text and a compact consent checkbox with its full clickable label. Additional phone checks verified that a failed access request hides the requested content until retry succeeds, and that actual local suspension redirects to sign-in; restoring access retains identity, XP and completed lessons. The 361-test application suite preserves learning content, stored identities and provider boundaries. Production deployment additionally runs the existing authenticated page and real Microsoft MP3 checks.

Design references:

- [GOV.UK: clear, separate account-creation and sign-in journeys](https://design-system.service.gov.uk/patterns/create-accounts/).
- [ONS: invitation/access-code account flows and progressive help](https://service-manual.ons.gov.uk/design-system/patterns/create-an-account).
- [IBM Carbon: structural loading, actual processing states and accessibility](https://www.carbondesignsystem.com/building-blocks/core/patterns/loading).
- [AIhubtools: actual settings and security composition](https://github.com/yahyanaim/AI-hub/blob/main/components/admin/AdminDashboardClient.tsx#L3222).

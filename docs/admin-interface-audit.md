# Admin and entry interface audit

Reference: the actual [AIhubtools workspace source](https://github.com/yahyanaim/AI-hub/blob/main/components/admin/AdminDashboardClient.tsx) and [admin login form](https://github.com/yahyanaim/AI-hub/blob/main/components/auth/AdminLoginForm.tsx). Authentication composition was also checked against [shadcn login blocks](https://ui.shadcn.com/blocks/login) and [Clerk invitation entry flows](https://clerk.com/docs/guides/users/inviting). These are visual/workflow references; no authentication service or framework was replaced.

| Observed gap | Reviewed change |
| --- | --- |
| Admin sign-in had a large marketing split absent from the reference | A focused 430px auth card, compact branded header, theme controls, existing management-key field and password visibility |
| Learner invite entry used a separate banner/card language | Reuse the named-session form, typography, mascot heading and controls in a compact entry card |
| Original signup and local-profile upgrade did not send an invitation code | Add the invitation field and pass its trimmed value, preserving existing modal structure and session/progress operations |
| Missing identity/environment strip and owner chip | Match the reference's arrangement, using honest EnglishCamp owner/workspace labels rather than a fabricated named admin |
| Top utility pill did not match the reference | Workspace refresh, search and actionable setup/admission notices; owner settings chip |
| Active sidebar icons used a different selection style | Filled accent selection with white faceted art, keeping the distinct seven icons |
| Date selection was isolated to a dropdown | Shared Today/7D/30D/90D/year presets and inclusive custom UTC dates, validated server-side |
| Missing report download | Owner-triggered aggregate CSV for the selected period; existing page-only learner export is retained |
| Search led only to the directory | Search admin sections and up to five authorized learner results; result links open the learner drawer |
| Custom palette control was accessible only from the removed header utility | Keep presets and add the existing custom colour option to Settings |

Charts retain EnglishCamp's recorded series, palette and existing information scope. Custom report boundaries apply to registrations, event counts, awarded XP, redemptions, quiz attempts and badge awards. Cumulative totals remain labelled as cumulative. No traffic, billing, unread activity or provider availability is invented.

Learner and administrator authentication remain independent. Recovery codes, optional placement, private notes, account progress and all service caps retain the existing implementation. No database migration or credential change is needed. The preservation contract changes only for the reviewed invitation-field additions to the original signup modal; its existing styles are unchanged.

## 2026-11-16 follow-up: missing page content and email admissions

- Compared the actual AIhubtools Users section (three KpiCard panels, segmented distribution, filtered table) and Settings section (compact two-column forms) with the EnglishCamp pages. Learners now includes global account cards/distribution without changing the table's filter scope or source progress data.
- Added `/admin/security` and a distinct faceted rail icon. Actual API response totals start at activation; daily data is retained for 90 days. It exposes aggregate counts and enforced protections, and can revoke other admin sessions while preserving the current session and every learner session.
- Settings now includes a real server-saved admin display name/title, compact admission/appearance/limits cards, email setup and a separate session row. Display metadata does not alter roles, keys or authorization.
- Invitations defaults to consented access requests, not a batch-generation screen. Review/decline and approval/email follow the same table, button, KPI and modal system. Manual single-use codes remain in their own tab. Email acceptance is never labelled inbox delivery.
- Public `/invite` includes the matching request form and recipient-email field for emailed codes. The existing signup modal retains its established layout and styling, with the optional invitation-email field added. No replacement authentication provider or new password system was introduced.
- Email delivery is prepared but cannot be verified live until the owner configures a verified sending domain and Resend secrets. No fake provider configuration or real learner email is used for UI QA.

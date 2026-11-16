# Invitations by email

Visitors request an invitation on `/invite` with their name, email and consent. This does not create a learner account, consume pronunciation credit or send any email. The owner reviews requests in `/admin/invitations`, then approves and emails a single-use code. Manual invitation batches remain in the Invitation codes tab. Existing accounts still use their original name/recovery code and keep all progress, notes and badges.

## Activate delivery

1. Create a **Free** account at https://resend.com. No paid upgrade is required by this integration.
2. Add a domain or subdomain you own, such as `mail.yourdomain.com`, in Resend → Domains. Add the exact DNS records Resend provides, then wait for verified status. You cannot verify Cloudflare's shared `workers.dev` domain. A Gmail address is not a verified sending domain.
3. Create a sending-only API key restricted to that domain.
4. Cloudflare dashboard → Workers & Pages → englishcamp → Settings → Variables and Secrets. Add encrypted secrets `RESEND_API_KEY` and `INVITATION_EMAIL_FROM` (for example `EnglishCamp <invite@mail.yourdomain.com>`). Never use a `NEXT_PUBLIC_` value or commit real values to Git. Local testing uses the ignored `.dev.vars` file.
5. Refresh `/admin/settings`. Configured means the values exist and the sender has a valid format; it is not a live delivery check.
6. Submit your own name/email as a request and approve it. “Email accepted” means Resend accepted the message, not that it reached the inbox. Check the inbox and spam folder before inviting other learners. No production emails are sent by automated tests.

Reference: [Resend verified domains](https://resend.com/docs/dashboard/domains/introduction), [send API](https://resend.com/docs/api-reference/emails/send-email), [idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys), [free quotas](https://resend.com/docs/knowledge-base/account-quotas-and-limits). At implementation time, Resend documents 100/day and 3,000/month on Free. This application deliberately allows at most 30 send attempts/day and 500 per fixed 31-day window, including failed/uncertain attempts. No billing settings or existing $1 Modal cap are changed.

## Safety and delivery semantics

- Requests are owner-only metadata in D1. Public responses never disclose whether an email already requested access. Duplicate requests cannot overwrite the original name or a decision. Public requests are limited to 3/IP/hour and 100/day, with at most 500 pending reviews.
- Public request submission never calls Resend. Approval requires the independent administrator session, same-origin validation, configured mail secrets and a pending request.
- One atomic claim prevents concurrent approvals. Each provider request uses an idempotency key. Uncertain/failed sends revoke the code and return the request to pending. A stale send may be retried after two minutes; its old unredeemed token is revoked first. No plaintext invitation code is stored in D1.
- Emailed codes are bound to their recipient email. The email message supplies a link with the code in the URL fragment, not the query. The page reads and removes the fragment before submission. Legacy manual codes still work without email. Returning accounts do not need a new invitation or email authentication.
- Request consent covers storing name/email for review and sending the invitation. Email is invitation metadata, not a replacement password or an email-based recovery flow.
- The request/delivery tests use a simulated email provider to validate failure handling. They do not prove live inbox delivery; that requires the owner to configure a verified sender and complete the real test above.

The owner can reopen a declined request, or an approved request whose code is both unused and expired/revoked. Active or redeemed invitations cannot be reissued through that path. This avoids trapping a learner after expiry without issuing another account to someone who already registered.

# Invitations by email

Visitors request an invitation on `/invite` with their name, email and consent. This does not create a learner account, consume pronunciation credit or send any email. The owner reviews requests in `/admin/invitations`, then approves and emails a single-use code. Manual invitation batches remain in the Invitation codes tab. Existing accounts still use their original name/recovery code and keep all progress, notes and badges.

## Activate delivery: Brevo

Brevo is selected through `INVITATION_EMAIL_PROVIDER="brevo"` in the Worker configuration. Email sending remains unavailable until a real API key and sender are configured.

1. Create a **Free** account at https://app.brevo.com/account/register with your existing email. Complete the account profile and email verification yourself; never send a password or verification code in chat.
2. In Settings → Senders, Domains & Dedicated IPs → Senders, add `EnglishCamp` with your actual email, then verify it. Confirm that transactional email (SMTP/API) is activated. Brevo can require account review before sending; an API key alone does not prove activation.
3. Generate an API v3 key named `EnglishCamp invitations`. This is an API key, not the SMTP relay password. Keep it private.
4. Add encrypted secrets `BREVO_API_KEY` and `INVITATION_EMAIL_FROM` to Cloudflare → Workers & Pages → englishcamp → Settings → Variables and Secrets. The sender value has the form `EnglishCamp <your-verified-email>`. Use ignored `.dev.vars` for local values. No `NEXT_PUBLIC_` variable or Git commit may contain a real key.
5. Refresh `/admin/settings`. Configured means the values exist and have valid format; it is not a live provider or inbox-delivery check.
6. Submit your own name/email as a request, approve it, then check the inbox and spam folder. “Email accepted” confirms only provider acceptance. Only a real received invitation proves delivery to that inbox. Automated tests never email real learners.

Brevo may replace a free-mail sender such as Gmail with its own compliant sending address. This is a temporary provider feature, not a guarantee of inbox delivery; using your own authenticated domain is recommended later. No domain is purchased or billing plan changed by this integration.

References: [Brevo sender requirements](https://help.brevo.com/hc/en-us/articles/14925263522578-Comply-with-Gmail-Yahoo-and-Microsoft-s-requirements-for-email-senders), [transactional activation and verified senders](https://help.brevo.com/hc/en-us/articles/115000188150-Troubleshooting-Issues-with-Brevo-SMTP), [send API](https://developers.brevo.com/reference/send-transac-email), [idempotency headers](https://developers.brevo.com/docs/heterogenous-versions-batch-emails).

## Optional Resend alternative

The previous Resend integration remains available by setting `INVITATION_EMAIL_PROVIDER="resend"` with `RESEND_API_KEY` and a verified-domain `INVITATION_EMAIL_FROM`. Providers are selected explicitly; a failed send never falls through to another provider or sends a second message.

Resend requires a domain you own for delivery to learners. The shared `onboarding@resend.dev` sandbox sends only to the Resend account email. A shared `workers.dev` hostname and Gmail address cannot be verified as your sending domain.

References: [Resend verified domains](https://resend.com/docs/dashboard/domains/introduction), [send API](https://resend.com/docs/api-reference/emails/send-email), [idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys).

## Safety and delivery semantics

- Requests are owner-only metadata in D1. Public responses never disclose whether an email already requested access. Duplicate requests cannot overwrite the original name or a decision. Public requests are limited to 3/IP/hour and 100/day, with at most 500 pending reviews.
- Public request submission never calls either email provider. Approval requires the independent administrator session, same-origin validation, configured mail secrets and a pending request.
- One atomic claim prevents concurrent approvals. Each provider request uses an idempotency key. Uncertain/failed sends revoke the code and return the request to pending. A stale send may be retried after two minutes; its old unredeemed token is revoked first. No plaintext invitation code is stored in D1.
- Emailed codes are bound to their recipient email. The email message supplies a link with the code in the URL fragment, not the query. The page reads and removes the fragment before submission. Legacy manual codes still work without email. Returning accounts do not need a new invitation or email authentication.
- Request consent covers storing name/email for review and sending the invitation. Email is invitation metadata, not a replacement password or an email-based recovery flow.
- The request/delivery tests use simulated Resend and Brevo providers to validate failure handling. They do not prove live inbox delivery; that requires the owner to configure a verified sender and complete the real test above.

The owner can reopen a declined request, or an approved request whose code is both unused and expired/revoked. Active or redeemed invitations cannot be reissued through that path. This avoids trapping a learner after expiry without issuing another account to someone who already registered.

Both providers share the existing hard limit of 30 send attempts/day and 500 per fixed 31-day window. Provider changes never reset those counters or change the $1/month Modal cap. Failed and uncertain sends count against the allowance.

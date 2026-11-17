# EnglishCamp membership

The 7-day trial and **$2.00 USD monthly** PayPal integration are enabled with the dedicated live Business app. The live product, ACTIVE plan and webhook registration were checked against PayPal. Existing grandfathered profiles retain free access. No real-money payment was created or approved during acceptance testing.

## Acceptance evidence · 17 November 2026

These checks used a real PayPal **Sandbox** buyer and the deployed EnglishCamp Worker, rather than mocked provider responses:

- A synthetic invited profile received a seven-day trial. Only synthetic test profiles had their trials manually expired for checkout testing.
- The buyer approved the displayed $2 USD subscription and returned to EnglishCamp. A genuine signature-verified payment notification granted one calendar month, without a manual refresh granting access.
- Cancelling renewal through EnglishCamp returned `CANCELLED` and retained the already-paid period.
- PayPal completed a full Sandbox refund. Its genuine notification revoked that payment's entitlement; the profile and progress remained available to synchronize, while paid speech access returned HTTP 402.
- PayPal accepted a request to resend the original completed-payment event after refund. Access remained revoked. The public event-details endpoint did not provide a delivery receipt, so this is not claimed as independent proof of redelivery; automated tests separately cover duplicate and stale events.
- Both synthetic profiles and their two labelled invitations were removed. The cancelled/refunded Sandbox payment references were cleaned up, and its Sandbox webhook listener was removed before switching to live credentials.
- The five PayPal bindings were changed together; Azure, D1, invitation and AI bindings were retained. Production verification confirmed live mode, unchanged legacy-profile access, invitation protection, six signed-in pages and a usable Microsoft MP3.

The application suite contains 361 passing tests, including a regression for D1 counting cascaded deletions in `meta.changes`. TypeScript checks pass. Automated tests cover account isolation, signature rejection, payment-history lag, duplicate notifications, refund-before-payment ordering, deletion races and unchanged learning records. These automated checks do not establish real-money PayPal compatibility. No real-money purchase, live refund or future monthly renewal was performed.

## Access policy

- Migration 0010 preserves all existing learners as `legacy`. Enabling payments never forces a subscription onto them.
- Profiles created while billing is disabled also retain their existing access. Once billing is enabled with all required settings, newly created profiles receive exactly 604,800 seconds of free access.
- Invite expiry controls whether an unused code can be redeemed. It does not expire an existing profile.
- Trial expiry redirects to `/membership`. Learning records, notes and badges stay saved and can still synchronize. It blocks expensive learning endpoints until a confirmed paid period exists.
- Manual owner suspension overrides trial and payment access. Pausing a learner does **not** cancel a recurring PayPal payment; cancel renewal separately.
- AI quotas and the independent Modal $1 monthly cap remain unchanged. Membership does not promise unlimited corrections.

## Merchant configuration (server secrets only)

`PAYPAL_ENV` is exactly `sandbox` or `live`. Each environment needs its own `PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_PLAN_ID` and `PAYPAL_WEBHOOK_ID`. Keep them in ignored `.dev.vars` for development and encrypted Worker secrets for deployment; never put them into Next public environment variables or GitHub source.

Create a service product and one ACTIVE plan with a single infinite REGULAR monthly cycle: interval 1 MONTH, fixed price 2.00 USD, no trial cycle, setup fee or tax. The app manages the free period without registering a PayPal agreement. A learner approves a recurring payment only after their current free/paid period ends. The start endpoint checks the live plan details before creating a checkout.

Use an app dedicated to EnglishCamp. Register the HTTPS listener `/api/billing/webhook` for BILLING.SUBSCRIPTION.CREATED, ACTIVATED, UPDATED, CANCELLED, SUSPENDED, EXPIRED, PAYMENT.FAILED and PAYMENT.SALE.COMPLETED, REFUNDED, REVERSED. The listener verifies each notification through PayPal's signature-verification API. PayPal's simulator is not a substitute for a real sandbox subscription: its mock events cannot use that postback verification method.

## Checks to repeat when changing the payment integration

1. Sandbox: new synthetic account receives 7 days, expires safely; a legacy account stays accessible.
2. Approve one **sandbox** $2 subscription with a sandbox buyer. A browser redirect or ACTIVE status alone must not grant paid access. Confirm a completed transaction and a verified real sandbox notification.
3. Replaying notification does not extend paid access. Cancelling stops renewal while keeping the recorded paid period. Full/partial refund or reversal removes that payment's entitlement; later stale completion cannot restore it.
4. Test a second learner: checkout, status, cancellation and records are isolated. Auth, origin, plan/amount and signature checks reject tampering.
5. An unresolved checkout or renewing agreement blocks deleting the profile. Resume/reconcile the existing approval rather than creating another subscription. Actual sandbox testing returned INVALID_RESOURCE_ID (404) for the unapproved checkout. The UI offers resuming approval, while renewal cancellation is offered after approval. A 404 for a locally pending checkout keeps that state; it grants no access. Webhook reconciliation still retries missing provider records instead of acknowledging a missing payment. Pending approval is not falsely reported as cancelled. An uncertain checkout older than 24 hours intentionally requires owner review to avoid a duplicate agreement beyond PayPal's default idempotency period.
6. After live merchant verification, configure live app/plan/listener and set `BILLING_ENABLED=true` explicitly. No automatic test should use a real card or charge a real buyer.

## Operational details

Reconciliation reads the merchant's canonical subscription and its last 89 days of transactions (bounded response), then upserts the immutable payment IDs. Every confirmed correct-price payment grants one calendar month from payment time, clamped for month ends. Refund/reversal tombstones override older completion messages. PayPal cancellation preserves already-confirmed time; failed future renewals grant no new time. No raw payer details, card information, webhook bodies, personal emails or provider credentials are stored in the billing tables.

If a provider call fails or ownership/plan cannot be confirmed, return an unavailable response and keep existing records. Reconciliation is idempotent; webhook event IDs are marked only after processing so interrupted work can be retried. Review failed notifications in PayPal's dedicated app dashboard.

Sources: [Subscriptions REST API](https://developer.paypal.com/api/subscriptions/v1), [Subscription webhook events](https://developer.paypal.com/subscriptions/webhooks), [Webhook verification](https://developer.paypal.com/api/rest/webhooks/rest/).

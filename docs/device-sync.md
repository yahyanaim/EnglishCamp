# Continue on another device with QR

1. Open your name in the website header and open **Your learning session**.
2. Use an online profile. If this profile is device-only, choose **Save my progress online** first and keep its private recovery code.
3. Choose **Connect with QR code**. The current device synchronizes its saved progress and notes before generating the code.
4. Scan it using the other phone's camera. On a computer, **Copy private link** provides the same connection link.
5. Check the displayed name, then choose **Connect this device**. The dashboard opens with the existing profile. Progress, badges and saved lesson notes keep using the normal D1 synchronization; QR is only an alternative sign-in method.

The code works once and expires after five minutes. It grants access to the learning profile, so keep it private. Creating another code invalidates the old one; **Cancel QR** revokes the current one. The source device shows when a new device connects. Continue keeping the permanent recovery code for recovery when no other signed-in device is available.

Only saved online records transfer. Unsent local edits, written responses, word-bank contents and recording files are not added to cloud storage by this feature. Switching profiles keeps the existing local records isolated; active recording/unsaved-response guards still apply.

## Implementation

Apply `0005_device_links.sql` before deploying. It adds a small table with a unique active link per learner and a foreign key that cascades when that learner deletes their online profile. The server stores the SHA-256 hash of a random 192-bit token, its owner, expiry and used time. It does not store a raw QR credential or put the permanent recovery code inside a QR.

The browser generates the QR locally using the existing `qrcode` dependency. The credential is in the link fragment, not the HTTP path/query, and is removed from the visible URL when the connection page reads it. It is held briefly in page-module memory to survive the learner-scope remount, not persistent browser storage. The page also accepts a freshly scanned link when already open.

The target previews the name before explicit confirmation. Claiming uses an atomic D1 transaction: insert a session only while the link is unused and unexpired, then mark it used. Racing requests therefore cannot both obtain a session. The target receives the existing Secure/HttpOnly/SameSite cookie and the standard sanitized progress snapshot. Notes are subsequently fetched through the existing authenticated notes endpoint.

Creation, cancellation and status checks require the owning session and learner header. Preview/claim require a correctly shaped token, exact same-origin POST and per-IP request limits. Responses are private/no-store. No external QR service, database, paid Cloudflare resource or new AI key is involved.

## UI

English coach now shares the library's PageBanner, BackButton, shadcn Card, selectors and Button components. The panel spans the standard content area; the mascot sits beside its title at 32px. Conversation settings, messages, composer and footer have one consistent boundary and spacing rhythm. Message history grows with content instead of reserving a large empty area, and only the history scrolls when replies arrive. Palette tokens, dark mode, mobile touch targets and existing Microsoft playback are retained. Course banks, scoring and YouTube frames are unchanged.

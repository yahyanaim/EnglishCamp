# Violet UI and local session profiles

31 October 2026. This update changes presentation and adds an optional local name profile. Authored lessons, questions, answer keys, scoring, video selections and timestamps remain unchanged.

## Violet theme

Shared primary, information, link, focus, native checkbox/radio and course accent roles now use violet shades. Legacy blue, sky, cyan and indigo Tailwind utilities resolve to the same violet palette. Remaining literal blue interface colours were replaced, including navigation, quiz decoration and the dashboard. Dark surfaces use neutral violet greys. Natural colours in lesson photographs, fruit avatars and third-party video content are not recoloured. Success/error feedback retains its meaning.

## Session-only sign-in

- The top-left button asks only for a name, with no email or password.
- An original inline SVG fruit avatar is chosen locally from eight options.
- `sessionStorage` stores the name, chosen fruit and sign-in number. No network request is made by sign-in, restoration or sign-out.
- The hashtag includes a tab-local sequential number. It is not a global registration count or a globally unique account ID.
- The same profile survives navigation and reload. A fresh tab has a separate session. Browser restoration can restore session storage.
- Signing out removes the profile while retaining the existing local course progress.
- A blocked-storage fallback works in memory and explains that reload will remove the profile.
- The sign-in dialog explains that EnglishCamp does not collect profile data on a server, and that optional videos connect to YouTube only when loaded.

## Course and video presentation

Dashboard course cards now have compact violet identity chips, course details, module counts, actual saved progress and a direct course link. Course overviews use compact typography, horizontal actions and a two-column goals area that stacks on mobile. Module rows share the same button sizing and spacing.

The lesson video player has a violet toolbar, a local play facade and a compact footer. No iframe or remote thumbnail loads before the learner selects **Load lesson video**. Existing sources, start/end times, publisher links, lesson focus and written alternatives remain available. Native YouTube controls remain within the third-party player after loading.

The optional matching drill now shuffles after hydration, so its server and browser documents agree on reload. Its pairs, answer checks and XP logic are unchanged.

## Verification

The tests retain byte-level protection for 166 existing teaching, state, scoring and font-definition files. Profile tests cover random fruit selection, tag formatting, sequential numbers, restoration, invalid storage and progress preservation. Existing course/video tests cover all 100 module associations and the original sources and timestamps, with the updated opt-in loading expectation. Browser checks cover mobile and desktop layouts, theme contrast, remaining blue accents, session isolation and video loading.

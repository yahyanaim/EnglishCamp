# Free Cloudflare hosting

Deployed on 6 November 2026 for EnglishCamp 1.0.0 using a Cloudflare Worker with Static Assets and a configuration that fits the Workers Free limits. No paid Cloudflare binding, container, database or custom domain was added.

**Live site: [EnglishCamp](https://englishcamp.yahyanaim2001.workers.dev/).** Microsoft Azure Speech is configured on the live Worker using encrypted secrets, with the resource region set to `northeurope`.

Live verification passed for the homepage, Vocabulary, grammar cheat sheet, course overview, a direct lesson, its exercise, mock exams and Shadowing. Old URLs redirect with query parameters intact, missing pages return 404, and `.dev.vars` is inaccessible. The public speech API returned HTTP 200 with valid MP3 audio for `absorb`; the live Vocabulary page played `acceleration` and returned to its ready state without an audio error. The phone check at 390 px had no horizontal overflow. Bundled MP3 and WAV files were delivered successfully; Range requests returned full HTTP 200 responses rather than partial 206 responses, so early seeking still depends on browser buffering.

## What is deployed

The same Next.js pages are exported as static HTML, CSS and JavaScript. All four courses, 100 lessons, 100 exercise routes and four course quizzes are generated. The existing UI, fonts, content, progress stores, notes and recordings are retained. Cloudflare serves static assets directly; a small Worker handles API requests and old-link redirects.

The build runs in `.cloudflare-build/app`; it does not change the source route directories or the normal local Next.js configuration. Public English URLs are generated as actual English routes so direct links and client navigation agree. Older German URLs and `/en` or `/ar` prefixes redirect to their English equivalents. Query parameters are retained. Invalid lesson IDs produce a 404.

No Containers, paid plan, database, R2 bucket, KV namespace or Durable Object is needed. The legacy Python helper is retained for offline recording generation; Next.js and Cloudflare both use the shared Microsoft REST adapter for live speech.

## What works without extra service keys

- Courses, grammar, vocabulary, quizzes, local recording/replay, notes, printable materials and browser-local progress.
- All bundled course, mock and other learning recordings.
- Existing YouTube frames, subject to publisher embedding and availability.
- Objective placement questions and listening questions with bundled recordings.

On-demand synthesis for text without a bundled recording needs a Microsoft Speech resource. Automatic speaking/writing assessment needs an OpenAI API key and separately billed API usage. These services are **not included in free Cloudflare hosting**. They return a configuration message when unavailable; the app does not invent an assessment or silently use a robotic browser voice. Paid assessment is disabled in `wrangler.jsonc` by default.

## Future deployments through GitHub

The first deployment was made through Wrangler. Automatic deployment on every GitHub push has not been connected; use the setup below if you want that workflow. The Microsoft secrets are already installed on the current Worker and should remain server secrets.

1. Create a Cloudflare account and keep the Workers **Free** plan.
2. Open **Workers & Pages → Create application → import/connect a Git repository**. Choose `yahyanaim/EnglishCamp` and production branch `main`.
3. Use these settings:

| Setting | Value |
| --- | --- |
| Root directory | Repository root (`/`) |
| Node version | Node 22 or newer; set `NODE_VERSION=22` if needed |
| Build command | `npm run build:cloudflare` |
| Deploy command | `npm run deploy:cloudflare` |
| Wrangler configuration | `wrangler.jsonc` |

Cloudflare's build environment installs dependencies from `package-lock.json`. Include development dependencies because Next.js, TypeScript, Tailwind and Wrangler are build tools. Do not set `NODE_ENV=production` during dependency installation if that omits them.

4. Deploy. Cloudflare assigns the Worker a `workers.dev` address after the account's Workers subdomain is configured. The `englishcamp` name can be changed in `wrangler.jsonc` if that Worker name is already used in your account.
5. Add a custom domain later through **Settings → Domains & Routes → Add → Custom domain**. No domain is required for the initial `workers.dev` deployment.

See [Workers GitHub integration](https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/github-integration/) and [Workers build configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/).

Alternatively, from a local checkout after the account exists:

```sh
npm ci
npm run build:cloudflare
npm run check:cloudflare
npx wrangler login
npm run deploy:cloudflare
```

`check:cloudflare` is a dry run and does not publish. `deploy:cloudflare` uploads the existing build; rebuild first after every source change. Do not deploy from a stale `out` directory.

## Optional Microsoft neural speech

Direct Microsoft Azure Speech is now shared by the Cloudflare Worker and the normal Next.js server. See the [Arabic setup walkthrough](microsoft-speech-setup-ar.md). The local Next.js server reads `.env.local`; Wrangler reads `.dev.vars`. The legacy Python helper is retained for offline recording generation and is not called by the live speech route.

Create an Azure Speech resource with the **Free F0** pricing tier. Set these Cloudflare Worker secrets under **Settings → Variables and Secrets**:

| Secret | Value |
| --- | --- |
| `AZURE_SPEECH_KEY` | The Speech resource key |
| `AZURE_SPEECH_REGION` | The resource's exact region; the configured EnglishCamp resource uses `northeurope` |

Use server secrets, never `NEXT_PUBLIC_*` variables. Do not commit keys or paste them into chat. For local Worker testing, copy `.dev.vars.example` to `.dev.vars` and set values there; that file is ignored by Git. Avoid putting Cloudflare service secrets into frontend build variables.

The adapter uses `en-GB-SoniaNeural` and `ar-SA-ZariyahNeural`, retaining the current voices. Fixed learning text is checked against the generated catalogue; personal text still requires the existing learner consent. Origin checks, bounded request/audio sizes, limited concurrency and provider errors are enforced. The per-isolate request guard is supplemental, not a global quota or authentication system; Azure's resource quota is authoritative.

F0 currently includes **500,000 neural TTS characters per month** and **20 transactions per minute**. Keep the resource on F0 if you want a hard free service choice; do not upgrade it to a paid tier. Azure account eligibility or registration requirements are separate from Cloudflare. Bundled recordings do not consume this quota. [Microsoft pricing](https://azure.microsoft.com/en-us/pricing/details/speech/), [Speech quotas](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/speech-services-quotas-and-limits), [REST synthesis](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/rest-text-to-speech).

On 6 November 2026, the real Microsoft resource in North Europe was verified through the local Cloudflare runtime: `absorb` returned HTTP 200 with valid MP3 audio, and the Vocabulary page successfully played `acceleration`. The local key copy is kept in the ignored `.dev.vars` file, and the hosted copy is stored as an encrypted Worker secret. **The local file is not uploaded during deployment**. The hosted HTTPS origin was tested separately after configuring the two Worker secrets, with the successful results recorded above.

## Optional automatic assessment

Keep `ENGLISHCAMP_SPEAKING_ENABLED=false` for a deployment with no OpenAI costs. To enable assessment later, configure `OPENAI_API_KEY` as a Worker secret and change the enabled flag to `true` in `wrangler.jsonc`. The shared assessment handlers preserve per-recording consent, origin checks, size limits, task validation and evidence-based result parsing. Learners must still approve each submission. Do not advertise automatic speaking/writing grading until this service has been configured and checked on the deployed origin.

Workers Free permits only 10 ms of CPU work per API request. Network wait time does not count, but parsing a large recording can exceed that budget. Assessment has not been load-tested on a live Free account. If it exceeds the allowance, leave it disabled on the free deployment; this setup does not automatically upgrade billing. [Cloudflare CPU limits](https://developers.cloudflare.com/workers/platform/limits/).

## Progress and privacy

Progress remains tied to the learner's local profile and the browser/site storage already used by the project. Hosting does not create a central learner database. Localhost, a `workers.dev` address and a custom domain are **different origins**: existing local progress will not automatically transfer between them. Clearing site data can remove it. A custom-domain change later has the same implication. Cloudflare hosting does not add cloud account synchronization.

The static build copies an explicit allowlist of source/public/build files. It never copies `.env.local` or `.dev.vars` into the public output. Worker observability logging is disabled by default to avoid adding request logs to the application. Hosting and third-party media providers still process requests under their own policies; this is not a claim that no service processes connection data.

## Free limits and build verification

Current Workers Free limits are 20,000 static files, 25 MiB per asset, 64 MiB uncompressed Worker code, 128 MB memory, 100,000 Worker requests/day and 10 ms CPU/request. Static-asset requests served without invoking the Worker do not count against the Worker request allowance. Selective Worker-first routing is used for APIs and redirects; existing page/assets use asset-first routing. [Cloudflare limits](https://developers.cloudflare.com/workers/platform/limits/), [static asset routing](https://developers.cloudflare.com/workers/static-assets/routing/worker-script/).

The build rejects assets exceeding the free file-count or individual-size limits. `.cloudflare-build/manifest.json` records generated page coverage. `npm run check:cloudflare` reports the real Worker bundle size without publishing. Generated build output, local runtime state and secrets are excluded from Git.

Local validation on 5–6 November 2026: 2,100 output files; largest asset 23,667,884 bytes; Worker bundle approximately 5 MiB uncompressed. All 310 exported HTML documents were checked in the local Cloudflare runtime, along with legacy redirects, unavailable optional APIs and bundled MP3/WAV delivery. The full suite subsequently passed 274 tests, including the shared Azure adapter, and TypeScript checking passed. Desktop navigation, interactive answer feedback, named sign-in, saved reading state after refresh and a 390 px phone viewport were checked. Initial checks used a simulated Microsoft response; the later real Azure and public-site checks are recorded above. OpenAI assessment was not called. Lint still reports the existing `@next/next/no-assign-module-variable` error in `src/lib/courseProgress.ts:33`, plus existing warnings; it does not block the existing build configuration. No progress or UI source was edited for this hosting work.

```sh
npm run build:cloudflare
npm run check:cloudflare
npm run preview:cloudflare
# Local preview: http://127.0.0.1:3034
npm test
npx tsc --noEmit
```

Before publishing, check a course, direct lesson, English practice route, old bookmark, mock exam, bundled recording and a refresh after saving local progress. Test a narrow phone viewport as well as desktop.

The dependency audit still flags the project's existing Next.js 14/build-tool dependencies. This deployment exports the site and does not publish the Next.js server, image optimizer, Server Actions, Python subprocess or build tools. A framework upgrade is a separate maintenance task; a successful static export is not a claim of an advisory-free dependency tree.

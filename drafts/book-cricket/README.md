# Book Cricket website — publication handoff

Prepared 7 October 2026. Launch price: **Free** (confirmed by S Ballani).

## What is prepared

- `book-cricket.astro`: promotional page with original app icon, corrected page-26 nostalgia artwork, eight gallery screens, two standard-iPhone screens, two 28-second device previews and a 46-second captioned walkthrough, clickable video chapters, scoring instructions, six-book shelf, FAQ and privacy/support links.
- `privacy.astro`: updated for app-private preferences, direct nearby names/state, external references and separate website analytics.
- `support.astro`: app-specific setup/scoring/fold/nearby/reader help and support email.
- `assets/`: current native screenshots and H.264 MP4, with English WebVTT instructions. No third-party video player/analytics, autoplay, account, embedding service or invented App Store URL.
- The website uses the existing Scaling Human BaseLayout and design tokens, as G Glass / RT Library do. Screens are actual SwiftUI app output from simulator capture; DEBUG-only hooks stage deterministic pages without changing the production UI or Release binary.

## Where the files are staged

Websites project: `/Users/c0smicdirt/Documents/Startup/Websites/scalinghuman-ai`.

- Publication of the webpage together with privacy/support was authorized on 7 October 2026. The public prelaunch route is `src/pages/apps/book-cricket.astro`; the source copy remains in `drafts/book-cricket/`. It displays Coming soon until the approved listing is available.
- Privacy and support are additionally prepared as real source routes under `src/pages/apps/book-cricket/`. These must be deployed before App Review and checked publicly; writing/building locally does not publish them.
- All referenced media is under `public/assets/apps/book-cricket/`.
- A complete isolated preview is generated under BookCricket’s `Website/preview-project/`. Production builds now include all three Book Cricket routes.

## Preview

From `Website/preview-project`, use the existing Node/Astro install:

```sh
node node_modules/astro/bin/astro.mjs dev --background --host 127.0.0.1 --port 4323
node node_modules/astro/bin/astro.mjs dev status
node node_modules/astro/bin/astro.mjs dev stop
```

Open `http://127.0.0.1:4323/apps/book-cricket`.

## Publish all three pages together

Use the Websites project’s existing GitHub Pages workflow. Review its pending changes before committing/pushing so unrelated work is preserved. Verify these public URLs return the intended pages:

- https://scalinghuman.ai/apps/book-cricket
- https://scalinghuman.ai/apps/book-cricket/privacy
- https://scalinghuman.ai/apps/book-cricket/support

The App Store support link uses the published app-specific support page; its privacy link uses the prepared app-specific route. Do not substitute a localhost preview URL in App Store Connect.

## Update after App Store approval

1. Add the actual approved listing URL to `appStoreUrl`. The default is null and displays Coming soon; no fabricated download link.
2. Nearby multiplayer is now enabled in website copy after the user confirmed physical iPhone/iPad gameplay. Keep copy aligned with shipping capabilities; detailed reconnect/permission QA remains documented separately.
3. Refresh the existing public page with the approved listing URL.
4. Update the existing Book Cricket card from Coming soon to App Store. Pricing is confirmed free; preserve the G Glass/RT Library entries.
5. Build, check screenshots/video/captions on mobile and desktop, then deploy with the existing workflow.

## Rebuild media and preview

From BookCricket, `Scripts/capture_submission_media.py` captures fresh native screens and runs/wicket recordings. `Scripts/render_walkthrough.swift` uses Apple AVFoundation to assemble the silent walkthrough; `Website/walkthrough-plan.json` specifies its chapters. `Scripts/stage_website.py` copies only these Book Cricket files to Websites and refreshes the isolated preview; it never commits/pushes/deploys.

## Verification

Final preview and production-source builds passed. The local browser checks passed for video playback (46 seconds), captions, chapter seeking, FAQ, support/privacy links and 390px mobile layout. Proof screenshots and the check record are in `qa/`. All three public routes were deployed and verified HTTP 200 on 7 October 2026 (commit f04e778; GitHub Pages run 37579058956). Screenshot normalization for store delivery is recorded separately in `AppStore/Screenshots/README.md`.

## Published URLs

- https://scalinghuman.ai/apps/book-cricket
- https://scalinghuman.ai/apps/book-cricket/privacy
- https://scalinghuman.ai/apps/book-cricket/support

Publication record: `publication.json`. The page is marked Coming soon and the approved App Store download URL is still pending.

## 7 October final preparation update

Nearby play copy reflects user-confirmed physical gameplay. The page includes the corrected 26/27 nostalgia illustration, both processed 28-second gameplay previews with captions, source-licence reading/export help and ScalingHuman AI copyright ownership. Coming soon remains until App Store approval. See publication.json for deployment verification.

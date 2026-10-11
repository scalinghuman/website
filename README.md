# scalinghuman.ai

The [public project directory](https://scalinghuman.ai/#projects) for Scaling
Human's personal, noncommercial experiments with hardware, AI, apps, games and
local computing. Built with [Astro](https://astro.build).

| Place | Purpose |
|---|---|
| [Website](https://scalinghuman.ai/) | Project pages, app downloads, privacy and support |
| [Experiments](https://github.com/scalinghuman/experiments) | Project briefs, shared source artifacts and release downloads |
| [Scaling Human](https://github.com/scalinghuman) | Organization overview and public repositories |
| [Srikantha Ballani](https://github.com/c0smicdirt) | Maintainer's profile and other interests |

Source access differs by project. The website and experiments collection do not
imply that private app implementations are published or that all source has an
unrestricted open-source license.

## Local development

Requires Node.js 22.12 or later.

```bash
npm ci
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build and check

```bash
npm run build
npm run check:links
npm run preview
```

Static output lands in `dist/`. Main-branch pushes are built, checked and deployed
by the existing GitHub Pages workflow. See [DEPLOY.md](DEPLOY.md) for the custom
domain and DNS configuration. Cloudflare Web Analytics remains optional through
the existing `PUBLIC_CF_BEACON_TOKEN` setting.

## Stable published routes

App routes work with their existing extensionless addresses and `.html` files.
Keep both forms reachable. The homepage preserves `#projects`, `#work` and
`#experiments` for existing links.

| Path | Purpose |
|---|---|
| `/` | Project directory, grouped by availability |
| `/contact.html` | Maintainer and contact links |
| `/privacy.html` | Food Scanner and Glasshole privacy |
| `/support.html` | Food Scanner and Glasshole support |
| `/apps/foodscanner` | Food Scanner |
| `/apps/glasshole` | Glasshole AI |
| `/apps/streaming-devices-kids-meal-mode` | Kids Meal Mode |
| `/apps/qwen38-27b-eval` | Local AI game experiment |
| `/apps/book-cricket` | Book Cricket |
| `/apps/book-cricket/privacy` | Book Cricket privacy |
| `/apps/book-cricket/support` | Book Cricket support |
| `/apps/ring-local` | Ring Local, in development |
| `/apps/strap-local` | Strap Local, in development |
| `/apps/rt-library` | RT Library, a separate co-op utility |
| `/apps/rt-library/privacy` | RT Library privacy |
| `/apps/rt-library/support` | RT Library support |

[Link policy](docs/link-policy.md) and [published URL contract](docs/published-links.json)
explain how to reorganize content while preserving these paths, APKs and App Store
links. The deployment check catches missing local links and removed contract URLs.

## Content and artwork

Edit `src/data/site.ts` for the maintainer, collection navigation and project
catalog. Each project has a stable `slug`, an availability status and a project
brief URL. App detail pages use the slug lookup, so card order can change safely.
Keep new project status consistent with its project page and public brief.

The tracked artwork under `public/assets/logos/` supplies the header mark and
homepage neural-network illustration. App icons live under `public/assets/apps/`.

Public copy describes personal, noncommercial experiments. Keep `products` empty
until work authorization and an intentional launch.

## Related domains

- opensubstrate.io
- ternarythinking.com
- consciousmatter.org

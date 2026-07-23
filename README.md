# scalinghuman.ai

Public hub for Scaling Human free experiments. Built with [Astro](https://astro.build).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Build

```bash
npm run build
npm run preview
```

Static output lands in `dist/`. Deploy `dist/` to Cloudflare Pages, Vercel, or GitHub Pages.

## Routes (stable for App Store)

| Path | Purpose |
|------|---------|
| `/` | Hub — featured projects only |
| `/contact.html` | Contact / person links |
| `/privacy.html` | Food Scanner + Glasshole privacy |
| `/support.html` | Food Scanner + Glasshole support |
| `/apps/foodscanner` | Food Scanner |
| `/apps/glasshole` | Glasshole AI |
| `/apps/streaming-devices-kids-meal-mode` | Kids Meal Mode |
| `/apps/rt-library` | RT Library (de-emphasized; not a featured experiment) |
| `/apps/rt-library/privacy` | RT Library privacy |
| `/apps/rt-library/support` | RT Library support |

## Logo

Drop the final mark at:

```
public/assets/logos/scalinghuman.svg
```

A placeholder SVG is in place until the design is ready.

## Person & experiments content

Edit `src/data/site.ts` for:

- Display name, email, GitHub, LinkedIn, X
- Featured experiments list (homepage cards)

Public copy is framed as free personal/public projects (not founder/commercial operator language). Keep `products` empty until work authorization and an intentional launch.

## Related domains (separate projects, later)

- opensubstrate.io
- ternarythinking.com
- consciousmatter.org

## Deploy

See [DEPLOY.md](./DEPLOY.md) for GitHub Pages + Spaceship DNS.

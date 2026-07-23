# Deploy scalinghuman.ai

## Stack

- **Repo:** `scalinghuman/website`
- **Host:** GitHub Pages (Actions build of Astro → `dist/`)
- **Domain registrar:** Spaceship (keep renewal there)
- **Custom domain:** `scalinghuman.ai` (+ optional `www`)

## Automated deploy

Push to `main` runs `.github/workflows/deploy.yml` (build + Pages).

```bash
npm run build   # local check
git push origin main
```

## Spaceship DNS (typical GitHub Pages)

In Spaceship → domain → DNS, keep (or set):

| Type | Host | Value | Notes |
|------|------|--------|------|
| **A** | `@` | `185.199.108.153` | GitHub Pages |
| **A** | `@` | `185.199.109.153` | |
| **A** | `@` | `185.199.110.153` | |
| **A** | `@` | `185.199.111.153` | |
| **CNAME** | `www` | `scalinghuman.github.io` | org Pages |

If Spaceship already points at GitHub for this domain, you may not need DNS changes—only the **Pages custom domain** moves to the new repo.

## Domain cutover (from experiments → website)

Old site: `scalinghuman/experiments` Pages source `/docs`.  
New site: `scalinghuman/website` Pages via Actions.

1. In **website** repo → Settings → Pages → custom domain `scalinghuman.ai` → enable HTTPS.
2. Remove custom domain from **experiments** Pages (or leave docs on `*.github.io` only).
3. Wait for DNS/HTTPS green checks.
4. Verify: `https://scalinghuman.ai/`, `/privacy.html`, `/support.html`, app routes, App Store links.

## Optional: Cloudflare (visits + region)

1. Add domain to Cloudflare (free); keep **registration** at Spaceship.
2. Set Spaceship nameservers to Cloudflare’s.
3. Import/copy the A/CNAME records above (or CF proxy orange-cloud).
4. Enable **Web Analytics** for country/region stats.

## Local

```bash
npm install
npm run dev      # http://127.0.0.1:4321
npm run build && npm run preview
```

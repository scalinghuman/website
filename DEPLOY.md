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

## Cloudflare Web Analytics (keep GitHub Pages hosting)

Privacy-first visit stats (pages, referrers, countries) **without** moving host
or changing Spaceship DNS.

### One-time (you + script)

1. Free account: https://dash.cloudflare.com/sign-up  
2. **Web Analytics** → Add a site → hostname `scalinghuman.ai`  
3. Use the **JavaScript snippet** setup (not “automatic” DNS).  
4. Copy the **token** from the snippet (`data-cf-beacon` → `token`).  
5. On this machine:

```bash
cd Documents/Startup/Websites/scalinghuman-ai
./scripts/setup-cf-analytics.sh
```

That stores the token in:

- **macOS Keychain** (`scalinghuman-cf-web-analytics`)
- local **`.env`** (gitignored)
- GitHub Actions secret **`PUBLIC_CF_BEACON_TOKEN`** on `scalinghuman/website`

6. Push (or re-run deploy) so production builds include the beacon:

```bash
git push origin main
# or: gh workflow run "Deploy to GitHub Pages" --repo scalinghuman/website
```

Dashboard: Cloudflare → **Web Analytics** → `scalinghuman.ai`.

### Optional later: Cloudflare DNS (still GitHub origin)

Only if you want CF proxy/CDN in front of Pages. Keep domain **registered** at
Spaceship; point nameservers to Cloudflare; keep A/CNAME → GitHub. Not required
for Web Analytics.

## Local

```bash
npm install
npm run dev      # http://127.0.0.1:4321
npm run build && npm run preview
```

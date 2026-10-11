# Published links and repository organization

The website is the public project directory. `scalinghuman/experiments` is the
personal, noncommercial collection of project briefs, published source and
downloads. The organization profile and the maintainer's profile point to both.
Private implementations remain private and link back to their public briefs.

Project grouping, titles and README navigation can change without moving URLs.
GitHub Projects boards are tracking metadata; creating one does not relocate code.

## Preserve these addresses

`published-links.json` records the website's existing pages and extensionless
aliases, fragment identifiers, APK download and external App Store, release,
guide and experiment-hosting links. Do not remove one as part of a cosmetic
reorganization. Add new addresses as they become published.

Run `npm run build` and `npm run check:links` before publishing. The deployment
workflow checks the built pages, local assets, fragments and this contract.
This is a static check; it does not verify third-party uptime or App Store Connect
settings. Verify live responses after deployment.

## Changes that need a migration

| Change | What can break | Required migration |
|---|---|---|
| Move an app, support or privacy page | Website bookmarks and URLs configured in App Store Connect | Keep the old page or an explicit redirect, test both URLs, then update the listing |
| Move or rename a GitHub document or source directory | `blob`, `tree`, `raw` links and relative README links | Keep an old-path document pointing to the new location; update all known links |
| Delete a release asset, rename its file or remove its tag | Direct companion APK downloads | Keep the original published release and asset; publish newer versions alongside it |
| Rename or transfer a repository | GitHub Pages paths, integrations, local remotes and workflows | Audit Pages and consumers first; keep published addresses reachable |
| Change a website fragment identifier | Links such as `/#projects`, `/#work` and `/#experiments` | Retain the old identifier as an anchor |
| Change an organization or account name | Profile, repository, Pages and integration URLs | Treat as a separate migration; inspect redirects and update consumers |

GitHub redirects most repository links after a rename, but GitHub Pages project
URLs and references to an action hosted in the renamed repo do not get the same
protection. Reusing the old repository name removes the repository redirect.
See [GitHub's repository rename documentation](https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository).

The site uses GitHub Pages with the `scalinghuman.ai` custom domain. Cloudflare
Web Analytics uses the existing optional beacon configuration. Navigation changes
do not require a hosting or analytics migration.

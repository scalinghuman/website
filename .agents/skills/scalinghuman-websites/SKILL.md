---
name: scalinghuman-websites
description: Update and publish scalinghuman.ai project pages from any project folder. Use for existing or new Scaling Human projects, portfolio copy, support, privacy and contact updates.
---

# Scaling Human webpages

Use `scalinghuman/website` for `scalinghuman.ai`. Locate its actual checkout by its
Git remote, not the current chat folder or a copied page. Read that checkout's
`AGENTS.md` and `docs/website-workflow.md` before editing. If the checkout is
unavailable, read https://github.com/scalinghuman/website/blob/main/docs/website-workflow.md
and clone it into an allowed workspace when needed.

Keep page content, shared catalog status, affected support/privacy pages and
project briefs consistent. For new projects, add the stable page and alias to
`docs/published-links.json`, and add the website workflow pointer to the project's
README and `AGENTS.md`. Avoid em dashes in authored copy.

Run `npm run check` in the website checkout and inspect changed pages on desktop
and narrow phones. Publish within the user's authorized scope. A project folder
change or a Git push alone is not publication: wait for the exact commit's Pages
workflow and live verification to succeed. Record its revision, public URLs and
visual evidence. Do not publish private app source or change hosting as a side
effect of updating pages.

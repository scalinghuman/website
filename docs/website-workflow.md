# Update project webpages from any project

`scalinghuman/website` is the source for `scalinghuman.ai`, including project pages,
the directory, privacy, support and contact. A change in an app repository or a
new local project folder does not deploy to that domain by itself.

The experiments repository owns project briefs, shared artifacts, its own GitHub
Pages demos and release downloads. App repositories own implementations. Update
those only when the task also changes their public claims or artifacts.

## Starting in any folder

Locate an existing checkout whose remote is `https://github.com/scalinghuman/website.git`
or the equivalent SSH address. Inspect its status and current branch before
editing. Fetch the remote and integrate current upstream changes without
discarding local work. If there is no suitable checkout, clone that repository
into an allowed workspace. Do not edit an archived copy of a webpage and treat it
as published. Keep the actual checkout and commit in the task handoff.

Use the shared `scalinghuman-websites` skill, maintained in
[.agents/skills/scalinghuman-websites](../.agents/skills/scalinghuman-websites/SKILL.md).
On the maintainer's machine, the user skill and global Codex instructions point
to this workflow so it can be found from new project folders. On a different
machine, install the skill or read this document explicitly.

## Existing projects

Edit the real page under `src/pages/` and shared catalog data in
`src/data/site.ts`. Update support, privacy, the homepage or the public brief when
the change affects them. Keep availability claims tied to evidence. Preserve
published page addresses, anchors, downloads and App Store links.

## New projects

Choose a stable slug, add the catalog entry and project page, and add the new
page and extensionless alias to `docs/published-links.json`. Use existing layouts,
navigation and CSS. Record the public page, brief, source repository and release
location in the project's README. Keep private implementation details private.
Add the following pointer to a new project's `AGENTS.md`:

```markdown
For scalinghuman.ai page changes, use scalinghuman/website and read
https://github.com/scalinghuman/website/blob/main/docs/website-workflow.md.
Update the actual website checkout, preserve published URLs, and verify the
deployed commit and changed pages before reporting publication complete.
Avoid em dashes in authored copy.
```

## Validate and publish

From the website checkout:

```bash
npm run check
```

This builds all pages, preserves the published URL contract, rejects em dashes
including captions and accessibility copy, and checks for joined words around
inline links and emphasis. Registering every built page prevents a new project
from bypassing the URL contract. A deliberately joined word can use
`data-allow-joined-text` on its inline element; document the reason locally.

Inspect changed pages at desktop and narrow phone widths, including link spacing,
wrapping, button gaps and keyboard focus. Build checks do not replace visual QA.
Use `astro dev --background` and stop the preview server when finished.

When publication is authorized, commit only task changes and push to `main`
through the normal Git workflow. Pull requests run the same pre-deployment checks.
Main pushes build and deploy through GitHub Pages, then automatically verify the
live commit, page and caption hashes, aliases and download availability. GitHub
Pages remains the host; the existing Cloudflare beacon stays in use.

Wait for the workflow for the exact commit to finish successfully, including its
live verification job. To check the deployment yourself:

```bash
npm run check:live -- --revision <full-published-commit-sha>
```

`/deployment.json` identifies the deployed revision and file hashes. A push or a
local build alone is not proof of publication. Record the commit, workflow result,
public URLs and visual evidence in the handoff. Report any failed checks honestly.

## Writing and layout defaults

Avoid em dashes. Prefer periods, commas, colons, parentheses or a rewrite.
Maintain personal, noncommercial framing and accurate project status. Keep
Smart Ring Local and Smart Strap Local pages independent, with their own rights
contact sections. Preserve HTML-aware whitespace handling (`compressHTML: true`)
and use shared prose styles for long URLs and code blocks.

The automation protects tested text and URL invariants. It cannot infer every
future content dependency, verify hardware claims, update App Store Connect, or
guarantee that an agent starting on another machine has the local skill installed.

Reference: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

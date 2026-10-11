import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, relative, join } from "node:path";

const root = resolve("dist");
const contract = JSON.parse(readFileSync("docs/published-links.json", "utf8"));
const pages = new Map();
const failures = [];
const decode = (value) => value.replaceAll("&amp;", "&").replaceAll("&#39;", "'").replaceAll("&quot;", '"');

function collect(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) collect(path);
    else if (entry.name.endsWith(".html")) {
      const html = readFileSync(path, "utf8");
      pages.set(`/${relative(root, path)}`, {
        ids: new Set([...html.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => decode(match[1]))),
        links: [...html.matchAll(/\s(?:href|src|poster)=["']([^"']+)["']/g)].map((match) => decode(match[1])),
      });
    }
  }
}

function targetFor(pathname) {
  const path = decodeURIComponent(pathname);
  const candidates = path === "/" ? ["/index.html"] : [path, `${path.replace(/\/$/, "")}.html`, `${path.replace(/\/$/, "")}/index.html`];
  return candidates.find((candidate) => existsSync(join(root, candidate)) && statSync(join(root, candidate)).isFile());
}

if (!existsSync(root)) throw new Error("Build the website before checking links: npm run build");
collect(root);
const linkedUrls = new Set();
let checked = 0;

for (const [path, page] of pages) {
  for (const link of page.links) {
    const url = new URL(link, `${contract.site}${path}`);
    linkedUrls.add(url.href);
    if (url.origin !== contract.site) continue;
    checked++;
    const target = targetFor(url.pathname);
    if (!target) failures.push(`${path}: missing ${link}`);
    else if (url.hash && pages.has(target) && !pages.get(target).ids.has(decodeURIComponent(url.hash.slice(1)))) {
      failures.push(`${path}: missing fragment ${link}`);
    }
  }
}

for (const route of [...contract.routes, ...contract.aliases, ...contract.downloads]) {
  if (!targetFor(route)) failures.push(`Published path removed: ${route}`);
}
for (const [path, anchors] of Object.entries(contract.anchors)) {
  for (const anchor of anchors) {
    if (!pages.get(path)?.ids.has(anchor)) failures.push(`Published anchor removed: ${path}#${anchor}`);
  }
}
for (const url of contract.publishedExternal) {
  if (!linkedUrls.has(url)) failures.push(`Published external link removed: ${url}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${pages.size} pages and ${checked} internal references. Published paths, fragments, downloads and external links are preserved.`);
}

import { readFileSync } from "node:fs";
import { relative, join } from "node:path";
import { parse } from "parse5";
import { contract, distRoot, filesUnder, projectRoot, publicPath } from "./site-files.mjs";

const failures = [];
const emDash = /\u2014|&mdash;|&#0*8212;|&#x0*2014;/i;
const inline = new Set(["a", "strong", "em", "code", "b", "i"]);
const flow = new Set(["p", "li", "dt", "dd", "blockquote", "figcaption", "h1", "h2", "h3", "h4", "h5", "h6"]);
const block = new Set([...flow, "div", "section", "ul", "ol", "table", "pre", "br", "hr"]);
const wordEnd = /[\p{L}\p{N}]$/u;
const wordStart = /^[\p{L}\p{N}]/u;
const text = (node) => node.nodeName === "#text" ? node.value : (node.childNodes ?? []).map(text).join("");
const attr = (node, name) => node.attrs?.find((item) => item.name === name)?.value;

function inspect(node, path, ancestors = []) {
  if (["script", "style", "pre"].includes(node.tagName)) return;
  if (inline.has(node.tagName) && flow.has(node.parentNode?.tagName) && attr(node, "data-allow-joined-text") === undefined) {
    const siblings = node.parentNode.childNodes;
    const index = siblings.indexOf(node);
    const before = siblings.slice(0, index).reverse().find((sibling) => text(sibling));
    const after = siblings.slice(index + 1).find((sibling) => text(sibling));
    const value = text(node);
    if (!block.has(before?.tagName) && wordEnd.test(text(before ?? {})) && wordStart.test(value)) {
      failures.push(`${path}: missing space before <${node.tagName}> ${JSON.stringify(value.slice(0, 70))}`);
    }
    if (!block.has(after?.tagName) && wordEnd.test(value) && wordStart.test(text(after ?? {}))) {
      failures.push(`${path}: missing space after <${node.tagName}> ${JSON.stringify(value.slice(0, 70))}`);
    }
  }
  for (const child of node.childNodes ?? []) inspect(child, path, [...ancestors, node]);
}

for (const directory of ["src", "docs", "scripts", "public", ".agents"]) {
  for (const file of filesUnder(join(projectRoot, directory))) {
    if (!/\.(astro|ts|js|mjs|css|md|html|vtt|txt|json|yaml|yml|sh)$/.test(file)) continue;
    const forbidden = directory === "scripts" ? /\u2014/ : emDash;
    if (forbidden.test(readFileSync(file, "utf8"))) failures.push(`${relative(projectRoot, file)}: replace the em dash with normal punctuation`);
  }
}
for (const file of ["README.md", "DEPLOY.md", "AGENTS.md"]) {
  if (emDash.test(readFileSync(join(projectRoot, file), "utf8"))) failures.push(`${file}: replace the em dash with normal punctuation`);
}

const pages = filesUnder(distRoot).filter((file) => file.endsWith(".html"));
for (const file of pages) {
  const path = publicPath(file);
  const html = readFileSync(file, "utf8");
  if (emDash.test(html)) failures.push(`${path}: rendered em dash found, including metadata or accessibility text`);
  if (!contract.routes.includes(path)) failures.push(`${path}: add the new published page to docs/published-links.json`);
  inspect(parse(html), path);
}

if (failures.length) {
  console.error([...new Set(failures)].join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Checked ${pages.length} rendered pages: no em dashes, no joined-word boundaries around inline text, and all pages registered in the published URL contract.`);
}

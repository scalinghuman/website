import { execFileSync } from "node:child_process";
import { setTimeout as delay } from "node:timers/promises";
import { contract, digest, projectRoot } from "./site-files.mjs";

const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== "--revision")) throw new Error("Usage: npm run check:live -- --revision <full-commit-sha>");
const revision = args[1] ?? execFileSync("git", ["rev-parse", "HEAD"], { cwd: projectRoot, encoding: "utf8" }).trim();
if (!/^[a-f0-9]{40}$/.test(revision)) throw new Error("Use the full Git commit SHA for live verification.");
const site = new URL(contract.site);
const failures = [];

async function request(path, method = "GET") {
  if (!path.startsWith("/") || path.startsWith("//")) throw new Error(`Invalid public path: ${path}`);
  const url = new URL(path, site);
  if (url.origin !== site.origin) throw new Error(`Unexpected origin: ${path}`);
  url.searchParams.set("revision", revision);
  const response = await fetch(url, { method, headers: { "Cache-Control": "no-cache" }, signal: AbortSignal.timeout(15000) });
  if (response.status !== 200) throw new Error(`${path}: HTTP ${response.status}`);
  if (new URL(response.url).origin !== site.origin) throw new Error(`${path}: redirected outside the website`);
  return response;
}

let manifest;
let lastError;
for (let attempt = 0; attempt < 12; attempt++) {
  try {
    manifest = await (await request("/deployment.json")).json();
    if (manifest.revision !== revision) throw new Error(`Live revision is ${manifest.revision}; expected ${revision}`);
    break;
  } catch (error) {
    manifest = undefined;
    lastError = error;
    if (attempt < 11) await delay(5000);
  }
}
if (!manifest) throw lastError;
if (!manifest.files || typeof manifest.files !== "object" || !Object.keys(manifest.files).length) throw new Error("The live deployment manifest has no files.");
for (const route of contract.routes) {
  if (!manifest.files[route]) failures.push(`Live manifest is missing the published route ${route}`);
}

const checks = [
  ...Object.entries(manifest.files).map(([path, hash]) => async () => {
    if (!/^[a-f0-9]{64}$/.test(hash)) throw new Error(`${path}: invalid SHA-256 in manifest`);
    const bytes = Buffer.from(await (await request(path)).arrayBuffer());
    if (digest(bytes) !== hash) throw new Error(`${path}: live content does not match the deployed build`);
  }),
  ...contract.aliases.map((path) => async () => { await request(path, "HEAD"); }),
  ...contract.downloads.map((path) => async () => { await request(path, "HEAD"); }),
];
let next = 0;
await Promise.all(Array.from({ length: Math.min(6, checks.length) }, async () => {
  while (next < checks.length) {
    const check = checks[next++];
    try { await check(); } catch (error) { failures.push(error.message); }
  }
}));
if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Verified live revision ${revision}, ${Object.keys(manifest.files).length} page/caption hashes, ${contract.aliases.length} aliases and ${contract.downloads.length} download paths.`);
}

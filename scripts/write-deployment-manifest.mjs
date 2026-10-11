import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";
import { digest, distRoot, filesUnder, projectRoot, publicPath } from "./site-files.mjs";

const revision = execFileSync("git", ["rev-parse", "HEAD"], { cwd: projectRoot, encoding: "utf8" }).trim();
if (process.env.GITHUB_SHA && process.env.GITHUB_SHA !== revision) throw new Error("The checkout does not match the workflow revision.");
const files = filesUnder(distRoot).filter((file) => /\.(html|vtt)$/.test(file));
if (!files.some((file) => file.endsWith(".html"))) throw new Error("Build the website before writing the deployment manifest.");
const manifest = {
  revision,
  files: Object.fromEntries(files.map((file) => [publicPath(file), digest(readFileSync(file))])),
};
writeFileSync(join(distRoot, "deployment.json"), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Recorded revision ${revision} and ${files.length} page/caption hashes for live verification.`);

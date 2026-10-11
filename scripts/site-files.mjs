import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { createHash } from "node:crypto";

export const projectRoot = fileURLToPath(new URL("../", import.meta.url));
export const distRoot = join(projectRoot, "dist");
export const contract = JSON.parse(readFileSync(join(projectRoot, "docs/published-links.json"), "utf8"));
export const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");

export function filesUnder(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(path) : [path];
  }).sort();
}

export const publicPath = (file) => `/${relative(distRoot, file).split("\\").join("/")}`;

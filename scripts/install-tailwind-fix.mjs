#!/usr/bin/env node
/**
 * Workaround for npm bug on this machine: `@tailwindcss/postcss` and its
 * dependency tree fail to materialize under `npm install` (pacote bug), even
 * though the tarballs download fine. This script re-extracts the vendored
 * tarballs into node_modules after every install (runs as `postinstall`).
 *
 * Packages are extracted only if missing, so normal installs that DO work
 * are left untouched.
 */
import { execSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const vendorDir = join(__dirname, "vendor");
const nm = join(root, "node_modules");

// Map of vendored tarball -> destination folder under node_modules
const targets = {
  "tailwindcss-4.3.3.tgz": "tailwindcss",
  "tailwindcss-node-4.3.3.tgz": "@tailwindcss/node",
  "tailwindcss-oxide-4.3.3.tgz": "@tailwindcss/oxide",
  "tailwindcss-oxide-darwin-arm64-4.3.3.tgz": "@tailwindcss/oxide-darwin-arm64",
  "tailwindcss-postcss-4.3.3.tgz": "@tailwindcss/postcss",
  "alloc-quick-lru-5.2.0.tgz": "@alloc/quick-lru",
  "enhanced-resolve-5.24.5.tgz": "enhanced-resolve",
  "jiti-2.7.0.tgz": "jiti",
  "lightningcss-1.32.0.tgz": "lightningcss",
  "lightningcss-darwin-arm64-1.32.0.tgz": "lightningcss-darwin-arm64",
  "magic-string-0.30.21.tgz": "magic-string",
  "tapable-2.3.3.tgz": "tapable",
  "jridgewell-remapping-2.3.5.tgz": "@jridgewell/remapping",
  "jridgewell-trace-mapping-0.3.31.tgz": "@jridgewell/trace-mapping",
  "jridgewell-resolve-uri-3.1.2.tgz": "@jridgewell/resolve-uri",
  "jridgewell-sourcemap-codec-1.6.0.tgz": "@jridgewell/sourcemap-codec",
  "source-map-js-1.2.1.tgz": "source-map-js",
};

let installed = 0;
for (const [tarball, dest] of Object.entries(targets)) {
  const destPath = join(nm, dest);
  const pkgJson = join(destPath, "package.json");
  if (existsSync(pkgJson)) continue; // already present — leave it

  const tarballPath = join(vendorDir, tarball);
  if (!existsSync(tarballPath)) {
    console.warn(`[tailwind-fix] missing vendored tarball: ${tarball}`);
    continue;
  }

  mkdirSync(destPath, { recursive: true });
  execSync(`tar -xzf "${tarballPath}" -C "${destPath}" --strip-components=1`, {
    stdio: "inherit",
  });
  installed++;
}

if (installed > 0) {
  console.log(`[tailwind-fix] extracted ${installed} packages into node_modules`);
}

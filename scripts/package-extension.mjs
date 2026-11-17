#!/usr/bin/env node
/**
 * Builds public/cyber-detector-extension.zip from the extension/ folder.
 * Uses PowerShell's Compress-Archive on Windows and the zip CLI elsewhere.
 * No third-party dependencies.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const extensionDir = path.join(root, "extension");
const publicDir = path.join(root, "public");
const output = path.join(publicDir, "cyber-detector-extension.zip");

if (!existsSync(path.join(extensionDir, "manifest.json"))) {
  console.error("extension/manifest.json was not found. Run this from the project root.");
  process.exit(1);
}

mkdirSync(publicDir, { recursive: true });
if (existsSync(output)) rmSync(output);

console.log("Packaging extension/ …");
if (process.platform === "win32") {
  // bsdtar (bundled with Windows 10+) writes forward-slash ZIP entries, which
  // unzip correctly on macOS/Linux too. Compress-Archive is a fallback.
  try {
    execFileSync("tar", ["-a", "-c", "-f", output, "-C", extensionDir, "."], {
      stdio: "inherit",
    });
  } catch {
    const command = `Compress-Archive -Path '${path.join(extensionDir, "*")}' -DestinationPath '${output}' -Force`;
    execFileSync("powershell", ["-NoProfile", "-NonInteractive", "-Command", command], {
      stdio: "inherit",
    });
  }
} else {
  execFileSync("zip", ["-r", output, "."], { cwd: extensionDir, stdio: "inherit" });
}

if (!existsSync(output)) {
  console.error("Packaging failed: ZIP was not created.");
  process.exit(1);
}

const size = statSync(output).size;
console.log(`Wrote ${path.relative(root, output)} (${Math.round(size / 1024)} KB)`);

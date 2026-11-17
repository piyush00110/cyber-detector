#!/usr/bin/env node
/**
 * Download the workflow-generated ClamAV data listing into `.cache/`.
 *
 * The listing is written by `.github/workflows/clamav-scan.yml` to
 * `scan-results/index.json` in the PRIVATE quarantine repo. This script pulls a
 * snapshot so `/results` works locally even when `.env.local` has no GitHub PAT.
 *
 * Auth (first available):
 *   1. GITHUB_PAT from `.env.local`
 *   2. the GitHub CLI (`gh auth token`)
 *
 * Repo (first available):
 *   1. GITHUB_QUARANTINE_REPOSITORY
 *   2. `<owner of GITHUB_REPOSITORY or git origin>/cyber-detector-quarantine`
 *
 * Usage:
 *   npm run results:pull
 *   npm run results:pull -- --out .cache/scan-results/index.json
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const API = "https://api.github.com";
const args = process.argv.slice(2);
const outFlag = args.indexOf("--out");
const outPath = resolve(
  outFlag !== -1 ? args[outFlag + 1] : ".cache/scan-results/index.json"
);

const pat = process.env.GITHUB_PAT || ghToken();
const repo = process.env.GITHUB_QUARANTINE_REPOSITORY || deriveRepo();
const ref = process.env.GITHUB_REF_NAME || "main";

if (!pat) {
  console.error(
    "✖ No GitHub credentials found. Set GITHUB_PAT or run `gh auth login`."
  );
  process.exit(1);
}
if (!repo || !repo.includes("/")) {
  console.error(
    "✖ Could not determine the quarantine repo. Set GITHUB_QUARANTINE_REPOSITORY=owner/repo."
  );
  process.exit(1);
}

async function main() {
  const res = await fetch(
    `${API}/repos/${repo}/contents/scan-results/index.json?ref=${encodeURIComponent(ref)}`,
    {
      headers: {
        Authorization: `Bearer ${pat}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "cyber-detector-results-pull",
      },
    }
  );

  if (res.status === 404) {
    console.error(
      `✖ ${repo} has no scan-results/index.json yet.\n` +
        "  Upload a file from the File tab or run `npm run scan:ci`, wait for the\n" +
        "  workflow, then run this command again."
    );
    process.exit(1);
  }
  if (!res.ok) {
    console.error(`✖ GitHub read failed (${res.status}): ${await res.text()}`);
    process.exit(1);
  }

  const file = await res.json();
  const text =
    file.encoding === "base64"
      ? Buffer.from(file.content, "base64").toString("utf8")
      : file.content;

  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    console.error("✖ scan-results/index.json is not valid JSON.");
    process.exit(1);
  }

  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, JSON.stringify(parsed, null, 2) + "\n", "utf8");

  const total = typeof parsed.total === "number" ? parsed.total : parsed.results?.length ?? 0;
  console.log(`✔ Saved ${total} result(s) to ${outPath}`);
  console.log(`  Repo:      ${repo}`);
  console.log(`  Generated: ${parsed.generatedAt ?? "—"}`);
  console.log(`  Clean:     ${parsed.clean ?? "—"}`);
  console.log(`  Malware:   ${parsed.malicious ?? "—"}`);
}

function ghToken() {
  try {
    return execFileSync("gh", ["auth", "token"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

function deriveRepo() {
  const source =
    process.env.GITHUB_REPOSITORY || process.env.GITHUB_REPO || originRepo();
  if (!source || !source.includes("/")) return "";
  return `${source.split("/")[0]}/cyber-detector-quarantine`;
}

function originRepo() {
  try {
    const url = execFileSync("git", ["remote", "get-url", "origin"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    const match = url.match(/github\.com[/:]([^/]+)\/([^/.]+)(?:\.git)?$/);
    return match ? `${match[1]}/${match[2]}` : "";
  } catch {
    return "";
  }
}

await main();

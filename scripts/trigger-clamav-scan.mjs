#!/usr/bin/env node
/**
 * Trigger the ClamAV GitHub Actions scan.
 *
 * This only asks GitHub to run the *static* ClamAV scan. It never executes the
 * uploaded file. The scan runs on an ephemeral GitHub runner.
 *
 * Required env (put them in .env.local):
 *   GITHUB_PAT        Personal access token with `actions:write` on the repo.
 *   GITHUB_REPOSITORY "owner/repo" (e.g. piyush00110/cyber-detector)
 *
 * Optional env:
 *   GITHUB_REF_NAME   Branch to run on (default: main)
 *   CLAMAV_WORKFLOW   Workflow file name (default: clamav-scan.yml)
 *
 * Usage:
 *   npm run scan:ci
 *   npm run scan:ci -- https://example.com/suspect.zip
 */
const pat = process.env.GITHUB_PAT;
const repo = process.env.GITHUB_REPOSITORY || process.env.GITHUB_REPO;
const ref = process.env.GITHUB_REF_NAME || "main";
const workflow = process.env.CLAMAV_WORKFLOW || "clamav-scan.yml";
const fileUrl = process.argv[2] || "";

if (!pat) {
  console.error("✖ GITHUB_PAT is not set. Add it to .env.local.");
  process.exit(1);
}
if (!repo || !repo.includes("/")) {
  console.error('✖ GITHUB_REPOSITORY is not set. Use "owner/repo".');
  process.exit(1);
}
if (fileUrl && !/^https?:\/\//i.test(fileUrl)) {
  console.error("✖ The file URL must start with http:// or https://");
  process.exit(1);
}

const endpoint = `https://api.github.com/repos/${repo}/actions/workflows/${workflow}/dispatches`;

const res = await fetch(endpoint, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${pat}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    ref,
    inputs: { file_url: fileUrl, reason: "cli-trigger" },
  }),
});

if (res.status === 204) {
  console.log(`✔ ClamAV scan dispatched on ${repo}@${ref}.`);
  console.log(`  Watch it: https://github.com/${repo}/actions/workflows/${workflow}`);
} else {
  const detail = await res.text();
  console.error(`✖ GitHub dispatch failed (${res.status}).`);
  console.error(detail);
  process.exit(1);
}

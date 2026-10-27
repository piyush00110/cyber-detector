#!/usr/bin/env node
/**
 * Create (or update) the PRIVATE quarantine repo used by the ClamAV flow.
 *
 * It:
 *  1. Creates `<owner>/cyber-detector-quarantine` as a private repo if missing.
 *  2. Pushes the ClamAV workflow + folder scaffolding into it.
 *  3. Prints the GITHUB_QUARANTINE_REPOSITORY line to add to .env.local.
 *
 * Required env (.env.local is auto-loaded by npm):
 *   GITHUB_PAT         fine-grained PAT with: Administration (repo creation),
 *                      Contents: read/write, Workflows: read/write,
 *                      Actions: read/write, Metadata: read.
 *   GITHUB_REPOSITORY  owner/repo of THIS project, e.g. piyush00110/cyber-detector
 *
 * Optional:
 *   GITHUB_QUARANTINE_REPOSITORY  override the derived repo name.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const API = "https://api.github.com";
const pat = process.env.GITHUB_PAT;
const source = process.env.GITHUB_REPOSITORY || process.env.GITHUB_REPO;

if (!pat) {
  console.error("✖ GITHUB_PAT is not set.");
  process.exit(1);
}
if (!source || !source.includes("/")) {
  console.error('✖ GITHUB_REPOSITORY is not set. Use "owner/repo".');
  process.exit(1);
}

const owner = source.split("/")[0];
const qRepo =
  process.env.GITHUB_QUARANTINE_REPOSITORY || `${owner}/cyber-detector-quarantine`;
const qName = qRepo.split("/")[1];

const here = dirname(fileURLToPath(import.meta.url));
const workflowPath = join(here, "..", ".github", "workflows", "clamav-scan.yml");
const workflowText = readFileSync(workflowPath, "utf8");

function headers(extra = {}) {
  return {
    Authorization: `Bearer ${pat}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    ...extra,
  };
}

async function api(method, path, body) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: headers(body ? { "Content-Type": "application/json" } : {}),
    body: body ? JSON.stringify(body) : undefined,
  });
  return res;
}

async function getRepo(repo) {
  const res = await api("GET", `/repos/${repo}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`repo lookup failed (${res.status})`);
  return res.json();
}

async function ensureRepo() {
  const existing = await getRepo(qRepo);
  if (existing) {
    if (!existing.private) {
      throw new Error(
        `Repo ${qRepo} exists but is PUBLIC. Refusing to use it for uploads. Create a private repo or set GITHUB_QUARANTINE_REPOSITORY.`
      );
    }
    console.log(`✔ Quarantine repo exists: ${qRepo} (private)`);
    return existing.default_branch || "main";
  }

  const ownerRes = await api("GET", `/users/${owner}`);
  const ownerData = ownerRes.ok ? await ownerRes.json() : { type: "User" };
  const isOrg = ownerData.type === "Organization";
  const createRes = await api(
    "POST",
    isOrg ? `/orgs/${owner}/repos` : "/user/repos",
    { name: qName, private: true, auto_init: true }
  );
  if (!createRes.ok) {
    const detail = await createRes.text();
    throw new Error(`create repo failed (${createRes.status}): ${detail}`);
  }
  const created = await createRes.json();
  console.log(`✔ Created private repo: ${created.full_name}`);
  return created.default_branch || "main";
}

async function getContent(repo, path, branch) {
  const res = await api(
    "GET",
    `/repos/${repo}/contents/${path}?ref=${encodeURIComponent(branch)}`
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`read ${path} failed (${res.status})`);
  const data = await res.json();
  if (Array.isArray(data)) return null;
  const text =
    data.encoding === "base64"
      ? Buffer.from(data.content, "base64").toString("utf8")
      : data.content;
  return { text, sha: data.sha };
}

async function putContent(repo, branch, path, text, message) {
  const existing = await getContent(repo, path, branch).catch(() => null);
  if (existing && existing.text === text) {
    console.log(`• ${path} already up to date`);
    return;
  }
  const res = await api("PUT", `/repos/${repo}/contents/${path}`, {
    message,
    content: Buffer.from(text, "utf8").toString("base64"),
    branch,
    ...(existing?.sha ? { sha: existing.sha } : {}),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`write ${path} failed (${res.status}): ${detail}`);
  }
  console.log(`✔ wrote ${path}`);
}

const branch = await ensureRepo();

const readme = `# Cyber Detector — ClamAV quarantine (PRIVATE)

This private repo receives uploaded files from the Cyber Detector web app and
scans them with the real ClamAV engine on GitHub Actions.

**Files are never executed** — ClamAV only reads the bytes and matches them
against virus signatures.

## Flow

1. \`POST /api/scan-file\` commits the upload to \`quarantine/incoming/<sha256>-<name>\`.
2. The commit triggers \`.github/workflows/clamav-scan.yml\`.
3. The workflow scans, writes \`scan-results/<sha256>.json\`, and deletes the payload.

Do not make this repo public.
`;

const gitignore = `quarantine/incoming/*
!quarantine/incoming/.gitkeep
`;

await putContent(qRepo, branch, ".github/workflows/clamav-scan.yml", workflowText, "add ClamAV workflow");
await putContent(qRepo, branch, "README.md", readme, "add README");
await putContent(qRepo, branch, ".gitignore", gitignore, "ignore payloads");
await putContent(qRepo, branch, "quarantine/incoming/.gitkeep", "\n", "scaffold quarantine");
await putContent(qRepo, branch, "scan-results/.gitkeep", "\n", "scaffold results");

console.log("\n✅ Done. Add this to .env.local:\n");
console.log(`GITHUB_QUARANTINE_REPOSITORY=${qRepo}`);
if (branch !== "main") {
  console.log(`GITHUB_REF_NAME=${branch}`);
}

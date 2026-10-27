/**
 * Server-only helpers for the ClamAV quarantine repo.
 *
 * The browser uploads a file to /api/scan-file. The server commits it to a
 * PRIVATE quarantine repo, which triggers the ClamAV GitHub Actions workflow.
 * The workflow scans (never executes) the file and commits a small JSON result
 * to `scan-results/<sha256>.json`, which the server reads back for the UI.
 */

const API = "https://api.github.com";

export interface QuarantineConfig {
  pat: string;
  repo: string;
  ref: string;
}

export interface RepoInfo {
  private: boolean;
  full_name: string;
}

export function getQuarantineConfig(): QuarantineConfig | null {
  const pat = process.env.GITHUB_PAT;
  const repo =
    process.env.GITHUB_QUARANTINE_REPOSITORY ||
    process.env.GITHUB_REPOSITORY ||
    "";
  const ref = process.env.GITHUB_REF_NAME || "main";
  if (!pat || !repo.includes("/")) return null;
  return { pat, repo, ref };
}

function headers(cfg: QuarantineConfig): Record<string, string> {
  return {
    Authorization: `Bearer ${cfg.pat}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

export async function getRepoInfo(
  cfg: QuarantineConfig
): Promise<RepoInfo | null> {
  const res = await fetch(`${API}/repos/${cfg.repo}`, {
    headers: headers(cfg),
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`GitHub repo lookup failed (${res.status})`);
  }
  return (await res.json()) as RepoInfo;
}

interface ContentFile {
  content: string;
  encoding: string;
  sha: string;
  size: number;
}

/** Read a file from the repo (decoded text), or null if it does not exist. */
export async function getTextFile(
  cfg: QuarantineConfig,
  path: string
): Promise<{ text: string; sha: string } | null> {
  const res = await fetch(
    `${API}/repos/${cfg.repo}/contents/${encodeURI(path)}?ref=${encodeURIComponent(
      cfg.ref
    )}`,
    { headers: headers(cfg), cache: "no-store" }
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub read ${path} failed (${res.status})`);
  const data = (await res.json()) as ContentFile | ContentFile[];
  if (Array.isArray(data)) return null;
  const text =
    data.encoding === "base64"
      ? Buffer.from(data.content, "base64").toString("utf8")
      : data.content;
  return { text, sha: data.sha };
}

export async function getJsonFile<T>(
  cfg: QuarantineConfig,
  path: string
): Promise<T | null> {
  const file = await getTextFile(cfg, path);
  if (!file) return null;
  try {
    return JSON.parse(file.text) as T;
  } catch {
    return null;
  }
}

/** Create or update a file in the repo. */
export async function putFile(
  cfg: QuarantineConfig,
  path: string,
  contentBase64: string,
  message: string
): Promise<void> {
  const existing = await getTextFile(cfg, path).catch(() => null);
  const res = await fetch(`${API}/repos/${cfg.repo}/contents/${encodeURI(path)}`, {
    method: "PUT",
    headers: { ...headers(cfg), "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: contentBase64,
      branch: cfg.ref,
      ...(existing?.sha ? { sha: existing.sha } : {}),
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`GitHub write ${path} failed (${res.status}): ${detail}`);
  }
}

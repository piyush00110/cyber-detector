import { readFile } from "node:fs/promises";
import path from "node:path";
import type { ScanResultsIndex } from "@/lib/av";

/**
 * Local snapshot of the workflow-generated ClamAV listing.
 *
 * `npm run results:pull` downloads `scan-results/index.json` from the private
 * quarantine repo into `.cache/` using the GitHub CLI (or `GITHUB_PAT`). This
 * lets `/results` work during local development without putting a broad PAT in
 * `.env.local`. `.cache/` is gitignored.
 */
export const LOCAL_LISTING_PATH = path.join(
  process.cwd(),
  ".cache",
  "scan-results",
  "index.json"
);

export async function readLocalScanResults(): Promise<ScanResultsIndex | null> {
  try {
    const text = await readFile(LOCAL_LISTING_PATH, "utf8");
    const parsed = JSON.parse(text) as Partial<ScanResultsIndex>;
    if (!parsed || !Array.isArray(parsed.results)) return null;
    return parsed as ScanResultsIndex;
  } catch {
    return null;
  }
}

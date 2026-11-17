/** Shared types/constants for the ClamAV queue (client + server safe). */

/** The ClamAV queue path uses the GitHub Contents API, which does not handle
 *  multi-GB files. Local heuristics still run up to 1 GB in the browser. */
export const MAX_QUEUE_BYTES = 45 * 1024 * 1024; // 45 MB

export interface AvResult {
  sha256: string;
  filename: string;
  infected: boolean;
  verdict: "clean" | "malicious";
  signatures: string[];
  scannedAt: string;
  engine: string;
}

/** One row in the workflow-generated `scan-results/index.json` data listing. */
export interface ScanResultListItem extends AvResult {
  resultPath?: string;
}

/** Aggregate listing published by `.github/workflows/clamav-scan.yml`. */
export interface ScanResultsIndex {
  generatedAt: string;
  repository?: string;
  total: number;
  clean: number;
  malicious: number;
  results: ScanResultListItem[];
}

export type AvState =
  | { status: "queued" | "pending"; sha256: string; runUrl?: string }
  | { status: "done"; sha256: string; result: AvResult }
  | { status: "skipped"; error: string }
  | { status: "error"; error: string };

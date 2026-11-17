"use client";

import { copyText, downloadFile, safeFilename } from "@/lib/files";
import { buildReportText, buildScanShareUrl } from "@/lib/share";
import { toast } from "@/lib/toast";

/**
 * Copy / share / download toolbar shown on every verdict card.
 *
 * "Copy report" includes every visible detail (score, source, URL anatomy,
 * signals and Safe Browsing matches) instead of only the verdict line.
 */
export default function ResultActions({
  verdictLabel,
  target,
  data,
  filename,
  shareTarget,
}: {
  verdictLabel: string;
  target: string;
  data: unknown;
  filename: string;
  /** When set, a "Copy link" button creates a /scan?url=… re-scan link. */
  shareTarget?: string;
}) {
  async function copyVerdict() {
    const ok = await copyText(`${verdictLabel} — ${target}`);
    toast(ok ? "Verdict copied" : "Copy failed", ok ? "ok" : "err");
  }

  async function copyReport() {
    const ok = await copyText(buildReportText(data));
    toast(ok ? "Full report copied" : "Copy failed", ok ? "ok" : "err");
  }

  async function copyJson() {
    const ok = await copyText(JSON.stringify(data, null, 2));
    toast(ok ? "JSON copied" : "Copy failed", ok ? "ok" : "err");
  }

  async function copyShareLink() {
    if (!shareTarget) return;
    const link = buildScanShareUrl(shareTarget);
    const ok = await copyText(link);
    toast(
      ok ? "Share link copied — paste it anywhere" : "Copy failed",
      ok ? "ok" : "err"
    );
  }

  function download() {
    downloadFile(`${safeFilename(filename)}.json`, JSON.stringify(data, null, 2));
    toast("Report downloaded");
  }

  return (
    <div className="result-actions">
      <button
        type="button"
        className="chip-btn"
        onClick={copyReport}
        title="Copy the full report with all details"
      >
        📋 Copy report
      </button>
      <button type="button" className="chip-btn" onClick={copyVerdict} title="Copy only the verdict">
        ✅ Copy verdict
      </button>
      <button type="button" className="chip-btn" onClick={copyJson} title="Copy the raw JSON response">
        {"{ }"} Copy JSON
      </button>
      {shareTarget && (
        <button
          type="button"
          className="chip-btn"
          onClick={copyShareLink}
          title="Copy a link that re-runs this scan when opened"
        >
          🔗 Copy link
        </button>
      )}
      <button type="button" className="chip-btn" onClick={download} title="Download a JSON report">
        ⬇ Download
      </button>
    </div>
  );
}

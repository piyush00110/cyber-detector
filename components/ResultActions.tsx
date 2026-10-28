"use client";

import { copyText, downloadFile, safeFilename } from "@/lib/files";
import { toast } from "@/lib/toast";

/** Copy / download buttons shown on every verdict card. */
export default function ResultActions({
  verdictLabel,
  target,
  data,
  filename,
}: {
  verdictLabel: string;
  target: string;
  data: unknown;
  filename: string;
}) {
  async function copyVerdict() {
    const ok = await copyText(`${verdictLabel} — ${target}`);
    toast(ok ? "Verdict copied" : "Copy failed", ok ? "ok" : "err");
  }

  async function copyJson() {
    const ok = await copyText(JSON.stringify(data, null, 2));
    toast(ok ? "JSON copied" : "Copy failed", ok ? "ok" : "err");
  }

  function download() {
    downloadFile(`${safeFilename(filename)}.json`, JSON.stringify(data, null, 2));
    toast("Report downloaded");
  }

  return (
    <div className="result-actions">
      <button type="button" className="chip-btn" onClick={copyVerdict}>
        📋 Copy verdict
      </button>
      <button type="button" className="chip-btn" onClick={copyJson}>
        {"{ }"} Copy JSON
      </button>
      <button type="button" className="chip-btn" onClick={download}>
        ⬇ Download
      </button>
    </div>
  );
}

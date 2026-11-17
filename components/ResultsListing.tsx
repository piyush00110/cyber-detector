"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { ScanResultListItem } from "@/lib/av";
import { copyText, downloadFile } from "@/lib/files";
import { verdictColor, verdictLabel } from "@/lib/format";
import { toast } from "@/lib/toast";

interface ListingResponse {
  status: "ok" | "empty";
  source?: "github" | "snapshot";
  generatedAt: string | null;
  repository?: string;
  total: number;
  clean: number;
  malicious: number;
  results: ScanResultListItem[];
  truncated?: boolean;
  hint?: string;
}

export default function ResultsListing() {
  const [data, setData] = useState<ListingResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/scan-results?limit=50", { cache: "no-store" });
      const body = (await res.json().catch(() => null)) as
        | (ListingResponse & { error?: string })
        | null;
      if (!res.ok) {
        throw new Error(
          body?.error ?? `Could not load the listing (${res.status}).`
        );
      }
      if (!body || !Array.isArray(body.results)) {
        throw new Error("Unexpected response from /api/scan-results.");
      }
      setData(body);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load the listing.");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <div className="scanner" style={{ maxWidth: 960 }}>
      <div className="result-head" style={{ marginBottom: 12 }}>
        <p className="meta" style={{ margin: 0, maxWidth: 560 }}>
          Live from <code>scan-results/index.json</code>, published by{" "}
          <code>.github/workflows/clamav-scan.yml</code> in the private
          quarantine repo.
        </p>
        <div className="result-actions" style={{ marginLeft: "auto" }}>
          <button type="button" className="chip-btn" onClick={load} disabled={loading}>
            {loading ? "Refreshing…" : "↻ Refresh"}
          </button>
          <button
            type="button"
            className="chip-btn"
            disabled={!data || data.results.length === 0}
            onClick={() => {
              downloadFile(
                "clamav-scan-results.json",
                JSON.stringify(data, null, 2)
              );
              toast("Listing downloaded");
            }}
          >
            ⬇ Export JSON
          </button>
        </div>
      </div>

      {loading && <div className="loading-bar" aria-hidden="true" />}

      {error && (
        <>
          <div className="err">{error}</div>
          <div className="note" style={{ marginTop: 14 }}>
            The listing needs the ClamAV queue. Add{" "}
            <code>GITHUB_PAT</code> and <code>GITHUB_QUARANTINE_REPOSITORY</code>{" "}
            to <code>.env.local</code> and run <code>npm run setup:quarantine</code>,
            or cache the workflow output locally with{" "}
            <code>npm run results:pull</code>. Then upload a file from the File
            tab or run <code>npm run scan:ci</code>.
          </div>
        </>
      )}

      {data && !error && (
        <>
          {data.source === "snapshot" && (
            <div className="note" style={{ marginTop: 10 }}>
              Showing a local snapshot pulled by <code>npm run results:pull</code>.
              Run it again after new scans to refresh this page.
            </div>
          )}
          <div className="hist-stats" style={{ marginTop: 8 }}>
            <div className="hist-stat" style={{ borderTopColor: "var(--blue)" }}>
              <b>{data.total}</b>
              <span>Total results</span>
            </div>
            <div className="hist-stat" style={{ borderTopColor: "var(--green)" }}>
              <b>{data.clean}</b>
              <span>Clean</span>
            </div>
            <div className="hist-stat" style={{ borderTopColor: "var(--red)" }}>
              <b>{data.malicious}</b>
              <span>Malware</span>
            </div>
            <div className="hist-stat" style={{ borderTopColor: "var(--border-strong)" }}>
              <b style={{ fontSize: 17 }}>
                {data.generatedAt
                  ? new Date(data.generatedAt).toLocaleString()
                  : "—"}
              </b>
              <span>Listing generated</span>
            </div>
          </div>

          {data.results.length === 0 ? (
            <div className="empty-state">
              <div style={{ fontSize: 34, marginBottom: 8 }}>📋</div>
              <p style={{ margin: "0 0 8px" }}>No ClamAV results published yet.</p>
              <p className="meta" style={{ marginTop: 0 }}>
                {data.hint ||
                  "Upload a file from the File tab, or run `npm run scan:ci`."}
              </p>
              <Link
                href="/analyze"
                className="btn"
                style={{ textDecoration: "none", marginTop: 12 }}
              >
                Scan a file
              </Link>
            </div>
          ) : (
            <div style={{ overflowX: "auto", marginTop: 12 }}>
              <table className="hist-table">
                <thead>
                  <tr>
                    <th>Scanned</th>
                    <th>Verdict</th>
                    <th>File</th>
                    <th>SHA-256</th>
                    <th>Signatures</th>
                    <th aria-label="Actions" />
                  </tr>
                </thead>
                <tbody>
                  {data.results.map((r) => (
                    <tr key={r.sha256}>
                      <td style={{ whiteSpace: "nowrap", color: "var(--muted)" }}>
                        {r.scannedAt ? new Date(r.scannedAt).toLocaleString() : "—"}
                      </td>
                      <td
                        style={{
                          color: verdictColor(r.verdict),
                          fontWeight: 800,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {verdictLabel(r.verdict)}
                      </td>
                      <td className="name" title={r.filename || r.sha256}>
                        {r.filename || "upload.bin"}
                      </td>
                      <td>
                        <code className="hash" title={r.sha256}>
                          {r.sha256.slice(0, 16)}…
                        </code>
                      </td>
                      <td style={{ fontSize: 12.5, color: "var(--muted)" }}>
                        {r.signatures && r.signatures.length
                          ? r.signatures.join(", ")
                          : "—"}
                      </td>
                      <td style={{ whiteSpace: "nowrap", textAlign: "right" }}>
                        <button
                          type="button"
                          className="chip-btn"
                          style={{ marginRight: 6 }}
                          onClick={async () => {
                            const ok = await copyText(r.sha256);
                            toast(
                              ok ? "SHA-256 copied" : "Copy failed",
                              ok ? "ok" : "err"
                            );
                          }}
                        >
                          Copy hash
                        </button>
                        <a
                          className="chip-btn"
                          style={{ textDecoration: "none" }}
                          href={`/api/scan-file/status?sha256=${r.sha256}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          JSON
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {data.truncated && (
            <div className="meta">
              Showing the {data.results.length} newest of {data.total} results.
            </div>
          )}

          <details className="faq" style={{ marginTop: 18 }}>
            <summary>How the data listing is filled</summary>
            <p>
              After ClamAV scans <code>quarantine/incoming/</code>, the workflow
              writes one <code>scan-results/&lt;sha256&gt;.json</code> per file,
              deletes the payload, then aggregates every result into{" "}
              <code>scan-results/index.json</code> plus a human-readable{" "}
              <code>scan-results/README.md</code>. Both are committed by{" "}
              <code>github-actions[bot]</code>. This page reads the index through{" "}
              <code>GET /api/scan-results</code>.
            </p>
          </details>

          <div className="note" style={{ marginBottom: 0 }}>
            This listing includes filenames and hashes from every scan in the
            quarantine repo. Anyone who can open this page can read it — run the
            app locally or protect a public deployment.
          </div>
        </>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import ScannerSection from "@/components/ScannerSection";
import ResultCard, { type ScanApiResult } from "@/components/ResultCard";
import { downloadFile } from "@/lib/files";
import { postJson } from "@/lib/scanClient";
import { toast } from "@/lib/toast";

type BulkRow = ScanApiResult | { url: string; error: string };

function isOkRow(r: BulkRow): r is ScanApiResult {
  return (r as ScanApiResult).verdict !== undefined;
}

export default function ScanPage() {
  const [bulk, setBulk] = useState("");
  const [results, setResults] = useState<BulkRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runBulk() {
    const urls = bulk.split(/[\n,]+/).map((s) => s.trim()).filter(Boolean).slice(0, 10);
    if (urls.length === 0) {
      setError("Paste at least one URL (one per line).");
      return;
    }
    setLoading(true);
    setError(null);
    setResults([]);
    const out = await postJson<{ results: BulkRow[] }>("/api/scan-bulk", { urls });
    if (!out.ok) {
      setError(out.error);
      setLoading(false);
      return;
    }
    setResults(out.data.results ?? []);
    setLoading(false);
  }

  const okRows = results.filter(isOkRow);
  const counts = {
    safe: okRows.filter((r) => r.verdict === "safe").length,
    suspicious: okRows.filter((r) => r.verdict === "suspicious").length,
    malicious: okRows.filter((r) => r.verdict === "malicious").length,
  };

  return (
    <section>
      <div className="wrap">
        <span className="kicker">URL lab</span>
        <h1 style={{ margin: "8px 0" }}>URL detector</h1>
        <p style={{ color: "var(--muted)", maxWidth: 680 }}>
          Single scans use Google Safe Browsing + the weighted heuristic
          algorithm and are saved to localStorage. Bulk mode scans up to 10
          URLs at once.
        </p>
        <h2 style={{ fontSize: 20, marginTop: 32 }}>Single URL</h2>
        <ScannerSection id="single" />
        <h2 style={{ fontSize: 20, marginTop: 40 }}>Bulk scan (up to 10)</h2>
        <div className="scanner">
          <textarea
            className="code-input"
            rows={5}
            value={bulk}
            onChange={(e) => setBulk(e.target.value)}
            placeholder={"https://example.com\nhttps://your-bank-login.tk/verify"}
          />
          <div className="btn-row">
            <button className="btn" onClick={runBulk} disabled={loading}>
              {loading && <span className="spinner" aria-hidden="true" />}
              {loading ? "Scanning…" : "Scan URLs"}
            </button>
            <button className="btn btn-ghost" onClick={() => { setBulk(""); setResults([]); setError(null); }}>
              Clear
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              disabled={results.length === 0}
              onClick={() => {
                downloadFile("bulk-scan-results.json", JSON.stringify(results, null, 2));
                toast("Bulk results downloaded");
              }}
            >
              ⬇ Export results
            </button>
          </div>
          {loading && <div className="loading-bar" aria-hidden="true" />}
          {error && <div className="err">{error}</div>}
          {results.length > 0 && (
            <div className="meta" style={{ marginTop: 12 }}>
              ✅ {counts.safe} safe · ⚠️ {counts.suspicious} suspicious · ⛔ {counts.malicious} malicious
            </div>
          )}
          {results.map((r, i) =>
            isOkRow(r) ? (
              <ResultCard key={r.url + i} result={r} />
            ) : (
              <div key={r.url + i} className="err">
                {r.url}: {r.error}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

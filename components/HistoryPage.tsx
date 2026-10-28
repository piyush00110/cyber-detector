"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ResultCard, { type ScanApiResult } from "@/components/ResultCard";
import { downloadFile } from "@/lib/files";
import { kindLabel, timeAgo, verdictColor, verdictLabel } from "@/lib/format";
import {
  clearHistory,
  loadHistory,
  removeFromHistory,
  type HistoryEntry,
} from "@/lib/history";
import { postJson } from "@/lib/scanClient";
import { toast } from "@/lib/toast";

type KindFilter = "all" | "url" | "file" | "code";
type VerdictFilter = "all" | "clean" | "suspicious" | "malicious";

function verdictGroup(verdict: string): VerdictFilter {
  if (verdict === "safe" || verdict === "clean") return "clean";
  if (verdict === "suspicious") return "suspicious";
  if (verdict === "malicious") return "malicious";
  return "all";
}

function target(h: HistoryEntry): string {
  return h.kind === "url" ? h.url : h.filename;
}

function csvCell(value: string | number): string {
  const s = String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export default function HistoryPage() {
  const [items, setItems] = useState<HistoryEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [kind, setKind] = useState<KindFilter>("all");
  const [verdict, setVerdict] = useState<VerdictFilter>("all");
  const [query, setQuery] = useState("");
  const [rescan, setRescan] = useState<ScanApiResult | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => {
    setItems(loadHistory());
    setLoaded(true);
  }, []);

  const stats = useMemo(() => {
    const counts = { total: items.length, clean: 0, suspicious: 0, malicious: 0 };
    for (const h of items) {
      const g = verdictGroup(h.verdict);
      if (g !== "all") counts[g] += 1;
    }
    return counts;
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((h) => {
      if (kind !== "all" && h.kind !== kind) return false;
      if (verdict !== "all" && verdictGroup(h.verdict) !== verdict) return false;
      if (q) {
        const hay = `${target(h)} ${h.kind} ${h.verdict} ${
          h.kind === "file" ? h.sha256 : ""
        }`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [items, kind, verdict, query]);

  async function rescanUrl(url: string) {
    setBusy(url);
    setRescan(null);
    const out = await postJson<ScanApiResult>("/api/scan-url", { url });
    setBusy(null);
    if (!out.ok) {
      toast(out.error, "err");
      return;
    }
    setRescan(out.data);
    toast("Rescan complete");
  }

  function exportJson() {
    downloadFile(
      "cyber-detector-history.json",
      JSON.stringify(items, null, 2)
    );
    toast("History exported as JSON");
  }

  function exportCsv() {
    const header = "kind,target,verdict,score,scannedAt,sha256";
    const rows = items.map((h) =>
      [
        h.kind,
        target(h),
        verdictLabel(h.verdict),
        h.score,
        h.scannedAt,
        h.kind === "file" ? h.sha256 : "",
      ]
        .map(csvCell)
        .join(",")
    );
    downloadFile("cyber-detector-history.csv", [header, ...rows].join("\n"), "text/csv");
    toast("History exported as CSV");
  }

  function clearAll() {
    clearHistory();
    setItems([]);
    setRescan(null);
    toast("History cleared");
  }

  return (
    <section>
      <div className="wrap">
        <span className="kicker">On this device</span>
        <h1 style={{ margin: "8px 0" }}>Scan history</h1>
        <p style={{ color: "var(--muted)", maxWidth: 720 }}>
          Every scan is stored in your browser&apos;s localStorage — URLs keep the
          verdict and score, files keep the SHA-256 hash, code keeps the filename.
          Nothing is stored on our servers. Export or clear it any time.
        </p>

        <div className="hist-stats">
          <div className="hist-stat" style={{ borderTopColor: "var(--blue)" }}>
            <b>{stats.total}</b>
            <span>Total scans</span>
          </div>
          <div className="hist-stat" style={{ borderTopColor: "var(--green)" }}>
            <b>{stats.clean}</b>
            <span>Clean / safe</span>
          </div>
          <div className="hist-stat" style={{ borderTopColor: "var(--amber)" }}>
            <b>{stats.suspicious}</b>
            <span>Suspicious</span>
          </div>
          <div className="hist-stat" style={{ borderTopColor: "var(--red)" }}>
            <b>{stats.malicious}</b>
            <span>Malicious</span>
          </div>
        </div>

        <div className="toolbar">
          <input
            type="search"
            placeholder="Search URL, filename or hash…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search history"
          />
          <select
            value={kind}
            onChange={(e) => setKind(e.target.value as KindFilter)}
            aria-label="Filter by type"
          >
            <option value="all">All types</option>
            <option value="url">URLs</option>
            <option value="file">Files</option>
            <option value="code">Code</option>
          </select>
          <select
            value={verdict}
            onChange={(e) => setVerdict(e.target.value as VerdictFilter)}
            aria-label="Filter by verdict"
          >
            <option value="all">All verdicts</option>
            <option value="clean">Clean / safe</option>
            <option value="suspicious">Suspicious</option>
            <option value="malicious">Malicious</option>
          </select>
          <button type="button" className="btn btn-ghost" onClick={exportJson} disabled={!items.length}>
            ⬇ JSON
          </button>
          <button type="button" className="btn btn-ghost" onClick={exportCsv} disabled={!items.length}>
            ⬇ CSV
          </button>
          <button type="button" className="btn btn-ghost" onClick={clearAll} disabled={!items.length}>
            Clear all
          </button>
        </div>

        {loaded && items.length === 0 && (
          <div className="empty-state">
            <div style={{ fontSize: 34, marginBottom: 8 }}>🗂️</div>
            <p style={{ margin: "0 0 14px" }}>No scans saved yet on this device.</p>
            <Link href="/scan" className="btn" style={{ textDecoration: "none" }}>
              Scan your first URL
            </Link>
          </div>
        )}

        {items.length > 0 && filtered.length === 0 && (
          <div className="empty-state">No scans match these filters.</div>
        )}

        {filtered.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table className="hist-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Target</th>
                  <th>Verdict</th>
                  <th>Score</th>
                  <th>When</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((h, i) => (
                  <tr key={`${h.kind}-${i}-${h.scannedAt}`}>
                    <td style={{ color: "var(--muted)", fontWeight: 700 }}>
                      {kindLabel(h.kind)}
                    </td>
                    <td className="name" title={target(h)}>
                      {target(h)}
                    </td>
                    <td style={{ color: verdictColor(h.verdict), fontWeight: 800 }}>
                      {verdictLabel(h.verdict)}
                    </td>
                    <td>{h.score}</td>
                    <td style={{ color: "var(--muted)", whiteSpace: "nowrap" }}>
                      {timeAgo(h.scannedAt)}
                    </td>
                    <td style={{ whiteSpace: "nowrap", textAlign: "right" }}>
                      {h.kind === "url" && (
                        <button
                          type="button"
                          className="chip-btn"
                          disabled={busy === h.url}
                          onClick={() => rescanUrl(h.url)}
                          style={{ marginRight: 6 }}
                        >
                          {busy === h.url ? "Scanning…" : "Rescan"}
                        </button>
                      )}
                      <button
                        type="button"
                        className="chip-btn"
                        onClick={() => {
                          removeFromHistory(h);
                          setItems(loadHistory());
                          toast("Entry removed");
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {rescan && (
          <div style={{ marginTop: 24 }}>
            <h2 style={{ fontSize: 18 }}>Rescan result</h2>
            <ResultCard result={rescan} />
          </div>
        )}
      </div>
    </section>
  );
}

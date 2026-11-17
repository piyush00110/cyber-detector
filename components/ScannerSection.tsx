"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import ScanForm from "@/components/ScanForm";
import ResultCard, { type ScanApiResult } from "@/components/ResultCard";
import HistoryList from "@/components/HistoryList";
import { loadHistory, saveToHistory, type HistoryEntry } from "@/lib/history";
import { postJson } from "@/lib/scanClient";
import { toast } from "@/lib/toast";

export default function ScannerSection({ id = "scanner" }: { id?: string }) {
  const [result, setResult] = useState<ScanApiResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [sharedFromLink, setSharedFromLink] = useState<string | null>(null);
  const autoRan = useRef(false);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const handleScan = useCallback(async (url: string) => {
    setLoading(true);
    setError(null);
    setResult(null);
    const out = await postJson<ScanApiResult>("/api/scan-url", { url });
    if (!out.ok) {
      setError(out.error);
      setLoading(false);
      return;
    }
    const data = out.data;
    setResult(data);
    saveToHistory({
      kind: "url",
      url: data.url,
      verdict: data.verdict,
      score: data.heuristics?.score ?? 0,
      scannedAt: new Date().toISOString(),
    });
    setHistory(loadHistory());
    setLoading(false);
  }, []);

  // Opening /scan?url=… (from a share link or the browser extension) scans
  // automatically, so pasted links work without an extra click.
  useEffect(() => {
    if (autoRan.current) return;
    autoRan.current = true;
    const shared = new URLSearchParams(window.location.search).get("url");
    if (!shared) return;
    setSharedFromLink(shared);
    toast("Shared scan link loaded — re-scanning…", "info");
    void handleScan(shared);
  }, [handleScan]);

  return (
    <div className="scanner" id={id}>
      {sharedFromLink && (
        <div className="share-banner">
          <span>
            📎 Opened from a shared link. Re-scanning{" "}
            <code>{sharedFromLink}</code> against live blocklists and heuristics.
          </span>
          <button
            type="button"
            className="link-btn"
            onClick={() => setSharedFromLink(null)}
            aria-label="Dismiss shared-link notice"
          >
            Dismiss
          </button>
        </div>
      )}
      <ScanForm onScan={handleScan} loading={loading} />
      {loading && <div className="loading-bar" aria-hidden="true" />}
      {error && <div className="err">{error}</div>}
      {result && <ResultCard result={result} />}
      <HistoryList
        items={history}
        onSelectUrl={handleScan}
        onClear={() => setHistory([])}
      />
      {history.length > 0 && (
        <div style={{ marginTop: 12, fontSize: 13 }}>
          <Link href="/history">View full history &amp; stats →</Link>
        </div>
      )}
    </div>
  );
}

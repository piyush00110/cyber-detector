"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import ScanForm from "@/components/ScanForm";
import ResultCard, { type ScanApiResult } from "@/components/ResultCard";
import HistoryList from "@/components/HistoryList";
import { loadHistory, saveToHistory, type HistoryEntry } from "@/lib/history";
import { postJson } from "@/lib/scanClient";

export default function ScannerSection({ id = "scanner" }: { id?: string }) {
  const [result, setResult] = useState<ScanApiResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

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

  return (
    <div className="scanner" id={id}>
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

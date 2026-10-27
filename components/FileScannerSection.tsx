"use client";

import { useEffect, useRef, useState } from "react";
import FileResultCard from "@/components/FileResultCard";
import {
  analyzeFile,
  EICAR_STRING,
  type FileReport,
} from "@/lib/fileAnalysis";
import { saveToHistory } from "@/lib/history";
import { MAX_QUEUE_BYTES, type AvResult, type AvState } from "@/lib/av";

const MAX_BYTES = 1024 * 1024 * 1024; // 1 GB (local heuristics)

export default function FileScannerSection({ id = "file" }: { id?: string }) {
  const [result, setResult] = useState<FileReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [over, setOver] = useState(false);
  const [av, setAv] = useState<AvState | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  function stopPolling() {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  }

  function poll(sha256: string) {
    stopPolling();
    let tries = 0;
    pollRef.current = setInterval(async () => {
      tries += 1;
      if (tries > 60) {
        stopPolling();
        setAv({
          status: "error",
          error:
            "ClamAV is taking longer than expected. Check the GitHub Actions run.",
        });
        return;
      }
      try {
        const res = await fetch(
          `/api/scan-file/status?sha256=${sha256}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        if (data.status === "done" && data.result) {
          stopPolling();
          setAv({ status: "done", sha256, result: data.result as AvResult });
        }
      } catch {
        /* keep polling */
      }
    }, 5000);
  }

  async function queueClamAv(file: File) {
    if (file.size > MAX_QUEUE_BYTES) {
      setAv({
        status: "skipped",
        error: `ClamAV queue handles files up to ${Math.round(
          MAX_QUEUE_BYTES / 1024 / 1024
        )} MB. Larger files get local analysis only.`,
      });
      return;
    }
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/scan-file", { method: "POST", body: fd });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setAv({
          status: "error",
          error: data?.error ?? `Could not queue the file (${res.status}).`,
        });
        return;
      }
      if (data.status === "done" && data.result) {
        setAv({ status: "done", sha256: data.sha256, result: data.result });
        return;
      }
      setAv({
        status: "pending",
        sha256: data.sha256,
        runUrl: data.runUrl,
      });
      poll(data.sha256);
    } catch {
      setAv({ status: "error", error: "Could not reach the ClamAV queue." });
    }
  }

  async function scan(file: File | undefined | null) {
    if (!file) return;
    if (file.size > MAX_BYTES) {
      setError("File too large (max 1 GB).");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    setAv(null);
    stopPolling();
    try {
      // Fast local heuristics (SHA-256, magic bytes, entropy, EICAR…).
      const rep = await analyzeFile(file);
      setResult(rep);
      saveToHistory({
        kind: "file",
        filename: rep.filename,
        sha256: rep.sha256,
        verdict: rep.verdict,
        score: rep.score,
        scannedAt: rep.scannedAt,
      });
      // Then hand the file to the real ClamAV engine via GitHub Actions.
      await queueClamAv(file);
    } catch {
      setError(
        "Could not analyze that file. (Note: file hashing needs HTTPS or localhost.)"
      );
    } finally {
      setLoading(false);
    }
  }

  function downloadEicar() {
    const blob = new Blob([EICAR_STRING], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "eicar-test.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  return (
    <div className="scanner" id={id}>
      <div
        className={`dropzone${over ? " over" : ""}`}
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          scan(e.dataTransfer.files?.[0]);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            fileRef.current?.click();
          }
        }}
      >
        {loading ? "🔬 Analyzing file…" : "📁 Drop a file here or click to choose"}
        <div style={{ fontSize: 12.5, marginTop: 6 }}>
          Local heuristics run instantly in your browser; the file is then
          uploaded to a private queue and scanned with ClamAV. Never executed.
          Local max 1 GB · ClamAV queue max {Math.round(MAX_QUEUE_BYTES / 1024 / 1024)} MB.
        </div>
      </div>
      <input
        ref={fileRef}
        type="file"
        hidden
        onChange={(e) => {
          scan(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <div className="sample-row">
        <span style={{ color: "var(--muted)" }}>Verify the engine:</span>
        <button type="button" onClick={downloadEicar}>
          ⬇ Download EICAR test file
        </button>
      </div>
      <div className="meta">
        The EICAR file is an industry-standard harmless test string every AV
        flags — download it, then drop it above. Local heuristics and ClamAV
        should both score it MALICIOUS.
      </div>
      {error && <div className="err">{error}</div>}
      {result && <FileResultCard result={result} />}
      {av && <AvPanel av={av} />}
    </div>
  );
}

function AvPanel({ av }: { av: AvState }) {
  if (av.status === "done") {
    const r = av.result;
    const malicious = r.infected;
    return (
      <div
        className={`result ${malicious ? "malicious" : "clean"}`}
        style={{ marginTop: 12 }}
      >
        <div className={`badge ${malicious ? "malicious" : "clean"}`}>
          {malicious ? "⛔ CLAMAV: MALWARE" : "✅ CLAMAV: CLEAN"}
        </div>
        <div className="meta" style={{ marginTop: 8 }}>
          {malicious
            ? `Detected: ${r.signatures.join(", ") || "a threat"}.`
            : "No known virus signatures matched."}
        </div>
        <div className="meta">
          Engine: {r.engine} · scanned {new Date(r.scannedAt).toLocaleString()}
        </div>
      </div>
    );
  }

  if (av.status === "skipped" || av.status === "error") {
    return (
      <div className="result suspicious" style={{ marginTop: 12 }}>
        <div className="badge suspicious">
          {av.status === "skipped" ? "CLAMAV SKIPPED" : "CLAMAV UNAVAILABLE"}
        </div>
        <div className="meta" style={{ marginTop: 8 }}>{av.error}</div>
        <div className="meta">The local heuristic verdict above still applies.</div>
      </div>
    );
  }

  return (
    <div className="result suspicious" style={{ marginTop: 12 }}>
      <div className="badge suspicious">CLAMAV SCANNING…</div>
      <div className="meta" style={{ marginTop: 8 }}>
        Queued on GitHub Actions. This usually takes 1–3 minutes.
        {av.runUrl && (
          <>
            {" "}
            <a href={av.runUrl} target="_blank" rel="noreferrer">
              Watch the run →
            </a>
          </>
        )}
      </div>
    </div>
  );
}

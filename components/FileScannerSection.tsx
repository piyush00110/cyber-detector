"use client";

import { useRef, useState } from "react";
import FileResultCard from "@/components/FileResultCard";
import {
  analyzeFile,
  EICAR_STRING,
  type FileReport,
} from "@/lib/fileAnalysis";
import { saveToHistory } from "@/lib/history";

const MAX_BYTES = 25 * 1024 * 1024; // 25 MB

export default function FileScannerSection({ id = "file" }: { id?: string }) {
  const [result, setResult] = useState<FileReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [over, setOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function scan(file: File | undefined | null) {
    if (!file) return;
    if (file.size > MAX_BYTES) {
      setError("File too large (max 25 MB).");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      // Fully local: hash + inspect bytes in this browser, zero upload.
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
          100% local — hashed (SHA-256) and inspected in your browser, never uploaded. Max 25 MB.
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
        flags — download it, then drop it above. It should score MALICIOUS.
      </div>
      {error && <div className="err">{error}</div>}
      {result && <FileResultCard result={result} />}
    </div>
  );
}

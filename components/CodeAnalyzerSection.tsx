"use client";

import { useEffect, useState } from "react";
import CodeResultCard, { type CodeReport } from "@/components/CodeResultCard";
import { SAMPLE_CODES } from "@/lib/samples";
import { loadHistory, saveToHistory } from "@/lib/history";
import { postJson } from "@/lib/scanClient";

const MAX_CHARS = 200_000;

export default function CodeAnalyzerSection({ id = "code" }: { id?: string }) {
  const [code, setCode] = useState("");
  const [filename, setFilename] = useState("pasted-code.txt");
  const [result, setResult] = useState<CodeReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [codeScans, setCodeScans] = useState(0);

  useEffect(() => {
    setCodeScans(loadHistory().filter((h) => h.kind === "code").length);
  }, []);

  async function analyze(value: string, name: string) {
    if (!value.trim()) {
      setError("Paste code first.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    const out = await postJson<CodeReport>("/api/analyze-code", {
      code: value,
      filename: name,
    });
    if (!out.ok) {
      setError(out.error);
      setLoading(false);
      return;
    }
    const data = out.data;
    setResult(data);
    saveToHistory({
      kind: "code",
      filename: name,
      verdict: data.verdict,
      score: data.score,
      scannedAt: new Date().toISOString(),
    });
    setCodeScans(loadHistory().filter((h) => h.kind === "code").length);
    setLoading(false);
  }

  return (
    <div className="scanner" id={id}>
      <textarea
        className="code-input"
        rows={9}
        value={code}
        onChange={(e) => setCode(e.target.value.slice(0, MAX_CHARS))}
        placeholder={"Paste suspicious code — JS, HTML, Python, PowerShell, shell…"}
        spellCheck={false}
      />
      <div className="meta">
        {filename} · {code.length.toLocaleString()} / {MAX_CHARS.toLocaleString()} chars
      </div>
      <div className="btn-row">
        <button className="btn" disabled={loading || !code.trim()} onClick={() => analyze(code, filename)}>
          {loading ? "Analyzing…" : "Analyze code"}
        </button>
        <button
          className="btn btn-ghost"
          onClick={() => {
            setCode("");
            setResult(null);
            setError(null);
            setFilename("pasted-code.txt");
          }}
        >
          Clear
        </button>
      </div>
      <div className="sample-row">
        <span style={{ color: "var(--muted)" }}>Try:</span>
        {SAMPLE_CODES.map((s) => (
          <button
            key={s.label}
            type="button"
            onClick={() => {
              setCode(s.code);
              setFilename(s.filename);
              analyze(s.code, s.filename);
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
      {error && <div className="err">{error}</div>}
      {result && <CodeResultCard result={result} filename={filename} />}
      <div className="note" style={{ marginBottom: 0 }}>
        Never run suspicious code to “test” it. Static analysis only — use a
        sandbox VM + VirusTotal for live malware.
      </div>
      <div className="meta">History: {codeScans} code scans saved on this device.</div>
    </div>
  );
}

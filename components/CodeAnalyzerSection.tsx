"use client";

import { useEffect, useRef, useState } from "react";
import CodeResultCard, { type CodeReport } from "@/components/CodeResultCard";
import { SAMPLE_CODES } from "@/lib/samples";
import { loadHistory, saveToHistory } from "@/lib/history";
import { postJson } from "@/lib/scanClient";
import { toast } from "@/lib/toast";

const MAX_CHARS = 200_000;

export default function CodeAnalyzerSection({ id = "code" }: { id?: string }) {
  const [code, setCode] = useState("");
  const [filename, setFilename] = useState("pasted-code.txt");
  const [result, setResult] = useState<CodeReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [codeScans, setCodeScans] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

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
      code: value.slice(0, MAX_CHARS),
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

  async function loadFile(file: File | undefined | null) {
    if (!file) return;
    if (file.size > MAX_CHARS * 4) {
      setError("That file is too large — limit is about 200 KB of text.");
      return;
    }
    const text = await file.text();
    setCode(text.slice(0, MAX_CHARS));
    setFilename(file.name || "pasted-code.txt");
    setResult(null);
    setError(null);
    toast(`Loaded ${file.name}`, "info");
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
        aria-label="Code to analyze"
      />
      <div className="meta" style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
        <input
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          aria-label="Filename"
          style={{
            background: "var(--input-bg)",
            border: "1px solid var(--border)",
            borderRadius: 7,
            color: "var(--text)",
            padding: "3px 8px",
            fontSize: 12.5,
            maxWidth: 220,
          }}
        />
        <span>
          {code.length.toLocaleString()} / {MAX_CHARS.toLocaleString()} chars
        </span>
      </div>
      <div className="btn-row">
        <button className="btn" disabled={loading || !code.trim()} onClick={() => analyze(code, filename)}>
          {loading && <span className="spinner" aria-hidden="true" />}
          {loading ? "Analyzing…" : "Analyze code"}
        </button>
        <button className="btn btn-ghost" onClick={() => fileRef.current?.click()}>
          📁 Load file
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
      <input
        ref={fileRef}
        type="file"
        hidden
        accept=".js,.jsx,.ts,.tsx,.html,.htm,.py,.ps1,.sh,.bat,.php,.rb,.txt,.vbs,.css,.json"
        onChange={(e) => {
          loadFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      {loading && <div className="loading-bar" aria-hidden="true" />}
      <div className="sample-row">
        <span style={{ color: "var(--muted)" }}>Try:</span>
        {SAMPLE_CODES.map((s) => (
          <button
            key={s.label}
            type="button"
            disabled={loading}
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

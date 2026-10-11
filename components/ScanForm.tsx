"use client";

import { useState, type FormEvent } from "react";
import { SAMPLE_URLS } from "@/lib/samples";

export default function ScanForm({
  onScan,
  loading,
}: {
  onScan: (url: string) => void;
  loading: boolean;
}) {
  const [url, setUrl] = useState("");

  function submit(value: string) {
    const v = value.trim();
    if (v) onScan(v);
  }

  return (
    <div>
      <form
        className="scan-row"
        onSubmit={(e: FormEvent) => {
          e.preventDefault();
          submit(url);
        }}
      >
        <input
          type="text"
          inputMode="url"
          placeholder="Paste a link — e.g. https://example.com/login"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-label="URL to scan"
        />
        <button type="submit" className="btn" disabled={loading || !url.trim()}>
          {loading ? "Scanning…" : "Scan URL"}
        </button>
      </form>
      <div className="sample-row">
        <span style={{ color: "var(--muted)" }}>Try:</span>
        {SAMPLE_URLS.map((s) => (
          <button
            key={s.url}
            type="button"
            onClick={() => {
              setUrl(s.url);
              submit(s.url);
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

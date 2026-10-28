"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { SAMPLE_URLS } from "@/lib/samples";
import { toast } from "@/lib/toast";

export default function ScanForm({
  onScan,
  loading,
}: {
  onScan: (url: string) => void;
  loading: boolean;
}) {
  const [url, setUrl] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function submit(value: string) {
    const v = value.trim();
    if (v) onScan(v);
  }

  // Keyboard shortcuts: "/" focuses the input, Esc clears it.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const el = e.target as HTMLElement | null;
      const typing =
        !!el &&
        (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable);
      if (e.key === "/" && !typing) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && el === inputRef.current) {
        setUrl("");
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

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
          ref={inputRef}
          type="text"
          inputMode="url"
          autoComplete="off"
          spellCheck={false}
          placeholder="Paste a link — e.g. https://example.com/login"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          aria-label="URL to scan"
          aria-busy={loading}
        />
        <button type="submit" className="btn" disabled={loading || !url.trim()}>
          {loading && <span className="spinner" aria-hidden="true" />}
          {loading ? "Scanning…" : "Scan URL"}
        </button>
      </form>
      <div className="hint">
        <kbd>/</kbd> focus input <span aria-hidden="true">·</span> <kbd>Esc</kbd> clear
      </div>
      <div className="sample-row">
        <span style={{ color: "var(--muted)" }}>Try:</span>
        <button
          type="button"
          disabled={loading}
          onClick={async () => {
            try {
              const text = await navigator.clipboard.readText();
              if (!text.trim()) {
                toast("Clipboard is empty", "err");
                return;
              }
              setUrl(text.trim());
              inputRef.current?.focus();
              toast("Pasted from clipboard", "info");
            } catch {
              toast("Clipboard blocked — paste manually", "err");
            }
          }}
        >
          📋 Paste
        </button>
        {SAMPLE_URLS.map((s) => (
          <button
            key={s.url}
            type="button"
            disabled={loading}
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

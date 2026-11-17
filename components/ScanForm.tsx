"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { SAMPLE_URLS } from "@/lib/samples";
import { toast } from "@/lib/toast";

/** Accepts a bare URL or a shared Cyber Detector link (/scan?url=…). */
function normalizeInput(value: string): string {
  const trimmed = value.trim();
  try {
    const u = new URL(trimmed);
    const inner = u.searchParams.get("url");
    if (inner && /\/scan\/?$/i.test(u.pathname)) return inner.trim();
  } catch {
    /* not a URL — use as typed */
  }
  return trimmed;
}

function looksLikeHttpUrl(value: string): boolean {
  try {
    const u = new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
    return (
      (u.protocol === "http:" || u.protocol === "https:") &&
      (u.hostname.includes(".") || /^\d{1,3}(\.\d{1,3}){3}$/.test(u.hostname))
    );
  } catch {
    return false;
  }
}

async function readClipboard(): Promise<string | null> {
  try {
    const text = await navigator.clipboard.readText();
    return text.trim() || null;
  } catch {
    return null;
  }
}

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
    const v = normalizeInput(value);
    if (v) onScan(v);
  }

  async function paste(fillOnly: boolean) {
    const text = await readClipboard();
    if (!text) {
      toast("Clipboard is empty or blocked — paste manually", "err");
      inputRef.current?.focus();
      return;
    }
    const value = normalizeInput(text);
    setUrl(value);
    inputRef.current?.focus();
    if (!fillOnly) {
      if (!looksLikeHttpUrl(value)) {
        toast("Clipboard doesn't contain a URL or share link", "err");
        return;
      }
      toast("Pasted from clipboard", "info");
      submit(value);
    } else {
      toast("Pasted from clipboard", "info");
    }
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
        <span aria-hidden="true">·</span> share links (<code>/scan?url=…</code>) are
        unwrapped automatically
      </div>
      <div className="sample-row">
        <span style={{ color: "var(--muted)" }}>Try:</span>
        <button
          type="button"
          disabled={loading}
          onClick={() => paste(true)}
          title="Paste a URL or share link into the box"
        >
          📋 Paste
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => paste(false)}
          title="Paste and scan immediately"
        >
          ⚡ Paste &amp; scan
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

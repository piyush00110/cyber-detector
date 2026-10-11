"use client";

import type { HistoryEntry } from "@/lib/history";
import { clearHistory } from "@/lib/history";

const DOT: Record<string, string> = {
  safe: "#22c55e",
  clean: "#22c55e",
  suspicious: "#f59e0b",
  malicious: "#ef4444",
};

function label(h: HistoryEntry): string {
  if (h.kind === "url") return h.url;
  return h.filename;
}

export default function HistoryList({
  items,
  onSelectUrl,
  onClear,
}: {
  items: HistoryEntry[];
  onSelectUrl: (url: string) => void;
  onClear: () => void;
}) {
  if (items.length === 0) return null;
  return (
    <div className="history">
      <h4>
        Recent scans (this device only)
        <button
          className="link-btn"
          style={{ marginLeft: 12 }}
          onClick={() => {
            clearHistory();
            onClear();
          }}
        >
          Clear
        </button>
      </h4>
      {items.map((h, i) => (
        <div key={`${h.kind}-${i}-${h.scannedAt}`} className="hist-item">
          <span className="dot" style={{ background: DOT[h.verdict] ?? "#888" }} />
          <code title={label(h)}>
            [{h.kind}] {label(h)}
          </code>
          <span style={{ fontSize: 12, color: "var(--muted)" }}>{h.score}</span>
          {h.kind === "url" && <button onClick={() => onSelectUrl(h.url)}>Rescan</button>}
        </div>
      ))}
    </div>
  );
}

"use client";

import type { HistoryEntry } from "@/lib/history";
import { clearHistory } from "@/lib/history";
import { kindLabel, timeAgo, verdictColor, verdictLabel } from "@/lib/format";
import { toast } from "@/lib/toast";

function label(h: HistoryEntry): string {
  if (h.kind === "url") return h.url;
  return h.filename;
}

export default function HistoryList({
  items,
  onSelectUrl,
  onClear,
  limit = 6,
}: {
  items: HistoryEntry[];
  onSelectUrl: (url: string) => void;
  onClear: () => void;
  limit?: number;
}) {
  if (items.length === 0) return null;
  const shown = items.slice(0, limit);

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
            toast("History cleared");
          }}
        >
          Clear
        </button>
      </h4>
      {shown.map((h, i) => (
        <div key={`${h.kind}-${i}-${h.scannedAt}`} className="hist-item">
          <span
            className="dot"
            style={{ background: verdictColor(h.verdict) }}
            title={verdictLabel(h.verdict)}
          />
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 800,
              letterSpacing: 0.6,
              textTransform: "uppercase",
              color: "var(--muted)",
              minWidth: 30,
            }}
          >
            {kindLabel(h.kind)}
          </span>
          <code title={label(h)}>{label(h)}</code>
          <span style={{ fontSize: 12, color: verdictColor(h.verdict), fontWeight: 700 }}>
            {h.score}
          </span>
          <span style={{ fontSize: 11.5, color: "var(--muted)", whiteSpace: "nowrap" }}>
            {timeAgo(h.scannedAt)}
          </span>
          {h.kind === "url" && (
            <button onClick={() => onSelectUrl(h.url)}>Rescan</button>
          )}
        </div>
      ))}
    </div>
  );
}

import type { CodeReport } from "@/lib/codeAnalysis";

export type { CodeReport };

const META = {
  clean: { label: "✅ CLEAN", blurb: "No known malicious patterns detected." },
  suspicious: { label: "⚠️ SUSPICIOUS", blurb: "Odd patterns found — review before running." },
  malicious: { label: "⛔ MALICIOUS", blurb: "Dangerous patterns found — do NOT run this code." },
} as const;

export default function CodeResultCard({
  result,
  filename,
}: {
  result: CodeReport;
  filename: string;
}) {
  const m = META[result.verdict];
  const color =
    result.verdict === "clean" ? "#22c55e" : result.verdict === "suspicious" ? "#f59e0b" : "#ef4444";
  return (
    <div className={`result ${result.verdict}`}>
      <div className={`badge ${result.verdict}`}>{m.label}</div>
      <div className="result-url">{filename}</div>
      <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 4 }}>{m.blurb}</div>
      <div className="meter">
        <div style={{ width: `${result.score}%`, background: color }} />
      </div>
      <div className="meta">
        Risk: <b style={{ color }}>{result.score}/100</b> · {result.stats.lines} lines ·{" "}
        {result.stats.chars.toLocaleString()} chars · {result.stats.language}
      </div>
      {result.signals.length > 0 ? (
        <ul className="signals">
          {result.signals.map((s) => (
            <li key={s.id}>
              <b>{s.label}</b> — {s.detail}
              <span className={`tag ${s.severity}`}>{s.severity}</span>
              {typeof s.line === "number" && <span className="meta"> · line {s.line}</span>}
              {s.match && (
                <div>
                  <code>{s.match}</code>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="meta">No malicious patterns matched.</div>
      )}
      <div className="meta">
        Scanned {new Date(result.scannedAt).toLocaleString()} · static patterns only, never executed.
      </div>
    </div>
  );
}

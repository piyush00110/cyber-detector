import type { HeuristicReport } from "@/lib/heuristics";

export type UrlVerdict = "safe" | "suspicious" | "malicious";

export interface ScanApiResult {
  url: string;
  verdict: UrlVerdict;
  safe?: boolean;
  matches: Array<{
    threatType: string;
    platformType: string;
    threat?: { url: string };
  }>;
  heuristics?: HeuristicReport;
  source?: string;
  warning?: string;
  scannedAt?: string;
}

const META: Record<UrlVerdict, { label: string; blurb: string }> = {
  safe: { label: "✅ SAFE", blurb: "No blocklist hits and low heuristic risk." },
  suspicious: { label: "⚠️ SUSPICIOUS", blurb: "Something looks off — review the signals before visiting." },
  malicious: { label: "⛔ MALICIOUS", blurb: "Do not visit. Flagged as dangerous or very high-risk." },
};

export default function ResultCard({ result }: { result: ScanApiResult }) {
  const verdict: UrlVerdict = result.verdict ?? (result.safe === false ? "malicious" : "safe");
  const m = META[verdict];
  const score = result.heuristics?.score ?? 0;
  const color = verdict === "safe" ? "#22c55e" : verdict === "suspicious" ? "#f59e0b" : "#ef4444";

  return (
    <div className={`result ${verdict}`}>
      <div className={`badge ${verdict}`}>{m.label}</div>
      <div className="result-url">{result.url}</div>
      <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 4 }}>{m.blurb}</div>
      {result.heuristics && (
        <>
          <div className="meter">
            <div style={{ width: `${score}%`, background: color }} />
          </div>
          <div className="meta">
            Heuristic risk: <b style={{ color }}>{score}/100</b>
            {result.source && <> · via {result.source}</>}
          </div>
          {result.heuristics.signals.length > 0 ? (
            <ul className="signals">
              {result.heuristics.signals.map((s) => (
                <li key={s.id}>
                  <b>{s.label}</b> — {s.detail}
                  <span className={`tag ${s.severity}`}>{s.severity}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="meta">No heuristic red flags detected.</div>
          )}
        </>
      )}
      {result.matches.length > 0 && (
        <>
          <div className="meta">Google Safe Browsing matches:</div>
          <ul className="signals">
            {result.matches.map((x, i) => (
              <li key={i}>
                <b>{x.threatType}</b> ({x.platformType})
              </li>
            ))}
          </ul>
        </>
      )}
      {result.warning && <div className="meta">⚠️ {result.warning}</div>}
      {result.scannedAt && (
        <div className="meta">Scanned {new Date(result.scannedAt).toLocaleString()}</div>
      )}
    </div>
  );
}

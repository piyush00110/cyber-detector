import ResultActions from "@/components/ResultActions";
import { formatBytes, type FileReport } from "@/lib/fileAnalysis";

const META = {
  clean: { label: "✅ CLEAN", blurb: "No malicious file traits detected." },
  suspicious: { label: "⚠️ SUSPICIOUS", blurb: "Odd traits found — do not run until verified." },
  malicious: { label: "⛔ MALICIOUS", blurb: "Dangerous file — do NOT open or run it." },
} as const;

export default function FileResultCard({ result }: { result: FileReport }) {
  const m = META[result.verdict];
  const color =
    result.verdict === "clean" ? "var(--green)" : result.verdict === "suspicious" ? "var(--amber)" : "var(--red)";
  return (
    <div className={`result ${result.verdict}`}>
      <div className="result-head">
        <div className={`badge ${result.verdict}`}>{m.label}</div>
        <ResultActions
          verdictLabel={m.label.replace(/^\S+\s/, "")}
          target={result.filename}
          data={result}
          filename={`file-scan-${result.filename}`}
        />
      </div>
      <div className="result-url">{result.filename}</div>
      <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 4 }}>{m.blurb}</div>
      <div className="meter">
        <div style={{ width: `${result.score}%`, background: color }} />
      </div>
      <div className="meta">
        Risk: <b style={{ color }}>{result.score}/100</b> · {formatBytes(result.size)} · entropy{" "}
        {result.entropy} · {result.magic}
      </div>
      <div className="meta">
        SHA-256: <span className="hash">{result.sha256}</span>
      </div>
      {result.signals.length > 0 ? (
        <ul className="signals">
          {result.signals.map((s) => (
            <li key={s.id}>
              <b>{s.label}</b> — {s.detail}
              <span className={`tag ${s.severity}`}>{s.severity}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="meta">No malicious file traits matched.</div>
      )}
      <div className="meta">
        Scanned {new Date(result.scannedAt).toLocaleString()} · local heuristics
        (SHA-256, entropy, signatures) plus a ClamAV queue scan. Files are never
        executed.
      </div>
    </div>
  );
}

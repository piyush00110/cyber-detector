import type { Metadata } from "next";

export const metadata: Metadata = { title: "API Docs" };

export default function ApiDocsPage() {
  return (
    <section>
      <div className="wrap prose">
        <span className="kicker">Developers</span>
        <h1>API Docs</h1>
        <p>
          Five JSON endpoints. No auth. File scanning runs fast local heuristics
          in the browser, then queues the file for a real ClamAV scan on GitHub
          Actions. Files are never executed.
        </p>
        <h2>POST /api/scan-url</h2>
        <p>Scan a single URL. Returns verdict, Safe Browsing matches, heuristics and timestamp.</p>
        <pre className="code">{`curl -X POST http://localhost:3000/api/scan-url \\
  -H "Content-Type: application/json" \\
  -d '{"url":"https://example.com/login"}'

# response
{
  "url": "https://example.com/login",
  "verdict": "suspicious",
  "safe": false,
  "matches": [],
  "heuristics": { "score": 28, "level": "suspicious", "signals": [...] },
  "source": "safe-browsing+heuristics",
  "scannedAt": "2026-10-11T00:00:00.000Z"
}`}</pre>
        <h2>POST /api/scan-bulk</h2>
        <p>Scan up to 10 URLs at once.</p>
        <pre className="code">{`curl -X POST http://localhost:3000/api/scan-bulk \\
  -H "Content-Type: application/json" \\
  -d '{"urls":["https://google.com","https://paypal-secure-verify.tk/signin"]}'

# response
{ "results": [ { "url": "...", "verdict": "safe", ... }, ... ] }`}</pre>
        <h2>POST /api/analyze-code</h2>
        <p>Static analysis of pasted code (max ~200KB). Never executes the code.</p>
        <pre className="code">{`curl -X POST http://localhost:3000/api/analyze-code \\
  -H "Content-Type: application/json" \\
  -d '{"filename":"evil.js","code":"eval(atob(\\"eHh4\\"))"}'

# response
{
  "filename": "evil.js",
  "verdict": "malicious",
  "score": 53,
  "signals": [ { "id": "eval", "label": "eval() execution", "severity": "high", "line": 1 } ],
  "stats": { "lines": 1, "chars": 22, "language": "javascript" },
  "scannedAt": "2026-10-11T00:00:00.000Z"
}`}</pre>
        <h2>POST /api/scan-file</h2>
        <p>
          Multipart upload (<code>file</code> field). Runs local heuristics,
          commits the file to the private ClamAV quarantine repo, and returns a
          <code>sha256</code>. Max 45 MB. The file is scanned, not executed.
        </p>
        <pre className="code">{`curl -X POST http://localhost:3000/api/scan-file \\
  -F "file=@invoice.pdf"

# response (queued)
{ "ok": true, "sha256": "…", "status": "queued", "runUrl": "…" }`}</pre>
        <h2>GET /api/scan-file/status?sha256=…</h2>
        <p>
          Polls the quarantine repo for the ClamAV verdict. Returns
          <code>{"{"}"status":"pending"{"}"}</code> until the workflow publishes
          <code>scan-results/&lt;sha256&gt;.json</code>.
        </p>
        <pre className="code">{`# response (done)
{
  "status": "done",
  "result": {
    "sha256": "…",
    "infected": false,
    "verdict": "clean",
    "signatures": [],
    "engine": "ClamAV",
    "scannedAt": "…"
  }
}`}</pre>
        <h2>File scanning (local heuristics)</h2>
        <p>
          Use <code>lib/fileAnalysis.ts</code> → <code>analyzeFile(file)</code> in
          the browser: SHA-256 + EICAR/signature match + extension risk +
          magic-byte verification + entropy + embedded-script scan. The ClamAV
          queue is wired in <code>components/FileScannerSection.tsx</code>.
        </p>
        <h2>localStorage schema</h2>
        <pre className="code">{`key: "cyber-detector-history-v1"   // max 30 entries, newest first
{ kind: "url",  url, verdict, score, scannedAt }
{ kind: "file", filename, sha256, verdict, score, scannedAt }
{ kind: "code", filename, verdict, score, scannedAt }`}</pre>
        <div className="note">
          Without <code>GOOGLE_SAFE_BROWSING_API_KEY</code> the URL API runs in
          heuristic-only demo mode with a <code>warning</code> field. Get a free
          key in Google Cloud → enable Safe Browsing API → copy to{" "}
          <code>.env.local</code>. File scanning needs <code>GITHUB_PAT</code> and
          a private <code>GITHUB_QUARANTINE_REPOSITORY</code> (see{" "}
          <code>npm run setup:quarantine</code>).
        </div>
      </div>
    </section>
  );
}

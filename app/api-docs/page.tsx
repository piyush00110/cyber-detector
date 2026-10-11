import type { Metadata } from "next";

export const metadata: Metadata = { title: "API Docs" };

export default function ApiDocsPage() {
  return (
    <section>
      <div className="wrap prose">
        <span className="kicker">Developers</span>
        <h1>API Docs</h1>
        <p>
          Three JSON endpoints. No auth. File scanning has no endpoint on
          purpose — it runs 100% in the browser so bytes are never uploaded.
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
        <h2>File scanning (client-side only)</h2>
        <p>
          Use <code>lib/fileAnalysis.ts</code> → <code>analyzeFile(file)</code> in
          the browser: SHA-256 + EICAR/signature match + extension risk + magic-byte
          verification + entropy + embedded-script scan. See{" "}
          <code>components/FileScannerSection.tsx</code> for the reference UI.
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
          <code>.env.local</code>. File/code analysis needs no key.
        </div>
      </div>
    </section>
  );
}

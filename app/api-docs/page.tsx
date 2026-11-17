import type { Metadata } from "next";

export const metadata: Metadata = { title: "API Docs" };

export default function ApiDocsPage() {
  return (
    <section>
      <div className="wrap prose">
        <span className="kicker">Developers</span>
        <h1>API Docs</h1>
        <p>
          JSON endpoints, no auth. File scanning runs fast local heuristics in
          the browser, then queues the file for a real ClamAV scan on GitHub
          Actions. Files are never executed. The same API powers the{" "}
          <a href="/extension">browser extension</a>.
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
        <h2>GET /api/scan-results?limit=25</h2>
        <p>
          Reads the workflow-generated data listing
          (<code>scan-results/index.json</code>) from the private quarantine repo:
          every published ClamAV verdict, filename, SHA-256, signatures and
          timestamp. The workflow rebuilds the listing after each scan. Limit:
          1–100 (default 25).
        </p>
        <pre className="code">{`curl "http://localhost:3000/api/scan-results?limit=10"

# response
{
  "status": "ok",
  "source": "github",
  "generatedAt": "2026-10-28T00:00:00Z",
  "total": 12,
  "clean": 11,
  "malicious": 1,
  "results": [
    {
      "sha256": "…",
      "filename": "invoice.pdf",
      "infected": false,
      "verdict": "clean",
      "signatures": [],
      "scannedAt": "2026-10-28T00:00:00Z",
      "engine": "ClamAV",
      "resultPath": "scan-results/….json"
    }
  ],
  "truncated": false
}`}</pre>
        <p>
          Returns <code>503</code> until <code>GITHUB_PAT</code> and{" "}
          <code>GITHUB_QUARANTINE_REPOSITORY</code> are configured, unless a
          local snapshot exists. Run <code>npm run results:pull</code> to cache
          the workflow listing in <code>.cache/scan-results/index.json</code>;
          the response then has <code>&quot;source&quot;: &quot;snapshot&quot;</code>.
          The listing includes filenames and hashes from every scan, so run the
          app locally or protect a public deployment.
        </p>

        <h2>File scanning (local heuristics)</h2>
        <p>
          Use <code>lib/fileAnalysis.ts</code> → <code>analyzeFile(file)</code> in
          the browser: SHA-256 + EICAR/signature match + extension risk +
          magic-byte verification + entropy + embedded-script scan. The ClamAV
          queue is wired in <code>components/FileScannerSection.tsx</code>.
        </p>
        <h2>Share links (no API key)</h2>
        <p>
          A scan can be shared as a URL. The link contains only the scanned URL
          — never the verdict or score — and opening it re-runs the scan:
        </p>
        <pre className="code">{`https://your-host/scan?url=https%3A%2F%2Fexample.com%2Flogin

# Equivalent JS
const share = \`\${location.origin}/scan?url=\${encodeURIComponent(url)}\`;
await navigator.clipboard.writeText(share);`}</pre>
        <p>
          The extension&apos;s <b>Copy link</b> button creates the same link. The
          scanner automatically unwraps a pasted <code>/scan?url=…</code> link,
          so you can drop one into the URL box on the scan page.
        </p>

        <h2>Browser extension API usage</h2>
        <p>
          The extension calls <code>POST /api/scan-url</code> from its popup and
          background service worker, then keeps the last 25 results in{" "}
          <code>chrome.storage.local</code>. Configure the base URL in the
          extension Options (default <code>http://localhost:3000</code>). The
          right-click scan actions use the same request and show the verdict in
          a notification.
        </p>
        <pre className="code">{`// extension/lib/api.js (excerpt)
const res = await fetch(\`\${baseUrl}/api/scan-url\`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ url })
});
const result = await res.json();`}</pre>

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

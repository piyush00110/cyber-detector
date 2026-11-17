# 🛡️ Cyber Detector

Free URL, file/virus and malicious-code checker. Google Safe Browsing blocklists
+ a weighted phishing heuristic engine + local file analysis and a real ClamAV
scan through a private GitHub Actions queue. History stays in the browser; no
account is required.

- **Web app:** Next.js 14 (App Router) + TypeScript
- **Browser extension:** Manifest V3, plain HTML/CSS/ES modules, no build step
- **Storage:** `localStorage` in the web app, `chrome.storage.local` in the extension
- **Deployment:** any Node host that supports Next.js (e.g. Vercel)

## Quick start

```bash
npm install
npm run dev
# http://localhost:3000
```

Optional Safe Browsing blocklists:

```bash
cp .env.example .env.local
# add GOOGLE_SAFE_BROWSING_API_KEY from Google Cloud
```

Without a key the URL scanner runs in **heuristic-only** mode and says so in the
result. Files and code work without any key. Real ClamAV scanning needs the
GitHub queue variables — see [File scanning](#file-scanning).

## Features

### URL scanner

- Google Safe Browsing `threatMatches:find` (malware, social engineering,
  unwanted software, potentially harmful apps).
- Weighted heuristic engine: no HTTPS, raw IP hosts, `@` tricks, punycode
  lookalikes, risky TLDs, shorteners, lure keywords, hyphen/digit-heavy
  domains, many subdomains, deep/encoded paths, unusual ports.
- 0–100 risk score with per-signal severity, URL anatomy breakdown, Safe
  Browsing matches, source and timestamp.
- Single scan and bulk scan (up to 10 URLs), exportable results.
- Share links: ` /scan?url=… ` contains only the scanned URL and re-runs the
  scan when opened. Results have **Copy report**, **Copy verdict**, **Copy
  JSON**, **Copy link** and **Download**.
- Searchable local history with filters, stats, JSON/CSV export and removal.

### File / virus scanner

- Browser-side SHA-256, magic-byte verification, extension risk, Shannon
  entropy, embedded script patterns and the EICAR test signature.
- Files up to 45 MB are queued to a **private** GitHub repository for a real
  ClamAV scan on GitHub Actions. The payload is deleted after scanning and is
  never executed.
- Live queue status polling and full-detail reports.

### Code analyzer

- Static analysis only; the code is never executed.
- Patterns for `eval`, `Function()`, base64/char-code obfuscation, reverse
  shells, credential/cookie theft, miners, PowerShell `-enc`, `curl | bash`,
  macro auto-exec and more.
- Line numbers and matched snippets.

### Browser extension

- Scan the active tab, paste a URL/share link, or right-click a link/page.
- Notifications for background scans, per-tab risk badge, local history.
- Copies a complete report or a `/scan?url=…` share link.
- See [`extension/README.md`](extension/README.md) and the `/extension` page.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page + tabbed scanner |
| `/scan` | Single URL + bulk URL lab; auto-scans `?url=` |
| `/analyze` | File/virus + code analyzer |
| `/history` | Local history, filters, stats, exports |
| `/extension` | Extension overview, install steps, download |
| `/results` | Workflow-generated ClamAV data listing |
| `/learn` | Phishing/malware education |
| `/api-docs` | JSON API reference |
| `/about` | Project and limitations |

## API

| Endpoint | Body | Notes |
| --- | --- | --- |
| `POST /api/scan-url` | `{ "url": "https://…" }` | Safe Browsing + heuristics |
| `POST /api/scan-bulk` | `{ "urls": ["…"] }` | Up to 10 |
| `POST /api/analyze-code` | `{ "filename": "x.js", "code": "…" }` | ~200 KB max |
| `POST /api/scan-file` | multipart `file` | 45 MB max, queues ClamAV |
| `GET /api/scan-file/status?sha256=…` | — | Polls the scan result |
| `GET /api/scan-results?limit=25` | — | Workflow-generated ClamAV data listing |
| `POST /api/trigger-av-scan` | — | Manual workflow trigger |

Example:

```bash
curl -X POST http://localhost:3000/api/scan-url \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com/login"}'
```

## Share links

Every URL result can be shared:

```
http://localhost:3000/scan?url=https%3A%2F%2Fexample.com%2Flogin
```

- The query contains **only the URL** — never the verdict, score or history.
- Opening the link scans again against live blocklists/heuristics.
- The scan box also accepts a pasted share link and unwraps the inner URL.
- The extension's **Copy link** button creates the same link using its
  configured base URL.

## Browser extension

```bash
npm run extension:zip   # → public/cyber-detector-extension.zip
```

Then:

1. Unzip it (or use the `extension/` folder).
2. Open `chrome://extensions` → enable **Developer mode** → **Load unpacked**.
3. Select the folder containing `manifest.json`.
4. Open the extension **Settings**; keep `http://localhost:3000` or enter your
   deployed origin (Chrome will ask for that origin only).
5. Start the web app, then scan the active tab, paste, or right-click a link.

Shortcut: `Ctrl+Shift+Y` / `⌘+Shift+Y`.

### Extension privacy and permissions

- `tabs` / `activeTab` — read the current tab URL for scanning.
- `storage` — local settings + last 25 scans.
- `contextMenus`, `notifications` — right-click scans and verdict alerts.
- `clipboardRead` / `clipboardWrite` — Paste and Copy buttons.
- Host access starts at localhost; other origins are optional and requested
  when you save a custom base URL.
- No analytics, no account, no server-side history.

## Environment variables

`.env.example`:

```ini
# Google Safe Browsing (optional; heuristics still work without it)
GOOGLE_SAFE_BROWSING_API_KEY=your_key_here

# ClamAV queue
GITHUB_PAT=your_github_pat_here
GITHUB_REPOSITORY=owner/repo
GITHUB_QUARANTINE_REPOSITORY=owner/cyber-detector-quarantine
# GITHUB_REF_NAME=main
```

Never commit `.env.local` or real tokens. The quarantine repository must be
private.

## File scanning

```bash
npm run setup:quarantine   # create/update the private quarantine repo + workflow
npm run scan:ci            # trigger a scan workflow manually
npm run results:pull       # cache the workflow listing for /results
```

If the private quarantine repo already exists, re-run `npm run setup:quarantine`
to push the updated workflow (including the data-listing step) into it.

The workflow (`.github/workflows/clamav-scan.yml`) runs ClamAV, publishes
`scan-results/<sha256>.json` and deletes the uploaded payload. It then fills the
**data listing**: `scan-results/index.json` (machine-readable) and
`scan-results/README.md` (Markdown table) with every published result, and
commits both as `github-actions[bot]`. The UI polls
`/api/scan-file/status` until a result is ready; `/results` shows the aggregate
listing via `GET /api/scan-results`.

With `GITHUB_PAT` configured, the API reads the listing live from the private
repo. Without a PAT, run `npm run results:pull` — it uses the GitHub CLI (or
`GITHUB_PAT`) to download the same `index.json` into the gitignored
`.cache/scan-results/index.json`, and `/results` serves that snapshot.

> The listing includes filenames and hashes from every scan. It is served to
> anyone who can reach the app — run locally or protect a public deployment.

## Project layout

```
app/                 Next.js routes (pages + API routes)
components/          Scanner UI, result cards, history, nav/footer
lib/                 Heuristics, Safe Browsing, file/code analysis, share/report
extension/           Manifest V3 browser extension (load unpacked)
scripts/             ClamAV queue helpers + extension packaging
public/              Extension ZIP download
quarantine/          Local placeholder for the private scan queue
```

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start Next.js on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | Next.js lint |
| `npm run scan:ci` | Trigger the ClamAV workflow |
| `npm run results:pull` | Cache the workflow ClamAV listing in `.cache/` |
| `npm run setup:quarantine` | Create/configure the private quarantine repo |
| `npm run extension:zip` | Rebuild the downloadable extension ZIP |

## Limitations

- Blocklists lag zero-day and targeted phishing sites.
- Static analysis cannot prove a file or code is safe.
- A CLEAN/SAFE verdict is not a guarantee — treat unexpected links and
  attachments as hostile.
- For real malware triage, use a sandbox and enterprise AV.

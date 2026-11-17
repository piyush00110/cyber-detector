# Cyber Detector — browser extension

Manifest V3 extension for Chrome, Edge, Brave and Opera. It talks to the Cyber
Detector web app's `POST /api/scan-url` endpoint.

## Features

- **Scan this tab** — the popup prefills the active tab's URL.
- **Paste & scan** — reads the clipboard and scans immediately; accepts a bare
  URL or a `/scan?url=…` share link and unwraps it.
- **Right-click scans** — link, page, or selected text from the context menu.
  A notification shows the verdict; click it (or its button) to open the full
  report.
- **Full-detail copy** — verdict, score, source, URL anatomy, every heuristic
  signal, Safe Browsing matches, warning and timestamp.
- **Shareable re-scan links** — copies `…/scan?url=…`. Only the URL is in the
  link; the recipient re-runs the scan against live data.
- **Local history** — last 25 scans in `chrome.storage.local`, deduped by URL.
- **Configurable server** — localhost by default; add a deployed origin in
  Settings and grant that origin only.
- **Shortcut** — `Ctrl+Shift+Y` (`⌘+Shift+Y`) opens the popup.

## Install (load unpacked)

1. Download/unzip the extension, or use this `extension/` folder directly.
2. Open `chrome://extensions` (Edge: `edge://extensions`, Brave:
   `brave://extensions`).
3. Enable **Developer mode**.
4. Click **Load unpacked** and select the folder containing `manifest.json`.
5. Pin the extension, then click it on any page.

There is no build step — the extension is plain HTML/CSS/ES modules.

## Configure

Start the web app:

```bash
npm install
npm run dev
```

Default base URL: `http://localhost:3000`. To use a deployment, open the
extension's **Settings** and enter the full origin, e.g.
`https://scanner.example.com`. Saving a non-local origin triggers a Chrome
permission prompt for that origin only.

Use **Test connection** to confirm the server is reachable; it scans
`https://example.com` and prints the verdict.

## Files

```
extension/
  manifest.json          Manifest V3 definition
  background.js          context menus, notifications, badge
  lib/api.js             settings, scan request, share links, storage, copy
  lib/format.js          URL anatomy, report text, verdict metadata
  popup/popup.html       toolbar popup
  popup/popup.css
  popup/popup.js
  options/options.html   settings + history export
  options/options.css
  options/options.js
  icons/                 16/32/48/128 px PNGs
```

## Permissions

| Permission | Why |
| --- | --- |
| `activeTab`, `tabs` | Read the current tab URL for scanning. |
| `storage` | Settings + local scan history. |
| `contextMenus` | Right-click scan actions. |
| `notifications` | Verdict after a background/context-menu scan. |
| `clipboardRead`, `clipboardWrite` | Paste / Copy buttons. |
| Host access | `localhost` / `127.0.0.1` by default; other origins are optional and requested on save. |

## Privacy

- The scanned URL is sent to the configured Cyber Detector server and, if the
  server has a key, to Google Safe Browsing.
- History is local (`chrome.storage.local`) and contains URL + verdict + score
  + timestamp. Export or clear it from Settings.
- No analytics, account, or server-side history.
- The extension never executes or downloads scanned content.

## Troubleshooting

- **Cannot reach `http://localhost:3000`** — run `npm run dev`, or set the
  deployed URL in Settings. Custom origins need the permission prompt accepted.
- **Clipboard blocked** — click the URL box and press `Ctrl+V`.
- **heuristic-only results** — the server has no
  `GOOGLE_SAFE_BROWSING_API_KEY`; heuristics still run.
- **After editing files** — reload at `chrome://extensions`. Regenerate the
  downloadable ZIP with `npm run extension:zip` from the project root.

## Packaging

```bash
npm run extension:zip
# → public/cyber-detector-extension.zip
```

The ZIP has `manifest.json` at its root; unzip it and load the folder unpacked.

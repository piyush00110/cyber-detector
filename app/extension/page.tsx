import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Browser extension",
  description:
    "Scan the tab you are on, paste any link, or right-click a link with the Cyber Detector Chrome/Edge extension. Copy a full report or a shareable re-scan link in one click.",
};

const FEATURES = [
  {
    icon: "🖥️",
    title: "Scan the current tab",
    body: "Open the popup and the tab URL is already filled in. One click checks it with Google Safe Browsing + the weighted phishing algorithm.",
  },
  {
    icon: "🖱️",
    title: "Right-click any link",
    body: "Scan a link, the current page, or selected text from the context menu. The result arrives as a notification with a button to the full report.",
  },
  {
    icon: "📋",
    title: "Paste & scan",
    body: "Paste a link (or a /scan?url=… share link) and scan it immediately — no switching tabs.",
  },
  {
    icon: "📄",
    title: "Full-detail reports",
    body: "Copy the entire report — verdict, 0–100 score, source, URL anatomy, every signal, Safe Browsing matches and timestamp — as formatted text.",
  },
  {
    icon: "🔗",
    title: "Shareable re-scan links",
    body: "Copy a link to the hosted scanner. Only the URL is in the link; the recipient re-runs the scan against live data.",
  },
  {
    icon: "💾",
    title: "Private local history",
    body: "Recent scans live in chrome.storage on your device. No account, no server-side history, clear it any time.",
  },
];

const STEPS = [
  {
    title: "Get the extension folder",
    body: "Download the ZIP below and unzip it, or use the extension/ folder from the project. Keep the folder somewhere permanent — Chrome loads it from that path.",
  },
  {
    title: "Open the extensions page",
    body: "Chrome: chrome://extensions · Edge: edge://extensions · Brave: brave://extensions. Turn on Developer mode (top-right).",
  },
  {
    title: "Load unpacked",
    body: "Click Load unpacked and select the unzipped folder (the one that contains manifest.json). Pin Cyber Detector to the toolbar.",
  },
  {
    title: "Point it at your scanner",
    body: "Start the app with npm run dev (http://localhost:3000), or open extension Settings and enter your deployed URL. Use Test connection to verify.",
  },
];

export default function ExtensionPage() {
  return (
    <section>
      <div className="wrap">
        <span className="kicker">Chrome · Edge · Brave · Opera</span>
        <h1 style={{ margin: "8px 0", fontSize: "clamp(30px, 4vw, 44px)", letterSpacing: "-1px" }}>
          Check links without leaving the page
        </h1>
        <p style={{ color: "var(--muted)", maxWidth: 760, fontSize: 17 }}>
          The Cyber Detector browser extension puts the scanner one click away.
          It scans the tab you are on, pastes links from your clipboard, handles
          right-click scans, and copies a complete report or a shareable
          re-scan link.
        </p>
        <div className="btn-row" style={{ marginTop: 20 }}>
          <a
            href="/cyber-detector-extension.zip"
            className="btn"
            download
            style={{ textDecoration: "none" }}
          >
            ⬇ Download extension ZIP
          </a>
          <Link href="/scan" className="btn btn-ghost" style={{ textDecoration: "none" }}>
            Open the web scanner
          </Link>
          <a href="#install" className="btn btn-ghost" style={{ textDecoration: "none" }}>
            Install steps
          </a>
        </div>

        <div className="grid c3" style={{ marginTop: 34 }}>
          {FEATURES.map((f) => (
            <div key={f.title} className="feature">
              <div className="icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </div>
          ))}
        </div>

        <h2 id="install" style={{ marginTop: 48 }}>
          Install in about a minute
        </h2>
        <p style={{ color: "var(--muted)", maxWidth: 760 }}>
          The extension is plain Manifest V3 JavaScript — there is no build step
          and no npm install needed. Only do this with files you trust; unpacked
          extensions run with the permissions listed below.
        </p>
        <ol className="ext-steps">
          {STEPS.map((s, i) => (
            <li key={s.title}>
              <span className="num">{i + 1}</span>
              <div>
                <b>{s.title}</b>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="note">
          <b>Shortcut:</b> <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Y</kbd>{" "}
          (<kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>Y</kbd> on macOS) opens the
          popup. You can change it at <code>chrome://extensions/shortcuts</code>.
        </div>

        <h2>What it does with your data</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Data</th>
              <th>Where it goes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The URL you scan</td>
              <td>
                POSTed to <code>/api/scan-url</code> on your configured Cyber
                Detector server, then to Google Safe Browsing if the server has a
                key.
              </td>
            </tr>
            <tr>
              <td>Recent scans</td>
              <td>
                Kept in <code>chrome.storage.local</code> on this device (max 25
                entries: URL, verdict, score, time). Never uploaded.
              </td>
            </tr>
            <tr>
              <td>Clipboard</td>
              <td>Read only after you click Paste or Paste &amp; scan.</td>
            </tr>
            <tr>
              <td>Tab URL</td>
              <td>
                Read when you open the popup or use a context-menu scan. It is
                not collected in the background.
              </td>
            </tr>
          </tbody>
        </table>

        <h2>Permissions, explained</h2>
        <ul>
          <li>
            <code>activeTab</code> / <code>tabs</code> — read the current tab URL
            so it can be scanned.
          </li>
          <li>
            <code>storage</code> — save settings and the local scan history.
          </li>
          <li>
            <code>contextMenus</code> — add the right-click scan actions.
          </li>
          <li>
            <code>notifications</code> — show the verdict after a context-menu
            scan.
          </li>
          <li>
            <code>clipboardRead</code> / <code>clipboardWrite</code> — the Paste
            and Copy buttons.
          </li>
          <li>
            Host access is limited to localhost by default. Adding a deployed
            server in Settings asks for permission for that origin only.
          </li>
        </ul>

        <h2>Change the scanner URL</h2>
        <p style={{ color: "var(--muted)" }}>
          Click the gear icon in the popup (or open the extension&apos;s Options)
          and set the base URL. The default is{" "}
          <code>http://localhost:3000</code>. For a deployment, use the full
          origin, e.g. <code>https://your-scanner.example.com</code>.
        </p>
        <pre className="code">{`# Start the local scanner
npm install
npm run dev

# Then in extension Settings
Base URL: http://localhost:3000
[✓] Show notifications
[ ] Scan the current tab when the popup opens
[Test connection]`}</pre>

        <h2>Troubleshooting</h2>
        <details className="faq">
          <summary>“Cannot reach http://localhost:3000”</summary>
          <p>
            The web app is not running, or it is on another port. Run{" "}
            <code>npm run dev</code> and confirm the URL in Settings. If you use
            a deployed server, add that origin and grant the permission prompt.
          </p>
        </details>
        <details className="faq">
          <summary>Paste says the clipboard is blocked</summary>
          <p>
            Click the input first and press <kbd>Ctrl</kbd>+<kbd>V</kbd>{" "}
            (<kbd>⌘</kbd>+<kbd>V</kbd>). Some browsers require the document to be
            focused before granting clipboard access.
          </p>
        </details>
        <details className="faq">
          <summary>The verdict says “heuristic-only”</summary>
          <p>
            The server has no <code>GOOGLE_SAFE_BROWSING_API_KEY</code>. Add a
            free key to <code>.env.local</code> and restart the app for full
            blocklist checks. Heuristics still work without it.
          </p>
        </details>
        <details className="faq">
          <summary>I edited the extension files</summary>
          <p>
            Reload it at <code>chrome://extensions</code>, then run{" "}
            <code>npm run extension:zip</code> to refresh the downloadable ZIP
            on this page.
          </p>
        </details>

        <div className="cta">
          <h2>Scan before you click</h2>
          <p>
            Use the extension for the links you meet in the wild, and the full
            site for files, code and history.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="/cyber-detector-extension.zip"
              className="btn"
              download
              style={{ textDecoration: "none" }}
            >
              ⬇ Download ZIP
            </a>
            <Link href="/analyze" className="btn btn-ghost" style={{ textDecoration: "none" }}>
              Open code &amp; file lab
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

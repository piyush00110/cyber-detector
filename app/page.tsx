import type { Metadata } from "next";
import Link from "next/link";
import ScannerTabs from "@/components/ScannerTabs";

export const metadata: Metadata = {
  title: "Cyber Detector — URL, Virus & Malicious Code Scanner",
};

const FEATURES = [
  { icon: "🔍", title: "Google Safe Browsing", body: "URLs checked against Google's blocklists: malware, phishing (social engineering), unwanted software and harmful apps." },
  { icon: "🧠", title: "Best-weight URL algorithm", body: "Weighted-signal engine: no-HTTPS, IP hosts, @ tricks, punycode lookalikes, risky TLDs, shorteners, lure keywords, deep paths — one 0–100 risk score." },
  { icon: "🦠", title: "In-browser virus/file check", body: "Files are SHA-256 hashed and inspected on your device — EICAR signatures, double extensions, spoofed magic bytes, entropy packing, embedded scripts. Never uploaded." },
  { icon: "🧬", title: "Malicious-code analyzer", body: "Static scan of JS, HTML, Python, PowerShell, shell and macros: eval, obfuscation, stealers, reverse shells, miners — 18 patterns, never executed." },
  { icon: "💾", title: "localStorage history", body: "Every scan is saved on your device only — URLs store verdict+score, files store hash, code stores filename. Clear anytime, nothing leaves your browser." },
  { icon: "🔌", title: "Free JSON API", body: "POST /api/scan-url, /api/scan-bulk and /api/analyze-code. Documented under API Docs." },
];

const URL_THREATS = [
  { icon: "🦠", title: "Malware sites", body: "Drive-by downloads, fake installers, ransomware pages." },
  { icon: "🎣", title: "Phishing pages", body: "Fake bank, mail and crypto logins that steal credentials." },
  { icon: "📦", title: "Unwanted software", body: "Deceptive cleaners, bundled adware, hijackers." },
  { icon: "📱", title: "Harmful apps", body: "Pages pushing malicious mobile apps outside stores." },
];

const FILE_THREATS = [
  { icon: "🎭", title: "Disguised executables", body: "Double extensions (invoice.pdf.exe) and spoofed magic bytes." },
  { icon: "📦", title: "Packed payloads", body: "High-entropy packing/encryption plus embedded script patterns." },
  { icon: "💉", title: "Script malware", body: "eval, encoded PowerShell, curl|bash pipes, reverse shells." },
  { icon: "🕵️", title: "Stealers & miners", body: "Cookie/storage theft, keyloggers, skimmers, miners." },
];

const FAQS = [
  { q: "Is it free? Do I need an API key?", a: "Yes, free with no signup. URL scans work in heuristic-only mode without a key; add GOOGLE_SAFE_BROWSING_API_KEY in .env.local for full blocklist verdicts (free quota from Google Cloud). File and code scans always work — they run 100% locally." },
  { q: "Are my files uploaded anywhere?", a: "No. File scanning is fully in-browser: SHA-256 hash + byte inspection happen on your device. Only the hash and verdict are kept in your localStorage — never the file content." },
  { q: "What is stored in localStorage?", a: "URL scans keep url+verdict+score, file scans keep filename+hash+verdict, code scans keep filename+verdict. Max 30 entries, on your device only. One click clears everything." },
  { q: "What do the verdicts mean?", a: "CLEAN/SAFE: nothing found. SUSPICIOUS: odd traits — verify before opening. MALICIOUS: dangerous — do not visit, open or run." },
  { q: "Can a clean result still be dangerous?", a: "Yes. Blocklists lag zero-day sites and static analysis can't catch everything. Treat unexpected links and attachments as hostile regardless of verdict — and never run suspicious files on a real machine." },
  { q: "How do I prove the scanner works?", a: "URL tab: use the Google test URLs. File tab: download the EICAR standard test file (harmless) and scan it — it must flag MALICIOUS. Code tab: try the XSS / Obfuscated samples." },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap">
          <span className="kicker">Free URL · virus · code checker</span>
          <h1>
            Is that link or file <span className="grad">safe?</span>
          </h1>
          <p className="lead">
            Scan URLs against Google Safe Browsing + phishing heuristics, check
            files for viruses locally in your browser, and analyze suspicious
            code — with history saved only on your device.
          </p>
          <ScannerTabs />
          <div className="hero-badges">
            <span>✅ No signup</span>
            <span>⚡ ~1s scans</span>
            <span>🔒 Files never uploaded</span>
            <span>💾 localStorage history</span>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="stats">
            <div className="stat"><b>4</b><span>URL threat categories</span></div>
            <div className="stat"><b>14+</b><span>Phishing signals</span></div>
            <div className="stat"><b>23+</b><span>File + code patterns</span></div>
            <div className="stat"><b>0</b><span>Uploads, accounts, cost</span></div>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <span className="kicker">Why Cyber Detector</span>
            <h2>Four engines, private by design</h2>
            <p>Blocklist intelligence plus weighted local algorithms — files never leave your device.</p>
          </div>
          <div className="grid c3">
            {FEATURES.map((f) => (
              <div key={f.title} className="feature">
                <div className="icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <span className="kicker">How it works</span>
            <h2>Paste or drop → analyze → explainable verdict</h2>
          </div>
          <div className="grid c3">
            <div className="feature step">
              <div className="num">1</div>
              <h3>Paste, upload or drop</h3>
              <p>URLs are normalized and validated. Files are hashed (SHA-256) and read as bytes in your browser — code is pasted as text.</p>
            </div>
            <div className="feature step">
              <div className="num">2</div>
              <h3>Weighted algorithms</h3>
              <p>Safe Browsing <code>threatMatches:find</code> plus severity-weighted signal scoring (0–100) for URLs, files and code.</p>
            </div>
            <div className="feature step">
              <div className="num">3</div>
              <h3>Verdict + local history</h3>
              <p>CLEAN/SAFE, SUSPICIOUS or MALICIOUS with per-signal severity tags — saved to localStorage on your device only.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <span className="kicker">Threat coverage</span>
            <h2>What we catch</h2>
          </div>
          <h3 style={{ marginBottom: 12 }}>🔗 Malicious URLs</h3>
          <div className="grid c4" style={{ marginBottom: 24 }}>
            {URL_THREATS.map((t) => (
              <div key={t.title} className="feature">
                <div className="icon">{t.icon}</div>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
          <h3 style={{ marginBottom: 12 }}>🦠 Viruses & malicious code</h3>
          <div className="grid c4">
            {FILE_THREATS.map((t) => (
              <div key={t.title} className="feature">
                <div className="icon">{t.icon}</div>
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 16 }}>
            <Link href="/learn">Learn to spot these yourself →</Link> ·{" "}
            <Link href="/analyze">Open code & file lab →</Link>
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap prose">
          <div className="section-head">
            <span className="kicker">FAQ</span>
            <h2>Questions, answered</h2>
          </div>
          {FAQS.map((f) => (
            <details key={f.q} className="faq">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
          <div className="cta">
            <h2>Check before you click — or run</h2>
            <p>Five seconds here can save your accounts and your machine.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="#scanner" className="btn" style={{ textDecoration: "none" }}>Scan now</a>
              <Link href="/analyze" className="btn btn-ghost" style={{ textDecoration: "none" }}>Open file lab</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

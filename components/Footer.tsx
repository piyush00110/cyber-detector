import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap foot-grid">
        <div>
          <b style={{ color: "var(--text)" }}>🛡️ Cyber Detector</b>
          <div style={{ marginTop: 6, maxWidth: 400 }}>
            Free URL, file/virus and malicious-code checker. Google Safe
            Browsing + weighted heuristics + a real ClamAV scan through a
            private queue. History stays in your localStorage. For education and
            triage — not a replacement for enterprise AV or sandboxed malware
            analysis.
          </div>
        </div>
        <nav>
          <Link href="/scan">URL Scanner</Link>
          <Link href="/analyze">Code & Files</Link>
          <Link href="/history">History</Link>
          <Link href="/learn">Learn</Link>
          <Link href="/api-docs">API Docs</Link>
          <Link href="/about">About</Link>
        </nav>
      </div>
      <div className="wrap" style={{ marginTop: 16, fontSize: 12.5 }}>
        © {new Date().getFullYear()} Cyber Detector · Never run suspicious
        files or enter passwords on shady sites.
      </div>
    </footer>
  );
}

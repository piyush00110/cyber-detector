import type { Metadata } from "next";
import FileScannerSection from "@/components/FileScannerSection";
import CodeAnalyzerSection from "@/components/CodeAnalyzerSection";

export const metadata: Metadata = { title: "Virus, file & code lab" };

export default function AnalyzePage() {
  return (
    <section>
      <div className="wrap">
        <span className="kicker">Malware lab</span>
        <h1 style={{ margin: "8px 0" }}>Virus, file & code detector</h1>
        <p style={{ color: "var(--muted)", maxWidth: 700 }}>
          Files first run fast local heuristics (SHA-256, magic bytes, entropy,
          EICAR, embedded scripts), then are uploaded to a private queue for a
          real ClamAV scan on GitHub Actions. Pasted code is checked against 18
          malicious patterns via the API. Nothing is ever executed. Scan history
          stays in localStorage on this device.
        </p>
        <h2 style={{ fontSize: 20, marginTop: 32 }}>🦠 File / virus check</h2>
        <div style={{ marginTop: 16 }}>
          <FileScannerSection />
        </div>
        <h2 style={{ fontSize: 20, marginTop: 40 }}>🧬 Malicious-code check</h2>
        <div style={{ marginTop: 16 }}>
          <CodeAnalyzerSection />
        </div>
        <div className="grid c3" style={{ marginTop: 28 }}>
          <div className="feature"><div className="icon">🛡️</div><h3>Private scan queue</h3><p>Files up to 45 MB are uploaded to a private quarantine repo and scanned by ClamAV on GitHub Actions. The payload is deleted after scanning, and files are never executed.</p></div>
          <div className="feature"><div className="icon">💾</div><h3>localStorage history</h3><p>Last 30 scans on this device: file hashes (not content), URLs and code filenames with verdicts. Clear anytime.</p></div>
          <div className="feature"><div className="icon">⚗️</div><h3>Prove it works</h3><p>Download the harmless EICAR test file from the file scanner and re-scan it — every correct engine flags it as malicious.</p></div>
        </div>
      </div>
    </section>
  );
}

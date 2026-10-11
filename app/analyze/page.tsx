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
          Files are hashed (SHA-256) and inspected <b>entirely in your browser</b> —
          signatures, double extensions, spoofed types, entropy packing and
          embedded scripts. Pasted code is checked against 18 malicious
          patterns via the API (never executed). Everything is saved to
          localStorage on this device only.
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
          <div className="feature"><div className="icon">🔒</div><h3>Zero upload</h3><p>File bytes never leave your device. URL/code checks send only the URL or pasted text to our API — file content stays local.</p></div>
          <div className="feature"><div className="icon">💾</div><h3>localStorage history</h3><p>Last 30 scans on this device: file hashes (not content), URLs and code filenames with verdicts. Clear anytime.</p></div>
          <div className="feature"><div className="icon">⚗️</div><h3>Prove it works</h3><p>Download the harmless EICAR test file from the file scanner and re-scan it — every correct engine flags it as malicious.</p></div>
        </div>
      </div>
    </section>
  );
}

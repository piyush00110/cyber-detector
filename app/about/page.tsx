import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <section>
      <div className="wrap prose">
        <span className="kicker">About</span>
        <h1>Cyber Detector</h1>
        <p>
          A fast, educational threat-triage tool: URL phishing
          detection, ClamAV-backed virus/file analysis plus local heuristics,
          and static malicious-code scanning. Built with Next.js 14 (App Router)
          + TypeScript, with transparent weighted algorithms so every verdict is
          explainable.
        </p>
        <h2>How the algorithms work</h2>
        <ul>
          <li><b>URLs</b> (<code>lib/heuristics.ts</code>): 14 severity-weighted signals → 0–100 score → safe/low/suspicious/high, combined with Google Safe Browsing blocklists.</li>
          <li><b>Files</b> (<code>lib/fileAnalysis.ts</code> + <code>lib/githubQuarantine.ts</code>): local SHA-256, EICAR/content signatures, extension risk, magic-byte verification, Shannon entropy and embedded-script scan — then a real ClamAV pass through a private GitHub Actions quarantine queue. Files are never executed.</li>
          <li><b>Code</b> (<code>lib/codeAnalysis.ts</code>): 18 static patterns with line numbers and matched snippets — never executed.</li>
        </ul>
        <h2>Privacy</h2>
        <p>
          URLs are checked against Google Safe Browsing (required for
          blocklists). Files run local heuristics in your browser, then up to 45
          MB are uploaded to a private quarantine repo and scanned by ClamAV on
          GitHub Actions; the payload is deleted after the scan. Scan history
          (URLs: verdict+score · files: hash+verdict · code: filename+verdict,
          max 30) lives only in your browser&apos;s localStorage. Files are never
          executed.
        </p>
        <h2>Disclaimer</h2>
        <p>
          For education and quick triage — not a guarantee of safety and not a
          replacement for real antivirus or sandboxed malware analysis. Always
          verify sensitive links through official apps, and never run
          suspicious files on a real machine.
        </p>
        <p>
          <Link href="/scan">→ URL scanner</Link> ·{" "}
          <Link href="/analyze">→ File & code lab</Link> ·{" "}
          <Link href="/learn">→ Learn the red flags</Link>
        </p>
      </div>
    </section>
  );
}

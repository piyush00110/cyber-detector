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
          A fast, private, educational threat-triage tool: URL phishing
          detection, in-browser virus/file analysis and static malicious-code
          scanning. Built with Next.js 14 (App Router) + TypeScript, with
          transparent weighted algorithms so every verdict is explainable.
        </p>
        <h2>How the algorithms work</h2>
        <ul>
          <li><b>URLs</b> (<code>lib/heuristics.ts</code>): 14 severity-weighted signals → 0–100 score → safe/low/suspicious/high, combined with Google Safe Browsing blocklists.</li>
          <li><b>Files</b> (<code>lib/fileAnalysis.ts</code>): SHA-256 + EICAR/content signatures + extension risk + magic-byte verification + Shannon entropy + embedded-script scan — 100% client-side.</li>
          <li><b>Code</b> (<code>lib/codeAnalysis.ts</code>): 18 static patterns with line numbers and matched snippets — never executed.</li>
        </ul>
        <h2>Privacy</h2>
        <p>
          Files are never uploaded. History lives only in your browser&apos;s
          localStorage (URLs: verdict+score · files: hash+verdict · code:
          filename+verdict, max 30). Scanned URLs are checked against Google
          Safe Browsing (required for blocklists). Nothing is stored server-side.
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

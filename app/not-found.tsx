import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section>
      <div className="wrap" style={{ textAlign: "center", padding: "72px 20px" }}>
        <div style={{ fontSize: 56, lineHeight: 1 }}>🛡️</div>
        <h1 style={{ margin: "16px 0 8px", fontSize: 30 }}>404 — nothing here</h1>
        <p style={{ color: "var(--muted)", maxWidth: 460, margin: "0 auto 24px" }}>
          That page doesn&apos;t exist. The scanner, file lab and history are all
          one click away.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link href="/" className="btn" style={{ textDecoration: "none" }}>
            Back home
          </Link>
          <Link href="/scan" className="btn btn-ghost" style={{ textDecoration: "none" }}>
            Scan a URL
          </Link>
          <Link href="/history" className="btn btn-ghost" style={{ textDecoration: "none" }}>
            View history
          </Link>
        </div>
      </div>
    </section>
  );
}

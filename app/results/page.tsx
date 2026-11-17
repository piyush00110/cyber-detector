import type { Metadata } from "next";
import ResultsListing from "@/components/ResultsListing";

export const metadata: Metadata = {
  title: "ClamAV results",
  description:
    "The workflow-generated ClamAV data listing: verdicts, filenames, SHA-256 hashes, signatures and timestamps from the private quarantine repo.",
};

export default function ResultsPage() {
  return (
    <section>
      <div className="wrap">
        <span className="kicker">GitHub Actions</span>
        <h1 style={{ margin: "8px 0" }}>ClamAV data listing</h1>
        <p style={{ color: "var(--muted)", maxWidth: 780 }}>
          Every file scanned through the private ClamAV queue is published as a
          small JSON result, then aggregated into one{" "}
          <code>scan-results/index.json</code> listing by the workflow. This page
          reads that listing through <code>GET /api/scan-results</code>. Upload a
          file from the <a href="/analyze">File tab</a> to add a row, or run{" "}
          <code>npm run scan:ci</code> to trigger the workflow.
        </p>
        <ResultsListing />
      </div>
    </section>
  );
}

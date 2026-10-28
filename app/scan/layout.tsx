import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "URL detector",
  description:
    "Scan a single URL or up to 10 at once with Google Safe Browsing blocklists and weighted phishing heuristics.",
};

export default function ScanLayout({ children }: { children: React.ReactNode }) {
  return children;
}

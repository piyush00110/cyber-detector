"use client";

import { useState } from "react";
import ScannerSection from "@/components/ScannerSection";
import FileScannerSection from "@/components/FileScannerSection";
import CodeAnalyzerSection from "@/components/CodeAnalyzerSection";

type Tab = "url" | "file" | "code";

export default function ScannerTabs() {
  const [tab, setTab] = useState<Tab>("url");
  return (
    <div id="scanner">
      <div className="tabs" role="tablist" aria-label="Scanner type">
        <button role="tab" aria-selected={tab === "url"} className={tab === "url" ? "active" : ""} onClick={() => setTab("url")}>
          🔗 URL check
        </button>
        <button role="tab" aria-selected={tab === "file"} className={tab === "file" ? "active" : ""} onClick={() => setTab("file")}>
          🦠 File / virus check
        </button>
        <button role="tab" aria-selected={tab === "code"} className={tab === "code" ? "active" : ""} onClick={() => setTab("code")}>
          🧬 Code check
        </button>
      </div>
      {tab === "url" && <ScannerSection id="scanner-url" />}
      {tab === "file" && <FileScannerSection />}
      {tab === "code" && <CodeAnalyzerSection />}
    </div>
  );
}

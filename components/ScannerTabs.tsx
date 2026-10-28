"use client";

import { useState } from "react";
import ScannerSection from "@/components/ScannerSection";
import FileScannerSection from "@/components/FileScannerSection";
import CodeAnalyzerSection from "@/components/CodeAnalyzerSection";

type Tab = "url" | "file" | "code";

export default function ScannerTabs() {
  const [tab, setTab] = useState<Tab>("url");
  const tabs: Array<{ id: Tab; label: string }> = [
    { id: "url", label: "🔗 URL check" },
    { id: "file", label: "🦠 File / virus check" },
    { id: "code", label: "🧬 Code check" },
  ];
  return (
    <div id="scanner">
      <div className="tabs" role="tablist" aria-label="Scanner type">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            tabIndex={tab === t.id ? 0 : -1}
            className={tab === t.id ? "active" : ""}
            onClick={() => setTab(t.id)}
            onKeyDown={(e) => {
              if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
              e.preventDefault();
              const i = tabs.findIndex((x) => x.id === tab);
              const next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
              setTab(next.id);
              document.getElementById(`tab-${next.id}`)?.focus();
            }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {tab === "url" && <ScannerSection id="scanner-url" />}
        {tab === "file" && <FileScannerSection />}
        {tab === "code" && <CodeAnalyzerSection />}
      </div>
    </div>
  );
}

/**
 * Formatting helpers shared by the popup, options page and notifications.
 */

import { shareLink } from "./api.js";

const TWO_LEVEL_SUFFIXES = new Set([
  "co.uk", "org.uk", "ac.uk", "gov.uk", "me.uk",
  "co.in", "net.in", "org.in", "gen.in", "firm.in",
  "com.au", "net.au", "org.au", "edu.au", "gov.au",
  "co.nz", "co.za", "co.jp", "co.kr", "co.id", "co.ke", "co.il",
  "com.br", "com.mx", "com.ar", "com.tr", "com.cn", "com.tw",
  "com.sg", "com.my", "com.ph", "com.vn", "com.pk", "com.bd",
  "com.np", "com.sa", "com.eg", "com.ng", "com.ua", "com.pl",
  "com.hk", "com.co", "net.co", "org.co",
]);

const VERDICTS = {
  safe: {
    label: "SAFE",
    icon: "✅",
    blurb: "No blocklist hits and low heuristic risk.",
    color: "#22c55e",
    className: "safe",
  },
  suspicious: {
    label: "SUSPICIOUS",
    icon: "⚠️",
    blurb: "Something looks off — review the signals before visiting.",
    color: "#f59e0b",
    className: "suspicious",
  },
  malicious: {
    label: "MALICIOUS",
    icon: "⛔",
    blurb: "Do not visit. Flagged as dangerous or very high-risk.",
    color: "#ef4444",
    className: "malicious",
  },
};

export function verdictMeta(verdict) {
  return VERDICTS[verdict] || {
    label: String(verdict || "UNKNOWN").toUpperCase(),
    icon: "❔",
    blurb: "Unknown verdict.",
    color: "#94a3b8",
    className: "unknown",
  };
}

export function riskColor(score) {
  if (score >= 50) return "#ef4444";
  if (score >= 25) return "#f59e0b";
  return "#22c55e";
}

export function parseUrlParts(raw) {
  let url;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  const hostname = url.hostname.toLowerCase();
  const isIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname) || hostname.startsWith("[");
  const labels = hostname.split(".").filter(Boolean);
  const isPunycode = hostname.includes("xn--");

  let tld = labels[labels.length - 1] || "";
  let registrableDomain = hostname;
  let subdomain = "";

  if (!isIp && labels.length >= 2) {
    const lastTwo = labels.slice(-2).join(".");
    if (TWO_LEVEL_SUFFIXES.has(lastTwo) && labels.length >= 3) {
      tld = lastTwo;
      registrableDomain = labels.slice(-3).join(".");
    } else {
      tld = labels[labels.length - 1] || "";
      registrableDomain = lastTwo;
    }
    const baseCount = registrableDomain.split(".").length;
    subdomain = labels.slice(0, Math.max(0, labels.length - baseCount)).join(".");
  }

  return {
    protocol: url.protocol.replace(":", ""),
    hostname,
    port: url.port,
    tld,
    registrableDomain,
    subdomain,
    path: url.pathname || "/",
    query: url.search,
    hash: url.hash,
    isIp,
    isPunycode,
    isHttps: url.protocol === "https:",
    totalLength: raw.length,
  };
}

export function timeAgo(iso) {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "unknown";
  const secs = Math.max(0, Math.round((Date.now() - then) / 1000));
  if (secs < 45) return "just now";
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function sourceLabel(source) {
  if (!source) return "heuristics";
  return String(source).replace(/\+/g, " + ").replace(/-/g, " ");
}

export function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function signalText(signal) {
  const severity = String(signal.severity || "low").toUpperCase();
  const points = typeof signal.points === "number" ? ` (+${signal.points})` : "";
  const line = typeof signal.line === "number" ? ` · line ${signal.line}` : "";
  const match = signal.match ? `\n      match: ${signal.match}` : "";
  return `  - [${severity}] ${signal.label || signal.id || "signal"} — ${signal.detail || ""}${points}${line}${match}`;
}

/**
 * Complete, paste-ready report. Mirrors every field rendered in the popup.
 */
export function buildReport(result, baseUrl) {
  const meta = verdictMeta(result.verdict);
  const score = result.heuristics && typeof result.heuristics.score === "number" ? result.heuristics.score : 0;
  const lines = [
    "Cyber Detector — URL scan report",
    "================================",
    `Verdict: ${meta.icon} ${meta.label}`,
    `URL: ${result.url}`,
    `Risk score: ${score}/100`,
    `Source: ${sourceLabel(result.source)}`,
    `Scanned: ${result.scannedAt || "unknown"}`,
  ];

  const parts = parseUrlParts(result.url);
  if (parts) {
    lines.push(
      "",
      "URL anatomy:",
      `  Scheme: ${parts.protocol}${parts.isHttps ? "" : "  ⚠ not HTTPS"}`,
      `  Host: ${parts.hostname}`,
      `  Registrable domain: ${parts.registrableDomain}`,
      `  TLD: ${parts.tld || "—"}`,
      `  Subdomain: ${parts.subdomain || "—"}`,
      `  Port: ${parts.port || "default"}`,
      `  Path: ${parts.path}`,
      `  Query: ${parts.query || "—"}`,
      `  Fragment: ${parts.hash || "—"}`,
      `  Length: ${parts.totalLength} chars`,
      `  Raw IP host: ${parts.isIp ? "yes ⚠" : "no"}`,
      `  Punycode: ${parts.isPunycode ? "yes ⚠" : "no"}`
    );
  }

  if (result.heuristics && result.heuristics.level) {
    lines.push("", `Heuristic level: ${result.heuristics.level}`);
  }

  const signals = (result.heuristics && Array.isArray(result.heuristics.signals) && result.heuristics.signals) || [];
  lines.push("", "Signals:");
  if (signals.length === 0) lines.push("  none");
  else signals.forEach((signal) => lines.push(signalText(signal)));

  lines.push("", "Google Safe Browsing matches:");
  const matches = Array.isArray(result.matches) ? result.matches : [];
  if (matches.length === 0) lines.push("  none");
  else {
    matches.forEach((match) => {
      lines.push(`  - ${match.threatType || "UNKNOWN"} (${match.platformType || "ANY_PLATFORM"})`);
    });
  }

  if (result.warning) lines.push("", `Warning: ${result.warning}`);
  lines.push("", `Share / re-scan: ${shareLink(baseUrl, result.url)}`);
  lines.push(
    "",
    "—",
    "Triage signals are not proof of safety. Do not visit links you did not expect.",
    "Generated by the Cyber Detector browser extension."
  );
  return lines.join("\n");
}

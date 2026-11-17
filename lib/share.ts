/**
 * Share-link + human-readable report helpers.
 *
 * A shared scan link intentionally contains only the URL (never the stored
 * verdict), so opening it always re-runs the scan against the live blocklists
 * and heuristics. Nothing is persisted on the server.
 */

import { parseUrlParts } from "@/lib/urlParts";

type AnyRecord = Record<string, unknown>;

interface SignalLike {
  id?: string;
  label?: string;
  detail?: string;
  severity?: string;
  points?: number;
  line?: number;
  match?: string;
}

const VERDICT_WORD: Record<string, string> = {
  safe: "SAFE",
  clean: "CLEAN",
  suspicious: "SUSPICIOUS",
  malicious: "MALICIOUS",
};

function isRecord(value: unknown): value is AnyRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function text(value: unknown, fallback = "—"): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function numberValue(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

/** Strings, numbers and booleans rendered without turning numbers into "—". */
function scalar(value: unknown, fallback = "—"): string {
  if (typeof value === "string") return value.trim() ? value : fallback;
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "boolean") return value ? "yes" : "no";
  return fallback;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

/** Public scan URL used by copy/share buttons and the browser extension. */
export function buildScanShareUrl(targetUrl: string, base?: string): string {
  let origin = base?.trim() ?? "";
  if (!origin && typeof window !== "undefined") origin = window.location.origin;
  origin = origin.replace(/\/+$/, "");
  return `${origin}/scan?url=${encodeURIComponent(targetUrl)}`;
}

export function verdictWord(verdict: string): string {
  return VERDICT_WORD[verdict] ?? verdict.toUpperCase();
}

function collectSignals(data: AnyRecord): SignalLike[] {
  const direct = Array.isArray(data.signals) ? data.signals : [];
  if (direct.length) return direct.filter(isRecord) as SignalLike[];
  if (isRecord(data.heuristics) && Array.isArray(data.heuristics.signals)) {
    return data.heuristics.signals.filter(isRecord) as SignalLike[];
  }
  return [];
}

function reportKind(data: AnyRecord): "url" | "file" | "code" {
  if (typeof data.url === "string" || isRecord(data.heuristics)) return "url";
  if (typeof data.sha256 === "string" || typeof data.size === "number") return "file";
  return "code";
}

function signalLines(signals: SignalLike[]): string[] {
  if (!signals.length) return ["Signals: none rendered."];
  return [
    "Signals:",
    ...signals.map((s) => {
      const severity = (s.severity ?? "low").toUpperCase();
      const points = numberValue(s.points);
      const line = numberValue(s.line);
      const bits = [
        `  - [${severity}] ${text(s.label)}`,
        text(s.detail, ""),
        points !== null ? `(+${points})` : "",
        line !== null ? `line ${line}` : "",
      ].filter(Boolean);
      const match = typeof s.match === "string" && s.match ? `\n      match: ${s.match}` : "";
      return `${bits.join(" — ")}${match}`;
    }),
  ];
}

/**
 * Full report text: every field the UI shows, in a form that can be pasted
 * into a ticket, chat or email without losing context.
 */
export function buildReportText(raw: unknown): string {
  if (!isRecord(raw)) return String(raw);
  const data = raw;
  const kind = reportKind(data);
  const verdict = text(data.verdict, "unknown");
  const score =
    numberValue(data.score) ??
    (isRecord(data.heuristics) ? numberValue(data.heuristics.score) : null) ??
    0;
  const scannedAt = text(data.scannedAt, "unknown");
  const target =
    kind === "url"
      ? text(data.url)
      : kind === "file"
        ? text(data.filename)
        : text(data.filename, "pasted code");

  const lines: string[] = [
    "Cyber Detector — scan report",
    "============================",
    `Verdict: ${verdictWord(verdict)}`,
    `Target: ${target}`,
    `Risk score: ${score}/100`,
  ];

  if (kind === "url") {
    const source = text(data.source, "heuristics");
    lines.push(`Source: ${source}`);
    lines.push(`Scanned: ${scannedAt}`);
    const parts = parseUrlParts(target);
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
    if (isRecord(data.heuristics)) {
      lines.push("", `Heuristic level: ${text(data.heuristics.level, "unknown")}`);
    }
    lines.push("", ...signalLines(collectSignals(data)));
    const matches = Array.isArray(data.matches) ? data.matches.filter(isRecord) : [];
    lines.push("", "Google Safe Browsing matches:");
    if (!matches.length) lines.push("  none");
    else {
      for (const m of matches) {
        lines.push(`  - ${text(m.threatType, "UNKNOWN")} (${text(m.platformType, "ANY_PLATFORM")})`);
      }
    }
    if (typeof data.warning === "string" && data.warning) {
      lines.push("", `Warning: ${data.warning}`);
    }
    lines.push("", `Share / re-scan: ${buildScanShareUrl(target)}`);
  } else if (kind === "file") {
    const size = numberValue(data.size);
    lines.push(`Scanned: ${scannedAt}`);
    if (size !== null) lines.push(`Size: ${formatBytes(size)} (${size} bytes)`);
    lines.push(`Magic: ${scalar(data.magic)}`);
    lines.push(`Entropy: ${scalar(data.entropy)}`);
    lines.push(`SHA-256: ${scalar(data.sha256)}`);
    lines.push("", ...signalLines(collectSignals(data)));
    lines.push("", "Files are never executed.");
  } else {
    const stats = isRecord(data.stats) ? data.stats : {};
    lines.push(`Scanned: ${scannedAt}`);
    lines.push(`Language: ${scalar(stats.language)}`);
    lines.push(`Lines: ${scalar(stats.lines)}`);
    lines.push(`Characters: ${scalar(stats.chars)}`);
    lines.push("", ...signalLines(collectSignals(data)));
    lines.push("", "Static analysis only — the code was never executed.");
  }

  lines.push(
    "",
    "—",
    "Results are triage signals, not proof of safety. Do not open or run",
    "anything you did not expect, even when the verdict is CLEAN/SAFE."
  );
  return lines.join("\n");
}

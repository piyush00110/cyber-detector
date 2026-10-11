/**
 * URL phishing heuristic engine.
 * Weighted-signal algorithm: each red flag contributes points based on how
 * strongly it correlates with phishing/malware delivery. Total is clamped
 * to 0-100; thresholds map to safe / low / suspicious / high.
 */
export type Severity = "low" | "medium" | "high";
export type RiskLevel = "safe" | "low" | "suspicious" | "high";

export interface HeuristicSignal {
  id: string;
  label: string;
  detail: string;
  severity: Severity;
  points: number;
}

export interface HeuristicReport {
  score: number;
  level: RiskLevel;
  signals: HeuristicSignal[];
}

const SUSPICIOUS_TLDS = new Set([
  "zip", "mov", "tk", "ml", "ga", "cf", "gq", "top",
  "click", "country", "stream", "download", "xin", "sbs",
  "quest", "party", "lol", "cam", "boo", "cfd", "buzz",
]);

const SHORTENERS = new Set([
  "bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "is.gd",
  "buff.ly", "adf.ly", "bitly.com", "tiny.cc", "rebrand.ly",
]);

const LURE_KEYWORDS = [
  "login", "verify", "secure", "account", "update", "banking",
  "confirm", "signin", "password", "free", "winner", "prize",
  "claim", "urgent", "suspended", "locked", "recover", "wallet",
  "seed", "airdrop", "kyc",
];

export function normalizeUrl(input: string): string {
  const t = input.trim();
  if (/^https?:\/\//i.test(t)) return t;
  return `https://${t}`;
}

export function isValidHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function analyzeUrl(rawUrl: string): HeuristicReport {
  const signals: HeuristicSignal[] = [];
  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return { score: 0, level: "safe", signals: [] };
  }

  const host = url.hostname.toLowerCase();
  const full = rawUrl.toLowerCase();
  const push = (id: string, label: string, detail: string, severity: Severity, points: number) =>
    signals.push({ id, label, detail, severity, points });

  if (url.protocol === "http:") {
    push("no-https", "No HTTPS", "Unencrypted HTTP — credentials and data can be sniffed.", "high", 25);
  }
  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(host) || (host.includes(":") && /[0-9a-f]/i.test(host))) {
    push("ip-host", "IP address host", "Legit sites almost never use raw IP addresses.", "high", 30);
  }
  if (rawUrl.includes("@")) {
    push("at-sign", "Contains @", "@ can hide the real destination (userinfo trick).", "high", 25);
  }
  if (host.includes("xn--")) {
    push("punycode", "Punycode lookalike domain", "xn-- domains are often homoglyph attacks.", "high", 30);
  }
  const labels = host.split(".");
  if (labels.length > 4) {
    push("subdomains", "Many subdomains", `${labels.length} DNS labels — common in phishing chains.`, "medium", 12);
  }
  if (rawUrl.length > 200) {
    push("long-url", "Very long URL", `${rawUrl.length} chars — used to hide the real path.`, rawUrl.length > 500 ? "medium" : "low", rawUrl.length > 500 ? 12 : 6);
  }
  const tld = labels[labels.length - 1] ?? "";
  if (SUSPICIOUS_TLDS.has(tld)) {
    push("tld", `Risky TLD .${tld}`, "Disproportionately used in abuse — verify before trusting.", "medium", 25);
  }
  if (SHORTENERS.has(host)) {
    push("shortener", "URL shortener", "Destination hidden — expand before trusting.", "medium", 12);
  }
  const hits = LURE_KEYWORDS.filter((k) => full.includes(k));
  if (hits.length > 0) {
    push("lure", "Social-engineering keywords", `Contains: ${hits.slice(0, 5).join(", ")}`, "medium", Math.min(10 + hits.length * 3, 22));
  }
  const hyphens = (host.match(/-/g) ?? []).length;
  if (hyphens >= 2) {
    push("hyphens", "Hyphen-stuffed domain", "e.g. paypal-secure-login.example — classic lookalike trick.", "low", 8);
  }
  if (url.port && url.port !== "80" && url.port !== "443") {
    push("port", `Unusual port :${url.port}`, "Rare for normal websites.", "medium", 10);
  }
  const digits = (host.match(/\d/g) ?? []).length;
  if (digits >= 4) {
    push("digits", "Digit-heavy domain", "Random digits suggest auto-generated phishing domains.", "low", 7);
  }
  // deep path + encoded payload in query
  const depth = url.pathname.split("/").filter(Boolean).length;
  if (depth >= 5) {
    push("deep-path", "Abnormally deep path", `${depth} path segments.`, "low", 6);
  }
  if (/%[0-9a-f]{2}/i.test(url.search) && url.search.length > 120) {
    push("encoded-query", "Heavily encoded query", "Long percent-encoded query string.", "low", 6);
  }

  const score = Math.min(100, signals.reduce((s, x) => s + x.points, 0));
  const level: RiskLevel =
    score >= 50 ? "high" : score >= 25 ? "suspicious" : score >= 10 ? "low" : "safe";
  return { score, level, signals };
}

export function verdictFromResults(opts: {
  safeBrowsingUnsafe: boolean;
  heuristicLevel: RiskLevel;
}): "safe" | "suspicious" | "malicious" {
  if (opts.safeBrowsingUnsafe) return "malicious";
  if (opts.heuristicLevel === "high") return "malicious";
  if (opts.heuristicLevel === "suspicious") return "suspicious";
  return "safe";
}

/**
 * Static malicious-code engine. Pattern-weights algorithm: each matched
 * malicious primitive adds severity-weighted points; total clamped 0-100.
 * NEVER executes the code — pure static matching.
 */
export type Severity = "low" | "medium" | "high";
export type CodeVerdict = "clean" | "suspicious" | "malicious";

export interface CodeSignal {
  id: string;
  label: string;
  detail: string;
  severity: Severity;
  points: number;
  line?: number;
  match?: string;
}

export interface CodeReport {
  verdict: CodeVerdict;
  score: number;
  signals: CodeSignal[];
  stats: { lines: number; chars: number; language: string };
  scannedAt: string;
}

interface Pattern {
  id: string; label: string; detail: string;
  severity: Severity; points: number; regex: RegExp;
}

const PATTERNS: Pattern[] = [
  { id: "eval", label: "eval() execution", detail: "Runs strings as code — #1 obfuscated-malware primitive.", severity: "high", points: 25, regex: /\beval\s*\(/ },
  { id: "function-ctor", label: "Function() constructor", detail: "Builds executable code from strings, like eval.", severity: "high", points: 22, regex: /\bnew\s+Function\s*\(|\bFunction\s*\(\s*["'`]/ },
  { id: "atob-exec", label: "Base64 decode + execute", detail: "atob / Buffer.from(..,'base64') decodes hidden payloads.", severity: "high", points: 28, regex: /\batob\s*\(|Buffer\.from\s*\([^)]*base64|\bfromBase64\b|Convert\.FromBase64String/i },
  { id: "fromcharcode", label: "Char-code obfuscation", detail: "String.fromCharCode / unescape hides payload strings.", severity: "high", points: 24, regex: /String\.fromCharCode|unescape\s*\(|String\.raw|chr\s*\(\s*\d+\s*\)/i },
  { id: "doc-write", label: "document.write / innerHTML injection", detail: "Injects HTML/script — classic XSS / skimmer sink.", severity: "medium", points: 14, regex: /document\.write(ln)?\s*\(|\.innerHTML\s*=|\.outerHTML\s*=|dangerouslySetInnerHTML/ },
  { id: "cookie-theft", label: "Cookie / storage theft", detail: "Reads document.cookie, localStorage or sessionStorage.", severity: "high", points: 26, regex: /document\.cookie|localStorage|sessionStorage/ },
  { id: "keylog", label: "Keylogging hooks", detail: "Listens to keystrokes or password inputs.", severity: "high", points: 26, regex: /addEventListener\s*\(\s*["']key|onkeydown|onkeypress|type\s*=\s*["']password["']/i },
  { id: "exfil", label: "Data exfiltration", detail: "Sends data out via fetch/XHR/beacon/image.", severity: "medium", points: 15, regex: /fetch\s*\(|XMLHttpRequest|navigator\.sendBeacon|new\s+Image\s*\(/ },
  { id: "hidden-iframe", label: "Hidden iframe / skimmer element", detail: "Invisible iframes or overlay forms (Magecart style).", severity: "medium", points: 14, regex: /createElement\s*\(\s*["']iframe["']/i },
  { id: "pwsh-enc", label: "Encoded PowerShell", detail: "-EncodedCommand / IEX hides the real command.", severity: "high", points: 30, regex: /powershell.*-e(ncodedcommand)?\b|\bIEX\b|\bInvoke-Expression\b|\bInvoke-Mimikatz\b/i },
  { id: "curl-pipe", label: "curl|bash pipe execution", detail: "Downloads and immediately executes remote code.", severity: "high", points: 28, regex: /curl[^|]*\|\s*(bash|sh)|wget[^|]*\|\s*(bash|sh)/i },
  { id: "reverse-shell", label: "Reverse shell", detail: "/dev/tcp, nc -e, or socket + subprocess patterns.", severity: "high", points: 32, regex: /\/dev\/tcp|nc\s+.*-e\s+\/bin\/(ba)?sh|socket.*subprocess|os\.system\s*\(|popen\s*\(/is },
  { id: "crypto-miner", label: "Coinhive / miner strings", detail: "Known miner domains and Stratum URLs.", severity: "medium", points: 16, regex: /coinhive|cryptonight|stratum\+tcp|monero|nicehash/i },
  { id: "suspicious-url", label: "Suspicious embedded URL", detail: "Hardcoded URL to IP, odd TLD, or shortener inside code.", severity: "medium", points: 12, regex: /https?:\/\/(?:\d{1,3}(?:\.\d{1,3}){3}|[^\s"'`]*\.(tk|ml|ga|cf|gq|top|click|zip|mov)[^\s"'`]*|bit\.ly|tinyurl\.com)[^\s"'`]*/i },
  { id: "long-b64", label: "Long Base64 blob", detail: "Very long Base64-looking string — often a packed payload.", severity: "medium", points: 12, regex: /[A-Za-z0-9+/]{200,}={0,2}/ },
  { id: "hex-escape", label: "Hex / unicode escape storm", detail: "Mass \\x / \\u escapes hide readable strings.", severity: "low", points: 8, regex: /(\\x[0-9a-fA-F]{2}){6,}|(\\u[0-9a-fA-F]{4}){6,}/ },
  { id: "debug-evasion", label: "Debugger / VM evasion", detail: "Anti-debug, VM/sandbox checks, long sleeps.", severity: "low", points: 8, regex: /\bdebugger\b|anti-?debug|isDebuggerPresent|VirtualBox|vmware|sleep\s*\(\s*\d{4,}/i },
  { id: "macro", label: "Office macro / DDE", detail: "AutoOpen, Workbook_Open, Shell() or DDEAUTO — maldoc traits.", severity: "high", points: 28, regex: /AutoOpen|Workbook_Open|Document_Open|Shell\s*\(|DDEAUTO|powershell\.exe/i },
];

export function detectLanguage(filename: string, code: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  if (["js", "jsx", "ts", "tsx", "mjs", "cjs"].includes(ext)) return "javascript";
  if (["html", "htm"].includes(ext)) return "html";
  if (["py"].includes(ext)) return "python";
  if (["ps1"].includes(ext)) return "powershell";
  if (["sh", "bash"].includes(ext)) return "shell";
  if (["php"].includes(ext)) return "php";
  if (["vba", "bas", "cls"].includes(ext)) return "vba";
  if (/<script|<!doctype html|<html/i.test(code.slice(0, 2000))) return "html";
  if (/import\s+\w+|def\s+\w+\s*\(|print\s*\(/.test(code)) return "python?";
  return "generic";
}

export function analyzeCode(code: string, filename = "pasted-code.txt"): CodeReport {
  const lines = code.split("\n");
  const signals: CodeSignal[] = [];

  for (const p of PATTERNS) {
    const m = code.match(p.regex);
    if (m) {
      const idx = code.search(p.regex);
      const line = idx >= 0 ? code.slice(0, idx).split("\n").length : undefined;
      signals.push({
        id: p.id, label: p.label, detail: p.detail,
        severity: p.severity, points: p.points, line,
        match: (m[0] ?? "").slice(0, 90),
      });
    }
  }

  const longest = lines.reduce((a, l) => Math.max(a, l.length), 0);
  if (longest > 2000) {
    signals.push({
      id: "packed", label: "Packed / minified mega-line",
      detail: `${longest} chars on one line — typical of packed payloads.`,
      severity: "low", points: 6,
    });
  }

  const score = Math.min(100, signals.reduce((s, x) => s + x.points, 0));
  const verdict: CodeVerdict = score >= 50 ? "malicious" : score >= 20 ? "suspicious" : "clean";
  return {
    verdict, score,
    signals: signals.sort((a, b) => b.points - a.points),
    stats: { lines: lines.length, chars: code.length, language: detectLanguage(filename, code) },
    scannedAt: new Date().toISOString(),
  };
}

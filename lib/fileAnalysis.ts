/**
 * File / virus static-analysis heuristics — run in the browser, before upload.
 * This module reads the file locally (SHA-256 + byte inspection); the file is
 * then optionally queued for a real ClamAV scan via /api/scan-file.
 *
 * Algorithm (weighted signals, 0-100):
 *  1. EICAR test-file + known-malicious content signatures
 *  2. Dangerous / double extensions
 *  3. Magic-bytes vs extension mismatch (spoofed type)
 *  4. Byte entropy (packed / encrypted payloads)
 *  5. Embedded malicious script patterns (reuses code-engine regexes)
 */
import { analyzeCode } from "@/lib/codeAnalysis";

export type Severity = "low" | "medium" | "high";
export type FileVerdict = "clean" | "suspicious" | "malicious";

export interface FileSignal {
  id: string;
  label: string;
  detail: string;
  severity: Severity;
  points: number;
}

export interface FileReport {
  filename: string;
  size: number;
  sha256: string;
  magic: string;
  entropy: number;
  verdict: FileVerdict;
  score: number;
  signals: FileSignal[];
  scannedAt: string;
}

export const EICAR_STRING =
  "X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*";

const HIGH_RISK_EXTS = new Set([
  "exe", "scr", "bat", "cmd", "com", "pif", "vbs", "vbe", "js",
  "jse", "wsf", "wsh", "ps1", "msi", "jar", "hta", "lnk",
  "reg", "gadget", "msc", "cpl", "dll",
]);

const DOC_EXTS = new Set(["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "rtf", "odt"]);

export async function sha256Hex(buf: ArrayBuffer): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function shannonEntropy(bytes: Uint8Array): number {
  if (bytes.length === 0) return 0;
  const freq = new Array(256).fill(0);
  const step = Math.max(1, Math.floor(bytes.length / 200_000));
  let n = 0;
  for (let i = 0; i < bytes.length; i += step) {
    freq[bytes[i]]++;
    n++;
  }
  let h = 0;
  for (const f of freq) {
    if (f === 0) continue;
    const p = f / n;
    h -= p * Math.log2(p);
  }
  return Math.round(h * 100) / 100;
}

export function magicLabel(bytes: Uint8Array): string {
  const head = Array.from(bytes.slice(0, 8))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join(" ");
  const ascii = String.fromCharCode.apply(
    null,
    Array.from(bytes.slice(0, 5)) as number[]
  );
  if (bytes[0] === 0x4d && bytes[1] === 0x5a) return `MZ executable (${head})`;
  if (bytes[0] === 0x50 && bytes[1] === 0x4b) return `ZIP container — docx/xlsx/jar/apk (${head})`;
  if (ascii.startsWith("%PDF")) return `PDF document (${head})`;
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return `JPEG image (${head})`;
  if (ascii.startsWith("GIF8")) return `GIF image (${head})`;
  if (bytes[0] === 0x89 && ascii.slice(1) === "PNG\r") return `PNG image (${head})`;
  if (bytes[0] === 0x7f && ascii.slice(1, 4) === "ELF") return `ELF binary (${head})`;
  if (ascii.startsWith("#!")) return `Script with shebang (${head})`;
  if (ascii.startsWith("MZ") || ascii === "<html" || ascii.startsWith("<scr"))
    return `Text / script (${head})`;
  return `Unknown (${head})`;
}

const MAX_TEXT_SCAN = 300_000;

export async function analyzeFile(file: File): Promise<FileReport> {
  const buf = await file.arrayBuffer();
  const bytes = new Uint8Array(buf);
  const signals: FileSignal[] = [];
  const push = (id: string, label: string, detail: string, severity: Severity, points: number) =>
    signals.push({ id, label, detail, severity, points });

  const sha256 = await sha256Hex(buf);
  const entropy = shannonEntropy(bytes);
  const magic = magicLabel(bytes);
  const name = file.name;
  const ext = (name.split(".").pop() ?? "").toLowerCase();
  const parts = name.split(".");

  // 1 — EICAR + embedded signatures (decode a latin1 text window)
  const textWindow = new TextDecoder("latin1").decode(bytes.slice(0, MAX_TEXT_SCAN));
  if (textWindow.includes("EICAR-STANDARD-ANTIVIRUS-TEST-FILE")) {
    push("eicar", "EICAR test signature", "Standard antivirus test file detected — harmless by design, proves the engine works.", "high", 60);
  }

  // 2 — extensions
  if (HIGH_RISK_EXTS.has(ext)) {
    push("risky-ext", `High-risk extension .${ext}`, "This type can execute code — only run from trusted sources.", "medium", 15);
  }
  if (parts.length > 2) {
    const fakeExt = parts[parts.length - 2].toLowerCase();
    if (["pdf", "doc", "docx", "jpg", "png", "mp4", "txt"].includes(fakeExt) && HIGH_RISK_EXTS.has(ext)) {
      push("double-ext", `Double extension .${fakeExt}.${ext}`, "Classic malware disguise (e.g. invoice.pdf.exe).", "high", 30);
    }
  }

  // 3 — magic vs extension mismatch
  const isMZ = bytes[0] === 0x4d && bytes[1] === 0x5a;
  const looksPdf = textWindow.startsWith("%PDF");
  if (DOC_EXTS.has(ext) && isMZ) {
    push("spoofed-type", "Executable disguised as document", `A .${ext} file with an MZ executable header.`, "high", 35);
  }
  if ((ext === "jpg" || ext === "jpeg" || ext === "png" || ext === "gif") && isMZ) {
    push("spoofed-type", "Executable disguised as image", `A .${ext} file with an MZ executable header.`, "high", 35);
  }
  if (ext === "pdf" && !looksPdf && bytes.length > 0) {
    push("bad-magic", "Not really a PDF", "A .pdf file without a PDF header.", "medium", 14);
  }
  if ((ext === "exe" || ext === "scr" || ext === "dll") && !isMZ) {
    push("bad-magic", "Not really an executable", `A .${ext} file without an MZ header — possibly renamed.`, "low", 8);
  }

  // 4 — entropy (packed / encrypted)
  if (bytes.length > 50_000 && entropy >= 7.5) {
    push("entropy", `Very high entropy (${entropy})`, "Packed, encrypted or compressed — malware often hides this way (also true of legit installers).", "medium", 12);
  }

  // 5 — embedded script patterns
  const codeRep = analyzeCode(textWindow, name);
  for (const s of codeRep.signals.slice(0, 6)) {
    push(`embedded-${s.id}`, `Embedded: ${s.label}`, s.detail, s.severity, Math.min(s.points, 18));
  }

  // empty / tiny files
  if (bytes.length === 0) {
    push("empty", "Empty file", "0 bytes — nothing to analyze.", "low", 0);
  }

  const score = Math.min(100, signals.reduce((s, x) => s + x.points, 0));
  const verdict: FileVerdict = score >= 50 ? "malicious" : score >= 20 ? "suspicious" : "clean";

  return {
    filename: name, size: bytes.length, sha256, magic, entropy,
    verdict, score,
    signals: signals.sort((a, b) => b.points - a.points),
    scannedAt: new Date().toISOString(),
  };
}

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

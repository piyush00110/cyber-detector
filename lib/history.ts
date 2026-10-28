/**
 * localStorage-backed scan history. Everything stays on-device:
 * URLs store verdict+score only, files store hash (never content),
 * code stores filename+score (never the pasted code).
 */

export interface UrlHistoryEntry {
  kind: "url";
  url: string;
  verdict: "safe" | "suspicious" | "malicious";
  score: number;
  scannedAt: string;
}

export interface FileHistoryEntry {
  kind: "file";
  filename: string;
  sha256: string;
  verdict: "clean" | "suspicious" | "malicious";
  score: number;
  scannedAt: string;
}

export interface CodeHistoryEntry {
  kind: "code";
  filename: string;
  verdict: "clean" | "suspicious" | "malicious";
  score: number;
  scannedAt: string;
}

export type HistoryEntry = UrlHistoryEntry | FileHistoryEntry | CodeHistoryEntry;

const KEY = "cyber-detector-history-v1";
const MAX = 30;

export function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.slice(0, MAX) : [];
  } catch {
    return [];
  }
}

function dedupeKey(e: HistoryEntry): string {
  if (e.kind === "url") return `url:${e.url}`;
  if (e.kind === "file") return `file:${e.sha256}`;
  return `code:${e.filename}:${e.scannedAt}`;
}

export function saveToHistory(entry: HistoryEntry) {
  if (typeof window === "undefined") return;
  try {
    const k = dedupeKey(entry);
    const prev = loadHistory().filter((h) => dedupeKey(h) !== k);
    localStorage.setItem(KEY, JSON.stringify([entry, ...prev].slice(0, MAX)));
  } catch {
    /* quota / private mode — ignore */
  }
}

export function removeFromHistory(entry: HistoryEntry) {
  if (typeof window === "undefined") return;
  try {
    const k = dedupeKey(entry);
    const next = loadHistory().filter((h) => dedupeKey(h) !== k);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function clearHistory() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

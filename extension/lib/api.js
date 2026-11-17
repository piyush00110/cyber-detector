/**
 * Cyber Detector extension — storage + API helpers.
 * Plain ES modules so the popup, options page and service worker share one
 * implementation. No build step.
 */

export const DEFAULT_BASE_URL = "http://localhost:3000";
export const SETTINGS_KEY = "cyber-detector-extension-settings-v1";
export const HISTORY_KEY = "cyber-detector-extension-history-v1";
export const MAX_HISTORY = 25;

export const DEFAULT_SETTINGS = {
  baseUrl: DEFAULT_BASE_URL,
  notifications: true,
  autoScanCurrentTab: false,
};

/** Validate + canonicalize the scanner base URL. */
export function normalizeBaseUrl(input) {
  let value = String(input ?? "").trim();
  if (!value) value = DEFAULT_BASE_URL;
  if (!/^https?:\/\//i.test(value)) value = `http://${value}`;
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("Enter a valid http(s) URL, e.g. http://localhost:3000");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("The scanner URL must use http or https.");
  }
  const pathname = url.pathname.replace(/\/+$/, "");
  return `${url.origin}${pathname}`;
}

export function originPattern(baseUrl) {
  return `${new URL(normalizeBaseUrl(baseUrl)).origin}/*`;
}

export async function getSettings() {
  const stored = await chrome.storage.local.get(SETTINGS_KEY);
  const value = stored && stored[SETTINGS_KEY];
  if (!value || typeof value !== "object") return { ...DEFAULT_SETTINGS };
  return { ...DEFAULT_SETTINGS, ...value };
}

export async function saveSettings(patch) {
  const next = { ...(await getSettings()), ...patch };
  next.baseUrl = normalizeBaseUrl(next.baseUrl);
  next.notifications = Boolean(next.notifications);
  next.autoScanCurrentTab = Boolean(next.autoScanCurrentTab);
  await chrome.storage.local.set({ [SETTINGS_KEY]: next });
  return next;
}

export function isScannableUrl(value) {
  if (typeof value !== "string" || !value.trim()) return false;
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function toAbsoluteUrl(input) {
  const value = String(input ?? "").trim();
  if (!value) throw new Error("Paste a link to scan.");
  if (/^(chrome|edge|about|brave|opera|vivaldi|file|view-source|data|javascript|blob):/i.test(value)) {
    throw new Error("Browser and local pages cannot be scanned. Use an http(s) link.");
  }
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  let url;
  try {
    url = new URL(candidate);
  } catch {
    throw new Error("That does not look like a valid link.");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Only http(s) links can be scanned.");
  }
  if (!url.hostname || (!url.hostname.includes(".") && !/^\d{1,3}(\.\d{1,3}){3}$/.test(url.hostname))) {
    throw new Error("That link has no valid domain name.");
  }
  return url.toString();
}

/**
 * POST /api/scan-url with friendly errors for the two usual failures:
 * the dev server is down, or the URL is rejected.
 */
export async function scanUrl(baseUrl, input) {
  const url = toAbsoluteUrl(input);
  const base = normalizeBaseUrl(baseUrl);
  let res;
  try {
    res = await fetch(`${base}/api/scan-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
      cache: "no-store",
    });
  } catch {
    throw new Error(
      `Cannot reach ${base}. Start the app with "npm run dev" or set your deployed URL in Settings.`
    );
  }
  const raw = await res.text();
  let data = null;
  try {
    data = raw ? JSON.parse(raw) : null;
  } catch {
    data = null;
  }
  if (!res.ok) {
    throw new Error((data && data.error) || `Server error (${res.status}). Try again.`);
  }
  if (!data || (data.verdict !== "safe" && data.verdict !== "suspicious" && data.verdict !== "malicious")) {
    throw new Error("Unexpected response from the scanner. Is the base URL pointing at Cyber Detector?");
  }
  return data;
}

export function shareLink(baseUrl, targetUrl) {
  const base = normalizeBaseUrl(baseUrl);
  return `${base}/scan?url=${encodeURIComponent(targetUrl)}`;
}

export function toHistoryEntry(result) {
  return {
    url: result.url,
    verdict: result.verdict,
    score: result.heuristics && typeof result.heuristics.score === "number" ? result.heuristics.score : 0,
    scannedAt: result.scannedAt || new Date().toISOString(),
  };
}

export async function loadHistory() {
  const stored = await chrome.storage.local.get(HISTORY_KEY);
  const value = stored && stored[HISTORY_KEY];
  return Array.isArray(value) ? value.slice(0, MAX_HISTORY) : [];
}

export async function saveScan(result) {
  const entry = toHistoryEntry(result);
  const previous = await loadHistory();
  const next = [entry, ...previous.filter((item) => item && item.url !== entry.url)].slice(0, MAX_HISTORY);
  await chrome.storage.local.set({ [HISTORY_KEY]: next });
  return next;
}

export async function clearHistory() {
  await chrome.storage.local.remove(HISTORY_KEY);
}

export async function copyText(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }
  try {
    const area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "-1000px";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  } catch {
    return false;
  }
}

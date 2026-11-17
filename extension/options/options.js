import {
  DEFAULT_SETTINGS,
  clearHistory,
  getSettings,
  loadHistory,
  normalizeBaseUrl,
  saveSettings,
  scanUrl,
} from "../lib/api.js";
import { verdictMeta } from "../lib/format.js";

const $ = (id) => document.getElementById(id);

init();

async function init() {
  bindEvents();
  $("version").textContent = `v${chrome.runtime.getManifest().version}`;
  try {
    const settings = await getSettings();
    fillForm(settings);
  } catch (error) {
    setStatus(error && error.message ? error.message : "Could not load settings.", "err");
  }
  await updateHistoryCount();
}

function bindEvents() {
  $("save").addEventListener("click", save);
  $("test").addEventListener("click", testConnection);
  $("reset").addEventListener("click", resetDefaults);
  $("clear").addEventListener("click", clearAllHistory);
  $("export").addEventListener("click", exportHistory);
  $("base-url").addEventListener("input", updateOriginHint);
  $("base-url").addEventListener("blur", () => {
    try {
      $("base-url").value = normalizeBaseUrl($("base-url").value);
      updateOriginHint();
    } catch {
      /* leave the invalid value visible so it can be corrected */
    }
  });
}

function fillForm(settings) {
  $("base-url").value = settings.baseUrl;
  $("notifications").checked = Boolean(settings.notifications);
  $("auto-scan").checked = Boolean(settings.autoScanCurrentTab);
  updateOriginHint();
  updateLinks(settings.baseUrl);
}

function updateOriginHint() {
  const hint = $("origin-hint");
  try {
    const base = normalizeBaseUrl($("base-url").value);
    const url = new URL(base);
    const local = isLocalHost(url.hostname);
    hint.textContent = local
      ? `Requests go to ${base} (allowed by default).`
      : `Requests go to ${base} — saving will ask for permission for ${url.origin}.`;
    hint.style.color = "";
  } catch {
    hint.textContent = "Enter a valid http(s) URL, e.g. http://localhost:3000";
    hint.style.color = "var(--amber)";
  }
}

function updateLinks(baseUrl) {
  const base = normalizeBaseUrl(baseUrl);
  $("open-app").href = base;
  $("docs-link").href = `${base}/extension`;
}

async function save() {
  setStatus("Saving…", "busy");
  try {
    const baseUrl = normalizeBaseUrl($("base-url").value);
    const url = new URL(baseUrl);
    if (!isLocalHost(url.hostname)) {
      const granted = await chrome.permissions.request({ origins: [`${url.origin}/*`] });
      if (!granted) {
        throw new Error(
          `Permission for ${url.origin} was not granted. The extension cannot call that server.`
        );
      }
    }
    const next = await saveSettings({
      baseUrl,
      notifications: $("notifications").checked,
      autoScanCurrentTab: $("auto-scan").checked,
    });
    fillForm(next);
    setStatus("Settings saved.", "ok");
  } catch (error) {
    setStatus(error && error.message ? error.message : "Could not save settings.", "err");
  }
}

async function testConnection() {
  setStatus("Testing connection…", "busy");
  try {
    const baseUrl = normalizeBaseUrl($("base-url").value);
    const result = await scanUrl(baseUrl, "https://example.com");
    const meta = verdictMeta(result.verdict);
    const score =
      result.heuristics && typeof result.heuristics.score === "number"
        ? result.heuristics.score
        : 0;
    setStatus(
      `Connected — example.com is ${meta.label} (${score}/100).`,
      "ok"
    );
  } catch (error) {
    setStatus(error && error.message ? error.message : "Connection failed.", "err");
  }
}

async function resetDefaults() {
  setStatus("Restoring defaults…", "busy");
  try {
    const next = await saveSettings({ ...DEFAULT_SETTINGS });
    fillForm(next);
    setStatus("Defaults restored.", "ok");
  } catch (error) {
    setStatus(error && error.message ? error.message : "Could not reset settings.", "err");
  }
}

async function updateHistoryCount() {
  const items = await loadHistory();
  $("history-count").textContent = String(items.length);
  $("export").disabled = items.length === 0;
  $("clear").disabled = items.length === 0;
}

async function exportHistory() {
  const items = await loadHistory();
  const blob = new Blob([JSON.stringify(items, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "cyber-detector-extension-history.json";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  setStatus("History exported as JSON.", "ok");
}

async function clearAllHistory() {
  if (!window.confirm("Clear the extension's local scan history on this device?")) return;
  await clearHistory();
  await updateHistoryCount();
  setStatus("History cleared.", "ok");
}

function setStatus(message, kind = "") {
  const el = $("status");
  el.textContent = message || "";
  el.className = `status${kind ? ` ${kind}` : ""}`;
}

function isLocalHost(hostname) {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]" ||
    hostname === "::1"
  );
}

import {
  clearHistory,
  copyText,
  getSettings,
  isScannableUrl,
  loadHistory,
  saveScan,
  scanUrl,
  shareLink,
} from "../lib/api.js";
import {
  buildReport,
  escapeHtml,
  parseUrlParts,
  riskColor,
  sourceLabel,
  timeAgo,
  verdictMeta,
} from "../lib/format.js";

const $ = (id) => document.getElementById(id);

const state = {
  settings: null,
  tab: null,
  result: null,
  busy: false,
};

document.addEventListener("DOMContentLoaded", init);

async function init() {
  try {
    state.settings = await getSettings();
  } catch (error) {
    setStatus(error && error.message ? error.message : "Could not load settings.", "err");
    return;
  }
  $("server-label").textContent = state.settings.baseUrl.replace(/^https?:\/\//, "");
  bindEvents();

  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    state.tab = tabs && tabs[0] ? tabs[0] : null;
  } catch {
    state.tab = null;
  }

  const pageUrl = state.tab && state.tab.url ? state.tab.url : "";
  const scannable = isScannableUrl(pageUrl);
  $("scan-current").disabled = !scannable;
  $("scan-current").title = scannable ? `Scan ${pageUrl}` : "This page type cannot be scanned";
  if (scannable) $("url").value = pageUrl;
  $("url").focus();

  await renderRecent();

  // A context-menu/pending scan can hand the URL to the popup.
  let pending = "";
  try {
    const stored = await chrome.storage.session.get("pendingScan");
    pending = stored && stored.pendingScan ? stored.pendingScan : "";
    if (pending) await chrome.storage.session.remove("pendingScan");
  } catch {
    pending = "";
  }

  if (pending) {
    $("url").value = pending;
    await runScan(pending);
  } else if (state.settings.autoScanCurrentTab && scannable) {
    await runScan(pageUrl);
  }
}

function bindEvents() {
  $("scan-form").addEventListener("submit", (event) => {
    event.preventDefault();
    runScan($("url").value);
  });
  $("scan-current").addEventListener("click", () => {
    const url = state.tab && state.tab.url ? state.tab.url : "";
    if (!isScannableUrl(url)) return;
    $("url").value = url;
    runScan(url);
  });
  $("paste").addEventListener("click", () => pasteFromClipboard(false));
  $("paste-scan").addEventListener("click", () => pasteFromClipboard(true));
  $("open-options").addEventListener("click", () => chrome.runtime.openOptionsPage());
  $("open-options-2").addEventListener("click", () => chrome.runtime.openOptionsPage());
  $("open-app").addEventListener("click", () => {
    chrome.tabs.create({ url: state.settings.baseUrl }).catch(() => {});
  });
  $("clear-recent").addEventListener("click", async () => {
    try {
      await clearHistory();
      await renderRecent();
      setStatus("Local history cleared", "ok");
    } catch {
      setStatus("Could not clear history.", "err");
    }
  });
  $("result").addEventListener("click", onResultClick);
  $("recent-list").addEventListener("click", onRecentClick);
}

function setStatus(message, kind = "") {
  const el = $("scan-status");
  el.textContent = message || "";
  el.className = `status${kind ? ` ${kind}` : ""}`;
}

function setBusy(busy) {
  state.busy = busy;
  $("scan").disabled = busy;
  $("paste").disabled = busy;
  $("paste-scan").disabled = busy;
  $("scan-current").disabled = busy || !isScannableUrl(state.tab && state.tab.url);
  $("scan").textContent = busy ? "Scanning…" : "Scan";
}

async function runScan(raw) {
  if (state.busy) return;
  const value = String(raw ?? ($("url").value || "")).trim();
  if (!value) {
    setStatus("Paste a link first.", "err");
    $("url").focus();
    return;
  }

  setBusy(true);
  setStatus("Scanning…", "busy");
  $("result").hidden = true;

  try {
    const data = await scanUrl(state.settings.baseUrl, value);
    state.result = data;
    $("url").value = data.url;
    renderResult(data);
    try {
      await saveScan(data);
    } catch {
      /* history is a convenience — never fail a successful scan over it */
    }
    await updateBadge(data);
    const meta = verdictMeta(data.verdict);
    const score = data.heuristics && typeof data.heuristics.score === "number" ? data.heuristics.score : 0;
    setStatus(
      `${meta.icon} ${meta.label} — ${score}/100`,
      data.verdict === "safe" ? "ok" : data.verdict === "suspicious" ? "warn" : "err"
    );
    try {
      await renderRecent();
    } catch {
      /* ignore */
    }
  } catch (error) {
    setStatus(error && error.message ? error.message : "Scan failed.", "err");
  } finally {
    setBusy(false);
  }
}

async function pasteFromClipboard(andScan) {
  let text = "";
  try {
    text = await navigator.clipboard.readText();
  } catch {
    text = "";
  }
  if (!text || !text.trim()) {
    setStatus("Clipboard blocked — click the box and press Ctrl+V.", "err");
    $("url").focus();
    return;
  }
  const value = unwrapShareLink(text.trim());
  $("url").value = value;
  if (andScan) {
    await runScan(value);
  } else {
    setStatus("Pasted from clipboard", "ok");
  }
}

function unwrapShareLink(value) {
  try {
    const url = new URL(value);
    const inner = url.searchParams.get("url");
    if (inner && /\/scan\/?$/i.test(url.pathname)) return inner.trim();
  } catch {
    /* not a URL */
  }
  return value;
}

function renderResult(result) {
  const meta = verdictMeta(result.verdict);
  const score =
    result.heuristics && typeof result.heuristics.score === "number"
      ? result.heuristics.score
      : 0;
  const signals =
    result.heuristics && Array.isArray(result.heuristics.signals)
      ? result.heuristics.signals
      : [];
  const matches = Array.isArray(result.matches) ? result.matches : [];
  const parts = parseUrlParts(result.url);
  const color = riskColor(score);

  const breakdown = parts
    ? `
      <details class="anatomy" open>
        <summary>URL anatomy</summary>
        <dl class="breakdown">
          ${breakdownCell("Scheme", parts.protocol, !parts.isHttps)}
          ${breakdownCell("Host", parts.hostname)}
          ${breakdownCell("Domain", parts.registrableDomain)}
          ${breakdownCell("TLD", parts.tld || "—")}
          ${breakdownCell("Subdomain", parts.subdomain || "—")}
          ${breakdownCell("Port", parts.port || "default")}
          ${breakdownCell("Path", parts.path)}
          ${breakdownCell("Length", `${parts.totalLength} chars`)}
          ${parts.query ? breakdownCell("Query", parts.query) : ""}
          ${parts.hash ? breakdownCell("Fragment", parts.hash) : ""}
          ${parts.isIp ? breakdownCell("Host type", "raw IP address", true) : ""}
          ${parts.isPunycode ? breakdownCell("Encoding", "punycode (xn--)", true) : ""}
        </dl>
      </details>`
    : "";

  const signalHtml = signals.length
    ? `<ul class="signals">${signals
        .map(
          (signal) => `<li>
            <b>${escapeHtml(signal.label || signal.id || "Signal")}</b> — ${escapeHtml(signal.detail || "")}
            <span class="tag ${escapeHtml(signal.severity || "low")}">${escapeHtml(signal.severity || "low")}</span>
            ${typeof signal.points === "number" ? `<span class="meta">+${signal.points}</span>` : ""}
          </li>`
        )
        .join("")}</ul>`
    : `<div class="empty-note">No heuristic red flags detected.</div>`;

  const matchHtml = matches.length
    ? `<ul class="signals">${matches
        .map(
          (match) => `<li><b>${escapeHtml(match.threatType || "UNKNOWN")}</b> (${escapeHtml(
            match.platformType || "ANY_PLATFORM"
          )})</li>`
        )
        .join("")}</ul>`
    : "";

  const warningHtml = result.warning
    ? `<div class="warning">⚠️ ${escapeHtml(result.warning)}</div>`
    : "";

  const scannedAt = result.scannedAt
    ? new Date(result.scannedAt).toLocaleString()
    : "just now";

  $("result").className = `result ${meta.className}`;
  $("result").innerHTML = `
    <div class="result-head">
      <span class="badge ${meta.className}">${meta.icon} ${meta.label}</span>
      <span class="source">via ${escapeHtml(sourceLabel(result.source))}</span>
    </div>
    <div class="result-url">${escapeHtml(result.url)}</div>
    <div class="blurb">${escapeHtml(meta.blurb)}</div>
    <div class="meter"><div style="width:${Math.max(0, Math.min(100, score))}%;background:${color}"></div></div>
    <div class="meta">
      Risk score: <b style="color:${color}">${score}/100</b>
      ${parts ? ` · ${escapeHtml(parts.hostname)}` : ""}
      · ${escapeHtml(scannedAt)}
    </div>
    ${breakdown}
    ${signalHtml}
    ${matchHtml ? `<div class="meta" style="margin-top:9px;font-weight:700">Safe Browsing matches</div>${matchHtml}` : ""}
    ${warningHtml}
    <div class="actions">
      <button type="button" class="chip" data-act="report">📋 Copy report</button>
      <button type="button" class="chip" data-act="link">🔗 Copy link</button>
      <button type="button" class="chip" data-act="open">↗ Open report</button>
      <button type="button" class="chip" data-act="rescan">↻ Scan again</button>
    </div>
  `;
  $("result").hidden = false;
}

function breakdownCell(label, value, warn = false) {
  return `<div class="${warn ? "warn" : ""}"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(
    value
  )}</dd></div>`;
}

async function onResultClick(event) {
  const button = event.target.closest("[data-act]");
  if (!button || !state.result) return;
  const action = button.dataset.act;

  if (action === "report") {
    const ok = await copyText(buildReport(state.result, state.settings.baseUrl));
    setStatus(ok ? "Full report copied" : "Copy failed", ok ? "ok" : "err");
    return;
  }
  if (action === "link") {
    const ok = await copyText(shareLink(state.settings.baseUrl, state.result.url));
    setStatus(ok ? "Share link copied — paste it anywhere" : "Copy failed", ok ? "ok" : "err");
    return;
  }
  if (action === "open") {
    try {
      await chrome.tabs.create({ url: shareLink(state.settings.baseUrl, state.result.url) });
    } catch {
      setStatus("Could not open the report tab.", "err");
    }
    return;
  }
  if (action === "rescan") {
    await runScan(state.result.url);
  }
}

async function renderRecent() {
  let items = [];
  try {
    items = await loadHistory();
  } catch {
    items = [];
  }
  $("recent-wrap").hidden = items.length === 0;
  $("recent-list").innerHTML = items
    .slice(0, 6)
    .map((item) => {
      const meta = verdictMeta(item.verdict);
      return `<button type="button" class="recent-item" data-url="${escapeHtml(
        item.url
      )}" title="${escapeHtml(item.url)}">
        <span class="dot" style="background:${meta.color}"></span>
        <span class="name">${escapeHtml(item.url)}</span>
        <span class="score" style="color:${meta.color}">${Number(item.score) || 0}</span>
        <span class="when">${escapeHtml(timeAgo(item.scannedAt))}</span>
      </button>`;
    })
    .join("");
}

async function onRecentClick(event) {
  const row = event.target.closest(".recent-item");
  if (!row || !row.dataset.url) return;
  $("url").value = row.dataset.url;
  await runScan(row.dataset.url);
}

async function updateBadge(result) {
  if (!state.tab || typeof state.tab.id !== "number") return;
  const text = result.verdict === "safe" ? "OK" : result.verdict === "suspicious" ? "!" : "X";
  const color = result.verdict === "safe" ? "#16a34a" : result.verdict === "suspicious" ? "#d97706" : "#dc2626";
  try {
    await chrome.action.setBadgeText({ tabId: state.tab.id, text });
    await chrome.action.setBadgeBackgroundColor({ tabId: state.tab.id, color });
  } catch {
    /* badge is cosmetic */
  }
}

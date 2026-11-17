/**
 * Cyber Detector extension service worker.
 * Adds right-click scan actions and turns background scans into notifications.
 */

import { getSettings, saveScan, scanUrl, shareLink } from "./lib/api.js";
import { parseUrlParts, verdictMeta } from "./lib/format.js";

const MENU_LINK = "cd-scan-link";
const MENU_PAGE = "cd-scan-page";
const MENU_SELECTION = "cd-scan-selection";

chrome.runtime.onInstalled.addListener(() => {
  setupMenus();
});

chrome.runtime.onStartup.addListener(() => {
  setupMenus();
});

async function setupMenus() {
  try {
    await chrome.contextMenus.removeAll();
  } catch {
    /* ignore */
  }
  chrome.contextMenus.create({
    id: MENU_LINK,
    title: "Scan this link with Cyber Detector",
    contexts: ["link"],
  });
  chrome.contextMenus.create({
    id: MENU_PAGE,
    title: "Scan this page with Cyber Detector",
    contexts: ["page"],
  });
  chrome.contextMenus.create({
    id: MENU_SELECTION,
    title: "Scan selected text as a link",
    contexts: ["selection"],
  });
}

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  let target = "";
  if (info.menuItemId === MENU_LINK) {
    target = info.linkUrl || info.selectionText || "";
  } else if (info.menuItemId === MENU_SELECTION) {
    target = info.selectionText || "";
  } else if (info.menuItemId === MENU_PAGE) {
    target = info.pageUrl || (tab && tab.url) || "";
  }

  if (!target) {
    await notifyError("Nothing to scan", "The selected item did not contain a link.");
    return;
  }
  await quickScan(target.trim(), tab && typeof tab.id === "number" ? tab.id : null);
});

async function quickScan(target, tabId) {
  const settings = await getSettings();
  try {
    const result = await scanUrl(settings.baseUrl, target);
    await saveScan(result);
    if (tabId !== null) await setBadge(tabId, result);
    if (settings.notifications) await notifyResult(result, settings.baseUrl);
  } catch (error) {
    if (settings.notifications) {
      await notifyError("Scan failed", error && error.message ? error.message : "Unknown error");
    } else {
      console.warn("Cyber Detector scan failed:", error);
    }
  }
}

async function setBadge(tabId, result) {
  const text = result.verdict === "safe" ? "OK" : result.verdict === "suspicious" ? "!" : "X";
  const color =
    result.verdict === "safe" ? "#16a34a" : result.verdict === "suspicious" ? "#d97706" : "#dc2626";
  try {
    await chrome.action.setBadgeText({ tabId, text });
    await chrome.action.setBadgeBackgroundColor({ tabId, color });
  } catch {
    /* badge is cosmetic */
  }
}

async function notifyResult(result, baseUrl) {
  const meta = verdictMeta(result.verdict);
  const score =
    result.heuristics && typeof result.heuristics.score === "number"
      ? result.heuristics.score
      : 0;
  const parts = parseUrlParts(result.url);
  const signals =
    result.heuristics && Array.isArray(result.heuristics.signals)
      ? result.heuristics.signals
      : [];
  const firstSignal = signals.length && signals[0].label ? `\n${signals[0].label}` : "";
  const host = parts ? parts.hostname : result.url;
  const message = `${meta.label} — ${score}/100\n${host}${firstSignal}`;

  const id = `cd-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  const link = shareLink(baseUrl, result.url);
  try {
    await chrome.storage.session.set({ [`notif:${id}`]: link });
    await chrome.notifications.create(id, {
      type: "basic",
      iconUrl: chrome.runtime.getURL("icons/icon128.png"),
      title: `Cyber Detector — ${meta.label}`,
      message: message.slice(0, 240),
      contextMessage: "Click to open the full report",
      buttons: [{ title: "Open full report" }],
      priority: result.verdict === "malicious" ? 2 : 0,
    });
  } catch (error) {
    console.warn("Could not show notification:", error);
  }
}

async function notifyError(title, message) {
  try {
    await chrome.notifications.create(`cd-err-${Date.now()}`, {
      type: "basic",
      iconUrl: chrome.runtime.getURL("icons/icon128.png"),
      title: `Cyber Detector — ${title}`,
      message: String(message || "Unknown error").slice(0, 240),
      priority: 1,
    });
  } catch (error) {
    console.warn("Could not show notification:", error);
  }
}

async function openFromNotification(id) {
  const key = `notif:${id}`;
  try {
    const stored = await chrome.storage.session.get(key);
    const link = stored && stored[key];
    if (link) await chrome.tabs.create({ url: link });
  } catch (error) {
    console.warn("Could not open report:", error);
  } finally {
    try {
      await chrome.notifications.clear(id);
    } catch {
      /* ignore */
    }
    try {
      await chrome.storage.session.remove(key);
    } catch {
      /* ignore */
    }
  }
}

chrome.notifications.onClicked.addListener(openFromNotification);
chrome.notifications.onButtonClicked.addListener((id) => {
  openFromNotification(id);
});
chrome.notifications.onClosed.addListener(async (id) => {
  try {
    await chrome.storage.session.remove(`notif:${id}`);
  } catch {
    /* ignore */
  }
});

// A stale verdict badge should not stay on a tab after it navigates.
chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status !== "loading") return;
  try {
    const pending = chrome.action.setBadgeText({ tabId, text: "" });
    if (pending && typeof pending.catch === "function") pending.catch(() => {});
  } catch {
    /* badge is cosmetic */
  }
});

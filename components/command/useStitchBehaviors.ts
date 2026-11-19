"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const NETWORK_TOGGLE = {
  on: ["bg-emerald-secure/25", "border-emerald-secure/60", "cyber-glow-emerald"],
  off: ["bg-surface-container-highest/80", "border-white/10"],
  thumbOn: ["translate-x-6", "bg-emerald-secure", "shadow-[0_0_10px_#00e699]"],
  thumbOff: ["translate-x-0", "bg-text-muted"],
};

const TRAFFIC_TOGGLE = {
  on: ["bg-secondary-container"],
  off: ["bg-surface-container-highest"],
  thumbOn: ["translate-x-6", "bg-on-secondary-container"],
  thumbOff: ["translate-x-0", "bg-outline"],
};

/**
 * Re-creates the small Stitch prototype interactions (filters, toggles,
 * dialogs, scan CTA) with delegated events. The generated screens are static
 * markup, so mutating their class lists is safe and avoids a state copy of
 * every card.
 */
export function useStitchBehaviors() {
  const router = useRouter();

  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-command-screen]");
    if (!root) return;

    const replaceClass = (element: Element, remove: string[], add: string[]) => {
      element.classList.remove(...remove);
      element.classList.add(...add);
    };

    const toggleShield = (element: HTMLElement) => {
      const thumb = element.querySelector("span");
      if (!thumb) return;
      const network = element.classList.contains("bg-emerald-secure/25");
      const active = network || element.classList.contains("bg-secondary-container");
      const set = network ? NETWORK_TOGGLE : TRAFFIC_TOGGLE;

      if (active) {
        replaceClass(element, set.on, set.off);
        replaceClass(thumb, set.thumbOn, set.thumbOff);
      } else {
        replaceClass(element, set.off, set.on);
        replaceClass(thumb, set.thumbOff, set.thumbOn);
      }
    };

    const swapPill = (pill: HTMLElement, activeTemplate: string, inactiveTemplate: string) => {
      const group = pill.parentElement;
      if (!group) return;
      group.querySelectorAll<HTMLElement>(".mode-pill, .filter-pill").forEach((item) => {
        item.className = inactiveTemplate;
      });
      pill.className = activeTemplate;
    };

    const pillTemplates = new WeakMap<HTMLElement, { active: string; inactive: string }>();

    const prepare = (selector: string) => {
      root.querySelectorAll<HTMLElement>(selector).forEach((item) => {
        const group = item.parentElement;
        if (!group || pillTemplates.has(group)) return;
        const pills = Array.from(group.querySelectorAll<HTMLElement>(selector));
        if (pills.length < 2) return;
        pillTemplates.set(group, {
          active: pills[0].className,
          inactive: pills[1].className,
        });
      });
    };

    prepare(".mode-pill");
    prepare(".filter-pill");

    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target || !root.contains(target)) return;

      const actionEl = target.closest<HTMLElement>("[data-action]");
      if (actionEl) {
        const action = actionEl.dataset.action;
        const arg = actionEl.dataset.arg;

        if (action === "open-purge") {
          document.getElementById("purge-confirm-modal")?.classList.remove("hidden");
          return;
        }
        if (action === "close-purge") {
          document.getElementById("purge-confirm-modal")?.classList.add("hidden");
          return;
        }
        if (action === "toggle-details" && arg) {
          document.getElementById(arg)?.classList.toggle("hidden");
          return;
        }
        if (action === "toggle-shield") {
          toggleShield(actionEl);
          return;
        }
        if (action === "back") {
          router.back();
          return;
        }
        if (action === "filter") {
          const group = actionEl.parentElement;
          const template = group ? pillTemplates.get(group) : undefined;
          if (template) swapPill(actionEl, template.active, template.inactive);
          return;
        }
      }

      if (target.closest("#cta-scan-btn")) {
        router.push("/scan/live");
        return;
      }

      const modePill = target.closest<HTMLElement>(".mode-pill");
      if (modePill) {
        const group = modePill.parentElement;
        const template = group ? pillTemplates.get(group) : undefined;
        if (template) swapPill(modePill, template.active, template.inactive);
      }
    };

    root.addEventListener("click", onClick);

    const ping = window.setInterval(() => {
      const pingEl = document.getElementById("live-ping");
      if (pingEl) pingEl.textContent = `${Math.floor(16 + Math.random() * 5)}ms`;
    }, 3500);

    return () => {
      root.removeEventListener("click", onClick);
      window.clearInterval(ping);
    };
  }, [router]);
}

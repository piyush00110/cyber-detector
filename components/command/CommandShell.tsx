"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/command/scanner", label: "Scanner", icon: "radar" },
  { href: "/command/threats", label: "Threats", icon: "pest_control" },
  { href: "/command/network", label: "Network", icon: "wifi_tethering" },
  { href: "/command/logs", label: "Logs", icon: "terminal" },
];

function ShieldMark({ className = "" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2.4 4.6 5.2v5.5c0 4.8 3.1 8.9 7.4 10.9 4.3-2 7.4-6.1 7.4-10.9V5.2L12 2.4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m8.4 12 2.4 2.4 4.8-5.1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function isActive(pathname: string, href: string) {
  if (href === "/command/scanner") {
    return pathname === "/command" || pathname.startsWith("/command/scanner");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function CommandShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const breached =
    pathname === "/command/threats" || pathname.startsWith("/command/logs");

  return (
    <div className="command-app relative mx-auto flex min-h-[100dvh] w-full max-w-[480px] flex-col overflow-x-hidden bg-obsidian-base text-on-surface selection:bg-electric-cyan selection:text-obsidian-base">
      {/* Full-viewport backdrop so the app stays obsidian even in light theme. */}
      <div aria-hidden="true" className="fixed inset-0 -z-20 bg-obsidian-base" />

      {/* Ambient background mesh */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/2 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-electric-cyan/10 blur-[120px]" />
        <div className="absolute -left-20 top-[40%] h-[260px] w-[260px] rounded-full bg-secondary-fixed-dim/10 blur-[100px]" />
        <div className="absolute bottom-10 right-0 h-[240px] w-[240px] rounded-full bg-crimson-breach/10 blur-[90px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#00f0ff_0.5px,transparent_0.5px)] opacity-[0.035] [background-size:24px_24px]" />
      </div>

      <header className="fixed left-1/2 top-0 z-50 w-full max-w-[480px] -translate-x-1/2 bg-[#070b13]/85 pt-safe backdrop-blur-2xl titanium-edge">
        <div className="flex h-16 items-center justify-between gap-space-sm px-margin">
          <Link className="flex min-w-0 items-center gap-space-sm" href="/command">
            <span className="relative flex flex-shrink-0 items-center justify-center rounded-lg border border-electric-cyan/20 bg-surface-container-lowest/80 p-1 shadow-[0_0_12px_rgba(0,240,255,0.15)]">
              <ShieldMark className="h-8 w-8 text-electric-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="flex items-center gap-1.5">
                <span className="truncate font-headline-md text-headline-md font-bold tracking-tight text-text-photonic drop-shadow-sm">
                  CyberDetector
                </span>
                <span className="hidden rounded border border-electric-cyan/40 bg-electric-cyan/10 px-1 py-px font-label-telemetry-sm text-[9px] font-semibold uppercase tracking-widest text-electric-cyan min-[380px]:inline">
                  v4.2 PRO
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span
                    className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                      breached ? "bg-crimson-breach" : "bg-emerald-secure"
                    }`}
                  />
                  <span
                    className={`relative inline-flex h-2 w-2 rounded-full ${
                      breached
                        ? "bg-crimson-breach shadow-[0_0_8px_#ff2a55]"
                        : "bg-emerald-secure shadow-[0_0_8px_#00e699]"
                    }`}
                  />
                </span>
                <span
                  className={`truncate font-label-telemetry-sm text-[10px] font-semibold uppercase tracking-wider ${
                    breached ? "text-crimson-breach" : "text-emerald-secure"
                  }`}
                >
                  {breached ? "DEFENSE STATE: BREACH" : "SYSTEM ARMED // LEVEL-0"}
                </span>
              </span>
            </span>
          </Link>

          <div className="flex flex-shrink-0 items-center gap-2">
            <Link
              aria-label="Active alerts"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-obsidian-elevated/90 text-on-surface-variant shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] transition-all duration-300 hover:border-electric-cyan/40 hover:text-electric-cyan"
              href="/command/logs"
            >
              <span className="material-symbols-outlined text-[19px]">notifications</span>
              <span className="absolute right-2 top-2 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson-breach opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-crimson-breach shadow-[0_0_6px_#ff2a55]" />
              </span>
            </Link>
            <Link
              aria-label="Command center"
              className="relative flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-electric-cyan via-secondary/40 to-transparent p-px shadow-[0_0_12px_rgba(0,240,255,0.25)]"
              href="/command"
            >
              <span className="flex h-full w-full items-center justify-center rounded-[7px] bg-[#090e18]">
                <span className="material-symbols-outlined text-[18px] text-electric-cyan">shield_person</span>
              </span>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex min-h-screen w-full flex-col bg-transparent pb-24 pt-16">
        {children}
      </main>

      <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-[480px] -translate-x-1/2 bg-[#060912]/90 pb-safe backdrop-blur-2xl titanium-nav">
        <div className="flex h-16 items-center justify-around px-gutter">
          {tabs.map((tab) => {
            const active = isActive(pathname, tab.href);
            return (
              <Link
                key={tab.href}
                aria-current={active ? "page" : undefined}
                className={`relative flex h-12 min-w-[56px] flex-col items-center justify-center gap-1 transition-colors ${
                  active
                    ? "font-bold text-electric-cyan drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]"
                    : "text-text-telemetry hover:text-electric-cyan"
                }`}
                href={tab.href}
              >
                <span className="material-symbols-outlined text-[23px]">{tab.icon}</span>
                <span className="font-label-telemetry-sm text-[10px] uppercase tracking-widest">
                  {tab.label}
                </span>
                {active ? (
                  <span className="absolute -top-1 h-[2px] w-6 rounded-full bg-electric-cyan shadow-[0_0_8px_#00f0ff]" />
                ) : null}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

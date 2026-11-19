"use client";

import { useStitchBehaviors } from "@/components/command/useStitchBehaviors";

/** Generated from the Stitch "virus-scanner" screen. */
export default function VirusScannerScreen() {
  useStitchBehaviors();

  return (
    <div data-command-screen className="flex w-full flex-col">
      <div className="flex flex-col w-full px-margin-mobile pb-space-lg gap-space-md">
      
      <div className="flex items-center justify-between pt-space-xs">
      <div className="flex min-w-0 items-center gap-space-xs">
      <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_currentColor]"></span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm uppercase tracking-wider text-secondary truncate">CORE ENGINE // v4.9.1</span>
      </div>
      <div className="flex items-center gap-1.5 px-space-xs py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-telemetry-sm text-label-telemetry-sm">
      <span className="material-symbols-outlined text-[13px] text-primary">sensors</span>
      <span>REALTIME SYNCED</span>
      </div>
      </div>
      
      <div className="relative w-full rounded-xl bg-surface-container-low p-space-md flex flex-col items-center overflow-hidden shadow-lg">
      
      <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-secondary/10 blur-3xl pointer-events-none"></div>
      
      <div className="w-full flex items-center justify-between z-10 pb-space-xs">
      <span className="font-label-telemetry-sm text-label-telemetry-sm uppercase text-outline">ORBITAL MATRIX: #884-TX</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm uppercase text-primary tracking-wide">STATUS: ARMED</span>
      </div>
      
      <div className="relative w-64 h-64 my-space-xs flex items-center justify-center">
      
      <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" viewBox="0 0 256 256">
      <circle className="text-primary/20" cx="128" cy="128" r="118" stroke="currentColor" strokeDasharray="3 4" strokeWidth="1"></circle>
      <circle className="text-primary/25" cx="128" cy="128" r="92" stroke="currentColor" strokeWidth="1"></circle>
      <circle className="text-secondary/30" cx="128" cy="128" r="64" stroke="currentColor" strokeDasharray="2 6" strokeWidth="1"></circle>
      <circle className="text-primary/20" cx="128" cy="128" r="36" stroke="currentColor" strokeWidth="1"></circle>
      
      <line className="text-primary/15" stroke="currentColor" strokeWidth="1" x1="128" x2="128" y1="8" y2="248"></line>
      <line className="text-primary/15" stroke="currentColor" strokeWidth="1" x1="8" x2="248" y1="128" y2="128"></line>
      
      <circle className="fill-primary" cx="128" cy="10" r="2"></circle>
      <circle className="fill-primary" cx="128" cy="246" r="2"></circle>
      <circle className="fill-primary" cx="10" cy="128" r="2"></circle>
      <circle className="fill-primary" cx="246" cy="128" r="2"></circle>
      </svg>
      
      <div className="absolute inset-2 rounded-full pointer-events-none animate-spin" id="radar-sweeper" style={{ animationDuration: "4.8s", animationTimingFunction: "linear", background: "conic-gradient(from 0deg, rgba(6, 182, 212, 0.35) 0deg, rgba(6, 182, 212, 0) 75deg)" }}></div>
      
      <span className="absolute top-12 right-14 w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_currentColor] animate-ping" style={{ animationDuration: "2.8s" }}></span>
      <span className="absolute top-12 right-14 w-2 h-2 rounded-full bg-secondary"></span>
      <span className="absolute bottom-16 left-16 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_6px_currentColor]"></span>
      
      <div className="relative w-40 h-40 rounded-full bg-surface-container flex flex-col items-center justify-center p-space-sm text-center shadow-inner z-10">
      <div className="flex items-center gap-1 text-secondary">
      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm tracking-wider uppercase font-semibold">SECURE</span>
      </div>
      <div className="font-headline-xl-mobile text-headline-xl-mobile tracking-tighter text-on-surface my-0.5">99.8<span className="font-label-telemetry-md text-label-telemetry-md text-primary">%</span></div>
      <div className="font-label-telemetry-sm text-label-telemetry-sm uppercase tracking-wide text-on-surface-variant">INTEGRITY</div>
      </div>
      </div>
      
      <div className="flex items-center gap-space-xs mt-space-xs z-10">
      <span className="material-symbols-outlined text-[14px] text-primary">schedule</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm uppercase text-on-surface-variant">LAST AUDIT: <strong className="text-on-surface font-medium">2 MIN AGO</strong></span>
      </div>
      
      <button className="relative group w-full mt-space-md py-space-sm px-space-md rounded-lg bg-primary-container text-on-primary-container font-label-telemetry-lg text-label-telemetry-lg uppercase font-bold tracking-wider flex items-center justify-center gap-space-sm shadow-md active:scale-[0.98] transition-transform pr-3 min-[380px]:pr-16" id="cta-scan-btn">
      <span className="material-symbols-outlined text-[20px] transition-transform duration-500" id="btn-icon">radar</span>
      <span id="btn-label">INITIALIZE DEEP SCAN</span>
      <span className="absolute right-3 font-label-telemetry-sm text-label-telemetry-sm opacity-60 hidden min-[380px]:inline">EXEC://</span>
      </button>
      </div>
      
      <div className="flex flex-col gap-space-xs">
      <div className="flex items-center justify-between">
      <span className="font-label-telemetry-sm text-label-telemetry-sm uppercase text-outline">SCAN MODES</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm uppercase text-primary">ACTIVE TARGET: PROD-SYS</span>
      </div>
      <div className="flex gap-space-xs overflow-x-auto pb-space-xs no-scrollbar">
      
      <button className="mode-pill flex items-center gap-1.5 px-space-md py-space-xs rounded-full bg-primary text-on-primary font-label-telemetry-sm text-label-telemetry-sm font-semibold tracking-wider whitespace-nowrap shadow-sm">
      <span className="material-symbols-outlined text-[15px]">bolt</span>
      <span>QUICK (30S)</span>
      </button>
      
      <button className="mode-pill flex items-center gap-1.5 px-space-md py-space-xs rounded-full bg-surface-container-high text-on-surface font-label-telemetry-sm text-label-telemetry-sm tracking-wider whitespace-nowrap hover:bg-surface-bright transition-colors">
      <span className="material-symbols-outlined text-[15px] text-primary">memory</span>
      <span>ROOTKIT &amp; MEM</span>
      </button>
      
      <button className="mode-pill flex items-center gap-1.5 px-space-md py-space-xs rounded-full bg-surface-container-high text-on-surface font-label-telemetry-sm text-label-telemetry-sm tracking-wider whitespace-nowrap hover:bg-surface-bright transition-colors">
      <span className="material-symbols-outlined text-[15px] text-secondary">psychology</span>
      <span>ZERO-DAY AI</span>
      </button>
      
      <button className="mode-pill flex items-center gap-1.5 px-space-md py-space-xs rounded-full bg-surface-container-high text-on-surface font-label-telemetry-sm text-label-telemetry-sm tracking-wider whitespace-nowrap hover:bg-surface-bright transition-colors">
      <span className="material-symbols-outlined text-[15px] text-tertiary">storage</span>
      <span>FULL SYSTEM</span>
      </button>
      </div>
      </div>
      
      <div className="grid grid-cols-3 gap-space-xs w-full">
      
      <div className="flex flex-col justify-between p-space-sm rounded-lg bg-surface-container-low min-w-0 shadow-sm">
      <div className="flex items-center justify-between">
      <span className="material-symbols-outlined text-secondary text-[18px]">security</span>
      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
      </div>
      <div className="mt-space-sm">
      <div className="font-headline-md text-headline-md tracking-tight text-on-surface font-bold">8/8</div>
      <div className="font-label-telemetry-sm text-label-telemetry-sm uppercase text-on-surface-variant truncate">SHIELDS ON</div>
      </div>
      </div>
      
      <div className="flex flex-col justify-between p-space-sm rounded-lg bg-surface-container-low min-w-0 shadow-sm">
      <div className="flex items-center justify-between">
      <span className="material-symbols-outlined text-primary text-[18px]">inventory_2</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-outline">ISOL</span>
      </div>
      <div className="mt-space-sm">
      <div className="font-headline-md text-headline-md tracking-tight text-on-surface font-bold">0</div>
      <div className="font-label-telemetry-sm text-label-telemetry-sm uppercase text-on-surface-variant truncate">QUARANTINED</div>
      </div>
      </div>
      
      <div className="flex flex-col justify-between p-space-sm rounded-lg bg-surface-container-low min-w-0 shadow-sm">
      <div className="flex items-center justify-between">
      <span className="material-symbols-outlined text-secondary text-[18px]">gpp_good</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-secondary">+14</span>
      </div>
      <div className="mt-space-sm">
      <div className="font-headline-md text-headline-md tracking-tight text-on-surface font-bold">14</div>
      <div className="font-label-telemetry-sm text-label-telemetry-sm uppercase text-on-surface-variant truncate">NEUTRALIZED</div>
      </div>
      </div>
      </div>
      
      <div className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container min-w-0">
      <div className="w-9 h-9 rounded-lg bg-primary-container/20 flex items-center justify-center flex-shrink-0 text-primary">
      <span className="material-symbols-outlined text-[20px]">shield_with_heart</span>
      </div>
      <div className="flex flex-col min-w-0 flex-1">
      <div className="flex items-center justify-between gap-1">
      <span className="font-label-telemetry-md text-label-telemetry-md text-on-surface uppercase font-semibold truncate">HEURISTIC DEFENSE MESH</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-secondary font-semibold uppercase">ACTIVE</span>
      </div>
      <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Kernel-level telemetry &amp; memory integrity guard running</span>
      </div>
      </div>
      
      <div className="relative w-full rounded-xl overflow-hidden bg-surface-container-low shadow-sm">
      <div className="relative h-28 w-full bg-cover bg-center" data-alt="Futuristic cyber security network operations center displaying neon cyan and dark obsidian holographic server topology and tactical digital data wireframes in cinematic low light." style={{ backgroundImage: "url('/stitch/threat-map.png')" }}>
      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-surface-container-low/60 to-transparent"></div>
      <div className="absolute top-space-xs left-space-sm flex items-center gap-1.5 px-space-xs py-0.5 rounded bg-surface-container-lowest/80 backdrop-blur-md">
      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-primary uppercase">GLOBAL THREAT MAP</span>
      </div>
      <div className="absolute bottom-space-xs left-space-sm right-space-sm flex items-center justify-between text-on-surface">
      <div className="flex flex-col">
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface font-semibold">NODE ENCLAVE #44</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant">Zero perimeter deviations identified</span>
      </div>
      <span className="font-label-telemetry-sm text-label-telemetry-sm px-space-xs py-0.5 rounded bg-secondary/15 text-secondary uppercase font-semibold">SYNCHRONIZED</span>
      </div>
      </div>
      </div>
      
      <div className="flex flex-col gap-space-xs">
      <div className="flex items-center justify-between">
      <div className="flex min-w-0 items-center gap-space-xs">
      <span className="material-symbols-outlined text-[16px] text-primary">terminal</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm uppercase font-semibold text-on-surface">TACTICAL EVENT STREAM</span>
      </div>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-outline uppercase">BUFF: 128 KB</span>
      </div>
      
      <div className="flex flex-col gap-space-xs w-full">
      
      <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container min-w-0">
      <div className="flex items-center gap-space-sm min-w-0">
      <div className="w-7 h-7 rounded bg-error-container/30 text-error flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-[16px]">link_off</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-label-telemetry-md text-label-telemetry-md text-on-surface truncate font-medium">Auto-blocked phishing URL: bit.ly/x9q7P</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant uppercase truncate">DNS FILTER // MALICIOUS C2 VECTOR</span>
      </div>
      </div>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-outline flex-shrink-0 ml-space-xs">14:02:18</span>
      </div>
      
      <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container min-w-0">
      <div className="flex items-center gap-space-sm min-w-0">
      <div className="w-7 h-7 rounded bg-primary-container/20 text-primary flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-[16px]">layers_clear</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-label-telemetry-md text-label-telemetry-md text-on-surface truncate font-medium">Sandboxed unauthorized APK payload</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant uppercase truncate">PACKAGE: com.cryptosync.agent</span>
      </div>
      </div>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-outline flex-shrink-0 ml-space-xs">13:58:44</span>
      </div>
      
      <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container min-w-0">
      <div className="flex items-center gap-space-sm min-w-0">
      <div className="w-7 h-7 rounded bg-secondary-container/20 text-secondary flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-[16px]">verified</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-label-telemetry-md text-label-telemetry-md text-on-surface truncate font-medium">Integrity verified for 1,420 binaries</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant uppercase truncate">SHA-256 CHECK PASS // NO TAMPERING</span>
      </div>
      </div>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-outline flex-shrink-0 ml-space-xs">13:41:09</span>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
}

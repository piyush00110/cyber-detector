"use client";

import { useStitchBehaviors } from "@/components/command/useStitchBehaviors";

/** Generated from the Stitch "prime-hub" screen. */
export default function PrimeHubScreen() {
  useStitchBehaviors();

  return (
    <div data-command-screen className="flex w-full flex-col">
      <div className="flex flex-col w-full px-margin-mobile pb-space-lg gap-space-md">
      
      <div className="flex items-center justify-between pt-space-xs px-0.5">
      <div className="flex min-w-0 items-center gap-space-xs">
      <span className="w-2 h-2 rounded-full bg-emerald-secure shadow-[0_0_10px_#00e699]"></span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm uppercase tracking-wider text-emerald-secure font-semibold truncate">CORE QUANTUM MESH // v4.9.1</span>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-obsidian-elevated/90 border border-electric-cyan/20 text-electric-cyan font-label-telemetry-sm text-label-telemetry-sm shadow-[0_0_10px_rgba(0,240,255,0.1)] whitespace-nowrap">
      <span className="material-symbols-outlined text-[13px] animate-pulse">sensors</span>
      <span className="tracking-widest font-semibold">REALTIME SYNC</span>
      </div>
      </div>
      
      <div className="relative w-full rounded-2xl glass-card p-space-md flex flex-col items-center overflow-hidden border border-electric-cyan/25">
      
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-electric-cyan to-transparent"></div>
      
      <div className="absolute -top-16 -left-16 w-52 h-52 rounded-full bg-electric-cyan/15 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-16 -right-16 w-52 h-52 rounded-full bg-emerald-secure/15 blur-3xl pointer-events-none"></div>
      
      <div className="w-full flex items-center justify-between z-10 pb-space-xs border-b border-white/[0.06]">
      <div className="flex items-center gap-1.5">
      <span className="w-1 h-3 bg-electric-cyan rounded-full"></span>
      <span className="font-label-telemetry-sm text-[11px] uppercase text-text-telemetry font-medium">ORBITAL MATRIX: <span className="text-text-photonic">#884-TX</span></span>
      </div>
      <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan font-label-telemetry-sm text-[10px] tracking-wider font-semibold">
      <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-ping"></span>
      <span>STATUS: ARMED</span>
      </div>
      </div>
      
      <div className="relative w-64 h-64 my-2 flex items-center justify-center">
      
      <div className="absolute inset-0 rounded-full border border-white/10 shadow-[0_0_30px_rgba(0,240,255,0.15)] pointer-events-none"></div>
      <div className="absolute inset-1 rounded-full border border-electric-cyan/20 pointer-events-none"></div>
      
      <svg className="absolute inset-0 w-full h-full pointer-events-none" fill="none" viewBox="0 0 256 256">
      <circle className="text-electric-cyan/15" cx="128" cy="128" r="120" stroke="currentColor" strokeDasharray="2 4" strokeWidth="1"></circle>
      <circle className="text-electric-cyan/25" cx="128" cy="128" r="98" stroke="currentColor" strokeWidth="1.2"></circle>
      <circle className="text-emerald-secure/30" cx="128" cy="128" r="72" stroke="currentColor" strokeDasharray="3 6" strokeWidth="1.2"></circle>
      <circle className="text-electric-cyan/25" cx="128" cy="128" r="46" stroke="currentColor" strokeWidth="1"></circle>
      
      <line className="text-electric-cyan/20" stroke="currentColor" strokeWidth="1" x1="128" x2="128" y1="4" y2="252"></line>
      <line className="text-electric-cyan/20" stroke="currentColor" strokeWidth="1" x1="4" x2="252" y1="128" y2="128"></line>
      
      <circle className="fill-electric-cyan drop-shadow-[0_0_4px_#00f0ff]" cx="128" cy="8" r="2.5"></circle>
      <circle className="fill-electric-cyan drop-shadow-[0_0_4px_#00f0ff]" cx="128" cy="248" r="2.5"></circle>
      <circle className="fill-electric-cyan drop-shadow-[0_0_4px_#00f0ff]" cx="8" cy="128" r="2.5"></circle>
      <circle className="fill-electric-cyan drop-shadow-[0_0_4px_#00f0ff]" cx="248" cy="128" r="2.5"></circle>
      </svg>
      
      <div className="absolute inset-2 rounded-full pointer-events-none animate-spin" id="radar-sweeper" style={{ animationDuration: "4.8s", animationTimingFunction: "linear", background: "conic-gradient(from 0deg, rgba(0, 240, 255, 0.45) 0deg, rgba(0, 230, 153, 0.15) 35deg, rgba(0, 240, 255, 0) 80deg)" }}></div>
      
      <span className="absolute top-12 right-14 w-2.5 h-2.5 rounded-full bg-emerald-secure shadow-[0_0_12px_#00e699] animate-ping" style={{ animationDuration: "2.4s" }}></span>
      <span className="absolute top-12 right-14 w-2.5 h-2.5 rounded-full bg-emerald-secure shadow-[0_0_8px_#00e699]"></span>
      <span className="absolute bottom-16 left-16 w-2 h-2 rounded-full bg-electric-cyan shadow-[0_0_10px_#00f0ff]"></span>
      <span className="absolute top-24 left-12 w-1.5 h-1.5 rounded-full bg-crimson-breach shadow-[0_0_6px_#ff2a55]"></span>
      
      <div className="relative w-40 h-40 rounded-full bg-gradient-to-b from-[#141b2a] to-[#090d16] flex flex-col items-center justify-center p-space-sm text-center border border-electric-cyan/35 shadow-[inset_0_2px_12px_rgba(0,240,255,0.2),0_0_30px_rgba(0,0,0,0.8)] z-10 backdrop-blur-xl">
      <div className="flex items-center gap-1.5 text-emerald-secure bg-emerald-secure/10 px-2 py-0.5 rounded-full border border-emerald-secure/30 shadow-[0_0_8px_rgba(0,230,153,0.25)]">
      <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
      <span className="font-label-telemetry-sm text-[10px] tracking-widest uppercase font-bold">SECURE</span>
      </div>
      <div className="font-headline-xl-mobile text-[34px] leading-tight font-extrabold tracking-tighter text-text-photonic my-0.5 drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]">99.8<span className="font-label-telemetry-md text-electric-cyan text-[18px] ml-0.5 font-bold">%</span></div>
      <div className="font-label-telemetry-sm text-[10px] uppercase tracking-widest text-text-telemetry font-semibold">INTEGRITY</div>
      </div>
      </div>
      
      <div className="flex items-center gap-2 mt-1 z-10 px-3 py-1 rounded-full bg-surface-container-lowest/80 border border-white/5">
      <span className="material-symbols-outlined text-[14px] text-electric-cyan animate-pulse">schedule</span>
      <span className="font-label-telemetry-sm text-[11px] uppercase text-text-telemetry">LAST AUDIT: <strong className="text-text-photonic font-semibold tracking-wide">2 MIN AGO</strong></span>
      </div>
      
      <button className="relative group w-full mt-space-md py-3.5 px-space-md pr-3 min-[380px]:pr-16 clip-chamfer bg-gradient-to-r from-electric-cyan via-[#4ee2ec] to-secondary text-[#00222a] font-label-telemetry-lg text-label-telemetry-lg uppercase font-bold tracking-wider flex items-center justify-center gap-space-sm shadow-[0_0_25px_rgba(0,240,255,0.5),inset_0_1px_1px_rgba(255,255,255,0.6)] active:scale-[0.98] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] transition-all duration-300" id="cta-scan-btn">
      <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></span>
      <span className="material-symbols-outlined text-[22px] transition-transform duration-500 font-bold" id="btn-icon">radar</span>
      <span className="font-extrabold tracking-widest text-[13px]" id="btn-label">INITIALIZE DEEP SCAN</span>
      <span className="absolute right-4 font-label-telemetry-sm text-[11px] px-1.5 py-0.5 rounded bg-black/25 text-black font-extrabold tracking-wider hidden min-[380px]:inline">EXEC://</span>
      </button>
      </div>
      
      <div className="flex flex-col gap-space-xs">
      <div className="flex items-center justify-between px-1">
      <div className="flex items-center gap-1.5">
      <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan"></span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm uppercase text-text-telemetry font-semibold">SCAN MODES</span>
      </div>
      <span className="font-label-telemetry-sm text-[10px] text-electric-cyan tracking-wider font-semibold uppercase">ACTIVE TARGET: <span className="text-text-photonic">PROD-SYS</span></span>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar pt-0.5">
      
      <button className="mode-pill flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-electric-cyan to-[#2ad4ea] text-obsidian-base font-label-telemetry-sm text-label-telemetry-sm font-bold tracking-wider whitespace-nowrap shadow-[0_0_16px_rgba(0,240,255,0.45)] border border-white/40">
      <span className="material-symbols-outlined text-[16px]">bolt</span>
      <span>QUICK (30S)</span>
      </button>
      
      <button className="mode-pill flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-obsidian-elevated/90 border border-white/10 text-on-surface-variant font-label-telemetry-sm text-label-telemetry-sm tracking-wider whitespace-nowrap hover:border-electric-cyan/40 hover:text-electric-cyan transition-all">
      <span className="material-symbols-outlined text-[16px] text-electric-cyan">memory</span>
      <span>ROOTKIT &amp; MEM</span>
      </button>
      
      <button className="mode-pill flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-obsidian-elevated/90 border border-white/10 text-on-surface-variant font-label-telemetry-sm text-label-telemetry-sm tracking-wider whitespace-nowrap hover:border-electric-cyan/40 hover:text-electric-cyan transition-all">
      <span className="material-symbols-outlined text-[16px] text-emerald-secure">psychology</span>
      <span>ZERO-DAY AI</span>
      </button>
      
      <button className="mode-pill flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-obsidian-elevated/90 border border-white/10 text-on-surface-variant font-label-telemetry-sm text-label-telemetry-sm tracking-wider whitespace-nowrap hover:border-electric-cyan/40 hover:text-electric-cyan transition-all">
      <span className="material-symbols-outlined text-[16px] text-tactical-amber">storage</span>
      <span>FULL SYSTEM</span>
      </button>
      </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2.5 w-full">
      
      <div className="glass-card glass-card-interactive flex flex-col justify-between p-3 rounded-xl min-w-0 transition-all duration-300">
      <div className="flex items-center justify-between">
      <div className="w-7 h-7 rounded-lg bg-emerald-secure/15 border border-emerald-secure/30 flex items-center justify-center text-emerald-secure">
      <span className="material-symbols-outlined text-[17px]">security</span>
      </div>
      <span className="w-2 h-2 rounded-full bg-emerald-secure shadow-[0_0_8px_#00e699]"></span>
      </div>
      <div className="mt-2.5">
      <div className="font-headline-md text-[20px] leading-tight tracking-tight text-text-photonic font-bold">8/8</div>
      <div className="font-label-telemetry-sm text-[10px] uppercase text-text-telemetry font-semibold truncate mt-0.5">SHIELDS ON</div>
      </div>
      </div>
      
      <div className="glass-card glass-card-interactive flex flex-col justify-between p-3 rounded-xl min-w-0 transition-all duration-300">
      <div className="flex items-center justify-between">
      <div className="w-7 h-7 rounded-lg bg-electric-cyan/15 border border-electric-cyan/30 flex items-center justify-center text-electric-cyan">
      <span className="material-symbols-outlined text-[17px]">inventory_2</span>
      </div>
      <span className="font-label-telemetry-sm text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-text-telemetry font-semibold">ISOL</span>
      </div>
      <div className="mt-2.5">
      <div className="font-headline-md text-[20px] leading-tight tracking-tight text-text-photonic font-bold">0</div>
      <div className="font-label-telemetry-sm text-[10px] uppercase text-text-telemetry font-semibold truncate mt-0.5">QUARANTINED</div>
      </div>
      </div>
      
      <div className="glass-card glass-card-interactive flex flex-col justify-between p-3 rounded-xl min-w-0 transition-all duration-300">
      <div className="flex items-center justify-between">
      <div className="w-7 h-7 rounded-lg bg-emerald-secure/15 border border-emerald-secure/30 flex items-center justify-center text-emerald-secure">
      <span className="material-symbols-outlined text-[17px]">gpp_good</span>
      </div>
      <span className="font-label-telemetry-sm text-[10px] px-1.5 py-0.5 rounded bg-emerald-secure/15 text-emerald-secure font-bold tracking-wider">+14</span>
      </div>
      <div className="mt-2.5">
      <div className="font-headline-md text-[20px] leading-tight tracking-tight text-text-photonic font-bold">14</div>
      <div className="font-label-telemetry-sm text-[10px] uppercase text-text-telemetry font-semibold truncate mt-0.5">NEUTRALIZED</div>
      </div>
      </div>
      </div>
      
      <div className="glass-card flex items-center gap-space-sm p-3.5 rounded-xl min-w-0 border-l-4 border-l-electric-cyan">
      <div className="w-10 h-10 rounded-xl bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center flex-shrink-0 text-electric-cyan shadow-[0_0_12px_rgba(0,240,255,0.2)]">
      <span className="material-symbols-outlined text-[22px]">shield_with_heart</span>
      </div>
      <div className="flex flex-col min-w-0 flex-1">
      <div className="flex items-center justify-between gap-1">
      <span className="font-label-telemetry-md text-label-telemetry-md text-text-photonic uppercase font-bold tracking-wide truncate">HEURISTIC DEFENSE MESH</span>
      <span className="font-label-telemetry-sm text-[10px] px-2 py-0.5 rounded bg-emerald-secure/15 border border-emerald-secure/30 text-emerald-secure font-bold tracking-widest uppercase">ACTIVE</span>
      </div>
      <span className="font-body-sm text-[11px] text-text-telemetry truncate mt-0.5">Kernel-level telemetry &amp; memory integrity guard running</span>
      </div>
      </div>
      
      <div className="relative w-full rounded-2xl overflow-hidden glass-card shadow-2xl border border-electric-cyan/20">
      <div className="relative h-32 w-full bg-cover bg-center" data-alt="Futuristic cyber security network operations center displaying neon cyan and dark obsidian holographic server topology and tactical digital data wireframes in cinematic low light." style={{ backgroundImage: "url('/stitch/threat-map.png')" }}>
      
      <div className="absolute inset-0 bg-gradient-to-t from-[#060810] via-[#060810]/70 to-transparent"></div>
      <div className="absolute inset-0 bg-electric-cyan/5 mix-blend-overlay"></div>
      
      <div className="absolute top-2.5 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-obsidian-base/80 backdrop-blur-md border border-electric-cyan/30 shadow-[0_0_10px_rgba(0,240,255,0.2)]">
      <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-ping"></span>
      <span className="font-label-telemetry-sm text-[10px] text-electric-cyan font-bold tracking-widest uppercase">GLOBAL THREAT MAP</span>
      </div>
      
      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-on-surface">
      <div className="flex flex-col">
      <span className="font-label-telemetry-sm text-[11px] text-text-photonic font-bold tracking-wide">NODE ENCLAVE #44</span>
      <span className="font-label-telemetry-sm text-[10px] text-text-telemetry">Zero perimeter deviations identified</span>
      </div>
      <span className="font-label-telemetry-sm text-[10px] px-2.5 py-1 rounded-lg bg-emerald-secure/20 border border-emerald-secure/40 text-emerald-secure uppercase font-bold tracking-wider shadow-[0_0_8px_rgba(0,230,153,0.3)]">SYNCHRONIZED</span>
      </div>
      </div>
      </div>
      
      <div className="flex flex-col gap-space-xs">
      <div className="flex items-center justify-between px-1">
      <div className="flex min-w-0 items-center gap-space-xs">
      <span className="material-symbols-outlined text-[16px] text-electric-cyan">terminal</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm uppercase font-bold tracking-wide text-text-photonic">TACTICAL EVENT STREAM</span>
      </div>
      <span className="font-label-telemetry-sm text-[10px] text-text-telemetry uppercase tracking-wider font-semibold">BUFF: 128 KB</span>
      </div>
      
      <div className="flex flex-col gap-2 w-full">
      
      <div className="glass-card glass-card-interactive flex items-center justify-between p-3 rounded-xl min-w-0 transition-all border-l-2 border-l-crimson-breach">
      <div className="flex items-center gap-space-sm min-w-0">
      <div className="w-8 h-8 rounded-lg bg-crimson-breach/15 border border-crimson-breach/30 text-crimson-breach flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(255,42,85,0.25)]">
      <span className="material-symbols-outlined text-[18px]">link_off</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-label-telemetry-md text-[12px] text-text-photonic truncate font-medium">Auto-blocked phishing URL: bit.ly/x9q7P</span>
      <span className="font-label-telemetry-sm text-[10px] text-crimson-breach uppercase tracking-wider truncate font-semibold">DNS FILTER // MALICIOUS C2 VECTOR</span>
      </div>
      </div>
      <span className="font-label-telemetry-sm text-[10px] text-text-telemetry flex-shrink-0 ml-space-xs font-medium">14:02:18</span>
      </div>
      
      <div className="glass-card glass-card-interactive flex items-center justify-between p-3 rounded-xl min-w-0 transition-all border-l-2 border-l-electric-cyan">
      <div className="flex items-center gap-space-sm min-w-0">
      <div className="w-8 h-8 rounded-lg bg-electric-cyan/15 border border-electric-cyan/30 text-electric-cyan flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(0,240,255,0.25)]">
      <span className="material-symbols-outlined text-[18px]">layers_clear</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-label-telemetry-md text-[12px] text-text-photonic truncate font-medium">Sandboxed unauthorized APK payload</span>
      <span className="font-label-telemetry-sm text-[10px] text-electric-cyan uppercase tracking-wider truncate font-semibold">PACKAGE: com.cryptosync.agent</span>
      </div>
      </div>
      <span className="font-label-telemetry-sm text-[10px] text-text-telemetry flex-shrink-0 ml-space-xs font-medium">13:58:44</span>
      </div>
      
      <div className="glass-card glass-card-interactive flex items-center justify-between p-3 rounded-xl min-w-0 transition-all border-l-2 border-l-emerald-secure">
      <div className="flex items-center gap-space-sm min-w-0">
      <div className="w-8 h-8 rounded-lg bg-emerald-secure/15 border border-emerald-secure/30 text-emerald-secure flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(0,230,153,0.25)]">
      <span className="material-symbols-outlined text-[18px]">verified</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-label-telemetry-md text-[12px] text-text-photonic truncate font-medium">Integrity verified for 1,420 binaries</span>
      <span className="font-label-telemetry-sm text-[10px] text-emerald-secure uppercase tracking-wider truncate font-semibold">SHA-256 CHECK PASS // NO TAMPERING</span>
      </div>
      </div>
      <span className="font-label-telemetry-sm text-[10px] text-text-telemetry flex-shrink-0 ml-space-xs font-medium">13:41:09</span>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
}

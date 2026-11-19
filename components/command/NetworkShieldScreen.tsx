"use client";

import { useStitchBehaviors } from "@/components/command/useStitchBehaviors";

/** Generated from the Stitch "network-shield" screen. */
export default function NetworkShieldScreen() {
  useStitchBehaviors();

  return (
    <div data-command-screen className="flex w-full flex-col">
      <div className="flex flex-col w-full px-margin py-space-sm gap-space-md">
      
      <div className="relative overflow-hidden rounded-xl obsidian-card p-space-md shadow-2xl">
      
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-electric-cyan/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-emerald-secure/15 rounded-full blur-2xl pointer-events-none"></div>
      <div className="relative z-10 flex items-start justify-between gap-space-sm mb-3">
      
      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-secure/10 border border-emerald-secure/30 cyber-glow-emerald">
      <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-secure opacity-90"></span>
      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-secure"></span>
      </span>
      <span className="font-label-telemetry-sm text-[10px] text-emerald-secure font-semibold tracking-widest uppercase">GHOSTNET OPTIMAL</span>
      </div>
      
      <div className="flex items-center gap-1.5 bg-surface-container-high/80 border border-white/10 px-2.5 py-1 rounded-full">
      <span className="material-symbols-outlined text-[14px] text-electric-cyan animate-pulse">wifi_find</span>
      <span className="font-label-telemetry-sm text-[11px] text-electric-cyan font-bold" id="live-ping">18ms</span>
      </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-between gap-3 mb-space-md">
      <div className="flex flex-col">
      <div className="flex items-center gap-1.5">
      <span className="font-label-telemetry-sm text-[10px] text-text-telemetry tracking-widest uppercase">NETWORK LAYER 3 SHIELD</span>
      </div>
      <h2 className="font-headline-lg-mobile text-[24px] text-text-photonic tracking-tight font-bold mt-0.5">ENCRYPTED WI-FI SHIELD</h2>
      <p className="font-label-telemetry-md text-label-telemetry-md text-emerald-secure flex items-center gap-1.5 mt-1 font-medium">
      <span className="material-symbols-outlined text-[16px] text-emerald-secure">gite</span>
      <span>Autonomous GhostNet Tunnel Active</span>
      </p>
      </div>
      
      <div className="relative flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-electric-cyan/20 via-surface-container-high to-emerald-secure/15 border border-electric-cyan/40 flex items-center justify-center cyber-glow-cyan">
      <div className="absolute inset-1 rounded-lg border border-electric-cyan/20 border-dashed animate-spin" style={{ animationDuration: "20s" }}></div>
      <span className="material-symbols-outlined text-electric-cyan text-[28px]">verified_user</span>
      </div>
      </div>
      
      <div className="relative z-10 grid grid-cols-3 gap-2 pt-1 border-t border-white/5">
      <div className="bg-obsidian-surface/90 border border-electric-cyan/20 rounded-lg p-2.5 flex flex-col justify-center">
      <span className="font-label-telemetry-sm text-[9px] text-text-telemetry font-medium tracking-wider">CLOAKED IP</span>
      <span className="font-label-telemetry-md text-[13px] text-electric-cyan font-bold truncate mt-0.5">104.28.19.42</span>
      <span className="font-label-telemetry-sm text-[9px] text-emerald-secure/80 mt-0.5">Proxy: Zurich #4</span>
      </div>
      <div className="bg-obsidian-surface/90 border border-emerald-secure/20 rounded-lg p-2.5 flex flex-col justify-center">
      <span className="font-label-telemetry-sm text-[9px] text-text-telemetry font-medium tracking-wider">ENCRYPTION</span>
      <span className="font-label-telemetry-md text-[13px] text-emerald-secure font-bold truncate mt-0.5">AES-GCM-256</span>
      <span className="font-label-telemetry-sm text-[9px] text-emerald-secure/80 mt-0.5">Zero Leak</span>
      </div>
      <div className="bg-obsidian-surface/90 border border-crimson-breach/25 rounded-lg p-2.5 flex flex-col justify-center">
      <span className="font-label-telemetry-sm text-[9px] text-text-telemetry font-medium tracking-wider">THREATS DEFLECTED</span>
      <span className="font-label-telemetry-md text-[13px] text-crimson-breach font-bold truncate mt-0.5">1,284 pkt</span>
      <span className="font-label-telemetry-sm text-[9px] text-crimson-breach/80 mt-0.5">0.00% Bypass</span>
      </div>
      </div>
      </div>
      
      <div className="rounded-xl obsidian-card p-space-md flex flex-col gap-space-sm shadow-xl">
      <div className="flex items-center justify-between">
      <div className="flex min-w-0 items-center gap-space-xs">
      <span className="material-symbols-outlined text-electric-cyan text-[18px]">equalizer</span>
      <span className="font-label-telemetry-md text-[12px] text-text-photonic uppercase tracking-wider font-semibold">PACKET TELEMETRY WAVEFORM</span>
      </div>
      <div className="flex items-center gap-2.5">
      <span className="flex items-center gap-1 font-label-telemetry-sm text-[10px] text-emerald-secure">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-secure shadow-[0_0_6px_#00e699]"></span> SECURE
                  </span>
      <span className="flex items-center gap-1 font-label-telemetry-sm text-[10px] text-crimson-breach">
      <span className="w-1.5 h-1.5 rounded-full bg-crimson-breach animate-ping"></span> ROGUE FILTERED
                  </span>
      </div>
      </div>
      
      <div className="relative w-full h-32 bg-obsidian-base rounded-lg border border-electric-cyan/25 overflow-hidden flex items-end shadow-inner">
      
      <div className="absolute inset-0 tactical-grid-bg opacity-40"></div>
      
      <div className="absolute inset-x-0 top-3 border-b border-electric-cyan/10"></div>
      <div className="absolute inset-x-0 top-1/2 border-b border-electric-cyan/10"></div>
      <div className="absolute inset-x-0 bottom-6 border-b border-electric-cyan/10"></div>
      
      <svg className="w-full h-full relative z-10" preserveAspectRatio="none" viewBox="0 0 360 120">
      <defs>
      
      <linearGradient id="neonWaveCyan" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stopColor="#00F0FF" stopOpacity="0.45"></stop>
      <stop offset="65%" stopColor="#00E699" stopOpacity="0.15"></stop>
      <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.0"></stop>
      </linearGradient>
      
      <linearGradient id="crimsonSpikeGrad" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stopColor="#FF2A55" stopOpacity="0.75"></stop>
      <stop offset="100%" stopColor="#FF2A55" stopOpacity="0.0"></stop>
      </linearGradient>
      
      <filter height="140%" id="cyanGlow" width="140%" x="-20%" y="-20%">
      <feGaussianBlur result="blur" stdDeviation="2.5"></feGaussianBlur>
      <feMerge>
      <feMergeNode in="blur"></feMergeNode>
      <feMergeNode in="SourceGraphic"></feMergeNode>
      </feMerge>
      </filter>
      </defs>
      
      <polygon fill="url(#crimsonSpikeGrad)" points="122,120 138,28 152,120"></polygon>
      <polyline fill="none" points="122,120 138,28 152,120" stroke="#FF2A55" strokeLinecap="round" strokeWidth="2"></polyline>
      <circle className="animate-pulse" cx="138" cy="28" fill="#FF2A55" r="3.5"></circle>
      <polygon fill="url(#crimsonSpikeGrad)" points="268,120 282,14 294,120"></polygon>
      <polyline fill="none" points="268,120 282,14 294,120" stroke="#FF2A55" strokeDasharray="3,2" strokeWidth="2"></polyline>
      <circle className="animate-pulse" cx="282" cy="14" fill="#FF2A55" r="3.5"></circle>
      
      <path d="M 0,84 Q 25,52 50,78 T 100,62 T 150,86 T 205,42 T 255,74 T 310,34 T 360,56 L 360,120 L 0,120 Z" fill="url(#neonWaveCyan)"></path>
      <path d="M 0,84 Q 25,52 50,78 T 100,62 T 150,86 T 205,42 T 255,74 T 310,34 T 360,56" fill="none" filter="url(#cyanGlow)" stroke="#00F0FF" strokeLinecap="round" strokeWidth="2.5"></path>
      
      <circle cx="100" cy="62" fill="#00F0FF" r="3"></circle>
      <circle cx="205" cy="42" fill="#00E699" r="3.5"></circle>
      <circle cx="310" cy="34" fill="#00F0FF" r="3"></circle>
      </svg>
      
      <div className="absolute bottom-2.5 left-2.5 z-20 flex items-center gap-2">
      <span className="bg-obsidian-surface/90 border border-electric-cyan/30 backdrop-blur-md px-2 py-0.5 rounded text-electric-cyan font-label-telemetry-sm text-[11px] font-semibold flex items-center gap-1">
      <span className="material-symbols-outlined text-[12px]">arrow_upward</span> TX: 4.8 MB/s
                  </span>
      <span className="bg-obsidian-surface/90 border border-emerald-secure/30 backdrop-blur-md px-2 py-0.5 rounded text-emerald-secure font-label-telemetry-sm text-[11px] font-semibold flex items-center gap-1">
      <span className="material-symbols-outlined text-[12px]">arrow_downward</span> RX: 14.2 MB/s
                  </span>
      </div>
      
      <div className="absolute top-2.5 right-2.5 z-20">
      <span className="bg-crimson-breach/20 border border-crimson-breach/50 text-crimson-breach font-label-telemetry-sm text-[10px] font-bold px-2 py-0.5 rounded-full cyber-glow-crimson flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-crimson-breach animate-ping"></span> 2 INTRUSIONS DROPPED
                  </span>
      </div>
      </div>
      </div>
      
      <div className="flex flex-col gap-space-xs">
      <div className="flex items-center justify-between px-1">
      <div className="flex min-w-0 items-center gap-space-xs">
      <span className="material-symbols-outlined text-crimson-breach text-[18px]">security_update_warning</span>
      <h3 className="font-headline-md text-headline-md text-text-photonic font-bold tracking-tight">INTERCEPTOR ACTIVITY</h3>
      </div>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-text-telemetry font-medium">PAST 60 MIN</span>
      </div>
      
      <div className="rounded-xl obsidian-card p-space-md flex flex-col gap-space-sm shadow-xl hover:border-crimson-breach/40 transition-colors">
      <div className="flex items-start justify-between gap-space-sm">
      <div className="flex items-center gap-2.5">
      <div className="w-9 h-9 rounded-lg bg-crimson-breach/15 border border-crimson-breach/40 flex items-center justify-center flex-shrink-0 cyber-glow-crimson">
      <span className="material-symbols-outlined text-crimson-breach text-[20px]">cell_tower</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-headline-md text-[15px] text-text-photonic font-bold truncate">Rogue C2 Server Outbound</span>
      <span className="font-label-telemetry-sm text-[11px] text-crimson-breach font-mono">194.26.29.112 // St. Petersburg, RU</span>
      </div>
      </div>
      
      <span className="bg-crimson-breach/20 border border-crimson-breach/60 px-2 py-0.5 rounded text-crimson-breach font-label-telemetry-sm text-[10px] font-bold uppercase flex-shrink-0 cyber-glow-crimson tracking-wider">
                    BLOCKED
                  </span>
      </div>
      
      <div className="relative w-full h-28 rounded-lg overflow-hidden border border-crimson-breach/30 bg-obsidian-surface">
      <div className="w-full h-full bg-cover bg-center opacity-75" data-location="Saint Petersburg, Russia" style={{ backgroundImage: "url('/stitch/network-noc.png')" }}></div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-surface via-transparent to-obsidian-surface/60"></div>
      <div className="absolute inset-0 bg-crimson-breach/10 pointer-events-none"></div>
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
      <span className="w-8 h-8 rounded-full border border-crimson-breach/60 animate-ping absolute"></span>
      <span className="w-6 h-6 rounded-full border border-crimson-breach flex items-center justify-center">
      <span className="w-1.5 h-1.5 rounded-full bg-crimson-breach"></span>
      </span>
      </div>
      
      <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-obsidian-base/90 border border-crimson-breach/30 backdrop-blur-md px-2 py-0.5 rounded">
      <span className="material-symbols-outlined text-crimson-breach text-[13px]">pin_drop</span>
      <span className="font-label-telemetry-sm text-[10px] text-text-photonic font-mono">59.9343° N, 30.3351° E</span>
      </div>
      <div className="absolute bottom-2 right-2 bg-obsidian-base/90 border border-white/10 px-2 py-0.5 rounded">
      <span className="font-label-telemetry-sm text-[10px] text-text-telemetry font-mono">02:14:08 UTC</span>
      </div>
      </div>
      <div className="flex items-center justify-between pt-0.5">
      <span className="font-body-sm text-body-sm text-text-telemetry truncate pr-2">Attempted port 4444 reverse shell telemetry payload.</span>
      <button className="bg-surface-container-high/80 border border-electric-cyan/30 px-2.5 py-1 rounded text-electric-cyan font-label-telemetry-sm text-[11px] uppercase hover:bg-electric-cyan/20 transition-all flex items-center gap-1 flex-shrink-0 group">
      <span>ISOLATE</span>
      <span className="material-symbols-outlined text-[13px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
      </button>
      </div>
      </div>
      
      <div className="rounded-xl obsidian-card p-space-md flex flex-col gap-space-xs shadow-md hover:border-emerald-secure/40 transition-colors">
      <div className="flex items-start justify-between gap-space-sm">
      <div className="flex items-center gap-2.5 min-w-0">
      <div className="w-9 h-9 rounded-lg bg-emerald-secure/15 border border-emerald-secure/30 flex items-center justify-center flex-shrink-0 cyber-glow-emerald">
      <span className="material-symbols-outlined text-emerald-secure text-[20px]">dns</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-headline-md text-[15px] text-text-photonic font-bold truncate">DNS Spoofing Prevented</span>
      <span className="font-label-telemetry-sm text-[11px] text-text-telemetry font-mono truncate">Public_Starbucks_WiFi // Cache Poisoning</span>
      </div>
      </div>
      
      <span className="bg-emerald-secure/20 border border-emerald-secure/50 px-2 py-0.5 rounded text-emerald-secure font-label-telemetry-sm text-[10px] font-bold uppercase flex-shrink-0 tracking-wider">
                    MUTED
                  </span>
      </div>
      <div className="flex items-center justify-between text-text-telemetry pt-1">
      <span className="font-body-sm text-body-sm truncate pr-2">Forged response redirected to DoH cloud resolver.</span>
      <div className="flex items-center gap-2 flex-shrink-0">
      <span className="font-label-telemetry-sm text-[11px] text-text-muted">14m ago</span>
      <a className="text-electric-cyan hover:text-white transition-colors" href="/command/traffic">
      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
      </a>
      </div>
      </div>
      </div>
      
      <div className="rounded-xl obsidian-card p-space-md flex flex-col gap-space-xs shadow-md hover:border-tactical-amber/40 transition-colors">
      <div className="flex items-start justify-between gap-space-sm">
      <div className="flex items-center gap-2.5 min-w-0">
      <div className="w-9 h-9 rounded-lg bg-tactical-amber/15 border border-tactical-amber/30 flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-tactical-amber text-[20px]">troubleshoot</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-headline-md text-[15px] text-text-photonic font-bold truncate">Subnet SYN Port Sweep</span>
      <span className="font-label-telemetry-sm text-[11px] text-text-telemetry font-mono truncate">Local Host: 192.168.1.144</span>
      </div>
      </div>
      
      <span className="bg-tactical-amber/20 border border-tactical-amber/50 px-2 py-0.5 rounded text-tactical-amber font-label-telemetry-sm text-[10px] font-bold uppercase flex-shrink-0 tracking-wider">
                    HONEYPOT
                  </span>
      </div>
      <div className="flex items-center justify-between text-text-telemetry pt-1">
      <span className="font-body-sm text-body-sm truncate pr-2">Probed ports 22, 80, 445, 8080. Silent reject engaged.</span>
      <div className="flex items-center gap-2 flex-shrink-0">
      <span className="font-label-telemetry-sm text-[11px] text-text-muted">28m ago</span>
      <a className="text-electric-cyan hover:text-white transition-colors" href="/command/traffic">
      <span className="material-symbols-outlined text-[16px]">chevron_right</span>
      </a>
      </div>
      </div>
      </div>
      </div>
      
      <div className="flex flex-col gap-space-xs mt-space-xs">
      <div className="flex items-center justify-between px-1">
      <div className="flex min-w-0 items-center gap-space-xs">
      <span className="material-symbols-outlined text-emerald-secure text-[18px]">verified</span>
      <h3 className="font-headline-md text-headline-md text-text-photonic font-bold tracking-tight">DEFENSIVE RULES</h3>
      </div>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-emerald-secure font-semibold tracking-wider">ALL SYSTEMS ARMED</span>
      </div>
      <div className="grid grid-cols-1 gap-2">
      
      <div className="obsidian-card rounded-xl p-space-md flex items-center justify-between gap-space-sm shadow-sm hover:border-electric-cyan/30 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
      <div className="w-9 h-9 rounded-lg bg-electric-cyan/15 border border-electric-cyan/30 flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-electric-cyan text-[20px]">policy</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-headline-md text-[14px] text-text-photonic font-semibold truncate">Zero-Trust Web Protection</span>
      <span className="font-body-sm text-[12px] text-text-telemetry truncate">Strict TLS-cert pinning &amp; domain reputation</span>
      </div>
      </div>
      
      <button aria-label="Toggle Zero-Trust Protection" className="cyber-toggle w-12 h-6 rounded-full bg-emerald-secure/25 border border-emerald-secure/60 relative flex items-center px-0.5 transition-colors cursor-pointer flex-shrink-0 cyber-glow-emerald"  data-action="toggle-shield">
      <span className="w-5 h-5 rounded-full bg-emerald-secure shadow-[0_0_10px_#00e699] transform translate-x-6 transition-transform"></span>
      </button>
      </div>
      
      <div className="obsidian-card rounded-xl p-space-md flex items-center justify-between gap-space-sm shadow-sm hover:border-electric-cyan/30 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
      <div className="w-9 h-9 rounded-lg bg-electric-cyan/15 border border-electric-cyan/30 flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-electric-cyan text-[20px]">link_off</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-headline-md text-[14px] text-text-photonic font-semibold truncate">Malware URL Blocker</span>
      <span className="font-body-sm text-[12px] text-text-telemetry truncate">Autonomous zero-day phishing filter</span>
      </div>
      </div>
      <button aria-label="Toggle Malware URL Blocker" className="cyber-toggle w-12 h-6 rounded-full bg-emerald-secure/25 border border-emerald-secure/60 relative flex items-center px-0.5 transition-colors cursor-pointer flex-shrink-0 cyber-glow-emerald"  data-action="toggle-shield">
      <span className="w-5 h-5 rounded-full bg-emerald-secure shadow-[0_0_10px_#00e699] transform translate-x-6 transition-transform"></span>
      </button>
      </div>
      
      <div className="obsidian-card rounded-xl p-space-md flex items-center justify-between gap-space-sm shadow-sm hover:border-emerald-secure/30 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
      <div className="w-9 h-9 rounded-lg bg-emerald-secure/15 border border-emerald-secure/30 flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-emerald-secure text-[20px]">videocam_off</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-headline-md text-[14px] text-text-photonic font-semibold truncate">Cam &amp; Mic Anti-Snoop Sentinel</span>
      <span className="font-body-sm text-[12px] text-text-telemetry truncate">Hardware-level unauthorized socket alerts</span>
      </div>
      </div>
      <button aria-label="Toggle Anti-Snoop Sentinel" className="cyber-toggle w-12 h-6 rounded-full bg-emerald-secure/25 border border-emerald-secure/60 relative flex items-center px-0.5 transition-colors cursor-pointer flex-shrink-0 cyber-glow-emerald"  data-action="toggle-shield">
      <span className="w-5 h-5 rounded-full bg-emerald-secure shadow-[0_0_10px_#00e699] transform translate-x-6 transition-transform"></span>
      </button>
      </div>
      
      <div className="obsidian-card rounded-xl p-space-md flex items-center justify-between gap-space-sm shadow-sm hover:border-electric-cyan/30 transition-colors">
      <div className="flex items-center gap-3 min-w-0">
      <div className="w-9 h-9 rounded-lg bg-electric-cyan/15 border border-electric-cyan/30 flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-electric-cyan text-[20px]">device_hub</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-headline-md text-[14px] text-text-photonic font-semibold truncate">ARP Spoof Detection</span>
      <span className="font-body-sm text-[12px] text-text-telemetry truncate">Guard MAC-to-IP binding integrity</span>
      </div>
      </div>
      <button aria-label="Toggle ARP Spoof Detection" className="cyber-toggle w-12 h-6 rounded-full bg-emerald-secure/25 border border-emerald-secure/60 relative flex items-center px-0.5 transition-colors cursor-pointer flex-shrink-0 cyber-glow-emerald"  data-action="toggle-shield">
      <span className="w-5 h-5 rounded-full bg-emerald-secure shadow-[0_0_10px_#00e699] transform translate-x-6 transition-transform"></span>
      </button>
      </div>
      </div>
      </div>
      
      <div className="pt-2 mb-space-sm">
      <button className="relative w-full overflow-hidden bg-gradient-to-r from-electric-cyan via-primary-fixed to-electric-cyan text-obsidian-base font-label-telemetry-lg text-[14px] font-bold py-3.5 px-space-md rounded-xl flex items-center justify-center gap-2.5 tracking-wider cyber-glow-cyan hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer border border-white/40">
      <span className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></span>
      <span className="material-symbols-outlined text-[20px] font-bold text-obsidian-base animate-spin" style={{ animationDuration: "8s" }}>sync</span>
      <span className="tracking-widest">PURGE STATE &amp; CYCLE IP MASK</span>
      </button>
      </div>
      </div>
    </div>
  );
}

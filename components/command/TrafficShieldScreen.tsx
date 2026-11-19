"use client";

import { useStitchBehaviors } from "@/components/command/useStitchBehaviors";

/** Generated from the Stitch "traffic-shield" screen. */
export default function TrafficShieldScreen() {
  useStitchBehaviors();

  return (
    <div data-command-screen className="flex w-full flex-col">
      <div className="flex flex-col w-full px-margin py-space-sm gap-space-md">
      
      <div className="relative overflow-hidden rounded-xl bg-surface-container p-space-md shadow-xl">
      <div className="absolute -right-10 -top-10 w-36 h-36 bg-primary/10 rounded-full blur-2xl pointer-events-none"></div>
      <div className="flex items-start justify-between gap-space-sm mb-space-sm">
      <div className="flex min-w-0 items-center gap-space-xs">
      <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
      </span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-secondary tracking-widest uppercase">TUNNEL: OPTIMAL</span>
      </div>
      <div className="flex items-center gap-1 bg-surface-container-high px-2 py-0.5 rounded-full">
      <span className="material-symbols-outlined text-[13px] text-primary">speed</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-primary" id="live-ping">18ms</span>
      </div>
      </div>
      <div className="flex flex-col mb-space-md">
      <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface tracking-tight">ENCRYPTED WI-FI SHIELD</h2>
      <p className="font-label-telemetry-md text-label-telemetry-md text-on-surface-variant flex items-center gap-1.5 mt-0.5">
      <span className="material-symbols-outlined text-[15px] text-secondary">verified_user</span>
              GhostNet Protocol Connected
            </p>
      </div>
      
      <div className="grid grid-cols-3 gap-space-xs pt-space-xs">
      <div className="bg-surface-container-low rounded-lg p-2 flex flex-col justify-center">
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant">CLOAKED IP</span>
      <span className="font-label-telemetry-md text-label-telemetry-md text-primary font-semibold truncate">104.28.19.42</span>
      </div>
      <div className="bg-surface-container-low rounded-lg p-2 flex flex-col justify-center">
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant">ENCRYPTION</span>
      <span className="font-label-telemetry-md text-label-telemetry-md text-secondary font-semibold">AES-GCM-256</span>
      </div>
      <div className="bg-surface-container-low rounded-lg p-2 flex flex-col justify-center">
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant">THREATS REFLECTED</span>
      <span className="font-label-telemetry-md text-label-telemetry-md text-tertiary-container font-semibold">1,284 pkt</span>
      </div>
      </div>
      </div>
      
      <div className="rounded-xl bg-surface-container p-space-md flex flex-col gap-space-sm shadow-lg">
      <div className="flex items-center justify-between">
      <div className="flex min-w-0 items-center gap-space-xs">
      <span className="material-symbols-outlined text-primary text-[18px]">equalizer</span>
      <span className="font-label-telemetry-md text-label-telemetry-md text-on-surface uppercase tracking-wider">PACKET TELEMETRY WAVEFORM</span>
      </div>
      <div className="flex items-center gap-2">
      <span className="flex items-center gap-1 font-label-telemetry-sm text-label-telemetry-sm text-secondary">
      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> SECURE
              </span>
      <span className="flex items-center gap-1 font-label-telemetry-sm text-label-telemetry-sm text-tertiary-container">
      <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container animate-pulse"></span> ROGUE FILTERED
              </span>
      </div>
      </div>
      
      <div className="relative w-full h-28 bg-surface-container-lowest rounded-lg overflow-hidden flex items-end">
      
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
      <defs>
      <pattern height="20" id="telemetry-grid" patternUnits="userSpaceOnUse" width="20">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#4cd7f6" strokeWidth="0.5"></path>
      </pattern>
      </defs>
      <rect fill="url(#telemetry-grid)" height="100%" width="100%"></rect>
      </svg>
      
      <svg className="w-full h-full relative z-10" preserveAspectRatio="none" viewBox="0 0 340 100">
      <defs>
      <linearGradient id="primaryWaveGrad" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stopColor="#4cd7f6" stopOpacity="0.35"></stop>
      <stop offset="100%" stopColor="#4cd7f6" stopOpacity="0.0"></stop>
      </linearGradient>
      <linearGradient id="rogueSpikeGrad" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stopColor="#ff817a" stopOpacity="0.5"></stop>
      <stop offset="100%" stopColor="#ff817a" stopOpacity="0.0"></stop>
      </linearGradient>
      </defs>
      
      <polygon fill="url(#rogueSpikeGrad)" points="120,100 135,32 145,100"></polygon>
      <polyline fill="none" points="120,100 135,32 145,100" stroke="#ff817a" strokeWidth="1.5"></polyline>
      <polygon fill="url(#rogueSpikeGrad)" points="260,100 270,18 280,100"></polygon>
      <polyline fill="none" points="260,100 270,18 280,100" stroke="#ff817a" strokeDasharray="2,2" strokeWidth="1.5"></polyline>
      
      <path d="M 0,70 Q 25,45 50,68 T 100,55 T 150,75 T 200,40 T 250,65 T 300,30 T 340,50 L 340,100 L 0,100 Z" fill="url(#primaryWaveGrad)"></path>
      <path d="M 0,70 Q 25,45 50,68 T 100,55 T 150,75 T 200,40 T 250,65 T 300,30 T 340,50" fill="none" stroke="#4cd7f6" strokeWidth="2"></path>
      </svg>
      <div className="absolute bottom-2 left-2 z-20 flex items-center gap-2">
      <span className="bg-surface-container-high/80 backdrop-blur-md px-1.5 py-0.5 rounded text-primary font-label-telemetry-sm text-label-telemetry-sm">TX: 4.8 MB/s</span>
      <span className="bg-surface-container-high/80 backdrop-blur-md px-1.5 py-0.5 rounded text-secondary font-label-telemetry-sm text-label-telemetry-sm">RX: 14.2 MB/s</span>
      </div>
      <div className="absolute top-2 right-2 z-20">
      <span className="bg-error-container/80 text-on-error-container font-label-telemetry-sm text-label-telemetry-sm px-1.5 py-0.5 rounded">2 DROPPED</span>
      </div>
      </div>
      </div>
      
      <div className="flex flex-col gap-space-xs">
      <div className="flex items-center justify-between px-1">
      <div className="flex min-w-0 items-center gap-space-xs">
      <span className="material-symbols-outlined text-tertiary-container text-[18px]">drive_file_rename_outline</span>
      <h3 className="font-headline-md text-headline-md text-on-surface">INTERCEPTOR ACTIVITY</h3>
      </div>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant">PAST 60 MIN</span>
      </div>
      
      <div className="rounded-xl bg-surface-container p-space-md flex flex-col gap-space-sm shadow-md">
      <div className="flex items-start justify-between gap-space-sm">
      <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-on-error-container text-[18px]">cell_tower</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-headline-md text-headline-md text-on-surface truncate">Rogue C2 Server Outbound</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-tertiary-container">194.26.29.112 // St. Petersburg, RU</span>
      </div>
      </div>
      <span className="bg-error-container px-2 py-0.5 rounded text-on-error-container font-label-telemetry-sm text-label-telemetry-sm font-semibold uppercase flex-shrink-0">BLOCKED</span>
      </div>
      <div className="relative w-full h-24 rounded-lg overflow-hidden bg-surface-container-lowest">
      <div className="w-full h-full bg-cover bg-center opacity-80" data-location="Saint Petersburg, Russia" style={{ backgroundImage: "url('/stitch/network-noc.png')" }}></div>
      <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
      <div className="absolute top-2 left-2 flex items-center gap-1 bg-surface-container-highest/90 backdrop-blur-md px-2 py-0.5 rounded">
      <span className="material-symbols-outlined text-tertiary-container text-[13px]">pin_drop</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface">COORDINATES VERIFIED</span>
      </div>
      <div className="absolute bottom-2 right-2">
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant">02:14:08 UTC</span>
      </div>
      </div>
      <div className="flex items-center justify-between pt-1">
      <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Attempted port 4444 reverse shell telemetry payload.</span>
      <button className="bg-surface-container-high px-2 py-1 rounded text-primary font-label-telemetry-sm text-label-telemetry-sm uppercase hover:bg-surface-bright transition-colors flex items-center gap-1">
      <span>ISOLATE</span>
      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
      </button>
      </div>
      </div>
      
      <div className="rounded-xl bg-surface-container p-space-md flex flex-col gap-space-xs shadow-md">
      <div className="flex items-start justify-between gap-space-sm">
      <div className="flex items-center gap-2 min-w-0">
      <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-primary text-[18px]">dns</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-headline-md text-headline-md text-on-surface truncate">DNS Spoofing Prevented</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant">Public_Starbucks_WiFi // Cache Poisoning</span>
      </div>
      </div>
      <span className="bg-secondary-container px-2 py-0.5 rounded text-on-secondary-container font-label-telemetry-sm text-label-telemetry-sm font-semibold uppercase flex-shrink-0">MUTED</span>
      </div>
      <div className="flex items-center justify-between text-on-surface-variant pt-1">
      <span className="font-body-sm text-body-sm">Forged response redirected to DoH cloud resolver.</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm">14m ago</span>
      </div>
      </div>
      
      <div className="rounded-xl bg-surface-container p-space-md flex flex-col gap-space-xs shadow-md">
      <div className="flex items-start justify-between gap-space-sm">
      <div className="flex items-center gap-2 min-w-0">
      <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-secondary text-[18px]">troubleshoot</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-headline-md text-headline-md text-on-surface truncate">Subnet SYN Port Sweep</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant">Local Host: 192.168.1.144</span>
      </div>
      </div>
      <span className="bg-surface-container-highest px-2 py-0.5 rounded text-primary font-label-telemetry-sm text-label-telemetry-sm font-semibold uppercase flex-shrink-0">HONEYPOT</span>
      </div>
      <div className="flex items-center justify-between text-on-surface-variant pt-1">
      <span className="font-body-sm text-body-sm">Probed ports 22, 80, 445, 8080. Silent reject engaged.</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm">28m ago</span>
      </div>
      </div>
      </div>
      
      <div className="flex flex-col gap-space-xs mt-space-xs">
      <div className="flex items-center justify-between px-1">
      <div className="flex min-w-0 items-center gap-space-xs">
      <span className="material-symbols-outlined text-secondary text-[18px]">security</span>
      <h3 className="font-headline-md text-headline-md text-on-surface">DEFENSIVE RULES</h3>
      </div>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-secondary">ALL SYSTEMS ARMED</span>
      </div>
      <div className="grid grid-cols-1 gap-space-xs">
      
      <div className="bg-surface-container rounded-xl p-space-md flex items-center justify-between gap-space-sm shadow-sm">
      <div className="flex items-center gap-space-sm min-w-0">
      <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-primary text-[20px]">policy</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-headline-md text-headline-md text-on-surface truncate">Zero-Trust Web Protection</span>
      <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Strict TLS-cert pinning &amp; domain reputation</span>
      </div>
      </div>
      <button aria-label="Toggle Zero-Trust Protection" className="w-12 h-6 rounded-full bg-secondary-container relative flex items-center px-0.5 transition-colors cursor-pointer flex-shrink-0"  data-action="toggle-shield">
      <span className="w-5 h-5 rounded-full bg-on-secondary-container shadow-md transform translate-x-6 transition-transform"></span>
      </button>
      </div>
      
      <div className="bg-surface-container rounded-xl p-space-md flex items-center justify-between gap-space-sm shadow-sm">
      <div className="flex items-center gap-space-sm min-w-0">
      <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-primary text-[20px]">link_off</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-headline-md text-headline-md text-on-surface truncate">Malware URL Blocker</span>
      <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Autonomous zero-day phishing filter</span>
      </div>
      </div>
      <button aria-label="Toggle Malware URL Blocker" className="w-12 h-6 rounded-full bg-secondary-container relative flex items-center px-0.5 transition-colors cursor-pointer flex-shrink-0"  data-action="toggle-shield">
      <span className="w-5 h-5 rounded-full bg-on-secondary-container shadow-md transform translate-x-6 transition-transform"></span>
      </button>
      </div>
      
      <div className="bg-surface-container rounded-xl p-space-md flex items-center justify-between gap-space-sm shadow-sm">
      <div className="flex items-center gap-space-sm min-w-0">
      <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-secondary text-[20px]">videocam_off</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-headline-md text-headline-md text-on-surface truncate">Cam &amp; Mic Anti-Snoop Sentinel</span>
      <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Hardware-level unauthorized socket alerts</span>
      </div>
      </div>
      <button aria-label="Toggle Anti-Snoop Sentinel" className="w-12 h-6 rounded-full bg-secondary-container relative flex items-center px-0.5 transition-colors cursor-pointer flex-shrink-0"  data-action="toggle-shield">
      <span className="w-5 h-5 rounded-full bg-on-secondary-container shadow-md transform translate-x-6 transition-transform"></span>
      </button>
      </div>
      
      <div className="bg-surface-container rounded-xl p-space-md flex items-center justify-between gap-space-sm shadow-sm">
      <div className="flex items-center gap-space-sm min-w-0">
      <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-primary text-[20px]">device_hub</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-headline-md text-headline-md text-on-surface truncate">ARP Spoof Detection</span>
      <span className="font-body-sm text-body-sm text-on-surface-variant truncate">Guard MAC-to-IP binding integrity</span>
      </div>
      </div>
      <button aria-label="Toggle ARP Spoof Detection" className="w-12 h-6 rounded-full bg-secondary-container relative flex items-center px-0.5 transition-colors cursor-pointer flex-shrink-0"  data-action="toggle-shield">
      <span className="w-5 h-5 rounded-full bg-on-secondary-container shadow-md transform translate-x-6 transition-transform"></span>
      </button>
      </div>
      </div>
      </div>
      
      <div className="pt-space-xs mb-space-sm">
      <button className="w-full bg-primary hover:bg-primary-container text-on-primary font-label-telemetry-lg text-label-telemetry-lg py-3 px-space-md rounded-lg flex items-center justify-center gap-2 tracking-wider shadow-lg transition-all active:scale-[0.99]">
      <span className="material-symbols-outlined text-[18px]">cached</span>
      <span>PURGE STATE &amp; CYCLE IP MASK</span>
      </button>
      </div>
      </div>
    </div>
  );
}

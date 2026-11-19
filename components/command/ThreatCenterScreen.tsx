"use client";

import { useStitchBehaviors } from "@/components/command/useStitchBehaviors";

/** Generated from the Stitch "threat-center-pro" screen. */
export default function ThreatCenterScreen() {
  useStitchBehaviors();

  return (
    <div data-command-screen className="flex w-full flex-col">
      <div className="flex flex-col w-full px-margin pb-space-xl">
      
      
      <div className="relative w-full rounded-xl bg-gradient-to-b from-[#1c0810] via-obsidian-surface to-obsidian-elevated border border-crimson-breach/40 p-space-md shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(255,42,85,0.15)] overflow-hidden mt-space-sm mb-space-md glass-specular-crimson">
      
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-crimson-breach to-transparent shadow-[0_0_10px_#FF2A55]"></div>
      <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-crimson-breach/20 blur-3xl pointer-events-none"></div>
      <div className="absolute -left-12 -bottom-12 w-44 h-44 rounded-full bg-tactical-amber/15 blur-2xl pointer-events-none"></div>
      
      <div className="absolute inset-0 tactical-grid opacity-30 pointer-events-none"></div>
      <div className="relative z-10 flex flex-col gap-space-sm">
      
      <div className="flex items-center justify-between border-b border-crimson-breach/20 pb-2">
      <div className="flex min-w-0 items-center gap-space-xs">
      <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson-breach opacity-90"></span>
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-crimson-breach shadow-[0_0_8px_#FF2A55]"></span>
      </span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-crimson-breach tracking-wider uppercase font-bold">GRID 04-X // SOC BREACH LEVEL 1</span>
      </div>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-text-telemetry uppercase tracking-widest font-mono">SECTOR_LATENCY: 1.2ms</span>
      </div>
      
      <div className="flex flex-col pt-0.5">
      <div className="flex items-center gap-2">
      <span className="material-symbols-outlined text-crimson-breach text-[26px] animate-pulse">crisis_alert</span>
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-headline-lg text-text-photonic uppercase tracking-tight font-bold drop-shadow-[0_2px_12px_rgba(255,42,85,0.4)]">
                      Elevated Risk Detected
                    </h1>
      </div>
      <div className="flex items-center gap-space-xs mt-1.5">
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-crimson-breach/20 border border-crimson-breach/40 text-crimson-breach font-label-telemetry-sm text-label-telemetry-sm uppercase font-semibold">
      <span className="material-symbols-outlined text-[14px]">dangerous</span>
                      2 ACTIVE THREATS
                    </span>
      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-tactical-amber/15 border border-tactical-amber/30 text-tactical-amber font-label-telemetry-sm text-label-telemetry-sm uppercase font-semibold">
      <span className="material-symbols-outlined text-[14px]">crisis_alert</span>
                      1 Suspicious Probe
                    </span>
      </div>
      </div>
      
      <div className="flex items-center gap-space-sm pt-space-xs">
      <button className="relative group flex-1 h-12 px-space-md rounded-lg bg-gradient-to-r from-[#FF1A48] via-[#E60039] to-[#BF002F] hover:from-[#ff335c] hover:to-[#db0036] transition-all duration-200 flex items-center justify-center gap-2 text-white font-label-telemetry-md text-label-telemetry-md font-bold uppercase tracking-wider shadow-[0_4px_20px_rgba(255,26,72,0.45),inset_0_1px_1px_rgba(255,255,255,0.35)] border border-crimson-breach/50 active:scale-[0.98] overflow-hidden"  data-action="open-purge">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      <span className="material-symbols-outlined text-[20px] text-white">gavel</span>
      <span>PURGE &amp; ISOLATE ALL</span>
      </button>
      <button aria-label="Deep Sandbox Trace" className="h-12 w-12 rounded-lg bg-obsidian-surface border border-electric-cyan/30 flex items-center justify-center text-electric-cyan hover:bg-electric-cyan/15 hover:border-electric-cyan transition-all shadow-[0_0_12px_rgba(0,240,255,0.15)]">
      <span className="material-symbols-outlined text-[22px]">science</span>
      </button>
      </div>
      </div>
      </div>
      
      <div className="grid grid-cols-2 gap-gutter-compact mb-space-md">
      
      <div className="rounded-xl bg-obsidian-surface/90 border border-white/10 p-3 flex items-center gap-2.5 shadow-lg glass-specular relative overflow-hidden">
      <div className="w-9 h-9 rounded-lg bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center flex-shrink-0 text-electric-cyan shadow-[0_0_8px_rgba(0,240,255,0.2)]">
      <span className="material-symbols-outlined text-[20px]">shield</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-text-telemetry uppercase tracking-wider truncate">SIGNATURE DB</span>
      <span className="font-label-telemetry-md text-label-telemetry-md text-text-photonic font-bold truncate">v2025.04.18</span>
      <div className="flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-secure"></span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-emerald-secure font-medium truncate">SYNCHRONIZED</span>
      </div>
      </div>
      </div>
      
      <div className="rounded-xl bg-obsidian-surface/90 border border-white/10 p-3 flex items-center gap-2.5 shadow-lg glass-specular relative overflow-hidden">
      <div className="w-9 h-9 rounded-lg bg-emerald-secure/10 border border-emerald-secure/30 flex items-center justify-center flex-shrink-0 text-emerald-secure shadow-[0_0_8px_rgba(0,230,153,0.2)]">
      <span className="material-symbols-outlined text-[20px]">hub</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-text-telemetry uppercase tracking-wider truncate">NEURAL ENGINE</span>
      <span className="font-label-telemetry-md text-label-telemetry-md text-text-photonic font-bold truncate">ZERO-DAY AI</span>
      <div className="flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-secure"></span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-emerald-secure font-medium truncate">100% SENSITIVITY</span>
      </div>
      </div>
      </div>
      </div>
      
      <div className="flex items-center gap-space-xs overflow-x-auto pb-space-sm mb-space-sm no-scrollbar">
      <button className="filter-pill flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-electric-cyan text-obsidian-base font-label-telemetry-sm text-label-telemetry-sm font-bold whitespace-nowrap border border-electric-cyan shadow-[0_0_12px_rgba(0,240,255,0.35)] transition-all"  data-action="filter" data-arg="critical">
      <span className="w-1.5 h-1.5 rounded-full bg-crimson-breach"></span>
                CRITICAL (2)
              </button>
      <button className="filter-pill flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-obsidian-elevated/70 text-text-telemetry font-label-telemetry-sm text-label-telemetry-sm whitespace-nowrap border border-white/10 transition-all hover:text-text-photonic hover:border-tactical-amber/40"  data-action="filter" data-arg="suspicious">
      <span className="w-1.5 h-1.5 rounded-full bg-tactical-amber"></span>
                SUSPICIOUS (1)
              </button>
      <button className="filter-pill flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-obsidian-elevated/70 text-text-telemetry font-label-telemetry-sm text-label-telemetry-sm whitespace-nowrap border border-white/10 transition-all hover:text-text-photonic hover:border-emerald-secure/40"  data-action="filter" data-arg="resolved">
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-secure"></span>
                RESOLVED (47)
              </button>
      <button className="filter-pill flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-obsidian-elevated/70 text-text-telemetry font-label-telemetry-sm text-label-telemetry-sm whitespace-nowrap border border-white/10 transition-all hover:text-text-photonic"  data-action="filter" data-arg="ignored">
                IGNORED (0)
              </button>
      </div>
      
      <div className="flex flex-col gap-space-md">
      
      <div className="relative rounded-xl bg-gradient-to-b from-obsidian-surface to-obsidian-elevated border border-crimson-breach/35 p-space-md shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex flex-col gap-space-sm glass-specular overflow-hidden group">
      
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-crimson-breach via-[#FF5C7E] to-crimson-breach/30 shadow-[0_0_8px_#FF2A55]"></div>
      
      <div className="flex items-start justify-between gap-space-sm">
      <div className="flex items-start gap-2.5 min-w-0">
      <div className="w-10 h-10 rounded-lg bg-crimson-breach/15 border border-crimson-breach/40 flex items-center justify-center flex-shrink-0 text-crimson-breach shadow-[0_0_12px_rgba(255,42,85,0.25)]">
      <span className="material-symbols-outlined text-[22px]">pest_control</span>
      </div>
      <div className="flex flex-col min-w-0">
      <div className="flex items-center gap-2">
      <span className="font-headline-md text-headline-md text-text-photonic tracking-tight truncate font-bold">Trojan.Dropper.GenericX</span>
      </div>
      <div className="flex items-center gap-1.5 mt-0.5">
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-crimson-breach uppercase font-bold tracking-wider">CRITICAL ALERT // LEVEL 9.8</span>
      <span className="text-text-muted">•</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-text-telemetry font-mono">PID: 8042</span>
      </div>
      </div>
      </div>
      
      <div className="flex flex-col items-end flex-shrink-0">
      <div className="px-2.5 py-1 rounded-lg bg-crimson-breach/20 border border-crimson-breach/50 text-crimson-breach font-label-telemetry-md text-label-telemetry-md font-bold shadow-[0_0_10px_rgba(255,42,85,0.3)]">
                      9.8 / 10
                    </div>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-text-telemetry mt-1 tracking-widest uppercase">HEURISTIC</span>
      </div>
      </div>
      
      <div className="rounded-lg bg-obsidian-base/80 border border-white/10 px-3 py-2 flex items-center gap-2 min-w-0">
      <span className="material-symbols-outlined text-crimson-breach text-[16px] flex-shrink-0">folder_open</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-text-photonic truncate font-mono">
                    /storage/emulated/0/Downloads/update_patch.apk
                  </span>
      </div>
      
      <p className="font-body-md text-body-md text-text-telemetry">
                  Attempting background keylogging &amp; SMS forwarder injection. Intercepted attempting persistence daemon registration.
                </p>
      
      <div className="rounded-lg bg-obsidian-base/90 border border-white/5 p-2.5 flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-text-telemetry font-label-telemetry-sm text-label-telemetry-sm px-0.5">
      <span className="tracking-wider uppercase">EXFILTRATION RISK PROBABILITY</span>
      <span className="text-crimson-breach font-bold tracking-wider">98.4% [CRITICAL]</span>
      </div>
      <div className="w-full bg-obsidian-surface h-2 rounded-full overflow-hidden p-[1px] border border-white/5">
      <div className="bg-gradient-to-r from-tactical-amber via-crimson-breach to-[#ff1a48] h-full rounded-full shadow-[0_0_10px_rgba(255,42,85,0.7)]" style={{ width: "98.4%" }}></div>
      </div>
      </div>
      
      <div className="grid grid-cols-2 gap-gutter-compact pt-space-xs">
      <button className="h-10 rounded-lg bg-gradient-to-r from-crimson-breach to-[#c70030] hover:from-[#ff426a] hover:to-[#db0036] text-white font-label-telemetry-sm text-label-telemetry-sm font-bold flex items-center justify-center gap-1.5 shadow-[0_4px_14px_rgba(255,42,85,0.35)] border border-crimson-breach/40 transition-all active:scale-[0.98]">
      <span className="material-symbols-outlined text-[16px]">lock</span>
      <span>QUARANTINE NOW</span>
      </button>
      <button className="h-10 rounded-lg bg-obsidian-surface hover:bg-surface-container-high text-electric-cyan border border-electric-cyan/30 hover:border-electric-cyan font-label-telemetry-sm text-label-telemetry-sm font-bold flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(0,240,255,0.1)] transition-all active:scale-[0.98]"  data-action="toggle-details" data-arg="details-trojan">
      <span className="material-symbols-outlined text-[16px]">terminal</span>
      <span>DISSECT PAYLOAD</span>
      </button>
      </div>
      
      <div className="hidden rounded-lg bg-obsidian-base border border-electric-cyan/30 p-space-sm flex flex-col gap-1.5 mt-space-xs shadow-inner" id="details-trojan">
      <div className="flex items-center justify-between">
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-electric-cyan uppercase tracking-wider font-semibold">HEX PAYLOAD DUMP // VIRTUAL ENCLAVE</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-emerald-secure">DECRYPTED BUFFER</span>
      </div>
      <pre className="font-label-telemetry-sm text-label-telemetry-sm text-text-telemetry overflow-x-auto whitespace-pre leading-relaxed bg-[#020408] p-2.5 rounded border border-white/5 font-mono">0000: 4D 5A 90 00 03 00 00 00  04 00 00 00 FF FF 00 00
      0010: B8 00 00 00 00 00 00 00  40 00 00 00 00 00 00 00
      0020: 53 4D 53 5F 52 45 43 45  49 56 45 44 5F 48 4F 4F
      [HOOK: android.provider.Telephony.SMS_RECEIVED -&gt; 185.220.101.5]
                  </pre>
      </div>
      </div>
      
      <div className="relative rounded-xl bg-gradient-to-b from-obsidian-surface to-obsidian-elevated border border-tactical-amber/35 p-space-md shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex flex-col gap-space-sm glass-specular overflow-hidden group">
      
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-tactical-amber via-[#ffd466] to-tactical-amber/30 shadow-[0_0_8px_#FFB800]"></div>
      
      <div className="flex items-start justify-between gap-space-sm">
      <div className="flex items-start gap-2.5 min-w-0">
      <div className="w-10 h-10 rounded-lg bg-tactical-amber/15 border border-tactical-amber/40 flex items-center justify-center flex-shrink-0 text-tactical-amber shadow-[0_0_12px_rgba(255,184,0,0.25)]">
      <span className="material-symbols-outlined text-[22px]">smart_toy</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-headline-md text-headline-md text-text-photonic tracking-tight truncate font-bold">Adware.Agent.FakeInstaller</span>
      <div className="flex items-center gap-1.5 mt-0.5">
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-tactical-amber uppercase font-bold tracking-wider">HIGH RISK // SEVERITY 7.2</span>
      <span className="text-text-muted">•</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-text-telemetry font-mono">THREAD: CRX</span>
      </div>
      </div>
      </div>
      
      <div className="flex flex-col items-end flex-shrink-0">
      <div className="px-2.5 py-1 rounded-lg bg-tactical-amber/20 border border-tactical-amber/50 text-tactical-amber font-label-telemetry-md text-label-telemetry-md font-bold shadow-[0_0_10px_rgba(255,184,0,0.3)]">
                      7.2 / 10
                    </div>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-text-telemetry mt-1 tracking-widest uppercase">BACKGROUND</span>
      </div>
      </div>
      
      <div className="rounded-lg bg-obsidian-base/80 border border-white/10 px-3 py-2 flex items-center gap-2 min-w-0">
      <span className="material-symbols-outlined text-tactical-amber text-[16px] flex-shrink-0">android</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-text-photonic truncate font-mono">
                    com.media.player.streamer
                  </span>
      </div>
      
      <p className="font-body-md text-body-md text-text-telemetry">
                  Stealth permissions escalation &amp; crypto miner daemon. Executing heavy thread loads while device is docked on AC power.
                </p>
      
      <div className="rounded-lg bg-obsidian-base/90 border border-white/5 p-2.5 flex items-center justify-between text-text-telemetry font-label-telemetry-sm text-label-telemetry-sm">
      <span className="flex items-center gap-1.5 text-text-photonic">
      <span className="material-symbols-outlined text-[16px] text-tactical-amber">memory</span>
                    CPU OVERHEAD: <span className="text-tactical-amber font-mono font-bold">+42%</span>
      </span>
      <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-tactical-amber/15 border border-tactical-amber/30 text-tactical-amber font-bold">
      <span>DRAIN ACCELERATED</span>
      </div>
      </div>
      
      <div className="flex items-center gap-gutter-compact pt-space-xs">
      <button className="flex-1 h-10 rounded-lg bg-obsidian-surface hover:bg-tactical-amber/20 text-tactical-amber border border-tactical-amber/40 hover:border-tactical-amber font-label-telemetry-sm text-label-telemetry-sm font-bold flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(255,184,0,0.15)] transition-all active:scale-[0.98]">
      <span className="material-symbols-outlined text-[16px]">delete_forever</span>
      <span>PURGE &amp; UNINSTALL</span>
      </button>
      <button className="h-10 px-3.5 rounded-lg bg-obsidian-surface border border-white/10 text-text-telemetry hover:text-text-photonic hover:border-white/25 flex items-center justify-center transition-all">
      <span className="material-symbols-outlined text-[18px]">more_vert</span>
      </button>
      </div>
      </div>
      
      <div className="relative rounded-xl bg-gradient-to-b from-obsidian-surface to-obsidian-elevated border border-electric-cyan/35 p-space-md shadow-[0_8px_30px_rgba(0,0,0,0.6)] flex flex-col gap-space-sm glass-specular overflow-hidden group">
      
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-electric-cyan via-white to-electric-cyan/30 shadow-[0_0_8px_#00F0FF]"></div>
      
      <div className="flex items-start justify-between gap-space-sm">
      <div className="flex items-start gap-2.5 min-w-0">
      <div className="w-10 h-10 rounded-lg bg-electric-cyan/15 border border-electric-cyan/40 flex items-center justify-center flex-shrink-0 text-electric-cyan shadow-[0_0_12px_rgba(0,240,255,0.25)]">
      <span className="material-symbols-outlined text-[22px]">enhanced_encryption</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-headline-md text-headline-md text-text-photonic tracking-tight truncate font-bold">Phishing.Cert.MitmProxy</span>
      <div className="flex items-center gap-1.5 mt-0.5">
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-electric-cyan uppercase font-bold tracking-wider">MEDIUM RISK // CERT PROBE</span>
      <span className="text-text-muted">•</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-text-telemetry font-mono">PORT 8443</span>
      </div>
      </div>
      </div>
      
      <div className="flex flex-col items-end flex-shrink-0">
      <div className="px-2.5 py-1 rounded-lg bg-electric-cyan/20 border border-electric-cyan/50 text-electric-cyan font-label-telemetry-md text-label-telemetry-md font-bold shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                      5.4 / 10
                    </div>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-text-telemetry mt-1 tracking-widest uppercase">NETWORK</span>
      </div>
      </div>
      
      <div className="rounded-lg bg-obsidian-base/80 border border-white/10 px-3 py-2 flex items-center gap-2 min-w-0">
      <span className="material-symbols-outlined text-electric-cyan text-[16px] flex-shrink-0">badge</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-text-photonic truncate font-mono">
                    CN=Traffic-Intercept-Proxy CA, OU=SecurityLab
                  </span>
      </div>
      
      <p className="font-body-md text-body-md text-text-telemetry">
                  Untrusted root SSL certificate injected in user keychain. Enables silent decryption of TLS/HTTPS browser sessions.
                </p>
      
      <div className="flex items-center gap-gutter-compact pt-space-xs">
      <button className="flex-1 h-10 rounded-lg bg-gradient-to-r from-electric-cyan to-[#00b8cc] hover:from-[#33f3ff] hover:to-[#00cadf] text-obsidian-base font-label-telemetry-sm text-label-telemetry-sm font-bold flex items-center justify-center gap-1.5 shadow-[0_4px_16px_rgba(0,240,255,0.35)] transition-all active:scale-[0.98]">
      <span className="material-symbols-outlined text-[16px] text-obsidian-base">key_off</span>
      <span>REVOKE CERTIFICATE</span>
      </button>
      <button className="h-10 px-4 rounded-lg bg-obsidian-surface border border-white/10 hover:border-electric-cyan/50 text-text-photonic hover:text-electric-cyan transition-colors flex items-center justify-center font-label-telemetry-sm text-label-telemetry-sm font-semibold">
                    INSPECT
                  </button>
      </div>
      </div>
      </div>
      
      <div className="mt-space-lg rounded-xl bg-gradient-to-b from-obsidian-surface via-obsidian-elevated to-obsidian-base border border-emerald-secure/30 p-space-md shadow-[0_12px_36px_rgba(0,0,0,0.7)] flex flex-col gap-space-sm relative overflow-hidden glass-specular">
      
      <div className="absolute -right-20 -top-20 w-48 h-48 rounded-full bg-emerald-secure/15 blur-3xl pointer-events-none"></div>
      <div className="flex items-center justify-between relative z-10">
      <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-lg bg-emerald-secure/15 border border-emerald-secure/40 flex items-center justify-center text-emerald-secure shadow-[0_0_10px_rgba(0,230,153,0.3)]">
      <span className="material-symbols-outlined text-[20px]">shield_with_heart</span>
      </div>
      <div>
      <span className="font-headline-md text-headline-md text-text-photonic font-bold tracking-tight">Secure Enclave Vault</span>
      </div>
      </div>
      
      <span className="font-label-telemetry-sm text-label-telemetry-sm px-2 py-0.5 rounded bg-emerald-secure/10 border border-emerald-secure/40 text-emerald-secure font-mono uppercase font-bold tracking-wider">
                  AES-256 GCM ACTIVE
                </span>
      </div>
      <p className="font-body-sm text-body-sm text-text-telemetry relative z-10">
                Threats held in quarantine are stripped of runtime execute flags (chmod 0000) and isolated inside the kernel cgroup sandbox.
              </p>
      
      <div className="relative w-full h-36 rounded-lg bg-obsidian-base border border-wireframe-border overflow-hidden flex items-center justify-center shadow-inner tactical-grid group">
      <div className="w-full h-full bg-cover bg-center opacity-45 mix-blend-screen scale-105 group-hover:scale-100 transition-transform duration-700" data-alt="Tactical glowing dark cyber defense security vault interface with cryptographic keys and cybernetic lock rings in glowing cyan and dark slate obsidian background" style={{ backgroundImage: "url('/stitch/soc-room.png')" }}></div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian-base via-transparent to-transparent flex flex-col justify-between p-3 pointer-events-none">
      <div className="flex items-center justify-between">
      <span className="px-2 py-0.5 rounded bg-obsidian-surface/80 border border-electric-cyan/40 text-electric-cyan font-label-telemetry-sm text-label-telemetry-sm font-mono">
                      ENCLAVE_NODE://00-QUARANTINE
                    </span>
      <span className="flex items-center gap-1.5 text-emerald-secure font-label-telemetry-sm text-label-telemetry-sm font-mono font-semibold">
      <span className="w-2 h-2 rounded-full bg-emerald-secure animate-pulse"></span>
                      ZERO LEAKS DETECTED
                    </span>
      </div>
      <div className="flex items-center justify-between border-t border-white/10 pt-2 backdrop-blur-[2px]">
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-text-photonic font-bold font-mono tracking-wider">
                      ISOLATED PAYLOADS: <span className="text-electric-cyan">47 ARTIFACTS</span>
      </span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-text-telemetry font-mono">
                      INTEGRITY: 100%
                    </span>
      </div>
      </div>
      </div>
      </div>
      
      <div className="hidden fixed inset-0 z-50 flex items-center justify-center p-gutter bg-obsidian-base/85 backdrop-blur-xl" id="purge-confirm-modal">
      <div className="w-full max-w-sm rounded-xl bg-obsidian-surface border border-crimson-breach/50 p-space-md shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,42,85,0.2)] flex flex-col gap-space-md relative overflow-hidden glass-specular-crimson">
      
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-crimson-breach to-transparent shadow-[0_0_10px_#FF2A55]"></div>
      <div className="flex items-center gap-space-sm">
      <div className="w-11 h-11 rounded-xl bg-crimson-breach/20 border border-crimson-breach/40 flex items-center justify-center text-crimson-breach flex-shrink-0 shadow-[0_0_15px_rgba(255,42,85,0.3)]">
      <span className="material-symbols-outlined text-[26px]">gavel</span>
      </div>
      <div className="flex flex-col min-w-0">
      <h2 className="font-headline-md text-headline-md text-text-photonic font-bold truncate">Authorize Mass Purge?</h2>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-crimson-breach font-bold uppercase tracking-wider">2 Critical Threats Marked for Neutralization</span>
      </div>
      </div>
      <p className="font-body-md text-body-md text-text-telemetry leading-relaxed">
                  This action will permanently neutralize all identified malicious vectors, revoke injected certificates, and revoke foreground permissions.
                </p>
      <div className="flex items-center gap-space-xs pt-space-xs">
      <button className="flex-1 h-11 rounded-lg bg-obsidian-elevated border border-white/15 text-text-photonic font-label-telemetry-sm text-label-telemetry-sm font-semibold hover:bg-surface-container-high transition-colors"  data-action="close-purge">
                    CANCEL
                  </button>
      <button className="flex-1 h-11 rounded-lg bg-gradient-to-r from-crimson-breach to-[#c70030] hover:from-[#ff426a] hover:to-[#db0036] text-white font-label-telemetry-sm text-label-telemetry-sm font-bold shadow-[0_4px_16px_rgba(255,42,85,0.4)] border border-crimson-breach/50 transition-all active:scale-[0.98]"  data-action="close-purge">
                    CONFIRM PURGE
                  </button>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
}

"use client";

import { useStitchBehaviors } from "@/components/command/useStitchBehaviors";

/** Generated from the Stitch "active-threats" screen. */
export default function ActiveThreatsScreen() {
  useStitchBehaviors();

  return (
    <div data-command-screen className="flex w-full flex-col">
      <div className="flex flex-col w-full px-margin pb-space-xl">
      
      
      
      <div className="relative w-full rounded-xl bg-surface-container-low p-space-md shadow-xl overflow-hidden mt-space-sm mb-space-md">
      
      <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-error-container/20 blur-3xl pointer-events-none"></div>
      <div className="absolute -left-10 -bottom-10 w-36 h-36 rounded-full bg-tertiary-container/15 blur-2xl pointer-events-none"></div>
      <div className="relative z-10 flex flex-col gap-space-sm">
      
      <div className="flex items-center justify-between">
      <div className="flex min-w-0 items-center gap-space-xs">
      <span className="relative flex h-2.5 w-2.5">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-80"></span>
      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-error"></span>
      </span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-error tracking-wider uppercase">DEFENSE STATE: BREACH ACTIVE</span>
      </div>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant/80 uppercase">GRID 04-X // SOC MONITOR</span>
      </div>
      
      <div className="flex flex-col">
      <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface uppercase tracking-tight">
                Elevated Risk Detected
              </h1>
      <div className="flex items-center gap-space-xs mt-0.5">
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-error-container/40 text-error font-label-telemetry-sm text-label-telemetry-sm uppercase">
      <span className="material-symbols-outlined text-[14px]">warning</span>
                  2 Active Threats
                </span>
      <span className="text-on-surface-variant font-label-telemetry-sm text-label-telemetry-sm">• 1 Suspicious Probe</span>
      </div>
      </div>
      
      <div className="flex items-center gap-space-sm pt-space-xs">
      <button className="flex-1 h-11 px-space-md rounded-lg bg-error-container hover:bg-error transition-all duration-200 flex items-center justify-center gap-2 text-on-error shadow-lg shadow-error-container/30 active:scale-[0.98]"  data-action="open-purge">
      <span className="material-symbols-outlined text-[18px]">gavel</span>
      <span className="font-label-telemetry-md text-label-telemetry-md font-bold uppercase tracking-wider">Purge &amp; Isolate All</span>
      </button>
      <button aria-label="Deep Sandbox Trace" className="h-11 w-11 rounded-lg bg-surface-container-high flex items-center justify-center text-primary hover:bg-surface-bright transition-colors">
      <span className="material-symbols-outlined text-[20px]">science</span>
      </button>
      </div>
      </div>
      </div>
      
      <div className="grid grid-cols-2 gap-gutter-compact mb-space-md">
      
      <div className="rounded-lg bg-surface-container p-space-sm flex items-center gap-2.5 shadow-sm">
      <div className="w-8 h-8 rounded bg-primary-container/20 flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-primary text-[18px]">verified_user</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant uppercase truncate">SIGNATURE DB</span>
      <span className="font-label-telemetry-md text-label-telemetry-md text-primary font-semibold truncate">v2025.04.18</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-secondary truncate">UP-TO-DATE</span>
      </div>
      </div>
      
      <div className="rounded-lg bg-surface-container p-space-sm flex items-center gap-2.5 shadow-sm">
      <div className="w-8 h-8 rounded bg-secondary-container/20 flex items-center justify-center flex-shrink-0">
      <span className="material-symbols-outlined text-secondary text-[18px]">hub</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant uppercase truncate">HEURISTIC ENGINE</span>
      <span className="font-label-telemetry-md text-label-telemetry-md text-on-surface font-semibold truncate">ZERO-DAY AI</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-secondary truncate">100% SENSITIVITY</span>
      </div>
      </div>
      </div>
      
      <div className="flex items-center gap-space-xs overflow-x-auto pb-space-sm mb-space-sm no-scrollbar">
      <button className="filter-pill flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-container text-on-primary-container font-label-telemetry-sm text-label-telemetry-sm font-semibold whitespace-nowrap transition-colors"  data-action="filter" data-arg="critical">
      <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
            Critical (2)
          </button>
      <button className="filter-pill flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-telemetry-sm text-label-telemetry-sm whitespace-nowrap transition-colors hover:text-on-surface"  data-action="filter" data-arg="suspicious">
      <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container"></span>
            Suspicious (1)
          </button>
      <button className="filter-pill flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-telemetry-sm text-label-telemetry-sm whitespace-nowrap transition-colors hover:text-on-surface"  data-action="filter" data-arg="resolved">
      <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            Resolved (47)
          </button>
      <button className="filter-pill flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-telemetry-sm text-label-telemetry-sm whitespace-nowrap transition-colors hover:text-on-surface"  data-action="filter" data-arg="ignored">
            Ignored (0)
          </button>
      </div>
      
      <div className="flex flex-col gap-space-md">
      
      <div className="rounded-xl bg-surface-container p-space-md shadow-md flex flex-col gap-space-sm transition-all relative overflow-hidden">
      
      <div className="h-1 w-full bg-error-container rounded-full"></div>
      
      <div className="flex items-start justify-between gap-space-sm">
      <div className="flex items-start gap-2.5 min-w-0">
      <div className="w-9 h-9 rounded-lg bg-error-container/30 flex items-center justify-center flex-shrink-0 text-error">
      <span className="material-symbols-outlined text-[20px]">pest_control</span>
      </div>
      <div className="flex flex-col min-w-0">
      <div className="flex items-center gap-2">
      <span className="font-headline-md text-headline-md text-error tracking-tight truncate">Trojan.Dropper.GenericX</span>
      </div>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-error uppercase font-medium">CRITICAL ALERT // LEVEL 9.8</span>
      </div>
      </div>
      
      <div className="flex flex-col items-end flex-shrink-0">
      <div className="px-2 py-0.5 rounded bg-error-container text-on-error font-label-telemetry-md text-label-telemetry-md font-bold">
                  9.8 / 10
                </div>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant mt-0.5">HEURISTIC</span>
      </div>
      </div>
      
      <div className="rounded bg-surface-container-lowest p-2 flex items-center gap-2 min-w-0">
      <span className="material-symbols-outlined text-on-surface-variant text-[16px] flex-shrink-0">folder_open</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant truncate">
                /storage/emulated/0/Downloads/update_patch.apk
              </span>
      </div>
      
      <p className="font-body-md text-body-md text-on-surface">
              Attempting background keylogging &amp; SMS forwarder injection. Intercepted attempting persistence daemon registration.
            </p>
      
      <div className="rounded-lg bg-surface-container-low p-space-xs flex flex-col gap-1">
      <div className="flex items-center justify-between text-on-surface-variant font-label-telemetry-sm text-label-telemetry-sm px-1">
      <span>EXFILTRATION RISK</span>
      <span className="text-error">98.4% PROBABILITY</span>
      </div>
      <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
      <div className="bg-error-container h-full rounded-full" style={{ width: "98%" }}></div>
      </div>
      </div>
      
      <div className="grid grid-cols-2 gap-gutter-compact pt-space-xs">
      <button className="h-10 rounded-lg bg-error-container hover:bg-error text-on-error font-label-telemetry-sm text-label-telemetry-sm font-semibold flex items-center justify-center gap-1.5 shadow transition-colors">
      <span className="material-symbols-outlined text-[16px]">lock</span>
                QUARANTINE NOW
              </button>
      <button className="h-10 rounded-lg bg-surface-container-high hover:bg-surface-bright text-primary font-label-telemetry-sm text-label-telemetry-sm font-semibold flex items-center justify-center gap-1.5 transition-colors"  data-action="toggle-details" data-arg="details-trojan">
      <span className="material-symbols-outlined text-[16px]">terminal</span>
                DISSECT PAYLOAD
              </button>
      </div>
      
      <div className="hidden rounded bg-surface-container-lowest p-space-sm flex flex-col gap-1 mt-space-xs" id="details-trojan">
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-primary uppercase">HEX PAYLOAD DUMP // VIRTUAL ENCLAVE</span>
      <pre className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant overflow-x-auto whitespace-pre leading-relaxed">0000: 4D 5A 90 00 03 00 00 00  04 00 00 00 FF FF 00 00
      0010: B8 00 00 00 00 00 00 00  40 00 00 00 00 00 00 00
      0020: 53 4D 53 5F 52 45 43 45  49 56 45 44 5F 48 4F 4F
      [HOOK: android.provider.Telephony.SMS_RECEIVED -&gt; 185.220.101.5]
              </pre>
      </div>
      </div>
      
      <div className="rounded-xl bg-surface-container p-space-md shadow-md flex flex-col gap-space-sm transition-all relative overflow-hidden">
      
      <div className="h-1 w-full bg-tertiary-container rounded-full"></div>
      
      <div className="flex items-start justify-between gap-space-sm">
      <div className="flex items-start gap-2.5 min-w-0">
      <div className="w-9 h-9 rounded-lg bg-tertiary-container/20 flex items-center justify-center flex-shrink-0 text-tertiary">
      <span className="material-symbols-outlined text-[20px]">smart_toy</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-headline-md text-headline-md text-on-surface tracking-tight truncate">Adware.Agent.FakeInstaller</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-tertiary uppercase font-medium">HIGH RISK // SEVERITY 7.2</span>
      </div>
      </div>
      <div className="flex flex-col items-end flex-shrink-0">
      <div className="px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary font-label-telemetry-md text-label-telemetry-md font-bold">
                  7.2 / 10
                </div>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant mt-0.5">BACKGROUND</span>
      </div>
      </div>
      
      <div className="rounded bg-surface-container-lowest p-2 flex items-center gap-2 min-w-0">
      <span className="material-symbols-outlined text-on-surface-variant text-[16px] flex-shrink-0">android</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant truncate">
                com.media.player.streamer
              </span>
      </div>
      
      <p className="font-body-md text-body-md text-on-surface">
              Stealth permissions escalation &amp; crypto miner daemon. Executing heavy thread loads while device is docked on AC power.
            </p>
      
      <div className="rounded-lg bg-surface-container-low p-space-xs flex items-center justify-between text-on-surface-variant font-label-telemetry-sm text-label-telemetry-sm">
      <span className="flex items-center gap-1">
      <span className="material-symbols-outlined text-[16px] text-tertiary">memory</span>
                CPU LOAD THRESHOLD: +42%
              </span>
      <span className="text-tertiary font-semibold">BATTERY DRAIN CRITICAL</span>
      </div>
      
      <div className="flex items-center gap-gutter-compact pt-space-xs">
      <button className="flex-1 h-10 rounded-lg bg-surface-container-high hover:bg-tertiary-container/30 text-tertiary font-label-telemetry-sm text-label-telemetry-sm font-semibold flex items-center justify-center gap-1.5 transition-colors">
      <span className="material-symbols-outlined text-[16px]">delete_forever</span>
                PURGE &amp; UNINSTALL
              </button>
      <button className="h-10 px-3 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-on-surface flex items-center justify-center">
      <span className="material-symbols-outlined text-[18px]">more_vert</span>
      </button>
      </div>
      </div>
      
      <div className="rounded-xl bg-surface-container p-space-md shadow-md flex flex-col gap-space-sm transition-all relative overflow-hidden">
      
      <div className="h-1 w-full bg-primary-container rounded-full"></div>
      
      <div className="flex items-start justify-between gap-space-sm">
      <div className="flex items-start gap-2.5 min-w-0">
      <div className="w-9 h-9 rounded-lg bg-primary-container/20 flex items-center justify-center flex-shrink-0 text-primary">
      <span className="material-symbols-outlined text-[20px]">enhanced_encryption</span>
      </div>
      <div className="flex flex-col min-w-0">
      <span className="font-headline-md text-headline-md text-on-surface tracking-tight truncate">Phishing.Cert.MitmProxy</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-primary uppercase font-medium">MEDIUM RISK // CERT PROBE</span>
      </div>
      </div>
      <div className="flex flex-col items-end flex-shrink-0">
      <div className="px-2 py-0.5 rounded bg-surface-container-high text-primary font-label-telemetry-md text-label-telemetry-md font-bold">
                  5.4 / 10
                </div>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant mt-0.5">NETWORK</span>
      </div>
      </div>
      
      <div className="rounded bg-surface-container-lowest p-2 flex items-center gap-2 min-w-0">
      <span className="material-symbols-outlined text-on-surface-variant text-[16px] flex-shrink-0">badge</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant truncate">
                CN=Traffic-Intercept-Proxy CA, OU=SecurityLab
              </span>
      </div>
      
      <p className="font-body-md text-body-md text-on-surface">
              Untrusted root SSL certificate injected in user keychain. Enables silent decryption of TLS/HTTPS browser sessions.
            </p>
      
      <div className="flex items-center gap-gutter-compact pt-space-xs">
      <button className="flex-1 h-10 rounded-lg bg-primary text-on-primary font-label-telemetry-sm text-label-telemetry-sm font-bold flex items-center justify-center gap-1.5 shadow-md shadow-primary/20 hover:bg-primary-fixed-dim transition-colors">
      <span className="material-symbols-outlined text-[16px]">key_off</span>
                REVOKE CERTIFICATE
              </button>
      <button className="h-10 px-3 rounded-lg bg-surface-container-high text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center font-label-telemetry-sm text-label-telemetry-sm">
                INSPECT
              </button>
      </div>
      </div>
      </div>
      
      <div className="mt-space-lg rounded-xl bg-surface-container-low p-space-md shadow-lg flex flex-col gap-space-sm">
      <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
      <span className="material-symbols-outlined text-secondary text-[20px]">shield_with_heart</span>
      <span className="font-headline-md text-headline-md text-on-surface">Secure Enclave Vault</span>
      </div>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-secondary uppercase font-semibold">AES-256 GCM</span>
      </div>
      <p className="font-body-sm text-body-sm text-on-surface-variant">
            Threats held in quarantine are stripped of runtime execute flags (chmod 0000) and isolated inside the kernel cgroup sandbox.
          </p>
      
      <div className="relative w-full h-32 rounded-lg bg-surface-container-lowest overflow-hidden flex items-center justify-center">
      <div className="w-full h-full bg-cover bg-center opacity-40" data-alt="Tactical glowing dark cyber defense security vault interface with cryptographic keys and cybernetic lock rings in glowing cyan and dark slate obsidian background" style={{ backgroundImage: "url('/stitch/soc-room.png')" }}></div>
      
      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent flex flex-col justify-end p-2.5">
      <div className="flex items-center justify-between">
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-primary uppercase">ISOLATED PAYLOADS: 47 ARTIFACTS</span>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-on-surface-variant">0 LEAKS DETECTED</span>
      </div>
      </div>
      </div>
      </div>
      
      <div className="hidden fixed inset-0 z-50 flex items-center justify-center p-gutter bg-surface-container-lowest/80 backdrop-blur-md" id="purge-confirm-modal">
      <div className="w-full max-w-sm rounded-xl bg-surface-container-high p-space-md shadow-2xl flex flex-col gap-space-md relative overflow-hidden">
      
      <div className="h-1 w-full bg-error rounded-full"></div>
      <div className="flex items-center gap-space-sm">
      <div className="w-10 h-10 rounded-full bg-error-container/30 flex items-center justify-center text-error flex-shrink-0">
      <span className="material-symbols-outlined text-[24px]">gavel</span>
      </div>
      <div className="flex flex-col min-w-0">
      <h2 className="font-headline-md text-headline-md text-on-surface truncate">Authorize Mass Purge?</h2>
      <span className="font-label-telemetry-sm text-label-telemetry-sm text-error uppercase">2 Threats Will Be Destroyed</span>
      </div>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant">
              This action will permanently neutralize all identified malicious vectors, revoke injected certificates, and revoke foreground permissions.
            </p>
      <div className="flex items-center gap-space-xs pt-space-xs">
      <button className="flex-1 h-10 rounded-lg bg-surface-container text-on-surface font-label-telemetry-sm text-label-telemetry-sm font-semibold hover:bg-surface-bright transition-colors"  data-action="close-purge">
                CANCEL
              </button>
      <button className="flex-1 h-10 rounded-lg bg-error-container hover:bg-error text-on-error font-label-telemetry-sm text-label-telemetry-sm font-bold shadow transition-colors"  data-action="close-purge">
                CONFIRM PURGE
              </button>
      </div>
      </div>
      </div>
      </div>
    </div>
  );
}

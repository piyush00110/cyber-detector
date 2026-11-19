"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/scan/live/live-scan.module.css";

type LogTone = "ok" | "scan" | "alert" | "clean" | "inspect";

interface LogRow {
  tag: string;
  text: string;
  note?: string;
  tone: LogTone;
}

const INITIAL_LOGS: LogRow[] = [
  {
    tag: "[OK]",
    text: "/system/bin/app_process64",
    note: "(SHA-256 Verified)",
    tone: "ok",
  },
  {
    tag: "[SCANNING]",
    text: "/data/user/0/com.tencent.mm/cache/blob_821.tmp",
    tone: "scan",
  },
  {
    tag: "[ALERT]",
    text: "Root exploit signature match found in /tmp/su_daemon",
    tone: "alert",
  },
  {
    tag: "[CLEAN]",
    text: "Kernel memory integrity test passed (0 anomalies)",
    tone: "clean",
  },
  {
    tag: "[INSPECT]",
    text: "/system/framework/oat/arm64/services.odex",
    tone: "inspect",
  },
];

const LOG_POOL: LogRow[] = [
  { tag: "[OK]", text: "/system/lib64/libcrypto.so", note: "(SHA-256 Verified)", tone: "ok" },
  { tag: "[INSPECT]", text: "/data/app/com.android.chrome/base.apk", tone: "inspect" },
  { tag: "[CLEAN]", text: "SELinux policy map verified (0 escalations)", tone: "clean" },
  { tag: "[SCANNING]", text: "/data/local/tmp/.cache/update.bin", tone: "scan" },
  { tag: "[OK]", text: "/system/bin/surfaceflinger", note: "(SHA-256 Verified)", tone: "ok" },
  { tag: "[INSPECT]", text: "/proc/self/maps (permission mask validated)", tone: "inspect" },
  { tag: "[CLEAN]", text: "Package signature chain verified (7/7)", tone: "clean" },
  { tag: "[OK]", text: "/vendor/etc/security_patch.cfg", note: "(read-only)", tone: "ok" },
];

const TOTAL_SECONDS = 18;

function cx(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function LiveScanScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(74);
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const [paused, setPaused] = useState(false);
  const [aborted, setAborted] = useState(false);
  const [background, setBackground] = useState(false);
  const [logs, setLogs] = useState<LogRow[]>(INITIAL_LOGS);
  const [speed, setSpeed] = useState(2410);
  const [files, setFiles] = useState(142890);

  const done = progress >= 100;

  // The design is a dark, full-bleed experience. Keep the page canvas dark even
  // when the rest of the site is in light mode, then restore on unmount.
  useEffect(() => {
    const { body, documentElement } = document;
    const prevBody = body.style.background;
    const prevHtml = documentElement.style.background;
    body.style.background = "#05070d";
    documentElement.style.background = "#05070d";
    return () => {
      body.style.background = prevBody;
      documentElement.style.background = prevHtml;
    };
  }, []);

  useEffect(() => {
    if (paused || aborted || done) return;
    const id = setInterval(() => {
      setProgress((p) => Math.min(100, Math.round((p + 100 / TOTAL_SECONDS) * 100) / 100));
      setSeconds((s) => Math.max(0, s - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [paused, aborted, done]);

  useEffect(() => {
    if (paused || aborted || done) return;
    const id = setInterval(() => {
      setSpeed(2330 + Math.floor(Math.random() * 160));
      setFiles((f) => f + 12 + Math.floor(Math.random() * 38));
    }, 1800);
    return () => clearInterval(id);
  }, [paused, aborted, done]);

  useEffect(() => {
    if (paused || aborted || done) return;
    let cursor = 0;
    const id = setInterval(() => {
      setLogs((prev) => {
        const next = [...prev, LOG_POOL[cursor % LOG_POOL.length]];
        cursor += 1;
        return next.slice(-5);
      });
    }, 3600);
    return () => clearInterval(id);
  }, [paused, aborted, done]);

  const status = aborted
    ? "HEURISTIC SCAN ABORTED"
    : done
      ? "HEURISTIC SCAN COMPLETE"
      : paused
        ? "HEURISTIC SCAN PAUSED"
        : "HEURISTIC SCAN IN PROGRESS...";

  const eta = useMemo(() => {
    const s = Math.max(0, seconds);
    return `00:${s < 10 ? "0" : ""}${s}s`;
  }, [seconds]);

  const percent = Math.min(100, Math.round(progress));

  function handleAbort() {
    if (aborted || done) {
      router.push("/scan");
      return;
    }
    setAborted(true);
    setSeconds(0);
    setLogs((prev) => [
      ...prev.slice(-4),
      {
        tag: "[ALERT]",
        text: "Scan aborted by user — engine threads released",
        tone: "alert",
      },
    ]);
  }

  return (
    <div className={styles.screen}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.headerLeft}>
            <button
              type="button"
              aria-label="Go back"
              className={styles.backBtn}
              onClick={() => {
                if (window.history.length > 1) router.back();
                else router.push("/scan");
              }}
            >
              <span className={cx("material-symbols-outlined", styles.icon)}>
                arrow_back_ios_new
              </span>
            </button>
            <ShieldLogo />
          </div>

          <div className={styles.headerCenter}>
            <h1 className={styles.title}>
              <span className={styles.titleDot} aria-hidden="true" />
              Live Scan Flow
            </h1>
            <span className={styles.subtitle}>SYSTEM DEFENSE MATRIX</span>
          </div>

          <div className={styles.headerBadge} aria-hidden="true">
            <span className={cx("material-symbols-outlined", styles.icon)}>verified_user</span>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        {/* 1. Top progress telemetry */}
        <div className={styles.progressSection}>
          <div className={styles.progressTop}>
            <div className={styles.statusGroup}>
              <span className={styles.pingWrap} aria-hidden="true">
                <span
                  className={cx(
                    styles.pingDot,
                    aborted ? styles.pingRed : done ? styles.pingGreen : styles.pingCyan
                  )}
                />
                <span
                  className={cx(
                    styles.pingCore,
                    aborted ? styles.coreRed : done ? styles.coreGreen : styles.coreCyan
                  )}
                />
              </span>
              <span
                className={cx(
                  styles.statusText,
                  aborted ? styles.statusRed : done ? styles.statusGreen : styles.statusCyan
                )}
              >
                <span className={styles.statusLabel}>{status}</span>
                <span
                  className={cx(
                    styles.percentBadge,
                    aborted && styles.percentBadgeRed,
                    done && styles.percentBadgeGreen
                  )}
                >
                  {percent}%
                </span>
              </span>
            </div>

            <div className={styles.etaPill}>
              <span className={styles.etaLabel}>ETA:</span>
              <span className={styles.etaValue}>{eta}</span>
            </div>
          </div>

          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            aria-label="Heuristic scan progress"
          >
            <div
              className={cx(
                styles.progressFill,
                aborted && styles.progressFillRed,
                done && styles.progressFillGreen
              )}
              style={{ width: `${progress}%` }}
            >
              <div className={styles.progressShimmer} />
              <div className={styles.progressHead} />
            </div>
          </div>

          <div className={styles.progressMeta}>
            <span className={styles.engineLabel}>
              <span className={styles.squareDot} aria-hidden="true" />
              CORE_ENGINE_V4.9.4 // QUANTUM_SEC
            </span>
            <span className={styles.threadsLabel}>
              <span className={styles.pingWrap} aria-hidden="true">
                <span className={styles.threadsPing} />
                <span className={styles.threadsCore} />
              </span>
              {background ? "BACKGROUND THREADS ACTIVE (x8)" : "NEURAL THREADS ACTIVE (x8)"}
            </span>
          </div>
        </div>

        {/* 2. Holographic radar scope */}
        <div className={styles.radarWrap}>
          <div className={styles.radarGlow} aria-hidden="true" />

          <div className={styles.hudChassis} aria-hidden="true">
            <div className={cx(styles.corner, styles.cornerTL)} />
            <div className={cx(styles.corner, styles.cornerTR)} />
            <div className={cx(styles.corner, styles.cornerBL)} />
            <div className={cx(styles.corner, styles.cornerBR)} />
            <div className={styles.hudLabelLeft}>HUD_RADAR // SYS_V4</div>
            <div className={styles.hudLabelRight}>AZIMUTH 048°</div>
          </div>

          <div className={cx(styles.outerRing, (paused || aborted) && styles.radarPaused)}>
            <div className={styles.dashedRing} aria-hidden="true" />
            <div className={styles.midRing}>
              <span className={styles.rangeLabel}>R-150m</span>
              <div className={styles.innerRing}>
                <div className={styles.origin} aria-hidden="true">
                  <span />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.crosshairs} aria-hidden="true">
            <div className={cx(styles.crossMark, styles.crossTop)} />
            <div className={cx(styles.crossMark, styles.crossBottom)} />
            <div className={cx(styles.crossMark, styles.crossLeft)} />
            <div className={cx(styles.crossMark, styles.crossRight)} />
            <div className={styles.crossLineH} />
            <div className={styles.crossLineV} />
            <div className={styles.diagWrap}>
              <div className={styles.diag45} />
              <div className={styles.diagMinus45} />
            </div>
          </div>

          <div className={styles.sweep} aria-hidden="true">
            <div className={styles.sweepCone} />
            <div className={styles.sweepLine} />
          </div>

          <div className={cx(styles.node, styles.malwareNode)}>
            <div className={styles.nodeCore}>
              <div className={styles.malwarePing} aria-hidden="true" />
              <div className={styles.malwareHalo} aria-hidden="true" />
              <div className={styles.malwareDot} />
            </div>
            <div className={styles.malwareLabel}>
              <span className={styles.malwareLabelDot} aria-hidden="true" />
              MALWARE_NODE
            </div>
          </div>

          <div className={cx(styles.node, styles.cleanNode)}>
            <div className={styles.nodeCore}>
              <div className={styles.cleanPing} aria-hidden="true" />
              <div className={styles.cleanDot} />
            </div>
            <div className={styles.cleanLabel}>SYS_CLEAN: SECURE</div>
          </div>

          <div className={cx(styles.node, styles.passiveOne)}>
            <div className={styles.passiveDot} />
            <span className={styles.passiveLabel}>DEV_02</span>
          </div>

          <div className={cx(styles.node, styles.passiveTwo)}>
            <div className={styles.passiveDotPulse} />
          </div>

          <div className={styles.sectorPill}>
            <span>RADAR SECTOR 03 // ENGAGED</span>
          </div>
        </div>

        {/* 3. Telemetry metric tiles */}
        <div className={styles.metrics}>
          <div className={cx(styles.metricCard, styles.metricCyan)}>
            <div className={styles.metricCorner} aria-hidden="true" />
            <div className={styles.metricHead}>
              <div className={styles.metricName}>
                <span className={cx("material-symbols-outlined", styles.metricIconCyan)}>
                  folder_open
                </span>
                <span className={styles.metricLabel}>FILES</span>
              </div>
              <span className={styles.metricDash} aria-hidden="true" />
            </div>
            <div className={styles.metricBody}>
              <div className={styles.metricValue}>{files.toLocaleString("en-US")}</div>
              <div className={styles.metricSub}>/ 192,000 TOTAL</div>
            </div>
          </div>

          <div className={cx(styles.metricCard, styles.metricGreen)}>
            <div className={cx(styles.metricCorner, styles.metricCornerGreen)} aria-hidden="true" />
            <div className={styles.metricHead}>
              <div className={styles.metricName}>
                <span className={cx("material-symbols-outlined", styles.metricIconGreen)}>
                  memory
                </span>
                <span className={styles.metricLabel}>MEMORY</span>
              </div>
              <span className={styles.metricDashGreen} aria-hidden="true" />
            </div>
            <div className={styles.metricBody}>
              <div className={styles.metricValue}>3.8 GB</div>
              <div className={styles.metricSubGreen}>
                <span aria-hidden="true" />
                ACTIVE BUFFER
              </div>
            </div>
          </div>

          <div className={cx(styles.metricCard, styles.metricCyan)}>
            <div className={styles.metricCorner} aria-hidden="true" />
            <div className={styles.metricHead}>
              <div className={styles.metricName}>
                <span className={cx("material-symbols-outlined", styles.metricIconCyan)}>
                  speed
                </span>
                <span className={styles.metricLabel}>SPEED</span>
              </div>
              <span className={styles.metricDashPulse} aria-hidden="true" />
            </div>
            <div className={styles.metricBody}>
              <div className={styles.metricSpeed}>{speed.toLocaleString("en-US")}</div>
              <div className={styles.metricSub}>FILES / SEC</div>
            </div>
          </div>
        </div>

        {/* 4. Live telemetry terminal */}
        <div className={styles.terminalSection}>
          <div className={styles.terminal}>
            <div className={styles.scanlines} aria-hidden="true" />

            <div className={styles.terminalHead}>
              <div className={styles.terminalHeadLeft}>
                <div className={styles.windowDots} aria-hidden="true">
                  <span className={styles.dotRed} />
                  <span className={styles.dotAmber} />
                  <span className={styles.dotGreen} />
                </div>
                <span className={styles.terminalTitle}>
                  <span className={cx("material-symbols-outlined", styles.terminalIcon)}>
                    terminal
                  </span>
                  LIVE SCAN TELEMETRY
                </span>
              </div>
              <div className={styles.streamPill}>STREAM #8929A</div>
            </div>

            <div className={styles.logs} aria-live="polite">
              {logs.map((log, i) => (
                <div
                  key={`${i}-${log.tag}-${log.text.slice(0, 16)}`}
                  className={cx(styles.logRow, styles[`tone${capitalize(log.tone)}`])}
                >
                  <span className={styles.logTag}>{log.tag}</span>
                  <span className={styles.logText}>
                    {log.text}
                    {log.note && <span className={styles.logNote}> {log.note}</span>}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 5. Control actions */}
        <div className={styles.actions}>
          <div className={styles.actionGrid}>
            <button
              type="button"
              className={styles.controlBtn}
              onClick={() => setPaused((p) => !p)}
              disabled={done || aborted}
            >
              <span className={cx("material-symbols-outlined", styles.controlIcon)}>
                {paused ? "play_arrow" : "pause"}
              </span>
              <span>{paused ? "RESUME SCAN" : "PAUSE SCAN"}</span>
            </button>

            <button
              type="button"
              className={cx(styles.controlBtn, styles.controlBtnMuted)}
              onClick={() => setBackground((b) => !b)}
              disabled={done || aborted}
            >
              <span className={cx("material-symbols-outlined", styles.controlIconMuted)}>
                {background ? "visibility" : "visibility_off"}
              </span>
              <span>{background ? "FOREGROUND" : "BACKGROUND"}</span>
            </button>
          </div>

          <button
            type="button"
            className={cx(styles.abortBtn, aborted && styles.abortBtnDone)}
            onClick={handleAbort}
          >
            <div className={styles.abortShimmer} aria-hidden="true" />
            <span className={cx("material-symbols-outlined", styles.abortIcon)}>
              {aborted || done ? "arrow_back" : "cancel"}
            </span>
            <span>
              {aborted
                ? "RETURN TO SCANNER"
                : done
                  ? "START A NEW SCAN"
                  : "ABORT SCAN IMMEDIATE"}
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function ShieldLogo() {
  return (
    <svg
      className={styles.logo}
      viewBox="0 0 40 40"
      role="img"
      aria-label="CyberDetector shield logo"
    >
      <defs>
        <linearGradient id="cyberShieldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#00E699" />
        </linearGradient>
      </defs>
      <path
        d="M20 3.2 34 8.4v10.7c0 8.6-5.8 15.2-14 17.7C11.8 34.3 6 27.7 6 19.1V8.4L20 3.2Z"
        fill="rgba(0,240,255,0.08)"
        stroke="url(#cyberShieldGrad)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="m13.6 20.1 4.2 4.2 8.7-9.3"
        fill="none"
        stroke="url(#cyberShieldGrad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="20" r="14.5" fill="none" stroke="rgba(0,240,255,0.18)" strokeWidth="0.8" strokeDasharray="2 5" />
    </svg>
  );
}

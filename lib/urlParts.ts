/** URL anatomy helpers used by the breakdown panel. Pure + client safe. */

const TWO_LEVEL_SUFFIXES = new Set([
  "co.uk", "org.uk", "ac.uk", "gov.uk", "me.uk",
  "co.in", "net.in", "org.in", "gen.in", "firm.in",
  "com.au", "net.au", "org.au", "edu.au", "gov.au",
  "co.nz", "co.za", "co.jp", "co.kr", "co.id", "co.ke", "co.il",
  "com.br", "com.mx", "com.ar", "com.tr", "com.cn", "com.tw",
  "com.sg", "com.my", "com.ph", "com.vn", "com.pk", "com.bd",
  "com.np", "com.sa", "com.eg", "com.ng", "com.ua", "com.pl",
  "com.hk", "com.co", "net.co", "org.co",
]);

export interface UrlParts {
  protocol: string;
  hostname: string;
  port: string;
  tld: string;
  registrableDomain: string;
  subdomain: string;
  path: string;
  query: string;
  hash: string;
  isIp: boolean;
  isPunycode: boolean;
  isHttps: boolean;
  totalLength: number;
}

export function parseUrlParts(raw: string): UrlParts | null {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    return null;
  }

  const hostname = u.hostname.toLowerCase();
  const isIp = /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname) || hostname.startsWith("[");
  const labels = hostname.split(".").filter(Boolean);
  const isPunycode = hostname.includes("xn--");

  let tld = labels.at(-1) ?? "";
  let registrableDomain = hostname;
  let subdomain = "";

  if (!isIp && labels.length >= 2) {
    const lastTwo = labels.slice(-2).join(".");
    if (TWO_LEVEL_SUFFIXES.has(lastTwo) && labels.length >= 3) {
      tld = lastTwo;
      registrableDomain = labels.slice(-3).join(".");
    } else {
      tld = labels.at(-1) ?? "";
      registrableDomain = lastTwo;
    }
    const baseCount = registrableDomain.split(".").length;
    subdomain = labels.slice(0, Math.max(0, labels.length - baseCount)).join(".");
  }

  return {
    protocol: u.protocol.replace(":", ""),
    hostname,
    port: u.port,
    tld,
    registrableDomain,
    subdomain,
    path: u.pathname || "/",
    query: u.search,
    hash: u.hash,
    isIp,
    isPunycode,
    isHttps: u.protocol === "https:",
    totalLength: raw.length,
  };
}

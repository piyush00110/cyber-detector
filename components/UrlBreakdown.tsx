import { parseUrlParts } from "@/lib/urlParts";

/** Anatomy of a scanned URL: scheme, host, suffix, path, query… */
export default function UrlBreakdown({ url }: { url: string }) {
  const p = parseUrlParts(url);
  if (!p) return null;

  const cells: Array<{ label: string; value: string; warn?: boolean }> = [
    { label: "Scheme", value: p.protocol, warn: !p.isHttps },
    { label: "Host", value: p.hostname },
    { label: "Domain", value: p.registrableDomain },
    { label: "TLD", value: p.tld || "—" },
    { label: "Subdomain", value: p.subdomain || "—" },
    { label: "Port", value: p.port || "default" },
    { label: "Path", value: p.path },
    { label: "Length", value: `${p.totalLength} chars` },
  ];

  if (p.query) cells.push({ label: "Query", value: p.query });
  if (p.hash) cells.push({ label: "Fragment", value: p.hash });
  if (p.isIp) cells.push({ label: "Host type", value: "raw IP address", warn: true });
  if (p.isPunycode)
    cells.push({ label: "Encoding", value: "punycode (xn--)", warn: true });

  return (
    <dl className="breakdown" aria-label="URL breakdown">
      {cells.map((c) => (
        <div key={c.label} className={c.warn ? "warn" : undefined}>
          <dt>{c.label}</dt>
          <dd>{c.value}</dd>
        </div>
      ))}
    </dl>
  );
}

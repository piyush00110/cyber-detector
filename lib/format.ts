/** Small formatting helpers (client safe). */

export function timeAgo(iso: string): string {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return "unknown";
  const secs = Math.max(0, Math.round((Date.now() - then) / 1000));
  if (secs < 45) return "just now";
  const mins = Math.round(secs / 60);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.round(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

export function verdictLabel(verdict: string): string {
  if (verdict === "safe" || verdict === "clean") return "Clean";
  if (verdict === "suspicious") return "Suspicious";
  if (verdict === "malicious") return "Malicious";
  return verdict;
}

export function verdictColor(verdict: string): string {
  if (verdict === "safe" || verdict === "clean") return "var(--green)";
  if (verdict === "suspicious") return "var(--amber)";
  if (verdict === "malicious") return "var(--red)";
  return "var(--muted)";
}

export function kindLabel(kind: string): string {
  if (kind === "url") return "URL";
  if (kind === "file") return "File";
  if (kind === "code") return "Code";
  return kind;
}

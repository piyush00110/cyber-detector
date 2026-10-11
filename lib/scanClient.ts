/**
 * Safe JSON POST helper for all scanner UIs.
 * Fixes two papercuts:
 *  1. fetch() throwing (server down) used to show a cryptic "Network error".
 *     Now it tells the user to start `npm run dev`.
 *  2. Non-JSON error pages (e.g. a proxy 500) used to crash res.json().
 *     Now they fall back to a status-based message.
 */
export async function postJson<T>(
  path: string,
  body: unknown
): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
  let res: Response;
  try {
    res = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return {
      ok: false,
      error:
        "Cannot reach the app server. Make sure `npm run dev` is running in the project folder, then try again.",
    };
  }
  let data: { error?: string } | null = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  if (!res.ok) {
    return {
      ok: false,
      error: data?.error ?? `Server error (${res.status}). Please try again.`,
    };
  }
  return { ok: true, data: data as T };
}

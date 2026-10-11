export interface ThreatMatch {
  threatType: string;
  platformType: string;
  threatEntryType: string;
  threat: { url: string };
}

export interface ScanResult {
  url: string;
  safe: boolean;
  matches: ThreatMatch[];
}

const API_ENDPOINT =
  "https://safebrowsing.googleapis.com/v4/threatMatches:find";

export async function checkUrlWithSafeBrowsing(
  url: string,
  apiKey: string
): Promise<ScanResult> {
  const res = await fetch(`${API_ENDPOINT}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client: { clientId: "cyber-detector", clientVersion: "1.0.0" },
      threatInfo: {
        threatTypes: [
          "MALWARE",
          "SOCIAL_ENGINEERING",
          "UNWANTED_SOFTWARE",
          "POTENTIALLY_HARMFUL_APPLICATION",
        ],
        platformTypes: ["ANY_PLATFORM"],
        threatEntryTypes: ["URL"],
        threatEntries: [{ url }],
      },
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Safe Browsing API error (${res.status}): ${text}`);
  }

  const data = await res.json();
  const matches: ThreatMatch[] = data.matches ?? [];
  return { url, safe: matches.length === 0, matches };
}

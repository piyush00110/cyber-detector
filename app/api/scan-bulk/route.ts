import { NextRequest, NextResponse } from "next/server";
import { checkUrlWithSafeBrowsing } from "@/lib/safeBrowsing";
import {
  analyzeUrl,
  isValidHttpUrl,
  normalizeUrl,
  verdictFromResults,
} from "@/lib/heuristics";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const raw = Array.isArray(body?.urls) ? body.urls : null;
    if (!raw) {
      return NextResponse.json(
        { error: "Provide { urls: string[] } (max 10)." },
        { status: 400 }
      );
    }
    const urls = raw
      .filter((u: unknown) => typeof u === "string")
      .map((u: string) => normalizeUrl((u as string).trim()))
      .slice(0, 10);
    if (urls.length === 0) {
      return NextResponse.json({ error: "No valid URLs." }, { status: 400 });
    }

    const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY;
    const useSB = !!apiKey && apiKey !== "your_key_here";

    const results = await Promise.all(
      urls.map(async (url: string) => {
        if (!isValidHttpUrl(url)) return { url, error: "Invalid URL." };
        const heuristics = analyzeUrl(url);
        if (!useSB) {
          const verdict = verdictFromResults({
            safeBrowsingUnsafe: false,
            heuristicLevel: heuristics.level,
          });
          return {
            url, verdict, safe: verdict === "safe", matches: [],
            heuristics, source: "heuristic-only",
            scannedAt: new Date().toISOString(),
          };
        }
        try {
          const sb = await checkUrlWithSafeBrowsing(url, apiKey as string);
          const verdict = verdictFromResults({
            safeBrowsingUnsafe: !sb.safe,
            heuristicLevel: heuristics.level,
          });
          return {
            url, verdict, safe: verdict === "safe", matches: sb.matches,
            heuristics, source: "safe-browsing+heuristics",
            scannedAt: new Date().toISOString(),
          };
        } catch {
          return { url, error: "Scan failed.", heuristics };
        }
      })
    );
    return NextResponse.json({ results });
  } catch (err) {
    console.error("scan-bulk error:", err);
    return NextResponse.json({ error: "Bulk scan failed." }, { status: 500 });
  }
}

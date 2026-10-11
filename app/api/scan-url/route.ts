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
    let url = typeof body?.url === "string" ? body.url.trim() : "";
    if (!url) {
      return NextResponse.json({ error: "Please provide a URL." }, { status: 400 });
    }
    url = normalizeUrl(url);
    if (!isValidHttpUrl(url)) {
      return NextResponse.json(
        { error: "Please provide a valid http(s) URL." },
        { status: 400 }
      );
    }

    const heuristics = analyzeUrl(url);
    const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY;

    if (!apiKey || apiKey === "your_key_here") {
      const verdict = verdictFromResults({
        safeBrowsingUnsafe: false,
        heuristicLevel: heuristics.level,
      });
      return NextResponse.json({
        url,
        verdict,
        safe: verdict === "safe",
        matches: [],
        heuristics,
        source: "heuristic-only",
        warning:
          "GOOGLE_SAFE_BROWSING_API_KEY not configured — heuristic-only result. Add a key for full Safe Browsing verdicts.",
        scannedAt: new Date().toISOString(),
      });
    }

    const sb = await checkUrlWithSafeBrowsing(url, apiKey);
    const verdict = verdictFromResults({
      safeBrowsingUnsafe: !sb.safe,
      heuristicLevel: heuristics.level,
    });
    return NextResponse.json({
      url,
      verdict,
      safe: verdict === "safe",
      matches: sb.matches,
      heuristics,
      source: "safe-browsing+heuristics",
      scannedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error("scan-url error:", err);
    return NextResponse.json(
      { error: "Failed to scan URL. Try again later." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { getQuarantineConfig, getJsonFile } from "@/lib/githubQuarantine";
import type { AvResult } from "@/lib/av";

export const runtime = "nodejs";

/**
 * GET /api/scan-file/status?sha256=<hash>
 *
 * Reads `scan-results/<hash>.json` from the quarantine repo. Returns
 * `{ status: "pending" }` until the ClamAV workflow has published a verdict.
 */
export async function GET(req: NextRequest) {
  const sha256 = (req.nextUrl.searchParams.get("sha256") || "").toLowerCase();
  if (!/^[a-f0-9]{64}$/.test(sha256)) {
    return NextResponse.json({ error: "Invalid sha256." }, { status: 400 });
  }

  const cfg = getQuarantineConfig();
  if (!cfg) {
    return NextResponse.json(
      { error: "ClamAV queue is not configured." },
      { status: 503 }
    );
  }

  try {
    const result = await getJsonFile<AvResult>(
      cfg,
      `scan-results/${sha256}.json`
    );
    if (!result) return NextResponse.json({ status: "pending", sha256 });
    return NextResponse.json({ status: "done", sha256, result });
  } catch (err) {
    console.error("scan-file status error:", err);
    return NextResponse.json(
      { error: "Could not read the scan result." },
      { status: 500 }
    );
  }
}

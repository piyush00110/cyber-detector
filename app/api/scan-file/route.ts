import { NextRequest, NextResponse } from "next/server";
import { createHash } from "crypto";
import { MAX_QUEUE_BYTES, type AvResult } from "@/lib/av";
import {
  getQuarantineConfig,
  getJsonFile,
  getRepoInfo,
  getTextFile,
  putFile,
} from "@/lib/githubQuarantine";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const cfg = getQuarantineConfig();
    if (!cfg) {
      return NextResponse.json(
        {
          error:
            "ClamAV queue is not configured. Set GITHUB_PAT and GITHUB_QUARANTINE_REPOSITORY, then run `npm run setup:quarantine`.",
        },
        { status: 503 }
      );
    }

    const repo = await getRepoInfo(cfg);
    if (!repo) {
      return NextResponse.json(
        { error: `Quarantine repo "${cfg.repo}" was not found.` },
        { status: 404 }
      );
    }
    if (!repo.private) {
      return NextResponse.json(
        {
          error:
            "The quarantine repo must be PRIVATE. Set GITHUB_QUARANTINE_REPOSITORY to a private repo (run `npm run setup:quarantine`).",
        },
        { status: 403 }
      );
    }

    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "Send the file as multipart/form-data field 'file'." },
        { status: 400 }
      );
    }
    if (file.size === 0) {
      return NextResponse.json({ error: "The file is empty." }, { status: 400 });
    }
    if (file.size > MAX_QUEUE_BYTES) {
      return NextResponse.json(
        {
          error: `ClamAV queue supports files up to ${Math.round(
            MAX_QUEUE_BYTES / 1024 / 1024
          )} MB. Larger files need object storage and the workflow's file_url input.`,
        },
        { status: 413 }
      );
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const sha256 = createHash("sha256").update(buf).digest("hex");
    const safeName =
      file.name.replace(/[^\w.\-]+/g, "_").slice(0, 100) || "upload.bin";

    // Already scanned? Return the cached verdict.
    const resultPath = `scan-results/${sha256}.json`;
    const existing = await getJsonFile<AvResult>(cfg, resultPath);
    if (existing) {
      return NextResponse.json({
        ok: true,
        sha256,
        status: "done",
        result: existing,
      });
    }

    // Queue it in the private repo (committing triggers the ClamAV workflow).
    const queuePath = `quarantine/incoming/${sha256}-${safeName}`;
    const alreadyQueued = await getTextFile(cfg, queuePath).catch(() => null);
    if (!alreadyQueued) {
      await putFile(
        cfg,
        queuePath,
        buf.toString("base64"),
        `queue ${sha256}`
      );
    }

    return NextResponse.json({
      ok: true,
      sha256,
      status: "queued",
      queuePath,
      runUrl: `https://github.com/${cfg.repo}/actions`,
    });
  } catch (err) {
    console.error("scan-file error:", err);
    return NextResponse.json(
      { error: "Could not queue the file for ClamAV scanning." },
      { status: 500 }
    );
  }
}

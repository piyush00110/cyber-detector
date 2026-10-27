import { NextRequest, NextResponse } from "next/server";

/**
 * Trigger the ClamAV static scan via GitHub Actions.
 *
 * This dispatches the `clamav-scan.yml` workflow. It does NOT execute the file
 * and does NOT run anything on this server — GitHub runs ClamAV on an ephemeral
 * runner and only *reads* the bytes.
 *
 * Body: { fileUrl?: string }  — optional http(s) URL the runner will download
 *        and scan. Omit it to rescan whatever is in quarantine/.
 *
 * Env: GITHUB_PAT (actions:write), GITHUB_REPOSITORY ("owner/repo"),
 *      GITHUB_REF_NAME (optional, default "main")
 */
export async function POST(req: NextRequest) {
  const pat = process.env.GITHUB_PAT;
  const repo = process.env.GITHUB_REPOSITORY;

  if (!pat || !repo || !repo.includes("/")) {
    return NextResponse.json(
      {
        error:
          "GITHUB_PAT and GITHUB_REPOSITORY must be configured to trigger scans.",
      },
      { status: 500 }
    );
  }

  let fileUrl = "";
  try {
    const body = await req.json();
    if (typeof body?.fileUrl === "string") fileUrl = body.fileUrl.trim();
  } catch {
    /* empty body is fine */
  }

  if (fileUrl && !/^https?:\/\//i.test(fileUrl)) {
    return NextResponse.json(
      { error: "fileUrl must be an http(s) URL." },
      { status: 400 }
    );
  }

  const res = await fetch(
    `https://api.github.com/repos/${repo}/actions/workflows/clamav-scan.yml/dispatches`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${pat}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ref: process.env.GITHUB_REF_NAME || "main",
        inputs: { file_url: fileUrl, reason: "web-upload" },
      }),
      cache: "no-store",
    }
  );

  if (res.status !== 204) {
    const detail = await res.text();
    return NextResponse.json(
      {
        error: `GitHub workflow dispatch failed (${res.status}).`,
        detail,
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    message:
      "ClamAV scan dispatched. Results appear in the repository's Actions run.",
    runUrl: `https://github.com/${repo}/actions/workflows/clamav-scan.yml`,
  });
}

import { NextRequest, NextResponse } from "next/server";
import { analyzeCode } from "@/lib/codeAnalysis";

const MAX_CHARS = 200_000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const code = typeof body?.code === "string" ? body.code : "";
    const filename =
      typeof body?.filename === "string" && body.filename.trim()
        ? body.filename.trim().slice(0, 120)
        : "pasted-code.txt";
    if (!code.trim()) {
      return NextResponse.json(
        { error: "Paste code or upload a file first." },
        { status: 400 }
      );
    }
    if (code.length > MAX_CHARS) {
      return NextResponse.json(
        { error: `Code too large (max ${MAX_CHARS} chars).` },
        { status: 400 }
      );
    }
    const report = analyzeCode(code, filename);
    return NextResponse.json({ filename, ...report });
  } catch (err) {
    console.error("analyze-code error:", err);
    return NextResponse.json({ error: "Code analysis failed." }, { status: 500 });
  }
}

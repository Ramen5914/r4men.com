import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { manifestRequestSchema } from "@/lib/modManifestEventSchema";
import {
  reconcileModManifests,
  updateModManifest,
} from "@/lib/updateModManifest";

export const runtime = "nodejs";

function authorized(authorization: string | null, secret: string): boolean {
  const supplied = createHash("sha256")
    .update(authorization ?? "")
    .digest();

  const expected = createHash("sha256").update(`Bearer ${secret}`).digest();

  return timingSafeEqual(supplied, expected);
}

export async function POST(request: Request) {
  const secret = process.env.REPOSILITE_WEBHOOK_SECRET;

  const directory = process.env.MOD_MANIFEST_DIRECTORY;

  if (!secret || !directory) {
    console.error("Mod manifest webhook is not configured");

    return NextResponse.json(
      { error: "Webhook is not configured" },
      { status: 503 },
    );
  }

  if (!authorized(request.headers.get("authorization"), secret)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const contentType = request.headers
    .get("content-type")
    ?.split(";")[0]
    .trim()
    .toLowerCase();

  if (contentType !== "application/json") {
    return NextResponse.json(
      { error: "Expected application/json" },
      { status: 415 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = manifestRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Invalid event",
        issues: parsed.error.issues.map((issue) => ({
          path: issue.path,
          message: issue.message,
        })),
      },
      { status: 400 },
    );
  }

  try {
    if (parsed.data.operation === "reconcile") {
      const result = await reconcileModManifests(directory, parsed.data);

      return NextResponse.json({
        ok: true,
        operation: "reconcile",
        ...result,
      });
    }

    const result = await updateModManifest(directory, parsed.data);

    return NextResponse.json({
      ok: true,
      operation: parsed.data.operation,
      ...result,
    });
  } catch (error) {
    console.error("Failed to update mod manifest", error);

    return NextResponse.json(
      { error: "Failed to update manifest" },
      { status: 500 },
    );
  }
}

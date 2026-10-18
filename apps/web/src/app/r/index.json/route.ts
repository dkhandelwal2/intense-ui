import { NextResponse } from "next/server";
import { getDynamicRegistry } from "@/lib/registry";

export const dynamic = "force-dynamic";

export async function GET() {
  const registry = getDynamicRegistry();
  return NextResponse.json(registry, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}

import { NextRequest, NextResponse } from "next/server";
import { getDynamicComponentItem } from "@/lib/registry";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ name: string }> | { name: string } }
) {
  const params = await context.params;
  const item = getDynamicComponentItem(params.name);

  if (!item) {
    return NextResponse.json(
      { error: `Component "${params.name}" not found in registry.` },
      { status: 404 }
    );
  }

  return NextResponse.json(item, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=86400",
    },
  });
}

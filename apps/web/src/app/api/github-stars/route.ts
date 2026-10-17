import { NextResponse } from "next/server";

export const revalidate = 3600; // Cache on server for 1 hour

export async function GET() {
  try {
    const res = await fetch("https://api.github.com/repos/dkhandelwal2/intense-ui", {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Intense-UI-Web",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ stars: null }, { status: 200 });
    }

    const data = await res.json();
    const stars = typeof data.stargazers_count === "number" ? data.stargazers_count : null;
    return NextResponse.json({ stars });
  } catch {
    return NextResponse.json({ stars: null }, { status: 200 });
  }
}

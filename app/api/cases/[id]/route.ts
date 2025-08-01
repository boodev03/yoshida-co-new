import { NextRequest, NextResponse } from "next/server";
import { getCaseByIdServer } from "@/lib/cloudflare-d1-server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get("locale") || "ja"; // Default to Japanese

    const result = await getCaseByIdServer(id, locale as "en" | "ja");

    if (!result) {
      return NextResponse.json(
        { error: "Case not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch case" },
      { status: 500 }
    );
  }
}
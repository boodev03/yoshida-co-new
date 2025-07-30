import { NextRequest, NextResponse } from "next/server";
import {
  getAllCasesServer,
  getCasesWithPagePaginationServer,
} from "@/lib/cloudflare-d1-server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const pageSize = searchParams.get("pageSize") || "10";
    const offset = searchParams.get("offset");

    // If page is provided, use page-based pagination
    if (page) {
      const result = await getCasesWithPagePaginationServer({
        page: parseInt(page),
        pageSize: parseInt(pageSize),
      });
      return NextResponse.json(result);
    }

    // Otherwise use offset-based pagination
    const result = await getAllCasesServer({
      pageSize: parseInt(pageSize),
      offset: offset ? parseInt(offset) : undefined,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cases" },
      { status: 500 }
    );
  }
}
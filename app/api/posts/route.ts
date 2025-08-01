import { NextRequest, NextResponse } from "next/server";
import {
  getAllPostsServer,
  getPostsWithPagePaginationServer,
} from "@/lib/cloudflare-d1-server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page");
    const pageSize = searchParams.get("pageSize") || "10";
    const offset = searchParams.get("offset");
    const locale = searchParams.get("locale") || "ja"; // Default to Japanese
    const type = searchParams.get("type") || "cases"; // Default to cases

    // If page is provided, use page-based pagination
    if (page) {
      const result = await getPostsWithPagePaginationServer({
        page: parseInt(page),
        pageSize: parseInt(pageSize),
        locale: locale as "en" | "ja",
        type: type as "cases" | "news" | "equipments",
      });
      return NextResponse.json(result);
    }

    // Otherwise use offset-based pagination
    const result = await getAllPostsServer({
      pageSize: parseInt(pageSize),
      offset: offset ? parseInt(offset) : undefined,
      locale: locale as "en" | "ja",
      type: type as "cases" | "news" | "equipments",
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
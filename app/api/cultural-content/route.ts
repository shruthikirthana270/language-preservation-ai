import { type NextRequest, NextResponse } from "next/server"
import { getCulturalContent } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const filters = {
      language: searchParams.get("language") || undefined,
      category: searchParams.get("category") || undefined,
      region: searchParams.get("region") || undefined,
      search: searchParams.get("search") || undefined,
      limit: searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : undefined,
    }

    const content = await getCulturalContent(filters)

    return NextResponse.json({ content })
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Failed to fetch cultural content" }, { status: 500 })
  }
}

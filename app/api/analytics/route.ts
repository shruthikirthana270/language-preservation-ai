import { NextResponse } from "next/server"
import { getAnalytics } from "@/lib/database"

export async function GET() {
  try {
    const analytics = await getAnalytics()
    return NextResponse.json(analytics)
  } catch (error) {
    console.error("Analytics API Error:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}

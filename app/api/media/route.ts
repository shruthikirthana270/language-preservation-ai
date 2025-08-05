import { type NextRequest, NextResponse } from "next/server"
import { list, del } from "@vercel/blob"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const prefix = searchParams.get("prefix") || undefined
    const limit = Number(searchParams.get("limit")) || 50

    const { blobs } = await list({
      prefix,
      limit,
    })

    return NextResponse.json({ blobs })
  } catch (error) {
    console.error("Error listing media:", error)
    return NextResponse.json({ error: "Failed to list media files" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    await del(url)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting media:", error)
    return NextResponse.json({ error: "Failed to delete media file" }, { status: 500 })
  }
}

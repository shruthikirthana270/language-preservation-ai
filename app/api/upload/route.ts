import { type NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const type = formData.get("type") as string
    const languageCode = formData.get("languageCode") as string
    const contentId = formData.get("contentId") as string

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Generate pathname based on type
    let pathname: string
    switch (type) {
      case "audio":
        pathname = `audio/${languageCode}/${file.name}`
        break
      case "image":
        pathname = `cultural/${languageCode}/${contentId}/${file.name}`
        break
      case "document":
        pathname = `documents/${languageCode}/${file.name}`
        break
      default:
        pathname = `uploads/${file.name}`
    }

    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: true,
    })

    return NextResponse.json({
      url: blob.url,
      pathname: blob.pathname,
      contentType: blob.contentType,
      size: file.size,
    })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}

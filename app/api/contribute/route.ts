import { type NextRequest, NextResponse } from "next/server"
import { addCulturalContent, addLanguageData } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, ...data } = body

    let result
    if (type === "cultural") {
      result = await addCulturalContent({
        title: data.title,
        content: data.content,
        contentType: data.contentType,
        languageCode: data.languageCode,
        region: data.region,
        tags: data.tags || [],
        contributorId: data.contributorId || 1, // Default user for demo
      })
    } else if (type === "language-data") {
      result = await addLanguageData({
        content: data.content,
        dataType: data.dataType,
        languageCode: data.languageCode,
        category: data.category,
        contributorId: data.contributorId || 1, // Default user for demo
      })
    } else {
      return NextResponse.json({ error: "Invalid contribution type" }, { status: 400 })
    }

    return NextResponse.json({ success: true, id: result.id })
  } catch (error) {
    console.error("Contribution API Error:", error)
    return NextResponse.json({ error: "Failed to save contribution" }, { status: 500 })
  }
}

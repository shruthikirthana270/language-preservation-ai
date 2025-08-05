import { streamText } from "ai"
import { openai } from "@ai-sdk/openai"
import { neon } from "@neondatabase/serverless"

// Use your Render database URL
const sql = neon(process.env.DATABASE_URL!)

export async function POST(req: Request) {
  const { messages, language } = await req.json()

  // Log conversation to database
  try {
    const lastMessage = messages[messages.length - 1]
    if (lastMessage) {
      await sql`
        INSERT INTO conversations (language_code, message_count, started_at, last_activity)
        VALUES (${language}, ${messages.length}, NOW(), NOW())
        ON CONFLICT DO NOTHING
      `
    }
  } catch (error) {
    console.error("Database logging error:", error)
  }

  const systemPrompt = `You are a multilingual AI assistant specialized in regional languages and cultural preservation. You can communicate in various Indian languages including Hindi, Bengali, Telugu, Tamil, Marathi, Gujarati, Kannada, Malayalam, Punjabi, and others.

Current language context: ${language}

Your capabilities include:
- Conversing fluently in regional languages
- Sharing cultural knowledge, folk stories, and traditions
- Explaining festivals, customs, and regional practices
- Providing information about traditional cuisine and recipes
- Discussing local art forms, music, and literature
- Helping preserve and promote cultural heritage

Always be respectful of cultural nuances and provide accurate information about traditions and customs. When sharing stories or cultural content, mention the region or community it comes from.`

  const result = streamText({
    model: openai("gpt-4o"),
    system: systemPrompt,
    messages,
  })

  return result.toDataStreamResponse()
}

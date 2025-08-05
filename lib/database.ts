import { neon } from "@neondatabase/serverless"

// Use your Render PostgreSQL database URL
const DATABASE_URL =
  process.env.DATABASE_URL ||
  "postgresql://shruthi:4AudBTtgmoe2c2MHEgnQV7mFhukt1AlV@dpg-d2919rali9vc739d9ab0-a.oregon-postgres.render.com:5432/swecha_ai_db"

if (!DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export const sql = neon(DATABASE_URL)

// Database helper functions
export async function getLanguages() {
  try {
    const languages = await sql`
      SELECT code, name, native_name, speakers_count, status 
      FROM languages 
      ORDER BY speakers_count DESC
    `
    return languages
  } catch (error) {
    console.error("Error fetching languages:", error)
    return []
  }
}

export async function getCulturalContent(filters: {
  language?: string
  category?: string
  region?: string
  search?: string
  limit?: number
}) {
  try {
    let query = `
      SELECT cc.*, l.native_name as language_name, u.username as contributor_name
      FROM cultural_content cc
      LEFT JOIN languages l ON cc.language_code = l.code
      LEFT JOIN users u ON cc.contributor_id = u.id
      WHERE cc.status = 'published'
    `

    const params: any[] = []
    let paramIndex = 1

    if (filters.language && filters.language !== "All Languages") {
      query += ` AND l.name = $${paramIndex}`
      params.push(filters.language)
      paramIndex++
    }

    if (filters.category && filters.category !== "all") {
      query += ` AND cc.content_type = $${paramIndex}`
      params.push(filters.category)
      paramIndex++
    }

    if (filters.region && filters.region !== "All Regions") {
      query += ` AND cc.region = $${paramIndex}`
      params.push(filters.region)
      paramIndex++
    }

    if (filters.search) {
      query += ` AND (cc.title ILIKE $${paramIndex} OR cc.content ILIKE $${paramIndex} OR $${paramIndex} = ANY(cc.tags))`
      params.push(`%${filters.search}%`)
      paramIndex++
    }

    query += ` ORDER BY cc.likes_count DESC, cc.created_at DESC`

    if (filters.limit) {
      query += ` LIMIT $${paramIndex}`
      params.push(filters.limit)
    }

    const result = await sql(query, params)
    return result
  } catch (error) {
    console.error("Error fetching cultural content:", error)
    return []
  }
}

export async function addCulturalContent(content: {
  title: string
  content: string
  contentType: string
  languageCode: string
  region?: string
  tags: string[]
  contributorId: number
}) {
  try {
    const result = await sql`
      INSERT INTO cultural_content (
        title, content, content_type, language_code, region, tags, contributor_id
      ) VALUES (
        ${content.title}, 
        ${content.content}, 
        ${content.contentType}, 
        ${content.languageCode}, 
        ${content.region || null}, 
        ${content.tags}, 
        ${content.contributorId}
      )
      RETURNING id
    `
    return result[0]
  } catch (error) {
    console.error("Error adding cultural content:", error)
    throw error
  }
}

export async function addLanguageData(data: {
  content: string
  dataType: string
  languageCode: string
  category?: string
  contributorId: number
}) {
  try {
    const result = await sql`
      INSERT INTO language_data (
        content, data_type, language_code, category, contributor_id
      ) VALUES (
        ${data.content}, 
        ${data.dataType}, 
        ${data.languageCode}, 
        ${data.category || null}, 
        ${data.contributorId}
      )
      RETURNING id
    `
    return result[0]
  } catch (error) {
    console.error("Error adding language data:", error)
    throw error
  }
}

export async function getAnalytics() {
  try {
    const [languageStats, usageMetrics, monthlyData] = await Promise.all([
      // Language statistics
      sql`
        SELECT 
          l.name as language,
          l.native_name,
          COUNT(DISTINCT c.id) as users,
          COUNT(DISTINCT ld.id) as data_points,
          COALESCE(AVG(ua.conversations_count), 0) as avg_conversations
        FROM languages l
        LEFT JOIN conversations c ON l.code = c.language_code
        LEFT JOIN language_data ld ON l.code = ld.language_code
        LEFT JOIN usage_analytics ua ON l.code = ua.language_code
        WHERE l.status = 'active'
        GROUP BY l.code, l.name, l.native_name
        ORDER BY users DESC
      `,

      // Usage metrics
      sql`
        SELECT 
          SUM(conversations_count) as total_conversations,
          SUM(new_users_count) as total_users,
          SUM(data_contributions_count) as total_data,
          COUNT(DISTINCT language_code) as languages_count
        FROM usage_analytics
        WHERE date >= CURRENT_DATE - INTERVAL '30 days'
      `,

      // Monthly data
      sql`
        SELECT 
          TO_CHAR(date, 'Mon') as month,
          SUM(conversations_count) as conversations,
          SUM(new_users_count) as users,
          SUM(data_contributions_count) as data_points
        FROM usage_analytics
        WHERE date >= CURRENT_DATE - INTERVAL '6 months'
        GROUP BY date
        ORDER BY date
      `,
    ])

    return {
      languageStats,
      usageMetrics: usageMetrics[0] || {},
      monthlyData,
    }
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return {
      languageStats: [],
      usageMetrics: {},
      monthlyData: [],
    }
  }
}

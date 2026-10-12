import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

export interface Game {
  id: string
  title: string
  slug: string
  release_date: string
  youtube_id?: string
  image_url?: string
  description: string
  tags: string[]
  created_at?: string
}

export interface StudioInfo {
  id: number
  manifesto: string
  contact_email: string
  press_kit_url?: string
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

const IMAGE_DELIMITER = '\n<!--GAMICON_IMAGE:'
const IMAGE_DELIMITER_END = '-->'

/**
 * Parses a game record retrieved from Supabase.
 * If the record has its image embedded in description or image_url, extracts both cleanly.
 */
export function parseGameRecord(raw: any): Game {
  if (!raw) return raw
  let imageUrl = raw.image_url || ''
  let description = raw.description || ''

  if (description.includes(IMAGE_DELIMITER)) {
    const parts = description.split(IMAGE_DELIMITER)
    description = parts[0].trim()
    const metaPart = parts[1] || ''
    const extractedImg = metaPart.split(IMAGE_DELIMITER_END)[0]
    if (!imageUrl && extractedImg) {
      imageUrl = extractedImg
    }
  }

  return {
    ...raw,
    image_url: imageUrl,
    description,
  }
}

/**
 * Serializes a game record for Supabase insertion or update.
 * Transparently embeds image_url into description so it persists even without a separate schema column.
 */
export function serializeGameRecord(game: {
  title: string
  slug: string
  release_date: string
  youtube_id?: string
  description: string
  tags: string[]
  image_url?: string
}): Record<string, any> {
  const cleanImage = (game.image_url || '').trim()
  const cleanDesc = (game.description || '').trim()

  // Always embed cleanImage into the description as metadata tag
  const enrichedDescription = cleanImage
    ? `${cleanDesc}${IMAGE_DELIMITER}${cleanImage}${IMAGE_DELIMITER_END}`
    : cleanDesc

  const payload: Record<string, any> = {
    title: game.title.trim(),
    slug: game.slug.trim(),
    release_date: game.release_date,
    youtube_id: game.youtube_id || '',
    description: enrichedDescription,
    tags: game.tags,
  }

  // Include image_url directly in case the column is added in Supabase
  if (cleanImage) {
    payload.image_url = cleanImage
  }

  return payload
}

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

const ANAMORPHIC_DELIMITER = '\n<!--ANAMORPHIC_IMAGE:'
const LEGACY_DELIMITER = '\n<!--GAMICON_IMAGE:'
const IMAGE_DELIMITER_END = '-->'

/**
 * Automatically converts Google Drive share/view links into direct image streaming URLs.
 * Works with:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 */
export function normalizeImageUrl(url: string): string {
  if (!url || typeof url !== 'string') return ''
  const trimmed = url.trim()

  if (trimmed.includes('drive.google.com')) {
    // 1. /file/d/FILE_ID/view or /file/d/FILE_ID
    const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
    if (fileMatch && fileMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${fileMatch[1]}`
    }
    // 2. ?id=FILE_ID or &id=FILE_ID (open?id=, uc?id=)
    const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/)
    if (idMatch && idMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${idMatch[1]}`
    }
    // 3. /d/FILE_ID
    const directDMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/)
    if (directDMatch && directDMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${directDMatch[1]}`
    }
  }

  return trimmed
}

/**
 * Parses a game record retrieved from Supabase.
 * If the record has its image embedded in description or image_url, extracts both cleanly.
 */
export function parseGameRecord(raw: any): Game {
  if (!raw) return raw
  let imageUrl = raw.image_url || ''
  let description = raw.description || ''

  let activeDelimiter = ''
  if (description.includes(ANAMORPHIC_DELIMITER)) {
    activeDelimiter = ANAMORPHIC_DELIMITER
  } else if (description.includes(LEGACY_DELIMITER)) {
    activeDelimiter = LEGACY_DELIMITER
  }

  if (activeDelimiter) {
    const parts = description.split(activeDelimiter)
    description = parts[0].trim()
    const metaPart = parts[1] || ''
    const extractedImg = metaPart.split(IMAGE_DELIMITER_END)[0]
    if (!imageUrl && extractedImg) {
      imageUrl = extractedImg
    }
  }

  return {
    ...raw,
    image_url: normalizeImageUrl(imageUrl),
    description,
  }
}

/**
 * Serializes a game record for Supabase insertion or update.
 * Transparently embeds image_url into description so it persists even without a separate schema column.
 */
export function serializeGameRecord(game: {
  id?: string
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
    ? `${cleanDesc}${ANAMORPHIC_DELIMITER}${cleanImage}${IMAGE_DELIMITER_END}`
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

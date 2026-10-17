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
 * Extracts Google Drive file ID from any drive share / preview / uc / open link.
 */
export function extractGoogleDriveFileId(url: string): string | null {
  if (!url || typeof url !== 'string') return null
  const trimmed = url.trim()

  if (trimmed.includes('drive.google.com') || trimmed.includes('docs.google.com')) {
    // 1. /file/d/FILE_ID
    const fileMatch = trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)
    if (fileMatch && fileMatch[1]) return fileMatch[1]

    // 2. ?id=FILE_ID or &id=FILE_ID
    const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/)
    if (idMatch && idMatch[1]) return idMatch[1]

    // 3. /d/FILE_ID
    const directDMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/)
    if (directDMatch && directDMatch[1]) return directDMatch[1]
  }

  // Also support already-extracted lh3 links
  if (trimmed.includes('lh3.googleusercontent.com/d/')) {
    const lh3Match = trimmed.match(/lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/)
    if (lh3Match && lh3Match[1]) return lh3Match[1]
  }

  return null
}

/**
 * Automatically converts Google Drive share/view links into direct image streaming URLs.
 * Uses high-speed lh3 CDN with fallback compatibility.
 */
export function normalizeImageUrl(url?: string | null): string {
  if (!url || typeof url !== 'string') return ''
  const trimmed = url.trim()

  const driveId = extractGoogleDriveFileId(trimmed)
  if (driveId) {
    // High-speed Google CDN format for inline images
    return `https://lh3.googleusercontent.com/d/${driveId}`
  }

  return trimmed
}

/**
 * Fallback URL generator if the primary CDN format fails to load (e.g. strict rate limit).
 */
export function getDriveFallbackUrl(url?: string | null): string {
  if (!url || typeof url !== 'string') return ''
  const driveId = extractGoogleDriveFileId(url)
  if (driveId) {
    return `https://drive.google.com/uc?export=view&id=${driveId}`
  }
  return url
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

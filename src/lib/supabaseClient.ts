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

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, type Game, type StudioInfo } from '../lib/supabaseClient'

// Seed dataset matching gameweb.txt / studio specification
const INITIAL_SEED_GAMES: Omit<Game, 'id'>[] = [
  {
    title: 'NEON PROTOCOL',
    slug: 'neon-protocol',
    release_date: '2024-11-15',
    youtube_id: 'dQw4w9WgXcQ',
    description:
      'High-octane tactical cyber-action in a vertical megacity. Navigate corporate warfare with lethal cybernetic loadouts. Every encounter is a fast-twitch puzzle of momentum, spatial ballistic calculations, and consequence.',
    tags: ['Cyberpunk RPG', 'Unreal Engine 5', 'Available Now'],
  },
  {
    title: 'IRON TALON: 2184',
    slug: 'iron-talon-2184',
    release_date: '2025-10-30',
    youtube_id: 'dQw4w9WgXcQ',
    description:
      'Squad-based mechanized warfare across ravaged frontier wastelands. Master modular ballistic platforms and tactical positioning in real-time calculated atmospheric environments.',
    tags: ['Tactical Mech Warfare', 'Co-Op & PvP', 'Active Prototype'],
  },
  {
    title: 'RUNEBOUND: OBLIVION',
    slug: 'runebound-oblivion',
    release_date: '2025-05-20',
    youtube_id: 'dQw4w9WgXcQ',
    description:
      'Unforgiving dungeon delving into forbidden subterranean monoliths. Decipher ancient runes and harvest elder power. Designed for total player spatial agency with permadeath systems that enforce ruthless precision.',
    tags: ['Dark Fantasy Roguelike', 'Closed Alpha Q2 2025', 'PC // PS5'],
  },
]

const INITIAL_SEED_STUDIO: StudioInfo = {
  id: 1,
  manifesto:
    'Gamicon is an independent studio forging mechanics-driven, narrative-rich titles built without creative compromise. We reject automated formulas and safety-first design paradigms. We architect unforgiving worlds for players who demand mastery, physics, narrative literacy, and visceral design.',
  contact_email: 'contact@gamicon.studio',
  press_kit_url: 'https://gamicon.studio/press-kit.zip',
}

// Utility to parse YouTube URL or 11-char ID
function parseYouTubeId(input: string): string {
  const trimmed = input.trim()
  if (trimmed.length === 11 && !trimmed.includes('/') && !trimmed.includes('?')) {
    return trimmed
  }
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  const match = trimmed.match(regExp)
  return match ? match[1] : trimmed.slice(0, 11)
}

import AdminLogin from './AdminLogin'

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('gamicon_admin_auth') === 'authenticated'
  })
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterMode, setFilterMode] = useState<'ALL' | 'LIVE' | 'DRAFT'>('ALL')

  // Edit / Add Modal or Section
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingGameId, setEditingGameId] = useState<string | null>(null)
  const [formTitle, setFormTitle] = useState('')
  const [formSlug, setFormSlug] = useState('')
  const [formReleaseDate, setFormReleaseDate] = useState('')
  const [formYouTubeId, setFormYouTubeId] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formTags, setFormTags] = useState('')

  // Studio Info Editing Tab / Modal
  const [isStudioModalOpen, setIsStudioModalOpen] = useState(false)
  const [studioManifesto, setStudioManifesto] = useState('')
  const [studioEmail, setStudioEmail] = useState('')
  const [studioPressKit, setStudioPressKit] = useState('')

  // Quick Embed Fast-Action Panel state
  const [targetGameSlug, setTargetGameSlug] = useState('')
  const [quickVideoInput, setQuickVideoInput] = useState('https://youtube.com/watch?v=dQw4w9WgXcQ')

  // Fetch games & studio info
  async function loadData() {
    setLoading(true)
    try {
      const { data: gamesData, error: gamesError } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false })

      if (!gamesError && gamesData) {
        const casted = gamesData as Game[]
        setGames(casted)
        if (casted.length > 0 && !targetGameSlug) {
          setTargetGameSlug(casted[0].slug)
        }
      }

      const { data: studioData } = await supabase
        .from('studio_info')
        .select('*')
        .eq('id', 1)
        .single()

      if (studioData) {
        const info = studioData as StudioInfo
        setStudioManifesto(info.manifesto)
        setStudioEmail(info.contact_email)
        setStudioPressKit(info.press_kit_url)
      } else {
        setStudioManifesto(INITIAL_SEED_STUDIO.manifesto)
        setStudioEmail(INITIAL_SEED_STUDIO.contact_email)
        setStudioPressKit(INITIAL_SEED_STUDIO.press_kit_url)
      }
    } catch (err) {
      console.error('Supabase load error', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  function showNotification(message: string, type: 'success' | 'error' = 'success') {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  // Seed Initial Data Button handler
  async function handleSeedData() {
    try {
      setLoading(true)
      // Upsert studio info row id = 1
      const { error: studioErr } = await supabase
        .from('studio_info')
        .upsert(INITIAL_SEED_STUDIO, { onConflict: 'id' })

      if (studioErr) throw studioErr

      // Upsert games
      for (const g of INITIAL_SEED_GAMES) {
        const { error: gameErr } = await supabase
          .from('games')
          .upsert(g, { onConflict: 'slug' })

        if (gameErr) throw gameErr
      }

      showNotification('SUCCESS: Database seeded with initial Gamicon productions and studio manifesto')
      await loadData()
    } catch (err: any) {
      console.error(err)
      showNotification(`SEED FAILED: ${err.message || 'Database error'}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  // Save new or edited Game
  async function handleSaveGame(e: React.FormEvent) {
    e.preventDefault()
    const parsedYt = parseYouTubeId(formYouTubeId)
    const tagsArray = formTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const payload = {
      title: formTitle.trim(),
      slug: formSlug.trim() || formTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      release_date: formReleaseDate || new Date().toISOString().split('T')[0],
      youtube_id: parsedYt,
      description: formDescription.trim(),
      tags: tagsArray,
    }

    try {
      if (editingGameId) {
        const { error } = await supabase
          .from('games')
          .update(payload)
          .eq('id', editingGameId)

        if (error) throw error
        showNotification(`Game "${payload.title}" updated successfully.`)
      } else {
        const { error } = await supabase.from('games').insert([payload])
        if (error) throw error
        showNotification(`Game "${payload.title}" created successfully.`)
      }

      setIsFormOpen(false)
      resetForm()
      await loadData()
    } catch (err: any) {
      showNotification(`ERROR: ${err.message || 'Failed to save game'}`, 'error')
    }
  }

  function handleEditClick(game: Game) {
    setEditingGameId(game.id)
    setFormTitle(game.title)
    setFormSlug(game.slug)
    setFormReleaseDate(game.release_date)
    setFormYouTubeId(game.youtube_id)
    setFormDescription(game.description)
    setFormTags(game.tags ? game.tags.join(', ') : '')
    setIsFormOpen(true)
  }

  async function handleDeleteGame(id: string, title: string) {
    if (!confirm(`Confirm deletion of game: "${title}"? This cannot be undone.`)) return
    try {
      const { error } = await supabase.from('games').delete().eq('id', id)
      if (error) throw error
      showNotification(`Game "${title}" deleted from catalog.`)
      await loadData()
    } catch (err: any) {
      showNotification(`DELETE FAILED: ${err.message}`, 'error')
    }
  }

  function resetForm() {
    setEditingGameId(null)
    setFormTitle('')
    setFormSlug('')
    setFormReleaseDate('')
    setFormYouTubeId('')
    setFormDescription('')
    setFormTags('')
  }

  // Save Studio Info
  async function handleSaveStudioInfo(e: React.FormEvent) {
    e.preventDefault()
    try {
      const payload: StudioInfo = {
        id: 1,
        manifesto: studioManifesto,
        contact_email: studioEmail,
        press_kit_url: studioPressKit,
      }
      const { error } = await supabase.from('studio_info').upsert(payload, { onConflict: 'id' })
      if (error) throw error
      showNotification('Studio Info and Manifesto saved successfully.')
      setIsStudioModalOpen(false)
    } catch (err: any) {
      showNotification(`SAVE FAILED: ${err.message}`, 'error')
    }
  }

  // Quick Embed Sync Handler
  async function handleQuickEmbedSync() {
    if (!targetGameSlug) return
    const parsedId = parseYouTubeId(quickVideoInput)
    try {
      const { error } = await supabase
        .from('games')
        .update({ youtube_id: parsedId })
        .eq('slug', targetGameSlug)

      if (error) throw error
      showNotification(`Updated YouTube Embed ID for ${targetGameSlug} -> [${parsedId}]`)
      await loadData()
    } catch (err: any) {
      showNotification(`SYNC FAILED: ${err.message}`, 'error')
    }
  }

  // Filtering
  const filteredGames = games.filter((g) => {
    const matchesSearch =
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.youtube_id.toLowerCase().includes(searchQuery.toLowerCase())

    if (!matchesSearch) return false
    if (filterMode === 'LIVE') return g.youtube_id && g.youtube_id.length === 11
    if (filterMode === 'DRAFT') return !g.youtube_id || g.youtube_id.length !== 11
    return true
  })

  const handleSignOut = () => {
    sessionStorage.removeItem('gamicon_admin_auth')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="bg-[#0e0e0e] text-[#e5e2e1] min-h-screen font-sans select-none overflow-x-hidden antialiased flex selection:bg-white selection:text-black">
      {/* ========================================================================= */}
      {/* LEFT SIDEBAR COMPONENT                                                    */}
      {/* ========================================================================= */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0e0e0e] border-r border-[#444748]/40 flex flex-col justify-between p-4 z-40">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#444748]/40 mb-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 bg-white text-black flex items-center justify-center font-bold font-display text-xs">
                G
              </div>
              <div>
                <span className="font-display tracking-widest text-white uppercase font-bold text-sm leading-none block">
                  GAMICON
                </span>
                <span className="font-display text-[9px] uppercase tracking-widest text-[#8e9192] block mt-0.5">
                  CMS // v2.4
                </span>
              </div>
            </Link>
            <span className="inline-flex items-center px-1.5 py-0.5 border border-[#444748]/40 font-mono text-[9px] text-[#8e9192]">
              DEV
            </span>
          </div>

          {/* Main Navigation Rail */}
          <nav className="space-y-1">
            <button
              onClick={() => {}}
              className="w-full flex items-center gap-2 px-3 py-2.5 font-display text-xs uppercase tracking-widest text-white bg-[#2a2a2a] border-l-2 border-white font-bold transition-colors"
            >
              <span className="material-symbols-outlined text-white">sports_esports</span>
              <span>Catalog</span>
            </button>
            <button
              onClick={() => setIsStudioModalOpen(true)}
              className="w-full flex items-center gap-2 px-3 py-2.5 font-display text-xs uppercase tracking-widest text-[#c7c6c6] hover:text-white hover:bg-[#1c1b1b] transition-colors"
            >
              <span className="material-symbols-outlined text-[#8e9192]">tune</span>
              <span>Studio Info</span>
            </button>
            <Link
              to="/"
              className="w-full flex items-center gap-2 px-3 py-2.5 font-display text-xs uppercase tracking-widest text-[#c7c6c6] hover:text-white hover:bg-[#1c1b1b] transition-colors"
            >
              <span className="material-symbols-outlined text-[#8e9192]">visibility</span>
              <span>Live Site</span>
            </Link>
          </nav>

          {/* Seed Initial Data Button (Per AGENTS.md instructions) */}
          <div className="mt-8 pt-4 border-t border-[#444748]/40 space-y-2">
            <button
              onClick={handleSeedData}
              disabled={loading}
              className="w-full py-2.5 px-3 border border-emerald-500/80 hover:bg-emerald-500 hover:text-black text-emerald-400 font-display text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-colors duration-150 bg-emerald-950/20 font-bold"
            >
              <span className="material-symbols-outlined text-sm">database</span>
              <span>Seed Initial Data</span>
            </button>

            <button
              onClick={() => setIsStudioModalOpen(true)}
              className="w-full py-2.5 px-3 border border-[#444748]/60 hover:border-white text-white font-display text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-colors duration-150 bg-transparent"
            >
              <span className="material-symbols-outlined text-sm">edit_document</span>
              <span>Edit Manifesto</span>
            </button>
          </div>
        </div>

        {/* Footer & Operator Profile Strip */}
        <div className="border-t border-[#444748]/40 pt-4 space-y-4">
          <div className="grid grid-cols-2 gap-2 text-[#8e9192] font-display text-[10px] uppercase tracking-widest">
            <Link to="/" className="flex items-center gap-1.5 p-1 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-sm">home</span>
              <span>Site</span>
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 p-1 hover:text-white transition-colors justify-end"
            >
              <span className="material-symbols-outlined text-sm">logout</span>
              <span>Sign Out</span>
            </button>
          </div>

          <div className="p-2.5 bg-[#1c1b1b] border border-[#444748]/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 bg-[#2a2a2a] border border-[#444748] flex items-center justify-center font-mono text-xs text-white font-bold">
                KS
                <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 border border-black" />
              </div>
              <div className="overflow-hidden">
                <p className="font-display text-[10px] text-white tracking-widest uppercase truncate leading-tight">
                  K. SATO
                </p>
                <p className="font-sans text-[11px] text-[#8e9192] truncate leading-tight mt-0.5">
                  Studio Head
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-sm text-[#8e9192]">lock</span>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN WORKSPACE CANVAS                                                     */}
      {/* ========================================================================= */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen bg-[#131313]">
        {/* Top Notification Toast */}
        {notification && (
          <div
            className={`px-6 py-3 font-display text-xs uppercase tracking-widest flex items-center justify-between border-b ${
              notification.type === 'error'
                ? 'bg-red-950/80 text-red-300 border-red-700'
                : 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
            }`}
          >
            <span>{notification.message}</span>
            <button onClick={() => setNotification(null)} className="p-1">
              ✕
            </button>
          </div>
        )}

        {/* Top App Bar */}
        <header className="h-16 w-full border-b border-[#444748]/40 bg-[#131313] px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-8 flex-1 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="font-display text-white tracking-widest uppercase font-bold text-base">
                GAMICON // ADMIN
              </span>
              <span className="px-2 py-0.5 border border-[#444748]/40 bg-[#1c1b1b] font-mono text-xs text-[#c4c7c8]">
                {games.length} GAMES LOGGED
              </span>
            </div>

            {/* Global Quick Search Input */}
            <div className="relative flex-1 max-w-md hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8e9192]">
                <span className="material-symbols-outlined text-base">search</span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search catalog titles, slugs, IDs..."
                className="w-full bg-[#0e0e0e] border border-[#444748]/40 text-white pl-9 pr-4 py-1.5 text-xs font-mono focus:border-white focus:ring-0 placeholder:text-[#8e9192]/70"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSeedData}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 border border-[#444748]/60 hover:border-white text-[#c4c7c8] hover:text-white font-display text-xs tracking-widest uppercase transition-colors"
            >
              <span className="material-symbols-outlined text-sm">sync</span>
              <span>SEED INITIAL DATA</span>
            </button>

            <button
              onClick={() => {
                resetForm()
                setIsFormOpen(true)
              }}
              className="flex items-center gap-2 px-4 py-1.5 bg-white text-black font-display text-xs tracking-widest uppercase font-bold hover:bg-neutral-200 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>+ ADD NEW GAME</span>
            </button>
          </div>
        </header>

        {/* Subheader / Filter Bar */}
        <div className="px-8 py-3 border-b border-[#444748]/40 bg-[#0e0e0e] flex flex-wrap items-center justify-between gap-4 font-display text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#8e9192] uppercase tracking-widest mr-2 text-[10px]">
              FILTERS:
            </span>
            <button
              onClick={() => setFilterMode('ALL')}
              className={`px-3 py-1 uppercase tracking-widest font-bold text-[10px] ${
                filterMode === 'ALL'
                  ? 'bg-white text-black'
                  : 'text-[#8e9192] border border-[#444748]/40 hover:text-white'
              }`}
            >
              ALL ({games.length})
            </button>
            <button
              onClick={() => setFilterMode('LIVE')}
              className={`px-3 py-1 uppercase tracking-widest font-bold text-[10px] ${
                filterMode === 'LIVE'
                  ? 'bg-white text-black'
                  : 'text-[#8e9192] border border-[#444748]/40 hover:text-white'
              }`}
            >
              LIVE
            </button>
            <button
              onClick={() => setFilterMode('DRAFT')}
              className={`px-3 py-1 uppercase tracking-widest font-bold text-[10px] ${
                filterMode === 'DRAFT'
                  ? 'bg-white text-black'
                  : 'text-[#8e9192] border border-[#444748]/40 hover:text-white'
              }`}
            >
              DRAFT
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsStudioModalOpen(true)}
              className="px-3 py-1 uppercase tracking-widest text-[#8e9192] hover:text-white border border-[#444748]/40 flex items-center gap-1.5 text-[10px]"
            >
              <span className="material-symbols-outlined text-sm">settings</span>
              <span>Studio Info Settings</span>
            </button>
          </div>
        </div>

        {/* Dual-View Main Workspace */}
        <main className="flex-1 p-8 grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* ===================================================================== */}
          {/* LEFT / PRIMARY COLUMN (~70% Width / 8 cols on XL)                     */}
          {/* ===================================================================== */}
          <section className="xl:col-span-8 space-y-6">
            <div className="border border-[#444748]/40 bg-[#0e0e0e]">
              <div className="px-4 py-3 border-b border-[#444748]/40 flex items-center justify-between bg-[#1c1b1b]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white" />
                  <h2 className="font-display text-xs uppercase tracking-widest text-white font-bold">
                    PRODUCTION MASTER CATALOG
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-[#8e9192] font-mono text-xs">
                  <span>SHOWING {filteredGames.length} TITLES</span>
                </div>
              </div>

              {/* High-Density Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#444748]/40 bg-[#201f1f] text-[#8e9192] font-display text-[10px] uppercase tracking-widest">
                      <th className="p-3">Title & Slug</th>
                      <th className="p-3">Release Date</th>
                      <th className="p-3">YouTube ID</th>
                      <th className="p-3">Tags</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#444748]/30 font-mono text-xs">
                    {filteredGames.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-neutral-400">
                          No games found. Click <strong>"Seed Initial Data"</strong> or <strong>"+ Add New Game"</strong>.
                        </td>
                      </tr>
                    ) : (
                      filteredGames.map((g) => (
                        <tr
                          key={g.id}
                          className="hover:bg-[#201f1f] transition-colors duration-150 group"
                        >
                          <td className="p-3 align-middle">
                            <div className="font-display text-sm text-white font-medium uppercase">
                              {g.title}
                            </div>
                            <div className="text-[11px] text-[#8e9192]">/game/{g.slug}</div>
                          </td>

                          <td className="p-3 align-middle text-[#c4c7c8] text-xs">
                            {g.release_date || 'TBD'}
                          </td>

                          <td className="p-3 align-middle">
                            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-[#131313] border border-[#444748]/40 text-[11px] text-[#e5e2e1]">
                              <span className="w-1.5 h-1.5 bg-emerald-500" />
                              <span>{g.youtube_id}</span>
                            </div>
                          </td>

                          <td className="p-3 align-middle">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {g.tags &&
                                g.tags.map((t, idx) => (
                                  <span
                                    key={idx}
                                    className="px-1.5 py-0.5 bg-[#1c1b1b] border border-[#444748]/30 text-[9px] text-[#8e9192] uppercase"
                                  >
                                    {t}
                                  </span>
                                ))}
                            </div>
                          </td>

                          <td className="p-3 align-middle text-right">
                            <div className="inline-flex items-center gap-1">
                              <Link
                                to={`/game/${g.slug}`}
                                target="_blank"
                                className="px-2 py-1 border border-[#444748]/40 hover:border-white text-[#8e9192] hover:text-white transition-colors text-[10px] uppercase font-display"
                              >
                                View
                              </Link>
                              <button
                                onClick={() => handleEditClick(g)}
                                className="px-2 py-1 border border-[#444748]/40 hover:border-white text-[#8e9192] hover:text-white transition-colors text-[10px] uppercase font-display"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteGame(g.id, g.title)}
                                className="p-1 text-[#8e9192] hover:text-red-400 transition-colors"
                                title="Delete"
                              >
                                <span className="material-symbols-outlined text-sm">delete</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Studio Telemetry Spec Bar */}
            <div className="border border-[#444748]/40 bg-[#0e0e0e] p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border-l-2 border-white pl-3">
                <p className="font-display text-[10px] uppercase tracking-widest text-[#8e9192]">
                  SUPABASE REMOTE
                </p>
                <p className="font-mono text-sm text-white font-bold mt-1">ONLINE // RLS ACTIVE</p>
                <p className="text-[11px] text-[#8e9192]">Public CRUD client connected</p>
              </div>
              <div className="border-l-2 border-[#444748] pl-3">
                <p className="font-display text-[10px] uppercase tracking-widest text-[#8e9192]">
                  TOTAL GAME ASSETS
                </p>
                <p className="font-mono text-sm text-white font-bold mt-1">{games.length} REPOSITORIES</p>
                <p className="text-[11px] text-[#8e9192]">Ready for 4K video playback</p>
              </div>
              <div className="border-l-2 border-emerald-500 pl-3">
                <p className="font-display text-[10px] uppercase tracking-widest text-[#8e9192]">
                  STUDIO INFO ROW
                </p>
                <p className="font-mono text-sm text-emerald-400 font-bold mt-1">
                  ID: 1 // CONFIGURED
                </p>
                <p className="text-[11px] text-[#8e9192] truncate max-w-xs">{studioEmail}</p>
              </div>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* RIGHT / SECONDARY COLUMN (~30% Width / 4 cols on XL)                  */}
          {/* ===================================================================== */}
          <section className="xl:col-span-4 border border-[#444748]/40 bg-[#0e0e0e] p-6 space-y-6">
            <div className="pb-3 border-b border-[#444748]/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-base">smart_display</span>
                <h3 className="font-display text-xs uppercase tracking-widest text-white font-bold">
                  QUICK VIDEO EMBED
                </h3>
              </div>
              <span className="font-display text-[10px] uppercase tracking-widest text-[#8e9192]">
                FAST-ACTION
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-display text-[10px] uppercase tracking-widest text-[#8e9192] mb-1.5">
                  TARGET GAME SHOWCASE
                </label>
                <select
                  value={targetGameSlug}
                  onChange={(e) => setTargetGameSlug(e.target.value)}
                  className="w-full bg-[#131313] border border-[#444748]/40 text-white text-xs px-3 py-2 focus:border-white focus:ring-0 font-mono"
                >
                  {games.map((g) => (
                    <option key={g.slug} value={g.slug}>
                      {g.title} ({g.slug})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-display text-[10px] uppercase tracking-widest text-[#8e9192] mb-1.5">
                  YOUTUBE URL / STREAM ID
                </label>
                <input
                  type="text"
                  value={quickVideoInput}
                  onChange={(e) => setQuickVideoInput(e.target.value)}
                  placeholder="https://youtube.com/watch?v=... or 11-char ID"
                  className="w-full bg-[#131313] border border-[#444748]/40 text-white text-xs px-3 py-2 focus:border-white focus:ring-0 font-mono"
                />
                <p className="font-mono text-[10px] text-[#8e9192] mt-1">
                  Parsed Video ID:{' '}
                  <span className="text-white font-bold">
                    {parseYouTubeId(quickVideoInput) || 'None'}
                  </span>
                </p>
              </div>

              {/* Embedded Micro-Player Live Preview */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-display text-[10px] uppercase tracking-widest text-[#8e9192]">
                    LIVE PREVIEW BUFFER
                  </span>
                  <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 animate-pulse" />
                    RESOLVED
                  </span>
                </div>
                <div className="relative aspect-video border border-[#444748]/40 bg-black overflow-hidden">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${parseYouTubeId(quickVideoInput)}?controls=1`}
                    title="Live Preview"
                    allowFullScreen
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleQuickEmbedSync}
                  className="w-full py-3 px-4 bg-white text-black font-display text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
                >
                  <span className="material-symbols-outlined text-base">sync</span>
                  <span>SYNC VIDEO & DEPLOY</span>
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT GAME CMS                                                */}
      {/* ========================================================================= */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-2xl bg-[#0e0e0e] border border-[#444748] p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-[#444748]/40 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white" />
                <h3 className="font-display text-lg text-white uppercase tracking-tight font-bold">
                  {editingGameId ? 'EDIT GAME ENTRY' : 'ADD NEW GAME ENTRY'}
                </h3>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-[#8e9192] hover:text-white p-1"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveGame} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-display text-[10px] uppercase tracking-widest text-[#8e9192] mb-1">
                    TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. NEON PROTOCOL"
                    className="w-full bg-[#131313] border border-[#444748]/40 text-white text-xs px-3 py-2 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-display text-[10px] uppercase tracking-widest text-[#8e9192] mb-1">
                    SLUG *
                  </label>
                  <input
                    type="text"
                    required
                    value={formSlug}
                    onChange={(e) => setFormSlug(e.target.value)}
                    placeholder="e.g. neon-protocol"
                    className="w-full bg-[#131313] border border-[#444748]/40 text-white text-xs px-3 py-2 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-display text-[10px] uppercase tracking-widest text-[#8e9192] mb-1">
                    RELEASE DATE (YYYY-MM-DD)
                  </label>
                  <input
                    type="date"
                    value={formReleaseDate}
                    onChange={(e) => setFormReleaseDate(e.target.value)}
                    className="w-full bg-[#131313] border border-[#444748]/40 text-white text-xs px-3 py-2 font-mono"
                  />
                </div>
                <div>
                  <label className="block font-display text-[10px] uppercase tracking-widest text-[#8e9192] mb-1">
                    YOUTUBE ID OR URL *
                  </label>
                  <input
                    type="text"
                    required
                    value={formYouTubeId}
                    onChange={(e) => setFormYouTubeId(e.target.value)}
                    placeholder="11-char ID or YouTube URL"
                    className="w-full bg-[#131313] border border-[#444748]/40 text-white text-xs px-3 py-2 font-mono"
                  />
                  <span className="font-mono text-[9px] text-emerald-400">
                    Parsed: {parseYouTubeId(formYouTubeId) || 'None'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-display text-[10px] uppercase tracking-widest text-[#8e9192] mb-1">
                  TAGS (COMMA-SEPARATED)
                </label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="e.g. Cyberpunk RPG, Unreal Engine 5, Available Now"
                  className="w-full bg-[#131313] border border-[#444748]/40 text-white text-xs px-3 py-2 font-mono"
                />
              </div>

              <div>
                <label className="block font-display text-[10px] uppercase tracking-widest text-[#8e9192] mb-1">
                  DESCRIPTION
                </label>
                <textarea
                  rows={4}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="High-octane tactical cyber-action in a vertical megacity..."
                  className="w-full bg-[#131313] border border-[#444748]/40 text-white text-xs p-3 font-mono"
                />
              </div>

              <div className="pt-4 border-t border-[#444748]/40 flex justify-end gap-3 font-display text-xs">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-6 py-2.5 border border-[#444748]/40 text-[#8e9192] hover:text-white uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-white text-black font-bold uppercase tracking-widest hover:bg-neutral-200"
                >
                  Save Game Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: EDIT STUDIO INFO (id = 1)                                          */}
      {/* ========================================================================= */}
      {isStudioModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in">
          <div className="w-full max-w-2xl bg-[#0e0e0e] border border-[#444748] p-6 md:p-8 space-y-6">
            <div className="flex justify-between items-center border-b border-[#444748]/40 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white" />
                <h3 className="font-display text-lg text-white uppercase tracking-tight font-bold">
                  EDIT STUDIO INFO (ID = 1)
                </h3>
              </div>
              <button
                onClick={() => setIsStudioModalOpen(false)}
                className="text-[#8e9192] hover:text-white p-1"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveStudioInfo} className="space-y-4">
              <div>
                <label className="block font-display text-[10px] uppercase tracking-widest text-[#8e9192] mb-1">
                  CONTACT EMAIL
                </label>
                <input
                  type="email"
                  required
                  value={studioEmail}
                  onChange={(e) => setStudioEmail(e.target.value)}
                  placeholder="contact@gamicon.studio"
                  className="w-full bg-[#131313] border border-[#444748]/40 text-white text-xs px-3 py-2 font-mono"
                />
              </div>

              <div>
                <label className="block font-display text-[10px] uppercase tracking-widest text-[#8e9192] mb-1">
                  PRESS KIT ARCHIVE URL
                </label>
                <input
                  type="url"
                  required
                  value={studioPressKit}
                  onChange={(e) => setStudioPressKit(e.target.value)}
                  placeholder="https://gamicon.studio/press-kit.zip"
                  className="w-full bg-[#131313] border border-[#444748]/40 text-white text-xs px-3 py-2 font-mono"
                />
              </div>

              <div>
                <label className="block font-display text-[10px] uppercase tracking-widest text-[#8e9192] mb-1">
                  STUDIO MANIFESTO
                </label>
                <textarea
                  rows={5}
                  required
                  value={studioManifesto}
                  onChange={(e) => setStudioManifesto(e.target.value)}
                  placeholder="Gamicon is an independent studio forging mechanics-driven, narrative-rich titles built without creative compromise..."
                  className="w-full bg-[#131313] border border-[#444748]/40 text-white text-xs p-3 font-mono leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-[#444748]/40 flex justify-end gap-3 font-display text-xs">
                <button
                  type="button"
                  onClick={() => setIsStudioModalOpen(false)}
                  className="px-6 py-2.5 border border-[#444748]/40 text-[#8e9192] hover:text-white uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-white text-black font-bold uppercase tracking-widest hover:bg-neutral-200"
                >
                  Save Studio Info
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

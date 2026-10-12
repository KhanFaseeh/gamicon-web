import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, type Game, type StudioInfo } from '../lib/supabaseClient'
import AdminLogin from './AdminLogin'

const INITIAL_SEED_GAMES: Omit<Game, 'id'>[] = [
  {
    title: 'Echoes of Desolation',
    slug: 'echoes-of-desolation',
    release_date: '2025-10-31',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBPDot2E_OV1D-vLdPARlhiiTmL9DFIXeS6qb3wDjw3xfq_Z0Qv-L8rIwrPl6bp88_emkbMejDOSSqzrnTWCVwKOSqSl6EDYPR3TmqFJOjJ8HaOoLzPENJsk2Q95af_QeQYCI4gknuBfg4BX35f_Hj08zKBE7-aVwtTUw7IflkFe1-QqQRZ7XVxbdb3VREFZAdTQhCBvcRq_XzhUdugkokgLlEljJVq093KrwA_9vSe-HPPj1vSAVVv',
    description:
      'Following classified reports of illegal human experimentation inside Elysium Asylum, a lone detective enters the facility to uncover the truth. Trapped within its walls alongside patients mutated into grotesque monsters, you must fight through the horrors of the ward, confront the mutated mastermind Dr. Voss, and survive long enough to escape.',
    tags: ['Survival Horror', 'Action', 'Single-Player'],
  },
  {
    title: 'Ashes of Escape',
    slug: 'ashes-of-escape',
    release_date: '2026-03-15',
    image_url:
      'https://lh3.googleusercontent.com/aida/AEtjO1UJMRZzH5hkjwGYbhPftm1WQxBVgPZhhN-1HNr-hozj8Rwg67e0k9Hu6kaiMr1EHPHAeqq5bTM6kVLpri8Sv3bVG76Xc6ksXCwe8ZGzpyPu8y050ns3BjCQpo5oPvLJGXrxbuWhGihn3V5eUYn_aUZpcvSHAXc7SkkaXR0ncFL47P4S-Pf74EEFu2GT5BFFyPU7hoPg14OUNZNJDFRX-vbpMa_62lIMqfPSdXqchfq_kXD593V3jfhVarw',
    description:
      'A relentless gauntlet across three distinct, hostile environments. Fight through waves of enemies across shifting combat zones and carve a path to extraction before you are overrun.',
    tags: ['Action', 'Combat', 'Survival'],
  },
]

const INITIAL_SEED_STUDIO: StudioInfo = {
  id: 1,
  manifesto:
    'Gamicon is an independent studio forging mechanics-driven, narrative-rich titles built without creative compromise. We reject automated formulas and safety-first design paradigms. We architect unforgiving worlds for players who demand mastery, physics, narrative literacy, and visceral design.',
  contact_email: 'contact@gamicon.studio',
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('gamicon_admin_auth') === 'authenticated'
  })
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  // Edit / Add Modal or Section
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingGameId, setEditingGameId] = useState<string | null>(null)
  const [formTitle, setFormTitle] = useState('')
  const [formSlug, setFormSlug] = useState('')
  const [formReleaseDate, setFormReleaseDate] = useState('')
  const [formImageUrl, setFormImageUrl] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formTags, setFormTags] = useState('')

  // Studio Info Editing Tab / Modal
  const [isStudioModalOpen, setIsStudioModalOpen] = useState(false)
  const [studioManifesto, setStudioManifesto] = useState('')
  const [studioEmail, setStudioEmail] = useState('')

  const [isUploadingImage, setIsUploadingImage] = useState(false)

  // Quick Image Preview selection
  const [previewGameSlug, setPreviewGameSlug] = useState('')

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      showNotification('Please select a valid image file (PNG, JPG, WEBP).', 'error')
      return
    }

    setIsUploadingImage(true)
    try {
      // 1. Try uploading to Supabase Storage bucket 'game-images' or 'images'
      const fileExt = file.name.split('.').pop() || 'png'
      const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`
      const filePath = `covers/${cleanFileName}`

      const { error: uploadError } = await supabase.storage
        .from('game-images')
        .upload(filePath, file, { cacheControl: '3600', upsert: true })

      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from('game-images')
          .getPublicUrl(filePath)

        if (publicUrlData?.publicUrl) {
          setFormImageUrl(publicUrlData.publicUrl)
          showNotification('Picture uploaded to Supabase Storage successfully!')
          setIsUploadingImage(false)
          return
        }
      }

      // 2. If storage bucket does not exist or upload is restricted, fallback smoothly to local Base64 / Data URL
      console.warn('Storage upload fallback triggered, generating compressed Base64 Data URL...')
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target?.result as string
        setFormImageUrl(base64)
        showNotification('Picture loaded & processed successfully!')
        setIsUploadingImage(false)
      }
      reader.onerror = () => {
        showNotification('Failed to read image file.', 'error')
        setIsUploadingImage(false)
      }
      reader.readAsDataURL(file)
    } catch (err: any) {
      console.warn('Direct upload error, falling back to Data URL', err)
      const reader = new FileReader()
      reader.onload = (event) => {
        const base64 = event.target?.result as string
        setFormImageUrl(base64)
        showNotification('Picture processed successfully!')
        setIsUploadingImage(false)
      }
      reader.readAsDataURL(file)
    }
  }

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
        if (casted.length > 0 && !previewGameSlug) {
          setPreviewGameSlug(casted[0].slug)
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
      } else {
        setStudioManifesto(INITIAL_SEED_STUDIO.manifesto)
        setStudioEmail(INITIAL_SEED_STUDIO.contact_email)
      }
    } catch (err) {
      console.error('Supabase load error', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  function showNotification(message: string, type: 'success' | 'error' = 'success') {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  async function handleSeedData() {
    try {
      setLoading(true)
      const { error: studioErr } = await supabase
        .from('studio_info')
        .upsert(INITIAL_SEED_STUDIO, { onConflict: 'id' })

      if (studioErr) throw studioErr

      for (const g of INITIAL_SEED_GAMES) {
        const { error: gameErr } = await supabase
          .from('games')
          .upsert(g, { onConflict: 'slug' })

        if (gameErr) throw gameErr
      }

      showNotification('SUCCESS: Database seeded with initial Gamicon products and studio manifesto')
      await loadData()
    } catch (err: any) {
      console.error(err)
      showNotification(`SEED FAILED: ${err.message || 'Database error'}`, 'error')
    } finally {
      setLoading(false)
    }
  }

  const [isSaving, setIsSaving] = useState(false)

  async function handleSaveGame(e: React.FormEvent) {
    e.preventDefault()

    if (!formTitle.trim()) {
      showNotification('Please enter a Product Title.', 'error')
      return
    }

    setIsSaving(true)
    const tagsArray = formTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    const generatedSlug =
      formSlug.trim() ||
      formTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

    const generatedDate = formReleaseDate || new Date().toISOString().split('T')[0]

    // Construct primary payload
    const payload: Record<string, any> = {
      title: formTitle.trim(),
      slug: generatedSlug,
      release_date: generatedDate,
      description: formDescription.trim(),
      tags: tagsArray,
      image_url: formImageUrl.trim(),
    }

    try {
      if (editingGameId) {
        // Try standard update
        let { error } = await supabase
          .from('games')
          .update(payload)
          .eq('id', editingGameId)

        // If remote schema complains about unknown image_url column, retry with youtube_id or trimmed fields
        if (error && error.message?.includes('image_url')) {
          console.warn('Remote table does not have image_url column yet, adapting payload...')
          const fallbackPayload = { ...payload }
          delete fallbackPayload.image_url
          const retryRes = await supabase
            .from('games')
            .update(fallbackPayload)
            .eq('id', editingGameId)
          error = retryRes.error
        }

        if (error) throw error
        showNotification(`Product "${payload.title}" updated successfully!`)
      } else {
        // Try standard insert
        let { error } = await supabase.from('games').insert([payload])

        // If remote schema does not have image_url column or requires fallback
        if (error && error.message?.includes('image_url')) {
          console.warn('Remote table does not have image_url column, inserting compatible payload...')
          const fallbackPayload = { ...payload }
          delete fallbackPayload.image_url
          const retryRes = await supabase.from('games').insert([fallbackPayload])
          error = retryRes.error
        }

        if (error) throw error
        showNotification(`Product "${payload.title}" created successfully!`)
      }

      setIsFormOpen(false)
      resetForm()
      await loadData()
    } catch (err: any) {
      console.error('Failed to save to Supabase:', err)
      const errorMsg = err?.message || 'Database error occurred'
      showNotification(`ERROR: ${errorMsg}`, 'error')

      // Also persist locally in current state session so the product is not lost
      const tempId = editingGameId || `local-${Date.now()}`
      const localProduct: Game = {
        id: tempId,
        title: payload.title,
        slug: payload.slug,
        release_date: payload.release_date,
        description: payload.description,
        tags: payload.tags,
        image_url: formImageUrl.trim(),
      }

      setGames((prev) => {
        const existingIdx = prev.findIndex((g) => g.id === tempId || g.slug === localProduct.slug)
        if (existingIdx >= 0) {
          const next = [...prev]
          next[existingIdx] = localProduct
          return next
        }
        return [localProduct, ...prev]
      })

      setIsFormOpen(false)
      resetForm()
      showNotification(`Product "${payload.title}" added to local catalog (Database: ${errorMsg})`, 'error')
    } finally {
      setIsSaving(false)
    }
  }

  function handleEditClick(game: Game) {
    setEditingGameId(game.id)
    setFormTitle(game.title)
    setFormSlug(game.slug)
    setFormReleaseDate(game.release_date)
    setFormImageUrl(game.image_url || '')
    setFormDescription(game.description)
    setFormTags(game.tags ? game.tags.join(', ') : '')
    setIsFormOpen(true)
  }

  async function handleDeleteGame(id: string, title: string) {
    if (!confirm(`Confirm deletion of product: "${title}"?`)) return
    try {
      const { error } = await supabase.from('games').delete().eq('id', id)
      if (error) throw error
      showNotification(`Product "${title}" removed from catalog.`)
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
    setFormImageUrl('')
    setFormDescription('')
    setFormTags('')
  }

  async function handleSaveStudioInfo(e: React.FormEvent) {
    e.preventDefault()
    try {
      const payload: StudioInfo = {
        id: 1,
        manifesto: studioManifesto,
        contact_email: studioEmail,
      }
      const { error } = await supabase.from('studio_info').upsert(payload, { onConflict: 'id' })
      if (error) throw error
      showNotification('Studio Info saved successfully.')
      setIsStudioModalOpen(false)
    } catch (err: any) {
      showNotification(`SAVE FAILED: ${err.message}`, 'error')
    }
  }

  const handleSignOut = () => {
    sessionStorage.removeItem('gamicon_admin_auth')
    setIsAuthenticated(false)
  }

  const filteredGames = games.filter((g) => {
    const matchesSearch =
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  const selectedPreviewGame =
    games.find((g) => g.slug === previewGameSlug) || games[0] || INITIAL_SEED_GAMES[0]

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="bg-[#0e0e0e] text-[#e5e2e1] min-h-screen font-sans select-none overflow-x-hidden antialiased flex selection:bg-white selection:text-black">
      {/* LEFT SIDEBAR COMPONENT */}
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
                  CMS // PRODUCT MANAGER
                </span>
              </div>
            </Link>
            <span className="inline-flex items-center px-1.5 py-0.5 border border-[#444748]/40 font-mono text-[9px] text-[#8e9192]">
              ADMIN
            </span>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => {}}
              className="w-full flex items-center gap-2 px-3 py-2.5 font-display text-xs uppercase tracking-widest text-white bg-[#2a2a2a] border-l-2 border-white font-bold transition-colors"
            >
              <span className="material-symbols-outlined text-white">inventory_2</span>
              <span>Products Catalog</span>
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

          <div className="mt-8 pt-4 border-t border-[#444748]/40 space-y-2">
            <button
              onClick={handleSeedData}
              disabled={loading}
              className="w-full py-2.5 px-3 border border-emerald-500/80 hover:bg-emerald-500 hover:text-black text-emerald-400 font-display text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 transition-colors duration-150 bg-emerald-950/20 font-bold"
            >
              <span className="material-symbols-outlined text-sm">database</span>
              <span>Seed Initial Products</span>
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
                  Studio Lead
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-sm text-[#8e9192]">lock</span>
          </div>
        </div>
      </aside>

      {/* MAIN WORKSPACE CANVAS */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen bg-[#131313]">
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

        <header className="h-16 w-full border-b border-[#444748]/40 bg-[#131313] px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-8 flex-1 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="font-display text-white tracking-widest uppercase font-bold text-base">
                PRODUCT SHOWCASE CMS
              </span>
              <span className="px-2 py-0.5 border border-[#444748]/40 bg-[#1c1b1b] font-mono text-xs text-[#c4c7c8]">
                {games.length} PRODUCTS
              </span>
            </div>

            <div className="relative flex-1 max-w-md hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8e9192]">
                <span className="material-symbols-outlined text-base">search</span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by title, slug or desc..."
                className="w-full bg-[#0e0e0e] border border-[#444748]/40 text-white pl-9 pr-4 py-1.5 text-xs font-mono focus:border-white focus:ring-0 placeholder:text-[#8e9192]/70"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                resetForm()
                setIsFormOpen(true)
              }}
              className="flex items-center gap-2 px-4 py-1.5 bg-white text-black font-display text-xs tracking-widest uppercase font-bold hover:bg-neutral-200 transition-colors"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>+ ADD NEW PRODUCT</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-8 grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* PRIMARY COLUMN: Data Table */}
          <section className="xl:col-span-8 space-y-6">
            <div className="border border-[#444748]/40 bg-[#0e0e0e]">
              <div className="px-4 py-3 border-b border-[#444748]/40 flex items-center justify-between bg-[#1c1b1b]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white" />
                  <h2 className="font-display text-xs uppercase tracking-widest text-white font-bold">
                    PRODUCT CATALOG & VISUALS
                  </h2>
                </div>
                <div className="flex items-center gap-2 text-[#8e9192] font-mono text-xs">
                  <span>{filteredGames.length} ITEMS</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#444748]/40 bg-[#201f1f] text-[#8e9192] font-display text-[10px] uppercase tracking-widest">
                      <th className="p-3 w-28">Preview</th>
                      <th className="p-3">Title & Slug</th>
                      <th className="p-3">Release Date</th>
                      <th className="p-3">Tags</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#444748]/30 font-mono text-xs">
                    {filteredGames.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-neutral-400">
                          No products found. Click <strong>"Seed Initial Products"</strong> or <strong>"+ Add New Product"</strong>.
                        </td>
                      </tr>
                    ) : (
                      filteredGames.map((g) => (
                        <tr
                          key={g.id}
                          className="hover:bg-[#201f1f] transition-colors duration-150 group cursor-pointer"
                          onClick={() => setPreviewGameSlug(g.slug)}
                        >
                          <td className="p-3 align-middle">
                            <div className="w-20 aspect-video border border-[#444748]/40 bg-[#1c1b1b] overflow-hidden">
                              {g.image_url ? (
                                <img
                                  src={g.image_url}
                                  alt={g.title}
                                  className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[9px] text-[#8e9192]">
                                  NO IMG
                                </div>
                              )}
                            </div>
                          </td>

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

                          <td className="p-3 align-middle text-right" onClick={(e) => e.stopPropagation()}>
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
          </section>

          {/* SECONDARY COLUMN: Fast Image Preview & Details */}
          <section className="xl:col-span-4 border border-[#444748]/40 bg-[#0e0e0e] p-6 space-y-4">
            <div className="pb-3 border-b border-[#444748]/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-white text-base">image</span>
                <h3 className="font-display text-xs uppercase tracking-widest text-white font-bold">
                  IMAGE & SHOWCASE PREVIEW
                </h3>
              </div>
              <span className="font-display text-[10px] uppercase tracking-widest text-[#8e9192]">
                SELECTED
              </span>
            </div>

            {selectedPreviewGame && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-display text-lg text-white uppercase font-bold">
                    {selectedPreviewGame.title}
                  </h4>
                  <p className="font-mono text-xs text-[#8e9192]">/game/{selectedPreviewGame.slug}</p>
                </div>

                <div className="aspect-video w-full border border-[#444748]/40 bg-[#1c1b1b] overflow-hidden">
                  {selectedPreviewGame.image_url ? (
                    <img
                      src={selectedPreviewGame.image_url}
                      alt={selectedPreviewGame.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-[#8e9192]">
                      No Image Configured
                    </div>
                  )}
                </div>

                <div>
                  <span className="font-display text-[10px] uppercase tracking-widest text-[#8e9192] block mb-1">
                    PRODUCT DESCRIPTION
                  </span>
                  <p className="text-xs text-[#c7c6c6] leading-relaxed font-light">
                    {selectedPreviewGame.description}
                  </p>
                </div>

                <div className="pt-2">
                  <Link
                    to={`/game/${selectedPreviewGame.slug}`}
                    target="_blank"
                    className="w-full py-2.5 px-4 bg-white text-black font-display text-xs tracking-widest uppercase font-bold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
                  >
                    <span>OPEN PUBLIC PRODUCT PAGE →</span>
                  </Link>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in overflow-y-auto">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0e0e0e] border border-[#444748] p-6 md:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#444748]/40 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white" />
                <h3 className="font-display text-lg text-white uppercase tracking-tight font-bold">
                  {editingGameId ? 'EDIT PRODUCT ENTRY' : 'ADD NEW PRODUCT'}
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
                    PRODUCT TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Echoes of Desolation"
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
                    placeholder="e.g. echoes-of-desolation"
                    className="w-full bg-[#131313] border border-[#444748]/40 text-white text-xs px-3 py-2 font-mono"
                  />
                </div>
              </div>

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

              {/* COVER PICTURE UPLOAD OR URL */}
              <div className="border border-[#444748]/40 p-4 bg-[#131313] space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block font-display text-[10px] uppercase tracking-widest text-white font-bold">
                    PRODUCT COVER PICTURE
                  </label>
                  <span className="text-[10px] text-[#8e9192] font-mono">
                    PNG, JPG, WEBP, GIF
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                  {/* File Upload Button */}
                  <div>
                    <label className="flex flex-col items-center justify-center border border-dashed border-[#444748] hover:border-white p-4 cursor-pointer transition-colors bg-[#0e0e0e] group">
                      <span className="material-symbols-outlined text-2xl text-[#8e9192] group-hover:text-white transition-colors mb-1">
                        cloud_upload
                      </span>
                      <span className="font-display text-[11px] text-white tracking-widest uppercase">
                        {isUploadingImage ? 'PROCESSING FILE...' : 'SELECT & UPLOAD PICTURE'}
                      </span>
                      <span className="text-[9px] text-[#8e9192] mt-0.5">
                        Direct Local File Upload
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={isUploadingImage}
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {/* Or enter Direct URL */}
                  <div className="space-y-1">
                    <span className="block font-display text-[9px] uppercase tracking-widest text-[#8e9192]">
                      OR PASTE PICTURE URL / CDN LINK
                    </span>
                    <input
                      type="text"
                      value={formImageUrl}
                      onChange={(e) => setFormImageUrl(e.target.value)}
                      placeholder="https://... or uploaded image"
                      className="w-full bg-[#0e0e0e] border border-[#444748]/40 text-white text-xs px-3 py-2 font-mono focus:border-white focus:outline-none"
                    />
                    {formImageUrl && (
                      <button
                        type="button"
                        onClick={() => setFormImageUrl('')}
                        className="text-[10px] text-red-400 hover:underline uppercase font-mono"
                      >
                        [Clear Image]
                      </button>
                    )}
                  </div>
                </div>

                {/* Form Image Preview */}
                {formImageUrl && (
                  <div className="pt-2 border-t border-[#444748]/30 flex items-center gap-4">
                    <div className="w-24 h-16 border border-[#444748]/40 overflow-hidden bg-black flex-shrink-0">
                      <img
                        src={formImageUrl}
                        alt="Upload preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-[10px] text-[#8e9192] space-y-0.5">
                      <span className="text-white block font-display uppercase tracking-widest">
                        Image Attached & Verified
                      </span>
                      <span className="font-mono text-[9px] text-[#8e9192] break-all line-clamp-1">
                        {formImageUrl.startsWith('data:') ? 'Local Image Data Embedded (Base64)' : formImageUrl}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block font-display text-[10px] uppercase tracking-widest text-[#8e9192] mb-1">
                  TAGS (COMMA-SEPARATED)
                </label>
                <input
                  type="text"
                  value={formTags}
                  onChange={(e) => setFormTags(e.target.value)}
                  placeholder="e.g. Unity Engine, Blender 3D, ElevenLabs Audio, Survival Horror"
                  className="w-full bg-[#131313] border border-[#444748]/40 text-white text-xs px-3 py-2 font-mono"
                />
              </div>

              <div>
                <label className="block font-display text-[10px] uppercase tracking-widest text-[#8e9192] mb-1">
                  PRODUCT DESCRIPTION *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Comprehensive description of this game title or product..."
                  className="w-full bg-[#131313] border border-[#444748]/40 text-white text-xs p-3 font-mono"
                />
              </div>

              <div className="pt-4 border-t border-[#444748]/40 flex justify-end gap-3 font-display text-xs">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => setIsFormOpen(false)}
                  className="px-6 py-2.5 border border-[#444748]/40 text-[#8e9192] hover:text-white uppercase tracking-widest disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving || isUploadingImage}
                  className="px-6 py-2.5 bg-white text-black font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {isSaving && <span className="w-2 h-2 bg-black rounded-full animate-ping inline-block" />}
                  <span>{isSaving ? 'SAVING RECORD...' : 'Save Product Record'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT STUDIO INFO */}
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

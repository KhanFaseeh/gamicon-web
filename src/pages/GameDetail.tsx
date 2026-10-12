import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase, parseGameRecord, type Game } from '../lib/supabaseClient'

export default function GameDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [game, setGame] = useState<Game | null>(null)
  const [companionGames, setCompanionGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    async function loadGame() {
      if (!slug) {
        setLoading(false)
        return
      }

      setLoading(true)
      try {
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .eq('slug', slug)
          .single()

        if (!error && data) {
          setGame(parseGameRecord(data))

          // Fetch other parallel productions from Supabase
          const { data: others } = await supabase
            .from('games')
            .select('*')
            .neq('slug', slug)
            .limit(2)

          if (others) {
            setCompanionGames(others.map(parseGameRecord))
          }
        } else {
          setGame(null)
        }
      } catch (err) {
        console.warn('Game load error from Supabase', err)
        setGame(null)
      } finally {
        setLoading(false)
      }
    }
    loadGame()
  }, [slug])

  if (loading) {
    return (
      <div className="bg-[#050505] text-[#e5e2e1] min-h-screen flex flex-col justify-between selection:bg-white selection:text-black font-sans">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4">
          <span className="w-2 h-2 bg-white animate-ping" />
          <span className="font-display text-xs tracking-widest text-[#8e9192] uppercase">
            CALIBRATING TRANSMISSION FREQUENCY...
          </span>
        </div>
        <Footer />
      </div>
    )
  }

  if (!game) {
    return (
      <div className="bg-[#050505] text-[#e5e2e1] min-h-screen flex flex-col justify-between selection:bg-white selection:text-black font-sans">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-xl mx-auto space-y-6">
          <span className="font-mono text-[10px] text-[#8e9192] uppercase tracking-widest border border-[#444748]/40 px-3 py-1">
            ERROR // CODE 404
          </span>
          <h1 className="font-display text-4xl sm:text-6xl uppercase text-white tracking-tight">
            SIGNAL LOST
          </h1>
          <p className="font-mono text-xs text-[#8e9192] uppercase leading-relaxed tracking-wider">
            NO ACTIVE TRANSMISSION RECORD FOR SPECIFIED IDENTIFIER [{slug || 'UNKNOWN'}]. VERIFY ARCHIVE VIA CMS ADMIN.
          </p>
          <div className="pt-4 flex gap-4">
            <Link
              to="/#games"
              className="px-6 py-2.5 border border-white bg-white text-black font-display text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors font-bold"
            >
              ← Catalog
            </Link>
            <Link
              to="/admin"
              className="px-6 py-2.5 border border-[#444748]/60 text-white font-display text-xs uppercase tracking-widest hover:border-white transition-colors"
            >
              CMS Admin
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const currentImage = game.image_url || ''

  return (
    <div className="bg-[#050505] text-[#e5e2e1] antialiased min-h-screen selection:bg-white selection:text-black">
      <Header />

      {/* =========================================================================
             HERO CINEMATIC KEYFRAME (Full High-Resolution Image Presentation)
             ========================================================================= */}
      <section className="relative w-full h-[85vh] bg-[#050505] flex flex-col justify-between overflow-hidden pt-20" id="hero-display">
        {/* Backdrop Image */}
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.15]"
            alt={`${game.title} visual artwork`}
            src={currentImage}
          />
          {/* Top and bottom letterbox falloff */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-transparent to-[#050505] pointer-events-none" />
        </div>

        {/* Letterbox Upper Telemetry Strip */}
        <div className="relative z-10 w-full px-6 md:px-16 pt-6 flex justify-between items-start pointer-events-none">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-white rounded-none inline-block animate-pulse" />
              <span className="font-display text-[10px] text-white tracking-widest uppercase">
                EXHIBITION // VISUAL ARCHIVE // {game.slug.toUpperCase()}
              </span>
            </div>
            <span className="font-display text-[10px] text-neutral-400">
              PLATFORM // GAMICON PRODUCTION ARCHIVE
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-4 text-right">
            <span className="font-display text-[10px] text-neutral-400 border border-[#444748]/30 px-2 py-1">
              21:9 RATIO
            </span>
            <span className="font-display text-[10px] text-white border border-white/50 px-2 py-1">
              AUTEUR PRODUCTION
            </span>
          </div>
        </div>

        {/* Center Title Badge */}
        <div className="relative z-10 self-center my-auto flex flex-col items-center text-center px-4">
          <span className="px-3 py-1 bg-black/60 border border-[#444748]/60 text-white font-display text-[10px] uppercase tracking-widest mb-3">
            TITLE SPECIFICATION
          </span>
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase text-white tracking-tight drop-shadow-md">
            {game.title}
          </h1>
        </div>

        {/* Lower Telemetry Strip */}
        <div className="relative z-10 w-full px-6 md:px-16 pb-8 flex justify-between items-center text-[10px] font-display text-neutral-400 uppercase tracking-widest border-t border-[#444748]/30 pt-4">
          <span>STATUS // PRODUCTION VERIFIED</span>
          <a href="#dossier" className="text-white hover:underline flex items-center gap-1">
            EXPLORE SPECIFICATIONS <span className="material-symbols-outlined text-sm">south</span>
          </a>
        </div>
      </section>

      {/* =========================================================================
             HIGH-CONTRAST EXHIBITION GALLERY TRANSITION (Pristine White Canvas)
             ========================================================================= */}
      <main className="w-full bg-[#FFFFFF] text-[#0A0A0A] py-16 md:py-28 px-6 md:px-16 transition-colors duration-200" id="dossier">
        <div className="max-w-7xl mx-auto">
          {/* Monolithic Header Row */}
          <div className="border-b border-[#E5E5E5] pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="font-display text-[10px] text-[#737373] tracking-widest uppercase mb-2">
                ARCHIVE // PRODUCT DOSSIER // {game.slug.toUpperCase()}
              </div>
              <h2 className="font-display text-4xl sm:text-6xl md:text-8xl tracking-tighter uppercase font-light text-[#0A0A0A] leading-none">
                {game.title}
              </h2>
            </div>
            <div className="text-left md:text-right">
              <span className="font-display text-xs text-[#0A0A0A] tracking-widest uppercase block">
                {game.release_date || 'ACTIVE DEVELOPMENT'}
              </span>
              <span className="font-display text-[10px] text-[#737373] uppercase tracking-widest">
                Target Release Window
              </span>
            </div>
          </div>

          {/* Distinct 2-Column Info Exhibition Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* LEFT COLUMN: Technical Spec Sheet, Identity Anchors, Actions */}
            <div className="lg:col-span-5 flex flex-col space-y-12">
              {/* Spec Sheet */}
              <div className="w-full">
                <div className="font-display text-[10px] text-[#737373] tracking-widest uppercase border-b border-[#E5E5E5] pb-3 mb-4">
                  TECHNICAL SPECIFICATIONS
                </div>
                <dl className="divide-y divide-[#F0F0F0] text-sm">
                  <div className="py-3 flex justify-between items-baseline">
                    <dt className="font-display text-[10px] text-[#737373] uppercase">Platforms</dt>
                    <dd className="font-display text-[10px] text-[#0A0A0A] text-right uppercase">
                      PC • Next-Gen Platforms
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between items-baseline">
                    <dt className="font-display text-[10px] text-[#737373] uppercase">Engine & Art</dt>
                    <dd className="font-display text-[10px] text-[#0A0A0A] text-right uppercase">
                      Unity Engine // Assets in Blender
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between items-baseline">
                    <dt className="font-display text-[10px] text-[#737373] uppercase">Performance Target</dt>
                    <dd className="font-display text-[10px] text-[#0A0A0A] text-right">
                      60 - 120 FPS Target / Native 4K
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between items-baseline">
                    <dt className="font-display text-[10px] text-[#737373] uppercase">Leadership</dt>
                    <dd className="font-display text-[10px] text-[#0A0A0A] text-right uppercase">
                      Mian Faseeh Ur Rehman (CEO) & Muhammad Tayyab (Partner)
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between items-baseline">
                    <dt className="font-display text-[10px] text-[#737373] uppercase">Audio Pipeline</dt>
                    <dd className="font-display text-[10px] text-[#0A0A0A] text-right uppercase">
                      ElevenLabs Audio & Spatial 3D Sound
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Exhibition Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#E5E5E5]">
                <Link
                  to="/press#contact"
                  className="w-full sm:w-auto text-center border border-[#0A0A0A] bg-[#0A0A0A] text-[#FFFFFF] hover:bg-transparent hover:text-[#0A0A0A] px-8 py-4 font-display text-xs uppercase tracking-widest transition-all duration-150 font-bold"
                >
                  Contact Studio
                </Link>
                <Link
                  to="/#games"
                  className="w-full sm:w-auto text-center border border-[#CCCCCC] bg-transparent text-[#0A0A0A] hover:border-[#0A0A0A] px-8 py-4 font-display text-xs uppercase tracking-widest transition-all duration-150 flex items-center justify-center space-x-2"
                >
                  <span>All Products</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>

              {/* Studio Production Stamp */}
              <div className="p-6 bg-[#FAFAFA] border border-[#EEEEEE] flex items-start space-x-4">
                <span className="material-symbols-outlined text-[#737373] mt-0.5">verified</span>
                <div>
                  <div className="font-display text-[10px] text-[#0A0A0A] uppercase tracking-widest mb-1">
                    AUTEUR DISPATCH
                  </div>
                  <p className="text-xs text-[#737373] leading-relaxed">
                    Designed for total tactile player agency, high physical fidelity, and uncompromising atmospheric immersion.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Curated Provenance Description & Tags */}
            <div className="lg:col-span-7 flex flex-col space-y-16 lg:pl-8">
              {/* Curated Lead Description */}
              <div className="space-y-6">
                <div className="font-display text-[10px] text-[#737373] tracking-widest uppercase">
                  PRODUCT SYNOPSIS & VISION
                </div>
                <p className="text-lg md:text-xl text-[#171717] font-light leading-relaxed">
                  {game.description}
                </p>
              </div>

              {/* Tags List */}
              {game.tags && game.tags.length > 0 && (
                <div className="space-y-4">
                  <div className="font-display text-[10px] text-[#737373] tracking-widest uppercase border-b border-[#E5E5E5] pb-3">
                    CORE SYSTEM TAGS
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {game.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="border border-[#CCCCCC] px-3 py-1 text-xs font-display uppercase tracking-widest text-[#0A0A0A]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}


            </div>
          </div>
        </div>
      </main>

      {/* =========================================================================
             COMPANION GALLERY ARCHIVE (Bottom Showcase - From Supabase)
             ========================================================================= */}
      {companionGames.length > 0 && (
        <section className="w-full bg-[#050505] py-20 px-6 md:px-16 border-t border-[#444748]/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#444748]/30 pb-6 gap-4">
              <div>
                <div className="font-display text-[10px] text-neutral-500 tracking-widest uppercase mb-1">
                  PARALLEL PRODUCTIONS
                </div>
                <h2 className="font-display text-3xl font-light text-white tracking-tight">
                  COMPANION ARCHIVE
                </h2>
              </div>
              <div className="font-display text-[10px] text-neutral-400 tracking-widest uppercase">
                INDEX: {companionGames.length} TITLES LOGGED
              </div>
            </div>

            {/* Bento Showcase Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {companionGames.map((comp) => (
                <article
                  key={comp.slug}
                  className="bg-[#0A0A0A] border border-[#444748]/30 hover:border-white transition-all duration-150 flex flex-col group"
                >
                  <div className="relative aspect-video overflow-hidden border-b border-[#444748]/30 bg-[#1c1b1b]">
                    {comp.image_url ? (
                      <img
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                        alt={comp.title}
                        src={comp.image_url}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs text-[#8e9192]">
                        NO IMAGE ATTACHED
                      </div>
                    )}
                    <div className="absolute top-4 left-4 font-display text-[10px] text-white bg-[#050505]/80 px-2 py-1 border border-[#444748]/30">
                      {comp.tags?.[0] || 'PRODUCTION'}
                    </div>
                  </div>
                  <div className="p-8 flex flex-col flex-grow justify-between space-y-6">
                    <div className="space-y-2">
                      <div className="font-display text-[10px] text-neutral-500 tracking-widest uppercase">
                        RELEASE // {comp.release_date || 'TBD'}
                      </div>
                      <h3 className="font-display text-2xl font-normal text-white tracking-tight">
                        {comp.title}
                      </h3>
                      <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3">
                        {comp.description}
                      </p>
                    </div>
                    <Link
                      to={`/game/${comp.slug}`}
                      className="pt-4 border-t border-[#444748]/20 flex items-center justify-between font-display text-[10px] text-neutral-400 group-hover:text-white transition-colors"
                    >
                      <span>EXPLORE DOSSIER</span>
                      <span className="material-symbols-outlined text-base">east</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  )
}

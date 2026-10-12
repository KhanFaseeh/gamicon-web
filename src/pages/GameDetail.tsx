import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase, type Game } from '../lib/supabaseClient'

const FALLBACK_GAMES: Record<string, {
  game: Game
  engine: string
  platforms: string
  director: string
  audio: string
  heroImage: string
  galleryImages: string[]
  tenets: { num: string; title: string; desc: string }[]
  companions: { title: string; slug: string; year: string; genre: string; desc: string; img: string }[]
}> = {
  'echoes-of-desolation': {
    game: {
      id: '1',
      title: 'Echoes of Desolation',
      slug: 'echoes-of-desolation',
      release_date: '2025-10-31',
      image_url:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBPDot2E_OV1D-vLdPARlhiiTmL9DFIXeS6qb3wDjw3xfq_Z0Qv-L8rIwrPl6bp88_emkbMejDOSSqzrnTWCVwKOSqSl6EDYPR3TmqFJOjJ8HaOoLzPENJsk2Q95af_QeQYCI4gknuBfg4BX35f_Hj08zKBE7-aVwtTUw7IflkFe1-QqQRZ7XVxbdb3VREFZAdTQhCBvcRq_XzhUdugkokgLlEljJVq093KrwA_9vSe-HPPj1vSAVVv',
      description:
        'Following classified reports of illegal human experimentation inside Elysium Asylum, a lone detective enters the facility to uncover the truth. Trapped within its walls alongside patients mutated into grotesque monsters, you must fight through the horrors of the ward, confront the mutated mastermind Dr. Voss, and survive long enough to escape.',
      tags: ['Survival Horror', 'Action', 'Single-Player'],
    },
    engine: 'Unreal Engine 5.4 Lumen / Nanite Pipeline',
    platforms: 'PC • PlayStation 5 • Xbox Series X',
    director: 'Gamicon Core Unit // Direction',
    audio: 'Spatial Ambisonics 3D Object Audio & Heartbeat Feedback',
    heroImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBPDot2E_OV1D-vLdPARlhiiTmL9DFIXeS6qb3wDjw3xfq_Z0Qv-L8rIwrPl6bp88_emkbMejDOSSqzrnTWCVwKOSqSl6EDYPR3TmqFJOjJ8HaOoLzPENJsk2Q95af_QeQYCI4gknuBfg4BX35f_Hj08zKBE7-aVwtTUw7IflkFe1-QqQRZ7XVxbdb3VREFZAdTQhCBvcRq_XzhUdugkokgLlEljJVq093KrwA_9vSe-HPPj1vSAVVv',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida/AEtjO1W8l1YFBtH3X_E6WY4GiitT_RiPH7iW_0qgptlmrSoiJlCDizxfzPe_pKkQ74OO4aeaCBUxJ1tcaohW4f8bv2EuPO7vC2vJArRHJlcFt_9NBqdWTQSKw8LMOmJbOagJYNhEOzrPgAP3Q5OXc4lOtxJ48ySUKuXWGRauto2aDR8ERVxBO7mZ6AWbbF2-sqh81Yt7aql18eMW6NSwwxD42RDuIQSjKPGKqAvoPs5ZtxyJP54Rx8f2VL9FJ2c',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCkKPggWPasFAWGnfXcSt2AbgsrEmshC7EkE1aMz4BH8bVu3fEWLEwlgH2HQiKA_ArCsLrAI0NbhgsBEC2avH8nuLCERIhvjRArI0aFNEjsc-p1VEibvCZQSN4TLDu4EtXvBs00-eHSsa-hQz7oPI012vI-6bXqG5EKkLIjfI-A3fbAxxFTmT9a3uF4vIpcsNq2CLBNZcNQFWNayt02rgtdLsCFdSJjTTZU0gVDhFE17egvrsLye3Ns',
    ],
    tenets: [
      {
        num: '01',
        title: 'Claustrophobic Resource Scarcity',
        desc: 'Every syringe, flashlight battery, and round of ammunition counts. Resource desperation directly influences panic parameters.',
      },
      {
        num: '02',
        title: 'Grotesque Behavioral AI',
        desc: 'Mutated ward patients track acoustic footprints, broken glass, and weapon chamber clicks rather than scripted patrol loops.',
      },
      {
        num: '03',
        title: 'Dr. Voss Mastermind Encounters',
        desc: 'Uncompromising multi-stage psychological and biological confrontation demanding acute situational awareness and agility.',
      },
    ],
    companions: [
      {
        title: 'Ashes of Escape',
        slug: 'ashes-of-escape',
        year: '2026',
        genre: 'ACTION SURVIVAL',
        desc: 'A relentless gauntlet across three distinct, hostile environments. Carve a path to extraction.',
        img: 'https://lh3.googleusercontent.com/aida/AEtjO1UJMRZzH5hkjwGYbhPftm1WQxBVgPZhhN-1HNr-hozj8Rwg67e0k9Hu6kaiMr1EHPHAeqq5bTM6kVLpri8Sv3bVG76Xc6ksXCwe8ZGzpyPu8y050ns3BjCQpo5oPvLJGXrxbuWhGihn3V5eUYn_aUZpcvSHAXc7SkkaXR0ncFL47P4S-Pf74EEFu2GT5BFFyPU7hoPg14OUNZNJDFRX-vbpMa_62lIMqfPSdXqchfq_kXD593V3jfhVarw',
      },
    ],
  },
  'ashes-of-escape': {
    game: {
      id: '2',
      title: 'Ashes of Escape',
      slug: 'ashes-of-escape',
      release_date: '2026-03-15',
      image_url:
        'https://lh3.googleusercontent.com/aida/AEtjO1UJMRZzH5hkjwGYbhPftm1WQxBVgPZhhN-1HNr-hozj8Rwg67e0k9Hu6kaiMr1EHPHAeqq5bTM6kVLpri8Sv3bVG76Xc6ksXCwe8ZGzpyPu8y050ns3BjCQpo5oPvLJGXrxbuWhGihn3V5eUYn_aUZpcvSHAXc7SkkaXR0ncFL47P4S-Pf74EEFu2GT5BFFyPU7hoPg14OUNZNJDFRX-vbpMa_62lIMqfPSdXqchfq_kXD593V3jfhVarw',
      description:
        'A relentless gauntlet across three distinct, hostile environments. Fight through waves of enemies across shifting combat zones and carve a path to extraction before you are overrun.',
      tags: ['Action', 'Combat', 'Survival'],
    },
    engine: 'Gamicon High-Throughput Combat Framework',
    platforms: 'PC • Next-Gen Platforms',
    director: 'Gamicon Combat Systems Unit',
    audio: 'Dynamic Multi-Zone Combat Mix Profile',
    heroImage:
      'https://lh3.googleusercontent.com/aida/AEtjO1UJMRZzH5hkjwGYbhPftm1WQxBVgPZhhN-1HNr-hozj8Rwg67e0k9Hu6kaiMr1EHPHAeqq5bTM6kVLpri8Sv3bVG76Xc6ksXCwe8ZGzpyPu8y050ns3BjCQpo5oPvLJGXrxbuWhGihn3V5eUYn_aUZpcvSHAXc7SkkaXR0ncFL47P4S-Pf74EEFu2GT5BFFyPU7hoPg14OUNZNJDFRX-vbpMa_62lIMqfPSdXqchfq_kXD593V3jfhVarw',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCHN47rmROJicK9klFUzbZOudT2MB8wkdW4Sc5lg89-Fa7pHTtPM21oWvvq1ruet7SAZMoFjmpDBK3ohT8Y64Cy3VlG1m9VFmeNuKplkRrlTDNlj0w1NFAgUSwqzpwEwPy5RgQdlQvsilgrNaxUjKoJF4cRalK9CuKuWtsLkZpjkhCJNROTziIe65CYgf2Nl9NhSeg2xywl_-erVzbEE308FLHVOm655w5ArTikC_UYtesRwz1Dh8i5',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBUqrBiEbtQ9z9K5SEojag5pJIoM2QysO2Slf7Fzm7-m-jHdleNbpGaEiGCJUyR9yCJUuqwiFDLzeZm2QWTc1atIxMay_vT3mpX4WJp32ab5efbwQxMOfDZ-Fgol9Fie8r5NzJ40fV8VNeHV9a7DMzDc4zVqnigDsxw64XSRUGfBOGdk3CCLdlurwanYP_0lzqRD8WoK6Rp68Bu1M64pkTlSXfxB8NqhYKVJEa8rWtLG2eWy-anw7iJ',
    ],
    tenets: [
      {
        num: '01',
        title: 'Tri-Environment Gauntlet',
        desc: 'Adapt to three hostile, visually distinct ecosystems each requiring unique loadout discipline and threat prioritization.',
      },
      {
        num: '02',
        title: 'Wave Dynamics & Shifting Zones',
        desc: 'Defensive positions deteriorate under relentless assaults, forcing fluid repositioning and rapid tactical improvisation.',
      },
      {
        num: '03',
        title: 'High-Stakes Extraction Protocol',
        desc: 'Reaching extraction beacon triggers maximum escalation where disciplined timing separates survival from annihilation.',
      },
    ],
    companions: [
      {
        title: 'Echoes of Desolation',
        slug: 'echoes-of-desolation',
        year: '2025',
        genre: 'SURVIVAL HORROR',
        desc: 'Trapped inside Elysium Asylum with mutated monsters. Confront Dr. Voss and survive.',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPDot2E_OV1D-vLdPARlhiiTmL9DFIXeS6qb3wDjw3xfq_Z0Qv-L8rIwrPl6bp88_emkbMejDOSSqzrnTWCVwKOSqSl6EDYPR3TmqFJOjJ8HaOoLzPENJsk2Q95af_QeQYCI4gknuBfg4BX35f_Hj08zKBE7-aVwtTUw7IflkFe1-QqQRZ7XVxbdb3VREFZAdTQhCBvcRq_XzhUdugkokgLlEljJVq093KrwA_9vSe-HPPj1vSAVVv',
      },
    ],
  },
}

export default function GameDetail() {
  const { slug } = useParams<{ slug: string }>()
  const activeSlug = slug || 'echoes-of-desolation'
  const fallback = FALLBACK_GAMES[activeSlug] || FALLBACK_GAMES['echoes-of-desolation']

  const [game, setGame] = useState<Game>(fallback.game)

  useEffect(() => {
    window.scrollTo(0, 0)
    async function loadGame() {
      try {
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .eq('slug', activeSlug)
          .single()

        if (!error && data) {
          setGame(data as Game)
        }
      } catch (err) {
        console.warn('Game load error or offline, fallback used', err)
      }
    }
    loadGame()
  }, [activeSlug])

  const currentImage = game.image_url || fallback.heroImage

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
              SOURCE: {fallback.engine} (HIGH RESOLUTION DISPLAY)
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
                {game.release_date}
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
                    <dd className="font-display text-[10px] text-[#0A0A0A] text-right">
                      {fallback.platforms}
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between items-baseline">
                    <dt className="font-display text-[10px] text-[#737373] uppercase">Engine</dt>
                    <dd className="font-display text-[10px] text-[#0A0A0A] text-right">
                      {fallback.engine}
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between items-baseline">
                    <dt className="font-display text-[10px] text-[#737373] uppercase">Performance Target</dt>
                    <dd className="font-display text-[10px] text-[#0A0A0A] text-right">
                      60 - 120 FPS Target / Native 4K
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between items-baseline">
                    <dt className="font-display text-[10px] text-[#737373] uppercase">Director</dt>
                    <dd className="font-display text-[10px] text-[#0A0A0A] text-right">
                      {fallback.director}
                    </dd>
                  </div>
                  <div className="py-3 flex justify-between items-baseline">
                    <dt className="font-display text-[10px] text-[#737373] uppercase">Audio Pipeline</dt>
                    <dd className="font-display text-[10px] text-[#0A0A0A] text-right">
                      {fallback.audio}
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

            {/* RIGHT COLUMN: Curated Provenance Description & Core Tenets */}
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

              {/* Core Tenets / Structured Feature List */}
              <div className="space-y-10">
                <div className="font-display text-[10px] text-[#737373] tracking-widest uppercase border-b border-[#E5E5E5] pb-3">
                  CORE TENETS // SYSTEM ARCHITECTURE
                </div>
                <div className="space-y-8">
                  {fallback.tenets.map((tenet, idx) => (
                    <div key={tenet.num}>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                        <div className="md:col-span-4">
                          <div className="flex items-center space-x-3">
                            <span className="font-display text-[10px] text-[#737373] tracking-widest">
                              {tenet.num}
                            </span>
                            <h3 className="font-display text-xl font-normal text-[#0A0A0A] tracking-tight">
                              {tenet.title}
                            </h3>
                          </div>
                        </div>
                        <div className="md:col-span-8">
                          <p className="text-sm text-[#525252] leading-relaxed">{tenet.desc}</p>
                        </div>
                      </div>
                      {idx < fallback.tenets.length - 1 && (
                        <div className="w-full h-[1px] bg-[#EEEEEE] mt-8" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Critical Quote Banner (Edge Magazine) */}
              <div className="border-l-2 border-[#0A0A0A] pl-8 py-6 my-8 bg-[#FAFAFA]/70">
                <blockquote className="font-display text-2xl md:text-3xl text-[#0A0A0A] font-light leading-snug tracking-tight mb-4">
                  “Gamicon pushes visual fidelity and combat precision to an unprecedented indie standard.”
                </blockquote>
                <cite className="font-display text-[10px] text-[#737373] uppercase tracking-widest block not-italic">
                  — Edge Magazine (Dispatch // Issue 391)
                </cite>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* =========================================================================
             COMPANION GALLERY ARCHIVE (Bottom Showcase)
             ========================================================================= */}
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
              INDEX: {fallback.companions.length} TITLES LOGGED
            </div>
          </div>

          {/* Bento Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fallback.companions.map((comp) => (
              <article
                key={comp.slug}
                className="bg-[#0A0A0A] border border-[#444748]/30 hover:border-white transition-all duration-150 flex flex-col group"
              >
                <div className="relative aspect-video overflow-hidden border-b border-[#444748]/30">
                  <img
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                    alt={comp.title}
                    src={comp.img}
                  />
                  <div className="absolute top-4 left-4 font-display text-[10px] text-white bg-[#050505]/80 px-2 py-1 border border-[#444748]/30">
                    {comp.genre}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow justify-between space-y-6">
                  <div className="space-y-2">
                    <div className="font-display text-[10px] text-neutral-500 tracking-widest uppercase">
                      RELEASE // {comp.year}
                    </div>
                    <h3 className="font-display text-2xl font-normal text-white tracking-tight">
                      {comp.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">{comp.desc}</p>
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

      <Footer />
    </div>
  )
}

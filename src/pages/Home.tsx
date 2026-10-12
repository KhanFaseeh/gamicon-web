import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase, type Game } from '../lib/supabaseClient'

// Curated showcase products with image and description focus
const DEFAULT_GAMES: Game[] = [
  {
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
  {
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
]

export default function Home() {
  const [games, setGames] = useState<Game[]>(DEFAULT_GAMES)
  const [emailInput, setEmailInput] = useState('')
  const [subscribeStatus, setSubscribeStatus] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGames() {
      try {
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .order('release_date', { ascending: false })

        if (!error && data && data.length > 0) {
          setGames(data as Game[])
        }
      } catch (err) {
        console.warn('Supabase fetch returned error or offline, displaying curated showcase', err)
      }
    }
    fetchGames()
  }, [])

  const handlePlaytestSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailInput) return
    setSubscribeStatus('TRANSMISSION RECEIVED // CLEARANCE PENDING ENCRYPTION')
    setEmailInput('')
    setTimeout(() => {
      setSubscribeStatus(null)
    }, 6000)
  }

  const game1 = games[0] || DEFAULT_GAMES[0]
  const game2 = games[1] || DEFAULT_GAMES[1]

  return (
    <div className="bg-[#0e0e0e] text-[#e5e2e1] min-h-screen font-sans selection:bg-white selection:text-black">
      <Header />

      {/* HERO SECTION: FULL BLEED CINEMATIC IMMERSION */}
      <section className="relative min-h-screen w-full flex flex-col justify-between pt-20 overflow-hidden bg-[#0e0e0e]">
        {/* Ambient Edge Backdrop with Deep Vignette */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center filter saturate-75 brightness-75 scale-105 transition-transform duration-1000 ease-out"
            style={{
              backgroundImage: `url('${game1.image_url || DEFAULT_GAMES[0].image_url}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-[#0e0e0e]/60 to-[#0e0e0e]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0e]/90 via-transparent to-[#0e0e0e]/90" />
        </div>

        {/* Telemetry Overhead Bar */}
        <div className="relative z-10 w-full px-6 md:px-16 pt-8 flex justify-between items-center text-[#8e9192] font-display text-[11px] tracking-widest">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-white" />
            <span>LAT 45.5017° N // LON 73.5673° W</span>
          </div>
          <div className="hidden sm:block">
            <span>ARCHIVE REF: GMCN-AUTEUR-00</span>
          </div>
        </div>

        {/* Centered Hero Focal Hierarchy */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 my-auto text-center flex flex-col items-center">
          <div className="inline-block border border-[#444748]/60 px-4 py-1 mb-8">
            <span className="font-display text-[11px] tracking-widest uppercase text-[#c7c6c6]">
              GAMICON / INDEPENDENT AUTEUR PRODUCTION
            </span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl uppercase text-white tracking-tight max-w-5xl leading-none">
            Crafting Uncompromising Indie Experiences
          </h1>

          <p className="mt-8 text-base md:text-xl text-[#c4c7c8] max-w-2xl font-light leading-relaxed">
            We architect unforgiving worlds for players who demand mastery. High visual fidelity, physics, and visceral narrative design.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#games"
              className="border border-white px-8 py-3 font-display text-xs tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all duration-150 ease-linear"
            >
              Explore Products
            </a>
            <Link
              to={`/game/${game1.slug}`}
              className="border border-[#444748]/60 px-8 py-3 font-display text-xs tracking-widest uppercase text-[#c7c6c6] hover:text-white hover:border-white transition-all duration-150 ease-linear"
            >
              View Flagship Dossier
            </Link>
          </div>
        </div>

        {/* Hero Base Telemetry Footer Indicator */}
        <div className="relative z-10 w-full px-6 md:px-16 pb-8 flex justify-between items-end text-[#8e9192] border-t border-[#444748]/20 pt-4">
          <div className="font-display text-[10px] tracking-widest">
            <span>EST. 2019 // MONTREAL LAB</span>
          </div>
          <a
            href="#games"
            className="flex items-center gap-1 font-display text-[10px] uppercase tracking-widest text-[#c7c6c6] hover:text-white transition-colors duration-150"
          >
            <span>DISCOVER WORKS</span>
            <span className="material-symbols-outlined text-sm">south</span>
          </a>
          <div className="font-display text-[10px] tracking-widest hidden sm:block">
            <span>100% INDEPENDENT PRODUCTION</span>
          </div>
        </div>
      </section>

      {/* STATEMENT INTERLUDE */}
      <section className="border-y border-[#444748]/20 bg-[#131313] py-16 px-6 md:px-16">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
          <div className="space-y-2 max-w-2xl">
            <span className="font-display text-[10px] uppercase tracking-widest text-[#8e9192]">
              STUDIO PHILOSOPHY
            </span>
            <p className="font-display text-xl md:text-2xl text-white font-normal leading-relaxed">
              "Gamicon is an independent studio forging mechanics-driven, narrative-rich titles built without creative compromise. We architect unforgiving worlds for players who demand mastery."
            </p>
          </div>
          <div className="flex flex-col gap-1 text-left md:text-right border-l md:border-l-0 md:border-r border-[#444748]/40 pl-4 md:pl-0 md:pr-4">
            <span className="font-display text-5xl text-white font-light">28</span>
            <span className="font-display text-[10px] text-[#8e9192] tracking-widest uppercase">
              Engineers & Artists
            </span>
          </div>
        </div>
      </section>

      {/* SHOWCASE SECTION 1: PRODUCT ARCHIVE 01 */}
      {game1 && (
        <section className="py-20 md:py-28 px-6 md:px-16 border-b border-[#444748]/20" id="games">
          <div className="max-w-7xl mx-auto">
            {/* Section Tag & Index */}
            <div className="flex justify-between items-baseline mb-4 border-b border-[#444748]/20 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white" />
                <span className="font-display text-xs uppercase tracking-widest text-white">
                  PRODUCT ARCHIVE // 01
                </span>
              </div>
              <span className="font-display text-xs text-[#8e9192] uppercase tracking-widest">
                {game1.tags?.[0] || 'SURVIVAL HORROR'}
              </span>
            </div>

            {/* Cinematic Image Frame */}
            <Link
              to={`/game/${game1.slug}`}
              className="block relative w-full aspect-[21/9] md:aspect-[2.35/1] overflow-hidden border border-[#444748]/40 bg-[#1c1b1b] group"
            >
              <img
                alt={`${game1.title} key art`}
                className="w-full h-full object-cover object-center filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                src={game1.image_url || DEFAULT_GAMES[0].image_url}
              />

              {/* Telemetry HUD Inset */}
              <div className="absolute top-4 left-4 pointer-events-none">
                <div className="inline-flex items-center gap-2 bg-[#0e0e0e]/80 backdrop-blur-sm border border-[#444748]/40 px-3 py-1">
                  <span className="inline-block w-2 h-2 bg-white animate-pulse" />
                  <span className="font-display text-[10px] text-white uppercase tracking-widest">
                    ACTIVE PROJECT
                  </span>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 pointer-events-none hidden md:block">
                <span className="font-display text-[10px] text-[#c4c7c8]/80 bg-[#0e0e0e]/80 backdrop-blur-sm px-3 py-1 border border-[#444748]/30 uppercase">
                  ATMOSPHERIC HORROR // HIGH VISUAL FIDELITY
                </span>
              </div>
            </Link>

            {/* Dossier & Detail Technical Grid */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <span className="font-display text-xs text-[#8e9192] tracking-widest uppercase">
                  PRODUCTION 01
                </span>
                <h2 className="font-display text-3xl md:text-5xl uppercase text-white mt-1 mb-4 tracking-tight">
                  {game1.title}
                </h2>
                <p className="text-base md:text-lg text-[#c4c7c8] font-light leading-relaxed max-w-2xl">
                  {game1.description}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    to={`/game/${game1.slug}`}
                    className="border border-white bg-white text-black px-6 py-2.5 font-display text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all duration-150 inline-block font-bold"
                  >
                    View Full Product Dossier →
                  </Link>
                </div>
              </div>

              {/* Technical Telemetry Columns */}
              <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#444748]/30 pt-6 lg:pt-0 lg:pl-8 space-y-4 font-display text-xs">
                <div className="flex justify-between items-center py-2 border-b border-[#444748]/20">
                  <span className="uppercase tracking-widest text-[#8e9192]">RELEASE TIMELINE</span>
                  <span className="uppercase tracking-widest text-white">{game1.release_date}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#444748]/20">
                  <span className="uppercase tracking-widest text-[#8e9192]">GENRE & TAGS</span>
                  <span className="uppercase tracking-widest text-white">{game1.tags?.join(' • ') || 'ACTION'}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#444748]/20">
                  <span className="uppercase tracking-widest text-[#8e9192]">STUDIO DIVISION</span>
                  <span className="uppercase tracking-widest text-white">GAMICON CORE LAB</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#444748]/20">
                  <span className="uppercase tracking-widest text-[#8e9192]">EXPERIENCE</span>
                  <span className="uppercase tracking-widest text-white">NARRATIVE SURVIVAL HORROR</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SHOWCASE SECTION 2: PRODUCT ARCHIVE 02 */}
      {game2 && (
        <section className="py-20 md:py-28 px-6 md:px-16 border-b border-[#444748]/20 bg-[#131313]">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-baseline mb-4 border-b border-[#444748]/20 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white" />
                <span className="font-display text-xs uppercase tracking-widest text-white">
                  PRODUCT ARCHIVE // 02
                </span>
              </div>
              <span className="font-display text-xs text-[#8e9192] uppercase tracking-widest">
                {game2.tags?.[0] || 'ACTION COMBAT SURVIVAL'}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Towering Key Visual Side */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <Link
                  to={`/game/${game2.slug}`}
                  className="block relative w-full aspect-[16/10] overflow-hidden border border-[#444748]/40 bg-[#1c1b1b] group"
                >
                  <img
                    alt={`${game2.title} key visual`}
                    className="w-full h-full object-cover filter contrast-125 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    src={game2.image_url || DEFAULT_GAMES[1].image_url}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="font-display text-[10px] text-white uppercase tracking-widest bg-[#0e0e0e]/90 px-3 py-1 border border-[#444748]/40">
                      TACTICAL SURVIVAL
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="font-display text-[10px] text-[#8e9192] uppercase tracking-widest">
                      GAUNTLET EXTRACTION PROTOCOL
                    </span>
                  </div>
                </Link>
              </div>

              {/* Editorial Dossier Side */}
              <div className="lg:col-span-5 order-1 lg:order-2 space-y-4">
                <span className="font-display text-xs text-[#8e9192] tracking-widest uppercase">
                  PRODUCTION 02
                </span>
                <h2 className="font-display text-3xl md:text-5xl uppercase text-white tracking-tight">
                  {game2.title}
                </h2>
                <div className="w-12 h-0.5 bg-white" />
                <p className="text-base md:text-lg text-[#c4c7c8] font-light leading-relaxed">
                  {game2.description}
                </p>

                {/* Technical Spec List */}
                <div className="pt-4 space-y-2 border-t border-[#444748]/20 font-display text-xs">
                  <div className="flex justify-between text-[#8e9192]">
                    <span>COMBAT ARCHITECTURE:</span>
                    <span className="text-white uppercase">WAVE DEFENSE & EXTRACTION</span>
                  </div>
                  <div className="flex justify-between text-[#8e9192]">
                    <span>ENVIRONMENTS:</span>
                    <span className="text-white uppercase">THREE HOSTILE BIOMES</span>
                  </div>
                  <div className="flex justify-between text-[#8e9192]">
                    <span>TAGS:</span>
                    <span className="text-white uppercase">{game2.tags?.join(' • ') || 'ACTION'}</span>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <Link
                    to={`/game/${game2.slug}`}
                    className="border border-white bg-white text-black px-6 py-2.5 font-display text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all duration-150 font-bold"
                  >
                    Explore Dossier →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* STUDIO MANIFESTO & TENETS */}
      <section className="py-20 md:py-36 px-6 md:px-16 bg-[#0e0e0e] border-b border-[#444748]/20" id="about">
        <div className="max-w-7xl mx-auto">
          {/* Studio Header */}
          <div className="mb-16 max-w-3xl">
            <span className="font-display text-xs uppercase tracking-widest text-[#8e9192]">
              STUDIO ETHOS & TENETS
            </span>
            <h2 className="font-display text-3xl md:text-5xl uppercase text-white mt-2 tracking-tight">
              ARCHITECTS OF VISCERAL INTERACTION
            </h2>
            <p className="mt-4 text-base md:text-lg text-[#c4c7c8] font-light">
              We reject automated formulas and safety-first design paradigms. Gamicon exists to create art with sharp edges.
            </p>
          </div>

          {/* Tenets Bento Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="border border-[#444748]/30 p-8 bg-[#131313]/40 flex flex-col justify-between hover:border-white/60 transition-colors duration-150">
              <div>
                <span className="font-display text-xs uppercase tracking-widest text-white block mb-6">
                  01 / MECHANICS FIRST
                </span>
                <h3 className="font-display text-2xl uppercase text-white mb-2 font-normal">
                  PHYSICAL INTEGRITY
                </h3>
                <p className="text-sm md:text-base text-[#c4c7c8] font-light leading-relaxed">
                  Physics, frame timing, and tactile responsiveness dictate design. We do not construct sets before proving the visceral integrity of the physical interaction loop.
                </p>
              </div>
              <div className="pt-8 mt-8 border-t border-[#444748]/20 text-[#8e9192] font-display text-[10px]">
                <span>PARAMETER: ZERO LATENCY TOLERANCE</span>
              </div>
            </div>

            <div className="border border-[#444748]/30 p-8 bg-[#131313]/40 flex flex-col justify-between hover:border-white/60 transition-colors duration-150">
              <div>
                <span className="font-display text-xs uppercase tracking-widest text-white block mb-6">
                  02 / NARRATIVE DEPTH
                </span>
                <h3 className="font-display text-2xl uppercase text-white mb-2 font-normal">
                  CONTEXTUAL IMMERSION
                </h3>
                <p className="text-sm md:text-base text-[#c4c7c8] font-light leading-relaxed">
                  Environmental storytelling without handholding. Player agency is earned through deductive literacy and contextual immersion rather than instructional tutorials.
                </p>
              </div>
              <div className="pt-8 mt-8 border-t border-[#444748]/20 text-[#8e9192] font-display text-[10px]">
                <span>PARAMETER: DIEGETIC DISCOVERY</span>
              </div>
            </div>

            <div className="border border-[#444748]/30 p-8 bg-[#131313]/40 flex flex-col justify-between hover:border-white/60 transition-colors duration-150">
              <div>
                <span className="font-display text-xs uppercase tracking-widest text-white block mb-6">
                  03 / COMMUNITY DRIVEN
                </span>
                <h3 className="font-display text-2xl uppercase text-white mb-2 font-normal">
                  OPEN PLAYTEST LOOPS
                </h3>
                <p className="text-sm md:text-base text-[#c4c7c8] font-light leading-relaxed">
                  Direct feedback loops via open developer builds. Transparent devlogs and direct player playtesting pipelines ensure genuine mechanical rigor.
                </p>
              </div>
              <div className="pt-8 mt-8 border-t border-[#444748]/20 text-[#8e9192] font-display text-[10px]">
                <span>PARAMETER: BI-WEEKLY COMMITS</span>
              </div>
            </div>
          </div>

          {/* Studio Lab Workstation Feature */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#444748]/30 bg-[#131313]/30">
            <div className="lg:col-span-7 h-full">
              <img
                alt="Gamicon Montreal Studio Lab Workstations"
                className="w-full h-full object-cover min-h-[360px] filter grayscale contrast-125"
                src="https://lh3.googleusercontent.com/aida/AEtjO1X8gVDzQKeN1xnNu8yH5hqMwFVSf2tgib-RrN4qRR4hYfMl1W1K84GlSKWbF0bCtfapCBy75RgVw9rATVOsigq89QNtmXDugvbaXFOC9wAq6I0iCDdcZcFx4jVjZhwbsp3B7bvutYI3lt0ZGkoF19qWlev-tk3rDCALHDrL8Et0daLsjCKEjSy9vr0fudlrSAaMt_g1GO8wLvg6Ua1DGh0Ss2NmAle4pFz2_R2WwvLr2qcyJh0haDvSHZ0"
              />
            </div>
            <div className="lg:col-span-5 p-8 space-y-4">
              <span className="font-display text-xs uppercase tracking-widest text-[#8e9192]">
                PHYSICAL FACILITY
              </span>
              <h3 className="font-display text-2xl uppercase text-white font-normal">
                MONTREAL STUDIO LAB
              </h3>
              <p className="text-sm md:text-base text-[#c4c7c8] font-light leading-relaxed">
                Our atelier houses high-throughput workstations, dedicated motion simulation gear, and localized build clusters. We maintain complete autonomy over every project developed.
              </p>
              <div className="pt-4 space-y-2 font-display text-xs text-[#8e9192] border-t border-[#444748]/20">
                <div className="flex justify-between">
                  <span>LOCATION:</span>
                  <span className="text-white">MONTREAL, QC (45.5017° N, 73.5673° W)</span>
                </div>
                <div className="flex justify-between">
                  <span>PERSONNEL:</span>
                  <span className="text-white">28 SPECIALISTS</span>
                </div>
                <div className="flex justify-between">
                  <span>CAPITALIZATION:</span>
                  <span className="text-white">100% SELF-OWNED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CRITICAL ACCLAIM & PRESS QUOTE STRIP */}
      <section className="py-20 px-6 md:px-16 border-b border-[#444748]/20 bg-[#131313]" id="press">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-[#8e9192]">
            <span className="material-symbols-outlined text-sm">star</span>
            <span className="font-display text-xs uppercase tracking-widest">CRITICAL DISPATCH</span>
            <span className="material-symbols-outlined text-sm">star</span>
          </div>
          <blockquote className="font-display text-2xl md:text-4xl text-white font-light uppercase tracking-tight leading-snug">
            "Gamicon pushes visual fidelity and combat precision to an unprecedented indie standard. Their titles showcase rare auteur audacity."
          </blockquote>
          <div className="pt-2">
            <span className="font-display text-xs text-[#8e9192] uppercase tracking-widest">
              EDGE MAGAZINE // ISSUE 391
            </span>
          </div>
        </div>
      </section>

      {/* PLAYTEST TERMINAL & SIGNUP */}
      <section className="py-20 md:py-28 px-6 md:px-16 bg-[#0e0e0e] border-b border-[#444748]/20" id="contact">
        <div className="max-w-4xl mx-auto border border-[#444748]/40 p-8 md:p-12 bg-[#131313]/20">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-[#444748]/20">
            <div>
              <span className="font-display text-xs uppercase tracking-widest text-[#8e9192]">
                DIRECT ACCESS PROTOCOL
              </span>
              <h3 className="font-display text-2xl uppercase text-white mt-1">
                JOIN CLOSED PLAYTEST PIPELINE
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white" />
              <span className="font-display text-xs uppercase tracking-widest text-[#c7c6c6]">
                ACCEPTING ALPHA COHORTS
              </span>
            </div>
          </div>

          <p className="text-sm md:text-base text-[#c4c7c8] font-light mb-8">
            Receive unreleased development builds directly via private launcher branches. All playtesters are subject to strict NDA provisions and required telemetry upload.
          </p>

          <form className="flex flex-col sm:flex-row gap-3" onSubmit={handlePlaytestSubmit}>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="OPERATOR_EMAIL@DOMAIN.COM"
              required
              className="flex-1 bg-[#0e0e0e] border border-[#444748]/50 focus:border-white text-white font-display text-xs uppercase px-4 py-3 placeholder:text-[#8e9192]/60 focus:ring-0 focus:outline-none"
            />
            <button
              type="submit"
              className="border border-white bg-white text-black hover:bg-transparent hover:text-white px-8 py-3 font-display text-xs uppercase tracking-widest transition-all duration-150"
            >
              Request Clearance
            </button>
          </form>

          {subscribeStatus && (
            <div className="mt-4 p-3 border border-white/40 bg-white/5 font-display text-xs text-white tracking-widest uppercase">
              {subscribeStatus}
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-[#8e9192] font-display text-[10px] gap-2">
            <span>ENCRYPTION: 4096-BIT TLS</span>
            <span>NO MARKETING DISPATCHES // RAW BUILDS ONLY</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

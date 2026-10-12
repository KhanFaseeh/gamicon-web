import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { MonogramIcon } from '../components/Logo'
import ScrambleText from '../components/ScrambleText'
import LiveTimecode from '../components/LiveTimecode'
import { supabase, parseGameRecord, type Game } from '../lib/supabaseClient'
import { useReveal } from '../hooks/useReveal'

export default function Home() {
  const [games, setGames] = useState<Game[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [scrollY, setScrollY] = useState(0)

  // Animated stat counter for team members (counts 0 -> 5 on reveal)
  const [teamCount, setTeamCount] = useState(0)
  const { ref: philosophyRef, isVisible: philosophyVisible } = useReveal<HTMLElement>({ threshold: 0.3 })

  useEffect(() => {
    if (philosophyVisible) {
      let start = 0
      const target = 5
      const timer = window.setInterval(() => {
        start += 1
        setTeamCount(start)
        if (start >= target) clearInterval(timer)
      }, 90)
      return () => clearInterval(timer)
    }
  }, [philosophyVisible])

  // Parallax scroll listener for hero depth
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    async function fetchGames() {
      setIsLoading(true)
      try {
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .order('release_date', { ascending: false })

        if (!error && data) {
          setGames(data.map(parseGameRecord))
        } else {
          setGames([])
        }
      } catch (err) {
        console.warn('Supabase fetch error', err)
        setGames([])
      } finally {
        setIsLoading(false)
      }
    }
    fetchGames()
  }, [])

  const flagshipGame = games[0] || null

  return (
    <div className="bg-[#0e0e0e] text-[#e5e2e1] min-h-screen font-sans selection:bg-white selection:text-black">
      <Header />

      {/* HERO SECTION: FULL BLEED CINEMATIC IMMERSION WITH SUBTLE PARALLAX DEPTH */}
      <section className="relative min-h-screen w-full flex flex-col justify-between pt-20 overflow-hidden bg-[#0e0e0e]">
        {/* Parallax Geometric Reticle Layer */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-20 flex items-center justify-center transition-transform duration-100 ease-out"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          <div className="w-[600px] h-[600px] border border-[#333333] relative">
            <div className="absolute inset-x-0 top-1/2 h-[1px] bg-[#333333]" />
            <div className="absolute inset-y-0 left-1/2 w-[1px] bg-[#333333]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-[#444444]" />
          </div>
        </div>

        {/* Telemetry Overhead Bar */}
        <div className="relative z-10 w-full px-6 md:px-16 pt-8 flex justify-between items-center text-[#8e9192] font-display text-[11px] tracking-widest border-b border-[#444748]/20 pb-4">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-white telemetry-indicator" />
            <ScrambleText text="PESHAWAR LAB // PAKISTAN" scrambleOnHover={true} />
          </div>
          <div className="hidden sm:flex items-center gap-4">
            <LiveTimecode prefix="SYS_TIME:" />
            <span>ARCHIVE REF: ANMR-AUTEUR-00</span>
          </div>
        </div>

        {/* Centered Hero Focal Hierarchy */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 my-auto text-center flex flex-col items-center">
          <div className="flex flex-col items-center gap-4 mb-6">
            <MonogramIcon className="w-16 h-16 md:w-20 md:h-20" animated={true} />
          </div>

          <div className="overflow-hidden">
            <h1 className="font-display text-4xl sm:text-6xl md:text-8xl uppercase text-white tracking-tight max-w-5xl leading-none animate-reveal-up">
              Crafting Uncompromising Indie Experiences
            </h1>
          </div>

          <p className="mt-8 text-base md:text-xl text-[#c4c7c8] max-w-2xl font-light leading-relaxed">
            We architect unforgiving worlds for players who demand mastery. High visual fidelity, physics, and visceral narrative design.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#games"
              className="btn-mechanical px-8 py-3 font-display text-xs tracking-widest uppercase"
            >
              <ScrambleText text="Explore Products" scrambleOnHover={true} />
            </a>
            {flagshipGame ? (
              <Link
                to={`/game/${flagshipGame.slug}`}
                className="btn-mechanical-solid px-8 py-3 font-display text-xs tracking-widest uppercase font-bold"
              >
                <ScrambleText text="View Flagship Dossier" scrambleOnHover={true} />
              </Link>
            ) : (
              <Link
                to="/admin"
                className="btn-mechanical-solid px-8 py-3 font-display text-xs tracking-widest uppercase font-bold"
              >
                <ScrambleText text="Access CMS Panel" scrambleOnHover={true} />
              </Link>
            )}
          </div>
        </div>

        {/* Hero Base Telemetry Footer Indicator */}
        <div className="relative z-10 w-full px-6 md:px-16 pb-8 flex justify-between items-end text-[#8e9192] border-t border-[#444748]/20 pt-4">
          <div className="font-display text-[10px] tracking-widest">
            <span>EST. 2023 // PESHAWAR LAB</span>
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

      {/* STATEMENT INTERLUDE WITH ANIMATED STAT COUNTER */}
      <section
        ref={philosophyRef}
        className="border-y border-[#444748]/20 bg-[#131313] py-16 px-6 md:px-16 relative overflow-hidden"
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 justify-between items-start md:items-center">
          <div className="space-y-2 max-w-2xl">
            <span className="font-display text-[10px] uppercase tracking-widest text-[#8e9192]">
              <ScrambleText text="STUDIO PHILOSOPHY" scrambleOnHover={true} />
            </span>
            <p className="font-display text-xl md:text-2xl text-white font-normal leading-relaxed">
              "ANAMORPHIC is an independent studio forging mechanics-driven, narrative-rich titles built without creative compromise. We architect unforgiving worlds for players who demand mastery."
            </p>
          </div>
          <div className="flex flex-col gap-1 text-left md:text-right border-l md:border-l-0 md:border-r border-[#444748]/40 pl-4 md:pl-0 md:pr-4 min-w-[140px]">
            <span className="font-display text-5xl text-white font-light tabular-nums">
              {teamCount}
            </span>
            <span className="font-display text-[10px] text-[#8e9192] tracking-widest uppercase">
              Engineers & Artists
            </span>
          </div>
        </div>
      </section>

      {/* DYNAMIC PRODUCTS SECTION OR BRUTALIST EMPTY STATE */}
      <div id="games">
        {isLoading ? (
          <section className="py-24 px-6 md:px-16 border-b border-[#444748]/20 bg-[#0e0e0e] text-center">
            <div className="max-w-xl mx-auto space-y-4">
              <span className="inline-block w-2 h-2 bg-white animate-ping" />
              <p className="font-display text-xs tracking-widest text-[#8e9192] uppercase">
                CALIBRATING TRANSMISSION CHANNELS...
              </p>
            </div>
          </section>
        ) : games.length === 0 ? (
          <section className="py-28 px-6 md:px-16 border-b border-[#444748]/20 bg-[#0e0e0e]">
            <div className="max-w-4xl mx-auto border border-[#444748]/40 p-12 bg-[#131313]/30 text-center space-y-6">
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 bg-neutral-500" />
                <span className="font-display text-xs uppercase tracking-widest text-[#8e9192]">
                  TRANSMISSION STATUS // ARCHIVE EMPTY
                </span>
                <span className="w-2 h-2 bg-neutral-500" />
              </div>

              <h2 className="font-display text-3xl md:text-5xl uppercase text-white tracking-tight">
                NO ACTIVE TRANSMISSIONS
              </h2>

              <p className="font-mono text-xs text-[#8e9192] max-w-lg mx-auto leading-relaxed uppercase tracking-wider">
                NO ACTIVE TRANSMISSIONS // ADD PROJECTS VIA ADMIN
              </p>

              <div className="pt-4">
                <Link
                  to="/admin"
                  className="btn-mechanical-solid px-8 py-3 font-display text-xs uppercase tracking-widest font-bold"
                >
                  <ScrambleText text="OPEN CMS ADMIN PANEL →" scrambleOnHover={true} />
                </Link>
              </div>
            </div>
          </section>
        ) : (
          games.map((game, index) => {
            const isEven = index % 2 === 1
            const archiveNum = String(index + 1).padStart(2, '0')

            return (
              <section
                key={game.id || game.slug}
                className={`py-20 md:py-28 px-6 md:px-16 border-b border-[#444748]/20 ${
                  isEven ? 'bg-[#131313]' : 'bg-[#0e0e0e]'
                }`}
              >
                <div className="max-w-7xl mx-auto">
                  {/* Section Tag & Index with Self-Drawing 1px Line */}
                  <div className="flex justify-between items-baseline mb-4 border-b border-[#444748]/20 pb-2 relative">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-white" />
                      <span className="font-display text-xs uppercase tracking-widest text-white">
                        <ScrambleText text={`PRODUCT ARCHIVE // ${archiveNum}`} scrambleOnHover={true} />
                      </span>
                    </div>
                    <span className="font-display text-xs text-[#8e9192] uppercase tracking-widest">
                      {game.tags?.[0] || 'AUTEUR PRODUCTION'}
                    </span>
                  </div>

                  {/* Showcase Layout Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    {/* Visual Media Frame with 21:9 Viewfinder Brackets & Shutter Curtain Reveal */}
                    <div className={`lg:col-span-7 ${isEven ? 'order-2 lg:order-1' : ''}`}>
                      <Link
                        to={`/game/${game.slug}`}
                        className="block relative w-full aspect-[21/9] md:aspect-[16/9] overflow-hidden border border-[#444748]/40 bg-[#1c1b1b] group viewfinder-card animate-shutter-reveal"
                      >
                        {/* 4 Viewfinder L-Corner Brackets (8x8px) that snap outward on hover */}
                        <div className="viewfinder-corner-tl" />
                        <div className="viewfinder-corner-tr" />
                        <div className="viewfinder-corner-bl" />
                        <div className="viewfinder-corner-br" />

                        {/* Translucent Horizontal Scanline Sweep Overlay */}
                        <div className="media-scan-sweep" />

                        {game.image_url ? (
                          <img
                            alt={`${game.title} visual`}
                            className="w-full h-full object-cover object-center filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            src={game.image_url}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-neutral-500 font-display text-xs uppercase tracking-widest">
                            <span>NO KEYFRAME ATTACHED</span>
                            <span className="text-[10px] text-[#444748] mt-1 font-mono">
                              USE ADMIN TO ATTACH COVER PICTURE
                            </span>
                          </div>
                        )}

                        <div className="absolute top-4 left-4 pointer-events-none z-10">
                          <div className="inline-flex items-center gap-2 bg-[#0e0e0e]/90 backdrop-blur-sm border border-[#444748]/40 px-3 py-1">
                            <span className="inline-block w-2 h-2 bg-white telemetry-indicator" />
                            <span className="font-display text-[10px] text-white uppercase tracking-widest">
                              ACTIVE TRANSMISSION
                            </span>
                          </div>
                        </div>

                        {game.release_date && (
                          <div className="absolute bottom-4 left-4 pointer-events-none z-10">
                            <span className="font-display text-[10px] text-[#8e9192] bg-[#0e0e0e]/90 px-3 py-1 border border-[#444748]/40 uppercase tracking-widest">
                              RELEASE: {game.release_date}
                            </span>
                          </div>
                        )}
                      </Link>
                    </div>

                    {/* Editorial Dossier Description */}
                    <div className={`lg:col-span-5 space-y-4 ${isEven ? 'order-1 lg:order-2' : ''}`}>
                      <span className="font-display text-xs text-[#8e9192] tracking-widest uppercase">
                        PRODUCTION // {archiveNum}
                      </span>
                      <h2 className="font-display text-3xl md:text-5xl uppercase text-white tracking-tight">
                        {game.title}
                      </h2>
                      <p className="text-sm md:text-base text-[#c4c7c8] font-light leading-relaxed line-clamp-4">
                        {game.description}
                      </p>

                      {/* Metadata spec pills */}
                      <div className="border-t border-b border-[#444748]/20 py-4 my-4 space-y-2 font-display text-xs">
                        {game.release_date && (
                          <div className="flex justify-between text-[#8e9192]">
                            <span>RELEASE WINDOW:</span>
                            <span className="text-white uppercase">{game.release_date}</span>
                          </div>
                        )}
                        {game.tags && game.tags.length > 0 && (
                          <div className="flex justify-between text-[#8e9192]">
                            <span>TAGS:</span>
                            <span className="text-white uppercase">{game.tags.join(' • ')}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-[#8e9192]">
                          <span>STUDIO ARCHIVE:</span>
                          <span className="text-white uppercase">ANAMORPHIC AUTEUR LAB</span>
                        </div>
                      </div>

                      <div className="pt-4 flex gap-4">
                        <Link
                          to={`/game/${game.slug}`}
                          className="btn-mechanical-solid px-6 py-2.5 font-display text-xs uppercase tracking-widest font-bold inline-block"
                        >
                          <ScrambleText text="View Full Product Dossier →" scrambleOnHover={true} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )
          })
        )}
      </div>

      {/* STUDIO MANIFESTO & TENETS */}
      <section className="py-20 md:py-36 px-6 md:px-16 bg-[#0e0e0e] border-b border-[#444748]/20" id="about">
        <div className="max-w-7xl mx-auto">
          {/* Studio Header */}
          <div className="mb-16 max-w-3xl">
            <span className="font-display text-xs uppercase tracking-widest text-[#8e9192]">
              <ScrambleText text="STUDIO ETHOS & TENETS" scrambleOnHover={true} />
            </span>
            <h2 className="font-display text-3xl md:text-5xl uppercase text-white mt-2 tracking-tight">
              ARCHITECTS OF VISCERAL INTERACTION
            </h2>
            <p className="mt-4 text-base md:text-lg text-[#c4c7c8] font-light">
              We reject automated formulas and safety-first design paradigms. ANAMORPHIC exists to create art with sharp edges.
            </p>
          </div>

          {/* Tenets Bento Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="border border-[#444748]/30 p-8 bg-[#131313]/40 flex flex-col justify-between hover:border-white/60 transition-colors duration-150 group">
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

            <div className="border border-[#444748]/30 p-8 bg-[#131313]/40 flex flex-col justify-between hover:border-white/60 transition-colors duration-150 group">
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

            <div className="border border-[#444748]/30 p-8 bg-[#131313]/40 flex flex-col justify-between hover:border-white/60 transition-colors duration-150 group">
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

          {/* Studio Lab Workstation Feature with Viewfinder Framing */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#444748]/30 bg-[#131313]/30">
            <div className="lg:col-span-7 h-full relative group overflow-hidden">
              <div className="viewfinder-corner-tl" />
              <div className="viewfinder-corner-tr" />
              <div className="viewfinder-corner-bl" />
              <div className="viewfinder-corner-br" />
              <div className="media-scan-sweep" />
              <img
                alt="ANAMORPHIC Peshawar Studio Lab Workstations"
                className="w-full h-full object-cover min-h-[360px] filter grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                src="https://lh3.googleusercontent.com/aida/AEtjO1X8gVDzQKeN1xnNu8yH5hqMwFVSf2tgib-RrN4qRR4hYfMl1W1K84GlSKWbF0bCtfapCBy75RgVw9rATVOsigq89QNtmXDugvbaXFOC9wAq6I0iCDdcZcFx4jVjZhwbsp3B7bvutYI3lt0ZGkoF19qWlev-tk3rDCALHDrL8Et0daLsjCKEjSy9vr0fudlrSAaMt_g1GO8wLvg6Ua1DGh0Ss2NmAle4pFz2_R2WwvLr2qcyJh0haDvSHZ0"
              />
            </div>
            <div className="lg:col-span-5 p-8 space-y-4">
              <span className="font-display text-xs uppercase tracking-widest text-[#8e9192]">
                <ScrambleText text="PHYSICAL FACILITY" scrambleOnHover={true} />
              </span>
              <h3 className="font-display text-2xl uppercase text-white font-normal">
                PESHAWAR STUDIO LAB
              </h3>
              <p className="text-sm md:text-base text-[#c4c7c8] font-light leading-relaxed">
                Our atelier houses high-throughput workstations, dedicated motion simulation gear, and localized build clusters. We maintain complete autonomy over every project developed.
              </p>
              <div className="pt-4 space-y-2 font-display text-xs text-[#8e9192] border-t border-[#444748]/20">
                <div className="flex justify-between">
                  <span>LOCATION:</span>
                  <span className="text-white">PESHAWAR, PAKISTAN</span>
                </div>
                <div className="flex justify-between">
                  <span>PERSONNEL:</span>
                  <span className="text-white">5 SPECIALISTS</span>
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

      <Footer />
    </div>
  )
}

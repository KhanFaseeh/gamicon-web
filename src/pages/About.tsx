import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { MonogramIcon } from '../components/Logo'
import ScrambleText from '../components/ScrambleText'
import LiveTimecode from '../components/LiveTimecode'
import { supabase, type StudioInfo } from '../lib/supabaseClient'
import { useReveal } from '../hooks/useReveal'

const DEFAULT_STUDIO_INFO: StudioInfo = {
  id: 1,
  manifesto:
    'ANAMORPHIC is an independent studio forging mechanics-driven, narrative-rich titles built without creative compromise. We reject automated formulas and safety-first design paradigms. We architect unforgiving worlds for players who demand mastery, physics, narrative literacy, and visceral design.',
  contact_email: 'contact@anamorphic.studio',
  press_kit_url: 'https://anamorphic.studio/press-kit.zip',
}

const TIMELINE_YEARS = [
  {
    year: '2023',
    era: 'FOUNDING ERA',
    title: 'GENESIS // PESHAWAR',
    desc: 'Founded as an auteur studio collective uniting Blender 3D modeling, Unity Engine precision, and ElevenLabs audio architecture. 100% self-owned equity secured to guarantee permanent creative autonomy.',
    align: 'left',
  },
  {
    year: '2024',
    era: 'TECH FOUNDATION',
    title: 'CORE ENGINE PIPELINE',
    desc: 'Integration of advanced Unity Engine physics pipelines, procedural high-poly Blender assets, and ElevenLabs dynamic voice synthesis for high-tension spatial realism.',
    align: 'right',
  },
  {
    year: '2025',
    era: 'FLAGSHIP PRODUCTION',
    title: 'ECHOES OF DESOLATION',
    desc: 'Investigation into Elysium Asylum; psychological single-player survival horror with brutal combat encounters and unsparing narrative literacy.',
    align: 'right',
  },
  {
    year: '2026+',
    era: 'GLOBAL HORIZON',
    title: 'DISTRIBUTED ARCHITECTURE',
    desc: 'Scaling the proprietary 2.39:1 widescreen optical aesthetics, multi-biome dynamic wave simulation, and unassisted player deduction to global platforms.',
    align: 'left',
  },
]

export default function About() {
  const [studioInfo, setStudioInfo] = useState<StudioInfo>(DEFAULT_STUDIO_INFO)
  const { ref: timelineRef, isVisible: timelineVisible } = useReveal<HTMLDivElement>({ threshold: 0.1 })

  useEffect(() => {
    window.scrollTo(0, 0)
    async function loadStudioInfo() {
      try {
        const { data, error } = await supabase
          .from('studio_info')
          .select('*')
          .eq('id', 1)
          .single()

        if (!error && data) {
          setStudioInfo(data as StudioInfo)
        }
      } catch (err) {
        console.warn('Supabase studio_info fetch error or table empty, using default', err)
      }
    }
    loadStudioInfo()
  }, [])

  return (
    <div className="bg-[#0e0e0e] text-[#e5e2e1] antialiased min-h-screen selection:bg-white selection:text-black">
      <Header />

      <main className="w-full">
        {/* =========================================================================
               SECTION 1: HERO (Philosophical Manifesto)
               ========================================================================= */}
        <section className="min-h-screen flex flex-col justify-between px-6 md:px-16 pt-28 pb-12 relative bg-[#0e0e0e] border-b border-[#444748]/30">
          {/* Studio Telemetry Coordinates Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between text-[#8e9192] border-b border-[#444748]/20 pb-4 gap-2 font-display text-[10px] tracking-widest">
            <div className="text-[#c7c6c6] flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-white telemetry-indicator inline-block" />
              <span>EST. 2023 // PESHAWAR LAB // PAKISTAN // 100% SELF-OWNED EQUITY</span>
            </div>
            <div className="text-[#8e9192] flex items-center gap-4">
              <LiveTimecode prefix="SYS_CLOCK:" />
              <span>AUTEUR SPECIFICATION // SPEC-092</span>
            </div>
          </div>

          {/* Core Philosophical Anchor */}
          <div className="my-16 max-w-5xl mx-auto text-center flex flex-col items-center">
            <div className="mb-6">
              <MonogramIcon className="w-16 h-16 md:w-20 md:h-20" animated={true} />
            </div>
            <span className="font-display text-[10px] text-[#8e9192] tracking-widest uppercase mb-6 inline-block">
              <ScrambleText text="STUDIO MANIFESTO // VOL. 01" scrambleOnHover={true} />
            </span>
            <div className="overflow-hidden">
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-display text-white uppercase leading-tight md:leading-none tracking-tight animate-reveal-up">
                FROM HOMO SAPIENS TO HOMO LUDENS — WE ARE THE ARCHITECTS OF VISCERAL INTERACTION
              </h1>
            </div>
            <div className="w-16 h-[1px] bg-[#444748] my-10 animate-draw-line-x" />
            <p className="text-base md:text-xl font-light text-[#c4c7c8] max-w-3xl leading-relaxed text-center">
              {studioInfo.manifesto}
            </p>
          </div>

          {/* Studio Tenets / Principles Triad */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-[#444748]/20">
            {/* Tenet 01 */}
            <div className="space-y-3">
              <div className="font-display text-[10px] text-white tracking-widest flex items-center gap-2 uppercase">
                <span className="w-1.5 h-1.5 bg-white inline-block" />
                01 // PHYSICAL INTEGRITY
              </div>
              <p className="text-xs md:text-sm text-[#8e9192] leading-relaxed">
                Real-time kinetic physics, deterministic penetration, and responsive frame timing. No superficial hitscan compromises.
              </p>
            </div>
            {/* Tenet 02 */}
            <div className="space-y-3">
              <div className="font-display text-[10px] text-white tracking-widest flex items-center gap-2 uppercase">
                <span className="w-1.5 h-1.5 bg-white inline-block" />
                02 // DIEGETIC IMMERSION
              </div>
              <p className="text-xs md:text-sm text-[#8e9192] leading-relaxed">
                Zero visual clutter. In-world tactical HUD telemetry, spatial acoustic clues, and environmental deduction replace minimaps.
              </p>
            </div>
            {/* Tenet 03 */}
            <div className="space-y-3">
              <div className="font-display text-[10px] text-white tracking-widest flex items-center gap-2 uppercase">
                <span className="w-1.5 h-1.5 bg-white inline-block" />
                03 // OPEN PLAYTEST LOOPS
              </div>
              <p className="text-xs md:text-sm text-[#8e9192] leading-relaxed">
                Direct player telemetry and uncompromised playtest iteration through closed developer branches and tactile feedback rings.
              </p>
            </div>
          </div>
        </section>

        {/* =========================================================================
               SECTION 2: MASCOT / STUDIO IDENTITY VISUAL BREAK (Letterbox 21:9)
               ========================================================================= */}
        <section className="w-full bg-[#0e0e0e] border-b border-[#444748]/30 overflow-hidden">
          {/* Letterbox Top Bar with Live Telemetry */}
          <div className="w-full bg-[#000000] py-3 px-6 md:px-16 flex justify-between items-center text-[#8e9192] border-b border-[#444748]/20 font-display text-[10px] tracking-widest">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white telemetry-indicator" />
              <span>ASPECT RATIO 21:9 // ANAMORPHIC SENSOR SIMULATION</span>
            </span>
            <span>FPS 24.000 // MONO-CHROME LOG</span>
          </div>

          {/* Cinematic Artwork Frame with Viewfinder Shutter and scanline */}
          <div className="relative w-full aspect-[21/9] min-h-[480px] bg-[#0e0e0e] overflow-hidden group viewfinder-card">
            <div className="viewfinder-corner-tl" />
            <div className="viewfinder-corner-tr" />
            <div className="viewfinder-corner-bl" />
            <div className="viewfinder-corner-br" />
            <div className="media-scan-sweep" />

            <img
              alt="PROJECT 01 // NEON PROTOCOL"
              className="w-full h-full object-cover grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1W8l1YFBtH3X_E6WY4GiitT_RiPH7iW_0qgptlmrSoiJlCDizxfzPe_pKkQ74OO4aeaCBUxJ1tcaohW4f8bv2EuPO7vC2vJArRHJlcFt_9NBqdWTQSKw8LMOmJbOagJYNhEOzrPgAP3Q5OXc4lOtxJ48ySUKuXWGRauto2aDR8ERVxBO7mZ6AWbbF2-sqh81Yt7aql18eMW6NSwwxD42RDuIQSjKPGKqAvoPs5ZtxyJP54Rx8f2VL9FJ2c"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Overlay Caption */}
            <div className="absolute bottom-6 left-6 md:left-16 md:bottom-8 z-10 space-y-2">
              <div className="font-display text-[10px] text-white bg-[#0e0e0e]/80 px-2 py-1 backdrop-blur-sm border border-[#444748]/30 inline-block uppercase tracking-widest">
                FLAGSHIP CONCEPT // ECHOES OF DESOLATION
              </div>
              <div className="font-display text-2xl md:text-3xl text-white tracking-widest uppercase">
                THE EMBODIED SPIRIT OF ANAMORPHIC
              </div>
              <p className="text-xs md:text-sm text-[#c4c7c8] max-w-lg font-light leading-relaxed">
                Atmospheric psychological survival horror modeled in Blender, engineered in Unity Engine, and voiced with ElevenLabs audio.
              </p>
            </div>
          </div>

          {/* Letterbox Bottom Bar with Live Ticking Timecode */}
          <div className="w-full bg-[#000000] py-3 px-6 md:px-16 flex justify-between items-center text-[#8e9192] border-t border-[#444748]/20 font-display text-[10px] tracking-widest">
            <span>PESHAWAR PRODUCTION UNIT // SECTOR 04</span>
            <LiveTimecode prefix="TIME CODE:" />
          </div>
        </section>

        {/* =========================================================================
               SECTION 3: FOUNDER MESSAGE & LABORATORY
               ========================================================================= */}
        <section className="w-full px-6 md:px-16 py-24 bg-[#0e0e0e] border-b border-[#444748]/30">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Statement Left Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="font-display text-[10px] tracking-widest text-[#8e9192] uppercase">
                <ScrambleText text="EXECUTIVE DISPATCH // FOUNDER DIRECTIVE" scrambleOnHover={true} />
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-white uppercase tracking-tight">
                A MESSAGE FROM CEO MIAN FASEEH UR REHMAN & PARTNER MUHAMMAD TAYYAB
              </h2>
              <div className="space-y-4 text-sm md:text-base text-[#c4c7c8] leading-relaxed font-light">
                <p>
                  "Games are not passive entertainment; they are interactive architecture. When we founded ANAMORPHIC, our goal was singular: create a sanctuary where high-fidelity Blender 3D modeling, Unity Engine technical precision, and immersive ElevenLabs audio storytelling exist as one."
                </p>
                <p>
                  "We do not design games to be consumed in haste; we build worlds to be inhabited, analyzed, and mastered. Every model sculpted in Blender, every frame simulated in Unity, and every voice engineered with ElevenLabs is crafted with uncompromising creative intent."
                </p>
              </div>

              {/* Founder Signoff */}
              <div className="pt-6 border-t border-[#444748]/20 flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-display text-xs text-white tracking-widest uppercase">
                    MIAN FASEEH UR REHMAN
                  </div>
                  <div className="font-display text-[10px] text-[#8e9192] tracking-widest uppercase">
                    CHIEF EXECUTIVE OFFICER & FOUNDER
                  </div>
                </div>
                <div className="space-y-1 text-right">
                  <div className="font-display text-xs text-white tracking-widest uppercase">
                    MUHAMMAD TAYYAB
                  </div>
                  <div className="font-display text-[10px] text-[#8e9192] tracking-widest uppercase">
                    CO-FOUNDER & CREATIVE PARTNER
                  </div>
                </div>
              </div>
            </div>

            {/* Laboratory Photo Right Column */}
            <div className="lg:col-span-6">
              <div className="border border-[#444748]/30 p-2 bg-[#1c1b1b] relative group viewfinder-card">
                <div className="viewfinder-corner-tl" />
                <div className="viewfinder-corner-tr" />
                <div className="viewfinder-corner-bl" />
                <div className="viewfinder-corner-br" />
                <div className="media-scan-sweep" />

                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    alt="Peshawar Soundstage & Engineering Lab"
                    className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    src="https://lh3.googleusercontent.com/aida/AEtjO1X8gVDzQKeN1xnNu8yH5hqMwFVSf2tgib-RrN4qRR4hYfMl1W1K84GlSKWbF0bCtfapCBy75RgVw9rATVOsigq89QNtmXDugvbaXFOC9wAq6I0iCDdcZcFx4jVjZhwbsp3B7bvutYI3lt0ZGkoF19qWlev-tk3rDCALHDrL8Et0daLsjCKEjSy9vr0fudlrSAaMt_g1GO8wLvg6Ua1DGh0Ss2NmAle4pFz2_R2WwvLr2qcyJh0haDvSHZ0"
                  />
                  <div className="absolute inset-0 bg-[#0e0e0e]/20 pointer-events-none" />
                </div>
                {/* Metadata Strip below image */}
                <div className="mt-3 pt-3 border-t border-[#444748]/20 flex flex-wrap justify-between items-center font-display text-[10px] text-[#8e9192]">
                  <span>FACILITY: PESHAWAR LAB 01</span>
                  <span>CREW: 5 CORE ENGINEERS & ARTISTS</span>
                  <span>RIG: DUAL-SIMULATION SOUNDSTAGE</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
               SECTION 4: STUDIO TIMELINE WITH ANIMATED VERTICAL SPINE
               ========================================================================= */}
        <section className="w-full bg-[#FFFFFF] text-[#050505] px-6 md:px-16 py-24 transition-colors duration-300">
          <div className="max-w-4xl mx-auto">
            {/* Timeline Header */}
            <div className="text-center mb-16 space-y-3">
              <span className="font-display text-[10px] text-[#777777] tracking-widest uppercase inline-block">
                <ScrambleText text="CHRONOLOGICAL ARCHIVE // 2023 — BEYOND" scrambleOnHover={true} />
              </span>
              <h2 className="font-display text-3xl md:text-5xl uppercase text-[#050505] tracking-tight">
                THE CHRONOLOGY OF AUTEUR DEV
              </h2>
              <p className="text-sm md:text-base text-[#555555] max-w-lg mx-auto leading-relaxed">
                From an independent sanctuary in Peshawar to uncompromising global recognition.
              </p>
            </div>

            {/* Center Spine Vertical Timeline with Scroll Reveal */}
            <div ref={timelineRef} className="relative">
              {/* Animated Vertical Center Spine Line that draws downward */}
              <div
                className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#050505] transform md:-translate-x-1/2 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] origin-top ${
                  timelineVisible ? 'scale-y-100' : 'scale-y-0'
                }`}
              />

              <div className="space-y-16">
                {TIMELINE_YEARS.map((item, idx) => {
                  const isLeft = item.align === 'left'

                  return (
                    <div
                      key={item.year}
                      className={`relative flex flex-col items-start md:items-center justify-between ${
                        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                      }`}
                      style={{ transitionDelay: `${idx * 120}ms` }}
                    >
                      <div
                        className={`md:w-5/12 pl-12 space-y-2 ${
                          isLeft ? 'md:pl-0 md:text-right' : 'md:pl-8'
                        }`}
                      >
                        <span className="font-display text-[10px] text-[#888888] tracking-widest block uppercase">
                          {item.era}
                        </span>
                        <h3 className="font-display text-2xl text-[#050505] uppercase">
                          {item.title}
                        </h3>
                        <p className="text-xs md:text-sm text-[#444444] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>

                      {/* Timeline Node Reticle Point */}
                      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#050505] border-2 border-[#FFFFFF] rounded-none z-10 mt-1 md:mt-0 transition-transform duration-300 hover:scale-150 cursor-pointer" />

                      <div
                        className={`md:w-5/12 pl-12 font-display text-sm text-[#050505] tracking-widest font-bold ${
                          isLeft ? 'md:pl-8' : 'md:pl-0 md:text-right'
                        }`}
                      >
                        {item.year}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { MonogramIcon } from '../components/Logo'
import { supabase, type StudioInfo } from '../lib/supabaseClient'

const DEFAULT_STUDIO_INFO: StudioInfo = {
  id: 1,
  manifesto:
    'Gamicon is an independent studio forging mechanics-driven, narrative-rich titles built without creative compromise. We reject automated formulas and safety-first design paradigms. We architect unforgiving worlds for players who demand mastery, physics, narrative literacy, and visceral design.',
  contact_email: 'contact@gamicon.studio',
  press_kit_url: 'https://gamicon.studio/press-kit.zip',
}

export default function About() {
  const [studioInfo, setStudioInfo] = useState<StudioInfo>(DEFAULT_STUDIO_INFO)

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
            <div className="text-[#c7c6c6]">
              EST. 2023 // PESHAWAR LAB // PAKISTAN // 100% SELF-OWNED EQUITY
            </div>
            <div className="text-[#8e9192]">
              AUTEUR SPECIFICATION // SPEC-092
            </div>
          </div>

          {/* Core Philosophical Anchor */}
          <div className="my-16 max-w-5xl mx-auto text-center flex flex-col items-center">
            <div className="mb-6">
              <MonogramIcon className="w-16 h-16 md:w-20 md:h-20" animated={true} />
            </div>
            <span className="font-display text-[10px] text-[#8e9192] tracking-widest uppercase mb-6 inline-block">
              STUDIO MANIFESTO // VOL. 01
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-display text-white uppercase leading-tight md:leading-none tracking-tight">
              FROM HOMO SAPIENS TO HOMO LUDENS — WE ARE THE ARCHITECTS OF VISCERAL INTERACTION
            </h1>
            <div className="w-16 h-[1px] bg-[#444748] my-10" />
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
          {/* Letterbox Top Bar */}
          <div className="w-full bg-[#000000] py-3 px-6 md:px-16 flex justify-between items-center text-[#8e9192] border-b border-[#444748]/20 font-display text-[10px] tracking-widest">
            <span>ASPECT RATIO 21:9 // ANAMORPHIC SENSOR SIMULATION</span>
            <span>FPS 24.000 // MONO-CHROME LOG</span>
          </div>

          {/* Cinematic Artwork Frame */}
          <div className="relative w-full aspect-[21/9] min-h-[480px] bg-[#0e0e0e] overflow-hidden group">
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
                THE EMBODIED SPIRIT OF GAMICON
              </div>
              <p className="text-xs md:text-sm text-[#c4c7c8] max-w-lg font-light leading-relaxed">
                Atmospheric psychological survival horror modeled in Blender, engineered in Unity Engine, and voiced with ElevenLabs audio.
              </p>
            </div>
          </div>

          {/* Letterbox Bottom Bar */}
          <div className="w-full bg-[#000000] py-3 px-6 md:px-16 flex justify-between items-center text-[#8e9192] border-t border-[#444748]/20 font-display text-[10px] tracking-widest">
            <span>PESHAWAR PRODUCTION UNIT // SECTOR 04</span>
            <span>TIME CODE: 01:44:28:12</span>
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
                EXECUTIVE DISPATCH // FOUNDER DIRECTIVE
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-white uppercase tracking-tight">
                A MESSAGE FROM CEO MIAN FASEEH UR REHMAN & PARTNER MUHAMMAD TAYYAB
              </h2>
              <div className="space-y-4 text-sm md:text-base text-[#c4c7c8] leading-relaxed font-light">
                <p>
                  "Games are not passive entertainment; they are interactive architecture. When we founded Gamicon, our goal was singular: create a sanctuary where high-fidelity Blender 3D modeling, Unity Engine technical precision, and immersive ElevenLabs audio storytelling exist as one."
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
                <div className="space-y-1">
                  <div className="font-display text-xs text-white tracking-widest uppercase">
                    MUHAMMAD TAYYAB
                  </div>
                  <div className="font-display text-[10px] text-[#8e9192] tracking-widest uppercase">
                    STUDIO PARTNER & CO-FOUNDER
                  </div>
                </div>
                <div className="font-display text-[10px] text-[#c7c6c6] tracking-widest border border-[#444748] px-3 py-1 uppercase">
                  LEADERSHIP
                </div>
              </div>
            </div>

            {/* Laboratory Photo Right Column */}
            <div className="lg:col-span-6">
              <div className="border border-[#444748]/30 p-2 bg-[#1c1b1b]">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    alt="Peshawar Soundstage & Engineering Lab"
                    className="w-full h-full object-cover filter contrast-110"
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
               SECTION 4: STUDIO TIMELINE (Dramatic High-Contrast White Canvas)
               ========================================================================= */}
        <section className="w-full bg-[#FFFFFF] text-[#050505] px-6 md:px-16 py-24 transition-colors duration-300">
          <div className="max-w-4xl mx-auto">
            {/* Timeline Header */}
            <div className="text-center mb-16 space-y-3">
              <span className="font-display text-[10px] text-[#777777] tracking-widest uppercase inline-block">
                CHRONOLOGICAL ARCHIVE // 2023 — BEYOND
              </span>
              <h2 className="font-display text-3xl md:text-5xl uppercase text-[#050505] tracking-tight">
                THE CHRONOLOGY OF AUTEUR DEV
              </h2>
              <p className="text-sm md:text-base text-[#555555] max-w-lg mx-auto leading-relaxed">
                From an independent sanctuary in Peshawar to uncompromising global recognition.
              </p>
            </div>

            {/* Center Spine Vertical Timeline */}
            <div className="relative">
              {/* Hairline center vertical line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-[#D4D4D4] transform md:-translate-x-1/2" />

              <div className="space-y-16">
                {/* Item 1: 2023 */}
                <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div className="md:w-5/12 pl-12 md:pl-0 md:text-right space-y-2">
                    <span className="font-display text-[10px] text-[#888888] tracking-widest block uppercase">
                      FOUNDING ERA
                    </span>
                    <h3 className="font-display text-2xl text-[#050505] uppercase">
                      GENESIS // PESHAWAR
                    </h3>
                    <p className="text-xs md:text-sm text-[#444444] leading-relaxed">
                      Founded as an auteur studio collective uniting Blender 3D modeling, Unity Engine precision, and ElevenLabs audio architecture. 100% self-owned equity secured to guarantee permanent creative autonomy.
                    </p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#050505] border-2 border-[#FFFFFF] rounded-none z-10 mt-1 md:mt-0" />
                  <div className="md:w-5/12 pl-12 md:pl-8 font-display text-sm text-[#050505] tracking-widest font-bold">
                    2023
                  </div>
                </div>

                {/* Item 2: 2024 */}
                <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center justify-between">
                  <div className="md:w-5/12 pl-12 md:pl-8 space-y-2">
                    <span className="font-display text-[10px] text-[#888888] tracking-widest block uppercase">
                      TECH FOUNDATION
                    </span>
                    <h3 className="font-display text-2xl text-[#050505] uppercase">
                      CORE ENGINE PIPELINE
                    </h3>
                    <p className="text-xs md:text-sm text-[#444444] leading-relaxed">
                      Integration of advanced Unity Engine physics pipelines, procedural high-poly Blender assets, and ElevenLabs dynamic voice synthesis for high-tension spatial realism.
                    </p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#050505] border-2 border-[#FFFFFF] rounded-none z-10 mt-1 md:mt-0" />
                  <div className="md:w-5/12 pl-12 md:pl-0 md:text-right font-display text-sm text-[#050505] tracking-widest font-bold">
                    2024
                  </div>
                </div>

                {/* Item 4: 2025 */}
                <div className="relative flex flex-col md:flex-row-reverse items-start md:items-center justify-between">
                  <div className="md:w-5/12 pl-12 md:pl-8 space-y-2">
                    <span className="font-display text-[10px] text-[#888888] tracking-widest block uppercase">
                      FLAGSHIP PRODUCTION
                    </span>
                    <h3 className="font-display text-2xl text-[#050505] uppercase">
                      ECHOES OF DESOLATION
                    </h3>
                    <p className="text-xs md:text-sm text-[#444444] leading-relaxed">
                      Investigation into Elysium Asylum; psychological single-player survival horror with brutal combat encounters and unsparing narrative literacy.
                    </p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#050505] border-2 border-[#FFFFFF] rounded-none z-10 mt-1 md:mt-0" />
                  <div className="md:w-5/12 pl-12 md:pl-0 md:text-right font-display text-sm text-[#050505] tracking-widest font-bold">
                    2025
                  </div>
                </div>

                {/* Item 5: 2026 & Beyond */}
                <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between">
                  <div className="md:w-5/12 pl-12 md:pl-0 md:text-right space-y-2">
                    <span className="font-display text-[10px] text-[#888888] tracking-widest block uppercase">
                      GAUNTLET EXTRACTION
                    </span>
                    <h3 className="font-display text-2xl text-[#050505] uppercase">
                      ASHES OF ESCAPE
                    </h3>
                    <p className="text-xs md:text-sm text-[#444444] leading-relaxed">
                      High-stakes survival action gauntlet spanning three brutal environments, testing wave endurance, spatial discipline, and tactical extraction.
                    </p>
                  </div>
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-3 h-3 bg-[#050505] border-2 border-[#FFFFFF] rounded-none z-10 mt-1 md:mt-0" />
                  <div className="md:w-5/12 pl-12 md:pl-8 font-display text-sm text-[#050505] tracking-widest font-bold">
                    2026
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

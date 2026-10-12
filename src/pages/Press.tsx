import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase, type StudioInfo } from '../lib/supabaseClient'

const DEFAULT_STUDIO_INFO: StudioInfo = {
  id: 1,
  manifesto:
    'ANAMORPHIC is an independent studio forging mechanics-driven, narrative-rich titles built without creative compromise. We reject automated formulas and safety-first design paradigms.',
  contact_email: 'contact@anamorphic.studio',
}

interface Dispatch {
  date: string
  code: string
  tag: string
  title: string
  desc: string
  dept: string
}

const DISPATCHES: Dispatch[] = [
  {
    date: '2025.10.15',
    code: 'BUILD 0.9.1',
    tag: 'PRODUCTION',
    title: 'ECHOES OF DESOLATION — ELYSIUM ASYLUM ACOUSTIC AI PIPELINE',
    desc: 'Deep architectural dive into the procedural acoustic occlusion system built for Elysium Asylum. Mutated patients calculate reverberant footstep trajectories, broken glass audio cones, and weapon reloads in real time.',
    dept: 'SYSTEMS DEPT // AUDIO & AI',
  },
  {
    date: '2025.07.22',
    code: 'PRODUCTION MILESTONE',
    tag: 'R&D REPORT',
    title: 'ASHES OF ESCAPE: TRI-ENVIRONMENT WAVE SCALING ARCHITECTURE',
    desc: 'Technical breakdown of dynamic wave pacing across the three hostile biomes in Ashes of Escape, balancing relentless enemy pressure with extraction zone defenses.',
    dept: 'COMBAT DESIGN // SYSTEMS TEAM',
  },
  {
    date: '2025.01.14',
    code: 'STUDIO DISPATCH',
    tag: 'MANIFESTO',
    title: 'FOUNDER MANIFESTO: ON BLENDER MODELING, UNITY ARCHITECTURE & AUTEUR DESIGN',
    desc: 'CEO Mian Faseeh Ur Rehman and partner Muhammad Tayyab outline ANAMORPHIC\'s development philosophy, utilizing Blender for tactile 3D assets, Unity Engine for high-speed deterministic mechanics, and ElevenLabs for atmospheric vocal narration.',
    dept: 'EXECUTIVE DIRECTION // M. F. UR REHMAN & M. TAYYAB',
  },
]

export default function Press() {
  const [studioInfo, setStudioInfo] = useState<StudioInfo>(DEFAULT_STUDIO_INFO)
  const [activeDispatch, setActiveDispatch] = useState<Dispatch | null>(null)

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
        console.warn('Press page: Supabase studio_info fallback used', err)
      }
    }
    loadStudioInfo()
  }, [])

  return (
    <div className="bg-[#0e0e0e] text-[#e5e2e1] min-h-screen selection:bg-white selection:text-black font-sans antialiased overflow-x-hidden">
      <Header />

      <main className="pt-28 pb-16">
        {/* ========================================================================= */}
        {/* Hero / Telemetry Banner                                                   */}
        {/* ========================================================================= */}
        <section className="px-6 md:px-16 pt-8 pb-16 border-b border-[#444748]/30">
          <div className="flex flex-wrap items-center justify-between gap-y-2 mb-4 pb-2 border-b border-[#444748]/20 font-display text-[10px] text-[#8e9192] tracking-widest uppercase">
            <div className="flex items-center gap-3">
              <span className="text-[#e5e2e1]">SYS_BUILD: 2025.REL_04</span>
              <span className="text-[#444748]">/</span>
              <span>PROTOCOL 100% INDEPENDENT</span>
            </div>
            <div>
              <span>PESHAWAR LAB // PAKISTAN</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mt-4">
            <div className="lg:col-span-8">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
                STUDIO DISPATCHES & CONTACT DIRECTORY
              </h1>
              <p className="mt-4 text-[#c7c6c6] text-base md:text-lg max-w-2xl font-light leading-relaxed">
                Official studio communications, development milestones, and direct correspondence channels for ANAMORPHIC.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-1 font-display">
              <span className="text-[10px] text-[#8e9192] tracking-widest uppercase">
                COMMUNICATIONS STATUS
              </span>
              <span className="text-xs text-white tracking-widest uppercase">
                ALL CHANNELS ACTIVE
              </span>
              <a
                className="mt-2 text-[#c7c6c6] hover:text-white text-[10px] tracking-widest uppercase flex items-center gap-1 border-b border-[#444748] hover:border-white pb-0.5 transition-colors"
                href="#contact"
              >
                JUMP TO CONTACT DIRECTORY <span>↓</span>
              </a>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* Architectural Studio Contextual Imagery Strip                             */}
        {/* ========================================================================= */}
        <section className="border-b border-[#444748]/30 bg-[#131313]">
          <div className="px-6 md:px-16 py-4 grid grid-cols-1 md:grid-cols-12 gap-px bg-[#444748]/30">
            {/* Lab Environment Module */}
            <div className="md:col-span-7 bg-[#0e0e0e] p-4 flex flex-col justify-between group">
              <div className="flex items-center justify-between text-[#8e9192] font-display text-[10px] mb-2 uppercase tracking-widest">
                <span>LAB CAM 01 // PESHAWAR DEV FLOOR</span>
                <span className="text-white font-bold">
                  REC
                </span>
              </div>
              <div className="w-full aspect-[21/9] overflow-hidden bg-[#201f1f]">
                <img
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                  alt="ANAMORPHIC Peshawar Dev Floor"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2cOOxbCilaHe97REcOuuPeAOtdQvXV9AmGHYCoRw_TFUfvlN2Ci2DU2qgd4jhGk5HYWNXtV8y6uGYgBecfX69OhSMJzA9nJQjAAan_oJgwbzNwtP-ksKksZfq2wG4CoDWoWLsrkQ-iqq2kmiCm_HbMvqsjF68p-zbZ2xhnlD28ULzCh5xsaWbb5Xdz_OXVhS1z_5Bz-1RaR_LmmxvOkuU5JqTuqKf-TI6It1jMrTTPxGlhC4kFk2J"
                />
              </div>
              <div className="mt-2 flex justify-between text-[#8e9192] font-display text-[10px] uppercase tracking-widest">
                <span>DIRECTOR & COMBAT ENGINEERING WORKFLOW</span>
                <span>23:41 EST</span>
              </div>
            </div>

            {/* Combat Art Preview Module */}
            <div className="md:col-span-5 bg-[#0e0e0e] p-4 flex flex-col justify-between group">
              <div className="flex items-center justify-between text-[#8e9192] font-display text-[10px] mb-2 uppercase tracking-widest">
                <span>PROJECT: ECHOES OF DESOLATION // ASSET PREVIEW</span>
                <span>KEY ARTWORK</span>
              </div>
              <div className="w-full aspect-[21/9] overflow-hidden bg-[#201f1f]">
                <img
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                  alt="Echoes of Desolation Key Art"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUqrBiEbtQ9z9K5SEojag5pJIoM2QysO2Slf7Fzm7-m-jHdleNbpGaEiGCJUyR9yCJUuqwiFDLzeZm2QWTc1atIxMay_vT3mpX4WJp32ab5efbwQxMOfDZ-Fgol9Fie8r5NzJ40fV8VNeHV9a7DMzDc4zVqnigDsxw64XSRUGfBOGdk3CCLdlurwanYP_0lzqRD8WoK6Rp68Bu1M64pkTlSXfxB8NqhYKVJEa8rWtLG2eWy-anw7iJ"
                />
              </div>
              <div className="mt-2 flex justify-between text-[#8e9192] font-display text-[10px] uppercase tracking-widest">
                <span>BLENDER 3D MESH // UNITY HIGH-PERFORMANCE ENGINE</span>
                <span>HIGH FIDELITY</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* News & Studio Dispatches (Asymmetric Hairline Grid)                        */}
        {/* ========================================================================= */}
        <section className="px-6 md:px-16 py-16" id="dispatches">
          <div className="flex items-baseline justify-between mb-8 pb-2 border-b border-[#444748]/30">
            <div>
              <span className="font-display text-[10px] text-[#8e9192] tracking-widest uppercase block mb-1">
                SECTION 01 // ARCHIVE
              </span>
              <h2 className="font-display text-2xl md:text-3xl text-white uppercase tracking-tight">
                Recent Studio Dispatches
              </h2>
            </div>
            <span className="hidden md:inline font-display text-[10px] text-[#8e9192] tracking-widest uppercase">
              SHOWING {DISPATCHES.length} BROADCASTS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-[#444748]/30">
            {DISPATCHES.map((d) => (
              <article
                key={d.title}
                className="p-8 border-r border-b border-[#444748]/30 bg-[#0e0e0e] hover:bg-[#1c1b1b] transition-colors duration-150 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="font-display text-[10px] text-[#8e9192] tracking-widest uppercase">
                      {d.date} // {d.code}
                    </span>
                    <span className="border border-[#444748]/40 px-2 py-0.5 font-display text-[10px] text-[#c7c6c6] uppercase">
                      {d.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-xl text-white group-hover:text-white transition-colors duration-150 mb-3 uppercase tracking-tight">
                    {d.title}
                  </h3>
                  <p className="text-[#c7c6c6] text-sm mb-6 leading-relaxed font-light">
                    {d.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#444748]/20 flex items-center justify-between font-display text-[10px]">
                  <span className="text-[#8e9192] uppercase">{d.dept}</span>
                  <button
                    onClick={() => setActiveDispatch(d)}
                    className="text-white tracking-widest uppercase group-hover:underline inline-flex items-center gap-2"
                  >
                    READ FULL DISPATCH →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* Stripped-Down Contact Directory Grid (Technical Spec Style)               */}
        {/* ========================================================================= */}
        <section className="px-6 md:px-16 py-16" id="contact">
          <div className="flex items-baseline justify-between mb-8 pb-2 border-b border-[#444748]/30">
            <div>
              <span className="font-display text-[10px] text-[#8e9192] tracking-widest uppercase block mb-1">
                SECTION 02 // COMMUNICATIONS
              </span>
              <h2 className="font-display text-2xl md:text-3xl text-white uppercase tracking-tight">
                Direct Transmission Directory
              </h2>
            </div>
            <span className="font-display text-[10px] text-[#8e9192] tracking-widest uppercase">
              STUDIO CONTACT CHANNELS
            </span>
          </div>

          <div className="border-t border-[#444748]/30">
            {/* Single Unified Studio Contact Row */}
            <div className="py-6 px-2 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#1c1b1b] transition-colors">
              <div className="w-full md:w-1/3">
                <span className="font-display text-xs text-white tracking-widest uppercase block">
                  STUDIO CORRESPONDENCE
                </span>
                <span className="text-[#8e9192] font-display text-[10px] tracking-widest uppercase">
                  DIRECT INQUIRIES & PARTNERSHIPS
                </span>
              </div>
              <div className="w-full md:w-1/3">
                <a
                  className="text-white hover:underline font-mono text-sm tracking-wide"
                  href={`mailto:${studioInfo.contact_email}`}
                >
                  {studioInfo.contact_email}
                </a>
              </div>
              <div className="w-full md:w-1/3 text-left md:text-right">
                <span className="font-display text-[10px] text-[#c7c6c6] uppercase tracking-widest">
                  RESPONSE SLA: 48 HOURS
                </span>
              </div>
            </div>
          </div>

          {/* Physical Coordinates & Social Mesh */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 mt-4 border-t border-[#444748]/30">
            {/* Physical Location */}
            <div className="p-6 bg-[#1c1b1b] border border-[#444748]/20">
              <span className="font-display text-[10px] text-[#8e9192] tracking-widest uppercase block mb-1">
                PHYSICAL HEADQUARTERS
              </span>
              <p className="font-display text-xs text-white uppercase tracking-widest">
                PESHAWAR LAB SECTOR 04, PAKISTAN
              </p>
              <p className="font-mono text-xs text-[#c7c6c6] mt-1">
                LOCATION: PESHAWAR, PAKISTAN
              </p>
              <div className="mt-4 pt-3 border-t border-[#444748]/20 flex items-center justify-between text-[#8e9192] font-display text-[10px] uppercase">
                <span>FACILITY ACCESS</span>
                <span className="text-white">BY PRIOR ACCREDITATION ONLY</span>
              </div>
            </div>

            {/* Social Media Link Matrix */}
            <div className="p-6 bg-[#1c1b1b] border border-[#444748]/20 flex flex-col justify-between">
              <div>
                <span className="font-display text-[10px] text-[#8e9192] tracking-widest uppercase block mb-2">
                  OFFICIAL FEEDS & CHANNELS
                </span>
                <div className="flex flex-wrap gap-x-4 gap-y-2 font-display text-xs tracking-widest uppercase">
                  <a className="text-[#c7c6c6] hover:text-white transition-colors" href="https://x.com" target="_blank" rel="noreferrer">
                    TWITTER/X →
                  </a>
                  <a className="text-[#c7c6c6] hover:text-white transition-colors" href="https://bsky.app" target="_blank" rel="noreferrer">
                    BLUESKY →
                  </a>
                  <a className="text-[#c7c6c6] hover:text-white transition-colors" href="https://github.com" target="_blank" rel="noreferrer">
                    GITHUB →
                  </a>
                  <a className="text-[#c7c6c6] hover:text-white transition-colors" href="https://discord.com" target="_blank" rel="noreferrer">
                    DISCORD COMMUNITY →
                  </a>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#444748]/20 flex items-center justify-between text-[#8e9192] font-display text-[10px] uppercase">
                <span>AUTHENTICATION PGP</span>
                <span className="font-mono text-[#c7c6c6]">0x7F...C8E1</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Dispatch Reader Modal */}
      {activeDispatch && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in"
          onClick={() => setActiveDispatch(null)}
        >
          <div
            className="w-full max-w-2xl bg-[#0e0e0e] border border-[#444748] p-6 md:p-8 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start border-b border-[#444748]/30 pb-3">
              <div>
                <span className="font-display text-[10px] text-[#8e9192] tracking-widest uppercase">
                  {activeDispatch.date} // {activeDispatch.code}
                </span>
                <h3 className="font-display text-xl text-white uppercase tracking-tight mt-1">
                  {activeDispatch.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveDispatch(null)}
                className="text-neutral-400 hover:text-white p-1"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="text-[#c7c6c6] text-sm leading-relaxed font-light">
              {activeDispatch.desc}
            </p>
            <div className="pt-4 border-t border-[#444748]/30 flex justify-between font-display text-[10px] text-[#8e9192] uppercase">
              <span>{activeDispatch.dept}</span>
              <span>ARCHIVED DISPATCH</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import VideoModal from '../components/VideoModal'
import { supabase, type StudioInfo } from '../lib/supabaseClient'

const DEFAULT_STUDIO_INFO: StudioInfo = {
  id: 1,
  manifesto:
    'Gamicon is an independent studio forging mechanics-driven, narrative-rich titles built without creative compromise. We reject automated formulas and safety-first design paradigms.',
  contact_email: 'contact@gamicon.studio',
  press_kit_url: 'https://gamicon.studio/press-kit.zip',
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
    date: '2025.04.18',
    code: 'PATCH 0.8.4',
    tag: 'PLAYTEST',
    title: 'NEON PROTOCOL — DETERMINISTIC KINEMATICS & CLOSED PLAYTEST ROUND 3',
    desc: 'Complete architectural overhaul of our Unreal Engine 5.4 physics pipeline. Introducing deterministic collision kinematics and 128Hz sub-tick networking designed for hyper-reactive gunplay without client-side prediction drift.',
    dept: 'ENGINEERING DEPT // KENJI SATO',
  },
  {
    date: '2025.03.02',
    code: 'PRODUCTION MILESTONE',
    tag: 'R&D REPORT',
    title: 'CHRONO MONOLITH: PRE-VIS SANCTUARY VOLUMETRIC SHADER PIPELINE',
    desc: 'Technical breakdown of our custom volumetric darkness shaders and Ray-Traced Subsurface Scattering methods engineered for the subterranean dark fantasy architecture of Chrono Monolith, paired with higher-order ambisonics.',
    dept: 'TECHNICAL ART // M. VANCE',
  },
  {
    date: '2025.01.14',
    code: 'STUDIO DISPATCH',
    tag: 'MANIFESTO',
    title: 'FOUNDER MANIFESTO: ON ZERO HITSCAN COMPROMISES AND AUTEUR DESIGN',
    desc: 'Studio Head Kenji Sato reflects on two years of independent autonomy, rejecting market-driven live-service retention tricks in pursuit of uncompromising narrative architecture and authoritative creative singular vision.',
    dept: 'DIRECTION // K. SATO',
  },
  {
    date: '2024.11.20',
    code: 'MEDIA RECEPTION',
    tag: 'COVER STORY',
    title: 'EDGE MAGAZINE FEATURE: VISUAL FIDELITY AND THE INDIE AVANT-GARDE',
    desc: '"Gamicon represents a rare phenomenon in contemporary gaming: a mid-sized studio wielding the technical firepower of a AAA titan while preserving the dangerous, poetic unpredictability of auteur cinema."',
    dept: 'EDITORIAL REPRINT // EDGE #398',
  },
]

export default function Press() {
  const [studioInfo, setStudioInfo] = useState<StudioInfo>(DEFAULT_STUDIO_INFO)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
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

  const handleDownloadPressKit = () => {
    if (studioInfo.press_kit_url) {
      window.open(studioInfo.press_kit_url, '_blank')
    } else {
      alert('Press kit master archive will begin download once media clearance is confirmed.')
    }
  }

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
              <span className="inline-block w-2 h-2 bg-white" />
              <span className="text-[#e5e2e1]">SYS_BUILD: 2025.REL_04</span>
              <span className="text-[#444748]">/</span>
              <span>PROTOCOL 100% INDEPENDENT</span>
            </div>
            <div>
              <span>MONTREAL LAB [45.5017° N, 73.5673° W]</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mt-4">
            <div className="lg:col-span-8">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-white uppercase tracking-tight">
                DISPATCHES // PRESS & DIRECTORY
              </h1>
              <p className="mt-4 text-[#c7c6c6] text-base md:text-lg max-w-2xl font-light leading-relaxed">
                Official studio communications, patch telemetry, verified media assets, and direct correspondence channels for Gamicon.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-col items-start lg:items-end gap-1 font-display">
              <span className="text-[10px] text-[#8e9192] tracking-widest uppercase">
                DISPATCH INDEX STATUS
              </span>
              <span className="text-xs text-white tracking-widest uppercase">
                ALL CHANNELS ACTIVE // VER_09
              </span>
              <a
                className="mt-2 text-[#c7c6c6] hover:text-white text-[10px] tracking-widest uppercase flex items-center gap-1 border-b border-[#444748] hover:border-white pb-0.5 transition-colors"
                href="#press-dossier"
              >
                JUMP TO MASTER ASSETS <span>↓</span>
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
                <span>LAB CAM 01 // MONTREAL DEV FLOOR</span>
                <span className="text-white flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-white inline-block animate-pulse" /> REC
                </span>
              </div>
              <div className="w-full aspect-[21/9] overflow-hidden bg-[#201f1f]">
                <img
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                  alt="Gamicon Montreal Dev Floor"
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
                <span>PROJECT: IRON TALON // ASSET PREVIEW</span>
                <span>VERIFIED KEY ART</span>
              </div>
              <div className="w-full aspect-[21/9] overflow-hidden bg-[#201f1f]">
                <img
                  className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
                  alt="Iron Talon Key Art"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUqrBiEbtQ9z9K5SEojag5pJIoM2QysO2Slf7Fzm7-m-jHdleNbpGaEiGCJUyR9yCJUuqwiFDLzeZm2QWTc1atIxMay_vT3mpX4WJp32ab5efbwQxMOfDZ-Fgol9Fie8r5NzJ40fV8VNeHV9a7DMzDc4zVqnigDsxw64XSRUGfBOGdk3CCLdlurwanYP_0lzqRD8WoK6Rp68Bu1M64pkTlSXfxB8NqhYKVJEa8rWtLG2eWy-anw7iJ"
                />
              </div>
              <div className="mt-2 flex justify-between text-[#8e9192] font-display text-[10px] uppercase tracking-widest">
                <span>UNREAL 5.4 CUSTOM PHYSICS MESH</span>
                <span>4K MASTER READY</span>
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
              SHOWING {DISPATCHES.length} OF 48 BROADCASTS
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
        {/* Architectural Break / Cinematic Keyframe Showcase                        */}
        {/* ========================================================================= */}
        <section className="border-y border-[#444748]/30 bg-[#1c1b1b] overflow-hidden">
          <div className="px-6 md:px-16 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="flex items-center gap-2 font-display text-[10px] text-[#8e9192] uppercase tracking-widest mb-1">
                <span className="w-1.5 h-1.5 bg-white inline-block" />
                <span>CINEMATIC LETTERBOX TEASER</span>
              </div>
              <h2 className="font-display text-2xl md:text-4xl text-white uppercase tracking-tight mb-2">
                THE PROTOCOL IN MOTION
              </h2>
              <p className="text-[#c7c6c6] text-sm md:text-base mb-6 font-light leading-relaxed">
                All captured in-engine via real-time camera tracks. No pre-rendered CGI. 60 FPS uncompressed telemetry streams available for verified press members.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setIsVideoModalOpen(true)}
                  className="px-6 py-2.5 border border-white text-white font-display text-xs uppercase hover:bg-white hover:text-black transition-all tracking-widest flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">play_arrow</span> PLAY 4K REEL
                </button>
                <span className="font-display text-[10px] text-[#8e9192] uppercase tracking-widest">
                  RUNTIME: 03:42 // 21:9 DCI
                </span>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div
                onClick={() => setIsVideoModalOpen(true)}
                className="relative border border-[#444748]/40 bg-black aspect-[21/9] flex items-center justify-center group overflow-hidden cursor-pointer"
              >
                <img
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  alt="Neon Protocol Cinematic Letterbox Teaser"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkKPggWPasFAWGnfXcSt2AbgsrEmshC7EkE1aMz4BH8bVu3fEWLEwlgH2HQiKA_ArCsLrAI0NbhgsBEC2avH8nuLCERIhvjRArI0aFNEjsc-p1VEibvCZQSN4TLDu4EtXvBs00-eHSsa-hQz7oPI012vI-6bXqG5EKkLIjfI-A3fbAxxFTmT9a3uF4vIpcsNq2CLBNZcNQFWNayt02rgtdLsCFdSJjTTZU0gVDhFE17egvrsLye3Ns"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <div className="w-14 h-14 rounded-full border border-white flex items-center justify-center bg-black/60">
                    <span className="material-symbols-outlined text-white text-2xl">play_arrow</span>
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0e] via-transparent to-[#0e0e0e]/40 pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-white font-display text-[10px] uppercase">
                  <span className="tracking-widest">CAM_04 // ANAMORPHIC T2.1</span>
                  <span className="tracking-widest">PRORES 4444 XQ [DIRECT FEED]</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* Press Kit & Brand Asset Dossier                                           */}
        {/* ========================================================================= */}
        <section className="px-6 md:px-16 py-16" id="press-dossier">
          <div className="bg-[#2a2a2a] border border-[#444748]/40 p-6 md:p-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#444748]/40">
              <div>
                <div className="flex items-center gap-2 text-white font-display text-[10px] tracking-widest uppercase mb-1">
                  <span className="w-1.5 h-1.5 bg-white inline-block" />
                  <span>OFFICIAL REPOSITORY // MEDIA CLEARANCE</span>
                </div>
                <h2 className="font-display text-2xl md:text-4xl text-white uppercase tracking-tight">
                  PRESS KIT & BRAND ASSET DOSSIER
                </h2>
                <p className="text-[#c7c6c6] text-sm md:text-base mt-2 font-light">
                  All visual assets are cleared for editorial, print, broadcast, and digital review publication.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="text-left md:text-right font-display text-[10px] text-[#8e9192] tracking-widest uppercase">
                  <span>ASSET_PACKAGE_VER_2.4</span>
                  <span className="block text-white font-bold">[3.8 GB MASTER ARCHIVE]</span>
                </div>
                <button
                  onClick={handleDownloadPressKit}
                  className="px-6 py-3 border border-white text-white font-display text-xs uppercase hover:bg-white hover:text-black transition-all tracking-widest flex items-center gap-2 whitespace-nowrap"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span>
                  DOWNLOAD COMPLETE PRESS KIT (.ZIP)
                </button>
              </div>
            </div>

            {/* 4-Column Technical Asset Modules */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[#444748]/30 mt-8 border border-[#444748]/30">
              {/* Module 1: Logos */}
              <div className="p-6 bg-[#201f1f] hover:bg-[#2a2a2a] transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-[#8e9192] font-display text-[10px] mb-2 uppercase tracking-widest">
                    <span>CATEGORY 01</span>
                    <span>VECTOR / EPS / PNG</span>
                  </div>
                  <h4 className="font-display text-xs text-white tracking-widest uppercase mb-2">
                    HIGH-RESOLUTION LOGOS & MARKS
                  </h4>
                  <p className="text-[#c7c6c6] text-xs mb-4 leading-relaxed font-light">
                    Official Gamicon wordmark, geometric iconography, black/white monochrome lockups, and studio crests in vector EPS, scalable SVG, and transparent 8K PNG.
                  </p>
                </div>
                <button
                  onClick={handleDownloadPressKit}
                  className="inline-flex items-center justify-between text-white font-display text-[10px] tracking-widest uppercase border-t border-[#444748]/30 pt-3 hover:underline text-left"
                >
                  <span>DOWNLOAD ASSETS (180 MB)</span>
                  <span>↓</span>
                </button>
              </div>

              {/* Module 2: Neon Protocol Art */}
              <div className="p-6 bg-[#201f1f] hover:bg-[#2a2a2a] transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-[#8e9192] font-display text-[10px] mb-2 uppercase tracking-widest">
                    <span>CATEGORY 02</span>
                    <span>RAW 4K / PRORES</span>
                  </div>
                  <h4 className="font-display text-xs text-white tracking-widest uppercase mb-2">
                    NEON PROTOCOL 4K RAW KEY ART
                  </h4>
                  <p className="text-[#c7c6c6] text-xs mb-4 leading-relaxed font-light">
                    Uncompressed 3840x2160 native frames, vertical poster art, high-bitrate ProRes cinematic b-roll loops, and character render turnarounds without UI clutter.
                  </p>
                </div>
                <button
                  onClick={handleDownloadPressKit}
                  className="inline-flex items-center justify-between text-white font-display text-[10px] tracking-widest uppercase border-t border-[#444748]/30 pt-3 hover:underline text-left"
                >
                  <span>DOWNLOAD ASSETS (1.4 GB)</span>
                  <span>↓</span>
                </button>
              </div>

              {/* Module 3: Runebound & Iron Talon */}
              <div className="p-6 bg-[#201f1f] hover:bg-[#2a2a2a] transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-[#8e9192] font-display text-[10px] mb-2 uppercase tracking-widest">
                    <span>CATEGORY 03</span>
                    <span>COMBAT ART / LORE</span>
                  </div>
                  <h4 className="font-display text-xs text-white tracking-widest uppercase mb-2">
                    RUNEBOUND & IRON TALON PACK
                  </h4>
                  <p className="text-[#c7c6c6] text-xs mb-4 leading-relaxed font-light">
                    Key splash frames, architectural environment concept art by lead illustrators, combat mech blueprints, and typographical logo variants.
                  </p>
                </div>
                <button
                  onClick={handleDownloadPressKit}
                  className="inline-flex items-center justify-between text-white font-display text-[10px] tracking-widest uppercase border-t border-[#444748]/30 pt-3 hover:underline text-left"
                >
                  <span>DOWNLOAD ASSETS (1.2 GB)</span>
                  <span>↓</span>
                </button>
              </div>

              {/* Module 4: Studio Headshots & Bios */}
              <div className="p-6 bg-[#201f1f] hover:bg-[#2a2a2a] transition-colors flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center text-[#8e9192] font-display text-[10px] mb-2 uppercase tracking-widest">
                    <span>CATEGORY 04</span>
                    <span>STAFF & B-ROLL</span>
                  </div>
                  <h4 className="font-display text-xs text-white tracking-widest uppercase mb-2">
                    STUDIO LAB B-ROLL & BIOS
                  </h4>
                  <p className="text-[#c7c6c6] text-xs mb-4 leading-relaxed font-light">
                    High-resolution monochrome portraits of founder Kenji Sato, executive producers, audio directors, plus official studio biography dossier (.PDF).
                  </p>
                </div>
                <button
                  onClick={handleDownloadPressKit}
                  className="inline-flex items-center justify-between text-white font-display text-[10px] tracking-widest uppercase border-t border-[#444748]/30 pt-3 hover:underline text-left"
                >
                  <span>DOWNLOAD ASSETS (850 MB)</span>
                  <span>↓</span>
                </button>
              </div>
            </div>

            {/* Telemetry Notice */}
            <div className="mt-4 pt-4 border-t border-[#444748]/30 flex flex-col sm:flex-row justify-between items-start sm:items-center text-[#8e9192] font-display text-[10px] tracking-widest gap-2 uppercase">
              <span>MEDIA WATERMARK PROTOCOL: NOT REQUIRED FOR VERIFIED ACCREDITED PRESS</span>
              <span>PRESS_KIT_SOURCE: {studioInfo.press_kit_url || 'GAMICON CDN'}</span>
            </div>
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
              SECURE CHANNEL PGP AVAILABLE
            </span>
          </div>

          <div className="border-t border-[#444748]/30 divide-y divide-[#444748]/20">
            {/* Row 1: General */}
            <div className="py-6 px-2 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#1c1b1b] transition-colors">
              <div className="w-full md:w-1/3">
                <span className="font-display text-xs text-white tracking-widest uppercase block">
                  GENERAL INQUIRIES
                </span>
                <span className="text-[#8e9192] font-display text-[10px] tracking-widest uppercase">
                  NON-URGENT TRANSMISSIONS
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
                  RESPONSE SLA: 48 HOURS MAXIMUM
                </span>
              </div>
            </div>

            {/* Row 2: Press & Editorial */}
            <div className="py-6 px-2 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#1c1b1b] transition-colors">
              <div className="w-full md:w-1/3">
                <span className="font-display text-xs text-white tracking-widest uppercase block">
                  PRESS & EDITORIAL
                </span>
                <span className="text-[#8e9192] font-display text-[10px] tracking-widest uppercase">
                  MEDIA ACCESS & INTERVIEWS
                </span>
              </div>
              <div className="w-full md:w-1/3">
                <a
                  className="text-white hover:underline font-mono text-sm tracking-wide"
                  href="mailto:press@gamicon.studio"
                >
                  press@gamicon.studio
                </a>
              </div>
              <div className="w-full md:w-1/3 text-left md:text-right">
                <span className="font-display text-[10px] text-[#c7c6c6] uppercase tracking-widest">
                  INTERVIEW DISPATCHES & EMBARGO ACCESS
                </span>
              </div>
            </div>

            {/* Row 3: Publishing */}
            <div className="py-6 px-2 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#1c1b1b] transition-colors">
              <div className="w-full md:w-1/3">
                <span className="font-display text-xs text-white tracking-widest uppercase block">
                  PUBLISHING & COMMISSIONS
                </span>
                <span className="text-[#8e9192] font-display text-[10px] tracking-widest uppercase">
                  COMMERCIAL & INSTITUTIONAL
                </span>
              </div>
              <div className="w-full md:w-1/3">
                <a
                  className="text-white hover:underline font-mono text-sm tracking-wide"
                  href="mailto:business@gamicon.studio"
                >
                  business@gamicon.studio
                </a>
              </div>
              <div className="w-full md:w-1/3 text-left md:text-right">
                <span className="font-display text-[10px] text-[#c7c6c6] uppercase tracking-widest">
                  INSTITUTIONAL PARTNERSHIPS ONLY
                </span>
              </div>
            </div>

            {/* Row 4: Ops & Support */}
            <div className="py-6 px-2 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#1c1b1b] transition-colors">
              <div className="w-full md:w-1/3">
                <span className="font-display text-xs text-white tracking-widest uppercase block">
                  ALPHA & COMMUNITY SUPPORT
                </span>
                <span className="text-[#8e9192] font-display text-[10px] tracking-widest uppercase">
                  PLAYER TELEMETRY & CRASH LOGS
                </span>
              </div>
              <div className="w-full md:w-1/3">
                <a
                  className="text-white hover:underline font-mono text-sm tracking-wide"
                  href="mailto:ops@gamicon.studio"
                >
                  ops@gamicon.studio
                </a>
              </div>
              <div className="w-full md:w-1/3 text-left md:text-right">
                <span className="font-display text-[10px] text-[#c7c6c6] uppercase tracking-widest">
                  AUTOMATED TELEMETRY INGESTION ACTIVE
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
                MONTREAL LAB SECTOR 04, QC, CANADA
              </p>
              <p className="font-mono text-xs text-[#c7c6c6] mt-1">
                COORDINATES: 45.5017° N, 73.5673° W
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
                  OFFICIAL FEEDS & BROADCAST PLATFORMS
                </span>
                <div className="flex flex-wrap gap-x-4 gap-y-2 font-display text-xs tracking-widest uppercase">
                  <a className="text-[#c7c6c6] hover:text-white transition-colors" href="https://x.com" target="_blank" rel="noreferrer">
                    TWITTER/X →
                  </a>
                  <a className="text-[#c7c6c6] hover:text-white transition-colors" href="https://youtube.com" target="_blank" rel="noreferrer">
                    YOUTUBE →
                  </a>
                  <a className="text-[#c7c6c6] hover:text-white transition-colors" href="https://bsky.app" target="_blank" rel="noreferrer">
                    BLUESKY →
                  </a>
                  <a className="text-[#c7c6c6] hover:text-white transition-colors" href="https://github.com" target="_blank" rel="noreferrer">
                    GITHUB →
                  </a>
                  <a className="text-[#c7c6c6] hover:text-white transition-colors" href="https://discord.com" target="_blank" rel="noreferrer">
                    DISCORD ALPHA →
                  </a>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#444748]/20 flex items-center justify-between text-[#8e9192] font-display text-[10px] uppercase">
                <span>OFFICIAL PUBLIC KEYS</span>
                <span className="font-mono text-[#c7c6c6]">0x7F...C8E1</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Video Modal Player */}
      <VideoModal
        isOpen={isVideoModalOpen}
        youtubeId="dQw4w9WgXcQ"
        title="THE PROTOCOL IN MOTION (4K DCI)"
        onClose={() => setIsVideoModalOpen(false)}
      />

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
              <span>TRANSMISSION ARCHIVED</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

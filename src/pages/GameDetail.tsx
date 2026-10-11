import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import VideoModal from '../components/VideoModal'
import { supabase, type Game } from '../lib/supabaseClient'

// Curated games metadata database fallback
const FALLBACK_GAMES: Record<string, {
  game: Game
  engine: string
  platforms: string
  director: string
  audio: string
  heroImage: string
  tenets: { num: string; title: string; desc: string }[]
  companions: { title: string; slug: string; year: string; genre: string; desc: string; img: string }[]
}> = {
  'neon-protocol': {
    game: {
      id: '1',
      title: 'NEON PROTOCOL',
      slug: 'neon-protocol',
      release_date: '2024-11-15',
      youtube_id: 'dQw4w9WgXcQ',
      description:
        'High-octane tactical cyber-action in a vertical megacity. Navigate corporate warfare with lethal cybernetic loadouts. Every encounter is a fast-twitch puzzle of momentum, spatial ballistic calculations, and consequence.',
      tags: ['Cyberpunk RPG', 'Available Now', 'Unreal Engine 5.4'],
    },
    engine: 'Unreal Engine 5.4 Custom Build',
    platforms: 'PC • PlayStation 5 • Xbox Series X',
    director: 'Kenji Sato & Gamicon Core Unit',
    audio: 'Spatial Ambisonics 3D Object Audio',
    heroImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBPDot2E_OV1D-vLdPARlhiiTmL9DFIXeS6qb3wDjw3xfq_Z0Qv-L8rIwrPl6bp88_emkbMejDOSSqzrnTWCVwKOSqSl6EDYPR3TmqFJOjJ8HaOoLzPENJsk2Q95af_QeQYCI4gknuBfg4BX35f_Hj08zKBE7-aVwtTUw7IflkFe1-QqQRZ7XVxbdb3VREFZAdTQhCBvcRq_XzhUdugkokgLlEljJVq093KrwA_9vSe-HPPj1vSAVVv',
    tenets: [
      {
        num: '01',
        title: 'Physical Integrity',
        desc: 'Real-time kinetic physics, deterministic penetration, and responsive frame timing. No superficial hitscan compromises.',
      },
      {
        num: '02',
        title: 'Diegetic Immersion',
        desc: 'Zero visual clutter. In-world tactical HUD telemetry, spatial acoustic clues, and environmental deduction replace minimaps.',
      },
      {
        num: '03',
        title: 'Open Combat',
        desc: 'Modular neural augmentations and high-altitude grapple kinematics allow unprecedented traversal across vertical corporate towers.',
      },
    ],
    companions: [
      {
        title: 'IRON TALON: 2184',
        slug: 'iron-talon-2184',
        year: '2025',
        genre: 'MECH SIMULATOR',
        desc: 'Heavy armor warfare across scorched outer colonies. Ballistic resource management and realistic hydraulic recoil simulation.',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHN47rmROJicK9klFUzbZOudT2MB8wkdW4Sc5lg89-Fa7pHTtPM21oWvvq1ruet7SAZMoFjmpDBK3ohT8Y64Cy3VlG1m9VFmeNuKplkRrlTDNlj0w1NFAgUSwqzpwEwPy5RgQdlQvsilgrNaxUjKoJF4cRalK9CuKuWtsLkZpjkhCJNROTziIe65CYgf2Nl9NhSeg2xywl_-erVzbEE308FLHVOm655w5ArTikC_UYtesRwz1Dh8i5',
      },
      {
        title: 'RUNEBOUND: OBLIVION',
        slug: 'runebound-oblivion',
        year: '2026',
        genre: 'DARK FANTASY',
        desc: 'A solitary descent into ancestral subterranean tombs. Cryptic rune translations, spatial ritual puzzles, and uncompromising combat cadence.',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAai-OizVRHKUSAm2aoxw-gFfJsk1MRGE4oeLy5EaLH2zFv_L1K2dBv3y4MsoPPOrO_S6vHOyqpvlN57kUophNrJodfMX8v-FDTPIRkNufDnQDMwXv-7Dgf6l9wmJnSEuan8Tu6Ks6swgED7kVeWxRfya0zd_vjJYkSKAbV8KHmSdqDB6BNfUph3LDXBBv4AxH8E92LSgw2Ls1D9k_cPcNzEQboDAbTcIUr8fmsqZBrcHzjh_wzcn31',
      },
    ],
  },
  'iron-talon-2184': {
    game: {
      id: '2',
      title: 'IRON TALON: 2184',
      slug: 'iron-talon-2184',
      release_date: '2025-10-30',
      youtube_id: 'dQw4w9WgXcQ',
      description:
        'Heavy armor warfare across scorched outer colonies. Ballistic resource management and realistic hydraulic recoil simulation in real-time calculated atmospheric environments.',
      tags: ['Tactical Mech Warfare', 'Release 2025', 'Active Prototype'],
    },
    engine: 'Unreal Engine 5.4 Chaos Physics',
    platforms: 'PC • Next-Gen Platforms',
    director: 'Gamicon Heavy Ordnance Lab',
    audio: 'Dynamic Acoustic Impulse Calibration',
    heroImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCHN47rmROJicK9klFUzbZOudT2MB8wkdW4Sc5lg89-Fa7pHTtPM21oWvvq1ruet7SAZMoFjmpDBK3ohT8Y64Cy3VlG1m9VFmeNuKplkRrlTDNlj0w1NFAgUSwqzpwEwPy5RgQdlQvsilgrNaxUjKoJF4cRalK9CuKuWtsLkZpjkhCJNROTziIe65CYgf2Nl9NhSeg2xywl_-erVzbEE308FLHVOm655w5ArTikC_UYtesRwz1Dh8i5',
    tenets: [
      {
        num: '01',
        title: 'Hydraulic Weight Dynamics',
        desc: 'Every bipedal chassis models mass inertia, torque distribution, and surface friction.',
      },
      {
        num: '02',
        title: 'Thermal Dissipation',
        desc: 'Sustained energy discharge risks internal meltdown. Divert coolant or vent atmosphere.',
      },
      {
        num: '03',
        title: 'Locational Armor Stripping',
        desc: 'Targeted kinetic penetrators fracture external ceramics exposing vital reactor cores.',
      },
    ],
    companions: [
      {
        title: 'NEON PROTOCOL',
        slug: 'neon-protocol',
        year: '2024',
        genre: 'CYBERPUNK RPG',
        desc: 'High-octane tactical cyber-action in a vertical megacity. Lethal cybernetic loadouts.',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPDot2E_OV1D-vLdPARlhiiTmL9DFIXeS6qb3wDjw3xfq_Z0Qv-L8rIwrPl6bp88_emkbMejDOSSqzrnTWCVwKOSqSl6EDYPR3TmqFJOjJ8HaOoLzPENJsk2Q95af_QeQYCI4gknuBfg4BX35f_Hj08zKBE7-aVwtTUw7IflkFe1-QqQRZ7XVxbdb3VREFZAdTQhCBvcRq_XzhUdugkokgLlEljJVq093KrwA_9vSe-HPPj1vSAVVv',
      },
      {
        title: 'RUNEBOUND: OBLIVION',
        slug: 'runebound-oblivion',
        year: '2026',
        genre: 'DARK FANTASY',
        desc: 'A solitary descent into ancestral subterranean tombs. Cryptic rune translations and spatial ritual puzzles.',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAai-OizVRHKUSAm2aoxw-gFfJsk1MRGE4oeLy5EaLH2zFv_L1K2dBv3y4MsoPPOrO_S6vHOyqpvlN57kUophNrJodfMX8v-FDTPIRkNufDnQDMwXv-7Dgf6l9wmJnSEuan8Tu6Ks6swgED7kVeWxRfya0zd_vjJYkSKAbV8KHmSdqDB6BNfUph3LDXBBv4AxH8E92LSgw2Ls1D9k_cPcNzEQboDAbTcIUr8fmsqZBrcHzjh_wzcn31',
      },
    ],
  },
  'runebound-oblivion': {
    game: {
      id: '3',
      title: 'RUNEBOUND: OBLIVION',
      slug: 'runebound-oblivion',
      release_date: '2025-05-20',
      youtube_id: 'dQw4w9WgXcQ',
      description:
        'Unforgiving dungeon delving into forbidden subterranean monoliths. Decipher ancient runes and harvest elder power with permadeath systems that enforce ruthless precision.',
      tags: ['Dark Fantasy Roguelike', 'Alpha Q2 2025', 'PC // PS5'],
    },
    engine: 'Gamicon Custom Voxel Runic Pipeline',
    platforms: 'PC • PlayStation 5',
    director: 'Aria Thorne & Gamicon Core Unit',
    audio: 'Binaural Tomb Reverberation Profile',
    heroImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAai-OizVRHKUSAm2aoxw-gFfJsk1MRGE4oeLy5EaLH2zFv_L1K2dBv3y4MsoPPOrO_S6vHOyqpvlN57kUophNrJodfMX8v-FDTPIRkNufDnQDMwXv-7Dgf6l9wmJnSEuan8Tu6Ks6swgED7kVeWxRfya0zd_vjJYkSKAbV8KHmSdqDB6BNfUph3LDXBBv4AxH8E92LSgw2Ls1D9k_cPcNzEQboDAbTcIUr8fmsqZBrcHzjh_wzcn31',
    tenets: [
      {
        num: '01',
        title: 'Frame-Accurate Parry Matrix',
        desc: 'Cadence over combos. Every enemy strike possesses precise telegraphs rewardable by millisecond deflections.',
      },
      {
        num: '02',
        title: 'Seeded Runic Labyrinth',
        desc: 'Topology regenerates deterministically using archaic cryptographic seeds rather than generic noise.',
      },
      {
        num: '03',
        title: 'Elder Inscription Synergies',
        desc: 'Carve active glyphs into stone tablets. Combinatorial elemental effects alter the environment permanently.',
      },
    ],
    companions: [
      {
        title: 'NEON PROTOCOL',
        slug: 'neon-protocol',
        year: '2024',
        genre: 'CYBERPUNK RPG',
        desc: 'High-octane tactical cyber-action in a vertical megacity. Lethal cybernetic loadouts.',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPDot2E_OV1D-vLdPARlhiiTmL9DFIXeS6qb3wDjw3xfq_Z0Qv-L8rIwrPl6bp88_emkbMejDOSSqzrnTWCVwKOSqSl6EDYPR3TmqFJOjJ8HaOoLzPENJsk2Q95af_QeQYCI4gknuBfg4BX35f_Hj08zKBE7-aVwtTUw7IflkFe1-QqQRZ7XVxbdb3VREFZAdTQhCBvcRq_XzhUdugkokgLlEljJVq093KrwA_9vSe-HPPj1vSAVVv',
      },
      {
        title: 'IRON TALON: 2184',
        slug: 'iron-talon-2184',
        year: '2025',
        genre: 'MECH SIMULATOR',
        desc: 'Squad-based mechanized warfare across ravaged frontier wastelands.',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHN47rmROJicK9klFUzbZOudT2MB8wkdW4Sc5lg89-Fa7pHTtPM21oWvvq1ruet7SAZMoFjmpDBK3ohT8Y64Cy3VlG1m9VFmeNuKplkRrlTDNlj0w1NFAgUSwqzpwEwPy5RgQdlQvsilgrNaxUjKoJF4cRalK9CuKuWtsLkZpjkhCJNROTziIe65CYgf2Nl9NhSeg2xywl_-erVzbEE308FLHVOm655w5ArTikC_UYtesRwz1Dh8i5',
      },
    ],
  },
}

export default function GameDetail() {
  const { slug } = useParams<{ slug: string }>()
  const activeSlug = slug || 'neon-protocol'
  const fallback = FALLBACK_GAMES[activeSlug] || FALLBACK_GAMES['neon-protocol']

  const [game, setGame] = useState<Game>(fallback.game)
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [isPlayingInline, setIsPlayingInline] = useState(false)
  const [isAudioMuted, setIsAudioMuted] = useState(false)

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

  return (
    <div className="bg-[#050505] text-[#e5e2e1] antialiased min-h-screen selection:bg-white selection:text-black">
      <Header />

      {/* =========================================================================
             HERO CINEMATIC LETTERBOX PLAYER (100vh Fullscreen Viewport)
             ========================================================================= */}
      <section className="relative w-full h-screen bg-[#050505] flex flex-col justify-between overflow-hidden pt-20" id="hero-player">
        {/* Video / Backdrop Layer */}
        <div className="absolute inset-0 z-0">
          {isPlayingInline ? (
            <iframe
              className="w-full h-full object-cover"
              src={`https://www.youtube-nocookie.com/embed/${game.youtube_id}?autoplay=1&controls=1&rel=0`}
              title={game.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <img
              className="w-full h-full object-cover object-center filter brightness-[0.78] contrast-[1.12]"
              alt={`${game.title} cinematic letterbox backdrop`}
              src={fallback.heroImage}
            />
          )}
          {/* Top and bottom letterbox falloff */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/70 via-transparent to-[#050505] pointer-events-none" />
        </div>

        {/* Letterbox Upper Telemetry Strip */}
        <div className="relative z-10 w-full px-6 md:px-16 pt-6 flex justify-between items-start pointer-events-none">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-white rounded-none inline-block animate-pulse" />
              <span className="font-display text-[10px] text-white tracking-widest uppercase">
                EXHIBITION // CINEMATIC REEL // {game.slug.toUpperCase()}
              </span>
            </div>
            <span className="font-display text-[10px] text-neutral-400">
              SOURCE: {fallback.engine} (NATIVE 4K)
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-4 text-right">
            <span className="font-display text-[10px] text-neutral-400 border border-[#444748]/30 px-2 py-1">
              21:9 LETTERBOX
            </span>
            <span className="font-display text-[10px] text-white border border-white/50 px-2 py-1">
              SPATIAL AMBISONICS
            </span>
          </div>
        </div>

        {/* Center Play Action */}
        {!isPlayingInline && (
          <div className="relative z-10 self-center my-auto flex flex-col items-center">
            <button
              aria-label="Play Cinematic Trailer"
              onClick={() => setIsVideoModalOpen(true)}
              className="group w-20 h-20 md:w-24 md:h-24 rounded-none border border-white/80 hover:border-white bg-[#050505]/40 backdrop-blur-sm flex items-center justify-center transition-all duration-150 hover:bg-white text-white hover:text-[#050505]"
              id="play-button"
            >
              <span className="material-symbols-outlined text-4xl group-hover:scale-110 transition-transform duration-150">
                play_arrow
              </span>
            </button>
            <span className="mt-4 font-display text-[10px] tracking-widest text-white/80 uppercase">
              WATCH REVEAL TRAILER
            </span>
          </div>
        )}

        {/* Letterbox Lower Telemetry & Playback Controls Bar */}
        <div className="relative z-10 w-full px-6 md:px-16 pb-8 space-y-3">
          {/* 1px Precision Scrubber Bar */}
          <div
            onClick={() => setIsVideoModalOpen(true)}
            className="w-full bg-[#444748]/30 h-[2px] cursor-pointer group relative"
          >
            <div className="bg-white h-full w-[49.6%] relative">
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white" />
            </div>
          </div>

          {/* Playback Telemetry Control Row */}
          <div className="flex items-center justify-between font-display text-[10px] text-neutral-400">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsPlayingInline(!isPlayingInline)}
                aria-label="Pause/Play"
                className="text-white hover:text-white transition-colors flex items-center space-x-1"
              >
                <span className="material-symbols-outlined text-lg">
                  {isPlayingInline ? 'pause' : 'play_arrow'}
                </span>
              </button>
              <div className="tracking-widest tabular-nums text-white">
                02:14 <span className="text-neutral-500">/ 04:30</span>
              </div>
              <span className="hidden md:inline-block text-neutral-500">CODEC // AV1 4320p HDR10</span>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => setIsAudioMuted(!isAudioMuted)}
                aria-label="Audio Toggle"
                className="hover:text-white transition-colors flex items-center space-x-1"
              >
                <span className="material-symbols-outlined text-lg">
                  {isAudioMuted ? 'volume_off' : 'volume_up'}
                </span>
                <span className="hidden sm:inline font-display text-[10px]">
                  SPATIAL: {isAudioMuted ? 'MUTED' : 'ACTIVE'}
                </span>
              </button>
              <button
                onClick={() => setIsVideoModalOpen(true)}
                aria-label="Fullscreen"
                className="hover:text-white transition-colors flex items-center"
              >
                <span className="material-symbols-outlined text-lg">fullscreen</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
             HIGH-CONTRAST EXHIBITION GALLERY TRANSITION (Pristine White Canvas)
             ========================================================================= */}
      <main className="w-full bg-[#FFFFFF] text-[#0A0A0A] py-16 md:py-28 px-6 md:px-16 transition-colors duration-200">
        <div className="max-w-7xl mx-auto">
          {/* Monolithic Header Row */}
          <div className="border-b border-[#E5E5E5] pb-8 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="font-display text-[10px] text-[#737373] tracking-widest uppercase mb-2">
                ARCHIVE // TITLE DOSSIER // {game.slug.toUpperCase()}
              </div>
              <h1 className="font-display text-4xl sm:text-6xl md:text-8xl tracking-tighter uppercase font-light text-[#0A0A0A] leading-none">
                {game.title}
              </h1>
            </div>
            <div className="text-left md:text-right">
              <span className="font-display text-xs text-[#0A0A0A] tracking-widest uppercase block">
                {game.release_date}
              </span>
              <span className="font-display text-[10px] text-[#737373] uppercase tracking-widest">
                Worldwide Release
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
                    <dt className="font-display text-[10px] text-[#737373] uppercase">Audio</dt>
                    <dd className="font-display text-[10px] text-[#0A0A0A] text-right">
                      {fallback.audio}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Exhibition Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#E5E5E5]">
                <a
                  className="w-full sm:w-auto text-center border border-[#0A0A0A] bg-[#0A0A0A] text-[#FFFFFF] hover:bg-transparent hover:text-[#0A0A0A] px-8 py-4 font-display text-xs uppercase tracking-widest transition-all duration-150"
                  href="#hero-player"
                  onClick={() => setIsVideoModalOpen(true)}
                >
                  Watch In Native 4K
                </a>
                <Link
                  to="/press"
                  className="w-full sm:w-auto text-center border border-[#CCCCCC] bg-transparent text-[#0A0A0A] hover:border-[#0A0A0A] px-8 py-4 font-display text-xs uppercase tracking-widest transition-all duration-150 flex items-center justify-center space-x-2"
                >
                  <span>Press Kit (4K)</span>
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
                    Full tactile dual-sense integration, custom spatial audio impulse profiles, and ultra-wide telemetry verified for high-resolution gallery master rigs.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Curated Provenance Description, Core Tenets, Edge Quote */}
            <div className="lg:col-span-7 flex flex-col space-y-16 lg:pl-8">
              {/* Curated Lead Description */}
              <div className="space-y-6">
                <div className="font-display text-[10px] text-[#737373] tracking-widest uppercase">
                  PROVENANCE & SYNOPSIS
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
             STUDIO WORKSPACE ATMOSPHERE (Interlude Section)
             ========================================================================= */}
      <section className="w-full bg-[#0E0E0E] py-20 px-6 md:px-16 border-t border-[#444748]/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 bg-white rounded-none inline-block" />
              <span className="font-display text-[10px] text-neutral-400 uppercase tracking-widest">
                FACILITY TELEMETRY
              </span>
            </div>
            <h2 className="font-display text-3xl font-light text-white tracking-tight">
              BUILT BY THE CORE UNIT
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Gamicon operates as an uncompromising research cluster. Concept artists, low-level engine architects, and sound designers build synchronously in an open acoustic bay.
            </p>
          </div>
          <div className="lg:col-span-8 border border-[#444748]/30 relative">
            <img
              className="w-full h-80 sm:h-96 object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-300"
              alt="Gamicon Montreal Studio Soundstage"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo7tE8fY0KSEERP9D_Y1H8DYxB1-4lulvgOvIjKkgB6_gfshAxTwBPOBYflXmb5AJyX3cEAqzy7iee_wk5l223sOedFZy3w6XIy5PZyJs0SNWurZVaMti2o_0iZWjuX-ULF905PmHvW_-WXUlOUYL6gynHtUO0J_nhP3ua_Ww0OqlCDUzRML_7RxFwWM-YJkPgkM4jylSxnAAZ_Z5MAvLkgtLH9LxIsc-JQqRb3to4429y6eR1AOaq"
            />
            <div className="absolute bottom-4 left-4 font-display text-[10px] text-white bg-[#050505]/80 backdrop-blur-sm px-3 py-1.5 border border-[#444748]/40">
              STUDIO SOUNDSTAGE // SECTOR 04
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
             COMPANION GALLERY ARCHIVE (Bottom Showcase)
             ========================================================================= */}
      <section className="w-full bg-[#050505] py-20 px-6 md:px-16 border-t border-[#444748]/30" id="games">
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

      {/* Video Modal Player */}
      <VideoModal
        isOpen={isVideoModalOpen}
        youtubeId={game.youtube_id}
        title={game.title}
        onClose={() => setIsVideoModalOpen(false)}
      />
    </div>
  )
}

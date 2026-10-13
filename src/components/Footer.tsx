import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase, parseGameRecord, type Game } from '../lib/supabaseClient'

const FALLBACK_GAMES = [
  {
    slug: 'echoes-of-desolation',
    code: 'ANM-01',
    title: 'ECHOES OF DESOLATION',
    tag: 'SURVIVAL HORROR',
  },
  {
    slug: 'ashes-of-escape',
    code: 'ANM-02',
    title: 'ASHES OF ESCAPE',
    tag: 'TACTICAL ACTION',
  },
  {
    slug: 'shadow-of-honor',
    code: 'ANM-03',
    title: 'SHADOW OF HONOR',
    tag: 'ZOMBIE HACK & SLASH',
  },
]

export default function Footer() {
  const [games, setGames] = useState<Game[]>([])
  const [copied, setCopied] = useState(false)
  const [utcTime, setUtcTime] = useState('')

  // 1. Fetch live games from Supabase
  useEffect(() => {
    async function fetchFooterGames() {
      try {
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .order('release_date', { ascending: false })
          .limit(3)

        if (!error && data && data.length > 0) {
          setGames(data.map(parseGameRecord))
        }
      } catch (err) {
        console.warn('Footer games fetch error, using fallback', err)
      }
    }
    fetchFooterGames()
  }, [])

  // 2. Live UTC Clock at 24fps rhythm
  useEffect(() => {
    function updateClock() {
      const now = new Date()
      const utcString = now.toUTCString().split(' ')[4] + ' UTC'
      setUtcTime(utcString)
    }
    updateClock()
    const timer = setInterval(updateClock, 1000 / 24)
    return () => clearInterval(timer)
  }, [])

  // 3. Copy email handler with 2s badge feedback
  const handleCopyEmail = () => {
    const email = 'TRANSMISSION@ANAMORPHIC.STUDIO'
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setCopied(true)
        setTimeout(() => {
          setCopied(false)
        }, 2000)
      })
      .catch((err) => {
        console.error('Copy failed', err)
      })
  }

  // 4. Return to top
  const handleReturnToZenith = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Determine display games (fetched or fallback)
  const displayGames =
    games.length > 0
      ? games.map((g, i) => ({
          slug: g.slug,
          code: `ANM-0${i + 1}`,
          title: g.title,
          tag: g.tags?.[0] || 'AUTEUR PRODUCTION',
        }))
      : FALLBACK_GAMES

  return (
    <footer id="studioFooter" className="w-full bg-[#050505] border-t border-[#1F1F1F] select-none">
      {/* ----------------------------------------------------------------------- */}
      {/* TIER 1: INTERACTIVE DIRECT-TRANSMISSION BAR (FULL-WIDTH TOP STRIP)      */}
      {/* ----------------------------------------------------------------------- */}
      <div className="w-full border-b border-[#1F1F1F] grid grid-cols-1 lg:grid-cols-12 bg-[#050505]">
        {/* Left Cell: Direct Transmission Channel (7 cols) */}
        <div
          onClick={handleCopyEmail}
          className="transmission-cell lg:col-span-7 p-6 sm:p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-[#1F1F1F] cursor-pointer flex flex-col justify-between gap-6 group"
          title="Click to copy transmission address"
        >
          <div className="flex items-center justify-between w-full">
            <span className="transmission-label font-mono text-[11px] uppercase tracking-widest text-[#888888] transition-colors">
              [ 00 // DIRECT TRANSMISSION CHANNEL ]
            </span>
            <span
              className={`reveal-badge font-mono text-[10px] tracking-wider uppercase border border-[#050505] px-2.5 py-1 font-bold flex items-center gap-1.5 ${
                copied ? '!opacity-100 !translate-x-0 bg-emerald-400 text-black border-black' : 'bg-[#FFFFFF] text-[#050505]'
              }`}
            >
              <span>{copied ? '[ COPIED TO CLIPBOARD // OK ]' : 'CLICK TO COPY ADDRESS'}</span>
              <span className="text-xs leading-none">{copied ? '✓' : '↗'}</span>
            </span>
          </div>

          <div className="flex flex-col">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] font-bold uppercase tracking-tight leading-none break-all sm:break-normal font-sans">
              TRANSMISSION@ANAMORPHIC.STUDIO
            </div>
            <div className="font-mono text-[10px] text-[#888888] group-hover:text-[#333333] tracking-widest uppercase mt-3 flex items-center gap-2 transition-colors">
              <span className="w-1.5 h-1.5 bg-current"></span>
              <span>SECURE ASYNC CHANNEL // PGP KEY VERIFIED // 24H SLA DISPATCH</span>
            </div>
          </div>
        </div>

        {/* Right Cell: Mechanical 'Back to Top' Elevator (5 cols) */}
        <a
          href="#top"
          onClick={handleReturnToZenith}
          className="elevator-cell lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between gap-6 cursor-pointer group"
          title="Return to page top"
        >
          {/* Animated white slide-up backdrop */}
          <div className="elevator-bg"></div>

          <div className="elevator-content flex items-center justify-between w-full">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#888888] group-hover:text-[#050505] transition-colors">
              [ ELEVATOR // PROTOCOL ]
            </span>
            <span className="font-mono text-[11px] text-[#888888] group-hover:text-[#050505] tracking-widest transition-colors">
              ALT: 0000M
            </span>
          </div>

          <div className="elevator-content flex items-end justify-between w-full">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight leading-none font-sans flex items-center gap-3">
              <span>[ RETURN TO ZENITH // Y:000.00 ↑ ]</span>
            </div>
            <div className="font-mono text-xl sm:text-2xl leading-none">↑</div>
          </div>
        </a>
      </div>

      {/* ----------------------------------------------------------------------- */}
      {/* TIER 2: EXPOSED 1PX HAIRLINE INDEX MATRIX (3 ASYMMETRIC BENTO CELLS)    */}
      {/* ----------------------------------------------------------------------- */}
      <div className="w-full border-b border-[#1F1F1F] bg-[#1F1F1F] grid grid-cols-1 lg:grid-cols-12 gap-px">
        {/* Cell 01: Indexed Navigation [ 01 // DIRECTORY ] (4 cols) */}
        <div className="bg-[#050505] lg:col-span-4 flex flex-col justify-between">
          <div className="p-4 border-b border-[#1F1F1F] flex items-center justify-between bg-[#080808]">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#FFFFFF] font-bold">
              [ 01 // DIRECTORY ]
            </span>
            <span className="font-mono text-[10px] tracking-widest text-[#888888]">
              INDEX // 04 ROUTES
            </span>
          </div>

          <div className="flex flex-col divide-y divide-[#1F1F1F] flex-1">
            {/* Row 01 */}
            <Link to="/" className="spec-table-row flex items-center justify-between p-4 sm:p-5 text-sm uppercase group">
              <span className="font-mono text-[11px] text-[#888888] row-meta">01</span>
              <span className="font-bold tracking-wider row-title text-center flex-1 mx-4">HOME</span>
              <span className="font-mono text-[11px] text-[#888888] row-meta">[ / ]</span>
            </Link>

            {/* Row 02 */}
            <Link to="/about" className="spec-table-row flex items-center justify-between p-4 sm:p-5 text-sm uppercase group">
              <span className="font-mono text-[11px] text-[#888888] row-meta">02</span>
              <span className="font-bold tracking-wider row-title text-center flex-1 mx-4">STUDIO VISION</span>
              <span className="font-mono text-[11px] text-[#888888] row-meta">[ /ABOUT ]</span>
            </Link>

            {/* Row 03 */}
            <Link to="/press" className="spec-table-row flex items-center justify-between p-4 sm:p-5 text-sm uppercase group">
              <span className="font-mono text-[11px] text-[#888888] row-meta">03</span>
              <span className="font-bold tracking-wider row-title text-center flex-1 mx-4">PRESS &amp; DISPATCHES</span>
              <span className="font-mono text-[11px] text-[#888888] row-meta">[ /PRESS ]</span>
            </Link>

            {/* Row 04 */}
            <Link to="/admin" className="spec-table-row flex items-center justify-between p-4 sm:p-5 text-sm uppercase group">
              <span className="font-mono text-[11px] text-[#888888] row-meta">04</span>
              <span className="font-bold tracking-wider row-title text-center flex-1 mx-4">CMS TERMINAL</span>
              <span className="font-mono text-[11px] text-[#888888] row-meta">[ /ADMIN ]</span>
            </Link>
          </div>

          <div className="p-3 border-t border-[#1F1F1F] font-mono text-[10px] text-[#888888] tracking-widest uppercase flex items-center justify-between bg-[#080808]">
            <span>TREE: LATENT</span>
            <span>SYS_LATENCY: 12MS</span>
          </div>
        </div>

        {/* Cell 02: Production Archive [ 02 // VERIFIED WORKS ] (4 cols) */}
        <div className="bg-[#050505] lg:col-span-4 flex flex-col justify-between">
          <div className="p-4 border-b border-[#1F1F1F] flex items-center justify-between bg-[#080808]">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#FFFFFF] font-bold">
              [ 02 // VERIFIED WORKS ]
            </span>
            <span className="font-mono text-[10px] tracking-widest text-[#888888]">
              CATALOG // {String(displayGames.length).padStart(2, '0')} BUILDS
            </span>
          </div>

          <div className="flex flex-col divide-y divide-[#1F1F1F] flex-1">
            {displayGames.map((item) => (
              <Link
                key={item.slug}
                to={`/game/${item.slug}`}
                className="spec-table-row flex items-center justify-between p-4 sm:p-5 text-sm uppercase group"
              >
                <span className="font-mono text-[11px] text-[#888888] row-meta">{item.code}</span>
                <span className="font-bold tracking-wider row-title text-center flex-1 mx-4">{item.title}</span>
                <span className="font-mono text-[10px] text-[#888888] row-meta text-right">[ {item.tag} ]</span>
              </Link>
            ))}
          </div>

          <div className="p-3 border-t border-[#1F1F1F] font-mono text-[10px] text-[#888888] tracking-widest uppercase flex items-center justify-between bg-[#080808]">
            <span>PIPELINE: UNITY // BLENDER</span>
            <span>MASTER: DISPATCHED</span>
          </div>
        </div>

        {/* Cell 03: External Signal Matrix & Live Telemetry [ 03 // EXTERNAL FEEDS ] (4 cols) */}
        <div className="bg-[#050505] lg:col-span-4 flex flex-col justify-between">
          <div className="p-4 border-b border-[#1F1F1F] flex items-center justify-between bg-[#080808]">
            <span className="font-mono text-[11px] uppercase tracking-widest text-[#FFFFFF] font-bold">
              [ 03 // EXTERNAL FEEDS ]
            </span>
            <span className="font-mono text-[10px] tracking-widest text-[#888888]">
              DIEGETIC SIGNALS
            </span>
          </div>

          {/* 2x2 Sub-Grid of Sharp Square Link Cells */}
          <div className="bg-[#1F1F1F] grid grid-cols-2 gap-px border-b border-[#1F1F1F]">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="feed-cell bg-[#050505] p-5 sm:p-6 flex items-center justify-between group cursor-pointer"
            >
              <span className="font-mono text-xs uppercase tracking-wider font-bold">GITHUB</span>
              <span className="font-mono text-xs transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>

            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="feed-cell bg-[#050505] p-5 sm:p-6 flex items-center justify-between group cursor-pointer"
            >
              <span className="font-mono text-xs uppercase tracking-wider font-bold">YOUTUBE</span>
              <span className="font-mono text-xs transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="feed-cell bg-[#050505] p-5 sm:p-6 flex items-center justify-between group cursor-pointer"
            >
              <span className="font-mono text-xs uppercase tracking-wider font-bold">X / TWITTER</span>
              <span className="font-mono text-xs transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>

            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="feed-cell bg-[#050505] p-5 sm:p-6 flex items-center justify-between group cursor-pointer"
            >
              <span className="font-mono text-xs uppercase tracking-wider font-bold">DISCORD</span>
              <span className="font-mono text-xs transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>
          </div>

          {/* Live Telemetry Readout Block */}
          <div className="p-5 flex flex-col justify-center gap-2.5 font-mono text-[11px] bg-[#050505] flex-1">
            <div className="flex items-center justify-between border-b border-[#1F1F1F]/60 pb-1.5">
              <span className="text-[#888888]">LOCAL STUDIO TIME:</span>
              <span className="text-[#FFFFFF] font-bold tracking-wider">{utcTime || '--:--:-- UTC'}</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#1F1F1F]/60 pb-1.5">
              <span className="text-[#888888]">OPTICAL FORMAT:</span>
              <span className="text-[#FFFFFF] font-bold">2.39:1 ANAMORPHIC SCOPE</span>
            </div>
            <div className="flex items-center justify-between pt-0.5">
              <span className="text-[#888888]">SYSTEM STATUS:</span>
              <div className="flex items-center gap-2 text-[#FFFFFF] font-bold">
                <span>ALL SYSTEMS NOMINAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------------- */}
      {/* TIER 3: MONUMENTAL EDGE-TO-EDGE VIEWPORT BLEED LOCKUP                   */}
      {/* ----------------------------------------------------------------------- */}
      <div className="monument-container w-full overflow-hidden border-b border-[#1F1F1F] bg-[#050505] relative px-4 sm:px-8 py-10 md:py-14 select-none">
        {/* Top Telemetry Row for Monument */}
        <div className="w-full flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-[#888888] tracking-widest uppercase mb-6 sm:mb-8 border-b border-[#1F1F1F] pb-3">
          <div className="flex items-center gap-3">
            <span className="text-[#FFFFFF] font-bold">[ SPEC // MONUMENT ]</span>
            <span className="hidden sm:inline">DIEGETIC APERTURE KINEMATICS</span>
          </div>
          <div className="flex items-center gap-4">
            <span>OPTICAL HORIZON: Y:0.50</span>
            <span>CALIBRATION: 2.39:1</span>
          </div>
        </div>

        {/* Center Monument Composition (SVG Emblem + Massive Wordmark) */}
        <div className="relative w-full flex flex-col items-center justify-center">
          {/* Top Half of Monument Wordmark & Emblem */}
          <div
            className="monument-top w-full flex items-center justify-between gap-4 md:gap-8 overflow-hidden"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)', marginBottom: '-1px' }}
          >
            {/* Animated Anamorphic Emblem (Inline SVG 100x100) */}
            <div className="emblem-group flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#FFFFFF]" xmlns="http://www.w3.org/2000/svg">
                {/* Corner Brackets */}
                <path className="emblem-bracket-tl animate-calibrate" d="M12 28 V12 H28" strokeWidth="2" />
                <path className="emblem-bracket-tr animate-calibrate" d="M88 28 V12 H72" strokeWidth="2" />
                <path className="emblem-bracket-bl animate-calibrate" d="M12 72 V88 H28" strokeWidth="2" />
                <path className="emblem-bracket-br animate-calibrate" d="M88 72 V88 H72" strokeWidth="2" />

                {/* Upper Geometric 'A' Apex */}
                <g className="emblem-top">
                  <polygon points="50,22 64,48 36,48" fill="#FFFFFF" stroke="none" />
                  <polygon points="50,34 56,48 44,48" fill="#050505" stroke="none" />
                </g>

                {/* Lower Geometric 'A' Legs */}
                <g className="emblem-bottom">
                  <polygon points="34,52 24,78 36,78 41,52" fill="#FFFFFF" stroke="none" />
                  <polygon points="66,52 76,78 64,78 59,52" fill="#FFFFFF" stroke="none" />
                  <rect x="44" y="60" width="12" height="4" fill="#FFFFFF" stroke="none" />
                </g>

                {/* Central 1px Horizontal Scanline Axis */}
                <line className="scanline-pulse" x1="6" y1="50" x2="94" y2="50" stroke="#FFFFFF" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Monument Wordmark */}
            <div
              className="w-full text-center tracking-[-0.03em] font-extrabold uppercase font-sans leading-[0.82] select-none text-[#FFFFFF]"
              style={{ fontSize: 'clamp(3.5rem, 13.2vw, 15rem)' }}
            >
              ANAMORPHIC
            </div>
          </div>

          {/* Crisp 2px Horizontal Negative-Space Optical Axis Divider + Laser Scanline */}
          <div className="relative w-full h-[2px] bg-transparent my-[1px] flex items-center justify-center overflow-visible">
            <div className="scanline-pulse w-full h-[1px] bg-[#FFFFFF] shadow-[0_0_8px_#FFFFFF]"></div>
            <div className="absolute bg-[#050505] px-3 py-0.5 border border-[#1F1F1F] font-mono text-[9px] text-[#888888] tracking-widest hidden md:block">
              SCOPE: 2.39:1 // 0.00° HORIZON AXIS
            </div>
          </div>

          {/* Bottom Half of Monument Wordmark & Emblem */}
          <div
            className="monument-bottom w-full flex items-center justify-between gap-4 md:gap-8 overflow-hidden"
            style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)', marginTop: '-1px' }}
          >
            {/* Mirrored Bottom Emblem Partner */}
            <div className="emblem-group flex-shrink-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
              <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#FFFFFF]" xmlns="http://www.w3.org/2000/svg">
                <path className="emblem-bracket-tl animate-calibrate" d="M12 28 V12 H28" strokeWidth="2" />
                <path className="emblem-bracket-tr animate-calibrate" d="M88 28 V12 H72" strokeWidth="2" />
                <path className="emblem-bracket-bl animate-calibrate" d="M12 72 V88 H28" strokeWidth="2" />
                <path className="emblem-bracket-br animate-calibrate" d="M88 72 V88 H72" strokeWidth="2" />

                <g className="emblem-top">
                  <polygon points="50,22 64,48 36,48" fill="#FFFFFF" stroke="none" />
                  <polygon points="50,34 56,48 44,48" fill="#050505" stroke="none" />
                </g>

                <g className="emblem-bottom">
                  <polygon points="34,52 24,78 36,78 41,52" fill="#FFFFFF" stroke="none" />
                  <polygon points="66,52 76,78 64,78 59,52" fill="#FFFFFF" stroke="none" />
                  <rect x="44" y="60" width="12" height="4" fill="#FFFFFF" stroke="none" />
                </g>

                <line className="scanline-pulse" x1="6" y1="50" x2="94" y2="50" stroke="#FFFFFF" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Bottom Half Text */}
            <div
              className="w-full text-center tracking-[-0.03em] font-extrabold uppercase font-sans leading-[0.82] select-none text-[#FFFFFF]"
              style={{ fontSize: 'clamp(3.5rem, 13.2vw, 15rem)' }}
            >
              ANAMORPHIC
            </div>
          </div>
        </div>

        {/* Hover Guide Indicator */}
        <div className="w-full flex items-center justify-between font-mono text-[9px] text-[#888888] tracking-widest uppercase mt-6 pt-3 border-t border-[#1F1F1F]">
          <span>[ HOVER FOR OPTICAL DE-SQUEEZE DYNAMICS (±3PX APERTURE SPLIT) ]</span>
          <span className="hidden sm:inline">DIEGETIC HORIZON // 100% PLANAR</span>
        </div>
      </div>

      {/* ----------------------------------------------------------------------- */}
      {/* TIER 4: MICRO-COLOPHON SPEC STRIP (h-10)                                */}
      {/* ----------------------------------------------------------------------- */}
      <div className="w-full min-h-[40px] px-4 sm:px-8 py-2 bg-[#050505] flex flex-col md:flex-row items-center justify-between gap-2 font-mono text-[10px] text-[#888888] tracking-widest uppercase border-t border-[#1F1F1F]">
        {/* Left: Copyright */}
        <div className="flex items-center gap-2">
          <span>© 2026 ANAMORPHIC STUDIO.</span>
          <span className="hidden sm:inline">ALL RIGHTS RESERVED.</span>
        </div>

        {/* Center: Privacy / Telemetry Manifesto */}
        <div className="text-center text-[#888888]">
          NO COOKIES // ZERO TRACKERS // PURE STATIC TELEMETRY
        </div>

        {/* Right: Build Spec Version */}
        <div className="flex items-center gap-3 text-[#FFFFFF]">
          <span className="text-[#888888]">SYS_HASH: #211-AAA</span>
          <span className="font-bold border border-[#1F1F1F] px-2 py-0.5 bg-[#0A0A0A]">BUILD_VER // 2.39.04-PROD</span>
        </div>
      </div>
    </footer>
  )
}

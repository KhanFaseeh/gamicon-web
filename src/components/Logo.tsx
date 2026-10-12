import React from 'react'

export interface LogoProps {
  /**
   * 'badge': Compact HUD nav bar lockup [GMC // SYS]
   * 'primary': Full icon + wide-tracked wordmark GAMICON
   * 'icon': Standalone animated vector G monogram
   * 'inverted': Press & watermark format (White background, black glyph)
   */
  variant?: 'badge' | 'primary' | 'icon' | 'inverted'
  className?: string
  iconSize?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
}

/**
 * GAMICON Master Monogram Vector
 * Architectural 'G' identity with survival-horror surveillance crosshairs,
 * diegetic reticle, radar notches, and tactical animated pulses.
 */
export const MonogramIcon: React.FC<{
  className?: string
  animated?: boolean
  inverted?: boolean
}> = ({ className = 'w-7 h-7', animated = true, inverted = false }) => {
  const fillColor = inverted ? '#050505' : '#FFFFFF'
  const cutoutColor = inverted ? '#FFFFFF' : '#050505'

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className} group/logo select-none`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full transform transition-transform duration-300 group-hover/logo:scale-105"
      >
        {/* Monolithic Outer G Silhouette */}
        <path
          d="M10 10H90V34H36V66H66V52H52V38H90V90H10V10Z"
          fill={fillColor}
        />

        {/* Diegetic Precision Surveillance Crosshair Cutouts */}
        <rect x="0" y="49" width="100" height="2" fill={cutoutColor} />
        <rect x="49" y="0" width="2" height="100" fill={cutoutColor} />

        {/* Diegetic Radar Reticle */}
        <circle
          cx="50"
          cy="50"
          r="14"
          stroke={cutoutColor}
          strokeWidth="2"
          fill="none"
          className={animated ? 'origin-center animate-reticle-pulse' : ''}
        />
        <rect x="47" y="47" width="6" height="6" fill={cutoutColor} />

        {/* Tactical Signal Notches */}
        <rect x="74" y="20" width="8" height="2" fill={cutoutColor} />
        <rect x="74" y="78" width="8" height="2" fill={cutoutColor} />
      </svg>

      {/* Diegetic Holographic HUD Radar Scan Sweep Line */}
      {animated && (
        <span
          className={`pointer-events-none absolute inset-x-0 h-[2px] ${
            inverted ? 'bg-black/60' : 'bg-white/80'
          } animate-signal-scan`}
        />
      )}
    </div>
  )
}

export default function Logo({
  variant = 'primary',
  className = '',
  iconSize = 'md',
  animated = true,
}: LogoProps) {
  const sizeClassMap = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
    xl: 'w-16 h-16',
  }

  const currentIconSize = sizeClassMap[iconSize] || sizeClassMap.md

  // 1. Compact HUD Navigation Badge [ GMC // SYS ]
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-3 font-mono text-xs tracking-wider ${className} group/badge`}>
        <MonogramIcon className={currentIconSize} animated={animated} />
        <div className="flex items-center gap-2">
          <span className="font-bold text-white tracking-[0.2em] group-hover/badge:text-neutral-300 transition-colors">
            [ GMC // SYS ]
          </span>
          <span className="text-[9px] text-[#8e9192] hidden sm:inline">v2.6</span>
        </div>
      </div>
    )
  }

  // 2. Standalone Icon
  if (variant === 'icon') {
    return <MonogramIcon className={`${currentIconSize} ${className}`} animated={animated} />
  }

  // 3. Inverted White Stamp / Press Watermark
  if (variant === 'inverted') {
    return (
      <div className={`p-6 bg-white text-[#050505] border border-white flex flex-col items-center justify-center text-center ${className}`}>
        <MonogramIcon className={currentIconSize} animated={animated} inverted />
        <span className="mt-3 font-display text-xl font-extrabold tracking-[0.3em] uppercase pl-[0.3em] text-[#050505]">
          GAMICON
        </span>
        <span className="font-mono text-[9px] tracking-[0.3em] text-[#555555] uppercase mt-0.5">
          DIGITAL REALITIES // MASTER EMBLEM
        </span>
      </div>
    )
  }

  // 4. Primary Lockup: Monogram Icon + Wide-Tracked Brutalist Wordmark
  return (
    <div className={`inline-flex items-center gap-3.5 group/logo ${className}`}>
      <MonogramIcon className={currentIconSize} animated={animated} />
      <div className="flex flex-col">
        <span className="font-display text-xl sm:text-2xl tracking-[0.25em] font-extrabold uppercase text-white group-hover/logo:text-neutral-300 transition-colors leading-none pl-[0.05em]">
          GAMICON
        </span>
        <span className="font-mono text-[8px] tracking-[0.3em] text-[#8e9192] uppercase mt-1 leading-none hidden sm:block">
          STUDIO // EST. 2026
        </span>
      </div>
    </div>
  )
}

import React from 'react'

export interface LogoProps {
  /**
   * 'hero': Master centerpiece lockup with coordinates, viewfinder, and telemetry
   * 'navbar': Compact 40px lockup with emblem, 1px divider, and tracked wordmark
   * 'icon': Standalone animated optical emblem
   * 'inverted': High contrast white-field exhibition stamp
   */
  variant?: 'hero' | 'navbar' | 'icon' | 'inverted'
  className?: string
  iconSize?: 'sm' | 'md' | 'lg' | 'xl'
  animated?: boolean
}

/**
 * Anamorphic Vector Monogram Emblem
 * Precision monolithic vector monogram 'A' inside a 2.39:1 widescreen optical aperture frame.
 * Sliced by a 4px negative-space horizon axis with optical de-squeeze bracket animations.
 */
export const AnamorphicEmblem: React.FC<{
  className?: string
  animated?: boolean
  inverted?: boolean
}> = ({ className = 'w-8 h-8', animated = true, inverted = false }) => {
  const strokeColor = inverted ? '#050505' : '#FFFFFF'
  const fillColor = inverted ? '#050505' : '#FFFFFF'
  const innerCutout = inverted ? '#FFFFFF' : '#080808'

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className} select-none`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Outer 2.39:1 Optical Viewfinder Frame & Corner Brackets */}
        <path
          className={`bracket-tl ${animated ? 'draw-stroke' : ''}`}
          d="M12 28 H24 M12 28 V40"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="square"
        />
        <path
          className={`bracket-tr ${animated ? 'draw-stroke' : ''}`}
          d="M88 28 H76 M88 28 V40"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="square"
        />
        <path
          className={`bracket-bl ${animated ? 'draw-stroke' : ''}`}
          d="M12 72 H24 M12 72 V60"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="square"
        />
        <path
          className={`bracket-br ${animated ? 'draw-stroke' : ''}`}
          d="M88 72 H76 M88 72 V60"
          stroke={strokeColor}
          strokeWidth="2.5"
          strokeLinecap="square"
        />

        {/* UPPER HALF OF MONOGRAM 'A' (SHIFTS UP 2PX ON HOVER) */}
        <g className="part-upper">
          <polygon
            points="50,16 62,48 38,48"
            fill={fillColor}
            className={animated ? 'fill-fade' : ''}
          />
          <polygon points="50,28 55,48 45,48" fill={innerCutout} />
          {animated && (
            <polygon
              points="50,16 62,48 38,48"
              stroke={strokeColor}
              strokeWidth="1.25"
              fill="none"
              className="draw-stroke"
            />
          )}
        </g>

        {/* LOWER HALF OF MONOGRAM 'A' (SHIFTS DOWN 2PX ON HOVER) */}
        <g className="part-lower">
          <polygon
            points="36,52 43,52 35,84 25,84"
            fill={fillColor}
            className={animated ? 'fill-fade' : ''}
          />
          <polygon
            points="64,52 57,52 65,84 75,84"
            fill={fillColor}
            className={animated ? 'fill-fade' : ''}
          />
          <rect
            x="47"
            y="66"
            width="6"
            height="12"
            fill={fillColor}
            className={animated ? 'fill-fade' : ''}
          />
          {animated && (
            <>
              <polygon
                points="36,52 43,52 35,84 25,84"
                stroke={strokeColor}
                strokeWidth="1"
                fill="none"
                className="draw-stroke"
              />
              <polygon
                points="64,52 57,52 65,84 75,84"
                stroke={strokeColor}
                strokeWidth="1"
                fill="none"
                className="draw-stroke"
              />
            </>
          )}
        </g>

        {/* ANAMORPHIC HORIZONTAL SCANLINE */}
        <g className={animated ? 'scanline-pulse' : ''}>
          <line x1="-4" y1="50" x2="104" y2="50" stroke={strokeColor} strokeWidth="2.5" />
          <rect x="48" y="48.5" width="4" height="3" fill={strokeColor} />
        </g>
      </svg>
    </div>
  )
}

// Backwards-compatible alias for any direct imports
export const MonogramIcon = AnamorphicEmblem

export default function Logo({
  variant = 'hero',
  className = '',
  iconSize = 'md',
  animated = true,
}: LogoProps) {
  const sizeMap = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-20 h-20',
  }

  const currentIconSize = sizeMap[iconSize] || sizeMap.md

  // 1. Compact Navbar / Topbar Lockup (H: 40px)
  if (variant === 'navbar') {
    return (
      <div className={`lens-group flex items-center h-10 select-none ${className}`}>
        <AnamorphicEmblem className={currentIconSize} animated={animated} />
        <div className="w-[1px] h-6 bg-[#1F1F1F] mx-3" />
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <span className="wordmark-tracked text-xs font-bold uppercase tracking-[0.28em] text-white">
              ANAMORPHIC
            </span>
            {animated && <span className="w-1.5 h-1.5 bg-white telemetry-indicator inline-block" />}
          </div>
          <span className="font-mono text-[8px] text-[#666666] tracking-wider leading-none mt-0.5">
            [ SYS // ANM-01 ]
          </span>
        </div>
      </div>
    )
  }

  // 2. Standalone Optical Icon
  if (variant === 'icon') {
    return (
      <div className={`lens-group inline-flex items-center justify-center ${className}`}>
        <AnamorphicEmblem className={currentIconSize} animated={animated} />
      </div>
    )
  }

  // 3. Inverted Exhibition Watermark / Stamp
  if (variant === 'inverted') {
    return (
      <div className={`lens-group bg-white text-[#050505] border border-white p-6 flex flex-col items-center justify-center text-center select-none ${className}`}>
        <AnamorphicEmblem className={currentIconSize} animated={animated} inverted />
        <span className="wordmark-tracked text-sm font-bold uppercase tracking-[0.28em] text-[#050505] mt-3 block">
          ANAMORPHIC
        </span>
        <span className="font-mono text-[8px] text-[#666666] tracking-wider uppercase mt-1 block">
          EXHIBITION PRESS & WATERMARK
        </span>
      </div>
    )
  }

  // 4. Master Hero Showcase Lockup (Primary)
  return (
    <div
      className={`lens-group w-full py-10 px-6 border border-[#1F1F1F] bg-[#080808] flex flex-col items-center justify-center relative select-none transition-colors duration-300 hover:border-[#383838] ${className}`}
    >
      {/* Corner Coordinate HUD Callouts */}
      <span className="absolute top-2 left-2 font-mono text-[9px] text-[#555555] tracking-widest">
        + 000.00 // AXIS
      </span>
      <span className="absolute top-2 right-2 font-mono text-[9px] text-[#555555] tracking-widest">
        SCOPE 2.39:1 // 24MM
      </span>
      <span className="absolute bottom-2 left-2 font-mono text-[9px] text-[#555555] tracking-widest">
        X: 002.39 // Y: 001.00
      </span>
      <span className="absolute bottom-2 right-2 font-mono text-[9px] text-[#555555] tracking-widest">
        [MASTER_01]
      </span>

      {/* Hero Viewfinder SVG */}
      <div className="w-40 h-40 md:w-52 md:h-52 relative flex items-center justify-center my-2">
        <AnamorphicEmblem className="w-full h-full" animated={animated} />
      </div>

      {/* The Wordmark & Monospace Telemetry */}
      <div className="mt-4 flex flex-col items-center text-center">
        <h2 className="wordmark-tracked text-2xl md:text-3xl font-bold uppercase text-white tracking-[0.28em] pl-[0.28em]">
          ANAMORPHIC
        </h2>
        <div className="flex items-center gap-2 mt-2 font-mono text-[10px] text-[#888888] tracking-widest">
          {animated && <span className="w-1.5 h-1.5 bg-white telemetry-indicator inline-block" />}
          <span>[ SYS // ANM-01 // 2.39:1 ]</span>
          <span className="text-[#444444]">•</span>
          <span>EST. 2026</span>
        </div>
      </div>
    </div>
  )
}

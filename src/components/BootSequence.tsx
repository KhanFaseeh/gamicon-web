import { useEffect, useState } from 'react'

/**
 * System Boot / Optical Calibration Preloader
 * Displays once per browser session for 1.1s, rendering HUD telemetry lines,
 * rapid percentage counter, and splits vertically like an anamorphic shutter.
 */
export default function BootSequence() {
  const [active, setActive] = useState(false)
  const [percent, setPercent] = useState(0)
  const [isSplitting, setIsSplitting] = useState(false)

  useEffect(() => {
    const hasBooted = sessionStorage.getItem('anamorphic_boot_completed')
    if (hasBooted) {
      return
    }

    setActive(true)

    // Rapid counter from 0 to 100% over 800ms
    const startTime = performance.now()
    const duration = 750

    const interval = window.setInterval(() => {
      const elapsed = performance.now() - startTime
      const p = Math.min(Math.floor((elapsed / duration) * 100), 100)
      setPercent(p)

      if (p >= 100) {
        clearInterval(interval)
        // Trigger anamorphic shutter split at ~900ms
        setTimeout(() => {
          setIsSplitting(true)
          // Hide completely at 1150ms
          setTimeout(() => {
            setActive(false)
            sessionStorage.setItem('anamorphic_boot_completed', 'true')
          }, 350)
        }, 150)
      }
    }, 25)

    return () => clearInterval(interval)
  }, [])

  if (!active) return null

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none flex flex-col overflow-hidden select-none">
      {/* Upper Shutter Blade */}
      <div
        className={`w-full h-1/2 bg-[#050505] border-b border-[#333333] flex flex-col justify-end items-center pb-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isSplitting ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="w-full max-w-xl px-6 flex flex-col items-center text-center space-y-2">
          {/* Top Optical Reticle Line */}
          <div className="w-full flex items-center justify-center gap-3 font-mono text-[9px] text-[#666666] tracking-widest uppercase">
            <span className="w-12 h-[1px] bg-[#333333] animate-draw-line-x" />
            <span>OPTICAL CALIBRATION // 2.39:1 APERTURE</span>
            <span className="w-12 h-[1px] bg-[#333333] animate-draw-line-x" />
          </div>

          <div className="text-xl md:text-2xl font-bold uppercase tracking-[0.3em] text-white">
            ANAMORPHIC
          </div>
        </div>
      </div>

      {/* Center Horizon HUD Laser Slit */}
      <div className="relative w-full h-0 flex items-center justify-center z-10">
        <div className="absolute inset-x-0 h-[1px] bg-white opacity-80" />
        <div className="bg-[#050505] border border-white px-3 py-1 font-mono text-[10px] tracking-widest text-white flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-white telemetry-indicator" />
          <span>[ SYS_INIT // ANAMORPHIC 2.39:1 OPTICAL ENGINE ]</span>
          <span className="font-bold text-white min-w-[32px] text-right">
            {String(percent).padStart(2, '0')}%
          </span>
        </div>
      </div>

      {/* Lower Shutter Blade */}
      <div
        className={`w-full h-1/2 bg-[#050505] border-t border-[#333333] flex flex-col justify-start items-center pt-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isSplitting ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        <div className="w-full max-w-xl px-6 flex flex-col items-center text-center space-y-1">
          <div className="font-mono text-[9px] text-[#888888] tracking-widest">
            COGNITIVE DENSITY: 100% // DETERMINISTIC PHYSICS VERIFIED
          </div>
          <div className="font-mono text-[8px] text-[#555555] tracking-widest">
            PESHAWAR AUTEUR LAB // PAKISTAN // KINEMATICS READY
          </div>
        </div>
      </div>
    </div>
  )
}

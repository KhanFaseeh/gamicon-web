import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'

interface PageTransitionProps {
  children: React.ReactNode
}

/**
 * Route Change Anamorphic Shutter Wipe
 * Fast 450ms horizontal/letterbox wipe transition with telemetry indicator
 * and automatic window scroll-to-top.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentChildren, setCurrentChildren] = useState(children)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    setIsTransitioning(true)
    window.scrollTo(0, 0)

    // Midpoint: switch child views at 200ms
    const switchTimer = setTimeout(() => {
      setCurrentChildren(children)
    }, 200)

    // End wipe at 450ms
    const endTimer = setTimeout(() => {
      setIsTransitioning(false)
    }, 450)

    return () => {
      clearTimeout(switchTimer)
      clearTimeout(endTimer)
    }
  }, [location.pathname, location.search])

  return (
    <div className="relative w-full min-h-screen">
      {/* Wipe Curtain Overlay */}
      <div
        className={`fixed inset-0 z-[90] pointer-events-none bg-[#050505] transition-opacity duration-200 flex flex-col justify-between ${
          isTransitioning ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Upper letterbox bar */}
        <div
          className={`w-full h-1/2 bg-[#050505] border-b border-[#1F1F1F] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isTransitioning ? 'translate-y-0' : '-translate-y-full'
          }`}
        />

        {/* Center telemetry telemetry lock */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center z-20">
          <div className="bg-[#0e0e0e] border border-white px-4 py-1.5 flex items-center gap-3 font-mono text-[10px] tracking-widest text-white shadow-2xl">
            <span className="w-1.5 h-1.5 bg-white telemetry-indicator inline-block" />
            <span>[ SIGNAL LOCK // LOADING ARCHIVE ]</span>
          </div>
        </div>

        {/* Lower letterbox bar */}
        <div
          className={`w-full h-1/2 bg-[#050505] border-t border-[#1F1F1F] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isTransitioning ? 'translate-y-0' : 'translate-y-full'
          }`}
        />
      </div>

      {/* Page Content */}
      <div
        className={`w-full transition-opacity duration-200 ${
          isTransitioning ? 'opacity-30' : 'opacity-100'
        }`}
      >
        {currentChildren}
      </div>
    </div>
  )
}

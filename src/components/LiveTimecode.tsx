import { useEffect, useState } from 'react'

export interface LiveTimecodeProps {
  prefix?: string
  className?: string
  showBlink?: boolean
}

/**
 * 24fps SMPTE Timecode Ticker (HH:MM:SS:FF) with step-blinking indicator
 */
export default function LiveTimecode({
  prefix = 'TIME CODE:',
  className = '',
  showBlink = true,
}: LiveTimecodeProps) {
  const [timecode, setTimecode] = useState('00:00:00:00')

  useEffect(() => {
    // 24 frames per second ticker (approx 41.6ms interval)
    const interval = window.setInterval(() => {
      const now = new Date()
      const hh = String(now.getHours()).padStart(2, '0')
      const mm = String(now.getMinutes()).padStart(2, '0')
      const ss = String(now.getSeconds()).padStart(2, '0')
      const frame = String(Math.floor((now.getMilliseconds() / 1000) * 24)).padStart(2, '0')

      setTimecode(`${hh}:${mm}:${ss}:${frame}`)
    }, 41)

    return () => clearInterval(interval)
  }, [])

  return (
    <span className={`inline-flex items-center gap-2 font-mono text-[10px] tracking-widest text-[#8e9192] ${className}`}>
      {showBlink && <span className="w-1.5 h-1.5 bg-white telemetry-indicator shrink-0 inline-block" />}
      {prefix && <span>{prefix}</span>}
      <span className="text-white font-bold">{timecode}</span>
    </span>
  )
}

import { useEffect, useState, useRef } from 'react'

const CIPHER_CHARS = '01/_#X[]//<>-+~=%'

export interface ScrambleTextProps {
  text: string
  className?: string
  scrambleOnMount?: boolean
  scrambleOnHover?: boolean
  duration?: number
  tag?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div'
}

export default function ScrambleText({
  text,
  className = '',
  scrambleOnMount = true,
  scrambleOnHover = true,
  duration = 400,
  tag = 'span',
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [hasScrambled, setHasScrambled] = useState(false)
  const elementRef = useRef<HTMLElement>(null)
  const intervalRef = useRef<number | null>(null)

  const runScramble = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    const startTime = performance.now()
    const original = text
    const len = original.length

    intervalRef.current = window.setInterval(() => {
      const elapsed = performance.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      const revealedLength = Math.floor(progress * len)
      let output = ''

      for (let i = 0; i < len; i++) {
        if (original[i] === ' ') {
          output += ' '
        } else if (i < revealedLength) {
          output += original[i]
        } else {
          output += CIPHER_CHARS[Math.floor(Math.random() * CIPHER_CHARS.length)]
        }
      }

      setDisplayText(output)

      if (progress >= 1) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        setDisplayText(original)
      }
    }, 30)
  }

  // IntersectionObserver to trigger on scroll into view
  useEffect(() => {
    const el = elementRef.current
    if (!el || !scrambleOnMount || hasScrambled) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runScramble()
          setHasScrambled(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [text, scrambleOnMount, hasScrambled])

  const handleMouseEnter = () => {
    if (scrambleOnHover) {
      runScramble()
    }
  }

  const Tag = tag as any

  return (
    <Tag
      ref={elementRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-block select-none ${className}`}
    >
      {displayText}
    </Tag>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="studio-footer" className="w-full bg-[#050505] border-t border-[#1F1F1F] relative overflow-hidden select-none">
      {/* Outer Container with Generous Negative Space (py-20 px-6 md:px-20) */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-20 py-20">
        {/* Top Row: Asymmetric 2-Column Split */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 md:gap-12">
          {/* Left Side: <Logo variant="navbar"/> + clean mailto link */}
          <div className="flex flex-col items-start space-y-6 max-w-md">
            <Link to="/" className="inline-block transition-opacity duration-200 hover:opacity-85" aria-label="Anamorphic Home">
              <Logo variant="navbar" animated={false} />
            </Link>

            {/* Clean Understated Email Link */}
            <div className="pt-1">
              <a
                href="mailto:anamorphiicc@gmail.com"
                className="group/email inline-flex items-center text-sm font-sans text-[#888888] hover:text-white transition-colors duration-200 tracking-wide font-normal relative"
              >
                <span>anamorphiicc@gmail.com</span>
                <span className="absolute left-0 bottom-[-2px] w-0 h-[1px] bg-white transition-all duration-200 ease-out group-hover/email:w-full" />
              </a>
            </div>
          </div>

          {/* Right Side: Two minimal uppercase link columns */}
          <div className="flex items-start gap-16 md:gap-20 sm:gap-24">
            {/* Column 1: Index */}
            <div className="flex flex-col space-y-4">
              <span className="font-display text-[10px] uppercase tracking-[0.24em] text-[#555555] font-semibold mb-1">
                Index
              </span>
              <ul className="flex flex-col space-y-3.5">
                <li>
                  <Link
                    to="/"
                    className="font-display text-xs uppercase tracking-[0.2em] text-[#888888] hover:text-white transition-colors duration-150 block"
                  >
                    Works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="font-display text-xs uppercase tracking-[0.2em] text-[#888888] hover:text-white transition-colors duration-150 block"
                  >
                    Vision
                  </Link>
                </li>
                <li>
                  <Link
                    to="/press"
                    className="font-display text-xs uppercase tracking-[0.2em] text-[#888888] hover:text-white transition-colors duration-150 block"
                  >
                    Press
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="font-display text-xs uppercase tracking-[0.2em] text-[#888888] hover:text-white transition-colors duration-150 block"
                  >
                    Admin
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Social */}
            <div className="flex flex-col space-y-4">
              <span className="font-display text-[10px] uppercase tracking-[0.24em] text-[#555555] font-semibold mb-1">
                Social
              </span>
              <ul className="flex flex-col space-y-3.5">
                <li>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 font-display text-xs uppercase tracking-[0.2em] text-[#888888] hover:text-white transition-colors duration-150"
                  >
                    <span>YouTube</span>
                    <span className="text-[10px] text-[#666666] group-hover:text-white transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 font-display text-xs uppercase tracking-[0.2em] text-[#888888] hover:text-white transition-colors duration-150"
                  >
                    <span>X</span>
                    <span className="text-[10px] text-[#666666] group-hover:text-white transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 font-display text-xs uppercase tracking-[0.2em] text-[#888888] hover:text-white transition-colors duration-150"
                  >
                    <span>GitHub</span>
                    <span className="text-[10px] text-[#666666] group-hover:text-white transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Row: Separated by a 1px solid #1F1F1F line */}
        <div className="mt-16 pt-8 border-t border-[#1F1F1F] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[11px] tracking-widest text-[#666666] uppercase">
          {/* Left: Copyright */}
          <p className="font-mono">
            &copy; 2026 ANAMORPHIC STUDIO. ALL RIGHTS RESERVED.
          </p>

          {/* Right: Interactive Back to Top Button */}
          <button
            onClick={handleScrollToTop}
            className="group inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.2em] text-[#888888] hover:text-white transition-colors duration-150 py-1"
            aria-label="Scroll back to top"
          >
            <span>BACK TO TOP</span>
            <span className="transition-transform duration-200 group-hover:-translate-y-1 text-xs">
              ↑
            </span>
          </button>
        </div>
      </div>
    </footer>
  )
}

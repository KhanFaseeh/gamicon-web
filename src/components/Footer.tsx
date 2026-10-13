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
                className="group/email inline-flex items-center gap-2.5 text-sm font-sans text-[#888888] hover:text-white transition-colors duration-200 tracking-wide font-normal relative"
              >
                <svg className="w-3.5 h-3.5 fill-current text-[#666666] group-hover:text-white transition-colors duration-150" viewBox="0 0 24 24">
                  <path d="M1.5 4.5h21a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 18V6a1.5 1.5 0 0 1 1.5-1.5zm0 1.5v.75l10.5 6.562L22.5 6.75V6H1.5zm21 2.518-9.972 6.233a1 1 0 0 1-1.056 0L1.5 8.768V18h21V8.518z"/>
                </svg>
                <span>anamorphiicc@gmail.com</span>
                <span className="absolute left-6 bottom-[-2px] w-0 h-[1px] bg-white transition-all duration-200 ease-out group-hover/email:w-[calc(100%-1.5rem)]" />
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

            {/* Column 2: Social & Contact */}
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
                    className="group inline-flex items-center gap-2.5 font-display text-xs uppercase tracking-[0.2em] text-[#888888] hover:text-white transition-colors duration-150"
                  >
                    <svg className="w-3.5 h-3.5 fill-current text-[#666666] group-hover:text-white transition-colors duration-150" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
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
                    className="group inline-flex items-center gap-2.5 font-display text-xs uppercase tracking-[0.2em] text-[#888888] hover:text-white transition-colors duration-150"
                  >
                    <svg className="w-3.5 h-3.5 fill-current text-[#666666] group-hover:text-white transition-colors duration-150" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span>X</span>
                    <span className="text-[10px] text-[#666666] group-hover:text-white transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2.5 font-display text-xs uppercase tracking-[0.2em] text-[#888888] hover:text-white transition-colors duration-150"
                  >
                    <svg className="w-3.5 h-3.5 fill-current text-[#666666] group-hover:text-white transition-colors duration-150" viewBox="0 0 24 24">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                    </svg>
                    <span>Discord</span>
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
                    className="group inline-flex items-center gap-2.5 font-display text-xs uppercase tracking-[0.2em] text-[#888888] hover:text-white transition-colors duration-150"
                  >
                    <svg className="w-3.5 h-3.5 fill-current text-[#666666] group-hover:text-white transition-colors duration-150" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
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

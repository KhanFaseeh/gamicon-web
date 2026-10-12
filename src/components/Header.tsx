import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'

import ScrambleText from './ScrambleText'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0e0e0e]/90 backdrop-blur-md border-b border-[#444748]/30 transition-colors duration-150">
      <div className="flex justify-between items-center w-full px-6 md:px-16 h-20">
        {/* Studio Monogram / Brand Logo */}
        <Link to="/" className="flex items-center group">
          <Logo variant="navbar" animated={true} />
        </Link>

        {/* Universal Desktop Nav Links: Games, About, Contact */}
        <nav className="hidden md:flex items-center gap-8 font-display text-xs tracking-widest uppercase">
          <Link
            to="/#games"
            className={`pb-1 transition-colors ${
              location.pathname === '/' || location.pathname.startsWith('/game')
                ? 'text-white border-b border-white'
                : 'text-[#c7c6c6] hover:text-white'
            }`}
          >
            <ScrambleText text="Games" scrambleOnHover={true} />
          </Link>
          <Link
            to="/about"
            className={`pb-1 transition-colors ${
              location.pathname === '/about'
                ? 'text-white border-b border-white'
                : 'text-[#c7c6c6] hover:text-white'
            }`}
          >
            <ScrambleText text="About" scrambleOnHover={true} />
          </Link>
          <Link
            to="/press"
            className={`pb-1 transition-colors ${
              location.pathname === '/press'
                ? 'text-white border-b border-white'
                : 'text-[#c7c6c6] hover:text-white'
            }`}
          >
            <ScrambleText text="Contact & Intel" scrambleOnHover={true} />
          </Link>
        </nav>

        {/* Trailing Action */}
        <div className="flex items-center gap-4">
          <Link
            to="/#games"
            className="hidden sm:inline-flex btn-mechanical px-4 py-1.5 text-xs font-display uppercase tracking-widest"
          >
            <ScrambleText text="Our Catalog" scrambleOnHover={true} />
          </Link>
          <button
            aria-label="Toggle Navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e0e0e] border-b border-[#444748]/30 px-6 py-6 flex flex-col gap-4 font-display text-sm tracking-widest uppercase">
          <Link
            to="/#games"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-neutral-400 py-1"
          >
            Games
          </Link>
          <Link
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-neutral-400 py-1"
          >
            About
          </Link>
          <Link
            to="/press"
            onClick={() => setMobileMenuOpen(false)}
            className="text-white hover:text-neutral-400 py-1"
          >
            Contact & Intel
          </Link>
        </div>
      )}
    </header>
  )
}

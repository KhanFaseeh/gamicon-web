import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="w-full bg-[#0e0e0e] border-t border-[#444748]/30">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full px-6 md:px-16 py-8 gap-4">
        {/* Studio Wordmark & Copyright */}
        <div className="flex flex-col gap-1">
          <Link to="/" className="font-display text-2xl tracking-widest uppercase text-white hover:text-neutral-300 transition-colors">
            GAMICON
          </Link>
          <span className="text-[#8e9192] font-display text-[10px] tracking-wider uppercase">
            © 2026 GAMICON STUDIO. ALL RIGHTS RESERVED. CINEMATIC INTERACTIVE EXPERIENCES.
          </span>
        </div>

        {/* Links Spectrum: Games, Ethos (About), Press Kit & Contact */}
        <nav className="flex flex-wrap items-center gap-6 text-xs font-display tracking-widest uppercase">
          <Link to="/#games" className="text-[#c7c6c6] hover:text-white transition-colors">
            Games
          </Link>
          <Link to="/about" className="text-[#c7c6c6] hover:text-white transition-colors">
            Ethos
          </Link>
          <Link to="/press" className="text-[#c7c6c6] hover:text-white transition-colors">
            Press Kit
          </Link>
          <Link to="/press#contact" className="text-white hover:text-neutral-300 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}

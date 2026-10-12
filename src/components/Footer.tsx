import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="w-full bg-[#0e0e0e] border-t border-[#444748]/30">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full px-6 md:px-16 py-8 gap-4">
        {/* Studio Monogram & Copyright */}
        <div className="flex flex-col gap-2">
          <Link to="/" className="group inline-block">
            <Logo variant="primary" iconSize="sm" animated={true} />
          </Link>
          <span className="text-[#8e9192] font-mono text-[9px] tracking-wider uppercase">
            © 2026 GAMICON STUDIOS LLC // ALL MARKS & DIEGETIC SPECIFICATIONS REGISTERED.
          </span>
        </div>

        {/* Links Spectrum */}
        <nav className="flex flex-wrap items-center gap-6 text-xs font-display tracking-widest uppercase">
          <Link to="/#games" className="text-[#c7c6c6] hover:text-white transition-colors">
            Products
          </Link>
          <Link to="/about" className="text-[#c7c6c6] hover:text-white transition-colors">
            Studio Vision
          </Link>
          <Link to="/press" className="text-[#c7c6c6] hover:text-white transition-colors">
            Dispatches
          </Link>
          <Link to="/press#contact" className="text-white hover:text-neutral-300 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  )
}

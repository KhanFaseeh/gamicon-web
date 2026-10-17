import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false)
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <>
      <header className="docked full-width top-0 fixed z-50 w-full px-margin md:px-margin-desktop py-space-sm flex justify-between items-center max-w-full bg-[#fcf9f1]/90 backdrop-blur-md border-b border-[#1c1c17]/10 transition-colors duration-200">
        {/* Brand Wordmark */}
        <Link
          to="/"
          className="font-metric-huge text-body-lg lowercase tracking-tight font-extrabold text-[#1c1c17] hover:text-secondary transition-colors duration-150"
        >
          anamorphic
        </Link>

        {/* Navigation Links with Desktop Dropdowns */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesDropdownOpen(true)}
            onMouseLeave={() => setServicesDropdownOpen(false)}
          >
            <Link
              to="/services"
              className={`font-label-eyebrow text-label-eyebrow transition-colors duration-150 flex items-center gap-1 ${
                isActive('/services')
                  ? 'text-on-surface font-semibold underline underline-offset-8 decoration-secondary'
                  : 'text-on-surface-variant hover:text-secondary'
              }`}
            >
              Services
              <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </Link>

            {servicesDropdownOpen && (
              <div className="absolute top-full left-0 pt-2 w-64 z-50">
                <div className="bg-surface rounded-xl border border-on-surface/15 p-3 shadow-lg flex flex-col space-y-1">
                  <Link
                    to="/services"
                    className="p-2.5 rounded-lg hover:bg-surface-container transition-colors text-left"
                  >
                    <span className="font-label-eyebrow font-bold text-on-surface block text-[13px]">
                      Game Development
                    </span>
                    <span className="text-[11px] text-on-surface-variant block">
                      Unity 2D/3D, Shaders &amp; Steam
                    </span>
                  </Link>
                  <Link
                    to="/services"
                    className="p-2.5 rounded-lg hover:bg-surface-container transition-colors text-left"
                  >
                    <span className="font-label-eyebrow font-bold text-on-surface block text-[13px]">
                      Web Platforms &amp; SaaS
                    </span>
                    <span className="text-[11px] text-on-surface-variant block">
                      Next.js, Go, Node, Redis &amp; Queues
                    </span>
                  </Link>
                  <Link
                    to="/services"
                    className="p-2.5 rounded-lg hover:bg-surface-container transition-colors text-left"
                  >
                    <span className="font-label-eyebrow font-bold text-on-surface block text-[13px]">
                      Mobile &amp; Edge Systems
                    </span>
                    <span className="text-[11px] text-on-surface-variant block">
                      Flutter &amp; YOLOv8 Vision
                    </span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Work Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setWorkDropdownOpen(true)}
            onMouseLeave={() => setWorkDropdownOpen(false)}
          >
            <Link
              to="/work"
              className={`font-label-eyebrow text-label-eyebrow transition-colors duration-150 flex items-center gap-1 ${
                isActive('/work') || location.pathname.startsWith('/work/')
                  ? 'text-on-surface font-semibold underline underline-offset-8 decoration-secondary'
                  : 'text-on-surface-variant hover:text-secondary'
              }`}
            >
              Work
              <span className="material-symbols-outlined text-[14px]">expand_more</span>
            </Link>

            {workDropdownOpen && (
              <div className="absolute top-full left-0 pt-2 w-72 z-50">
                <div className="bg-surface rounded-xl border border-on-surface/15 p-3 shadow-lg flex flex-col space-y-1">
                  <Link
                    to="/work/pipevision-ai"
                    className="p-2.5 rounded-lg hover:bg-surface-container transition-colors text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-label-eyebrow font-bold text-on-surface text-[13px]">
                        PipeVision AI
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#74BE9C]/30 text-[#1B1A17]">
                        Edge ML
                      </span>
                    </div>
                    <span className="text-[11px] text-on-surface-variant block mt-0.5">
                      Factory conveyor YOLOv8 tallying
                    </span>
                  </Link>
                  <Link
                    to="/work/workforce-suite"
                    className="p-2.5 rounded-lg hover:bg-surface-container transition-colors text-left"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-label-eyebrow font-bold text-on-surface text-[13px]">
                        Workforce Suite
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#F6A6CF]/30 text-[#1B1A17]">
                        5 Live SaaS
                      </span>
                    </div>
                    <span className="text-[11px] text-on-surface-variant block mt-0.5">
                      Industrial attendance &amp; payroll
                    </span>
                  </Link>
                  <Link
                    to="/work"
                    className="p-2 rounded-lg bg-surface-container-high hover:bg-surface-container text-center font-label-eyebrow text-[12px] font-bold text-secondary mt-1 block"
                  >
                    View All 10 Shipped Projects →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            to="/about"
            className={`font-label-eyebrow text-label-eyebrow transition-colors duration-150 ${
              isActive('/about')
                ? 'text-on-surface font-semibold underline underline-offset-8 decoration-secondary'
                : 'text-on-surface-variant hover:text-secondary'
            }`}
          >
            About
          </Link>

          <Link
            to="/team"
            className={`font-label-eyebrow text-label-eyebrow transition-colors duration-150 ${
              isActive('/team')
                ? 'text-on-surface font-semibold underline underline-offset-8 decoration-secondary'
                : 'text-on-surface-variant hover:text-secondary'
            }`}
          >
            Team
          </Link>

          <Link
            to="/contact"
            className={`font-label-eyebrow text-label-eyebrow transition-colors duration-150 ${
              isActive('/contact')
                ? 'text-on-surface font-semibold underline underline-offset-8 decoration-secondary'
                : 'text-on-surface-variant hover:text-secondary'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Cluster: Fused Pill Action + Mobile Toggle */}
        <div className="flex items-center space-x-3">
          <Link to="/contact" className="fused-pod group flex items-center">
            <span className="bg-primary-container text-surface px-5 py-2.5 rounded-l-full font-label-eyebrow text-label-eyebrow font-medium group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-150">
              Start Project
            </span>
            <span className="fused-arrow bg-primary-container text-surface w-9 h-9 rounded-r-full flex items-center justify-center -ml-px border-l border-surface/20 group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-150">
              <span className="material-symbols-outlined text-base">north_east</span>
            </span>
          </Link>

          <button
            aria-label="Toggle Full-Screen Navigation"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-on-surface p-2"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>
      </header>

      {/* Mobile Nav: Full-Screen Overlay (hamburger → full-screen menu) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#fcf9f1] text-[#1c1c17] flex flex-col justify-between p-6 md:hidden animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-on-surface/10 pb-4">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="font-metric-huge text-body-lg lowercase font-extrabold text-[#1c1c17]"
            >
              anamorphic
            </Link>
            <button
              aria-label="Close Navigation"
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full border border-on-surface/20 flex items-center justify-center text-on-surface hover:bg-on-surface hover:text-surface transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <nav className="flex flex-col space-y-6 my-auto text-left py-8">
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="font-headline-md text-headline-md font-bold text-on-surface hover:text-secondary transition-colors"
            >
              Services
            </Link>
            <Link
              to="/work"
              onClick={() => setMobileMenuOpen(false)}
              className="font-headline-md text-headline-md font-bold text-on-surface hover:text-secondary transition-colors"
            >
              Work (10 Projects)
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="font-headline-md text-headline-md font-bold text-on-surface hover:text-secondary transition-colors"
            >
              About
            </Link>
            <Link
              to="/team"
              onClick={() => setMobileMenuOpen(false)}
              className="font-headline-md text-headline-md font-bold text-on-surface hover:text-secondary transition-colors"
            >
              Team
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="font-headline-md text-headline-md font-bold text-on-surface hover:text-secondary transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="font-label-eyebrow text-body-md text-secondary font-bold pt-4 border-t border-on-surface/10"
            >
              Studio Admin CMS →
            </Link>
          </nav>

          <div className="pt-6 border-t border-on-surface/10 flex flex-col gap-4">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-4 rounded-full bg-primary-container text-surface text-center font-bold font-body-md"
            >
              Start Project ↗
            </Link>
            <div className="flex items-center justify-between text-xs font-mono text-on-surface-variant">
              <span>Lahore &amp; Global Remote</span>
              <span>UTC+5 (PKT)</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

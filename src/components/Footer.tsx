import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('anamorphic_settings')
      if (saved) return JSON.parse(saved)
    } catch {
      // ignore
    }
    return {
      contactEmail: 'hello@anamorphic.studio',
      githubUrl: 'https://github.com/ShahandFahad',
      linkedinUrl: 'https://linkedin.com',
      footerCopyright: '© Anamorphic Studio. Verified production stacks.',
    }
  })

  useEffect(() => {
    try {
      const saved = localStorage.getItem('anamorphic_settings')
      if (saved) setSettings(JSON.parse(saved))
    } catch {
      // ignore
    }
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSubscribed(true)
  }

  return (
    <footer className="docked full-width bottom w-full px-margin md:px-margin-desktop py-space-xl md:py-space-xxl flex flex-col justify-between bg-primary-container text-surface border-t border-surface/15">
      <div className="max-w-[1440px] mx-auto w-full">
        {/* Top Row: Editorial Nav + Newsletter Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Left Column: Massive Headline & Navigation Links */}
          <div className="lg:col-span-7 flex flex-col">
            <Link
              to="/"
              className="font-metric-huge text-headline-lg lowercase font-extrabold text-surface mb-8 hover:text-secondary-fixed-dim transition-colors inline-block"
            >
              anamorphic
            </Link>
            <p className="font-headline-md text-headline-md text-surface/80 max-w-lg mb-10">
              Keep Exploring...
            </p>
            <nav className="flex flex-col space-y-4">
              <Link
                className="font-display-xxl text-headline-md md:text-headline-lg font-bold text-surface hover:text-secondary-fixed-dim transition-colors duration-150"
                to="/services"
              >
                Services
              </Link>
              <Link
                className="font-display-xxl text-headline-md md:text-headline-lg font-bold text-surface hover:text-secondary-fixed-dim transition-colors duration-150"
                to="/work"
              >
                Work
              </Link>
              <Link
                className="font-display-xxl text-headline-md md:text-headline-lg font-bold text-surface hover:text-secondary-fixed-dim transition-colors duration-150"
                to="/about"
              >
                About
              </Link>
              <Link
                className="font-display-xxl text-headline-md md:text-headline-lg font-bold text-surface hover:text-secondary-fixed-dim transition-colors duration-150"
                to="/team"
              >
                Team
              </Link>
              <Link
                className="font-display-xxl text-headline-md md:text-headline-lg font-bold text-surface hover:text-secondary-fixed-dim transition-colors duration-150"
                to="/contact"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Right Column: Verification, Studio Time, Newsletter, and Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-8">
              <div>
                <span className="font-label-eyebrow text-label-eyebrow text-surface-variant uppercase tracking-wider block mb-2 font-semibold">
                  Studio Status
                </span>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#74BE9C]"></span>
                  <span className="font-body-md text-body-md text-surface font-medium">
                    Active Production Cycles · Open for Commission
                  </span>
                </div>
              </div>

              <div>
                <span className="font-label-eyebrow text-label-eyebrow text-surface-variant uppercase tracking-wider block mb-2 font-semibold">
                  Dispatch Coordinates
                </span>
                <p className="font-body-md text-body-md text-surface/80">
                  Lahore &amp; Global Remote
                  <br />
                  UTC +5:00 · Sub-40ms Edge Pipelines
                </p>
              </div>

              {/* Newsletter Input Pod */}
              <div className="pt-2">
                <span className="font-label-eyebrow text-label-eyebrow text-surface-variant uppercase tracking-wider block mb-3 font-semibold">
                  Studio Technical Letters
                </span>
                {subscribed ? (
                  <div className="p-4 rounded-xl bg-surface/10 border border-surface/20 text-[#74BE9C] font-label-eyebrow text-label-eyebrow font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    Subscribed to Engineering Dispatches.
                  </div>
                ) : (
                  <form className="flex items-center" onSubmit={handleSubscribe}>
                    <input
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-surface text-on-surface px-5 py-3 rounded-l-full font-body-md text-body-md border-0 focus:ring-2 focus:ring-secondary focus:outline-none placeholder:text-on-surface-variant/60"
                      placeholder="Enter engineer contact email"
                      type="email"
                    />
                    <button
                      aria-label="Subscribe"
                      className="fused-pod bg-surface text-on-surface w-12 h-12 rounded-r-full flex items-center justify-center -ml-px border-l border-on-surface/10 hover:bg-secondary hover:text-white transition-colors duration-150 shrink-0"
                      type="submit"
                    >
                      <span className="material-symbols-outlined fused-arrow">north_east</span>
                    </button>
                  </form>
                )}
              </div>

              {/* Social Icons (GitHub, LinkedIn, Email) */}
              <div>
                <span className="font-label-eyebrow text-label-eyebrow text-surface-variant uppercase tracking-wider block mb-3 font-semibold">
                  Social &amp; Repositories
                </span>
                <div className="flex items-center space-x-3">
                  {/* GitHub */}
                  <a
                    href={settings.githubUrl || 'https://github.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Repository"
                    className="w-10 h-10 rounded-full border border-surface/30 flex items-center justify-center text-surface hover:bg-surface hover:text-primary-container transition-colors duration-150"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={settings.linkedinUrl || 'https://linkedin.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="w-10 h-10 rounded-full border border-surface/30 flex items-center justify-center text-surface hover:bg-surface hover:text-primary-container transition-colors duration-150"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>

                  {/* Email */}
                  <a
                    href={`mailto:${settings.contactEmail || 'hello@anamorphic.studio'}`}
                    aria-label="Direct Email"
                    className="w-10 h-10 rounded-full border border-surface/30 flex items-center justify-center text-surface hover:bg-surface hover:text-primary-container transition-colors duration-150"
                  >
                    <span className="material-symbols-outlined text-[18px]">mail</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Secondary Links & Admin Link */}
            <div className="pt-8 flex flex-wrap gap-4 text-surface-variant font-label-eyebrow text-label-eyebrow items-center border-t border-surface/10">
              <Link to="/privacy" className="hover:text-surface transition-colors">
                Privacy Policy
              </Link>
              <span>·</span>
              <Link to="/terms" className="hover:text-surface transition-colors">
                Terms of Service
              </Link>
              <span>·</span>
              <Link to="/admin" className="hover:text-surface text-[#c3c0ff] transition-colors">
                Studio CMS Admin
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Verified Production Stacks & Legal */}
        <div className="pt-8 border-t border-surface/15 flex flex-col md:flex-row items-center justify-between gap-4 font-body-md text-body-md text-surface-variant">
          <p className="font-label-eyebrow text-label-eyebrow">
            {settings.footerCopyright || '© Anamorphic Studio. Verified production stacks.'}
          </p>
          <p className="font-label-eyebrow text-label-eyebrow text-surface/40">
            Hand-crafted with zero slop · Built for durability
          </p>
        </div>
      </div>
    </footer>
  )
}

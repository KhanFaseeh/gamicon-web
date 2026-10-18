import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface ContactTeamMember {
  name: string
  role: string
  focus?: string
}

const DEFAULT_CONTACT_TEAM: ContactTeamMember[] = [
  { name: 'Mian Faseeh', role: 'Delivery & Systems' },
  { name: 'Muhammad Tayyab', role: 'CTO / Unity & Blender 3D' },
  { name: 'Shah Fahad', role: 'Cloud Backends & Microservices' },
  { name: 'Muhammad Ali', role: 'Edge Vision & Cross-Platform Interfaces' },
]

export default function Contact() {
  const [selectedDiscipline, setSelectedDiscipline] = useState('Web Platforms & SaaS')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const [team, setTeam] = useState<ContactTeamMember[]>(() => {
    try {
      const saved = localStorage.getItem('anamorphic_team')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((m: any) => ({
            name: m.name.split(' ')[0] + (m.name.split(' ')[1] ? ' ' + m.name.split(' ')[1] : ''),
            role: m.role.split('/')[0].trim(),
            focus: m.focus,
          }))
        }
      }
    } catch {
      // ignore
    }
    return DEFAULT_CONTACT_TEAM
  })

  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('anamorphic_settings')
      if (saved) return JSON.parse(saved)
    } catch {
      // ignore
    }
    return {
      contactEmail: 'hello@anamorphic.studio',
      locationLine: 'Lahore, Peshawar & Global Remote · UTC+5',
    }
  })

  useEffect(() => {
    try {
      const savedTeam = localStorage.getItem('anamorphic_team')
      if (savedTeam) {
        const parsed = JSON.parse(savedTeam)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTeam(
            parsed.map((m: any) => ({
              name: m.name,
              role: m.role.split('/')[0].trim(),
              focus: m.focus,
            }))
          )
        }
      }
      const savedSettings = localStorage.getItem('anamorphic_settings')
      if (savedSettings) setSettings(JSON.parse(savedSettings))
    } catch {
      // ignore
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Open default mail client with prefilled details
    const subject = encodeURIComponent(`Project Inquiry: ${selectedDiscipline}`)
    const body = encodeURIComponent(
      `Name / Team: ${name}\nEmail: ${email}\nDiscipline: ${selectedDiscipline}\n\nProject Overview & Timeline:\n${message}`
    )
    window.location.href = `mailto:${settings.contactEmail || 'hello@anamorphic.studio'}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <div className="bg-background text-on-surface antialiased selection:bg-secondary selection:text-white min-h-screen flex flex-col font-body-md text-body-md overflow-x-hidden">
      {/* 1. GLOBAL HEADER */}
      <Header />

      <main className="flex-grow pt-28 md:pt-36">
        {/* 2. HERO SECTION */}
        <section className="w-full px-margin md:px-margin-desktop pt-8 pb-16 md:pb-space-xl border-b border-on-surface/15">
          <div className="max-w-7xl mx-auto">
            {/* Eyebrow */}
            <div className="inline-flex items-center space-x-2.5 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
              <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-secondary font-bold">
                CONTACT
              </span>
            </div>

            {/* Typographic Headline: Italic Serif Didone + Grotesque Sans with clean spacing */}
            <div className="mb-8">
              <h1 className="text-on-surface flex flex-wrap items-baseline gap-x-4">
                <span className="font-display-serif-xxl-mobile md:font-display-serif-xxl text-display-serif-xxl-mobile md:text-display-serif-xxl italic font-normal text-on-surface tracking-tight">
                  Tell us what
                </span>
                <span className="font-display-xxl-mobile md:font-display-xxl text-display-xxl-mobile md:text-display-xxl tracking-tight font-extrabold text-on-surface">
                  you're building.
                </span>
              </h1>
            </div>

            {/* Editorial Subtitle with Principal Scoping Assurance */}
            <div className="max-w-3xl space-y-6">
              <p className="font-body-lg text-body-lg text-on-surface-variant font-normal leading-relaxed">
                No sales reps, no discovery sprint upsells. You get direct architectural scoping from the four engineers who write the software.
              </p>
              <div>
                <a href="#contact-flow" className="fused-pod group inline-flex items-center">
                  <span className="bg-primary-container text-surface px-6 py-3 rounded-l-full font-label-eyebrow text-label-eyebrow font-medium group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-150">
                    Open Project Scoper
                  </span>
                  <span className="fused-arrow bg-primary-container text-surface w-11 h-11 rounded-r-full flex items-center justify-center -ml-px border-l border-surface/20 group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-150">
                    <span className="material-symbols-outlined text-lg">arrow_downward</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 3. CENTERPIECE — CONVERSATIONAL CHAT FORM & EDITORIAL SPLIT LAYOUT */}
        <section className="w-full px-margin md:px-margin-desktop py-16 md:py-space-xl" id="contact-flow">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-gutter-desktop items-start">
            {/* LEFT COLUMN: Editorial Commitment & Architecture Narrative */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-10">
              <div>
                <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface tracking-tight leading-[1.05] mb-8">
                  Let's unlock what's{' '}
                  <span className="relative inline-block whitespace-nowrap text-on-surface italic font-headline-serif-md font-normal">
                    possible
                    {/* Authentic SVG hand-drawn editorial loop stroke */}
                    <svg
                      className="absolute -inset-x-2 -inset-y-1 w-[calc(100%+16px)] h-[120%] pointer-events-none stroke-secondary"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 160 55"
                    >
                      <path
                        d="M5,28 C20,10 140,8 152,22 C162,34 135,48 70,49 C25,50 8,36 12,24 C16,14 45,18 75,20"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                      />
                    </svg>
                  </span>{' '}
                  together.
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
                  Every inquiry goes directly to {team.map((m) => m.name).join(', ')}. We assess feasibility, draft initial tech stack thoughts, and reply with fixed milestones.
                </p>

                {/* Verification Commitment Badges */}
                <div className="flex flex-wrap gap-2.5 pt-2">
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#74BE9C] text-primary font-label-eyebrow text-label-eyebrow font-semibold">
                    <span className="material-symbols-outlined text-[16px] mr-1.5">terminal</span>
                    Direct Engineer Scoping
                  </span>
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-surface-container-high text-on-surface font-label-eyebrow text-label-eyebrow font-semibold border border-on-surface/10">
                    <span className="material-symbols-outlined text-[16px] mr-1.5">calendar_month</span>
                    Fixed Milestone Estimates
                  </span>
                  <span className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#F6A6CF] text-primary font-label-eyebrow text-label-eyebrow font-semibold">
                    <span className="material-symbols-outlined text-[16px] mr-1.5">verified_user</span>
                    Zero Sales Spam
                  </span>
                </div>
              </div>

              {/* Principal Dispatch Card */}
              <div className="p-6 rounded-lg bg-surface-container border border-on-surface/10">
                <div className="flex items-center space-x-3 mb-3">
                  <span className="material-symbols-outlined text-secondary">memory</span>
                  <span className="font-label-eyebrow text-label-eyebrow uppercase font-bold tracking-wider text-on-surface">
                    Principals On Duty
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {team.map((m) => `${m.name} (${m.role})`).join(', ')}. You collaborate directly with founders from line one.
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN: Interactive Conversational Terminal / Chat Form */}
            <div className="lg:col-span-7">
              <div className="bg-surface rounded-xl border border-on-surface/15 p-6 md:p-8 relative shadow-[2px_2px_0px_#1c1c17]">
                {/* Terminal Header */}
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-on-surface/10">
                  <div className="flex items-center space-x-3">
                    <div className="w-3.5 h-3.5 rounded-full bg-secondary flex items-center justify-center animate-pulse">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    </div>
                    <div>
                      <h3 className="font-headline-md-mobile text-body-md font-bold text-on-surface">
                        Anamorphic Terminal / Project Scoper
                      </h3>
                      <p className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">
                        Encrypted Direct Pipe
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-label-eyebrow text-label-eyebrow font-bold text-secondary px-2.5 py-1 rounded bg-secondary-fixed/50">
                      Live Step 1 of 8
                    </span>
                  </div>
                </div>

                {/* 8 Progress Dots */}
                <div className="flex items-center space-x-2 mb-8">
                  <div className="h-1.5 w-7 rounded-full bg-secondary transition-all"></div>
                  <div className="h-1.5 w-2 rounded-full bg-surface-container-highest"></div>
                  <div className="h-1.5 w-2 rounded-full bg-surface-container-highest"></div>
                  <div className="h-1.5 w-2 rounded-full bg-surface-container-highest"></div>
                  <div className="h-1.5 w-2 rounded-full bg-surface-container-highest"></div>
                  <div className="h-1.5 w-2 rounded-full bg-surface-container-highest"></div>
                  <div className="h-1.5 w-2 rounded-full bg-surface-container-highest"></div>
                  <div className="h-1.5 w-2 rounded-full bg-surface-container-highest"></div>
                </div>

                {/* Conversational Stream */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Studio Bubble 1: Electric Indigo Saturated Fill */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-surface flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                      a_
                    </div>
                    <div className="bg-secondary text-white px-5 py-3.5 rounded-2xl rounded-tl-sm max-w-lg shadow-sm">
                      <p className="font-body-md text-body-md font-medium">Hey — what are we building?</p>
                    </div>
                  </div>

                  {/* Quick Reply Chips (Geometric badges, zero emojis) */}
                  <div className="pl-11 flex flex-wrap gap-2.5">
                    {[
                      { label: 'Game Development', code: 'GAME' },
                      { label: 'Web Platforms & SaaS', code: 'SAAS' },
                      { label: 'Mobile Apps', code: 'MBL' },
                      { label: 'AI, Vision & Automation', code: 'EDGE' },
                    ].map(({ label, code }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setSelectedDiscipline(label)}
                        className={`px-4 py-2 rounded-full text-left font-body-md text-body-md transition-all duration-150 inline-flex items-center gap-2 ${
                          selectedDiscipline === label
                            ? 'bg-secondary-fixed text-on-secondary-fixed border border-secondary font-semibold'
                            : 'bg-surface-container hover:bg-primary hover:text-white border border-on-surface/10 font-medium text-on-surface'
                        }`}
                      >
                        <span className="font-mono text-xs opacity-70">[{code}]</span>
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Studio Bubble 2 */}
                  <div className="flex items-start space-x-3 pt-2">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-surface flex items-center justify-center text-xs font-bold shrink-0 mt-1">
                      a_
                    </div>
                    <div className="bg-surface-container text-on-surface border border-on-surface/10 px-5 py-3.5 rounded-2xl rounded-tl-sm max-w-lg">
                      <p className="font-body-md text-body-md font-medium">
                        Tell us a bit about the scope and team.
                      </p>
                    </div>
                  </div>

                  {/* User Inputs Styled in Speech-Balloon Containers */}
                  <div className="pl-11 space-y-4">
                    {/* Name and Email in speech pod */}
                    <div className="p-4 rounded-2xl bg-surface-container-low border border-on-surface/10 space-y-3">
                      <div>
                        <label className="block font-label-eyebrow text-label-eyebrow uppercase font-bold text-on-surface-variant mb-1">
                          Your Identity
                        </label>
                        <input
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full bg-transparent border-0 border-b-2 border-on-surface/20 focus:border-secondary focus:ring-0 px-0 py-2 font-headline-md-mobile text-body-lg text-on-surface placeholder:text-outline placeholder:font-normal"
                          placeholder="Your name or team handle"
                          type="text"
                        />
                      </div>
                      <div className="pt-2">
                        <label className="block font-label-eyebrow text-label-eyebrow uppercase font-bold text-on-surface-variant mb-1">
                          Corporate Inbox
                        </label>
                        <input
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-transparent border-0 border-b-2 border-on-surface/20 focus:border-secondary focus:ring-0 px-0 py-2 font-headline-md-mobile text-body-lg text-on-surface placeholder:text-outline placeholder:font-normal"
                          placeholder="work@company.com"
                          type="email"
                        />
                      </div>
                    </div>

                    {/* Message / Overview input */}
                    <div className="p-4 rounded-2xl bg-surface-container-low border border-on-surface/10">
                      <label className="block font-label-eyebrow text-label-eyebrow uppercase font-bold text-on-surface-variant mb-1">
                        Project Intent &amp; Timeline
                      </label>
                      <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-transparent border-0 border-b-2 border-on-surface/20 focus:border-secondary focus:ring-0 px-0 py-2 font-body-md text-body-md text-on-surface placeholder:text-outline resize-none"
                        placeholder="Brief overview of your project, tech stack requirements, or target timeline..."
                        rows={3}
                      />
                    </div>

                    {/* Primary Form Submit CTA */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full group flex items-center justify-center space-x-3 py-4 px-6 rounded-full bg-primary hover:bg-secondary text-on-primary transition-all duration-200 cursor-pointer shadow-sm"
                      >
                        <span className="font-body-lg text-body-md font-bold tracking-tight">
                          {submitted ? 'Opening Mail Client...' : 'Continue to the next step'}
                        </span>
                        <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      </button>
                      <p className="font-label-eyebrow text-label-eyebrow text-center text-on-surface-variant mt-3">
                        Encrypted dispatch directly to principal engineers · We sign NDAs upon request.
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* 4. DIRECT INFO SECTION */}
        <section className="w-full px-margin md:px-margin-desktop py-16 md:py-space-xl border-t border-on-surface/15">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-on-surface-variant font-bold">
                DIRECT DISPATCH
              </span>
            </div>

            {/* 3 Structured Rows with Hairline Dividers */}
            <div className="divide-y border-t border-b border-on-surface/15 divide-on-surface/15">
              {/* Row 1: Email */}
              <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
                <div className="md:col-span-3">
                  <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant uppercase font-semibold">
                    Communication
                  </span>
                </div>
                <div className="md:col-span-6">
                  <a
                    className="font-headline-md md:font-headline-md text-headline-md hover:text-secondary transition-colors underline underline-offset-8 decoration-on-surface/20 font-bold"
                    href={`mailto:${settings.contactEmail || 'hello@anamorphic.studio'}`}
                  >
                    {settings.contactEmail || 'hello@anamorphic.studio'}
                  </a>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <span className="inline-block px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-eyebrow text-label-eyebrow font-medium border border-on-surface/10">
                    Direct Inbox
                  </span>
                </div>
              </div>

              {/* Row 2: Location */}
              <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
                <div className="md:col-span-3">
                  <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant uppercase font-semibold">
                    Base &amp; Range
                  </span>
                </div>
                <div className="md:col-span-6">
                  <p className="font-headline-md-mobile md:font-headline-md text-headline-md-mobile md:text-headline-md font-bold text-on-surface">
                    Pakistan · Working Worldwide
                  </p>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    UTC +5:00 · Global Remote overlap across London, NYC, SF
                  </p>
                </div>
              </div>

              {/* Row 3: Response Time */}
              <div className="py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline">
                <div className="md:col-span-3">
                  <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant uppercase font-semibold">
                    Service Level
                  </span>
                </div>
                <div className="md:col-span-6">
                  <p className="font-headline-md-mobile md:font-headline-md text-headline-md-mobile md:text-headline-md font-bold text-on-surface">
                    We reply within 2 business days
                  </p>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <a
                    className="inline-flex items-center text-secondary font-body-md text-body-md font-semibold hover:underline"
                    href="mailto:hello@anamorphic.studio"
                  >
                    Direct calendar link option
                    <span className="material-symbols-outlined text-[18px] ml-1">north_east</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. FAQ ACCORDION SECTION */}
        <section className="w-full px-margin md:px-margin-desktop py-16 md:py-space-xl border-t border-on-surface/15">
          <div className="max-w-7xl mx-auto">
            {/* Eyebrow & Headline */}
            <div className="mb-12">
              <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-on-surface-variant font-bold block mb-2">
                FREQUENT QUESTIONS
              </span>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface tracking-tight">
                Clear answers before we talk code.
              </h2>
            </div>

            {/* 4 Hairline-Divided Rows with Native Details Toggle */}
            <div className="divide-y border-t border-b border-on-surface/15 divide-on-surface/15">
              {/* Q1 */}
              <details className="group py-6" open>
                <summary className="flex justify-between items-center cursor-pointer list-none font-headline-md-mobile md:font-headline-md text-headline-md-mobile md:text-headline-md font-bold text-on-surface">
                  <span>What does a project cost?</span>
                  <span className="material-symbols-outlined transform group-open:rotate-45 transition-transform duration-200 text-on-surface">
                    add
                  </span>
                </summary>
                <div className="mt-4 max-w-3xl pr-4">
                  <p className="font-body-lg text-body-lg text-on-surface-variant font-normal leading-relaxed">
                    Our engagements typically range from fixed-scope MVPs to ongoing quarterly production retainers. Because we operate without agency overhead or middle management, 100% of your budget goes directly to senior engineering hours.
                  </p>
                </div>
              </details>

              {/* Q2 */}
              <details className="group py-6">
                <summary className="flex justify-between items-center cursor-pointer list-none font-headline-md-mobile md:font-headline-md text-headline-md-mobile md:text-headline-md font-bold text-on-surface">
                  <span>How long does it take?</span>
                  <span className="material-symbols-outlined transform group-open:rotate-45 transition-transform duration-200 text-on-surface">
                    add
                  </span>
                </summary>
                <div className="mt-4 max-w-3xl pr-4">
                  <p className="font-body-lg text-body-lg text-on-surface-variant font-normal leading-relaxed">
                    Focused MVPs and core production modules ship in 4 to 8 weeks. Complex multi-tenant SaaS platforms or custom 3D game engines typically take 12 to 16 weeks with weekly live staging releases.
                  </p>
                </div>
              </details>

              {/* Q3 */}
              <details className="group py-6">
                <summary className="flex justify-between items-center cursor-pointer list-none font-headline-md-mobile md:font-headline-md text-headline-md-mobile md:text-headline-md font-bold text-on-surface">
                  <span>Do you work with startups?</span>
                  <span className="material-symbols-outlined transform group-open:rotate-45 transition-transform duration-200 text-on-surface">
                    add
                  </span>
                </summary>
                <div className="mt-4 max-w-3xl pr-4">
                  <p className="font-body-lg text-body-lg text-on-surface-variant font-normal leading-relaxed">
                    Yes — from seed-stage founders building their initial zero-to-one stack to established enterprises modernizing mission-critical factory automation.
                  </p>
                </div>
              </details>

              {/* Q4 */}
              <details className="group py-6">
                <summary className="flex justify-between items-center cursor-pointer list-none font-headline-md-mobile md:font-headline-md text-headline-md-mobile md:text-headline-md font-bold text-on-surface">
                  <span>Who owns the code?</span>
                  <span className="material-symbols-outlined transform group-open:rotate-45 transition-transform duration-200 text-on-surface">
                    add
                  </span>
                </summary>
                <div className="mt-4 max-w-3xl pr-4">
                  <p className="font-body-lg text-body-lg text-on-surface-variant font-normal leading-relaxed">
                    You own 100% of the code, IP, repositories, Docker scripts, and architectural documentation upon delivery. Zero vendor lock-in, zero proprietary runtime licensing.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>
      </main>

      {/* 6. GLOBAL FOOTER */}
      <Footer />
    </div>
  )
}

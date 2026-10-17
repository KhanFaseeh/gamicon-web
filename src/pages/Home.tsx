import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase, parseGameRecord, getDriveFallbackUrl, type Game } from '../lib/supabaseClient'

// Default fallback projects with spec imagery if database is empty
const DEFAULT_PROJECTS = [
  {
    slug: 'workforce-suite',
    title: 'Workforce Suite',
    badge: '5 Live SaaS Platforms',
    badgeColor: 'bg-[#F6A6CF] text-[#1B1A17]',
    meta: '2023–PRESENT',
    description:
      'Five live production SaaS platforms (SSPlus, Reta TNA, Swift Attend, SwiftOne, Vortex360) managing end-to-end employee attendance, automated shift rosters, and payroll calculations with sub-second batch sync.',
    tags: ['Node.js', 'TypeScript', 'React', 'MongoDB', 'Redis Caching', 'RabbitMQ Queues'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAwSOHtfgTBgORUPfvPzVUWwmqjqaNjVi8cpogpLEvhjzf23Wy_qRtEhpuQ_-SvX5yFNPzEH0w27W0We3yOPcuDUm8RhB_q4ZWTF7Vl-FA52dEiQUv_fdvFS0a9Ai66bLBbvXZ5l1BVukuwsHt2_C1JkcGgd2iXODw1gcB86SGr7TX4VUuLnH5jlHQ3kCvSqvcaj1c7SRMNv5lVIFKyvae9VgYIYHuGAKrMjj3N90OCuc6uN4adIePm',
  },
  {
    slug: 'pipevision-ai',
    title: 'PipeVision AI',
    badge: 'Computer Vision & ERP',
    badgeColor: 'bg-[#74BE9C] text-[#1B1A17]',
    meta: 'A-ONE PVC CO.',
    description:
      'Factory ERP fused with an edge YOLOv8 computer vision pipeline counting manufactured pipes on a continuous high-speed conveyor belt, auto-reconciling factory shifts against ledger inventories.',
    tags: ['Python', 'YOLOv8', 'OpenCV', 'FastAPI', 'React', 'MySQL'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBnkTOST_CjoRJejbMWRU_WRonRszmuMQ48vb5vCqgffoVslKIxy-WOThQzU0JE40Zxnwr7TUvQXtFmV8OQFbJPGSH3o9oNzJYWFaUtzGQPLC2bjQ8Tfj9yzfWYzLoALNtMD6FqGxqe5lg9uYfl0s-6NhjiklwuTamqYflbUYI3kTYDjA19GrzfEzvW56Ln8B7lVmMibo0bg9_1ylr_2TQ8oEdFf5U1047Cb1SX7_Csyq6aV7m7J4TS',
  },
  {
    slug: 'skyiq',
    title: 'SkyIQ',
    badge: 'Aviation Telemetry',
    badgeColor: 'bg-[#3D1BFD] text-white',
    meta: 'MISSION CRITICAL',
    description:
      'High-throughput airport operations platform backend handling flight schedule ingestion, granular role-based clearance hierarchies, and sub-100ms automated dispatch emergency broadcast alerts.',
    tags: ['Node.js', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Docker', 'Prometheus'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAEtWDlCgO9rLSM4xdXxIoYvPaj4vnyrWUwwjM-aW_MkBnS7r05eMkIc1jVcMtZqGo4VhpeCZ_5dSIhWUYNXKTutxpc1dywIyWo67d2MLcgOJ9g7t1Q9KTMivhWWhYgMUzyK3-nAUmdE6vUyvclvkaqCcIsTpQt69_CM65YEITz0hg3nxBQhNY9alb_oYe6JrCR4qcTl4m1plwDreT0jW24ZCCh-8NU1FP3kXETaAJfh2uJo04ALj1w',
  },
  {
    slug: 'pos-suite',
    title: 'Accounting & POS Suite',
    badge: '10+ Stores Active',
    badgeColor: 'bg-[#FF5B5B] text-white',
    meta: 'COMMERCIAL RETAIL',
    description:
      'Enterprise retail checkout and balance ledger deployed across 10+ high-traffic shops, supporting multi-rate GST taxation, split refunds, offline cash drawers, and ESC/POS thermal receipt printing.',
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'ESC/POS', 'Tailwind'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7R25kLejYIb3QI0beCWMuEGqSBwGXy2hnWqPZXl4MynA9xrK6n2EWyDikmgJPqk80rc1h0OUlhxi_8HPDWJI7LaEURuUXrAF5IPGyQJ-A7dfvVx2-y_sOo3DCWavAKmDnSF4AJDnmOQbnepVZSlpC0lL2m4GnuoGyEsDZygtcyMlFNeptez23EW4Nl0pYSUJJ0GqvksvotRCZL1Py5C_qvTVe98um-_MFF55HbcALlyjuci5QxF-Z',
  },
]

// Standard placeholder dummy images if no picture is uploaded
const FALLBACK_DUMMY_IMAGES = [
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
]

export default function Home() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    async function fetchGames() {
      try {
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .order('created_at', { ascending: false })

        if (!error && data) {
          setGames(data.map(parseGameRecord))
        } else {
          setGames([])
        }
      } catch (err) {
        console.warn('Supabase fetch error', err)
        setGames([])
      }
    }
    fetchGames()
  }, [])

  // If projects are added via admin panel, show them; otherwise display the curated 4 production platforms
  const displayProjects =
    games.length > 0
      ? games.map((g, idx) => ({
          slug: g.slug,
          title: g.title,
          badge: g.tags?.[0] || 'Production Verified',
          badgeColor:
            idx % 4 === 0
              ? 'bg-[#F6A6CF] text-[#1B1A17]'
              : idx % 4 === 1
              ? 'bg-[#74BE9C] text-[#1B1A17]'
              : idx % 4 === 2
              ? 'bg-[#3D1BFD] text-white'
              : 'bg-[#FF5B5B] text-white',
          meta: g.release_date || 'ACTIVE',
          description: g.description,
          tags: g.tags || ['Systems', 'Production'],
          imageUrl: g.image_url || FALLBACK_DUMMY_IMAGES[idx % FALLBACK_DUMMY_IMAGES.length],
        }))
      : DEFAULT_PROJECTS

  return (
    <div className="bg-background text-on-surface antialiased selection:bg-secondary selection:text-white min-h-screen">
      <Header />

      <main className="w-full">
        {/* ========================================================================= */}
        {/* HERO SECTION                                                              */}
        {/* ========================================================================= */}
        <section className="relative pt-40 md:pt-48 pb-space-xl px-margin md:px-margin-desktop min-h-screen flex flex-col justify-between">
          <div className="max-w-[1440px] mx-auto w-full">
            {/* Eyebrow Badge */}
            <div className="mb-8 flex items-center space-x-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#74BE9C] text-[#1B1A17] font-label-eyebrow text-label-eyebrow font-semibold">
                Production-Verified Studio
              </span>
              <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">
                Zero Slop · High-Throughput Engineering
              </span>
            </div>

            {/* Hero Headline */}
            <div className="mb-10">
              <h1 className="font-display-xxl text-headline-lg-mobile md:text-display-xxl tracking-tight text-on-surface">
                We engineer systems
              </h1>
              <h1 className="tracking-tight text-on-surface mt-1">
                <span className="font-display-serif-xxl text-headline-lg-mobile md:text-display-serif-xxl italic font-normal text-secondary">
                  that actually
                </span>
                <span className="font-display-xxl text-headline-lg-mobile md:text-display-xxl ml-2 font-extrabold">
                  ship.
                </span>
              </h1>
            </div>

            {/* Sub-narrative & Action Cluster */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop items-end pt-6 border-t border-on-surface/15">
              <div className="md:col-span-7">
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                  Independent game, web, and mobile engineering studio founded on production rigor. Led
                  by Mian Faseeh Ur Rehman, Shah Fahad, and Muhammad Ali. We build fault-tolerant
                  architectures that handle live commerce, industrial vision, and high-concurrency
                  systems.
                </p>
              </div>

              <div className="md:col-span-5 flex flex-col sm:flex-row sm:items-center sm:justify-end gap-6">
                {/* Scroll marker */}
                <div className="flex items-center space-x-2 text-on-surface-variant">
                  <span className="font-headline-serif-md italic text-body-md">Scroll</span>
                  <span className="material-symbols-outlined animate-bounce text-secondary">south</span>
                </div>

                {/* Fused Explore CTA */}
                <a className="fused-pod group inline-flex items-center self-start sm:self-auto" href="#work">
                  <span className="bg-primary-container text-surface px-6 py-3.5 rounded-l-full font-label-eyebrow text-label-eyebrow font-medium group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-150">
                    Explore Shipped Work
                  </span>
                  <span className="fused-arrow bg-primary-container text-surface w-12 h-12 rounded-r-full flex items-center justify-center -ml-px border-l border-surface/20 group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-150">
                    <span className="material-symbols-outlined">north_east</span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Studio Verified Marquee Moment */}
          <div className="w-full mt-16 pt-6 pb-2 border-t border-on-surface/10 overflow-hidden">
            <div className="animate-marquee items-center gap-4 py-2">
              {[1, 2].map((iter) => (
                <div key={iter} className="flex items-center gap-4 shrink-0">
                  <span className="px-4 py-1.5 rounded-full bg-surface-container crisp-stroke font-label-eyebrow text-label-eyebrow text-on-surface flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#74BE9C]" />
                    10+ commercial shops running our POS suite
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-surface-container crisp-stroke font-label-eyebrow text-label-eyebrow text-on-surface flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3D1BFD]" />
                    5 SaaS platforms live in production
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-surface-container crisp-stroke font-label-eyebrow text-label-eyebrow text-on-surface flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#F6A6CF]" />
                    3 core disciplines: games, web, apps
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-surface-container crisp-stroke font-label-eyebrow text-label-eyebrow text-on-surface flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF5B5B]" />
                    2 deep specializations: real-time systems &amp; computer vision
                  </span>
                  <span className="px-4 py-1.5 rounded-full bg-surface-container crisp-stroke font-label-eyebrow text-label-eyebrow text-on-surface flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2b00d1]" />
                    Zero offshore relay · Direct engineering custody
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SERVICES ACCENT SECTION (Mint Green / Tactical High Contrast)             */}
        {/* ========================================================================= */}
        <section
          className="w-full bg-[#74BE9C] text-[#1B1A17] py-space-xl px-margin md:px-margin-desktop border-y border-on-surface/20"
          id="services"
        >
          <div className="max-w-[1440px] mx-auto">
            {/* Eyebrow & Headline */}
            <div className="mb-14">
              <span className="inline-block px-3 py-1 rounded-full bg-[#1B1A17] text-[#F7F4EC] font-label-eyebrow text-label-eyebrow font-medium mb-4">
                Services
              </span>
              <h2 className="font-headline-lg text-headline-md-mobile md:text-headline-lg tracking-tight">
                Three disciplines. <span className="font-headline-serif-md italic font-normal">Zero corporate fluff.</span>
              </h2>
              <p className="font-body-md text-body-md text-[#1B1A17]/80 max-w-2xl mt-4">
                Direct access to principal engineers. Every engagement is scoped down to pure execution
                without account managers or diluted agency layers.
              </p>
            </div>

            {/* 3 Distinct Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
              {/* Service 1: Game Dev */}
              <div className="bg-[#F4F1E9] rounded-2xl p-8 crisp-stroke flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-metric-huge text-headline-md text-secondary">01</span>
                    <span className="px-3 py-1 rounded-full bg-secondary text-white font-label-eyebrow text-label-eyebrow">
                      Interactive
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md-mobile md:text-headline-md tracking-tight mb-4 text-[#1B1A17]">
                    Game Development
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                    Unity 2D and 3D titles engineered for mobile and PC. We handle technical gameplay
                    programming, physics optimizations, custom UI pipelines, and continuous deployment
                    through Steam and mobile app stores.
                  </p>
                </div>
                <div className="pt-6 border-t border-on-surface/10">
                  <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant font-medium block mb-2">
                    Verified Stack
                  </span>
                  <p className="font-label-eyebrow text-label-eyebrow text-on-surface font-semibold">
                    Unity Engine · C# · HLSL Shaders · Photon Realtime · Steamworks SDK
                  </p>
                </div>
              </div>

              {/* Service 2: Web Dev */}
              <div className="bg-[#F4F1E9] rounded-2xl p-8 crisp-stroke flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-metric-huge text-headline-md text-secondary">02</span>
                    <span className="px-3 py-1 rounded-full bg-secondary text-white font-label-eyebrow text-label-eyebrow">
                      SaaS &amp; APIs
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md-mobile md:text-headline-md tracking-tight mb-4 text-[#1B1A17]">
                    Web Development
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                    Production SaaS platforms and resilient enterprise portals. Modern React and Next.js
                    frontends powered by distributed Node.js and Go microservices, strict PostgreSQL
                    schemas, Redis caching, and RabbitMQ message queues.
                  </p>
                </div>
                <div className="pt-6 border-t border-on-surface/10">
                  <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant font-medium block mb-2">
                    Verified Stack
                  </span>
                  <p className="font-label-eyebrow text-label-eyebrow text-on-surface font-semibold">
                    Next.js · Go · Node.js · PostgreSQL · Redis · RabbitMQ · Docker
                  </p>
                </div>
              </div>

              {/* Service 3: Mobile Dev */}
              <div className="bg-[#F4F1E9] rounded-2xl p-8 crisp-stroke flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-metric-huge text-headline-md text-secondary">03</span>
                    <span className="px-3 py-1 rounded-full bg-secondary text-white font-label-eyebrow text-label-eyebrow">
                      Mobile &amp; Edge
                    </span>
                  </div>
                  <h3 className="font-headline-md text-headline-md-mobile md:text-headline-md tracking-tight mb-4 text-[#1B1A17]">
                    App Development
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                    Cross-platform iOS and Android deployments via Flutter. Native rendering fidelity with
                    offline-first synchronization, background processing engines, hardware sensor
                    interfacing, and edge computer vision integrations.
                  </p>
                </div>
                <div className="pt-6 border-t border-on-surface/10">
                  <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant font-medium block mb-2">
                    Verified Stack
                  </span>
                  <p className="font-label-eyebrow text-label-eyebrow text-on-surface font-semibold">
                    Flutter · Dart · Firebase · SQLite / Isar · YOLOv8 Edge · REST / gRPC
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FEATURED PROJECTS SECTION (Editorial Asymmetric Portfolio)                */}
        {/* ========================================================================= */}
        <section className="py-space-xl px-margin md:px-margin-desktop bg-background" id="work">
          <div className="max-w-[1440px] mx-auto">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-on-surface/15">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-surface-container crisp-stroke font-label-eyebrow text-label-eyebrow font-medium mb-4">
                  Our Work
                </span>
                <h2 className="font-headline-lg text-headline-md-mobile md:text-headline-lg tracking-tight">
                  Live in production, not on Figma artboards.
                </h2>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mt-4 md:mt-0 max-w-md">
                Concrete software systems handling real transactions, live telemetry, and physical plant
                operations daily.
              </p>
            </div>

            {/* Case Studies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
              {displayProjects.map((proj) => (
                <article key={proj.slug} className="flex flex-col group">
                  <Link
                    to={`/work/${proj.slug}`}
                    className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-surface-container crisp-stroke mb-6 block"
                  >
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={proj.title}
                      src={proj.imageUrl}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget
                        if (proj.imageUrl) {
                          const fallback = getDriveFallbackUrl(proj.imageUrl)
                          if (target.src !== fallback) {
                            target.src = fallback
                            return
                          }
                        }
                        target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full font-label-eyebrow text-label-eyebrow font-semibold ${proj.badgeColor}`}
                      >
                        {proj.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="w-10 h-10 rounded-full bg-primary-container text-surface flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors duration-200">
                        <span className="material-symbols-outlined">north_east</span>
                      </div>
                    </div>
                  </Link>

                  <div className="flex items-baseline justify-between mb-2">
                    <Link to={`/work/${proj.slug}`} className="hover:text-secondary transition-colors">
                      <h3 className="font-headline-md text-headline-md tracking-tight text-on-surface">
                        {proj.title}
                      </h3>
                    </Link>
                    <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant font-mono">
                      {proj.meta}
                    </span>
                  </div>

                  <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {proj.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-surface-container font-label-eyebrow text-label-eyebrow text-on-surface"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* STUDIO STATS & VERIFIED METRICS (#1B1A17 full-bleed block)                */}
        {/* ========================================================================= */}
        <section
          className="w-full bg-[#1B1A17] text-[#F7F4EC] py-space-xxl px-margin md:px-margin-desktop"
          id="stats"
        >
          <div className="max-w-[1440px] mx-auto">
            {/* Section Header */}
            <div className="max-w-2xl mb-20">
              <span className="inline-block px-3 py-1 rounded-full bg-[#F7F4EC]/10 crisp-stroke-dark font-label-eyebrow text-label-eyebrow text-[#F7F4EC] mb-4">
                Production Numbers
              </span>
              <h2 className="font-headline-lg text-headline-md-mobile md:text-headline-lg tracking-tight text-white">
                Measured in uptime, not pitch decks.
              </h2>
              <p className="font-body-md text-body-md text-[#F7F4EC]/60 mt-4">
                We operate transparently. Here is the exact footprint of our active deployments across
                commercial retail, enterprise SaaS, and engineering pipelines.
              </p>
            </div>

            {/* 4 Concrete Metric Rows */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter-desktop border-t border-[#F7F4EC]/15 pt-12">
              <div className="flex flex-col">
                <span className="font-metric-huge text-metric-huge text-white mb-4">10+</span>
                <div className="w-12 h-0.5 bg-secondary mb-4" />
                <h4 className="font-headline-md text-body-lg text-white mb-2">Commercial Shops</h4>
                <p className="font-body-md text-body-md text-[#F7F4EC]/60">
                  Active daily on our POS &amp; accounting suite, executing real-time retail settlement.
                </p>
              </div>

              <div className="flex flex-col">
                <span className="font-metric-huge text-metric-huge text-white mb-4">5</span>
                <div className="w-12 h-0.5 bg-[#74BE9C] mb-4" />
                <h4 className="font-headline-md text-body-lg text-white mb-2">Production SaaS</h4>
                <p className="font-body-md text-body-md text-[#F7F4EC]/60">
                  Operating 24/7 with zero unmanaged downtime and sub-second queue offloading.
                </p>
              </div>

              <div className="flex flex-col">
                <span className="font-metric-huge text-metric-huge text-white mb-4">3</span>
                <div className="w-12 h-0.5 bg-[#F6A6CF] mb-4" />
                <h4 className="font-headline-md text-body-lg text-white mb-2">Core Disciplines</h4>
                <p className="font-body-md text-body-md text-[#F7F4EC]/60">
                  Game engines, distributed web systems, and high-performance native apps.
                </p>
              </div>

              <div className="flex flex-col">
                <span className="font-metric-huge text-metric-huge text-[#FF5B5B] mb-4">0</span>
                <div className="w-12 h-0.5 bg-[#FF5B5B] mb-4" />
                <h4 className="font-headline-md text-body-lg text-white mb-2">Vaporware</h4>
                <p className="font-body-md text-body-md text-[#F7F4EC]/60">
                  Zero un-shipped prototypes, bloated layers, or phantom engineering commitments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TEAM SECTION                                                              */}
        {/* ========================================================================= */}
        <section
          className="py-space-xl px-margin md:px-margin-desktop bg-background border-b border-on-surface/15"
          id="team"
        >
          <div className="max-w-[1440px] mx-auto">
            {/* Eyebrow & Headline */}
            <div className="mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-surface-container crisp-stroke font-label-eyebrow text-label-eyebrow font-medium mb-4">
                The Team
              </span>
              <h2 className="font-headline-lg text-headline-md-mobile md:text-headline-lg tracking-tight">
                Builders who lead the project from line one.
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-4">
                No middle managers. You collaborate directly with founders who architect the code, manage
                the pipelines, and guarantee product delivery.
              </p>
            </div>

            {/* 4 Founder & Principal Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop">
              {/* Founder 1 */}
              <div className="bg-surface-container rounded-2xl p-6 crisp-stroke flex flex-col justify-between">
                <div>
                  <div className="aspect-square w-full rounded-xl overflow-hidden bg-surface-container-high mb-6 crisp-stroke">
                    <img
                      className="w-full h-full object-cover"
                      alt="Mian Faseeh Ur Rehman"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuASG0W42bY_gsxnnA3_k_vOaJMpMRkTnbhDtAgNMyxuQh16_1SD5oG3DFLMGGzfYquZBn77mMCbkLen4TsI-pHohdFb38m5tF-7OWAE2qAoDthPJcgjyj0eIM2PMtk2BXV6FlNUGfQLNNPMxqjg8A_bXAV6gbJzTxM2Z-SkBtj5gP47gG43tw_VKASueCNPcm97vUdgvjdpCM4rMbTrlN_TNQIR__WfpWZU5mFbqoDAcxiDXbsp3lPx"
                    />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#74BE9C] text-[#1B1A17] font-label-eyebrow text-label-eyebrow font-semibold mb-3 inline-block">
                    CEO &amp; Project Manager
                  </span>
                  <h3 className="font-headline-md text-headline-md-mobile tracking-tight mb-2 font-bold">
                    Mian Faseeh Ur Rehman
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                    Directs studio technical strategy, client scoping, project timetables, and quality
                    governance. Leads the Unity game practice and release lifecycle pipelines.
                  </p>
                </div>
                <div className="pt-6 border-t border-on-surface/10">
                  <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant font-medium block mb-1">
                    Focus Areas
                  </span>
                  <p className="font-label-eyebrow text-label-eyebrow text-on-surface font-semibold">
                    Delivery · Unity · C# Architecture · Release Ops
                  </p>
                </div>
              </div>

              {/* Founder 2: CTO Muhammad Tayyab */}
              <div className="bg-surface-container rounded-2xl p-6 crisp-stroke flex flex-col justify-between border-2 border-secondary/20">
                <div>
                  <div className="aspect-square w-full rounded-xl overflow-hidden bg-surface-container-high mb-6 crisp-stroke">
                    <img
                      className="w-full h-full object-cover"
                      alt="Muhammad Tayyab"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuABKgk5aoLbkEjSO4kD0UHMS75Ss76wIMD7K923R0hYc269aXlE_Bqzb7EKyzDeSclq51KJF4dLIyapTX9NsLgB3r8kpK1wL4zZ9GcIRKdX4HpL2Rwcc0RMBBRjaDZ0lE2DEe_HVueLs-Py6rSnfJvvIx-Y0-AUvhSSxpoEwB1h1tjEnnKDHipkyFWvB1PgrIXzK7f1HRk30QBJl0TEJuvuP47F0uk7cV-ZkG9Uj66IpV-c5h872fN6"
                    />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#FF5B5B] text-white font-label-eyebrow text-label-eyebrow font-semibold mb-3 inline-block">
                    CTO &amp; 3D Designer
                  </span>
                  <h3 className="font-headline-md text-headline-md-mobile tracking-tight mb-2 font-bold">
                    Muhammad Tayyab
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                    Leads technical architecture, Blender 3D modeling, rigging, enemy AI, and gameplay physics across Unity 6 and independent productions.
                  </p>
                </div>
                <div className="pt-6 border-t border-on-surface/10">
                  <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant font-medium block mb-1">
                    Focus Areas
                  </span>
                  <p className="font-label-eyebrow text-label-eyebrow text-on-surface font-semibold">
                    Unity 6 · Blender 3D · Enemy AI · Gameplay Systems · Rigging
                  </p>
                </div>
              </div>

              {/* Founder 3: Shah Fahad */}
              <div className="bg-surface-container rounded-2xl p-6 crisp-stroke flex flex-col justify-between">
                <div>
                  <div className="aspect-square w-full rounded-xl overflow-hidden bg-surface-container-high mb-6 crisp-stroke">
                    <img
                      className="w-full h-full object-cover"
                      alt="Shah Fahad"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBH5memFcwy57yMTRXoHEsrveGfwU6jj5m6Vf26XA_SwYnI6ptJr0p8q7xX3wjNg1lv_IjsrK3kMX9h5WrEp9c84nbkXiiF6uubJN35EDdDLPOqBseJ68YrclzUTHNGrDKPvEnB45FbRzOHTTzjbRuDqKeSC4ka6ifHTJQlgh-c3KlrHhqSCgcpqwYEx45PgoBps8GuYR2FcbOgWUAJCI8dhDHLZ8120okauYr02FBXFymm1j1hDGu"
                    />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-secondary text-white font-label-eyebrow text-label-eyebrow font-semibold mb-3 inline-block">
                    Lead Backend Engineer
                  </span>
                  <h3 className="font-headline-md text-headline-md-mobile tracking-tight mb-2 font-bold">
                    Shah Fahad
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                    Architects distributed services and real-time data pipelines. Supervises uptime,
                    security, and scalability across our five live production SaaS platforms.
                  </p>
                </div>
                <div className="pt-6 border-t border-on-surface/10">
                  <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant font-medium block mb-1">
                    Focus Areas
                  </span>
                  <p className="font-label-eyebrow text-label-eyebrow text-on-surface font-semibold">
                    Node.js · Go · PostgreSQL · Redis · RabbitMQ · Docker
                  </p>
                </div>
              </div>

              {/* Founder 4: Muhammad Ali */}
              <div className="bg-surface-container rounded-2xl p-6 crisp-stroke flex flex-col justify-between">
                <div>
                  <div className="aspect-square w-full rounded-xl overflow-hidden bg-surface-container-high mb-6 crisp-stroke">
                    <img
                      className="w-full h-full object-cover"
                      alt="Muhammad Ali"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAS9vtxytMp8uhLYQvS6-IxDx2v7Dj_yiJWU4ziCpq6ZfoWfGPhZDr7J9FSvqWOYiummnybNIyo6kzu2rR_4s1Y1N2vxpWLNBp0wHq3l9FdANDgCWQlBApN2gnoXDVNtH2LqNQjqqa2OYV2SIRhcSbuW-Xrh7AasPkHysJScBBVhN_4kVy2mCT2-Q8LVfUuBklBYqVkULSMDn14IVHmu17f3d4Fjm53zNeRDyTo9FssZ5sUgY4PXfvL"
                    />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#F6A6CF] text-[#1B1A17] font-label-eyebrow text-label-eyebrow font-semibold mb-3 inline-block">
                    Mobile &amp; Full-Stack
                  </span>
                  <h3 className="font-headline-md text-headline-md-mobile tracking-tight mb-2 font-bold">
                    Muhammad Ali
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                    Specializes in cross-platform mobile systems and edge computer vision. Developed the
                    YOLOv8 factory counting pipeline and multi-platform architectures.
                  </p>
                </div>
                <div className="pt-6 border-t border-on-surface/10">
                  <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant font-medium block mb-1">
                    Focus Areas
                  </span>
                  <p className="font-label-eyebrow text-label-eyebrow text-on-surface font-semibold">
                    Flutter / Dart · React · Python · YOLOv8 · Mobile Edge AI
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* CONTACT / INQUIRY CALLOUT                                                 */}
        {/* ========================================================================= */}
        <section className="py-space-xl px-margin md:px-margin-desktop bg-surface-container-low" id="contact">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop items-center">
            <div className="md:col-span-8">
              <span className="inline-block px-3 py-1 rounded-full bg-[#3D1BFD] text-white font-label-eyebrow text-label-eyebrow font-medium mb-4">
                Direct Inquiries
              </span>
              <h2 className="font-headline-lg text-headline-md-mobile md:text-headline-lg tracking-tight mb-4">
                Have a project that needs to actually ship?
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                We review technical specifications within 24 hours. No sales scripts, just technical
                feasibility and verified delivery roadmaps.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col items-start md:items-end">
              <a className="fused-pod group inline-flex items-center" href="mailto:contact@anamorphic.studio">
                <span className="bg-primary-container text-surface px-8 py-4 rounded-l-full font-label-eyebrow text-body-md font-semibold group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-150">
                  Start Project
                </span>
                <span className="fused-arrow bg-primary-container text-surface w-14 h-14 rounded-r-full flex items-center justify-center -ml-px border-l border-surface/20 group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-150">
                  <span className="material-symbols-outlined text-2xl">north_east</span>
                </span>
              </a>
              <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant mt-4">
                Direct dispatch: contact@anamorphic.studio
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

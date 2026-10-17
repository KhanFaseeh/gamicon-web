import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase, parseGameRecord, normalizeImageUrl, getDriveFallbackUrl, type Game } from '../lib/supabaseClient'

interface Project {
  id: string
  num: string
  category: string
  subCategory: string
  title: string
  statusBadge: string
  statusBadgeClass: string
  description: string
  tags: string[]
  imageUrl: string
  aspect: string
  colSpan: string
}

const PROJECTS: Project[] = [
  {
    id: 'workforce-suite',
    num: '01',
    subCategory: 'Enterprise Systems',
    category: 'web-saas',
    title: 'Workforce Suite',
    statusBadge: 'Live in production',
    statusBadgeClass: 'bg-[#74BE9C] text-[#1B1A17]',
    description:
      'Five live multi-role SaaS platforms (SSPlus, Reta TNA, Swift Attend, SwiftOne, Vortex360) for attendance, scheduling, and payroll with Redis caching & RabbitMQ workers.',
    tags: ['Node.js', 'TypeScript', 'React', 'MongoDB', 'Redis', 'RabbitMQ', 'Docker'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA6JuSnJ5ncwLHE79qaY6a6KfvkVu2zCiaQ0GfKVF3qMLOiiQbJw_lu9IYmk8Hk4hvIb0xi9RbBx6V5Iz7OEqN2YK16ANGlHvpETLB5BXcBtdwfgZHWezbpAVwMKmV5Wk1KPKfJjcnZ3cbZw6IklSlF-vyZzkNe_OzaQLePpXN0JDKIjAnSGY3P9QXzd-FgJdY6tgpC47ixiLz_lRmX_-MKg_hRgCW64iSJT82MJ4Ir7vpDjHcuHmuE',
    aspect: 'aspect-[16/10]',
    colSpan: 'md:col-span-7',
  },
  {
    id: 'skyiq',
    num: '02',
    subCategory: 'Aviation Telemetry',
    category: 'web-saas',
    title: 'SkyIQ',
    statusBadge: 'Backend · Enterprise',
    statusBadgeClass: 'bg-surface-container-highest text-on-surface',
    description:
      'Airport operations telemetry & flight data ingestion engine with sub-100ms emergency dispatch alerts and RBAC.',
    tags: ['Node.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Docker'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDJzYwucrmOSgA1vP3AsOk1E4ezYuUCWtzl3vAlRnZF7KzEBF9Yqu4-h-iz7nql2hpG5WZVc2iBhsFqjF9dv0ga-AZyyo7VgdyMxttAXLKk-76IOUgzH8DgtdmwydfKXV3Oqjq_nyyyKcBbnIFGScAdWnoQHzA1TD11lapHybQHknYytJLHYgidmLWFInhb0P_CfP6fSaujaSIIBijo7uvNto3AzOH-BMadNevp5EciAAFRsLlClrV2',
    aspect: 'aspect-[4/5]',
    colSpan: 'md:col-span-5',
  },
  {
    id: 'pos-suite',
    num: '03',
    subCategory: 'Retail Infrastructure',
    category: 'web-saas',
    title: 'Accounting & POS Suite',
    statusBadge: 'Live in 10+ shops',
    statusBadgeClass: 'bg-[#74BE9C] text-[#1B1A17]',
    description:
      'Enterprise retail ERP and point-of-sale system: fast multi-item checkout, dual returns, customer/vendor ledgers, and thermal ESC/POS printing.',
    tags: ['React', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCr7_ccwtaZ8kMipd4yS43uM0HmIfIyayraeKs8edD1MVzL3cI0blDYdaDqH6GhJg7u8455mpWlrNLI7Ivq9wQIN0V1UfE0Migk_SsQlr4vgbV3sn03QfbwNGmwsvrHbXbJ8TdUoJUjZkDl3Hft-DurjAkhGWNdEdRvsFG26Bcw6L5upC6qW6YWmESqWnHM-OQXLh7V_msVdIzb_A2Xu6BjebXqePKEx3JnHUHE6g4TrQVjZV8JaKj5',
    aspect: 'aspect-[16/10]',
    colSpan: 'md:col-span-6',
  },
  {
    id: 'pipevision-ai',
    num: '04',
    subCategory: 'Computer Vision',
    category: 'ai-automation',
    title: 'PipeVision AI',
    statusBadge: 'Delivered to A-One PVC',
    statusBadgeClass: 'bg-[#F6A6CF] text-[#1B1A17]',
    description:
      'Factory ERP fused with edge YOLOv8 computer vision counting manufactured pipes on a continuous high-speed conveyor belt.',
    tags: ['Python', 'YOLOv8', 'OpenCV', 'FastAPI', 'React', 'MySQL'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD33CzgIW36wxkuo_ug0YMqXMKa54EwKgby3imS7hOac0ErFd_9JLIkzC9M24mGG7Az9T-iMIM2Qa1WytbV0P9ohH5A9i6U8FgL9ZIFELbExBFt6-EQ2BRSG276NmBiKQl1w3PbeaMkdDIpFxJBVNUqEsWAhcOx7gxtUvSrAg5CCgH9GMvPDmi3CugLfEjpDeDjbSo7KtulJZ979W5hcluti6G5zhLJkSaEXr60z5Q5wY9wAg8XCwzN',
    aspect: 'aspect-[16/10]',
    colSpan: 'md:col-span-6',
  },
  {
    id: 'vads',
    num: '05',
    subCategory: 'Automotive Tech',
    category: 'mobile',
    title: 'VADS (Vehicle At Doorstep)',
    statusBadge: 'Delivered to client',
    statusBadgeClass: 'bg-surface-container-highest text-on-surface',
    description:
      '4-role automotive inspection & test-drive scheduling platform with offline-first synchronization and real-time chat.',
    tags: ['Flutter', 'Node.js', 'MySQL', 'Socket.io', 'Firebase'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBErQlyqvxgzQQRKpLvI26w4zXpiW1KKsGgpjeM-fmbUXnDzRk7RSXx0JZfj5CHI33PfBIMY6qHu80tnPytubFnKdD4felS8psD5A7ijQPIO4UcCyYaBgDXj88e2tcxo-vgB3N5aZOAdzpUMaaaMFqAKNkvxJxbLum8Pq5oaRStEc4rFfx7GZeawz2zhIfjB6Io1j_rxsF1c7l1Fjk2H7Ywv_kGzoVFrWOobrKG3vMnUMpUnDY1Qz7p',
    aspect: 'aspect-[4/5]',
    colSpan: 'md:col-span-5',
  },
  {
    id: '3bs-marketplace',
    num: '06',
    subCategory: 'Market Engine',
    category: 'web-saas',
    title: '3BS Marketplace',
    statusBadge: 'Live web platform',
    statusBadgeClass: 'bg-[#74BE9C] text-[#1B1A17]',
    description:
      'Buy, barter, and bid marketplace featuring real-time buyer-seller negotiation chat, Escrow states, and role hierarchies.',
    tags: ['React', 'Next.js', 'WebSockets', 'Node.js', 'PostgreSQL'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBQjCpLqX-61IcHjA4O2zgLV4_eHdM9CWqTAol7xkT4Qhj1dm7YMlkV1-D6SHtlBqHfwitBEC67WLNph9aLqv5iM5tVAHo5PYc7c-DDCknL5a2RCKDUrMBzMBZCf-_8iJz3iMlE_IWum6SYREtGVq-xlIIdM02m--D6btF6OWsgmQeryxDWJnJ2U_HRKhcgtTBTyAkP6BXd5K68dE0qj_uXiapVu8W85m8ea_ZA_8HD1twcVSpJtL61',
    aspect: 'aspect-[16/10]',
    colSpan: 'md:col-span-7',
  },
  {
    id: 'solarscape',
    num: '07',
    subCategory: 'CleanTech GIS',
    category: 'web-saas',
    title: 'SolarScape',
    statusBadge: 'Web platform · Microservices',
    statusBadgeClass: 'bg-surface-container-highest text-on-surface',
    description:
      'Solar potential and irradiance analysis engine computing geospatial coordinate metrics via microservices architecture.',
    tags: ['Go', 'Python', 'React', 'Docker', 'Leaflet GIS'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCf6HQkZ1sPCKfJAT3DSjWZ1hFzXxBFXbpRWmqHZ89jpY-MersCs0A2M4MMwO76ZuOiStxo9qbK2ZiZlNXyTPayQ-7cTYLstudtkPB0nybjRgAiPJ8NY591HVIMSgmr7iKxs6yDD-CV4h5qe7S4PuIrDjX_At5jmHxT1QTefE7vhq-EhftrSnGsIAv-qIphbaQSi8TKubUx8sidzbM7mRYKuS5Y4D5trrtbPopZuezm_MwVlulrm-im',
    aspect: 'aspect-[16/10]',
    colSpan: 'md:col-span-6',
  },
  {
    id: 'tour-booking',
    num: '08',
    subCategory: 'Reservation Architecture',
    category: 'web-saas',
    title: 'Tour Booking System',
    statusBadge: 'Production web app',
    statusBadgeClass: 'bg-[#74BE9C] text-[#1B1A17]',
    description:
      'Server-rendered booking platform with JWT authentication, granular user permissions, payment webhooks, and containerized deployment.',
    tags: ['Node.js', 'Express', 'MongoDB', 'Docker', 'Stripe'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBpECcJdq0rphIlnjMyw03VvODUzqBHispANgY_aZjkvpGuP5fBpo4CeM4Mffr2j_M9zZEqpgnRtwXiKjknmac0xRs6IzVPlRpGyqCF6MNr1SNm8MBCwSlZ-rry-9tzbj9ULFwJrSjwkDYxZeGVwBu37-7K-aIcOSWkDtMsV3wgW57O_TzFZK4yqJFKTp36VWn_30DBFgFR6JFJFqB2I-Lz5xxxnQJIiy6ZfR08hsvAnBzZQf4i4BHz',
    aspect: 'aspect-[16/10]',
    colSpan: 'md:col-span-6',
  },
  {
    id: 'ignis',
    num: '09',
    subCategory: 'Large Language Infrastructure',
    category: 'open-source ai-automation',
    title: 'Ignis',
    statusBadge: 'Open source · AI',
    statusBadgeClass: 'bg-secondary-fixed text-on-secondary-fixed',
    description:
      'Containerized conversational AI system with persistent context thread storage, token optimization, and JWT session handling.',
    tags: ['TypeScript', 'Next.js', 'OpenAI API', 'MongoDB', 'Docker'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDOukjvOedJnD_6Bmx0XN2UMp905PW0EVWyHEBY6r1aW1Xhu1O8Ehj7ohBFjGAyhclI3wXo5feSJboabSdU6xzjZepFiuyUTtCR1q6XM8b3WC9urfNqYNxzTNgpgVznGa6--vfQjrFZR3vNIfGw9VKEdUt2UPoedklYw2Tvjtv3mo1Y_sPvs7bdo8OB8t8HKQXTWM37J4k3v2NFHxdYecxWGTYENGQepGcYcBozXtsMsTeo_e6PXm7s',
    aspect: 'aspect-[16/10]',
    colSpan: 'md:col-span-6',
  },
  {
    id: 'media-api',
    num: '10',
    subCategory: 'High-Throughput Media',
    category: 'open-source',
    title: 'Media Processing API',
    statusBadge: 'Open source · Backend',
    statusBadgeClass: 'bg-surface-container-highest text-on-surface',
    description:
      'High-throughput API for parallel image transformations and video metadata extraction offloaded to isolated worker threads.',
    tags: ['Node.js', 'TypeScript', 'Worker Threads', 'Sharp', 'FFmpeg'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA-zK6_OXTDJf_htnWjAMj-1UUBn4B_GzGqG8e2SR8X4Eimpy2GKHPZIw1mdY3zNGQb3oVgm5_SL4p5FAnB00fu8JulSNmx-DNCehmIZOpfdc8fLwYLxpfEefEQwIqs9dR6mAJPVJao6yUnAvJpvwAIIWiBb_HbKyYg4xPj1BOGF0NbNQU7g2QnPRRfQBK3tFP2LRki04ffFIn3Evr5qSHRAraz1WmVuSKPBBnFt7NiydjVaNF47PEb',
    aspect: 'aspect-[16/10]',
    colSpan: 'md:col-span-6',
  },
]

export default function Work() {
  const [filter, setFilter] = useState<string>('all')
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
        }
      } catch (e) {
        console.warn('Could not fetch projects in Work.tsx', e)
      }
    }
    fetchGames()
  }, [])

  // If DB projects exist, merge them with or prioritize them over static projects
  const allProjects: Project[] =
    games.length > 0
      ? games.map((g, idx) => {
          const catTag = (g.tags?.[0] || 'Web & SaaS').toLowerCase()
          let category = 'web-saas'
          if (catTag.includes('mobile') || catTag.includes('app')) category = 'mobile'
          else if (catTag.includes('ai') || catTag.includes('vision') || catTag.includes('automation')) category = 'ai-automation'
          else if (catTag.includes('open')) category = 'open-source'

          return {
            id: g.slug,
            num: String(idx + 1).padStart(2, '0'),
            subCategory: g.tags?.[0] || 'Production Systems',
            category,
            title: g.title,
            statusBadge: g.release_date || 'Live in production',
            statusBadgeClass:
              idx % 4 === 0
                ? 'bg-[#74BE9C] text-[#1B1A17]'
                : idx % 4 === 1
                ? 'bg-secondary-fixed text-on-secondary-fixed'
                : idx % 4 === 2
                ? 'bg-[#F6A6CF] text-[#1B1A17]'
                : 'bg-surface-container-highest text-on-surface',
            description: g.description,
            tags: g.tags || ['Production'],
            imageUrl: g.image_url || '',
            aspect: idx % 3 === 1 ? 'aspect-[4/5]' : 'aspect-[16/10]',
            colSpan: idx % 3 === 1 ? 'md:col-span-5' : idx % 3 === 0 ? 'md:col-span-7' : 'md:col-span-6',
          }
        })
      : PROJECTS

  const filteredProjects =
    filter === 'all'
      ? allProjects
      : allProjects.filter((p) => p.category.includes(filter))

  return (
    <div className="bg-background text-on-surface antialiased selection:bg-secondary selection:text-on-secondary min-h-screen flex flex-col justify-between overflow-x-hidden">
      <Header />

      {/* MAIN CANVAS */}
      <main className="w-full pt-28 md:pt-36 flex-grow">
        {/* HERO SECTION */}
        <section className="w-full px-margin md:px-margin-desktop pt-8 pb-14 border-b border-on-surface/10">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">
            {/* Eyebrow Tag */}
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant font-medium tracking-wide">
                Our Work
              </span>
            </div>

            {/* Giant Mixed Typography Headline */}
            <h1 className="text-on-surface tracking-tight mt-2 flex flex-wrap items-baseline gap-x-4 md:gap-x-6">
              <span className="font-display-serif-xxl-mobile md:font-display-serif-xxl text-display-serif-xxl-mobile md:text-display-serif-xxl italic font-normal">
                Shipped software,
              </span>
              <span className="font-display-xxl-mobile md:font-display-xxl text-display-xxl-mobile md:text-display-xxl font-extrabold">
                not slideware.
              </span>
            </h1>

            {/* Subline */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 items-end">
              <div className="md:col-span-8 space-y-6">
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-3xl">
                  Every project below is live, delivered, or open source — with the tech that built it. No un-shipped pitch decks or conceptual filler.
                </p>
                <div className="pt-2">
                  <Link to="/contact" className="fused-pod group inline-flex items-center">
                    <span className="bg-primary-container text-surface px-6 py-3 rounded-l-full font-label-eyebrow text-label-eyebrow font-medium group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-150">
                      Commission an engineering sprint
                    </span>
                    <span className="fused-arrow bg-primary-container text-surface w-11 h-11 rounded-r-full flex items-center justify-center -ml-px border-l border-surface/20 group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-150">
                      <span className="material-symbols-outlined text-lg">north_east</span>
                    </span>
                  </Link>
                </div>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <div className="inline-flex items-center gap-2 border border-on-surface/15 bg-surface-container-low px-3.5 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-[#74BE9C] animate-pulse"></span>
                  <span className="font-label-eyebrow text-label-eyebrow text-on-surface font-semibold">
                    10 Verified Implementations
                  </span>
                </div>
              </div>
            </div>

            {/* Telemetry Strip */}
            <div className="mt-8 pt-6 border-t border-on-surface/10 flex flex-wrap items-center justify-between gap-y-3 font-label-eyebrow text-label-eyebrow text-on-surface-variant font-medium">
              <div className="flex items-center gap-2">
                <span className="font-bold text-on-surface">10</span>
                <span>Verified Systems</span>
              </div>
              <span className="hidden md:inline text-outline-variant">/</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-on-surface">5</span>
                <span>Live SaaS Platforms</span>
              </div>
              <span className="hidden md:inline text-outline-variant">/</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-on-surface">10+</span>
                <span>Commercial Retail Locations</span>
              </div>
              <span className="hidden md:inline text-outline-variant">/</span>
              <div className="flex items-center gap-2">
                <span className="font-bold text-on-surface">Real-Time</span>
                <span>Industrial Computer Vision</span>
              </div>
            </div>
          </div>
        </section>

        {/* FILTER BAR */}
        <section className="sticky top-[69px] z-40 bg-surface/95 backdrop-blur-md border-b border-on-surface/10 py-4 px-margin md:px-margin-desktop">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Live Counter */}
            <div className="flex items-center gap-2 text-on-surface-variant font-body-md text-body-md">
              <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
              <span>
                Showing <strong className="text-on-surface font-semibold">{filteredProjects.length}</strong> projects
              </span>
            </div>

            {/* Filter Pills Group */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-1.5 rounded-full text-label-eyebrow font-label-eyebrow font-medium transition-colors duration-150 ${
                  filter === 'all'
                    ? 'bg-primary-container text-surface'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                All (10)
              </button>
              <button
                onClick={() => setFilter('web-saas')}
                className={`px-4 py-1.5 rounded-full text-label-eyebrow font-label-eyebrow font-medium transition-colors duration-150 ${
                  filter === 'web-saas'
                    ? 'bg-primary-container text-surface'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                Web &amp; SaaS (6)
              </button>
              <button
                onClick={() => setFilter('mobile')}
                className={`px-4 py-1.5 rounded-full text-label-eyebrow font-label-eyebrow font-medium transition-colors duration-150 ${
                  filter === 'mobile'
                    ? 'bg-primary-container text-surface'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                Mobile Apps (2)
              </button>
              <button
                onClick={() => setFilter('ai-automation')}
                className={`px-4 py-1.5 rounded-full text-label-eyebrow font-label-eyebrow font-medium transition-colors duration-150 ${
                  filter === 'ai-automation'
                    ? 'bg-primary-container text-surface'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                AI &amp; Automation (2)
              </button>
              <button
                onClick={() => setFilter('open-source')}
                className={`px-4 py-1.5 rounded-full text-label-eyebrow font-label-eyebrow font-medium transition-colors duration-150 ${
                  filter === 'open-source'
                    ? 'bg-primary-container text-surface'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                Open Source (2)
              </button>
            </div>
          </div>
        </section>

        {/* PROJECT GRID */}
        <section className="w-full px-margin md:px-margin-desktop py-space-xl md:py-space-xxl">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-y-16">
            {filteredProjects.map((p) => (
              <article
                key={p.id}
                className={`project-card ${p.colSpan} flex flex-col justify-between group border border-on-surface/10 rounded-2xl bg-surface-container-lowest p-6 md:p-8 transition-colors duration-200 hover:border-on-surface/30`}
              >
                <div>
                  {/* Media Container */}
                  <div className={`relative w-full ${p.aspect} rounded-xl overflow-hidden bg-surface-container-high mb-6 border border-on-surface/5`}>
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      alt={p.title}
                      src={normalizeImageUrl(p.imageUrl)}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget
                        if (p.imageUrl) {
                          const fallback = getDriveFallbackUrl(p.imageUrl)
                          if (target.src !== fallback && fallback !== target.src) {
                            target.src = fallback
                          }
                        }
                      }}
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-label-eyebrow font-label-eyebrow font-semibold ${p.statusBadgeClass}`}>
                        {p.statusBadge}
                      </span>
                    </div>
                  </div>

                  {/* Meta & Title */}
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="text-label-eyebrow font-label-eyebrow text-on-surface-variant uppercase tracking-wider block mb-1">
                        {p.num} / {p.subCategory}
                      </span>
                      <Link to={`/work/${p.id}`} className="hover:text-secondary transition-colors">
                        <h3 className="font-headline-md text-headline-md text-on-surface tracking-tight font-bold">
                          {p.title}
                        </h3>
                      </Link>
                    </div>
                    <Link
                      to={`/work/${p.id}`}
                      className="arrow-indicator w-10 h-10 rounded-full border border-on-surface/20 flex items-center justify-center text-on-surface transition-all duration-200 group-hover:bg-secondary group-hover:text-white group-hover:border-transparent shrink-0"
                    >
                      <span className="material-symbols-outlined text-[18px]">north_east</span>
                    </Link>
                  </div>

                  {/* Description */}
                  <p className="font-body-md text-body-md text-on-surface-variant mt-3 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {/* Tech Stack Chips Shelf */}
                <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-on-surface/10">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-label-eyebrow font-label-eyebrow bg-surface-container text-on-surface font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CONCRETE SPEC METRICS SECTION */}
        <section className="w-full px-margin md:px-margin-desktop py-space-xl bg-surface-container-low border-y border-on-surface/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="border-b md:border-b-0 md:border-r border-on-surface/10 pb-6 md:pb-0 md:pr-8">
              <span className="font-metric-huge text-metric-huge text-on-surface font-extrabold block">
                sub-40ms
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                Average edge pipeline response latency across 10 distributed European &amp; Asian nodes.
              </p>
            </div>
            <div className="border-b md:border-b-0 md:border-r border-on-surface/10 pb-6 md:pb-0 md:pr-8">
              <span className="font-metric-huge text-metric-huge text-on-surface font-extrabold block">
                100%
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                Verified production stacks with zero synthetic dummy implementations or un-audited code.
              </p>
            </div>
            <div>
              <span className="font-metric-huge text-metric-huge text-on-surface font-extrabold block">
                24h
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                Architecture review and fixed-cost delivery roadmap dispatch guaranteed upon receipt.
              </p>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION BAND */}
        <section className="w-full px-margin md:px-margin-desktop py-space-xl md:py-space-xxl">
          <div className="max-w-7xl mx-auto rounded-3xl bg-surface-container p-8 md:p-16 border border-on-surface/10 relative overflow-hidden">
            <div className="max-w-3xl">
              <span className="font-label-eyebrow text-label-eyebrow text-secondary uppercase font-semibold tracking-wider block mb-3">
                Engagement &amp; Delivery
              </span>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold text-on-surface tracking-tight leading-none">
                Your project could be{' '}
                <span className="underline decoration-secondary decoration-4 underline-offset-4">
                  next.
                </span>
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-6 leading-relaxed">
                Have technical specifications or a hard launch deadline? We review architecture specs and provide fixed delivery roadmaps within 24 hours.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  className="fused-pod group inline-flex items-center transition-transform duration-150 active:scale-[0.98]"
                  href="mailto:contact@anamorphic.studio"
                >
                  <span className="bg-primary-container text-surface group-hover:bg-secondary group-hover:text-on-secondary font-label-eyebrow text-body-md font-semibold px-8 py-4 rounded-l-full transition-colors duration-150">
                    Start a project
                  </span>
                  <span className="fused-arrow bg-primary-container text-surface group-hover:bg-secondary group-hover:text-on-secondary p-4 rounded-r-full border-l border-surface/20 flex items-center justify-center transition-colors duration-150">
                    <span className="material-symbols-outlined text-[20px]">north_east</span>
                  </span>
                </a>
                <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">
                  Fixed milestones · Escrow ready · Dedicated engineering
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

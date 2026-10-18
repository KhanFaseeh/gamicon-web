import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'

interface ServiceBlock {
  id: string
  title: string
  description: string
  bullets: string[]
  chips: string[]
  accentColor: string
}

const DEFAULT_SERVICES: ServiceBlock[] = [
  {
    id: 'srv-1',
    title: 'Game Development',
    description:
      'End-to-end game production from mechanic prototyping to multi-platform store pipelines.',
    bullets: [
      'Unity 2D & 3D gameplay programming and mechanics prototyping',
      'Custom game systems, inventory engines, and state management',
      'Mobile (iOS/Android) and PC/Steam build pipelines and memory optimization',
      'Custom HLSL shaders, physics tuning, and release lifecycle management',
    ],
    chips: ['Unity', 'C#', 'HLSL Shaders', 'Steamworks SDK', 'Photon Realtime'],
    accentColor: '#FF5B5B',
  },
  {
    id: 'srv-2',
    title: 'Web Platforms & SaaS',
    description:
      'Architecture engineered for high concurrency, zero unmanaged downtime, and rigorous backend reliability.',
    bullets: [
      'Production SaaS platforms, multi-tenant architectures, and role hierarchies',
      'High-throughput REST & gRPC APIs on Node.js and Go microservices',
      'Relational & document databases: PostgreSQL schemas, MongoDB aggregation, Redis caching',
      'Real-time data streams, WebSockets, and RabbitMQ message queues',
      'Front-ends in React and Next.js with sub-second page performance',
      'Dockerized container orchestration, Prometheus telemetry, and Grafana monitoring',
    ],
    chips: ['React', 'Next.js', 'Node.js', 'Go', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker'],
    accentColor: '#74BE9C',
  },
  {
    id: 'srv-3',
    title: 'Mobile Apps & Interfaces',
    description:
      'Cross-platform mobile engineering with offline-first synchronization and hardware/edge integration.',
    bullets: [
      'Cross-platform iOS and Android apps engineered from one Flutter codebase',
      'Offline-first SQLite/Isar synchronization with background reconcile workers',
      'Background Bluetooth Low Energy (BLE) device pairing & telemetry',
      'On-premise YOLOv8 edge machine vision inference integration',
      'Fluid 60 FPS motion design, gesture handling, and tactile feedback',
      'Enterprise MDM provisioning and app store deployment pipelines',
    ],
    chips: ['Flutter', 'Dart', 'Firebase', 'SQLite', 'YOLOv8', 'FastAPI'],
    accentColor: '#2b00d1',
  },
]

export default function Services() {
  const [servicesList, setServicesList] = useState<ServiceBlock[]>(() => {
    try {
      const saved = localStorage.getItem('anamorphic_services')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch {
      // ignore
    }
    return DEFAULT_SERVICES
  })

  const [team, setTeam] = useState<{ name: string; role: string }[]>(() => {
    try {
      const saved = localStorage.getItem('anamorphic_team')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed) && parsed.length > 0) return parsed
      }
    } catch {
      // ignore
    }
    return [
      { name: 'Mian Faseeh Ur Rehman', role: 'CEO & Head of Games' },
      { name: 'Muhammad Tayyab', role: 'CTO & Head of 3D' },
      { name: 'Shah Fahad', role: 'Lead Backend Engineer' },
      { name: 'Muhammad Ali', role: 'Mobile & Vision Systems' },
    ]
  })

  useEffect(() => {
    try {
      const savedServices = localStorage.getItem('anamorphic_services')
      if (savedServices) {
        const parsed = JSON.parse(savedServices)
        if (Array.isArray(parsed) && parsed.length > 0) setServicesList(parsed)
      }
      const savedTeam = localStorage.getItem('anamorphic_team')
      if (savedTeam) {
        const parsed = JSON.parse(savedTeam)
        if (Array.isArray(parsed) && parsed.length > 0) setTeam(parsed)
      }
    } catch {
      // ignore
    }
  }, [])

  const s1 = servicesList[0] || DEFAULT_SERVICES[0]
  const s2 = servicesList[1] || DEFAULT_SERVICES[1]
  const s3 = servicesList[2] || DEFAULT_SERVICES[2]

  const lead1 = team[0]?.name || 'Mian Faseeh Ur Rehman'
  const lead2 = team.find((t) => t.name.toLowerCase().includes('fahad'))?.name || team[2]?.name || 'Shah Fahad'
  const lead3 = team.find((t) => t.name.toLowerCase().includes('ali'))?.name || team[3]?.name || 'Muhammad Ali'

  return (
    <div className="bg-surface text-on-surface antialiased selection:bg-secondary selection:text-white font-body-md text-body-md overflow-x-hidden min-h-screen">
      <Header />

      <main className="pt-24 md:pt-32">
        {/* ============================================================ */}
        {/* 2. HERO SECTION                                              */}
        {/* ============================================================ */}
        <section className="px-margin md:px-margin-desktop pt-12 pb-20 border-b border-on-surface/10">
          <div className="max-w-[1400px] mx-auto">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-on-surface-variant font-medium">
                Services
              </span>
            </div>

            {/* Giant Mixed Serif / Sans Headline */}
            <h1 className="text-display-xxl-mobile md:text-display-xxl tracking-tight text-on-surface font-display-xxl mb-8">
              <span className="font-display-serif-xxl-mobile md:font-display-serif-xxl italic font-normal mr-2">
                Three crafts,
              </span>
              <span className="font-display-xxl font-extrabold tracking-tighter">
                one studio.
              </span>
            </h1>

            {/* One Paragraph Intro + Systems Strip Bento + Pill CTA */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-4">
              <div className="lg:col-span-7 space-y-6">
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                  Independent engineering studio building games, web platforms, and mobile apps under one roof. No bloated account layers—direct collaboration with principal builders from scoping to production deployment.
                </p>
                <div className="pt-2">
                  <a href="/contact" className="fused-pod group inline-flex items-center">
                    <span className="bg-primary-container text-surface px-6 py-3 rounded-l-full font-label-eyebrow text-label-eyebrow font-medium group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-150">
                      Scope your project
                    </span>
                    <span className="fused-arrow bg-primary-container text-surface w-11 h-11 rounded-r-full flex items-center justify-center -ml-px border-l border-surface/20 group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-150">
                      <span className="material-symbols-outlined text-lg">north_east</span>
                    </span>
                  </a>
                </div>
              </div>
              <div className="lg:col-span-5 flex lg:justify-end">
                <div className="inline-flex items-center gap-3 px-4 py-3 rounded-full border border-on-surface/15 bg-surface-container-low text-on-surface font-body-md text-sm">
                  <span className="w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse"></span>
                  <span className="tracking-wide font-medium">
                    Unity · Next.js · Flutter · Systems Architecture
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 3. SERVICE 01 — Game Development (Coral Accent #FF5B5B)      */}
        {/* ============================================================ */}
        <section className="px-margin md:px-margin-desktop py-space-xl md:py-space-xxl border-b border-on-surface/10 relative" id="games">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-gutter-desktop items-start">
            {/* Sticky Text Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-eyebrow text-label-eyebrow font-semibold">
                <span>01 — {s1.title}</span>
              </div>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                Engines, gameplay systems, and high-performance rendering.
              </h2>
              <div className="space-y-4 text-on-surface-variant font-body-md text-body-md leading-relaxed">
                <p>
                  Led by <strong className="text-on-surface font-semibold">{lead1}</strong>. {s1.description}
                </p>
              </div>

              {/* Concrete Bullets */}
              <ul className="space-y-3 pt-2">
                {s1.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-on-tertiary-container text-[20px] mt-0.5">check_circle</span>
                    <span className="font-body-md text-body-md text-on-surface">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Tech Chips */}
              <div className="flex flex-wrap gap-2 pt-4">
                {s1.chips.map((chip, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full border border-on-surface/15 text-xs font-medium text-on-surface bg-surface-container">
                    {chip}
                  </span>
                ))}
              </div>

              {/* Fused Pill CTA */}
              <div className="pt-4">
                <a className="fused-pod group inline-flex items-center" href="#cta">
                  <span className="bg-on-surface text-surface font-body-md text-body-md font-medium px-6 py-3 rounded-l-full group-hover:bg-secondary group-hover:text-white transition-colors duration-150">
                    Explore Game Systems
                  </span>
                  <span className="fused-arrow bg-on-surface text-surface w-12 h-12 flex items-center justify-center rounded-r-full border-l border-white/20 group-hover:bg-secondary group-hover:text-white transition-all duration-150">
                    <span className="material-symbols-outlined text-[20px]">north_east</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Right Visual Showcase: Asymmetric Staggered Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-6">
                {/* 4:5 Portrait Card */}
                <div className="rounded-xl overflow-hidden border border-on-surface/15 bg-surface-container-high aspect-[4/5] relative group">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt="Game Engine Viewport"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6bzx3NAgFxmJROKc_-PxOGPqTisUb4t0JRNmoMnv1sgIqR7umuaUD-6XppoQTzwksqrJdp3-IZs0UkuiT2svddJopixKyAJxXzK4glno4K5iva7DBNTfDcsgYpUjV_kBy9JeF6z5dVWm7S6r2ocj6k1AwJvxr71O8w3OEebruZASPdhqAFB37jmm4pdUX7MAtRykWGYcNFNE4x46DK96QP8d9hl3q8ej_TeRW8dgmqTyGP5n5sGFW"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-primary-container/90 via-primary-container/60 to-transparent text-surface">
                    <div className="text-xs font-mono uppercase tracking-wider text-tertiary-fixed mb-1">
                      HLSL Render Pipeline
                    </div>
                    <div className="font-headline-md-mobile text-lg font-bold">
                      Volumetric Fog &amp; Shader Pass
                    </div>
                  </div>
                </div>

                {/* Metric Tile */}
                <div className="p-8 rounded-xl bg-surface-container border border-on-surface/15">
                  <div className="font-metric-huge text-headline-lg font-extrabold text-on-surface leading-none mb-3">
                    60 FPS
                  </div>
                  <div className="h-px bg-on-surface/15 w-full my-4"></div>
                  <p className="font-body-md text-sm text-on-surface-variant">
                    Rock-solid target frame timing locked across mid-tier mobile hardware and low-spec handhelds via custom draw call batching.
                  </p>
                </div>
              </div>

              <div className="space-y-6 sm:pt-12">
                {/* Secondary Card */}
                <div className="rounded-xl overflow-hidden border border-on-surface/15 bg-surface-container-high aspect-[4/5] relative group">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt="Shadow of Honor - Combat Engine"
                    src="/shadow-of-honor.jpg"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-primary-container/90 via-primary-container/60 to-transparent text-surface">
                    <div className="text-xs font-mono uppercase tracking-wider text-tertiary-fixed mb-1">
                      Entity-Component System
                    </div>
                    <div className="font-headline-md-mobile text-lg font-bold">
                      Deterministic Combat Engine
                    </div>
                  </div>
                </div>

                {/* Code/Telemetry Box */}
                <div className="p-6 rounded-xl bg-primary-container text-surface border border-on-surface/10 font-mono text-xs space-y-2">
                  <div className="flex justify-between items-center text-on-primary-container pb-2 border-b border-surface/15">
                    <span>SIMULATION_TICK</span>
                    <span className="text-tertiary-fixed font-bold">LOCKED · 16.6ms</span>
                  </div>
                  <div className="text-surface-variant font-mono leading-relaxed pt-1">
                    &gt; Memory Alloc: 124MB / Peak<br/>
                    &gt; DrawCalls: 84 / Frame<br/>
                    &gt; Garbage Collect: Zero/Sec
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 4. SERVICE 02 — Web Development (Mint Accent #74BE9C)        */}
        {/* ============================================================ */}
        <section className="px-margin md:px-margin-desktop py-space-xl md:py-space-xxl border-b border-on-surface/10 bg-surface-container-low relative" id="web">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-gutter-desktop items-start">
            {/* Left Visual Column */}
            <div className="lg:col-span-7 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-6">
                {/* 4:5 Portrait Card */}
                <div className="rounded-xl overflow-hidden border border-on-surface/15 bg-surface-container-high aspect-[4/5] relative group">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt="Web Infrastructure Dashboard"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDOEVDSdnc7elJ5koaFWqZo2B6QeuRBqTE6oyWZrZirzgPjYNBvR3yXHgtnS-iStv6KhAq1FNtuD4EmKZP7aQpCksKYMQQbMU9HbFmauD1oVFSzcL3VyfA3OXdCfXvXSHOW0v8fIQDX56tHXq7npAgsQB9p35sSkvkUqkpksnQM8CNDvtrdeDKtyn4CStGDm9ULVR0M4m_lJQn8KjPR1N14MeXNrL2U2V5hpt6fV_0MPoA_UkP6wRD"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-primary-container/90 via-primary-container/60 to-transparent text-surface">
                    <div className="text-xs font-mono uppercase tracking-wider text-surface-variant mb-1">
                      Architecture Suite
                    </div>
                    <div className="font-headline-md-mobile text-lg font-bold">
                      Multi-Tenant Event Streams
                    </div>
                  </div>
                </div>

                {/* Architecture Spec Box */}
                <div className="p-6 rounded-xl bg-surface-container border border-on-surface/15 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#74BE9C]"></span>
                    <span className="font-headline-md-mobile text-base font-bold text-on-surface">Sub-Second SLA</span>
                  </div>
                  <p className="font-body-md text-sm text-on-surface-variant">
                    Edge distributed CDN cached with zero cold starts via V8 micro-runtimes and Go microservices.
                  </p>
                </div>
              </div>

              <div className="space-y-6 sm:pt-12">
                {/* Metric Tile */}
                <div className="p-8 rounded-xl bg-primary-container text-surface border border-surface/15">
                  <div className="font-metric-huge text-headline-lg font-extrabold text-[#74BE9C] leading-none mb-3">
                    99.99%
                  </div>
                  <div className="h-px bg-surface/15 w-full my-4"></div>
                  <p className="font-body-md text-sm text-surface-variant">
                    Verified uptime over 18 million continuous production transactions with automated fallback queues.
                  </p>
                </div>

                {/* Secondary Card */}
                <div className="rounded-xl overflow-hidden border border-on-surface/15 bg-surface-container-high aspect-[4/5] relative group">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt="Responsive Design System Interface"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLD2LMT6aOz8KEjFf5xdU0QXapyoeV4WzAw4RrV11Q-YuV3bj4-E2kI_BvL5Bi8UDqmoT1A7aUBEtldD1n6YQnaLYgNdGe5DB8FoMoRpG0jEHfm6mI7fiX1pTB__nuYb2Yn4rf6u43VTn2dfGoctF0csEzCMGO27QXUM1__1whSmKjndzYo8LerMxmTuswe3qBVka3h3xUelxBBT-Gj71h70LzLZ65ODHY6S4FS28jBofHtfOMqQAR"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-primary-container/90 via-primary-container/60 to-transparent text-surface">
                    <div className="text-xs font-mono uppercase tracking-wider text-surface-variant mb-1">
                      Workforce Platform
                    </div>
                    <div className="font-headline-md-mobile text-lg font-bold">
                      Role-Based Access Control
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sticky Text Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#74BE9C]/25 text-on-surface font-label-eyebrow text-label-eyebrow font-semibold">
                <span>02 — {s2.title}</span>
              </div>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                Resilient web platforms and distributed APIs.
              </h2>
              <div className="space-y-4 text-on-surface-variant font-body-md text-body-md leading-relaxed">
                <p>
                  Led by <strong className="text-on-surface font-semibold">{lead2}</strong>. {s2.description}
                </p>
              </div>

              {/* Concrete Bullets */}
              <ul className="space-y-3 pt-2">
                {s2.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#74BE9C] text-[20px] mt-0.5">check_circle</span>
                    <span className="font-body-md text-body-md text-on-surface">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Tech Chips */}
              <div className="flex flex-wrap gap-2 pt-4">
                {s2.chips.map((chip, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full border border-on-surface/15 text-xs font-medium text-on-surface bg-surface-container">
                    {chip}
                  </span>
                ))}
              </div>

              {/* Fused Pill CTA */}
              <div className="pt-4">
                <a className="fused-pod group inline-flex items-center" href="#cta">
                  <span className="bg-on-surface text-surface font-body-md text-body-md font-medium px-6 py-3 rounded-l-full group-hover:bg-secondary group-hover:text-white transition-colors duration-150">
                    Review Web Architecture
                  </span>
                  <span className="fused-arrow bg-on-surface text-surface w-12 h-12 flex items-center justify-center rounded-r-full border-l border-white/20 group-hover:bg-secondary group-hover:text-white transition-all duration-150">
                    <span className="material-symbols-outlined text-[20px]">north_east</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 5. SERVICE 03 — App Development (Electric Indigo #3D1BFD)   */}
        {/* ============================================================ */}
        <section className="px-margin md:px-margin-desktop py-space-xl md:py-space-xxl border-b border-on-surface/10 bg-[#161233] text-surface relative" id="apps">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-gutter-desktop items-start">
            {/* Sticky Text Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary text-surface font-label-eyebrow text-label-eyebrow font-semibold">
                <span>03 — {s3.title}</span>
              </div>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-surface">
                Native performance from a single unified codebase.
              </h2>
              <div className="space-y-4 text-surface-variant font-body-md text-body-md leading-relaxed">
                <p>
                  Led by <strong className="text-surface font-semibold">{lead3}</strong>. {s3.description}
                </p>
              </div>

              {/* Concrete Bullets */}
              <ul className="space-y-3 pt-2 text-surface">
                {s3.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-secondary-fixed text-[20px] mt-0.5">check_circle</span>
                    <span className="font-body-md text-body-md">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Tech Chips */}
              <div className="flex flex-wrap gap-2 pt-4">
                {s3.chips.map((chip, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-full border border-white/20 text-xs font-medium text-surface bg-white/5">
                    {chip}
                  </span>
                ))}
              </div>

              {/* Fused Pill CTA on Dark Ground */}
              <div className="pt-4">
                <a className="fused-pod group inline-flex items-center" href="#cta">
                  <span className="bg-surface text-on-surface font-body-md text-body-md font-medium px-6 py-3 rounded-l-full group-hover:bg-secondary group-hover:text-surface transition-colors duration-150">
                    See Mobile Apps
                  </span>
                  <span className="fused-arrow bg-surface text-on-surface w-12 h-12 flex items-center justify-center rounded-r-full border-l border-on-surface/20 group-hover:bg-secondary group-hover:text-surface transition-all duration-150">
                    <span className="material-symbols-outlined text-[20px]">north_east</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Right Visual Showcase */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-6">
                {/* 4:5 Portrait Card */}
                <div className="rounded-xl overflow-hidden border border-white/15 bg-white/5 aspect-[4/5] relative group">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt="Mobile POS Interface"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAV_rfNW5PbiE7kahybpOfrbGn2pO4DzKc9mGEeahhaL52ibNiY0-PDEn_kdPlcZwmnXOT6UJE-A7K2VkW4BbiBA8oqHfRkueuka_ig23_O9sNMREXkcdYN4AzK88j9AlWDj1W9NZy3MaYyRKR8ZfEEaOfeJ3c_iIzTphHvHASvM-xZNkNhkHl29gjroyTfJgCSX4fWRPl4TUKb0xmbdjziqS_vcL-znFrkXl8cT6OqMSGf5eevovsA"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white">
                    <div className="text-xs font-mono uppercase tracking-wider text-secondary-fixed mb-1">
                      Hardware Interface
                    </div>
                    <div className="font-headline-md-mobile text-lg font-bold">
                      Bluetooth Thermal Dispatch
                    </div>
                  </div>
                </div>

                {/* Sync Architecture Box */}
                <div className="p-6 rounded-xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-wider text-secondary-fixed">Local Storage Engine</span>
                    <span className="px-2 py-0.5 rounded-full bg-secondary text-white text-[10px] font-mono">ISAR NO-SQL</span>
                  </div>
                  <p className="font-body-md text-sm text-surface-variant">
                    Bidirectional multi-master synchronization engine with atomic schema versioning across network blackouts.
                  </p>
                </div>
              </div>

              <div className="space-y-6 sm:pt-12">
                {/* Secondary Card */}
                <div className="rounded-xl overflow-hidden border border-white/15 bg-white/5 aspect-[4/5] relative group">
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt="Flutter Biometric & Inventory Screens"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFFFPgwyu-jzvLnVCmDuN4OfTl2QaKgCSxEGMB4oculNNioYW29vfonHcBjy1ujIi_X0h_Xxh7DCLwpauZ_v--JWRCBKtVf_UEOt9DK9MRlHzaPevOlrBVBOyJHcziUf9lCNnks0ln9CmwrctJjcWB9CKMdEwKr6OdcQlXgl0Y0mfnNFouukHPGo0FKzynwIAMmsge0QBv0d7V_6x8dHHAp0pJcAkG4IdKOt7FH96b1KIrsWb4Oh5i"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white">
                    <div className="text-xs font-mono uppercase tracking-wider text-secondary-fixed mb-1">
                      Flutter Architecture
                    </div>
                    <div className="font-headline-md-mobile text-lg font-bold">
                      Zero Jitter 120Hz Animations
                    </div>
                  </div>
                </div>

                {/* Metric Tile */}
                <div className="p-8 rounded-xl bg-secondary text-white border border-white/15">
                  <div className="font-metric-huge text-headline-lg font-extrabold leading-none mb-3">
                    &lt;10ms
                  </div>
                  <div className="h-px bg-white/20 w-full my-4"></div>
                  <p className="font-body-md text-sm text-white/90">
                    Local SQLite search and barcode decoding latency tested across 50,000 SKUs on entry-level Android devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 6. PROCESS SECTION ("How We Work")                          */}
        {/* ============================================================ */}
        <section className="px-margin md:px-margin-desktop py-space-xl md:py-space-xxl border-b border-on-surface/10 bg-surface">
          <div className="max-w-[1400px] mx-auto">
            {/* Section Header */}
            <div className="mb-16">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-on-surface"></span>
                <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-on-surface-variant font-medium">
                  How We Work
                </span>
              </div>
              <h2 className="text-display-xxl-mobile md:text-headline-lg font-display-xxl text-on-surface tracking-tight">
                <span>Engineering rigor. </span>
                <span className="font-display-serif-xxl-mobile md:font-headline-serif-md italic font-normal">
                  Zero black boxes.
                </span>
              </h2>
            </div>

            {/* 4 Horizontal Steps with Hairline Dividers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 01 */}
              <div className="border-t border-on-surface/20 pt-6 flex flex-col justify-between h-full">
                <div>
                  <div className="font-mono text-sm font-bold text-on-tertiary-container mb-4">01</div>
                  <h3 className="font-headline-md-mobile text-headline-md-mobile font-bold text-on-surface mb-3">
                    Discover
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Scope, technical feasibility audit, architecture specification, and fixed delivery roadmap.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-on-surface/10 text-xs font-mono text-on-surface-variant">
                  TIMEFRAME: WEEK 01
                </div>
              </div>

              {/* Step 02 */}
              <div className="border-t border-on-surface/20 pt-6 flex flex-col justify-between h-full">
                <div>
                  <div className="font-mono text-sm font-bold text-[#74BE9C] mb-4">02</div>
                  <h3 className="font-headline-md-mobile text-headline-md-mobile font-bold text-on-surface mb-3">
                    Design
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    High-fidelity interaction systems, data modeling, database schema design, and API contracts.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-on-surface/10 text-xs font-mono text-on-surface-variant">
                  TIMEFRAME: WEEKS 02 - 03
                </div>
              </div>

              {/* Step 03 */}
              <div className="border-t border-on-surface/20 pt-6 flex flex-col justify-between h-full">
                <div>
                  <div className="font-mono text-sm font-bold text-secondary mb-4">03</div>
                  <h3 className="font-headline-md-mobile text-headline-md-mobile font-bold text-on-surface mb-3">
                    Build
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Rapid milestone cycles, weekly staging deployments, direct Git/codebase visibility, and unit testing.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-on-surface/10 text-xs font-mono text-on-surface-variant">
                  TIMEFRAME: ITERATIVE SPRINTS
                </div>
              </div>

              {/* Step 04 */}
              <div className="border-t border-on-surface/20 pt-6 flex flex-col justify-between h-full">
                <div>
                  <div className="font-mono text-sm font-bold text-on-surface mb-4">04</div>
                  <h3 className="font-headline-md-mobile text-headline-md-mobile font-bold text-on-surface mb-3">
                    Ship
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Production release, continuous integration pipelines, monitoring setup, and ongoing SLA maintenance.
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-on-surface/10 text-xs font-mono text-on-surface-variant">
                  TIMEFRAME: HARD LAUNCH &amp; SLA
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 7. CALL TO ACTION BAND                                       */}
        {/* ============================================================ */}
        <section className="px-margin md:px-margin-desktop py-space-xl md:py-space-xxl bg-surface-container-high border-b border-on-surface/10" id="cta">
          <div className="max-w-[1400px] mx-auto text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container border border-on-surface/10 text-on-surface font-label-eyebrow text-label-eyebrow font-medium mb-8">
              <span className="w-2 h-2 rounded-full bg-secondary"></span>
              <span>Open for Production Engagements</span>
            </div>
            <h2 className="text-display-xxl-mobile md:text-headline-lg font-display-xxl text-on-surface tracking-tight mb-6 max-w-4xl">
              Have something to <span className="underline decoration-secondary decoration-4 underline-offset-8">build</span>?
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-10">
              Talk directly to the engineers building your software. Scoping within 24 hours.
            </p>

            {/* Primary Action Fused Pill */}
            <a className="fused-pod group inline-flex items-center" href="mailto:hello@anamorphic.studio">
              <span className="bg-primary text-on-primary font-body-lg text-body-lg font-medium px-8 py-4 rounded-l-full group-hover:bg-secondary group-hover:text-white transition-colors duration-150">
                Start a Project
              </span>
              <span className="fused-arrow bg-primary text-on-primary w-14 h-14 flex items-center justify-center rounded-r-full border-l border-white/20 group-hover:bg-secondary group-hover:text-white transition-all duration-150">
                <span className="material-symbols-outlined text-[24px]">north_east</span>
              </span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

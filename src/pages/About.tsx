import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase, type StudioInfo } from '../lib/supabaseClient'

const DEFAULT_STUDIO_INFO: StudioInfo = {
  id: 1,
  manifesto:
    'Anamorphic is an independent engineering studio for games, web platforms, and mobile apps — founded by engineers who run live production systems, not pitch decks or un-shipped prototypes.',
  contact_email: 'anamorphiicc@gmail.com',
  press_kit_url: 'https://anamorphic.studio/press-kit.zip',
}

export default function About() {
  const [studioInfo, setStudioInfo] = useState<StudioInfo>(DEFAULT_STUDIO_INFO)

  useEffect(() => {
    window.scrollTo(0, 0)
    async function loadStudioInfo() {
      try {
        const { data, error } = await supabase
          .from('studio_info')
          .select('*')
          .eq('id', 1)
          .single()

        if (!error && data) {
          setStudioInfo(data as StudioInfo)
        }
      } catch (err) {
        console.warn('Supabase studio_info fetch error, using default', err)
      }
    }
    loadStudioInfo()
  }, [])

  return (
    <div className="bg-surface text-on-surface antialiased selection:bg-secondary selection:text-surface min-h-screen flex flex-col justify-between overflow-x-hidden">
      <Header />

      {/* Content Canvas Container */}
      <main className="pt-28 md:pt-36 flex-grow">
        {/* ========================================================================= */}
        {/* 2. HERO SECTION                                                           */}
        {/* ========================================================================= */}
        <section className="w-full px-margin md:px-margin-desktop pt-space-lg pb-space-xl md:pb-space-xxl border-b border-on-surface/15">
          <div className="max-w-7xl mx-auto">
            {/* Eyebrow Badge */}
            <div className="flex items-center gap-2 mb-space-md">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-secondary"></span>
              <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant tracking-wider uppercase font-semibold">
                About
              </span>
            </div>

            {/* Giant Mixed Headline */}
            <div className="max-w-6xl mb-space-lg">
              <h1 className="tracking-tight leading-none">
                <span className="block font-display-serif-xxl-mobile md:font-display-serif-xxl text-display-serif-xxl-mobile md:text-display-serif-xxl italic font-normal text-on-surface mb-2">
                  A small studio
                </span>
                <span className="block font-display-xxl-mobile md:font-display-xxl text-display-xxl-mobile md:text-display-xxl font-extrabold text-on-surface">
                  with shipped proof.
                </span>
              </h1>
            </div>

            {/* Editorial Intro Block with Asymmetric 12-Column Grid */}
            <div className="grid grid-cols-12 gap-gutter-desktop items-baseline pt-space-md border-t border-on-surface/15">
              <div className="col-span-12 md:col-span-7">
                <p className="font-body-lg text-body-lg text-on-surface font-normal leading-relaxed">
                  {studioInfo.manifesto ||
                    'Anamorphic is an independent engineering studio for games, web platforms, and mobile apps — founded by engineers who run live production systems, not pitch decks or un-shipped prototypes.'}
                </p>
              </div>
              <div className="col-span-12 md:col-span-5 flex flex-col justify-between mt-6 md:mt-0">
                <p className="font-body-md text-body-md text-on-surface-variant font-medium">
                  Direct collaboration with principal builders. Lahore &amp; Global Remote. Zero bloated account layers.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#74BE9C] text-on-surface font-label-eyebrow text-label-eyebrow font-semibold">
                    Live Production Status
                  </span>
                  <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">
                    UTC +5:00 / Edge 24/7
                  </span>
                </div>
                <div className="mt-6">
                  <Link to="/contact" className="fused-pod group inline-flex items-center">
                    <span className="bg-primary-container text-surface px-6 py-3 rounded-l-full font-label-eyebrow text-label-eyebrow font-medium group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-150">
                      Work with us
                    </span>
                    <span className="fused-arrow bg-primary-container text-surface w-11 h-11 rounded-r-full flex items-center justify-center -ml-px border-l border-surface/20 group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-150">
                      <span className="material-symbols-outlined text-lg">north_east</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. VALUES SECTION (Principles Forged in Production)                       */}
        {/* ========================================================================= */}
        <section className="w-full px-margin md:px-margin-desktop py-space-xl md:py-space-xxl border-b border-on-surface/15">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-12 gap-gutter-desktop mb-space-xl">
              <div className="col-span-12 md:col-span-4">
                <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant uppercase tracking-wider block mb-2 font-semibold">
                  How We Operate
                </span>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">
                  Engineering principles forged in production.
                </h2>
              </div>
              <div className="col-span-12 md:col-span-8 flex items-end">
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                  We reject the typical agency conveyor belt. No account liaisons, no outsourced offshore shell teams, and no academic dogma. We guarantee direct terminal access to the people writing core logic.
                </p>
              </div>
            </div>

            {/* Structured Rows with Hairline Dividers */}
            <div className="divide-y divide-on-surface/15 border-t border-b border-on-surface/15">
              {/* Row 01 */}
              <div className="grid grid-cols-12 gap-gutter-desktop py-space-lg group hover:bg-surface-container-low transition-colors duration-150">
                <div className="col-span-12 md:col-span-2 flex items-start">
                  <span className="font-metric-huge text-headline-md font-bold text-secondary">01</span>
                </div>
                <div className="col-span-12 md:col-span-4 flex items-start">
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
                    Ship real software
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-6 flex items-start">
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Live in retail shops, factories, and app stores beats slide decks every time. We build software that handles real commerce, physical manufacturing lines, and daily operational payroll.
                  </p>
                </div>
              </div>

              {/* Row 02 */}
              <div className="grid grid-cols-12 gap-gutter-desktop py-space-lg group hover:bg-surface-container-low transition-colors duration-150">
                <div className="col-span-12 md:col-span-2 flex items-start">
                  <span className="font-metric-huge text-headline-md font-bold text-secondary">02</span>
                </div>
                <div className="col-span-12 md:col-span-4 flex items-start">
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
                    Own the backend
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-6 flex items-start">
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    We run what we build: background worker queues, telemetry, Redis caching layers, Dockerized microservices, and database integrity under high load. We do not throw code over a wall.
                  </p>
                </div>
              </div>

              {/* Row 03 */}
              <div className="grid grid-cols-12 gap-gutter-desktop py-space-lg group hover:bg-surface-container-low transition-colors duration-150">
                <div className="col-span-12 md:col-span-2 flex items-start">
                  <span className="font-metric-huge text-headline-md font-bold text-secondary">03</span>
                </div>
                <div className="col-span-12 md:col-span-4 flex items-start">
                  <h3 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
                    Small team, full stack
                  </h3>
                </div>
                <div className="col-span-12 md:col-span-6 flex items-start">
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    The person you speak with is the person writing your schemas, configuring your pipelines, and shipping your release. No middle management or diluted agency handoffs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. STATS BAND (Full-Bleed Electric Indigo #3D1BFD)                         */}
        {/* ========================================================================= */}
        <section className="w-full bg-[#3D1BFD] text-surface py-space-xl md:py-space-xxl px-margin md:px-margin-desktop">
          <div className="max-w-7xl mx-auto">
            <div className="mb-space-lg">
              <span className="font-label-eyebrow text-label-eyebrow text-surface/75 uppercase tracking-wider block mb-2 font-semibold">
                Verified Production Telemetry
              </span>
              <h2 className="font-headline-lg text-headline-lg font-bold text-surface tracking-tight">
                Output measured in live execution.
              </h2>
            </div>

            {/* 4 Stat Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop pt-space-lg border-t border-surface/20">
              {/* Metric 01 */}
              <div className="border-b lg:border-b-0 lg:border-r border-surface/20 pb-8 lg:pb-0 lg:pr-6 flex flex-col justify-between">
                <div>
                  <div className="font-metric-huge text-metric-huge font-extrabold text-surface tracking-tight mb-2">
                    10+
                  </div>
                  <div className="h-1 w-12 bg-[#F6A6CF] mb-4"></div>
                </div>
                <p className="font-body-md text-body-md text-surface/90 font-medium leading-snug">
                  Commercial shops live with our POS &amp; ERP suite.
                </p>
              </div>

              {/* Metric 02 */}
              <div className="border-b lg:border-b-0 lg:border-r border-surface/20 pb-8 lg:pb-0 lg:pr-6 flex flex-col justify-between">
                <div>
                  <div className="font-metric-huge text-metric-huge font-extrabold text-surface tracking-tight mb-2">
                    5
                  </div>
                  <div className="h-1 w-12 bg-[#74BE9C] mb-4"></div>
                </div>
                <p className="font-body-md text-body-md text-surface/90 font-medium leading-snug">
                  Production SaaS platforms running 24/7 with zero unmanaged downtime.
                </p>
              </div>

              {/* Metric 03 */}
              <div className="border-b lg:border-b-0 lg:border-r border-surface/20 pb-8 lg:pb-0 lg:pr-6 flex flex-col justify-between">
                <div>
                  <div className="font-metric-huge text-metric-huge font-extrabold text-surface tracking-tight mb-2">
                    3
                  </div>
                  <div className="h-1 w-12 bg-surface mb-4"></div>
                </div>
                <p className="font-body-md text-body-md text-surface/90 font-medium leading-snug">
                  Core disciplines: Game engines, distributed web systems, and high-performance native apps.
                </p>
              </div>

              {/* Metric 04 */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="font-metric-huge text-metric-huge font-extrabold text-surface tracking-tight mb-2">
                    2
                  </div>
                  <div className="h-1 w-12 bg-[#F6A6CF] mb-4"></div>
                </div>
                <p className="font-body-md text-body-md text-surface/90 font-medium leading-snug">
                  Engineers deep in AI, computer vision, and real-time edge telemetry.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. PRODUCTION TIMELINE (Vertical Provenance)                              */}
        {/* ========================================================================= */}
        <section className="w-full px-margin md:px-margin-desktop py-space-xl md:py-space-xxl border-b border-on-surface/15">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-12 gap-gutter-desktop mb-space-xl">
              <div className="col-span-12 md:col-span-5">
                <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant uppercase tracking-wider block mb-2 font-semibold">
                  Studio Provenance
                </span>
                <h2 className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight">
                  From initial deployments to multi-platform engineering.
                </h2>
              </div>
              <div className="col-span-12 md:col-span-7 flex items-end">
                <p className="font-body-md text-body-md text-on-surface-variant">
                  A chronological breakdown of how our technical stack matured from bespoke infrastructure scripts into hardened, cross-industry production suites.
                </p>
              </div>
            </div>

            {/* Vertical Timeline Component */}
            <div className="relative pl-6 md:pl-12 border-l border-on-surface/20 space-y-space-xl max-w-4xl">
              {/* Milestone 01 */}
              <div className="relative group">
                <div className="absolute -left-[31px] md:-left-[55px] top-1.5 w-3.5 h-3.5 rounded-full bg-secondary ring-4 ring-surface"></div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-label-eyebrow text-label-eyebrow font-semibold px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface">
                    Epoch 01
                  </span>
                  <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">
                    Architecture Baseline
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">
                  Studio Founded
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Three principal engineers unite around a singular rule: take full technical ownership and eliminate non-technical management bloat. Direct access to source repositories from day zero.
                </p>
              </div>

              {/* Milestone 02 */}
              <div className="relative group">
                <div className="absolute -left-[31px] md:-left-[55px] top-1.5 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-surface"></div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-label-eyebrow text-label-eyebrow font-semibold px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface">
                    Epoch 02
                  </span>
                  <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">
                    High-Concurrency Cloud
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">
                  First SaaS Platforms Live
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Deployment of 5 multi-role operational SaaS platforms (Workforce Suite) handling attendance, scheduling, and double-entry payroll across high-concurrency environments.
                </p>
              </div>

              {/* Milestone 03 */}
              <div className="relative group">
                <div className="absolute -left-[31px] md:-left-[55px] top-1.5 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-surface"></div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-label-eyebrow text-label-eyebrow font-semibold px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface">
                    Epoch 03
                  </span>
                  <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">
                    Hardware &amp; Physical Integration
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">
                  POS Suite in 10+ Commercial Shops
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Delivery of enterprise POS and retail accounting systems operating live on shop counters with thermal ESC/POS hardware integration, offline cash-drawer synchronizations, and sub-second barcode scans.
                </p>
              </div>

              {/* Milestone 04 */}
              <div className="relative group">
                <div className="absolute -left-[31px] md:-left-[55px] top-1.5 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-surface"></div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-label-eyebrow text-label-eyebrow font-semibold px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface">
                    Epoch 04
                  </span>
                  <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">
                    Industrial ML
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">
                  Edge Computer Vision &amp; AI Automation
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Architecture and factory deployment of PipeVision AI, coupling YOLOv8 conveyor tracking directly to enterprise ERP ledgers for A-One PVC. Real-time fault tolerance without cloud latency overheads.
                </p>
              </div>

              {/* Milestone 05 */}
              <div className="relative group">
                <div className="absolute -left-[31px] md:-left-[55px] top-1.5 w-3.5 h-3.5 rounded-full bg-secondary ring-4 ring-surface"></div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-label-eyebrow text-label-eyebrow font-semibold px-2 py-0.5 rounded-full bg-secondary text-surface">
                    Present State
                  </span>
                  <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">
                    Global Delivery
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-on-surface mb-2">
                  Anamorphic Today
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Delivering unified game engines, distributed cloud platforms, and native Flutter apps with guaranteed sub-40ms edge performance and 24h architectural roadmaps.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. CTA BAND (Next Engagement)                                            */}
        {/* ========================================================================= */}
        <section className="w-full px-margin md:px-margin-desktop py-space-xl md:py-space-xxl bg-surface-container-low border-b border-on-surface/15" id="contact">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-4xl">
              <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant uppercase tracking-wider block mb-2 font-semibold">
                Next Engagement
              </span>
              <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface tracking-tight mb-4">
                Work with the people who ship.
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-space-lg leading-relaxed max-w-2xl">
                Have technical specifications or a hard launch deadline? We review architecture specs and provide fixed delivery roadmaps within 24 hours.
              </p>
              {/* Fused Pill Action CTA: Meet the team ↗ */}
              <div className="inline-flex">
                <Link to="/#team" className="fused-pod group inline-flex items-center">
                  <span className="bg-primary-container text-surface px-7 py-4 rounded-l-full font-body-md text-body-md font-semibold tracking-wide group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-150">
                    Meet the team
                  </span>
                  <span className="bg-primary-container text-surface w-14 h-14 rounded-r-full flex items-center justify-center -ml-px border-l border-surface/20 group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-150">
                    <span className="material-symbols-outlined text-2xl">north_east</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

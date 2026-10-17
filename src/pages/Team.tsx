import Header from '../components/Header'
import Footer from '../components/Footer'

interface TeamMember {
  name: string
  role: string
  leadTag: string
  disciplineTag: string
  disciplineSub: string
  bio: string
  chips: string[]
  imageUrl: string
  badgeText: string
  badgeBg: string
  inverted?: boolean
  linkedInUrl?: string
  githubUrl?: string
  email?: string
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Mian Faseeh Ur Rehman',
    role: 'CEO & Project Manager / Head of Games',
    leadTag: 'Principal 01',
    disciplineTag: 'Leadership & Delivery',
    disciplineSub: 'Real-Time Core',
    bio: "Runs delivery end to end — technical scoping, architecture roadmaps, sprint execution, and shipping. Directs studio game development practices, real-time rendering pipelines, and release governance.",
    chips: ['Unity 3D', 'C#', 'HLSL Shaders', 'Sprint Scoping', 'Production CI/CD', 'Photon Realtime'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuASG0W42bY_gsxnnA3_k_vOaJMpMRkTnbhDtAgNMyxuQh16_1SD5oG3DFLMGGzfYquZBn77mMCbkLen4TsI-pHohdFb38m5tF-7OWAE2qAoDthPJcgjyj0eIM2PMtk2BXV6FlNUGfQLNNPMxqjg8A_bXAV6gbJzTxM2Z-SkBtj5gP47gG43tw_VKASueCNPcm97vUdgvjdpCM4rMbTrlN_TNQIR__WfpWZU5mFbqoDAcxiDXbsp3lPx',
    badgeText: 'Principal 01',
    badgeBg: 'bg-[#F6A6CF] text-primary',
    inverted: false,
    linkedInUrl: 'https://linkedin.com',
    email: 'anamorphiicc@gmail.com',
  },
  {
    name: 'Muhammad Tayyab',
    role: 'Chief Technology Officer (CTO) & Head of 3D',
    leadTag: 'Principal 02 · CTO',
    disciplineTag: 'Technical Architecture & 3D Art',
    disciplineSub: 'Unity Engine & Blender',
    bio: 'Leads core technical architecture, 3D modeling, rigging, and custom gameplay systems. Builds complete 3D environments, enemy AI, boss fight state machines, cutscenes, and physics simulations from scratch across Unity (2022–2024, Unity 6) and Blender.',
    chips: [
      'Unity 6',
      'Blender 3D',
      'C# / C++',
      'NavMesh AI',
      'Cinemachine',
      'Mixamo Rigging',
      'URP Shaders',
      'Substance Painter',
      'Physics Engines',
    ],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuABKgk5aoLbkEjSO4kD0UHMS75Ss76wIMD7K923R0hYc269aXlE_Bqzb7EKyzDeSclq51KJF4dLIyapTX9NsLgB3r8kpK1wL4zZ9GcIRKdX4HpL2Rwcc0RMBBRjaDZ0lE2DEe_HVueLs-Py6rSnfJvvIx-Y0-AUvhSSxpoEwB1h1tjEnnKDHipkyFWvB1PgrIXzK7f1HRk30QBJl0TEJuvuP47F0uk7cV-ZkG9Uj66IpV-c5h872fN6',
    badgeText: 'CTO · Principal 02',
    badgeBg: 'bg-[#FF5B5B] text-white',
    inverted: true,
    linkedInUrl: 'https://linkedin.com/in/m-tayyabmalik',
    githubUrl: 'https://github.com/tabi-malikx',
    email: 'tayyabmalikofficial12@gmail.com',
  },
  {
    name: 'Shah Fahad',
    role: 'Lead Backend Engineer / Systems Architect',
    leadTag: 'Principal 03',
    disciplineTag: 'Distributed Systems',
    disciplineSub: 'Zero Downtime',
    bio: 'Node.js, Go, and PostgreSQL backends engineered to sustain heavy concurrency under zero unmanaged downtime. Architect and custodian of five live production multi-tenant SaaS platforms.',
    chips: ['TypeScript', 'Go', 'Node.js', 'PostgreSQL', 'Docker', 'Redis', 'RabbitMQ'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBx9TIs49Kb0IvpeF6uqLG73w7-n3R5Uqw3nzs6BxQInrfhx6T_BtKGXxz78hVI5ZWZ4YDLnJ4p2wC9oqX0FBuwhvgt52v32biMQBi0-mdFC1nh0_gVaQoAn2ViocNtTIIJK8r49S5sfZkV8CCwrp3owd-S15dwbxR_yLIQMcYUmqSYynQ4dBI1gT7cWmWeGZafRMqDb9McK_Cnjt1NTNwjIcLHWtbVhDZd4odK9bwp8tithHTfNEG4',
    badgeText: 'Principal 03',
    badgeBg: 'bg-[#74BE9C] text-primary',
    inverted: false,
    linkedInUrl: 'https://linkedin.com',
    email: 'anamorphiicc@gmail.com',
  },
  {
    name: 'Muhammad Ali',
    role: 'Mobile & Full-Stack Engineer / Vision Systems',
    leadTag: 'Principal 04',
    disciplineTag: 'Edge & Interfaces',
    disciplineSub: 'Computer Vision',
    bio: 'Cross-platform Flutter apps, reactive React interfaces, high-throughput Node.js APIs, and on-premise YOLOv8 edge computer vision systems deployed into live industrial manufacturing plants.',
    chips: ['Flutter', 'React', 'Node.js', 'Python', 'YOLOv8', 'FastAPI', 'WebSockets'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB5xYc-mLL9-A1w9lvObOPRrOspFo1dTyE4AcB3z8VOddNPohXGrlDbrMP64JzQbrKAI6ScMntkHcYr2AQguwjnHsZJ31SdPCuToXZKm-3utNnUPfvSaX7T6emLW9dYVkY2ZeK6x30QCO61A9yuKhR6l4-JjWo5FTWv8Bbefk__eTX9GfhVN5sPyF1jU1OBd1JZlMgD62ajZnd1Z0f64xl2ydNZsRg50AEb5TpOIlz_WlwRa64pD98C',
    badgeText: 'Principal 04',
    badgeBg: 'bg-[#e3dfff] text-secondary font-bold',
    inverted: true,
    linkedInUrl: 'https://linkedin.com',
    email: 'anamorphiicc@gmail.com',
  },
]

export default function Team() {
  return (
    <div className="bg-background text-on-surface antialiased selection:bg-secondary selection:text-on-secondary min-h-screen flex flex-col font-body-md text-body-md overflow-x-hidden">
      {/* Top Editorial Header */}
      <Header />

      <main className="flex-grow pt-28 md:pt-36">
        {/* ========================================================================= */}
        {/* 2. HERO SECTION                                                           */}
        {/* ========================================================================= */}
        <section className="w-full px-margin md:px-margin-desktop py-space-xl md:py-space-xxl border-b border-on-surface/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-gutter-desktop items-start">
            {/* Left Column: Eyebrow + Signature Dual Headline + Direct Manifesto Copy */}
            <div className="md:col-span-8 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-on-surface-variant font-semibold">
                  The Leadership &amp; Engineering Team
                </span>
              </div>
              {/* Signature Headline */}
              <h1 className="flex flex-col tracking-tight">
                <span className="font-display-serif-xxl-mobile md:font-display-serif-xxl text-display-serif-xxl-mobile md:text-display-serif-xxl italic text-on-surface">
                  Four builders.
                </span>
                <span className="font-display-xxl-mobile md:font-display-xxl text-display-xxl-mobile md:text-display-xxl text-on-surface font-extrabold -mt-2 md:-mt-6">
                  Zero handoffs.
                </span>
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl pt-4 leading-relaxed">
                You talk directly to the engineers who architect and code your product. No account liaisons, no offshore handoff relays, no junior layers. Direct terminal, 3D pipeline, and repository custody from line one.
              </p>
              <div className="pt-2">
                <a href="#contact" className="fused-pod group inline-flex items-center">
                  <span className="bg-primary-container text-surface px-6 py-3 rounded-l-full font-label-eyebrow text-label-eyebrow font-medium group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-150">
                    Connect with principals
                  </span>
                  <span className="fused-arrow bg-primary-container text-surface w-11 h-11 rounded-r-full flex items-center justify-center -ml-px border-l border-surface/20 group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-150">
                    <span className="material-symbols-outlined text-lg">north_east</span>
                  </span>
                </a>
              </div>
            </div>

            {/* Right Column: Tactile Dispatch Badge & Verified Status Block */}
            <div className="md:col-span-4 flex flex-col gap-6 pt-2 md:pt-12">
              <div className="border border-on-surface/15 bg-surface-container-low p-6 rounded-none flex flex-col gap-4">
                <div className="flex items-center justify-between border-b border-on-surface/10 pb-3">
                  <span className="font-label-eyebrow text-label-eyebrow text-on-surface font-bold tracking-wider">
                    FOUNDING DISPATCH
                  </span>
                  <span className="bg-[#74BE9C] text-primary px-2.5 py-0.5 rounded-full font-label-eyebrow text-[11px] font-semibold">
                    ACTIVE REPOS
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface font-medium leading-snug">
                  Founding Engineering Leadership · Direct Principal Access · Peshawar, Lahore &amp; Global Remote
                </p>
                <div className="space-y-2 pt-2 border-t border-on-surface/10 text-[12px] font-label-eyebrow text-on-surface-variant">
                  <div className="flex justify-between items-center">
                    <span>Architecture Custody</span>
                    <span className="text-on-surface font-semibold">100% In-House</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Direct Commit SLA</span>
                    <span className="text-on-surface font-semibold">&lt; 4 Hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>3D &amp; Engine Stack</span>
                    <span className="text-on-surface font-semibold">Unity 6 &amp; Blender</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Deployment Surface</span>
                    <span className="text-on-surface font-semibold">Production Edge &amp; Steam</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. MEMBER CARDS (Staggered Layout / Asymmetric Editorial Presentation)    */}
        {/* ========================================================================= */}
        <section className="w-full px-margin md:px-margin-desktop py-space-xl md:py-space-xxl">
          <div className="max-w-7xl mx-auto flex flex-col gap-24 md:gap-36">
            {TEAM_MEMBERS.map((member, index) => (
              <article
                key={member.name}
                className={`grid grid-cols-1 md:grid-cols-12 gap-y-8 md:gap-gutter-desktop items-center ${
                  index !== TEAM_MEMBERS.length - 1 ? 'border-b border-on-surface/10 pb-20 md:pb-28' : ''
                }`}
              >
                {/* 4:5 Portrait Image Column */}
                <div
                  className={`md:col-span-5 relative ${
                    member.inverted ? 'order-1 md:order-2' : ''
                  }`}
                >
                  <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-surface-container border border-on-surface/10 group">
                    <img
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt={member.name}
                      src={member.imageUrl}
                    />
                    <div className="absolute top-4 left-4">
                      <span
                        className={`px-3 py-1 rounded-full font-label-eyebrow text-label-eyebrow font-semibold ${member.badgeBg}`}
                      >
                        {member.badgeText}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Column */}
                <div
                  className={`md:col-span-7 flex flex-col justify-center ${
                    member.inverted ? 'order-2 md:order-1 md:pr-8' : 'md:pl-8'
                  }`}
                >
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-wider text-secondary font-bold">
                      {member.disciplineTag}
                    </span>
                    <span className="text-on-surface/30">/</span>
                    <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">
                      {member.disciplineSub}
                    </span>
                  </div>

                  <h2 className="font-headline-md md:font-headline-lg text-headline-md md:text-headline-lg text-on-surface tracking-tight mb-2 font-bold">
                    {member.name}
                  </h2>
                  <p className="font-label-eyebrow text-label-eyebrow font-medium text-on-surface-variant mb-6 pb-4 border-b border-on-surface/10">
                    {member.role}
                  </p>

                  <p className="font-body-lg text-body-lg text-on-surface mb-8 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Technical & Domain Chips */}
                  <div className="flex flex-wrap gap-2 mb-10">
                    {member.chips.map((chip) => (
                      <span
                        key={chip}
                        className="px-3 py-1.5 rounded-full font-label-eyebrow text-label-eyebrow text-on-surface bg-surface-container-high border border-on-surface/10 transition-colors cursor-default hover:bg-primary-container hover:text-surface"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>

                  {/* Fused Interaction CTAs */}
                  <div className="flex flex-wrap items-center gap-4">
                    {member.linkedInUrl && (
                      <a
                        className="fused-pod group inline-flex items-center transition-all duration-150"
                        href={member.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="bg-primary-container text-surface px-4 py-2 rounded-l-full font-label-eyebrow text-label-eyebrow font-medium group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-150">
                          LinkedIn
                        </span>
                        <span className="bg-primary-container text-surface border-l border-surface/20 w-8 h-8 flex items-center justify-center rounded-r-full font-bold group-hover:bg-secondary group-hover:text-on-secondary transition-transform duration-150">
                          <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                        </span>
                      </a>
                    )}

                    {member.githubUrl && (
                      <a
                        className="fused-pod group inline-flex items-center transition-all duration-150"
                        href={member.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="bg-primary-container text-surface px-4 py-2 rounded-l-full font-label-eyebrow text-label-eyebrow font-medium group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-150">
                          GitHub
                        </span>
                        <span className="bg-primary-container text-surface border-l border-surface/20 w-8 h-8 flex items-center justify-center rounded-r-full font-bold group-hover:bg-secondary group-hover:text-on-secondary transition-transform duration-150">
                          <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                        </span>
                      </a>
                    )}

                    <a
                      className="fused-pod group inline-flex items-center transition-all duration-150"
                      href={`mailto:${member.email || 'anamorphiicc@gmail.com'}`}
                    >
                      <span className="border border-on-surface/20 text-on-surface bg-transparent px-4 py-2 rounded-l-full font-label-eyebrow text-label-eyebrow font-medium group-hover:bg-secondary group-hover:text-on-secondary group-hover:border-transparent transition-colors duration-150">
                        Direct Memo
                      </span>
                      <span className="border-y border-r border-on-surface/20 text-on-surface bg-transparent w-8 h-8 flex items-center justify-center rounded-r-full font-bold group-hover:bg-secondary group-hover:text-on-secondary group-hover:border-transparent transition-transform duration-150">
                        <span className="material-symbols-outlined text-[14px]">arrow_outward</span>
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. CULTURE & PRINCIPLES SUB-STRIP                                         */}
        {/* ========================================================================= */}
        <section className="w-full px-margin md:px-margin-desktop py-space-xl border-t border-b border-on-surface/10 bg-surface-container-low">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-y-10 md:gap-gutter-desktop items-baseline">
            <div className="md:col-span-3">
              <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-on-surface-variant font-bold block mb-2">
                Core Philosophy
              </span>
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">The Model</h3>
            </div>
            <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Principle 1 */}
              <div className="flex flex-col gap-3">
                <span className="font-headline-md font-bold text-secondary">01</span>
                <h4 className="font-headline-md-mobile text-headline-md-mobile text-on-surface font-bold">
                  No translation loss
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  You communicate directly with CTO and technical leads. Requirements do not rot in multi-tiered management chains or slide-deck summaries.
                </p>
              </div>
              {/* Principle 2 */}
              <div className="flex flex-col gap-3">
                <span className="font-headline-md font-bold text-secondary">02</span>
                <h4 className="font-headline-md-mobile text-headline-md-mobile text-on-surface font-bold">
                  Unified 3D &amp; Code Pipeline
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  We model the geometry in Blender, rig the kinematics, configure the shaders, and write the deterministic C# gameplay logic in-house.
                </p>
              </div>
              {/* Principle 3 */}
              <div className="flex flex-col gap-3">
                <span className="font-headline-md font-bold text-secondary">03</span>
                <h4 className="font-headline-md-mobile text-headline-md-mobile text-on-surface font-bold">
                  Verified production tracks
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  We deploy software and games that run cleanly on PC, mobile, and edge clusters under hard 60 FPS performance and latency budgets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. JOIN BAND (Full-Bleed Coral #FF5B5B)                                   */}
        {/* ========================================================================= */}
        <section className="w-full bg-[#FF5B5B] text-primary px-margin md:px-margin-desktop py-space-xl md:py-space-xxl">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="flex flex-col gap-4 max-w-2xl">
              <span className="font-label-eyebrow text-label-eyebrow uppercase tracking-widest text-primary/80 font-bold">
                Selective Intake
              </span>
              <h2 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary tracking-tight font-extrabold">
                Want in? We're small on purpose.
              </h2>
              <p className="font-body-lg text-body-lg text-primary/90 font-medium">
                We hire rarely and only for senior, high-velocity generalists who write clean code, model pristine assets, and require zero management overhead.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a
                className="fused-pod group inline-flex items-center transition-all duration-150"
                href="mailto:anamorphiicc@gmail.com"
              >
                <span className="bg-primary text-surface px-7 py-4 rounded-l-full font-label-eyebrow text-body-md font-semibold group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-150">
                  Say hello
                </span>
                <span className="bg-primary text-surface border-l border-surface/20 w-14 h-14 flex items-center justify-center rounded-r-full font-bold group-hover:bg-secondary group-hover:text-on-secondary transition-transform duration-150">
                  <span className="material-symbols-outlined text-[20px]">arrow_outward</span>
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Shared Footer */}
      <Footer />
    </div>
  )
}

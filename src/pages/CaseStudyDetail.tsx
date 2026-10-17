import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase, parseGameRecord, getDriveFallbackUrl, type Game } from '../lib/supabaseClient'

interface CaseStudyData {
  id: string
  titleSerif: string
  titleSans: string
  fullTitle: string
  categoryBadge: string
  statusBadge: string
  statusBadgeClass: string
  clientTag: string
  clientName: string
  timeline: string
  role: string
  leadArchitect: string
  stackBadges: string[]
  overviewEyebrow: string
  overviewHeadline: string
  plantLocation: string
  conveyorSpeed: string
  opticalStream: string
  throughput: string
  overviewBody1: string
  overviewBody2: string
  feature1Title: string
  feature1Desc: string
  feature2Title: string
  feature2Desc: string
  // Architecture 01 (Mint)
  arch1Tag: string
  arch1Title: string
  arch1LiveTag: string
  arch1Fps: string
  arch1StreamUrl: string
  arch1CamName: string
  arch1ImgUrl: string
  box1Label: string
  box1Confidence: string
  box1Details: string
  box2Label: string
  box2Confidence: string
  box2Details: string
  statBatch: string
  statFps: string
  statVelocity: string
  statAnomaly: string
  // Challenges 01, 02, 03
  c1Title: string
  c1Desc: string
  c2Title: string
  c2Desc: string
  c3Title: string
  c3Desc: string
  // Architecture 02 (Pink)
  arch2Tag: string
  arch2Title: string
  arch2Version: string
  arch2Shift: string
  mod1Title: string
  mod1Main: string
  mod1Sub: string
  mod1L1: string
  mod1L1Val: string
  mod1L2: string
  mod1L2Val: string
  mod1L3: string
  mod1L3Val: string
  mod2Title: string
  mod2Main: string
  mod2Sub: string
  mod2L1: string
  mod2L1Val: string
  mod2L2: string
  mod2L2Val: string
  mod2L3: string
  mod2L3Val: string
  mod3Title: string
  mod3Main: string
  mod3Sub: string
  mod3L1: string
  mod3L1Val: string
  mod3L2: string
  mod3L2Val: string
  mod3L3: string
  mod3L3Val: string
  ledgerNoteTitle: string
  ledgerNoteDesc: string
  // Outcomes
  m1Value: string
  m1Label: string
  m1Desc: string
  m2Value: string
  m2Label: string
  m2Desc: string
  m3Value: string
  m3Label: string
  m3Desc: string
  quoteText: string
  quoteAuthorInitial: string
  quoteAuthorRole: string
  quoteAuthorCompany: string
  // Next Case Study
  nextId: string
  nextTitle: string
  nextDesc: string
}

const DEFAULT_CASE_STUDIES: Record<string, CaseStudyData> = {
  'pipevision-ai': {
    id: 'pipevision-ai',
    titleSerif: 'PipeVision',
    titleSans: 'AI',
    fullTitle: 'PipeVision AI',
    categoryBadge: 'Case Study — AI & Automation',
    statusBadge: 'Production Deployed',
    statusBadgeClass: 'bg-[#74BE9C]/20 text-[#1B1A17] border border-[#74BE9C]/40',
    clientTag: 'Delivered to A-One PVC Company',
    clientName: 'A-One PVC Company',
    timeline: '14 Weeks',
    role: 'Full-Stack & Vision Eng.',
    leadArchitect: 'Muhammad Ali',
    stackBadges: [
      'Python',
      'YOLOv8',
      'OpenCV',
      'React',
      'Node.js',
      'FastAPI',
      'MySQL',
      'WebSockets',
      'Docker',
      'Redis',
    ],
    overviewEyebrow: 'Overview & Deployment Scope',
    overviewHeadline:
      'Autonomous edge computer vision fused with mission-critical factory enterprise ERP.',
    plantLocation: 'Gujranwala / Lahore',
    conveyorSpeed: '2.4 m/s sustained',
    opticalStream: 'Basler GigE Industrial',
    throughput: '45,000+ PVC units',
    overviewBody1:
      'A-One PVC Company required an end-to-end modernization of their manufacturing headquarters: a unified enterprise factory ERP covering HR, shift rosters, biometric attendance, sales invoicing, purchase orders, raw materials inventory, and operational expense accounting. Standard off-the-shelf software failed to mirror the nuanced material handoffs and floor-level realities of continuous PVC extrusion plants.',
    overviewBody2:
      'Directly fused with this operational ledger is an on-premise YOLOv8 computer vision inference pipeline. The system autonomously detects, tracks, and tallies extruded PVC pipes across continuous high-speed conveyor lines, streaming sub-second telemetry over WebSockets into supervisory operator dashboards. Human error, tally disputes, and line inventory leakage were systematically eliminated.',
    feature1Title: 'Dual Synchronized Ledger',
    feature1Desc:
      'Live factory conveyor tallies automatically bind to ERP product delivery notes with millisecond certainty.',
    feature2Title: 'Sub-40ms Inference',
    feature2Desc:
      'Edge GPU acceleration sustains zero dropped frames on rapid optical Basler feeds under low industrial lux.',
    arch1Tag: 'Architecture 01: High-Speed Edge Inference Pipeline',
    arch1Title: 'Real-Time Visual Telemetry & Detection Feed',
    arch1LiveTag: 'Live Feed: Line 03',
    arch1Fps: '64.2 FPS',
    arch1StreamUrl: 'ws://edge-node-03.plant.internal/stream',
    arch1CamName: 'CAM-BASLER-01',
    arch1ImgUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDPs8ZBHxma3oXU95SQz2FXpuwGqeprh73xaliwfPN1_05cab3p4x9k1bnBuBD1kIrdkGu_G1KkuOzQTz6zjeKAFHxB3q88z19uB6t2XgmS_52v59o1yIVDEwU2giJg90YJ2R6a-4dgAjXVNDDmThubRcjHY6vZob2oKfuuO-aYXa_WOl-kQUC_nHhf5e_sTvW7u-14Qq2tdB7miQJXD4YXxfj64RFVzVTajpSvh3kQC_C5nJouppmZ',
    box1Label: 'PVC-Class-A',
    box1Confidence: '99.4%',
    box1Details: 'ID: #48102 · Speed: 2.1 m/s · Dia: 110mm',
    box2Label: 'PVC-Class-A',
    box2Confidence: '98.9%',
    box2Details: 'ID: #48103 · Tracked: In-Gate',
    statBatch: '14,892',
    statFps: '64.2',
    statVelocity: '2.4 m/s',
    statAnomaly: '0.00%',
    c1Title: 'Unifying 60+ FPS Vision Inference with Transactional DB Integrity',
    c1Desc:
      'Directly writing high-velocity vision events to an RDBMS creates catastrophic lock contention during peak extrusion cycles. We decoupled optical ingestion into an asynchronous FastAPI worker cluster buffered through an in-memory Redis Ring Buffer. Verified pipe tally increments are debounced via spatial Euclidean distance checks and committed in transactional batch windows to MySQL, ensuring zero dropped counts and zero database thread exhaustion.',
    c2Title: 'Multi-Role Factory ERP Across Plant Floor & Corporate Finance',
    c2Desc:
      'Floor operators require instantaneous, low-friction shift roster logging and high-contrast kiosk inputs under grease and dust, whereas corporate controllers demand granular double-entry bookkeeping, vendor credit terms, and GST invoicing reconciliations. We designed an isolated role-based permissions matrix with purpose-tailored interfaces: ultra-simplified touch interfaces for manufacturing bays, and data-dense accounting views for executive leadership.',
    c3Title: 'Sub-Second Telemetry Under Unstable Industrial Wi-Fi Jitter',
    c3Desc:
      'Heavy factory machinery produces pervasive radio interference and localized packet loss. Standard HTTP polling was fundamentally non-viable. We engineered localized WebSocket multiplexers with automatic client-side optimistic UI state and heartbeated reconnect fallbacks. In the event of prolonged network partition, edge nodes cache up to 72 hours of telemetry locally before cleanly reconciling with the central cloud cluster.',
    arch2Tag: 'Architecture 02: Integrated ERP & Plant Operations Console',
    arch2Title: 'Dual Ledger: Biometrics, Shift Rosters & Financial Ledger',
    arch2Version: 'ERP Version 2.4.0',
    arch2Shift: 'Live Shift: Morning B',
    mod1Title: 'Extrusion Output Today',
    mod1Main: '34,180 m',
    mod1Sub: '98.4% of scheduled shift target',
    mod1L1: 'Line 01 (110mm)',
    mod1L1Val: '12,400 m',
    mod1L2: 'Line 02 (75mm)',
    mod1L2Val: '10,850 m',
    mod1L3: 'Line 03 (50mm)',
    mod1L3Val: '10,930 m',
    mod2Title: 'Floor Presence (Biometric)',
    mod2Main: '142 / 146',
    mod2Sub: '97.2% Shift Attendance',
    mod2L1: 'Operators & Techs',
    mod2L1Val: '88 present',
    mod2L2: 'Raw Material Loading',
    mod2L2Val: '32 present',
    mod2L3: 'QC Inspectors',
    mod2L3Val: '22 present (2 on-call)',
    mod3Title: 'Resin Stock & Raw Inventory',
    mod3Main: '184.2 Tons',
    mod3Sub: 'Sufficient for 12 continuous days',
    mod3L1: 'Resin SG-5 Grade:',
    mod3L1Val: '110 Tons',
    mod3L2: 'Stabilizer & Additives:',
    mod3L2Val: '28.4 Tons',
    mod3L3: 'Daily OPEX Accrual:',
    mod3L3Val: 'Synchronized',
    ledgerNoteTitle: 'Auto-Reconciled Sales Invoicing',
    ledgerNoteDesc:
      'Every verified stack pallet automatically creates an unbilled delivery draft in the sales ledger.',
    m1Value: '>98.5%',
    m1Label: 'Detection Accuracy',
    m1Desc:
      'Empirically validated across erratic factory ambient illumination, grease splatter on lenses, and conveyor speed oscillations.',
    m2Value: '60+ FPS',
    m2Label: 'Inference Speed',
    m2Desc:
      'Sustained real-time edge processing on local GPU rigs without reliance on external cloud dependencies.',
    m3Value: '0',
    m3Label: 'Duplicate Counts',
    m3Desc:
      'Guaranteed by spatial Euclidean distance tracklet clustering and directional gate vectors on the conveyor axis.',
    quoteText:
      '"Anamorphic did what three foreign enterprise vendors told us was impossible: fused our day-to-day factory accounts with raw visual automation on our actual conveyor line. We have complete audit certainty from resin purchase to truck dispatch."',
    quoteAuthorInitial: 'AP',
    quoteAuthorRole: 'Manufacturing Operations Lead',
    quoteAuthorCompany: 'A-One PVC Manufacturing Complex, Gujranwala',
    nextId: 'workforce-suite',
    nextTitle: 'Workforce Suite',
    nextDesc:
      'Five live multi-role SaaS platforms for industrial attendance, dynamic shift scheduling, and double-entry payroll.',
  },
  'workforce-suite': {
    id: 'workforce-suite',
    titleSerif: 'Workforce',
    titleSans: 'Suite',
    fullTitle: 'Workforce Suite',
    categoryBadge: 'Case Study — Enterprise Systems',
    statusBadge: 'Production Deployed',
    statusBadgeClass: 'bg-[#74BE9C]/20 text-[#1B1A17] border border-[#74BE9C]/40',
    clientTag: 'Delivered to Enterprise Clients',
    clientName: 'Multi-Tenant Commercial',
    timeline: '16 Weeks',
    role: 'Cloud Architecture & Backend',
    leadArchitect: 'Mustafa Tariq',
    stackBadges: ['Node.js', 'TypeScript', 'React', 'MongoDB', 'Redis', 'RabbitMQ', 'Docker'],
    overviewEyebrow: 'Overview & Deployment Scope',
    overviewHeadline:
      'Five production multi-tenant platforms delivering dynamic shift scheduling, biometric attendance, and automated payroll.',
    plantLocation: 'Cloud Cluster / Global',
    conveyorSpeed: 'Sub-100ms API',
    opticalStream: 'Biometric Hardware API',
    throughput: '120,000+ punch events/mo',
    overviewBody1:
      'Comprising SSPlus, Reta TNA, Swift Attend, SwiftOne, and Vortex360, this suite unifies thousands of distributed employees under a low-latency microservice architecture.',
    overviewBody2:
      'Event-driven RabbitMQ queues and distributed Redis caches guarantee instant punch ingestion without worker thread bottlenecking during shift transitions.',
    feature1Title: 'High-Throughput Ingestion',
    feature1Desc: 'Zero-drop attendance pipeline under 10,000 concurrent peak biometric syncs.',
    feature2Title: 'Granular Shift Roster RBAC',
    feature2Desc: 'Dynamic schedule calculation engine handling complex rotating 24/7 rosters.',
    arch1Tag: 'Architecture 01: Event-Driven Punch Dispatch Engine',
    arch1Title: 'High-Velocity Attendance Processing & Biometric Sync',
    arch1LiveTag: 'Cluster: Worker-Group-01',
    arch1Fps: '99.98% Uptime',
    arch1StreamUrl: 'amqp://cluster-ingest.tna.internal',
    arch1CamName: 'TNA-GATEWAY-CORE',
    arch1ImgUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA6JuSnJ5ncwLHE79qaY6a6KfvkVu2zCiaQ0GfKVF3qMLOiiQbJw_lu9IYmk8Hk4hvIb0xi9RbBx6V5Iz7OEqN2YK16ANGlHvpETLB5BXcBtdwfgZHWezbpAVwMKmV5Wk1KPKfJjcnZ3cbZw6IklSlF-vyZzkNe_OzaQLePpXN0JDKIjAnSGY3P9QXzd-FgJdY6tgpC47ixiLz_lRmX_-MKg_hRgCW64iSJT82MJ4Ir7vpDjHcuHmuE',
    box1Label: 'SYNC-PASS',
    box1Confidence: '100%',
    box1Details: 'EmpID: #90214 · Shift: Alpha · Verified',
    box2Label: 'PAYROLL-QUEUED',
    box2Confidence: '100%',
    box2Details: 'Ledger: Oct-H2 · State: Reconciled',
    statBatch: '128,400',
    statFps: '99.9%',
    statVelocity: '12ms',
    statAnomaly: '0.00%',
    c1Title: 'Handling Concurrent Shift Transition Ingestion Peaks',
    c1Desc:
      'Tens of thousands of simultaneous device check-ins at shift changes were buffered with RabbitMQ exchange queues and Redis rate limiters to decouple edge devices from the primary database.',
    c2Title: 'Arbitrary Rotational Shift Scheduling Engine',
    c2Desc:
      'Engineered an expressive schedule calendar calculator that resolves overlapping breaks, night shifts, overtime rules, and weekend allowances in sub-5ms.',
    c3Title: 'Automated Dual-Entry Payroll & Tax Reconciliation',
    c3Desc:
      'Built a deterministic payroll compilation script generating encrypted payslips and exportable bank clearance sheets compliant with regional tax brackets.',
    arch2Tag: 'Architecture 02: Multi-Tenant Enterprise Console',
    arch2Title: 'Executive Payroll, Attendance & Departmental Roster',
    arch2Version: 'Release 3.1.2',
    arch2Shift: 'Global Active Sync',
    mod1Title: 'Active Monthly Workforce',
    mod1Main: '8,420 Staff',
    mod1Sub: 'Across 14 enterprise subsidiaries',
    mod1L1: 'Branch A (Manufacturing)',
    mod1L1Val: '4,210',
    mod1L2: 'Branch B (Logistics)',
    mod1L2Val: '2,900',
    mod1L3: 'Headquarters',
    mod1L3Val: '1,310',
    mod2Title: 'Shift Adherence Rate',
    mod2Main: '98.9%',
    mod2Sub: 'Biometrically audited',
    mod2L1: 'On-Time Checkins',
    mod2L1Val: '96.2%',
    mod2L2: 'Approved Leave',
    mod2L2Val: '2.7%',
    mod2L3: 'Unplanned Absence',
    mod2L3Val: '1.1%',
    mod3Title: 'Payroll Auto-Reconciliation',
    mod3Main: '100%',
    mod3Sub: 'Zero manual ledger recalculations',
    mod3L1: 'Base Pay Calculations',
    mod3L1Val: 'Instant',
    mod3L2: 'Overtime Differential',
    mod3L2Val: 'Auto-Audited',
    mod3L3: 'Direct Export',
    mod3L3Val: 'CSV / PDF',
    ledgerNoteTitle: 'Multi-Tenant Encrypted Isolation',
    ledgerNoteDesc:
      'Each customer organization operates on an isolated logical schema with role-based JWT claim verification.',
    m1Value: '99.98%',
    m1Label: 'System Availability',
    m1Desc: 'Continuous zero-downtime microservice operations across distributed hosting zones.',
    m2Value: '<20ms',
    m2Label: 'Query Response',
    m2Desc: 'Redis-backed cached queries delivering instantaneous roster reads under load.',
    m3Value: '5',
    m3Label: 'Commercial Platforms',
    m3Desc: 'Live enterprise SaaS solutions deployed simultaneously across production clients.',
    quoteText:
      '"Workforce Suite transformed our HR and payroll operations from a monthly 5-day spreadsheet nightmare into a 15-minute verification routine."',
    quoteAuthorInitial: 'HT',
    quoteAuthorRole: 'Director of Human Resources',
    quoteAuthorCompany: 'Apex Industrial Consortium',
    nextId: 'echoes-of-desolation',
    nextTitle: 'Echoes of Desolation',
    nextDesc:
      'Atmospheric 3D survival horror with procedural acoustic AI, boss fight state machines, and real-time Blender environmental pipeline.',
  },
  'echoes-of-desolation': {
    id: 'echoes-of-desolation',
    titleSerif: 'Echoes of',
    titleSans: 'Desolation',
    fullTitle: 'Echoes of Desolation',
    categoryBadge: 'Case Study — Game Development & 3D',
    statusBadge: 'Production Milestone',
    statusBadgeClass: 'bg-[#FF5B5B]/20 text-[#1B1A17] border border-[#FF5B5B]/40',
    clientTag: 'Engineered by Muhammad Tayyab (CTO)',
    clientName: 'Independent Studio Release',
    timeline: '24 Weeks',
    role: 'Lead Game Dev & 3D Designer',
    leadArchitect: 'Muhammad Tayyab (CTO)',
    stackBadges: [
      'Unity 6',
      'C#',
      'Blender',
      'Mixamo',
      'URP',
      'Cinemachine',
      'NavMesh AI',
      'Substance Painter',
      'Shader Graph',
    ],
    overviewEyebrow: 'Gameplay Architecture & Pipeline',
    overviewHeadline:
      'Immersive 3D horror mechanics engineered with custom Blender assets, NavMesh enemy AI, and visceral acoustic occlusion.',
    plantLocation: 'Peshawar Lab & Global Steam',
    conveyorSpeed: '60 FPS Lock on PC/Console',
    opticalStream: 'Unity URP High Dynamic Range',
    throughput: '4K Mesh Textures · Low-Draw-Call Asset Packs',
    overviewBody1:
      'Echoes of Desolation is a full 3D atmospheric horror production engineered by CTO Muhammad Tayyab. Built inside Unity and Blender from scratch, the title features complete procedural player movement, dynamic camera transitions with Cinemachine, and intricate boss encounters driven by multi-layered state machines.',
    overviewBody2:
      'Every environmental asset—from the claustrophobic asylum ward corridors to overgrown jungle biomes—was modeled, textured, and rigged in Blender with rigorous retopology for optimal draw call budgets. The spatial acoustic occlusion system calculates sound propagation paths in real time, alerting hostile enemy AI based on player noise velocity.',
    feature1Title: 'Procedural Enemy AI',
    feature1Desc:
      'Multi-state patrol, pursuit, and attack behaviors mapped via Unity NavMesh with dynamic sensory radius.',
    feature2Title: 'Bespoke 3D Pipeline',
    feature2Desc:
      '100% custom Blender modeling, PBR texturing, rigging, and animation retargeting via Mixamo.',
    arch1Tag: 'Architecture 01: Enemy AI Sensory & Boss Fight Engine',
    arch1Title: 'NavMesh Dynamic Threat Tracking & Boss State Machine',
    arch1LiveTag: 'Target: Asylum Interior 02',
    arch1Fps: '60.0 FPS',
    arch1StreamUrl: 'unity://runtime-debugger.asylum-level',
    arch1CamName: 'CINEMACHINE-DIRECTOR-01',
    arch1ImgUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDPs8ZBHxma3oXU95SQz2FXpuwGqeprh73xaliwfPN1_05cab3p4x9k1bnBuBD1kIrdkGu_G1KkuOzQTz6zjeKAFHxB3q88z19uB6t2XgmS_52v59o1yIVDEwU2giJg90YJ2R6a-4dgAjXVNDDmThubRcjHY6vZob2oKfuuO-aYXa_WOl-kQUC_nHhf5e_sTvW7u-14Qq2tdB7miQJXD4YXxfj64RFVzVTajpSvh3kQC_C5nJouppmZ',
    box1Label: 'AI-MUTATED-PATIENT',
    box1Confidence: 'State: PURSUIT',
    box1Details: 'LOS: True · Dist: 8.4m · Speed: 5.2 m/s',
    box2Label: 'TRIGGER-SECTOR',
    box2Confidence: 'Cutscene Primed',
    box2Details: 'Sector: #09 · Lighting: Volumetric Lux',
    statBatch: 'Phase 2',
    statFps: '60.0',
    statVelocity: '16.6ms',
    statAnomaly: '0 Bugs',
    c1Title: 'Optimizing Complex High-Poly Blender Geometry for Real-Time Shading',
    c1Desc:
      'High-fidelity architectural assets in Blender initially bloated draw calls. We instituted an automated retopology and texture baking pipeline using Substance Painter and Blender modifiers, baking high-poly displacement into compact normal maps and achieving 60 FPS lock across mid-tier graphics hardware.',
    c2Title: 'Deterministic Enemy AI State Transitions & Boss Phasing',
    c2Desc:
      'Boss battles required seamless phase handoffs without hitching gameplay scripts. We decoupled animation events from physics colliders using Unity Timeline and custom C# State Pattern architectures, guaranteeing reliable attack telegraphs and collision detection.',
    c3Title: 'Procedural Acoustic Occlusion & Dynamic Camera Cinematics',
    c3Desc:
      'To build authentic psychological dread, camera vectors dynamically blend from claustrophobic over-the-shoulder tracking to cinematic panoramic angles using Cinemachine triggers, synchronized with 3D spatialized audio cones.',
    arch2Tag: 'Architecture 02: 3D Art & Level Design Matrix',
    arch2Title: 'Asset Optimization, Rigging & Lighting Roster',
    arch2Version: 'Build 0.9.4',
    arch2Shift: 'Night Ward Environment',
    mod1Title: 'Polygon & Draw Call Budget',
    mod1Main: '<1.2M Tris',
    mod1Sub: 'Zero stutter during boss phase switches',
    mod1L1: 'Character Rigs (Blender)',
    mod1L1Val: '18,400 Tris',
    mod1L2: 'Environment Chunk (URP)',
    mod1L2Val: '420,000 Tris',
    mod1L3: 'Volumetric Lights',
    mod1L3Val: '12 Cached',
    mod2Title: 'AI Sensory Nodes Active',
    mod2Main: '24 Entities',
    mod2Sub: 'NavMesh spatial query <2ms',
    mod2L1: 'Pursuit State Entities',
    mod2L1Val: '4 active',
    mod2L2: 'Patrol Waypoints',
    mod2L2Val: '68 nodes',
    mod2L3: 'Boss Hitbox Colliders',
    mod2L3Val: 'Frame-Accurate',
    mod3Title: 'Custom 3D Asset Library',
    mod3Main: '180+ Models',
    mod3Sub: 'Modeled, textured & rigged by CTO',
    mod3L1: 'Asylum Architectural Props:',
    mod3L1Val: '112 items',
    mod3L2: 'Custom Weapon Meshes:',
    mod3L2Val: '14 items',
    mod3L3: 'Mixamo Rig Retargeting:',
    mod3L3Val: '100% Calibrated',
    ledgerNoteTitle: 'Independent Production Pipeline',
    ledgerNoteDesc:
      'Engineered from whitebox layout to Steam deployment packaging by Muhammad Tayyab and the Anamorphic game engineering team.',
    m1Value: '60 FPS',
    m1Label: 'Frame Stability',
    m1Desc: 'Sustained 60 FPS locked frame pacing on Unity Universal Render Pipeline (URP).',
    m2Value: '180+',
    m2Label: 'Custom 3D Assets',
    m2Desc: 'Proprietary architectural and character assets sculpted, textured, and rigged in Blender.',
    m3Value: '0ms',
    m3Label: 'Boss Phase Latency',
    m3Desc: 'Zero-drop transition latency on multi-phase boss fight state handoffs.',
    quoteText:
      '"By bridging Blender 3D modeling directly with Unity C# architecture, we eliminate the friction between art and gameplay code. Every polygon serves the mechanic."',
    quoteAuthorInitial: 'MT',
    quoteAuthorRole: 'Chief Technology Officer (CTO) & Head of 3D',
    quoteAuthorCompany: 'Anamorphic Studio',
    nextId: 'pipevision-ai',
    nextTitle: 'PipeVision AI',
    nextDesc:
      'Autonomous edge computer vision fused with mission-critical factory enterprise ERP for continuous pipe extrusion lines.',
  },
}

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>()
  const projectSlug = slug || 'pipevision-ai'

  const [dbGame, setDbGame] = useState<Game | null>(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    async function fetchFromDb() {
      try {
        const { data, error } = await supabase
          .from('games')
          .select('*')
          .eq('slug', projectSlug)
          .single()

        if (!error && data) {
          setDbGame(parseGameRecord(data))
        } else {
          setDbGame(null)
        }
      } catch (e) {
        console.warn('Could not fetch custom case study from DB', e)
        setDbGame(null)
      }
    }
    fetchFromDb()
  }, [projectSlug])

  // Get active case study data (fallback to default PipeVision AI template)
  const baseStudy = DEFAULT_CASE_STUDIES[projectSlug] || DEFAULT_CASE_STUDIES['pipevision-ai']

  // If DB record exists, override dynamic values
  const study: CaseStudyData = {
    ...baseStudy,
    fullTitle: dbGame?.title || baseStudy.fullTitle,
    titleSerif: dbGame?.title ? dbGame.title.split(' ')[0] : baseStudy.titleSerif,
    titleSans: dbGame?.title ? dbGame.title.split(' ').slice(1).join(' ') : baseStudy.titleSans,
    stackBadges: dbGame?.tags && dbGame.tags.length > 0 ? dbGame.tags : baseStudy.stackBadges,
    overviewBody1: dbGame?.description || baseStudy.overviewBody1,
    arch1ImgUrl: dbGame?.image_url
      ? dbGame.image_url
      : dbGame?.youtube_id
      ? dbGame.youtube_id.startsWith('http')
        ? dbGame.youtube_id
        : `https://img.youtube.com/vi/${dbGame.youtube_id}/maxresdefault.jpg`
      : baseStudy.arch1ImgUrl,
  }

  return (
    <div className="bg-background text-on-surface antialiased selection:bg-secondary selection:text-on-secondary min-h-screen flex flex-col justify-between overflow-x-hidden">
      {/* Top Editorial Header */}
      <Header />

      <main className="pt-28 md:pt-36 flex-grow">
        {/* 1. HERO SECTION */}
        <section className="px-margin md:px-margin-desktop pt-8 pb-space-xl">
          <div className="max-w-7xl mx-auto">
            {/* Eyebrow & Status Row */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant uppercase tracking-wider font-semibold">
                {study.categoryBadge}
              </span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium ${study.statusBadgeClass}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#74BE9C] mr-1.5 animate-pulse"></span>
                {study.statusBadge}
              </span>
            </div>

            {/* Giant Mixed Headline (Didone Serif + Grotesque Sans) */}
            <h1 className="mb-8">
              <span className="block md:inline font-display-serif-xxl-mobile md:font-display-serif-xxl text-display-serif-xxl-mobile md:text-display-serif-xxl italic text-on-surface tracking-tight">
                {study.titleSerif}
              </span>
              {study.titleSans && (
                <span className="block md:inline font-display-xxl-mobile md:font-display-xxl text-display-xxl-mobile md:text-display-xxl font-extrabold text-on-surface tracking-tighter ml-0 md:ml-3">
                  {study.titleSans}
                </span>
              )}
            </h1>

            {/* Delivery Tag Pill & Pill CTA */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container text-surface">
                <span className="material-symbols-outlined text-[18px]">verified</span>
                <span className="font-body-md text-label-eyebrow font-medium">{study.clientTag}</span>
              </div>
              <Link to="/contact" className="fused-pod group inline-flex items-center">
                <span className="bg-surface-container-high text-on-surface px-5 py-2 rounded-l-full font-label-eyebrow text-label-eyebrow font-semibold group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-150 border border-on-surface/10">
                  Discuss similar architecture
                </span>
                <span className="bg-surface-container-high text-on-surface w-9 h-9 rounded-r-full flex items-center justify-center -ml-px border-y border-r border-on-surface/10 group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-150">
                  <span className="material-symbols-outlined text-sm">north_east</span>
                </span>
              </Link>
            </div>

            {/* Meta Details Grid (Single-pixel structural division) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-on-surface/15 mb-8">
              <div>
                <span className="block font-label-eyebrow text-label-eyebrow text-on-surface-variant mb-1">
                  Client
                </span>
                <span className="font-body-md text-body-md font-bold text-on-surface">
                  {study.clientName}
                </span>
              </div>
              <div>
                <span className="block font-label-eyebrow text-label-eyebrow text-on-surface-variant mb-1">
                  Timeline
                </span>
                <span className="font-body-md text-body-md font-bold text-on-surface">
                  {study.timeline}
                </span>
              </div>
              <div>
                <span className="block font-label-eyebrow text-label-eyebrow text-on-surface-variant mb-1">
                  Role
                </span>
                <span className="font-body-md text-body-md font-bold text-on-surface">
                  {study.role}
                </span>
              </div>
              <div>
                <span className="block font-label-eyebrow text-label-eyebrow text-on-surface-variant mb-1">
                  Lead Architect
                </span>
                <span className="font-body-md text-body-md font-bold text-on-surface">
                  {study.leadArchitect}
                </span>
              </div>
            </div>

            {/* Tech Stack Badges Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant mr-2">
                Verified Stack:
              </span>
              {study.stackBadges.map((badge, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-label-eyebrow font-medium bg-surface-container border border-on-surface/10 text-on-surface"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 2. OVERVIEW SECTION (Asymmetric 5/7 Layout) */}
        <section className="px-margin md:px-margin-desktop py-space-xl border-t border-on-surface/15">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop">
            {/* Left Column: Specs card sticky */}
            <div className="md:col-span-5">
              <div className="md:sticky md:top-28 space-y-6">
                <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant uppercase tracking-wider block">
                  {study.overviewEyebrow}
                </span>
                <h2 className="font-headline-md md:font-headline-lg text-headline-md-mobile md:text-headline-lg tracking-tight text-on-surface">
                  {study.overviewHeadline}
                </h2>

                {/* Quick Specs Card */}
                <div className="p-6 rounded-2xl bg-surface-container border border-on-surface/15 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-on-surface/10">
                    <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">
                      Industrial Plant
                    </span>
                    <span className="font-body-md text-body-md font-bold text-on-surface">
                      {study.plantLocation}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-on-surface/10">
                    <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">
                      Conveyor Line Speed
                    </span>
                    <span className="font-body-md text-body-md font-bold text-on-surface">
                      {study.conveyorSpeed}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-on-surface/10">
                    <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">
                      Optical Stream
                    </span>
                    <span className="font-body-md text-body-md font-bold text-on-surface">
                      {study.opticalStream}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">
                      Daily Unit Throughput
                    </span>
                    <span className="font-body-md text-body-md font-bold text-on-surface">
                      {study.throughput}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Substantive Verified Copy */}
            <div className="md:col-span-7 space-y-8 text-on-surface pt-2">
              <div className="border-l-2 border-on-surface pl-6">
                <p className="font-body-lg text-body-lg leading-relaxed text-on-surface mb-6">
                  {study.overviewBody1}
                </p>
                <p className="font-body-lg text-body-lg leading-relaxed text-on-surface">
                  {study.overviewBody2}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                <div className="p-5 rounded-xl border border-on-surface/15 bg-surface-container-low">
                  <span className="material-symbols-outlined text-secondary mb-3">hub</span>
                  <h3 className="font-body-md text-body-md font-bold mb-1">{study.feature1Title}</h3>
                  <p className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">
                    {study.feature1Desc}
                  </p>
                </div>
                <div className="p-5 rounded-xl border border-on-surface/15 bg-surface-container-low">
                  <span className="material-symbols-outlined text-secondary mb-3">memory</span>
                  <h3 className="font-body-md text-body-md font-bold mb-1">{study.feature2Title}</h3>
                  <p className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">
                    {study.feature2Desc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. FULL-BLEED ARCHITECTURAL VISUAL (Mint Green #74BE9C Backdrop) */}
        <section className="px-margin md:px-margin-desktop py-space-md">
          <div className="max-w-7xl mx-auto w-full rounded-3xl bg-[#74BE9C] p-6 md:p-12 text-[#1B1A17] overflow-hidden border border-[#1B1A17]/20">
            {/* Header of the Visual Module */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-label-eyebrow font-semibold bg-[#1B1A17] text-[#F7F4EC] mb-2">
                  {study.arch1Tag}
                </span>
                <h3 className="font-headline-md text-headline-md tracking-tight font-extrabold text-[#1B1A17]">
                  {study.arch1Title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-label-eyebrow font-bold bg-white/70 text-[#1B1A17] border border-[#1B1A17]/10">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mr-2 animate-ping"></span>
                  {study.arch1LiveTag}
                </span>
                <span className="text-label-eyebrow font-mono font-bold bg-[#1B1A17]/10 px-3 py-1 rounded-full">
                  {study.arch1Fps}
                </span>
              </div>
            </div>

            {/* Interactive Real-Time Pipeline Canvas Mockup */}
            <div className="bg-[#1B1A17] rounded-2xl p-4 md:p-8 text-[#F7F4EC] shadow-none border border-[#1B1A17]">
              {/* Top HUD Control Bar */}
              <div className="flex flex-wrap items-center justify-between border-b border-[#F7F4EC]/15 pb-4 mb-6 text-label-eyebrow font-mono">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span> {study.arch1CamName}
                  </span>
                  <span className="hidden sm:inline text-surface-variant/60">RES: 1920x1080@60Hz</span>
                  <span className="hidden sm:inline text-surface-variant/60">EXPOSURE: 8.2ms</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-emerald-400 font-bold">STABLE INFERENCE</span>
                  <span className="bg-[#F7F4EC]/10 px-2 py-0.5 rounded text-[11px]">YOLOv8x-Custom</span>
                </div>
              </div>

              {/* Video Stream & Edge Detection Overlay */}
              <div className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden bg-black/60 border border-[#F7F4EC]/20 flex items-center justify-center">
                <img
                  className="w-full h-full object-cover opacity-60"
                  alt="Industrial Conveyor Inference"
                  src={study.arch1ImgUrl}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget
                    if (study.arch1ImgUrl) {
                      const fallback = getDriveFallbackUrl(study.arch1ImgUrl)
                      if (target.src !== fallback) {
                        target.src = fallback
                        return
                      }
                    }
                    target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80'
                  }}
                />
                {/* Real-time Bounding Box HUD Annotations */}
                <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-between pointer-events-none">
                  {/* Upper Tracking Line */}
                  <div className="flex justify-between items-start">
                    {/* Detection Box 1 */}
                    <div className="border-2 border-emerald-400 bg-emerald-400/10 p-2 rounded max-w-xs pointer-events-auto">
                      <div className="flex items-center justify-between text-[11px] font-mono text-emerald-300 font-bold gap-2">
                        <span>{study.box1Label}</span>
                        <span>{study.box1Confidence}</span>
                      </div>
                      <div className="text-[10px] font-mono text-[#F7F4EC]/80 mt-1">
                        {study.box1Details}
                      </div>
                    </div>
                    {/* Detection Box 2 */}
                    <div className="border-2 border-sky-400 bg-sky-400/10 p-2 rounded max-w-xs pointer-events-auto hidden sm:block">
                      <div className="flex items-center justify-between text-[11px] font-mono text-sky-300 font-bold gap-2">
                        <span>{study.box2Label}</span>
                        <span>{study.box2Confidence}</span>
                      </div>
                      <div className="text-[10px] font-mono text-[#F7F4EC]/80 mt-1">
                        {study.box2Details}
                      </div>
                    </div>
                  </div>

                  {/* Mid Crossing Detection Gate */}
                  <div className="w-full border-t border-dashed border-red-500/80 flex items-center justify-between px-2">
                    <span className="text-[10px] font-mono uppercase bg-red-600 text-white px-2 py-0.5 rounded tracking-widest">
                      Optical Gate Vector Alpha
                    </span>
                    <span className="text-[10px] font-mono text-red-400">
                      Debounce Buffer: 12ms
                    </span>
                  </div>

                  {/* Bottom HUD Stat Readout */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#1B1A17]/85 backdrop-blur-sm p-4 rounded-lg border border-[#F7F4EC]/15">
                    <div>
                      <span className="block text-[11px] text-[#F7F4EC]/60 uppercase font-mono">Current Batch</span>
                      <span className="text-xl md:text-2xl font-mono font-bold text-white">{study.statBatch}</span>
                    </div>
                    <div>
                      <span className="block text-[11px] text-[#F7F4EC]/60 uppercase font-mono">Pipeline FPS</span>
                      <span className="text-xl md:text-2xl font-mono font-bold text-emerald-400">{study.statFps}</span>
                    </div>
                    <div>
                      <span className="block text-[11px] text-[#F7F4EC]/60 uppercase font-mono">Velocity</span>
                      <span className="text-xl md:text-2xl font-mono font-bold text-white">{study.statVelocity}</span>
                    </div>
                    <div>
                      <span className="block text-[11px] text-[#F7F4EC]/60 uppercase font-mono">Defect Anomaly</span>
                      <span className="text-xl md:text-2xl font-mono font-bold text-emerald-300">{study.statAnomaly}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Telemetry Trace */}
              <div className="mt-4 pt-4 border-t border-[#F7F4EC]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-label-eyebrow text-[#F7F4EC]/70">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">sync_alt</span>
                  Continuous WebSocket sync: <code className="font-mono text-xs">{study.arch1StreamUrl}</code>
                </span>
                <span className="font-mono text-xs">Zero-Dropped-Frame Watchdog: ACTIVE</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CHALLENGES & SOLUTIONS (Numbered 01–03) */}
        <section className="px-margin md:px-margin-desktop py-space-xl">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant uppercase tracking-wider block mb-2">
                Engineering Rigor
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg tracking-tight text-on-surface font-extrabold">
                Challenges &amp; Technical Solutions
              </h2>
            </div>

            {/* Challenge 01 */}
            <div className="py-10 border-t border-on-surface/15 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
              <div className="md:col-span-2">
                <span className="font-metric-huge text-headline-lg text-on-surface/30 font-bold block">01</span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-headline-md text-headline-md-mobile md:text-headline-md text-on-surface leading-tight font-bold">
                  {study.c1Title}
                </h3>
              </div>
              <div className="md:col-span-6">
                <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
                  {study.c1Desc}
                </p>
              </div>
            </div>

            {/* Challenge 02 */}
            <div className="py-10 border-t border-on-surface/15 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
              <div className="md:col-span-2">
                <span className="font-metric-huge text-headline-lg text-on-surface/30 font-bold block">02</span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-headline-md text-headline-md-mobile md:text-headline-md text-on-surface leading-tight font-bold">
                  {study.c2Title}
                </h3>
              </div>
              <div className="md:col-span-6">
                <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
                  {study.c2Desc}
                </p>
              </div>
            </div>

            {/* Challenge 03 */}
            <div className="py-10 border-t border-b border-on-surface/15 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
              <div className="md:col-span-2">
                <span className="font-metric-huge text-headline-lg text-on-surface/30 font-bold block">03</span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-headline-md text-headline-md-mobile md:text-headline-md text-on-surface leading-tight font-bold">
                  {study.c3Title}
                </h3>
              </div>
              <div className="md:col-span-6">
                <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">
                  {study.c3Desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. SECOND FULL-BLEED VISUAL (Bubblegum Pink #F6A6CF Backdrop) */}
        <section className="px-margin md:px-margin-desktop py-space-md">
          <div className="max-w-7xl mx-auto w-full rounded-3xl bg-[#F6A6CF] p-6 md:p-12 text-[#1B1A17] overflow-hidden border border-[#1B1A17]/20">
            {/* Header of the Module */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <span className="inline-block px-3 py-1 rounded-full text-label-eyebrow font-semibold bg-[#1B1A17] text-[#F7F4EC] mb-2">
                  {study.arch2Tag}
                </span>
                <h3 className="font-headline-md text-headline-md tracking-tight font-extrabold text-[#1B1A17]">
                  {study.arch2Title}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-label-eyebrow font-mono font-bold bg-[#1B1A17] text-white">
                  {study.arch2Version}
                </span>
              </div>
            </div>

            {/* Dashboard UI Mockup Frame */}
            <div className="bg-surface rounded-2xl p-6 md:p-8 text-on-surface border border-[#1B1A17]/20">
              {/* Top App Bar Mockup */}
              <div className="flex items-center justify-between pb-6 border-b border-on-surface/10 mb-6">
                <div className="flex items-center gap-4">
                  <span className="font-metric-huge text-body-lg font-extrabold lowercase">a-one erp</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-surface-container font-mono text-on-surface-variant">
                    PLANT CONSOLE
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono bg-[#74BE9C]/30 text-[#1B1A17] px-2.5 py-1 rounded-full font-bold">
                    {study.arch2Shift}
                  </span>
                  <span className="text-xs font-mono text-on-surface-variant hidden sm:inline">14:32:09 PKT</span>
                </div>
              </div>

              {/* Bento Grid of Factory ERP Modules */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Module 1: Live Production & Line Balance */}
                <div className="p-5 rounded-xl bg-surface-container border border-on-surface/10 flex flex-col justify-between">
                  <div>
                    <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant block mb-1">
                      {study.mod1Title}
                    </span>
                    <span className="font-headline-md text-headline-md text-on-surface font-extrabold">
                      {study.mod1Main}
                    </span>
                    <p className="text-xs text-on-surface-variant mt-1">{study.mod1Sub}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-on-surface/10 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span>{study.mod1L1}</span>
                      <span className="font-bold">{study.mod1L1Val}</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span>{study.mod1L2}</span>
                      <span className="font-bold">{study.mod1L2Val}</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono">
                      <span>{study.mod1L3}</span>
                      <span className="font-bold">{study.mod1L3Val}</span>
                    </div>
                  </div>
                </div>

                {/* Module 2: Biometric Attendance & Floor Roster */}
                <div className="p-5 rounded-xl bg-surface-container border border-on-surface/10 flex flex-col justify-between">
                  <div>
                    <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant block mb-1">
                      {study.mod2Title}
                    </span>
                    <span className="font-headline-md text-headline-md text-on-surface font-extrabold">
                      {study.mod2Main}
                    </span>
                    <p className="text-xs text-emerald-700 font-bold mt-1">{study.mod2Sub}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-on-surface/10 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {study.mod2L1}
                      </span>
                      <span className="font-mono font-bold">{study.mod2L1Val}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> {study.mod2L2}
                      </span>
                      <span className="font-mono font-bold">{study.mod2L2Val}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> {study.mod2L3}
                      </span>
                      <span className="font-mono font-bold">{study.mod2L3Val}</span>
                    </div>
                  </div>
                </div>

                {/* Module 3: Operational Cashflow & Inventory Ledger */}
                <div className="p-5 rounded-xl bg-surface-container border border-on-surface/10 flex flex-col justify-between">
                  <div>
                    <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant block mb-1">
                      {study.mod3Title}
                    </span>
                    <span className="font-headline-md text-headline-md text-on-surface font-extrabold">
                      {study.mod3Main}
                    </span>
                    <p className="text-xs text-on-surface-variant mt-1">{study.mod3Sub}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-on-surface/10 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">{study.mod3L1}</span>
                      <span className="font-mono font-bold">{study.mod3L1Val}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">{study.mod3L2}</span>
                      <span className="font-mono font-bold">{study.mod3L2Val}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-on-surface-variant">{study.mod3L3}</span>
                      <span className="font-mono font-bold text-secondary">{study.mod3L3Val}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Ledger Integration Ribbon */}
              <div className="mt-6 p-4 rounded-xl bg-surface-container-high flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-on-surface/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary">account_balance_wallet</span>
                  <span className="font-body-md text-body-md font-bold">{study.ledgerNoteTitle}</span>
                </div>
                <p className="text-xs font-mono text-on-surface-variant">
                  {study.ledgerNoteDesc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. RESULTS & IMPACT BAND (Measurable Outcomes) */}
        <section className="px-margin md:px-margin-desktop py-space-xl border-t border-on-surface/15">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant uppercase tracking-wider block mb-2">
                Measurable Outcomes
              </span>
              <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg tracking-tight text-on-surface font-extrabold">
                Verified Performance Benchmarks
              </h2>
            </div>

            {/* Concrete Metrics Display */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop mb-16">
              {/* Metric 1 */}
              <div className="pb-8 border-b-2 border-on-surface">
                <span className="font-metric-huge text-metric-huge text-on-surface font-extrabold tracking-tighter block mb-2">
                  {study.m1Value}
                </span>
                <h4 className="font-headline-md text-body-lg font-bold text-on-surface mb-2">
                  {study.m1Label}
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {study.m1Desc}
                </p>
              </div>

              {/* Metric 2 */}
              <div className="pb-8 border-b-2 border-on-surface">
                <span className="font-metric-huge text-metric-huge text-on-surface font-extrabold tracking-tighter block mb-2">
                  {study.m2Value}
                </span>
                <h4 className="font-headline-md text-body-lg font-bold text-on-surface mb-2">
                  {study.m2Label}
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {study.m2Desc}
                </p>
              </div>

              {/* Metric 3 */}
              <div className="pb-8 border-b-2 border-on-surface">
                <span className="font-metric-huge text-metric-huge text-on-surface font-extrabold tracking-tighter block mb-2">
                  {study.m3Value}
                </span>
                <h4 className="font-headline-md text-body-lg font-bold text-on-surface mb-2">
                  {study.m3Label}
                </h4>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {study.m3Desc}
                </p>
              </div>
            </div>

            {/* Client Verification Quote */}
            <div className="p-8 md:p-12 rounded-2xl bg-surface-container border border-on-surface/15">
              <div className="max-w-4xl">
                <span className="material-symbols-outlined text-4xl text-on-surface/30 mb-4">format_quote</span>
                <p className="font-display-serif-xxl-mobile md:font-headline-serif-md text-headline-md-mobile md:text-headline-serif-md italic text-on-surface mb-6 leading-snug">
                  {study.quoteText}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-container text-surface flex items-center justify-center font-bold text-body-md">
                    {study.quoteAuthorInitial}
                  </div>
                  <div>
                    <span className="font-body-md text-body-md font-bold block text-on-surface">
                      {study.quoteAuthorRole}
                    </span>
                    <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">
                      {study.quoteAuthorCompany}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. NEXT PROJECT NAVIGATION (Oversized Editorial Transition) */}
        <section className="px-margin md:px-margin-desktop py-space-xl border-t border-on-surface/15">
          <div className="max-w-7xl mx-auto flex flex-col items-start justify-between">
            <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant uppercase tracking-wider block mb-4">
              Next Case Study
            </span>
            <Link
              to={`/work/${study.nextId}`}
              className="group flex flex-col md:flex-row md:items-center justify-between w-full py-4 text-left"
            >
              <div>
                <h2 className="font-display-xxl-mobile md:font-display-xxl text-display-xxl-mobile md:text-display-xxl font-extrabold text-on-surface tracking-tighter group-hover:text-secondary transition-colors duration-200">
                  {study.nextTitle}
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl">
                  {study.nextDesc}
                </p>
              </div>

              {/* Oversized Circular Fused Arrow Button */}
              <div className="mt-6 md:mt-0 w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary-container text-surface flex items-center justify-center group-hover:bg-secondary group-hover:text-on-secondary transition-all duration-200 self-start md:self-center shrink-0">
                <span className="material-symbols-outlined text-3xl md:text-4xl transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">
                  arrow_outward
                </span>
              </div>
            </Link>
          </div>
        </section>
      </main>

      {/* Shared Editorial Footer */}
      <Footer />
    </div>
  )
}

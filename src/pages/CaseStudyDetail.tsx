import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { supabase, parseGameRecord, normalizeImageUrl, getDriveFallbackUrl, type Game } from '../lib/supabaseClient'

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
  // Architecture 01
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
  // Architecture 02
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
  // Next Case Study
  nextId: string
  nextTitle: string
  nextDesc: string
}

export const DEFAULT_CASE_STUDIES: Record<string, CaseStudyData> = {
  'workforce-suite': {
    id: 'workforce-suite',
    titleSerif: 'Workforce',
    titleSans: 'Suite',
    fullTitle: 'Workforce Suite',
    categoryBadge: 'Case Study — Enterprise Systems',
    statusBadge: 'Production Deployed',
    statusBadgeClass: 'bg-[#74BE9C]/20 text-[#1B1A17] border border-[#74BE9C]/40',
    clientTag: 'Delivered to Enterprise Clients',
    clientName: 'Commercial Multi-Tenant',
    timeline: '16 Weeks',
    role: 'Cloud Architecture & Backend',
    leadArchitect: 'Shah Fahad',
    stackBadges: ['Node.js', 'TypeScript', 'React', 'MongoDB', 'Redis', 'RabbitMQ', 'Docker'],
    overviewEyebrow: 'Overview & Deployment Scope',
    overviewHeadline:
      'Five production multi-tenant platforms delivering dynamic shift scheduling, biometric attendance, and automated payroll.',
    plantLocation: 'Cloud Infrastructure / Distributed',
    conveyorSpeed: 'Sub-100ms API Response',
    opticalStream: 'Biometric Attendance Hardware API',
    throughput: '5 Live Commercial Platforms',
    overviewBody1:
      'Comprising SSPlus, Reta TNA, Swift Attend, SwiftOne, and Vortex360, this suite unifies thousands of distributed employees under a low-latency microservice architecture.',
    overviewBody2:
      'Event-driven RabbitMQ message queues and distributed Redis caches guarantee instant punch ingestion without worker thread bottlenecking during shift transitions. Ledgers calculate deductions, overtime, and bank-ready disbursements.',
    feature1Title: 'High-Throughput Ingestion',
    feature1Desc: 'Zero-drop attendance pipeline under heavy concurrent peak biometric synchronizations.',
    feature2Title: 'Granular Shift Roster RBAC',
    feature2Desc: 'Dynamic schedule calculation engine resolving complex rotating 24/7 rosters and overtime rules.',
    arch1Tag: 'Architecture 01: Event-Driven Punch Dispatch Engine',
    arch1Title: 'High-Velocity Attendance Processing & Biometric Sync',
    arch1LiveTag: 'Cluster: Worker-Group-01',
    arch1Fps: '99.98% Uptime',
    arch1StreamUrl: 'amqp://cluster-ingest.tna.internal',
    arch1CamName: 'TNA-GATEWAY-CORE',
    arch1ImgUrl: '',
    box1Label: 'SYNC-PASS',
    box1Confidence: '100%',
    box1Details: 'EmpID: #90214 · Shift: Alpha · Verified',
    box2Label: 'PAYROLL-QUEUED',
    box2Confidence: '100%',
    box2Details: 'Ledger: Current Period · State: Reconciled',
    statBatch: 'Active Sync',
    statFps: '99.98%',
    statVelocity: '12ms',
    statAnomaly: '0.00%',
    c1Title: 'Handling Concurrent Shift Transition Ingestion Peaks',
    c1Desc:
      'Simultaneous device check-ins at shift changes were buffered with RabbitMQ exchange queues and Redis rate limiters to decouple edge devices from the primary database.',
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
    mod1Main: 'Multi-Tenant',
    mod1Sub: 'Across active commercial deployments',
    mod1L1: 'Worker Group A',
    mod1L1Val: 'Synchronized',
    mod1L2: 'Worker Group B',
    mod1L2Val: 'Synchronized',
    mod1L3: 'HQ Personnel',
    mod1L3Val: 'Synchronized',
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
    nextId: 'pipevision-ai',
    nextTitle: 'PipeVision AI',
    nextDesc:
      'Autonomous edge computer vision fused with mission-critical factory enterprise ERP for continuous pipe extrusion lines.',
  },
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
    throughput: 'Continuous Extrusion Line',
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
    arch1ImgUrl: '',
    box1Label: 'PVC-Class-A',
    box1Confidence: '99.4%',
    box1Details: 'ID: #48102 · Speed: 2.1 m/s · Dia: 110mm',
    box2Label: 'PVC-Class-A',
    box2Confidence: '98.9%',
    box2Details: 'ID: #48103 · Tracked: In-Gate',
    statBatch: 'Live Line',
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
    mod1Title: 'Extrusion Output',
    mod1Main: 'Continuous',
    mod1Sub: 'Production line telemetry active',
    mod1L1: 'Line 01 (110mm)',
    mod1L1Val: 'Operating',
    mod1L2: 'Line 02 (75mm)',
    mod1L2Val: 'Operating',
    mod1L3: 'Line 03 (50mm)',
    mod1L3Val: 'Operating',
    mod2Title: 'Floor Presence (Biometric)',
    mod2Main: 'Active Shift',
    mod2Sub: 'Biometric Shift Attendance',
    mod2L1: 'Operators & Techs',
    mod2L1Val: 'Present',
    mod2L2: 'Raw Material Loading',
    mod2L2Val: 'Present',
    mod2L3: 'QC Inspectors',
    mod2L3Val: 'On Duty',
    mod3Title: 'Raw Inventory Ledger',
    mod3Main: 'Real-Time',
    mod3Sub: 'Reconciled against extrusion logs',
    mod3L1: 'Resin Feeders:',
    mod3L1Val: 'Calibrated',
    mod3L2: 'Stabilizer / Additives:',
    mod3L2Val: 'Calibrated',
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
    nextId: 'skyiq',
    nextTitle: 'SkyIQ',
    nextDesc:
      'Airport operations telemetry and flight data ingestion engine with emergency alerts and role hierarchies.',
  },
  'skyiq': {
    id: 'skyiq',
    titleSerif: 'Sky',
    titleSans: 'IQ',
    fullTitle: 'SkyIQ',
    categoryBadge: 'Case Study — Aviation Telemetry',
    statusBadge: 'Backend · Enterprise',
    statusBadgeClass: 'bg-surface-container-highest text-on-surface',
    clientTag: 'Delivered to Enterprise Aviation',
    clientName: 'Commercial Airport Operations',
    timeline: '12 Weeks',
    role: 'Backend & Systems Architect',
    leadArchitect: 'Shah Fahad',
    stackBadges: ['Node.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Docker', 'Prometheus'],
    overviewEyebrow: 'Overview & Deployment Scope',
    overviewHeadline:
      'Airport operations telemetry & flight data ingestion engine with sub-100ms emergency dispatch alerts and RBAC.',
    plantLocation: 'Regional Airport Hubs',
    conveyorSpeed: '<100ms Emergency Alerts',
    opticalStream: 'Aviation Telemetry Protocols',
    throughput: 'Real-Time Flight Ingestion',
    overviewBody1:
      'SkyIQ centralizes flight tracking, runway allocation, and baggage dispatch telemetry under high reliability requirements. Air traffic coordination demands strict schema enforcement and fail-safe alerting pipelines.',
    overviewBody2:
      'Built using TypeScript and PostgreSQL with Prisma ORM, the engine parses incoming telemetry feeds, applies granular role-based access control, and disseminates emergency notifications across airport operations personnel.',
    feature1Title: 'High-Throughput Telemetry Parser',
    feature1Desc: 'Handles parallel flight coordinate streams with automatic anomaly flagging.',
    feature2Title: 'Granular Airside RBAC',
    feature2Desc: 'Multi-tiered clearance levels restricting sensitive runway controls to certified dispatchers.',
    arch1Tag: 'Architecture 01: Telemetry Stream Pipeline',
    arch1Title: 'Real-Time Telemetry Stream Ingestion Engine',
    arch1LiveTag: 'Node: Ingestion Cluster A',
    arch1Fps: '99.99% Ingestion',
    arch1StreamUrl: 'tcp://telemetry.aviation.internal:9000',
    arch1CamName: 'FEED-RADAR-GATEWAY',
    arch1ImgUrl: '',
    box1Label: 'FLIGHT-INGEST',
    box1Confidence: 'Verified',
    box1Details: 'Alt: FL320 · Speed: 460kt · Squawk: 7000',
    box2Label: 'RUNWAY-ALLOC',
    box2Confidence: 'Assigned',
    box2Details: 'Runway: 28R · Terminal: Gate 4B',
    statBatch: 'Live Stream',
    statFps: '99.99%',
    statVelocity: '18ms',
    statAnomaly: '0 Errors',
    c1Title: 'Parsing Heterogeneous Aviation Telemetry Formats',
    c1Desc:
      'Engineered an adaptable ingestion parser that normalizes divergent radar data feeds into a unified typed PostgreSQL schema without packet drops.',
    c2Title: 'Sub-100ms Emergency Dispatch Broadcasting',
    c2Desc:
      'Implemented prioritized WebSocket push channels that guarantee critical dispatch notices circumvent standard operational message queues.',
    c3Title: 'Multi-Tenant Airport Authority Data Isolation',
    c3Desc:
      'Enforced row-level security and cryptographically signed session tokens ensuring multiple ground operators operate on strict zero-trust boundaries.',
    arch2Tag: 'Architecture 02: Operations Control Room Console',
    arch2Title: 'Real-Time Flight Schedule & Gate Management Roster',
    arch2Version: 'v2.1.0-Aero',
    arch2Shift: 'Tower Shift Alpha',
    mod1Title: 'Active Telemetry Feeds',
    mod1Main: 'Continuous',
    mod1Sub: 'Zero dropped telemetry packets',
    mod1L1: 'Radar Node Primary',
    mod1L1Val: 'Connected',
    mod1L2: 'Tower Radio Relay',
    mod1L2Val: 'Connected',
    mod1L3: 'Ground Ingress',
    mod1L3Val: 'Active',
    mod2Title: 'Dispatch Readiness',
    mod2Main: '100%',
    mod2Sub: 'Emergency channels armed',
    mod2L1: 'Fire / Rescue Comms',
    mod2L1Val: 'Armed',
    mod2L2: 'Ground Handling',
    mod2L2Val: 'Active',
    mod2L3: 'Baggage Dispatch',
    mod2L3Val: 'Synchronized',
    mod3Title: 'Audit & Compliance Log',
    mod3Main: 'Immutable',
    mod3Sub: 'Cryptographic ledger of all dispatch events',
    mod3L1: 'Runway Commands:',
    mod3L1Val: 'Logged',
    mod3L2: 'Airside Badge Access:',
    mod3L2Val: 'Logged',
    mod3L3: 'Alert Dispatches:',
    mod3L3Val: 'Signed',
    ledgerNoteTitle: 'Regulatory Aviation Compliance',
    ledgerNoteDesc:
      'All telemetry events are logged with microsecond timestamps compliant with civil aviation data retention mandates.',
    m1Value: '<100ms',
    m1Label: 'Alert Dispatch Latency',
    m1Desc: 'Emergency operational alerts delivered to airside staff within sub-100ms thresholds.',
    m2Value: '99.99%',
    m2Label: 'Telemetry Ingestion',
    m2Desc: 'Zero packet loss recorded across concurrent flight radar and ground handling streams.',
    m3Value: '100%',
    m3Label: 'RBAC Enforcement',
    m3Desc: 'Strict mathematical boundary checks on privileged airside control commands.',
    nextId: 'pos-suite',
    nextTitle: 'Accounting & POS Suite',
    nextDesc:
      'Enterprise retail ERP and point-of-sale system: multi-item checkout, vendor ledgers, and thermal ESC/POS.',
  },
  'pos-suite': {
    id: 'pos-suite',
    titleSerif: 'Accounting &',
    titleSans: 'POS Suite',
    fullTitle: 'Accounting & POS Suite',
    categoryBadge: 'Case Study — Retail Infrastructure',
    statusBadge: 'Live in 10+ shops',
    statusBadgeClass: 'bg-[#74BE9C] text-[#1B1A17]',
    clientTag: 'Retail Commerce Suite',
    clientName: 'Commercial Retail Chains',
    timeline: '18 Weeks',
    role: 'Full-Stack & Hardware Integration',
    leadArchitect: 'Muhammad Ali',
    stackBadges: ['React', 'Node.js', 'Express', 'MySQL', 'Tailwind CSS', 'ESC/POS'],
    overviewEyebrow: 'Overview & Deployment Scope',
    overviewHeadline:
      'Enterprise retail ERP and point-of-sale deployed across 10+ commercial shops with offline-first synchronization.',
    plantLocation: '10+ Commercial Retail Locations',
    conveyorSpeed: 'Sub-second Barcode Scan',
    opticalStream: 'Thermal ESC/POS Hardware Bus',
    throughput: 'Daily Active Checkout Counter',
    overviewBody1:
      'High-traffic retail environments require point-of-sale systems that never freeze during checkout rushes, even when internet connectivity drops. The Accounting & POS Suite combines front-of-house register workflows with deep back-office ledgers.',
    overviewBody2:
      'Featuring rapid multi-item barcode lookup, partial returns, multi-rate tax calculations, customer credit ledgers, and direct thermal ESC/POS receipt printing with cash drawer kicks.',
    feature1Title: 'Offline Resilience',
    feature1Desc: 'Registers cache transactions locally during internet cuts and seamlessly sync once reconnected.',
    feature2Title: 'Thermal ESC/POS Integration',
    feature2Desc: 'Direct hardware communication over USB and serial for instant receipt emission and drawer triggers.',
    arch1Tag: 'Architecture 01: Retail Counter Transaction Engine',
    arch1Title: 'High-Speed Checkout & Hardware Bus Controller',
    arch1LiveTag: 'Register: Counter 01',
    arch1Fps: 'Real-Time Sync',
    arch1StreamUrl: 'usb://escpos-thermal-printer-01',
    arch1CamName: 'POS-TERMINAL-CORE',
    arch1ImgUrl: '',
    box1Label: 'BARCODE-READ',
    box1Confidence: 'Item Found',
    box1Details: 'SKU: #881902 · Price: Live · Stock: In-Store',
    box2Label: 'DRAWER-STATUS',
    box2Confidence: 'Engaged',
    box2Details: 'ESC/POS: Cash Drawer Kick Signal Sent',
    statBatch: 'Daily Register',
    statFps: 'Instant',
    statVelocity: '0.2s',
    statAnomaly: '0 Glitches',
    c1Title: 'Zero-Downtime Counter Operations Under Network Partition',
    c1Desc:
      'Built local transactional persistence using IndexedDB in the register client, buffering checkout records and reconciling idempotently with MySQL upon reconnection.',
    c2Title: 'Thermal ESC/POS Driver Cross-Platform Compatibility',
    c2Desc:
      'Implemented raw byte-level ESC/POS formatting commands for diverse thermal printer brands, eliminating driver mismatches across different hardware setups.',
    c3Title: 'Multi-Item Partial Returns and Store Credit Balances',
    c3Desc:
      'Engineered an exact ledger tracking item depreciation, restocking fees, and customer store credit balances without double-entry discrepancies.',
    arch2Tag: 'Architecture 02: Back-Office Inventory & Vendor Ledger',
    arch2Title: 'Purchasing, Cash Reconciliation & Supplier Credit',
    arch2Version: 'v4.2.1-Retail',
    arch2Shift: 'Store Manager Console',
    mod1Title: 'Daily Store Volume',
    mod1Main: '10+ Shops',
    mod1Sub: 'Live across commercial locations',
    mod1L1: 'Counter A Checkouts',
    mod1L1Val: 'Active',
    mod1L2: 'Counter B Checkouts',
    mod1L2Val: 'Active',
    mod1L3: 'Thermal Printers',
    mod1L3Val: 'Online',
    mod2Title: 'Inventory Stock Accuracy',
    mod2Main: '100%',
    mod2Sub: 'Barcode scanned upon intake and sale',
    mod2L1: 'Low Stock Alerts',
    mod2L1Val: 'Monitored',
    mod2L2: 'Reorder Triggers',
    mod2L2Val: 'Automated',
    mod2L3: 'Batch Expiry',
    mod2L3Val: 'Tracked',
    mod3Title: 'Vendor Payable Ledger',
    mod3Main: 'Balanced',
    mod3Sub: 'Accounts payable synchronized with receipts',
    mod3L1: 'Purchase Invoices:',
    mod3L1Val: 'Reconciled',
    mod3L2: 'Supplier Credits:',
    mod3L2Val: 'Balanced',
    mod3L3: 'Closing Register Balance:',
    mod3L3Val: 'Audited',
    ledgerNoteTitle: 'Commercial Retail Accounting Integrity',
    ledgerNoteDesc:
      'Full double-entry general ledger prevents unrecorded cash shrinkage and ensures audit clarity.',
    m1Value: '10+',
    m1Label: 'Active Retail Shops',
    m1Desc: 'Commercial shop counters relying on the software for daily cash and digital transactions.',
    m2Value: '<0.5s',
    m2Label: 'Barcode Checkout Time',
    m2Desc: 'Rapid SKU resolution and instantaneous ESC/POS thermal receipt emission.',
    m3Value: '100%',
    m3Label: 'Offline Continuity',
    m3Desc: 'Zero checkout stalls during counter power fluctuations or ISP dropouts.',
    nextId: 'vads',
    nextTitle: 'VADS (Vehicle At Doorstep)',
    nextDesc:
      '4-role automotive inspection and test-drive scheduling platform with offline-first synchronization.',
  },
  'vads': {
    id: 'vads',
    titleSerif: 'VADS',
    titleSans: 'Mobile',
    fullTitle: 'VADS (Vehicle At Doorstep)',
    categoryBadge: 'Case Study — Automotive Tech',
    statusBadge: 'Delivered to client',
    statusBadgeClass: 'bg-surface-container-highest text-on-surface',
    clientTag: 'Automotive Inspection Suite',
    clientName: 'Doorstep Auto Services',
    timeline: '10 Weeks',
    role: 'Mobile Lead & API Integration',
    leadArchitect: 'Muhammad Ali',
    stackBadges: ['Flutter', 'Node.js', 'MySQL', 'Socket.io', 'Firebase'],
    overviewEyebrow: 'Overview & Deployment Scope',
    overviewHeadline:
      '4-role automotive inspection and test-drive scheduling platform with offline-first synchronization and real-time chat.',
    plantLocation: 'Regional Service Centers',
    conveyorSpeed: 'Real-Time Dispatch',
    opticalStream: 'Field Photo Upload Engine',
    throughput: 'Field Mechanics Active',
    overviewBody1:
      'VADS revolutionizes vehicle diagnostics and doorstep test drives by connecting vehicle owners, field inspection mechanics, dealership operators, and customer service teams under one coordinated system.',
    overviewBody2:
      'Built with Flutter for smooth cross-platform performance on iOS and Android, backed by Socket.io real-time chat, GPS routing, and offline inspection checklists designed for underground parking structures.',
    feature1Title: '4-Role Architecture',
    feature1Desc: 'Dedicated UX flows for customer, inspection tech, service center, and executive dashboard.',
    feature2Title: 'Offline Inspection Checklists',
    feature2Desc: '200+ point vehicle condition checks recorded offline and synchronized upon egress.',
    arch1Tag: 'Architecture 01: Dispatch & Live Coordination',
    arch1Title: 'Mechanic Dispatch & Real-Time Socket Pipe',
    arch1LiveTag: 'Node: Mobile Gateway',
    arch1Fps: '60 FPS UI',
    arch1StreamUrl: 'wss://dispatch.vads.internal/socket',
    arch1CamName: 'GPS-DISPATCH-ROUTER',
    arch1ImgUrl: '',
    box1Label: 'FIELD-INSPECT',
    box1Confidence: 'Active',
    box1Details: 'Tech: Unit 04 · Status: En Route · Vehicle: Sedan',
    box2Label: 'CHECKLIST-SYNC',
    box2Confidence: 'Ready',
    box2Details: 'Points: 184/200 Completed · Photos: 12 Uploaded',
    statBatch: 'Field Sync',
    statFps: '60 FPS',
    statVelocity: 'Real-Time',
    statAnomaly: '0 Dropped',
    c1Title: 'Reliable Field Inspection Under Zero Cellular Coverage',
    c1Desc:
      'Designed an offline-first SQLite synchronization engine that stores high-resolution vehicle damage photos and inspection metrics locally, syncing with AWS S3 and MySQL upon signal recovery.',
    c2Title: 'Real-Time Bi-Directional Mechanic Location Tracking',
    c2Desc:
      'Implemented battery-efficient background geolocation polling with dead reckoning algorithms to stream accurate technician arrival estimates to customers.',
    c3Title: 'Strict Role Separation Across Customer & Dealership Personas',
    c3Desc:
      'Built granular JWT claims enforcing strict separation between customer payment accounts, mechanic checklists, and dealership inventory manifests.',
    arch2Tag: 'Architecture 02: Dispatch & Service Console',
    arch2Title: 'Dealership Appointment Schedule & Inspection Records',
    arch2Version: 'v1.4.0-Mobile',
    arch2Shift: 'Field Dispatch Shift',
    mod1Title: 'Active Field Routes',
    mod1Main: 'Live Dispatch',
    mod1Sub: 'Technicians routed across operational zones',
    mod1L1: 'Zone North Mechanics',
    mod1L1Val: 'En Route',
    mod1L2: 'Zone South Mechanics',
    mod1L2Val: 'On Site',
    mod1L3: 'Customer Appointments',
    mod1L3Val: 'Confirmed',
    mod2Title: 'Inspection Completion Rate',
    mod2Main: '99.4%',
    mod2Sub: 'Comprehensive multi-point digital inspection',
    mod2L1: 'Engine & Transmission',
    mod2L1Val: 'Verified',
    mod2L2: 'Brakes & Suspension',
    mod2L2Val: 'Verified',
    mod2L3: 'Bodywork & Paint Depth',
    mod2L3Val: 'Logged',
    mod3Title: 'Customer Communication',
    mod3Main: 'Real-Time',
    mod3Sub: 'Socket.io in-app chat and ETA updates',
    mod3L1: 'Dispatch Messages:',
    mod3L1Val: 'Delivered',
    mod3L2: 'Estimate PDF Generation:',
    mod3L2Val: 'Instant',
    mod3L3: 'Customer Signature:',
    mod3L3Val: 'Captured',
    ledgerNoteTitle: 'Automotive Verification Standard',
    ledgerNoteDesc:
      'All inspection records are cryptographically timestamped and archived for insurance and resale validation.',
    m1Value: '200+',
    m1Label: 'Inspection Checklist Points',
    m1Desc: 'Standardized mechanical, structural, and electrical test points evaluated on-site.',
    m2Value: '60 FPS',
    m2Label: 'Fluid Mobile Performance',
    m2Desc: 'Zero-jank Flutter user experience across low-end Android and modern iOS devices.',
    m3Value: '100%',
    m3Label: 'Offline Check-in Durability',
    m3Desc: 'Zero inspection reports lost during basement garage network blackouts.',
    nextId: '3bs-marketplace',
    nextTitle: '3BS Marketplace',
    nextDesc:
      'Buy, barter, and bid marketplace featuring real-time negotiation chat, Escrow states, and role hierarchies.',
  },
  '3bs-marketplace': {
    id: '3bs-marketplace',
    titleSerif: '3BS',
    titleSans: 'Marketplace',
    fullTitle: '3BS Marketplace',
    categoryBadge: 'Case Study — Market Engine',
    statusBadge: 'Live web platform',
    statusBadgeClass: 'bg-[#74BE9C] text-[#1B1A17]',
    clientTag: 'Web Marketplace Engine',
    clientName: 'Commercial Platform',
    timeline: '14 Weeks',
    role: 'Full-Stack Architecture & Real-Time',
    leadArchitect: 'Shah Fahad',
    stackBadges: ['React', 'Next.js', 'WebSockets', 'Node.js', 'PostgreSQL'],
    overviewEyebrow: 'Overview & Deployment Scope',
    overviewHeadline:
      'Buy, barter, and bid marketplace featuring real-time buyer-seller negotiation chat, Escrow states, and role hierarchies.',
    plantLocation: 'Cloud Deployed / Multi-Region',
    conveyorSpeed: 'Sub-second Chat Delivery',
    opticalStream: 'WebSocket Negotiation Channels',
    throughput: 'Active Listings & Bids',
    overviewBody1:
      '3BS introduces a multi-mode commerce engine where users can buy items outright, propose item-for-item barters, or enter live bidding auctions. Combining three transaction models requires stateful transactional isolation.',
    overviewBody2:
      'Engineered with Next.js, Node.js, and PostgreSQL, the platform features integrated Escrow state machines, direct peer-to-peer real-time negotiation chat, and automated auction countdown reconciliations.',
    feature1Title: 'Tri-Mode Commerce Engine',
    feature1Desc: 'Seamless handling of cash purchase, item barter swaps, and live auction bids.',
    feature2Title: 'Real-Time Negotiation WebSockets',
    feature2Desc: 'Instant buyer-seller counter-offers, trade proposals, and notification events.',
    arch1Tag: 'Architecture 01: Auction & Escrow State Machine',
    arch1Title: 'Live Bidding Engine & Lock Contention Management',
    arch1LiveTag: 'Cluster: Trade-Node-01',
    arch1Fps: 'Sub-15ms Latency',
    arch1StreamUrl: 'wss://market.3bs.internal/trade-stream',
    arch1CamName: 'ESCROW-STATE-ENGINE',
    arch1ImgUrl: '',
    box1Label: 'LIVE-BID',
    box1Confidence: 'Verified',
    box1Details: 'Item: #9102 · Increment: +$50 · Buyer: #B291',
    box2Label: 'ESCROW-LOCK',
    box2Confidence: 'Engaged',
    box2Details: 'State: FUNDS_HELD · Barter Item: In Inspection',
    statBatch: 'Trade Pool',
    statFps: 'Instant',
    statVelocity: '14ms',
    statAnomaly: '0 Conflicts',
    c1Title: 'Preventing Race Conditions on Last-Second Auction Bids',
    c1Desc:
      'Implemented optimistic concurrency control with Redis atomic decrement locks to order simultaneous microsecond bids without auction corruption.',
    c2Title: 'Managing Complex Multi-Item Barter Swaps and Escrow',
    c2Desc:
      'Constructed a finite state machine covering offer, counter-offer, collateral escrow holding, delivery confirmation, and release.',
    c3Title: 'Sub-Second Real-Time Chat Across Active Trading Counterparties',
    c3Desc:
      'Decoupled conversational WebSockets into dedicated lightweight worker nodes to prevent messaging traffic from degrading core commerce database pools.',
    arch2Tag: 'Architecture 02: Marketplace Operations & Governance',
    arch2Title: 'Dispute Arbitration, Listing Audit & Transaction Ledger',
    arch2Version: 'v2.8.0-Market',
    arch2Shift: 'Arbitration Console',
    mod1Title: 'Market Activity',
    mod1Main: 'Tri-Mode',
    mod1Sub: 'Buy, barter, and bidding listings active',
    mod1L1: 'Active Auctions',
    mod1L1Val: 'Running',
    mod1L2: 'Barter Proposals',
    mod1L2Val: 'Pending Review',
    mod1L3: 'Direct Checkout',
    mod1L3Val: 'Instant',
    mod2Title: 'Escrow State Integrity',
    mod2Main: '100%',
    mod2Sub: 'Strict state transition validation',
    mod2L1: 'Funds Held State',
    mod2L1Val: 'Secure',
    mod2L2: 'Barter Item Verification',
    mod2L2Val: 'Monitored',
    mod2L3: 'Dispute Rate',
    mod2L3Val: '<0.5%',
    mod3Title: 'Platform Ledger',
    mod3Main: 'Balanced',
    mod3Sub: 'Zero balance discrepancy between held and released funds',
    mod3L1: 'Buyer Collateral:',
    mod3L1Val: 'Audited',
    mod3L2: 'Seller Payouts:',
    mod3L2Val: 'Automated',
    mod3L3: 'Platform Commission:',
    mod3L3Val: 'Calculated',
    ledgerNoteTitle: 'Escrow State Machine Security',
    ledgerNoteDesc:
      'Every barter swap and financial bid is executed under strict database isolation levels ensuring zero double-spends.',
    m1Value: '<15ms',
    m1Label: 'Bid Latency',
    m1Desc: 'Atomic bid processing ensuring sub-15ms resolution on final-second countdowns.',
    m2Value: '3',
    m2Label: 'Commerce Modes',
    m2Desc: 'Unified platform handling direct purchases, barter swaps, and live competitive bids.',
    m3Value: '100%',
    m3Label: 'Escrow Ledger Integrity',
    m3Desc: 'Zero fund or asset loss across complex multi-step delivery handoffs.',
    nextId: 'solarscape',
    nextTitle: 'SolarScape',
    nextDesc:
      'Solar potential and irradiance analysis engine computing geospatial coordinate metrics via microservices.',
  },
  'solarscape': {
    id: 'solarscape',
    titleSerif: 'Solar',
    titleSans: 'Scape',
    fullTitle: 'SolarScape',
    categoryBadge: 'Case Study — CleanTech GIS',
    statusBadge: 'Web platform · Microservices',
    statusBadgeClass: 'bg-surface-container-highest text-on-surface',
    clientTag: 'CleanTech GIS Engine',
    clientName: 'Renewable Energy Systems',
    timeline: '12 Weeks',
    role: 'Full-Stack & Microservices',
    leadArchitect: 'Shah Fahad',
    stackBadges: ['Go', 'Python', 'React', 'Docker', 'Leaflet GIS'],
    overviewEyebrow: 'Overview & Deployment Scope',
    overviewHeadline:
      'Solar potential and irradiance analysis engine computing geospatial coordinate metrics via microservices architecture.',
    plantLocation: 'Geospatial Compute Cluster',
    conveyorSpeed: 'Real-Time GIS Ingestion',
    opticalStream: 'Solar Irradiance Polygon Feed',
    throughput: 'Geospatial Query Calculations',
    overviewBody1:
      'SolarScape delivers precision solar potential assessments for rooftop solar and utility-scale installations. Calculating solar irradiance across complex geometries requires intensive numerical algorithms.',
    overviewBody2:
      'The architecture pairs Go microservices for high-throughput coordinate processing with Python analytical routines for sun-angle calculations, rendered interactively over Leaflet GIS map layers in React.',
    feature1Title: 'Geospatial Polygon Analysis',
    feature1Desc: 'Interactive roof outline drawing with instantaneous polygon surface area calculations.',
    feature2Title: 'Irradiance Simulation Engine',
    feature2Desc: 'Year-round sun trajectory modeling factoring seasonal shading angles and azimuth.',
    arch1Tag: 'Architecture 01: Geospatial Calculation Pipeline',
    arch1Title: 'High-Concurrency Coordinate Ingestion & Shading Vector Engine',
    arch1LiveTag: 'Node: Geo-Compute-02',
    arch1Fps: 'Sub-40ms Query',
    arch1StreamUrl: 'grpc://geo-service.solarscape.internal:50051',
    arch1CamName: 'GIS-COORDINATE-CORE',
    arch1ImgUrl: '',
    box1Label: 'ROOF-POLYGON',
    box1Confidence: 'Parsed',
    box1Details: 'Area: 420m² · Pitch: 28° · Azimuth: 184°',
    box2Label: 'IRRADIANCE-EST',
    box2Confidence: 'Simulated',
    box2Details: 'Yield: 1,480 kWh/kWp/yr · Shading: 4.2%',
    statBatch: 'Geo Query',
    statFps: 'High-Speed',
    statVelocity: '38ms',
    statAnomaly: '0 Geometric Errors',
    c1Title: 'High-Precision Vector Shading Computation at Scale',
    c1Desc:
      'Engineered an analytical raycasting algorithm in Go that calculates rooftop obstruction shadows across 365 daily sun vectors in under 50ms.',
    c2Title: 'Microservice Decoupling Between Geospatial Data & Client Maps',
    c2Desc:
      'Decoupled numerical computation into stateless Dockerized Go services behind gRPC, enabling horizontal scaling under concurrent user map interactions.',
    c3Title: 'Interactive GIS Canvas with Responsive GeoJSON Rendering',
    c3Desc:
      'Optimized Leaflet canvas rendering to draw complex multi-polygon solar arrays at 60 FPS without browser thread freezing.',
    arch2Tag: 'Architecture 02: Energy Production & ROI Projection Console',
    arch2Title: 'Financial Modeling, Grid Feed-In & CO2 Offset Ledger',
    arch2Version: 'v1.6.0-GIS',
    arch2Shift: 'Project Planner View',
    mod1Title: 'Solar Radiation Model',
    mod1Main: 'Microservice',
    mod1Sub: 'Go-backed coordinate calculation cluster',
    mod1L1: 'Sun Path Modeling',
    mod1L1Val: 'Calculated',
    mod1L2: 'Shading Loss Vector',
    mod1L2Val: 'Modeled',
    mod1L3: 'Optimal Tilt Angle',
    mod1L3Val: 'Identified',
    mod2Title: 'Energy Yield Accuracy',
    mod2Main: '97.8%',
    mod2Sub: 'Benchmarked against historical solar meteorological data',
    mod2L1: 'Annual Generation',
    mod2L1Val: 'Estimated',
    mod2L2: 'Grid Feed-In Offset',
    mod2L2Val: 'Simulated',
    mod2L3: 'Payback Timeline',
    mod2L3Val: 'Projected',
    mod3Title: 'Exportable Engineering Bill of Materials',
    mod3Main: 'Automated',
    mod3Sub: 'Panels, inverters, and racking calculated from geometry',
    mod3L1: 'Module Count:',
    mod3L1Val: 'Calculated',
    mod3L2: 'Inverter Capacity:',
    mod3L2Val: 'Sized',
    mod3L3: 'CAD Data Export:',
    mod3L3Val: 'Enabled',
    ledgerNoteTitle: 'Geospatial Algorithm Precision',
    ledgerNoteDesc:
      'Geodetic algorithms compute surface area accounting for planetary curvature and local topographic elevation.',
    m1Value: '<50ms',
    m1Label: 'Irradiance Calculation Time',
    m1Desc: 'Full 365-day hourly sun vector simulations rendered in sub-50ms via Go microservices.',
    m2Value: '97.8%',
    m2Label: 'Model Benchmark Accuracy',
    m2Desc: 'Validated against empirical meteorological irradiance sensor records.',
    m3Value: '100%',
    m3Label: 'Microservice Scalability',
    m3Desc: 'Stateless Docker containers scale dynamically under traffic surges.',
    nextId: 'tour-booking',
    nextTitle: 'Tour Booking System',
    nextDesc:
      'Server-rendered booking platform with JWT authentication, permissions, payment webhooks, and containerization.',
  },
  'tour-booking': {
    id: 'tour-booking',
    titleSerif: 'Tour Booking',
    titleSans: 'System',
    fullTitle: 'Tour Booking System',
    categoryBadge: 'Case Study — Reservation Architecture',
    statusBadge: 'Production web app',
    statusBadgeClass: 'bg-[#74BE9C] text-[#1B1A17]',
    clientTag: 'Commercial Reservation Engine',
    clientName: 'Travel & Hospitality Services',
    timeline: '10 Weeks',
    role: 'Backend & Full-Stack Lead',
    leadArchitect: 'Shah Fahad',
    stackBadges: ['Node.js', 'Express', 'MongoDB', 'Docker', 'Stripe'],
    overviewEyebrow: 'Overview & Deployment Scope',
    overviewHeadline:
      'Server-rendered booking platform with JWT authentication, granular user permissions, payment webhooks, and containerized deployment.',
    plantLocation: 'Cloud Infrastructure / Containerized',
    conveyorSpeed: 'Sub-second Checkout',
    opticalStream: 'Stripe Webhook Event Bus',
    throughput: 'Reservation Calendar Engine',
    overviewBody1:
      'Tour Booking System delivers an end-to-end reservation and ticketing platform handling tour operator schedules, slot capacity limits, and secure international credit card checkouts.',
    overviewBody2:
      'Engineered with Node.js, Express, MongoDB, and Docker, the platform uses transactional booking reservations to prevent double-booking of limited tour slots, reinforced with Stripe webhook verification.',
    feature1Title: 'Atomic Slot Reservation',
    feature1Desc: 'Temporary hold locks on tour seats during active checkout to eliminate overbooking.',
    feature2Title: 'Stripe Webhook Event Bus',
    feature2Desc: 'Idempotent webhook handlers guaranteeing ticket issuance only upon verified fund settlement.',
    arch1Tag: 'Architecture 01: Booking State Machine',
    arch1Title: 'Seat Capacity Locking & Payment Webhook Ingestion',
    arch1LiveTag: 'Node: Booking-Cluster-01',
    arch1Fps: '99.99% Reliability',
    arch1StreamUrl: 'https://api.booking.internal/v1/webhooks',
    arch1CamName: 'STRIPE-WEBHOOK-BUS',
    arch1ImgUrl: '',
    box1Label: 'SLOT-HOLD',
    box1Confidence: 'Locked',
    box1Details: 'Tour: #410 · Slot: 14:00 · Seats: 2 Locked',
    box2Label: 'PAYMENT-STATUS',
    box2Confidence: 'Settled',
    box2Details: 'Stripe: charge.succeeded · Ticket: Issued',
    statBatch: 'Reservations',
    statFps: 'Instant',
    statVelocity: '24ms',
    statAnomaly: '0 Double-Bookings',
    c1Title: 'Eliminating Race Conditions During Concurrent Seat Checkouts',
    c1Desc:
      'Designed MongoDB atomic conditional findAndModify transactions that decrement available slots with TTL locks, auto-releasing slots if checkout expires.',
    c2Title: 'Idempotent Stripe Webhook Handling',
    c2Desc:
      'Engineered idempotent event storage ensuring duplicate Stripe webhooks never issue multiple tickets or double-charge customers.',
    c3Title: 'Granular Role-Based Access Control for Tour Operators',
    c3Desc:
      'Constructed role hierarchies allowing tour guides to scan QR tickets on mobile without gaining access to financial revenue summaries.',
    arch2Tag: 'Architecture 02: Operator Dashboard & Revenue Reconciliation',
    arch2Title: 'Tour Rosters, Ticket Validation & Revenue Split Ledger',
    arch2Version: 'v2.1.0-Booking',
    arch2Shift: 'Operator Console',
    mod1Title: 'Active Tour Schedule',
    mod1Main: 'Automated',
    mod1Sub: 'Slot capacity dynamically managed',
    mod1L1: 'Morning Departure',
    mod1L1Val: 'Filled',
    mod1L2: 'Afternoon Departure',
    mod1L2Val: 'Open',
    mod1L3: 'Private Excursions',
    mod1L3Val: 'Scheduled',
    mod2Title: 'Seat Allocation Integrity',
    mod2Main: '100%',
    mod2Sub: 'Zero overbooking incidents recorded',
    mod2L1: 'Confirmed Tickets',
    mod2L1Val: 'Issued',
    mod2L2: 'Pending Payment Hold',
    mod2L2Val: 'TTL Active',
    mod2L3: 'Cancellations / Refunds',
    mod2L3Val: 'Automated',
    mod3Title: 'Financial Clearing',
    mod3Main: 'Reconciled',
    mod3Sub: 'Stripe payouts reconciled against booking tickets',
    mod3L1: 'Gross Bookings:',
    mod3L1Val: 'Reconciled',
    mod3L2: 'Gateway Fees:',
    mod3L2Val: 'Tracked',
    mod3L3: 'Operator Net Disbursement:',
    mod3L3Val: 'Balanced',
    ledgerNoteTitle: 'Transactional Booking Guarantee',
    ledgerNoteDesc:
      'All reservation state transitions are executed atomically with automatic TTL release locks.',
    m1Value: '0',
    m1Label: 'Overbooking Incidents',
    m1Desc: 'Atomic seat locking guarantees zero double-booked reservations during traffic spikes.',
    m2Value: '100%',
    m2Label: 'Webhook Idempotency',
    m2Desc: 'Cryptographically verified Stripe webhook handlers prevent duplicate ticket issuance.',
    m3Value: '99.99%',
    m3Label: 'Platform Availability',
    m3Desc: 'Dockerized microservice deployment ensuring continuous booking availability.',
    nextId: 'ignis',
    nextTitle: 'Ignis',
    nextDesc:
      'Containerized conversational AI system with persistent context thread storage, token optimization, and JWT session handling.',
  },
  'ignis': {
    id: 'ignis',
    titleSerif: 'Ignis',
    titleSans: 'LLM Infra',
    fullTitle: 'Ignis',
    categoryBadge: 'Case Study — Large Language Infrastructure',
    statusBadge: 'Open source · AI',
    statusBadgeClass: 'bg-secondary-fixed text-on-secondary-fixed',
    clientTag: 'Open Source System',
    clientName: 'Public Engineering Repository',
    timeline: '8 Weeks',
    role: 'AI Infrastructure & Backend',
    leadArchitect: 'Shah Fahad',
    stackBadges: ['TypeScript', 'Next.js', 'OpenAI API', 'MongoDB', 'Docker'],
    overviewEyebrow: 'Overview & Deployment Scope',
    overviewHeadline:
      'Containerized conversational AI system with persistent context thread storage, token optimization, and JWT session handling.',
    plantLocation: 'Open Source / Cloud Containerized',
    conveyorSpeed: 'Token Stream Optimization',
    opticalStream: 'SSE Streaming Pipeline',
    throughput: 'Conversational Inference Buffer',
    overviewBody1:
      'Ignis provides a robust infrastructure baseline for conversational LLM applications. Standard LLM wrappers suffer from memory leaks, runaway token budgets, and loss of conversational context across user sessions.',
    overviewBody2:
      'Engineered with TypeScript, Next.js, MongoDB, and Docker, Ignis implements intelligent conversation rolling-window pruning, Server-Sent Events (SSE) token streaming, and JWT authenticated session isolation.',
    feature1Title: 'Context Window Optimization',
    feature1Desc: 'Intelligent sliding-window compression algorithms reducing unnecessary token expenditure.',
    feature2Title: 'Server-Sent Events (SSE) Streaming',
    feature2Desc: 'Sub-50ms first-token latency through streaming HTTP response pipelines.',
    arch1Tag: 'Architecture 01: LLM Token Pipeline',
    arch1Title: 'Context Token Pruner & Streaming Response Gateway',
    arch1LiveTag: 'Node: Inference-Gateway',
    arch1Fps: 'SSE Stream Active',
    arch1StreamUrl: 'https://api.ignis.internal/v1/chat/completions',
    arch1CamName: 'TOKEN-DISPATCH-CORE',
    arch1ImgUrl: '',
    box1Label: 'TOKEN-STREAM',
    box1Confidence: 'Streaming',
    box1Details: 'TTFT: 48ms · Output: 62 tokens/sec · Model: GPT-4o',
    box2Label: 'CONTEXT-WINDOW',
    box2Confidence: 'Compressed',
    box2Details: 'History: 14 Turns · Token Count: 2,840 / 8,000',
    statBatch: 'Inference',
    statFps: 'Stream',
    statVelocity: '48ms TTFT',
    statAnomaly: '0 Buffer Drops',
    c1Title: 'Eliminating Memory Leaks During High-Volume SSE Streaming',
    c1Desc:
      'Implemented explicit backpressure-aware Node.js stream pipelining to safely release HTTP socket handles when users abort streaming queries.',
    c2Title: 'Intelligent Context Token Pruning Without Semantic Loss',
    c2Desc:
      'Developed a semantic summarize-and-truncate heuristic that maintains key conversational entities while pruning redundant assistant exchanges.',
    c3Title: 'Cryptographic User Session Thread Isolation',
    c3Desc:
      'Enforced row-level ownership checks across MongoDB conversation threads using cryptographically signed JWT session claims.',
    arch2Tag: 'Architecture 02: Prompt Engineering & Model Routing Console',
    arch2Title: 'Token Consumption, Latency Telemetry & Error Fallback Matrix',
    arch2Version: 'v1.2.0-OSS',
    arch2Shift: 'LLM Orchestrator',
    mod1Title: 'Context Pruner Output',
    mod1Main: 'Optimized',
    mod1Sub: 'Sliding token window actively manages prompt cost',
    mod1L1: 'System Prompt Context',
    mod1L1Val: 'Retained',
    mod1L2: 'Rolling Chat History',
    mod1L2Val: 'Pruned',
    mod1L3: 'Total Token Savings',
    mod1L3Val: 'Up to 40%',
    mod2Title: 'First-Token Latency',
    mod2Main: '<50ms',
    mod2Sub: 'Server-Sent Events stream pipeline',
    mod2L1: 'Connection Handshake',
    mod2L1Val: 'Immediate',
    mod2L2: 'First Token Emission',
    mod2L2Val: '<50ms',
    mod2L3: 'Stream Completion',
    mod2L3Val: 'Reliable',
    mod3Title: 'Session Persistence Ledger',
    mod3Main: 'Encrypted',
    mod3Sub: 'MongoDB collections indexed by user tenant ID',
    mod3L1: 'Thread Storage:',
    mod3L1Val: 'Encrypted',
    mod3L2: 'Token Quota Enforcement:',
    mod3L2Val: 'Active',
    mod3L3: 'Fallback Model Routing:',
    mod3L3Val: 'Configured',
    ledgerNoteTitle: 'Open Source Architectural Blueprint',
    ledgerNoteDesc:
      'Clean TypeScript codebase structured for rapid enterprise LLM prototyping and container deployment.',
    m1Value: '<50ms',
    m1Label: 'Time-to-First-Token',
    m1Desc: 'Server-Sent Events streaming delivers instantaneous visual responsiveness to users.',
    m2Value: '40%',
    m2Label: 'Token Cost Reduction',
    m2Desc: 'Sliding-window conversational pruning reduces redundant context token expenditure.',
    m3Value: '100%',
    m3Label: 'Thread Isolation',
    m3Desc: 'Tenant-isolated session boundaries guarantee zero cross-user conversation leakage.',
    nextId: 'media-api',
    nextTitle: 'Media Processing API',
    nextDesc:
      'High-throughput API for parallel image transformations and video metadata extraction offloaded to worker threads.',
  },
  'media-api': {
    id: 'media-api',
    titleSerif: 'Media',
    titleSans: 'Processing API',
    fullTitle: 'Media Processing API',
    categoryBadge: 'Case Study — High-Throughput Media',
    statusBadge: 'Open source · Backend',
    statusBadgeClass: 'bg-surface-container-highest text-on-surface',
    clientTag: 'Open Source Tooling',
    clientName: 'Public Engineering Library',
    timeline: '6 Weeks',
    role: 'Backend & Systems Engineer',
    leadArchitect: 'Shah Fahad',
    stackBadges: ['Node.js', 'TypeScript', 'Worker Threads', 'Sharp', 'FFmpeg'],
    overviewEyebrow: 'Overview & Deployment Scope',
    overviewHeadline:
      'High-throughput API for parallel image transformations and video metadata extraction offloaded to isolated worker threads.',
    plantLocation: 'High-Concurrency Compute Cluster',
    conveyorSpeed: 'Parallel Worker Threads',
    opticalStream: 'Image & Video Buffer Pipeline',
    throughput: 'Parallel Transformation Jobs',
    overviewBody1:
      'Heavy image transformations (WebP conversion, resize, color quantification) and video metadata parsing can choke the Node.js event loop, degrading general API throughput.',
    overviewBody2:
      'This API architecture isolates CPU-intensive Sharp and FFmpeg processing into dedicated Node.js Worker Thread pools, keeping the primary event loop completely unblocked and sustaining thousands of requests per second.',
    feature1Title: 'Worker Thread Offloading',
    feature1Desc: 'Heavy CPU graphics computation executed on isolated operating system threads.',
    feature2Title: 'Zero-Copy Buffer Streaming',
    feature2Desc: 'Direct binary buffer streaming minimizing intermediate disk I/O and RAM overhead.',
    arch1Tag: 'Architecture 01: Parallel Worker Thread Pool',
    arch1Title: 'Node.js Event Loop Isolator & Media Transcoder',
    arch1LiveTag: 'Node: Worker-Cluster-04',
    arch1Fps: 'Multi-Core Active',
    arch1StreamUrl: 'ipc://worker-thread-pool.internal',
    arch1CamName: 'THREAD-POOL-CONTROLLER',
    arch1ImgUrl: '',
    box1Label: 'SHARP-TRANSCODE',
    box1Confidence: 'Complete',
    box1Details: 'Source: 18MB PNG · Target: 1.2MB WebP · Time: 28ms',
    box2Label: 'FFMPEG-PROBE',
    box2Confidence: 'Extracted',
    box2Details: 'Codec: H.264 · Resolution: 4K · Duration: 04:12',
    statBatch: 'Thread Pool',
    statFps: 'Parallel',
    statVelocity: '28ms',
    statAnomaly: '0 Event Loop Lag',
    c1Title: 'Preventing Node.js Event Loop Starvation Under Heavy Image Encoding',
    c1Desc:
      'Constructed a dynamic Worker Thread pool with Piscina and libuv thread balancing that offloads all libvips (Sharp) transforms away from the main JS execution loop.',
    c2Title: 'Streaming Large Media Files Without Memory Exhaustion',
    c2Desc:
      'Implemented backpressure-governed stream pipes that transform incoming multipart uploads on the fly, keeping memory footprints strictly capped.',
    c3Title: 'Graceful Degradation Under Extreme Processing Queues',
    c3Desc:
      'Engineered an adaptive queue scheduler with priority buckets, prioritizing fast image crops over heavier multi-second video probe jobs.',
    arch2Tag: 'Architecture 02: Thread Health & Queue Telemetry',
    arch2Title: 'Worker Utilization, Memory Bounds & Job Throughput',
    arch2Version: 'v1.1.4-Media',
    arch2Shift: 'Thread Scheduler',
    mod1Title: 'Worker Thread Utilization',
    mod1Main: '8 Cores',
    mod1Sub: 'Parallelized across available CPU hardware',
    mod1L1: 'Worker Thread 1-4',
    mod1L1Val: 'Processing',
    mod1L2: 'Worker Thread 5-8',
    mod1L2Val: 'Standby / Ready',
    mod1L3: 'Event Loop Delay',
    mod1L3Val: '<2ms (Optimal)',
    mod2Title: 'Compression Efficiency',
    mod2Main: 'Up to 85%',
    mod2Sub: 'Lossless & perceptual WebP/AVIF compression',
    mod2L1: 'PNG to WebP Ratio',
    mod2L1Val: '78% avg',
    mod2L2: 'JPEG to AVIF Ratio',
    mod2L2Val: '84% avg',
    mod2L3: 'Color Profile Retention',
    mod2L3Val: '100% sRGB',
    mod3Title: 'System Resilience Ledger',
    mod3Main: 'Monitored',
    mod3Sub: 'Zero memory leaks across sustained 24-hour load tests',
    mod3L1: 'Heap Stability:',
    mod3L1Val: 'Flat',
    mod3L2: 'OOM Worker Restarts:',
    mod3L2Val: '0',
    mod3L3: 'Unhandled Rejections:',
    mod3L3Val: '0',
    ledgerNoteTitle: 'High-Throughput Concurrency Standard',
    ledgerNoteDesc:
      'Offloading native C++ libraries (libvips, FFmpeg) to isolated thread pools guarantees sustained HTTP response times.',
    m1Value: '<2ms',
    m1Label: 'Main Event Loop Delay',
    m1Desc: 'Zero event loop lag maintained even during concurrent multi-megabyte image processing.',
    m2Value: '28ms',
    m2Label: 'Average Transcode Speed',
    m2Desc: 'Ultra-fast WebP conversion and resizing offloaded directly to SIMD-optimized routines.',
    m3Value: '100%',
    m3Label: 'Memory Stability',
    m3Desc: 'Zero worker thread memory leaks under sustained synthetic batch tests.',
    nextId: 'shadow-of-honor',
    nextTitle: 'Shadow of Honor',
    nextDesc:
      'High-fidelity third-person combat vertical slice featuring fluid katana mechanics, enemy sensory AI, and custom HLSL shader passes.',
  },
  'shadow-of-honor': {
    id: 'shadow-of-honor',
    titleSerif: 'Shadow of',
    titleSans: 'Honor',
    fullTitle: 'Shadow of Honor',
    categoryBadge: 'Game Development · Prototype',
    statusBadge: 'Gameplay Vertical Slice',
    statusBadgeClass: 'bg-[#F6A6CF] text-[#1B1A17]',
    clientTag: 'Studio Original IP',
    clientName: 'Internal Production Slice',
    timeline: 'Q3 2026 - Active Prototype',
    role: 'Gameplay Engineering & 3D Shaders',
    leadArchitect: 'Mian Faseeh Ur Rehman & Muhammad Tayyab',
    stackBadges: ['Unity 6', 'C#', 'HLSL Shaders', 'Cinemachine', 'NavMesh AI', 'Blender 3D'],
    overviewEyebrow: 'Vertical Slice / Real-Time Prototype',
    overviewHeadline: 'Responsive melee combat state machine & dynamic horde AI in Unity 6.',
    plantLocation: 'Unity 6 Universal Render Pipeline (URP)',
    conveyorSpeed: '60 FPS Fixed',
    opticalStream: 'Custom HLSL Volumetrics',
    throughput: 'Sub-16.6ms Tick',
    overviewBody1:
      'Shadow of Honor is a dark fantasy third-person action vertical slice built in Unity 6. Designed around precise katana deflection windows, directional dodge offsets, and responsive melee combos.',
    overviewBody2:
      'Engineered with an entity-driven state machine architecture separating input queuing from animation playback, preventing input drops during intense combat scenarios while keeping draw calls strictly batched.',
    feature1Title: 'Deterministic Combat State Machine',
    feature1Desc: 'Input buffering, root motion blending, and strict hit-box priority matrices.',
    feature2Title: 'Adaptive Horde Sensory AI',
    feature2Desc: 'Surround-slot NavMesh pathfinding preventing clustering and guaranteeing fluid enemy pacing.',
    arch1Tag: 'Architecture 01: Unity 6 Combat Viewport',
    arch1Title: 'Katana Melee Controller & Dynamic Combat Arena',
    arch1LiveTag: 'Target: 60 FPS Fixed Tick',
    arch1Fps: '60.0 FPS',
    arch1StreamUrl: 'unity://shadow-of-honor/viewport-01',
    arch1CamName: 'CINEMACHINE-ORBIT-CAM',
    arch1ImgUrl: '/shadow-of-honor.jpg',
    box1Label: 'PLAYER-STATE',
    box1Confidence: 'KATANA_STANCE',
    box1Details: 'Combo: Stride Slash · Buffer: Active · Health: 100%',
    box2Label: 'ENEMY-HORDE',
    box2Confidence: 'FLANK_ENGAGED',
    box2Details: 'Aggro Radius: 12m · Slot Target: Flank Right · State: Chasing',
    statBatch: 'URP Batcher',
    statFps: '60 FPS',
    statVelocity: '16.6ms',
    statAnomaly: '0 Frame Drops',
    c1Title: 'Zero-Lag Melee Strike Detection with Motion Trail Raycasts',
    c1Desc:
      'Replaced standard box colliders with continuous procedural raycast sweeps along weapon edge vectors, eliminating missed hits during rapid frame-by-frame swings.',
    c2Title: 'Enforcing 60 FPS on Dense Horde Encounters',
    c2Desc:
      'Architected enemy spatial awareness using a centralized combat director that allocates attack tokens, avoiding chaotic AI stampeding and throttling background raycasts.',
    c3Title: 'Atmospheric Lighting & Custom HLSL Volumetric Fog',
    c3Desc:
      'Custom vertex and fragment shader passes crafted for dark ruins, torchlight scattering, and post-processed blood splatter without sacrificing performance.',
    arch2Tag: 'Architecture 02: Combat Engine Telemetry',
    arch2Title: 'Frame Timing, Input Buffer Latency & State Transitions',
    arch2Version: 'v0.9.2-Prototype',
    arch2Shift: 'Combat Tick',
    mod1Title: 'Simulation Tick Timing',
    mod1Main: '16.6ms',
    mod1Sub: 'Hard locked 60 FPS fixed physics update loop',
    mod1L1: 'Draw Call Count:',
    mod1L1Val: '<120 Calls',
    mod1L2: 'Input Buffer Window:',
    mod1L2Val: '150ms Queue',
    mod1L3: 'Garbage Collection Alloc:',
    mod1L3Val: '0B / frame',
    mod2Title: 'Animation Blend Fidelity',
    mod2Main: 'Root Motion',
    mod2Sub: 'Physics-synchronized locomotion and hit reactions',
    mod2L1: 'Locomotion Inertia:',
    mod2L1Val: '0.12s Dampen',
    mod2L2: 'Hit Stop Freeze:',
    mod2L2Val: '3 Frames',
    mod2L3: 'Cinemachine Damping:',
    mod2L3Val: 'Dual Target',
    mod3Title: 'AI Coordinator Matrix',
    mod3Main: 'Token System',
    mod3Sub: 'Coordinated enemy attacks preventing cheap swarm deaths',
    mod3L1: 'Active Melee Attackers:',
    mod3L1Val: 'Max 2 Concurrent',
    mod3L2: 'Circling Stalker Slots:',
    mod3L2Val: '6 Dynamic Points',
    mod3L3: 'NavMesh Computation:',
    mod3L3Val: '<0.8ms / tick',
    ledgerNoteTitle: 'Game Engine Engineering Standard',
    ledgerNoteDesc:
      'Combining data-oriented component design with strict memory allocation discipline produces console-grade combat fluidity.',
    m1Value: '60 FPS',
    m1Label: 'Frame Target Locked',
    m1Desc: 'Consistent sub-16.6ms render timing through SRP batching and LOD optimization.',
    m2Value: '0B',
    m2Label: 'GC Allocation / Frame',
    m2Desc: 'Zero managed memory allocations during combat loops to eliminate garbage collection stutter.',
    m3Value: '150ms',
    m3Label: 'Input Buffer Window',
    m3Desc: 'Silky smooth combat queuing guaranteeing every combo input lands without friction.',
    nextId: 'workforce-suite',
    nextTitle: 'Workforce Suite',
    nextDesc:
      'Five live multi-role SaaS platforms for industrial attendance, dynamic shift scheduling, and double-entry payroll.',
  },
}

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>()
  const projectSlug = slug || 'workforce-suite'

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

  // Get active case study data (fallback to workforce-suite template)
  const baseStudy = DEFAULT_CASE_STUDIES[projectSlug] || DEFAULT_CASE_STUDIES['workforce-suite']

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

  const isVisionStudy = projectSlug === 'pipevision-ai'

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
                <span className="w-1.5 h-1.5 rounded-full bg-[#74BE9C] mr-1.5"></span>
                {study.statusBadge}
              </span>
            </div>

            {/* Giant Mixed Headline (Didone Serif + Grotesque Sans with explicit spacing) */}
            <h1 className="mb-8 flex flex-wrap items-baseline gap-x-4">
              <span className="font-display-serif-xxl-mobile md:font-display-serif-xxl text-display-serif-xxl-mobile md:text-display-serif-xxl italic text-on-surface tracking-tight">
                {study.titleSerif}
              </span>
              {study.titleSans && (
                <span className="font-display-xxl-mobile md:font-display-xxl text-display-xxl-mobile md:text-display-xxl font-extrabold text-on-surface tracking-tighter">
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

            {/* Meta Details Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-on-surface/15 mb-8">
              <div>
                <span className="block font-label-eyebrow text-label-eyebrow text-on-surface-variant mb-1">
                  Client / Context
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
                      Deployment Target
                    </span>
                    <span className="font-body-md text-body-md font-bold text-on-surface">
                      {study.plantLocation}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-on-surface/10">
                    <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">
                      Operating Performance
                    </span>
                    <span className="font-body-md text-body-md font-bold text-on-surface">
                      {study.conveyorSpeed}
                    </span>
                  </div>
                  <div className="flex items-center justify-between pb-3 border-b border-on-surface/10">
                    <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">
                      Primary Pipeline
                    </span>
                    <span className="font-body-md text-body-md font-bold text-on-surface">
                      {study.opticalStream}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-label-eyebrow text-label-eyebrow text-on-surface-variant">
                      Operational Metric
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
                  <span className="w-2 h-2 rounded-full bg-emerald-600 mr-2"></span>
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
                  <span className="hidden sm:inline text-surface-variant/60">STATUS: AUDITED</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-emerald-400 font-bold">STABLE INFERENCE</span>
                  <span className="bg-[#F7F4EC]/10 px-2 py-0.5 rounded text-[11px] font-mono">
                    {isVisionStudy ? 'YOLOv8x-Custom' : 'Core-Runtime'}
                  </span>
                </div>
              </div>

              {/* Stream / Telemetry Overlay */}
              <div className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden bg-black/60 border border-[#F7F4EC]/20 flex items-center justify-center">
                {study.arch1ImgUrl ? (
                  <img
                    className="w-full h-full object-cover opacity-60"
                    alt="System Telemetry"
                    src={normalizeImageUrl(study.arch1ImgUrl)}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget
                      if (study.arch1ImgUrl) {
                        const fallback = getDriveFallbackUrl(study.arch1ImgUrl)
                        if (target.src !== fallback && fallback !== target.src) {
                          target.src = fallback
                        }
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#121210] to-[#1c1c17] p-8 text-center">
                    <span className="material-symbols-outlined text-4xl text-[#74BE9C]/40 mb-3">terminal</span>
                    <span className="font-mono text-sm text-[#F7F4EC]/80 font-bold">{study.fullTitle}</span>
                    <span className="font-mono text-xs text-[#F7F4EC]/50 mt-1">{study.arch1Title}</span>
                  </div>
                )}

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

                  {/* Mid Crossing Gate */}
                  <div className="w-full border-t border-dashed border-secondary/60 flex items-center justify-between px-2">
                    <span className="text-[10px] font-mono uppercase bg-secondary text-white px-2 py-0.5 rounded tracking-widest">
                      {isVisionStudy ? 'Optical Gate Vector Alpha' : 'Runtime Transaction Gate'}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">
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
                      <span className="block text-[11px] text-[#F7F4EC]/60 uppercase font-mono">Latency / Velocity</span>
                      <span className="text-xl md:text-2xl font-mono font-bold text-white">{study.statVelocity}</span>
                    </div>
                    <div>
                      <span className="block text-[11px] text-[#F7F4EC]/60 uppercase font-mono">Defect / Anomaly</span>
                      <span className="text-xl md:text-2xl font-mono font-bold text-emerald-300">{study.statAnomaly}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Telemetry Trace */}
              <div className="mt-4 pt-4 border-t border-[#F7F4EC]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-label-eyebrow text-[#F7F4EC]/70">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px]">sync_alt</span>
                  Continuous sync: <code className="font-mono text-xs">{study.arch1StreamUrl}</code>
                </span>
                <span className="font-mono text-xs">Watchdog: ACTIVE</span>
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
                  <span className="font-metric-huge text-body-lg font-extrabold lowercase">
                    {study.fullTitle.toLowerCase()}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-surface-container font-mono text-on-surface-variant">
                    PRODUCTION CONSOLE
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono bg-[#74BE9C]/30 text-[#1B1A17] px-2.5 py-1 rounded-full font-bold">
                    {study.arch2Shift}
                  </span>
                </div>
              </div>

              {/* Bento Grid of Modules */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Module 1 */}
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

                {/* Module 2 */}
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

                {/* Module 3 */}
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop mb-8">
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

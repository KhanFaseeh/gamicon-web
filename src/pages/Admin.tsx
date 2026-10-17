import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  supabase,
  parseGameRecord,
  serializeGameRecord,
  normalizeImageUrl,
  getDriveFallbackUrl,
  type Game,
} from '../lib/supabaseClient'
import AdminLogin from './AdminLogin'

interface Inquiry {
  id: string
  name: string
  company: string
  email: string
  projectType: string
  budget?: string
  message: string
  timeAgo: string
  status: 'unread' | 'read' | 'replied'
}

const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-1',
    name: 'Tariq Mehmood',
    company: 'Apex Logistics',
    email: 'tariq@apexlogistics.pk',
    projectType: 'Web Platform / SaaS',
    budget: '$25k - $50k',
    message:
      'Looking to build an automated container tracking & warehouse dispatch dashboard with real-time driver telemetry over WebSockets. Needs to integrate with existing legacy ERP databases.',
    timeAgo: '24m ago',
    status: 'unread',
  },
  {
    id: 'inq-2',
    name: 'Elena Rostova',
    company: 'Krona Sim',
    email: 'elena@kronasim.io',
    projectType: 'Game Development',
    budget: '$40k - $80k',
    message:
      'Need HLSL shader optimization, custom vehicle physics collision pipeline, and deterministic network rollback code for our high-fidelity Unity simulator title on Steam.',
    timeAgo: '2h ago',
    status: 'unread',
  },
  {
    id: 'inq-3',
    name: 'Dr. Zafar Qasim',
    company: 'BioScan Labs',
    email: 'zqasim@bioscanlabs.com',
    projectType: 'AI / CV / Edge',
    budget: '$30k+',
    message:
      'Inquiring about deploying an on-premise YOLOv8 microservice on Jetson Orin modules for automated pathology slide tallying and live optical microscope inspections.',
    timeAgo: '5h ago',
    status: 'unread',
  },
  {
    id: 'inq-4',
    name: 'Kieran Scott',
    company: 'VentureForge',
    email: 'kieran@ventureforge.vc',
    projectType: 'Mobile App',
    budget: '$20k',
    message:
      'Follow-up regarding the cross-platform Flutter inspection app milestone review and escrow release. The offline-first SQLite sync is performing under 12ms latency.',
    timeAgo: 'Yesterday',
    status: 'read',
  },
]

interface AdminTeamMember {
  id: string
  name: string
  role: string
  focus: string
  bio: string
  chips: string[]
  imageUrl: string
  linkedInUrl: string
  order: number
}

const INITIAL_TEAM: AdminTeamMember[] = [
  {
    id: 'member-1',
    name: 'Mian Faseeh Ur Rehman',
    role: 'CEO & Project Manager / Head of Games',
    focus: 'Delivery · Unity · C# Architecture · Release Ops',
    bio: 'Runs delivery end to end — technical scoping, architecture roadmaps, sprint execution, and shipping. Leads the Unity game practice and release lifecycle pipelines.',
    chips: ['Unity 3D', 'C#', 'HLSL Shaders', 'Sprint Scoping', 'Production CI/CD', 'Photon'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuASG0W42bY_gsxnnA3_k_vOaJMpMRkTnbhDtAgNMyxuQh16_1SD5oG3DFLMGGzfYquZBn77mMCbkLen4TsI-pHohdFb38m5tF-7OWAE2qAoDthPJcgjyj0eIM2PMtk2BXV6FlNUGfQLNNPMxqjg8A_bXAV6gbJzTxM2Z-SkBtj5gP47gG43tw_VKASueCNPcm97vUdgvjdpCM4rMbTrlN_TNQIR__WfpWZU5mFbqoDAcxiDXbsp3lPx',
    linkedInUrl: 'https://linkedin.com',
    order: 1,
  },
  {
    id: 'member-2',
    name: 'Muhammad Tayyab',
    role: 'Chief Technology Officer (CTO) & Head of 3D',
    focus: 'Unity 6 · Blender 3D · Enemy AI · Gameplay Systems · Rigging',
    bio: 'Leads technical architecture, Blender 3D modeling, rigging, enemy AI, and gameplay physics across Unity 6 and independent productions.',
    chips: ['Unity 6', 'Blender', 'NavMesh AI', 'Cinemachine', 'Mixamo', 'URP'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuABKgk5aoLbkEjSO4kD0UHMS75Ss76wIMD7K923R0hYc269aXlE_Bqzb7EKyzDeSclq51KJF4dLIyapTX9NsLgB3r8kpK1wL4zZ9GcIRKdX4HpL2Rwcc0RMBBRjaDZ0lE2DEe_HVueLs-Py6rSnfJvvIx-Y0-AUvhSSxpoEwB1h1tjEnnKDHipkyFWvB1PgrIXzK7f1HRk30QBJl0TEJuvuP47F0uk7cV-ZkG9Uj66IpV-c5h872fN6',
    linkedInUrl: 'https://linkedin.com/in/m-tayyabmalik',
    order: 2,
  },
  {
    id: 'member-3',
    name: 'Shah Fahad',
    role: 'Lead Backend Engineer / Systems Architect',
    focus: 'Node.js · Go · PostgreSQL · Redis · RabbitMQ · Docker',
    bio: 'Architects distributed services and real-time data pipelines. Supervises uptime, security, and scalability across our five live production SaaS platforms.',
    chips: ['Node.js', 'Go', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBx9TIs49Kb0IvpeF6uqLG73w7-n3R5Uqw3nzs6BxQInrfhx6T_BtKGXxz78hVI5ZWZ4YDLnJ4p2wC9oqX0FBuwhvgt52v32biMQBi0-mdFC1nh0_gVaQoAn2ViocNtTIIJK8r49S5sfZkV8CCwrp3owd-S15dwbxR_yLIQMcYUmqSYynQ4dBI1gT7cWmWeGZafRMqDb9McK_Cnjt1NTNwjIcLHWtbVhDZd4odK9bwp8tithHTfNEG4',
    linkedInUrl: 'https://linkedin.com',
    order: 3,
  },
  {
    id: 'member-4',
    name: 'Muhammad Ali',
    role: 'Mobile & Full-Stack Engineer / Vision Systems',
    focus: 'Flutter / Dart · React · Python · YOLOv8 · Mobile Edge AI',
    bio: 'Specializes in cross-platform mobile systems and edge computer vision. Developed the YOLOv8 factory counting pipeline and multi-platform architectures.',
    chips: ['Flutter', 'React', 'Python', 'YOLOv8', 'FastAPI', 'WebSockets'],
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB5xYc-mLL9-A1w9lvObOPRrOspFo1dTyE4AcB3z8VOddNPohXGrlDbrMP64JzQbrKAI6ScMntkHcYr2AQguwjnHsZJ31SdPCuToXZKm-3utNnUPfvSaX7T6emLW9dYVkY2ZeK6x30QCO61A9yuKhR6l4-JjWo5FTWv8Bbefk__eTX9GfhVN5sPyF1jU1OBd1JZlMgD62ajZnd1Z0f64xl2ydNZsRg50AEb5TpOIlz_WlwRa64pD98C',
    linkedInUrl: 'https://linkedin.com',
    order: 4,
  },
]

interface ServiceBlock {
  id: string
  title: string
  description: string
  bullets: string[]
  chips: string[]
  accentColor: string
}

const INITIAL_SERVICES: ServiceBlock[] = [
  {
    id: 'srv-1',
    title: 'Game Development',
    description:
      'Unity 2D and 3D titles engineered for mobile and PC. We handle technical gameplay programming, physics optimizations, custom UI pipelines, and continuous deployment through Steam and mobile app stores.',
    bullets: [
      'Deterministic character & vehicle controllers',
      'Custom HLSL shaders & post-processing pipelines',
      'Mixamo & Blender procedural rigging',
      'Photon real-time multiplayer networking',
    ],
    chips: ['Unity 6', 'C#', 'HLSL', 'Photon', 'Steamworks'],
    accentColor: '#FF5B5B',
  },
  {
    id: 'srv-2',
    title: 'Web Platforms & SaaS',
    description:
      'Production SaaS platforms and resilient enterprise portals. Modern React and Next.js frontends powered by distributed Node.js and Go microservices, strict PostgreSQL schemas, Redis caching, and RabbitMQ message queues.',
    bullets: [
      'Multi-tenant schemas with RBAC security',
      'Sub-50ms Redis caching & session management',
      'RabbitMQ background event workers',
      'Transactional double-entry billing ledgers',
    ],
    chips: ['Next.js', 'Go', 'Node.js', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Docker'],
    accentColor: '#74BE9C',
  },
  {
    id: 'srv-3',
    title: 'Mobile Apps & Interfaces',
    description:
      'Fluid, high-performance applications built with Flutter and native integrations. Offline-first data caching with SQLite/Isar, background Bluetooth device synchronization, and edge YOLOv8 computer vision pipelines.',
    bullets: [
      'Single-codebase Flutter engine across iOS & Android',
      'Offline-first synchronization with conflict resolution',
      'On-premise YOLOv8 edge machine vision inference',
      'Sub-second WebSocket telemetry streams',
    ],
    chips: ['Flutter', 'Dart', 'Firebase', 'SQLite', 'YOLOv8', 'FastAPI'],
    accentColor: '#2b00d1',
  },
]

const INITIAL_MEDIA = [
  {
    name: 'pipevision-hero-feed.jpg',
    dims: '1920 × 1080',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDPs8ZBHxma3oXU95SQz2FXpuwGqeprh73xaliwfPN1_05cab3p4x9k1bnBuBD1kIrdkGu_G1KkuOzQTz6zjeKAFHxB3q88z19uB6t2XgmS_52v59o1yIVDEwU2giJg90YJ2R6a-4dgAjXVNDDmThubRcjHY6vZob2oKfuuO-aYXa_WOl-kQUC_nHhf5e_sTvW7u-14Qq2tdB7miQJXD4YXxfj64RFVzVTajpSvh3kQC_C5nJouppmZ',
  },
  {
    name: 'workforce-suite-preview.jpg',
    dims: '1600 × 1000',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6JuSnJ5ncwLHE79qaY6a6KfvkVu2zCiaQ0GfKVF3qMLOiiQbJw_lu9IYmk8Hk4hvIb0xi9RbBx6V5Iz7OEqN2YK16ANGlHvpETLB5BXcBtdwfgZHWezbpAVwMKmV5Wk1KPKfJjcnZ3cbZw6IklSlF-vyZzkNe_OzaQLePpXN0JDKIjAnSGY3P9QXzd-FgJdY6tgpC47ixiLz_lRmX_-MKg_hRgCW64iSJT82MJ4Ir7vpDjHcuHmuE',
  },
  {
    name: 'faseeh-portrait.jpg',
    dims: '800 × 1000',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuASG0W42bY_gsxnnA3_k_vOaJMpMRkTnbhDtAgNMyxuQh16_1SD5oG3DFLMGGzfYquZBn77mMCbkLen4TsI-pHohdFb38m5tF-7OWAE2qAoDthPJcgjyj0eIM2PMtk2BXV6FlNUGfQLNNPMxqjg8A_bXAV6gbJzTxM2Z-SkBtj5gP47gG43tw_VKASueCNPcm97vUdgvjdpCM4rMbTrlN_TNQIR__WfpWZU5mFbqoDAcxiDXbsp3lPx',
  },
  {
    name: 'tayyab-portrait.jpg',
    dims: '800 × 1000',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABKgk5aoLbkEjSO4kD0UHMS75Ss76wIMD7K923R0hYc269aXlE_Bqzb7EKyzDeSclq51KJF4dLIyapTX9NsLgB3r8kpK1wL4zZ9GcIRKdX4HpL2Rwcc0RMBBRjaDZ0lE2DEe_HVueLs-Py6rSnfJvvIx-Y0-AUvhSSxpoEwB1h1tjEnnKDHipkyFWvB1PgrIXzK7f1HRk30QBJl0TEJuvuP47F0uk7cV-ZkG9Uj66IpV-c5h872fN6',
  },
  {
    name: 'shah-fahad-portrait.jpg',
    dims: '800 × 1000',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBx9TIs49Kb0IvpeF6uqLG73w7-n3R5Uqw3nzs6BxQInrfhx6T_BtKGXxz78hVI5ZWZ4YDLnJ4p2wC9oqX0FBuwhvgt52v32biMQBi0-mdFC1nh0_gVaQoAn2ViocNtTIIJK8r49S5sfZkV8CCwrp3owd-S15dwbxR_yLIQMcYUmqSYynQ4dBI1gT7cWmWeGZafRMqDb9McK_Cnjt1NTNwjIcLHWtbVhDZd4odK9bwp8tithHTfNEG4',
  },
  {
    name: 'muhammad-ali-portrait.jpg',
    dims: '800 × 1000',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5xYc-mLL9-A1w9lvObOPRrOspFo1dTyE4AcB3z8VOddNPohXGrlDbrMP64JzQbrKAI6ScMntkHcYr2AQguwjnHsZJ31SdPCuToXZKm-3utNnUPfvSaX7T6emLW9dYVkY2ZeK6x30QCO61A9yuKhR6l4-JjWo5FTWv8Bbefk__eTX9GfhVN5sPyF1jU1OBd1JZlMgD62ajZnd1Z0f64xl2ydNZsRg50AEb5TpOIlz_WlwRa64pD98C',
  },
]

type ActiveTab = 'dashboard' | 'projects' | 'inquiries' | 'team' | 'services' | 'media' | 'settings'

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('gamicon_admin_auth') === 'authenticated'
  })

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard')
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null)

  // Inquiries State
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES)
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'unread' | 'replied'>('all')
  const [replyText, setReplyText] = useState('')

  // Team State
  const [teamMembers, setTeamMembers] = useState<AdminTeamMember[]>(INITIAL_TEAM)
  const [editingMember, setEditingMember] = useState<AdminTeamMember | null>(null)
  const [isMemberSlideOpen, setIsMemberSlideOpen] = useState(false)

  // Services State
  const [services, setServices] = useState<ServiceBlock[]>(INITIAL_SERVICES)

  // Media State
  const [mediaItems, setMediaItems] = useState(INITIAL_MEDIA)
  const [mediaSearch, setMediaSearch] = useState('')

  // Settings State
  const [settings, setSettings] = useState({
    siteTitle: 'anamorphic — Independent Engineering Studio',
    contactEmail: 'anamorphiicc@gmail.com',
    locationLine: 'Lahore, Peshawar & Global Remote · UTC+5',
    heroHeadline: 'Shipped software, not slideware.',
    heroSubline:
      'Direct access to principal engineers. Every engagement is scoped down to pure execution without account managers or diluted agency layers.',
    stat1Val: '10+',
    stat1Label: 'Commercial Shops Live',
    stat2Val: '5',
    stat2Label: 'Production SaaS Platforms',
    stat3Val: '4',
    stat3Label: 'Founding Principals',
    stat4Val: '60 FPS',
    stat4Label: 'Game Engine Benchmark',
    githubUrl: 'https://github.com',
    linkedinUrl: 'https://linkedin.com',
    footerCopyright: '© Anamorphic Studio. Verified production stacks.',
  })

  // Projects State & Slide-Over
  const [projectFilter, setProjectFilter] = useState('All')
  const [projectSearch, setProjectSearch] = useState('')
  const [isProjectSlideOpen, setIsProjectSlideOpen] = useState(false)
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null)
  const [formTitle, setFormTitle] = useState('')
  const [formSlug, setFormSlug] = useState('')
  const [formCategory, setFormCategory] = useState('Web & SaaS')
  const [formDeliveryTag, setFormDeliveryTag] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formTags, setFormTags] = useState('')
  const [formImageUrl, setFormImageUrl] = useState('')
  const [formFeatured, setFormFeatured] = useState(true)
  const [formPublished, setFormPublished] = useState(true)

  function showNotification(message: string, type: 'success' | 'error' = 'success') {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 4000)
  }

  // Load Supabase games
  async function loadGames() {
    setLoading(true)
    try {
      const { data, error } = await supabase.from('games').select('*').order('created_at', { ascending: false })
      if (!error && data) {
        setGames(data.map(parseGameRecord))
      }
    } catch (e) {
      console.warn('Could not load games from Supabase', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadGames()
    }
  }, [isAuthenticated])

  // Open Project Slide Over
  const handleOpenNewProject = () => {
    setEditingProjectId(null)
    setFormTitle('')
    setFormSlug('')
    setFormCategory('Web & SaaS')
    setFormDeliveryTag('Live in production')
    setFormDescription('')
    setFormTags('React, TypeScript, Node.js')
    setFormImageUrl('')
    setFormFeatured(false)
    setFormPublished(true)
    setIsProjectSlideOpen(true)
  }

  const handleEditProject = (p: Game) => {
    setEditingProjectId(p.id)
    setFormTitle(p.title)
    setFormSlug(p.slug)
    setFormCategory(p.tags?.[0] || 'Web & SaaS')
    setFormDeliveryTag(p.release_date || 'Live in production')
    setFormDescription(p.description || '')
    setFormTags((p.tags || []).join(', '))
    setFormImageUrl(p.image_url || '')
    setFormFeatured(true)
    setFormPublished(true)
    setIsProjectSlideOpen(true)
  }

  // Auto-slug from title
  const handleTitleChange = (val: string) => {
    setFormTitle(val)
    if (!editingProjectId) {
      setFormSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
      )
    }
  }

  // Save Project to Supabase
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formTitle.trim()) {
      showNotification('Project title is required.', 'error')
      return
    }

    const tagsArray = formTags.split(',').map((t) => t.trim()).filter(Boolean)
    const normalizedImg = normalizeImageUrl(formImageUrl)
    const payload = serializeGameRecord({
      id: editingProjectId || undefined,
      title: formTitle.trim(),
      slug: formSlug.trim() || 'project',
      release_date: new Date().toISOString().split('T')[0],
      description: formDescription.trim(),
      tags: tagsArray,
      image_url: normalizedImg,
    })

    try {
      if (editingProjectId) {
        await supabase.from('games').update(payload).eq('id', editingProjectId)
        showNotification('Project updated successfully.')
      } else {
        await supabase.from('games').insert([payload])
        showNotification('Project published successfully.')
      }
      setIsProjectSlideOpen(false)
      loadGames()
    } catch (err: any) {
      showNotification(`Save failed: ${err.message}`, 'error')
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm('Delete this project permanently?')) return
    try {
      await supabase.from('games').delete().eq('id', id)
      showNotification('Project deleted.')
      setIsProjectSlideOpen(false)
      loadGames()
    } catch (err: any) {
      showNotification(`Delete failed: ${err.message}`, 'error')
    }
  }

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem('gamicon_admin_auth')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />
  }

  const unreadInquiriesCount = inquiries.filter((i) => i.status === 'unread').length

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen selection:bg-secondary-container selection:text-on-primary">
      {/* ========================================================================= */}
      {/* 1. LEFT SIDEBAR COMPONENT                                                 */}
      {/* ========================================================================= */}
      <aside className="bg-primary-container text-on-primary docked h-screen w-64 flex flex-col justify-between shrink-0 border-r border-outline-variant/15 fixed left-0 top-0 z-40 p-4">
        <div>
          {/* Header Wordmark & Badge */}
          <div className="flex items-center justify-between px-3 py-2 mb-6">
            <Link to="/" className="text-headline-md font-bold tracking-tight text-white lowercase leading-none">
              anamorphic
            </Link>
            <span className="text-label-eyebrow text-on-primary-container bg-surface-container-highest/10 px-2 py-0.5 rounded text-[11px] font-mono">
              Studio Admin
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-all duration-150 ${
                activeTab === 'dashboard'
                  ? 'bg-surface-container-highest/15 text-white font-bold border-l-2 border-secondary'
                  : 'text-outline-variant hover:text-white hover:bg-surface-container-highest/10'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              <span className="text-sm font-medium">Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-all duration-150 ${
                activeTab === 'projects'
                  ? 'bg-surface-container-highest/15 text-white font-bold border-l-2 border-secondary'
                  : 'text-outline-variant hover:text-white hover:bg-surface-container-highest/10'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">folder_open</span>
              <span className="text-sm font-medium">Projects</span>
            </button>

            <button
              onClick={() => setActiveTab('inquiries')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded text-left transition-all duration-150 ${
                activeTab === 'inquiries'
                  ? 'bg-surface-container-highest/15 text-white font-bold border-l-2 border-secondary'
                  : 'text-outline-variant hover:text-white hover:bg-surface-container-highest/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[18px]">mail</span>
                <span className="text-sm font-medium">Inquiries</span>
              </div>
              {unreadInquiriesCount > 0 && (
                <span className="bg-[#4123ff] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {unreadInquiriesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('team')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-all duration-150 ${
                activeTab === 'team'
                  ? 'bg-surface-container-highest/15 text-white font-bold border-l-2 border-secondary'
                  : 'text-outline-variant hover:text-white hover:bg-surface-container-highest/10'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">group</span>
              <span className="text-sm font-medium">Team</span>
            </button>

            <button
              onClick={() => setActiveTab('services')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-all duration-150 ${
                activeTab === 'services'
                  ? 'bg-surface-container-highest/15 text-white font-bold border-l-2 border-secondary'
                  : 'text-outline-variant hover:text-white hover:bg-surface-container-highest/10'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">layers</span>
              <span className="text-sm font-medium">Services</span>
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-all duration-150 ${
                activeTab === 'media'
                  ? 'bg-surface-container-highest/15 text-white font-bold border-l-2 border-secondary'
                  : 'text-outline-variant hover:text-white hover:bg-surface-container-highest/10'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">perm_media</span>
              <span className="text-sm font-medium">Media</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded text-left transition-all duration-150 ${
                activeTab === 'settings'
                  ? 'bg-surface-container-highest/15 text-white font-bold border-l-2 border-secondary'
                  : 'text-outline-variant hover:text-white hover:bg-surface-container-highest/10'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">settings</span>
              <span className="text-sm font-medium">Settings</span>
            </button>
          </nav>
        </div>

        {/* Bottom Profile & Logout */}
        <div className="border-t border-outline-variant/15 pt-4">
          <div className="flex items-center justify-between px-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest/20 text-white flex items-center justify-center font-bold text-xs">
                AN
              </div>
              <div>
                <div className="text-xs font-semibold text-white leading-tight">Anamorphic Studio</div>
                <div className="text-[10px] text-on-primary-container leading-tight">Principal Custody</div>
              </div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded text-outline-variant hover:text-white hover:bg-surface-container-highest/10 transition-colors text-xs"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* 2. TOPBAR COMPONENT                                                       */}
      {/* ========================================================================= */}
      <header className="fixed top-0 left-64 right-0 h-14 bg-surface/95 backdrop-blur-md border-b border-outline-variant/15 px-8 flex justify-between items-center z-30">
        <div className="flex items-center gap-3">
          <h1 className="font-bold text-on-surface text-lg leading-none tracking-tight capitalize">
            {activeTab}
          </h1>
          <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
        </div>

        {/* Notification Pill */}
        {notification && (
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
              notification.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-900'
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {notification.type === 'error' ? 'error' : 'check_circle'}
            </span>
            {notification.message}
          </div>
        )}

        {/* Trailing Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            to="/"
            className="border border-outline-variant/40 text-on-surface hover:bg-surface-container text-xs font-semibold px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5"
          >
            <span>View site</span>
            <span className="material-symbols-outlined text-[14px]">open_in_new</span>
          </Link>
          <button
            onClick={handleOpenNewProject}
            className="bg-primary-container text-white hover:bg-black text-xs font-semibold px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 shadow-[2px_2px_0px_#1B1A17]"
          >
            <span className="material-symbols-outlined text-[14px]">add</span>
            <span>New project</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 3. MAIN WORKSPACE ACCORDING TO ACTIVE TAB                                 */}
      {/* ========================================================================= */}
      <main className="ml-64 pt-20 px-8 pb-16 bg-surface min-h-screen">
        <div className="max-w-[1440px] mx-auto">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 pb-4 border-b border-outline-variant/15">
                <div>
                  <div className="text-label-eyebrow uppercase tracking-widest text-[11px] font-bold text-outline mb-1">
                    Dashboard
                  </div>
                  <h2 className="text-2xl font-extrabold text-on-surface tracking-tight">
                    Overview &amp; Studio Operations
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleOpenNewProject}
                    className="bg-primary-container text-white hover:bg-black text-xs font-medium px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">add</span>
                    <span>New project</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('team')}
                    className="bg-surface-container border border-outline-variant/30 text-on-surface hover:bg-surface-container-high text-xs font-medium px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">person_add</span>
                    <span>Team</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('inquiries')}
                    className="bg-surface-container border border-outline-variant/30 text-on-surface hover:bg-surface-container-high text-xs font-medium px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[14px]">inbox</span>
                    <span>View inbox</span>
                  </button>
                </div>
              </div>

              {/* Bento Stat Cards */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs text-on-surface-variant font-medium">
                      <span>Total projects</span>
                      <span className="material-symbols-outlined text-[18px]">folder_open</span>
                    </div>
                    <div className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">10</div>
                  </div>
                  <div className="text-[12px] text-on-surface-variant border-t border-outline-variant/15 pt-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#74BE9C]"></span>
                    <span>8 live in production, 2 open-source</span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs text-on-surface-variant font-medium">
                      <span>Unread inquiries</span>
                      <span className="bg-secondary/10 text-secondary font-semibold text-[10px] px-2 py-0.5 rounded-full">
                        {unreadInquiriesCount} new
                      </span>
                    </div>
                    <div className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">
                      {unreadInquiriesCount}
                    </div>
                  </div>
                  <div className="text-[12px] text-on-surface-variant border-t border-outline-variant/15 pt-2 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[13px]">schedule</span>
                    <span>Average response SLA: &lt; 4 Hours</span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs text-on-surface-variant font-medium">
                      <span>Principals &amp; Team</span>
                      <span className="material-symbols-outlined text-[18px]">group</span>
                    </div>
                    <div className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">4</div>
                  </div>
                  <div className="text-[12px] text-on-surface-variant border-t border-outline-variant/15 pt-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    <span>Faseeh, Tayyab (CTO), Fahad, Ali</span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3 text-xs text-on-surface-variant font-medium">
                      <span>Published case studies</span>
                      <span className="material-symbols-outlined text-[18px]">auto_stories</span>
                    </div>
                    <div className="text-4xl font-extrabold text-on-surface tracking-tight mb-2">3</div>
                  </div>
                  <div className="text-[12px] text-on-surface-variant border-t border-outline-variant/15 pt-2 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[13px]">sync</span>
                    <span>Echoes of Desolation &amp; PipeVision AI</span>
                  </div>
                </div>
              </section>

              {/* Two Column Workbench */}
              <div className="grid grid-cols-12 gap-6">
                <section className="col-span-12 lg:col-span-7 bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-5">
                  <div className="flex items-center justify-between pb-4 border-b border-outline-variant/15">
                    <div className="flex items-center gap-2 font-bold text-base">
                      <span>Recent inquiries</span>
                      <span className="bg-secondary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {unreadInquiriesCount} active
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1"
                    >
                      <span>View all</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </button>
                  </div>
                  <div className="divide-y divide-outline-variant/15">
                    {inquiries.slice(0, 4).map((inq) => (
                      <div
                        key={inq.id}
                        onClick={() => {
                          setSelectedInquiry(inq)
                          setActiveTab('inquiries')
                        }}
                        className="py-4 hover:bg-surface-container/50 -mx-5 px-5 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <div className="flex items-center gap-2">
                            {inq.status === 'unread' && (
                              <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span>
                            )}
                            <span className="font-bold text-sm text-on-surface group-hover:text-secondary">
                              {inq.name}
                            </span>
                            <span className="text-xs text-on-surface-variant">({inq.company})</span>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-container font-medium">
                              {inq.projectType}
                            </span>
                            <span className="text-[11px] text-outline">{inq.timeAgo}</span>
                          </div>
                        </div>
                        <p className="text-xs text-on-surface-variant line-clamp-2 pl-4">{inq.message}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="col-span-12 lg:col-span-5 bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-5">
                  <div className="flex items-center justify-between pb-4 border-b border-outline-variant/15">
                    <h3 className="font-bold text-base text-on-surface">Recently updated projects</h3>
                    <button
                      onClick={() => setActiveTab('projects')}
                      className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1"
                    >
                      <span>All projects</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </button>
                  </div>
                  <div className="divide-y divide-outline-variant/15">
                    <div className="py-3.5 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-on-surface">PipeVision AI</div>
                        <div className="text-[11px] text-outline">Factory conveyor YOLOv8 tallying</div>
                      </div>
                      <span className="bg-[#74BE9C]/20 text-[#1B1A17] font-semibold text-[11px] px-2 py-0.5 rounded-full">
                        Published
                      </span>
                    </div>
                    <div className="py-3.5 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-on-surface">Echoes of Desolation</div>
                        <div className="text-[11px] text-outline">Unity 6 &amp; Blender 3D horror</div>
                      </div>
                      <span className="bg-[#FF5B5B]/20 text-[#1B1A17] font-semibold text-[11px] px-2 py-0.5 rounded-full">
                        CTO Milestone
                      </span>
                    </div>
                    <div className="py-3.5 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-on-surface">Workforce Suite</div>
                        <div className="text-[11px] text-outline">5 live multi-role SaaS platforms</div>
                      </div>
                      <span className="bg-[#74BE9C]/20 text-[#1B1A17] font-semibold text-[11px] px-2 py-0.5 rounded-full">
                        Published
                      </span>
                    </div>
                    <div className="py-3.5 flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-bold text-sm text-on-surface">Accounting &amp; POS Suite</div>
                        <div className="text-[11px] text-outline">Live in 10+ retail locations</div>
                      </div>
                      <span className="bg-[#74BE9C]/20 text-[#1B1A17] font-semibold text-[11px] px-2 py-0.5 rounded-full">
                        Published
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS */}
          {activeTab === 'projects' && (
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
                  <p className="text-xs text-on-surface-variant">Manage your portfolio and case studies.</p>
                </div>
                <button
                  onClick={handleOpenNewProject}
                  className="bg-primary-container text-white px-5 py-2 rounded-full font-semibold text-xs flex items-center gap-1.5 shadow-[2px_2px_0px_#1B1A17]"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>New project</span>
                </button>
              </div>

              {/* Filter chips & Search */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex flex-wrap gap-2">
                  {['All', 'Web & SaaS', 'Mobile Apps', 'AI & Automation', 'Open Source'].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => setProjectFilter(chip)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                        projectFilter === chip
                          ? 'bg-primary-container text-white'
                          : 'bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
                <div className="relative w-64">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-outline">
                    search
                  </span>
                  <input
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    placeholder="Search projects..."
                    className="w-full pl-9 pr-3 py-1.5 text-xs bg-surface-container-lowest border border-outline-variant/30 rounded-full"
                  />
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-container-high/50 border-b border-outline-variant/15 text-on-surface-variant">
                    <tr>
                      <th className="py-3 px-4">Project</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Delivery Tag</th>
                      <th className="py-3 px-4">Featured</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/15">
                    {loading && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-on-surface-variant font-mono">
                          Loading projects from Supabase...
                        </td>
                      </tr>
                    )}
                    {!loading && games.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-on-surface-variant font-mono">
                          No projects found. Click "New project" to create one.
                        </td>
                      </tr>
                    )}
                    {!loading && games.map((g) => (
                      <tr key={g.id} className="hover:bg-surface-container-low/50">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img
                            src={g.image_url || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=120&q=80'}
                            referrerPolicy="no-referrer"
                            alt=""
                            className="w-10 h-10 rounded object-cover border border-outline-variant/20 bg-surface-container"
                            onError={(e) => {
                              const target = e.currentTarget
                              if (g.image_url) {
                                const fallback = getDriveFallbackUrl(g.image_url)
                                if (target.src !== fallback) {
                                  target.src = fallback
                                  return
                                }
                              }
                              target.src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=120&q=80'
                            }}
                          />
                          <div>
                            <div className="font-bold text-on-surface text-sm">{g.title}</div>
                            <div className="text-[11px] text-outline font-mono">/work/{g.slug}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-surface-container font-medium text-[11px]">
                            {g.tags?.[0] || 'Web & SaaS'}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-[11px]">
                          {g.release_date || 'Live in production'}
                        </td>
                        <td className="py-3 px-4">
                          <span className="material-symbols-outlined text-amber-500 text-[18px]">star</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="bg-[#74BE9C]/20 text-[#1B1A17] font-semibold text-[11px] px-2 py-0.5 rounded-full">
                            Published
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleEditProject(g)}
                            className="p-1 hover:text-secondary transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteProject(g.id)}
                            className="p-1 hover:text-red-600 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                    {games.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-outline">
                          No custom projects found. Click "New project" to create one.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold tracking-tight">Inbox</h2>
                  {unreadInquiriesCount > 0 && (
                    <span className="bg-secondary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {unreadInquiriesCount} unread
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  {(['all', 'unread', 'replied'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setInquiryFilter(filter)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                        inquiryFilter === filter
                          ? 'bg-primary-container text-white'
                          : 'bg-surface-container border border-outline-variant/30 text-on-surface-variant'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inquiries Table */}
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-container-high/50 border-b border-outline-variant/15 text-on-surface-variant">
                    <tr>
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Discipline</th>
                      <th className="py-3 px-4">Excerpt</th>
                      <th className="py-3 px-4">Received</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/15">
                    {inquiries.map((inq) => (
                      <tr
                        key={inq.id}
                        className="hover:bg-surface-container-low/50 cursor-pointer"
                        onClick={() => setSelectedInquiry(inq)}
                      >
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            {inq.status === 'unread' && (
                              <span className="w-2 h-2 rounded-full bg-secondary shrink-0"></span>
                            )}
                            <div>
                              <div className="font-bold text-sm text-on-surface">{inq.name}</div>
                              <div className="text-outline text-[11px]">{inq.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded-full bg-surface-container font-medium text-[11px]">
                            {inq.projectType}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 max-w-xs truncate text-on-surface-variant">
                          {inq.message}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[11px] text-outline">{inq.timeAgo}</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                              inq.status === 'unread'
                                ? 'bg-secondary/10 text-secondary'
                                : inq.status === 'replied'
                                ? 'bg-[#74BE9C]/20 text-[#1B1A17]'
                                : 'bg-surface-container text-on-surface-variant'
                            }`}
                          >
                            {inq.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setSelectedInquiry(inq)
                            }}
                            className="p-1 hover:text-secondary transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">visibility</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setInquiries(inquiries.filter((i) => i.id !== inq.id))
                              showNotification('Inquiry deleted.')
                            }}
                            className="p-1 hover:text-red-600 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: TEAM */}
          {activeTab === 'team' && (
            <div>
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Team Leadership</h2>
                  <p className="text-xs text-on-surface-variant">Manage founding profiles, bios, and LinkedIn URLs.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingMember({
                      id: `member-${Date.now()}`,
                      name: '',
                      role: '',
                      focus: '',
                      bio: '',
                      chips: [],
                      imageUrl: '',
                      linkedInUrl: '',
                      order: teamMembers.length + 1,
                    })
                    setIsMemberSlideOpen(true)
                  }}
                  className="bg-primary-container text-white px-5 py-2 rounded-full font-semibold text-xs flex items-center gap-1.5 shadow-[2px_2px_0px_#1B1A17]"
                >
                  <span className="material-symbols-outlined text-[16px]">add</span>
                  <span>New member</span>
                </button>
              </div>

              <div className="space-y-4">
                {teamMembers.map((m) => (
                  <div
                    key={m.id}
                    className="p-5 rounded-xl border border-outline-variant/20 bg-surface-container-lowest flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-outline cursor-grab">drag_indicator</span>
                      <img
                        src={m.imageUrl || 'https://via.placeholder.com/80'}
                        alt=""
                        className="w-12 h-12 rounded-full object-cover border border-outline-variant/20"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-on-surface">{m.name}</h4>
                          <span className="text-[11px] font-mono text-outline">#{m.order}</span>
                        </div>
                        <div className="text-xs text-on-surface-variant">{m.role}</div>
                        <div className="text-[11px] text-outline mt-0.5">{m.focus}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingMember(m)
                          setIsMemberSlideOpen(true)
                        }}
                        className="p-2 border border-outline-variant/30 rounded-full hover:bg-surface-container transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">edit</span>
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm('Delete member?')) {
                            setTeamMembers(teamMembers.filter((item) => item.id !== m.id))
                            showNotification('Member removed.')
                          }
                        }}
                        className="p-2 border border-outline-variant/30 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SERVICES */}
          {activeTab === 'services' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Studio Disciplines &amp; Services</h2>
                <p className="text-xs text-on-surface-variant">Edit core capability descriptions and tech chips.</p>
              </div>

              <div className="space-y-6">
                {services.map((srv, idx) => (
                  <div
                    key={srv.id}
                    className="p-6 rounded-2xl border border-outline-variant/20 bg-surface-container-lowest space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full"
                          style={{ backgroundColor: srv.accentColor }}
                        ></span>
                        <h3 className="font-bold text-base text-on-surface">Discipline {idx + 1}: {srv.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        {['#FF5B5B', '#74BE9C', '#2b00d1', '#F6A6CF'].map((c) => (
                          <button
                            key={c}
                            onClick={() => {
                              const updated = [...services]
                              updated[idx].accentColor = c
                              setServices(updated)
                            }}
                            className={`w-5 h-5 rounded-full border ${
                              srv.accentColor === c ? 'ring-2 ring-primary ring-offset-1' : ''
                            }`}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">Title</label>
                      <input
                        value={srv.title}
                        onChange={(e) => {
                          const updated = [...services]
                          updated[idx].title = e.target.value
                          setServices(updated)
                        }}
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">
                        Description
                      </label>
                      <textarea
                        rows={2}
                        value={srv.description}
                        onChange={(e) => {
                          const updated = [...services]
                          updated[idx].description = e.target.value
                          setServices(updated)
                        }}
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">
                        Capability Bullets (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={srv.bullets.join('\n')}
                        onChange={(e) => {
                          const updated = [...services]
                          updated[idx].bullets = e.target.value.split('\n')
                          setServices(updated)
                        }}
                        className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs font-mono"
                      />
                    </div>

                    <div className="flex justify-end pt-2">
                      <button
                        onClick={() => showNotification(`Saved changes for ${srv.title}`)}
                        className="bg-primary-container text-white px-5 py-2 rounded-full font-semibold text-xs shadow-[2px_2px_0px_#1B1A17]"
                      >
                        Save {srv.title}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: MEDIA */}
          {activeTab === 'media' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Media Library</h2>
                  <p className="text-xs text-on-surface-variant">Asset store supporting direct copy and upload.</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-64">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[16px] text-outline">
                      search
                    </span>
                    <input
                      value={mediaSearch}
                      onChange={(e) => setMediaSearch(e.target.value)}
                      placeholder="Search assets..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-surface-container-lowest border border-outline-variant/30 rounded-full"
                    />
                  </div>
                  <label className="bg-primary-container text-white px-4 py-2 rounded-full font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-[2px_2px_0px_#1B1A17]">
                    <span className="material-symbols-outlined text-[16px]">upload</span>
                    <span>Upload image</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0]
                        if (f) {
                          const newAsset = {
                            name: f.name,
                            dims: 'Custom Upload',
                            url: URL.createObjectURL(f),
                          }
                          setMediaItems([newAsset, ...mediaItems])
                          showNotification('Asset added to library.')
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {mediaItems
                  .filter((m) => m.name.toLowerCase().includes(mediaSearch.toLowerCase()))
                  .map((item) => (
                    <div
                      key={item.name}
                      className="group bg-surface-container-lowest border border-outline-variant/20 rounded-xl overflow-hidden relative"
                    >
                      <div className="aspect-[16/10] bg-surface-container-high overflow-hidden relative">
                        <img src={item.url} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(item.url)
                              showNotification('URL copied to clipboard!')
                            }}
                            className="p-2 rounded-full bg-white text-black hover:bg-secondary hover:text-white transition-colors"
                            title="Copy URL"
                          >
                            <span className="material-symbols-outlined text-[16px]">content_copy</span>
                          </button>
                          <button
                            onClick={() => {
                              setMediaItems(mediaItems.filter((i) => i.name !== item.name))
                              showNotification('Asset removed.')
                            }}
                            className="p-2 rounded-full bg-white text-black hover:bg-red-600 hover:text-white transition-colors"
                            title="Delete"
                          >
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </div>
                      </div>
                      <div className="p-3">
                        <div className="font-mono text-xs font-semibold text-on-surface truncate">{item.name}</div>
                        <div className="text-[11px] text-outline font-mono mt-0.5">{item.dims}</div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS */}
          {activeTab === 'settings' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold tracking-tight">Studio Global Settings</h2>
                <p className="text-xs text-on-surface-variant">Update telemetry, hero copy, and production contact info.</p>
              </div>

              <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/20 max-w-3xl space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">Site Title</label>
                    <input
                      value={settings.siteTitle}
                      onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">Contact Email</label>
                    <input
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">Location Line</label>
                  <input
                    value={settings.locationLine}
                    onChange={(e) => setSettings({ ...settings, locationLine: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">Hero Headline</label>
                  <input
                    value={settings.heroHeadline}
                    onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">Hero Subline</label>
                  <textarea
                    rows={2}
                    value={settings.heroSubline}
                    onChange={(e) => setSettings({ ...settings, heroSubline: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs"
                  />
                </div>

                {/* 4 Stats */}
                <div className="pt-4 border-t border-outline-variant/15">
                  <span className="block text-xs font-bold text-on-surface uppercase mb-3">
                    Stats (4 Pairs)
                  </span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <input
                        value={settings.stat1Val}
                        onChange={(e) => setSettings({ ...settings, stat1Val: e.target.value })}
                        className="w-full font-bold text-sm bg-surface-container-low border border-outline-variant/30 rounded-lg p-2"
                      />
                      <input
                        value={settings.stat1Label}
                        onChange={(e) => setSettings({ ...settings, stat1Label: e.target.value })}
                        className="w-full text-[11px] text-outline bg-surface-container-low border border-outline-variant/30 rounded-lg p-1.5 mt-1"
                      />
                    </div>
                    <div>
                      <input
                        value={settings.stat2Val}
                        onChange={(e) => setSettings({ ...settings, stat2Val: e.target.value })}
                        className="w-full font-bold text-sm bg-surface-container-low border border-outline-variant/30 rounded-lg p-2"
                      />
                      <input
                        value={settings.stat2Label}
                        onChange={(e) => setSettings({ ...settings, stat2Label: e.target.value })}
                        className="w-full text-[11px] text-outline bg-surface-container-low border border-outline-variant/30 rounded-lg p-1.5 mt-1"
                      />
                    </div>
                    <div>
                      <input
                        value={settings.stat3Val}
                        onChange={(e) => setSettings({ ...settings, stat3Val: e.target.value })}
                        className="w-full font-bold text-sm bg-surface-container-low border border-outline-variant/30 rounded-lg p-2"
                      />
                      <input
                        value={settings.stat3Label}
                        onChange={(e) => setSettings({ ...settings, stat3Label: e.target.value })}
                        className="w-full text-[11px] text-outline bg-surface-container-low border border-outline-variant/30 rounded-lg p-1.5 mt-1"
                      />
                    </div>
                    <div>
                      <input
                        value={settings.stat4Val}
                        onChange={(e) => setSettings({ ...settings, stat4Val: e.target.value })}
                        className="w-full font-bold text-sm bg-surface-container-low border border-outline-variant/30 rounded-lg p-2"
                      />
                      <input
                        value={settings.stat4Label}
                        onChange={(e) => setSettings({ ...settings, stat4Label: e.target.value })}
                        className="w-full text-[11px] text-outline bg-surface-container-low border border-outline-variant/30 rounded-lg p-1.5 mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => showNotification('Global studio settings saved successfully!')}
                    className="bg-primary-container text-white px-7 py-3 rounded-full font-semibold text-xs shadow-[2px_2px_0px_#1B1A17]"
                  >
                    Save all settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. PROJECT SLIDE-OVER PANEL                                               */}
      {/* ========================================================================= */}
      {isProjectSlideOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-surface h-full shadow-2xl p-6 md:p-8 overflow-y-auto flex flex-col justify-between border-l border-outline-variant/20">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/15 mb-6">
                <div>
                  <h3 className="font-bold text-lg text-on-surface">
                    {editingProjectId ? 'Edit Project' : 'New Project'}
                  </h3>
                  <p className="text-xs text-on-surface-variant">Configure specs, assets, and case study parameters.</p>
                </div>
                <button
                  onClick={() => setIsProjectSlideOpen(false)}
                  className="w-8 h-8 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">Title</label>
                  <input
                    required
                    value={formTitle}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. PipeVision AI"
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">URL Slug</label>
                    <input
                      required
                      value={formSlug}
                      onChange={(e) => setFormSlug(e.target.value)}
                      placeholder="pipevision-ai"
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">Category</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value)}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs"
                    >
                      <option>Web &amp; SaaS</option>
                      <option>Game Development</option>
                      <option>Mobile Apps</option>
                      <option>AI &amp; Automation</option>
                      <option>Open Source</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">Delivery Tag</label>
                  <input
                    value={formDeliveryTag}
                    onChange={(e) => setFormDeliveryTag(e.target.value)}
                    placeholder="e.g. Live in 10+ shops / Delivered to A-One PVC"
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">
                    Short Description (Home/Work Cards)
                  </label>
                  <textarea
                    rows={2}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Brief architectural summary..."
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">
                    Tech Stack (Comma-separated)
                  </label>
                  <input
                    value={formTags}
                    onChange={(e) => setFormTags(e.target.value)}
                    placeholder="Python, YOLOv8, FastAPI, React"
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">
                    Project Image URL (or Google Drive share link)
                  </label>
                  <input
                    value={formImageUrl}
                    onChange={(e) => setFormImageUrl(e.target.value)}
                    placeholder="https://drive.google.com/file/d/... or direct image URL"
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs font-mono"
                  />
                  <div className="mt-1.5 flex items-start gap-1.5 text-[11px] text-on-surface-variant font-mono">
                    <span className="material-symbols-outlined text-[14px] text-amber-600 shrink-0 mt-0.5">info</span>
                    <span>
                      For Google Drive images: Ensure file permissions are set to <strong>"Anyone with the link can view"</strong> in Drive.
                    </span>
                  </div>
                  {formImageUrl && (
                    <div className="mt-2.5 flex items-center gap-4">
                      <div className="aspect-video w-36 rounded border border-outline-variant/30 overflow-hidden bg-surface-container shrink-0 relative">
                        <img
                          src={normalizeImageUrl(formImageUrl)}
                          referrerPolicy="no-referrer"
                          alt="Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to secondary Drive view stream if lh3 was blocked
                            const target = e.currentTarget
                            const fallback = getDriveFallbackUrl(formImageUrl)
                            if (target.src !== fallback) {
                              target.src = fallback
                            }
                          }}
                        />
                      </div>
                      <div className="text-[11px] text-outline font-mono truncate max-w-xs">
                        Direct Stream URL:
                        <div className="text-[10px] text-primary break-all">
                          {normalizeImageUrl(formImageUrl)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-6 py-2">
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      className="rounded border-outline-variant text-primary"
                    />
                    <span>Featured on homepage</span>
                  </label>
                  <label className="flex items-center gap-2 text-xs cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formPublished}
                      onChange={(e) => setFormPublished(e.target.checked)}
                      className="rounded border-outline-variant text-primary"
                    />
                    <span>Published</span>
                  </label>
                </div>

                <div className="pt-6 border-t border-outline-variant/15 flex items-center justify-between">
                  {editingProjectId ? (
                    <button
                      type="button"
                      onClick={() => handleDeleteProject(editingProjectId)}
                      className="text-xs text-red-600 hover:underline font-semibold"
                    >
                      Delete project
                    </button>
                  ) : (
                    <div></div>
                  )}
                  <button
                    type="submit"
                    className="bg-primary-container text-white px-6 py-2.5 rounded-full font-semibold text-xs shadow-[2px_2px_0px_#1B1A17]"
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. INQUIRY MESSAGE VIEW SLIDE-OVER                                        */}
      {/* ========================================================================= */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-surface h-full shadow-2xl p-6 md:p-8 overflow-y-auto flex flex-col justify-between border-l border-outline-variant/20">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/15 mb-6">
                <div>
                  <h3 className="font-bold text-lg text-on-surface">Client Inquiry</h3>
                  <p className="text-xs text-on-surface-variant font-mono">{selectedInquiry.id}</p>
                </div>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="w-8 h-8 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>

              {/* Chat Thread Container */}
              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-2xl bg-surface-container space-y-2 border border-outline-variant/20">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-sm text-on-surface">{selectedInquiry.name}</div>
                      <div className="text-xs text-secondary font-mono">{selectedInquiry.email}</div>
                      {selectedInquiry.company && (
                        <div className="text-[11px] text-outline">{selectedInquiry.company}</div>
                      )}
                    </div>
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-surface-container-high font-medium">
                      {selectedInquiry.projectType}
                    </span>
                  </div>
                  {selectedInquiry.budget && (
                    <div className="text-xs text-on-surface font-semibold pt-1">
                      Budget Range: <span className="text-secondary">{selectedInquiry.budget}</span>
                    </div>
                  )}
                </div>

                {/* Message Bubble */}
                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/15 text-xs text-on-surface leading-relaxed">
                  {selectedInquiry.message}
                </div>
              </div>

              {/* Reply Box */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface uppercase">Direct Reply</label>
                <textarea
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Draft your reply from principal inbox..."
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-3 text-xs"
                />
                <button
                  onClick={() => {
                    const subject = encodeURIComponent(`Re: Project Scoping — Anamorphic Studio`)
                    const body = encodeURIComponent(replyText)
                    window.location.href = `mailto:${selectedInquiry.email}?subject=${subject}&body=${body}`
                    showNotification('Mail client opened for reply.')
                  }}
                  className="w-full bg-primary-container text-white py-2.5 rounded-full font-semibold text-xs shadow-[2px_2px_0px_#1B1A17]"
                >
                  Send reply
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/15 flex items-center justify-between">
              <button
                onClick={() => {
                  setInquiries(inquiries.filter((i) => i.id !== selectedInquiry.id))
                  setSelectedInquiry(null)
                  showNotification('Inquiry deleted.')
                }}
                className="text-xs text-red-600 font-semibold hover:underline"
              >
                Delete message
              </button>
              <button
                onClick={() => {
                  const updated = inquiries.map((i) =>
                    i.id === selectedInquiry.id ? { ...i, status: 'replied' as const } : i
                  )
                  setInquiries(updated)
                  setSelectedInquiry(null)
                  showNotification('Marked as replied.')
                }}
                className="text-xs text-secondary font-semibold hover:underline"
              >
                Mark as replied
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. TEAM MEMBER EDITOR SLIDE-OVER                                          */}
      {/* ========================================================================= */}
      {isMemberSlideOpen && editingMember && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg bg-surface h-full shadow-2xl p-6 md:p-8 overflow-y-auto flex flex-col justify-between border-l border-outline-variant/20">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-outline-variant/15 mb-6">
                <div>
                  <h3 className="font-bold text-lg text-on-surface">Edit Team Member</h3>
                  <p className="text-xs text-on-surface-variant">Update credentials, bio, and LinkedIn link.</p>
                </div>
                <button
                  onClick={() => setIsMemberSlideOpen(false)}
                  className="w-8 h-8 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">Name</label>
                  <input
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">Role</label>
                  <input
                    value={editingMember.role}
                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">Focus Line</label>
                  <input
                    value={editingMember.focus}
                    onChange={(e) => setEditingMember({ ...editingMember, focus: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">Bio</label>
                  <textarea
                    rows={3}
                    value={editingMember.bio}
                    onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">
                    Tech Chips (Comma-separated)
                  </label>
                  <input
                    value={editingMember.chips.join(', ')}
                    onChange={(e) =>
                      setEditingMember({
                        ...editingMember,
                        chips: e.target.value.split(',').map((c) => c.trim()),
                      })
                    }
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">LinkedIn URL</label>
                    <input
                      value={editingMember.linkedInUrl}
                      onChange={(e) => setEditingMember({ ...editingMember, linkedInUrl: e.target.value })}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">Order #</label>
                    <input
                      type="number"
                      value={editingMember.order}
                      onChange={(e) => setEditingMember({ ...editingMember, order: Number(e.target.value) })}
                      className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1 uppercase">Photo URL</label>
                  <input
                    value={editingMember.imageUrl}
                    onChange={(e) => setEditingMember({ ...editingMember, imageUrl: e.target.value })}
                    className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl px-3.5 py-2 text-xs font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/15 flex justify-end">
              <button
                onClick={() => {
                  const exists = teamMembers.find((m) => m.id === editingMember.id)
                  if (exists) {
                    setTeamMembers(teamMembers.map((m) => (m.id === editingMember.id ? editingMember : m)))
                  } else {
                    setTeamMembers([...teamMembers, editingMember])
                  }
                  setIsMemberSlideOpen(false)
                  showNotification('Team member saved.')
                }}
                className="bg-primary-container text-white px-6 py-2.5 rounded-full font-semibold text-xs shadow-[2px_2px_0px_#1B1A17]"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

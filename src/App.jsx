import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowDownRight,
  ArrowUpRight,
  AtSign,
  BarChart3,
  BookOpen,
  Compass,
  Clock3,
  ExternalLink,
  Flag,
  Layers3,
  LoaderCircle,
  MapPin,
  MessageCircle,
  Menu,
  MoveUpRight,
  PenTool,
  ScanLine,
  Send,
  Star,
  X,
} from 'lucide-react'
import cardCover from './assets/card/image_sampul_doci.webp'
import cardPortrait from './assets/card/image_profil_doci.webp'
import emailIcon from './assets/card/icon_email.svg'
import linkedInLogo from './assets/card/logo_linkedin_logo.svg'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const SpatialCanvas = lazy(() => import('./SpatialCanvas.jsx'))
const currentYear = new Date().getFullYear()
const publicBase = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`
const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL
  || (import.meta.env.DEV ? 'http://127.0.0.1:3000/api/chat' : '')
const suggestedQuestions = [
  'Apa skill utama Ridho?',
  'Ceritakan pengalaman GIS Ridho',
  'Bagaimana cara menghubungi Ridho?',
]

const projects = [
  {
    number: '01',
    category: 'SPATIAL DECISION SUPPORT',
    title: 'Blue Ocean · site selection',
    location: 'Jakarta Selatan · 2026',
    description:
      'Menggabungkan permintaan, nilai tanah, dan jarak kompetitor untuk membaca potensi lokasi baru dengan pendekatan MCDA VIKOR.',
    tags: ['Spatial MCDA', 'VIKOR', 'Hexbin'],
    variant: 'coffee',
    url: 'https://lnkd.in/p/gmH5Vi_h',
  },
  {
    number: '02',
    category: 'REMOTE SENSING',
    title: 'Membaca suhu kota dari citra',
    location: 'D.I. Yogyakarta · 2025',
    description:
      'Analisis Urban Heat Island melalui Land Surface Temperature, NDVI, dan NDBI untuk mendukung perencanaan kota yang lebih adaptif.',
    tags: ['LST', 'NDVI', 'NDBI'],
    variant: 'heat',
    url: 'https://lnkd.in/p/djUW-s7B',
  },
]

const journeySections = [
  { id: 'home', label: 'Beranda', layer: 'ORIGIN / 00' },
  { id: 'tentang', label: 'Profil', layer: 'CONTEXT / 01' },
  { id: 'proyek', label: 'Proyek', layer: 'PROJECTS / 02' },
  { id: 'atlas', label: 'Atlas', layer: 'TERRAIN / 03' },
  { id: 'pengalaman', label: 'Pengalaman', layer: 'FIELD NOTES / 04' },
  { id: 'keahlian', label: 'Keahlian', layer: 'TOOLKIT / 05' },
  { id: 'kontak', label: 'Kontak', layer: 'DESTINATION / 06' },
]

const experiences = [
  {
    period: 'Okt 2026 — Des 2026',
    organization: 'PT Industri Telekomunikasi Indonesia',
    role: 'Internship · General Affair & QHSE',
    description:
      'Membangun WebGIS pengelolaan aset dan tenant, peta denah interaktif, serta pemetaan zona keselamatan fasilitas.',
    current: true,
  },
  {
    period: 'Jan 2026 — Feb 2026',
    organization: 'Bappenas Republik Indonesia',
    role: 'Internship · GIS Analyst, Direktorat TRP3B',
    description:
      'Mengolah data spasial dan analisis dampak untuk mendukung perencanaan wilayah dan pembangunan infrastruktur.',
  },
  {
    period: 'Okt 2025 — Des 2025',
    organization: 'PT Kimia Farma Tbk',
    role: 'Project · Quantity Surveyor',
    description:
      'Menyusun Bill of Quantities, menghitung kebutuhan material, dan memantau kesesuaian biaya proyek.',
  },
  {
    period: 'Mar 2025 — Mei 2025',
    organization: 'PT Siloam Internationals Hospitals Tbk.',
    role: 'Project-based · Graphic Designer',
    description:
      'Mengembangkan konsep desain untuk menciptakan lingkungan terapeutik, berkolaborasi dengan manajemen dan tim proyek, serta menyiapkan mockup dan artwork mural.',
  },
  {
    period: 'Nov 2024 — Mei 2025',
    organization: 'PT Adhi Karya (Persero) Tbk.',
    role: 'Procurement Assistant · Pandansimo Bridge',
    description:
      'Mengaudit alur pengadaan, memantau efisiensi rantai pasok, dan berkoordinasi dengan tim teknis serta vendor agar material sesuai kebutuhan proyek.',
  },
  {
    period: 'Jun 2024 — Nov 2024',
    organization: 'Ikatan Surveyor Indonesia',
    role: 'Project-based · Graphic Designer',
    description:
      'Merancang identitas visual, materi promosi, dan aset web untuk Annual Scientific Forum 2024, termasuk mockup dan elemen branding acara.',
  },
  {
    period: 'Jul 2022 — Jul 2023',
    organization: 'Liberte Custom Apparel & Clo',
    role: 'Graphic Designer',
    description:
      'Mengembangkan desain jersey custom sesuai identitas klien dan tim, serta memimpin tim desain dalam merancang dan mengeksekusi konsep jersey.',
  },
  {
    period: 'Mei 2022 — Jun 2022',
    organization: 'PT Bank Central Asia Tbk. (BCA)',
    role: 'Replenishment Officer',
    description:
      'Mengelola pengisian uang dan pengamanan distribusi kas ATM dengan mengikuti protokol keamanan keuangan.',
  },
  {
    period: 'Nov 2021 — Mei 2022',
    organization: 'PT Advantage SCM',
    role: 'Internship · Custodian',
    description:
      'Mendukung pengisian uang dan distribusi kas ATM, dengan menjaga protokol keamanan selama tugas di vault dan transportasi uang.',
  },
  {
    period: 'Jul 2021 — Mei 2022',
    organization: 'PT Bank Central Asia Tbk. (BCA)',
    role: 'Custodian Officer',
    description:
      'Mengelola pengisian uang dan pengamanan distribusi kas ATM sesuai protokol keamanan keuangan yang berlaku.',
  },
  {
    period: 'Nov 2020 — Feb 2021',
    organization: 'PT Djojonegoro C-1000',
    role: 'Project Helper',
    description:
      'Membantu tim teknis dalam pemasangan pipa di pabrik Sukabumi, termasuk tugas dasar pengelasan, pemotongan pipa, dan pemeliharaan lokasi.',
  },
]

const capabilities = [
  {
    icon: Layers3,
    title: 'Geospatial analysis',
    detail: 'QGIS · ArcGIS · MapLibre · Spatial MCDA',
  },
  {
    icon: ScanLine,
    title: 'Remote sensing',
    detail: 'Satellite imagery · LST · NDVI · NDBI',
  },
  {
    icon: PenTool,
    title: 'Visual communication',
    detail: 'Photoshop · Illustrator · Visual identity',
  },
  {
    icon: BarChart3,
    title: 'Project delivery',
    detail: 'Public advocacy · BOQ · Procurement',
  },
]

function SectionHeading({ eyebrow, title, note }) {
  return (
    <div className="section-heading" data-reveal>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 data-word-reveal>{title}</h2>
        <span className="section-transition-line" aria-hidden="true" />
      </div>
      {note && <p className="section-note">{note}</p>}
    </div>
  )
}

function splitHeadingIntoWords(heading) {
  const originalMarkup = heading.innerHTML
  const originalLabel = heading.getAttribute('aria-label')
  const text = heading.textContent?.replace(/\s+/g, ' ').trim() ?? ''
  const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT)
  const textNodes = []

  while (walker.nextNode()) textNodes.push(walker.currentNode)

  for (const textNode of textNodes) {
    const fragment = document.createDocumentFragment()

    for (const token of textNode.textContent.match(/\S+|\s+/g) ?? []) {
      if (/^\s+$/.test(token)) {
        fragment.append(document.createTextNode(token))
        continue
      }

      const word = document.createElement('span')
      word.className = 'motion-word'
      word.setAttribute('aria-hidden', 'true')
      word.textContent = token
      fragment.append(word)
    }

    textNode.replaceWith(fragment)
  }

  heading.setAttribute('aria-label', text)

  return () => {
    heading.innerHTML = originalMarkup
    if (originalLabel === null) heading.removeAttribute('aria-label')
    else heading.setAttribute('aria-label', originalLabel)
  }
}

function DisciplineMarquee() {
  const disciplines = [
    'Geospatial analysis',
    'Remote sensing',
    'Spatial intelligence',
    'Cartography',
    'Data meets design',
  ]

  return (
    <section
      className="discipline-marquee"
      aria-label="Fokus keahlian"
      data-cinematic-section
    >
      <span className="section-seam" aria-hidden="true" />
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy} aria-hidden={copy === 1}>
            {disciplines.map((discipline) => (
              <span className="marquee-item" key={discipline}>
                {discipline}
                <i aria-hidden="true">✳</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

function SpatialAtlas() {
  return (
    <section
      className="spatial-atlas"
      id="atlas"
      aria-labelledby="spatial-atlas-title"
      data-reveal
      data-cinematic-section
    >
      <span className="section-seam" aria-hidden="true" />
      <div className="spatial-atlas-copy">
        <p className="eyebrow">RUANG ADALAH DATA</p>
        <h2 id="spatial-atlas-title" data-word-reveal>
          Setiap titik<br />punya{' '}
          <span>perspektif.</span>
        </h2>
        <p>
          Dari citra satelit hingga skala lingkungan, konteks mengubah cara kita membaca sebuah tempat.
          Saya menghubungkan lapisan-lapisan itu menjadi cerita yang bisa digunakan.
        </p>
        <a className="atlas-link" href="#keahlian">
          Lihat cara saya bekerja <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="atlas-visual" aria-hidden="true">
        <div className="atlas-orbit atlas-orbit-one" />
        <div className="atlas-orbit atlas-orbit-two" />
        <div className="atlas-orbit atlas-orbit-three" />
        <div className="atlas-globe">
          <span className="atlas-grid-line atlas-grid-line-a" />
          <span className="atlas-grid-line atlas-grid-line-b" />
          <span className="atlas-grid-line atlas-grid-line-c" />
          <span className="atlas-grid-line atlas-grid-line-d" />
          <span className="atlas-signal atlas-signal-one" />
          <span className="atlas-signal atlas-signal-two" />
          <span className="atlas-signal atlas-signal-three" />
          <span className="atlas-globe-core" />
        </div>
        <span className="atlas-coordinate atlas-coordinate-one">6°12′ S</span>
        <span className="atlas-coordinate atlas-coordinate-two">106°48′ E</span>
        <span className="atlas-stamp">SPATIAL<br />SYSTEM / 01</span>
      </div>
    </section>
  )
}

function handleProjectPointerMove(event) {
  if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const card = event.currentTarget
  const bounds = card.getBoundingClientRect()
  if (!bounds.width || !bounds.height) return

  const x = (event.clientX - bounds.left) / bounds.width
  const y = (event.clientY - bounds.top) / bounds.height
  const maxTilt = 5

  card.style.setProperty('--tilt-x', `${(0.5 - y) * maxTilt}deg`)
  card.style.setProperty('--tilt-y', `${(x - 0.5) * maxTilt}deg`)
  card.style.setProperty('--glare-x', `${x * 100}%`)
  card.style.setProperty('--glare-y', `${y * 100}%`)
  card.classList.add('is-tilting')
}

function resetProjectTilt(event) {
  const card = event.currentTarget
  card.style.setProperty('--tilt-x', '0deg')
  card.style.setProperty('--tilt-y', '0deg')
  card.classList.remove('is-tilting')
}

function ProjectVisual({ variant }) {
  const poster = variant === 'coffee'
    ? {
        src: `${publicBase}posters/blue-ocean.png`,
        alt: 'Poster peta sebaran lokasi Blue Ocean dan analisis VIKOR',
      }
    : {
        src: `${publicBase}posters/uhi-yogyakarta.jpg`,
        alt: 'Poster integrasi data LST, NDVI, dan NDBI untuk identifikasi Urban Heat Island di Yogyakarta',
      }

  return (
    <div className="project-visual poster-visual">
      <img
        className="project-poster"
        src={poster.src}
        alt={poster.alt}
        loading="lazy"
        decoding="async"
      />
      <div className={`project-spatial-layer project-spatial-layer--${variant}`} aria-hidden="true">
        <svg viewBox="0 0 520 340" preserveAspectRatio="none">
          <path className="project-layer-grid" d="M0 68H520M0 136H520M0 204H520M0 272H520M104 0V340M208 0V340M312 0V340M416 0V340" />
          <path className="project-layer-route" d="M52 252C132 230 133 127 224 162S323 250 466 75" />
          {(variant === 'coffee'
            ? [[52, 252, 'A'], [224, 162, 'B'], [466, 75, 'C']]
            : [[91, 214, 'LST'], [258, 133, 'NDVI'], [425, 226, 'NDBI']]
          ).map(([cx, cy, label]) => (
            <g className="project-layer-marker" key={label}>
              <circle cx={cx} cy={cy} r="13" />
              <circle cx={cx} cy={cy} r="3" />
              <text x={cx + 16} y={cy - 8}>{label}</text>
            </g>
          ))}
        </svg>
        <span className="project-layer-stamp">
          <i />
          {variant === 'coffee' ? 'SITE SELECTION / MCDA' : 'THERMAL LAYERS / UHI'}
        </span>
        <span className="project-layer-coordinate">
          {variant === 'coffee' ? 'JAKARTA SELATAN · 06°15′ S' : 'YOGYAKARTA · 07°47′ S'}
        </span>
      </div>
    </div>
  )
}

function SpatialScanner() {
  const scannerRef = useRef(null)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches || reducedMotion.matches) return undefined

    const scanner = scannerRef.current
    if (!scanner) return undefined
    let frame = 0
    let pointerX = 0
    let pointerY = 0

    const updateScanner = () => {
      scanner.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`
      frame = 0
    }

    const handlePointerMove = (event) => {
      pointerX = event.clientX
      pointerY = event.clientY
      scanner.classList.add('is-visible')
      if (!frame) frame = window.requestAnimationFrame(updateScanner)
    }
    const hideScanner = () => scanner.classList.remove('is-visible')

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('pointerleave', hideScanner)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerleave', hideScanner)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="spatial-scanner" ref={scannerRef} aria-hidden="true">
      <span className="spatial-scanner-crosshair" />
    </div>
  )
}

function PortfolioChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [showReminder, setShowReminder] = useState(true)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [history, setHistory] = useState([])
  const [isSending, setIsSending] = useState(false)
  const inputRef = useRef(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    if (isOpen) return undefined

    const timeoutId = window.setTimeout(() => setShowReminder(false), 10000)
    return () => window.clearTimeout(timeoutId)
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return undefined

    inputRef.current?.focus()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true)
    document.addEventListener('portfolio-chat-open', handleOpenChat)
    return () => document.removeEventListener('portfolio-chat-open', handleOpenChat)
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }, [messages, isSending])

  const sendMessage = async (rawMessage) => {
    const content = rawMessage.trim()
    if (!content || content.length > 500 || isSending) return

    const conversation = [...history, { role: 'user', content }]
    setMessages((current) => [...current, { role: 'user', content }])
    setInput('')
    setIsSending(true)

    try {
      if (!CHAT_API_URL) {
        throw new Error('Chatbot belum terhubung ke server publik. Silakan hubungi Ridho melalui email atau LinkedIn.')
      }

      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conversation.slice(-10) }),
      })
      const payload = await response.json().catch(() => null)

      if (!response.ok) {
        throw new Error(typeof payload?.error === 'string' ? payload.error : 'Chat sedang mengalami gangguan. Coba lagi sebentar ya.')
      }
      if (typeof payload?.reply !== 'string' || !payload.reply.trim()) {
        throw new Error('Chat belum menerima jawaban. Coba kirim pertanyaan lagi.')
      }

      setHistory([...conversation, { role: 'assistant', content: payload.reply }].slice(-10))
      setMessages((current) => [...current, { role: 'assistant', content: payload.reply }])
    } catch (error) {
      const errorMessage = error instanceof TypeError
        ? 'Tidak dapat terhubung ke layanan chat. Pastikan server chatbot aktif.'
        : error instanceof Error
          ? error.message
          : 'Chat sedang mengalami gangguan. Coba lagi sebentar ya.'
      setMessages((current) => [...current, { role: 'error', content: errorMessage }])
    } finally {
      setIsSending(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    void sendMessage(input)
  }

  return (
    <div className="portfolio-chat-widget">
      {showReminder && !isOpen && (
        <button
          className="portfolio-chat-reminder"
          type="button"
          onClick={() => {
            setShowReminder(false)
            setIsOpen(true)
          }}
        >
          <span className="portfolio-chat-reminder-dot" aria-hidden="true" />
          <span>Ada yang ingin ditanyakan? Tanya asisten Ridho di sini.</span>
          <ArrowDownRight size={18} aria-hidden="true" />
        </button>
      )}
      {isOpen && (
        <section className="portfolio-chat-panel" role="dialog" aria-label="Chatbot Ridho">
          <header className="portfolio-chat-header">
            <div className="portfolio-chat-avatar"><MessageCircle size={20} /></div>
            <div className="portfolio-chat-heading">
              <strong>Ngobrol dengan Ridho</strong>
              <span><i /> Asisten virtual · online</span>
            </div>
            <button
              className="portfolio-chat-close"
              type="button"
              aria-label="Tutup chatbot"
              onClick={() => setIsOpen(false)}
            >
              <X size={20} />
            </button>
          </header>

          <div className="portfolio-chat-messages" role="log" aria-live="polite" aria-relevant="additions text">
            <div className="portfolio-chat-welcome">
              Halo! Saya asisten virtual Ridho. Tanyakan seputar skill, pengalaman, atau proyeknya.
            </div>
            {messages.length === 0 && (
              <div className="portfolio-chat-suggestions" aria-label="Saran pertanyaan">
                {suggestedQuestions.map((question) => (
                  <button
                    key={question}
                    type="button"
                    disabled={isSending}
                    onClick={() => void sendMessage(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
            {messages.map((message, index) => (
              <div
                className={`portfolio-chat-row portfolio-chat-row--${message.role}`}
                key={`${message.role}-${index}`}
              >
                <p className="portfolio-chat-bubble">{message.content}</p>
              </div>
            ))}
            {isSending && (
              <div className="portfolio-chat-row portfolio-chat-row--assistant">
                <p className="portfolio-chat-bubble portfolio-chat-loading">
                  <LoaderCircle className="portfolio-chat-spinner" size={18} />
                  Menyiapkan jawaban...
                </p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="portfolio-chat-form" onSubmit={handleSubmit}>
            <textarea
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault()
                  handleSubmit(event)
                }
              }}
              maxLength={500}
              rows={1}
              placeholder="Tanya tentang Ridho..."
              aria-label="Tulis pertanyaan"
              disabled={isSending}
            />
            <button
              type="submit"
              aria-label="Kirim pesan"
              aria-busy={isSending}
              disabled={isSending || !input.trim()}
            >
              {isSending
                ? <LoaderCircle className="portfolio-chat-spinner" size={20} />
                : <Send size={20} />}
            </button>
          </form>
        </section>
      )}
      <button
        className={`portfolio-chat-toggle${isOpen ? ' is-open' : ''}`}
        type="button"
        aria-label={isOpen ? 'Tutup chatbot Ridho' : 'Buka chatbot Ridho'}
        aria-expanded={isOpen}
        onClick={() => {
          setShowReminder(false)
          setIsOpen((open) => !open)
        }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  )
}

function IntroGateway({ isEntering, onEnter, onOpenChat }) {
  const cardRef = useRef(null)

  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const card = cardRef.current
    if (!card) return

    const bounds = card.getBoundingClientRect()
    if (!bounds.width || !bounds.height) return

    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    const maxTilt = 12

    card.style.setProperty('--tilt-x', `${(0.5 - y) * maxTilt}deg`)
    card.style.setProperty('--tilt-y', `${(x - 0.5) * maxTilt}deg`)
    card.style.setProperty('--glare-x', `${x * 100}%`)
    card.style.setProperty('--glare-y', `${y * 100}%`)
    card.classList.add('is-tilting')
  }

  const handlePointerLeave = () => {
    const card = cardRef.current
    if (!card) return

    card.style.setProperty('--tilt-x', '0deg')
    card.style.setProperty('--tilt-y', '0deg')
    card.classList.remove('is-tilting')
  }

  return (
    <main className={`intro-gateway${isEntering ? ' is-entering' : ''}`}>
      <article
        ref={cardRef}
        className="intro-profile-card"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <header className="intro-card-cover">
          <img src={cardCover} alt="Foto sampul Ridho" loading="eager" fetchPriority="high" decoding="async" />
          <img
            className="intro-card-portrait"
            src={cardPortrait}
            alt="Foto profil Ridho A. Utama"
            loading="eager"
            decoding="async"
          />
          <a
            className="intro-card-linkedin"
            href="https://linkedin.com/in/ridhoalifutama/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Kunjungi LinkedIn Ridho"
          >
            <img src={linkedInLogo} alt="LinkedIn" />
          </a>
        </header>
        <div className="intro-card-content">
          <section className="intro-card-identity" aria-labelledby="intro-card-name">
            <div>
              <h1 id="intro-card-name">Ridho A. Utama</h1>
              <p>Applied GIS</p>
            </div>
            <a className="intro-card-email" href="mailto:rydhxx@gmail.com" aria-label="Email Ridho">
              <img src={emailIcon} alt="" />
              <span aria-hidden="true" />
            </a>
          </section>
          <section className="intro-card-stats" aria-label="Statistik profil">
            <div><Star size={20} /><span><strong>4.9</strong><small>Rating</small></span></div>
            <div><Flag size={20} /><span><strong>$10</strong><small>Hours</small></span></div>
            <div><Clock3 size={20} /><span><strong>24h</strong><small>Weekly</small></span></div>
          </section>
          <div className="intro-card-actions">
            <button type="button" className="intro-card-enter" onClick={onEnter} disabled={isEntering}>
              {isEntering ? 'Opening portfolio…' : 'Explore portfolio'}
            </button>
            <button
              type="button"
              className="intro-card-chat"
              aria-label="Buka chatbot Ridho"
              onClick={onOpenChat}
            >
              <MessageCircle size={22} />
            </button>
          </div>
        </div>
      </article>
      <div className="intro-transition-backdrop" aria-hidden="true">
        <div className="intro-transition-door intro-transition-door--left" />
        <div className="intro-transition-door intro-transition-door--right" />
      </div>
    </main>
  )
}

function HeroVideoBackground() {
  const backdropRef = useRef(null)
  const videoRef = useRef(null)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [videoReady, setVideoReady] = useState(false)

  useEffect(() => {
    const backdrop = backdropRef.current
    if (!backdrop) return undefined

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const mobileViewport = window.matchMedia('(max-width: 760px)')
    let isNearViewport = false

    const updateVideoEligibility = () => {
      const isEligible = !motionPreference.matches && !mobileViewport.matches
      if (isEligible && isNearViewport) setShouldLoadVideo(true)
      if (!isEligible) setShouldLoadVideo(false)
      setShouldPlayVideo(isEligible && isNearViewport)
    }
    const observer = new IntersectionObserver(([entry]) => {
      isNearViewport = entry.isIntersecting
      updateVideoEligibility()
    })

    observer.observe(backdrop)
    motionPreference.addEventListener('change', updateVideoEligibility)
    mobileViewport.addEventListener('change', updateVideoEligibility)

    return () => {
      observer.disconnect()
      motionPreference.removeEventListener('change', updateVideoEligibility)
      mobileViewport.removeEventListener('change', updateVideoEligibility)
    }
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (!shouldPlayVideo) {
      video.pause()
      return
    }

    video.play().catch((error) => {
      if (error.name !== 'AbortError') setVideoFailed(true)
    })
  }, [shouldLoadVideo, shouldPlayVideo])

  return (
    <div
      className={`hero-video-backdrop${videoReady ? ' is-ready' : ''}`}
      ref={backdropRef}
      aria-hidden="true"
    >
      <img
        className="hero-video-poster"
        src={`${publicBase}media/hero-background-poster.webp`}
        alt=""
        fetchPriority="high"
        decoding="async"
      />
      {shouldLoadVideo && !videoFailed && (
        <video
          className="hero-background-video"
          ref={videoRef}
          src={`${publicBase}media/hero-background.mp4`}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
        />
      )}
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hasEnteredPortfolio, setHasEnteredPortfolio] = useState(false)
  const [isEnteringPortfolio, setIsEnteringPortfolio] = useState(false)
  const [isHeaderCompact, setIsHeaderCompact] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const transitionTimeoutRef = useRef(null)
  const portfolioRef = useRef(null)

  const closeMenu = () => setMenuOpen(false)

  useEffect(() => () => window.clearTimeout(transitionTimeoutRef.current), [])

  useEffect(() => {
    if (!hasEnteredPortfolio) return undefined

    let frame = 0
    const sections = journeySections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)
    const updateHeader = () => {
      setIsHeaderCompact((compact) => {
        const nextCompact = window.scrollY > 48
        return compact === nextCompact ? compact : nextCompact
      })
      const readingLine = window.innerHeight * 0.36
      const active = sections.reduce(
        (current, section) => (section.getBoundingClientRect().top <= readingLine ? section : current),
        sections[0],
      )
      if (active) setActiveSection(active.id)
      frame = 0
    }
    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateHeader)
    }

    updateHeader()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [hasEnteredPortfolio])

  useEffect(() => {
    if (!hasEnteredPortfolio || !portfolioRef.current) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const restoreSplitHeadings = []
    const context = gsap.context(() => {
      gsap.fromTo(
        '.site-header',
        { y: -18 },
        { y: 0, duration: 0.75, ease: 'power3.out' },
      )

    const headings = gsap.utils.toArray('[data-word-reveal]')
      headings.forEach((heading) => {
        restoreSplitHeadings.push(splitHeadingIntoWords(heading))
      })

      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        const words = element.querySelectorAll('.motion-word')
        if (words.length) {
          gsap.fromTo(
            words,
            { yPercent: 115, rotate: 2, autoAlpha: 0 },
            {
              yPercent: 0,
              rotate: 0,
              autoAlpha: 1,
              duration: 0.9,
              stagger: 0.035,
              ease: 'power4.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 86%',
                once: true,
              },
            },
          )
          const companionTargets = [...new Set([
            ...element.children,
            ...element.querySelectorAll(
              '.eyebrow, .section-note, .hero-overline, .hero-description, .hero-actions, .hero-meta, .intro-body, .spatial-atlas-copy > p:not(.eyebrow)',
            ),
          ])].filter((target) => !target.querySelector('.motion-word'))

          if (companionTargets.length) {
            gsap.fromTo(
              companionTargets,
              { autoAlpha: 0, y: 18 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.7,
                stagger: 0.09,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: element,
                  start: 'top 86%',
                  once: true,
                },
              },
            )
          }
        } else {
          gsap.fromTo(
            element,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.85,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: element,
                start: 'top 88%',
                once: true,
              },
            },
          )
        }
      })

      gsap.utils.toArray('.education-strip, .leadership-strip').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 24, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
              once: true,
            },
          },
        )
      })

      gsap.utils.toArray('.project-card').forEach((card, index) => {
        const image = card.querySelector('.project-poster')
        if (image) {
          gsap.fromTo(
            image,
            { clipPath: 'inset(9% 7% 9% 7%)', scale: 1.12 },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              scale: 1,
              duration: 1.15,
              delay: index * 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 84%',
                once: true,
              },
            },
          )
        }
      })

      gsap.utils.toArray('.experience-item').forEach((item, index) => {
        gsap.fromTo(
          item,
          { autoAlpha: 0, x: -24 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.65,
            delay: (index % 3) * 0.08,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 91%',
              once: true,
            },
          },
        )
      })

      gsap.fromTo(
        '.skills-grid .skill-card',
        { autoAlpha: 0, y: 34, rotateX: -5, transformOrigin: '50% 100%' },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 84%',
            once: true,
          },
        },
      )

      gsap.fromTo(
        '.atlas-globe',
        { rotate: -13, scale: 0.88 },
        {
          rotate: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.spatial-atlas',
            start: 'top bottom',
            end: 'center center',
            scrub: 1,
          },
        },
      )

      gsap.utils.toArray('[data-cinematic-section]').forEach((section, index) => {
        if (index === 0) return

        const seam = section.querySelector('.section-seam')
        const direction = index % 2 === 0 ? 1 : -1

        if (seam) {
          gsap.fromTo(
            seam,
            {
              scaleX: 0.08,
              autoAlpha: 0.3,
              transformOrigin: direction > 0 ? 'left center' : 'right center',
            },
            {
              scaleX: 1,
              autoAlpha: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top 92%',
                end: 'top 46%',
                scrub: 0.7,
              },
            },
          )
        }
      })

      gsap.utils.toArray('.section-heading').forEach((heading) => {
        const line = heading.querySelector('.section-transition-line')
        if (!line) return

        gsap.fromTo(
          line,
          { scaleX: 0, transformOrigin: 'left center' },
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: heading,
              start: 'top 84%',
              once: true,
            },
          },
        )
      })

      gsap.fromTo(
        '.page-scroll-progress',
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: portfolioRef.current,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.25,
          },
        },
      )

      window.requestAnimationFrame(() => ScrollTrigger.refresh())
    }, portfolioRef)

    return () => {
      context.revert()
      restoreSplitHeadings.forEach((restoreHeading) => restoreHeading())
    }
  }, [hasEnteredPortfolio])

  const enterPortfolio = () => {
    if (isEnteringPortfolio) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHasEnteredPortfolio(true)
      return
    }

    setIsEnteringPortfolio(true)
    transitionTimeoutRef.current = window.setTimeout(() => {
      setHasEnteredPortfolio(true)
      setIsEnteringPortfolio(false)
      window.scrollTo({ top: 0, behavior: 'auto' })
    }, 2250)
  }

  return (
    <>
    <Suspense fallback={null}>
      <SpatialCanvas />
    </Suspense>
    {!hasEnteredPortfolio && (
      <IntroGateway
        isEntering={isEnteringPortfolio}
        onEnter={enterPortfolio}
        onOpenChat={() => document.dispatchEvent(new Event('portfolio-chat-open'))}
      />
    )}
    {hasEnteredPortfolio && (
    <div className="site-shell min-h-screen" ref={portfolioRef}>
      <div className="page-scroll-progress" aria-hidden="true" />
      <SpatialScanner />
      <header className={`site-header${isHeaderCompact ? ' is-compact' : ''}`}>
        <a className="brand" href="#home" aria-label="Ridho Alif Utama, ke beranda" onClick={closeMenu}>
          <span>ridho<span className="brand-dot">.</span></span>
        </a>
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navigasi utama">
          <a href="#tentang" aria-current={activeSection === 'tentang' ? 'location' : undefined} onClick={closeMenu}>Tentang</a>
          <a href="#proyek" aria-current={activeSection === 'proyek' ? 'location' : undefined} onClick={closeMenu}>Proyek</a>
          <a href="#pengalaman" aria-current={activeSection === 'pengalaman' ? 'location' : undefined} onClick={closeMenu}>Pengalaman</a>
          <a href="#keahlian" aria-current={activeSection === 'keahlian' ? 'location' : undefined} onClick={closeMenu}>Keahlian</a>
          <a className="nav-contact" href="mailto:rydhxx@gmail.com" onClick={closeMenu}>
            Mari terhubung <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>

      <main>
        <section
          className="hero-section"
          id="home"
          data-cinematic-section
        >
          <HeroVideoBackground />
          <span className="section-seam" aria-hidden="true" />
          <div className="hero-copy" data-reveal>
            <h1 data-word-reveal>
              Peta yang baik
              <br />
              membuat kita
              <br />
              <span>melihat lebih jauh.</span>
            </h1>
            <p className="hero-description">
              Saya Ridho, mahasiswa GIS, geostatistisi, dan desainer visual. Saya merangkai data spasial menjadi insight yang jernih dan bermakna.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#proyek">
                Jelajahi karya
              </a>
            </div>
          </div>
        </section>

        <DisciplineMarquee />

        <section
          className="intro-section content-section"
          id="tentang"
          data-cinematic-section
        >
          <span className="section-seam" aria-hidden="true" />
          <div className="intro-kicker">
            <span className="section-index">01 / PROFIL</span>
            <span className="kicker-line" />
            <span>DATA MEETS DESIGN</span>
          </div>
          <div className="intro-grid" data-reveal>
            <h2 data-word-reveal>Ruang, data,<br />dan <span>perspektif baru.</span></h2>
            <div className="intro-body">
              <p>
                Berangkat dari Geografi dan Pemetaan di <strong>Universitas Gadjah Mada</strong>, saya tertarik pada satu pertanyaan: bagaimana data yang kompleks bisa bercerita dengan sederhana?
              </p>
              <p>
                Saya menggabungkan analisis geospasial, remote sensing, dan desain visual dari memetakan suhu perkotaan hingga mencari lokasi yang paling potensial. Di luar peta, saya senang bekerja bersama tim kreatif, berlatih Taekwondo, dan menghabiskan waktu dengan kucing.
              </p>
              <a className="inline-link" href="#pengalaman">Kenali perjalanan saya <ArrowDownRight size={15} /></a>
            </div>
          </div>
          <div className="stats-row" data-reveal>
            <div className="stat-item">
              <strong>GIS<span>.</span></strong>
              <span>Fokus studi · UGM</span>
            </div>
            <div className="stat-item">
              <strong>1<sup>st</sup></strong>
              <span>Dan · Kukkiwon Taekwondo</span>
            </div>
            <div className="stat-item">
              <strong>3<span>×</span></strong>
              <span>Data · Design · Delivery</span>
            </div>
            <div className="stat-note">
              <span className="stat-note-icon"><MoveUpRight size={16} /></span>
              <span>Berpikir lintas disiplin.<br />Berkarya dengan tujuan.</span>
            </div>
          </div>
        </section>

        <section
          className="projects-section content-section"
          id="proyek"
          data-cinematic-section
        >
          <span className="section-seam" aria-hidden="true" />
          <SectionHeading
            eyebrow="02 / PILIHAN KARYA"
            title={<>Dari koordinat<br />menjadi <span>kemungkinan.</span></>}
            note="Dua eksplorasi yang mempertemukan analisis, konteks, dan cara bercerita melalui peta."
          />
          <div className="project-grid" data-reveal>
            {projects.map((project) => (
              <a
                className="project-card project-card-link"
                key={project.number}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Buka proyek ${project.title} di tab baru`}
                onPointerMove={handleProjectPointerMove}
                onPointerLeave={resetProjectTilt}
              >
                <ProjectVisual variant={project.variant} />
                <div className="project-details">
                  <div className="project-kicker">
                    <span>{project.category}</span>
                    <span>{project.number}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p className="project-location"><MapPin size={13} /> {project.location}</p>
                  <p className="project-description">{project.description}</p>
                  <div className="project-bottom">
                    <div className="tag-list">
                      {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
                    </div>
                    <span className="project-arrow" aria-hidden="true"><ArrowUpRight size={17} /></span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <SpatialAtlas />

        <section
          className="experience-section"
          id="pengalaman"
          data-cinematic-section
        >
          <span className="section-seam" aria-hidden="true" />
          <div className="content-section experience-inner">
            <SectionHeading
              eyebrow="03 / PENGALAMAN"
              title={<>Belajar dengan<br /><span>mengerjakan.</span></>}
              note="Perspektif lintas industri membentuk cara saya memahami masalah dan bekerja bersama orang lain."
            />
            <div
              className="experience-timeline"
              data-reveal
              role="region"
              aria-label="Linimasa pengalaman kerja, geser horizontal untuk melihat semuanya"
              tabIndex={0}
            >
              <svg className="experience-route" viewBox="0 0 2080 560" preserveAspectRatio="none" aria-hidden="true">
                <path d="M160 240H1884Q1920 240 1920 276V284Q1920 320 1884 320H512" />
              </svg>
              <div className="experience-list">
                {experiences.map((item, index) => (
                  <article
                    className={`experience-item${item.current ? ' is-current' : ''}`}
                    key={`${item.organization}-${item.role}`}
                    style={{
                      gridRow: index < 6 ? 1 : 2,
                      gridColumn: index < 6 ? index + 1 : 12 - index,
                    }}
                  >
                    <div className="experience-period">
                      {item.current && <span className="current-dot" />}
                      {item.period}
                    </div>
                    <span className="experience-index">{String(index + 1).padStart(2, '0')}</span>
                    <div className="experience-main">
                      <span className="experience-role">{item.role}</span>
                      <h3>{item.organization}</h3>
                      <p>{item.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            <div className="education-strip">
              <div className="education-icon"><Compass size={18} /></div>
              <div>
                <span>PENDIDIKAN SAAT INI</span>
                <strong>Universitas Gadjah Mada <i>·</i> Applied Bachelor of Geographic Information System</strong>
              </div>
              <span className="education-year">2023 — SEKARANG</span>
            </div>
            <div className="leadership-strip">
              <span className="leadership-label">LEADERSHIP & COMMUNITY</span>
              <div>
                <span><strong>Sekretaris Jenderal</strong> · Keluarga Mahasiswa DTK SV UGM</span>
                <span><strong>Kepala Divisi Eksternal</strong> · STARGIS UGM</span>
                <span><strong>Dirjen Media & Propaganda</strong> · BEM KM UGM</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="skills-section content-section"
          id="keahlian"
          data-cinematic-section
        >
          <span className="section-seam" aria-hidden="true" />
          <SectionHeading
            eyebrow="04 / KEAHLIAN"
            title={<>Satu toolkit,<br /><span>banyak sudut pandang.</span></>}
          />
          <div className="skills-grid">
            {capabilities.map(({ icon: Icon, title, detail }, index) => (
              <article className="skill-card" key={title}>
                <div className="skill-card-top">
                  <span className="skill-icon"><Icon size={18} strokeWidth={1.6} /></span>
                  <span className="skill-index">0{index + 1}</span>
                </div>
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
          <div className="skills-language" data-reveal>
            <span>TOOLS I REACH FOR</span>
            <div>
              {['QGIS', 'ArcGIS Engine', 'MapLibre', 'Python', 'Photoshop', 'Illustrator', 'Microsoft Office'].map((tool) => (
                <span className="tool-chip" key={tool}>{tool}</span>
              ))}
            </div>
          </div>
          <div className="language-row" data-reveal>
            <span>LANGUAGES</span>
            <p><strong>Bahasa Indonesia</strong> · Native <i /> <strong>English</strong> · Professional</p>
          </div>
          <a
            className="publication-card"
            data-reveal
            href="https://doi.org/10.13140/RG.2.2.30434.24006"
            target="_blank"
            rel="noreferrer"
          >
            <span className="publication-icon"><BookOpen size={17} /></span>
            <span className="publication-copy">
              <span>PUBLICATION · 2024</span>
              <strong>Classification of Land Use Change in West Manggarai, 2020–2024</strong>
              <span>Supervised maximum likelihood method · DOI: 10.13140/RG.2.2.30434.24006</span>
            </span>
            <ExternalLink size={15} className="publication-arrow" />
          </a>
        </section>

        <section
          className="contact-section"
          id="kontak"
          data-cinematic-section
        >
          <span className="section-seam" aria-hidden="true" />
          <div className="contact-orbit orbit-a" />
          <div className="contact-orbit orbit-b" />
          <div className="contact-content" data-reveal>
            <span className="contact-eyebrow"><span className="availability-dot" /> OPEN TO MEANINGFUL COLLABORATION</span>
            <h2 data-word-reveal>Ada ide yang<br /><span>ingin dipetakan?</span></h2>
            <p>Mari ngobrol tentang geospasial, desain, atau proyek berikutnya.</p>
            <a className="button button-lime" href="mailto:rydhxx@gmail.com">
              Kirim email <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="contact-coordinate">JAKARTA · 6°12&apos; S</div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home">
          <span>ridho<span className="brand-dot">.</span></span>
        </a>
        <span className="footer-note">Dibuat dengan rasa ingin tahu & data yang bermakna.</span>
        <div className="footer-links">
          <a href="mailto:rydhxx@gmail.com" aria-label="Email Ridho"><ExternalLink size={14} /> Email</a>
          <a href="https://x.com/rydhx" target="_blank" rel="noreferrer" aria-label="X @rydhx"><AtSign size={14} /> @rydhx</a>
          <span>© {currentYear} Ridho Alif Utama</span>
        </div>
      </footer>
    </div>
    )}
    <PortfolioChat />
    </>
  )
}

export default App

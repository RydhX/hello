import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  AtSign,
  BarChart3,
  BookOpen,
  Compass,
  ExternalLink,
  Layers3,
  LoaderCircle,
  MapPin,
  MessageCircle,
  Menu,
  MoveUpRight,
  PenTool,
  ScanLine,
  Send,
  X,
} from 'lucide-react'
import './App.css'

const OpportunityChart = lazy(() => import('./OpportunityChart.jsx'))
const currentYear = new Date().getFullYear()
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
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {note && <p className="section-note">{note}</p>}
    </div>
  )
}

function MapIllustration() {
  return (
    <svg
      className="map-illustration"
      viewBox="0 0 520 340"
      role="img"
      aria-label="Ilustrasi peta analisis spasial berbentuk heksagon"
    >
      <defs>
        <pattern id="map-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0H0V30" fill="none" stroke="#bdbdbd" strokeOpacity=".12" />
        </pattern>
        <pattern id="hex-pattern" width="48" height="42" patternUnits="userSpaceOnUse">
          <path
            d="M12 1 24 8v14l-12 7L0 22V8zM36 22l12 7v14l-12 7-12-7V29z"
            fill="none"
            stroke="#a9a9a9"
            strokeOpacity=".2"
            strokeWidth="1"
          />
        </pattern>
        <linearGradient id="map-wash" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#ff6500" stopOpacity=".42" />
          <stop offset="1" stopColor="#b8b8b8" stopOpacity=".08" />
        </linearGradient>
      </defs>
      <rect width="520" height="340" fill="url(#map-grid)" />
      <path
        d="M93 39 158 26l42 19 43-6 28 24 60-4 42 28-14 40 22 37-29 31 8 40-45 21-38-11-40 24-37-15-28 15-37-26-52-6 9-44-21-26 20-38-15-40 29-19z"
        fill="url(#map-wash)"
        stroke="#ff7900"
        strokeOpacity=".65"
        strokeWidth="1.5"
      />
      <path
        d="M93 39 158 26l42 19 43-6 28 24 60-4 42 28-14 40 22 37-29 31 8 40-45 21-38-11-40 24-37-15-28 15-37-26-52-6 9-44-21-26 20-38-15-40 29-19z"
        fill="url(#hex-pattern)"
      />
      <path d="M68 113c57 21 91-25 143-2s88 46 154 12" fill="none" stroke="#929292" strokeOpacity=".35" strokeWidth="1" />
      <path d="M73 221c48-35 93 9 139-22s99-37 153-9" fill="none" stroke="#929292" strokeOpacity=".3" strokeWidth="1" />
      <path d="M149 49c-2 57 29 92 14 150s18 75 13 111M249 53c15 42-7 80 20 119s-1 75 11 124M339 86c-23 41-9 68-30 105s8 62-2 98" fill="none" stroke="#929292" strokeOpacity=".24" strokeWidth="1" />
      <path d="M127 218c60-80 95 39 151-38s84-17 127-77" fill="none" stroke="#ff7900" strokeDasharray="4 6" strokeWidth="2" />
      {[
        [127, 218],
        [278, 180],
        [405, 103],
      ].map(([cx, cy], index) => (
        <g key={cx}>
          <circle cx={cx} cy={cy} r="12" fill="#ff7900" fillOpacity=".16" />
          <circle cx={cx} cy={cy} r="4" fill="#ff7900" />
          <text x={cx + 11} y={cy - 10} fill="#e2e2e2" fontSize="9" fontFamily="monospace">
            0{index + 1}
          </text>
        </g>
      ))}
      <text x="18" y="24" fill="#a5a5a5" fontSize="9" letterSpacing="2" fontFamily="monospace">
        SPATIAL LAYER / JAKARTA SELATAN
      </text>
    </svg>
  )
}

function ProjectVisual({ variant }) {
  const poster = variant === 'coffee'
    ? {
        src: '/posters/blue-ocean.png',
        alt: 'Poster peta sebaran lokasi Blue Ocean dan analisis VIKOR',
      }
    : {
        src: '/posters/uhi-yogyakarta.jpg',
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
                  <LoaderCircle size={18} />
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
              disabled={isSending || !input.trim()}
            >
              {isSending ? <LoaderCircle size={20} /> : <Send size={20} />}
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
    <div className="site-shell min-h-screen">
      <header className="site-header">
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
          <a href="#tentang" onClick={closeMenu}>Tentang</a>
          <a href="#proyek" onClick={closeMenu}>Proyek</a>
          <a href="#pengalaman" onClick={closeMenu}>Pengalaman</a>
          <a href="#keahlian" onClick={closeMenu}>Keahlian</a>
          <a className="nav-contact" href="mailto:rydhxx@gmail.com" onClick={closeMenu}>
            Mari terhubung <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-copy">
            <h1>
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
                Jelajahi karya <ArrowRight size={16} />
              </a>
              <a className="text-link" href="mailto:rydhxx@gmail.com">
                Hubungi saya <ArrowUpRight size={15} />
              </a>
            </div>
            <div className="hero-meta">
              <span><MapPin size={14} /> Jakarta, Indonesia</span>
              <span className="meta-divider" />
              <span>Universitas Gadjah Mada</span>
            </div>
          </div>

          <div className="hero-art">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="dashboard-card">
              <div className="dashboard-header">
                <div className="dashboard-title">
                  <span className="dashboard-icon"><Compass size={15} /></span>
                  <div>
                    <strong>Spatial intelligence</strong>
                    <span>CONCEPT VISUALIZATION</span>
                  </div>
                </div>
                <span className="dashboard-menu">•••</span>
              </div>
              <div className="dashboard-map">
                <MapIllustration />
                <span className="map-coordinate coordinate-a">6°12&apos; S</span>
                <span className="map-coordinate coordinate-b">106°48&apos; E</span>
              </div>
              <div className="dashboard-chart-head">
                <div>
                  <span>OPPORTUNITY INDEX</span>
                  <strong>Analisis lokasi <i>↗</i></strong>
                </div>
                <span className="chart-period">AREA 01—07</span>
              </div>
              <div className="chart-wrap">
                <Suspense fallback={<div className="chart-loading" aria-label="Memuat visualisasi" />}>
                  <OpportunityChart />
                </Suspense>
              </div>
              <div className="chart-footnote">
                <span><i className="legend-dot lime" /> Skor relatif</span>
                <span>Ilustrasi, bukan data aktual</span>
              </div>
            </div>
          </div>
          <a className="scroll-cue" href="#tentang" aria-label="Gulir ke bagian tentang saya">
            <ArrowDown size={15} /> <span>SCROLL TO EXPLORE</span>
          </a>
        </section>

        <section className="intro-section content-section" id="tentang">
          <div className="intro-kicker">
            <span className="section-index">01 / PROFIL</span>
            <span className="kicker-line" />
            <span>DATA MEETS DESIGN</span>
          </div>
          <div className="intro-grid">
            <h2>Ruang, data,<br />dan <span>perspektif baru.</span></h2>
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
          <div className="stats-row">
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

        <section className="projects-section content-section" id="proyek">
          <SectionHeading
            eyebrow="02 / PILIHAN KARYA"
            title={<>Dari koordinat<br />menjadi <span>kemungkinan.</span></>}
            note="Dua eksplorasi yang mempertemukan analisis, konteks, dan cara bercerita melalui peta."
          />
          <div className="project-grid">
            {projects.map((project) => (
              <a
                className="project-card project-card-link"
                key={project.number}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Buka proyek ${project.title} di tab baru`}
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
          <p className="project-footnote">
            <span className="footnote-mark">↗</span>
            Poster menampilkan visualisasi dari proyek analisis spasial saya.
          </p>
        </section>

        <section className="experience-section" id="pengalaman">
          <div className="content-section experience-inner">
            <SectionHeading
              eyebrow="03 / PENGALAMAN"
              title={<>Belajar dengan<br /><span>mengerjakan.</span></>}
              note="Perspektif lintas industri membentuk cara saya memahami masalah dan bekerja bersama orang lain."
            />
            <div className="experience-list">
              {experiences.map((item, index) => (
                <article className="experience-item" key={`${item.organization}-${item.role}`}>
                  <div className="experience-period">
                    {item.current && <span className="current-dot" />}
                    {item.period}
                  </div>
                  <div className="experience-main">
                    <span className="experience-role">{item.role}</span>
                    <h3>{item.organization}</h3>
                    <p>{item.description}</p>
                  </div>
                  <span className="experience-index">{String(index + 1).padStart(2, '0')}</span>
                </article>
              ))}
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

        <section className="skills-section content-section" id="keahlian">
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
          <div className="skills-language">
            <span>TOOLS I REACH FOR</span>
            <div>
              {['QGIS', 'ArcGIS Engine', 'MapLibre', 'Python', 'Photoshop', 'Illustrator', 'Microsoft Office'].map((tool) => (
                <span className="tool-chip" key={tool}>{tool}</span>
              ))}
            </div>
          </div>
          <div className="language-row">
            <span>LANGUAGES</span>
            <p><strong>Bahasa Indonesia</strong> · Native <i /> <strong>English</strong> · Professional</p>
          </div>
          <a
            className="publication-card"
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

        <section className="contact-section">
          <div className="contact-orbit orbit-a" />
          <div className="contact-orbit orbit-b" />
          <div className="contact-content">
            <span className="contact-eyebrow"><span className="availability-dot" /> OPEN TO MEANINGFUL COLLABORATION</span>
            <h2>Ada ide yang<br /><span>ingin dipetakan?</span></h2>
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
    <PortfolioChat />
    </>
  )
}

export default App

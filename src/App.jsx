import { Component, useEffect, useState } from 'react'
import { NeuroNoise } from '@paper-design/shaders-react'
import { buildEnquiryMailto, CONTACT_EMAIL } from './contact.js'
import { getResolvedTheme, toggleTheme } from './theme.js'

const ARCHITECTURE_SOCIAL_URL = 'https://architecturesocial.com/'
const PODCAST_URL = 'https://architecturesocial.com/podcast'
const LINKEDIN_URL = 'https://www.linkedin.com/in/stephendrew/'
const PRIVACY_URL = 'https://architecturesocial.com/privacy'

const methodRows = [
  ['Find the constraint', 'Map the work, evidence the friction and agree the one outcome that matters.'],
  ['Design one system', 'Build around how your agency actually operates, not a generic demo.'],
  ['Connect the stack', 'Make the ATS, CRM, data and surrounding processes behave coherently.'],
  ['Leave capability', 'Train the team, document the system and make ownership and recovery explicit.'],
]

const throughLineRows = [
  ['Architecture', 'Part I at the University of Westminster and Part II at Manchester School of Architecture, followed by work in practice as a Part II Architectural Assistant.', 'turquoise'],
  ['Recruitment', 'Moved into specialist recruitment, combining knowledge of the profession with a direct approach to careers and hiring.', 'tiger'],
  ['Architecture Social', 'Founded and now directs Architecture Social, connecting people, practices and projects through specialist recruitment, community, content and conversation.', 'turquoise'],
  ['Practical AI', 'Built and tested internal processes in the live business, then began advising other recruitment agencies on the parts worth improving.', 'tiger'],
]

function ThemeToggle() {
  const [theme, setTheme] = useState(getResolvedTheme)

  function handleToggle() {
    setTheme(toggleTheme())
  }

  return (
    <button className="theme-toggle" type="button" onClick={handleToggle} aria-pressed={theme === 'light'} aria-label={`Use ${theme === 'dark' ? 'light' : 'dark'} theme`}>
      <span className="theme-toggle__label">Theme</span>
      <span className="theme-toggle__mark" aria-hidden="true">{theme === 'dark' ? '◐' : '◑'}</span>
    </button>
  )
}

function supportsWebGL() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

function shouldUseStaticShader() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    || document.documentElement.dataset.a11yMotion === 'on'
    || !supportsWebGL()
}

function StaticShader() {
  return <img className="shader-field__fallback" src="/images/neuro-noise-static.png" alt="" width="1440" height="900" />
}

class ShaderErrorBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

function ShaderField() {
  const [useStaticShader, setUseStaticShader] = useState(shouldUseStaticShader)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setUseStaticShader(query.matches || document.documentElement.dataset.a11yMotion === 'on' || !supportsWebGL())
    const observer = new MutationObserver(update)
    update()
    query.addEventListener('change', update)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-a11y-motion'] })
    return () => {
      query.removeEventListener('change', update)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="shader-field" aria-hidden="true">
      {useStaticShader ? <StaticShader /> : (
        <ShaderErrorBoundary fallback={<StaticShader />}>
          <NeuroNoise
            width={690}
            height={370}
            colorBack="#161616"
            colorMid="#5ADBC5"
            colorFront="#E6E6E6"
            brightness={0.14}
            contrast={0.55}
            speed={0.08}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </ShaderErrorBoundary>
      )}
    </div>
  )
}

function ExternalLink({ className = '', href, children }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand-lockup" href="#top" aria-label="Stephen Drew home">
        <span className="brand-mark" aria-hidden="true">SD</span>
        <span className="brand-copy"><strong>Stephen Drew</strong><small>Founder &amp; Director</small></span>
      </a>
      <nav className="site-nav" aria-label="Primary navigation">
        <a href="#architecture">Architecture</a>
        <a href="#consulting">AI consulting</a>
        <a className="nav-about" href="#about">About</a>
        <a className="nav-contact" href="#contact">Contact</a>
        <ThemeToggle />
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <p className="eyebrow hero__eyebrow"><span className="copy-desktop">Founder &amp; Director, Architecture Social · FRSA · MREC</span><span className="copy-compact">Founder &amp; Director · FRSA · MREC</span></p>
      <div className="hero__grid">
        <div className="hero__copy">
          <h1 id="hero-title">Architecture.<br />Recruitment.<br />Systems that work.</h1>
          <p className="hero__lead">I’m Stephen Drew, Founder &amp; Director of Architecture Social. Half of this practice is about architecture, people and the built environment. The other half helps recruitment businesses turn messy processes into working systems.</p>
          <div className="hero__actions">
            <ExternalLink className="button button--chartreuse" href={ARCHITECTURE_SOCIAL_URL}>Explore Architecture Social</ExternalLink>
            <a className="button button--outline" href="#consulting">AI consulting for recruitment businesses</a>
          </div>
        </div>
        <figure className="portrait">
          <img src="/images/stephen-drew.jpg" alt="Stephen Drew smiling in a blue checked shirt" width="800" height="800" />
          <figcaption><span className="desktop-caption">Founder &amp; Director, Architecture Social</span><span className="compact-caption">Founder &amp; Director</span><span>London · UK</span></figcaption>
        </figure>
      </div>
      <div className="hero__foot">
        <p>One founder practice. Two fields. The same instinct: make complicated systems useful.</p>
        <a href="#fields">Scroll to explore ↓</a>
      </div>
    </section>
  )
}

function FieldCard({ className, eyebrow, title, body, href, children, external = false }) {
  const link = external ? <ExternalLink href={href}>{children}</ExternalLink> : <a href={href}>{children}</a>
  return (
    <article className={`field-card ${className}`}>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
      {link}
    </article>
  )
}

function Fields() {
  return (
    <section className="fields" id="fields" aria-labelledby="fields-title">
      <div className="fields__heading">
        <div><p className="eyebrow">Choose a field</p><h2 id="fields-title">Equal weight.<br />Shared method.</h2></div>
        <p>Two routes into the same founder practice.</p>
      </div>
      <div className="fields__cards">
        <FieldCard className="field-card--architecture" eyebrow="01 / Architecture Social" title="Architecture, careers and culture." body="Careers, community and conversation for architecture and the built environment." href={ARCHITECTURE_SOCIAL_URL} external>Enter Architecture Social ↗</FieldCard>
        <FieldCard className="field-card--systems" eyebrow="02 / Recruitment systems" title="Recruitment systems that work." body="Find the constraint, redesign one workflow and leave ownership with the team." href="#enquiry">Bring me the messy process ↗</FieldCard>
      </div>
    </section>
  )
}

function ArchitectureChapter() {
  const cards = [
    { className: 'architecture-card--turquoise', label: '01 / Careers', title: 'Architecture Social', body: 'Careers, hiring and an open professional community for architecture and the built environment.', href: ARCHITECTURE_SOCIAL_URL, action: 'Visit the platform ↗' },
    { className: 'architecture-card--yale', label: '02 / Podcast', title: 'Long-form conversations', desktopTitle: 'Architecture Social Podcast', body: 'Conversations with people shaping architecture, careers, culture and practice.', href: PODCAST_URL, action: 'Listen to the podcast ↗' },
    { className: 'architecture-card--tiger', label: '03 / Education', title: 'Education and advocacy', body: 'Mentoring, guest teaching and practical support for students and emerging professionals.', href: LINKEDIN_URL, action: 'See the work ↗' },
  ]
  return (
    <section className="architecture" id="architecture" aria-labelledby="architecture-title">
      <div className="chapter-heading">
        <p className="eyebrow">Architecture</p>
        <div><h2 id="architecture-title">A profession is a network of people, practice and place.</h2><p className="chapter-intro"><span className="copy-desktop">I trained and worked in architecture before moving into recruitment. I never left the profession behind. Architecture Social is the expression of that background: specialist recruitment, an open professional community, and a body of conversations about how architecture is made and experienced.</span><span className="copy-compact">I trained and worked in architecture before moving into recruitment. Architecture Social is the expression of that background: specialist recruitment, an open professional community, and conversations about how architecture is made and experienced.</span></p></div>
      </div>
      <div className="architecture__cards">
        {cards.map((card) => (
          <article className={`architecture-card ${card.className}`} key={card.label}>
            <p className="eyebrow architecture-card__label">{card.label}</p>
            <div><h3><span className={card.desktopTitle ? 'copy-compact' : ''}>{card.title}</span>{card.desktopTitle ? <span className="copy-desktop">{card.desktopTitle}</span> : null}</h3><p>{card.body}</p></div>
            <ExternalLink href={card.href}>{card.action}</ExternalLink>
          </article>
        ))}
      </div>
    </section>
  )
}

function ConsultingChapter() {
  return (
    <section className="consulting" id="consulting" aria-labelledby="consulting-title">
      <div className="chapter-heading chapter-heading--dark">
        <p className="eyebrow">Recruitment systems</p>
        <div><h2 id="consulting-title">One broken workflow is worth more than fifty AI ideas.</h2><p className="chapter-intro">The offer comes from inside a working recruitment business. I have built processes, automations and AI-enabled workflows at Architecture Social to solve real operational problems, then helped other agencies improve theirs.</p></div>
      </div>
      <ol className="method-list">
        {methodRows.map(([title, body], index) => <li key={title}><strong><span className="method-index">0{index + 1} / </span>{title}</strong><span>{body}</span></li>)}
      </ol>
      <a className="button button--yale consulting__button" href="#enquiry">Start with one workflow ↗</a>
    </section>
  )
}

function ShaderChapter() {
  return (
    <section className="shader-chapter" aria-labelledby="shader-title">
      <div className="shader-chapter__meta"><p className="eyebrow">System study / Live shader</p><p><span className="copy-desktop">Paper NeuroNoise, translated into a live instrument for the website.</span><span className="copy-compact">Paper NeuroNoise, translated into a live website instrument.</span></p></div>
      <div className="shader-chapter__body">
        <ShaderField />
        <div className="shader-chapter__copy"><h2 id="shader-title">The interesting bit is what the system can now do.</h2><p>Signals overlap, patterns emerge and a noisy process becomes legible. The live field moves slowly and never sits behind copy.</p><small>Contained motion · Reduced-motion safe</small></div>
      </div>
    </section>
  )
}

function ThroughLine() {
  return (
    <section className="through-line" id="about" aria-labelledby="through-line-title">
      <div className="through-line__heading"><p className="eyebrow">The through-line</p><h2 id="through-line-title">Architecture trained the eye. Recruitment supplied the test bench.</h2></div>
      <ol className="timeline">
        {throughLineRows.map(([title, body, colour], index) => <li key={title}><strong className={`text-${colour}`}>{String(index + 1).padStart(2, '0')} / {title}</strong><span>{body}</span></li>)}
      </ol>
    </section>
  )
}

function ContactChoices() {
  return (
    <section className="contact-choices" id="contact" aria-labelledby="contact-title">
      <div className="contact-choices__heading"><p className="eyebrow">Contact</p><h2 id="contact-title">Two fields. Two useful next steps.</h2></div>
      <div className="contact-choices__cards">
        <article><div><h3>Architecture, people and practice</h3><p>Visit Architecture Social for careers, recruitment, community, the podcast and built-environment conversations.</p></div><ExternalLink href={ARCHITECTURE_SOCIAL_URL}>Visit Architecture Social ↗</ExternalLink></article>
        <article><div><h3>AI consulting for recruitment businesses</h3><p>Tell me where your agency loses time, margin or operational clarity. I’ll tell you where a focused engagement could help.</p></div><a href="#enquiry">Start a consulting enquiry ↗</a></article>
      </div>
    </section>
  )
}

function EnquiryForm() {
  const [status, setStatus] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') || '').trim()
    const email = String(data.get('email') || '').trim()
    const business = String(data.get('business') || '').trim()
    const message = String(data.get('message') || '').trim()
    setStatus('If your email app did not open, use the direct address below.')
    window.location.assign(buildEnquiryMailto({ name, email, business, message }))
  }

  return (
    <section className="enquiry" id="enquiry" aria-labelledby="enquiry-title">
      <div className="enquiry__intro"><p className="eyebrow">Start a conversation</p><h2 id="enquiry-title">Bring me the messy process.</h2><p>A short note is enough. I’ll reply with the most useful next step, or tell you plainly if I’m not the right person.</p></div>
      <form className="enquiry-form" onSubmit={handleSubmit}>
        <div className="enquiry-form__pair">
          <label>Name<input name="name" autoComplete="name" required /></label>
          <label>Work email<input name="email" type="email" autoComplete="email" required /></label>
        </div>
        <label>Recruitment business<input name="business" autoComplete="organization" required /></label>
        <label>What feels slow, repetitive or opaque?<textarea name="message" required /></label>
        <button className="button button--chartreuse" type="submit">Send enquiry</button>
        {status ? <p className="enquiry-form__status" aria-live="polite">{status} <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p> : <p className="sr-only" aria-live="polite" />}
      </form>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top"><div><strong>Stephen Drew</strong><span>Founder &amp; Director · Architecture Social</span></div><nav aria-label="Footer navigation"><ExternalLink href={ARCHITECTURE_SOCIAL_URL}>Architecture Social ↗</ExternalLink><ExternalLink href={LINKEDIN_URL}>LinkedIn ↗</ExternalLink><ExternalLink href={PRIVACY_URL}>Privacy</ExternalLink><span>© 2026 Stephen Drew.</span></nav></div>
      <div className="site-footer__bottom"><strong><span className="copy-desktop">Architecture · Recruitment · AI</span><span className="copy-compact">Architecture · Recruitment · Systems</span></strong><span><span className="copy-desktop">Built from architecture, recruitment and real operating work.</span><span className="copy-compact">Built from real operating work.</span></span></div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="page-stage">
      <div className="site-shell">
        <Header />
        <main id="main-content">
          <Hero />
          <Fields />
          <ArchitectureChapter />
          <ConsultingChapter />
          <ShaderChapter />
          <ThroughLine />
          <ContactChoices />
          <EnquiryForm />
        </main>
        <Footer />
      </div>
    </div>
  )
}

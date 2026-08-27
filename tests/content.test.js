import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')
const styles = readFileSync(new URL('../src/styles.css', import.meta.url), 'utf8')
const index = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const vercel = readFileSync(new URL('../vercel.json', import.meta.url), 'utf8')
const robots = readFileSync(new URL('../public/robots.txt', import.meta.url), 'utf8')
const sitemap = readFileSync(new URL('../public/sitemap.xml', import.meta.url), 'utf8')

test('visitor copy contains one H1 and no em dash', () => {
  assert.equal((app.match(/<h1\b/g) || []).length, 1)
  assert.equal(app.includes('—'), false)
})

test('current public identity leads with Founder and Director', () => {
  assert.match(app, /Founder &amp; Director, Architecture Social · FRSA · MREC/)
  assert.match(app, /Founder &amp; Director · FRSA · MREC/)
  assert.match(app, /Founder &amp; Director of Architecture Social/)
  assert.match(index, /Founder &amp; Director of Architecture Social/)
  assert.equal((app.match(/Part II Architectural Assistant/g) || []).length, 1)
})

test('the unverified personal email is absent', () => {
  assert.equal(app.includes('hello@stephendrew.com'), false)
  assert.equal(index.includes('hello@stephendrew.com'), false)
})

test('public launch metadata is indexable and canonical', () => {
  assert.match(index, /<meta name="robots" content="index, follow"/)
  assert.match(index, /<link rel="canonical" href="https:\/\/stephendrew\.com\/"/)
  assert.match(index, /<meta property="og:url" content="https:\/\/stephendrew\.com\/"/)
  assert.match(index, /<meta property="og:image" content="https:\/\/stephendrew\.com\/images\/stephen-drew\.jpg"/)
  assert.doesNotMatch(vercel, /X-Robots-Tag/)
  assert.match(robots, /Allow: \//)
  assert.match(robots, /Sitemap: https:\/\/stephendrew\.com\/sitemap\.xml/)
  assert.match(sitemap, /<loc>https:\/\/stephendrew\.com\/<\/loc>/)
})

test('the responsive shell keeps visible focus and accessible light-theme accents', () => {
  assert.match(styles, /:focus-visible/)
  assert.doesNotMatch(styles, /::focus-visible/)
  assert.match(styles, /--accent-on-canvas: #184574/)
})

test('the approved palette remains exact and the QC correction removes low-contrast substitutes', () => {
  const approvedTokens = [
    '--ink: #161616',
    '--off-white: #e6e6e6',
    '--chartreuse: #e6f421',
    '--turquoise: #5adbc5',
    '--tiger: #ff5a20',
    '--yale: #184574',
  ]

  for (const token of approvedTokens) assert.match(styles, new RegExp(token))
  assert.match(styles, /\.architecture-card--tiger\s*{[^}]*color:\s*var\(--ink\)/s)
  assert.match(styles, /\.text-turquoise,\s*\.text-tiger\s*{[^}]*color:\s*var\(--yale\)/s)
  assert.doesNotMatch(styles, /#237f71|#bd3610/)
})

test('the tablet composition covers the narrow desktop clipping range', () => {
  assert.match(styles, /@media \(max-width: 1360px\)/)
  assert.doesNotMatch(styles, /@media \(max-width: 1024px\)/)
})

test('the mobile restack covers every width below the approved 768px tablet frame', () => {
  assert.match(styles, /@media \(max-width: 767px\)/)
  assert.doesNotMatch(styles, /@media \(max-width: 640px\)/)
})

test('the shader has static reduced-motion and WebGL failure paths', () => {
  assert.match(app, /prefers-reduced-motion: reduce/)
  assert.match(app, /supportsWebGL/)
  assert.match(app, /ShaderErrorBoundary/)
  assert.match(app, /neuro-noise-static\.png/)
})

test('the required full-page section order is present', () => {
  const sections = ['<Header />', '<Hero />', '<Fields />', '<ArchitectureChapter />', '<ConsultingChapter />', '<ShaderChapter />', '<ThroughLine />', '<ContactChoices />', '<EnquiryForm />', '<Footer />']
  let previous = -1
  for (const section of sections) {
    const current = app.lastIndexOf(section)
    assert.ok(current > previous, `${section} is missing or out of order`)
    previous = current
  }
})

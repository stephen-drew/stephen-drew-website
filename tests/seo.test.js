import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const index = readFileSync(new URL('../index.html', import.meta.url), 'utf8')
const generatedSchema = JSON.parse(readFileSync(new URL('../docs/seo/generated-schema.json', import.meta.url), 'utf8'))

function getMetaContent(attribute, value) {
  const pattern = new RegExp(`<meta ${attribute}="${value}" content="([^"]+)"`)
  return index.match(pattern)?.[1] ?? ''
}

test('search title and description are concise, specific and aligned', () => {
  const title = index.match(/<title>([^<]+)<\/title>/)?.[1].replaceAll('&amp;', '&') ?? ''
  const description = getMetaContent('name', 'description').replaceAll('&amp;', '&')

  assert.equal(title, 'Stephen Drew | Founder, Architecture Social & AI Consultant')
  assert.ok(title.length <= 60)
  assert.ok(description.length <= 155)
  assert.match(description, /Architecture Social/)
  assert.match(description, /AI consultant/)
  assert.match(description, /recruitment businesses/)
  assert.doesNotMatch(index, /name="keywords"/i)
})

test('social previews carry the canonical identity and portrait details', () => {
  assert.equal(getMetaContent('property', 'og:site_name'), 'Stephen Drew')
  assert.equal(getMetaContent('property', 'og:locale'), 'en_GB')
  assert.equal(getMetaContent('property', 'og:image:width'), '800')
  assert.equal(getMetaContent('property', 'og:image:height'), '800')
  assert.equal(getMetaContent('name', 'twitter:image:alt'), 'Stephen Drew smiling in a blue checked shirt')
})

test('JSON-LD describes the visible personal profile without invented claims', () => {
  const match = index.match(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/)
  assert.ok(match, 'JSON-LD block is missing')

  const schema = JSON.parse(match[1])
  const nodes = Object.fromEntries(schema['@graph'].map((node) => [node['@type'], node]))

  assert.deepEqual(schema, generatedSchema)
  assert.equal(schema['@context'], 'https://schema.org')
  assert.deepEqual(Object.keys(nodes).sort(), ['ImageObject', 'Organization', 'Person', 'ProfilePage', 'WebSite'])
  assert.equal(nodes.WebSite.name, 'Stephen Drew')
  assert.equal(nodes.ProfilePage.mainEntity['@id'], 'https://stephendrew.com/#person')
  assert.equal(nodes.Person.name, 'Stephen Drew')
  assert.equal(nodes.Person.jobTitle, 'Founder & Director, Architecture Social')
  assert.deepEqual(nodes.Person.sameAs, [
    'https://www.linkedin.com/in/stephendrew/',
    'https://architecturesocial.com/people/stephen-drew/',
  ])
  assert.equal(nodes.ImageObject.width, 800)
  assert.equal(nodes.ImageObject.height, 800)
})

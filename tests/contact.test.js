import assert from 'node:assert/strict'
import test from 'node:test'
import { buildEnquiryMailto, CONTACT_EMAIL } from '../src/contact.js'

test('the enquiry opens the verified Architecture Social contact route', () => {
  const href = buildEnquiryMailto({
    name: 'Alex Smith',
    email: 'alex@example.com',
    business: 'Example Recruitment',
    message: 'Our candidate follow-up is slow.',
  })
  assert.ok(href.startsWith(`mailto:${CONTACT_EMAIL}?`))
  assert.match(decodeURIComponent(href), /Recruitment systems enquiry · Example Recruitment/)
  assert.match(decodeURIComponent(href), /Work email: alex@example.com/)
  assert.match(decodeURIComponent(href), /Our candidate follow-up is slow\./)
})

test('business names are bounded in the email subject', () => {
  const href = decodeURIComponent(buildEnquiryMailto({ business: 'x'.repeat(200) }))
  const subject = new URL(href).searchParams.get('subject')
  assert.equal(subject.length, 'Recruitment systems enquiry · '.length + 80)
})

export const CONTACT_EMAIL = 'hello@architecturesocial.com'

export function buildEnquiryMailto({ name, email, business, message }) {
  const cleanName = String(name || '').trim()
  const cleanEmail = String(email || '').trim()
  const cleanBusiness = String(business || '').trim()
  const cleanMessage = String(message || '').trim()
  const subject = `Recruitment systems enquiry${cleanBusiness ? ` · ${cleanBusiness.slice(0, 80)}` : ''}`
  const body = [
    `Name: ${cleanName}`,
    `Work email: ${cleanEmail}`,
    `Recruitment business: ${cleanBusiness}`,
    '',
    'What feels slow, repetitive or opaque?',
    cleanMessage,
  ].join('\n')

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

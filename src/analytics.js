import { track } from '@vercel/analytics'

export const ANALYTICS_ENABLED = import.meta.env?.VITE_VERCEL_WEB_ANALYTICS === 'true'

export const ANALYTICS_EVENTS = Object.freeze({
  ARCHITECTURE_SOCIAL_OUTBOUND: 'architecture_social_outbound',
  AI_CONSULTING_INTEREST: 'ai_consulting_interest',
  CONSULTING_EMAIL_HANDOFF: 'consulting_email_handoff',
  LINKEDIN_OUTBOUND: 'linkedin_outbound',
})

const ALLOWED_EVENTS = new Set(Object.values(ANALYTICS_EVENTS))

export function trackInteraction(eventName, { enabled = ANALYTICS_ENABLED, send = track } = {}) {
  if (!enabled || !ALLOWED_EVENTS.has(eventName)) return false
  try {
    send(eventName)
    return true
  } catch {
    return false
  }
}

export function redactAnalyticsEvent(event) {
  if (!event || typeof event.url !== 'string') return null

  try {
    const url = new URL(event.url)
    url.search = ''
    url.hash = ''
    return { ...event, url: url.toString() }
  } catch {
    return null
  }
}

import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

import { ANALYTICS_EVENTS, redactAnalyticsEvent, trackInteraction } from '../src/analytics.js'

const app = readFileSync(new URL('../src/App.jsx', import.meta.url), 'utf8')

test('measurement uses only the four approved event names', () => {
  assert.deepEqual(Object.values(ANALYTICS_EVENTS).sort(), [
    'ai_consulting_interest',
    'architecture_social_outbound',
    'consulting_email_handoff',
    'linkedin_outbound',
  ])
})

test('measurement rejects unapproved events without queuing data', () => {
  assert.equal(trackInteraction('visitor_email', { enabled: true, send: () => assert.fail('unapproved event was queued') }), false)
})

test('measurement is dormant until the explicit Vercel billing gate is enabled', () => {
  assert.equal(trackInteraction(ANALYTICS_EVENTS.LINKEDIN_OUTBOUND, { enabled: false, send: () => assert.fail('disabled event was queued') }), false)
  assert.match(app, /ANALYTICS_ENABLED \? <Analytics beforeSend={redactAnalyticsEvent} \/>/)
})

test('approved events are sent by name without visitor properties', () => {
  const calls = []
  assert.equal(trackInteraction(ANALYTICS_EVENTS.AI_CONSULTING_INTEREST, { enabled: true, send: (...args) => calls.push(args) }), true)
  assert.deepEqual(calls, [[ANALYTICS_EVENTS.AI_CONSULTING_INTEREST]])
})

test('measurement failures never interrupt the visitor action', () => {
  assert.equal(trackInteraction(ANALYTICS_EVENTS.LINKEDIN_OUTBOUND, { enabled: true, send: () => { throw new Error('blocked') } }), false)
})

test('page URLs lose query strings and hashes before collection', () => {
  const event = redactAnalyticsEvent({ type: 'pageview', url: 'https://stephendrew.com/?utm_source=example#consulting' })
  assert.deepEqual(event, { type: 'pageview', url: 'https://stephendrew.com/' })
  assert.equal(redactAnalyticsEvent({ type: 'pageview', url: 'not a URL' }), null)
})

test('no form values, URLs, query strings or hashes are passed to measurement', () => {
  assert.match(app, /trackInteraction\(ANALYTICS_EVENTS\.CONSULTING_EMAIL_HANDOFF\)/)
  assert.doesNotMatch(app, /trackInteraction\([^)]*,/)
  assert.doesNotMatch(app, /track\([^)]*,/)
  assert.doesNotMatch(app, /location\.(search|hash)|URLSearchParams/)
})

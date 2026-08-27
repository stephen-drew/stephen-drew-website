import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'

const bootPath = new URL('../public/theme-boot.js', import.meta.url)
const indexPath = new URL('../index.html', import.meta.url)
const bootScript = readFileSync(bootPath, 'utf8')

function executeBoot({ stored = null, prefersLight = false, storageThrows = false } = {}) {
  const root = { dataset: {}, style: {} }
  const localStorage = {
    getItem() {
      if (storageThrows) throw new Error('storage blocked')
      return stored
    },
  }
  const context = {
    document: { documentElement: root },
    window: {
      localStorage,
      matchMedia: () => ({ matches: prefersLight }),
    },
  }
  vm.runInNewContext(bootScript, context)
  return root
}

test('an explicit stored theme remains available', () => {
  const root = executeBoot({ stored: 'light', prefersLight: false })
  assert.equal(root.dataset.theme, 'light')
  assert.equal(root.style.colorScheme, 'light')
})

test('fresh visits use the approved dark theme regardless of system preference', () => {
  assert.equal(executeBoot({ prefersLight: true }).dataset.theme, 'dark')
  assert.equal(executeBoot({ prefersLight: false }).dataset.theme, 'dark')
  assert.match(bootScript, /stephen-drew-theme-v2/)
})

test('blocked storage fails closed to the approved dark theme', () => {
  assert.equal(executeBoot({ storageThrows: true, prefersLight: true }).dataset.theme, 'dark')
})

test('theme boot runs in the head before the application module', () => {
  const html = readFileSync(indexPath, 'utf8')
  const bootIndex = html.indexOf('<script src="/theme-boot.js"></script>')
  const headEndIndex = html.indexOf('</head>')
  const appIndex = html.indexOf('<script type="module" src="/src/main.jsx"></script>')
  assert.ok(bootIndex > -1)
  assert.ok(bootIndex < headEndIndex)
  assert.ok(bootIndex < appIndex)
})

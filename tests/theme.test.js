import assert from 'node:assert/strict'
import test from 'node:test'

import { applyTheme, getResolvedTheme, toggleTheme } from '../src/theme.js'

function withDom({ theme = 'dark', storageError = false }, callback) {
  const previousDocument = globalThis.document
  const previousWindow = globalThis.window
  const dataset = { theme }
  const style = {}

  globalThis.document = { documentElement: { dataset, style } }
  globalThis.window = {
    localStorage: {
      setItem(key, value) {
        if (storageError) throw new Error('storage blocked')
        this.lastWrite = [key, value]
      },
    },
  }

  try {
    return callback({ dataset, style, localStorage: globalThis.window.localStorage })
  } finally {
    globalThis.document = previousDocument
    globalThis.window = previousWindow
  }
}

test('theme state resolves from the document', () => {
  withDom({ theme: 'light' }, () => assert.equal(getResolvedTheme(), 'light'))
  withDom({ theme: 'unknown' }, () => assert.equal(getResolvedTheme(), 'dark'))
})

test('theme toggle applies and persists the next theme', () => {
  withDom({ theme: 'dark' }, ({ dataset, style, localStorage }) => {
    assert.equal(toggleTheme(), 'light')
    assert.equal(dataset.theme, 'light')
    assert.equal(style.colorScheme, 'light')
    assert.deepEqual(localStorage.lastWrite, ['stephen-drew-theme', 'light'])
  })
})

test('blocked storage does not break the visible theme change', () => {
  withDom({ theme: 'dark', storageError: true }, ({ dataset, style }) => {
    assert.doesNotThrow(() => applyTheme('light'))
    assert.equal(dataset.theme, 'light')
    assert.equal(style.colorScheme, 'light')
  })
})

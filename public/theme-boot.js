;(function () {
  var STORAGE_KEY = 'stephen-drew-theme'
  var theme = 'dark'

  try {
    var stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
      theme = stored
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      theme = 'light'
    }
  } catch {
    theme = 'dark'
  }

  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
})()

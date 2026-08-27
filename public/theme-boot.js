;(function () {
  var STORAGE_KEY = 'stephen-drew-theme-v2'
  var theme = 'dark'

  try {
    var stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
      theme = stored
    }
  } catch {
    theme = 'dark'
  }

  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
})()

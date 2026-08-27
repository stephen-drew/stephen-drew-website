export const THEME_STORAGE_KEY = 'stephen-drew-theme-v2'

export function getResolvedTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function applyTheme(theme) {
  const nextTheme = theme === 'light' ? 'light' : 'dark'
  document.documentElement.dataset.theme = nextTheme
  document.documentElement.style.colorScheme = nextTheme
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
  } catch {
    // The visible theme still changes when storage is unavailable.
  }
  return nextTheme
}

export function toggleTheme() {
  return applyTheme(getResolvedTheme() === 'dark' ? 'light' : 'dark')
}

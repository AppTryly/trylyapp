const THEME_KEY = 'tryly_theme';

export function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_KEY) || 'light';
  } catch {
    return 'light';
  }
}

export function setStoredTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}

export function applyTheme(theme) {
  const root = document.documentElement;
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    if (metaTheme) metaTheme.setAttribute('content', '#1e293b');
  } else {
    root.removeAttribute('data-theme');
    if (metaTheme) metaTheme.setAttribute('content', '#7C3AED');
  }
}

export function initPreferences() {
  const preferences = localStorage.getItem('preferences')
  const locale = localStorage.getItem('locale') || 'detect';
  document.body.classList.value = getPreferredColorScheme(newPreferences.presentation.mode);


}

function getPreferredColorScheme(setting: 'light' | 'dark' | 'auto'): 'light' | 'dark' {
  if (setting === 'auto') {
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  }
  return setting;
}

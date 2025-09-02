export type Theme = {
  name: string
  bg: string
  text: string
  accent: string
  accent2: string
  accent3: string
  card: string
  border: string
}

// Edit this list to add your own themes.
export const themes: Theme[] = [
  { name: 'Neon Violet', bg: '#000000', text: '#e6edf3', accent: '#8d6bff', accent2: '#00d4ff', accent3: '#ff6ad5', card: '#11151a', border: '#000000' },
  { name: 'Candy Pop', bg: '#000000', text: '#f5eff7', accent: '#ff6ad5', accent2: '#a16eff', accent3: '#ffd166', card: '#1a131d', border: '#000000' },
  { name: 'Aqua Lime', bg: '#000000', text: '#e2f3f5', accent: '#00e5ac', accent2: '#00b4ff', accent3: '#a3ff6a', card: '#0d1d22', border: '#000000' },
  { name: 'Ice Wave', bg: '#000000', text: '#e8f1ff', accent: '#66a3ff', accent2: '#9b66ff', accent3: '#66ffd1', card: '#10171b', border: '#000000' },
]

export function applyTheme(themeOrIndex: number | Theme) {
  const t = typeof themeOrIndex === 'number' ? themes[themeOrIndex] ?? themes[0] : themeOrIndex
  const r = document.documentElement
  r.style.setProperty('--bg', t.bg)
  r.style.setProperty('--text', t.text)
  r.style.setProperty('--accent', t.accent)
  r.style.setProperty('--accent-2', t.accent2)
  r.style.setProperty('--accent-3', t.accent3)
  r.style.setProperty('--card', t.card)
  r.style.setProperty('--card-border', t.border)
}



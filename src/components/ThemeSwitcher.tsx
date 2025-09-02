import { useMemo, useState } from 'react'

type Palette = {
  bg: string
  text: string
  accent: string
  accent2: string
  accent3: string
  card: string
  border: string
}

const palettes: Palette[] = [
  { bg: '#0b0d10', text: '#e6edf3', accent: '#8d6bff', accent2: '#00d4ff', accent3: '#ff6ad5', card: '#11151a', border: '#2a313b' },
  { bg: '#0f0b10', text: '#f5eff7', accent: '#ff6ad5', accent2: '#a16eff', accent3: '#ffd166', card: '#1a131d', border: '#3b2e41' },
  { bg: '#061417', text: '#e2f3f5', accent: '#00e5ac', accent2: '#00b4ff', accent3: '#a3ff6a', card: '#0d1d22', border: '#1f343a' },
  { bg: '#0b1114', text: '#e8f1ff', accent: '#66a3ff', accent2: '#9b66ff', accent3: '#66ffd1', card: '#10171b', border: '#22303a' },
]

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false)
  const rows = useMemo(() => 4, [])

  const apply = (p: Palette) => {
    const r = document.documentElement
    r.style.setProperty('--bg', p.bg)
    r.style.setProperty('--text', p.text)
    r.style.setProperty('--accent', p.accent)
    r.style.setProperty('--accent-2', p.accent2)
    r.style.setProperty('--accent-3', p.accent3)
    r.style.setProperty('--card', p.card)
    r.style.setProperty('--card-border', p.border)
  }

  return (
    <div className="theme-switcher">
      <button onClick={() => setOpen(v => !v)}>Themes</button>
      {open && (
        <div className="palette-pop">
          <div className="palette-grid" style={{ gridTemplateRows: `repeat(${rows}, 1fr)` }}>
            {palettes.map((p, i) => (
              <button key={i} className="swatch" onClick={() => apply(p)}
                style={{
                  background: `conic-gradient(${p.accent}, ${p.accent2}, ${p.accent3}, ${p.accent})`
                }}
                aria-label={`Apply theme ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}



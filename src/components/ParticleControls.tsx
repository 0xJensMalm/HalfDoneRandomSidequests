import { useEffect, useState } from 'react'
import { particleSettings } from '../controls/particleSettings'
import { themes, applyTheme } from '../theme/themes'

export function ParticleControls() {
  const [open, setOpen] = useState(false)
  const [local, setLocal] = useState(particleSettings.get())

  useEffect(() => {
    const unsub = particleSettings.subscribe(setLocal)
    return () => { unsub() }
  }, [])

  const set = (k: keyof typeof local) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value)
    particleSettings.set({ [k]: v })
    // Also update local mirror so UI reflects immediately
    setLocal(prev => ({ ...prev, [k]: v }))
  }

  const setShape = (shape: typeof local.shape) => () => {
    particleSettings.set({ shape })
  }

  return (
    <div className="particle-controls">
      <button className="pill small subtle" onClick={() => setOpen(v => !v)}>Particle controls</button>
      {open && (
        <div className="palette-pop" style={{ right: 0, bottom: 50, width: 280 }}>
          <div className="control-grid">
            <label>Spawn rate {local.spawnRate}/s
              <input type="range" min={0} max={400} step={5} value={local.spawnRate} onChange={set('spawnRate')} />
            </label>
            <label>Speed min {local.speedMin}
              <input type="range" min={20} max={400} step={5} value={local.speedMin} onChange={set('speedMin')} />
            </label>
            <label>Speed max {local.speedMax}
              <input type="range" min={40} max={800} step={5} value={local.speedMax} onChange={set('speedMax')} />
            </label>
            <label>Size min {local.sizeMin.toFixed(1)}
              <input type="range" min={0.5} max={6} step={0.1} value={local.sizeMin} onChange={set('sizeMin')} />
            </label>
            <label>Size max {local.sizeMax.toFixed(1)}
              <input type="range" min={1} max={10} step={0.1} value={local.sizeMax} onChange={set('sizeMax')} />
            </label>
            <label>Trail {local.trail.toFixed(2)}
              <input type="range" min={0} max={0.9} step={0.01} value={local.trail} onChange={set('trail')} />
            </label>
            <div className="shape-row">
              <button type="button" className={`pill small ${local.shape === 'dot' ? 'primary' : ''}`} onClick={setShape('dot')}>•</button>
              <button type="button" className={`pill small ${local.shape === 'circle' ? 'primary' : ''}`} onClick={setShape('circle')}>○</button>
              <button type="button" className={`pill small ${local.shape === 'x' ? 'primary' : ''}`} onClick={setShape('x')}>×</button>
              <button type="button" className={`pill small ${local.shape === 'arrow' ? 'primary' : ''}`} onClick={setShape('arrow')}>➤</button>
            </div>
            <div className="shape-row">
              {themes.map((t, i) => (
                <button key={t.name} type="button" className="swatch" onClick={() => applyTheme(i)}
                  title={t.name}
                  style={{ background: `conic-gradient(${t.accent}, ${t.accent2}, ${t.accent3}, ${t.accent})`, borderColor: '#000' }} />
              ))}
            </div>
            <div className="controls-row">
              <button type="button" className="pill small" onClick={() => particleSettings.reset()}>Reset</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

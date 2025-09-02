import { useEffect, useState } from 'react'
import { particleSettings } from '../controls/particleSettings'

export function ParticleControls() {
  const [open, setOpen] = useState(false)
  const [local, setLocal] = useState(particleSettings.get())

  useEffect(() => {
    return particleSettings.subscribe(setLocal)
  }, [])

  const set = (k: keyof typeof local) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value)
    const next = { ...local, [k]: v }
    setLocal(next)
    particleSettings.set({ [k]: v })
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
            <button className="pill small" onClick={() => particleSettings.reset()}>Reset</button>
          </div>
        </div>
      )}
    </div>
  )
}

export type ParticleSettings = {
  spawnRate: number
  speedMin: number
  speedMax: number
  sizeMin: number
  sizeMax: number
  trail: number
}

type Listener = (s: ParticleSettings) => void

const defaults: ParticleSettings = {
  spawnRate: 80, // particles per second
  speedMin: 120,
  speedMax: 260,
  sizeMin: 1,
  sizeMax: 2.5,
  trail: 0.15, // 0 = hard clear, 1 = no clear
}

let current: ParticleSettings = { ...defaults }
const listeners = new Set<Listener>()

export const particleSettings = {
  get(): ParticleSettings { return current },
  set(partial: Partial<ParticleSettings>) {
    current = { ...current, ...partial }
    for (const l of listeners) l(current)
  },
  reset() { this.set(defaults) },
  subscribe(l: Listener) { listeners.add(l); return () => listeners.delete(l) },
}



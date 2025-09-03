import { useEffect, useRef } from 'react'
import { particleSettings, type ParticleSettings } from '../controls/particleSettings'

type Vec = { x: number; y: number }
type Particle = {
  p: Vec
  v: Vec
  color: string
  shape: 'dot' | 'circle' | 'x' | 'arrow'
  size: number
}

// no-op helpers removed; shooter system doesn't need vector helpers

export function BackgroundFlock() {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef<Vec | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!

    const readVar = (name: string, fallback: string) => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(name)
      return v?.trim() || fallback
    }
    let palette = [
      readVar('--accent', '#8d6bff'),
      readVar('--accent-2', '#00d4ff'),
      readVar('--accent-3', '#ff6ad5'),
    ]

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1))

    const resize = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      // Reset particles on resize to avoid artifacts
      particlesRef.current = []
    }

    const spawnFromEdge = (dt: number, settings: ParticleSettings) => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const count = (settings.spawnRate * dt) | 0
      const shapes: Particle['shape'][] = ['dot', 'circle', 'x', 'arrow']
      for (let i = 0; i < count; i++) {
        const side = Math.floor(Math.random() * 4)
        let x = 0, y = 0
        if (side === 0) { x = Math.random() * w; y = -2 } // top
        if (side === 1) { x = w + 2; y = Math.random() * h } // right
        if (side === 2) { x = Math.random() * w; y = h + 2 } // bottom
        if (side === 3) { x = -2; y = Math.random() * h } // left
        const target = mouseRef.current ?? { x: w / 2, y: h / 2 }
        const dir = { x: target.x - x, y: target.y - y }
        const len = Math.hypot(dir.x, dir.y) || 1
        dir.x /= len; dir.y /= len
        const speed = settings.speedMin + Math.random() * (settings.speedMax - settings.speedMin)
        const particle: Particle = {
          p: { x, y },
          v: { x: dir.x * speed, y: dir.y * speed },
          color: palette[Math.floor(Math.random() * palette.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          size: settings.sizeMin + Math.random() * (settings.sizeMax - settings.sizeMin),
        }
        particlesRef.current.push(particle)
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const onMouseLeave = () => { mouseRef.current = null }
    const onBackdropClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      // If clicking outside interactive UI (grid, modals, title, switchers)
      if (target.closest('.square-grid') || target.closest('.modal-card') || target.closest('.title-box') || target.closest('.theme-switcher') || target.closest('.particle-controls')) return
      // Clear particles for a momentary reset
      particlesRef.current = []
    }

    const tick = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const particles = particlesRef.current

      // Read current settings each frame (ensures controls are responsive)
      const s = particleSettings.get()

      // Trail clear using themed background
      const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#000'
      const alpha = Math.max(0, Math.min(1, 1 - s.trail))
      ctx.fillStyle = bg.startsWith('#') ? `${bg}${Math.round(alpha * 255).toString(16).padStart(2,'0')}` : `rgba(0,0,0,${alpha})`
      ctx.fillRect(0, 0, w, h)

      // Spawn
      const now = performance.now()
      const last = (tick as any)._t || now
      const dt = Math.max(0, Math.min(0.05, (now - last) / 1000))
      ;(tick as any)._t = now
      // Update palette live so theme changes affect particles
      palette = [
        readVar('--accent', palette[0]),
        readVar('--accent-2', palette[1]),
        readVar('--accent-3', palette[2]),
      ]
      spawnFromEdge(dt, s)

      // Integrate and draw
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.p.x += p.v.x * dt
        p.p.y += p.v.y * dt
        if (p.p.x < -10 || p.p.x > w + 10 || p.p.y < -10 || p.p.y > h + 10) {
          particles.splice(i, 1)
          continue
        }
        ctx.save()
        ctx.translate(p.p.x, p.p.y)
        ctx.fillStyle = p.color
        switch (particleSettings.get().shape) {
          case 'dot':
            ctx.fillRect(-p.size * 0.6, -p.size * 0.6, p.size * 1.2, p.size * 1.2)
            break
          case 'circle':
            ctx.beginPath(); ctx.arc(0, 0, p.size, 0, Math.PI * 2); ctx.fill();
            break
          case 'x':
            ctx.beginPath()
            const s = p.size * 1.6
            ctx.moveTo(-s, -s); ctx.lineTo(s, s)
            ctx.moveTo(-s, s); ctx.lineTo(s, -s)
            ctx.strokeStyle = p.color
            ctx.lineWidth = Math.max(1, p.size * 0.6)
            ctx.stroke()
            break
          case 'arrow':
            // Rotate to direction of travel
            const ang = Math.atan2(p.v.y, p.v.x)
            ctx.rotate(ang)
            const a = p.size * 2.2
            ctx.beginPath()
            ctx.moveTo(-a * 0.8, -a * 0.4)
            ctx.lineTo(-a * 0.8, a * 0.4)
            ctx.lineTo(a * 0.9, 0)
            ctx.closePath()
            ctx.fill()
            break
        }
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    const onResize = () => resize()

    resize()
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('click', onBackdropClick)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('click', onBackdropClick)
    }
  }, [])

  return <canvas className="bg-canvas" ref={ref} />
}



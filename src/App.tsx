import { useMemo, useState } from 'react'
import { projects } from './data/projects'
import { ProjectCard } from './components/ProjectCard'
import { ProjectModal } from './components/ProjectModal'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { BackgroundFlock } from './components/BackgroundFlock'
import { ParticleControls } from './components/ParticleControls'

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const gridColumns = useMemo(() => {
    const n = Math.ceil(Math.sqrt(projects.length))
    return n
  }, [])

  const selected = useMemo(() => projects.find(p => p.id === selectedId) || null, [selectedId])

  return (
    <div className="app-shell">
      <BackgroundFlock />
      <div className="title-wrap">
        <div className="title-box">
          <div className="title-main">KromoRepo</div>
          <div className="title-sub">Half done, random sidequests.</div>
        </div>
      </div>

      <main className="grid-stage">
        <div
          className="square-grid"
          style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
        >
          {projects.map(project => (
            <div className="card-cell" key={project.id}>
              <ProjectCard project={project} onOpen={() => setSelectedId(project.id)} />
            </div>
          ))}
        </div>
      </main>

      <ThemeSwitcher />
      <ParticleControls />

      {selected && (
        <ProjectModal
          project={selected}
          onClose={() => setSelectedId(null)}
        />
      )}
    </div>
  )
}

export default App

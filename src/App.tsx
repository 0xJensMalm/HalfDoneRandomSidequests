import { useMemo, useState } from 'react'
import { getCatalog } from './data/catalog'
import type { Project } from './data/projects'
import { ProjectCard } from './components/ProjectCard'
import { ProjectModal } from './components/ProjectModal.tsx'
import { BackgroundFlock } from './components/BackgroundFlock'
import { ParticleControls } from './components/ParticleControls'

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const gridColumns = 4 // change to 6 for 6x6
  const items = useMemo(() => getCatalog(gridColumns), [gridColumns])
  const selected = useMemo<Project | null>(() => {
    const found = items.find((it): it is Project => 'title' in it && it.id === selectedId)
    return found ?? null
  }, [items, selectedId])

  return (
    <div className="app-shell">
      <BackgroundFlock />
      <div className="title-wrap">
        <div className="title-box">
          <div className="title-main">Half done, random sidequests.</div>
        </div>
      </div>

      <main className="grid-stage">
        <div
          className="square-grid"
          style={{ gridTemplateColumns: `repeat(${gridColumns}, 1fr)` }}
        >
          {items.map(item => (
            <div className="card-cell" key={item.id}>
              {'placeholder' in item ? (
                <div className="project-card placeholder-frame">
                  <div className="project-thumb placeholder-x" />
                </div>
              ) : (
                <ProjectCard project={item} onOpen={() => setSelectedId(item.id)} />
              )}
            </div>
          ))}
        </div>
      </main>

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

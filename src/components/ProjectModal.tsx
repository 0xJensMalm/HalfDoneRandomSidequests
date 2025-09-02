import { useEffect } from 'react'
import type { Project } from '../data/projects'

type Props = {
  project: Project
  onClose: () => void
}

export function ProjectModal({ project, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const openPopup = () => {
    const w = Math.min(1200, Math.floor(window.innerWidth * 0.9))
    const h = Math.min(800, Math.floor(window.innerHeight * 0.9))
    const left = Math.floor((window.innerWidth - w) / 2)
    const top = Math.floor((window.innerHeight - h) / 2)
    window.open(project.launchUrl, '_blank', `width=${w},height=${h},left=${left},top=${top}`)
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-media">
          {project.screenshot && <img src={project.screenshot} alt="Project screenshot" />}
        </div>
        <div className="modal-body">
          <div className="modal-title">{project.title}</div>
          {project.description && <div className="modal-desc">{project.description}</div>}
          <div className="stats">
            <div className="stat"><div className="k">Completion</div><div className="v">{project.completion}%</div></div>
            <div className="stat"><div className="k">Category</div><div className="v">{project.category}</div></div>
            <div className="stat"><div className="k">Updated</div><div className="v">{project.updated}</div></div>
          </div>
          <div className="modal-actions">
            <a className="ghost" href={project.repoUrl} target="_blank" rel="noreferrer">GitHub</a>
            <button className="launch" onClick={openPopup}>Launch</button>
            <button className="ghost" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  )
}



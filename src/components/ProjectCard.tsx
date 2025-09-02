import { memo } from 'react'
import type { Project } from '../data/projects'

type Props = {
  project: Project
  onOpen: () => void
}

export const ProjectCard = memo(({ project, onOpen }: Props) => {
  return (
    <button type="button" className="project-card" onClick={onOpen} aria-label={`Open ${project.title}`}>
      {project.thumb && (
        <img className="project-thumb" src={project.thumb} alt="" />
      )}
      <div className="project-overlay" />
      <div className="project-meta">
        <span className="pill small ellipsis" title={project.title}>{project.title}</span>
        <span className="pill small">{project.category}</span>
      </div>
    </button>
  )
})



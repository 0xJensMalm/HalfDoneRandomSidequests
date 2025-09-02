import { memo } from 'react'
import type { Project } from '../data/projects'

type Props = {
  project: Project
  onOpen: () => void
}

export const ProjectCard = memo(({ project, onOpen }: Props) => {
  const hasThumb = Boolean(project.thumb)
  return (
    <button type="button" className={`project-card ${!hasThumb ? 'placeholder-frame' : ''}`} onClick={onOpen} aria-label={`Open ${project.title}`}>
      {project.thumb ? (
        <img className="project-thumb" src={project.thumb} alt="" loading="lazy" decoding="async" />
      ) : (
        <div className="project-thumb placeholder-x" />
      )}
      <div className="project-overlay" />
      <div className="project-meta">
        <span className="pill small ellipsis" title={project.title}>{project.title}</span>
        <span className="pill small">{project.category}</span>
      </div>
    </button>
  )
})



import { projects as baseProjects, type Project } from './projects'

export type PlaceholderItem = { id: string; placeholder: true }
export type CatalogItem = Project | PlaceholderItem

export function getCatalog(gridSize: number): CatalogItem[] {
  // Use exactly the projects defined in projects.ts, in order
  const target = Math.max(1, gridSize * gridSize)
  const items: CatalogItem[] = baseProjects.slice(0, target)
  for (let i = items.length; i < target; i++) {
    items.push({ id: `ph-${i}`, placeholder: true })
  }
  return items
}



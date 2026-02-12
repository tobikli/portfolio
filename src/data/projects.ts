import matter from 'gray-matter'
import './polyfillBuffer'

export interface Project {
  name: string
  shortName: string
  shortDescription: string
  longDescription: string
  date: string
  tags: string[]
  link: string
}

const projectFiles = import.meta.glob('../content/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

type ProjectFrontmatter = Partial<Project>

function parseProject(raw: string) {
  const { data, content } = matter(raw)
  const frontmatter = data as ProjectFrontmatter

  return {
    name: frontmatter.name ?? '',
    shortName: frontmatter.shortName ?? frontmatter.name ?? '',
    shortDescription: frontmatter.shortDescription ?? '',
    longDescription: content.trim(),
    date: frontmatter.date ? String(frontmatter.date) : '',
    tags: Array.isArray(frontmatter.tags) ? frontmatter.tags.map((tag) => String(tag)) : [],
    link: frontmatter.link ?? '',
  }
}

export const projects: Project[] = Object.entries(projectFiles)
  .map(([path, raw]) => ({ path, project: parseProject(raw as string) }))
  .sort((a, b) => (a.path < b.path ? 1 : -1))
  .map((item) => item.project)

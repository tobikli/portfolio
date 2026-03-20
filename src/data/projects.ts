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
  status: string
  image?: string
}

const projectFiles = import.meta.glob('./content/projects/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const projectImageFiles = import.meta.glob('./content/projects/images/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>

type ProjectFrontmatter = Partial<Project>

function resolveProjectImage(image: string | undefined) {
  if (!image) {
    return ''
  }

  if (/^(https?:)?\/\//.test(image) || image.startsWith('/')) {
    return image
  }

  const normalizedImage = image.replace(/^\.\//, '')
  const imagePath = `./content/projects/images/${normalizedImage}`

  return projectImageFiles[imagePath] ?? ''
}

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
    status: frontmatter.status ?? '',
    image: resolveProjectImage(frontmatter.image),
  }
}

export const projects: Project[] = Object.entries(projectFiles)
  .map(([path, raw]) => ({ path, project: parseProject(raw as string) }))
  .sort((a, b) => (a.path < b.path ? 1 : -1))
  .map((item) => item.project)

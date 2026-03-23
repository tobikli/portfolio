import matter from 'gray-matter'
import './polyfillBuffer'

export interface WorkEntry {
  place: string
  role: string
  information: string
  time: string
  link: string
  image?: string
}

const workFiles = import.meta.glob('./content/work/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const workImageFiles = import.meta.glob('./content/work/images/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function resolveWorkImage(image: string | undefined) {
  if (!image) {
    return ''
  }

  if (/^(https?:)?\/\//.test(image) || image.startsWith('/')) {
    return image
  }

  const normalizedImage = image.replace(/^\.\//, '')
  const imagePath = `./content/work/images/${normalizedImage}`

  return workImageFiles[imagePath] ?? ''
}

type WorkFrontmatter = Partial<WorkEntry>

function parseWork(raw: string) {
  const { data } = matter(raw)
  const frontmatter = data as WorkFrontmatter

  return {
    place: frontmatter.place ?? '',
    role: frontmatter.role ?? '',
    information: frontmatter.information ?? '',
    time: frontmatter.time ?? '',
    link: frontmatter.link ?? '',
    image: resolveWorkImage(frontmatter.image),
  }
}

export const work: WorkEntry[] = Object.entries(workFiles)
  .map(([path, raw]) => ({ path, entry: parseWork(raw as string) }))
  .sort((a, b) => (a.path < b.path ? 1 : -1))
  .map((item) => item.entry)

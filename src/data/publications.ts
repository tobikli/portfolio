import matter from 'gray-matter'
import './polyfillBuffer'

export interface PublicationEntry {
  title: string
  description: string
  date: string
  pdfthesis: string
  pdfpresentation: string | null
  link?: string
}

const publicationFiles = import.meta.glob('../content/publications/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const pdfFiles = import.meta.glob('../assets/papers/*', {
  eager: true,
  import: 'default',
})

type PublicationFrontmatter = Partial<PublicationEntry>

function resolvePdf(name?: string | null) {
  if (!name) return null

  const match = Object.entries(pdfFiles).find(([path]) => path.endsWith(`/${name}`))
  return (match?.[1] as string) ?? null
}

function parsePublication(raw: string): PublicationEntry {
  const { data } = matter(raw)
  const frontmatter = data as PublicationFrontmatter

  const pdfthesis = resolvePdf(frontmatter.pdfthesis) ?? ''
  const pdfpresentation = resolvePdf(frontmatter.pdfpresentation)

  return {
    title: frontmatter.title ?? '',
    description: frontmatter.description ?? '',
    date: frontmatter.date ?? '',
    pdfthesis,
    pdfpresentation,
    link: frontmatter.link,
  }
}

export const publications: PublicationEntry[] = Object.entries(publicationFiles)
  .map(([path, raw]) => ({ path, entry: parsePublication(raw as string) }))
  .sort((a, b) => (a.path < b.path ? 1 : -1))
  .map((item) => item.entry)

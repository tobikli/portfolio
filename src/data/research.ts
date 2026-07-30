import matter from 'gray-matter'
import './polyfillBuffer'

export interface ResearchEntry {
  title: string
  description: string
  date: string
  pdfthesis: string
  pdfpresentation: string | null
  link?: string
}

const researchFiles = import.meta.glob('./content/research/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const pdfFiles = import.meta.glob('./content/research/papers/*', {
  eager: true,
  import: 'default',
})

type ResearchFrontmatter = Partial<ResearchEntry>

function resolvePdf(name?: string | null) {
  if (!name) return null

  const match = Object.entries(pdfFiles).find(([path]) => path.endsWith(`/${name}`))
  return (match?.[1] as string) ?? null
}

function parseResearch(raw: string): ResearchEntry {
  const { data } = matter(raw)
  const frontmatter = data as ResearchFrontmatter

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

export const researches: ResearchEntry[] = Object.entries(researchFiles)
  .map(([path, raw]) => ({ path, entry: parseResearch(raw as string) }))
  .sort((a, b) => (a.path < b.path ? 1 : -1))
  .map((item) => item.entry)

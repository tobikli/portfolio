import matter from 'gray-matter'
import './polyfillBuffer'

export interface EducationEntry {
  school: string
  degree: string
  information: string
  time: string
  link: string
  image?: string
}

const educationFiles = import.meta.glob('./content/education/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const educationImageFiles = import.meta.glob('./content/education/images/*', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function resolveEducationImage(image: string | undefined) {
  if (!image) {
    return ''
  }

  if (/^(https?:)?\/\//.test(image) || image.startsWith('/')) {
    return image
  }

  const normalizedImage = image.replace(/^\.\//, '')
  const imagePath = `./content/education/images/${normalizedImage}`

  return educationImageFiles[imagePath] ?? ''
}

type EducationFrontmatter = Partial<EducationEntry>

function parseEducation(raw: string) {
  const { data } = matter(raw)
  const frontmatter = data as EducationFrontmatter

  return {
    school: frontmatter.school ?? '',
    degree: frontmatter.degree ?? '',
    information: frontmatter.information ?? '',
    time: frontmatter.time ?? '',
    link: frontmatter.link ?? '',
    image: resolveEducationImage(frontmatter.image),
  }
}

export const education: EducationEntry[] = Object.entries(educationFiles)
  .map(([path, raw]) => ({ path, entry: parseEducation(raw as string) }))
  .sort((a, b) => (a.path < b.path ? 1 : -1))
  .map((item) => item.entry)

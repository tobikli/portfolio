import matter from 'gray-matter'
import './polyfillBuffer'

export interface EducationEntry {
  school: string
  degree: string
  information: string
  time: string
}

const educationFiles = import.meta.glob('../content/education/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

type EducationFrontmatter = Partial<EducationEntry>

function parseEducation(raw: string) {
  const { data } = matter(raw)
  const frontmatter = data as EducationFrontmatter

  return {
    school: frontmatter.school ?? '',
    degree: frontmatter.degree ?? '',
    information: frontmatter.information ?? '',
    time: frontmatter.time ?? '',
  }
}

export const education: EducationEntry[] = Object.entries(educationFiles)
  .map(([path, raw]) => ({ path, entry: parseEducation(raw as string) }))
  .sort((a, b) => (a.path < b.path ? 1 : -1))
  .map((item) => item.entry)

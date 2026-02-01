export interface Project {
  name: string
  shortName: string
  shortDescription: string
  longDescription: string
  date: string
  tags: string[]
  link: string
}

/*
  Add your projects here.
  All projects will be shown in the Projects section of your portfolio.
*/
export const projects: Project[] = [
  {
    name: 'My first project',
    shortName: 'project',
    shortDescription: 'This is my first project.',
    longDescription: `
    This is a detailed description of my first project.
    It does many interesting things and I learned a lot while working on it.
    `,
    date: '2025',
    tags: ['React', 'Next.js', 'TS'],
    link: 'https://project.yourdomain.com',
  },
]

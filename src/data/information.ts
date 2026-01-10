export const information = {
  url: 'https://tobiwn.me',
  name: 'Tobias Wen Klingenberg',
  name_short: 'Tobias Klingenberg',
  mail: 'tobikli@pm.me',
  slogan: 'Master Informatics student at TUM',
  links: [
    {
      name: 'GitHub',
      link: 'https://github.com/tobikli',
      icon: 'fa-brands fa-github',
    },
    {
      name: 'LinkedIn',
      link: 'https://linkedin.com/in/klingenberg',
      icon: 'fa-brands fa-linkedin',
    },
    {
      name: 'Reddit',
      link: 'https://www.reddit.com/user/tobiji/',
      icon: 'fa-brands fa-reddit',
    },
  ],
  techstack: [
    {
      name: 'C',
      icon: 'fa-solid fa-c',
    },
    {
      name: 'Java',
      icon: 'fa-brands fa-java',
    },
    {
      name: 'Python',
      icon: 'fa-brands fa-python',
    },
    {
      name: 'Swift',
      icon: 'fa-brands fa-swift',
    },
    {
      name: 'VueJS',
      icon: 'fa-brands fa-vuejs',
    },
    {
      name: 'Javascript / Typescript',
      icon: 'fa-brands fa-js',
    },
    {
      name: 'Docker',
      icon: 'fa-brands fa-docker',
    },
    {
      name: 'Git',
      icon: 'fa-brands fa-git-alt',
    },
  ],
}

export const work = [
  {
    place: 'Siemens AG',
    role: 'Cybersecurity IS Working Student',
    information: 'Automation, Virtualisation and Administration of Infrastructure for Cybersecurity Systems',
    time: '2025-Present',
  },
  {
    place: 'Applied Education Technologies @ TUM',
    role: 'Software Engineer Intern',
    information: 'Practical Course for engineering iOS applications',
    time: '2024-2025',
  },
  {
    place: 'Itestra GmbH',
    role: 'Software Engineering Summer Camp',
    information: 'Modeling and development of Unity Applications',
    time: '2024',
  },
  {
    place: 'DSJ AG',
    role: 'Audit and Finance Working Student',
    information: 'Annual audit of medium to large financial services',
    time: '2021-2022',
  },
]

export const education = [
  {
    school: 'Technical University of Munich',
    degree: 'M. Sc. Informatics',
    information: 'Specialization in Software Engineering, ML and Cybersecurity',
    time: '2025-Present',
  },
  {
    school: 'Technical University of Munich',
    degree: 'B. Sc. Informatics',
    information: 'Participation in iPraktikum',
    time: '2022-2025',
  },
  {
    school: 'Goethe Universitsy of Frankfurt',
    degree: 'B. Sc. Management and Economics',
    information: 'Reorientation to Informatics',
    time: '2021-2022',
  },
  {
    school: 'Helene-Lange-Gymnasium',
    degree: 'Abitur',
    information: 'Math, Biology, English, Geography',
    time: '2013-2021',
  },
]

import bachelorThesis from '@/assets/papers/thesis.pdf'
import bachelorPresentation from '@/assets/papers/presentation_klingenberg.pdf'
import rciPaper from '@/assets/papers/rci_ess.pdf'
import infoPaper from '@/assets/papers/info_ess.pdf'
import arPaper from '@/assets/papers/ar_edu_klingenberg.pdf'
import arPresentation from '@/assets/papers/ar_edu_klingenberg_p.pdf'

export const publications = [
  {
    title: 'Bachelor Thesis',
    description:
      'My Bachelor Thesis at the TUM about Load Testing and Performance Evaluation of the Theia Online IDE focused on evaluating the Theia Online IDE in the context of large university courses and exams, especially integrated in the Artemis System',
    date: 'November 2025',
    pdfthesis: bachelorThesis,
    pdfpresentation: bachelorPresentation,
    link: 'https://github.com/tobikli/ba-thesis',
  },
  {
    title: 'Autonomous Cars: What problems need to be solved',
    description:
      'Essay regarding application for M.Sc. in Robotics, Cognition, Intelligence at TUM',
    date: 'November 2025',
    pdfthesis: rciPaper,
    link: 'https://github.com/tobikli/ba-thesis',
  },
  {
    title: 'The role of AI in future technology',
    description: 'Essay regarding application for M.Sc. in Informatics at TUM',
    date: 'April 2025',
    pdfthesis: infoPaper,
    link: 'https://github.com/tobikli/ba-thesis',
  },
  {
    title: 'Augmented Reality in Education',
    description:
      'Seminar Paper in the course "Applications of Augmented Reality" as part of my seminar work for my bachelors degree',
    date: 'November 2024',
    pdfthesis: arPaper,
    pdfpresentation: arPresentation,
    link: 'https://github.com/tobikli/ba-thesis',
  },
]

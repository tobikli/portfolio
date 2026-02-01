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

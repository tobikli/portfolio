import ghfoundations from './content/certificates/GHFoundations_tk.pdf'
import hackatum from './content/certificates/HackaTUM_tk.pdf'
import ipraktikum from './content/certificates/iPraktikum_tk.pdf'
import chinese from './content/certificates/WCH_tk.pdf'
import english from './content/certificates/WE_tk.pdf'

export const certificates = [
  {
    name: 'GitHub Foundations',
    issuer: 'GitHub',
    date: new Date('2025-01-16'),
    link: 'https://www.credly.com/go/R84J29Id',
    pdf: ghfoundations,
  },
  {
    name: 'HackaTUM 2024 Participant',
    issuer: 'HackaTUM',
    date: new Date('2024-11-24'),
    pdf: hackatum,
  },
  {
    name: 'iPraktikum 2024 Participant',
    issuer: 'AET  @ TUM',
    date: new Date('2025-02-06'),
    pdf: ipraktikum,
  },
  {
    name: 'Chinese for Economics',
    issuer: 'Goethe University Frankfurt',
    date: new Date('2022-03-20'),
    pdf: chinese,
  },
  {
    name: 'English for Economics',
    issuer: 'Goethe University Frankfurt',
    date: new Date('2022-03-20'),
    pdf: english,
  },
]

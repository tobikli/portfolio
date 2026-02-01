export interface Project {
  name: string
  shortName: string
  shortDescription: string
  longDescription: string
  date: string
  tags: string[]
  link: string
}

export const projects: Project[] = [
  {
    name: 'u_plan',
    shortName: 'uplan',
    shortDescription: 'University planning app.',
    longDescription: `
    u_plan is a University Planning App I developed to help students organize their studies better.
    It includes features like timetable management, assignment tracking, and study resources.
    The app is built with React and Next.js for a responsive and user-friendly experience in combination with ShadCN.
    `,
    date: '2025',
    tags: ['React', 'Next.js', 'TS'],
    link: 'https://uplan.twks.net',
  },
  {
    name: 'tobiwn.me',
    shortName: 'tobiwn.me',
    shortDescription: 'This portfolio website.',
    longDescription: `
    This is my new personal portfolio, and the first page I wrote with Vue.js. In comparison to my other pages, this one is single page
    and has a dynamic header and is dynamically configurable, therefore even being able to be used as a template.
    `,
    date: '2025',
    tags: ['TS', 'Vue.js', 'Tailwind'],
    link: 'https://tobiwn.me',
  },
  {
    name: 'Home Lab',
    shortName: 'homelab',
    shortDescription: 'Proxmox VM Cluster.',
    longDescription: `
    During my Working Student Position at Siemens, I found passion in building and hosting my own services, especially regarding Virtualization and Clustering.
    Currently, I have a own Proxmox machine running several services in a fenced of internal network. These include my own cloud storage, VPN, several services
    like Paperless and also this website. Homelabbing taught me many things regarding Networking, System Administration and architecture. You can get access to the
    Server using the link below.
    `,
    date: '2025',
    tags: ['Proxmox', 'VM', 'Net'],
    link: 'https://twks.net',
  },
  {
    name: 'tobia.sh',
    shortName: 'tobia.sh',
    shortDescription: 'Secondary portfolio website.',
    longDescription: `
    This is my second personal portfolio and website. It holds all my information including my projects, my resume and contact options.
    Its written in pure HTML and CSS and includes some features written in PHP, for example a contact page, different backgrounds and Login via auth.twks.net (mostly for the admin page, but everybody can log in).
    It also features a shining card on the homepage with a cool animation :).
    `,
    date: '2024-2025',
    tags: ['PHP', 'JS', 'HTML'],
    link: 'https://v2.tobiwn.me',
  },
  {
    name: 'Bachelor',
    shortName: 'Bachelor',
    shortDescription: 'Bachelor Thesis.',
    longDescription: `
    My Bachelor Thesis at the TUM about Load Testing and Performance Evaluation of the Theia Online IDE focused on evaluating the Theia Online IDE in the context of large university courses and exams, especially integrated in the Artemis System.
    Foremost, Playwright was used for all kinds of testing.

    Load Testing for Theia Cloud by simulating a large amount of students
    Randomized / AI generated student behaviour

    For more comprehensive information, take a look at my GitHub Repo for this thesis including the Playwright tests.
    Find my thesis and proposal text here.
    `,
    date: '2025',
    tags: ['TS', 'Playwright', 'Typst'],
    link: 'https://github.com/tobikli/theia-scale-tests',
  },
  {
    name: 'Safeguard',
    shortName: 'Safeguard',
    shortDescription: 'Siemens EHS App.',
    longDescription: `
    During my Bachelor Praktikum at TUM, I participated at the renowned iPraktikum in WS24. Together with SIEMENS as a Client, me and my team created a Real-Time EHS App for iOS, informing workers and guests about upcoming hazards in Siemens factories. Some notable features include:
    App Clip Support,
    Live Activity Support,
    Supabase Backend,
    Industrial Edge Connection,
    MQTT Protocol
    `,
    date: '2024-2025',
    tags: ['Swift', 'JS', 'TS', 'MQTT'],
    link: 'https://aet.cit.tum.de/projects/courses/ipraktikum/24w/',
  },
  {
    name: 'getit',
    shortName: 'getit',
    shortDescription: 'Raycast request extension.',
    longDescription: `
    Getit is an extension for Raycast, allowing users to easily and quickly send requests to API and any other services. Simply paste in the URL and choose the request type. The response can quickly be copied to the clipboard for easy usage.
    (Unfortunantely not) Available under raycast.com/tobikli/getit
    `,
    date: '2024',
    tags: ['TS', 'RC API'],
    link: 'https://github.com/tobikli/getit',
  },
  {
    name: 'TripPlanner',
    shortName: 'TripPlanner',
    shortDescription: 'iOS App for planning trips.',
    longDescription: `
    During the Intro Course at the iPraktikum 2024/25 at TUM, I developed a Swift App that lets the user track, budget and plan trips and vacations. Users can input their budget and how much they spend, as well as flights, hotels, food and activities. The budget is shown in several statistics. Furthermore it features a Map of the city of the trip as well as live Weather via API calls.
    `,
    date: '2024',
    tags: ['Swift'],
    link: 'https://github.com/tobikli/TripPlanner',
  },
  {
    name: 'piARno',
    shortName: 'piARno',
    shortDescription: 'Piano Tiles like Game.',
    longDescription: `
    A Project I made during the itestra summer camp 2024. Its a AR HoloLens Game based on piano tiles. You can track a virtual keyboard onto your real keyboard and then play a handfull of piano sheets. Notes fall into the real piano keys to track when to play which key.
    `,
    date: '2024',
    tags: ['Unity', 'C#'],
    link: '',
  },
]

import profilePic from '@/assets/images/profile.png'
import CV from '@/assets/cv.pdf'

const birthday = new Date('2003-05-26')
const age = getAge(birthday)

export const information = {
  name: 'Tobias Wen Klingenberg',
  name_short: 'Tobias Klingenberg',
  mail: 'hello@tobiwn.me',
  slogan: 'Master Informatics student at TUM',
  birthday: birthday,
  age: age,
  profilePic: profilePic,
  cv: CV,
  location: 'Munich, GER',
  status: 'Currently employed at Siemens FT',
  aboutHtml: `
          <p>
            I'm currently ${age} years old and in my
            <b>Master of Science</b> studies of
            <a
              class="underline"
              href="https://www.cit.tum.de/en/cit/studies/degree-programs/master-informatics/"
              >Informatics / Computer Science</a
            >
            at the
            <a class="underline" href="https://tum.de">Technical University of Munich (TUM)</a>.
            <br />
          </p>
          <p>
            During my Bachelor studies, next to mandatory courses in maths, algorithms and logic, I
            focused on <b>Software Engineering</b> and <b>Cloud Technologies</b>. My Master courses
            focus on AI, SE and <b>Cybersecurity</b>.
          </p>
  `,
  aboutSideHtml: `
          <p>
            I embrace technology, science and building digital infrastructure, applications and
            experiences.
          </p>
          <p class="mt-3">
            Furthermore, I love traveling the world (and hopefully outer worlds soon), trying out
            culinary exquisites and music.
          </p>
          <p class="mt-3">
            You can also find some cool stuff on my
            <a class="underline" href="https://v2.tobiwn.me">alternative Portfolio!</a>
          </p>
          <p>
            and stats of my personal infrastructure here:
            <a class="underline" href="https://twks.net">TWKS</a>
          </p>
          <p class="mt-6">
            More information about myself and my work can be seen below or using this interactive
            <a class="underline" href="/shell">shell</a>.
          </p>
  `,
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
      name: 'React',
      icon: 'fa-brands fa-react',
    },
    {
      name: 'HTML5',
      icon: 'fa-brands fa-html5',
    },
    {
      name: 'CSS',
      icon: 'fa-brands fa-css3-alt',
    },
		{
      name: 'Javascript / Typescript',
      icon: 'fa-brands fa-js',
    },
    {
      name: 'Kubernetes',
      icon: 'fa-brands fa-kubernetes',
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

function getAge(birthDate: Date) {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

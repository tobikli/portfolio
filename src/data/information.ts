import profilePic from '@/assets/images/profile.png'
import CV from '@/assets/cv.pdf'

const birthday = new Date('2000-01-01')
const age = getAge(birthday)

/*
  Update the information below with your personal details.
*/
export const information = {
  url: 'https://yourdomain.com',
  name: 'Your Long Name',
  name_short: 'Your Short Name',
  mail: 'email@yourdomain.com',
  slogan: 'Your slogan here',
  birthday: birthday,
  age,
  profilePic: profilePic,
  cv: CV,
  status: 'Your status here',
  aboutHtml: `
          <p>
            I'm currently ${age} years old and in my
            <b>Master of Science</b> studies of
            <a
              class="underline"
              href="https://www.exampleuniversity.edu/masters/data-science/"
              >Data Science</a
            >
            at the
            <a class="underline" href="https://www.exampleuniversity.edu">Your University</a>.
            <br />
          </p>
          <p>
            Add your information you want to share here.
          </p>
  `,
  aboutSideHtml: `
          Add some additional information about yourself here.
  `,
  /*  Update the links below with your social media links. The icons use Font Awesome https://fontawesome.com/icons */
  links: [
    {
      name: 'GitHub',
      link: 'https://github.com/yourusername',
      icon: 'fa-brands fa-github',
    },
    {
      name: 'LinkedIn',
      link: 'https://linkedin.com/in/yourusername',
      icon: 'fa-brands fa-linkedin',
    },
    {
      name: 'Reddit',
      link: 'https://www.reddit.com/user/yourusername/',
      icon: 'fa-brands fa-reddit',
    },
  ],
  /*  Update the tech stack below with your skills. The icons use Font Awesome https://fontawesome.com/icons */
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

function getAge(birthDate: Date) {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

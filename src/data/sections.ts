import HomeView from '@/sections/HomeView.vue'
import AboutView from '@/sections/AboutView.vue'
import JourneyView from '@/sections/JourneyView.vue'
import ProjectsView from '@/sections/ProjectsView.vue'
import ContactView from '@/sections/ContactView.vue'


/* eslint-disable  @typescript-eslint/no-wrapper-object-types */

export interface Section {
  name: string
  id: string
  view: Object
}

export const sections: Section[] = [
  {
    name: 'Home',
    id: 'home',
    view: HomeView,
  },
  {
    name: 'About',
    id: 'about',
    view: AboutView,
  },
      {
    name: 'Journey',
    id: 'journey',
    view: JourneyView,
  },
  {
    name: 'Projects',
    id: 'projects',
    view: ProjectsView,
  },
  {
    name: 'Contact',
    id: 'contact',
    view: ContactView,
  },
]

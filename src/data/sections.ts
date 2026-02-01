import HomeView from '@/views/HomeView.vue'
import ProjectsView from '@/views/ProjectsView.vue'
import ContactView from '@/views/ContactView.vue'
import AboutView from '@/views/AboutView.vue'

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

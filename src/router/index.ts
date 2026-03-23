import { createRouter, createWebHistory } from 'vue-router'
import ShellView from '@/views/ShellView.vue'
import MainView from '@/views/MainView.vue'
import LegalView from '@/views/LegalView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
    },
    {
      path: '/legal',
      name: 'legal',
      component: LegalView,
    },
    {
      path: '/shell',
      name: 'shell',
      component: ShellView,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { name: 'main' },
    },
  ],
})

export default router

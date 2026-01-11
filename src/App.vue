<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import Darkmode from '@/components/DarkMode.vue'
import PopupView from '@/views/PopupView.vue'
import { resolveDynamicComponent, computed } from 'vue'
import { useRoute, RouterView } from 'vue-router'
import { sections } from '@/data/sections'
import AppFooter from './components/AppFooter.vue'
import { reactive, onMounted, onBeforeUnmount } from 'vue'
import { useHead } from '@unhead/vue'
import { information } from './data/information'

useHead({
  title: 'Tobias Klingenberg',
  meta: [
    {
      name: 'description',
      content: 'Welcome to my personal portfolio—projects, publications, and ways to get in touch.',
    },
    { property: 'og:title', content: 'Tobias Klingenberg' },
    {
      property: 'og:description',
      content: 'Welcome to my personal portfolio—projects, publications, and ways to get in touch.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'author', content: 'Tobias Klingenberg' },
  ],
  link: [{ rel: 'canonical', href: information.url }],
})

const visible = reactive<Record<string, boolean>>({})
const route = useRoute()
const isShell = computed(() => route.name === 'shell')

let observer: IntersectionObserver | null = null

onMounted(() => {
  const opts = {
    root: null,
    // adjust rootMargin so section becomes "visible" a bit earlier/later relative to viewport
    rootMargin: '-15% 0px -15% 0px',
    threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const id = (entry.target as HTMLElement).id
      visible[id] = entry.isIntersecting && entry.intersectionRatio > 0.1
    })
  }, opts)

  const els = document.querySelectorAll('main .section[id]')
  els.forEach((el) => observer!.observe(el))
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <template v-if="!isShell">
    <AppHeader />
    <main class="min-h-screen">
      <section
        v-for="(section, index) in sections"
        :key="section.id"
        :id="section.id"
        class="section"
        :class="{
          'section-visible': visible[section.id],
          'section-hidden': !visible[section.id],
        }"
      >
        <component
          :class="[index === sections.length ? '' : 'mb-40']"
          :is="resolveDynamicComponent(section.view)"
        />
      </section>
    </main>
    <AppFooter />
    <Darkmode />
    <PopupView />
  </template>

  <template v-else>
    <RouterView />
  </template>
</template>

<style scoped>
.particles-container {
  overflow: hidden;
}

.section {
  opacity: 0;
  transform: translateY(12px) scale(0.996);
  scroll-margin-top: 80px;
  transition:
    opacity 420ms cubic-bezier(0.2, 0.9, 0.4, 1),
    transform 420ms cubic-bezier(0.2, 0.9, 0.4, 1);
  will-change: opacity, transform;
}

.section-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.section-hidden {
  opacity: 0;
  transform: translateY(12px) scale(0.996);
}

@media (prefers-reduced-motion: reduce) {
  .section,
  .section-visible,
  .section-hidden {
    transition: none !important;
    transform: none !important;
  }
}
</style>

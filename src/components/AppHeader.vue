<script setup lang="ts">
import { useDark } from '@vueuse/core'
import logo_dark from '@/assets/logo_dark.svg'
import logo_light from '@/assets/logo_light.svg'
import { sections } from '@/data/sections'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isDark = useDark()
const currentAnchor = ref('')

const isLastSection = (id: string) => {
  if (id === sections[sections.length - 1]?.id && currentAnchor.value === '') {
    return 'active'
  }
  return ''
}

onMounted(() => {
  // Only track the page sections in the main content; ignore popup or other sections
  const pageSections = document.querySelectorAll('main .section[id]')

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id
        if (!id) return

        if (entry.isIntersecting) {
          currentAnchor.value = id
        }
      })
    },
    {
      threshold: 0.2,
    },
  )

  pageSections.forEach((section) => observer.observe(section))

  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <header class="sticky top-0 left-0 right-0 z-50 backdrop-blur-md h-16">
    <div class="max-w-6xl mx-auto w-full px-4 flex items-center gap-4 h-full">
      <img
        :src="isDark ? logo_light : logo_dark"
        alt="Logo"
        class="w-10 h-10 shrink-0 hidden sm:block"
      />
      <div class="flex-1 flex justify-center">
        <nav class="flex gap-2" role="navigation" aria-label="Main">
          <a
            v-for="section in sections"
            :key="section.id"
            :href="'#' + section.id"
            :class="[
              'nav-link px-3 py-2 rounded text-sm underline-offset-8',
              currentAnchor === section.id ? 'active' : isLastSection(section.id),
              'text-gray-900 dark:text-gray-100',
            ]"
          >
            {{ section.name }}
          </a>
        </nav>
      </div>
      <div class="w-10 h-10 shrink-0 hidden sm:block" aria-hidden="true"></div>
    </div>
  </header>
</template>

<style scoped>
nav a.nav-link {
  position: relative;
  display: inline-block;
  line-height: 0.2;
  color: inherit;
}

nav a.nav-link::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -6px;
  transform: translateX(-50%) scaleX(0);
  transform-origin: center;
  width: calc(80%);
  height: 1px;
  background: currentColor;
  opacity: 1;
  transition:
    transform 180ms cubic-bezier(0.2, 0.9, 0.4, 1),
    opacity 120ms;
  border-radius: 2px;
  pointer-events: none;
}

nav a.nav-link:hover::after,
nav a.nav-link:focus::after,
nav a.nav-link.active::after {
  transform: translateX(-50%) scaleX(1);
}

nav a.nav-link:active::after {
  transition-duration: 120ms;
}
</style>

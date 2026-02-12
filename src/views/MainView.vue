<script setup lang="ts">
import { resolveDynamicComponent } from 'vue'
import { sections } from '@/data/sections'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/AppHeader.vue'
import PopupView from '@/views/PopupView.vue'
import Darkmode from '@/components/DarkMode.vue'
import { reactive, onMounted, onBeforeUnmount } from 'vue'
import { useHead } from '@unhead/vue'

import { meta } from '@/data/meta'

useHead(meta)

const visible = reactive<Record<string, boolean>>({})

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
  opacity: 0.2;
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

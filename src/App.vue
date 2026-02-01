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

useHead({
  title: 'Tobias Klingenberg – Software Engineer & Computer Science Student',
  meta: [
    {
      name: 'description',
      content:
        'Portfolio of Tobias Klingenberg, Computer Science student at TUM. Projects in software engineering, web development, and system design.',
    },

    {
      name: 'keywords',
      content:
        'Tobias Klingenberg, Tobias Wen Klingenberg, TWK, software engineer, computer science, TUM, portfolio',
    },

    {
      name: 'author',
      content: 'Tobias Klingenberg',
    },

    {
      property: 'og:title',
      content: 'Tobias Klingenberg – Portfolio',
    },
    {
      property: 'og:description',
      content:
        'Personal portfolio of Tobias Klingenberg, showcasing software engineering and computer science projects.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: 'https://tobiwn.me',
    },

    // Twitter / X
    {
      name: 'twitter:card',
      content: 'summary',
    },
    {
      name: 'twitter:title',
      content: 'Tobias Klingenberg – Portfolio',
    },
    {
      name: 'twitter:description',
      content: 'Portfolio of Tobias Klingenberg, Computer Science student at TUM.',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://tobiwn.me',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        name: 'Tobias Klingenberg',
        url: 'https://tobiwn.me/',
        dateCreated: '2024-12-23T12:34:00-05:00',
        dateModified: '2025-03-27T14:53:00-05:00',
        mainEntity: {
          '@type': 'Person',
          name: 'Tobias Klingenberg',
          alternateName: 'tobikli',
          identifier: 'tobiwn',
          description: 'CS Student by heart',
          image: 'https://tobiwn.me/images/profile.jpg',
          sameAs: ['https://www.linkedin.com/in/klingenberg', 'https://github.com/tobikli'],
          interactionStatistic: [
            {
              '@type': 'InteractionCounter',
              interactionType: 'https://schema.org/FollowAction',
              userInteractionCount: 1,
            },
            {
              '@type': 'InteractionCounter',
              interactionType: 'https://schema.org/LikeAction',
              userInteractionCount: 5,
            },
          ],
          agentInteractionStatistic: {
            '@type': 'InteractionCounter',
            interactionType: 'https://schema.org/WriteAction',
            userInteractionCount: 2346,
          },
        },
      }),
    },
  ],
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

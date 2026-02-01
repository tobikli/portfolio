<script setup lang="ts">
import type { Project } from '@/data/projects'
import { showPopup } from '@/composables/usePopup'
import ProjectDetail from './ProjectDetail.vue'

defineProps<{
  project: Project
}>()
</script>

<template>
  <article
    @click="
      showPopup({
        title: project.name,
        component: ProjectDetail,
        componentProps: { project },
      })
    "
    class="flex flex-col min-h-40 w-76 p-5 bg-black/3 dark:bg-white/3 backdrop-blur-2xl transition-transform transform-gpu hover:cursor-pointer border border-black/3 dark:border-white/3 hover:border-black hover:dark:border-white"
    role="article"
    aria-label="project box"
  >
    <header class="flex items-start justify-between gap-4">
      <h3 class="text-lg font-semibold leading-tight">
        {{ project.name }}
      </h3>

      <time class="text-sm text-gray-500 dark:text-gray-400" :datetime="project.date">
        {{ project.date }}
      </time>
    </header>

    <p class="mt-2 text-sm text-gray-800 dark:text-gray-300">
      {{ project.shortDescription }}
    </p>

    <footer class="mt-auto flex items-center justify-between gap-4">
      <ul class="flex flex-wrap gap-2">
        <li
          v-for="tag in project.tags"
          :key="tag"
          class="inline-flex items-center border px-2.5 py-0.5 rounded-full text-xs font-medium"
        >
          {{ tag }}
        </li>
      </ul>

      <div class="ml-auto">
        <slot name="actions">
          <button class="hover:underline">View</button>
        </slot>
      </div>
    </footer>
  </article>
</template>

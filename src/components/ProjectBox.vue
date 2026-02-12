<script setup lang="ts">
import type { Project } from '@/data/projects'
import { showPopup } from '@/composables/usePopup'
import ProjectDetail from './ProjectDetail.vue'

defineProps<{
  project: Project
}>()

const matchStatus = (status: string): string => {
  switch (status) {
    case "finished":
      return "status-green"
    case "ongoing":
      return "status-yellow"
    case "aborted":
      return "status-red"
    default:
      return "status-green"
  }
};
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
    class="flex flex-col min-h-40 w-96 p-5 bg-black/3 dark:bg-white/3 backdrop-blur-2xl transition-transform transform-gpu hover:cursor-pointer border border-black/3 dark:border-white/3 hover:border-black hover:dark:border-white cursor-hover"
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
          class="inline-flex items-center border dark:border-white/30 border-black/30 px-2.5 py-0.5 rounded-full text-xs font-medium"
        >
          {{ tag }}
        </li>
      </ul>

      <div class="ml-auto">
        <div class="border rounded-full px-2.5 py-0.5 text-xs dark:border-white/30 border-black/30">
          <div class="flex items-center gap-1.5 justify-center">
            <span :class="['status-dot', matchStatus(project.status)]"></span>
            <p class="">{{ project.status }}</p>
          </div>
        </div>
      </div>
    </footer>
  </article>
</template>

<style scoped>
.status-dot {
  --size: 8px;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
}

.status-green {
  background-color: #0b8800;
}

.status-red {
  background-color: #a10000;
}

.status-yellow {
  background-color: #d49c00;
}
</style>

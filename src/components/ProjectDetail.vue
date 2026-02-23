<script setup lang="ts">
import { type Project } from '@/data/projects'

defineProps<{
  project: Project
}>()
</script>

<template>
  <div>
    <p v-html="project.longDescription" class=" mb-5 pb-3 border-b"></p>
    <div class="flex justify-center">
      <a
        :href="project.link"
        class="border p-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
        >More Information</a
      >
    </div>
  </div>
</template>

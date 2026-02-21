<script setup lang="ts">
import { type Project } from '@/data/projects'

defineProps<{
  project: Project
}>()
</script>

<template>
  <div>
    <p>{{ project.longDescription }}</p>
    <br>
    <a :href="project.link" class="border p-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">More Information</a>
  </div>
</template>

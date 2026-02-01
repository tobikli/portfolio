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
    <a :href="project.link" class="underline">More Information</a>
  </div>
</template>

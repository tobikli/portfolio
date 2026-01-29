<script setup lang="ts">
import { projects } from '@/data/projects'
import { showPopup } from '@/composables/usePopup'
import ProjectDetail from './ProjectDetail.vue'
</script>

<template>
  <div class="text-center p-5">
    <div v-for="project in projects" :key="project.name">
      <button
        class="p-3 w-full"
        @click="
          showPopup({
            title: project.name,
            component: ProjectDetail,
            componentProps: { project },
          })
        "
      >
        <div
          class="grid grid-cols-[20%_60%_20%] p-4 bg hover:cursor-pointer bg-black/3 dark:bg-white/3 hover:bg-black hover:dark:bg-white transition-all hover:text-white hover:dark:text-black"
        >
          <a class="text-left underline-offset-5 underline"> {{ project.name }}</a>
          <a class="text-left hover:cursor-pointer"> {{ project.shortDescription }}</a>
          <a class="text-right">{{ project.date }}</a>
        </div>
      </button>
    </div>
  </div>
</template>

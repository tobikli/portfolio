<script setup lang="ts">
import Projectbox from '@/components/ProjectBox.vue'
import { projects } from '@/data/projects'
import TextType from '@/ui-components/TextType.vue'
import AnimationButton from '@/components/AnimationButton.vue'
import ProjectsOverview from '@/components/ProjectsOverview.vue'
</script>

<template>
  <div class="w-full flex flex-col items-center justify-start px-6 pb-20 md:pb-28">
    <div class="text-center">
      <TextType
        :text="['Take a look at my projects', 'More in progress!']"
        :typingSpeed="50"
        :pauseDuration="6000"
        :showCursor="true"
        cursorCharacter="|"
        :text-colors="['', '']"
        class="text-4xl mb-10"
      />
      <div class="flex flex-wrap justify-center gap-4 max-w-300">
        <div v-for="project in projects.slice(0, 9)" :key="project.name">
          <Projectbox :project="project" />
        </div>
      </div>
      <div class="p-10">
        <AnimationButton text="All Projects" title="All Projects" :component="ProjectsOverview" />
      </div>
    </div>
  </div>
</template>

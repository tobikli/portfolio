<script setup lang="ts">
import Projectbox from '@/components/ProjectBox.vue'
import { projects } from '@/data/projects'
import TextType from '@/ui-components/TextType.vue'
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
        <div v-for="project in projects" :key="project.name">
          <Projectbox :project="project" />
        </div>
      </div>
    </div>
  </div>
</template>

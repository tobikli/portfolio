<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import Projectbox from '@/components/ProjectBox.vue'
import { projects } from '@/data/projects'
import TextType from '@/ui-components/TextType.vue'
import AnimationButton from '@/components/AnimationButton.vue'
import ProjectsOverview from '@/components/ProjectsOverview.vue'

const columns = ref(1)

const updateColumns = () => {
  const width = window.innerWidth
  if (width >= 1280) {
    columns.value = 3
  } else if (width >= 768) {
    columns.value = 2
  } else {
    columns.value = 1
  }
}

const visibleProjects = computed(() => {
  const limit = columns.value === 2 ? 8 : 9
  return projects.slice(0, limit)
})

onMounted(() => {
  updateColumns()
  window.addEventListener('resize', updateColumns, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('resize', updateColumns)
})

</script>

<template>
  <div class="w-full flex flex-col items-center justify-start px-6 pb-20 md:pb-28">
    <div class="text-center">
      <TextType
        :text="['My current projects', 'More in progress!']"
        :typingSpeed="50"
        :pauseDuration="6000"
        :showCursor="true"
        cursorCharacter="|"
        :text-colors="['', '']"
        class="text-4xl mb-10"
      />
      <div class="flex flex-wrap justify-center gap-4 max-w-300">
        <div v-for="project in visibleProjects" :key="project.name">
          <Projectbox :project="project" />
        </div>
      </div>
      <div class="p-10">
        <AnimationButton text="All Projects" title="All Projects" :component="ProjectsOverview" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Project } from '@/data/projects'
import { showPopup } from '@/composables/usePopup'
import ImageDetail from './ImageDetail.vue'
import ImageWrapper from './ImageWrapper.vue'

defineProps<{
  project: Project
}>()
</script>

<template>
  <div>
    <div class="flex flex-col md:flex-row gap-6 md:items-center">
      <div v-if="project.image" class="self-center">
        <ImageWrapper
          :src="project.image!"
          alt="Project Image"
          img-class="w-full h-auto max-h-64 object-contain cursor-image"
          wrapper-class="w-auto max-w-70 sm:w-70 md:w-56 md:max-w-250 md:shrink-0 flex items-center justify-center"
          @click="
            showPopup({
              title: project.name,
              component: ImageDetail,
              componentProps: {
                image: project.image!,
              },
            })
          "
        />
        <ul class="flex flex-wrap gap-2 mt-3 justify-center">
          <li
            v-for="tag in project.tags"
            :key="tag"
            class="inline-flex items-center border dark:border-white/30 border-black/30 px-2.5 py-0.5 rounded-full text-xs font-medium"
          >
            {{ tag }}
          </li>
        </ul>
      </div>
      <p v-html="project.longDescription" class="flex-1"></p>
    </div>
    <div class="mb-5 mt-3 pb-3 border-b"></div>
    <div class="flex justify-center mt-3">
      <a
        :href="project.link"
        class="border p-2 text-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
        >More Information</a
      >
    </div>
  </div>
</template>

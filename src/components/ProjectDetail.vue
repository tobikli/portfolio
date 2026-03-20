<script setup lang="ts">
import { type Project } from '@/data/projects'
import { showPopup } from '@/composables/usePopup'
import ImageDetail from './ImageDetail.vue';
import ImageWrapper from './ImageWrapper.vue';

defineProps<{
  project: Project
}>()
</script>

<template>
  <div>
    <div class="flex flex-col md:flex-row gap-6 md:items-center">
      <div v-if="project.image" class="w-70 self-center md:self-auto md:w-56 md:max-w-250 md:shrink-0 flex items-center justify-center">
        <ImageWrapper
          :src="project.image!"
          alt="Project Image"
          img-class="w-full h-auto max-h-64 object-contain hover:cursor-crosshair"
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
      </div>
      <p v-html="project.longDescription" class="flex-1"></p>
    </div>
    <div class="mb-5 mt-3 pb-3 border-b"></div>
    <div class="flex justify-center">
      <a
        :href="project.link"
        class="border p-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
        >More Information</a
      >
    </div>
  </div>
</template>

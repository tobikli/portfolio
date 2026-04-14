<script setup lang="ts">
import { motion } from 'motion-v'
import ImageWrapper from './ImageWrapper.vue'
import ImageDetail from './ImageDetail.vue';
import { showPopup } from '@/composables/usePopup';
export type TimelineItem = {
  id: string
  title: string
  subtitle: string
  time: string
  information: string
  link: string
  image?: string
}

defineProps<{
  heading: string
  items: TimelineItem[]
}>()
</script>

<template>
  <div>
    <h2 class="text-xl mb-10">{{ heading }}</h2>
    <motion.ul class="relative flex flex-col gap-4 items-stretch w-[80vw] lg:max-w-110 mx-auto">
      <div class="absolute left-2 top-2 bottom-2 w-px bg-black/20 dark:bg-white/25 mr-5"></div>
      <motion.li
        v-for="item in items"
        :key="item.id"
        class="relative pl-8 w-full"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 0.4 }"
      >
        <span
          class="absolute left-0.75 top-7.5 h-2.5 w-2.5 rounded-full bg-black dark:bg-white ring-4 ring-(--bg-accent)"
        ></span>
        <div
          class="border border-gray-300 dark:border-gray-300/40 p-5 flex flex-col items-start text-left hover:bg-black/3 hover:dark:bg-white/3"
        >
          <div class="flex items-start justify-between w-full gap-4">
            <div class="flex flex-col items-start min-w-0 flex-1">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {{ item.title }}
              </h3>
              <a
                :href="item.link"
                class="text-md text-gray-500 dark:text-gray-400 mt-1 underline underline-offset-2 hover:cursor-pointer hover:text-black dark:hover:text-white"
              >
                {{ item.subtitle }}
              </a>
              <time class="text-xs text-gray-400 mt-2">
                {{ item.time }}
              </time>
            </div>
            <ImageWrapper
              v-if="item.image"
              :src="item.image!" 
              alt="Image"
              img-class="w-full h-auto object-contain"
              wrapper-class="w-10 flex items-center cursor-image dark:bg-white/3 bg-black/3 p-1.5 rounded transition hover:scale-105 transform-gpu"
              @click="
                showPopup({
                  title: item.subtitle,
                  component: ImageDetail,
                  componentProps: {
                    image: item.image!,
                  },
                })
              "
            />
          </div>
          <p class="mt-3 text-sm text-gray-700 dark:text-gray-300">
            {{ item.information }}
          </p>
        </div>
      </motion.li>
    </motion.ul>
  </div>
</template>

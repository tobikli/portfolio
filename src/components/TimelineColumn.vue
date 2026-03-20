<script setup lang="ts">
import { motion } from 'motion-v'

export type TimelineItem = {
  id: string
  title: string
  subtitle: string
  time: string
  information: string
  link: string
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
          class="absolute left-0.75 top-7.5 h-2.5 w-2.5 rounded-full bg-black dark:bg-white ring-4 ring-white dark:ring-black"
        ></span>
        <div
          class="border border-gray-300 dark:border-gray-300/40 py-5 px-8 flex flex-col items-start text-left hover:bg-black/3 hover:dark:bg-white/3"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {{ item.title }}
          </h3>
          <a :href="item.link" class="text-md text-gray-500 dark:text-gray-400 mt-1 underline underline-offset-2 hover:cursor-pointer ">
            {{ item.subtitle }}
          </a>
          <time class="text-xs text-gray-400 mt-2">
            {{ item.time }}
          </time>
          <p class="mt-3 text-sm text-gray-700 dark:text-gray-300">
            {{ item.information }}
          </p>
        </div>
      </motion.li>
    </motion.ul>
  </div>
</template>

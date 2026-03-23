<script setup lang="ts">
import { ref } from 'vue'
import { motion } from 'motion-v'
import TimelineColumn, { type TimelineItem } from '@/components/TimelineColumn.vue'
import { education } from '@/data/education'
import { work } from '@/data/work'
const listLimit = 4
const showAll = ref(false)

const toggleShowAll = () => {
  showAll.value = !showAll.value
}
const educationItems: TimelineItem[] = education.map((entry, index) => ({
  id: `edu-${entry.degree}-${index}`,
  title: entry.degree,
  subtitle: entry.school,
  time: entry.time,
  information: entry.information,
  link: entry.link,
  image: entry.image,
}))

const workItems: TimelineItem[] = work.map((entry, index) => ({
  id: `work-${entry.role}-${index}`,
  title: entry.role,
  subtitle: entry.place,
  time: entry.time,
  information: entry.information,
  link: entry.link,
  image: entry.image,
}))
</script>

<template>
  <div class="w-full flex flex-col items-center justify-start px-6 pb-20 md:pb-28">
    <div class="text-center w-full max-w-4xl about-no-anchor">
      <h1 class="text-3xl mb-12">My Journey</h1>
      <motion.div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <TimelineColumn
          heading="Education"
          :items="showAll ? educationItems : educationItems.slice(0, listLimit)"
        />
        <TimelineColumn
          heading="Work"
          :items="showAll ? workItems : workItems.slice(0, listLimit)"
        />
      </motion.div>
      <div
        v-if="work.length > listLimit || education.length > listLimit"
        class="flex justify-center"
      >
        <button
          class="cursor-hover p-2 px-5 mt-15 border border-gray-400 dark:border-gray-400 hover:dark:bg-white hover:dark:text-black hover:bg-black hover:text-white"
          @click="toggleShowAll"
        >
          {{ showAll ? 'Show Less' : 'Show More' }}
        </button>
      </div>
    </div>
  </div>
</template>

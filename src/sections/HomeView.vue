<script setup lang="ts">
import { motion } from 'motion-v'
import { information } from '@/data/information'
import ScrollIcon from '@/components/ScrollIcon.vue'
import '@/assets/stars.css'

const lines = [
  { text: `Hello, I'm ${information.name_short}`, size: 'text-3xl', weight: 'font-semibold' },
  { text: 'Welcome to my portfolio!', size: 'text-xl', weight: 'font-medium' },
  { text: information.slogan, size: 'text-2xl', weight: 'font-medium' },
]

const splitLines = lines.map((line) => ({
  ...line,
  words: line.text.split(' '),
}))
</script>

<template>
  <div
    class="relative min-h-screen w-full flex flex-col items-center justify-start px-6 pb-20 md:pb-28 overflow-hidden"
  >
    <div class="stars-container">
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <div class="meteor-container">
        <div class="meteor-1"></div>
        <div class="meteor-7"></div>
        <div class="meteor-13"></div>
      </div>
    </div>
    <div class="relative z-10 w-full flex flex-col items-center pb-36 md:pb-44">
      <div class="h-50"></div>
      <div class="p-5">
        <div
          v-for="(line, lineIndex) in splitLines"
          :key="lineIndex"
          :class="[line.size, 'text-center']"
        >
          <motion.span
            v-for="(word, wordIndex) in line.words"
            :key="wordIndex"
            class="inline-block mr-2 mb-2 transition-transform hover:cursor-default"
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{
              duration: 0.5,
              delay:
                wordIndex * 0.2 +
                (lineIndex > 0 ? splitLines[lineIndex - 1]!.words.length * 0.2 : 0),
            }"
            :whileHover="{ scale: 1.15, y: -4 }"
            :hoverTransition="{ duration: 0.05, delay: 0 }"
            :class="line.weight"
          >
            {{ word }}
          </motion.span>
        </div>
      </div>
      <motion.div
        class="mt-15 p-2 flex"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: 0 }"
      >
        <motion.a
          v-for="link in information.links"
          :key="link.name"
          :href="link.link"
          class="m-6"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.1, delay: 0 }"
          :whileHover="{ scale: 1.2 }"
          :whileTap="{ scale: 0.9 }"
        >
          <font-awesome-icon
            :icon="link.icon"
            size="2xl"
            class="cursor-hover"
          />
        </motion.a>
      </motion.div>
    </div>
    <ScrollIcon />
  </div>
</template>

<style scoped>
:global(body) {
  overflow-x: hidden;
}

.stars-container {
  position: fixed;
  inset: 0;
  overflow: hidden;
  z-index: -10;
}

:global(html:not(.dark) .stars-container) {
  filter: invert(1) brightness(0.35);
}

:global(#stars),
:global(#stars2),
:global(#stars3) {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
